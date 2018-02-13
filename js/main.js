
var timeToGuess = 90; // Seconds

var langs = {
    ENG:{
        info: `Get the most puzzles right in ${timeToGuess} seconds!`,
        start: 'Start',
        score: 'Score',
        newgame: 'New Game',
        firstHit: 'First Try',
        secondHit: 'Second Try',
        badAnswers: 'Did not get it'
    },
    '':{
        info: `Ki találja ki a legtöbb feladványt ${timeToGuess} másodperc alatt?`,
        start: 'Indulás!',
        score: 'Eredmények',
        newgame: 'Új játék',
        firstHit: 'Elsőre',
        secondHit: 'Másodikra',
        badAnswers: 'Nem Talált'
    }
}


var ViewModel = function(){
    
    var self = window.app = this;        
    var timeToWaitTillCountownStarts = 500;
    var waitingAfterVideoEnded = 4000;

    self.videoParams = '?autoplay=1&showinfo=0&rel=0&controls=0';    

    self.currentVideoIndex = ko.observable(0);
    randomize(videos);
    self.videos = ko.observable(videos);
    self.currentVideo = ko.observable();
    self.timerText = ko.observable();
    self.timerStartDate = new Date();
    self.error = ko.observable();
    self.showResults = ko.observable();
    self.showNext = ko.observable();
    self.showReaction = ko.observable();
    self.badMarkers = ['img/bad1.png','img/bad2.png','img/bad3.png']

    self.introScreen = ko.observable(true);
    
    self.showScore = ko.observable(false);
    self.showGuesses = ko.observable(false);    

    self.score = {
        firstHit: 0,
        secondHit: 0,
        badAnswers: 0
    }
    

    self.startGame = function(){        
                
        self.loadVideo(0);

        self.score.firstHit = 0;
        self.score.secondHit = 0;
        self.score.badAnswers = 0;

        $('.intro-screen').animate({top: '-100%'}, 500)
        setTimeout(function(){
        
            self.startTimer(timeToGuess)        
            self.introScreen(false);
            self.startVideo();
            self.showGuesses(true);
            
            
        }, 1000)
        
        
    }

    self.otherLanguages = ['', 'ENG'];    

    self.langs = langs;
    self.lang = ko.observable('');
    ko.bindingHandlers.t = {
        update: function(element, valueAccessor){
            $(element).text(langs[self.lang()][valueAccessor()])
        }
    }
    
    self.nextLang = function(){
        var currentIndex = self.otherLanguages.indexOf(self.lang());
        if (currentIndex === self.otherLanguages.length-1){
            currentIndex = 0;
        }
        else{
            currentIndex ++;
        }
        self.lang(self.otherLanguages[currentIndex]);
    }
    
    self.guess = function(userGuess){
        userGuess.guessed(true);

        self.showReaction(false);
        
        if (userGuess.correct){            
            self.playHappy();
            self.success();   
            
            var guessedNumberFar = self.currentVideo()
                .optionButtons.filter(function(button){
                    return button.guessed();
                }).length;
            if (guessedNumberFar === 1 ){
                self.score.firstHit++;
            }
            else{
                self.score.secondHit++;
            }
        }
        else{
            var guessedNumberFar = self.currentVideo()
                .optionButtons.filter(function(button){
                    return button.guessed();
                }).length;
            if (self.currentVideo().optionButtons.length-guessedNumberFar < 2){
                self.score.badAnswers++;
                console.warn('really fail')
                self.fail();                
            }
            else{
                self.playSad(function(){            
                    self.showReaction(false);        
                    self.startVideo();            
                });
            }
        }
    }

    self.playSad = function(callback){        
        var index = Math.floor(Math.random()*reactions.sad.length);
        var reactionUrl = reactions.sad[index];                
        self.showReaction(reactionUrl);
        self.pauseVideo();
        self.playReactionVideo(callback);                
    }

    self.playHappy = function(){
        var index = Math.floor(Math.random()*reactions.happy.length);
        var reactionUrl = reactions.happy[index];        
        self.showReaction(reactionUrl);
        self.pauseVideo();
        self.playReactionVideo(function(){
            self.showReaction(false);            
            self.showGuesses(false);
            self.nextVideo();
        });                      
    }

    self.nextVideo = function(){
        self.currentVideoIndex(self.currentVideoIndex()+1);
        self.showReaction(false);
        // Loop through videos
        if (videos.length === self.currentVideoIndex()){
            randomize(videos);
            self.videos(videos);
            self.currentVideoIndex(0);
        }
        self.loadVideo(self.currentVideoIndex());
        self.startVideo();
    }

    self.loadVideo = function(index){

        var video = videos[index];
        video.optionButtons = [];
        video.options.map(function(o, i){
            var button = {
                text: o,
                guessed: ko.observable(false),
                correct: video.correct === o,
                index: i
            }
            for(var langIndex in self.otherLanguages){
                var lang = self.otherLanguages[langIndex];
                if (video['options'+lang]){
                    button['text'+lang] = video['options'+lang][i];
                }
            }

            video.optionButtons.push(button);            

        });
        randomize(video.optionButtons)
        video.type = video.url.indexOf('https://www.youtube.com/') === 0?'youtube':'local';
        
        if (!video.optionButtons.filter(function(e){return e.correct}).length){
            self.error('Nincs jó válasz. Nézz bele a videos.js fájlba!')
            return;
        }

        randomize(self.buttons);
        randomize(self.badMarkers);

        self.showResults(false);
        self.showNext(false);        

        self.showGuesses(false);
        self.currentVideo(video);
        setTimeout(function(){
            self.showGuesses(true);
        }, 500)
        
    }

    self.success = function(){
        self.stopTimer();
        setTimeout(function(){
            self.timerText(':)');                      
            self.showNext(true);            
        },0)
    }

    self.fail = function(){
        self.stopTimer();
        self.showResults(true);
        self.playSad(function(){                    
            self.showReaction(false);
            self.nextVideo();                                
        });
    }
    
    self.stopTimer = function(){ self.timerRunning = false; }
    self.startTimer = function(startFrom){         
        self.currentTime = startFrom || self.currentTime;
        self.timerText(self.currentTime);
        self.timerRunning = true; 
    }

    self.startVideo = function(){
        var video = document.getElementById('davideo');
        if (!video.ended){
            video.play();
        }                
        self.startTimer();
        video.onended = function(){
            setTimeout(self.videoTimeout.bind(this, self.currentVideo().url), waitingAfterVideoEnded)
        }
    }

    self.videoTimeout = function(url){
        if (url === self.currentVideo().url){
            self.score.badAnswers++;
            self.nextVideo();
        }        
    }

    self.pauseVideo = function(){
        var video = document.getElementById('davideo');
        video.pause();
        self.stopTimer()
    }

    self.playReactionVideo = function(callback){
        var video = document.getElementById('reaction_video');
        video.play();     
        video.onended = callback;   
    }

    self.buttons = [];
    for (var i=1; i<15; i++){
        self.buttons.push('img/button'+i+'.png');
    }
    randomize(self.buttons);

    function randomize(array){
        array.sort(function(){
            return Math.random()>0.5?1:-1;
        });
    }

    setInterval(function(){
        if (self.timerRunning){
            if (self.currentTime >= 0){                
                self.timerText(self.currentTime);
                self.currentTime = self.currentTime - 1;
            }
            else {
                // if (!self.showNext() && !self.showResults()){
                //     self.fail();                                        
                // }            
                // self.timerText(':(');    
                self.timerText('')   ;
                self.showScore(stringifyScore(self.score));
                $('.score-screen').css('top', '-100%').animate({top:0}, 500);                
                self.showGuesses(false);
                self.pauseVideo();

                self.timerRunning = false;

            }            
        }    
    },1000)

    function stringifyScore(score){
        var ret = ''
        Object.keys(score).map(function(key){
            ret += langs[self.lang()][key] +': ' + score[key] + '\n';
        })
        return ret;
    }

    // self.loadVideo(0);

    window.onerror = function(e){
        self.error(e.message);
    };    
}

ko.applyBindings(new ViewModel());

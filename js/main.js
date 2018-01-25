
var ViewModel = function(){
    
    var self = window.app = this;    

    var timeToGuess = 60; // Seconds
    var timeToWaitTillCountownStarts = 1000;

    self.videoParams = '?autoplay=1&showinfo=0&rel=0&controls=0';    

    self.currentVideoIndex = ko.observable(0);
    // randomize(videos);
    self.videos = ko.observable(videos);
    self.currentVideo = ko.observable();
    self.timerText = ko.observable();
    self.timerStartDate = new Date();
    self.error = ko.observable();
    self.showResults = ko.observable();
    self.showNext = ko.observable();
    self.showReaction = ko.observable();
    self.badMarkers = ['img/bad1.png','img/bad2.png','img/bad3.png']

    self.otherLanguages = ['', 'ENG'];    

    self.lang = ko.observable('');
    
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
        
        if (userGuess.correct){            
            self.playHappy();
            self.success();      
        }
        else{
            var guessedNumberFar = self.currentVideo()
                .optionButtons.filter(function(button){
                    return button.guessed();
                }).length;
            if (self.currentVideo().optionButtons.length-guessedNumberFar < 2){
                self.fail();
            }
            self.playSad(function(){            
                self.showReaction(false);        
                self.startVideo();            
            });
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

        self.stopTimer();
        
        self.currentTime = video.time || timeToGuess
        self.timerText(self.currentTime);

        setTimeout(function(){
            self.startVideo()
            self.startTimer();
        }, timeToWaitTillCountownStarts);
        
        self.currentVideo(video);
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
    self.startTimer = function(){ self.timerRunning = true; }

    self.startVideo = function(){
        var video = document.getElementById('davideo');
        if (!video.ended){
            video.play();
        }        
        self.timerRunning = true;
    }
    self.pauseVideo = function(){
        var video = document.getElementById('davideo');
        video.pause();
        self.timerRunning = false;
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
                if (!self.showNext() && !self.showResults()){
                    self.fail();                                        
                }            
                self.timerText(':(');                
                self.timerRunning = false;
            }            
        }    
    },1000)

    self.loadVideo(0);

    window.onerror = function(e){
        self.error(e.message);
    };    
}

ko.applyBindings(new ViewModel());

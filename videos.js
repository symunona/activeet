var videos = [
    {
        "url": "videos/mutogatas_01_bujocska.mp4",
        "options": ["bújocska", "kincskereső", "elveszett"],
        "optionsENG": ["hide and seek", "explorer", "lost"],
        "correct": "bújocska",        
        "time": 25
    },    
    {
        "url": "videos/mutogatas_02_dama.mp4",
        "options": ["dáma", "vajaskenyér", "magasélet"],
        "optionsENG": ["dama", "butter bread", "high life"],
        "correct": "dáma",        
        "time": 25
    },
    {
        "url": "videos/mutogatas_03_homokora.mp4",
        "options": ["homokóra", "péklapát", "palacsintázó"],
        "optionsENG": ["sand glass", "baker tray", "crepe place"],
        "correct": "homokóra",
        "time": 30
    },
    {
        "url": "videos/mutogatas_04_verseny.mp4",
        "options": ["futás", "csúfolódás", "verseny"],
        "optionsENG": ["running", "bullying", "race"],
        "correct": "verseny",
        "time": 15
    },
    {
        "url": "videos/mutogatas_05_sakkmatt.mp4",
        "options": ["sakk-matt", "Szécheny fürdő", "játék határok nélkül"],
        "optionsENG": ["check mate", "Szécheny bath", "Jeux Sans Frontières"],
        "correct": "sakk-matt",
        "time": 25
    },
    {
        "url": "videos/mutogatas_06_lolepes.mp4",
        "options": ["lólépés", "látens", "létra"],
        "optionsENG": ["horse jump", "latent", "ladder"],
        "correct": "lólépés",
        "time": 15
    },
    {
        "url": "videos/mutogatas_07_oroszrulett.mp4",
        "options": ["oroszrulett", "pisztoly", "optimizmus"],
        "optionsENG": ["russian rulett", "pistol", "optimism"],
        "correct": "oroszrulett",
        "time": 20
    },
    {
        "url": "videos/mutogatas_08_szabaduloszoba.mp4",
        "options": ["szabadulószoba", "szenvedéstörténet", "kínzókamra"],
        "optionsENG": ["escape room", "crucification", "torture chamber"],
        "correct": "szabadulószoba",
        "time": 30
    },
    {
        "url": "videos/mutogatas_09_twister.mp4",
        "options": ["twister", "gabalyodás", "építkezés"],
        "optionsENG": ["twister", "tangle", "construction"],
        "correct": "twister",
        "time": 30
    },
    {
        "url": "videos/mutogatas_10_pokerarc.mp4",
        "options": ["pókerarc", "robot", "koncentráció"],
        "optionsENG": ["poker face", "robot", "concentration"],
        "correct": "pókerarc",
        "time": 20
    },
    {
        "url": "videos/mutogatas_11_parnacsata.mp4",
        "options": ["párnacsata", "pizsiparty", "káosz"],
        "optionsENG": ["pillow fight", "pijama party", "chaos"],
        "correct": "párnacsata",
        "time": 30
    },
    {
        "url": "videos/mutogatas_12_kinevetavegen.mp4",
        "options": ["kinevetavégén", "önértékelés", "hamis tanúzás"],
        "optionsENG": ["who laughs at the end", "self esteem", "lying under oath"],
        "correct": "kinevetavégén",
        "time": 25
    },
    
    {
        "url": "videos/rajz_01_pokerarc.mp4",
        "options": ["pókerarc", "hamiskártyás", "kártyatrükk"],
        "optionsENG": ["poker face", "rook", "card trick"],
        "correct": "pókerarc",
        "time": 50
    },
    {
        "url": "videos/rajz_02_kibic.mp4",
        "options": ["kibic", "póker asztal", "díler"],
        "optionsENG": ["cheater", "poker table", "dealer"],
        "correct": "kibic",
        "time": 60
    },
    {
        "url": "videos/rajz_03_lolepes.mp4",
        "options": ["lólépés", "ügetés", "szamárfüles"],
        "optionsENG": ["horse jump", "trot", "dog-eared"],
        "correct": "lólépés",
        "time": 60
    },
    {
        "url": "videos/rajz_04_libajatek.mp4",
        "options": ["libajáték", "kacsamell", "madárlátta"],
        "optionsENG": ["goose game", "duck breast", "birdwatch"],
        "correct": "libajáték",
        "time": 60
    },
    {
        "url": "videos/rajz_05_bujocska.mp4",
        "options": ["bújócska", "mikrofonpróba", "mérnök"],
        "optionsENG": ["hide and seek", "microphone test", "engineer"],
        "correct": "bújócska",
        "time": 50
    },
    {
        "url": "videos/rajz_06_kinevetavegen.mp4",
        "options": ["kinevetavégén", "hétfő", "eufória"],
        "optionsENG": ["who laughs at the end", "Monday", "euphoria"],
        "correct": "kinevetavégén",
        "time": 50
    },
    {
        "url": "videos/rajz_07_szerencsekartya.mp4",
        "options": ["szerencsekártya", "növénytan", "magyar kártya"],
        "optionsENG": ["lucky card", "plants", "Hungarian cards"],
        "correct": "szerencsekártya",
        "time": 50
    },
    {
        "url": "videos/rajz_08_oroszrulett.mp4",
        "options": ["oroszrulett", "összeesküvéselmélet", "casino"],
        "optionsENG": ["russian rulett", "conteo", "casino"],
        "correct": "oroszrulett",
        "time": 50
    },
    {
        "url": "videos/rajz_09_sakkmatt.mp4",
        "options": ["sakk-matt", "túlsúly", "nyugdíjas klub"],
        "optionsENG": ["check mate", "obesity", "social club"],
        "correct": "sakk-matt",
        "time": 50
    },
    {
        "url": "videos/rajz_10_hamiskartyas.mp4",
        "options": ["hamiskártyás", "póker", "kerekasztal"],
        "optionsENG": ["rook", "poker", "round table"],
        "correct": "hamiskártyás",
        "time": 50
    }
];

var reactions = {
    happy: [
        "videos/reactions/mutogatas__orom_01.mp4",
        "videos/reactions/mutogatas__orom_03.mp4",
        "videos/reactions/mutogatas__orom_04.mp4"
    ],
    sad: [
        "videos/reactions/mutogatas__szomoru_01.mp4",
        "videos/reactions/mutogatas__szomoru_02.mp4",
        "videos/reactions/mutogatas__szomoru_03.mp4"
    ]
};
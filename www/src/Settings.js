
BasicGame.Settings = function (game) {

};

BasicGame.Settings.prototype = {

    
    init: function() {
        
        this.world.alpha = 1;

        //draw board in LevelDesign.js
        GenericLevel(this);
        lightsOut(this);
        placeLogo(this);
        
        var scaleFactor = this.game.btnWidth/535; //535 width of buttons
        
        var playerBtn = createButton('mainMenuBtn', 0, this.backToMainMenu, this);
        var playerBtn = createButton('numPlayers', 1, this.changePlayer, this);
        var musicBtn = createButton('musicToggle', 2, this.changeMusic, this);
        var difficultyBtn = createButton('difficultyBtn', 3, this.changeDifficulty, this);
        
        if(this.game.music){
                musicBtn.frame=0;
        }else{
                musicBtn.frame=1;
        }
        playerBtn.frame = this.game.numPlayers-1;
        
        
    
    },
    
    
	create: function () {
	},

	update: function () {

		//	Do some nice funky main menu effect here

	},
    changePlayer: function(btn){
        console.log(btn);
        this.game.numPlayers +=1;
        BasicGame.isOnePlayer = false;
        if(this.game.numPlayers == 5){
            this.game.numPlayers = 1;
            BasicGame.isOnePlayer = true;
        }
        btn.frame = this.game.numPlayers - 1;
    },
    
    changeMusic: function(btn){
            if(this.game.music){
                BasicGame.backgroundMusic.stop();
                this.game.music = false;
                btn.frame=1;
            }else{
                BasicGame.backgroundMusic.play();
                this.game.music = true;
                btn.frame=0;
            }
    },
    changeDifficulty: function(btn){
        BasicGame.difficulty = (BasicGame.difficulty+=1)%3;
        btn.frame=BasicGame.difficulty;
    },

	startGame: function (btn) {
        this.game.state.start('Game');
		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		//this.music.stop();

	},
    
    
    backToMainMenu: function (btn) {
        this.game.state.start('MainMenu');
    },
    

};
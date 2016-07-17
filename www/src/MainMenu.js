
BasicGame.MainMenu = function (game) {

};

BasicGame.MainMenu.prototype = {

    
    init: function() {
        
        this.world.alpha = 1;

        //draw board in LevelDesign.js
        GenericLevel(this);
        
        //lights out on board?
        this.mnuBackground = this.add.sprite(0,0,'gameMenuBackground');
        this.mnuBackground.width = this.world.width;
        this.mnuBackground.height = this.world.height;
        this.mnuBackground.alpha = 0.75;
        // end lights out

        // Air Hockey Logo at top
        var splash = this.cache.getImage('preloaderBackground');
        var splashSprite = this.add.sprite(0,0,'preloaderBackground');
        splashSprite.x=this.world.centerX - splash.width/2;
        splashSprite.y=0;
        
        var scaleFactor = this.game.btnWidth/535; //535 width of buttons
        
        var pb = this.cache.getImage('playBtn');
        var playButton = this.add.button(0,0, 'playBtn', this.startGame, this);
        playButton.width = this.game.btnWidth;
        playButton.height = pb.height*scaleFactor;
        playButton.anchor.setTo(0.5,0.5);
        playButton.x=this.world.centerX;
        playButton.y=splashSprite.height+10;
        
        var npb = this.cache.getImage('numPlayers');
        this.numPlayersButton = this.add.button(0,0, 'numPlayers', this.changePlayer, this);
        this.numPlayersButton.width = this.game.btnWidth;
        this.numPlayersButton.height = npb.height*scaleFactor;
        this.numPlayersButton.anchor.setTo(0.5,0.5);
        this.numPlayersButton.x=this.world.centerX;
        this.numPlayersButton.y=playButton.y+playButton.height;
        this.numPlayersButton.frame = this.game.numPlayers-1;
        
        var mb = this.cache.getImage('musicToggle');
        this.musicButton = this.add.button(0,0, 'musicToggle', this.changeMusic, this);
        this.musicButton.width = this.game.btnWidth;
        this.musicButton.height = mb.height*scaleFactor;
        this.musicButton.anchor.setTo(0.5,0.5);
        this.musicButton.x=this.world.centerX;
        this.musicButton.y=this.numPlayersButton.y+this.numPlayersButton.height;
        if(this.game.music){
                this.musicButton.frame=0;
        }else{
                this.musicButton.frame=1;
        }

        var ab = this.cache.getImage('aboutBtn');
        var aboutButton = this.add.button(0,0, 'aboutBtn', this.aboutGame, this);
        aboutButton.width = this.game.btnWidth;
        aboutButton.height = ab.height*(aboutButton.width/ab.width);
        aboutButton.anchor.setTo(0.5,0.5);
        aboutButton.x=this.world.centerX;
        aboutButton.y=this.musicButton.y+this.musicButton.height;
      
    },
    
    
	create: function () {
	},

	update: function () {

		//	Do some nice funky main menu effect here

	},
    changePlayer: function(){
        this.game.numPlayers +=1;
        if(this.game.numPlayers == 5)
            this.game.numPlayers = 1;
        this.numPlayersButton.frame = this.game.numPlayers -1;
    
    },
    changeMusic: function(){
            if(this.game.music){
                BasicGame.backgroundMusic.stop();
                this.game.music = false;
                this.musicButton.frame=1;
            }else{
                BasicGame.backgroundMusic.play();
                this.game.music = true;
                this.musicButton.frame=0;
            }
    
    },

	startGame: function (btn) {
        
        this.game.state.start('Game');

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		//this.music.stop();

	},
    
    aboutGame: function (btn) {
        
        this.game.state.start('About');

	}

};
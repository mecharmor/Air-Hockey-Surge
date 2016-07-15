
BasicGame.MainMenu = function (game) {

};

BasicGame.MainMenu.prototype = {

    
    init: function() {
        
        this.world.setBounds(0,0,window.innerWidth, window.innerHeight);
        this.world.alpha = 1;
        this.game.numPlayers = 1;
        
        //draw board in LevelDesign.js
        GenericLevel(this);
        
        //lights out on board?
        this.mnuBackground = this.add.sprite(0,0,'gameMenuBackground');
        this.mnuBackground.width = this.world.width;
        this.mnuBackground.height = this.world.height;
        this.mnuBackground.alpha = 0.75;
        // end lights out

        // Splash centered and scaled in the top half of screen
        var splash = this.cache.getImage('preloaderBackground');
        var splashSprite = this.add.sprite(0,0,'preloaderBackground');
        splashSprite.anchor.setTo(0.5, 0.5);
        splashSprite.y=this.world.centerY/2;
        splashSprite.x=this.world.centerX;
        
        var btnWidth = this.world.width/2;
        if(btnWidth>535) btnWidth=535;
        if(btnWidth<223) btnWidth=223; //223 width of spash screen this is min value
        var scaleFactor = btnWidth/535; //535 width of buttons
        var spacing = 20;
        
        //play button
        var pb = this.cache.getImage('playBtn');
        var playButton = this.add.button(0,0, 'playBtn', this.startGame, this);
        playButton.width = btnWidth;
        playButton.height = pb.height*scaleFactor;
        playButton.anchor.setTo(0.5,0.5);
        playButton.x=this.world.centerX;
        playButton.y=this.world.centerY+playButton.height/2;
        
        //num players button
        var npb = this.cache.getImage('numPlayers');
        this.numPlayersButton = this.add.button(0,0, 'numPlayers', this.changePlayer, this);
        this.numPlayersButton.width = btnWidth;
        this.numPlayersButton.height = npb.height*scaleFactor;
        this.numPlayersButton.anchor.setTo(0.5,0.5);
        this.numPlayersButton.x=this.world.centerX;
        this.numPlayersButton.y=playButton.y+playButton.height;
        
        //music button
        var mb = this.cache.getImage('musicToggle');
        this.musicButton = this.add.button(0,0, 'musicToggle', this.changeMusic, this);
        this.musicButton.width = btnWidth;
        this.musicButton.height = mb.height*scaleFactor;
        this.musicButton.anchor.setTo(0.5,0.5);
        this.musicButton.x=this.world.centerX;
        this.musicButton.y=this.numPlayersButton.y+this.numPlayersButton.height;


        //about Button
        var ab = this.cache.getImage('aboutBtn');
        var aboutButton = this.add.button(0,0, 'aboutBtn', this.aboutGame, this);
        aboutButton.width = btnWidth;
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
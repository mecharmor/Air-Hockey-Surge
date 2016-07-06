
BasicGame.MainMenu = function (game) {

};

BasicGame.MainMenu.prototype = {

    
    init: function() {
        
        this.world.setBounds(0,0,window.innerWidth, window.innerHeight);
        this.world.alpha = 1;
        
        //draw board
        GenericLevel(this);
        
        //lights out on board?
        this.mnuBackground = this.add.sprite(0,0,'gameMenuBackground');
        this.mnuBackground.width = this.world.width;
        this.mnuBackground.height = this.world.height;
        this.mnuBackground.alpha = 0.75;
        // end lights out

        var splash = this.cache.getImage('preloaderBackground');
        this.add.sprite(this.world.centerX-splash.width/2.0, 20, 'preloaderBackground');
        
        //These are phaser buttons when clicked methods called
        this.pb = this.add.button(this.world.centerX-85, 200, 'numPlayers',this.changePlayer, this);
        this.mb = this.add.button(this.world.centerX-25, 200, 'musicToggle',this.changeMusic, this);
        this.playbtn = this.add.button(this.world.centerX+35, 200, 'playBtn', this.startGame, this);
        
        var abt = this.cache.getImage('aboutBtn');
        var scaleFactor = (this.world.width/3)/abt.width;  // new width div old width
        this.aboutbtn = this.add.button(10, 10, 'aboutBtn', this.aboutGame, this);
        this.aboutbtn.scale.setTo(scaleFactor,scaleFactor);
        this.aboutbtn.x = this.world.centerX-this.aboutbtn.width/2;
        this.aboutbtn.y = 300;
    
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
        this.pb.frame = this.game.numPlayers -1;
    
    },
    changeMusic: function(){
            if(this.game.music){
                BasicGame.backgroundMusic.stop();
                this.game.music = false;
                this.mb.frame=1;
            }else{
                BasicGame.backgroundMusic.play();
                this.game.music = true;
                this.mb.frame=0;
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
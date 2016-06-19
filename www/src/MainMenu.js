
BasicGame.MainMenu = function (game) {

};

BasicGame.MainMenu.prototype = {

    
    init: function() {
        GenericLevel(this);
        var splash = this.cache.getImage('preloaderBackground');
        this.add.sprite(this.world.centerX-splash.width/2.0, 50, 'preloaderBackground');
        
        //These are phaser buttons when clicked methods called
        this.pb = this.add.button(this.world.centerX-85, 200, 'numPlayers',this.changePlayer, this);
        this.mb = this.add.button(this.world.centerX-25, 200, 'musicToggle',this.changeMusic, this);
        this.playbtn = this.add.button(this.world.centerX+35, 200, 'playBtn', this.startGame, this);
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

	}

};
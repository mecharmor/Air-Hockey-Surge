
BasicGame.MainMenu = function (game) {

};

BasicGame.MainMenu.prototype = {

    
    init: function() {
        var graphics = this.add.graphics(0, 0);
		graphics.beginFill(0xc0c0c0,0);
		graphics.lineStyle(4, 0xD62D20, 0.5);
        
        //draw centerline top to bottom
		graphics.moveTo(this.world.centerX,0);
        graphics.lineTo(this.world.centerX, this.world.height); 
		//graphics.moveTo(this.world.centerX, this.world.centerY+this.world.width/6);
		//graphics.lineTo(this.world.centerX, this.world.height-100);
    },
    
    
	create: function () {
               
       //background to look like air hockey table
        this.add.tileSprite(0, 0, this.world.width, this.world.height, 'airhole');
        var splash = this.cache.getImage('preloaderBackground');
        this.add.sprite(this.world.centerX-splash.width/2.0, 50, 'preloaderBackground');
        
		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	We can make this look better

		//this.music = this.add.audio('titleMusic');
		//this.music.play();

		//These are phaser buttons when clicked methods called
        this.pb = this.add.button(this.world.centerX-85, 200, 'numPlayers',this.changePlayer, this);
        this.mb = this.add.button(this.world.centerX-25, 200, 'musicToggle',this.changeMusic, this);
        this.playbtn = this.add.button(this.world.centerX+35, 200, 'playBtn', this.startGame, this);
        
      
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
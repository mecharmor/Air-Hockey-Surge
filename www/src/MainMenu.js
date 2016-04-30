
BasicGame.MainMenu = function (game) {

	//this.music = null;
	//this.playButton = null;

};

BasicGame.MainMenu.prototype = {

	create: function () {
               
       //background to look like air hockey table
        this.add.tileSprite(0, 0, this.world.width, this.world.height, 'airhole');
        var tmpImg1 = this.cache.getImage('preloaderBackground');
        var tmpImg2 = this.cache.getImage('players');
        this.add.sprite(this.world.centerX-tmpImg1.width/2.0, 20, 'preloaderBackground');
        
        
		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

		//this.music = this.add.audio('titleMusic');
		//this.music.play();

		//this.add.sprite(0, 0, 'titlepage');
        this.pb = this.add.button(this.world.centerX-85, 150, 'numPlayers',this.changePlayer, this);
        this.mb = this.add.button(this.world.centerX-25, 150, 'musicToggle',this.changeMusic, this);
        this.playbtn = this.add.button(this.world.centerX+35, 150, 'button4', this.startGame, this);
        
      
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
                this.game.music = false;
                this.mb.frame=1;
            }else{
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
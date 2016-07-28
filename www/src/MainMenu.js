
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
        
        
        

        
    },
    
    
	create: function () {
	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	startGame: function (btn) {
        
        this.game.state.start('Game');

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		//this.music.stop();

	},
    settings: function(btn) {
    
        this.game.state.start('Settings');
    
    },
    aboutGame: function (btn) {
        
        this.game.state.start('About');

	},

    


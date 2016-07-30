
BasicGame.MainMenu = function (game) {

};

BasicGame.MainMenu.prototype = {

    
    init: function() {
                
        this.world.alpha = 1;

        //draw board in LevelDesign.js
        GenericLevel(this);
        lightsOut(this);
        placeLogo(this);
        
        //var scaleFactor = this.game.btnWidth/535; //535 width of buttons
        
        var test = createButton('playBtn', 0, this.startGame, this);
        var test2 = createButton('settingsBtn', 1, this.settings, this);
        var test3 = createButton('aboutBtn',2, this.aboutGame, this);     

        
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

};


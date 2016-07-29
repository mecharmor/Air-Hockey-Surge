
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
        
        var sb = this.cache.getImage('settingsBtn');
        var settingsButton = this.add.button(0,0, 'settingsBtn', this.settings, this);
        settingsButton.width = this.game.btnWidth;
        settingsButton.height = sb.height * (settingsButton.width/sb.width);
        settingsButton.anchor.setTo(0.5,0.5);
        settingsButton.x = this.world.centerX;
        settingsButton.y=playButton.y+playButton.height;
        
        var ab = this.cache.getImage('aboutBtn');
        var aboutButton = this.add.button(0,0, 'aboutBtn', this.aboutGame, this);
        aboutButton.width = this.game.btnWidth;
        aboutButton.height = ab.height*(aboutButton.width/ab.width);
        aboutButton.anchor.setTo(0.5,0.5);
        aboutButton.x=this.world.centerX;
        aboutButton.y=settingsButton.y+settingsButton.height;

        
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


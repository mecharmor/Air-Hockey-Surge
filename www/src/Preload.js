
BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

};

BasicGame.Preloader.prototype = {

	preload: function () {
        
        lightsOut(this);
        placeLogo(this);
        
        var bar = this.cache.getImage('preloaderBar');
		this.preloadBar = this.add.sprite(this.world.centerX-bar.width/2.0, this.world.centerY, 'preloaderBar');
		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);

		//	Here we load the rest of the assets our game needs.
        this.load.image('Watermark', 'asset/AirHockeyWatermark.png')
        this.load.image('puck', 'asset/Surge_Puck.png');
        this.load.image('paddleR', 'asset/RedPuck_ooohShiny.png');//newPaddle.png');
        this.load.image('paddleB', 'asset/BluePuck_ooohShiny.png');//newPaddleBlue.png');
        this.load.image('goalBlue', 'asset/Goal_blue.png');
        this.load.image('goalRed', 'asset/Goal_red.png');
        this.load.image('airhole', 'asset/hole4.png');
        //main menu
        this.load.image('playBtn', 'asset/play_new-red.png');
        this.load.image('settingsBtn', 'asset/gameMenu-setttings-red.png');
        this.load.image('aboutBtn', 'asset/gameMenu-about-red.png');
        //settings menu
        this.load.image('mainMenuBtn', 'asset/gameMenu-main.png');
        this.load.image('mainMenu', 'asset/buttons.png');
        this.load.spritesheet('numPlayers', 'asset/players_sprite.png',535,107,4);
        this.load.spritesheet('difficultyBtn', 'asset/difficulty.png',535,107,3);
        
        //in game menu
        this.load.image('gameContinueBtn', 'asset/gameMenu-continue.png');
        this.load.image('gameMenuQuitBtn', 'asset/gameMenu-quit-red.png');
        
        //this.load.image('mainMenuBtnBlue', 'asset/gameMenu-main-blue.png');
        //this.load.image('gameMenuBackground', 'asset/gameMenu-background.png');
        
        // spritesheets are loading in with frame rectangles and number of frames
        this.load.spritesheet('numPlayers', 'asset/players_sprite.png',535,107,4);
        this.load.spritesheet('musicToggle', 'asset/music_sprite.png',535,107,2);

        // loading in audio assets here... keep as wav to save loading times if poss.
		this.load.audio('puckHitSnd', ['asset/button-16.wav']);
        this.load.audio('whooshSnd', ['asset/whip-whoosh-03.wav']);
        this.load.audio('gameMusic', ['asset/Burner.mp3']);

	},

	create: function () {
        //empty but might make game board lines here later

	},

	update: function () {
        
        //  This slows down the startup alot because mp3 has to decode (we should use wav files)
        
        
		if (this.cache.isSoundDecoded('gameMusic'))
		{
            //set global background music here
            BasicGame.backgroundMusic = this.add.audio('gameMusic');
            BasicGame.backgroundMusic.volume = 0.75;
            BasicGame.backgroundMusic.loop = true;
            BasicGame.backgroundMusic.play();
            //BasicGame.backgroundMusic.stop();
            this.game.state.start('MainMenu');
		}

	}

};

BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

};

BasicGame.Preloader.prototype = {

	preload: function () {

		//	These are the assets we loaded in Boot.js
        var splash = this.cache.getImage('preloaderBackground');
        var bar = this.cache.getImage('preloaderBar');
        // placing splash background as a sprite in the middle of the page 50 px from top
        this.splashGraphic = this.add.sprite(this.world.centerX-splash.width/2.0, 50, 'preloaderBackground');
		//adding the preloader bar as sprite in the middle 200 px from top
		this.preloadBar = this.add.sprite(this.world.centerX-bar.width/2.0, 200, 'preloaderBar');

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);

		//	Here we load the rest of the assets our game needs.
		//	As this is just a Project Template I've not provided these assets
        this.load.image('puck', 'asset/puckYellow.png');
        this.load.image('paddleR', 'asset/air_hockey_photoshop/Normal/RedPuck_ooohShiny.png');//newPaddle.png');
        this.load.image('paddleB', 'asset/air_hockey_photoshop/Normal/BluePuck_ooohShiny.png');//newPaddleBlue.png');
        this.load.image('goalBottom', 'asset/blueGoal.png');
        this.load.image('goalTop', 'asset/redGoal.png');
        this.load.image('airhole', 'asset/hole4.png');
        //this.load.image('players', 'asset/players.png');
        //this.load.image('button1', 'asset/button1.png');
        //this.load.image('button2', 'asset/button2.png');
        //this.load.image('button3', 'asset/button3.png');
        this.load.image('playBtn', 'asset/play.png');
        //this.load.image('musicOn', 'asset/musicOn1.png');
        this.load.image('mainMenu', 'asset/buttons.png');
        // spritesheets are loading in with viewing rectangles and number of views
        this.load.spritesheet('numPlayers', 'asset/numPlayers3.png',50,50,4);
        this.load.spritesheet('musicToggle', 'asset/music.png',50,50,2);

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
            BasicGame.backgroundMusic.volume = 0.3;
            BasicGame.backgroundMusic.loop = true;
            BasicGame.backgroundMusic.play();
            //BasicGame.backgroundMusic.stop();
            this.game.state.start('MainMenu');
		}

	}

};
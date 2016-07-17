/* jshint browser:true */
// create BasicGame Class
BasicGame = {

    /* Here we've just got some global level vars that persist regardless of State swaps */
    /* access globals using syntax: BasicGame.score anywhere in app  */
    score: 0,
    backgroundMusic: null, //bacground music will be global set in next state
    music: true, //start with music on
    numPlayers: 1,
    btnWidth: 0,
    
};

BasicGame.Boot = function (game) {
    
};

BasicGame.Boot.prototype = {

    init: function () {
        
        this.input.maxPointers = 4;
        // Two pointers default but I think one is mousepointer
        this.input.addPointer();  // 3rd pointer
        this.input.addPointer();  // 4th pointer
        this.input.addPointer();  // 5th pointer

       // this.stage.disableVisibilityChange = true;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        //this.scale.setResizeCallback(this.gameResized, this);
        
        // global button width
        this.game.btnWidth = this.world.width/3;
        if(this.game.btnWidth>300) this.game.btnWidth=300;
        if(this.game.btnWidth<200) this.game.btnWidth=200; //min-value
        
        this.stage.backgroundColor = '#fff';

//        if (this.game.device.desktop)
//        {
//            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
//            //this.scale.setMinMax(480, 260, 1024, 768);
//            this.scale.pageAlignHorizontally = true;
//            this.scale.pageAlignVertically = true;
//        }
//        else
//        {
//            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
//            this.scale.pageAlignHorizontally = true;
//            this.scale.pageAlignVertically = true;
//            this.scale.forceOrientation(false, true);  //portrait game
//
//        }
        
    },

    preload: function () {

        //  Here we load the assets required for our preloader (in this case a background and a loading bar)
        // We will preload all game assets in the next game state.
       
        this.load.image('preloaderBackground', 'asset/AirHockeySplashscreen.png');
        this.load.image('preloaderBar', 'asset/preloader-bar.png');

    },

    create: function () {

        this.state.start('Preload');

    },

    gameResized: function (width, height) {
        

        //  This could be handy if you need to do any extra processing if the game resizes.
        //  A resize could happen if for example swapping orientation on a device or resizing the browser window.
        //  Note that this callback is only really useful if you use a ScaleMode of RESIZE and place it inside your main game state.
        // I have no idea how to do this yet!!  So just don't resize this game.  easy.

    },

    enterIncorrectOrientation: function () {

        BasicGame.orientated = false;

        document.getElementById('orientation').style.display = 'block';

    },

    leaveIncorrectOrientation: function () {

        BasicGame.orientated = true;

        document.getElementById('orientation').style.display = 'none';

    }

};

/*global BasicGame:true,Phaser:true*/
BasicGame.About = function (game) {

};

BasicGame.About.prototype = {

    create: function () {   

        this.holdHeight = this.world.height;
        this.world.setBounds(0,0,this.world.width,1500);

                //awesome plugin I found...
        this.kineticScrolling = this.game.plugins.add(Phaser.Plugin.KineticScrolling);
        this.kineticScrolling.configure({
            kineticMovement: true,
            timeConstantScroll: 325, //really mimic iOS
            horizontalScroll: false,
            verticalScroll: true,
            horizontalWheel: false,
            verticalWheel: true,
            deltaWheel: 40
        });
        this.kineticScrolling.start();
        
        GenericLevel(this);
        lightsOut(this);
        placeLogo(this);
        
        var scaleFactor = this.game.btnWidth/535; //535 width of buttons
        this.backMain = this.add.button(10,10,'mainMenuBtn',this.backToMainMenu,this);
        this.backMain.scale.setTo(scaleFactor,scaleFactor);
        this.backMain.x = this.world.centerX-this.backMain.width/2;
        this.backMain.y = this.splashSprite.height;
        //instructions
        var instructionsStr = "A COS SETA SURGE project.";
        
        var text1 = this.add.text(this.world.centerX, this.backMain.y+this.backMain.height, instructionsStr, {
			fontFamily:	"arial",
			fontSize:	"14px",
            fill: "white",
		});
        text1.x=this.world.centerX-text1.width*0.5;
        //****************************************
        
        var groupPhoto = this.cache.getImage('groupPhoto');
        this.groupPhoto = this.add.sprite(0,0,'groupPhoto');
        this.groupPhoto.scale.setTo(.25,.25);
        this.groupPhoto.x=this.world.centerX - groupPhoto.width/8;
        this.groupPhoto.y=300;
        // developers
        var devStyle = {
            font:	"14px Courier New",
            align: "center",
            fill: "white"
        };
        var creditStr = "***********************\n"+
                        "College of the Sequoias\n"+
                        "SURGE Developers\n"+
                        "***********************\n";
        var text2 = this.add.text(this.world.centerX, 480, creditStr, devStyle);
        text2.x=this.world.centerX-text2.width*0.5;
        //****************************************
        
        var creditNamesStr = "cory L\n<cjl9703@yahoo.com>\n"+
        	                   "Paul Gonzalez-Becerra\n<pgonzbecer@gmail.com>\n"+
                                "Gerald Jumper\n<geraldj@cos.edu>\n"+
                                "Martin Garcia\n<mgarcia314159@gmail.com>\n"+
                                "Matthew Machado\n<matthew.machado@giant.cos.edu>\n"+
                                "Graham Frazier\n<graham.frazier@giant.cos.edu>\n"+
                                "Larry Owens\n<larryo@cos.edu>\n"+
                                "John Redden\n<jtredden@gmail.com>\n"
        
        var creditsTxt = this.add.text(0, 560, creditNamesStr, devStyle);
        creditsTxt.x=this.world.centerX-creditsTxt.width*0.5;
        //this.add.image(this.world.centerX, 540, 'cory').anchor.setTo(.5);
        
        
        var specialStr = "***********************\n"+
                        "Special Thanks to:\n"+
                        "Duane Goodwin\n<duaneg@cos.edu>\n"+
                        "***********************\n";
        var text5 = this.add.text(this.world.centerX, 900, specialStr, devStyle);
        text5.x=this.world.centerX-text5.width*0.5;
                
    },

    update: function () {

        //	Do some nice funky main menu effect here

    },
    

    backToMainMenu: function (btn) {
        this.world.setBounds(0,0,this.world.width,this.holdHeight);
        this.game.state.start('MainMenu');

    }


};
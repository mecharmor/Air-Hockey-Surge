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
        this.groupPhoto.y=350;
        // developers
        var devStyle = {
            font:	"14px Courier New",
            align: "center",
            fill: "white"
        };
        var creditStr = "College of the Sequoias\n"+
                        "SURGE Developers\n"+
                        "***********************\n";
        var text2 = this.add.text(this.world.centerX, 480, creditStr, devStyle);
        text2.x=this.world.centerX-text2.width*0.5;
        //****************************************
        
        var creditNamesStr =    "Cory Lewis: cjl9703@yahoo.com\n\n"+
        	                    "Paul Gonzalez-Becerra: pgonzbecer@gmail.com\n\n"+
                                "Gerald Jumper: geraldj@cos.edu\n\n"+
                                "Martin Garcia: mgarcia314159@gmail.com\n\n"+
                                "Matthew Machado: matthew.machado@giant.cos.edu\n\n"+
                                "Graham Frazier: graham.frazier@giant.cos.edu\n\n\n"+
                                "Larry Owens: larryo@cos.edu\n\n"+
                                "John Redden: jtredden@gmail.com\n\n"
        
        var creditsTxt = this.add.text(0, 560, creditNamesStr, devStyle);
        creditsTxt.x=this.world.centerX-creditsTxt.width*0.5;
        //this.add.image(this.world.centerX, 540, 'cory').anchor.setTo(.5);
        
        
        var specialStr = "***********************\n"+
                        "Special Thanks To:\n"+
                        "Duane Goodwin: duaneg@cos.edu\n";
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
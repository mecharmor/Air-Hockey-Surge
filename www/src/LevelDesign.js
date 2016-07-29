//This JS file is used to store different level designs

//pass 'this' to the level design functions so you can paint to the screen.
function GenericLevel(me){
    
    
    if(BasicGame.isPortrait){
        var Watermark = me.cache.getImage('Watermark');
        var goalCircleD = me.world.width*2/5; //to change the diameter of the circles
        var centerCircleD = me.world.height/3;
        
        watermarkSprite = me.add.sprite(0, 0, 'Watermark');
        watermarkSprite.width = me.world.width/3.2;
        watermarkSprite.height = me.world.width/(3.2*2);  // to keep aspect ratio 2:1
        watermarkSprite.x = me.world.centerX-watermarkSprite.width/2;
        watermarkSprite.y = me.world.centerY-watermarkSprite.height/2;
        watermarkSprite.alpha = 0.40;  //transparancy as a percentage
        me.game.watermarkSize = watermarkSprite.height;

        //background to look like air hockey table
        me.add.tileSprite(0, 0, me.world.width, me.world.height, 'airhole');

        //draw the board
        var graphics = me.add.graphics(0, 0);
        graphics.beginFill(0xc0c0c0,0);
        graphics.lineStyle(4, 0xff7332, 0.5);

        //draw centerline top to bottom
        graphics.moveTo(me.world.centerX, goalCircleD/2); //top line
        graphics.lineTo(me.world.centerX, me.world.centerY-centerCircleD/2); 
        graphics.moveTo(me.world.centerX, me.world.centerY+centerCircleD/2);
        graphics.lineTo(me.world.centerX, me.world.height-goalCircleD/2); //bottom line

        //centerlines left to right
        graphics.moveTo(0, me.world.centerY);
        graphics.lineTo(me.world.width/2 -centerCircleD/2, me.world.centerY); 
        graphics.moveTo(me.world.width/2 +centerCircleD/2, me.world.centerY);
        graphics.lineTo(me.world.width, me.world.centerY);

        //Draw circles
        graphics.drawCircle(me.world.centerX, me.world.centerY, centerCircleD);
        graphics.drawCircle(me.world.centerX, 0, goalCircleD);
        graphics.drawCircle(me.world.centerX, me.world.height, goalCircleD);

        //draw score boxes
        graphics.lineStyle(0);
        graphics.beginFill(0x000);
        graphics.drawRect(me.world.width-30,me.world.centerY-40,30,60);
        graphics.drawRect(me.world.width-30,me.world.centerY+10,30,30);

        me.goalRedImage = me.add.sprite(0,0,'goalRed');
        me.goalRedImage.anchor.setTo(0.5,0.5);
        me.goalRedImage.height = me.world.height/30;
        me.goalRedImage.width = me.world.width/3;
        me.goalRedImage.x = me.world.centerX;
        me.goalRedImage.alpha=0.5;

        me.goalBlueImage = me.add.sprite(0,0,'goalBlue');
        me.goalBlueImage.width = me.world.width/3;
        me.goalBlueImage.height = me.world.height/30;
        me.goalBlueImage.anchor.setTo(0.5,0.5);
        me.goalBlueImage.x = me.world.centerX;
        me.goalBlueImage.y = me.world.height;
        me.goalBlueImage.alpha=0.5;
    }else{
        var Watermark = me.cache.getImage('Watermark');
        var goalCircleD = me.world.height*2/5; //to change the diameter of the circles
        var centerCircleD = me.world.width/3;
        watermarkSprite = me.add.sprite(0, 0, 'Watermark');
        watermarkSprite.width = me.world.width/3.2;
        watermarkSprite.height = me.world.width/(3.2*2);  // to keep aspect ratio 2:1
        watermarkSprite.x = me.world.centerX-watermarkSprite.width/2;
        watermarkSprite.y = me.world.centerY-watermarkSprite.height/2;
        watermarkSprite.alpha = 0.40;  //transparancy as a percentage
        me.game.watermarkSize = watermarkSprite.height;

        //background to look like air hockey table
        me.add.tileSprite(0, 0, me.world.width, me.world.height, 'airhole');

        //draw the board
        var graphics = me.add.graphics(0, 0);
        graphics.beginFill(0xc0c0c0,0);
        graphics.lineStyle(4, 0xff7332, 0.5);

        //draw centerline top to bottom
        graphics.moveTo(me.world.centerX, 0); //top line done
        graphics.lineTo(me.world.centerX, me.world.centerY-centerCircleD/2); 
        graphics.moveTo(me.world.centerX, me.world.centerY+centerCircleD/2);
        graphics.lineTo(me.world.centerX, me.world.height+me.world.width/5); //bottom line

        //centerlines left to right
        graphics.moveTo(goalCircleD/2, me.world.centerY); //done
        graphics.lineTo(me.world.width/2 -centerCircleD/2, me.world.centerY); 
        graphics.moveTo(me.world.width/2 +centerCircleD/2, me.world.centerY);
        graphics.lineTo(me.world.width-goalCircleD/2, me.world.centerY); //done

        //Draw circles
        graphics.drawCircle(me.world.centerX, me.world.centerY, centerCircleD);
        graphics.drawCircle(0, me.world.centerY, goalCircleD);
        graphics.drawCircle(me.world.width, me.world.centerY, goalCircleD);

        //draw score boxes
        graphics.lineStyle(0);
        graphics.beginFill(0x000);
        graphics.drawRect(me.world.centerX-40,0,60,30);
        graphics.drawRect(me.world.centerX+10,0,30,30);

        me.goalRedImage = me.add.sprite(0,0,'goalRed');
        me.goalRedImage.anchor.setTo(0.5,0.5);
        me.goalRedImage.height = me.world.width/30;
        me.goalRedImage.width = me.world.height/3;
        me.goalRedImage.x = 0;
        me.goalRedImage.y = me.world.centerY;
        me.goalRedImage.alpha=0.5;
        me.goalRedImage.angle=-90;

        me.goalBlueImage = me.add.sprite(0,0,'goalBlue');
        me.goalBlueImage.width = me.world.height/3;
        me.goalBlueImage.height = me.world.width/30;
        me.goalBlueImage.anchor.setTo(0.5,0.5);
        me.goalBlueImage.x = me.world.width;
        me.goalBlueImage.y = me.world.centerY;
        me.goalBlueImage.alpha=0.5;   
        me.goalBlueImage.angle=-90;
    }
};

function createButton(btn, pos, fun, me){
    var mybtn = me.add.button(0,0,btn, fun, me);
    mybtn.width = me.game.btnWidth;
    mybtn.height = me.game.btnWidth/5;
    mybtn.anchor.setTo(0.5,0.5);
    mybtn.x = me.world.centerX;
    mybtn.y = 233 + pos * mybtn.height
    
};

function lightsOut(me){
            //lights out on board?
        me.mnuBackground = me.add.sprite(0,0,'gameMenuBackground');
        me.mnuBackground.width = me.world.width;
        me.mnuBackground.height = me.world.height;
        me.mnuBackground.alpha = 0.75;
        // end lights out
};

function placeLogo(me){
            // Air Hockey Logo at top
        var splash = me.cache.getImage('preloaderBackground');
        me.splashSprite = me.add.sprite(0,0,'preloaderBackground');
        me.splashSprite.x=me.world.centerX - splash.width/2;
        me.splashSprite.y=0;
}
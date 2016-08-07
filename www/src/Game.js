/* jshint browser:true */

/* global Phaser, BasicGame, $*/

// create Game function in BasicGame
BasicGame.Game = function (game) { };
BasicGame.Game.prototype = {
	
	init: function () {
		
        GenericLevel(this);

		// using p2 physics with no gravity
		this.physics.startSystem(Phaser.Physics.P2JS);
		this.physics.p2.restitution = 0.85; //this gives bounce
				
		//set up goals (sprites without an image with sizing based on goalImages on board)
		this.goalRed = this.add.sprite(this.goalRedImage.x, this.goalRedImage.y);
        this.goalRed.anchor.setTo(0.5,0.5);
		this.goalBlue = this.add.sprite(this.goalBlueImage.x, this.goalBlueImage.y);
        this.goalBlue.anchor.setTo(0.5,0.5);
		this.physics.p2.enable([this.goalRed,this.goalBlue], false); //change to true to see
        //set goal hit rectangles
        this.goalRed.body.static = true;
        this.goalBlue.body.static = true;
        if(BasicGame.isPortrait){
            this.goalRed.body.setRectangle(0.75*this.goalRedImage.width,this.goalRedImage.height);
            this.goalBlue.body.setRectangle(0.75*this.goalBlueImage.width,this.goalBlueImage.height);
        }else{
            this.goalRed.body.setRectangle(this.goalRedImage.height,0.75*this.goalRedImage.width);
            this.goalBlue.body.setRectangle(this.goalBlueImage.height,0.75*this.goalBlueImage.width);
        }
		
	},

	create: function () {
        
		var paddleSize = this.world.width/6;
        //paddle min/max where puck size depends on the paddles
        if( paddleSize < 100 ) paddleSize = 100;
        if( paddleSize > 250 ) paddleSize = 250;
        var puckSize = paddleSize * 0.66;
        
		// Add PUCK to the center of the stage *****************
		this.puck = this.add.sprite(this.world.centerX, this.world.centerY,'puck');
        this.puck.width=puckSize; // old size this.world.width/9
        this.puck.height =puckSize; //this is 1/3 of the goal which is 1/3 of the width.
		this.puck.anchor.setTo(0.5, 0.5);
		// add physics to the puck
		this.physics.p2.enable(this.puck, false); //change to true to see hitcircle
		this.puck.body.setCircle(puckSize*0.35);  //scale the puck hit box here.
		this.puck.body.collideWorldBounds = true;
		this.puck.body.velocity.x = 20;
		this.puck.body.velocity.y = 100;
		// add a contact event listener
		this.puck.body.onBeginContact.add(this.puckHit, this);
		
		this.puckClack =  this.add.audio('puckHitSnd');
		this.puckWhoosh =  this.add.audio('whooshSnd');        
        //End Puck Stuff*****************************************************
	  
		//Place paddles up to 4 (able to add multiple paddles)
		this.paddles = this.add.group(); // up to 4 players??
		if(this.game.numPlayers == 1){
			//one player setup with two paddles one named
            this.computer = this.paddles.create(0, 0,'paddleR');
            var player = this.paddles.create(0, 0,'paddleB');
            if(BasicGame.isPortrait){
                this.computer.x=this.world.centerX;
                this.computer.y=this.world.height/3;
                player.x=this.world.centerX;
                player.y=this.world.centerY+this.world.height/3;                
            }else{
                this.computer.x=this.world.width/3;
                this.computer.y=this.world.centerY;
                player.x=this.world.centerX+this.world.width/3;
                player.y=this.world.centerY;  
            }
		
		}else{
            if(BasicGame.isPortrait){
                for(i=0; i<this.game.numPlayers; i++){
                    if(i%2 == 0)
                        this.paddles.create(100*i + this.world.width/3, this.world.height/6  ,'paddleR');
                    else
                        this.paddles.create(20+50*i,this.world.height-100,'paddleB');
                }
            }else{
                for(i=0; i<this.game.numPlayers; i++){
                    if(i%2 == 0)
                        this.paddles.create(this.world.width/6, 20+100*i + this.world.height/3   ,'paddleR');
                    else
                        this.paddles.create(this.world.centerX+this.world.width/3,100*i-150+ this.world.height/3,'paddleB');
                }
            }

		}
		this.physics.p2.enable(this.paddles,false); //change to true to see hitcircle
        
		// paddles.setAll functin can set properties too.
		this.paddles.forEach(function(paddle){
            paddle.width = paddleSize;
            paddle.height = paddleSize;

			paddle.anchor.setTo(0.5, 0.5);            
			paddle.body.collideWorldBounds = true;
			paddle.body.setCircle(paddle.width/3); //less than one-half to account for outer glow
			//init movement
			paddle.body.velocity.x = 5;
			paddle.body.velocity.y = 5;
            
		},this);
		
		//Physics for one player
		if(this.game.numPlayers == 1){
			this.computerHandle = this.add.sprite(10, 10);
            this.computerHandle.anchor.setTo(0.5, 0.5);
			this.physics.p2.enable(this.computerHandle,false); //true for view
			this.computerHandle.body.setCircle(5);
			this.computerHandle.body.x = this.world.centerX;
			this.computerHandle.body.y = 40;
			
			this.computer.anchor.setTo(0.5, 0.5); //computer paddle
			this.computer.body.x = 70;

			//constrain new computer handle to paddle
			this.physics.p2.createLockConstraint(this.computerHandle, this.computer );
			//in game move this.computeHandle for realistic play
			this.computerHandle.body.static = true;
		}
		

		
		this.goalRed.bringToTop();
		this.goalBlue.bringToTop();
		
		this.puck.body.createBodyCallback(this.goalRed, this.scoreTop, this);
		this.puck.body.createBodyCallback(this.goalBlue, this.scoreBottom, this);
		this.physics.p2.setImpactEvents(true);
		
		//input event liseteners
		this.input.onDown.add(this.paddleGrab, this);
		this.input.onUp.add(this.paddleDrop, this);
		this.input.addMoveCallback(this.paddleMove, this);
        
        
        //One player ai settings *********************
        if(BasicGame.isOnePlayer){
            this.initX = this.computer.width/2 + this.goalRed.width;
            this.initY = this.computer.height/2 + this.goalRed.width;
            // BasicGame.difficulty takes values 0, 1, 2 (less lag as diff increases)
            var divisor = 1.5 + BasicGame.difficulty*0.5;
            this.lag = this.puck.height/divisor;

        }
        //End ai settings*********************************
        
        //speed of puck changes based on difficulty level
        this.puckSpeed = 50 + BasicGame.difficulty*25
		
		// for eject puck timer
		this.timerTxt = this.add.text(this.world.centerX, this.world.centerY + this.game.watermarkSize/2 + 10, 'New Puck: 5', { font: "20px Arial", fill: "#3369E8", align: "center" });
		this.timerTxt.anchor.setTo(0.5, 0.5);
		this.timerTxt.visible = false;
		//this.timerTxt.angle = 90;
		
        //score sideBar TODO: should make this a group ***********************************************
		this.counter = 6;
		this.scoreL = 0;
		this.scoreR = 0;
		this.styleScore = { font: "bold 20px Arial ", fill: "#fff", align: "center" };   
        
        this.scoreLtxt = this.add.text(0, 0, '0', this.styleScore);
        this.scoreRtxt = this.add.text(0, 0, '0', this.styleScore);
        this.scoreLtxt.anchor.setTo(.5, .5);
		this.scoreRtxt.anchor.setTo(0.5, 0.5);
        
        if(BasicGame.isPortrait){
            this.scoreLtxt.x = this.world.width-20;
            this.scoreLtxt.y = this.world.centerY-25;
            this.scoreRtxt.x = this.world.width-20;
            this.scoreRtxt.y = this.world.centerY+25;
            this.scoreLtxt.angle = 90;
            this.scoreRtxt.angle = 90;
        }else{//lanscape
            this.scoreLtxt.x = this.world.centerX-25;
            this.scoreLtxt.y = 18;
            this.scoreRtxt.x = this.world.centerX+25;
            this.scoreRtxt.y = 18;
            //this.scoreLtxt.angle = 90;
            //this.scoreRtxt.angle = 90;
        }
		
        var mmBtn = this.add.button(0, 0, 'mainMenu', this.pauseGame, this);
        mmBtn.anchor.setTo(.5, .5);
        mmBtn.width = 30;
        mmBtn.height = 30;
        if(BasicGame.isPortrait){
            mmBtn.x = this.world.width - 15; 
            mmBtn.y = this.world.centerY;
            mmBtn.alpha = 1;
            mmBtn.angle = 90;
        }else{
            mmBtn.x = this.world.centerX; 
            mmBtn.y = 15;
            mmBtn.alpha = 1;            
        };

                
        
        // game menu work here ****************************************
        this.pauseMenu = this.game.add.group();
        this.pauseMenu.visible = false;
        
        this.mnuBackground = this.pauseMenu.create(0,0,'gameMenuBackground');
        this.mnuBackground.width = this.world.width;
        this.mnuBackground.height = this.world.height;
        this.mnuBackground.alpha = 0.75;
        
        var messageStr = "First side to 7 wins.";
        var messageStyle = { font: "bold 20px Arial ", fill: "#fff", align: "center" };
        this.mnutxt = this.game.add.text(this.world.centerX, 50, messageStr, messageStyle, this.pauseMenu);
		this.mnutxt.anchor.setTo(.5, .5);
        
        var tempBtn = this.cache.getImage('gameContinueBtn');
        var scaleFactor = this.game.btnWidth/535; //535 width of buttons
        this.continueGame = this.pauseMenu.create(19,10,'gameContinueBtn');
        this.continueGame.scale.setTo(scaleFactor,scaleFactor);
        this.continueGame.x = this.world.centerX-this.continueGame.width/2;
        this.continueGame.y = this.world.height/6;
        
        this.quitGame = this.pauseMenu.create(19,10,'gameMenuQuitBtn');
        this.quitGame.scale.setTo(scaleFactor,scaleFactor);
        this.quitGame.x = this.world.centerX-this.quitGame.width/2;
        this.quitGame.y = this.continueGame.y+this.continueGame.height;

        var mb = this.cache.getImage('musicToggle');
        this.musicButton = this.pauseMenu.create(0,0, 'musicToggle');
        this.musicButton.scale.setTo(scaleFactor,scaleFactor);
        //this.musicButton.anchor.setTo(0.5,0.5);
        this.musicButton.x=this.world.centerX-this.musicButton.width/2;
        this.musicButton.y=this.quitGame.y+this.continueGame.height;
        if(this.game.music){
                this.musicButton.frame=0;
        }else{
                this.musicButton.frame=1;
        }
        //******************************************************************
        
        // End game menu work here ****************************************
        this.endGameMenu = this.game.add.group();
        this.endGameMenu.visible = false; //toggle visible
        
        this.endGameBackground = this.endGameMenu.create(0,0,'gameMenuBackground');
        this.endGameBackground.width = this.world.width;
        this.endGameBackground.height = this.world.height;
        this.endGameBackground.alpha = 0.65;
        
        messageStr = "Game Over.";  //change when a winner is identified
        messageStyle = { font: "bold 20px Arial ", fill: "#fff", align: "center" };
        this.endtxt = this.game.add.text(this.world.centerX, 50, messageStr, messageStyle,this.endGameMenu);
		this.endtxt.anchor.setTo(.5, .5);
        
        this.endGameBackMainBtn = this.make.button(75,75,'mainMenuBtn',this.mainMenuBack,this);
        this.endGameBackMainBtn.scale.setTo(scaleFactor,scaleFactor);
        this.endGameMenu.add(this.endGameBackMainBtn);
        this.endGameBackMainBtn.x = this.world.centerX-this.endGameBackMainBtn.width/2;
        //******************************************************************
        
	},
	update: function(){
        
        this.constrainVelocity(this.puck, this.puckSpeed);
		
		if(BasicGame.isOnePlayer){
            if(BasicGame.isPortrait)
			    this.verticalAI();
            else
                this.horizontalAI();
		}
	},
	
	// scoring methods *******************************
	scoreTop: function (body1, body2){
		this.puckWhoosh.play();
		this.scoreR++;
		this.scoreRtxt.setText(this.scoreR);
		this.puck.kill();
		this.timer = this.time.events.loop(500, this.updateCounter, this);
	},
	scoreBottom: function (body1, body2){
		this.puckWhoosh.play();
		this.scoreL++;
		this.scoreLtxt.setText(this.scoreL);

		this.puck.kill();
		this.timer = this.time.events.loop(500, this.updateCounter, this);
	},
	// **************************************
	
	updateCounter: function(timer) {
		this.timerTxt.visible = true;
		this.counter--;
		if(this.scoreL<7 && this.scoreR<7){
			if(this.counter > 0){
				this.timerTxt.setText('New Puck: ' + this.counter);
			}else{
				this.time.events.remove(this.timer);
				this.counter = 6;
				this.ejectPuck();
				this.timerTxt.visible = false;
			}
		}else{
			this.time.events.remove(this.timer);
            this.timerTxt.setText('Winner Winner');
            //end game group Visiable here
            if(this.scoreL>this.scoreR)
                this.endtxt.setText("Red Wins!");
            else
                this.endtxt.setText("Blue Wins!");
            this.endGameMenu.visible = true; //toggle visible
		}

	},
	ejectPuck: function(){
		this.puck.body.y = this.world.centerY;
		this.puck.body.x = this.world.centerX;
		this.puck.body.velocity.y = this.rnd.integerInRange(-100, 100);
		this.puck.body.velocity.x = this.rnd.integerInRange(-100, 100);
		this.puck.revive();
	},
	pauseGame: function(){
        this.game.paused = true;
        this.pauseMenu.visible = true;
        this.input.onDown.add(this.unpauseGame, this);
	},
	unpauseGame: function(){
        if (this.game.paused) {
            if (this.continueGame.getBounds().contains(this.game.input.x, this.game.input.y)) {
                this.game.paused = false;        
                this.pauseMenu.visible = false;
            }
      
            if (this.quitGame.getBounds().contains(this.game.input.x, this.game.input.y)) {
                this.game.paused = false;        
                this.state.start('MainMenu');
            }
            
            if (this.musicButton.getBounds().contains(this.game.input.x, this.game.input.y)) {
                if(this.game.music){
                    BasicGame.backgroundMusic.stop();
                    this.game.music = false;
                    this.musicButton.frame=1;
                }else{
                    BasicGame.backgroundMusic.play();
                    this.game.music = true;
                    this.musicButton.frame=0;
                }
            }
        }
 
	},
    mainMenuBack: function(){
        this.state.start('MainMenu');
    },
	
	// utility functions for the paddles *****************
	paddleGrab: function (pointer) {

		var bodies = this.physics.p2.hitTest(pointer.position);

	   if (bodies.length != 0){
			pointer.handle = this.add.sprite(pointer.x, pointer.y);
            pointer.handle.anchor.setTo(0.5, 0.5);
			this.physics.p2.enable(pointer.handle,false);
			pointer.handle.body.setCircle(5);
			pointer.handle.body.static = true;
			//pointer.handle.body.collideWorldBounds = true;
		   
		   //basically the pointer gets reference to new handle sprite, paddle and paddle spring
		   //not sure this is the best thing to do but it's for multitouch.
		   pointer.paddle = bodies[0].parent.sprite;  //paddle sprite clicked gets pointer object
           //if(pointer.paddle===this.puck) console.log("got it")
		   //Docs.... createLockConstraint(bodyA, bodyB, offset, angle, maxForce) 
		   pointer.paddleSpring = this.physics.p2.createLockConstraint(pointer.handle, pointer.paddle);
	   }
		
	},
	paddleMove: function(pointer, x, y, isDown) {
		//at this point there is a constraint
		if(pointer.paddle){
            // take care of puck drag into goal here
            if(pointer.paddle.alive){
                //TODO: Keep paddle on table.
                pointer.handle.body.x = x;
                pointer.handle.body.y = y;
                
            }else{
                this.paddleDrop(pointer);
            }
			
		}
	}, 
	paddleDrop: function(pointer){
		if(pointer.handle){
			pointer.handle.destroy();
			pointer.paddle = null;
			this.physics.p2.removeConstraint(pointer.paddleSpring);
		}
	},
	// AI work here *************************************
	verticalAI: function(){
        
        var distance = Math.sqrt( Math.pow(this.puck.body.x-this.computerHandle.body.x,2) +Math.pow(this.puck.body.y-this.computerHandle.body.y,2)  );
        
        var aiXmin = this.computer.width/2;
        var aiXmax = this.world.width - aiXmin;
        var aiXvalue;
        if(this.puck.body.velocity.x>0){
            aiXvalue = this.puck.body.x - this.lag;
        }else {
            aiXvalue = this.puck.body.x + this.lag;
        }
        
        //keep compuer paddle on the board.
        if(aiXvalue>aiXmax){
            this.computerHandle.body.x = aiXmax;
            this.computerHandle.body.y = this.initX;
        }else if(aiXvalue<aiXmin){
            this.computerHandle.body.x = aiXmin;
            this.computerHandle.body.y = this.initX;
        }else{
            this.computerHandle.body.x = aiXvalue;
            this.computerHandle.body.y = this.initX;
        }
        
        //lunge  (if the puck is fast it will not lunge)
        if(distance<this.puck.width && Math.abs(this.puck.body.velocity.y)<700){
            
            this.computerHandle.body.x = this.puck.body.x-10;
            this.computerHandle.body.y =this.puck.body.y-10;
            
            if(this.computerHandle.body.y>this.game.height/3){
                this.computerHandle.body.y = this.initY;
            }
        }
	},
	horizontalAI: function()  {
        // Two p2 physics sprites this.computerHandle and this.computer constained on line 131
        
        var distance = Math.sqrt( Math.pow(this.puck.body.x-this.computerHandle.body.x,2) +Math.pow(this.puck.body.y-this.computerHandle.body.y,2)  );
        
        //giv comper a lag settings in create.
        var aiYmin = this.computer.height/2;
        var aiYmax = this.world.height - aiYmin;
        var aiYvalue;
        if(this.puck.body.velocity.y>0){
            aiYvalue = this.puck.body.y - this.lag;
        }else {
            aiYvalue = this.puck.body.y + this.lag;
        }
        
        //keep compuer paddle on the board.
        if(aiYvalue>aiYmax){
            //aiYvalue = aiYmax;
            this.computerHandle.body.y = aiYmax;
            this.computerHandle.body.x = this.initX;
        }else if(aiYvalue<aiYmin){
            aiYvalue = aiYmin;
            this.computerHandle.body.y = aiYmin;
            this.computerHandle.body.x = this.initX;
        }else{
            this.computerHandle.body.y = aiYvalue;
            this.computerHandle.body.x = this.initX;
        }
               
        //lunge (if the puck is fast it will not lunge)
        if(distance<this.puck.height && Math.abs(this.puck.body.velocity.x)<700){
            
            this.computerHandle.body.x = this.puck.body.x-10;
            this.computerHandle.body.y =this.puck.body.y-10;
            
            if(this.computerHandle.body.x>this.game.width/3){
                this.computerHandle.body.x = this.initX;
            }

        }

	},
	puckHit: function (body, bodyB, shapeA, shapeB, equation) {
		// if pointer.handle width is changed this will not work
		if(shapeB.radius!=0.25)
			this.puckClack.play();
	},
    constrainVelocity: function(sprite, maxVelocity){
        
        var body = sprite.body;
        var angle, currVelocitySqr, vx, vy;  
        vx = body.data.velocity[0];  
        vy = body.data.velocity[1];  
        currVelocitySqr = vx * vx + vy * vy;  
        if (currVelocitySqr > maxVelocity * maxVelocity) {    
            angle = Math.atan2(vy, vx);    
            vx = Math.cos(angle) * maxVelocity;    
            vy = Math.sin(angle) * maxVelocity;   
            body.data.velocity[0] = vx;    
            body.data.velocity[1] = vy;    
            //console.log('limited speed to: '+maxVelocity);  
        }
          
        
    }


};
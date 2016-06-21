/* jshint browser:true */

/* global Phaser, BasicGame, $*/

// create Game function in BasicGame
BasicGame.Game = function (game) {
};

// set Game function prototype
BasicGame.Game.prototype = {
	
	init: function () {
		
        GenericLevel(this);

		// using p2 physics with no gravity
		this.physics.startSystem(Phaser.Physics.P2JS);
		this.physics.p2.restitution = 0.85; //this gives bounce
				
		//set up goals
		this.goalTop = this.add.sprite(this.world.centerX, 6,'goalTop');
		this.goalBottom = this.add.sprite(this.world.centerX, this.world.height-12,'goalBottom');
		
		this.physics.p2.enable([this.goalTop,this.goalBottom], false); //change to true to see
        //set goal hit rectangles
        this.goalTop.body.static = true;
        this.goalTop.width = this.world.width/3+30;
        this.goalTop.body.setRectangle(this.world.width/3-4,15,7);
        this.goalBottom.body.static = true;
        this.goalBottom.body.setRectangle(this.world.width/3-8,15,6,6);
        this.goalBottom.width = this.world.width/3+30;

		
	},

	create: function () {
		
		// Add puck to the center of the stage
		this.puck = this.add.sprite(10, this.world.centerY,'puck');
		// scale the puck here
        this.puck.width=this.world.width/9;
        this.puck.height =this.world.width/9; //this is 1/3 of the goal which is 1/3 of the width.
		this.puck.anchor.setTo(0.5, 0.5);
		// turn false the collision circle in production
		this.physics.p2.enable(this.puck, false); //change to true to see hitcircle
		this.puck.body.setCircle(this.world.width/24);  //scale the puck hit box here.
		this.puck.body.collideWorldBounds = true;
		this.puck.body.velocity.x = 20;
		this.puck.body.velocity.y = 100;
		// add a contact event listener
		this.puck.body.onBeginContact.add(this.puckHit, this);
		
		this.puckClack =  this.add.audio('puckHitSnd');
		this.puckWhoosh =  this.add.audio('whooshSnd');
	  
		//add paddles up to 4 (able to add multiple paddles)
		this.paddles = this.add.group(); // up to 4 players??
		if(this.game.numPlayers == 1){
			//one player setup with two paddles one named
			this.computer = this.paddles.create(50, 50  ,'paddleR');
			this.paddles.create(this.world.centerX, this.world.height-100 ,'paddleB');
			// add spring to this.computer sprite
		}else{
			for(i=0; i<this.game.numPlayers; i++){
				if(i%2 == 0)
					this.paddles.create(20+100*i, 100  ,'paddleR');
				else
					this.paddles.create(20+50*i,this.world.height-100,'paddleB');
			}
		}
		this.physics.p2.enable(this.paddles,false); //change to true to see hitcircle
        
		// paddles.setAll functin can set properties too.
		this.paddles.forEach(function(paddle){
            //console.log(this.world.width)
            paddle.width = this.world.width/6;
            paddle.height = this.world.width/6;
			//paddle.scale.x=	Math.max(0.4, window.innerWidth/24000);
			//paddle.scale.y=	paddle.scale.x;
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
			this.physics.p2.enable(this.computerHandle,false); //true for view
			
			this.computerHandle.body.setCircle(5);
			this.computerHandle.anchor.setTo(0.5, 0.5);
			
			this.computerHandle.body.x = this.world.centerX;
			this.computerHandle.body.y = 40;
			
			this.computer.anchor.setTo(0.5, 0.5);
			this.computer.body.x = 70;

			var force = 250; //change this for difficulty levels
			this.physics.p2.createLockConstraint(this.computerHandle, this.computer,[1,1],force );
			//in game move this.computeHandle for realistic play
			this.computerHandle.body.static = true;
		}
		

		
		this.goalTop.bringToTop();
		this.goalBottom.bringToTop();
		
		this.puck.body.createBodyCallback(this.goalTop, this.scoreTop, this);
		this.puck.body.createBodyCallback(this.goalBottom, this.scoreBottom, this);
		this.physics.p2.setImpactEvents(true);
		
		//input event liseteners
		this.input.onDown.add(this.paddleGrab, this);
		this.input.onUp.add(this.paddleDrop, this);
		this.input.addMoveCallback(this.paddleMove, this);
		
		// for eject puck timer
		this.timerTxt = this.add.text(5, this.world.centerY, 'New Puck: 5', { font: "16px Arial", fill: "#3369E8", align: "center" });
		//this.timerTxt.anchor.setTo(0.5, 0.5);
		this.timerTxt.visible = false;
		//this.timerTxt.angle = 90;
		
        //score sideBar TODO: should make this a group ***********************************************
		this.counter = 6;
		this.scoreL = 0;
		this.scoreR = 0;
		this.styleScore = { font: "bold 20px Arial ", fill: "#fff", align: "center" };
		
        var sideBar = this.add.sprite(0, this.world.centerY, 'sideBar');
        sideBar.anchor.setTo(.5, .5);
        sideBar.angle = 90;
        sideBar.width = this.world.height/5;
        sideBar.height = this.world.width/10;
        sideBar.x = this.world.width;
        sideBar.y = this.world.centerY;        
        
		this.scoreLtxt = this.add.text(this.world.width-20, this.world.centerY-25, '0', this.styleScore);
		this.scoreLtxt.anchor.setTo(.5, .5);
		this.scoreLtxt.angle = 90;
		this.scoreRtxt = this.add.text(this.world.width-20, this.world.centerY+25, '0', this.styleScore);
		this.scoreRtxt.anchor.setTo(0.5, 0.5);
		this.scoreRtxt.angle = 90;
        
        var mmBtn = this.add.button(0, 0, 'mainMenu', this.pauseGame, this);
        mmBtn.anchor.setTo(.5, .5);
        mmBtn.width = sideBar.height/2;
        mmBtn.height = mmBtn.width;
        mmBtn.x = this.world.width - sideBar.height/4;
        mmBtn.y = this.world.centerY;
        mmBtn.alpha = 0.85;
        
        var sideBar2 = this.add.sprite(0, 0, 'sideBar');
        sideBar2.anchor.setTo(.5, .5);
        sideBar2.angle = -90;
        sideBar2.width = this.world.height/5;
        sideBar2.height = this.world.width/10;
        sideBar2.x = 0;
        sideBar2.y = this.world.centerY;  
        //************************************************************
        

        
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
        var scaleFactor = (this.world.width/2) / tempBtn.width ;  //new size div old size
        this.continueGame = this.pauseMenu.create(19,10,'gameContinueBtn');
        this.continueGame.scale.setTo(scaleFactor,scaleFactor);
        this.continueGame.x = this.world.centerX-this.continueGame.width/2;
        this.continueGame.y = this.world.centerY-this.continueGame.height-10;
        
        this.quitGame = this.pauseMenu.create(19,10,'gameMenuQuitBtn');
        this.quitGame.scale.setTo(scaleFactor,scaleFactor);
        this.quitGame.x = this.world.centerX-this.quitGame.width/2;
        this.quitGame.y = this.world.centerY+10;
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
        this.endGameBackMainBtn.scale.setTo(.5,.5);
        this.endGameMenu.add(this.endGameBackMainBtn);
        
        //******************************************************************
	},
	update: function(){
		// 1 player activate ai
		if(this.game.numPlayers == 1){
			this.aiVer2();
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
            this.endGameMenu.visible = true; //toggle visible
		}

	},
	ejectPuck: function(){
		this.puck.body.y = this.world.centerY;
		this.puck.body.x = 0;
		this.puck.body.velocity.y = this.rnd.integerInRange(-70, 70);
		this.puck.body.velocity.x = 75
		this.puck.revive();
	},
	pauseGame: function(){
        this.game.paused = true;
        this.pauseMenu.visible = true;
        this.input.onDown.add(this.unpauseGame, this);
		//this.state.start('MainMenu');
	},
	unpauseGame: function(){
        if (this.game.paused) {
            if (this.continueGame.getBounds().contains(this.game.input.x, this.game.input.y)) {
                this.game.paused = false;        
                this.pauseMenu.visible = false;
            }
        }
        if (this.game.paused) {
            if (this.quitGame.getBounds().contains(this.game.input.x, this.game.input.y)) {
                this.game.paused = false;        
                this.state.start('MainMenu');
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
			this.physics.p2.enable(pointer.handle,false);
			pointer.handle.body.setCircle(5);
			pointer.handle.anchor.setTo(0.5, 0.5);
			pointer.handle.body.static = true;
			pointer.handle.body.collideWorldBounds = true;
		   
		   //basically the pointer gets reference to new handle sprite, paddle and paddle spring
		   //not sure this is the best thing to do but it's for multitouch.
		   pointer.paddle = bodies[0].parent.sprite;  //paddle sprite clicked gets pointer object
		   //Docs.... createLockConstraint(bodyA, bodyB, offset, angle, maxForce) 
		   pointer.paddleSpring = this.physics.p2.createLockConstraint(pointer.handle, bodies[0].parent.sprite );
		   //console.log("hello" + bodies.length);
	   }
		
	},
	paddleMove: function(pointer, x, y, isDown) {
		//at this point the spring is attached
		if(pointer.paddle){
			//TODO: Keep paddle on table.
			pointer.handle.body.x = x;
			pointer.handle.body.y = y;
		}
	}, 
	paddleDrop: function(pointer){
		if(pointer.handle){
			pointer.handle.destroy();
			pointer.paddle = null;
			this.physics.p2.removeConstraint(pointer.paddleSpring);
		}
	},
	//*************************************
	aiVer1: function(){
			var deltaY= this.puck.body.y-this.computerHandle.body.y;
			if(deltaY>=0 && deltaY<70){
				this.computerHandle.body.y = 100;  //thrust forward  
				this.computerHandle.body.x = this.puck.body.x;
			}else {
				this.computerHandle.body.y = 50;  //thrust back
				this.computerHandle.body.x =   this.puck.body.x;
				
			}
	},
	aiVer2: function()  {
		this.aiVer1();
	},
	puckHit: function (body, bodyB, shapeA, shapeB, equation) {
		//console.log(bodyB);
		// if goal width is changed this will not work
		if(shapeB.width!=5)
			this.puckClack.play();
	}

};
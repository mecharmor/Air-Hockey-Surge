//This JS file is used to store different level designs


//pass 'this' to the level design functions so you can paint to the screen.
function GenericLevel(me){
    
    var Watermark = me.cache.getImage('Watermark');
    me.add.sprite(me.world.centerX-Watermark.width/2.0, me.world.centerY-Watermark.height/2.0, 'Watermark');
    
    //background to look like air hockey table
    me.add.tileSprite(0, 0, me.world.width, me.world.height, 'airhole');
    
    //draw the board
	var graphics = me.add.graphics(0, 0);
    graphics.beginFill(0xc0c0c0,0);
	graphics.lineStyle(4, 0xD62D20, 0.5);
		
    //draw centerline top to bottom
	graphics.moveTo(me.world.centerX,100);
    graphics.lineTo(me.world.centerX, me.world.centerY-me.world.width/6); 
	graphics.moveTo(me.world.centerX, me.world.centerY+me.world.width/6);
    graphics.lineTo(me.world.centerX, me.world.height-100);
		
	//centerlines left to right
    graphics.moveTo(0, me.world.centerY);
    graphics.lineTo(me.world.width/2 -me.world.width/6, me.world.centerY); 
    graphics.moveTo(me.world.width/2 +me.world.width/6, me.world.centerY);
	graphics.lineTo(me.world.width, me.world.centerY);
		
    //Draw circles
    graphics.drawCircle(me.world.centerX, me.world.centerY, me.world.width/3);
	graphics.drawCircle(me.world.centerX, 0, 200);
    graphics.drawCircle(me.world.centerX, me.world.height, 200);
		
    //draw score boxes
	graphics.lineStyle(0);
	graphics.beginFill(0x000);
	graphics.drawRect(me.world.width-30,me.world.centerY-40,30,30);
	graphics.drawRect(me.world.width-30,me.world.centerY+10,30,30);
};
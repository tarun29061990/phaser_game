BodiRun.StartMenu = function(game){};

BodiRun.StartMenu.prototype = {

	create: function(){
		
		this.ding = this.add.audio('select_audio');
        
		var startBG = this.add.sprite(this.world.centerX, this.world.centerY, 'titleimage');
		startBG.anchor.set(0.5,0.5)
		// startBG.inputEnabled = true;
		// startBG.events.onInputDown.addOnce(this.startGame, this);

		var style = { font: "65px Arial", fill: "#ff0044", align: "center" };
		var startPrompt = this.add.bitmapText(this.world.centerX - 210, this.world.centerY+180, 'eightbitwonder', 'Touch to Start!', 44);
		startPrompt.inputEnabled = true;
		startPrompt.events.onInputDown.add(this.startGame, this);

		this.input.onDown.add(this.startGame, this);

		

		var dude = this.add.image(0,this.game.height-68, 'dude');
		

		var graphics = this.add.graphics();
		graphics.beginFill(0x235631, 1);
		graphics.drawRect(0, this.game.height-20, this.game.width, 20);
		graphics.endFill();
		
	},

	startGame: function(){
		this.ding.play();
		this.state.start('Game');
	}
}
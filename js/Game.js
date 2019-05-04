BodiRun.Game = function(game){
	this.game = game;
}

BodiRun.Game.prototype = {

	create: function(){
		
		//  We're going to be using physics, so enable the Arcade Physics system
    	this.game.physics.startSystem(Phaser.Physics.ARCADE);

		
		// this.bg.scale.setTo(scaleRatio, scaleRatio);

		this.obstacles = this.game.add.group(); 

		this.platform = this.game.add.group();
		this.platform.enableBody = true;
		
		this.ground = this.platform.create(0,this.game.height-20, 'ground');
		this.ground.scale.setTo(10,2);
		this.ground.body.immovable = true;

		var graphics = this.add.graphics();
		graphics.beginFill(0x235631, 1);
		graphics.drawRect(0, this.game.height-20, this.game.width, 20);
		graphics.endFill();

		this.platform.add(graphics);


		this.player = this.add.sprite(0,this.game.height-120, 'dude');
		

		this.game.physics.arcade.enable(this.player);
		this.game.physics.arcade.enable(this.platform);
		//  Player physics properties. Give the little guy a slight bounce.
	    this.player.body.bounce.y = 0.2;
	    this.player.body.gravity.y = 1000;
	    this.player.body.collideWorldBounds = true;

	    //  Our two animations, walking left and right.
	    this.player.animations.add('left', [0, 1, 2, 3], 10, true);
	    this.player.animations.add('right', [5, 6, 7, 8], 10, true);

	    //  Our controls.
    	this.cursors = this.game.input.keyboard.createCursorKeys();

    	this.spaceKey = this.game.input.keyboard.addKey(
                    Phaser.Keyboard.SPACEBAR);

    	this.timer = this.game.time.events.loop(2000, this.addObstacles, this); 
    	// this.cloudTimer = this.game.time.events.loop(1000, this.addClouds, this); 

    	this.addScoring();
	},

	jump: function(){
		this.player.body.velocity.y = -450;
	},

	rest: function(){
		this.player.body.velocity.y = 0;
	},

	addObstacle: function(x,y){
		var obstacle = this.game.add.sprite(x,y,'obstacle');

		this.game.physics.arcade.enable(obstacle);

	    obstacle.body.gravity.y = 1000;
	    

		obstacle.animations.add('left', [0,1], 10, true);

		obstacle.animations.play('left');
		this.obstacles.add(obstacle);

		obstacle.body.velocity.x -= 200;
		
		obstacle.checkWorldBounds = true;
		obstacle.outOfBoundsKill = true;

		obstacle.scored = false;
	},

	addObstacles: function(){
		var posX = this.game.width - 10;
		var posY = this.game.height-52;

		this.addObstacle(posX, posY);
	},

	addClouds: function(){
		var posX = this.world.centerX;
		var posY = 300;

		var cloud1 = this.game.add.sprite(posX, posY, 'cloud1');
		this.game.physics.arcade.enable(cloud1);

		cloud1.body.velocity.x -= 200;
		
		cloud1.checkWorldBounds = true;
		cloud1.outOfBoundsKill = true;
	},

	addScoring: function(){
		this.score = 0;
		this.labelScore = this.game.add.text(20, 20, "0", 
    	{ font: "30px Arial", fill: "#ffffff" });
	},

	incrementScore: function(obstacle){
		this.score += 1;
		obstacle.scored = true;
		this.labelScore.text = this.score; 
	},

	restartGame: function(){
		this.game.state.start('Game');
	},

	update: function(){
		const that = this;
		//  Collide the player and the stars with the platforms 
    	this.game.physics.arcade.collide(this.player, this.platform);
    	this.game.physics.arcade.collide(this.obstacles, this.platform);
	    
	    this.player.animations.play('right');

    	console.log(this.game.input.pointer1.isDown);
	    if(this.game.input.pointer1.isDown && this.player.body.touching.down){
	    	this.jump();
	    }
	    console.log(this.cursors);
	    if(this.cursors.up.isDown && this.player.body.touching.down) {
    		this.jump();
    	}

		if(this.spaceKey.isDown && this.player.body.touching.down){
			this.jump();
		}

		this.game.physics.arcade.overlap(this.obstacles, this.player, this.restartGame, null, this);

		this.obstacles.forEachAlive(function(obstacle){
			if(!obstacle.scored && obstacle.x <= that.player.x){
				that.incrementScore(obstacle);
			}
		});

		this.game.scale.setShowAll();
		this.game.scale.refresh();
	}
}
var game = new Phaser.Game(800, 600, Phaser.CANVAS, '', { preload: preload, create: create, update: update });

function preload(){
	game.load.image('delhi', 'assets/delhi.png', 800, 600);
}

function create(){
	game.add.sprite(0, 0, 'delhi');
	goFullScreen();
}

function update(){

}

function goFullScreen(){
		// setting a background color
	game.stage.backgroundColor = "#555555";
	game.scale.pageAlignHorizontally = true;
	game.scale.pageAlignVertically = true;
	// using RESIZE scale mode
	game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
	game.scale.setScreenSize(true);
}
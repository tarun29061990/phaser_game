var BodiRun = {};

BodiRun.Boot = function(game){}

BodiRun.Boot.prototype = {
	preload: function(){
		this.load.image('preloaderBar', 'assets/loader_bar.png');
        this.load.image('titleimage', 'assets/title_2.png');
	},

	create: function(){
		this.input.maxPointers = 1;
		this.stage.disableVisibilityChange = false;

		this.scale.scaleMode = Phaser.ScaleManager.aspectRatio;
		this.scale.minWidth = 480;
		this.scale.minHeight = 270;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.stage.forceLandscape = true;

		this.scale.setShowAll();
		

		this.scale.updateLayout(true);

		this.scale.refresh();


		this.input.addPointer();
		
		this.stage.backgroundColor = Phaser.Color.getColor(190,228,243)

		this.state.start('Preloader');
	}
}
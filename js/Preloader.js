BodiRun.Preloader = function(game){
	this.preloadBar = null;
	this.titleText = null;
	this.ready = false;
};

BodiRun.Preloader.prototype = {
	preload: function(){

		this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY+100, 'preloaderBar');
		this.preloadBar.anchor.setTo(0.5, 0.5);
		this.load.setPreloadSprite(this.preloadBar);
		this.titleText = this.add.image(this.world.centerX, this.world.centerY-100, 'titleimage');
		this.titleText.anchor.setTo(0.5, 0.5);

		this.load.image('cloud1', 'assets/cloud_1.jpg');
		this.load.image('cloud2', 'assets/cloud_2.jpg');

        this.load.bitmapFont('eightbitwonder', 'fonts/eightbitwonder.png', 'fonts/eightbitwonder.fnt');
        this.load.audio('select_audio', 'audio/select.mp3');
        this.load.audio('game_audio', 'audio/bgm.mp3');

        this.load.spritesheet('dude','assets/dude2.png',32,48);
        this.load.image('ground','assets/platform_1.png');

        this.load.spritesheet('obstacle', 'assets/baddie.png', 32, 32);
	},

	create: function(){
		this.preloadBar.cropEnabled = false;
	},

	update: function () {
        if(this.cache.isSoundDecoded('game_audio') && this.ready == false) {
            this.ready = true;
            this.state.start('StartMenu');
        }
	}
};
/*
Game Type: Bridge Runner
Description: Collect Objects with a constant moving sprite. Mind the gaps.
*/
MaestroGameBuilder.BridgeRunner = function (game) {};

MaestroGameBuilder.BridgeRunner.prototype = {
    create: function () {
    	MaestroGameBuilder.Options.container.style.backgroundImage = "none";

		this.player;
		this.player_speed = 300;
		this.initial_jump_velocity = 500;
		this.initial_jump_pullback = 300;


		this.background0;
		this.background1;
		this.endLight;
		this.nDame;
		this.eHouse;
		this.dLane;

		this.cursors;
		this.jumpButton;

		this.collectible; 
		this.camera_offset = 150;

		this.points;
		this.ui_group;
		this.menuButton;

		this.collect_group;

		this.sign0;
		this.sign1;
		this.sign2;
		this.short0;
		this.short1;
		this.med;
		this.long;
		this.gap = 125; //gap between floor pieces

		this.short1a;
		this.short1b;
		this.short1c;
		this.short1d;
		this.short1e;

		this.short0a;
		this.short0b;
		this.short0c;
		this.short0d;


		this.wrapping = true;
		this.stopped = false;



		this.block_group;
		this.blockCollide;
		this.block_running_x = this.game_width + 200;
		this.dubble_last = false;
		this.block;

		this.killButton;
		this.reviveButton;

		this.obstacle_timer;
		this.obstacle_delay = 20;	    
	    
	    //add the background
	    this.game.stage.backgroundColor = '#d3d3d3';
	     
	    /* TODO Calulation to determine proportional height/width. 5130w 600h =  */
	    var boundsWidth = (this.game.height*5130)/600;
	    this.game.world.setBounds(0,0,5130, 600);    
	  
	    this.points = 0;
	 
	   
	    this.wrapping = true;
	    this.stopped = false; 
	    

	    this.backgroundTile = this.game.add.tileSprite(0,600,5110,600, 'bkg1');
	    this.backgroundTile.anchor.setTo(0,1);
	    this.eHouse = this.game.add.sprite(200,0,'eHouse');
	    this.nDame = this.game.add.sprite(0,0,'nDame');
	    this.dLane = this.game.add.sprite(0,0,'dLane');
	    
	    
	    this.endLight = this.game.add.sprite(this.game.world.width, 0, 'endLight');   
	    this.endLight.reset(this.game.world.width-this.endLight.width, 0);
	    
	        
	    this.menuButton = this.game.add.button(10, 10, "menuButton", MGBUtils.pauseGame, this);
	    this.menuButton.fixedToCamera = true;
	    

	    this.ui_group = this.game.add.group();    
	    this.ui_group.fixedToCamera = true;
	    for(var i = 0; i < 4; i++){
	        this.ui_group.create(this.game.camera.width - (50+(i*50)), 10, 'uiCollectible');
	        this.ui_group.children[i].alpha = 0.2;
	    }
	    
	    
	    
	    this.player = this.game.add.sprite(0, 200, 'BridgeRunnerPlayer',0);
    
	    this.player.animations.add('run', [0, 1, 2], 6, true);
	    this.player.animations.add('jump', [3], 6, true);
	    this.player.animations.play('run');
	    
	    
	    this.player.scale.setTo(0.2,0.2);
	  
	    this.PlaceGround();
	    
	   
	    
	    
	    this.cursors = this.game.input.keyboard.createCursorKeys();
	    this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	    this.killButton = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
	    this.reviveButton = this.game.input.keyboard.addKey(Phaser.Keyboard.TWO);
	    

	    
	    this.game.camera.focusOnXY(this.player.x + this.camera_offset, this.player.y);
	    

	    
	    this.PlaceBlocks();
	    this.PlaceCollectibles();
	    
        /* Force resize to trigger */
        this.resize(this.game.width,this.game.height);

        MGBUtils.launchModal(this.game.textData[this.game.state.current].help.title,this.game.textData[this.game.state.current].help.text,this);
        
    },
	resize: function (width, height) {
		MGBUtils.scaleSprite(this.menuButton, width, height / 3, 50, .7);
		this.menuButton.x = 10;
		this.menuButton.y = 10;

		//var counter = 1;


		//MGBUtils.scaleSprite(this.startButton, width, height /3, 50, .75);
		//this.startButton.x = this.game.world.width-10;
		//this.startButton.y = 10;
		/*
		Resize happens immediately, so we wait to remove the fade/curtain 
		until all the elements have jumped into place.
		*/
		MaestroGameBuilder.Options.container.className = '';
	},
	PlaceCollectibles: function(){
	    this.collect_group = this.game.add.group();
	    this.collect_group.enableBody = true;
	    this.collect_group.physicalBodyType = Phaser.Physics.ARCADE;
	    
	    
	    for(var i = 0; i < 4; i++){
	        this.collect_group.create(0,0,'collectible');
	    }
	    this.collect_group.children[0].reset(this.block_group.children[1].position.x + (this.block_group.children[1].body.width/4), this.block_group.children[1].position.y - (this.block_group.children[1].body.height*1.75));
	    
	    this.collect_group.children[1].reset(this.short1c.position.x, this.short1c.position.y-(this.short1c.body.height*1.55));
	    
	    this.collect_group.children[2].reset(this.sign1.position.x+(this.sign1.body.width*0.75), this.sign1.position.y-(this.sign1.body.height*1.25));
	    
	    this.collect_group.children[3].reset(this.game.world.width - (this.collect_group.children[3].width*2), this.short1e.position.y - (this.short1.body.height*1.5));   
	},
	PlaceGround: function(){
	    //make all the blocks so we can get their size
	    this.sign0 = this.game.add.sprite(0, 0, 'sign0');
	    this.sign1 = this.game.add.sprite(0, 0, 'sign1');
	    this.sign2 = this.game.add.sprite(0,0, 'sign2');
	    
	    //short0 = game.add.sprite(0,0,'short0');
	    this.short1 = this.game.add.sprite(0,0,'short1');
	    
	    this.med = this.game.add.sprite(0,0,'med');
	    this.long = this.game.add.sprite(0,0,'long');
	    this.short1a = this.game.add.sprite(0,0,'short1');
	    this.short1b = this.game.add.sprite(0,0,'short1');
	    this.short1c = this.game.add.sprite(0,0,'short1');
	    this.short1d = this.game.add.sprite(0,0,'short1');
	    this.short1e = this.game.add.sprite(0,0,'short1');
	    
	    this.short0a = this.game.add.sprite(0,0,'short0');
	    this.short0b = this.game.add.sprite(0,0,'short0');
	    this.short0c = this.game.add.sprite(0,0,'short0');
	    this.short0d = this.game.add.sprite(0,0,'short0');    
	    
	    this.game.physics.arcade.enable([this.player, this.sign0, this.sign1, this.sign2, this.short1, this.med, this.long, this.short1a, this.short0a, this.short1b,this.short0b, this.short1c,this.short1d, this.short0c, this.short0d, this.short1e]);
	    
	    this.sign0.body.enable = true;
	    this.sign1.body.enable = true;
	    this.sign2.body.enable = true;
	    
	    this.short1.body.enable = true;
	    this.med.body.enable = true;
	    this.long.body.enable = true;
	    
	    this.short1a.body.enable = true; 
	    this.short1b.body.enable = true;
	    this.short1c.body.enable = true;
	    this.short1d.body.enable = true;
	    this.short1e.body.enable = true;
	    
	    this.short0a.body.enable = true;
	    this.short0b.body.enable = true;   
	    this.short0c.body.enable = true;
	    this.short0d.body.enable = true;
	    
	    this.sign0.reset(0,this.game.world.height - 140);
	    this.sign0.body.immovable = true;
	    
	    this.long.body.immovable = true;    
	    this.long.reset(this.sign0.body.width, this.game.world.height - 140);

	    this.short1.body.immovable = true;   
	    this.short1.reset(this.long.position.x + this.long.body.width, this.game.world.height - 140);
	    
	    this.sign2.body.immovable = true;    
	    this.sign2.reset(this.short1.position.x + this.short1.body.width + this.gap, this.game.world.height - 140);
	    
	    this.short0a.body.immovable = true;
	    this.short0a.reset(this.sign2.position.x+this.sign2.body.width, this.game.world.height -140);
	    this.nDame.reset(this.short0a.position.x,0);
	    
	    this.short1a.body.immovable = true;
	    this.short1a.reset(this.short0a.position.x+this.short0a.body.width, this.game.world.height-140);
	    
	    this.short1b.body.immovable = true;
	    this.short1b.reset(this.short1a.position.x+this.short1a.body.width, this.game.world.height-140);
	    
	    this.short0b.body.immovable = true;
	    this.short0b.reset(this.short1b.position.x+this.short1b.body.width, this.game.world.height-140);
	    
	    this.short1c.body.immovable = true;
	    this.short1c.reset(this.short0b.position.x+this.short0b.body.width, this.game.world.height-140);
	    //next gap
	    this.short1d.body.immovable = true;
	    this.short1d.reset(this.short1c.position.x+this.short1c.body.width+this.gap, this.game.world.height-140);
	    //gap
	    this.sign1.body.immovable = true;
	    this.sign1.reset(this.short1d.position.x+this.short1d.body.width+this.gap, this.game.world.height-140);
	    this.dLane.reset(this.sign1.position.x + 10, 0);
	    
	    //short0-short0-med-gap-short1
	    this.short0c.body.immovable = true;
	    this.short0c.reset(this.sign1.position.x+this.sign1.body.width, this.game.world.height-140);
	    
	    this.short0d.body.immovable = true;
	    this.short0d.reset(this.short0c.position.x+this.short0c.body.width, this.game.world.height-140);
	    
	    this.med.body.immovable = true;
	    this.med.reset(this.short0d.position.x+this.short0d.body.width,
	             this.game.world.height-140);
	    
	    //gap
	    this.short1e.body.immovable = true;
	    this.short1e.reset(this.med.position.x+this.med.body.width+this.gap,
	                 this.game.world.height-140);
	    

	    
	    //player.body.collideWorldBounds = true;
	    this.player.body.gravity.y = 800;
	    this.player.anchor.setTo(0.5, 1);
	},
	PlaceBlocks: function(){    
	     //Make blocks    
	    this.block_group = this.game.add.group();     
	    
	    this.block_group.enableBody = true;
	    this.block_group.physicalBodyType = Phaser.Physics.ARCADE;
	  

	    for(var i = 0; i < 9; i++){
	        this.block_group.create(100*i, this.game.world.height-200, 'block');  
	        this.block_group.children[i].body.immovable = true;
	    }
	    
	    //bottom right first block
	    this.block_group.children[0].reset(this.short1.position.x+this.short1.body.width - this.block_group.children[0].body.width, this.game.world.height-200);
	    
	    //top right first block
	    this.block_group.children[1].reset(this.block_group.children[0].position.x, this.game.world.height-264);
	    //left lower first block
	    this.block_group.children[2].reset(this.block_group.children[0].position.x-this.block_group.children[0].body.width, this.game.world.height-200);
	    
	    this.block_group.children[3].reset(this.short1b.position.x+this.block_group.children[3].body.width, this.game.world.height-200);
	    
	    this.block_group.children[4].reset(this.sign1.position.x+this.sign1.body.width-this.block_group.children[4].body.width, this.game.world.height-200);
	    
	    this.block_group.children[5].reset(this.med.position.x-this.med.body.width/8, this.game.world.height-200);
	    this.block_group.children[6].reset(this.med.position.x, this.game.world.height-200);
	    this.block_group.children[8].reset(this.med.position.x+this.med.body.width/2, this.game.world.height-200);
	},
	collectCollide: function(obj1, obj2){     
	    obj2.kill();
	    this.ui_group.children[this.points].alpha = 1;
	    this.points++;
	    /* Check victory */
	    if(this.points == 4) {
	    	if(MaestroGameBuilder.Options.progress.stillPlaying==false&&MaestroGameBuilder.Options.progress.levels[MaestroGameBuilder.Options.progress.nextLevel.index].complete!=true){
	    		MaestroGameBuilder.Options.progress.levels[MaestroGameBuilder.Options.progress.nextLevel.index].complete = true;
	    		MaestroGameBuilder.Options.progress.nextLevel.index++;
	    	}
	    	var self = this;
	    	MGBUtils.launchModal(this.game.textData[this.game.state.current].success.title,this.game.textData[this.game.state.current].success.text,this,function(){
		    	/* TODO victory text then back to home*/
	    		MaestroGameBuilder.Options.container.className = 'fade';
	            /* Time parameter matches the CSS transition length so fade completes */
	            window.setTimeout(function(){
	            	/* Controlled by Plugin */
	            	self.game.paused = false;
					self.state.start("LevelMenu");
					//MGBUtils.resumeGame(self);
	            },300);
	    	});
	    }
	},
	update: function(){
	    this.game.physics.arcade.collide(this.player,[this.sign0, this.long, this.short1, this.sign1, this.sign2, this.short1a, this.short0a, this.short1b,this.short0b, this.short1c,this.short1d, this.short0c, this.short0d, this.med, this.short1e, this.block_group]);

	    this.game.physics.arcade.collide(this.player, this.collect_group, this.collectCollide, null, this);
	   

	    if(this.player.position.y > this.game.world.height + this.player.body.height){
	        this.playerDead();
	        //should have some sort of "you died" or sound that plays as well
	    }


	    if(this.player.alive){        
	        this.player.body.velocity.x = this.player_speed;
	        if((this.game.input.pointer1.isDown || this.jumpButton.isDown) && (this.player.body.onFloor() || this.player.body.touching.down)){
	            this.player.body.velocity.y = -this.initial_jump_velocity;
	            this.player.animations.play('jump');
	        }else if(!this.player.body.onFloor() && !this.player.body.touching.down){
	            if(this.player.y <= 150){
	                this.player.body.velocity.y = +this.initial_jump_pullback;
	            }
	        }else if(this.player.body.onFloor() || this.player.body.touching.down){
	            //play the run animation----!------!!!------!!!
	            this.player.animations.play('run');
	            
	        }
	        
	        if( (this.jumpButton.isUp && this.game.input.pointer1.isUp ) && !this.player.body.touching.down && this.player.y<= 500){
	            
	            this.player.body.velocity.y = +this.initial_jump_pullback;
	        }
	        if(!this.wrapping && this.player.x < this.game.width){
	            this.wrapping = true;
	        }else if(this.player.x >= this.game.width){
	            this.wrapping = false;
	        }
	        
	        this.game.world.wrap(this.player, 0, true, true, false);
	        
	        
	        this.game.camera.focusOnXY(this.player.x+this.camera_offset, this.player.y);
	    }       
	},
	playerDead: function(){
	    this.player.alive = false;
	    this.player.body.velocity.x = 0;
	    
	    this.player.position.x = 100;
	    this.player.position.y = this.game.world.centerY;
	    
	    this.game.time.events.add(Phaser.Timer.SECOND * 1, function(){
	       this.player.alive = true;
	    }, this);
	    
	}
};
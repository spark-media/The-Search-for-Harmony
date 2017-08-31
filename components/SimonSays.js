/*
Game Type: Simon Says
Description: Repeat the sequence of buttons pressed.
*/
MaestroGameBuilder.SimonSays = function (game) {};

MaestroGameBuilder.SimonSays.prototype = {
    create: function () {
    	MaestroGameBuilder.Options.container.style.backgroundImage = "none";
	    
	    //add the background
       	this.background = this.add.image(0, 0, 'SimonSaysBaseLayer_3x');
       	this.background.anchor.setTo(.5);

	    /* Increments with rounds of game. */
	    this.round = 0;

		/* Victory Image holder. max and min are the display range behind the clouds. */
		this.victoryImageGroup = this.game.add.group();
	    this.victoryImages = {};
	    this.maxX = .7;
       	this.minX = .3;
       	this.maxY = .7;
       	this.minY = .2;
       	/* Victory Images */
       	this.addVictorySlides();

       	this.layer2 = this.add.image(0, 0, 'SimonSaysLayer2_3x');
       	this.layer2.anchor.setTo(.5);
	    
	    
	    this.avatar = this.game.add.image(0, this.game.height*.5, 'SimonSaysAvatar_3x');
	    this.avatar.anchor.setTo(0,1);
	    
	    /* Add initial buttons. */
	    this.buttons = this.game.add.group();
	    this.buttonObjects = {};
	    this.buttons.count = 0;

	    /* Takes dynamic number of buttons and arranges accordingly. */
	    this.addButtons();
	    /* Used to control game playing note sequence. */
	    this.sequenceCounter = 0;
	    /* isPlaying is when game is playing sequence to follow. */
	    this.isPlaying = false;
	    /* expectsPattern is when player is supposed to respond. */
	    this.expectsPattern = false;
	    /* progressCounter increments on correct hit and resets on incorrect hit. */
	    this.progressCounter = 0;
	    

	    this.startButton = this.game.add.button(this.game.width-10, 10, 'SimonSaysPlayButton_3x', this.playButtonSequence, this,14,12,13);
	    this.startButton.anchor.setTo(1,0)
	    this.startButton.scale.setTo(0.5, 0.5);
        
        this.menuButton = this.game.add.button(10, 10, "menuButton", MGBUtils.pauseGame, this);
        var self = this;
        MGBUtils.launchModal(this.game.textData[this.game.state.current].help.title,this.game.textData[this.game.state.current].help.text,this,function(){
          self.game.paused = false;
          self.playButtonSequence();
        });
        /* Force resize to trigger */
        this.resize(this.game.width,this.game.height);
    },
    addVictorySlides: function() {
    	this.victoryImageGroup.removeAll(true);
    	this.victoryImages = [];
       	var self = this;
   		if(typeof MaestroGameBuilder.Options.playData['SimonSays'].sequences[this.round].images !== 'undefined'){
   			/* Determine the duration of the sound. */
   			var victory = self.game.cache.getSound(MaestroGameBuilder.Options.playData['SimonSays'].sequences[this.round].complete);
   			var durationMarkers = Math.floor(victory.data.duration*1000)/MaestroGameBuilder.Options.playData['SimonSays'].sequences[this.round].images.length;
   			var counter = 0;
   			MaestroGameBuilder.Options.playData['SimonSays'].sequences[this.round].images.forEach(function(image){
   				var randX = Math.random() * (self.maxX - self.minX) + self.minX;
   				var randY = Math.random() * (self.maxY - self.minY) + self.minY;
   				self.victoryImages[counter] = self.game.make.image(self.game.width*.55,self.game.height*.4,image);
   				self.victoryImages[counter].anchor.setTo(0.5);
   				//self.victoryImages[i][counter].scale.setTo(1.3);
   				self.victoryImages[counter].finalX = randX;
   				self.victoryImages[counter].finalY = randY;
   				self.victoryImages[counter].trigger = (durationMarkers*counter)+10;
   				self.victoryImages[counter].alpha = 0;
   				self.victoryImages[counter].markerLength = durationMarkers;
   				self.victoryImageGroup.add(self.victoryImages[counter]);
   				counter++;
   			});
   			/* So we know how many images in total will appear, for later implementation */
   			//self.totalImages = self.totalImages+MaestroGameBuilder.Options.playData['SimonSays'].sequences[this.round].images.length;
   		}
    },
    addButtons: function() {
    	this.buttons.removeAll(true);
    	this.buttons.count = 0;
    	this.buttonObjects = {};
    	var self = this;
    	var multiplier = 1;
    	var increment = this.game.width/MaestroGameBuilder.Options.playData['SimonSays'].sequences[this.round].buttons.length;
    	/* For each button provided, add metadata and set position. This is immediately overruled by resize.*/
    	MaestroGameBuilder.Options.playData['SimonSays'].sequences[this.round].buttons.forEach(function(button){
    		self.buttonObjects[self.buttons.count] = self.game.make.button((increment*multiplier)-(increment/2),self.game.height*.95,button.image, self.buttonPress, self);
    		self.buttonObjects[self.buttons.count].anchor.setTo(.5,1);
    		/* Store Metadata with the button. */
    		self.buttonObjects[self.buttons.count].data = button;
    		self.buttons.add(self.buttonObjects[self.buttons.count]);
    		multiplier++;
    		self.buttons.count++;
    	});
    	/* Scale the buttons if needed. */
    	if(this.round>0){
    		this.resize(this.game.width,this.game.height);
    	}
    },
    buttonPress: function(button) {
    	if(this.isPlaying){
    		return false;
    	}
    	if(this.expectsPattern){
    		if(button.data.id==MaestroGameBuilder.Options.playData['SimonSays'].sequences[this.round].sequence[this.progressCounter].key){
    			/* Right */
    			this.game.sound.play(button.data.sound);
    			/* Send up the ghost. */
    			this.createButtonGhost(button);
    			if(this.progressCounter==MaestroGameBuilder.Options.playData['SimonSays'].sequences[this.round].sequence.length-1){
    				/* Round victory! */
    				this.isPlaying = true;
    				var self = this;
    				var victorySound = this.game.sound.play(MaestroGameBuilder.Options.playData['SimonSays'].sequences[this.round].complete);
    				this.victoryImages.forEach(function(image){
    					var tweenA = self.game.add.tween(image).to({alpha:1},image.markerLength*.25,"Linear",true,image.trigger);
    					tweenA.onComplete.add(function(){
    						self.game.add.tween(image).to({alpha:0},image.markerLength*.1,"Linear",true,image.markerLength*.75);
    					},this);
    					//var tweenB = 
    					//tweenA.chain(tweenB);
    					//tweenA.start();
    				});
    				this.expectsPattern = false;
    				this.progressCounter = 0;
    				if(MaestroGameBuilder.Options.playData['SimonSays'].sequences.length-1<=this.round){
    					/* Level Complete */
              if(MaestroGameBuilder.Options.progress.stillPlaying==false&&MaestroGameBuilder.Options.progress.levels[MaestroGameBuilder.Options.progress.nextLevel.index].complete!=true){
                MaestroGameBuilder.Options.progress.levels[MaestroGameBuilder.Options.progress.nextLevel.index].complete = true;
                MaestroGameBuilder.Options.progress.nextLevel.index++;
              }
				    	
				    	victorySound.onStop.addOnce(function(){
					    	MGBUtils.launchModal(self.game.textData[self.game.state.current].success.title,self.game.textData[self.game.state.current].success.text,self,function(){
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
				    	});
    				}else{
    					var self = this;
    					victorySound.onStop.addOnce(function(){
	    					self.round++;
	    					/* Load Next Round */
	    					setTimeout(function(){
		    					self.isPlaying = false;
		    					self.addVictorySlides();
		    					self.addButtons();
		    					self.playButtonSequence();
	    					},500);
    					});
    				}
    			}else{
    				this.progressCounter++;
    			}
    		}else{
    			/* Wrong */
    			this.game.sound.play('SimonSaysWrong');
    			var self = this;
    			this.progressCounter = 0;
    			window.setTimeout(function(){
    				self.playButtonSequence();
    			},1100);
    			return false;
    		}
    		return false;
    	}
    	this.game.sound.play(button.data.sound);
    },
	resize: function (width, height) {
		MGBUtils.scaleSprite(this.background, this.game.width, this.game.height / 3, 0, 3);
		this.background.x = this.game.width/2;
		this.background.y = this.game.height/2;

		MGBUtils.scaleSprite(this.layer2, this.game.width, this.game.height / 3, 0, 3);
		this.layer2.x = this.game.width/2;
		this.layer2.y = this.game.height/2;

		MGBUtils.scaleSprite(this.avatar, this.game.width, this.game.height / 3, 0, 1);
		this.avatar.x = this.game.width*.01;
		this.avatar.y = this.game.height*.75;
        

		/*1.0*/
		var self = this;
    	var multiplier = 1;
    	var increment = this.game.width/MaestroGameBuilder.Options.playData['SimonSays'].sequences[this.round].buttons.length;
    	var scale = .4;
    	if(width<955){
    		scale = .37;
    	}
    	if(width<800){
    		scale = .37;
      }
    	if(width<660){
    		scale = .37;
    	}
		this.buttons.forEach(function(button){
			MGBUtils.scaleSprite(button, width, height / 3, 0, scale);
			button.x = (increment*multiplier)-(increment/2);
			button.y = self.game.height*.95;
			multiplier++;
		});

   		if(typeof MaestroGameBuilder.Options.playData['SimonSays'].sequences[this.round].images !== 'undefined'){
   			this.victoryImages.forEach(function(image){
   				MGBUtils.scaleSprite(image, self.game.width, self.game.height / 3, 0, 3);
				image.x = self.game.width*.5;
				image.y = self.game.height*.5;
   			});
   		}

		MGBUtils.scaleSprite(this.menuButton, width, height / 3, 50, .7);
		this.menuButton.x = 10;
		this.menuButton.y = 10;

		MGBUtils.scaleSprite(this.startButton, width, height /3, 50, .62);
		this.startButton.x = this.game.width-20;
		this.startButton.y = 10;
		/*
		Resize happens immediately, so we wait to remove the fade/curtain 
		until all the elements have jumped into place.
		*/
		MaestroGameBuilder.Options.container.className = '';
	},
	playButtonSequence: function(){
		if(this.isPlaying){
			return false;
		}    
		this.isPlaying = true;
	    this.game.time.events.repeat(Phaser.Timer.SECOND, MaestroGameBuilder.Options.playData['SimonSays'].sequences[this.round].sequence.length, this.playSequenceElement, this);
	},
	playSequenceElement: function() {
		var soundLocation = MaestroGameBuilder.Options.playData['SimonSays'].sequences[this.round].sequence[this.sequenceCounter].key;
		this.game.sound.play(MaestroGameBuilder.Options.playData['SimonSays'].sequences[this.round].buttons[soundLocation].sound);
		this.createButtonGhost(this.buttonObjects[soundLocation]);
		if(this.sequenceCounter>=MaestroGameBuilder.Options.playData['SimonSays'].sequences[this.round].sequence.length-1){
			this.sequenceCounter = 0;
			this.isPlaying = false;
			/* Player's turn. */
			this.expectsPattern = true;
		}else{
			this.sequenceCounter++;
		}
	},
	createButtonGhost: function(button) {
		/* Create a duplicate to float up */
		var cueImage = this.game.add.image(button.x,button.y,button.data.image);
		var scale = .40;
    	if(this.game.width<955){
    		scale = .31;
    	}
    	if(this.game.width<800){
    		scale = .28;
    	}
    	if(this.game.width<660){
    		scale = .23;
    	}
		cueImage.scale.setTo(scale);
		cueImage.anchor.setTo(.5,1);
		this.game.add.tween(cueImage).to({y: this.game.height/2,alpha: 0},1000, "Linear", true);
		window.setTimeout(function(){
			cueImage.destroy();
		},1000);
	}
};
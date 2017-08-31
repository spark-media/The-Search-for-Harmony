/*
Game Type: Top Down Bridge
Description: Press buttons timed with moving targets.
*/
MaestroGameBuilder.TopDownBridge = function (game) {};

MaestroGameBuilder.TopDownBridge.prototype = {
    create: function () {
    	MaestroGameBuilder.Options.container.style.backgroundImage = "none";
	    
    	//Declare variables
	    this.avatar;
	    this.collisionLine;
	    this.green_group;
	    this.green_leader;
	    

	    this.red_group;
	    this.red_leader; //keeps track of the latest red obj pulled from group

	    this.yellow_group;
	    this.yellow_leader;

	    this.blue_group;
	    this.blue_leader;

	    this.orange_group;
	    this.orange_leader;
	    /* Controls vertical drop of bridge */
	    this.bridgeSpeed = 7;
	    /* How fast the avatar exits.*/
	    this.exitSpeed = 7;
	    this.avatar_group;
	    
	    this.songLine; //the position on the song;
	    this.songA = [
	        [0,0,0,0],
	        [0,0,0,0],
	        [1,1,0,0],//Inro A
	        [0,0,0,0],
	        [1,1,0,0],
	        [0,0,0,0],
	        [0,1,1,0],
	        [0,0,0,0],
	        [0,1,1,0],
	        [0,1,1,0],
	        [0,0,0,0],
	        [0,1,1,1],
	        [0,0,1,1],
	        [0,0,1,0],
	        
	        //intro B
	        [1,1,1,1],
	        [1,0,0,2]
	        [0,1,1,1],
	        [0,1,0,2],
	        //[1,1,1,0],
	        [2,0,0,0],
	        [0,2,0,0],
	        [1,0,0,0],
	        [1,1,1,0],
	        [1,0,0,0],
	        [1,1,0,0],
	        [0,1,1,0],
	        [0,0,0,0],
	        [0,0,1,1],
	        [0,0,0,1],
	        [0,0,0,1],
	        [0,0,0,1],
	        [0,0,0,1],
	        //Interlude
	        [0,0,0,2],
	        [0,0,0,2],
	        [0,0,0,2],
	        [0,0,2,0],
	        [0,0,2,0],
	        [0,0,2,0],
	        [0,0,2,0],
	        [0,0,2,0],
	        [0,0,2,0],
	        [2,0,0,0],
	        [2,0,0,0],
	        [2,0,0,0],
	        [2,0,0,0],
	        [2,0,0,0],
	        [2,0,0,0],
	        [0,2,0,0],
	        [0,2,0,0],
	        [0,2,0,0],
	        [0,2,0,0],
	        [0,2,0,0],
	        [0,2,0,0],
	        [0,2,0,0],
	        [0,2,0,0],
	        [0,2,0,0],
	        [0,0,0,0],
	        [0,0,0,0],
	        [2,0,0,0],
	        
	    ];

	    this.timer;
	    this.victory = false;
	    /* Helps prevent duplicate points */
	 	this.collectBuffer = false;
	    this.keyQ;
	    this.keyW;
	    this.keyE;
	    this.keyR;
	    this.holdDuration; //this affects how long a note is "active" while the key is held down

	    this.missed; //tracks notes missed;
	    this.missed_Text;
	    this.score; //tracks notes hit;
	    this.score_Text;
	    
	    this.tempMissed; //holds number missed in a single array
	    this.tempNotesCount; //total number of notes available in array

	    //background elements
	    //this.ring1;
	    //this.ring2;
	    this.double;


	    //add the background
        this.background = this.add.image(0, 0, 'TopDownBridgeBaseLayer_3x');
        this.background.anchor.setTo(.5);

        this.bridge = this.add.image(this.game.width/2,0,'TopDownBridgePath_3x');
        this.bridge.anchor.setTo(0.5,0);
        this.bridge2 = this.add.image(this.game.width/2,0 - this.game.height-8,'TopDownBridgePath_3x');
        this.bridge2.anchor.setTo(0.5,0);
        //this.game.physics.arcade.enable(this.bridge);
        //this.bridge.body.enable = true;
        //console.log(this.bridge);
        //this.bridge.physicalBodyType = Phaser.Physics.ARCADE;
        //this.bridge.body.velocity.y = 450;

	    //this.ring0 = this.game.add.sprite(-300,100, 'TopDownBridgeRing0_3x');
	    //this.ring1 = this.game.add.sprite(600, -100, 'TopDownBridgeRing1_3x');
	    //this.ring2 = this.game.add.sprite(-500, -400, 'TopDownBridgeRing1_3x');
	    
	    this.collisionLine = this.game.add.sprite(150, 390, 'TopDownBridgeLine_3x');
	    //this.collisionLine.scale.setTo(1.85, 1);
	    this.collisionLine.anchor.setTo(.5,1);
	    
	    this.holdDuration = 600; //initialize how long a player can hold a key down
	    
	    this.missed = 0;
	    this.score = 0;
	    this.tempMissed = 0;
	    this.tempNotesCount = 0;
	    this.score_Text = this.game.add.text(this.game.width-50, 10, 'Score: ', {font: "25px Arial", fill: "#000000"});
	    this.score_Text.anchor.setTo(1,0);
	    this.missed_Text = this.game.add.text(this.game.width-50, 40, 'Missed: ', {font: "25px Arial", fill: "#000000"});
	    this.missed_Text.anchor.setTo(1,0);
	    this.createGroups();
	    
	  
	    
	    this.songLine = 0;
	    this.avatar = this.game.add.sprite(130, 400, 'TopDownBridgeAvatar_3x');
	    this.avatar.anchor.setTo(.5,1);
	    this.avatar.alpha = 0.5;
	    this.avatar.animations.add('run', [0, 1], 6, true);
	    this.avatar.animations.play('run');
	   	this.avatarPosition = 1;
	   	this.avatar.collectActive = false;

	    this.game.physics.arcade.enable(this.avatar);
	    this.avatar.body.allowGravity = false;
	    this.avatar.body.immovable = true;
	    //this.avatar.inputEnabled = true;
	    //this.avatar.input.useHandCursor = true;
	   	//this.avatar.input.enableDrag(false, true);
        //this.avatar.input.setDragLock(false, false);
        //this.avatar.events.onDragUpdate.add(this.spriteDrag, this);
	    
	    this.addButtons();
	    
	    this.timer = this.game.time.create(false);
	    this.timer.loop(620, this.playSong, this);
	    this.timer.start();
	    this.song = this.game.add.audio('TopDownBridgeMusic');
	    	    
	    this.double = 0;
	    /* Touch Events */
	   // this.game.input.onDown.add(this.touchMove, this);
	    //this.game.input.onDrag.add(this.touchMove, this);
	    //this.game.input.onHold.add(this.touchHold, this);
	   // this.game.input.onUp.add(this.touchUp, this);

        this.menuButton = this.game.add.button(10, 10, "menuButton", MGBUtils.pauseGame, this);
        var self = this;
        MGBUtils.launchModal(this.game.textData[this.game.state.current].help.title,this.game.textData[this.game.state.current].help.text,this,function(){
        	self.game.paused = false;
        	self.song.play();
        	setTimeout(function(){
        		/* Test Victory Condition */
        		if(self.checkVictory()){
	        		self.bridgeSpeed = 0;
	        		self.red_group.visible = false;
	        		self.green_group.visible = false;
	        		self.orange_group.visible = false;
	        		self.blue_group.visible = false;
	        		self.yellow_group.visible = false;
	        		self.collisionLine.visible = false;
	        		self.avatar.alpha = 1;
	        		self.victory = true;
	        		if(MaestroGameBuilder.Options.progress.stillPlaying==false&&MaestroGameBuilder.Options.progress.levels[MaestroGameBuilder.Options.progress.nextLevel.index].complete!=true){
			    		MaestroGameBuilder.Options.progress.levels[MaestroGameBuilder.Options.progress.nextLevel.index].complete = true;
			    		MaestroGameBuilder.Options.progress.nextLevel.index++;
			    	}
	        		setTimeout(function(){
	        			MGBUtils.launchModal(self.game.textData[self.game.state.current].success.title,self.game.textData[self.game.state.current].success.text,self,function(){
		        			/* TODO victory text then back to home*/
				    		MaestroGameBuilder.Options.container.className = 'fade';
				            /* Time parameter matches the CSS transition length so fade completes */
				            window.setTimeout(function(){
				            	/* Controlled by Plugin TODO make dynamic depending on whether or not game was paused. */
				            	self.game.paused = false;
				            	MaestroGameBuilder.Options.progress.gameComplete = true;
								self.state.start("StartScreen");
								//MGBUtils.resumeGame(self);
				            },300);
	        			},false);       			
        			},3000);
	        	}else{
	        		/* Fail State */
        			MGBUtils.launchModal(self.game.textData[self.game.state.current].fail.title,self.game.textData[self.game.state.current].fail.text,self,function(){
	        			/* TODO victory text then back to home*/
			    		MaestroGameBuilder.Options.container.className = 'fade';
			            /* Time parameter matches the CSS transition length so fade completes */
			            window.setTimeout(function(){
			            	/* Controlled by Plugin TODO make dynamic depending on whether or not game was paused. */
			            	self.game.paused = false;
			            	self.song.stop();
							self.game.state.restart();
							//MGBUtils.resumeGame(self);
			            },300);
        			});  
	        	}	
        		/* 51000 needs adjusted to set the timeout of length of the song. */
        	},51000);
        });
        /* Force resize to trigger */
        this.resize(this.game.width,this.game.height);
    },
	resize: function (width, height) {
		/* Resize Assets */
        MGBUtils.scaleSprite(this.background, this.game.width, this.game.height / 3, 0, 3);
        this.background.x = this.game.width/2;
        this.background.y = this.game.height/2;

        MGBUtils.scaleSprite(this.bridge, this.game.width, this.game.height, 0, 1.2);
        this.bridge.x = this.game.width*.5;
        MGBUtils.scaleSprite(this.bridge2, this.game.width, this.game.height, 0, 1.2);
        this.bridge2.x = this.game.width*.5;

        /* Get avatar current position */
       MGBUtils.scaleSprite(this.collisionLine, this.game.width, this.game.height, 0, 1.2);
       this.collisionLine.x = this.game.width/2;
       this.collisionLine.y = this.game.height*.7;
       this.collisionLine.height = this.game.height*.05;
       this.collisionLine.width = this.game.width*.6;

       MGBUtils.scaleSprite(this.avatar, this.game.width, this.game.height / 3, 0, .8);
       this.avatar.y = this.game.height*.9;
       if(this.avatarPosition<=2){
       	this.avatar.x = this.game.width*.5;
       }
        // 
        // this.avatar.x = this.game.width*.1;
        // this.avatar.y = this.game.height*.97;

		MGBUtils.scaleSprite(this.menuButton, width, height / 3, 50, .7);
		this.menuButton.x = 10;
		this.menuButton.y = 10;

		/*
		Resize happens immediately, so we wait to remove the fade/curtain 
		until all the elements have jumped into place.
		*/
		MaestroGameBuilder.Options.container.className = '';
	},
	createGroups: function(){
    
	    this.red_group = this.game.add.group();
	    this.red_group.enableBody = true;
	    this.red_group.physicalBodyType = Phaser.Physics.ARCADE;
	    this.red_leader = 0; 
	    
	    
	    for(var i = 0; i < 9; i++){
	        this.red_group.create(75, -100 , 'TopDownBridgeNote_3x'); 
	        this.red_group.children[i].anchor.setTo(.5,0);
	        this.red_group.children[i].name = "q";
	        
	    };   

	    
	    this.green_group = this.game.add.group();
	    this.green_group.enableBody = true;
	    this.green_group.physicalBodyType = Phaser.Physics.ARCADE;
	    this.green_leader = 0; 
	    
	    for(var i = 0; i < 9; i++){
	        this.green_group.create(75, -100 , 'TopDownBridgeNote_3x'); 
	        this.green_group.children[i].anchor.setTo(.5,0);       
	    };
	    
	    this.yellow_group = this.game.add.group();
	    this.yellow_group.enableBody = true;
	    this.yellow_group.physicalBodyType = Phaser.Physics.ARCADE;
	    this.yellow_leader = 0; 
	    
	    for(var i = 0; i < 9; i++){
	        this.yellow_group.create(75, -100 , 'TopDownBridgeNote_3x');  
	        this.yellow_group.children[i].anchor.setTo(.5,0);      
	    };
	    
	    this.blue_group = this.game.add.group();
	    this.blue_group.enableBody = true;
	    this.blue_group.physicalBodyType = Phaser.Physics.ARCADE;
	    this.blue_leader = 0; 
	    
	    for(var i = 0; i < 9; i++){
	        this.blue_group.create(75, -100 , 'TopDownBridgeNote_3x'); 
	        this.blue_group.children[i].anchor.setTo(.5,0);       
	    };
	    
	    this.orange_group = this.game.add.group();
	    this.orange_group.enableBody = true;
	    this.orange_group.physicalBodyType = Phaser.Physics.ARCADE;
	    this.orange_leader = 0; 
	    
	    for(var i = 0; i < 9; i++){
	        this.orange_group.create(75, -100 , 'TopDownBridgeNote_3x');
	        this.orange_group.children[i].anchor.setTo(.5,0);        
	    };
	    
	    this.avatar_group = this.game.add.group();
	    this.avatar_group.enableBody = true;
	    this.avatar_group.physicalBodyType = Phaser.Physics.ARCADE;
	    for(var i = 0; i < 4; i++){
	        this.avatar_group.create(100 + (i*150), 400, 'TopDownBridgeAvatar_3x');
	        this.avatar_group.children[i].enableBody = false;
	        this.avatar_group.children[i].alpha = 0;   
	        this.avatar_group.children[i].body.allowGravity = false;
	        this.avatar_group.children[i].body.immovable = true;
	    }
	},
	playSong: function(){
	    this.tempMissed = 0;
	    this.tempNotesCount = 0;
	    if(this.songLine < this.songA.length){
	        for(var i = 0; i < 4; i++){ 
	            if(this.songA[this.songLine][i] == 1){
	                this.tempNotesCount++;
	                this.playNotes(i,1);               
	            }
	            if(this.songA[this.songLine][i] == 2){
	                this.playNotes(i,2);
	            }
	        }

	        this.songLine++;
	    }else{
	        this.songLine = 0;
	    }    
	},
	update: function(){
	    this.game.physics.arcade.collide(this.avatar, [this.red_group, this.green_group, this.blue_group,
	                                        this.yellow_group, this.red_group], this.noteCollide, null, this);
	    var self = this;
	    this.game.time.events.add(Phaser.Timer.SECOND *2, function(){
		    self.double++;
		    if(self.double == 1){
		        console.log("double: " + self.double);
		    }
		    if(self.double == 2){
		        console.log("double: " + self.double);
		    }
		    if(self.double == 3){
		        console.log("double: " + self.double);
		    }   
	    }, this);
	    
	    if(this.keyQ.isDown){       
	        if(this.keyQ.downDuration(this.holdDuration)){            
	            this.avatarMove(this.bridge.x-((this.bridge.width/8)*3),this.game.height*.9);
	            this.avatarPosition = 1;
	            this.avatar.qValue = true;
	        }else{
	            this.avatar.body.enable = false;
	            this.avatar.alpha = 0.5;
	            this.avatar.qValue = false;
	            
	        }      
	    }
	    
	    if(this.keyW.isDown){
	        if(this.keyW.downDuration(this.holdDuration)){
	            this.avatarMove(this.bridge.x-((this.bridge.width/8)*1),this.game.height*.9);
	            this.avatarPosition = 2;
	            this.avatar.wValue = true;
	        }else{
	            this.avatar.body.enable = false;
	            this.avatar.alpha = 0.5;
	            this.avatar.wValue = false;
	        
	        }    
	    }
	    
	    if(this.keyE.isDown){
	        if(this.keyE.downDuration(this.holdDuration)){
	            this.avatarMove(this.bridge.x+((this.bridge.width/8)*1),this.game.height*.9);
	            this.avatarPosition = 3;
	            this.avatar.eValue = true;
	        }else{
	            this.avatar.body.enable = false;
	            this.avatar.alpha = 0.5;
	            this.avatar.qValue = false;
	        }    
	    }
	    if(this.keyR.isDown){
	        if(this.keyR.downDuration(this.holdDuration)){
	            this.avatarMove(this.bridge.x+((this.bridge.width/8)*3), this.game.height*.9);
	            this.avatarPosition = 4;
	            this.avatar.rValue = true;
	        }else{
	            this.avatar.body.enable = false;
	            this.avatar.alpha = 0.5;
	            this.avatar.rValue = false;
	        }   
	    }
	    
	    if(this.keyQ.isDown == false && this.keyW.isDown == false && this.keyE.isDown == false && this.keyR.isDown == false){
	        this.holdDuration = 600;
	        this.avatar.body.enable = false;
	        this.avatar.alpha = 0.5;
	        this.avatar.qValue = false;
	        this.avatar.wValue = false;
	        this.avatar.eValue = false;
	        this.avatar.rValue = false;
	    }

	    if(this.game.input.pointer1.isDown&&this.victory!=true){
	    	this.avatar.body.enable = true;
	    	this.avatar.alpha = 1;
	    	if(Math.abs(this.bridge.x-((this.bridge.width/8)*3)-this.game.input.pointer1.x)<this.game.width*.06){
				/* Position 1 */
				this.avatarPosition = 1;
				this.avatarMove(this.bridge.x-((this.bridge.width/8)*3),this.game.height*.9);
			}else if(Math.abs(this.bridge.x-((this.bridge.width/8)*1)-this.game.input.pointer1.x)<this.game.width*.06){
				/* Position 2 */
				this.avatarPosition = 2;
				this.avatarMove(this.bridge.x-((this.bridge.width/8)*1),this.game.height*.9);
			}else if(Math.abs(this.bridge.x+((this.bridge.width/8)*1)-this.game.input.pointer1.x)<this.game.width*.06){
				/* Position 3 */
				this.avatarPosition = 3;
				this.avatarMove(this.bridge.x+((this.bridge.width/8)*1),this.game.height*.9);
			}else if(Math.abs(this.bridge.x+((this.bridge.width/8)*3)-this.game.input.pointer1.x)<this.game.width*.06){
				/* Position 4 */
				this.avatarPosition = 4;
				this.avatarMove(this.bridge.x+((this.bridge.width/8)*3),this.game.height*.9);
			}
	    	//this.touchMove(this.game.input1);
	    }

	    // if(this.avatar.collectActive==true){

	    // }
	    
	    this.checkNote(this.red_group);
	    this.checkNote(this.yellow_group);
	    this.checkNote(this.green_group);
	    this.checkNote(this.blue_group);
	      
	    this.bridge.y = this.bridge.y + this.bridgeSpeed;
	    this.bridge2.y = this.bridge2.y + this.bridgeSpeed;
	    if(this.bridge.y > this.game.height){
	    	this.bridge.y = 0 - this.bridge.height;
	    }
	   	if(this.bridge2.y > this.game.height){
	    	this.bridge2.y = 0 - this.bridge2.height;
	    }
	    /* Move sprite up if victorious. */
	    if(this.victory==true){
	    	this.avatar.y = this.avatar.y - this.exitSpeed;
	    	this.avatar.alpha = 1;
	    }
	},
	addButtons: function(){
	    this.keyQ = this.game.input.keyboard.addKey(Phaser.Keyboard.Q);
	    this.avatar.qValue = false;
	    
	    this.keyW = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
	    this.avatar.wValue = false;
	    
	    this.keyE = this.game.input.keyboard.addKey(Phaser.Keyboard.E);
	    this.avatar.eValue = false;
	    
	    this.keyR = this.game.input.keyboard.addKey(Phaser.Keyboard.R);
	    this.avatar.rValue = false;
	},
	score_GUI: function(){
	    this.score_Text.text = "Score: " + this.score;
	    this.missed_Text.text = "Missed: " + this.missed;
	},
	//movement Q-W-E-R should tween between positions
	avatarMove: function(xPos, yPos, key){    
	    this.avatar.body.enable = true;
	    this.avatar.alpha = 1;
	    this.avatar.tween = this.game.add.tween(this.avatar).to( {x: xPos, y: yPos}, 10, "Linear", true);    
	},
	noteCollide: function(obj1, obj2){
		if(this.victory==true){
			return;
		}
	    this.holdDuration += 500;
	    if(obj2.collected===false){
	    	if(this.collectBuffer==false){
				this.score++;
				this.collectBuffer = true;
				var self = this;
				setTimeout(function(){
					self.collectBuffer = false;
				},1);
			}
	    	obj2.collected = true;
	    }
	    this.score_GUI();
	    //obj2.body.enable = false;
	    this.game.add.tween(obj2).to({alpha:0}, 300, Phaser.Easing.Linear.None, true, 0);
	    this.game.time.events.add(Phaser.Timer.SECOND *0.2, function(){
	        obj2.kill();    
	    }, this);
	},
	sendNote: function(objGroup, groupLeader, posX, posY, speed){       
	    if(groupLeader < objGroup.length-1){
	        objGroup.children[groupLeader].body.enable = true;
	        objGroup.children[groupLeader].alpha = 1;
	        objGroup.children[groupLeader].collected = false;
	        objGroup.children[groupLeader].reset(posX,posY);
	        objGroup.children[groupLeader].body.velocity.y = speed;        
	    }
	},
	playNotes: function(position, noteType){
	    //position is 0-4 and refers to the place in the array. Similar to guitar fret number in tab
	    //noteType is 1 for single note, 2 for double note this is reflected in the song tab loaded at the start of the game
	    
	    
	    if(position ==0){
	        if(noteType == 1){
	            this.sendNote(this.green_group, this.green_leader,this.bridge.x-((this.bridge.width/8)*3), 0, 450);
	            this.green_leader++;
	        }
	        if(noteType == 2){
	            this.sendNote(this.green_group,this.green_leader, this.bridge.x-((this.bridge.width/8)*3),0, 450);
	            this.green_leader++
	            this.sendNote(this.green_group, this.green_leader, this.bridge.x-((this.bridge.width/8)*3), -90, 450);
	            this.green_leader++;            
	        }
	        
	        if(this.green_leader > 4){
	            this.green_leader = 0;
	        }
	        
	    }
	    if(position == 1){
	        if(noteType ==1){
	            this.sendNote(this.red_group, this.red_leader,this.bridge.x-((this.bridge.width/8)*1), -30, 450);
	            this.red_leader++
	        }
	        if(noteType == 2){
	            this.sendNote(this.red_group,this.red_leader, this.bridge.x-((this.bridge.width/8)*1),-30,450);
	            this.red_leader++;
	            this.sendNote(this.red_group,this.red_leader, this.bridge.x-((this.bridge.width/8)*1), -130, 450);
	            this.red_leader++;
	        }
	         if(this.red_leader > 4){
	            this.red_leader = 0;
	        }
	    }
	    
	    if(position == 2){
	        if(noteType == 1){
	            this.sendNote(this.blue_group, this.blue_leader, this.bridge.x+((this.bridge.width/8)*1), -50, 450);
	            this.blue_leader++;
	        }
	        if(noteType == 2){
	            this.sendNote(this.blue_group, this.blue_leader, this.bridge.x+((this.bridge.width/8)*1), -50, 450);
	            this.blue_leader++;
	            this.sendNote(this.blue_group, this.blue_leader, this.bridge.x+((this.bridge.width/8)*1), -140, 450);
	            this.blue_leader++;
	        }
	        
	        if(this.blue_leader > 4){
	            this.blue_leader = 0;
	        }
	    }
	    if(position == 3){
	        if(noteType == 1){
	            this.sendNote(this.yellow_group, this.yellow_leader, this.bridge.x+((this.bridge.width/8)*3), -80, 450);
	            this.yellow_leader++;
	        }
	        if(noteType == 2){
	            this.sendNote(this.yellow_group, this.yellow_leader, this.bridge.x+((this.bridge.width/8)*3),-80,450);
	            this.yellow_leader++;
	            this.sendNote(this.yellow_group, this.yellow_leader, this.bridge.x+((this.bridge.width/8)*3), -160, 450);
	            this.yellow_leader++;
	        }
	      
	        if(this.yellow_leader > 4){        
	            this.yellow_leader = 0;
	        }
	    }
	},
	checkNote: function(checkGroup){
		if(this.victory==true){
			return;
		}
	    for(var i = 0; i < 5; i++){
	        if(checkGroup.children[i].body.y > this.avatar.y){
	            this.missed++;
	            this.score_GUI();
	            checkGroup.children[i].body.velocity.y = 0;
	            checkGroup.children[i].reset(50, -100);
	            //checkGroup.children[i].loadTexture('TopDownBridgeMiss_3x');
	        }
	    }
	},
	checkVictory: function(){
		var total = this.score + this.missed;
		/* TODO add victory threshold as control */
		console.log(this.score/total);
		if(this.score/total>.75){
			return true;
		}else{
			return false;
		}
	},
	touchMove: function(pointer){		
		if(Math.abs(this.bridge.x-((this.bridge.width/8)*3)-pointer.x)<this.game.width*.06){
			/* Position 1 */
			this.avatarPosition = 1;
			this.avatarMove(this.bridge.x-((this.bridge.width/8)*3),this.game.height*.9);
		}else if(Math.abs(this.bridge.x-((this.bridge.width/8)*1)-pointer.x)<this.game.width*.06){
			/* Position 2 */
			this.avatarPosition = 2;
			this.avatarMove(this.bridge.x-((this.bridge.width/8)*1),this.game.height*.9);
		}else if(Math.abs(this.bridge.x+((this.bridge.width/8)*1)-pointer.x)<this.game.width*.06){
			/* Position 3 */
			this.avatarPosition = 3;
			this.avatarMove(this.bridge.x+((this.bridge.width/8)*1),this.game.height*.9);
		}else if(Math.abs(this.bridge.x+((this.bridge.width/8)*3)-pointer.x)<this.game.width*.06){
			/* Position 4 */
			this.avatarPosition = 4;
			this.avatarMove(this.bridge.x+((this.bridge.width/8)*3),this.game.height*.9);
		}
	},
	touchHold: function(pointer){
		console.log('holding');

	},
	touchUp: function(pointer){
		console.log('up');
	    this.avatar.body.enable = false;
	    this.avatar.alpha = 0.5;
	    this.avatar.collectActive = false;		
	},
	spriteDrag: function(sprite,pointer){
		this.touchMove(pointer);
	}
};
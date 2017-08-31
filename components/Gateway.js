/*
Game Type: Gateway
Description: Enter a 4 digit code to open the gate.
*/
MaestroGameBuilder.Gateway = function (game) {};

MaestroGameBuilder.Gateway.prototype = {
    create: function () {
    	MaestroGameBuilder.Options.container.style.backgroundImage = "none";
	    
	    //add the background
        this.background = this.add.image(0, 0, 'GatewayBaseLayer_3x');
        this.background.anchor.setTo(.5); 

        /* For when we win (will be optional) */
       	this.victoryAvatar = this.add.image(this.game.width/2,this.game.height/2, 'GatewayVictoryAvatar_3x');
	    this.victoryAvatar.anchor.setTo(.5);
	    this.victoryAvatar.alpha = 0;
	    /* Gates */
	    this.gateRight = this.add.image(this.game.width/2,this.game.height*.98, 'GatewayGateRight_3x');
	    this.gateRight.anchor.setTo(0,1);

	   	this.gateLeft = this.add.image(this.game.width/2,this.game.height*.98, 'GatewayGateLeft_3x');
	    this.gateLeft.anchor.setTo(1,1);

	    this.lockGroup = this.game.add.group();
	    this.lock = this.make.image(this.game.width/2,this.game.height*.5, 'GatewayLock_3x');
	    this.lock.anchor.setTo(.5);
	    this.lockGroup.add(this.lock);

	    this.avatar = this.add.image(this.game.width/2,this.game.height*.97, 'GatewayAvatar_3x');
	    this.avatar.anchor.setTo(.5,1);

	    this.keys = this.game.add.group();
	    this.keys.clickCount = [];
	    this.keyObjects = [];
	    this.keyActiveObjects = [];
	    /* Will be used to fade out active sprites and reset the counter. */
	    this.resetTimer = null;

	    for(var i = 0; i<4; i++){
	    	this.keyObjects[i] = this.game.make.button(this.lock.x-this.lock.width/2, this.lock.y, "GatewayKey"+(i+1)+'_3x', this.keyTap, this);
	    	this.keyObjects[i].id = i;
	    	this.keyObjects[i].anchor.setTo(0.5);
	    	this.keyActiveObjects[i] = this.game.make.button(this.lock.x-this.lock.width/2, this.lock.y, "GatewayKey"+(i+1)+'Active_3x', this.keyTap, this);
	    	this.keyActiveObjects[i].alpha = 0;
	    	this.keyActiveObjects[i].anchor.setTo(0.5);
	    	this.keyActiveObjects[i].id = i;
	    	this.keys.add(this.keyObjects[i]);
	    	this.keys.add(this.keyActiveObjects[i]);
	    	/* For code monitoring */
	    	this.keys.clickCount[i] = 0;
	    }
	    /* Fetch valid codes */
	    this.validCodes = ["7.1.8.5"];
	    this.noteArray = ['C','D','E','F','G','A','B','C2','D2','E2','F2','G2','A2','B2','C3','C2Sharp','D2Sharp'];
	    /* TODO - build the API endpoint to retrieve the codes. Also to send used codes. */
	 //    var self = this;
	 //    var request = new XMLHttpRequest();
		// request.open('GET', '/my/url', true);

		// request.onreadystatechange = function() {
		//   if (this.readyState === 4) {
		//     if (this.status >= 200 && this.status < 400) {
		//       // Success!
		//       var data = JSON.parse(this.responseText);
		//     } else {
		//       // Error :(
		//     }
		//   }
		// };

		// request.send();
		// request = null;

        this.menuButton = this.game.add.button(10, 10, "menuButton", MGBUtils.pauseGame, this);
        MGBUtils.launchModal(this.game.textData[this.game.state.current].help.title,this.game.textData[this.game.state.current].help.text,this);
        /* Force resize to trigger */
        this.resize(this.game.width,this.game.height);
    },
    keyTap: function(button){
    	var self = this;
    	var note = this.noteArray[Math.floor(Math.random()*this.noteArray.length)];
    	this.game.sound.play("LevelMenuNote"+note);
    	this.keys.clickCount[button.id]++;
    	this.game.add.tween(this.keyActiveObjects[button.id]).to({alpha: 1},100, "Linear", true);
    	if(this.resetTimer!=null){
    		clearTimeout(this.resetTimer);
    	}
    	console.log(this.keys.clickCount.join('.'));
    	if(this.keys.clickCount.join('.').indexOf(this.validCodes)>-1){
    		/* Victory! */
    		var victorySound = this.game.sound.play("GatewayKeyVictoryMusic");
    		this.game.add.tween(this.gateRight).to({x: this.game.width},1000, Phaser.Easing.Linear.None, true);
    		this.game.add.tween(this.gateLeft).to({x: 0},1000, Phaser.Easing.Linear.None, true);
    		this.game.add.tween(this.lockGroup).to({y: this.lockGroup.y+100,alpha: 0},1000, Phaser.Easing.Linear.None, true);
    		this.game.add.tween(this.keys).to({y: this.keys.y+100,alpha: 0},1000, Phaser.Easing.Linear.None, true);
    		var self = this;
    		setTimeout(function(){
    			self.game.add.tween(self.avatar).to({alpha: 0},500,Phaser.Easing.Linear.None,true);
    			self.game.add.tween(self.victoryAvatar).to({alpha: 1},500,Phaser.Easing.Linear.None,true);
    		},1600);
    		victorySound.onStop.addOnce(function(){
    			
		    	if(MaestroGameBuilder.Options.progress.stillPlaying==false&&MaestroGameBuilder.Options.progress.levels[MaestroGameBuilder.Options.progress.nextLevel.index].complete!=true){
		    		MaestroGameBuilder.Options.progress.levels[MaestroGameBuilder.Options.progress.nextLevel.index].complete = true;
		    		MaestroGameBuilder.Options.progress.nextLevel.index++;
		    	}

		    	MGBUtils.launchModal(self.game.textData[self.game.state.current].success.title,self.game.textData[self.game.state.current].success.text,self,function(){
			    	/* TODO victory text then back to home*/
		    		MaestroGameBuilder.Options.container.className = 'fade';
		            /* Time parameter matches the CSS transition length so fade completes */
		            window.setTimeout(function(){
		            	/* Controlled by Plugin */
		            	self.game.paused = false;
						self.state.start("LevelMenu");
		            },300);
		    	});
    		});
    	}else{
	    	this.resetTimer = setTimeout(function(){
	    		self.keyActiveObjects.forEach(function(button){
	    			self.game.add.tween(button).to({alpha: 0},300, "Linear", true);
	    			self.keys.clickCount[button.id] = 0;
	    		});
	    		this.resetTimer = null;
	    	},1500);    		
    	}
    },
	resize: function (width, height) {
		/* Resize Assets */
        MGBUtils.scaleSprite(this.background, this.game.width, this.game.height / 3, 0, 3);
        this.background.x = this.game.width/2;
        this.background.y = this.game.height/2;

        MGBUtils.scaleSprite(this.victoryAvatar, this.game.width, this.game.height / 3, 0, .7);
        this.victoryAvatar.x = this.game.width/2;
        this.victoryAvatar.y = this.game.height*.5;        

        MGBUtils.scaleSprite(this.gateRight, this.game.width, this.game.height / 3, 0, 2.7);
        this.gateRight.x = this.game.width/2-(this.gateRight.width*.02);
        this.gateRight.y = this.game.height*.94;

        MGBUtils.scaleSprite(this.gateLeft, this.game.width, this.game.height / 3, 0, 2.7);
        this.gateLeft.x = this.game.width/2+(this.gateLeft.width*.02);
        this.gateLeft.y = this.game.height*.94;

        MGBUtils.scaleSprite(this.lock, this.game.width, this.game.height / 3, 0, .7);
        this.lock.x = this.game.width/2;
        this.lock.y = this.game.height*.64;

        MGBUtils.scaleSprite(this.avatar, this.game.width, this.game.height / 3, 0, 1);
        this.avatar.x = this.game.width*.1;
        this.avatar.y = this.game.height*.97;

		MGBUtils.scaleSprite(this.menuButton, width, height / 3, 50, .7);
		this.menuButton.x = 10;
		this.menuButton.y = 10;
    	var scale = .38;
    	if(width<800){
    		scale = .2;
    	}
    	if(width<660){
    		scale = .32;
    	}
		var self = this;
    	var multiplier = 1.15;
    	var increment = this.game.width*.15795;
		this.keyObjects.forEach(function(button){
			MGBUtils.scaleSprite(button, width, height / 3, 0, scale);
			button.x = (self.lock.x-self.lock.width/2)+(self.lock.width*.125)*multiplier;
			button.y = self.lock.y;
			MGBUtils.scaleSprite(self.keyActiveObjects[button.id], width, height / 3, 0, scale);
			self.keyActiveObjects[button.id].x = button.x;
			self.keyActiveObjects[button.id].y = button.y;
			multiplier = multiplier + 1.9;
		});
		/*
		Resize happens immediately, so we wait to remove the fade/curtain 
		until all the elements have jumped into place.
		*/
		MaestroGameBuilder.Options.container.className = '';
	}
};
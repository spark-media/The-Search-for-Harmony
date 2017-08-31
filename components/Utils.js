/* Included and untouched - phaser list view */

/* 
Details on resopnsive design can be found here: 
http://www.netexl.com/blog/making-of-a-responsive-game-in-phaser-part-2/ 
*/
//import MaestroGameBuilderListView from 'phaser-list-view';
var MaestroGameBuilder = {};

/*
Options object. This is modified in preload if changed from defaults.
*/
MaestroGameBuilder.Options = {
	container: document.getElementById('MGBGameDiv'),
	baseWidth: 1920,
	baseHeight: 1080,
	testFeature: false,
	SimonSays: {
		setting1: true
	}
};


/*
Commonly used functions.
*/
MaestroGameBuilder.Utils = function (game) {};

MaestroGameBuilder.Utils.prototype = {
	scaleSprite: function (sprite, availableSpaceWidth, availableSpaceHeight, padding, scaleMultiplier) {
		var scale = this.getSpriteScale(sprite._frame.width, sprite._frame.height, availableSpaceWidth, availableSpaceHeight, padding);
		/* We swap assets based on game resolution, to minimize aliasing. */
	    var key = sprite.key;
	    var basename = key.split('_').shift();
	    //console.log(basename);
	    /* MGB Test sizes */
	    var ext = '';
	    // if(availableSpaceWidth>1920){
	    // 	/* FullScreen */
	    // 	ext = '_2x';
	    // }else if(availableSpaceWidth>1200){
	    // 	 Large 
	    // 	ext = '_2x';
	    // }else if(availableSpaceWidth>700){
	    // 	/* Medium */
	    // 	ext = '_2x';
	    // }else{
	    // 	/* Small */
	    // }
	    sprite.scale.x = scale * scaleMultiplier;
		sprite.scale.y = scale * scaleMultiplier;
	    // if(sprite.key!==basename+ext){
	    // 	sprite.loadTexture(basename+ext, 0);
	    // 	MGBUtils.scaleSprite(sprite, availableSpaceWidth, availableSpaceHeight, padding, scaleMultiplier);
	    // }
	},
	getSpriteScale: function (spriteWidth, spriteHeight, availableSpaceWidth, availableSpaceHeight, minPadding) {
		var ratio = 1;
		/* TODO handle pixel ratios */
		var currentDevicePixelRatio = 1;
		//var currentDevicePixelRatio = window.devicePixelRatio;
		
		// Sprite needs to fit in either width or height
		var widthRatio = (spriteWidth * currentDevicePixelRatio + 2 * minPadding) / availableSpaceWidth;
		var heightRatio = (spriteHeight * currentDevicePixelRatio + 2 * minPadding) / availableSpaceHeight;
		if(widthRatio > 1 || heightRatio > 1){
			ratio = 1 / Math.max(widthRatio, heightRatio);
		} 
		//console.log(ratio);
		return ratio * currentDevicePixelRatio;	
	},
	pauseGame: function () {
		console.log('paused');
		/* Calculate what 1% of width/height are for positioning. */
		var widthStandard = this.game.width/MaestroGameBuilder.Options.baseWidth;
		var heightStandard = this.game.height/100;

		this.game.pauseGroup = this.game.add.group(this.game.stage);
		this.game.pauseGroup.fixedToCamera = true;

        this.game.graphics = this.game.make.graphics(0, 0);
        this.game.graphics.beginFill(0xFFFFFF,0.3);
        this.game.graphics.drawRect(0,0,this.game.width,this.game.height);
        this.game.graphics.endFill();
        this.game.pauseGroup.add(this.game.graphics);

        this.game.pauseMenu = this.game.make.sprite(this.game.width/2,this.game.height/2, 'layerPause');
        this.game.pauseMenu.anchor.setTo(0.5, 0.5);
        MGBUtils.scaleSprite(this.game.pauseMenu, this.game.width, this.game.height / 3, 50, 1);
        this.game.pauseGroup.add(this.game.pauseMenu);

        this.game.pauseLayerPlayButton = this.game.make.sprite((this.game.width/2), (this.game.height/2), "pauseLayerPlayButton");
        this.game.pauseLayerPlayButton.anchor.setTo(0.5, 0.5);
        MGBUtils.scaleSprite(this.game.pauseLayerPlayButton, this.game.width, this.game.height / 3, 50, .7);
        this.game.pauseGroup.add(this.game.pauseLayerPlayButton);

        this.game.pauseLayerHelpButton = this.game.make.sprite((this.game.pauseMenu.x)-(this.game.pauseMenu.width/3.6), (this.game.height/2), "pauseLayerHelpButton");
        this.game.pauseLayerHelpButton.anchor.setTo(0.5, 0.5);
        MGBUtils.scaleSprite(this.game.pauseLayerHelpButton, this.game.width, this.game.height / 3, 50, .7);
        this.game.pauseGroup.add(this.game.pauseLayerHelpButton);

        this.game.pauseLayerQuitButton = this.game.make.sprite((this.game.pauseMenu.x)+(this.game.pauseMenu.width/3.6), (this.game.height/2), "pauseLayerQuitButton");
        this.game.pauseLayerQuitButton.anchor.setTo(0.5, 0.5);
        MGBUtils.scaleSprite(this.game.pauseLayerQuitButton, this.game.width, this.game.height / 3, 50, .7);
        this.game.pauseGroup.add(this.game.pauseLayerQuitButton);

        if(MaestroGameBuilder.Options.searchMode==true&&MaestroGameBuilder.Options.pauseIconFound==false){
        	/* Add a sprite here for discovery. */
        	this.game.pauseLayerSearchIcon = this.game.make.sprite((this.game.pauseMenu.x)-(this.game.pauseMenu.width/2)+this.game.width*.05, (this.game.height/2), 'SearchFlat_3x');
        	this.game.pauseLayerSearchIcon.anchor.setTo(0.5);
        	MGBUtils.scaleSprite(this.game.pauseLayerSearchIcon, this.game.width, this.game.height / 3, 50, .7);
        	this.game.pauseGroup.add(this.game.pauseLayerSearchIcon);
        	this.game.pauseLayerSearchIcon.inputEnabled = true;
        	this.game.pauseLayerSearchIcon.input.enableDrag(false, true);
        	this.game.pauseLayerSearchIcon.searchKey = 'item2';
        	//this.game.pauseLayerSearchIcon.events.onDragStop.add(, this);
        	//this.game.world.bringToTop(this.game.pauseLayerSearchIcon);
        }

        this.game.paused = true;
        this.game.modal = false;
        this.game.input.onDown.add(MGBUtils.pauseInteraction,this);
    },
    pauseInteraction: function (event) {
        /* Check Play Button */
        if(event.x>this.game.pauseLayerPlayButton.x-(this.game.pauseLayerPlayButton.width/2)
            && event.x<this.game.pauseLayerPlayButton.x+(this.game.pauseLayerPlayButton.width/2)
            && event.y > this.game.pauseLayerPlayButton.y-(this.game.pauseLayerPlayButton.height/2)
            && event.y < this.game.pauseLayerPlayButton.y+(this.game.pauseLayerPlayButton.height/2)){
            MGBUtils.resumeGame(this);
        	this.game.input.onDown.remove(MGBUtils.pauseInteraction,this);
        }
        if(!this.game.modal){
	        /* Check Quit Button */
	        if(event.x>this.game.pauseLayerQuitButton.x-(this.game.pauseLayerQuitButton.width/2)
	            && event.x<this.game.pauseLayerQuitButton.x+(this.game.pauseLayerQuitButton.width/2)
	            && event.y > this.game.pauseLayerQuitButton.y-(this.game.pauseLayerQuitButton.height/2)
	            && event.y < this.game.pauseLayerQuitButton.y+(this.game.pauseLayerQuitButton.height/2)){
	            MaestroGameBuilder.Options.container.className = 'fade';
	        	this.game.sound.stopAll();
	            /* Time parameter matches the CSS transition length so fade completes */
	            var self = this;
	            window.setTimeout(function(){
	            	/* Controlled by Plugin */
	            	if((MaestroGameBuilder.Options.gameType=='minigames_menu'&&self.game.state.current!='LevelMenu')||self.game.state.current=='LevelMenu'&&MaestroGameBuilder.Options.searchMode==true){
	            		if(MaestroGameBuilder.Options.searchMode==true){
	            			MaestroGameBuilder.Options.searchMode = false;
	            		}
	            		self.state.start("LevelMenu");
	            	}else{
	            		self.state.start("StartScreen");
	            	}
	            	if(typeof self.game.pauseLayerSearchIcon !== 'undefined'){
		        		self.game.pauseLayerSearchIcon.destroy();
		        	}
					MGBUtils.resumeGame(self);
	            },300);
	        }
	        /* Check Help Button */
	        if(event.x>this.game.pauseLayerHelpButton.x-(this.game.pauseLayerHelpButton.width/2)
	            && event.x<this.game.pauseLayerHelpButton.x+(this.game.pauseLayerHelpButton.width/2)
	            && event.y > this.game.pauseLayerHelpButton.y-(this.game.pauseLayerHelpButton.height/2)
	            && event.y < this.game.pauseLayerHelpButton.y+(this.game.pauseLayerHelpButton.height/2)){
	            //MaestroGameBuilder.Options.container.className = 'fade';
	            /* Time parameter matches the CSS transition length so fade completes */
	            var self = this;
	            window.setTimeout(function(){
	            	/* Controlled by Plugin */
					//self.state.start("StartScreen");
					MGBUtils.resumeGame(self);
					/* Text Data is set in Loading.preload */
					MGBUtils.launchModal(self.game.textData[self.game.state.current].help.title,self.game.textData[self.game.state.current].help.text,self);
	            },300);
	        } 
	        if(MaestroGameBuilder.Options.searchMode==true){
	        	/* Check SearchIcon button */
	        	if(event.x>this.game.pauseLayerSearchIcon.x-(this.game.pauseLayerSearchIcon.width/2)
		            && event.x<this.game.pauseLayerSearchIcon.x+(this.game.pauseLayerSearchIcon.width/2)
		            && event.y > this.game.pauseLayerSearchIcon.y-(this.game.pauseLayerSearchIcon.height/2)
		            && event.y < this.game.pauseLayerSearchIcon.y+(this.game.pauseLayerSearchIcon.height/2)){
		            MGBUtils.resumeGame(this);
		        	MaestroGameBuilder.Options.pauseIconFound = true;
		        	this.game.input.onDown.remove(MGBUtils.pauseInteraction,this);
		        }
	        }      	
        }
    },
    resumeGame: function(self,callback, response) {
    	var response = (typeof response !== 'undefined' ) ? response : null;
    	var callback = (typeof callback !== 'undefined' ) ? callback : null;
    	if(!self.game.modal){
    		self.game.pauseMenu.destroy();
    		self.game.pauseLayerHelpButton.destroy();
        	self.game.pauseLayerQuitButton.destroy();
        	self.game.pauseLayerPlayButton.destroy();
    	}else{
    		var parent = MaestroGameBuilder.Options.container;
			var child = document.getElementById("MGBHelpModal");
			parent.removeChild(child);
    	}
    	self.game.graphics.destroy();

        if( callback !== null ) {
        	callback(response);
        }else{
        	self.game.paused = false;
        }
        
        
    },
    launchModal: function( title, text, context, callback, pause ) {
    	var pause = (typeof pause !== 'undefined' ) ? pause : true;
    	var callback = (typeof callback !== 'undefined') ? callback : null;
    	var gameDiv = MaestroGameBuilder.Options.container;
    	var helpModal = document.createElement('div');
    	helpModal.id = 'MGBHelpModal';
    	var helpModalInner = document.createElement('div');
    	helpModalInner.id = 'MGBHelpModalInner';
    	var helpModalCanvas = document.createElement('div');
    	helpModalCanvas.id = 'MGBHelpModalCanvas';
    	helpModalCanvasInner = document.createElement('div');
    	helpModalCanvasInner.id = 'MGBHelpModalCanvasInner';
    	var titleNode = document.createElement('h2');
    	var titleText = document.createTextNode(title);
    	var textNode = document.createElement('div');
    	textNode.innerHTML = text;
    	titleNode.appendChild(titleText);
    	helpModalCanvasInner.appendChild(titleNode);
    	helpModalCanvasInner.appendChild(textNode);
    	helpModalCanvas.appendChild(helpModalCanvasInner);
    	var menuImg = document.createElement('img');
    	menuImg.src = 'assets/general/ModalMenu@3x.png';
    	helpModalCanvas.appendChild(menuImg);
    	var menuImgClose = document.createElement('a');
    	menuImgClose.href = '#';
    	menuImgClose.id = 'MGBModalClose';
    	menuImgClose.addEventListener('click', function(e){
    		e.preventDefault();    		
    		MGBUtils.resumeGame(context, callback);
    	}, false);
    	helpModalCanvas.appendChild(menuImgClose);
    	helpModalInner.appendChild(helpModalCanvas);
    	helpModal.appendChild(helpModalInner);
    	gameDiv.appendChild(helpModal);


		context.game.modalGroup = context.game.add.group(context.game.stage);
		context.game.modalGroup.fixedToCamera = true;

        context.game.graphics = context.game.make.graphics(0, 0);
        context.game.graphics.beginFill(0xFFFFFF,0.3);
        context.game.graphics.drawRect(0,0,context.game.width,context.game.height);
        context.game.graphics.endFill();
        context.game.graphics.z = 0;
        context.game.modalGroup.add(context.game.graphics);

  
        if(pause==true){
        	context.game.paused = true;
        }else{
        	console.log('not paused');
        }
        context.game.modal = true;   	
    },
    resize: function(width,height,self){
    	var widthStandard = self.game.width/MaestroGameBuilder.Options.baseWidth;
		var heightStandard = height/100;
    	self.game.graphics.width = width;
    	self.game.graphics.height = height;
    	if(!self.game.modal){
		    MGBUtils.scaleSprite(self.game.pauseMenu, width, height / 3, 50, 1);
	        self.game.pauseMenu.x = width/2;
	        self.game.pauseMenu.y = height/2;
	        MGBUtils.scaleSprite(self.game.pauseLayerHelpButton, width, height / 3, 50, .7);
	        self.game.pauseLayerHelpButton.x = (self.game.pauseMenu.x)-(self.game.pauseMenu.width/3.6);
	        self.game.pauseLayerHelpButton.y = (height/2);
	        MGBUtils.scaleSprite(self.game.pauseLayerQuitButton, width, height / 3, 50, .7);
	        self.game.pauseLayerQuitButton.x = (self.game.pauseMenu.x)+(self.game.pauseMenu.width/3.6);
	        self.game.pauseLayerQuitButton.y = (height/2); 
	        MGBUtils.scaleSprite(self.game.pauseLayerPlayButton, width, height / 3, 50, .7);
        	self.game.pauseLayerPlayButton.x = (width/2);
        	self.game.pauseLayerPlayButton.y = (height/2);   		
    	}



        if(self.game.modal){
        	/* External HTML is handling modal, so resize is not needed here. */
        }
    },
    setCookie: function(name,value,days) {
	    if (days) {
	        var date = new Date();
	        date.setTime(date.getTime()+(days*24*60*60*1000));
	        var expires = "; expires="+date.toGMTString();
	    }
	    else var expires = "";
	    document.cookie = name+"="+value+expires+"; path=/";
	},
	getCookie: function(name) {
	    var nameEQ = name + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0;i < ca.length;i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1,c.length);
	        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	    }
	    return null;
	},
	clearCookie: function(name) {
	    MGBUtils.createCookie(name,"",-1);
	},
	showMoreClue: function(){
		/* Reveals Clue Step 2 */
		document.getElementById('MGB_more-clue-text').style.display = 'block';
		document.getElementById('MGB_more-clue-link').style.display = 'none';
	}
};
var MGBUtils = new MaestroGameBuilder.Utils();


/*
We use stages to control where we navigate in the game and when.
*/
MaestroGameBuilder.Boot = function (game) {};

MaestroGameBuilder.Boot.prototype =  {
    init: function () {
        this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        this.game.stage.disableVisibilityChange = true;
        //this.game.renderer.renderSession.roundPixels = true;  
        //Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);  //for Canvas, modern approach
        //Phaser.Canvas.setSmoothingEnabled(this.game.context, true);  //also for Canvas, legacy approach
        //PIXI.scaleModes.DEFAULT = PIXI.scaleModes.NEAREST; //for WebGL

    },
    preload: function () {
    	
        //this.load.image("loading", "loading.png");
    },
    create: function () {
        this.state.start("Loading");
    }	
};
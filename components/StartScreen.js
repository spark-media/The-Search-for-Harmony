MaestroGameBuilder.StartScreen = function (game) {
};

MaestroGameBuilder.StartScreen.prototype = {
    create: function () {
    	//
    	//MaestroGameBuilder.Options.container.style.backgroundImage = "url('/full-game/assets/testbg.png')";
        this.background = this.add.image(0, 0, 'StartScreenBaseLayer_3x');
        this.background.anchor.setTo(.5);

        this.titleGraphic = this.game.add.image(this.game.width/2,this.game.height/2,'StartScreenTitle_3x');
        this.titleGraphic.anchor.setTo(0.5);
        //MGBUtils.scaleSprite(this.titleGraphic, this.game.width, this.game.height / 3, 50, 2);

        this.shareGroup = this.game.add.group();
        this.shareLayer = this.game.make.image(this.game.width/2,this.game.height/2,'StartScreenShareLayer_3x');
        this.shareLayer.anchor.setTo(0.5,1);
        //MGBUtils.scaleSprite(this.shareLayer, this.game.width, this.game.height / 3, 50, 2);     
        this.shareGroup.add(this.shareLayer);

        this.facebook = this.game.make.button(this.game.width/2, this.game.height/2, "StartScreenFacebook_3x", this.shareFacebook, this);
        this.facebook.anchor.setTo(.5,1);   
        this.shareGroup.add(this.facebook);

        this.twitter = this.game.make.button(this.game.width/2, this.game.height/2, "StartScreenTwitter_3x", this.shareTwitter, this);
        this.twitter.anchor.setTo(.5,1); 
        this.shareGroup.add(this.twitter);

        this.email = this.game.make.button(this.game.width/2, this.game.height/2, "StartScreenEmail_3x", this.shareEmail, this);
        this.email.anchor.setTo(.5,1); 
        this.shareGroup.add(this.email);

        this.playButton = this.game.add.button(this.game.width/2, this.game.height/2, "playbutton", this.playTheGame, this);
        this.playButton.anchor.setTo(.5,1);
        
        //this.playButton.frame = 0;
        //this.playButton.clicked = false;
        MGBUtils.scaleSprite(this.playButton, this.game.width, this.game.height / 3, 50, 1);

        this.aboutButton = this.game.add.button(this.game.width, this.game.height, "aboutbutton", this.aboutGame, this);
        this.aboutButton.anchor.setTo(.5,1);
        //this.aboutButton.frame = 0;
        //this.aboutButton.
        MGBUtils.scaleSprite(this.aboutButton, this.game.width, this.game.height / 3, 50, 1);

        console.log(MaestroGameBuilder.Options.progress.gameComplete);
        if(MaestroGameBuilder.Options.progress.gameComplete==true){
            if(typeof this.game.textData[this.game.state.current].complete !== 'undefined'){
                MGBUtils.launchModal(this.game.textData[this.game.state.current].complete.title,this.game.textData[this.game.state.current].complete.text,this);
            }
        }
        //this.game.input.onDown.add(this.unpause, this);
        /* Force resize to trigger */
        this.resize(this.game.width,this.game.height);
       },
	resize: function (width, height) {
		//this.background.height = height;
		//this.background.width = width;

		// MGBUtils.scaleSprite(this.title, width, height / 3, 50, 1);
		// this.title.x = this.world.centerX;
		// this.title.y = this.world.centerY - height / 3;
        MGBUtils.scaleSprite(this.background, this.game.width, this.game.height / 3, 0, 3);
        this.background.x = this.game.width/2;
        this.background.y = this.game.height/2;

		MGBUtils.scaleSprite(this.playButton, width, height / 3, 50, 1);
		this.playButton.x = this.game.width*.2;
		this.playButton.y = this.game.height*.92;

		MGBUtils.scaleSprite(this.aboutButton, width, height / 3, 50, 1);
		this.aboutButton.x = this.game.width*.8;
		this.aboutButton.y = this.game.height*.915;

        MGBUtils.scaleSprite(this.titleGraphic, this.game.width, this.game.height / 3, 50, 2);
        this.titleGraphic.x = this.game.width/2;
        this.titleGraphic.y = this.game.height/2 - this.titleGraphic.height/4;

        MGBUtils.scaleSprite(this.shareLayer, this.game.width, this.game.height / 3, 50, .8);
        this.shareLayer.x = this.game.width/2;
        this.shareLayer.y = this.game.height*.95;

        MGBUtils.scaleSprite(this.facebook, this.game.width, this.game.height / 3, 50, .6);
        this.facebook.x = this.game.width*.396;
        this.facebook.y = this.game.height*.935;

        MGBUtils.scaleSprite(this.twitter, this.game.width, this.game.height / 3, 50, .6);
        this.twitter.x = this.game.width*.5;
        this.twitter.y = this.game.height*.935;

        MGBUtils.scaleSprite(this.email, this.game.width, this.game.height / 3, 50, .6);
        this.email.x = this.game.width*.604;
        this.email.y = this.game.height*.935;


		/*
		Resize happens immediately, so we wait to remove the fade/curtain 
		until all the elements have jumped into place.
		*/
		window.setTimeout(function(){
			MaestroGameBuilder.Options.container.className = '';
		},100);
	},
    playTheGame: function (button) {
        MaestroGameBuilder.Options.container.className = 'fade';
        /* Time parameter matches the CSS transition length so fade completes */
        var self = this;
        if(MaestroGameBuilder.Options.progress.gameComplete==true){
            MaestroGameBuilder.Options.progress.stillPlaying = true;
        }
        window.setTimeout(function(){
        	/* Controlled by Plugin */
			self.state.start(MaestroGameBuilder.Options.StartLevel);
        },300);
    },
    aboutGame: function (button) {
        MGBUtils.launchModal(this.game.textData[this.game.state.current].help.title,this.game.textData[this.game.state.current].help.text,this);
    },
    shareFacebook: function (button) {
        window.open(
          'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(MaestroGameBuilder.Options.URL),
          'facebook-share-dialog',
          'width=626,height=436');
        return false;
    },
    shareTwitter: function (button) {
        window.open('https://twitter.com/intent/tweet?url='+MaestroGameBuilder.Options.URL+'&text=The+Search+For+Harmony&via=SearchForHarmony','_blank');
    },
    shareEmail: function (button) {
        window.open('https://api.addthis.com/oexchange/0.8/forward/email/offer?url='+MaestroGameBuilder.Options.URL+'&title=The+Search+For+Harmony','_blank');
        //https://api.addthis.com/oexchange/0.8/forward/email/offer?url=http%3A%2F%2Fwww.addthis.com%2F&pubid=ra-42fed1e187bae420&title=AddThis%20%7C%20Home&ct=1
    }
};
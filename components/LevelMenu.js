MaestroGameBuilder.LevelMenu = function (game) {};

MaestroGameBuilder.LevelMenu.prototype = {
    create: function () {
       /* Check if game is complete */
       if(MaestroGameBuilder.Options.progress.nextLevel.index>0){
        MaestroGameBuilder.Options.hasNotes = true;
       }
       if(MaestroGameBuilder.Options.progress.levels.length-1<MaestroGameBuilder.Options.progress.nextLevel.index&&MaestroGameBuilder.Options.progress.stillPlaying==false){
        MaestroGameBuilder.Options.progress.gameComplete = true;
        this.state.start("StartScreen");
        return false;
       }
       MaestroGameBuilder.Options.progress.nextLevel.index = Math.min(MaestroGameBuilder.Options.progress.nextLevel.index,MaestroGameBuilder.Options.progress.levels.length-1);
       /* Staff Positions*/
       this.noteCursorPositionY = null;
       this.staffPositions = {
        1: {
            note: 'C',
            sound: 'LevelMenuNoteC',
            sprite: 'LevelMenuNoteLine_3x'
        },
        2: {
            note: 'D',
            sound: 'LevelMenuNoteD',
            sprite: 'LevelMenuNote_3x'
        },
        3: {
            note: 'E',
            sound: 'LevelMenuNoteE',
            sprite: 'LevelMenuNote_3x'
        },
        4: {
            note: 'F',
            sound: 'LevelMenuNoteF',
            sprite: 'LevelMenuNote_3x'
        },
        5: {
            note: 'G',
            sound: 'LevelMenuNoteG',
            sprite: 'LevelMenuNote_3x'
        },
        6: {
            note: 'A',
            sound: 'LevelMenuNoteA',
            sprite: 'LevelMenuNote_3x'
        },
        7: {
            note: 'B',
            sound: 'LevelMenuNoteB',
            sprite: 'LevelMenuNote_3x'
        },
        8: {
            note: 'C',
            sound: 'LevelMenuNoteC2',
            sprite: 'LevelMenuNote_3x'
        },
        9: {
            note: 'D',
            sound: 'LevelMenuNoteD2',
            sprite: 'LevelMenuNote_3x'
        },
        10: {
            note: 'E',
            sound: 'LevelMenuNoteE2',
            sprite: 'LevelMenuNote_3x'
        },
        11: {
            note: 'F',
            sound: 'LevelMenuNoteF2',
            sprite: 'LevelMenuNote_3x'
        },
        12: {
            note: 'G',
            sound: 'LevelMenuNoteG2',
            sprite: 'LevelMenuNote_3x'
        },
        13: {
            note: 'A',
            sound: 'LevelMenuNoteA2',
            sprite: 'LevelMenuNoteLine_3x'
        },
        14: {
            note: 'B',
            sound: 'LevelMenuNoteB2',
            sprite: 'LevelMenuNote_3x'
        },
        15: {
            note: 'C',
            sound: 'LevelMenuNoteC3',
            sprite: 'LevelMenuNoteLine_3x'
        }         
       };
       this.incrementHeight = .021;

       this.background = this.add.image(0, 0, 'LevelMenuBaseLayer_3x');
       this.background.anchor.setTo(.5);

       /* Stands 2 - 5 come first */
       this.standGroups = {};
       this.standGroups["SimonSays"] = this.game.add.group();
       this.stand2 = this.add.image(this.game.width*.1,this.game.height*1.51,'LevelMenuStand2_3x');
       this.stand2.anchor.setTo(0,1);
       this.standGroups["SimonSays"].add(this.stand2);
    
       this.standGroups["Search"] = this.game.add.group();
       this.stand3 = this.add.image(this.game.width*.1,this.game.height*1.51,'LevelMenuStand3_3x');
       this.stand3.anchor.setTo(0,1);  
       this.standGroups["Search"].add(this.stand3);

       this.standGroups["Gateway"] = this.game.add.group();
       this.stand4 = this.add.image(this.game.width*.1,this.game.height*1.51,'LevelMenuStand4_3x');
       this.stand4.anchor.setTo(0,1);
       this.standGroups["Gateway"].add(this.stand4);

       this.standGroups["TopDownBridge"] = this.game.add.group();
       this.stand5 = this.add.image(this.game.width*.1,this.game.height*1.51,'LevelMenuStand5_3x');
       this.stand5.anchor.setTo(0,1);   
       this.standGroups["TopDownBridge"].add(this.stand5);

       this.layer2 = this.add.image(this.game.width*-.1, this.game.height*1.51, "LevelMenuLayer2_3x");
       this.layer2.anchor.setTo(.5,1);

       this.standGroups["BridgeRunner"] = this.game.add.group();
       this.stand1 = this.make.image(this.game.width*.1,this.game.height*1.51,'LevelMenuStand1_3x');
       this.stand1.anchor.setTo(0,1);
       this.standGroups["BridgeRunner"].add(this.stand1);

       if(MaestroGameBuilder.Options.searchMode==true){
        this.searchItem1Found = false;
        this.searchItem2Found = false;
        this.searchItem3Found = false;
        this.sharp = this.make.image(this.game.width*.1,this.game.height*1.51,'SearchSharp_3x');
        this.sharp.anchor.setTo(0.5);
        this.sharp.inputEnabled = true;
        this.sharp.input.enableDrag(false, true);
        this.sharp.symbol = 'sharp';
        this.sharp.events.onDragStop.add(this.symbolDragStop, this);
        this.standGroups["BridgeRunner"].add(this.sharp);
        this.searchOpen = false;
       }

       this.level1 = this.make.button(this.game.width*.1,this.game.height*1.51,'LevelMenuLevel1_3x', this.playLevel, this);
       this.level1.level = "BridgeRunner";
       this.level1.anchor.setTo(0,1);
       this.standGroups["BridgeRunner"].add(this.level1);

       this.level2 = this.make.button(this.game.width*.1,this.game.height*1.51,'LevelMenuLevel2_3x', this.playLevel, this);
       this.level2.level = "SimonSays";
       this.level2.anchor.setTo(0,1);
       this.standGroups["SimonSays"].add(this.level2);

       this.level3 = this.make.button(this.game.width*.1,this.game.height*1.51,'LevelMenuLevel3_3x', this.playLevel, this);
       this.level3.level = "Search";
       this.level3.anchor.setTo(0,1);
       this.standGroups["Search"].add(this.level3);

       this.level4 = this.make.button(this.game.width*.1,this.game.height*1.51,'LevelMenuLevel4_3x', this.playLevel, this);
       this.level4.level = "Gateway";
       this.level4.anchor.setTo(0,1);
       this.standGroups["Gateway"].add(this.level4);

       this.level5 = this.make.button(this.game.width*.1,this.game.height*1.51,'LevelMenuLevel5_3x', this.playLevel, this);
       this.level5.level = "TopDownBridge";
       this.level5.anchor.setTo(0,1);
       this.standGroups["TopDownBridge"].add(this.level5);

       this.menuButton = this.game.add.button(10, 10, "menuButton", MGBUtils.pauseGame, this);



       this.clue = this.game.add.text(this.game.width*.12, this.game.height*.04, this.game.textData[MaestroGameBuilder.Options.progress.levels[MaestroGameBuilder.Options.progress.nextLevel.index].key].clue, {
            font: "28px 'stixgeneralbold'",
            fill: "#000",
            stroke: "#fff",
            align: "left"
        });
       this.clue.strokeThickness = 4;
       this.clue.lineSpacing = -10;
       /* No clue needed if they already unlocked. */
       if(MaestroGameBuilder.Options.progress.levels[MaestroGameBuilder.Options.progress.nextLevel.index].unlocked){
        this.clue.alpha = 0;
       }
       if(MaestroGameBuilder.Options.searchMode==true){
        this.clue.alpha = 1;
        this.clue.setText(MaestroGameBuilder.Options.playData['Search'].clue);
       }
        /* Hidden position for inactive levels. */
        var self = this;
        MaestroGameBuilder.Options.progress.levels.forEach(function(level){
            if(!level.unlocked){
                self.standGroups[level.key].y = self.game.height;
            }
        });

        if(MaestroGameBuilder.Options.hasNotes){
         this.staffGroup = this.game.add.group();
         this.staff = this.make.image(this.game.width*.1,this.game.height*1.51,'LevelMenuStaff_3x');
         this.staff.anchor.setTo(0,.5);
         this.staffGroup.add(this.staff);

         this.avatar = this.add.image(this.game.width*.1,this.game.height*1.51,'LevelMenuAvatar_3x');
         this.avatar.anchor.setTo(0,1);
        }
       this.noteArray = [];
       this.noteTextArray = [];
       this.savedNotePositions = MGBUtils.getCookie('PS_notePositions');
       if(this.savedNotePositions!=null){
        this.savedNotePositions = this.savedNotePositions.split('_');
       }

       if(MaestroGameBuilder.Options.hasNotes){
         for(var i = 0; i<4; i++){
          this.noteArray[i] = this.game.make.image(this.game.width*-.1, this.game.height*1.51, "LevelMenuNote_3x");
          this.noteArray[i].anchor.setTo(.5);

          /* Initial vertical position */
          var initialPosition = i + 4;
          if(this.savedNotePositions!=null){
              this.noteArray[i].staffPosition = this.savedNotePositions[i];
              initialPosition = this.savedNotePositions[i];
              if(this.noteArray[i].key!=this.staffPositions[this.savedNotePositions[i]].sprite){
                  this.noteArray[i].loadTexture(this.staffPositions[this.savedNotePositions[i]].sprite);
              }
          }else{
              this.noteArray[i].staffPosition = i+4;
          }
          /* Horizontal order (unchanging) */
          this.noteArray[i].staffOrder = i;
          //enable input
          this.noteArray[i].inputEnabled = true;
       
          //change the cursor to the hand version on hover
          this.noteArray[i].input.useHandCursor = true;
       
          //enable drag
          if(MaestroGameBuilder.Options.searchMode!=true){
              this.noteArray[i].input.enableDrag(false, true);
              this.noteArray[i].input.setDragLock(false, true);
          }else{
              this.noteArray[i].input.enableDrag(false, true);
          }
          this.noteArray[i].events.onDragStart.add(this.noteDragStart, this);
          this.noteArray[i].events.onDragUpdate.add(this.noteDragUpdate, this);
          this.noteArray[i].events.onDragStop.add(this.noteDragStop, this);
          this.staffGroup.add(this.noteArray[i]);
          this.noteTextArray[i] = this.game.make.text(this.noteArray[i].x, this.game.height/2, this.staffPositions[initialPosition].note, {
              font: "45px 'stixgeneralbold'",
              fill: "#000",
              stroke: "#fff",
              align: "center"
          }).setShadow(1, 1, 'rgba(255,255,255,0.2)', 3);
          this.noteTextArray[i].anchor.setTo(.5);
          this.staffGroup.add(this.noteTextArray[i]);
         }        
       }


        /* Clue Button */
       this.clueButton = this.game.add.button(10,30,'LevelMenuClueHelp_3x',this.clueHelp,this);
       this.clueButton.anchor.setTo(1,.5);
      if(MaestroGameBuilder.Options.progress.levels[MaestroGameBuilder.Options.progress.nextLevel.index].unlocked){
        this.clueButton.alpha = 0;
       }
        /* MaestroGameBuilder - Search Level modifications to the stage. */
        if(MaestroGameBuilder.Options.searchMode==true){
            /* Deactivate Button functionality. */
            this.level1.input.enableDrag(false, true);
            this.level2.input.enableDrag(false, true);
            //this.staff.inputEnabled = true;
            //this.staff.input.enableDrag(false, true);
            this.level3.loadTexture('SearchNaturalBook_3x');
            this.avatar.loadTexture('SearchAvatar_3x');


            this.cageGroup = this.game.add.group();
            this.cage = this.make.image(this.game.width*.35,this.game.height*2,'SearchCageClosed_3x');
            this.cage.anchor.setTo(0.5,1);
            this.cage.activated = false;
            this.cageGroup.add(this.cage);
            this.lock = this.make.image(this.game.width*.1,this.game.height*2,'SearchOpenLock_3x');
            this.lock.anchor.setTo(0.5,1);
            this.lock.visible = false;
            this.cageGroup.add(this.lock);
            this.natural = this.add.image(this.game.width*.1,this.game.height*1.51,'SearchNatural_3x');
            this.natural.anchor.setTo(0.5);
            this.natural.inputEnabled = true;
            this.natural.input.enableDrag(false, true);
            this.natural.searchKey = 'item3';
            this.natural.events.onDragStop.add(this.symbolDragStop, this);
            this.natural.visible = false;
            //this.standGroups["Search"].add(this.natural);
            MGBUtils.launchModal(this.game.textData["Search"].help.title,this.game.textData["Search"].help.text,this);
            this.searchModalDisplayed = true;
        }

        if(!MaestroGameBuilder.Options.hasNotes){
          MGBUtils.launchModal(this.game.textData[this.game.state.current].help.title,this.game.textData[this.game.state.current].help.text,this);
        }

        /* Force resize to trigger */
        this.resize(this.game.width,this.game.height);
    },
	resize: function (width, height) {

		MGBUtils.scaleSprite(this.menuButton, width, height / 3, 50, .7);
		this.menuButton.x = 10;
		this.menuButton.y = 10;

        MGBUtils.scaleSprite(this.stand1, width, height / 3, 50, 2);
        this.stand1.x = this.game.width*.01;
        this.stand1.y = this.game.height*1.28;

        MGBUtils.scaleSprite(this.stand2, width, height / 3, 50, 2.2);
        this.stand2.x = this.game.width*.12;
        this.stand2.y = this.game.height*1.06;

        MGBUtils.scaleSprite(this.stand3, width, height / 3, 50, 2.4);
        this.stand3.x = this.game.width*.33;
        this.stand3.y = this.game.height*1.03;

        MGBUtils.scaleSprite(this.level3, width, height / 3, 50, .8);
        if(MaestroGameBuilder.Options.searchMode==true){
            this.level3.x = this.game.width*.37;
        }else{
            this.level3.x = this.game.width*.42;
        }
        this.level3.y = this.game.height*.493;

        MGBUtils.scaleSprite(this.stand4, width, height / 3, 50, 2.5);
        this.stand4.x = this.game.width*.55;
        this.stand4.y = this.game.height*1;

        MGBUtils.scaleSprite(this.level4, width, height / 3, 50, .8);
        this.level4.x = this.game.width*.60;
        this.level4.y = this.game.height*.44;

        MGBUtils.scaleSprite(this.stand5, width, height / 3, 50, 2.7);
        this.stand5.x = this.game.width*.77;
        this.stand5.y = this.game.height*1;

        MGBUtils.scaleSprite(this.level5, width, height / 3, 50, .8);
        this.level5.x = this.game.width*.81;
        this.level5.y = this.game.height*.3755;

        MGBUtils.scaleSprite(this.layer2, this.game.width, this.game.height / 3, 0, 3);
        this.layer2.x = this.game.width*.36;
        this.layer2.y = this.game.height*1.41;

        MGBUtils.scaleSprite(this.background, this.game.width, this.game.height / 3, 0, 3);
        this.background.x = this.game.width/2;
        this.background.y = this.game.height/2;

        if(MaestroGameBuilder.Options.hasNotes){
          if(MaestroGameBuilder.Options.searchMode==true){
              MGBUtils.scaleSprite(this.avatar, width, height / 3, 50, 1.2);
              this.avatar.x = this.game.width*.507;
              this.avatar.y = this.game.height*.91;            
          }else{
              MGBUtils.scaleSprite(this.avatar, width, height / 3, 50, 1.2);
              this.avatar.x = this.game.width*.5;
              this.avatar.y = this.game.height*.91;
          }
        }


        if(MaestroGameBuilder.Options.searchMode==true){
            MGBUtils.scaleSprite(this.sharp, width, height / 3, 50, .7);
            if( typeof this.sharp.xStore!== 'undefined' ){
                this.sharp.x = this.level1.xStore;
                this.sharp.y = this.level2.yStore;
            }else{
                this.sharp.x = this.game.width*.085;
                this.sharp.y = this.game.height*.8;
            }
            MGBUtils.scaleSprite(this.cage, width, height / 3, 50, 1.8);
            if(this.cage.activated == false){
                //this.cage.x = this.game.width*.35;
                //this.cage.y = this.game.height+this.cage.height+20;
                this.cage.activated = true;
                
            }else{
                this.cage.x = this.game.width*.35;
                this.cage.y = this.game.height*1.1;
            }
            MGBUtils.scaleSprite(this.lock, width, height / 3, 50, .7);
            this.lock.x = this.game.width*.352;
            this.lock.y = this.game.height*.925;   
            MGBUtils.scaleSprite(this.natural, width, height / 3, 50, .7);
            this.natural.x = this.game.width*.435;
            this.natural.y = this.game.height*.393;        
        }

        /* Draggables during Search mode */
        MGBUtils.scaleSprite(this.level1, width, height / 3, 50, .77);
        if( typeof this.level1.xStore!== 'undefined' ){
            this.level1.x = this.level1.xStore;
            this.level1.y = this.level2.yStore;
        }else{
            this.level1.x = this.game.width*.045;
            this.level1.y = this.game.height*.9;
        }
        MGBUtils.scaleSprite(this.level2, width, height / 3, 50, .8);
        if(typeof this.level2.xStore!=='undefined'){
            this.level2.x = this.level2.xStore;
            this.level2.y = this.level2.yStore;
        }else{
            this.level2.x = this.game.width*.175;
            this.level2.y = this.game.height*.583;
        }

        if(MaestroGameBuilder.Options.searchMode==true){
            this.openSearchLevel();
        }

        if(MaestroGameBuilder.Options.hasNotes){
          MGBUtils.scaleSprite(this.staff, width, height / 3, 50, .7);
          this.staff.x = this.game.width*.58;
          this.staff.y = this.game.height*.77;
        }

        var multiplier;
        if(MaestroGameBuilder.Options.hasNotes){
          for(var i = 0; i<4; i++){
              multiplier = .893 - (this.noteArray[i].staffPosition*this.incrementHeight);
              MGBUtils.scaleSprite(this.noteArray[i], this.game.width, this.game.height / 3, 0, .4);
             // if(MaestroGameBuilder.Options.searchMode==true&&typeof this.noteArray[i].xStore !=='undefined'){
                  /* Account for Search resizing */
             //     this.noteArray[i].x = this.noteArray[i].xStore;
             //     this.noteArray[i].y = this.noteArray[i].yStore;
             // }else{
                  this.noteArray[i].x = this.game.width*(.635+((i+1)*.06));
                  this.noteArray[i].y = this.game.height*multiplier;
             // }
              this.noteTextArray[i].x = this.game.width*(.635+((i+1)*.06));
              this.noteTextArray[i].y = this.game.height*.96;
              /*TODO use .setStyle('font again but with adjusted font size');*/
              if(this.game.width<800){
                  this.noteTextArray[i].setStyle({
                      font: "25px 'stixgeneralbold'",
                      fill: "#000",
                      stroke: "#fff",
                      align: "center"
                  });
              }else{
                  this.noteTextArray[i].setStyle({
                      font: "35px 'stixgeneralbold'",
                      fill: "#000",
                      stroke: "#fff",
                      align: "center"
                  });   
              }
              this.noteTextArray[i].setShadow(1, 1, 'rgba(255,255,255,0.2)', 3);
              if(MaestroGameBuilder.Options.searchMode!=true){
                  var targetVariationY = this.noteArray[i].y;
                  this.noteArray[i].bouncer = this.game.add.tween(this.noteArray[i]).to({y: targetVariationY-3}, 200,"Quart.easeOut").to({y: targetVariationY+3}, 400,"Quart.easeIn").to({y: targetVariationY}, 100,"Linear").repeatAll(300).start();
              }
          }
        }


        this.clue.x = this.game.width*.12;
        this.clue.y = this.game.height*.04;
        if(this.game.width<800){
            this.clue.setStyle({
                font: "16px 'stixgeneralbold'",
                fill: "#000",
                stroke: "#fff",
            });
        }else{
            this.clue.setStyle({
                font: "28px 'stixgeneralbold'",
                fill: "#000",
                stroke: "#fff",
            });   
        }
       this.clue.strokeThickness = 4;
       this.clue.lineSpacing = -10;
        if(this.game.paused){
            MGBUtils.resize(width,height,this);
        }

        if(MaestroGameBuilder.Options.hasNotes){
          MGBUtils.scaleSprite(this.clueButton, width, height / 3, 50, .3);
          this.clueButton.x = this.game.width*.96;
          this.clueButton.y = this.staff.y-(this.staff.height*.1);
        }
        /* Hidden position for inactive levels. */
        var self = this;
        MaestroGameBuilder.Options.progress.levels.forEach(function(level){
            if(!level.unlocked){
                self.standGroups[level.key].y = self.game.height;
            }
        });
		/*
		Resize happens immediately, so we wait to remove the fade/curtain 
		until all the elements have jumped into place.
		*/
		MaestroGameBuilder.Options.container.className = '';
	},
    noteDragStart: function(sprite,pointer){
        this.game.tweens.remove(this.noteArray[sprite.staffOrder].bouncer);
    },
    noteDragUpdate: function (sprite, pointer,dragX, dragY) {
        if(MaestroGameBuilder.Options.searchMode==true){
            return false;
        }
        //if we don't have a record of the initial cursor's position when it started dragging, grab one and exit

        //console.log(this.noteCursorPositionY);
        if(this.noteCursorPositionY === null) {
            this.noteCursorPositionY = sprite.y;
            return false;
        }else{
            /* Hide Note Letter until we know more. */
            this.noteTextArray[sprite.staffOrder].visible = false;
            /* Block if above or below staff */
            var staffTop = this.staff.y-(this.staff.height/2)-sprite.height;
            var staffBottom = this.staff.y+(this.staff.height/2)+10;

            if(sprite.y<staffTop){
                this.noteArray[sprite.staffOrder].y = staffTop;
                return false;
            }else if(sprite.y>staffBottom){
                this.noteArray[sprite.staffOrder].y = staffBottom;
                return false;
            }

            var originalPosition = this.game.height*(.893 - (parseInt(sprite.staffPosition)*this.incrementHeight));
            var downPosition = this.game.height*(.893 - (Math.max(1,parseInt(sprite.staffPosition)-1)*this.incrementHeight));
            var upPosition = this.game.height*(.893 - (Math.min(15,parseInt(sprite.staffPosition)+1)*this.incrementHeight));

            if(Math.abs(sprite.y-upPosition)<Math.abs(sprite.y-originalPosition)){
                this.noteArray[sprite.staffOrder].staffPosition = Math.min(15,sprite.staffPosition+1);
            }else if(Math.abs(sprite.y-downPosition)<Math.abs(sprite.y-originalPosition)){
                this.noteArray[sprite.staffOrder].staffPosition = Math.max(1,sprite.staffPosition-1);
            }

        }
    },
    noteDragStop: function (sprite, pointer) {
        if(MaestroGameBuilder.Options.searchMode==true){
            this.noteArray[sprite.staffOrder].xStore = sprite.x;
            this.noteArray[sprite.staffOrder].yStore = sprite.y;
            return false;
        }
        /* Snap to appropriate half-step */
        this.noteArray[sprite.staffOrder].y = this.game.height*(.893 - (sprite.staffPosition*this.incrementHeight));
        this.noteTextArray[sprite.staffOrder].setText(this.staffPositions[sprite.staffPosition].note);
        this.noteTextArray[sprite.staffOrder].visible = true;
        /* Play the appropriate sound */
        this.game.sound.play(this.staffPositions[sprite.staffPosition].sound);
        if(sprite.key!=this.staffPositions[sprite.staffPosition].sprite){
            sprite.loadTexture(this.staffPositions[sprite.staffPosition].sprite);
        }
        var combination = '';
        var sequenceData = [];
        for(var i = 0; i<4; i++){
            combination += this.noteArray[i].staffPosition.toString();
            sequenceData.push({key: this.noteArray[i].staffPosition});
            if(i<3){
                combination += '_';
            }
        }
        /* Set this as a cookie */
        MGBUtils.setCookie('PS_notePositions',combination);
        if(combination==MaestroGameBuilder.Options.progress.levels[MaestroGameBuilder.Options.progress.nextLevel.index].code&&!MaestroGameBuilder.Options.progress.levels[MaestroGameBuilder.Options.progress.nextLevel.index].unlocked){
            MaestroGameBuilder.Options.progress.levels[MaestroGameBuilder.Options.progress.nextLevel.index].unlocked = true;
            var tweenA = this.game.add.tween(this.standGroups[MaestroGameBuilder.Options.progress.levels[MaestroGameBuilder.Options.progress.nextLevel.index].key]).to( { y: 0 }, 2000, "Quart.easeOut");
            var tweenB = this.game.add.tween(this.clue).to( { alpha: 0 }, 2000, "Quart.easeOut");
            var tweenC = this.game.add.tween(this.clueButton).to( { alpha: 0 }, 2000, "Quart.easeOut");
            var self = this;
            window.setTimeout(function(){
              self.clueButton.destroy();
            },2000);
            tweenA.start();
            tweenB.start();
            tweenC.start();
            this.playSoundSequence(sequenceData,this);
        }
        var targetVariationY = sprite.y;
        this.noteArray[sprite.staffOrder].bouncer = this.game.add.tween(sprite).to({y: targetVariationY-3}, 200,"Quart.easeOut").to({y: targetVariationY+3}, 400,"Quart.easeIn").to({y: targetVariationY}, 100,"Linear").repeatAll(300).start();
    },
    viewGameHelp: function (button) {
        if (!button.clicked) {
            button.clicked = true;
        }
    },
    setAudio: function (button) {
        if (!button.clicked) {
            button.clicked = true;
        }
    },
    playSoundSequence: function(soundArray,context) {    
        var i = 0;
        context.game.time.events.repeat(Phaser.Timer.SECOND/2, 4, function(){
            var play = context.game.sound.play(this.staffPositions[soundArray[i].key].sound);
            i++;
            if(i>3){
                play.onStop.addOnce(function(){
                    soundArray.forEach(function(element,index){
                        context.game.sound.play(context.staffPositions[soundArray[index].key].sound);
                    });
                });
            }
        }, this);    
    },
    playLevel: function (button) {
        if(MaestroGameBuilder.Options.searchMode==true){
            return false;
        }
        if(button.level == "Search" ){
            MaestroGameBuilder.Options.searchMode = true;
            MaestroGameBuilder.Options.pauseIconFound = false;
            this.game.state.restart();
            return false;
        }
        if (!button.clicked) {
            button.clicked = true;
            MaestroGameBuilder.Options.container.className = 'fade';
            /* Time parameter matches the CSS transition length so fade completes */
            var self = this;
            window.setTimeout(function(){
                /* Controlled by Plugin */
                self.state.start(button.level);
            },300);
        }        
    },
    openSearchLevel: function() {
        if(this.searchOpen==true){
            return false;
        }
        this.game.add.tween(this.cage).to( { y: this.game.height*1.1 }, 2000, "Linear", true, 0).start();
        this.game.add.tween(this.level1).to({ y: this.level1.y*.98 }, 500, Phaser.Easing.Bounce.In).start();
        this.game.add.tween(this.level2).to({ y: this.level2.y*.99 }, 500, Phaser.Easing.Bounce.In).start();
        this.searchOpen = true;

    },
    resumed: function() {
       if(MaestroGameBuilder.Options.searchMode==true&&MaestroGameBuilder.Options.pauseIconFound==false){
        if(!this.searchModalDisplayed){
          this.game.pauseLayerSearchIcon.events.onDragStop.add(this.symbolDragStop, this);
        }else{
          this.searchModalDisplayed = false;
        }
        
       }
    },
    symbolDragStop: function(sprite,pointer){
        /* Item 1 - Sharp */
        if(sprite.x>this.level3.x
            && sprite.x<this.level3.x+(this.level3.width/2)
            && sprite.y > this.level3.y-(this.level3.height)
            && sprite.y < this.level3.y){
            this.searchItem1Found = true;
            MGBUtils.scaleSprite(this.sharp, this.game.width, this.game.height / 3, 50, .57);
            this.sharp.input.draggable = false;
            this.sharp.x = this.game.width*.392;
            this.sharp.y = this.game.height*.393;  
        }
        /* Item 2 - Flat */
        if(typeof sprite.searchKey !== 'undefined' && sprite.searchKey == 'item2'){
            if(sprite.x>this.level3.x+(this.level3.width/2)
                && sprite.x<this.level3.x+this.level3.width
                && sprite.y > this.level3.y-(this.level3.height)
                && sprite.y < this.level3.y){
                this.searchItem2Found = true;
                MGBUtils.scaleSprite(this.game.pauseLayerSearchIcon, this.game.width, this.game.height / 3, 50, .57);
                this.game.pauseLayerSearchIcon.input.draggable = false;
                this.game.pauseLayerSearchIcon.x = this.game.width*.474;
                this.game.pauseLayerSearchIcon.y = this.game.height*.393;  
            }
        }

        if(typeof sprite.searchKey !== 'undefined' && sprite.searchKey == 'item3'){
             if(sprite.x>this.cage.x-(this.cage.width*.45)
                && sprite.x<this.cage.x+(this.cage.width*.45)
                && sprite.y > this.cage.y-(this.cage.height*.6)
                && sprite.y < this.cage.y*.85){
                /*Victory!*/
                this.natural.visible = false;
                this.natural.alpha = 0;
                this.cage.loadTexture('SearchCageOpen_3x');
                this.cage.open = true;
                this.cage.x = this.game.width*.326;
                this.lock.visible = true;
                this.game.add.tween(this.lock).to( { y: this.game.height*1.2 }, 2000, "Linear").start();
                var self = this;
                MaestroGameBuilder.Options.progress.levels[MaestroGameBuilder.Options.progress.nextLevel.index].complete = true;
                MaestroGameBuilder.Options.progress.nextLevel.index++;
                setTimeout(function(){
                    MGBUtils.launchModal(self.game.textData["Search"].success.title,self.game.textData["Search"].success.text,self,function(){
                        /* TODO victory text then back to home*/
                        MaestroGameBuilder.Options.container.className = 'fade';
                        /* Time parameter matches the CSS transition length so fade completes */
                        window.setTimeout(function(){
                            /* Controlled by Plugin */
                            MaestroGameBuilder.Options.searchMode = false;
                            MaestroGameBuilder.Options.pauseIconFound = false;
                            self.game.pauseLayerSearchIcon.destroy();
                            self.game.paused = false;
                            self.game.state.restart();
                        },300);
                    });                    
                },2200);
            }           
        }
        /* Make third symbol visible to drag */
        if(this.searchItem1Found&&this.searchItem2Found&&this.natural.visible==false){
            this.natural.visible = true;
            //this.game.world.bringToFront(this.natural);
        }
        
    },
    clueHelp: function(){
      /* Toggle Help for the existing clue. */
      var text = this.game.textData[MaestroGameBuilder.Options.progress.levels[MaestroGameBuilder.Options.progress.nextLevel.index].key].hints[1];
      text += '<div id="MGB_more-clue"><a id="MGB_more-clue-link" href="#" onclick="MGBUtils.showMoreClue()">click here for more help...</a><div id="MGB_more-clue-text">'+this.game.textData[MaestroGameBuilder.Options.progress.levels[MaestroGameBuilder.Options.progress.nextLevel.index].key].hints[2]+'</div></div>';
      MGBUtils.launchModal('Hint',text,this);
    }
};
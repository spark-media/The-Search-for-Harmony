<!DOCTYPE html>
<html>
    <head>
		<link rel="stylesheet" href="css/maestro.css">
        <title>SFH Static Game</title>
    </head>
    <body>
        <div id="MGBGameWrap">
        	<div id="MGBGameDiv" class="fade"></div>
<!--         	<div id="MGBGameMeta">
				<span class="MGBGameMetaTitle">The Search for Harmony</span>
				<span class="MGBGameMetaAuthor"><a href="#">Stone Soup Productions, Inc.</a></span>
        	</div> -->
        </div>
        <script src="components/phaser.min.js"></script>
        <script src="components/Utils.js"></script>
    	<?php
		//depending on the type of game, we load differently.
		// loadState manages assets for the whole game, thus it exists in this PHP file.
		?>        
		<script src="components/StartScreen.js"></script>
		<script src="components/LevelMenu.js"></script>  
		<script src="components/BridgeRunner.js"></script> 
		<script src="components/SimonSays.js"></script>
		<script src="components/Gateway.js"></script>
		<script src="components/TopDownBridge.js"></script>            
        <script>
			/* Everything here below renders dynamically based on WP options.*/
			MaestroGameBuilder.Loading = function (game) {};

			MaestroGameBuilder.Loading.prototype = {
			    init: function () {
			    	
			    	
			    },
			    preload: function () {
			    	/*
					Game Options are modified from default via the PSOptions object in Utils.js
			    	*/
			    	this.game.textData = {
			    		"StartScreen" : {
			    			help : {
			    				title: "About The Game",
			    				text: "<p>Maestro needs your help!</p><p>His friend, Harmony, has disappeared. There are so many musical worlds, and he doesn't know which one she is in. The only problem is that the mythical bridges connecting these worlds are broken. Maestro needs to visit these worlds, find the clues needed to rebuild the bridges and find Harmony. Can you help him?</p><p>Your first stop is the world of George Bridgetower, an Afro-European violin prodigy and a close friend of Ludwig van Beethoven. Beethoven was so inspired by Bridgetower that he composed a revolutionary sonata in his honor.</p><p>Bridgetower was a violin virtuoso. We should all know who he is, but for some reason his story has been lost to history.</p><p>But if you can help Maestro rediscover Bridgetower's story, that will rebuild the bridge to another world...taking him one step closer to finding Harmony.</p><p>Ready to travel back to Bridgetower's world?</p><p>Click Play.</p>"
			    			},
			    			complete : {
			    				title: "Thanks for Playing!",
			    				text: "<p>We hope you enjoyed our first installment of <br /><em>The Search for Harmony</em>.</p><p>Please share it with your friends and help us continue the adventure.</p>"
			    			}
			    		},
			    		"LevelMenu" : {
			    			help : {
			    				title: 'Welcome!',
			    				text: '<p>Ready to help Maestro find Harmony? Get on your time travel gear and click "The Arrival" to teleport back in time!</p><p>Once you have completed that task, solve riddles by rearranging these notes in the correct order.</p>'
			    			}
			    		},
			    		"BridgeRunner" : {
			    			help : {
			    				title: 'The Arrival',
			    				text: '<p>George Bridgetower\'s life and career took him across Europe - from Esterhazy Castle in Hungary, where he served the king as a child and learned from the composer Josef Haydn, to his premiere public performance at the Drury Lane Theatre in London, to Vienna where he performed with Ludwig van Beethoven. Help Maestro navigate his way through landmarks from Bridgetower\'s life and collect pieces of the bridge along the way!</p><p>Collect all 4 musical notes. Use the spacebar to jump.</p>'
			    			},
			    			success : {
			    				title: 'You Did it!',
			    				text: '<p>You did it! Maestro now has the notes he needs to start rebuilding the bridge.</p>',
			    				button: 'OK'
			    			}
			    		},
			    		"SimonSays" : {
			    			help : {
			    				title: 'Melody Memory',
			    				text: '<p>Music is a form of personal expression. Composers draw inspiration from everywhere - nature, emotions, and memories...</p><p>Inspired by his friendship with Bridgetower, Beethoven composed a revolutionary new sonata. But after a falling out, Beethoven rededicated it to Rudolphe Kreutzer, a violinist who thought the music was so complex that it was impossible to play.</p><p>Help Maestro learn the <em>Kreutzer Sonata</em> by repeating the notes in the correct order. It\'s famous for being difficult so good luck!</p>'
			    			},
			    			success: {
			    				title: 'Well done!',
			    				text: '<p>You\'ve helped Maestro learn the <em>Kreutzer Sonata</em>!</p>'
			    			},
			    			clue: "Found on coins and in disguise.\nCompose a piece with ears and eyes.",
			    			hints: {
			    				1: '<p>FACEs in the spaces.</p>',
			    				2: '<p>Each line and gap on a musical staff represents a different note. Here are the notes that each line represents.</p><img src="/full-game/assets/clues/face.png" />'
			    			}
			    		},
			    		"Search" : {
			    			help : {
			    				title: 'The Search',
			    				text: '<p>When you write music, you can add various symbols to change the way a note is played. For example, there is a sharp (♯), a flat (♭), and a natural (♮).</p><p>Unlock the cage by combining a ♯ and a ♭ to create a ♮.</p><p>Look around the menu.  There must be a ♯ or ♭ hiding somewhere! Some parts might now be moved...</p>'
			    			},
			    			success: {
			    				title: 'Amazing!',
			    				text: '<p>Sharps and flats and naturals to victory! Onward!</p>'
			    			},
			    			clue: "Start down low and begin to climb\nthis musical mountain of sound and time.",
			    			hints: {
			    				1: '<p>A scale is when notes are played in order with no gaps.</p><img src="/full-game/assets/clues/scale.png" />',
			    				2: '<p>Create a scale using low C as your first note, and go up from there!</p>'
			    			}
			    		},
			    		"Gateway" : {
			    			help : {
			    				title: 'Gateway to Another World',
			    				text: '<p>To unlock this gate,<br/>the trick must be exact!<br/>Your teacher will trade it<br />for a Bridgetower fact!<br /><br /><a href="http://www.bl.uk/onlinegallery/features/blackeuro/bridgetowerbackground.html" target="_blank">Look here</a></p>'
			    			},
			    			success: {
			    				title: 'It\'s Time!',
			    				text: '<p>Cross into the next world to continue the search for Harmony!</p>'
			    			},
			    			clue: "A journey across the octave 'seas':\nLow, up, high, low, if you please.",
			    			hints: {
			    				1: '<p>An octave is the interval between one musical pitch and another with half or double the frequency.  For example two notes can be called "B," but sound totally different.</p><img src="/full-game/assets/clues/octave.png" />',
			    				2: '<p>Find all the C\'s and follow the pattern - Low, Mid, High, Low</p>'
			    			}
			    		},
			    		"TopDownBridge" : {
			    			help : {
			    				title: 'Bridge to Another World',
			    				text: '<p>Music is about more than just playing the right notes. It’s about playing the right notes at the right time. Play along with this piece from the <em>Kreutzer Sonata</em> to cross the bridge to the next world.</p><p>Q-W-E-R are the keys you use, or tap/drag to move Maestro.</p>'
			    			},
			    			success: {
			    				title: 'Bravo!',
			    				text: '<p>You have completed the world of George Bridgetower. But still Harmony remains missing. Where could she be...<br /><br />...to be continued.</p>'
			    			},
			    			fail: {
			    				title: 'Almost!',
			    				text: '<p>Practice makes perfect! Try again.</p>'
			    			},
			    			clue: "Play the high arpeggio\nand to another world you'll go.",
			    			hints: {
			    				1: '<p>An arpeggio is when the notes of a chord are played on their own in upwards or downwards order. Below is an example of a chord - to play an arpeggio, you could play each note one at a time starting from the bottom.</p><img src="/full-game/assets/clues/chord.png" />',
			    				2: '<p>The C major arpeggio has the notes C, E, G, and C. Try arranging the notes above one at a time on the music staff.</p>'
			    			}
			    		}
			    	};
			    	MaestroGameBuilder.Options.URL = "<?php echo 'http://beta.searchforharmony.org/'; ?>";
			    	MaestroGameBuilder.Options.gameType = 'minigames_menu';
			    	/* For the menu search, this activates the level in LevelMenu */
			    	MaestroGameBuilder.Options.searchMode = false;
			    	MaestroGameBuilder.Options.pauseIconFound = false;
			    	<?php 
			    	//temporary
			    	$start = 'LevelMenu';
			    	if(isset($_REQUEST['start'])){
			    		$start = $_REQUEST['start'];
			    	}
			    	
			    	?>
			    	MaestroGameBuilder.Options.StartLevel = '<?php echo $start; ?>';
			    	MaestroGameBuilder.Options.hasNotes = false;
			    	/* This object stores progress and will also be retrievable from a browser cookie. */
			    	MaestroGameBuilder.Options.progress = {
			    		gameComplete: false,
			    		stillPlaying: false,
			    		levels : [
				    		{	
				    			key: "BridgeRunner",
				    			complete: false,
				    			unlocked: true
				    		},
				    		{
				    			key: "SimonSays",
				    			complete: false,
				    			code: "4_6_8_10",
				    			
				    			unlocked: false
				    		},
				    		{
				    			key: "Search",
				    			complete: false,
				    			code: "1_2_3_4",
				    			
				    			unlocked: false
				    		},
				    		{
				    			key: "Gateway",
				    			complete: false,
				    			code: "1_8_15_1",
				    			unlocked: false
				    		},
				    		{
				    			key: "TopDownBridge",
				    			complete: false,
				    			code: "8_10_12_15",
				    			unlocked: false
				    		}
			    		],
			    		nextLevel : {
			    			index: 0
			    		}
			    	};
			    	<?php 
			    	if(isset($_REQUEST['level'])){
			    		if($_REQUEST['level']>0){
			    			?>
			    			MaestroGameBuilder.Options.hasNotes = true;
			    			MaestroGameBuilder.Options.progress.nextLevel.index = 1;
			    			MaestroGameBuilder.Options.StartLevel = 'LevelMenu';
			    			MaestroGameBuilder.Options.progress.levels[0].complete = true;
			    			<?
			    			if(isset($_REQUEST['unlocked'])&&$_REQUEST['unlocked']==true){
			    				?>
			    				MaestroGameBuilder.Options.progress.levels[1].unlocked = true;
			    				<?php
			    			}
			    		}
			    		if($_REQUEST['level']>1){
			    			?>
			    			MaestroGameBuilder.Options.progress.nextLevel.index = 2;
			    			MaestroGameBuilder.Options.progress.levels[1].unlocked = true;
			    			MaestroGameBuilder.Options.progress.levels[1].complete = true;
			    			<?
			    			if(isset($_REQUEST['unlocked'])&&$_REQUEST['unlocked']==true){
			    				?>
			    				MaestroGameBuilder.Options.progress.levels[2].unlocked = true;
			    				<?php
			    			}
			    		}
			    		if($_REQUEST['level']>2){
			    			?>
			    			MaestroGameBuilder.Options.progress.nextLevel.index = 3;
			    			MaestroGameBuilder.Options.progress.levels[2].unlocked = true;
			    			MaestroGameBuilder.Options.progress.levels[2].complete = true;
			    			<?
			    			if(isset($_REQUEST['unlocked'])&&$_REQUEST['unlocked']==true){
			    				?>
			    				MaestroGameBuilder.Options.progress.levels[3].unlocked = true;
			    				<?php
			    			}
			    		}
			    		if($_REQUEST['level']>3){
			    			?>
			    			MaestroGameBuilder.Options.progress.nextLevel.index = 4;
			    			MaestroGameBuilder.Options.progress.levels[3].unlocked = true;
			    			MaestroGameBuilder.Options.progress.levels[3].complete = true;
			    			<?
			    			if(isset($_REQUEST['unlocked'])&&$_REQUEST['unlocked']==true){
			    				?>
			    				MaestroGameBuilder.Options.progress.levels[4].unlocked = true;
			    				<?php
			    			}
			    		}
			    		if($_REQUEST['level']>4){
			    			?>
			    			MaestroGameBuilder.Options.progress.nextLevel.index = 3;
			    			MaestroGameBuilder.Options.progress.levels[4].unlocked = true;
			    			MaestroGameBuilder.Options.progress.levels[4].complete = true;
			    			<?
			    			if(isset($_REQUEST['unlocked'])&&$_REQUEST['unlocked']==true){
			    				?>
			    				MaestroGameBuilder.Options.progress.levels[5].unlocked = true;
			    				<?php
			    			}
			    		}
			    	}
			    	?>
			    	MaestroGameBuilder.Options.playData = {
			    		"Search" : {
			    			clue: "An accidental mystery.\nA natural conclusion."
			    		},
			    		"SimonSays" : {
		    				sequences: [
			    				{
			    					complete: 'SimonSaysSequence1',
			    					images: [
			    					'SimonSaysImage1_3x',
			    					'SimonSaysImage2_3x',
			    					'SimonSaysImage3_3x'
			    					],
			    					sequence: [
			    						{
			    							key: 0
			    						},
			    						{
			    							key: 1
			    						},
			    						{
			    							key: 2
			    						},
			    						{
			    							key: 5
			    						},
			    						{
			    							key: 4
			    						},
			    						{
			    							key: 3
			    						},
			    						{
			    							key: 2
			    						},
			    						{
			    							key: 2
			    						}
			    					],
			    					buttons: [
				    					{
				    						sound: 'LevelMenuNoteE',
				    						image: 'MelodyMemoryButtonE_3x',
				    						id: 0
				    					},
				    					{
				    						sound: 'LevelMenuNoteGSharp',
				    						image: 'MelodyMemoryButtonGSharp_3x',
				    						id: 1
				    					},
				    					{
				    						sound: 'LevelMenuNoteB',
				    						image: 'MelodyMemoryButtonB_3x',
				    						id: 2
				    					},
				    					{
				    						sound: 'LevelMenuNoteC2Sharp',
				    						image: 'MelodyMemoryButtonC2Sharp_3x',
				    						id: 3
				    					},	
				    					{
				    						sound: 'LevelMenuNoteD2Sharp',
				    						image: 'MelodyMemoryButtonD2Sharp_3x',
				    						id: 4
				    					},
				    					{
				    						sound: 'LevelMenuNoteE2',
				    						image: 'MelodyMemoryButtonE2_3x',
				    						id: 5
				    					}	    					
				    				]
			    				},
			    				{
			    					complete: 'SimonSaysSequence4',
			    					images: [
			    					'SimonSaysImage4_3x',
			    					'SimonSaysImage5_3x',
			    					'SimonSaysImage6_3x'
			    					],
			    					sequence: [
			    						{
			    							key: 4
			    						},
			    						{
			    							key: 3
			    						},
			    						{
			    							key: 1
			    						},
			    						{
			    							key: 2
			    						},
			    						{
			    							key: 3
			    						},
			    						{
			    							key: 1
			    						},
			    						{
			    							key: 0
			    						},
			    						{
			    							key: 0
			    						}
			    					],
			    					buttons: [
				    					{
				    						sound: 'LevelMenuNoteA',
				    						image: 'MelodyMemoryButtonA_3x',
				    						id: 0
				    					},
				    					{
				    						sound: 'LevelMenuNoteC2',
				    						image: 'MelodyMemoryButtonC2_3x',
				    						id: 1
				    					},
				    					{
				    						sound: 'LevelMenuNoteD2',
				    						image: 'MelodyMemoryButtonD2_3x',
				    						id: 2
				    					},	
				    					{
				    						sound: 'LevelMenuNoteE2',
				    						image: 'MelodyMemoryButtonE2_3x',
				    						id: 3
				    					},
				    					{
				    						sound: 'LevelMenuNoteA2',
				    						image: 'MelodyMemoryButtonA2_3x',
				    						id: 4
				    					}						    					
			    					]
			    				}
			    			]
			    		}
			    	}
			    	/*
					All Game Assets are loaded here.
			    	*/
					this.load.image('playbutton', 'assets/title/Play.png');
					this.load.image('aboutbutton', 'assets/title/About.png');
					this.load.image('menuButton','assets/overview/MenuButton@3x.png');
					this.load.image('layerPause','assets/general/LayerPause@3x.png');
					this.load.image('pauseLayerPlayButton','assets/general/PlayButton@3x.png');
					this.load.image('pauseLayerHelpButton','assets/general/HelpButton@3x.png');
					this.load.image('pauseLayerQuitButton','assets/general/QuitButton@3x.png');
					this.load.image('layerModal','assets/general/ModalMenu@3x.png');
					this.load.image('OK','assets/general/OK@3x.png');

					/* Title Screen */
					this.load.image('StartScreenBaseLayer_3x','assets/title/BaseLayer@3x.png');
					this.load.image('StartScreenPlay_3x','assets/title/Play@3x.png');
					this.load.image('StartScreenAbout_3x','assets/title/About@3x.png');
					this.load.image('StartScreenFacebook_3x','assets/title/Facebook@3x.png');
					this.load.image('StartScreenTwitter_3x','assets/title/Twitter@3x.png');
					this.load.image('StartScreenEmail_3x','assets/title/Email@3x.png');
					this.load.image('StartScreenShareLayer_3x','assets/title/ShareLayer@3x.png');
					this.load.image('StartScreenTitle_3x','assets/title/Title@3x.png');

					/* Level Menu */
					this.game.load.image('LevelMenuBaseLayer_3x','assets/overview/BaseLayer@3x.png');
					this.game.load.image('LevelMenuLayer2_3x','assets/overview/Layer2@3x.png');
					this.game.load.image('LevelMenuStand1_3x','assets/overview/Stand1@3x.png');
					this.game.load.image('LevelMenuStand2_3x','assets/overview/Stand2@3x.png');
					this.game.load.image('LevelMenuStand3_3x','assets/overview/Stand4@3x.png');
					this.game.load.image('LevelMenuStand4_3x','assets/overview/Stand4@3x.png');
					this.game.load.image('LevelMenuStand5_3x','assets/overview/Stand5@3x.png');
					this.game.load.image('LevelMenuLevel1_3x','assets/overview/Level1@3x.png');
					this.game.load.image('LevelMenuLevel2_3x','assets/overview/Level2@3x.png');
					this.game.load.image('LevelMenuLevel3_3x','assets/overview/Level3@3x.png');
					this.game.load.image('LevelMenuLevel4_3x','assets/overview/Level4@3x.png');
					this.game.load.image('LevelMenuLevel5_3x','assets/overview/Level5@3x.png');
					this.game.load.image('LevelMenuNote_3x','assets/overview/Note@3x.png');
					this.game.load.image('LevelMenuNoteLine_3x','assets/overview/NoteLine@3x.png');
					this.game.load.image('LevelMenuAvatar_3x','assets/overview/Avatar@3x.png');
					this.game.load.image('LevelMenuStaff_3x','assets/overview/Staff@3x.png');
					this.game.load.audio('LevelMenuNoteC', 'assets/overview/notec.mp3');
					this.game.load.audio('LevelMenuNoteD', 'assets/overview/noted.mp3');
					this.game.load.audio('LevelMenuNoteE', 'assets/overview/notee.mp3');
					this.game.load.audio('LevelMenuNoteF', 'assets/overview/notef.mp3');
					this.game.load.audio('LevelMenuNoteG', 'assets/overview/noteg.mp3');
					this.game.load.audio('LevelMenuNoteGSharp', 'assets/overview/notegsharp.mp3');
					this.game.load.audio('LevelMenuNoteA', 'assets/overview/notea.mp3');
					this.game.load.audio('LevelMenuNoteB', 'assets/overview/noteb.mp3');
					this.game.load.audio('LevelMenuNoteC2', 'assets/overview/notec2.mp3');
					this.game.load.audio('LevelMenuNoteC2Sharp', 'assets/overview/notec2sharp.mp3');
					this.game.load.audio('LevelMenuNoteD2', 'assets/overview/noted2.mp3');
					this.game.load.audio('LevelMenuNoteD2Sharp', 'assets/overview/noted2sharp.mp3');
					this.game.load.audio('LevelMenuNoteE2', 'assets/overview/notee2.mp3');
					this.game.load.audio('LevelMenuNoteF2', 'assets/overview/notef2.mp3');
					this.game.load.audio('LevelMenuNoteG2', 'assets/overview/noteg2.mp3');
					this.game.load.audio('LevelMenuNoteA2', 'assets/overview/notea2.mp3');
					this.game.load.audio('LevelMenuNoteB2', 'assets/overview/noteb2.mp3');
					this.game.load.audio('LevelMenuNoteC3', 'assets/overview/notec3.mp3');
					this.game.load.image('LevelMenuClueHelp_3x', 'assets/overview/ClueHelp@3x.png');

					/* Search */
					this.game.load.image('SearchAvatar_3x', 'assets/search/Avatar2@3x.png');
					this.game.load.image('SearchSharp_3x', 'assets/search/Sharp@3x.png');
					this.game.load.image('SearchFlat_3x', 'assets/search/Flat@3x.png');
					this.game.load.image('SearchNatural_3x', 'assets/search/Natural@3x.png');
					this.game.load.image('SearchNaturalBook_3x', 'assets/search/NaturalBook@3x.png');
					this.game.load.image('SearchOpenLock_3x', 'assets/search/OpenLock@3x.png');
					this.game.load.image('SearchCageOpen_3x', 'assets/search/CageOpen@3x.png');
					this.game.load.image('SearchCageClosed_3x', 'assets/search/CageClosed@3x.png');

					/* Bridge Runner */
					this.game.load.image('BridgeRunnerBaseLayer_3x', 'assets/bridge-runner/BaseLayer@3x.png');
					this.game.load.image('BridgeRunnerLayer2', 'assets/bridge-runner/Layer2.png');

				    this.game.load.image('bkg1', 'assets/bridge-runner/bkgSingle.png');
				    this.game.load.image('nDame', 'assets/bridge-runner/nDame.png');
				    this.game.load.image('eHouse', 'assets/bridge-runner/eHouse.png');
				    this.game.load.image('dLane', 'assets/bridge-runner/dLane.png');
				    this.game.load.spritesheet('BridgeRunnerPlayer', 'assets/bridge-runner/AvatarSprite@3x.png',325,504); //wordpress input
				    this.game.load.image('collectible', 'assets/bridge-runner/worldNote.png');
				    this.game.load.image('uiCollectible', 'assets/bridge-runner/uiNote.png');
				    this.game.load.image('block', 'assets/bridge-runner/block.png');    
				    this.game.load.image('endLight', 'assets/bridge-runner/endLight.png');
				    
				    /* Gateway */
				    this.game.load.image('GatewayBaseLayer_3x','assets/gateway/GatewayBaseLayer@3x.png');
				    this.game.load.image('GatewayGateRight_3x','assets/gateway/GateRight@3x.png');
				    this.game.load.image('GatewayGateLeft_3x','assets/gateway/GateLeft@3x.png');
				    this.game.load.image('GatewayLock_3x','assets/gateway/Lock@3x.png');
				    this.game.load.image('GatewayAvatar_3x','assets/gateway/Avatar2@3x.png');
				    this.game.load.image('GatewayVictoryAvatar_3x','assets/gateway/AvatarUpSolo@3x.png');
				    this.game.load.image('GatewayKey1_3x','assets/gateway/Key1@3x.png');
				    this.game.load.image('GatewayKey1Active_3x','assets/gateway/Key1Active@3x.png');
				    this.game.load.image('GatewayKey2_3x','assets/gateway/Key2@3x.png');
				    this.game.load.image('GatewayKey2Active_3x','assets/gateway/Key2Active@3x.png');
				    this.game.load.image('GatewayKey3_3x','assets/gateway/Key3@3x.png');
				    this.game.load.image('GatewayKey3Active_3x','assets/gateway/Key3Active@3x.png');
				    this.game.load.image('GatewayKey4_3x','assets/gateway/Key4@3x.png');
				    this.game.load.image('GatewayKey4Active_3x','assets/gateway/Key4Active@3x.png');
				    this.game.load.audio('GatewayKeyVictoryMusic', 'assets/gateway/kreutzer_violinIntro_loop.ogg');

				    //signs
				    this.game.load.image('sign0', 'assets/bridge-runner/sign0.png');
				    this.game.load.image('sign1', 'assets/bridge-runner/sign1.png');
				    this.game.load.image('sign2', 'assets/bridge-runner/sign2.png');
				    this.game.load.image('short0', 'assets/bridge-runner/short0.png');
				    this.game.load.image('short1','assets/bridge-runner/short1.png');
				    this.game.load.image('med', 'assets/bridge-runner/med.png');
				    this.game.load.image('long', 'assets/bridge-runner/long.png');

					/* Simon Says */
					this.game.load.audio('SimonSaysVictoryMusic', 'assets/simon/kreutzer_piano_intro.ogg');
					this.game.load.image('SimonSaysAvatar_3x','assets/simon/Avatar@3x.png');
					this.game.load.image('SimonSaysBaseLayer_3x','assets/simon/BaseLayer@3x.png');
					this.game.load.image('SimonSaysLayer2_3x','assets/simon/Layer2@3x.png');
					this.game.load.audio('SimonSaysSequence1', 'assets/simon/SimonSaysSequence1.mp3');
					this.game.load.audio('SimonSaysSequence4', 'assets/simon/SimonSaysSequence4.mp3');
					this.load.image('SimonSaysPlayButton_3x','assets/general/PlayButton@3x.png');
					this.game.load.audio('SimonSaysWrong', 'assets/simon/wrong.ogg');

					/* Notes*/
					this.game.load.image('MelodyMemoryButtonE_3x','assets/simon/MelodyMemoryButtonE@3x.png');
					this.game.load.image('MelodyMemoryButtonE2_3x','assets/simon/MelodyMemoryButtonE2@3x.png');
					this.game.load.image('MelodyMemoryButtonGSharp_3x','assets/simon/MelodyMemoryButtonGSharp@3x.png');
					this.game.load.image('MelodyMemoryButtonB_3x','assets/simon/MelodyMemoryButtonB@3x.png');
					this.game.load.image('MelodyMemoryButtonC2Sharp_3x','assets/simon/MelodyMemoryButtonC2Sharp@3x.png');
					this.game.load.image('MelodyMemoryButtonD2Sharp_3x','assets/simon/MelodyMemoryButtonD2Sharp@3x.png');
					this.game.load.image('MelodyMemoryButtonC2_3x','assets/simon/MelodyMemoryButtonC2@3x.png');
					this.game.load.image('MelodyMemoryButtonA2_3x','assets/simon/MelodyMemoryButtonA2@3x.png');
					this.game.load.image('MelodyMemoryButtonA_3x','assets/simon/MelodyMemoryButtonA@3x.png');
					this.game.load.image('MelodyMemoryButtonD2_3x','assets/simon/MelodyMemoryButtonD2@3x.png');

					/* Success cues */
					this.load.image('SimonSaysImage1_3x','assets/simon/MelodyMemory_Pic1.png');
					this.load.image('SimonSaysImage2_3x','assets/simon/MelodyMemory_Pic2.png');
					this.load.image('SimonSaysImage3_3x','assets/simon/MelodyMemory_Pic3.png');
					this.load.image('SimonSaysImage4_3x','assets/simon/MelodyMemory_Pic4.png');
					this.load.image('SimonSaysImage5_3x','assets/simon/MelodyMemory_Pic5.png');
					this.load.image('SimonSaysImage6_3x','assets/simon/MelodyMemory_Pic6.png');
				    
				    /* TopDownBridge */
				    this.game.load.image('TopDownBridgeBaseLayer_3x', 'assets/top-down-bridge/TopDownBridgeBaseLayer@3x.png');
				    this.game.load.image('TopDownBridgePath_3x','assets/top-down-bridge/Bridge@3x.png');
				    this.game.load.spritesheet('TopDownBridgeAvatar_3x', 'assets/top-down-bridge/Avatar@3x.png',163,245);
				    this.game.load.image('TopDownBridgeNote_3x', 'assets/top-down-bridge/default-note.png');
				    this.game.load.image('TopDownBridgeMiss_3x', 'assets/top-down-bridge/Miss@3x.png');
				    this.game.load.image('TopDownBridgeHit_3x', 'assets/top-down-bridge/Hit@3x.png');
				    this.game.load.image('TopDownBridgeLine_3x', 'assets/top-down-bridge/finishLine.png');
				    this.game.load.audio('TopDownBridgeMusic', 'assets/top-down-bridge/kreutzer.mp3');
			    },
			    create: function () {
			       this.state.start("StartScreen");
			    }
			};


			var MGBGame;
			window.onload = function () {
				MGBGame = new Phaser.Game(MaestroGameBuilder.Options.baseWidth, MaestroGameBuilder.Options.height, Phaser.AUTO, 'MGBGameDiv',null,true);	
				MGBGame.state.add("Boot", MaestroGameBuilder.Boot);
				MGBGame.state.add("Loading", MaestroGameBuilder.Loading);
				MGBGame.state.add("StartScreen", MaestroGameBuilder.StartScreen);
				MGBGame.state.add("LevelMenu", MaestroGameBuilder.LevelMenu);
				MGBGame.state.add("BridgeRunner", MaestroGameBuilder.BridgeRunner);
				MGBGame.state.add("SimonSays", MaestroGameBuilder.SimonSays);
				MGBGame.state.add("Gateway", MaestroGameBuilder.Gateway);
				MGBGame.state.add("TopDownBridge", MaestroGameBuilder.TopDownBridge);
				MGBGame.state.start("Boot");
			}
		</script>
    </body>
</html>
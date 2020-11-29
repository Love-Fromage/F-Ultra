class Jeu {

    constructor() {

        this.chargeur = null;
        this.player1 = null;
        this.stage = null;
        this.pointage=0;


        this.parametres = {
            canevas: "canvas",
            cadence: 30,
            manifeste: "ressources/manifest.json"
        };

        this.charger();
    }


    //chargeur

    charger() {
        this.chargeur = new createjs.LoadQueue();
        this.chargeur.installPlugin(createjs.Sound);
        this.chargeur.addEventListener("complete", this.initialiser.bind(this));
        this.chargeur.addEventListener('error', this.abandonner.bind(this));
        this.chargeur.loadManifest(this.parametres.manifeste);


    }

    //initialiser

    initialiser(){
        console.log('bonjour');
        this.stage = new createjs.StageGL(this.parametres.canevas, {antialias: true});
        createjs.Touch.enable(this.stage);
        createjs.Ticker.addEventListener("tick", e => this.stage.update(e));
        createjs.Ticker.framerate = this.parametres.cadence;
        createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;



            this.demarrer();


    }

    abandonner(){
        console.log('nope');
    }


    demarrer(e){


        createjs.Sound.stop();
        this.musique = createjs.Sound.play('theme', {loop: -1, volume:0});

        createjs.Tween.get(this.musique).to({volume: 0.03},2500);




        this.fond = new createjs.Bitmap(this.chargeur.getResult("fond"));
        this.fond.x -= Math.random() * (this.fond.getBounds().width - this.stage.canvas.width);
        this.stage.addChild(this.fond);


        this.conteneurMenu = new createjs.Container();
        this.stage.addChild(this.conteneurMenu);

        this.titre = new createjs.Text("F-ULTRA", "72px Bebas " , "#ff7700");
        this.titre.cache(0,0, this.titre.getBounds().width, this.titre.getBounds().height+10 );
        this.titre.x = this.stage.canvas.width/2 - 50;
        this.titre.y = this.stage.canvas.height/4;
        this.conteneurMenu.addChild(this.titre);
        this.titre.scale =0;
        createjs.Tween.get(this.titre).to({scale: 1},500);

        this.boutonPlay = new createjs.Bitmap(this.chargeur.getResult('boutonPlay'));
        this.boutonPlay.x = this.stage.canvas.width/2 - 100;
        this.boutonPlay.y = this.stage.canvas.height/2 - 80;
        this.conteneurMenu.addChild(this.boutonPlay);
        this.boutonPlay.scale =0;
        createjs.Tween.get(this.boutonPlay).to({scale: 0.5},500);
        this.boutonPlay.addEventListener('mousedown', this.pressPlay.bind(this));


        this.boutonInstru = new createjs.Bitmap(this.chargeur.getResult('instructions'));
        this.boutonInstru.x = this.stage.canvas.width/2 - 100;
        this.boutonInstru.y = this.stage.canvas.height/2 + this.boutonPlay.getBounds().height/2-45;
        this.conteneurMenu.addChild(this.boutonInstru);
        this.boutonInstru.scale =0;
        createjs.Tween.get(this.boutonInstru).to({scale: 0.5 },500);
        this.boutonInstru.addEventListener('mousedown', this.menuInstru.bind(this));




        this.boutonSons = new createjs.Bitmap(this.chargeur.getResult('mediaOn'));

        this.boutonSons.x = this.stage.canvas.width/2 +20;
        this.boutonSons.y = this.stage.canvas.height/2 + 130;
        this.boutonSons.x += 420;
        this.boutonSons.y += 100;
        this.stage.addChild(this.boutonSons);
        this.boutonSons.scale =0;
        createjs.Tween.get(this.boutonSons).to({scale: 0.5},500);
        this.i = 0;




        this.boutonSons.addEventListener('mousedown', this.mutedOn.bind(this));






    }


    mutedOn() {
        this.boutonSons2 = new createjs.Bitmap(this.chargeur.getResult('mediaOff'));
        this.boutonSons2.scale /= 2;
        this.boutonSons2.x = this.stage.canvas.width / 2 + 20;
        this.boutonSons2.y = this.stage.canvas.height / 2 + 130;
        this.boutonSons2.x += 420;
        this.boutonSons2.y += 100;
        this.stage.addChild(this.boutonSons2);
        this.i++;
        if (this.i === 1) {
            this.musique.volume = 0;
        }
        this.boutonSons2.addEventListener('mousedown', this.mutedOff.bind(this));
    }

    mutedOff(){
        this.stage.removeChild(this.boutonSons2);
        this.i--;

        if(this.i===0){
            this.musique.volume = 0.03;
        }
    }

    pressPlay(){
        createjs.Sound.play('damage', { volume:0.1});
        this.playGame();
    }

    menuInstru(){
        createjs.Sound.play('damage', {volume:0.1});
        this.stage.removeChild(this.conteneurMenu);

        this.conteneurInstru= new createjs.Container();
        this.stage.addChild(this.conteneurInstru);



        this.titre.y -= 100;

        this.bgInstru = new createjs.Bitmap(this.chargeur.getResult('options'));
        this.bgInstru.scale = 0.42;
        this.bgInstru.scaleX +=0.2;
        this.bgInstru.x = this.stage.canvas.width /4-270;
        this.bgInstru.y = this.stage.canvas.height /4;
        this.conteneurInstru.addChild(this.bgInstru);


        this.titreInstru = new createjs.Text("Instructions", "36px Bebas " , "#ff7700");
        this.titreInstru.cache(0,0, this.titreInstru.getBounds().width, this.titreInstru.getBounds().height+10 );
        this.conteneurInstru.addChild(this.titreInstru);
        this.titreInstru.x = this.stage.canvas.width/2-150;
        this.titreInstru.y = this.stage.canvas.height/2-155;

        this.texteInstru = new createjs.Text("Pour vous deplacer, dirigez votre vaisseau directement avec votre doigth.", "24px Bebas " , "#ff7700");
        this.texteInstru.cache(0,0, this.texteInstru.getBounds().width, this.texteInstru.getBounds().height+10 );
        this.conteneurInstru.addChild(this.texteInstru);
        this.texteInstru.x = this.bgInstru.x+50;
        this.texteInstru.y = this.bgInstru.getBounds().height/4;

        this.texteInstru2 = new createjs.Text("Vous tirez automatiquement lorsque vous vous deplacez.", "24px Bebas " , "#ff7700");
        this.texteInstru2.cache(0,0, this.texteInstru2.getBounds().width, this.texteInstru2.getBounds().height+10 );
        this.conteneurInstru.addChild(this.texteInstru2);
        this.texteInstru2.x = this.bgInstru.x+50;
        this.texteInstru2.y = this.bgInstru.getBounds().height/4+100;

        this.texteInstru3 = new createjs.Text("Lorsque votre sante est a 0 c'est terminer", "24px Bebas " , "#ff7700");
        this.texteInstru3.cache(0,0, this.texteInstru3.getBounds().width, this.texteInstru3.getBounds().height+10 );
        this.conteneurInstru.addChild(this.texteInstru3);
        this.texteInstru3.x = this.bgInstru.x+50;
        this.texteInstru3.y = this.bgInstru.getBounds().height/4+300;

        this.vaisIntru = new createjs.Bitmap(this.chargeur.getResult('vaisseau1'));
        this.vaisIntru.scale = 0.3;
        this.conteneurInstru.addChild(this.vaisIntru);
        this.vaisIntru.x = this.texteInstru.x+700;
        this.vaisIntru.y = this.texteInstru.y-25;

        this.vaisIntru2 = new createjs.Bitmap(this.chargeur.getResult('vaisseau1'));
        this.vaisIntru2.scale = 0.3;
        this.conteneurInstru.addChild(this.vaisIntru2);
        this.vaisIntru2.x = this.texteInstru.x+600;
        this.vaisIntru2.y = this.texteInstru.y+100;

        this.tirInstru = new createjs.Bitmap(this.chargeur.getResult('tirPlayer'));
        this.tirInstru.scale = 0.2;
        this.conteneurInstru.addChild(this.tirInstru);
        this.tirInstru.x = this.texteInstru.x+600;
        this.tirInstru.y = this.texteInstru.y+50;

        this.tirInstru2 = new createjs.Bitmap(this.chargeur.getResult('tirPlayer'));
        this.tirInstru2.scale = 0.2;
        this.conteneurInstru.addChild(this.tirInstru2);
        this.tirInstru2.x = this.texteInstru.x+620;
        this.tirInstru2.y = this.texteInstru.y+50;

        this.santerInstru = new createjs.Bitmap(this.chargeur.getResult('barreVie'));
        this.santerInstru.scale = 0.3;
        this.conteneurInstru.addChild(this.santerInstru);
        this.santerInstru.x = this.bgInstru.x+700;
        this.santerInstru.y = this.bgInstru.getBounds().height/4+300;
        this.santerInstru.rotation =90;

        this.santerInstru2 = new createjs.Bitmap(this.chargeur.getResult('barreActive'));
        this.santerInstru2.scale = 0.3;
        this.conteneurInstru.addChild(this.santerInstru2);
        this.santerInstru2.x = this.bgInstru.x+698;
        this.santerInstru2.y = this.bgInstru.getBounds().height/4+305;
        this.santerInstru2.rotation =90;

        this.retourInstru = new createjs.Bitmap(this.chargeur.getResult('bouton0'));
        this.retourInstru.scale = 0.3;
        this.conteneurInstru.addChild(this.retourInstru);
        this.retourInstru.x = this.bgInstru.x+750;
        this.retourInstru.y = this.bgInstru.getBounds().height/4+305;
        this.retourInstru.addEventListener('mousedown', this.retourMenu.bind(this));



    }

    retourMenu(){
        this.musique.stop();
        this.stage.removeChild(this.conteneurInstru);
        this.demarrer();
    }
    retourMenu1(){
        this.musique.stop();
        this.arretJeu1();
        this.demarrer();
    }
    retourMenu2(){
        this.musique.stop();
        this.arretJeu2();
        this.demarrer();
    }
    retourMenu3(){
        this.musique.stop();
        this.arretJeu3();
        this.demarrer();
    }


    playGame(){
        this.musique.stop();


        this.stage.removeChild(this.conteneurMenu);
        this.stage.removeChild(this.titre);
        this.stage.removeChild(this.fond);


        this.niveau1();




    }

    niveau1(){


        this.lvlInd =1;

        createjs.Sound.stop();
        this.niveau1Sons = new createjs.Sound.play('niveau1', {loop:-1, volume:0});
        createjs.Tween.get(this.niveau1Sons).to({volume: 0.03},2500);
        this.fond2 = new createjs.Bitmap(this.chargeur.getResult("fond"));
        this.fond2.x -= Math.random() * (this.fond2.getBounds().width - this.stage.canvas.width);
        this.stage.addChild(this.fond2);

        this.conteneurNiveau1 = new createjs.Container();
        this.stage.addChild(this.conteneurNiveau1);
        this.conteneurEnnemis = new createjs.Container();
        this.conteneurNiveau1.addChild(this.conteneurEnnemis);

        this.bgNiveau = new createjs.Bitmap(this.chargeur.getResult('options'));
        this.bgNiveau.scale = 0.42;
        this.conteneurNiveau1.addChild(this.bgNiveau);
        this.bgNiveau.x = 250;
        this.bgNiveau.y = 75;


        this.titreNiv1 = new createjs.Text("Niveau 1", "36px Bebas " , "#ff7700");
        this.titreNiv1.cache(0,0, this.titreNiv1.getBounds().width, this.titreNiv1.getBounds().height+10 );
        this.conteneurNiveau1.addChild(this.titreNiv1);
        this.titreNiv1.x = this.bgNiveau.x + 280;
        this.titreNiv1.y = 95;

        this.textNiv1 = new createjs.Text("Pour completer ce niveau, vous devez survivre 10 secondes", "28px Bebas " , "#ff7700");
        this.textNiv1.cache(0,0, this.textNiv1.getBounds().width, this.textNiv1.getBounds().height+10 );
        this.conteneurNiveau1.addChild(this.textNiv1);
        this.textNiv1.x = this.bgNiveau.x +25;
        this.textNiv1.y = 300;

        this.startNiv1 = new createjs.Bitmap(this.chargeur.getResult('boutonPlay'));
        this.startNiv1.scale = 0.3;
        this.conteneurNiveau1.addChild(this.startNiv1);
        this.startNiv1.x = this.bgNiveau.x+250;
        this.startNiv1.y = 500;
        this.startNiv1.addEventListener('mousedown', this.ajouterPlayer1.bind(this));

        this.barredeVie = new createjs.Bitmap(this.chargeur.getResult('barreVie'));
        this.barredeVie.scale = 0.4;
        this.conteneurNiveau1.addChild(this.barredeVie);
        this.barredeVie.x = this.bgNiveau.x+800;
        this.barredeVie.y = 625;
        this.barredeVie.rotation = 90;

        this.vie = new createjs.Bitmap(this.chargeur.getResult('barreActive'));
        this.vie.scale = 0.4;
        this.conteneurNiveau1.addChild(this.vie);
        this.vie.x = this.bgNiveau.x+545;
        this.vie.y = this.bgNiveau.getBounds().height/4+353;
        this.vie.rotation =-90;
        /*this.vie.addEventListener('mousedown', ()=>{
            console.log('lol');

            this.vie.scaleY /= 1.25;
        });*/

        this.timerContainer = new createjs.Bitmap(this.chargeur.getResult('bouton1'));
        this.timerContainer.scale = 0.4;
        this.conteneurNiveau1.addChild(this.timerContainer);
        this.timerContainer.addEventListener('mousedown', ()=>{
           clearInterval(this.timer1);
        });
        this.secs = 0;
        this.mins = 0;

        this.timerTexte = new createjs.Text("00:00", "48px Bebas " , "#ff7700");
        this.timerTexte.cache(0,0, this.timerTexte.getBounds().width+100, this.timerTexte.getBounds().height+10 );
        this.conteneurNiveau1.addChild(this.timerTexte);
        this.timerTexte.x = this.timerContainer.x +75;
        this.timerTexte.y = this.timerContainer.y +10;

        ;




    }

    ajouterPlayer1(){
        this.startTimer();
        this.conteneurNiveau1.removeChild(this.bgNiveau);
        this.conteneurNiveau1.removeChild(this.startNiv1);
        this.conteneurNiveau1.removeChild(this.textNiv1);
        this.titreNiv1.y -= 60;
        this.player1 = new Player(this.conteneurEnnemis.children);
        this.conteneurNiveau1.addChild(this.player1);
        this.player1.x = this.conteneurNiveau1.getBounds().width/2+50;
        this.player1.y = this.conteneurNiveau1.getBounds().height-100;
        this.player1.scale =0.3;
        this.retourJeu = new createjs.Bitmap(this.chargeur.getResult('bouton0'));
        this.retourJeu.scale = 0.3;
        this.conteneurNiveau1.addChild(this.retourJeu);
        this.retourJeu.x = this.bgNiveau.x+600;
        this.retourJeu.y = this.bgNiveau.getBounds().height/4+365;
        this.retourJeu.addEventListener('mousedown', this.retourMenu1.bind(this))

        setTimeout(()=>{
            this.intervalplayer1 = setInterval(this.ajouterEnnemis.bind(this), 1000);
        }, 1500);

    }

    ajouterEnnemis(){
        if(!createjs.Ticker.paused) {

                let ennemi;
            ennemi = new Ennemi(this.player1);
            ennemi.x = Math.random()*800+10;
            ennemi.y = 0-20;
            ennemi.scale = 0.3;
            ennemi.scaleY = -0.3;
            this.conteneurEnnemis.addChild(ennemi);
        }

    }


    startTimer(){
        this.timers1 = window.setInterval(this.timer.bind(this), 1000);
    }
    startTimer2(){
        this.timers2 = window.setInterval(this.timer2.bind(this), 1000);
    }

    startTimer3(){
        this.timers3 = window.setInterval(this.timer3.bind(this), 1000);
    }

    timer(){

    this.secs++;
       // console.log(this.secs);

        if(this.secs >=60){
            this.secs =0;
            this.mins++;
        }

        if(this.secs<10) {
            this.timerTexte.text =  "0" + parseInt(this.mins) + ":0" + this.secs;

        } else if(this.secs>=10 || this.mins>0){
            this.timerTexte.text =  "0" + parseInt(this.mins) + ":" + this.secs;
        }

        /*if(this.mins>0){
            this.timerTexte.text =  "0" + parseInt(this.mins) + ":0" + this.secs;
        }*/
        this.timerTexte.updateCache();

        if(this.secs===10){
            this.arretJeu1();

        }
    }


    timer2(){

    this.secs++;
       // console.log(this.secs);

        if(this.secs >=60){
            this.secs =0;
            this.mins++;
        }

        if(this.secs<10) {
            this.timerTexte.text =  "0" + parseInt(this.mins) + ":0" + this.secs;

        } else if(this.secs>=10 || this.mins>0){
            this.timerTexte.text =  "0" + parseInt(this.mins) + ":" + this.secs;
        }

        /*if(this.mins>0){
            this.timerTexte.text =  "0" + parseInt(this.mins) + ":0" + this.secs;
        }*/
        this.timerTexte.updateCache();

        if(this.secs===20){

            this.arretJeu2();

        }
    }

    timer3(){

        this.secs++;
        // console.log(this.secs);

        if(this.secs >=60){
            this.secs =0;
            this.mins++;
        }

        if(this.secs<10) {
            this.timerTexte.text =  "0" + parseInt(this.mins) + ":0" + this.secs;

        } else if(this.secs>=10 || this.mins>0){
            this.timerTexte.text =  "0" + parseInt(this.mins) + ":" + this.secs;
        }

        /*if(this.mins>0){
            this.timerTexte.text =  "0" + parseInt(this.mins) + ":0" + this.secs;
        }*/
        this.timerTexte.updateCache();

        if(this.secs===20){

            this.arretJeu3();

        }
    }


    niveau2(){


        this.lvlInd =2;


        createjs.Sound.stop();
        this.niveau2Sons = new createjs.Sound.play('niveau2', {loop:-1, volume:0});
        createjs.Tween.get(this.niveau2Sons).to({volume: 0.03},2500);
        this.fond2 = new createjs.Bitmap(this.chargeur.getResult("fond"));
        this.fond2.x -= Math.random() * (this.fond2.getBounds().width - this.stage.canvas.width);
        this.stage.addChild(this.fond2);


        this.conteneurNiveau1 = new createjs.Container();
        this.stage.addChild(this.conteneurNiveau1);
        this.conteneurEnnemis = new createjs.Container();
        this.conteneurNiveau1.addChild(this.conteneurEnnemis);

        this.bgNiveau = new createjs.Bitmap(this.chargeur.getResult('options'));
        this.bgNiveau.scale = 0.42;
        this.conteneurNiveau1.addChild(this.bgNiveau);
        this.bgNiveau.x = 250;
        this.bgNiveau.y = 75;


        this.titreNiv2 = new createjs.Text("Niveau 2", "36px Bebas " , "#ff7700");
        this.titreNiv2.cache(0,0, this.titreNiv2.getBounds().width, this.titreNiv2.getBounds().height+10 );
        this.conteneurNiveau1.addChild(this.titreNiv2);
        this.titreNiv2.x = this.bgNiveau.x + 280;
        this.titreNiv2.y = 95;

        this.textNiv2 = new createjs.Text("Pour completer ce niveau, vous devez survivre 20 secondes", "28px Bebas " , "#ff7700");
        this.textNiv2.cache(0,0, this.textNiv2.getBounds().width, this.textNiv2.getBounds().height+10 );
        this.conteneurNiveau1.addChild(this.textNiv2);
        this.textNiv2.x = this.bgNiveau.x +25;
        this.textNiv2.y = 300;

        this.startNiv2 = new createjs.Bitmap(this.chargeur.getResult('boutonPlay'));
        this.startNiv2.scale = 0.3;
        this.conteneurNiveau1.addChild(this.startNiv2);
        this.startNiv2.x = this.bgNiveau.x+250;
        this.startNiv2.y = 500;
        this.startNiv2.addEventListener('mousedown', this.ajouterPlayer2.bind(this));

        this.barredeVie = new createjs.Bitmap(this.chargeur.getResult('barreVie'));
        this.barredeVie.scale = 0.4;
        this.conteneurNiveau1.addChild(this.barredeVie);
        this.barredeVie.x = this.bgNiveau.x+800;
        this.barredeVie.y = 625;
        this.barredeVie.rotation = 90;

        this.vie = new createjs.Bitmap(this.chargeur.getResult('barreActive'));
        this.vie.scale = 0.4;
        this.vie.scaleY = 0.4;
        this.conteneurNiveau1.addChild(this.vie);
        this.vie.x = this.bgNiveau.x+545;
        this.vie.y = this.bgNiveau.getBounds().height/4+353;
        this.vie.rotation =-90;
        /*this.vie.addEventListener('mousedown', ()=>{
            console.log('lol');

            this.vie.scaleY /= 1.25;
        });*/

        this.timerContainer = new createjs.Bitmap(this.chargeur.getResult('bouton1'));
        this.timerContainer.scale = 0.4;
        this.conteneurNiveau1.addChild(this.timerContainer);
        this.timerContainer.addEventListener('mousedown', ()=>{
            clearInterval(this.timer2);
        });
        this.secs = 0;
        this.mins = 0;

        this.timerTexte = new createjs.Text("00:00", "48px Bebas " , "#ff7700");
        this.timerTexte.cache(0,0, this.timerTexte.getBounds().width+100, this.timerTexte.getBounds().height+10 );
        this.conteneurNiveau1.addChild(this.timerTexte);
        this.timerTexte.x = this.timerContainer.x +75;
        this.timerTexte.y = this.timerContainer.y +10;







    }

    ajouterPlayer2(){
        this.startTimer2();
        this.conteneurNiveau1.removeChild(this.bgNiveau);
        this.conteneurNiveau1.removeChild(this.startNiv2);
        this.conteneurNiveau1.removeChild(this.textNiv2);
        this.titreNiv2.y -= 60;
        this.player2 = new Player(this.conteneurEnnemis.children);
        this.conteneurNiveau1.addChild(this.player2);
        this.player2.x = this.conteneurNiveau1.getBounds().width/2+50;
        this.player2.y = this.conteneurNiveau1.getBounds().height-100;
        this.player2.scale =0.3;
        this.player2.rpm=100;

        this.retourJeu = new createjs.Bitmap(this.chargeur.getResult('bouton0'));
        this.retourJeu.scale = 0.3;
        this.conteneurNiveau1.addChild(this.retourJeu);
        this.retourJeu.x = this.bgNiveau.x+600;
        this.retourJeu.y = this.bgNiveau.getBounds().height/4+200;
        this.retourJeu.addEventListener('mousedown', this.retourMenu2.bind(this))


        setTimeout(()=>{
            this.intervalplayer2 = setInterval(this.ajouterEnnemis2.bind(this), Math.random() * 2000+50);
        }, 1500);


    }

    ajouterEnnemis2(){
        if(!createjs.Ticker.paused) {

            let ennemi2;
            ennemi2 = new Ennemi(this.player2);
            ennemi2.x = Math.random()*800+10;
            ennemi2.y = 0-20;
            ennemi2.scale = 0.3;
            ennemi2.scaleY = -0.3;
            this.conteneurEnnemis.addChild(ennemi2);
            ennemi2.vitesse = 15;
        }


    }

    niveau3(){


        this.lvlInd =3;


        createjs.Sound.stop();
        this.niveau3Sons = new createjs.Sound.play('niveau3', {loop:-1, volume:0});
        createjs.Tween.get(this.niveau3Sons).to({volume: 0.03},2500);
        this.fond3 = new createjs.Bitmap(this.chargeur.getResult("fond"));
        this.fond3.x -= Math.random() * (this.fond3.getBounds().width - this.stage.canvas.width);
        this.stage.addChild(this.fond3);


        this.conteneurNiveau1 = new createjs.Container();
        this.stage.addChild(this.conteneurNiveau1);
        this.conteneurEnnemis = new createjs.Container();
        this.conteneurNiveau1.addChild(this.conteneurEnnemis);

        this.bgNiveau = new createjs.Bitmap(this.chargeur.getResult('options'));
        this.bgNiveau.scale = 0.42;
        this.conteneurNiveau1.addChild(this.bgNiveau);
        this.bgNiveau.x = 250;
        this.bgNiveau.y = 75;


        this.titreNiv3 = new createjs.Text("Niveau 3", "36px Bebas " , "#ff7700");
        this.titreNiv3.cache(0,0, this.titreNiv3.getBounds().width, this.titreNiv3.getBounds().height+10 );
        this.conteneurNiveau1.addChild(this.titreNiv3);
        this.titreNiv3.x = this.bgNiveau.x + 280;
        this.titreNiv3.y = 95;

        this.textNiv3 = new createjs.Text("Pour completer ce niveau, vous devez survivre 20 secondes", "28px Bebas " , "#ff7700");
        this.textNiv3.cache(0,0, this.textNiv3.getBounds().width, this.textNiv3.getBounds().height+10 );
        this.conteneurNiveau1.addChild(this.textNiv3);
        this.textNiv3.x = this.bgNiveau.x +25;
        this.textNiv3.y = 300;

        this.startNiv3 = new createjs.Bitmap(this.chargeur.getResult('boutonPlay'));
        this.startNiv3.scale = 0.3;
        this.conteneurNiveau1.addChild(this.startNiv3);
        this.startNiv3.x = this.bgNiveau.x+250;
        this.startNiv3.y = 500;
        this.startNiv3.addEventListener('mousedown', this.ajouterPlayer3.bind(this));

        this.barredeVie = new createjs.Bitmap(this.chargeur.getResult('barreVie'));
        this.barredeVie.scale = 0.4;
        this.conteneurNiveau1.addChild(this.barredeVie);
        this.barredeVie.x = this.bgNiveau.x+800;
        this.barredeVie.y = 625;
        this.barredeVie.rotation = 90;

        this.vie = new createjs.Bitmap(this.chargeur.getResult('barreActive'));
        this.vie.scale = 0.4;
        this.vie.scaleY = 0.4;
        this.conteneurNiveau1.addChild(this.vie);
        this.vie.x = this.bgNiveau.x+545;
        this.vie.y = this.bgNiveau.getBounds().height/4+353;
        this.vie.rotation =-90;


        this.barredeVieBoss = new createjs.Bitmap(this.chargeur.getResult('barreVie'));
        this.barredeVieBoss.scale = 1;
        this.conteneurNiveau1.addChild(this.barredeVieBoss);
        this.barredeVieBoss.x = this.bgNiveau.x+50;
        this.barredeVieBoss.y = this.bgNiveau.y;
        this.barredeVieBoss.rotation = -90;

        this.vieBoss = new createjs.Bitmap(this.chargeur.getResult('barreActive'));
        this.vieBoss.scale = 1.02;
        this.vieBoss.scaleY = 1.02;
        this.conteneurNiveau1.addChild(this.vieBoss);
        this.vieBoss.x = this.bgNiveau.x+55;
        this.vieBoss.y = this.bgNiveau.y-5;
        this.vieBoss.rotation =-90;
        /*this.vie.addEventListener('mousedown', ()=>{
            console.log('lol');

            this.vie.scaleY /= 1.25;
        });*/

        this.timerContainer = new createjs.Bitmap(this.chargeur.getResult('bouton1'));
        this.timerContainer.scale = 0.4;
        this.conteneurNiveau1.addChild(this.timerContainer);
        this.timerContainer.addEventListener('mousedown', ()=>{
            clearInterval(this.timer1);
        });
        this.secs = 0;
        this.mins = 0;

        this.timerTexte = new createjs.Text("00:00", "48px Bebas " , "#ff7700");
        this.timerTexte.cache(0,0, this.timerTexte.getBounds().width+100, this.timerTexte.getBounds().height+10 );
        this.conteneurNiveau1.addChild(this.timerTexte);
        this.timerTexte.x = this.timerContainer.x +75;
        this.timerTexte.y = this.timerContainer.y +10;







    }

    ajouterPlayer3(){
        this.startTimer3();
        this.conteneurNiveau1.removeChild(this.bgNiveau);
        this.conteneurNiveau1.removeChild(this.startNiv3);
        this.conteneurNiveau1.removeChild(this.textNiv3);
        this.titreNiv3.y -= 60;
        this.boss = new Boss();
        this.ajouterEnnemis3();
        this.player3 = new Player(this.boss);
        this.conteneurNiveau1.addChild(this.player3);
        this.player3.x = this.conteneurNiveau1.getBounds().width/2+50;
        this.player3.y = this.conteneurNiveau1.getBounds().height-100;
        this.player3.scale =0.3;
        this.player3.rpm=100;

        this.retourJeu = new createjs.Bitmap(this.chargeur.getResult('bouton0'));
        this.retourJeu.scale = 0.3;
        this.conteneurNiveau1.addChild(this.retourJeu);
        this.retourJeu.x = this.bgNiveau.x+600;
        this.retourJeu.y = this.bgNiveau.getBounds().height/4+200;
        this.retourJeu.addEventListener('mousedown', this.retourMenu3.bind(this))





    }

    ajouterEnnemis3(){
        if(!createjs.Ticker.paused) {



            this.boss.x = Math.random()*800+10;
            this.boss.y = -200;
            this.boss.scale = 1;
            this.boss.scaleY = -1;
            setTimeout(this.timeOutBoss.bind(this), 1500);

        }

    }

    timeOutBoss(){
        this.conteneurEnnemis.addChild(this.boss);
    }


    arretJeu1(){
        clearInterval(this.timers1);
        clearTimeout(this.timerEnnemiS);
        clearInterval(this.intervalplayer1);

        this.conteneurEnnemis.removeAllChildren();
        this.conteneurNiveau1.removeAllChildren();

        this.player1.removeEventListener("pressmove", this.player1.deplacer.bind(this));
        this.player1.removeEventListener("mousedown", this.player1.delaiTir.bind(this));
        this.player1.removeEventListener("pressup", this.player1.arretTir.bind(this));
        this.conteneurNiveau1.removeChild(this.player1);
        console.log('arretjeu1');

        this.stopped = true;
        this.vie.alpha=0;
        this.niveau2();

    }
    arretJeu2(){

        clearInterval(this.timers2);
        clearTimeout(this.timerEnnemiS);
        clearInterval(this.intervalplayer2);
        this.conteneurEnnemis.removeAllChildren();
        this.conteneurNiveau1.removeAllChildren();

        this.player2.removeEventListener("pressmove", this.player2.deplacer);
        this.player2.removeEventListener("mousedown", this.player2.delaiTir);
        this.player2.removeEventListener("pressup", this.player2.arretTir);
        this.conteneurNiveau1.removeChild(this.player2);

        this.vie.alpha=0;
        this.niveau3();

    }

    arretJeu3(){

        clearInterval(this.timers3);
        clearTimeout(this.timerEnnemiS);
        this.conteneurEnnemis.removeAllChildren();

        this.conteneurNiveau1.removeAllChildren();
        this.player3.removeEventListener("pressmove", this.player3.deplacer);
        this.player3.removeEventListener("mousedown", this.player3.delaiTir);
        this.player3.removeEventListener("pressup", this.player3.arretTir);
        this.conteneurNiveau1.removeChild(this.player3);

        this.vie.alpha=0;
        this.demarrer();

    }


}
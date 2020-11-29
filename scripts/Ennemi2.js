class Boss extends createjs.Bitmap {

    constructor() {

        super(jeu.chargeur.getResult('boss'));

        this.vitesse = 5;

        this.santerBoss = 50;


        this.ecouteur = this.descendre.bind(this);
        createjs.Ticker.addEventListener("tick", this.ecouteur);


    }


    descendre() {

        this.y += this.vitesse;

        if (this.y >= jeu.stage.canvas.height-100) {
            //this.remonter1();
            this.y=0;
            this.x = Math.random()*800+10;
        }

        if (ndgmr.checkRectCollision(this, jeu.player3)) {

            jeu.vie.scaleY /= 1.25;
            jeu.player3.santer--;
        }

        if(jeu.player3.santer===0){
            console.log('fini');
            jeu.arretJeu3();
            createjs.Ticker.removeEventListener('tick', this.ecouteur);
            this.detruire();
        }
    }



    remonter1(){
        console.log('remonte');


        createjs.Sound.play("shoot", {volume:0.1});
        let balle;


        balle = new Projectile(this.ennemis);
        balle.x = this.x+5;
        balle.y = this.y-25;
        balle.scale = 0.2;




        let index = jeu.conteneurNiveau2.getChildIndex(this);
        jeu.conteneurNiveau2.addChildAt(balle, index);
        //createjs.Sound.play("tir");

    }


    exploser() {

        createjs.Sound.play("damage2", {volume:0.1});

        let effets = new createjs.Sprite(jeu.chargeur.getResult("explosion1"));
        jeu.conteneurNiveau1.addChild(effets);
        effets.x = this.x;
        effets.y = this.y;
        effets.gotoAndPlay("explosion00012");


        this.visible = false;

        effets.addEventListener("animationend", () => {
            if (jeu.conteneurNiveau1) jeu.conteneurNiveau1.removeChild(effets);
            this.detruire();
        });

        this.dispatchEvent("exploser");

    }

    detruire() {
        clearInterval(this.tirTimerE);
        createjs.Ticker.removeEventListener("tick", this.ecouteur);
        if(this.parent) this.parent.removeChild(this);
    }
}
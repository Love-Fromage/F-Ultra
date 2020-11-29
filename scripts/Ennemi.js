class Ennemi extends createjs.Bitmap {

    constructor(cible) {

        super(jeu.chargeur.getResult('ennemi'));

        this.vitesse = 10;
        this.cible = cible;


        this.ecouteur = this.descendre.bind(this);
        this.bougeEnnemi = createjs.Ticker.addEventListener("tick", this.ecouteur);

    }


    descendre() {

        this.y += this.vitesse;

        if (this.y >= jeu.stage.canvas.height) {
            console.log('en bas');
            this.detruire();

            console.log(this.cible.santer);


        }

        if (ndgmr.checkRectCollision(this, this.cible)) {
            this.exploser();
            this.detruire();


                jeu.vie.scaleY /= 1.25;
                this.cible.santer--;

        }

        if (this.cible.santer === 0 && jeu.lvlInd===1) {
            console.log('fini');

            jeu.arretJeu1();
            createjs.Ticker.removeEventListener('tick', this.ecouteur);
            this.detruire();
        }else if(this.cible.santer === 0 && jeu.lvlInd===2){
            console.log('fini');

            jeu.arretJeu2();
            createjs.Ticker.removeEventListener('tick', this.ecouteur);
            this.detruire();
        }
    }


    exploser() {

        createjs.Sound.play("damage2", {volume: 0.1});

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

    preShoot() {
        this.tirTimerE = window.setInterval(this.tirerE.bind(this), 2000);
    }

    tirerE() {
        console.log('tirE');


        createjs.Sound.play("shoot", {volume: 0.1});
        let balle2;


        balle2 = new Projectile(this.cible);
        balle2.x = this.x + 5;
        balle2.y = this.y - 25;
        balle2.scale = 0.2;


    }
    detruire(){
        createjs.Ticker.removeEventListener("tick", this.ecouteur);
        if (this.parent) this.parent.removeChild(this);
    }
}
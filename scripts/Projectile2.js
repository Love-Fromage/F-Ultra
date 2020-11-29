class Projectile2 extends createjs.Bitmap{


    constructor(cibles) {

        super(jeu.chargeur.getResult("tirPlayer"));

        this.vitesse = 20;
        this.cibles = cibles;



        this.ecouteur = this.actualiser.bind(this);
        createjs.Ticker.addEventListener("tick", this.ecouteur);

    }

    actualiser() {

        if ( this.y<=0) {

            this.detruire();
        } else {
            this.y -= this.vitesse;
        }


        if (ndgmr.checkRectCollision(this, this.cibles)) {

                this.detruire();
                jeu.boss.santerBoss--;
                jeu.vieBoss.scaleY /=1.02;
                console.log(jeu.boss.santerBoss);
                if(jeu.boss.santerBoss===0){
                    jeu.arretJeu3();
                }

            }




    }

    detruire() {
        createjs.Ticker.removeEventListener("tick", this.ecouteur);
        jeu.conteneurNiveau1.removeChild(this);

    }
}
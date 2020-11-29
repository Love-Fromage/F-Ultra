class Projectile extends createjs.Bitmap{


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










                this.cibles.forEach(ennemi2 => {

                    if (ndgmr.checkRectCollision(this, ennemi2) && ennemi2.visible) {
                        ennemi2.exploser();
                        this.detruire();


                    }


                });
            //}

    }

    detruire() {
        createjs.Ticker.removeEventListener("tick", this.ecouteur);
        jeu.conteneurNiveau1.removeChild(this);

    }
}
class Player extends createjs.Bitmap{


    constructor(ennemis){

        super(jeu.chargeur.getResult('vaisseau1'));


        this.ennemis = ennemis;
        this.santer = 5;
        this.rpm = 300;



        this.addEventListener("pressmove", this.deplacer.bind(this));
        this.addEventListener("mousedown", this.delaiTir.bind(this));
        this.addEventListener("pressup", this.arretTir.bind(this));

    }

    deplacer(e){
        this.regX = this.getBounds().width/2;
        this.regY = this.getBounds().height/2;
        this.x = e.stageX;
        this.y = e.stageY;
    }

    delaiTir(){

        if(jeu.lvlInd===3){
            this.tirTimer = window.setInterval(this.tirer2.bind(this), this.rpm);
        } else {
            this.tirTimer = window.setInterval(this.tirer.bind(this), this.rpm);
        }



    }

    arretTir(){


            clearInterval(this.tirTimer);

    }



    tirer(){
        console.log('tir');


        createjs.Sound.play("shoot", {volume:0.1});
            let balle;


            balle = new Projectile(this.ennemis);
            balle.x = this.x+5;
            balle.y = this.y-25;
            balle.scale = 0.2;




            let index = jeu.conteneurNiveau1.getChildIndex(this);
            jeu.conteneurNiveau1.addChildAt(balle, index);
            //createjs.Sound.play("tir");

    }

    tirer2(){
        console.log('BKAJSHDBFKAJSDHFB');


        createjs.Sound.play("shoot", {volume:0.1});
        let balle2;


        balle2 = new Projectile2(jeu.boss);
        balle2.x = this.x+2;
        balle2.y = this.y-25;
        balle2.scale = 0.2;




        let index = jeu.conteneurNiveau1.getChildIndex(this);
        jeu.conteneurNiveau1.addChildAt(balle2, index);
        //createjs.Sound.play("tir");

    }
}
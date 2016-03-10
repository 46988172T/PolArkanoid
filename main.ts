/**
 * Created by leosss on 10/03/16.
 * Crítica social? No!!!!
 */
    /// <reference path="phaser/phaser.d.ts"/>
class mainState extends Phaser.State {
    private iglesias:Phaser.Sprite;
    private rajoy:Phaser.Sprite;
    private sanchez:Phaser.Sprite;
    private rivera:Phaser.Sprite;
    private bola:Phaser.Sprite;
    private bolaPrimera = true;
    private cursor:Phaser.CursorKeys;
    private velocidad = 2000;
    private aceleracion = 1500; // pixels/second/second
    private spriteSize = 140;
    private contador:number;

    preload():void{
        super.preload();
        this.load.image('iglesias', 'assets/iglesias.png');
        this.load.image('rajoy', 'assets/rajoy.png');
        this.load.image('sanchez', 'assets/sanchez.png');
        this.load.image('rivera', 'assets/rivera.png');
        this.load.image('bola', 'assets/bola.png');
        this.load.image('fondo', 'assets/fondo.png');


        this.physics.startSystem(Phaser.Physics.ARCADE);
    }

    create():void {
        super.create();
        var fondo;
        fondo = this.add.sprite(0,0,'fondo');
        this.game.physics.arcade.checkCollision.down = false; //no colisiona abajo.
        this.iglesias = this.add.sprite(this.world.centerX, 700, 'iglesias');
        this.iglesias.width = this.iglesias.height = this.spriteSize;
        this.iglesias.anchor.setTo(0.5, 0.5);

        this.physics.enable(this.iglesias, Phaser.Physics.ARCADE);
        this.iglesias.body.maxVelocity.setTo(this.velocidad,0); // x, y
        this.iglesias.body.collideWorldBounds = true;
        this.iglesias.body.bounce.set(0.0);
        this.cursor = this.input.keyboard.createCursorKeys();

        this.rivera = this.add.sprite(150, 100, 'rivera');
        this.physics.enable(this.rivera, Phaser.Physics.ARCADE);
        this.rajoy = this.add.sprite(600, 100, 'rajoy');
        this.physics.enable(this.rajoy, Phaser.Physics.ARCADE);
        this.sanchez = this.add.sprite(1000, 100, 'sanchez');
        this.physics.enable(this.sanchez, Phaser.Physics.ARCADE);

        this.bola = this.add.sprite(this.world.centerX, 570,'bola')
        this.physics.enable(this.bola, Phaser.Physics.ARCADE);
        this.bola.body.maxVelocity.setTo(500, 800);

        this.bola.body.collideWorldBounds = true;
        //this.bola.events.onOutOfBounds.add(this.ballLost, this);
        this.bola.body.bounce.set(3.8);

    }

    update():void{


        this.physics.arcade.collide(this.bola, this.iglesias);
        this.physics.arcade.collide(this.bola, this.rajoy, this.matarRajoy, null, this);
        this.physics.arcade.collide(this.bola, this.sanchez, this.matarSanchez, null, this);
        this.physics.arcade.collide(this.bola, this.rivera, this.matarRivera, null, this);

        if(this.bolaPrimera){
            this.lanzaPrimeraBola();
        }

        //los controles, cuando el ufo se mueve tambien rota sobre si mismo
        if (this.cursor.left.isDown) {
            this.iglesias.body.acceleration.x = -this.aceleracion;
            //this.iglesias.angle += 1; //rotacion
        } else if (this.cursor.right.isDown) {
            this.iglesias.body.acceleration.x = this.aceleracion;
            //this.iglesias.angle += 1; //rotacion
        } else if (this.cursor.up.isDown) {
            this.iglesias.body.acceleration.y = 0;
            //this.iglesias.angle += 1; //rotacion
        } else if (this.cursor.down.isDown) {
            this.iglesias.body.acceleration.y = 0;
            //this.iglesias.angle += 1; //rotacion
        } else {
            this.iglesias.body.acceleration.x = 0;
            this.iglesias.body.acceleration.y = 0;
            this.iglesias.body.velocity.x = 0;
            this.iglesias.body.velocity.y = 0;
        }
    }

    private lanzaPrimeraBola(){
        if(this.bolaPrimera) {
            this.bolaPrimera = false;
            this.bola.body.velocity.y = -300;
            this.bola.body.velocity.x = -75;
        }
    }

    private matarRajoy(bola:Phaser.Sprite, rajoy:Phaser.Sprite, sanchez:Phaser.Sprite, rivera:Phaser.Sprite){
        this.rajoy.kill();
    }
    private matarRivera(bola:Phaser.Sprite, rivera:Phaser.Sprite){
        this.rivera.kill();
    }
    private matarSanchez(bola:Phaser.Sprite, sanchez:Phaser.Sprite){
        this.sanchez.kill();
    }
    private ballLost(){
        this.game.state.restart();
    }
}

class SimpleGame {
    game:Phaser.Game;

    constructor() {
        this.game = new Phaser.Game(1366, 768, Phaser.AUTO, 'gameDiv');

        this.game.state.add('main', mainState);
        this.game.state.start('main');
    }
}

window.onload = () => {
    var game = new SimpleGame();
};

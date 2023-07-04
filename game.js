const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 608,
  scene: {
    preload,
    create,
    update
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
      // Configurations spécifiques à Arcade Physics
      // Par exemple, la gravité, la taille des collisions, etc.
    }
  }  
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image('monstre', 'assets/monstre.png');
  this.load.image('joueur', 'assets/joueur.png');   
  this.load.image('fond', 'assets/fond.png');  
  this.load.image("tiles", "./assets/map/spritesheet.png");
  this.load.tilemapTiledJSON("map", "./assets/map/map.json");  
}

function create() {
  // Créer le fond de la carte
  this.add.image(0, 0, 'fond').setOrigin(0);  
  
  // Récupérer les touches ZQSD
  this.keys = this.input.keyboard.addKeys('Z,Q,S,D');
  
  const map = this.make.tilemap({
    key: "map",
    tileWidth: 32,
    tileHeight: 32,
  });
  
  const tileset = map.addTilesetImage("spritesheet", "tiles");
  const objet = map.createLayer("objet", tileset);
  objet.setCollisionByProperty({ collides: true });
  
  // Créer le joueur
  this.player = this.physics.add.sprite(32, 32, 'joueur').setOrigin(0);   
  this.player.setCollideWorldBounds(true); // Définir les limites du monde pour le joueur
  this.physics.add.collider(this.player, objet);
  
  
  
}


function update() {
 

  // Déplacement horizontal
  if (this.keys.Q.isDown) {
    this.player.setVelocityX(-200);
  } else if (this.keys.D.isDown) {
    this.player.setVelocityX(200);
  } else {
    this.player.setVelocityX(0);
  }
  
  // Déplacement vertical
  if (this.keys.Z.isDown) {
    this.player.setVelocityY(-200);
  } else if (this.keys.S.isDown) {
    this.player.setVelocityY(200);
  } else {
    this.player.setVelocityY(0);
  }
  
  
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 608,
  scene: {
    preload,
    create,
    update
  }
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image('monstre', 'assets/monstre.png');
  this.load.image('joueur', 'assets/joueur.png');
  this.load.image('rocher', 'assets/rocher.png');
  this.load.image('poteau', 'assets/poteau.png');
  this.load.image('bombe', 'assets/bombe.png');
  this.load.image('explosion', 'assets/explosion.png');
  this.load.image('fond', 'assets/fond.png');
  this.load.image('tile', 'assets/tile.png');
}

function create() {
  // Créer le fond de la carte
  this.add.image(0, 0, 'fond').setOrigin(0);
  
  // Créer un monstre
  this.add.image(260, 200, 'monstre');
  
  // Créer le joueur
  this.player = this.add.image(300, 300, 'joueur');
  
  // Créer les rochers
  
  
  // Créer la bombe
  this.add.image(300, 400, 'bombe');
  
  // Créer l'animation d'explosion
  //this.add.image(400, 400, 'explosion');
  
  // Récupérer les touches ZQSD
  this.keys = this.input.keyboard.addKeys('Z,Q,S,D');
  
  // Création du contour de la carte
  const tileSize = 32; // Taille d'une tuile
  const mapWidth = Math.floor(this.game.config.width / tileSize);
  const mapHeight = Math.floor(this.game.config.height / tileSize);
  
  // Création des limites horizontales
  for (let i = 0; i <= mapWidth; i++) {
    this.add.image(i * tileSize, 0, 'tile').setOrigin(0);
    this.add.image(i * tileSize, (mapHeight - 1) * tileSize, 'tile').setOrigin(0);
  }
  
  // Création des limites verticales
  for (let i = 1; i < mapHeight - 1; i++) {
    this.add.image(0, i * tileSize, 'tile').setOrigin(0);
    this.add.image((mapWidth - 1) * tileSize, i * tileSize, 'tile').setOrigin(0);
  }
  
  // Générer les poteaux sur la carte
  for (let x = tileSize; x < (mapWidth - 1) * tileSize; x += tileSize * 2) {
    for (let y = tileSize; y < (mapHeight - 1) * tileSize; y += tileSize * 2) {
      const poteau = this.add.image(x, y, 'poteau');
      poteau.setOrigin(0, 0); // Définir l'origine en coin supérieur gauche du sprite
    }
  }
  
}

function update() {
  const speed = 5; // Vitesse de déplacement du joueur
  
  // Déplacement horizontal
  if (this.keys.Q.isDown) {
    this.player.x -= speed;
  } else if (this.keys.D.isDown) {
    this.player.x += speed;
  }
  
  // Déplacement vertical
  if (this.keys.Z.isDown) {
    this.player.y -= speed;
  } else if (this.keys.S.isDown) {
    this.player.y += speed;
  }
}

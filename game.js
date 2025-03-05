const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }
};

const game = new Phaser.Game(config);

let dragon;
let crystals;
let cursors;
let score = 0;
let scoreText;

function preload() {
    this.load.image('background', 'assets/background.jpg');
    this.load.image('dragon', 'assets/dragon.png');
    this.load.image('crystal', 'assets/crystal.png');
}

function create() {
    // Фон
    this.add.image(400, 300, 'background');

    // Дракон
    dragon = this.physics.add.sprite(400, 300, 'dragon');
    dragon.setCollideWorldBounds(true);

    // Кристаллы
    crystals = this.physics.add.group({
        key: 'crystal',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    // Столкновения
    this.physics.add.overlap(dragon, crystals, collectCrystal, null, this);

    // Управление
    cursors = this.input.keyboard.createCursorKeys();

    // Счет
    scoreText = this.add.text(16, 16, 'Счет: 0', { fontSize: '32px', fill: '#fff' });
}

function update() {
    // Управление драконом
    if (cursors.left.isDown) {
        dragon.setVelocityX(-160);
    } else if (cursors.right.isDown) {
        dragon.setVelocityX(160);
    } else {
        dragon.setVelocityX(0);
    }

    if (cursors.up.isDown) {
        dragon.setVelocityY(-160);
    } else if (cursors.down.isDown) {
        dragon.setVelocityY(160);
    } else {
        dragon.setVelocityY(0);
    }
}

function collectCrystal(dragon, crystal) {
    crystal.disableBody(true, true);
    score += 10;
    scoreText.setText('Счет: ' + score);
}
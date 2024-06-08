class Enemy extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, type, finder, goalX, goalY)
    {

        super(scene, x, y, "platformer_characters", "tile_0021.png");

        //define unique characteristics first
        switch(type)
        {
            case 0: //opportunity
                this.SPEED = Phaser.Math.Between (700, 750);
                this.animation = "oppyWalk";
                this.scorePoints;
                this.health;
                break;

            case 1: //spirit
                this.SPEED = Phaser.Math.Between (300, 350);
                this.animation = "spiritFlap";
                this.scorePoints;
                this.health;
                break;
            
            case 2: //
                this.SPEED = Phaser.Math.Between (500, 600);
                this.animation = "sojWalk";
                this.scorePoints;
                this.health;
                break;

        }

        //set initial vars
        this.SCENE = scene;
        this.finder = finder;
        this.GOALX = goalX;
        this.GOALY = goalY;
        this.TILESIZE = 16;
        this.ORGINX = x;
        this.ORGINY = y;


        //add sprite to scene
        this.setScale(0.6).setOrigin(0,0);
        scene.add.existing(this);
        scene.physics.add.existing(this); 
        this.flipX = true;
        this.anims.play(this.animation, true);

        console.log(this.x, this.y);


    }

    //////////helper functions

    //find the path for the enemy to traverse and start movement
    findPath() {
        // Convert enemy position from pixels to grid coordinates
        let fromX = Math.floor(this.ORGINX / this.TILESIZE);
        let fromY = Math.floor(this.ORGINY / this.TILESIZE);
    
        // Convert goal position from pixels to grid coordinates
        let toX = Math.floor(this.GOALX / this.TILESIZE);
        let toY = Math.floor(this.GOALY / this.TILESIZE);
    
        console.log('Going from (' + fromX + ',' + fromY + ') to (' + toX + ',' + toY + ')');
    
        this.finder.findPath(fromX, fromY, toX, toY, (path) => {
            if (path === null) {
                console.warn("Path was not found.");
            } else {
                console.log(path);
    
                // Convert path back to pixel coordinates
                let pixelPath = path.map(step => ({
                    x: step.x * this.TILESIZE,
                    y: step.y * this.TILESIZE
                }));
    
                this.moveEnemy(pixelPath);
            }
        });
    
        this.finder.calculate(); // Ask EasyStar to compute the path
    }

    //move enemy along calculated path
    moveEnemy(path) {
        if (path.length === 0) return;
    
        let tweens = [];
    
        for (let i = 0; i < path.length - 1; i++) {
            let ex = path[i + 1].x + Phaser.Math.Between (-4, 4);
            let ey = path[i + 1].y + Phaser.Math.Between (-2, 2);
            tweens.push({
                targets: this,
                x: ex,
                y: ey,
                duration: this.SPEED,
                ease: 'Quadratic.Out'
            });
        }
    
        this.scene.tweens.chain({
            targets: this,
            tweens: tweens,
            onComplete: () => {
                this.destroy();
            }

        });
    }

    update()
    {
        //update health here 

    }

}
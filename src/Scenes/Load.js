//class load. used for preloading assets some animations
class Load extends Phaser.Scene {
    constructor() 
    {
        super("loadScene");
    }

    preload() 
    {
        //set path for assets
        this.load.setPath("./assets/");

        //load characters spritesheet
        this.load.atlas("platformer_characters", "tilemap-characters-packed.png", "tilemap-characters-packed.json");

        //load tilemap information
        this.load.image("town_tiles", "tilemap-town_packed.png");
        this.load.image("battle_tiles", "tilemap-battle_packed.png");
        //unsure if i have to load character sheet as well
        this.load.tilemapTiledJSON("level", "Level.tmj");//level tilemap in JSON
        //load tilemaps for win and lose screens once created

        //load map tilemaps as spritesheets
        this.load.spritesheet("battle_sheet", "tilemap-battle_packed.png", {
            //px width/height
            frameWidth: 16,
            frameHeight: 16
        });

        this.load.spritesheet("town_sheet", "tilemap-town_packed.png", {
            //px width/height
            frameWidth: 16,
            frameHeight: 16
        });

        //load particles
        this.load.multiatlas("kenny-particles", "kenny-particles.json"); //multiatlas ripped from improved platformer

        //load additional assets
        this.load.image("donut", "donut_classic.png");
        this.load.image("p_burger", "projectile_burger.png");

        //load font

        //load audio assets

    }

    create()
    {
        //create animations

        //opportunity walking animation
        this.anims.create({
            key: 'oppyWalk',
            frames: this.anims.generateFrameNames('platformer_characters', {
                prefix: "tile_",
                start: 21,
                end: 22,
                suffix: ".png",
                zeroPad: 4
            }),
            frameRate: 5,
            repeat: -1
        });

        //spirit animation
        this.anims.create({
            key: 'spiritFlap',
            frames: this.anims.generateFrameNames('platformer_characters', {
                prefix: "tile_",
                start: 24,
                end: 26,
                suffix: ".png",
                zeroPad: 4
            }),
            frameRate: 5,
            repeat: -1
        });

        //sojourner walking animation
        this.anims.create({
            key: 'sojWalk',
            frames: this.anims.generateFrameNames('platformer_characters', {
                prefix: "tile_",
                start: 15,
                end: 16,
                suffix: ".png",
                zeroPad: 4
            }),
            frameRate: 5,
            repeat: -1
        });

        ///enemy animations

        //pass to next scene
        this.scene.start("mainLevel");
    }

    //never reached
    update()
    {

    }
}
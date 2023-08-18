import MainScene from "./scenes/MainScene";
import WelcomeScene from "./scenes/WelcomeScene";

export default class Game {
    constructor() {
        // create the canvas 
        let canvas = document.querySelector('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        this._context = canvas.getContext('2d');
    
        // add the scenes
        this._scenes = [new WelcomeScene(this, this._context), new MainScene(this, this._context)];
        this._currentSceneIndex = 0;

        this.setupCurrentScene();

        console.log(this.currentScene);
    }


    /** 
     * setupCurrentScene() 
     * @description sets the current scene up
     */
    setupCurrentScene() {
        this.currentScene.create();
        this.currentScene.draw(this._context);

        let self = this;
        window.addEventListener('keydown', (event) => {
            self.currentScene.onKeyDown(event)
        });

        window.addEventListener('keyup', (event) => {
            self.currentScene.onKeyUp(event)
        });

        window.addEventListener('mousedown', (event) => {
            self.currentScene.onMouseDown(event)
        });

        window.addEventListener('mouseup', (event) => {
            self.currentScene.onMouseUp(event)
        });
  
        window.addEventListener('click', (event) => {
            self.currentScene.onMouseClick(event)
        });
    
    }



    /**
     * nextScene()
     * @description sets the current scene to the next scene
     */
    nextScene() { 
        this._currentSceneIndex = (this._currentSceneIndex + 1) % this._scenes.length;

        this.setupCurrentScene();
    }


    /**
     * getCurrentScene()
     * @description gets the current scene
     */
    get currentScene() {
        return this._scenes[this._currentSceneIndex];
    }

  
}
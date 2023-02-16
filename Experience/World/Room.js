import * as THREE  from "three";
import Experience from "../Experience.js";
import GSAP from"gsap";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";

export default class Room {
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        this.roomChildren = {}

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,

        };

        this.setModel();
        this.onMouseMove();
    }

    setModel(){
        this.actualRoom.children.forEach(child=> {
           child.castShadow = true;
           child.receiveShadow = true; 


           if(child instanceof THREE.Group) {
                child.children.forEach((groupchild)=> {
                 groupchild.castShadow = true;
                 groupchild.receiveShadow = true;   
                })
           }

           if(child.name ==="Computer") {
            child.children[0].material = new THREE.MeshBasicMaterial({
                map: this.resources.items.Object_188,
            });
            // child.rotation.x = Math.PI / 2;
           }

            if (child.name === "Minifloor" ){
             child.position.x = 4;
             child.position.z = -3;
            }

            // if (child.name === "Mailbox" ||
            // child.name === "Lamp" || 
            // child.name === "Flower1" || 
            // child.name === "Flower2" || 
            // child.name === "Dirt" || 
            // child.name === "Floor_first" || 
            // child.name === "Floor_second" || 
            // child.name === "Floor_third" ){
            //  child.scale.set(0, 0, 0,)
            // }

            child.scale.set(0, 0, 0,)
            if(child.name ==="Cube") {
                // child.scale.set(1, 1, 1,);
                child.position.set(0, -1, 2,);
                child.rotation.y = Math.PI / 4;
            }

            this.roomChildren[child.name.toLowerCase()] = child;

        });

        const width = .4;
        const height = .3;
        const intensity = 1;
        const rectLight = new THREE.RectAreaLight(
            0xffffff,
            intensity,
            width,
            height,
        );
        rectLight.position.set(-5.5, 4.1293, -3);

        // rectLight.rotation.z = 2 * Math.PI / 3;
        // rectLight.rotation.x = 3 * -Math.PI / 2;
        rectLight.rotation.y = -Math.PI / 1.3 ;
        this.actualRoom.add(rectLight);

        this.roomChildren['rectLight'] = rectLight;


            // const rectLightHelper = new RectAreaLightHelper(rectLight);
            // rectLight.add(rectLightHelper);

        this.scene.add(this.actualRoom) 
        this.actualRoom.scale.set(0.11, 0.11, 0.11);
    }

    onMouseMove(){
        window.addEventListener("mousemove", (e) => {
            this.rotation = 
                ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
                this.lerp.target = this.rotation * 0.1;
        });
    }

    resize() {}

    update() {
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
            );

            this.actualRoom.rotation.y = this.lerp.current;

        }
    
}

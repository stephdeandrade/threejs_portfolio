import * as THREE  from "three";
import Experience from "../Experience.js";
import GSAP from"gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";

export default class Conntrols {
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera
        this.room = this.experience.world.room.actualRoom;
        this.room.children.forEach(child=>{
            if(child.type==="RectAreaLight"){
                this.rectLight = child;
            }
        });
        GSAP.registerPlugin(ScrollTrigger);

        this.setScrollTrigger();
    }

    setScrollTrigger(){
        ScrollTrigger.matchMedia({
            // Desktop
            "(min-width: 969px)": () => {

                this.room.scale.set(0.11, 0.11, 0.11)

                // First Section
               this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger:".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
               });
               this.firstMoveTimeline.to(this.room.position, {
                    x: ()=>{
                        return  this.sizes.width * 0.0012;
                    },
               });

               // Second Section

                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger:".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
               });
               this.secondMoveTimeline.to(
                this.room.position, {
                    x: ()=>{
                        return 1;
                        
                    },
                    z:() =>{
                        return this.sizes.height * 0.0032;
                    },
               },
               "same"
               );
               this.secondMoveTimeline.to(
                this.room.scale, {
                    x: 0.5,
                    y: 0.5,
                    z: 0.5,
               },
               "same"
               );
               this.secondMoveTimeline.to(
                this.rectLight, 
                {
                    width: 0.4 * 5,
                    height: 0.3 * 5,
               },
               "same"
               );

               // Third Section
               this.thirdMoveTimeline = new GSAP.timeline({
                scrollTrigger: {
                    trigger:".third-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                }
           });
           this.thirdMoveTimeline.to(this.camera.orthographicCamera.position, {
                y: -0.5,
                x: -3.1,
           });
            },

            // Mobile
            "(max-width: 968px)": () => {
                this.room.scale.set(0.07, 0.07, 0.07);
                 // First Section

               this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger:".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                }).to(this.room.scale, {
                    x: 0.1,
                    y: 0.1,
                    z: 0.1,
                });

                // Second Section

                this.secondMoveTimeline = new GSAP.timeline({
                     scrollTrigger: {
                        trigger:".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                }).to(this.room.scale, {
                    x: 0.3  ,
                    y: 0.3,
                    z: 0.3,
                }, "same")
                .to(this.room.position, {
                    x: 1.5,
                    z: 1.5,
                }, "same")
                .to(this.rectLight, {
                    width: 0.4 * 3.4,
                    height: 0.3 * 3.4,
                }, "same");

                // Third Section

                this.thirdMoveTimeline = new GSAP.timeline({
                        scrollTrigger: {
                        trigger:".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                });
                },

                // all 

                "all": () => {},

        }); 
    };

    resize() {}

    update() {}
}
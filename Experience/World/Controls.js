import * as THREE  from "three";
import Experience from "../Experience.js";
import GSAP from"gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import ASScroll from "@ashthornton/asscroll";

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

        this.circleFirst = this.experience.world.floor.circleFirst
        this.circleSecond = this.experience.world.floor.circleSecond
        this.circleThird = this.experience.world.floor.circleThird
        GSAP.registerPlugin(ScrollTrigger);

        this.setSmoothScroll();
        this.setScrollTrigger();
    }


    setupASScroll() {
        // https://github.com/ashthornton/asscroll
        const asscroll = new ASScroll({
            ease: 0.3,
          disableRaf: true,
         });
      
      
        GSAP.ticker.add(asscroll.update);
      
        ScrollTrigger.defaults({
          scroller: asscroll.containerElement });
      
      
        ScrollTrigger.scrollerProxy(asscroll.containerElement, {
          scrollTop(value) {
            if (arguments.length) {
              asscroll.currentPos = value;
              return;
            }
            return asscroll.currentPos;
          },
          getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
          },
          fixedMarkers: true });
      
      
        asscroll.on("update", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", asscroll.resize);
      
        requestAnimationFrame(() => {
          asscroll.enable({
            newScrollElements: document.querySelectorAll(".gsap-marker-start, .gsap-marker-end, [asscroll]") });
      
        });
        return asscroll;
      }

    setSmoothScroll(){
        this.asscroll = this.setupASScroll();
    }

    setScrollTrigger(){
        ScrollTrigger.matchMedia({
            // Desktop
            "(min-width: 969px)": () => {

                this.room.scale.set(0.11, 0.11, 0.11)
                this.room.position.set(0, 0, 0,);
                this.rectLight.width = 0.4;
                this.rectLight.height= 0.3;
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
                x: -2.8,
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
                }).to(this.room.position, {
                    z: -4.5,
                });
                },

                // all 

                all: ()=> {
                    this.sections = document.querySelectorAll(".section")
                    this.sections.forEach(section => {
                        this.progressWrapper =
                            section.querySelector(".progress-wrapper");
                        this.progressBar = section.querySelector(".progress-bar");

                        if(section.classList.contains("right")){
                            GSAP.to(section, {
                                borderTopLeftRadius: 10,
                                scrollTrigger:{
                                    trigger: section,
                                    start: "top bottom",
                                    end: "top top",
                                    scrub: 0.6,
                                }
                            });
                            GSAP.to(section, {
                                borderBottomLeftRadius: 700,
                                scrollTrigger:{
                                    trigger: section,
                                    start: "bottom bottom",
                                    end: "bottom top",
                                    scrub: 0.6,
                                }
                            });
                        }else{
                            GSAP.to(section, {
                                borderTopRightRadius: 10,
                                scrollTrigger:{
                                    trigger: section,
                                    start: "top bottom",
                                    end: "top top",
                                    scrub: 0.6,
                                }
                            });
                            GSAP.to(section, {
                                borderBottomRightRadius: 700,
                                scrollTrigger:{
                                    trigger: section,
                                    start: "bottom bottom",
                                    end: "bottom top",
                                    scrub: 0.6,
                                }
                            });
                        }
                        GSAP.from(this.progressBar, {
                            scaleY: 0,
                            scrollTrigger: {
                                trigger: section,
                                start: "top top",
                                end: "bottom bottom",
                                scrub: 0.4,
                                pin: this.progressWrapper,
                                pinSpacing: false,
                            }
                        })
                    });

                    // ALL Animation

                                // First Section
                        this.firstMoveTimeline = new GSAP.timeline({
                                scrollTrigger: {
                                    trigger:".first-move",
                                    start: "top top",
                                    end: "bottom bottom",
                                    scrub: 0.6,
                                    invalidateOnRefresh: true,
                                }
                        }).to(this.circleFirst.scale, {
                            x: 3,
                            y: 3,
                            z: 3,
                        })

                        // Second Section

                            this.secondMoveTimeline = new GSAP.timeline({
                                scrollTrigger: {
                                    trigger:".second-move",
                                    start: "top top",
                                    end: "bottom bottom",
                                    scrub: 0.6,
                                    invalidateOnRefresh: true,
                                }
                        }).to(this.circleSecond.scale, {
                            x: 3,
                            y: 3,
                            z: 3,
                        },
                        "same"    
                        )
                        .to(this.room.position, {
                            y: 0.7,
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
                    }).to(this.circleThird.scale, {
                        x: 3,
                        y: 3,
                        z: 3,
                    })
                   

                    // Mini Platform
                    this.secondPartTimeline = new GSAP.timeline({
                        scrollTrigger: {
                        trigger:".third-move",
                        start: "center center",
                    }
                });

                      this.room.children.forEach(child=>{
                          if(child.name === "Minifloor"){
                              this.first = GSAP.to(child.position, {
                                  x: 2.277327299118042,
                                  z: -0.07508063316345215,
                                  ease: "back.out(2)",
                                  duration: 0.3
                              });
                          }
                          if(child.name === "Mailbox" ){
                            this.second = GSAP.to(child.scale, {
                                  x: 1,
                                  y: 1,
                                  z: 1,
                                  ease: "back.out(2)",
                                  duration: 0.3
                              });
                          }
                          if(child.name === "Lamp" ){
                            this.third = GSAP.to(child.scale, {
                                  x: 1,
                                  y: 1,
                                  z: 1,
                                  ease: "back.out(2)",
                                  duration: 0.3
                              });
                          }
                          if(child.name === "Floor_first" ){
                            this.fourth = GSAP.to(child.scale, {
                                  x: 1,
                                  y: 1,
                                  z: 1,
                                  ease: "back.out(2)",
                                  duration: 0.3
                              });
                          }
                          if(child.name === "Floor_second" ){
                            this.fifth = GSAP.to(child.scale, {
                                  x: 1,
                                  y: 1,
                                  z: 1,
                                  ease: "back.out(2)",
                                  duration: 0.3
                              });
                          }
                          if(child.name === "Floor_third" ){
                            this.sixth = GSAP.to(child.scale, {
                                  x: 1,
                                  y: 1,
                                  z: 1,
                                  ease: "back.out(2)",
                                  duration: 0.3
                              });
                          }
                          if(child.name === "Dirt" ){
                            this.seventh = GSAP.to(child.scale, {
                                  x: 1,
                                  y: 1,
                                  z: 1,
                                  ease: "back.out(2)",
                                  duration: 0.3
                              });
                          }
                          if(child.name === "Flower1" ){
                            this.eight = GSAP.to(child.scale, {
                                  x: 1,
                                  y: 1,
                                  z: 1,
                                  ease: "back.out(2)",
                                  duration: 0.3
                              });
                          }
                          if(child.name === "Flower2" ){
                            this.ninth = GSAP.to(child.scale, {
                                  x: 1,
                                  y: 1,
                                  z: 1,
                                  ease: "back.out(2)",
                                  duration: 0.3
                              });
                          }
                      });
                      this.secondPartTimeline.add(this.first);
                      this.secondPartTimeline.add(this.second, "-=0.2");
                      this.secondPartTimeline.add(this.third, "-=0.2");
                      this.secondPartTimeline.add(this.fourth, "-=0.2");
                      this.secondPartTimeline.add(this.fifth, "-=0.2");
                      this.secondPartTimeline.add(this.sixth, "-=0.2");
                      this.secondPartTimeline.add(this.seventh, "-=0.2");
                      this.secondPartTimeline.add(this.eight);
                      this.secondPartTimeline.add(this.ninth, "-=0.1");
                },

        }); 
    };

    resize() {}

    update() {}
}
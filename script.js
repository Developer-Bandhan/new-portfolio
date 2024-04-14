function locoScrollTrigger() {
   if(window.innerWidth > 600){
    gsap.registerPlugin(ScrollTrigger);
  
  
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("main"),
      smooth: true,
      mobile: {
        smooth: true
    },
    tablet: {
        smooth: true
    }
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);
  
    // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("main", {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector("main").style.transform ? "transform" : "fixed"
    });
  
  
  
  
  
  
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  
    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
   }
  
  }
  locoScrollTrigger();
  
  
  /*************loader animation************/
  
  
  function loaderAnimation(){
    document.querySelectorAll(".reveal")
    .forEach(function (elem) {
      //create two spans
      let parent = document.createElement("span");
      let child = document.createElement("span");
  
      //parent and chile both sets add their respective classes
      parent.classList.add("parent");
      child.classList.add("child");
  
      //span parent gets child and child gets elem details
      child.innerHTML = elem.innerHTML;
      parent.appendChild(child);
  
      //elem replaces its value with parent span
      elem.innerHTML = "";
      elem.appendChild(parent);
    })
  
  let tl = gsap.timeline();
  
  tl
    .from(".loader .child span", {
      x: 100,
      stagger: .2,
      duration: 1.4,
      opacity: 0,
      ease: Circ.easeInOut
    }, 'a')
    .to(".loader .parent .child", {
      y: "-100%",
      duration: 1,
      ease: Circ.easeInOut
    })
    .to(".loader", {
      height: 0,
      duration: 1,
      ease: Circ.easeInOut
    })
    .to(".next_color", {
      height: "100%",
      top: 0,
      duration: 1,
      delay: -1.5,
      ease: Circ.easeInOut
    })
    .to(".next_color", {
      height: 0,
      duration: .8,
      delay: -.8,
  
    })
    // .to(".next-color-two", {
    //   height: "100%",
    //   top: 0,
    //   duration: 1,
    //   delay: -1,
    //   ease: Circ.easeInOut
    // })
    // .to(".next-color-two", {
    //   height: 0,
    //   duration: 0.5,
    //   delay: -0.5,
  
    // })
    .to(".page1-content .creative-div h1", {
      y: -10,
      opacity:1,
      delay: 0.5,
      duration: 0.6,
      stagger: 0.3,
    })
    // .to(".page1-content .web-div h1 ", {
    //   y: -10,
    //   opacity:1,
    //   delay: -0.6,
    //   duration: 0.9,
    //   stagger: 0.3,
    // })
    .to(".page1-content .developer-div h1", {
      y: -10,
      opacity:1,
      delay: -0.4,
  
      duration: 0.6,
      stagger: 0.3,
      onComplete: function(){
        page2Animation();
      }
    })
    
  }
  
  // loaderAnimation()
  
  
  //page1 animation

  // let menu = document.querySelector(".mobile-nav")
  // let navDiv = document.querySelector(".mobile-nav-div")


  // menu.addEventListener("click", function(){
  //   navDiv.classList.remove(".hide")
  //   body.classList.add(".active")
  // })














  
  
  function page1Text(){
    let tl = gsap.timeline();
  
  tl.to(".page1-text span h1",{
    y: 0,
    duration: 0.5,
    delay: 0.5,
    stagger:{
      amount: 0.2
    }
  })
  tl.to(".page1-right .cover",{
    transform: "translateY(-100%)",
    borderRadius: "0px",
    duration: 1,
    delay: 0.2,
    ease: Circ.ease
  
  })
  
  // tl.to(".page1-right img",{
  //   height: "100%",
  //   duration:2,
  //   delay:0.2,
    
  // })
  
  
  
  }
  page1Text()
  
  
  
  // page 2 animation
     // page2 button animation




    
  
     
  function page2Animation(){
    
  let cursor = document.querySelector(".cursor")
  let page2 = document.querySelector(".page2")
  
  
  if(window.innerWidth > 600 ){
    
  page2.addEventListener("mouseenter", function(){
    gsap.to(".cursor",{
      scale:1,
      opacity:1
    })
  })
  page2.addEventListener("mouseleave", function(){
    gsap.to(".cursor",{
      scale:0,
      opacity:0
    })
  })
  page2.addEventListener("mousemove", function(dets){
    gsap.to(".cursor",{
      x:dets.x - page2.getBoundingClientRect().x -4,
      y:dets.y - page2.getBoundingClientRect().y -2
    })
  })
  
  let cursorScale = document.querySelectorAll(".cursor-scale")
  
  
  
  cursorScale.forEach(elem => {
  
    console.log("leave")
    elem.addEventListener("mouseleave", function(){
      cursor.classList.remove('grow');
      cursor.classList.remove('grow-small')
    });
    elem.addEventListener("mouseenter", function(){
       cursor.classList.add('grow');
        if(elem.classList.contains('small')){
        cursor.classList.remove('grow');
        cursor.classList.add('grow-small');
      }
    })
  })
  gsap.to(".page2-left span",{
    y:0,
    duration: 1,
    stagger: {
      amount: 0.4
    },
    scrollTrigger:{
    trigger:".page2",
     scroller:"main",
     markers: true,
     start:"top 100%",
     end:"0%",
    }
  })

  }else{
    gsap.to(".page2-left span",{
      y:0,
      duration: 1,
      stagger: {
        amount: 0.3
      },
      scrollTrigger:{
      trigger:".page2",
       scroller:"body",
       scrub: 2,
      //  markers: true,
       start:"0% 80%",
       end:"0% 80%",
      }
    })



    
  let roundButtom = document.querySelector(".round-button");

  gsap.to(roundButtom,{
    scale: 1,
    opacity:1,
    x:"100%",
    duration: 10,
    scrollTrigger:{
      trigger:".page2",
      scroller:"body",
      start: "30% 80%",
      end: "30% 80%",
      scrub: 2,
      // markers: true
    }
    
  })



  }
  
  }
  
  page2Animation()

  
  
  
  
  
  
  
  
  
  
  
  
  function createInteractiveEffect(button, text, strength = 40, textStrength = 80) {
    // Function to activate the effect
   if(window.innerWidth > 600 ){
    const activateEffect = (event) => {
      const boundBox = button.getBoundingClientRect();
      const newX = (event.clientX - boundBox.left) / button.offsetWidth - 0.5;
      const newY = (event.clientY - boundBox.top) / button.offsetHeight - 0.5;

      // Move the button and text to new positions
      gsap.to(button, {
          duration: 1,
          x: newX * strength,
          y: newY * strength,
          ease: Power4.easeOut
      });
      gsap.to(text, {
          duration: 1,
          x: newX * textStrength,
          y: newY * textStrength,
          ease: Power4.easeOut
      });
  };

  // Function to reset the effect
  const resetEffect = () => {
      // Reset button and text positions to default
      gsap.to([button, text], {
          duration: 1,
          x: 0,
          y: 0,
          ease: Elastic.easeOut
      });
  };

  // Add event listeners
  button.addEventListener('mousemove', activateEffect);
  button.addEventListener('mouseleave', resetEffect);
   }
  }
  
  // Example usage for each button
  const workButton = document.querySelector(".work");
  const workText = document.querySelector('.work .text');
  createInteractiveEffect(workButton, workText);
  
    
    let about = document.querySelector(".about");
    let aboutText = document.querySelector('.about .text');
    createInteractiveEffect(about, aboutText);
  
    let contact = document.querySelector(".contact");
    let contactText = document.querySelector(".contact .text");
    createInteractiveEffect(contact, contactText);
  
  
  
  
    
  // page2 button animation 
    
  let page2Button = document.querySelector(".round-button");
    createInteractiveEffect(page2Button)
  
  // page3 button animation
  
  let page3Button = document.querySelector(".round-button2");
  
  createInteractiveEffect(page3Button)
  
  
  
  
  
  
  
  
  
  
    function page3Animation(){
    
      if (window.innerWidth > 600) {
      let page3Elem = document.querySelectorAll(".page3-right .elem");
      
      page3Elem.forEach(elem => {
        elem.addEventListener("mouseenter", function(){
          gsap.to(elem.childNodes[3],{
            scale: 1
          })
        })
      
        elem.addEventListener("mouseleave", function(){
          gsap.to(elem.childNodes[3],{
            scale: 0
          })
        })
      
        elem.addEventListener("mousemove", function(dets){
          gsap.to(elem.childNodes[3],{
            x:dets.x - elem.getBoundingClientRect().x - 150,
            y:dets.y - elem.getBoundingClientRect().y - 150
          })
        })
      });
      
      
      
      let page3H1 = document.querySelector(".page3-h1 span h1")
      
      
      
      gsap.to(page3H1,{
        y:0,
        duration:0.5,
        stagger:{
          amount: 0.5
        },
        scrollTrigger:{
          trigger:".page3",
          scroller:"main",
          // markers: true,
          start:"top 50%",
          end:"80%",
        },
        onComplete: function(){
          fontSmall()
        }
      })
      
      
      function fontSmall(){
        gsap.to(page3H1,{
          fontSize: "4vw",
          onComplete: page3opacity()
        })
      }
      
      function page3opacity(){
        gsap.to(".page3-content",{
          opacity:1,
          duration:0.6
        })
      }
      
    }
    else{
  
  
  
      let page3H1 = document.querySelector(".page3-h1 span h1")
  
      gsap.to(page3H1,{
        y:0,
        duration:0.5,
        stagger:{
          amount: 0.5
        },
        scrollTrigger:{
          trigger:".page3",
          scroller:"body",
          // markers: true,
          start:"0% 90%",
          end:"0% 90%",
        },
        onComplete: function(){
          fontSmall()
        }
      })
      
      
      function fontSmall(){
        gsap.to(page3H1,{
          fontSize: "9vw",
          onComplete: page3opacity()
        })
      }
      
      function page3opacity(){
        gsap.to(".page3-content",{
          opacity:1,
          duration:0.6
        })
      }
  
  
    }
      
      }
      
      page3Animation()
      
  
  
  
  function page4Animation(){
   if(window.innerWidth > 600){
    gsap.to(".page4-left",{
      scrollTrigger:{
        trigger:".page4",
        scroller: "main",
        pin:".page4-left",
        scrub: 0.5,
        start: "top 15%",
        end:"50%"
      }
    })
   }else{
     
   
  let pinTimeline1 = gsap.timeline({
    scrollTrigger: {
      trigger: ".right-box-1",
      scroller: "body",
      start: "top 20%",
      // markers:true,
      end: "233% 20%",
      scrub: 2,
      pin: true,
      onEnter: () => {
        gsap.set(".right-box-1", { top: "20%" });
      }
    }
  });

  let pinTimeline2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".right-box-2",
      scroller: "body",
      // markers:true,

      start: "top 20%",
      end: "101% 20%",
      scrub: 2,
      pin: true,
      onEnter: () => {
        gsap.set(".right-box-2", { top: "20%" });
      }
    }
  });

  // let pinTimeline3 = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: ".right-box-3",
  //     scroller: "body",
  //     start: "top 20%",
  //     markers:true,

  //     end: "20% 20%",
  //     scrub: 2,
  //     pin: true,
  //     onEnter: () => {
  //       gsap.set(".right-box-3", { top: "20%" });
  //     }
  //   }
  // });
  
  
  
   }
  
  
  
  
  }
  page4Animation()

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  function scrollCover(){
  if(window.innerWidth > 600){
    gsap.to(".scroll-cover",{
      transform: "translateY(-65%)",
      scaleY:0,
      duration:0.2,
      scrollTrigger:{
        trigger:".page5",
        scroller:"main",
        start:"top 70%",
        // markers:true,
        end:"70%",
        scrub:2
      }
    })
  }else{
    gsap.to(".scroll-cover",{
      transform: "translateY(-65%)",
      scaleY:0,
      duration:0.2,
      scrollTrigger:{
        trigger:".page5",
        scroller:"body",
        start:"top 70%",
        // markers:true,
        end:"100% 70%",
        scrub:2
      }
    })
  }
    
  }
  
  scrollCover();
  
  
  
  
  function page5Animation(){
 if(window.innerWidth > 600){
  gsap.to(".page5-left a h3",{
    y:0,
    duration:1,
    scrollTrigger:{
      scroller:"main",
      trigger:".page5",
      // markers: true,
      start:"top 30%",
      end: "top 30%",
      scrub:2
    }
  })
 }
else{
  gsap.to(".page5-left a h3",{
    y:0,
    duration:1,
    scrollTrigger:{
      scroller:"body",
      scrub:2,
      trigger:".page5",
      // markers: true,
      start:"top 20%",
      end: " 20%"
    }
  })
}
  }
  
  page5Animation();






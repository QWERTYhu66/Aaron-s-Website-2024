document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from("#section1 h1", {
        opacity: 0,
        y: -50,
        duration: 1.5,
        ease: "power2.out",
    });

    gsap.from("#section2 h2, #section2 p", {
        scrollTrigger: {
            trigger: "#section2",
            start: "top 80%",
            end: "top 40%",
            scrub: true,
        },
        opacity: 0,
        y: 50,
        duration: 1.5,
        stagger: 0.2,
    });

    gsap.from("#section3 h2, #section3 p", {
        scrollTrigger: {
            trigger: "#section3",
            start: "top 80%",
            end: "top 40%",
            scrub: true,
        },
        opacity: 0,
        y: 50,
        duration: 1.5,
        stagger: 0.2,
    });

    gsap.to(".parallax-bg", {
        scrollTrigger: {
            trigger: ".parallax-bg",
            start: "top bottom", 
            end: "bottom top",
            scrub: true,
        },
        yPercent: -50,
        ease: "none"
    });

    gsap.from("#section4 h2, #section4 p", {
        scrollTrigger: {
            trigger: "#section4",
            start: "top 80%",
            end: "top 40%",
            scrub: true,
        },
        opacity: 0,
        scale: 0.9,
        duration: 1.5,
        stagger: 0.2,
    });

    gsap.from(".button", {
        scrollTrigger: {
            trigger: ".button",
            start: "top 90%",
            end: "top 70%",
            scrub: true,
        },
        opacity: 0,
        scale: 0.8,
        duration: 1.2,
        ease: "bounce.out",
    });
});

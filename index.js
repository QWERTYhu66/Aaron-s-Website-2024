document.addEventListener("DOMContentLoaded", () => {
    new fullpage('#fullpage', {
        autoScrolling: true,
        navigation: true,
        anchors: ['section1', 'section2', 'section3', 'section4'],
        scrollingSpeed: 700,
        afterLoad: (origin, destination, direction) => {
            const loadedSection = destination.item;
            if (loadedSection.id === "section1") {
                gsap.from("#section1 h1", {
                    opacity: 0,
                    y: -50,
                    duration: 1.5,
                    ease: "power2.out",
                });
            } else if (loadedSection.id === "section2") {
                gsap.from("#section2 h2, #section2 p", {
                    opacity: 0,
                    y: 50,
                    duration: 1.5,
                    stagger: 0.2,
                });
            } else if (loadedSection.id === "section3") {
                gsap.from("#section3 h2, #section3 p", {
                    opacity: 0,
                    y: 50,
                    duration: 1.5,
                    stagger: 0.2,
                });
            } else if (loadedSection.id === "section4") {
                gsap.from("#section4 h2, .button", {
                    opacity: 0,
                    scale: 0.8,
                    duration: 1.5,
                    ease: "bounce.out",
                });
            }
        },
    });
});

/* =====================================================
   IRMAS JAMI BAITURRAHMAN
   JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {


    /* =================================================
       LOADER
    ================================================= */

    const loader =
        document.getElementById("loader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.classList.add("hide");

        }, 700);

    });



    /* =================================================
       NAVBAR
    ================================================= */

    const navbar =
        document.getElementById("navbar");

    const handleNavbar =
        () => {

            if (window.scrollY > 50) {

                navbar.classList.add(
                    "scrolled"
                );

            } else {

                navbar.classList.remove(
                    "scrolled"
                );

            }

        };

    window.addEventListener(
        "scroll",
        handleNavbar
    );

    handleNavbar();



    /* =================================================
       MOBILE MENU
    ================================================= */

    const menuButton =
        document.getElementById(
            "menuButton"
        );

    const navMenu =
        document.getElementById(
            "navMenu"
        );


    menuButton.addEventListener(
        "click",
        () => {

            menuButton.classList.toggle(
                "active"
            );

            navMenu.classList.toggle(
                "active"
            );

        }
    );


    document.querySelectorAll(
        ".nav-link"
    ).forEach(link => {

        link.addEventListener(
            "click",
            () => {

                navMenu.classList.remove(
                    "active"
                );

                menuButton.classList.remove(
                    "active"
                );

            }
        );

    });



    /* =================================================
       ACTIVE MENU
    ================================================= */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const links =
        document.querySelectorAll(
            ".nav-link"
        );


    function updateActiveMenu() {

        let current = "";

        sections.forEach(section => {

            const top =
                section.offsetTop - 180;

            const bottom =
                top +
                section.offsetHeight;


            if (
                window.scrollY >= top &&
                window.scrollY < bottom
            ) {

                current =
                    section.id;

            }

        });


        links.forEach(link => {

            link.classList.remove(
                "active"
            );


            if (
                link.getAttribute("href") ===
                `#${current}`
            ) {

                link.classList.add(
                    "active"
                );

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveMenu
    );



    /* =================================================
       SMOOTH SCROLL
    ================================================= */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(anchor => {

        anchor.addEventListener(
            "click",
            event => {

                const id =
                    anchor.getAttribute(
                        "href"
                    );


                if (
                    id === "#" ||
                    !id
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        id
                    );


                if (!target) {

                    return;

                }


                event.preventDefault();


                const offset =
                    navbar.offsetHeight;


                const position =
                    target.offsetTop -
                    offset;


                window.scrollTo({

                    top: position,

                    behavior: "smooth"

                });

            }
        );

    });



    /* =================================================
       COUNTER
    ================================================= */

    const counters =
        document.querySelectorAll(
            ".stat strong"
        );

    let counterDone = false;


    function runCounters() {

        if (counterDone) {

            return;

        }


        const statistics =
            document.querySelector(
                ".statistics"
            );


        if (!statistics) {

            return;

        }


        const position =
            statistics.getBoundingClientRect()
                .top;


        if (
            position <
            window.innerHeight - 100
        ) {

            counterDone = true;


            counters.forEach(
                counter => {

                    const target =
                        Number(
                            counter.dataset.target
                        );


                    let current = 0;

                    const duration = 1400;

                    const step =
                        target /
                        (duration / 20);


                    const timer =
                        setInterval(
                            () => {

                                current += step;


                                if (
                                    current >=
                                    target
                                ) {

                                    current =
                                        target;

                                    clearInterval(
                                        timer
                                    );

                                }


                                counter.textContent =
                                    Math.floor(
                                        current
                                    ) + "+";

                            },
                            20
                        );

                }
            );

        }

    }


    window.addEventListener(
        "scroll",
        runCounters
    );

    runCounters();



    /* =================================================
       SCROLL REVEAL
    ================================================= */

    const revealElements =
        document.querySelectorAll(
            ".section-heading, .about-grid, .program-card, .timeline-item, .gallery-item, .person-card, .contact-box"
        );


    revealElements.forEach(
        element => {

            element.classList.add(
                "reveal"
            );

        }
    );


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.1
            }
        );


    revealElements.forEach(
        element => {

            revealObserver.observe(
                element
            );

        }
    );



    /* =================================================
       LIGHTBOX
    ================================================= */

    const lightbox =
        document.getElementById(
            "lightbox"
        );

    const lightboxImage =
        document.getElementById(
            "lightboxImage"
        );

    const lightboxClose =
        document.getElementById(
            "lightboxClose"
        );


    document.querySelectorAll(
        ".gallery-item"
    ).forEach(item => {

        item.addEventListener(
            "click",
            event => {

                if (
                    event.target.closest(
                        ".gallery-button"
                    ) ||
                    !event.target.closest(
                        ".gallery-overlay"
                    )
                ) {

                    const image =
                        item.querySelector(
                            "img"
                        );


                    if (
                        image &&
                        image.src
                    ) {

                        lightboxImage.src =
                            image.src;

                        lightbox.classList.add(
                            "show"
                        );

                        document.body.classList.add(
                            "no-scroll"
                        );

                    }

                }

            }
        );

    });


    document.querySelectorAll(
        ".gallery-button"
    ).forEach(button => {

        button.addEventListener(
            "click",
            event => {

                event.stopPropagation();


                const item =
                    button.closest(
                        ".gallery-item"
                    );


                const image =
                    item.querySelector(
                        "img"
                    );


                if (image) {

                    lightboxImage.src =
                        image.src;

                    lightbox.classList.add(
                        "show"
                    );

                    document.body.classList.add(
                        "no-scroll"
                    );

                }

            }
        );

    });



    function closeLightbox() {

        lightbox.classList.remove(
            "show"
        );

        document.body.classList.remove(
            "no-scroll"
        );

        setTimeout(() => {

            lightboxImage.src = "";

        }, 300);

    }


    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );


    lightbox.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                lightbox
            ) {

                closeLightbox();

            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Escape"
            ) {

                closeLightbox();

            }

        }
    );



    /* =================================================
       BACK TO TOP
    ================================================= */

    const backTop =
        document.getElementById(
            "backTop"
        );


    window.addEventListener(
        "scroll",
        () => {

            if (
                window.scrollY > 500
            ) {

                backTop.classList.add(
                    "show"
                );

            } else {

                backTop.classList.remove(
                    "show"
                );

            }

        }
    );


    backTop.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );



    /* =================================================
       YEAR
    ================================================= */

    const year =
        document.getElementById(
            "year"
        );


    if (year) {

        year.textContent =
            new Date().getFullYear();

    }



    /* =================================================
       IMAGE FALLBACK
    ================================================= */

    document.querySelectorAll(
        "img"
    ).forEach(image => {

        image.addEventListener(
            "error",
            () => {

                image.style.opacity = "0";

            }
        );

    });

});
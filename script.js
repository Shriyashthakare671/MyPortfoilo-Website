/* =========================================================
   SHRIYASH THAKARE PORTFOLIO
   MODERN PORTFOLIO SCRIPT
   VERSION: 3.0
   ========================================================= */

"use strict";

/* =========================================================
   GLOBAL CONFIGURATION
   ========================================================= */

const PORTFOLIO_SECTIONS = [
    { id: "header", icon: "home-outline" },
    { id: "about", icon: "person-outline" },
    { id: "projects", icon: "folder-open-outline" },
    { id: "certifications", icon: "ribbon-outline" },
    { id: "skills-dashboard", icon: "code-slash-outline" },
    { id: "aws-etl", icon: "server-outline" },
    { id: "contact", icon: "call-outline" }
    
];

let laptopAnimationFrame = null;
let laptopResizeHandler = null;
let projectsInitialized = false;


/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    console.log("DOM loaded.");

    try {
        initTheme();
    } catch (error) {
        console.error("Theme initialization failed:", error);
    }

    try {
        initNavigation();
    } catch (error) {
        console.error("Navigation initialization failed:", error);
    }

    try {
        initTabs();
    } catch (error) {
        console.error("Tabs initialization failed:", error);
    }

    try {
        initProjectCards();
    } catch (error) {
        console.error("Project cards initialization failed:", error);
    }

    try {
        initLazyLoading();
    } catch (error) {
        console.error("Lazy loading initialization failed:", error);
    }

    try {
        initMusic();
    } catch (error) {
        console.error("Music initialization failed:", error);
    }

    try {
        initScrollEffects();
    } catch (error) {
        console.error("Scroll effects initialization failed:", error);
    }

    try {
        initAnimations();
    } catch (error) {
        console.error("Animations initialization failed:", error);
    }

    try {
        initEmailJS();
    } catch (error) {
        console.error("EmailJS initialization failed:", error);
    }

});


/* =========================================================
   WINDOW LOAD
   ========================================================= */

window.addEventListener("load", () => {

    console.log("Window loaded.");

    try {
        initParticles();
    } catch (error) {
        console.error("Particles initialization failed:", error);
    }

    try {
        initLaptop();
    } catch (error) {
        console.error("Laptop initialization failed:", error);
    }

    try {
        initTypingEffect();
    } catch (error) {
        console.error("Typing initialization failed:", error);
    }

    /*
     * If project cards are loaded dynamically or the DOM
     * was not ready during the first initialization.
     */
    if (!projectsInitialized) {
        initProjectCards();
    }

});


/* =========================================================
   THEME
   ========================================================= */

function initTheme() {

    const themeToggle =
        document.getElementById("theme-toggle");

    if (!themeToggle) return;

    const icon =
        themeToggle.querySelector("ion-icon");

    const savedTheme =
        localStorage.getItem("portfolio-theme");

    const isLight =
        savedTheme === "light";

    document.body.classList.toggle(
        "light-theme",
        isLight
    );

    if (icon) {

        icon.setAttribute(
            "name",
            isLight
                ? "sunny-outline"
                : "moon-outline"
        );

    }

    if (themeToggle.dataset.initialized === "true") {
        return;
    }

    themeToggle.dataset.initialized = "true";

    themeToggle.addEventListener(
        "click",
        event => {

            event.preventDefault();
            event.stopPropagation();

            const light =
                document.body.classList.toggle(
                    "light-theme"
                );

            localStorage.setItem(
                "portfolio-theme",
                light
                    ? "light"
                    : "dark"
            );

            if (icon) {

                icon.setAttribute(
                    "name",
                    light
                        ? "sunny-outline"
                        : "moon-outline"
                );

            }

        }
    );

}


/* =========================================================
   NAVIGATION
   ========================================================= */

function initNavigation() {

    const navCircle =
        document.getElementById("navCircle");

    const navMenu =
        document.getElementById("navMenu");

    const drawer =
        document.getElementById("drawer");

    const closeButton =
        document.querySelector("#drawer .close-btn");

    const mobileMenuBtn =
        document.getElementById("mobile-menu-btn");

    const mobileCloseBtn =
        document.getElementById("mobile-close-btn");

    const mobileNav =
        document.getElementById("mobile-nav");


    /* -----------------------------------------------------
       OLD FLOATING NAVIGATION
       ----------------------------------------------------- */

    if (
        navCircle &&
        navMenu &&
        navCircle.dataset.initialized !== "true"
    ) {

        navCircle.dataset.initialized = "true";

        navCircle.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                const isOpen =
                    navMenu.classList.toggle("show");

                navMenu.style.display =
                    isOpen
                        ? "block"
                        : "none";

            }
        );

    }


    /* -----------------------------------------------------
       OLD NAV ITEMS
       ----------------------------------------------------- */

    document
        .querySelectorAll(".navigation .nav-item")
        .forEach(item => {

            if (item.dataset.initialized === "true") {
                return;
            }

            item.dataset.initialized = "true";

            item.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    const id =
                        item.id.replace("-nav", "");

                    if (id) {
                        navigateTo(id);
                    }

                }
            );

        });


    /* -----------------------------------------------------
       MODERN NAVIGATION
       ----------------------------------------------------- */

    document
        .querySelectorAll(
            ".nav-link, .mobile-nav-link"
        )
        .forEach(link => {

            if (link.dataset.initialized === "true") {
                return;
            }

            link.dataset.initialized = "true";

            link.addEventListener(
                "click",
                event => {

                    const href =
                        link.getAttribute("href");

                    if (
                        href &&
                        href.startsWith("#")
                    ) {

                        event.preventDefault();

                        navigateTo(
                            href.substring(1)
                        );

                    }

                }
            );

        });


    /* -----------------------------------------------------
       DRAWER CLOSE
       ----------------------------------------------------- */

    if (
        closeButton &&
        closeButton.dataset.initialized !== "true"
    ) {

        closeButton.dataset.initialized = "true";

        closeButton.addEventListener(
            "click",
            closeMobileMenu
        );

    }


    /* -----------------------------------------------------
       DRAWER LINKS
       ----------------------------------------------------- */

    document
        .querySelectorAll("#drawer a")
        .forEach(link => {

            if (link.dataset.initialized === "true") {
                return;
            }

            link.dataset.initialized = "true";

            link.addEventListener(
                "click",
                event => {

                    const href =
                        link.getAttribute("href");

                    if (
                        href &&
                        href.startsWith("#")
                    ) {

                        event.preventDefault();

                        navigateTo(
                            href.substring(1)
                        );

                    }

                    closeMobileMenu();

                }
            );

        });


    /* -----------------------------------------------------
       MOBILE MENU
       ----------------------------------------------------- */

    if (
        mobileMenuBtn &&
        mobileMenuBtn.dataset.initialized !== "true"
    ) {

        mobileMenuBtn.dataset.initialized = "true";

        mobileMenuBtn.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                mobileNav?.classList.add("open");

                drawer?.classList.add("open");

                document.body.classList.add(
                    "menu-open"
                );

            }
        );

    }


    if (
        mobileCloseBtn &&
        mobileCloseBtn.dataset.initialized !== "true"
    ) {

        mobileCloseBtn.dataset.initialized = "true";

        mobileCloseBtn.addEventListener(
            "click",
            closeMobileMenu
        );

    }


    /* -----------------------------------------------------
       ESCAPE KEY
       ----------------------------------------------------- */

    if (!document.body.dataset.escapeInitialized) {

        document.body.dataset.escapeInitialized = "true";

        document.addEventListener(
            "keydown",
            event => {

                if (event.key === "Escape") {
                    closeMobileMenu();
                }

            }
        );

    }


    /* -----------------------------------------------------
       OUTSIDE CLICK
       ----------------------------------------------------- */

    if (!document.body.dataset.outsideClickInitialized) {

        document.body.dataset.outsideClickInitialized = "true";

        document.addEventListener(
            "click",
            event => {

                if (
                    drawer &&
                    drawer.classList.contains("open") &&
                    !drawer.contains(event.target) &&
                    !mobileMenuBtn?.contains(event.target)
                ) {

                    closeMobileMenu();

                }


                if (
                    navMenu &&
                    navMenu.classList.contains("show") &&
                    !navMenu.contains(event.target) &&
                    !navCircle?.contains(event.target)
                ) {

                    navMenu.classList.remove("show");

                    navMenu.style.display = "none";

                }

            }
        );

    }


    /* -----------------------------------------------------
       SCROLL DETECTION
       ----------------------------------------------------- */

    if (!window.__portfolioScrollInitialized) {

        window.__portfolioScrollInitialized = true;

        window.addEventListener(
            "scroll",
            updateActiveSection,
            {
                passive: true
            }
        );

    }

    updateActiveSection();

}


/* =========================================================
   NAVIGATE TO SECTION
   ========================================================= */

function navigateTo(sectionId) {

    const section =
        document.getElementById(sectionId);

    if (!section) {

        console.warn(
            `Section #${sectionId} not found.`
        );

        return;

    }

    const headerOffset = 70;

    const sectionPosition =
        section.getBoundingClientRect().top +
        window.scrollY -
        headerOffset;

    window.scrollTo({
        top: sectionPosition,
        behavior: "smooth"
    });

    updateNavigationState(sectionId);

    closeMobileMenu();

}


/* =========================================================
   UPDATE NAVIGATION STATE
   ========================================================= */

function updateNavigationState(sectionId) {

    const sectionData =
        PORTFOLIO_SECTIONS.find(
            item => item.id === sectionId
        );


    /* OLD NAVIGATION */

    document
        .querySelectorAll(".nav-item")
        .forEach(item => {

            item.classList.remove("active");

        });


    const activeItem =
        document.getElementById(
            `${sectionId}-nav`
        );


    if (activeItem) {

        activeItem.classList.add("active");

    }


    /* MODERN NAVIGATION */

    document
        .querySelectorAll(
            ".nav-link, .mobile-nav-link"
        )
        .forEach(link => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (
                href === `#${sectionId}`
            ) {

                link.classList.add("active");

            }

        });


    /* OLD NAVIGATION ICON */

    const navIcon =
        document.getElementById("navIcon");


    if (
        navIcon &&
        sectionData
    ) {

        navIcon.setAttribute(
            "name",
            sectionData.icon
        );

    }

}


/* =========================================================
   CLOSE MOBILE MENU
   ========================================================= */

function closeMobileMenu() {

    const drawer =
        document.getElementById("drawer");

    const mobileNav =
        document.getElementById("mobile-nav");

    const navMenu =
        document.getElementById("navMenu");


    drawer?.classList.remove("open");

    mobileNav?.classList.remove("open");


    if (navMenu) {

        navMenu.classList.remove("show");

        navMenu.style.display = "none";

    }


    document.body.classList.remove("menu-open");

}


/* =========================================================
   ACTIVE SECTION
   ========================================================= */

function updateActiveSection() {

    const scrollPosition =
        window.scrollY + 200;

    let currentSection = "header";


    PORTFOLIO_SECTIONS.forEach(
        sectionData => {

            const section =
                document.getElementById(
                    sectionData.id
                );

            if (!section) return;

            if (
                scrollPosition >=
                section.offsetTop
            ) {

                currentSection =
                    sectionData.id;

            }

        }
    );


    updateNavigationState(
        currentSection
    );

}


/* =========================================================
   ABOUT TABS
   ========================================================= */

function initTabs() {

    document
        .querySelectorAll(".tab-links")
        .forEach(tab => {

            if (tab.dataset.initialized === "true") {
                return;
            }

            tab.dataset.initialized = "true";

            tab.addEventListener(
                "click",
                () => {

                    const onclick =
                        tab.getAttribute("onclick");

                    let tabName = null;


                    if (onclick) {

                        const match =
                            onclick.match(
                                /openTab\(['"]([^'"]+)['"]\)/
                            );

                        if (match) {
                            tabName = match[1];
                        }

                    }


                    if (!tabName) {
                        tabName = tab.dataset.tab;
                    }


                    if (tabName) {

                        openTab(
                            tabName,
                            tab
                        );

                    }

                }
            );

        });

}


/* =========================================================
   OPEN TAB
   ========================================================= */

function openTab(
    tabName,
    clickedTab = null
) {

    document
        .querySelectorAll(".tab-links")
        .forEach(tab => {

            tab.classList.remove(
                "active-link"
            );

        });


    document
        .querySelectorAll(".tab-contents")
        .forEach(content => {

            content.classList.remove(
                "active-tab"
            );

        });


    if (clickedTab) {

        clickedTab.classList.add(
            "active-link"
        );

    } else {

        const matchingTab =
            document.querySelector(
                `.tab-links[onclick*="${tabName}"]`
            );

        matchingTab?.classList.add(
            "active-link"
        );

    }


    const content =
        document.getElementById(tabName);


    if (content) {

        content.classList.add(
            "active-tab"
        );

    }

}

/* =========================================================
   PROJECT CARDS
   FILTER + FLIP + ACCESSIBILITY
   VERSION: FIXED
========================================================= */

// let projectsInitialized = false;


/* =========================================================
   INITIALIZE PROJECT CARDS
========================================================= */

function initProjectCards() {

    /* Prevent duplicate initialization */
    if (projectsInitialized) {
        return;
    }

    const projectsContainer =
        document.querySelector(".container-projects");

    const filterButtons =
        document.querySelectorAll(
            ".project-filter .filter-btn"
        );


    /* -----------------------------------------------------
       PROJECT CONTAINER CHECK
    ----------------------------------------------------- */

    if (!projectsContainer) {

        console.warn(
            "Projects container not found."
        );

        return;
    }


    /* -----------------------------------------------------
       MARK INITIALIZED
    ----------------------------------------------------- */

    projectsInitialized = true;


    /* =====================================================
       GET PROJECT CARDS
    ===================================================== */

    const getCards = () => {

        return Array.from(
            projectsContainer.querySelectorAll(
                ":scope > .card"
            )
        );

    };


    /* =====================================================
       GET CATEGORIES
    ===================================================== */

    function getCategories(card) {

        const category =
            card.getAttribute(
                "data-category"
            ) || "";

        return category
            .toLowerCase()
            .trim()
            .split(/[\s,|]+/)
            .filter(Boolean);

    }


    /* =====================================================
       FLIP CARD
    ===================================================== */

    function setCardFlipped(
        card,
        flipped
    ) {

        if (!card) {
            return;
        }


        if (flipped) {

            card.classList.add(
                "flipped"
            );

            card.setAttribute(
                "aria-expanded",
                "true"
            );

        } else {

            card.classList.remove(
                "flipped"
            );

            card.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }


    /* =====================================================
       SHOW CARD
    ===================================================== */

    function showCard(card) {

        card.classList.remove(
            "hidden"
        );

        card.setAttribute(
            "aria-hidden",
            "false"
        );

    }


    /* =====================================================
       HIDE CARD
    ===================================================== */

    function hideCard(card) {

        card.classList.add(
            "hidden"
        );

        card.setAttribute(
            "aria-hidden",
            "true"
        );

        /* Always reset flipped cards */
        setCardFlipped(
            card,
            false
        );

    }


    /* =====================================================
       FILTER PROJECTS
    ===================================================== */

    function filterProjects(
        selectedFilter = "all"
    ) {

        const cards = getCards();

        const filter =
            String(selectedFilter)
                .toLowerCase()
                .trim();


        let visibleCount = 0;


        cards.forEach(card => {

            const categories =
                getCategories(card);


            const shouldShow =
                filter === "all" ||
                categories.includes(filter);


            if (shouldShow) {

                showCard(card);

                visibleCount++;

            } else {

                hideCard(card);

            }

        });


        /* -------------------------------------------------
           OPTIONAL PROJECT COUNT
        ------------------------------------------------- */

        const countElement =
            document.getElementById(
                "project-count"
            );


        if (countElement) {

            countElement.textContent =
                `${visibleCount} Project${
                    visibleCount !== 1
                        ? "s"
                        : ""
                }`;

        }


        console.log(
            `Project filter: ${filter} | Visible: ${visibleCount}/${cards.length}`
        );

    }


    /* =====================================================
       FILTER BUTTONS
    ===================================================== */

    filterButtons.forEach(button => {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                const filter =
                    this.getAttribute(
                        "data-filter"
                    ) || "all";


                /* Remove active */
                filterButtons.forEach(btn => {

                    btn.classList.remove(
                        "active"
                    );

                    btn.setAttribute(
                        "aria-selected",
                        "false"
                    );

                });


                /* Add active */
                this.classList.add(
                    "active"
                );

                this.setAttribute(
                    "aria-selected",
                    "true"
                );


                /* Apply filter */
                filterProjects(
                    filter
                );

            }
        );

    });


    /* =====================================================
       PROJECT CARD CLICK
    ===================================================== */

    projectsContainer.addEventListener(
        "click",
        function (event) {

            const target =
                event.target;


            /* -------------------------------------------------
               VIEW DETAILS
            ------------------------------------------------- */

            const viewButton =
                target.closest(
                    ".view-btn"
                );


            if (viewButton) {

                const card =
                    viewButton.closest(
                        ".card"
                    );


                if (!card) {
                    return;
                }


                event.preventDefault();
                event.stopPropagation();


                setCardFlipped(
                    card,
                    true
                );


                return;
            }


            /* -------------------------------------------------
               BACK BUTTON
            ------------------------------------------------- */

            const backButton =
                target.closest(
                    ".back-btn"
                );


            if (backButton) {

                const card =
                    backButton.closest(
                        ".card"
                    );


                if (!card) {
                    return;
                }


                event.preventDefault();
                event.stopPropagation();


                setCardFlipped(
                    card,
                    false
                );


                return;
            }

        }
    );


    /* =====================================================
       KEYBOARD ACCESSIBILITY
    ===================================================== */

    projectsContainer.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key !== "Enter" &&
                event.key !== " "
            ) {
                return;
            }


            const button =
                event.target.closest(
                    ".view-btn, .back-btn"
                );


            if (!button) {
                return;
            }


            const card =
                button.closest(
                    ".card"
                );


            if (!card) {
                return;
            }


            event.preventDefault();


            if (
                button.classList.contains(
                    "back-btn"
                )
            ) {

                setCardFlipped(
                    card,
                    false
                );

            } else {

                setCardFlipped(
                    card,
                    true
                );

            }

        }
    );


    /* =====================================================
       INITIALIZE ALL CARDS
    ===================================================== */

    const cards =
        getCards();


    cards.forEach(card => {

        /* IMPORTANT:
           Force every card to be visible */
        card.classList.remove(
            "hidden"
        );

        card.classList.remove(
            "flipped"
        );

        card.setAttribute(
            "aria-hidden",
            "false"
        );

        card.setAttribute(
            "aria-expanded",
            "false"
        );

    });


    /* =====================================================
       INITIAL FILTER
    ===================================================== */

    const activeButton =
        document.querySelector(
            ".project-filter .filter-btn.active"
        );


    const initialFilter =
        activeButton
            ?.getAttribute(
                "data-filter"
            ) || "all";


    filterProjects(
        initialFilter
    );


    console.log(
        "================================="
    );

    console.log(
        `Total project cards: ${cards.length}`
    );

    console.log(
        `Initial filter: ${initialFilter}`
    );

    console.log(
        "Project cards initialized successfully."
    );

    console.log(
        "================================="
    );

}


/* =========================================================
   GLOBAL FLIP FUNCTIONS
   Required by existing HTML onclick=""
========================================================= */

function flipCard(event) {

    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }


    const card =
        event?.target?.closest(
            ".card"
        );


    if (!card) {
        return;
    }


    card.classList.add(
        "flipped"
    );

    card.setAttribute(
        "aria-expanded",
        "true"
    );

}


function flipCardBack(event) {

    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }


    const card =
        event?.target?.closest(
            ".card"
        );


    if (!card) {
        return;
    }


    card.classList.remove(
        "flipped"
    );

    card.setAttribute(
        "aria-expanded",
        "false"
    );

}


/* =========================================================
   MAKE FUNCTIONS AVAILABLE TO HTML
========================================================= */

window.flipCard =
    flipCard;

window.flipCardBack =
    flipCardBack;

window.initProjectCards =
    initProjectCards;



/* =========================================================
   CERTIFICATE LINKS
========================================================= */

function handleCertificateLink(event, link) {

    const certificateLink = link.getAttribute("href");

    /*
       The "#" is intentionally used as a placeholder
       until you add the real certificate URL.
    */

    if (
        !certificateLink ||
        certificateLink === "#" ||
        certificateLink === "YOUR_CERTIFICATE_LINK"
    ) {

        event.preventDefault();

        alert(
            "Certificate link will be added soon."
        );

        return false;
    }

    return true;
}




/* =========================================================
   TOGGLE TEXT
   ========================================================= */

function toggleText(id) {

    const element =
        document.getElementById(id);

    if (!element) return;


    const isHidden =
        window.getComputedStyle(
            element
        ).display === "none";


    element.style.display =
        isHidden
            ? "block"
            : "none";

}


/* =========================================================
   EMAILJS CONTACT FORM
========================================================= */

const EMAILJS_CONFIG = {
    PUBLIC_KEY: "6YO6aZuwdQjq8EqHS",
    SERVICE_ID: "service_826pzbi",
    TEMPLATE_ID: "template_1fmvite"
};


/* =========================================================
   INITIALIZE EMAILJS
========================================================= */

function initEmailJS() {

    const form =
        document.getElementById("contactForm");


    /* ---------------------------------------------
       CHECK FORM
    --------------------------------------------- */

    if (!form) {

        console.warn(
            "Contact form not found."
        );

        return;
    }


    /* ---------------------------------------------
       CHECK EMAILJS LIBRARY
    --------------------------------------------- */

    if (
        typeof emailjs === "undefined"
    ) {

        console.error(
            "EmailJS library is not loaded."
        );

        return;
    }


    /* ---------------------------------------------
       PREVENT DOUBLE INITIALIZATION
    --------------------------------------------- */

    if (
        form.dataset.emailInitialized === "true"
    ) {

        return;
    }


    /* ---------------------------------------------
       CHECK CONFIGURATION
    --------------------------------------------- */

    if (
        EMAILJS_CONFIG.PUBLIC_KEY ===
            "YOUR_PUBLIC_KEY" ||

        EMAILJS_CONFIG.SERVICE_ID ===
            "YOUR_SERVICE_ID" ||

        EMAILJS_CONFIG.TEMPLATE_ID ===
            "YOUR_TEMPLATE_ID"
    ) {

        console.error(
            "EmailJS is not configured. " +
            "Add Public Key, Service ID and Template ID."
        );

        return;
    }


    /* ---------------------------------------------
       INITIALIZE EMAILJS
    --------------------------------------------- */

    try {

        emailjs.init({
            publicKey:
                EMAILJS_CONFIG.PUBLIC_KEY
        });

        console.log(
            "EmailJS initialized successfully."
        );

    } catch (error) {

        console.error(
            "EmailJS initialization failed:",
            error
        );

        return;
    }


    /* ---------------------------------------------
       SUBMIT EVENT
    --------------------------------------------- */

    form.addEventListener(
        "submit",
        sendEmail
    );


    form.dataset.emailInitialized =
        "true";


    console.log(
        "Contact form initialized."
    );
}


/* =========================================================
   SEND EMAIL
========================================================= */

async function sendEmail(event) {

    event.preventDefault();


    /* ---------------------------------------------
       GET FORM
    --------------------------------------------- */

    const form =
        event.currentTarget ||
        document.getElementById("contactForm");


    if (!form) {

        console.error(
            "Contact form not found."
        );

        return;
    }


    /* ---------------------------------------------
       GET FORM ELEMENTS
    --------------------------------------------- */

    const submitButton =
        form.querySelector(
            "button[type='submit']"
        );


    const successMessage =
        document.getElementById(
            "thankYouMessage"
        );


    /* ---------------------------------------------
       GET VALUES
    --------------------------------------------- */

    const name =
        form.querySelector(
            '[name="name"]'
        )?.value.trim() || "";


    const email =
        form.querySelector(
            '[name="email"]'
        )?.value.trim() || "";


    const message =
        form.querySelector(
            '[name="message"]'
        )?.value.trim() || "";


    /* ---------------------------------------------
       VALIDATION
    --------------------------------------------- */

    if (!name) {

        alert(
            "Please enter your name."
        );

        return;
    }


    if (!email) {

        alert(
            "Please enter your email."
        );

        return;
    }


    if (!message) {

        alert(
            "Please enter your message."
        );

        return;
    }


    /* ---------------------------------------------
       EMAIL FORMAT VALIDATION
    --------------------------------------------- */

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(email)) {

        alert(
            "Please enter a valid email address."
        );

        return;
    }


    /* ---------------------------------------------
       DISABLE BUTTON
    --------------------------------------------- */

    if (submitButton) {

        submitButton.disabled =
            true;

        submitButton.textContent =
            "Sending...";
    }


    /* ---------------------------------------------
       HIDE PREVIOUS MESSAGE
    --------------------------------------------- */

    if (successMessage) {

        successMessage.style.display =
            "none";
    }


    /* ---------------------------------------------
       SEND THROUGH EMAILJS
    --------------------------------------------- */

    try {

        const response =
            await emailjs.sendForm(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATE_ID,
                form
            );


        console.log(
            "EmailJS Response:",
            response
        );


        /* -----------------------------------------
           SUCCESS
        ----------------------------------------- */

        if (response.status === 200) {

            console.log(
                "Message sent successfully."
            );


            if (successMessage) {

                successMessage.style.display =
                    "block";

                successMessage.textContent =
                    "Message sent successfully! Thank you for contacting me.";
            }


            /* Reset form */

            form.reset();

        }

    } catch (error) {

        /* -----------------------------------------
           ERROR
        ----------------------------------------- */

        console.error(
            "EmailJS sending failed:",
            error
        );


        if (successMessage) {

            successMessage.style.display =
                "block";

            successMessage.textContent =
                "Unable to send the message. Please try again.";
        }

    } finally {

        /* -----------------------------------------
           ENABLE BUTTON
        ----------------------------------------- */

        if (submitButton) {

            submitButton.disabled =
                false;

            submitButton.textContent =
                "Send Message";
        }

    }

}


/* =========================================================
   INITIALIZE WHEN DOM IS READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initEmailJS();

    }
);

 


/* =========================================================
   MUSIC
   ========================================================= */

function initMusic() {

    const audio =
        document.getElementById(
            "background-music"
        );


    const musicButton =
        document.getElementById(
            "music-btn"
        );


    if (
        !audio ||
        !musicButton
    ) {

        return;

    }


    if (
        musicButton.dataset.initialized ===
        "true"
    ) {

        return;

    }


    musicButton.dataset.initialized =
        "true";


    audio.volume = 0.25;


    musicButton.addEventListener(
        "click",
        event => {

            event.preventDefault();
            event.stopPropagation();


            if (audio.paused) {

                audio
                    .play()
                    .then(() => {

                        musicButton.textContent =
                            "🔇 Pause Music";

                    })
                    .catch(error => {

                        console.warn(
                            "Music playback blocked:",
                            error
                        );

                    });

            } else {

                audio.pause();

                musicButton.textContent =
                    "🎵 Play Music";

            }

        }
    );

}


/* =========================================================
   SCROLL EFFECTS
   ========================================================= */

function initScrollEffects() {

    if (
        window.__scrollEffectsInitialized
    ) {

        return;

    }


    window.__scrollEffectsInitialized =
        true;


    let lastScrollY =
        window.scrollY;

    let glowTimeout;


    window.addEventListener(
        "scroll",
        () => {

            const currentScroll =
                window.scrollY;


            const scrollingDown =
                currentScroll >
                lastScrollY;


            const blushTop =
                document.querySelector(
                    ".blush-top"
                );


            const blushBottom =
                document.querySelector(
                    ".blush-bottom"
                );


            if (scrollingDown) {

                blushBottom?.classList.add(
                    "show-light"
                );

                blushTop?.classList.remove(
                    "show-light"
                );

            } else {

                blushTop?.classList.add(
                    "show-light"
                );

                blushBottom?.classList.remove(
                    "show-light"
                );

            }


            lastScrollY =
                currentScroll;


            clearTimeout(
                glowTimeout
            );


            glowTimeout =
                setTimeout(
                    () => {

                        blushTop?.classList.remove(
                            "show-light"
                        );

                        blushBottom?.classList.remove(
                            "show-light"
                        );

                    },
                    500
                );


            const header =
                document.getElementById(
                    "header"
                );


            const footer =
                document.querySelector(
                    "footer"
                );


            const shouldGlow =
                currentScroll > 50;


            header?.classList.toggle(
                "glow",
                shouldGlow
            );


            footer?.classList.toggle(
                "glow",
                shouldGlow
            );

        },
        {
            passive: true
        }
    );

}


/* =========================================================
   LAZY LOADING
   ========================================================= */

function initLazyLoading() {

    const images =
        document.querySelectorAll(
            "img.lazyload"
        );


    if (
        "IntersectionObserver" in window
    ) {

        const imageObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                !entry.isIntersecting
                            ) {

                                return;

                            }


                            const image =
                                entry.target;


                            const source =
                                image.getAttribute(
                                    "data-src"
                                );


                            if (source) {

                                image.src =
                                    source;

                            }


                            image.classList.remove(
                                "lazyload"
                            );


                            imageObserver.unobserve(
                                image
                            );

                        }
                    );

                },
                {
                    rootMargin: "150px"
                }
            );


        images.forEach(
            image => {

                imageObserver.observe(
                    image
                );

            }
        );

    } else {

        images.forEach(
            image => {

                const source =
                    image.getAttribute(
                        "data-src"
                    );


                if (source) {

                    image.src =
                        source;

                }

            }
        );

    }


    /* -----------------------------------------------------
       LAZY VIDEOS
       ----------------------------------------------------- */

    const videos =
        document.querySelectorAll(
            "video.lazy-video"
        );


    videos.forEach(
        video => {

            if (
                !("IntersectionObserver" in window)
            ) {

                return;

            }


            const observer =
                new IntersectionObserver(
                    entries => {

                        entries.forEach(
                            entry => {

                                if (
                                    entry.isIntersecting
                                ) {

                                    video
                                        .play()
                                        .catch(
                                            () => {}
                                        );

                                } else {

                                    video.pause();

                                }

                            }
                        );

                    },
                    {
                        threshold: 0.25
                    }
                );


            observer.observe(
                video
            );

        }
    );

}


/* =========================================================
   AOS + GSAP
   ========================================================= */

function initAnimations() {

    if (
        typeof AOS !==
        "undefined"
    ) {

        AOS.init({

            duration: 800,

            easing: "ease-out-cubic",

            once: true,

            offset: 80

        });

    }


    if (
        typeof gsap !==
        "undefined"
    ) {

        if (
            typeof ScrollTrigger !==
            "undefined"
        ) {

            gsap.registerPlugin(
                ScrollTrigger
            );

        }


        gsap.utils
            .toArray(
                ".section-title, .sub-title"
            )
            .forEach(
                element => {

                    const animation = {
                        opacity: 0,
                        y: 30,
                        duration: 0.8,
                        ease: "power3.out"
                    };


                    if (
                        typeof ScrollTrigger !==
                        "undefined"
                    ) {

                        animation.scrollTrigger = {

                            trigger: element,

                            start: "top 85%",

                            once: true

                        };

                    }


                    gsap.from(
                        element,
                        animation
                    );

                }
            );

    }

}


/* =========================================================
   TYPING EFFECT
   ========================================================= */

function initTypingEffect() {

    const roleElement =
        document.getElementById(
            "typing-role"
        );


    if (!roleElement) return;


    const roles = [

        "React Native Developer",

        "Frontend Developer",

        "AWS & ETL Developer",

        "Java Developer",

        "Software Developer"

    ];


    let roleIndex = 0;

    let characterIndex = 0;

    let deleting = false;


    function typeRole() {

        const currentRole =
            roles[roleIndex];


        if (!deleting) {

            roleElement.textContent =
                currentRole.substring(
                    0,
                    characterIndex + 1
                );

            characterIndex++;


            if (
                characterIndex >=
                currentRole.length
            ) {

                deleting = true;

                setTimeout(
                    typeRole,
                    1600
                );

                return;

            }

        } else {

            roleElement.textContent =
                currentRole.substring(
                    0,
                    characterIndex - 1
                );

            characterIndex--;


            if (
                characterIndex <= 0
            ) {

                characterIndex = 0;

                deleting = false;

                roleIndex =
                    (
                        roleIndex + 1
                    ) %
                    roles.length;

            }

        }


        setTimeout(
            typeRole,
            deleting
                ? 45
                : 80
        );

    }


    typeRole();

}


/* =========================================================
   PARTICLES.JS
   ========================================================= */

function initParticles() {

    if (
        typeof particlesJS ===
        "undefined"
    ) {

        console.warn(
            "Particles.js not loaded."
        );

        return;

    }


    const particleContainer =
        document.getElementById(
            "particles-js"
        );


    if (!particleContainer) return;


    particleContainer.innerHTML = "";


    particlesJS(
        "particles-js",
        {

            particles: {

                number: {

                    value: 70,

                    density: {

                        enable: true,

                        value_area: 800

                    }

                },


                color: {

                    value: [
                        "#00d9ff",
                        "#8b5cf6",
                        "#ffffff"
                    ]

                },


                shape: {

                    type: "circle"

                },


                opacity: {

                    value: 0.55,

                    random: true

                },


                size: {

                    value: 3,

                    random: true

                },


                line_linked: {

                    enable: true,

                    distance: 140,

                    color: "#6366f1",

                    opacity: 0.25,

                    width: 1

                },


                move: {

                    enable: true,

                    speed: 1.5,

                    direction: "none",

                    random: true,

                    straight: false,

                    out_mode: "out"

                }

            },


            interactivity: {

                detect_on: "canvas",

                events: {

                    onhover: {

                        enable: true,

                        mode: "repulse"

                    },


                    onclick: {

                        enable: true,

                        mode: "push"

                    },


                    resize: true

                },


                modes: {

                    repulse: {

                        distance: 120,

                        duration: 0.4

                    },


                    push: {

                        particles_nb: 3

                    }

                }

            },


            retina_detect: true

        }
    );

}


/* =========================================================
   THREE.JS LAPTOP
   ========================================================= */

function initLaptop() {

    const container =
        document.getElementById(
            "laptop-container"
        );


    if (!container) {

        console.warn(
            "Laptop container not found."
        );

        return;

    }


    if (
        typeof THREE ===
        "undefined"
    ) {

        console.error(
            "Three.js is not loaded."
        );

        return;

    }


    /* -----------------------------------------------------
       CLEAN PREVIOUS INSTANCE
       ----------------------------------------------------- */

    if (laptopAnimationFrame) {

        cancelAnimationFrame(
            laptopAnimationFrame
        );

        laptopAnimationFrame = null;

    }


    if (laptopResizeHandler) {

        window.removeEventListener(
            "resize",
            laptopResizeHandler
        );

        laptopResizeHandler = null;

    }


    container
        .querySelectorAll("canvas")
        .forEach(
            canvas => canvas.remove()
        );


    const width =
        Math.max(
            container.clientWidth,
            280
        );


    const height =
        Math.max(
            container.clientHeight,
            300
        );


    /* -----------------------------------------------------
       SCENE
       ----------------------------------------------------- */

    const scene =
        new THREE.Scene();


    /* -----------------------------------------------------
       CAMERA
       ----------------------------------------------------- */

    const camera =
        new THREE.PerspectiveCamera(
            38,
            width / height,
            0.1,
            100
        );


    camera.position.set(
        0,
        1.1,
        8
    );


    camera.lookAt(
        0,
        0,
        0
    );


    /* -----------------------------------------------------
       RENDERER
       ----------------------------------------------------- */

    const renderer =
        new THREE.WebGLRenderer({

            antialias: true,

            alpha: true,

            powerPreference:
                "high-performance"

        });


    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            2
        )
    );


    renderer.setSize(
        width,
        height,
        false
    );


    renderer.shadowMap.enabled = true;

    renderer.shadowMap.type =
        THREE.PCFSoftShadowMap;


    if (
        "outputEncoding" in renderer
    ) {

        renderer.outputEncoding =
            THREE.sRGBEncoding;

    }


    renderer.domElement.style.width =
        "100%";

    renderer.domElement.style.height =
        "100%";

    renderer.domElement.style.display =
        "block";

    renderer.domElement.style.position =
        "absolute";

    renderer.domElement.style.inset =
        "0";

    renderer.domElement.style.zIndex =
        "2";


    container.appendChild(
        renderer.domElement
    );


    /* -----------------------------------------------------
       LIGHTING
       ----------------------------------------------------- */

    const ambientLight =
        new THREE.AmbientLight(
            0xffffff,
            1.2
        );

    scene.add(
        ambientLight
    );


    const keyLight =
        new THREE.DirectionalLight(
            0xffffff,
            2.2
        );


    keyLight.position.set(
        5,
        8,
        8
    );


    keyLight.castShadow = true;

    scene.add(
        keyLight
    );


    const blueLight =
        new THREE.PointLight(
            0x00d9ff,
            8,
            20
        );


    blueLight.position.set(
        -4,
        2,
        5
    );


    scene.add(
        blueLight
    );


    const purpleLight =
        new THREE.PointLight(
            0x8b5cf6,
            8,
            20
        );


    purpleLight.position.set(
        4,
        2,
        4
    );


    scene.add(
        purpleLight
    );


    /* -----------------------------------------------------
       LAPTOP
       ----------------------------------------------------- */

    const laptop =
        new THREE.Group();


    scene.add(
        laptop
    );


    /* -----------------------------------------------------
       BASE
       ----------------------------------------------------- */

    const base =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                5.2,
                0.32,
                3.4
            ),

            new THREE.MeshStandardMaterial({

                color: 0x20232a,

                metalness: 0.9,

                roughness: 0.22

            })

        );


    base.position.y = -1.55;

    base.castShadow = true;

    base.receiveShadow = true;


    laptop.add(
        base
    );


    /* -----------------------------------------------------
       KEYBOARD
       ----------------------------------------------------- */

    const keyboard =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                4.5,
                0.08,
                2.35
            ),

            new THREE.MeshStandardMaterial({

                color: 0x08090c,

                metalness: 0.5,

                roughness: 0.45

            })

        );


    keyboard.position.set(
        0,
        -1.36,
        0.15
    );


    laptop.add(
        keyboard
    );


    /* -----------------------------------------------------
       TRACKPAD
       ----------------------------------------------------- */

    const trackpad =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                1.45,
                0.055,
                0.85
            ),

            new THREE.MeshStandardMaterial({

                color: 0x454750,

                metalness: 0.6,

                roughness: 0.25

            })

        );


    trackpad.position.set(
        0,
        -1.29,
        0.95
    );


    laptop.add(
        trackpad
    );


    /* -----------------------------------------------------
       SCREEN GROUP
       ----------------------------------------------------- */

    const screenGroup =
        new THREE.Group();


    screenGroup.position.set(
        0,
        -1.25,
        -1.45
    );


    laptop.add(
        screenGroup
    );


    /* -----------------------------------------------------
       SCREEN FRAME
       ----------------------------------------------------- */

    const frame =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                5.2,
                3.45,
                0.22
            ),

            new THREE.MeshStandardMaterial({

                color: 0x111318,

                metalness: 0.85,

                roughness: 0.18

            })

        );


    frame.position.y = 1.72;

    frame.castShadow = true;


    screenGroup.add(
        frame
    );


    /* -----------------------------------------------------
       DISPLAY
       ----------------------------------------------------- */

    const display =
        new THREE.Mesh(

            new THREE.PlaneGeometry(
                4.75,
                2.9
            ),

            new THREE.MeshBasicMaterial({

                color: 0x06233a,

                side:
                    THREE.DoubleSide

            })

        );


    display.position.set(
        0,
        1.72,
        0.13
    );


    screenGroup.add(
        display
    );


    /* -----------------------------------------------------
       SCREEN GLOW
       ----------------------------------------------------- */

    const screenGlow =
        new THREE.Mesh(

            new THREE.PlaneGeometry(
                4.55,
                2.7
            ),

            new THREE.MeshBasicMaterial({

                color: 0x00cfff,

                transparent: true,

                opacity: 0.22,

                blending:
                    THREE.AdditiveBlending

            })

        );


    screenGlow.position.set(
        0,
        1.72,
        0.16
    );


    screenGroup.add(
        screenGlow
    );


    /* -----------------------------------------------------
       SCREEN CANVAS
       ----------------------------------------------------- */

    const screenCanvas =
        document.createElement(
            "canvas"
        );


    screenCanvas.width = 1024;

    screenCanvas.height = 600;


    const context =
        screenCanvas.getContext(
            "2d"
        );


    if (!context) {
        console.error(
            "Unable to create laptop screen canvas."
        );
        return;
    }


    const gradient =
        context.createLinearGradient(
            0,
            0,
            1024,
            600
        );


    gradient.addColorStop(
        0,
        "#07111f"
    );


    gradient.addColorStop(
        0.5,
        "#101a36"
    );


    gradient.addColorStop(
        1,
        "#25144a"
    );


    context.fillStyle =
        gradient;


    context.fillRect(
        0,
        0,
        1024,
        600
    );


    /* Glow */

    const circleGradient =
        context.createRadialGradient(
            512,
            260,
            20,
            512,
            260,
            220
        );


    circleGradient.addColorStop(
        0,
        "rgba(0,217,255,0.75)"
    );


    circleGradient.addColorStop(
        1,
        "rgba(0,217,255,0)"
    );


    context.fillStyle =
        circleGradient;


    context.beginPath();

    context.arc(
        512,
        260,
        220,
        0,
        Math.PI * 2
    );

    context.fill();


    /* Name */

    context.textAlign =
        "center";


    context.font =
        "bold 82px Arial";


    context.fillStyle =
        "#00d9ff";


    context.fillText(
        "SHRIYASH",
        512,
        275
    );


    /* Technologies */

    context.font =
        "32px Arial";


    context.fillStyle =
        "#ffffff";


    context.fillText(
        "React • Java • AWS • ETL",
        512,
        340
    );


    /* Subtitle */

    context.font =
        "22px Arial";


    context.fillStyle =
        "#a9b7d0";


    context.fillText(
        "Software Developer Portfolio",
        512,
        390
    );


    /* Code */

    context.font =
        "18px monospace";


    context.fillStyle =
        "#00d9ff";


    context.fillText(
        "<build. learn. create. />",
        512,
        470
    );


    const screenTexture =
        new THREE.CanvasTexture(
            screenCanvas
        );


    screenTexture.needsUpdate =
        true;


    const screenContent =
        new THREE.Mesh(

            new THREE.PlaneGeometry(
                4.55,
                2.65
            ),

            new THREE.MeshBasicMaterial({

                map:
                    screenTexture,

                side:
                    THREE.DoubleSide

            })

        );


    screenContent.position.set(
        0,
        1.72,
        0.19
    );


    screenGroup.add(
        screenContent
    );


    /* -----------------------------------------------------
       LAPTOP LOGO
       ----------------------------------------------------- */

    const laptopLogo =
        new THREE.Mesh(

            new THREE.CircleGeometry(
                0.22,
                32
            ),

            new THREE.MeshBasicMaterial({

                color:
                    0x00d9ff,

                transparent:
                    true,

                opacity:
                    0.9

            })

        );


    laptopLogo.position.set(
        0,
        -1.52,
        1.73
    );


    laptop.add(
        laptopLogo
    );


    /* -----------------------------------------------------
       INITIAL POSITION
       ----------------------------------------------------- */

    laptop.position.y =
        0.25;


    laptop.rotation.x =
        -0.08;


    laptop.rotation.y =
        -0.28;


    let targetRotationX =
        -0.08;


    let targetRotationY =
        -0.28;


    let currentRotationX =
        -0.08;


    let currentRotationY =
        -0.28;


    const isMobile =
        window.innerWidth <= 768;


    /* -----------------------------------------------------
       MOUSE ROTATION
       ----------------------------------------------------- */

    if (!isMobile) {

        container.addEventListener(
            "pointermove",
            event => {

                const rect =
                    container.getBoundingClientRect();


                const x =
                    (
                        event.clientX -
                        rect.left
                    ) /
                    rect.width;


                const y =
                    (
                        event.clientY -
                        rect.top
                    ) /
                    rect.height;


                targetRotationY =
                    -0.28 +
                    (x - 0.5) *
                    0.45;


                targetRotationX =
                    -0.08 +
                    (y - 0.5) *
                    -0.20;

            }
        );


        container.addEventListener(
            "pointerleave",
            () => {

                targetRotationX =
                    -0.08;

                targetRotationY =
                    -0.28;

            }
        );

    }


    /* -----------------------------------------------------
       ANIMATION
       ----------------------------------------------------- */

    const clock =
        new THREE.Clock();


    function animateLaptop() {

        laptopAnimationFrame =
            requestAnimationFrame(
                animateLaptop
            );


        const elapsed =
            clock.getElapsedTime();


        laptop.position.y =
            0.25 +
            Math.sin(
                elapsed * 1.4
            ) *
            0.08;


        currentRotationX +=
            (
                targetRotationX -
                currentRotationX
            ) *
            0.045;


        currentRotationY +=
            (
                targetRotationY -
                currentRotationY
            ) *
            0.045;


        laptop.rotation.x =
            currentRotationX;


        laptop.rotation.y =
            currentRotationY;


        screenGlow.material.opacity =
            0.18 +
            Math.sin(
                elapsed * 2
            ) *
            0.06;


        blueLight.position.x =
            Math.sin(
                elapsed * 0.7
            ) *
            4;


        purpleLight.position.x =
            Math.cos(
                elapsed * 0.7
            ) *
            4;


        renderer.render(
            scene,
            camera
        );

    }


    animateLaptop();


    /* -----------------------------------------------------
       RESPONSIVE RESIZE
       ----------------------------------------------------- */

    laptopResizeHandler =
        function resizeLaptop() {

            const newWidth =
                Math.max(
                    container.clientWidth,
                    280
                );


            const newHeight =
                Math.max(
                    container.clientHeight,
                    300
                );


            camera.aspect =
                newWidth /
                newHeight;


            if (
                window.innerWidth <= 480
            ) {

                camera.position.z =
                    9.5;

            } else if (
                window.innerWidth <= 768
            ) {

                camera.position.z =
                    8.5;

            } else {

                camera.position.z =
                    8;

            }


            camera.updateProjectionMatrix();


            renderer.setSize(
                newWidth,
                newHeight,
                false
            );


            renderer.setPixelRatio(
                Math.min(
                    window.devicePixelRatio,
                    2
                )
            );

        };


    window.addEventListener(
        "resize",
        laptopResizeHandler
    );


    laptopResizeHandler();

}


/* =========================================================
   GLOBAL FUNCTIONS
   ========================================================= */

window.navigateTo =
    navigateTo;

window.openTab =
    openTab;

window.flipCard =
    flipCard;

window.flipCardBack =
    flipCardBack;

window.toggleText =
    toggleText;

window.sendEmail =
    sendEmail;


/* =========================================================
   CONSOLE
   ========================================================= */

console.log(
    "%cShriyash Thakare Portfolio Loaded",
    "color:#00d9ff;font-size:18px;font-weight:bold;"
);

console.log(
    "%cProject card system: VERSION 3.0",
    "color:#8b5cf6;font-size:14px;font-weight:bold;"
);

console.log(
    "%cModern navigation initialized.",
    "color:#00d9ff;font-size:14px;"
);

console.log(
    "%cThree.js laptop system loaded.",
    "color:#00d9ff;font-size:14px;"
);
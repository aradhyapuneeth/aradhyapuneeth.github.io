function enhancePlanetSystem() {
    if (!document.querySelector("#home")) return;
    const e = document.querySelector(".solar-system");
    e && e.remove();
    const t = document.createElement("div");
    t.className = "solar-system";
    const s = document.createElement("div");
    s.className = "space-background", t.appendChild(s);
    const n = document.createElement("div");
    n.className = "sun", n.style.backgroundImage = "url('req/img/sun_PNG13424.png')", n.style.backgroundSize = "cover", t.appendChild(n);
      const o=[
    {name:"mercury",imgUrl:"req/img/mercury.png",size:20,orbitSize:240,speed:20},
    {name:"venus",imgUrl:"req/img/venus.png",size:24,orbitSize:300,speed:30},
    {name:"earth",imgUrl:"req/img/earth.png",size:26,orbitSize:360,speed:40},
    {name:"mars",imgUrl:"req/img/mars.png",size:22,orbitSize:420,speed:50},
    {name:"jupiter",imgUrl:"req/img/jupiter.png",size:35,orbitSize:480,speed:60},
    {name:"saturn",imgUrl:"req/img/saturn.png",size:32,orbitSize:540,speed:70},
    {name:"uranus",imgUrl:"req/img/uranus.png",size:28,orbitSize:600,speed:80},
    {name:"neptune",imgUrl:"req/img/neptune.png",size:27,orbitSize:660,speed:90}
  ];
    for (let e = 0; e < o.length; e++) {
        const s = o[e],
            n = document.createElement("div");
        n.className = "planet-orbit", n.style.width = `${s.orbitSize}px`, n.style.height = `${s.orbitSize}px`, n.style.animationDuration = `${s.speed}s`, n.id = `orbit-${s.name}`;
        const a = 360 * Math.random();
        n.style.transform = `translate(-50%, -50%) rotate(${a}deg)`;
        const r = document.createElement("div");
        r.className = "planet-satellite", r.id = `planet-${s.name}`, r.style.width = `${s.size}px`, r.style.height = `${s.size}px`;
           const i = {
            mercury: "req/img/mercury.png",
            venus: "req/img/venus.png",
            earth: "req/img/earth.png",
            mars: "req/img/mars.png",
            jupiter: "req/img/jupiter.png",
            saturn: "req/img/saturn.png",
            uranus: "req/img/uranus.png",
            neptune: "req/img/neptune.png"
        },
            l = document.createElement("img");
        l.src = i[s.name] || s.imgUrl, l.alt = s.name, l.style.width = "100%", l.style.height = "100%", l.style.objectFit = "contain", l.onerror = function() {
            this.onerror = null, console.log(`Failed to load ${s.name} image, using fallback`), this.src = i[s.name]
        }, r.appendChild(l), n.appendChild(r), t.appendChild(n), "earth" === s.name && (r.classList.add("interactive-planet"), r.addEventListener("mouseenter", (() => {
            r.style.transform = "scale(1.2)", r.style.filter = "drop-shadow(0 0 10px rgba(83, 160, 253, 0.9))"
        })), r.addEventListener("mouseleave", (() => {
            r.style.transform = "scale(1)", r.style.filter = "none"
        })))
    }
    for (let e = 0; e < 100; e++) {
        const e = document.createElement("div");
        e.className = "space-star", e.style.top = 100 * Math.random() + "%", e.style.left = 100 * Math.random() + "%", e.style.width = 2 * Math.random() + 1 + "px", e.style.height = e.style.width, e.style.opacity = .8 * Math.random() + .2, e.style.animationDelay = 3 * Math.random() + "s", t.appendChild(e)
    }
    const a = document.querySelector(".col-lg-6.hero-img");
    if (a) a.innerHTML = "", a.appendChild(t);
    else {
        const e = document.querySelector("#home .row");
        if (e) {
            const s = document.createElement("div");
            s.className = "col-lg-6 hero-img", s.appendChild(t), e.appendChild(s)
        }
    }
    n.addEventListener("mouseenter", (() => {
        n.style.transform = "scale(1.05)", n.style.boxShadow = "0 0 80px rgba(255, 160, 0, 0.9)"
    })), n.addEventListener("mouseleave", (() => {
        n.style.transform = "scale(1)", n.style.boxShadow = "0 0 60px rgba(255, 160, 0, 0.7)"
    }))
}
document.addEventListener("DOMContentLoaded", (function() {
    ! function() {
        const e = document.querySelector(".loading-solar-system");
        if (!e) return;
        const t = document.createElement("div");
        t.className = "loading-sun", e.appendChild(t),        [{
            name: "mercury",
            imgUrl: "req/img/mercury.png",
            size: 8,
            orbitSize: 80,
            speed: 4
        }, {
            name: "venus",
            imgUrl: "req/img/venus.png",
            size: 10,
            orbitSize: 120,
            speed: 5
        }, {
            name: "earth",
            imgUrl: "req/img/earth.png",
            size: 12,
            orbitSize: 160,
            speed: 7
        }, {
            name: "mars",
            imgUrl: "req/img/mars.png",
            size: 9,
            orbitSize: 200,
            speed: 8
        }, {
            name: "jupiter",
            imgUrl: "req/img/jupiter.png",
            size: 16,
            orbitSize: 240,
            speed: 12
        }, {
            name: "saturn",
            imgUrl: "req/img/saturn.png",
            size: 14,
            orbitSize: 280,
            speed: 15
        }, {
            name: "uranus",
            imgUrl: "req/img/uranus.png",
            size: 12,
            orbitSize: 320,
            speed: 18
        }, {
            name: "neptune",
            imgUrl: "req/img/neptune.png",
            size: 11,
            orbitSize: 360,
            speed: 20
        }].forEach((t => {
            const s = document.createElement("div");
            s.className = "loading-orbit", s.style.width = `${t.orbitSize}px`, s.style.height = `${t.orbitSize}px`, s.style.animationDuration = `${t.speed}s`;
            const n = document.createElement("div");
            n.className = "loading-planet", n.style.width = `${t.size}px`, n.style.height = `${t.size}px`;
            const o = document.createElement("img");
            o.src = t.imgUrl, o.alt = t.name, n.appendChild(o), s.appendChild(n), e.appendChild(s)
        }))
    }();
    const e = document.querySelector(".loader-wrapper"),
        t = document.querySelector(".loading-progress"),
        s = document.querySelector(".loading-percentage");
    document.body.style.overflow = "hidden";
    let n = 0;
    const o = setInterval((() => {
        n++, t && (t.style.width = `${n}%`), s && (s.textContent = `${n}%`), n >= 100 && (clearInterval(o), setTimeout((() => {
            e && (e.style.opacity = "0", e.style.transition = "opacity 0.8s ease", setTimeout((() => {
                e && (e.style.display = "none"), document.body.style.overflow = "visible",
                    function() {
                        function e() {
                            const e = document.querySelector(".loader");
                            if (e)
                                for (let t = 0; t < 30; t++) {
                                    const t = document.createElement("div");
                                    t.classList.add("stars-small"), t.style.top = 100 * Math.random() + "%", t.style.left = 100 * Math.random() + "%", t.style.animationDelay = 2 * Math.random() + "s", e.appendChild(t)
                                }
                        }
                        e();
                        const t = document.querySelector(".typed-text"),
                            s = document.querySelector(".cursor");
                        if (t && s) {
                            const c = ["DevOps Engineer", "Automation Specialist", "Cloud Enthusiast", "Space Explorer"],
                                d = 100,
                                m = 50,
                                p = 2e3;
                            let u = 0,
                                h = 0;

                            function n() {
                                h < c[u].length ? (s.classList.contains("typing") || s.classList.add("typing"), t.textContent += c[u].charAt(h), h++, setTimeout(n, d)) : (s.classList.remove("typing"), setTimeout(o, p))
                            }

                            function o() {
                                h > 0 ? (s.classList.contains("typing") || s.classList.add("typing"), t.textContent = c[u].substring(0, h - 1), h--, setTimeout(o, m)) : (s.classList.remove("typing"), u = (u + 1) % c.length, setTimeout(n, d + 1100))
                            }
                            c.length && setTimeout(n, p + 250)
                        }
                        const a = document.querySelector(".navbar");
                        a && window.addEventListener("scroll", (() => {
                            window.scrollY > 50 ? a.classList.add("scrolled") : a.classList.remove("scrolled")
                        }));
                        const r = new IntersectionObserver((e => {
                                e.forEach((e => {
                                    e.isIntersecting && e.target.classList.add("visible")
                                }))
                            }), {
                                threshold: .2
                            }),
                            i = document.querySelectorAll("section");
                        i.forEach((e => {
                            r.observe(e)
                        })), window.addEventListener("scroll", (() => {
                            let e = "";
                            i.forEach((t => {
                                const s = t.offsetTop;
                                t.clientHeight;
                                window.scrollY >= s - 200 && (e = t.getAttribute("id"))
                            })), document.querySelectorAll(".nav-link").forEach((t => {
                                t.classList.remove("active"), t.getAttribute("href") === `#${e}` && t.classList.add("active")
                            }))
                        }));
                        const l = document.querySelector(".back-to-top");
                        l && (window.addEventListener("scroll", (() => {
                            window.scrollY > 500 ? l.classList.add("active") : l.classList.remove("active")
                        })), l.addEventListener("click", (() => {
                            window.scrollTo({
                                top: 0,
                                behavior: "smooth"
                            })
                        })));
                        document.querySelectorAll('a[href^="#"]').forEach((e => {
                                e.addEventListener("click", (function(e) {
                                    e.preventDefault();
                                    const t = document.querySelector(this.getAttribute("href"));
                                    t && window.scrollTo({
                                        top: t.offsetTop - 70,
                                        behavior: "smooth"
                                    })
                                }))
                            })),
                            function() {
                                const e = document.querySelector("#home");
                                if (!e) return;
                                for (let t = 0; t < 20; t++) {
                                    const t = document.createElement("div");
                                    t.classList.add("space-particle"), t.style.top = 100 * Math.random() + "%", t.style.left = 100 * Math.random() + "%";
                                    const s = 3 * Math.random() + 1;
                                    t.style.width = s + "px", t.style.height = s + "px", t.style.opacity = .7 * Math.random() + .3, t.style.animationDuration = 20 * Math.random() + 10 + "s", t.style.animationDelay = 5 * Math.random() + "s", e.appendChild(t)
                                }
                            }(), enhancePlanetSystem(),
                            function() {
                                const e = new IntersectionObserver((t => {
                                        t.forEach((t => {
                                            if (t.isIntersecting) {
                                                t.target.querySelectorAll(".skill-item").forEach(((e, t) => {
                                                    setTimeout((() => {
                                                        e.classList.add("animate")
                                                    }), 100 * t)
                                                })), e.unobserve(t.target)
                                            }
                                        }))
                                    }), {
                                        threshold: .1
                                    }),
                                    t = document.querySelector("#skills");
                                t && e.observe(t)
                            }()
                    }()
            }), 800))
        }), 500))
    }), 30)
})), document.addEventListener("DOMContentLoaded", (function() {
    const e = document.getElementById("chatBtn"),
        t = document.getElementById("chatPopup"),
        s = document.getElementById("closeChat"),
        n = document.getElementById("sendMessage"),
        o = document.getElementById("userMessage"),
        a = document.getElementById("chatMessages");

    function r() {
        const e = o.value.trim();
        if ("" === e) return;
        i(e, "user"), o.value = "";
        const t = document.createElement("div");
        t.className = "typing-indicator", t.innerHTML = '\n            <div class="typing-dot"></div>\n            <div class="typing-dot"></div>\n            <div class="typing-dot"></div>\n        ', a.appendChild(t), a.scrollTop = a.scrollHeight, fetch("https://puneeth-portfolio-asst-8c01c90c4c03.herokuapp.com/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: e
            })
        }).then((e => e.json())).then((e => {
            a.removeChild(t), e.reply && e.reply.length > 0 ? e.reply.forEach((e => {
                i(e, "bot")
            })) : i("Sorry, I could not process your request.", "bot")
        })).catch((e => {
            a.removeChild(t), console.error("Error:", e), i("Sorry, there was an error processing your request.", "bot")
        }))
    }

    function i(e, t) {
        const s = document.createElement("div");
        if (s.className = `message ${t}-message`, "bot" === t) {
            const t = document.createElement("div");
            t.className = "message-content", "string" == typeof e && e.includes("<") && e.includes(">") ? t.innerHTML = e : t.textContent = e, s.appendChild(t)
        } else s.innerHTML = `<div class="message-content">${e}</div>`;
        a.appendChild(s), a.scrollTop = a.scrollHeight
    }
    e.addEventListener("click", (function() {
        t.style.display = "flex" === t.style.display ? "none" : "flex"
    })), s.addEventListener("click", (function() {
        t.style.display = "none"
    })), n.addEventListener("click", r), o.addEventListener("keypress", (function(e) {
        "Enter" === e.key && r()
    }))
}));
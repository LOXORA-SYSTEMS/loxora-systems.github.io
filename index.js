
      /* ---------- content ---------- */
      const SV = [
        [
          "Digital experiences",
          "Websites and e-commerce that look considered and convert visitors into customers.",
          [
            "Business websites",
            "Online shops",
            "Content you can edit yourself",
          ],
          "Website or e-commerce",
        ],
        [
          "Business systems",
          "Software for the daily work of schools, shops, transport and service businesses.",
          [
            "Inventory and sales",
            "School and fee management",
            "Bookings and fleets",
          ],
          "Business system",
        ],
        [
          "Applications",
          "Web apps and mobile-ready products built around a specific workflow.",
          ["Web applications", "Mobile-ready interfaces", "Admin dashboards"],
          "Web or mobile app",
        ],
        [
          "Automation & integrations",
          "Connecting the tools you already use so repeated work runs by itself.",
          [
            "Payment and receipt flows",
            "Reports and notifications",
            "Service integrations",
          ],
          "Automation or integration",
        ],
      ];
      const IN = [
        [
          "Retail",
          "Stock lives in notebooks and spreadsheets, so nobody is sure what is left.",
          "Inventory and sales tracking, plus an online shop when you are ready to sell beyond the counter.",
        ],
        [
          "Education",
          "Fees, results and attendance are scattered across files and people.",
          "A school system that keeps records, fee balances and report cards together.",
        ],
        [
          "Transport & services",
          "Phone bookings get double-booked and schedules are hard to see.",
          "Online booking with fleet or job tracking so everyone sees the same schedule.",
        ],
        [
          "Institutions",
          "Registers, approvals and reports pile up on paper. This covers SACCOs, clinics and NGOs.",
          "Digital records, simple approval workflows and reports generated from the data.",
        ],
      ];
      const sv = document.getElementById("svcs");
      SV.forEach((s, i) => {
        const d = document.createElement("div");
        d.className = "svc";
        d.dataset.open = i === 0;
        d.innerHTML = `<button aria-expanded="${i === 0}" aria-controls="p${i}"><span class="n">0${i + 1}</span><span class="t">${s[0]}</span><span class="pl" aria-hidden="true">+</span></button><div class="pn" id="p${i}"><div><p>${s[1]}</p><ul>${s[2].map((x) => `<li>${x}</li>`).join("")}</ul><a href="#contact" data-type="${s[3]}">Enquire about this</a></div></div>`;
        sv.appendChild(d);
        d.querySelector("button").onclick = () => {
          document.querySelectorAll(".svc").forEach((x) => {
            const o = x === d && x.dataset.open !== "true";
            x.dataset.open = o;
            x.querySelector("button").setAttribute("aria-expanded", o);
          });
          svcPulse(i);
        };
        d.querySelector("a").onclick = (e) => {
          document.getElementById("ty").value = e.target.dataset.type;
        };
      });
      const tabs = document.getElementById("tabs"),
        tp = document.getElementById("tp");
      function showIn(i) {
        [...tabs.children].forEach((b, j) =>
          b.setAttribute("aria-selected", i === j),
        );
        tp.innerHTML = `<h3>${IN[i][0]}</h3><b>The problem</b>${IN[i][1]}<b>How we help</b>${IN[i][2]}`;
      }
      IN.forEach((x, i) => {
        const b = document.createElement("button");
        b.role = "tab";
        b.textContent = x[0];
        b.onclick = () => showIn(i);
        tabs.appendChild(b);
      });
      showIn(0);

      /* ---------- contact form (real hand-off, no fake success) ---------- */
      const st = document.getElementById("st");
      document.getElementById("f").addEventListener("submit", (e) => {
        e.preventDefault();
        const v = (id) => document.getElementById(id).value.trim(),
          m = e.submitter.dataset.m;
        const c = v("ctc"),
          okc = /^\S+@\S+\.\S+$/.test(c) || c.replace(/\D/g, "").length >= 9;
        if (!v("nm") || !okc || v("ds").length < 10) {
          st.className = "err";
          st.textContent =
            "Please add your name, a valid email or phone number, and a short description (at least 10 characters).";
          return;
        }
        const msg = `Hello LOXORA SYSTEMS,\nName: ${v("nm")}\nContact: ${c}\nProject type: ${v("ty")}\nBudget: ${v("bd") || "To discuss"}\nTimeline: ${v("tl") || "Flexible"}\n\n${v("ds")}`;
        st.className = "";
        if (m === "wa") {
          window.open(
            "https://wa.me/254794123041?text=" + encodeURIComponent(msg),
            "_blank",
            "noopener",
          );
          st.textContent =
            "WhatsApp is opening with your message. Press send there to deliver it.";
        } else {
          location.href =
            "mailto:solomboni5@gmail.com?subject=" +
            encodeURIComponent("Project enquiry: " + v("ty")) +
            "&body=" +
            encodeURIComponent(msg);
          st.textContent =
            "Your email app is opening with your message. Press send there to deliver it.";
        }
      });

      /* ---------- 3D scene: one gateway sculpture, six compositions ---------- */
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
      let svcK = { v: 0 },
        svcPulse = () => {};
      (function () {
        if (typeof THREE === "undefined" || typeof gsap === "undefined") return;
        const cv = document.getElementById("bg");
        let r;
        try {
          r = new THREE.WebGLRenderer({
            canvas: cv,
            antialias: true,
            alpha: true,
          });
        } catch (e) {
          cv.remove();
          return;
        }
        r.shadowMap.enabled = true;
        r.shadowMap.type = THREE.PCFSoftShadowMap;
        const sc = new THREE.Scene(),
          cam = new THREE.PerspectiveCamera(38, 1, 0.1, 60),
          g = new THREE.Group();
        sc.add(g);
        sc.fog = new THREE.Fog(0xf3f0e9, 11, 26);
        sc.add(new THREE.HemisphereLight(0xfff8ea, 0xb8b3a2, 0.8));
        const dl = new THREE.DirectionalLight(0xffe9c8, 1.15);
        dl.position.set(5, 8, 4);
        dl.castShadow = true;
        dl.shadow.mapSize.set(1024, 1024);
        Object.assign(dl.shadow.camera, {
          left: -8,
          right: 8,
          top: 8,
          bottom: -8,
          near: 1,
          far: 28,
        });
        sc.add(dl);
        const fl = new THREE.Mesh(
          new THREE.PlaneGeometry(60, 60),
          new THREE.ShadowMaterial({ opacity: 0.16 }),
        );
        fl.rotation.x = -Math.PI / 2;
        fl.position.y = -1.85;
        fl.receiveShadow = true;
        sc.add(fl);
        const M = (c, x) =>
          new THREE.MeshStandardMaterial(
            Object.assign({ color: c, roughness: 0.9, metalness: 0 }, x),
          );
        const ink = M(0x171815),
          stone = M(0x77796e),
          sand = M(0xd9d3c1),
          lime = M(0xb6c96b),
          stone2 = M(0x77796e, { side: THREE.DoubleSide });
        const mk = (geo, m, x, y, z, ed) => {
          const o = new THREE.Mesh(geo, m);
          o.position.set(x, y, z);
          o.castShadow = o.receiveShadow = true;
          if (ed)
            o.add(
              new THREE.LineSegments(
                new THREE.EdgesGeometry(geo),
                new THREE.LineBasicMaterial({
                  color: 0x171815,
                  transparent: true,
                  opacity: 0.28,
                }),
              ),
            );
          o.userData.h = [x, y, z];
          g.add(o);
          return o;
        };
        const B = (w, h, d) => new THREE.BoxGeometry(w, h, d);
        const arch = new THREE.CylinderGeometry(
          0.9,
          0.9,
          0.8,
          40,
          1,
          false,
          0,
          Math.PI,
        );
        arch.rotateX(Math.PI / 2);
        arch.rotateZ(Math.PI / 2);
        const P = [
          mk(B(4.2, 0.35, 2.6), stone, 0, -1.65, 0, 1),
          mk(B(3.4, 0.3, 2.1), sand, 0, -1.33, 0, 1),
          mk(B(0.75, 3.2, 0.95), ink, -1.25, 0.4, 0, 1),
          mk(B(0.75, 2.5, 0.95), stone, 1.25, 0.05, 0, 1),
          mk(B(3.6, 0.5, 1.25), sand, 0.1, 2.2, 0, 1),
          mk(B(2.2, 0.2, 1.6), sand, 0.9, 0.9, 0.7, 1),
          mk(arch, stone2, 0, 0.7, 0, 0),
          mk(B(0.5, 0.7, 0.5), lime, 0, 1.7, 0.1, 1),
          mk(new THREE.TorusGeometry(1.6, 0.05, 10, 80), ink, 0, 0.4, -0.9, 0),
          mk(new THREE.SphereGeometry(0.45, 32, 20), sand, -1.9, -1.05, 0.9, 0),
        ];
        const n = P.length,
          T = [];
        for (let s = 0; s < 6; s++)
          T[s] = P.map((o, i) => {
            const [h0, h1, h2] = o.userData.h;
            let x = h0,
              y = h1,
              z = h2,
              ry = 0,
              rz = 0,
              sc = 1;
            if (s == 1) {
              x = h0 * 1.9;
              y = h1 * 1.3;
              z = h2 * 1.9 + (i - 4.5) * 0.25;
              ry = i * 0.22;
            }
            if (s == 2) {
              x = i * 0.62 - 2.8;
              y = i * 0.42 - 1.7;
              z = -i * 0.18;
              ry = 0.6;
              sc = 0.85;
            }
            if (s == 3) {
              const a = (i / n) * 6.283;
              x = Math.cos(a) * 2.9;
              y = Math.sin(a * 2) * 0.7;
              z = Math.sin(a) * 2.9;
              ry = -a;
              rz = 0.15;
              sc = 0.9;
            }
            if (s == 4) {
              x = i * 0.8 - 3.6;
              y = (i % 2) * 0.4 - 0.2;
              z = 0;
              ry = 0.4;
              sc = 0.55;
            }
            return { x, y, z, ry, rz, sc };
          });
        const K = {
          cam: [
            [0, 1.4, 10.5],
            [0, 1, 12.5],
            [-2.5, -0.4, 9.5],
            [0, 3.8, 10.5],
            [0, 0, 12],
            [0, 1.2, 9.5],
          ],
          gx: [2.4, 1.6, 1.4, 2.2, 0, 2.4],
          gy: [0, 0, 0, 0, 2.2, 0],
          gr: [0.5, 1.2, 2.2, 3.2, 3.9, 6.78],
        };
        const U = { u: 0 },
          L = (a, b, f) => a + (b - a) * f,
          sm = (f) => f * f * (3 - 2 * f),
          dk = () => (innerWidth > 860 ? 1 : 0);
        let t = 0;
        function apply() {
          const u = Math.min(U.u, 4.999),
            i = Math.floor(u),
            j = i + 1,
            f = sm(u - i),
            d = dk();
          g.rotation.y =
            L(K.gr[i], K.gr[j], f) + (reduce ? 0 : Math.sin(t) * 0.06);
          g.position.set(
            L(K.gx[i], K.gx[j], f) * d,
            L(K.gy[i], K.gy[j], f) * d,
            0,
          );
          P.forEach((o, k) => {
            const a = T[i][k],
              b = T[j][k];
            o.position.set(L(a.x, b.x, f), L(a.y, b.y, f), L(a.z, b.z, f));
            o.rotation.set(0, L(a.ry, b.ry, f), L(a.rz, b.rz, f));
            o.scale.setScalar(L(a.sc, b.sc, f));
          });
          P[8].rotation.x = svcK.v * 0.5;
          const c0 = K.cam[i],
            c1 = K.cam[j];
          cam.position.set(
            L(c0[0], c1[0], f),
            L(c0[1], c1[1], f),
            L(c0[2], c1[2], f),
          );
          cam.lookAt(0, 0.2, 0);
        }
        const size = () => {
          const w = innerWidth,
            h = innerHeight;
          r.setPixelRatio(Math.min(devicePixelRatio, 1.75));
          r.setSize(w, h, false);
          cam.aspect = w / h;
          cam.updateProjectionMatrix();
        };
        size();
        addEventListener("resize", size);
        (function loop() {
          if (!document.hidden) {
            t += 0.004;
            apply();
            r.render(sc, cam);
          }
          requestAnimationFrame(loop);
        })();
        svcPulse = (i) =>
          gsap.to(svcK, { v: i, duration: 1, ease: "power2.out" });
        if (!reduce) {
          gsap.registerPlugin(ScrollTrigger);
          gsap
            .timeline({
              scrollTrigger: {
                trigger: "#story",
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
              },
            })
            .to(U, { u: 5, ease: "none", duration: 1 });
        }
      })();

      /* ---------- motion & progress ---------- */
      if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
        const pg = document.getElementById("prog");
        ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (s) => (pg.style.transform = `scaleX(${s.progress})`),
        });
        if (!reduce) {
          gsap.from(".ln>span", {
            yPercent: 110,
            duration: 1.1,
            ease: "power3.out",
            stagger: 0.12,
            delay: 0.2,
          });
          gsap.utils
            .toArray(".rv")
            .forEach((el) =>
              gsap.from(el, {
                y: 28,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: el,
                  start: "top 88%",
                  toggleActions: "play none none reverse",
                },
              }),
            );
        }
      }

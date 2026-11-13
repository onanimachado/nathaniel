/*
 * Toda a interação do site, em JavaScript puro, guiada por atributos data-*.
 * Usado pelo site (components/Experience.tsx) e pela prévia gerada por
 * scripts/export-preview.mjs, para os dois se comportarem igual.
 *
 *   data-parallax="60"         desloca no eixo Y com a rolagem
 *   data-drift="80"            desloca no eixo X com a rolagem
 *   data-parallax-img          a imagem de dentro se move dentro da moldura
 *   data-chapter="Nome"        capítulo de tela cheia (Jacob & Co): empilha e alimenta os pontinhos
 *   data-split                 título que sobe letra a letra quando o capítulo entra
 *   data-reveal                aparece subindo quando entra na tela
 *   data-dots                  onde os pontinhos de navegação são montados
 *   data-hero / data-hero-logo logo que acompanha levemente o mouse
 *   data-marquee / data-marquee-track   faixa de marcas que anda e acelera com a rolagem
 *   data-panel-open / data-panel / data-panel-close   painel de orçamento
 *   data-lead                  formulário do painel que abre o WhatsApp
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

type Cleanup = () => void;

export function initExperience(root: Document = document): Cleanup {
  gsap.registerPlugin(ScrollTrigger);
  const cleanups: Cleanup[] = [];
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $$ = <T extends Element = HTMLElement>(sel: string, el: ParentNode = root) => Array.from(el.querySelectorAll<T & Element>(sel)) as unknown as T[];

  /* ---------- rolagem suave e animações ligadas à rolagem ---------- */
  let lenis: Lenis | null = null;
  const mm = gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)", () => {
    lenis = new Lenis({ lerp: 0.1 });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis?.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const scrub = (trigger: Element) => ({ trigger, start: "top bottom", end: "bottom top", scrub: true });
    $$("[data-parallax]").forEach((el) => {
      const d = parseFloat(el.dataset.parallax ?? "0");
      gsap.fromTo(el, { y: -d }, { y: d, ease: "none", scrollTrigger: scrub(el) });
    });
    $$("[data-drift]").forEach((el) => {
      const d = parseFloat(el.dataset.drift ?? "0");
      gsap.fromTo(el, { x: d }, { x: -d, ease: "none", scrollTrigger: scrub(el) });
    });
    $$("[data-parallax-img]").forEach((frame) => {
      const img = frame.querySelector("img");
      if (img) gsap.fromTo(img, { yPercent: -7, scale: 1.16 }, { yPercent: 7, scale: 1.16, ease: "none", scrollTrigger: scrub(frame) });
    });

    /* capítulos: o de baixo afunda e escurece enquanto o próximo sobe por cima */
    const chapters = $$("[data-chapter]");
    chapters.forEach((ch, i) => {
      const next = chapters[i + 1];
      const inner = ch.querySelector<HTMLElement>("[data-chapter-inner]") ?? ch;
      if (next) {
        gsap.to(inner, { scale: 0.92, filter: "brightness(0.55)", ease: "none", scrollTrigger: { trigger: next, start: "top bottom", end: "top top", scrub: true } });
      }
      const bg = ch.querySelector("[data-chapter-bg]");
      if (bg) gsap.fromTo(bg, { scale: 1.12 }, { scale: 1, ease: "none", scrollTrigger: { trigger: ch, start: "top bottom", end: "top top", scrub: true } });
    });

    /* títulos que sobem letra a letra */
    $$("[data-split]").forEach((el) => {
      const chars = splitChars(el);
      gsap.fromTo(
        chars,
        { yPercent: 110 },
        { yPercent: 0, duration: 0.9, ease: "power4.out", stagger: 0.018, scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" } },
      );
    });
    $$("[data-reveal]").forEach((el) => {
      gsap.fromTo(el, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 92%", toggleActions: "play none none reverse" } });
    });

    return () => {
      gsap.ticker.remove(tick);
      lenis?.destroy();
      lenis = null;
    };
  });
  cleanups.push(() => mm.revert());

  /* ---------- pontinhos de navegação (Jacob & Co) ---------- */
  const dotsHost = root.querySelector<HTMLElement>("[data-dots]");
  const chapterEls = $$("[data-chapter]");
  if (dotsHost && chapterEls.length > 1) {
    dotsHost.innerHTML = "";
    const buttons = chapterEls.map((ch, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "dot";
      b.setAttribute("aria-label", ch.dataset.chapter ?? `${i + 1}`);
      b.dataset.label = ch.dataset.chapter ?? "";
      b.addEventListener("click", () => {
        if (lenis) lenis.scrollTo(ch, { offset: 0 });
        else ch.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
      });
      dotsHost.appendChild(b);
      return b;
    });
    const setActive = () => {
      const mid = window.innerHeight * 0.5;
      let idx = 0;
      chapterEls.forEach((ch, i) => { if (ch.getBoundingClientRect().top <= mid) idx = i; });
      buttons.forEach((b, i) => b.setAttribute("aria-current", i === idx ? "true" : "false"));
      const dark = chapterEls[idx]?.dataset.dots === "light";
      dotsHost.classList.toggle("on-dark", dark);
    };
    setActive();
    window.addEventListener("scroll", setActive, { passive: true });
    cleanups.push(() => window.removeEventListener("scroll", setActive));
  }

  /* ---------- logo da abertura acompanha o mouse ---------- */
  const hero = root.querySelector<HTMLElement>("[data-hero]");
  const heroLogo = root.querySelector<HTMLElement>("[data-hero-logo]");
  if (hero && heroLogo && !reduce) {
    const onMove = (e: PointerEvent) => {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      heroLogo.style.transform = `translate(${x * 14}px, ${y * 10}px)`;
    };
    hero.addEventListener("pointermove", onMove);
    cleanups.push(() => hero.removeEventListener("pointermove", onMove));
  }

  /* ---------- faixa de marcas ---------- */
  $$("[data-marquee]").forEach((vp) => cleanups.push(marquee(vp, reduce)));

  /* ---------- painel de orçamento ---------- */
  const panel = root.querySelector<HTMLElement>("[data-panel]");
  if (panel) {
    let lastFocus: HTMLElement | null = null;
    const open = (e?: Event) => {
      e?.preventDefault();
      lastFocus = document.activeElement as HTMLElement | null;
      panel.hidden = false;
      requestAnimationFrame(() => panel.classList.add("is-open"));
      document.documentElement.classList.add("panel-open");
      lenis?.stop();
      panel.querySelector<HTMLElement>("input, textarea, button")?.focus();
    };
    const close = () => {
      panel.classList.remove("is-open");
      document.documentElement.classList.remove("panel-open");
      lenis?.start();
      window.setTimeout(() => { panel.hidden = true; }, reduce ? 0 : 450);
      lastFocus?.focus();
    };
    const openers = $$("[data-panel-open]");
    openers.forEach((b) => b.addEventListener("click", open));
    const closers = $$("[data-panel-close]", panel);
    closers.forEach((b) => b.addEventListener("click", close));
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" && !panel.hidden) close(); };
    document.addEventListener("keydown", onKey);
    cleanups.push(() => {
      openers.forEach((b) => b.removeEventListener("click", open));
      closers.forEach((b) => b.removeEventListener("click", close));
      document.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("panel-open");
    });

    const form = panel.querySelector<HTMLFormElement>("[data-lead]");
    if (form) {
      const onSubmit = (e: SubmitEvent) => {
        e.preventDefault();
        const msg = form.querySelector<HTMLElement>("[data-lead-msg]");
        const number = form.dataset.whatsapp;
        if (!number) { if (msg) msg.textContent = form.dataset.missing ?? ""; return; }
        const data = new FormData(form);
        const chosen = data.getAll("servicos").map(String);
        const text = [
          form.dataset.prefill,
          chosen.length ? `${form.dataset.prefillServices} ${chosen.join(", ")}.` : "",
          String(data.get("mensagem") ?? "").trim(),
        ].filter(Boolean).join("\n");
        const url = `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
        window.open(url, "_blank", "noopener");
      };
      form.addEventListener("submit", onSubmit);
      cleanups.push(() => form.removeEventListener("submit", onSubmit));
    }
  }

  requestAnimationFrame(() => ScrollTrigger.refresh());
  return () => cleanups.reverse().forEach((c) => c());
}

/* Quebra o texto em palavras (que não se partem) e letras, para animar letra a letra. */
function splitChars(el: HTMLElement): HTMLElement[] {
  if (el.dataset.splitDone) return Array.from(el.querySelectorAll<HTMLElement>(".char"));
  const words = (el.textContent ?? "").trim().split(/\s+/);
  el.setAttribute("aria-label", words.join(" "));
  el.innerHTML = "";
  const chars: HTMLElement[] = [];
  words.forEach((w, wi) => {
    const word = document.createElement("span");
    word.className = "word";
    word.setAttribute("aria-hidden", "true");
    for (const c of w) {
      const ch = document.createElement("span");
      ch.className = "char";
      ch.textContent = c;
      word.appendChild(ch);
      chars.push(ch);
    }
    el.appendChild(word);
    if (wi < words.length - 1) el.appendChild(document.createTextNode(" "));
  });
  el.dataset.splitDone = "1";
  return chars;
}

/* Faixa que anda sozinha, para com o mouse, pode ser arrastada e acelera com a rolagem. */
function marquee(vp: HTMLElement, reduce: boolean): Cleanup {
  const track = vp.querySelector<HTMLElement>("[data-marquee-track]");
  if (!track) return () => {};
  const lists = track.querySelectorAll("ul");
  if (lists.length === 1) {
    const copy = lists[0].cloneNode(true) as HTMLElement;
    copy.setAttribute("aria-hidden", "true");
    copy.querySelectorAll("img").forEach((i) => (i.alt = ""));
    track.appendChild(copy);
  }
  const BASE = 55;
  const BOOST = 1.3;
  let x = 0, last = performance.now(), lastY = window.scrollY, hover = false, drag = false, sx = 0, so = 0, raf = 0;
  const frame = (now: number) => {
    const dt = Math.min(64, now - last);
    last = now;
    const y = window.scrollY, dy = y - lastY;
    lastY = y;
    if (!drag && !reduce) { if (!hover) x -= (BASE * dt) / 1000; x -= dy * BOOST; }
    const half = track.scrollWidth / 2;
    if (half > 0) x = (((x % half) + half) % half) - half;
    track.style.transform = `translate3d(${x}px,0,0)`;
    raf = requestAnimationFrame(frame);
  };
  raf = requestAnimationFrame(frame);
  const enter = () => (hover = true);
  const leave = () => (hover = false);
  const down = (e: PointerEvent) => { drag = true; sx = e.clientX; so = x; vp.setPointerCapture(e.pointerId); };
  const move = (e: PointerEvent) => { if (drag) x = so + (e.clientX - sx); };
  const up = () => (drag = false);
  vp.addEventListener("pointerenter", enter);
  vp.addEventListener("pointerleave", leave);
  vp.addEventListener("pointerdown", down);
  vp.addEventListener("pointermove", move);
  vp.addEventListener("pointerup", up);
  vp.addEventListener("pointercancel", up);
  return () => {
    cancelAnimationFrame(raf);
    vp.removeEventListener("pointerenter", enter);
    vp.removeEventListener("pointerleave", leave);
    vp.removeEventListener("pointerdown", down);
    vp.removeEventListener("pointermove", move);
    vp.removeEventListener("pointerup", up);
    vp.removeEventListener("pointercancel", up);
  };
}

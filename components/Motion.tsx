"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

/*
 * Rolagem suave (Lenis) e paralaxe (GSAP ScrollTrigger), controlados por atributos no HTML:
 *   data-parallax="60"   desloca o elemento no eixo Y ao longo da rolagem (px; negativo inverte)
 *   data-drift="80"      desloca no eixo X
 *   data-parallax-img    a imagem de dentro se move dentro da moldura
 * Tudo fica desligado para quem pede menos movimento no sistema.
 */
export default function Motion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const lenis = new Lenis({ lerp: 0.1, anchors: true });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      const scrub = (trigger: Element) => ({ trigger, start: "top bottom", end: "bottom top", scrub: true });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const d = parseFloat(el.dataset.parallax ?? "0");
        gsap.fromTo(el, { y: -d }, { y: d, ease: "none", scrollTrigger: scrub(el) });
      });

      gsap.utils.toArray<HTMLElement>("[data-drift]").forEach((el) => {
        const d = parseFloat(el.dataset.drift ?? "0");
        gsap.fromTo(el, { x: d }, { x: -d, ease: "none", scrollTrigger: scrub(el) });
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax-img]").forEach((frame) => {
        const img = frame.querySelector("img");
        if (!img) return;
        gsap.fromTo(img, { yPercent: -7, scale: 1.16 }, { yPercent: 7, scale: 1.16, ease: "none", scrollTrigger: scrub(frame) });
      });

      return () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    });

    return () => mm.revert();
  }, []);

  return null;
}

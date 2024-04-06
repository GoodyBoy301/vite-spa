import Lenis from "@studio-freight/lenis"
import gsap from "gsap"
import { Observer, ScrollTrigger } from "gsap/all"
gsap.registerPlugin(ScrollTrigger, Observer)

export default class Scroll {
  lenis: Lenis | undefined
  scrollbar: gsap.core.Timeline | undefined
  observer: Observer | undefined
  main: gsap.core.Timeline | undefined
  constructor(page: string) {
    this.create(page)
  }

  create(page: string) {
    this.lenis = new Lenis({
      // wrapper: innerWidth >= 768 ? window : window.$(".app"),
      // smoothTouch: true,
      lerp: 0,
    })

    window.lenis = this.lenis

    createMain()

    this.lenis.on("scroll", ScrollTrigger.update)
    gsap.ticker.lagSmoothing(0)
    requestAnimationFrame(this.raf.bind(this))
  }

  navigate(page: string) {
    // this.lenis.reset()
    this.create(page)
  }

  raf(time: number) {
    this.lenis.raf(time)
    requestAnimationFrame(this.raf.bind(this))
  }
}

function createMain() {
  const mm = gsap.matchMedia()
  let tl: gsap.core.Timeline
  tl = gsap.timeline()
  mm.add("(min-width:761px) and (max-width:1919px)", () => {
    tl = gsap.timeline({
      paused: true,
      defaults: { ease: "none" },
      scrollTrigger: { scrub: true },
    })
  })

  mm.add("(min-width:1920px)", () => {
    tl = gsap.timeline()
  })

  mm.add("(max-width:760px)", () => {
    tl = gsap.timeline({
      paused: true,
      defaults: { ease: "none" },
      scrollTrigger: { scrub: true },
    })
  })
}

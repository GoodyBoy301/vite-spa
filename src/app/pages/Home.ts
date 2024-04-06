import gsap from "gsap"
import { $App } from ".."
import Reveal from "../classes/reveal"

export default class Home {
  app: $App
  firstReveal: boolean
  slides: NodeListOf<Element>
  reveal: Reveal
  constructor(app: $App) {
    this.app = app
  }

  create() {
    // this.createReveal()
  }

  createReveal() {
    this.firstReveal = true
    this.slides = document.querySelectorAll("[data-slide]")
    this.reveal = new Reveal(this, { elements: "[data-slide]" })
  }

  revealIn(x: { index: number }) {
    if (this.firstReveal) {
      this.firstReveal = false
      gsap.utils
        .toArray(this.slides)
        .slice(0, Number(x.index))
        .forEach((el: HTMLElement) => {
          this.reveal.observer.unobserve(el)
          el.style.opacity = "1"
        })
    } else {
      gsap
        .timeline({ delay: 0.2 })
        .fromTo(
          this.slides[Number(x.index - 1)],
          { opacity: 0 },
          { opacity: 1, duration: 0.75, ease: "ease.out" }
        )
        .fromTo(
          this.slides[Number(x.index - 1)],
          { y: "3.5rem" },
          { y: "0rem", duration: 1.3, ease: "expo" },
          "<"
        )
    }
    this.firstReveal = false
  }

  revealOut() {}

  resize() {}

  destroy() {}

  navigate() {}
}

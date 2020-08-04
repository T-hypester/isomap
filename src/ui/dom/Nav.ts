import { component, HtmlComponent } from "../../core-html/component";

import '../Nav.css'

export default function Nav() {
  return new HtmlNav
}

class HtmlNav extends HtmlComponent {
  private up: HtmlComponent
  private left: HtmlComponent
  private right: HtmlComponent
  private down: HtmlComponent
  private pippo: HtmlComponent

  constructor() {
    super('div')

    this.class('Nav').children(
      this.up = component('button').class('Nav-Up').text("⬆"),
      this.left = component('button').class('Nav-Left').text('⬅'),
      this.right = component('button').class('Nav-Right').text('➡'),
      this.down = component('button').class('Nav-Down').text("⬇"),
      this.pippo = component('button').class('Nav-Pippo').text("&#129322;")
    )
  }

  onRotateUp(listener: () => void): this {
    this.up.on('click', listener)
    return this
  }

  onRotateLeft(listener: () => void): this {
    this.left.on('click', listener)
    return this
  }

  onRotateRight(listener: () => void): this {
    this.right.on('click', listener)
    return this
  }

  onRotateDown(listener: () => void): this {
    this.down.on('click', listener)
    return this
  }
  onPippo(listener: () => void): this {
    this.pippo.on('click', listener)
    return this
  }
}
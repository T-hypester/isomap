import { element, HtmlElement } from "../../core/primitives/elements";

import '../Nav.css'

export default function Nav() {
  return new HtmlNav
}

class HtmlNav extends HtmlElement {
  private up: HtmlElement
  private left: HtmlElement
  private right: HtmlElement
  private down: HtmlElement

  constructor() {
    super('div')

    this.class('Nav').children(
      this.up = element('button').class('Nav-Up').text("^"),
      this.left = element('button').class('Nav-Left').text('&lt'),
      this.right = element('button').class('Nav-Right').text('&gt'),
      this.down = element('button').class('Nav-Down').text("v")
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
}
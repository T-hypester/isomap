import { HtmlComponent, component } from "./component"

import "../core/primitives/Face.css"

export function rectangle(): Rectangle {
  return new Rectangle()
}

export class Rectangle extends HtmlComponent {
  constructor() {
    super("div")
    this.class("Face")
  }
}

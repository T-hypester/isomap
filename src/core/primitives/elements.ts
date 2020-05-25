import { SceneObject } from "../types"

export function element(tag: string): HtmlElement {
  return new HtmlElement(tag)
}

export class HtmlElement implements SceneObject<HTMLElement> {
  private _htmlElement: HTMLElement

  constructor(tagName: string) {
    this._htmlElement = document.createElement(tagName)
  }

  children(...children: HtmlElement[]): this {
    for (let i = 0; i < this.htmlElement().children.length; i++)
      this.htmlElement().removeChild(this.htmlElement().children.item(i))
    children.forEach((child) => void child.apply(this.htmlElement()))
    return this
  }

  class(value: string): this {
    this._htmlElement.className = value
    return this
  }

  on(event: string, handler: (this: this, e: Event) => void): this {
    this.htmlElement().addEventListener(event, handler)
    return this
  }

  style(value: Partial<CSSStyleDeclaration>): this {
    Object.assign(this._htmlElement.style, value)
    return this
  }

  text(content: string): this {
    this.htmlElement().innerHTML = content
    return this
  }

  apply(target: HTMLElement): HTMLElement {
    target.appendChild(this.htmlElement())
    return target
  }

  htmlElement(): HTMLElement {
    return this._htmlElement
  }
}

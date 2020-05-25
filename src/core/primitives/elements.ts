import { SceneObject } from "../types";

export function element (tag: string): HtmlElement {
  return new HtmlElement(tag)
}

export class HtmlElement implements SceneObject<HTMLElement> {
  private _htmlElement: HTMLElement

  constructor(tagName: string) {
    this._htmlElement = document.createElement(tagName)
  }

  class (value: string): this {
    this._htmlElement.className = value
    return this
  }

  style (value: Partial<CSSStyleDeclaration>): this {
    Object.assign(this._htmlElement.style, value)
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
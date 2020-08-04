import { Component } from "../core/types"

export function component(tag: string): HtmlComponent {
  return new HtmlComponent(tag)
}

export class HtmlComponent implements Component<HTMLElement> {
  private _htmlElement: HTMLElement

  static fromNative(element: HTMLElement): HtmlComponent {
    return new HtmlComponent(element)
  }

  constructor(element: string | HTMLElement) {
    this._htmlElement =
      typeof element === "string" ? document.createElement(element) : element
  }

  children(...children: HtmlComponent[]): this {
    for (let i = 0; i < this.toNative().children.length; i++)
      this.toNative().removeChild(this.toNative().children.item(i))
    children.forEach((child) => void child.apply(this))
    return this
  }

  class(value: string): this {
    this._htmlElement.classList.add(value)
    return this
  }

  on(event: string, handler: (this: this, e: Event) => void): this {
    this.toNative().addEventListener(event, handler)
    return this
  }

  style(): Partial<CSSStyleDeclaration>
  style(value: Partial<CSSStyleDeclaration>): this
  style(
    value?: Partial<CSSStyleDeclaration>
  ): Partial<CSSStyleDeclaration> | this {
    if (!value) return this.getNonEmptyStyle()
    const el = this._htmlElement
    Object.entries(value).forEach(([prop, val]) => {
      el.style.setProperty(idlToCss(prop), val as string)
    })
    return this
  }

  text(content: string): this {
    this.toNative().innerHTML = content
    return this
  }

  apply(component: HtmlComponent): HtmlComponent {
    component.toNative().appendChild(this.toNative())
    return component
  }

  toNative(): HTMLElement {
    return this._htmlElement
  }

  private getNonEmptyStyle(): Partial<CSSStyleDeclaration> {
    const st: Partial<CSSStyleDeclaration> = {}
    const style = this._htmlElement.style
    for (let i = 0; i < this._htmlElement.style.length; i++) {
      const value = style.getPropertyValue(style.item(i))
      if (!value) continue
      const prop = cssToIdl(style.item(i))
      st[prop as any] = value
    }
    console.dir(st)
    return st
  }
}

function cssToIdl(
  property: string,
  flags: { dashFirst?: boolean; lowercaseFirst?: boolean } = {}
): string {
  let input = property
  let output: string = ""
  if (flags.lowercaseFirst) input = property.substr(1)
  output += input.replace(/-([a-z])/g, (_, initial: string) =>
    initial.toUpperCase()
  )
  return output
}

function idlToCss(
  attribute: string,
  flags: { dashFirst?: boolean } = {}
): string {
  let output: string = ""
  if (flags.dashFirst) output += "-"
  output += attribute.replace(
    /[A-Z]/g,
    (initial: string) => "-" + initial.toLowerCase()
  )
  return output
}

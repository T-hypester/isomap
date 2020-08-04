import { AbstractFeature } from "./features"
import { Color, Texture } from "./types"

export function material() {
  return new Material()
}

export class Material extends AbstractFeature {
  private _color?: Color
  private _texture?: Texture

  computeStyle(): Partial<CSSStyleDeclaration> {
    const style: Partial<CSSStyleDeclaration> = {}
    if (this._color) style.backgroundColor = this._color.toString()
    if (this._texture) {
      style.backgroundPosition = this.getBackgroundPosition()
      style.backgroundRepeat = "repeat"
      style.backgroundImage = this._texture.src
      style.backgroundSize = this.getBackgroundSize()
    }
    return style
  }

  color(value: Color): this {
    this._color = value
    return this
  }

  texture(value: Texture): this {
    this._texture = value
    return this
  }

  private getBackgroundPosition(): string {
    const alignment = this._texture?.alignment
    if (!alignment) return "center"
    if (typeof alignment === "string") return alignment
    return alignment.join(" ")
  }

  private getBackgroundSize(): string {
    const size = this._texture?.tileSize
    if (!size) return "contain"
    if (typeof size === "number") return `${size}px`
    return `${size[0]}px ${size[1]}px`
  }
}

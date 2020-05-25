import { ReactFeature } from '../diocristo/features'

export function position() {
  return new Position()
}

class Position extends ReactFeature {
  private posX: string
  private posY: string

  x(value: number, unit: string = "px"): this {
    this.posX = `${value}${unit}`
    return this
  }

  y(value: number, unit: string = "px"): this {
    this.posY = `${value}${unit}`
    return this
  }

  applyStyle(
    source: Partial<CSSStyleDeclaration>
  ): Partial<CSSStyleDeclaration> {
    return {
      ...source,
      left: this.posX,
      top: this.posY,
    }
  }
}

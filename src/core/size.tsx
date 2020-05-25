import { ReactFeature } from '../diocristo/features'

export function sizing() {
  return new BaseSize()
}

class BaseSize extends ReactFeature {
  protected cssWidth: string
  protected cssHeight: string

  width(value: number, unit: string = "px"): this {
    this.cssWidth = value + unit
    return this
  }

  height(value: number, unit: string = "px"): this {
    this.cssHeight = value + unit
    return this
  }

  applyStyle(
    source: Partial<CSSStyleDeclaration>
  ): Partial<CSSStyleDeclaration> {
    return {
      ...source,
      width: this.cssWidth,
      height: this.cssHeight,
    }
  }
}

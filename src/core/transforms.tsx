import { ReactFeature } from "../diocristo/features"

export function rotation(): Rotations {
  return new Rotations()
}

export function translation(): Translations {
  return new Translations()
}

export function zoom(value: number): Zoom {
  return new Zoom(value)
}

abstract class BaseTransform extends ReactFeature {
  protected transforms: string[] = []
  protected transformOriginX: string
  protected transformOriginY: string

  applyStyle(
    source: Partial<CSSStyleDeclaration>
  ): Partial<CSSStyleDeclaration> {
    const transform = this.transforms.join(" ")
    return {
      ...source,
      transform: (source.transform || "") + " " + transform,
      transformOrigin:
        source.transformOrigin ||
        `${this.transformOriginX || "center"} ${
          this.transformOriginY || "center"
        }`,
    }
  }

  initOriginX(initFn: () => string): this {
    if (!this.transformOriginX) this.transformOriginX = initFn()
    return this
  }

  initOriginY(initFn: () => string): this {
    if (!this.transformOriginY) this.transformOriginY = initFn()
    return this
  }
}

class Translations extends BaseTransform {
  translateZ(value: number): this {
    this.transforms.push(`translateZ(${value}px)`)
    return this
  }
}

class Rotations extends BaseTransform {
  x(value: number, unit: string = "deg"): this {
    this.initOriginY(() => (value > 0 ? "top" : "bottom"))
    this.transforms.push(`rotateX(${value}${unit})`)
    return this
  }

  y(value: number, unit: string = "deg"): this {
    this.initOriginX(() => (value > 0 ? "right" : "left"))
    this.transforms.push(`rotateY(${value}${unit})`)
    return this
  }

  z(value: number, unit: string = "deg"): this {
    this.transforms.push(`rotateZ(${value}${unit})`)
    return this
  }
}

class Zoom extends BaseTransform {
  constructor(value: number) {
    super()
    this.transforms.push(`scale(${value})`)
  }
}

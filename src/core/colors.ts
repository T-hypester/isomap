import { Color } from "./types"

export function literal(name: string): Color {
  return name
}

export function rgb(r: number, g: number, b: number) {
  return Object.assign(new RgbColor(), { r, g, b })
}

export const gray = literal("gray")
export const grey = literal("grey")

class RgbColor implements Color {
  r: number
  g: number
  b: number

  toString(): string {
    return `rgb(${this.r},${this.g},${this.b})`
  }
}

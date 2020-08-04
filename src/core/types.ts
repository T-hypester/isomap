

export interface IdEntity<T> {
  id: T
}

export interface Size2D {
  width: number
  height: number
  unit: string
}

export type StyleProps = {
  class?: string
  style?: Partial<CSSStyleDeclaration>
}

export interface Component<N> {
  style(): Partial<CSSStyleDeclaration>
  style(value: Partial<CSSStyleDeclaration>): this
  toNative(): N
}

export interface Feature {
  apply<N, C extends Component<N>>(component: C): C
}

export interface FeatureApplyFn<T> {
  (object: T): T
}


export interface ObjectStyle extends Feature {
  applyClass(sourceClasses: string): string
  applyStyle(sourceStyle: Partial<CSSStyleDeclaration>): Partial<CSSStyleDeclaration>
}

export interface Transform extends Feature {
  applyStyle(sourceStyle: Partial<CSSStyleDeclaration>): Partial<CSSStyleDeclaration>
}

export interface Color {
  toString(): string
}

type TextureAlignment = "top" | "right" | "bottom" | "left" | "center"
type TileSize = number | [number, number]

export interface Texture {
  alignment?: TextureAlignment | [TextureAlignment, TextureAlignment]
  src: string
  tileSize?: TileSize
}


export interface Geometry<A extends string> {
  axes: A
}

export type Point<A extends string> = {
  [axis in A]: number
}

import { ComponentType } from "react"

import { withOverriddenStyle } from "./utils"

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

export interface Feature<T> {
  apply(object: T): T
}

export interface FeatureApplyFn<T> {
  (object: T): T
}

export interface SceneObject<T> extends Feature<T> {}

export interface ObjectStyle<T> extends Feature<T> {
  applyClass(sourceClasses: string): string
  applyStyle(sourceStyle: Partial<CSSStyleDeclaration>): Partial<CSSStyleDeclaration>
}

export interface Transform<T> extends Feature<T> {
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

type Axes2D = "x" | "y"

export interface Geometry<A extends string> {
  axes: A
}

export type Point<A extends string> = {
  [axis in A]: number
}

import * as React from "react"
import { ComponentType } from "react"

import { Feature, StyleProps } from "./types"

export function features<T>(...features: Feature<T>[]): Feature<T> {
  return {
    apply(object: T): T {
      return features.reduce((comp, next) => next.apply(comp), object)
    }
  }
}

export function url(url: string) {
  return `url(${url})`
}

type StyleOverrideFn = (
  source: Partial<CSSStyleDeclaration>
) => Partial<CSSStyleDeclaration>
type StyleOverride = Partial<CSSStyleDeclaration>

export function withOverriddenStyle<P extends StyleProps>(
  style: StyleOverride,
  Component: ComponentType<P>
): ComponentType<P>

export function withOverriddenStyle<P extends StyleProps>(
  style: StyleOverrideFn,
  Component: ComponentType<P>
): ComponentType<P>

export function withOverriddenStyle<P extends StyleProps>(
  style: StyleOverride | StyleOverrideFn,
  Component: ComponentType<P>
): ComponentType<P> {
  return (props: P) => (
    <Component
      {...props}
      style={
        typeof style === "function"
          ? style(props.style || {})
          : {
              ...props.style,
              ...style,
            }
      }
    />
  )
}

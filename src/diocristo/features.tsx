import * as React from "react"

import { Feature } from "../core/types"

export type StyleProps = {
  className?: string
  style?: Partial<CSSStyleDeclaration>
}

type StyleOverrideFn = (
  source: Partial<CSSStyleDeclaration>
) => Partial<CSSStyleDeclaration>
type StyleOverride = Partial<CSSStyleDeclaration>

export abstract class ReactFeature
  implements Feature<React.ComponentType> {
  apply<P extends StyleProps>(Component: React.ComponentType<P>): React.ComponentType<P> {
    return this.mergeStyle(this.applyStyle.bind(this), Component)
  }

  applyStyle(
    source: Partial<CSSStyleDeclaration>
  ): Partial<CSSStyleDeclaration> {
    if (!this.computeStyle) throw new Error("Method not implemented.")
    return {
      ...source,
      ...this.computeStyle(),
    }
  }

  computeClass?(): string
  computeStyle?(): Partial<CSSStyleDeclaration>

  protected mergeStyle<P extends StyleProps>(
    style: StyleOverride | StyleOverrideFn,
    Component: React.ComponentType<P>
  ): React.ComponentType<P> {
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
}

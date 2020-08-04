import { Feature, Component } from "./types"

export type StyleProps = {
  className?: string
  style?: Partial<CSSStyleDeclaration>
}

export abstract class AbstractFeature implements Feature {
  apply<N, C extends Component<N>>(component: C): C {
    return component.style(this.applyStyle(component.style()))
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

  /* protected mergeStyle<P extends StyleProps>(
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
  } */
}

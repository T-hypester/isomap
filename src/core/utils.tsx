import { Feature, Component } from "./types"

export function features(...features: Feature[]): Feature {
  return {
    apply<N, C extends Component<N>>(component: C): C {
      return features.reduce((comp, next) => next.apply(comp), component)
    }
  }
}

export function url(url: string) {
  return `url(${url})`
}

import * as React from "react"

import { rotation, zoom } from "../core/transforms"
import { StyleProps } from "../diocristo/features"
import { HtmlElement } from "../core/primitives/elements"

export class HtmlCamera extends HtmlElement {
  rotation(horiz: number, vert: number) {
    const baseStyle: Partial<CSSStyleDeclaration> = {
      transformStyle: "preserve-3d",
      transition: "transform 0.1s linear",
    }
    const zoomStyle = zoom(2).applyStyle(baseStyle)
    const cameraStyle = rotation()
      .initOriginX(() => "center")
      .initOriginY(() => "center")
      .x(horiz)
      .z(vert)
      .applyStyle(zoomStyle)
    Object.assign(this.htmlElement().style, cameraStyle)
  }
}

export default React.forwardRef(function Camera(
  props: StyleProps & {
    rotationHorizontal: number
    rotationVertical: number
    children?: React.ReactNode
  },
  ref: React.Ref<HTMLDivElement>
) {
  const baseStyle: Partial<CSSStyleDeclaration> = {
    transformStyle: "preserve-3d",
    transition: "transform 0.1s linear",
  }
  const zoomStyle = React.useMemo(() => zoom(2).applyStyle(baseStyle), [
    baseStyle,
  ])
  const cameraStyle = React.useMemo(
    () =>
      rotation()
        .initOriginX(() => "center")
        .initOriginY(() => "center")
        .x(props.rotationVertical)
        .z(props.rotationHorizontal)
        .applyStyle(zoomStyle),
    [props.rotationHorizontal, props.rotationVertical, zoomStyle]
  )

  return <div ref={ref} {...props} style={{ ...cameraStyle, ...props.style }} />
})

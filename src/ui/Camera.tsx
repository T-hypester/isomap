import * as React from "react"

import { rotation, zoom } from "../core/transforms"
import { StyleProps } from "../core/features"

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

import { rotation, zoom } from "../core/transforms"
import { HtmlElement } from "../core/primitives/elements"

export class DomCamera extends HtmlElement {
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

import { rotation, zoom } from "../core/transforms"
import { HtmlComponent } from "../core-html/component"

export class DomCamera extends HtmlComponent {
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
    Object.assign(this.toNative().style, cameraStyle)
  }
}

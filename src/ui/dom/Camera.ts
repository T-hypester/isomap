import { HtmlElement } from "../../core/primitives/elements"
import { zoom, rotation } from "../../core/transforms"

export default function Camera() {
  return new HtmlCamera()
}

export class HtmlCamera extends HtmlElement {
  static CAMERA_ROTATION_ANGLE = 15

  private horizontalAngle = 45
  private verticalAngle = 60

  constructor() {
    super("div")
  }

  rotation(horiz: number, vert: number): this {
    const baseStyle: Partial<CSSStyleDeclaration> = {
      transformStyle: "preserve-3d",
      transition: "transform 0.1s linear",
    }
    const zoomStyle = zoom(2).applyStyle(baseStyle)
    const cameraStyle = rotation()
      .initOriginX(() => "center")
      .initOriginY(() => "center")
      .x((this.verticalAngle = vert))
      .z((this.horizontalAngle = horiz))
      .applyStyle(zoomStyle)
    Object.assign(this.htmlElement().style, cameraStyle)
    return this
  }

  up(angle: number = HtmlCamera.CAMERA_ROTATION_ANGLE): this {
    this.rotation(this.horizontalAngle, this.verticalAngle + angle)
    return this
  }

  down(angle: number = HtmlCamera.CAMERA_ROTATION_ANGLE): this {
    this.rotation(this.horizontalAngle, this.verticalAngle - angle)
    return this
  }

  left(angle: number = HtmlCamera.CAMERA_ROTATION_ANGLE): this {
    this.rotation(this.horizontalAngle + angle, this.verticalAngle)
    return this
  }

  right(angle: number = HtmlCamera.CAMERA_ROTATION_ANGLE): this {
    this.rotation(this.horizontalAngle - angle, this.verticalAngle)
    return this
  }
}

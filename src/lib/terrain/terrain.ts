import { HtmlComponent } from "../../core-html/component"
import { Material } from "../../core/material"
import { sizing } from "../../core/size"
import { rectangle } from "../../core-html/primitives"
import { features } from "../../core/utils"
import { Feature } from "../../core/types"
import { rotation, translation } from "../../core/transforms"
import { position } from "../../core/position"

export function terrain(): Terrain {
  return new Terrain()
}

class Terrain extends HtmlComponent {
  protected _width: number
  protected _length: number
  protected _depth: number = 50
  protected _ground: HtmlComponent
  protected _ground_bottom: HtmlComponent
  protected southSoil: HtmlComponent
  protected eastSoil: HtmlComponent
  protected WestSoil: HtmlComponent
  protected NorthSoil: HtmlComponent

  constructor() {
    super("div")
    this._ground = rectangle().class("Terrain-Ground")
    this._ground_bottom = rectangle().class("Terrain-Ground")
    this.southSoil = rectangle().class("Terrain-SoilBottom")
    this.eastSoil = rectangle().class("Terrain-SoilRight")
    this.NorthSoil = rectangle().class("Terrain-SoilNorth")
    this.WestSoil = rectangle().class("Terrain-SoilWest")
    features(
      this._ground as Feature,
      this._ground_bottom as Feature,
      this.southSoil as Feature,
      this.eastSoil as Feature,
      this.NorthSoil as Feature,
      this.WestSoil as Feature
    )
      .apply(this)
      .class("Terrain")
  }

  apply(component: HtmlComponent): HtmlComponent {
    features(
      translation().translateZ(- this._depth)
    ).apply(this._ground_bottom)
    features(
      sizing().height(50, "%"),
      rotation().x(-90),
      position().y(this._length - this._depth),
      translation().translateZ(-this._depth),
      sizing().height(this._depth, "px")
    ).apply(this.southSoil)
    features(
      sizing().height(50, "%"),
      rotation().x(-90).z(-90),
      position()
        .x(this._width / 2)
        .y(this._length / 2 - this._depth),
      translation().translateZ(-this._depth),
      sizing().height(this._depth, "px")
    ).apply(this.eastSoil)
    features(
      sizing().height(50, "%"),
      rotation().x(-90),
      position().y(- this._depth),
      translation().translateZ(-this._depth),
      sizing().height(this._depth, "px")
    ).apply(this.NorthSoil)
    features(
      sizing().height(50, "%"),
      rotation().x(-90).z(-90),
      position()
        .x(- this._width / 2)
        .y(this._length / 2 - this._depth),
      translation().translateZ(-this._depth),
      sizing().height(this._depth, "px")
    ).apply(this.WestSoil)
    return super.apply(component)
  }

  depth(value: number): this {
    this._depth = value
    return this
  }

  length(value: number): this {
    this._length = value
    sizing().width(value).apply(this.eastSoil)
    sizing().width(value).apply(this.WestSoil)
    return sizing().height(value).apply(this)
  }

  width(value: number, unit: string = "px"): this {
    this._width = value
    sizing().width(value, unit).apply(this.southSoil)
    sizing().width(value, unit).apply(this.NorthSoil)
    return sizing().width(value, unit).apply(this)
  }

  soil(material: Material): this {
    material.apply(this.southSoil)
    material.apply(this.eastSoil)
    material.apply(this.NorthSoil)
    material.apply(this.WestSoil)
    return this
  }

  ground(material: Material): this {
    features(sizing().width(100, "%").height(100, "%"), material).apply(
      this._ground
    )
    features(sizing().width(100, "%").height(100, "%"), material).apply(
      this._ground_bottom
    )
    return this
  }
}

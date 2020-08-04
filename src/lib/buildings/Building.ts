import { translation, rotation } from "../../core/transforms"
import { sizing } from "../../core/size"
import { rectangle, Rectangle } from "../../core-html/primitives"
import { material, Material } from "../../core/material"
import * as colors from "../../core/colors"
import { features, url } from "../../core/utils"
import { position } from "../../core/position"
import { StyleProps } from "../../core/types"
import { component } from "../../core-html/component"

import texture1 from "../textures/HighRiseResidential0144_1_500.jpg"

const wall1 = material().texture({
  alignment: ["left", "top"],
  src: url(texture1),
  tileSize: [60, 60],
})

export default function Building(props: {
  width: number
  length: number
  height: number
  style?: CSSStyleDeclaration
}) {
  const Rooftop = features(
    material().color(colors.rgb(200, 200, 200)),
    sizing().width(props.width).height(props.length),
    translation().translateZ(props.height)
  ).apply(rectangle())

  const RightWall = features(
    wall1,
    sizing().width(props.length).height(props.height),
    rotation().x(-90).z(-90),
    position()
      .x(props.width - props.length / 2)
      .y(-props.height + props.length / 2)
  ).apply(rectangle().class("Building-RightWall"))

  const BottomWall = features(
    wall1,
    sizing().width(props.width).height(props.height),
    rotation().x(-90),
    position().y(-props.height + props.length)
  ).apply(rectangle())

  const LeftWall = features(
    rotation().z(90),
    position()
      .x(-props.length / 2)
      .y(-props.width / 2)
  ).apply(wall().class("Building-LeftWall"))

  const TopWall = features(position().y(-props.height)).apply(
    wall().class("Building-TopWall")
  )

  const plan = sizing()
    .width(props.width)
    .height(props.length)
    .apply(component("div"))
    .class("Building")

  const building_pos = features(
      position().x(20 + Math.random()*30 -15).y(30 + Math.random()*50 -25),
      rotation().z(Math.floor(Math.random() * 24) * 15)
    ).apply(plan)

  return building_pos.children(
    TopWall.width(props.width).height(props.height).material(wall1),
    LeftWall.width(props.length).height(props.height).material(wall1),
    BottomWall,
    RightWall,
    Rooftop
  )
}

export type WallProps = StyleProps & {
  material: Material
  width: number
  height: number
}

function wall(): Wall {
  return new Wall()
}

class Wall extends Rectangle {
  constructor() {
    super()
    rotation().x(-90).apply(this)
  }

  material(mat: Material): this {
    return mat.apply(this)
  }

  width(value: number): this {
    return sizing().width(value).apply(this)
  }

  height(value: number): this {
    return sizing().height(value).apply(this)
  }
}

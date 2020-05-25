import * as React from "react"

import { translation, rotation } from "../../core/transforms"
import { sizing } from "../../core/size"
import Rectangle from "../../core/primitives/Rectangle"
import { material, Material } from "../../core/material"
import * as colors from "../../core/colors"
import { features, url } from "../../core/utils"
import { position } from "../../core/position"
import { StyleProps } from "../../core/types"

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
  const Rooftop = React.useMemo(
    () =>
      features(
        material().color(colors.rgb(200, 200, 200)),
        sizing().width(props.width).height(props.length),
        translation().translateZ(props.height)
      ).apply(Rectangle),
    [props.width, props.length, props.height]
  )

  const RightWall = React.useMemo(
    () =>
      features(
        wall1,
        sizing().width(props.length).height(props.height),
        rotation().x(-90).y(90),
        position()
          .x(props.width - props.length)
          .y(-props.height)
      ).apply(Rectangle),
    [props.height, props.length]
  )

  const BottomWall = React.useMemo(
    () =>
      features(
        wall1,
        sizing().width(props.width).height(props.height),
        rotation().x(-90),
        position().y(-props.height + props.length)
      ).apply(Rectangle),
    [props.width, props.height]
  )

  const LeftWall = React.useMemo(
    () =>
      features<React.ComponentType<WallProps>>(
        rotation()
          .initOriginX(() => "left")
          .initOriginY(() => "bottom")
          .z(90),
        position().y(-props.height)
      ).apply(Wall),
    []
  )

  const TopWall = React.useMemo(
    () =>
      features<React.ComponentType<WallProps>>(
        rotation()
          .initOriginX(() => "center")
          .initOriginY(() => "bottom")
          .z(180),
        position().y(-props.height)
      ).apply(Wall),
    []
  )

  return (
    <div className="Building" style={props.style}>
      <TopWall width={props.width} height={props.height} material={wall1} />
      <LeftWall width={props.length} height={props.height} material={wall1} />
      <BottomWall />
      <RightWall />
      <Rooftop />
    </div>
  )
}

export type WallProps = StyleProps & {
  material: Material
  width: number
  height: number
}

function Wall(props: WallProps) {
  const Wall = React.useMemo(
    () =>
      features(
        props.material,
        sizing().width(props.width).height(props.height)
      ).apply(UprightRectangle),
    [props.material, props.width, props.height]
  )
  return <Wall style={props.style} />
}

const UprightRectangle = rotation().x(-90).apply(Rectangle)

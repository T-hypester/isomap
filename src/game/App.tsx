import * as React from "react"

import { features } from "../core/utils"
import Rectangle from "../core/primitives/Rectangle"
import { sizing } from "../core/size"
import Building from "../lib/buildings/Building"
import grass from "../lib/materials/terrain/grass"
import Nav from "../ui/Nav"
import Camera from "../ui/Camera"

import { World } from "./types"
import { MapGrid } from "./dom"

import "./App.css"
import { element } from "../core/primitives/elements"

const CAMERA_ROTATION_ANGLE = 15

export default function App() {
  const [horiz, setHoriz] = React.useState(45)
  const [vert, setVert] = React.useState(60)
  const cameraRef = React.useRef<HTMLDivElement>()

  const world: World = React.useMemo(
    () => ({
      objects: [{
        position: { x: 0, y: 0 },
        object: element('div').style({ backgroundColor: 'green' })
      }],
/*       objects: [
        {
          position: { x: 0, y: 0 },
          object: (
            <>
              <SummerGrass />
              <Building width={60} length={40} height={50} />
            </>
          ),
        },
        {
          position: { x: 0, y: 1 },
          object: <SpringGrass />,
        },
        {
          position: { x: 1, y: 1 },
          object: (
            <>
              <WinterGrass />
              <Building width={60} length={40} height={50} />
            </>
          ),
        },
        {
          position: { x: 1, y: 0 },
          object: <FallGrass />,
        },
      ], */
      size: { width: 2, height: 2, unit: "Cell" },
    }),
    []
  )

  React.useEffect(() => {
    if (cameraRef.current) MapGrid().world(world).apply(cameraRef.current)
  }, [cameraRef.current])

  const SpringGrass = features(
    grass().season("spring"),
    sizing().width(100).height(100)
  ).apply(Rectangle)
  const SummerGrass = features(
    grass().season("summer"),
    sizing().width(100).height(100)
  ).apply(Rectangle)
  const FallGrass = features(
    grass().season("fall"),
    sizing().width(100).height(100)
  ).apply(Rectangle)
  const WinterGrass = features(
    grass().season("winter"),
    sizing().width(100).height(100)
  ).apply(Rectangle)

  return (
    <div className="Viewport">
      <Camera
        ref={cameraRef}
        rotationHorizontal={horiz}
        rotationVertical={vert}
      />
      <Nav
        onRotateUp={() => setVert(vert + CAMERA_ROTATION_ANGLE)}
        onRotateDown={() => setVert(vert - CAMERA_ROTATION_ANGLE)}
        onRotateLeft={() => setHoriz(horiz + CAMERA_ROTATION_ANGLE)}
        onRotateRight={() => setHoriz(horiz - CAMERA_ROTATION_ANGLE)}
      />
    </div>
  )
}

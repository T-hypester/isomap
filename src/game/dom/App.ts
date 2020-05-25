import { element } from "../../core/primitives/elements"

import Camera from "../../ui/dom/Camera"
import Nav from "../../ui/dom/Nav"

import { MapGrid } from "./MapGrid"

import "../App.css"

export default function App() {
  const world = {
    objects: [
      {
        position: { x: 0, y: 0 },
        object: element("div").style({ backgroundColor: "green" }),
      },
    ],
    size: { width: 2, height: 2, unit: "Cell" },
  }

  let horiz: number = 45
  let vert: number = 60
  const camera = Camera()
    .rotation(horiz, vert)
    .children(MapGrid().world(world).tileSize(100))

  return element("div")
    .class("Viewport")
    .children(
      camera,
      Nav()
        .onRotateUp(() => camera.up())
        .onRotateLeft(() => camera.left())
        .onRotateRight(() => camera.right())
        .onRotateDown(() => camera.down())
    )
}

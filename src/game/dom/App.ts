import { sha256 } from "js-sha256"
import * as dat from "dat.gui"
import { url } from "../../core/utils"
import { component, HtmlComponent } from "../../core-html/component"
import Camera from "../../ui/dom/Camera"
import Nav from "../../ui/dom/Nav"
import Building from "../../lib/buildings/Building"
import { translation } from "../../core/transforms"
import skyImg from "../../lib/images/sky.jpg"
import { terrain } from "../../lib/terrain/terrain"
import { material, Material } from "../../core/material"

import { MapGrid, HtmlWorld } from "./MapGrid"

import "../App.css"
import grassImg from "../../lib/terrain/textures/grass.jpg"
import undergroundImg from "../../lib/terrain/textures/underground.png"

const Random_block = [
  function Block_water() {
    return water()
  },
  function Block_land() {
    return land()
  },
  function Block_building() {
    return building().apply(land())
  },
]

function Pick_random_block() {
  const Random_block_num = Math.floor(Math.random() * 3)
  const Picked_random_block = Random_block[Random_block_num]
  return Picked_random_block()
}
function Spawn_loop(){
  const world: HtmlWorld = {
    objects: [
    ],
    size: { width: 10, height: 10, unit: "Cell" },
  }
   for (let x = 0; x < 10; x++){
     for (let y = 0; y < 10; y++){
      world.objects.push({
        position: { x, y },
        object: Pick_random_block(),
      },)
     }
   }
  return world
}
  
export default function App(): HtmlComponent {
  const world = Spawn_loop()

  const map = MapGrid().world(world).tileSize(100)

  let horiz: number = 45
  let vert: number = 60
  const camera = Camera().rotation(horiz, vert)

  //setTimeout(()=>window.location.reload(), 1000)
  function pippoModeOn() {
    class Camera_gui {
      Ciao() {
        alert("ciao")
      }
      Spawn_block() {
        //Spawn()
      }
    }

    var text = new Camera_gui()
    var gui = new dat.GUI()
    gui.add(text, "Ciao")
    gui.add(text, "Spawn_block")
  }
  function pippoModeTest() {
    const password = prompt("Please enter your password")
    var Hash = sha256(password)
    if (
      Hash == "afbce4682fa147bea2691ab25a0c45e4ca073aa93aac45e6f9d11cfbb3ba6482"
    ) {
      pippoModeOn()
    } else {
      alert("Retry")
    }
  }
  return component("div")
    .class("Viewport")
    .style({
      backgroundImage: url(skyImg),
      backgroundSize: "cover",
      backgroundPositionY: "0%",
    })
    .children(
      camera.children(map),
      Nav()
        .onRotateUp(() => camera.up())
        .onRotateLeft(() => camera.left())
        .onRotateRight(() => camera.right())
        .onRotateDown(() => camera.down())
        .onPippo(() => pippoModeTest())
    )
}

function building() {
  return Building({
    width: 60,
    height: 50,
    length: 40,
  })
}

function land() {
  return terrain()
    .ground(
      material().texture({
        src: url(grassImg),
        tileSize: 100,
      })
    )
    .width(100)
    .length(100)
    .depth(50)
    .soil(underground())
}

function underground(): Material {
  return material().texture({
    src: url(undergroundImg),
    alignment: ["center", "top"],
    tileSize: 100,
  })
}

function water(): HtmlComponent {
  return translation()
    .translateZ(-10)
    .apply(
      terrain()
        .width(100)
        .length(100)
        .depth(40)
        .ground(material().color("rgba(0,140,180,0.9)"))
        .soil(material().color("rgba(0,140,180,0.9)"))
    )
}

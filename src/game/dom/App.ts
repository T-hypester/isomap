import { sha256} from 'js-sha256';
import * as dat from "dat.gui"
import { url } from "../../core/utils"
import { component, HtmlComponent } from "../../core-html/component"
import Camera from "../../ui/dom/Camera"
import Nav from "../../ui/dom/Nav"
import Building from "../../lib/buildings/Building"
import { translation } from "../../core/transforms"
import { position } from "../../core/position"
import skyImg from "../../lib/images/sky.jpg"
import { terrain } from "../../lib/terrain/terrain"
import { material, Material } from "../../core/material"

import { MapGrid, HtmlWorld } from "./MapGrid"

import "../App.css"
import grassImg from "../../lib/terrain/textures/grass.jpg"
import undergroundImg from "../../lib/terrain/textures/underground.png"
import { REPL_MODE_SLOPPY } from "repl"

export default function App(): HtmlComponent {
  const world: HtmlWorld = {
    objects: [
      {
        position: { x:0, y:0},
        object: (building()).apply(land()),
      },
      {
        position: { x:Math.floor(Math.random() * 5), y:Math.floor(Math.random() * 5)},
        object: (building()).apply(land()),
      },
      {
        position: { x:Math.floor(Math.random() * 5), y:Math.floor(Math.random() * 5)},
        object: (building()).apply(land()),
      },
      {
        position: { x:Math.floor(Math.random() * 5), y:Math.floor(Math.random() * 5)},
        object: (land()),
      },
      {
        position: { x:Math.floor(Math.random() * 5), y:Math.floor(Math.random() * 5)},
        object: (building()).apply(land()),
      },
      {
        position: { x:Math.floor(Math.random() * 5), y:Math.floor(Math.random() * 5)},
        object: (building()).apply(land()),
      },
      {
        position: { x:Math.floor(Math.random() * 5), y:Math.floor(Math.random() * 5)},
        object: (land()),
      },
      {
        position: { x:Math.floor(Math.random() * 5), y:Math.floor(Math.random() * 5)},
        object: (land()),
      },
      {
        position: { x:Math.floor(Math.random() * 5), y:Math.floor(Math.random() * 5)},
        object: (building()).apply(land()),
      },
      {
        position: { x:Math.floor(Math.random() * 5), y:Math.floor(Math.random() * 5)},
        object: (land()),
      },
      {
        position: { x:Math.floor(Math.random() * 5), y:Math.floor(Math.random() * 5)},
        object: (building()).apply(land()),
      },
      {
        position: { x:Math.floor(Math.random() * 5), y:Math.floor(Math.random() * 5)},
        object: (building()).apply(land()),
      },
      {
        position: { x:Math.floor(Math.random() * 5), y:Math.floor(Math.random() * 5)},
        object: (land()),
      },
      {
        position: { x:Math.floor(Math.random() * 5), y:Math.floor(Math.random() * 5)},
        object: (land()),
      },
      {
        position: { x:Math.floor(Math.random() * 5), y:Math.floor(Math.random() * 5)},
        object: (building()).apply(land()),
      },
      {
        position: { x:Math.floor(Math.random() * 5), y:Math.floor(Math.random() * 5)},
        object: (land()),
      },
      {
        position: { x:Math.floor(Math.random() * 5), y:Math.floor(Math.random() * 5)},
        object: (building()).apply(land()),
      },
      {
        position: { x:Math.floor(Math.random() * 5), y:Math.floor(Math.random() * 5)},
        object: (building()).apply(land()),
      },
      {
        position: { x:Math.floor(Math.random() * 5), y:Math.floor(Math.random() * 5)},
        object: (land()),
      },
      {
        position: { x:Math.floor(Math.random() * 5), y:Math.floor(Math.random() * 5)},
        object: (water()),
      },
      {
        position: { x:Math.floor(Math.random() * 5), y:Math.floor(Math.random() * 5)},
        object: (water()),
      },
      {
        position: { x:Math.floor(Math.random() * 5), y:Math.floor(Math.random() * 5)},
        object: (water()),
      },
    ],
    size: { width: 3, height: 2, unit: "Cell" },
  }
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
    }

    var text = new Camera_gui()
    var gui = new dat.GUI()
    gui.add(text, "Ciao")
  }
  function pippoModeTest (){
   const password = prompt('Please enter your password')
   var Hash = sha256(password)
   if (Hash == ("3c27bd716a3944bb175fadcb57c41495354ae6dffc0011516778fde8f1268aaf")){
     pippoModeOn()
   }
   else{
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

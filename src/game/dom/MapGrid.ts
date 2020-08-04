import { HtmlComponent, component } from "../../core-html/component"

import { World, WorldObject } from "../types"

import "../styles.css"

interface HtmlWorldObject extends WorldObject {
  object: HtmlComponent
}

export interface HtmlWorld extends World {
  objects: HtmlWorldObject[]
}

export function MapGrid(): HtmlMapgGrid {
  return new HtmlMapgGrid()
}

class HtmlMapgGrid extends HtmlComponent {
  protected _tileSize: number
  private _world?: HtmlWorld
  protected tiles: HtmlComponent[]

  constructor() {
    super("div")
    this.class("MapGrid")
  }

  world(world: HtmlWorld): this {
    this._world = world
    this.tiles = []

    for (let y = 0; y < world.size.height; y++)
      for (let x = 0; x < world.size.width; x++) {
        this.tiles.push(component("div"))
      }

    world.objects.forEach((obj) => {
      this.tiles[obj.position.x + obj.position.y * world.size.width] =
        obj.object
    })

    return this
  }

  tileSize(value: number): this {
    this._tileSize = value
    return this
  }

  apply<C extends HtmlComponent>(target: C): C {
    this.style({
      gridTemplateColumns: `repeat(${this._world.size.width}, ${this._tileSize}px)`,
      gridTemplateRows: `repeat(${this._world.size.height}, ${this._tileSize}px)`,
    })

    this.tiles.forEach((tile) => {
      const cell = component("div").class("MapGrid-Cell")
      tile.apply(cell)
      cell.apply(this)
    })
    return super.apply(target) as C
  }
}

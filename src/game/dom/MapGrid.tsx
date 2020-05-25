import { HtmlElement, element } from "../../core/primitives/elements"

import { World, WorldObject } from "../types"

import "../styles.css"

interface HtmlWorldObject extends WorldObject {
  object: HtmlElement
}

interface HtmlWorld extends World {
  objects: HtmlWorldObject[]
}

export function MapGrid(): HtmlMapgGrid {
  return new HtmlMapgGrid()
}

class HtmlMapgGrid extends HtmlElement {
  protected _world: HtmlWorld
  protected _tileSize: number
  protected tiles: HtmlElement[]

  constructor() {
    super("div")
    this.class("MapGrid")
  }

  world(world: HtmlWorld): this {
    this._world = world
    this.tiles = []

    for (let y = 0; y < world.size.height; y++)
      for (let x = 0; x < world.size.width; x++) {
        this.tiles.push(element("div"))
      }

    world.objects.forEach((obj) => {
      this.tiles[obj.position.x + obj.position.y * world.size.width] = obj.object
    })

    return this
  }

  tileSize(value: number): this {
    this._tileSize = value
    return this
  }

  apply(target: HTMLElement): HTMLElement {
    this.style({
      gridTemplateColumns: `repeat(${this._world.size.width}, ${this._tileSize}px)`,
      gridTemplateRows: `repeat(${this._world.size.height}, ${this._tileSize}px)`,
    })
    this.tiles.forEach((tile) => {
      const cell = element('div').class('MapGrid-Cell')
      tile.apply(cell.htmlElement())
      cell.apply(this.htmlElement())
    })
    return super.apply(target)
  }
}

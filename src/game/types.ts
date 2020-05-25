import { Size2D, Point, SceneObject } from "../core/types"

export interface WorlMapProps {
  world: World
}

declare interface AvailableTerrains {
  // Interface where to merge terrain id declarations
}

type TerrainId = keyof AvailableTerrains

interface LookupEntity<T> {
  id: T
}

export interface Terrain extends LookupEntity<TerrainId> {}

export interface Structure {}

export interface Cell {
  terrain: Terrain
  structure?: Structure
}

type TwoDee = 'x' | 'y'

export interface WorldObject {
  position: Point<TwoDee>
  object: any
}

export interface World {
  size: Size2D
  objects: WorldObject[]
}

export type WorldDesc = {
  size: [number, number]
  cells: CellDesc[]
}

export type CellDesc = {
  terrain: TerrainId
  structure?: string
}

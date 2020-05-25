import * as React from "react"

import { StyleProps } from "../../core/types"
import { World } from "../types"
import { makeMapGridCell } from "../MapGridCell"

import '../styles.css'

export const MapGrid = ReactMapGrid

function ReactMapGrid(
  props: {
    world: World
    tileSize: number
  } & StyleProps
) {
  const MapGridCell = React.useMemo(() => makeMapGridCell(), [])

  const style = React.useMemo(
    () => ({
      gridTemplateColumns: `repeat(${props.world.size.width}, ${props.tileSize}px)`,
      gridTemplateRows: `repeat(${props.world.size.height}, ${props.tileSize}px)`,
      ...props.style,
    }),
    [props.style, props.world.size.width, props.world.size.height]
  )

  const [tiles, setTiles] = React.useState(() => {
    const tiles: JSX.Element[] = []
    for (let y = 0; y < props.world.size.height; y++)
      for (let x = 0; x < props.world.size.width; x++) {
        tiles.push(<div key={`tile_${x}_${y}`} />)
      }
    return tiles
  })

  React.useEffect(() => {
    props.world.objects.forEach((obj) => {
      tiles[obj.position.x + obj.position.y * props.world.size.width] = (
        <MapGridCell key={`object_${obj.position.x}_${obj.position.y}`}>
          {obj.object}
        </MapGridCell>
      )
    })
    setTiles(tiles)
  }, [props.world.objects, props.world.size.width])

  return (
    <div className="MapGrid" style={{ ...style, ...props.style }}>
      {tiles}
    </div>
  )
}

import * as React from "react"

export function makeMapGridCell() {
  return function MapGridCell(props: {
    children: React.ReactNode
  }): JSX.Element {
    return <div className="MapGrid-Cell">{props.children}</div>
  }
}

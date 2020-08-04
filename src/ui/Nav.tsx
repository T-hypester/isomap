import * as React from "react"

import "./Nav.css"

export default function Nav(props: {
  onRotateDown(): void
  onRotateLeft(): void
  onRotateRight(): void
  onRotateUp(): void
  onZoomIn?(): void
  onZoomOut?(): void
  onPippo(): void
}) {
  return (
    <div className="Nav">
      <button className="Nav-Up" onClick={props.onRotateUp}>
        ^
      </button>
      <button className="Nav-Left" onClick={props.onRotateLeft}>
        &lt;
      </button>
      <button className="Nav-Right" onClick={props.onRotateRight}>
        &gt;
      </button>
      <button className="Nav-Down" onClick={props.onRotateDown}>
        v
      </button>
      <button className="Nav-pippo" onClick={props.onPippo}>
        :)
      </button>
    </div>
  )
}

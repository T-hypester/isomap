import * as React from "react"

import './Face.css'

export default function Rectangle(props: JSX.IntrinsicElements["div"]) {
  return <div className={`${props.className || ""} Face`} {...props}></div>
}

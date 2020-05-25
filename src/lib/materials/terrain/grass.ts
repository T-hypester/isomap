import { Material } from "../../../core/material"
import * as colors from "../../../core/colors"

export default function grass() {
  return new Grass()
}

type Season = "spring" | "summer" | "autumn" | "fall" | "winter"

class Grass extends Material {
  constructor() {
    super()
    this.season('spring')
  }

  season(value: Season): this {
    switch (value) {
      case "autumn":
      case "fall":
        return this.color(colors.literal("yellowgreen"))
      case "spring":
        return this.color(colors.literal("seagreen"))
      case "summer":
        return this.color(colors.literal("forestgreen"))
      case "winter":
        return this.color(colors.literal("darkolivegreen"))
    }
  }
}

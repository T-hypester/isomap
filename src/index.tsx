import { HtmlComponent } from "./core-html/component"
import App from "./game/dom/App"

App().apply(HtmlComponent.fromNative(document.getElementById("app")))


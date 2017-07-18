import {join} from "path"

export function generateClient() {
  this.sourceRoot(join(__dirname, "../../../templates/app"))
}

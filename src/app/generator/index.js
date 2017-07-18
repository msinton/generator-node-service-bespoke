import yeoman from "yeoman-generator"

import {generateClient} from "./generate-client"
import {writing} from "./writing"
import {prompting} from "./prompting"
import {end} from "./end"

export const generator = yeoman.Base.extend({
  generateClient,
  prompting,
  writing,
  end,
})


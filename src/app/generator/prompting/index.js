import {prompts} from "./prompts"
import {flow} from "./flow"

export function prompting() {
  const prompt = this.prompt.bind(this)
  const log = this.log.bind(this)

  return flow({prompt, log}, prompts)
    .then((props) => {
      this.props = props
    })
}

import { execSync } from 'child_process'
import format from 'lib/format'
import { defaultVSCodeSettingsJSON } from './vscode.constants'

async function handler() {
  createVSCodeFolder()
}

function createVSCodeFolder() {
  console.log('Creating VSCode folder with sensible defaults...')
  execSync(`echo "${defaultVSCodeSettingsJSON}" > .vscode/settings.json`)
  format()
}

export default handler

import { execSync } from 'child_process'
import { defaultVSCodeSettingsJSON } from './vscode.constants'

async function handler() {
  createVSCodeFolder()
}

function createVSCodeFolder() {
  console.log('Creating VSCode folder with sensible defaults...')
  execSync(`echo "${defaultVSCodeSettingsJSON}" > .vscode/settings.json`)
}

export default handler

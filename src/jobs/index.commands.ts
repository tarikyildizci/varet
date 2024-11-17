import { gitCommands } from './git/git.commands'
import { prettierCommands } from './prettier/prettier.commands'
import { vscodeCommands } from './vscode/vscode.commands'

export const commands = {
  ...gitCommands,
  ...prettierCommands,
  ...vscodeCommands,
}

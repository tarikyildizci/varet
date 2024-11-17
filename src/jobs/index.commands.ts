import type { Command } from 'types/command'
import { gitCommands } from './git/git.index'
import { prettierCommands } from './prettier/prettier.index'
import { vscodeCommands } from './vscode/vscode.index'

export const commands: Command[] = [
  ...gitCommands,
  ...prettierCommands,
  ...vscodeCommands,
]

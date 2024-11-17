import type { Command } from 'types/command'
import handler from './vscode.handlers'

export const vscodeCommands: Command = {
  vscode: handler,
}

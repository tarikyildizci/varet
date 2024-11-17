import type { Command } from 'types/command'
import handler from './vscode.handlers'

export const vscodeCommands: Command[] = [
  {
    name: 'vscode',
    description: '.vscode, organize imports, formatter, ts',
    handler,
  },
]

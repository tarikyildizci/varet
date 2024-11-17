import type { Command } from 'types/command'
import handler from './git.handler'

export const gitCommands: Command[] = [
  {
    name: 'git',
    description: 'git init, .gitignore',
    handler,
  },
]

import type { Command } from 'types/command'
import handler from './prettier.handler'

export const prettierCommands: Command[] = [
  {
    name: 'prettier',
    description: '.prettierrc, prettier to devDeps, run format',
    handler,
  },
]

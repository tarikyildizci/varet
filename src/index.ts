#!/usr/bin/env node

import { select, Separator } from '@inquirer/prompts'
import { program } from 'commander'
import format from 'lib/format'
import { exit } from 'process'
import type { CommandHandler } from 'types/command'
import { commands } from './jobs/index.commands.js'

program.command('exec').action(async () => {
  const choice = await select({
    message: 'Choose a job to run.',
    choices: [
      new Separator('General'),
      {
        value: 'git',
        description: 'git init, master branch, gitflow',
      },
      {
        value: 'prettier',
        description: '.prettierrc, prettier to devDeps, yarn format',
      },
      {
        value: 'vscode',
        description: '.vscode, organize imports, formatter, ts',
      },
      {
        value: 'husky',
        description: '.husky, .commitlintrc',
      },
      new Separator('Frontend'),
      {
        value: 'tailwind',
        description: 'tailwind to devDeps, tailwind.config.ts',
      },
      new Separator('Backend'),
      {
        value: 'dotenv',
        description: 'create .env.example + .env, install dotenv',
      },
    ],
  })
  const choiceHandler = getHandler(choice)
  try {
    await choiceHandler()
    format()
    exit(0)
  } catch (error) {
    console.error('Job handler failed to run smoothly.')
    exit(0)
  }
})

const getHandler = (job: string): CommandHandler => {
  if (job in commands) {
    return commands[job]
  }
  throw new Error('Unknown Command')
}

program.parse(process.argv)

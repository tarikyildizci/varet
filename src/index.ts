#!/usr/bin/env node

import { ExitPromptError } from '@inquirer/core'
import { confirm, search } from '@inquirer/prompts'
import { program } from 'commander'
import format from 'lib/format'
import fuzzy from 'lib/fuzzy'
import { exit } from 'process'
import type { CommandHandler } from 'types/command'
import { commands } from './jobs/index.commands.js'

const choices = [
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
  {
    value: 'tailwind',
    description: 'tailwind to devDeps, tailwind.config.ts',
  },
  {
    value: 'dotenv',
    description: 'create .env.example + .env, install dotenv',
  },
]

program.command('exec').action(async () => {
  try {
    const choice = await search({
      message: 'Search for a job to run:',
      source: (term, _options) => {
        return term
          ? fuzzy(choices, term, ({ value }) => value).map((fuzz) => fuzz.item)
          : choices
      },
    })
    const choiceHandler = getHandler(choice)
    await choiceHandler()

    const shouldFormat = await confirm({
      message: 'Job ran successfully. Would you like to format?',
      default: true,
    })
    shouldFormat && format()

    exit(0)
  } catch (error) {
    if (error instanceof ExitPromptError) {
      console.log('Exiting, bye bye!')
      exit(0)
    }
    console.error('Job handler failed to run smoothly.')
    exit(0)
  }
})

function getHandler(job: string): CommandHandler {
  if (job in commands) {
    return commands[job]
  }
  throw new Error('Unknown Command')
}

program.parse(process.argv)

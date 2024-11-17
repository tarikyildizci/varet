#!/usr/bin/env node

import { ExitPromptError } from '@inquirer/core'
import { confirm, search } from '@inquirer/prompts'
import { program } from 'commander'
import displayLogo from 'lib/displayLogo'
import format from 'lib/format'
import fuzzy from 'lib/fuzzy'
import { exit } from 'process'
import type { CommandHandler } from 'types/command'
import SkipError from 'types/skipError'
import { VaretError } from 'types/varetError'
import { commands } from './jobs/index.commands.js'

const chocies = commands.map((command) => ({
  value: command.name,
  description: command.description,
}))

program.command('exec').action(async () => {
  displayLogo()
  try {
    const choice = await search({
      message: 'Search for a job to run:',
      source: (term, _options) => {
        return term
          ? fuzzy(chocies, term, ({ value }) => value).map((fuzz) => fuzz.item)
          : chocies
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
    if (error instanceof SkipError) {
      console.log('Job partially successfull.')
      exit(0)
    }
    if (error instanceof VaretError) {
      console.error(error.message)
      exit(0)
    }
    console.error('Job handler failed to run smoothly!')
    console.error(error)
    exit(0)
  }
})

function getHandler(job: string): CommandHandler {
  const foundCommand = commands.find((command) => command.name === job)
  if (foundCommand) {
    return foundCommand.handler
  }
  throw new Error('Unknown Command')
}

program.parse(process.argv)

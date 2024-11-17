#!/usr/bin/env node

import { gitPlugin } from '@varet/core'
import { Command } from 'commander'
import displayLogo from 'lib/displayLogo'
import { insertPlugin } from 'lib/insertPlugin'
import loadGlobalPlugins from 'lib/loadGlobalPlugins'

const program = new Command()

;(async () => {
  // Load global plugins
  insertPlugin(program, gitPlugin)
  await loadGlobalPlugins(program)

  program.addHelpText('beforeAll', (displayLogo() as any)?.string)

  program
    .command('version')
    .description('Displays the current version of varet')
    .action(() => {
      console.log('0.1.0')
    })

  program
    .command('ls')
    .description('lists all available jobs')
    .action(() => {
      console.log('Here are all the jobs you have: ')
      program.commands
        .map((c) => ({
          name: c.name(),
          description: c.description(),
        }))
        .forEach((c) => console.log(`- ${c.name} - ${c.description}`))
    })

  // Parse CLI commands
  program.parse(process.argv)
})()

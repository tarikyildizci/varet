import type { VaretPlugin } from '@varet/core'
import type { Command } from 'commander'
import getJobHandler from './getJobHandler'

export function insertPlugin(program: Command, plugin: VaretPlugin) {
  // console.log('Inserting plugin: ', plugin.name + ' - ' + plugin.description)

  for (const job of plugin.jobs) {
    program
      .command(job.name)
      .description(job.description)
      .action(getJobHandler(job.steps))
    // console.log('Inserted job: ', job.name)
  }
  return program
}

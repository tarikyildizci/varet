import type { VaretPlugin } from '@varet/core'
import { exec } from 'child_process'
import type { Command } from 'commander'
import { existsSync } from 'fs'
import fs from 'fs/promises'
import path from 'path'
import { promisify } from 'util'
import getJobHandler from './getJobHandler'

const execAsync = promisify(exec)

// Get the global directory path for Yarn
async function getYarnGlobalDir(): Promise<string> {
  try {
    const { stdout } = await execAsync('yarn global dir')
    return stdout.trim() // Trim to remove any extra whitespace
  } catch (error) {
    console.error('Failed to get Yarn global directory:', error)
    throw error
  }
}

// Get global Yarn modules by reading package.json
async function getYarnGlobalModules(): Promise<string[]> {
  try {
    const globalDir = await getYarnGlobalDir()
    const packageJsonPath = path.join(globalDir, 'package.json')

    // Read package.json from the Yarn global directory
    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'))
    const dependencies = packageJson.dependencies || {}

    return Object.keys(dependencies) // Return list of dependency names
  } catch (error) {
    console.error('Failed to fetch global Yarn modules:', error)
    return []
  }
}

// Load Yarn global modules dynamically
async function loadYarnGlobalModules(program: Command) {
  try {
    const globalModules = (await getYarnGlobalModules()).filter((m) =>
      m.includes('varet-plugin'),
    )

    // console.log('Global Yarn Modules Found:', globalModules)

    for (const moduleName of globalModules) {
      try {
        const modulePath = path.join(
          await getYarnGlobalDir(),
          'node_modules',
          moduleName,
          '/dist/index.js',
        )
        if (existsSync(modulePath)) {
          const module = await import(modulePath) // Lazy import using resolved path
          // console.log(`Module "${moduleName}" loaded successfully.`)
          // console.log('Exported keys:', Object.keys(module))
          if ('default' in module) {
            const plugin = module.default as VaretPlugin
            // console.log(
            //   'Importing plugin: ',
            //   plugin.name + ' - ' + plugin.description,
            // )
            for (const job of plugin.jobs) {
              program
                .command(job.name)
                .description(job.description)
                .action(getJobHandler(job.steps))
            }
          }
        } else {
          // console.log('no bueno: ', modulePath)
        }
      } catch (error) {
        console.error(`Failed to load module "${moduleName}":`, error)
      }
    }
  } catch (error) {
    console.error('Error loading Yarn global modules:', error)
  }
}

// Example: Load global Yarn modules
export default loadYarnGlobalModules

import { confirm } from '@inquirer/prompts'
import { execSync } from 'child_process'
import { defaultGitIgnore } from './git.constant'

async function handler() {
  const shouldCreateGitIgnore = await confirm({
    message: 'Create recommended .gitignore?',
    default: true,
  })

  gitInit()

  shouldCreateGitIgnore && createGitIgnore()
}

function gitInit() {
  console.log("Running 'git init'...")
  execSync('git init')
}

function createGitIgnore() {
  console.log('Creating a .gitignore with sensible defaults...')
  execSync(`echo "${defaultGitIgnore}" >> .gitignore`)
}

export default handler

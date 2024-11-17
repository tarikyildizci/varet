import { execSync } from 'child_process'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import detectPackageManager, {
  type PackageManager,
} from 'lib/detectPackageManager'
import path from 'path'
import { defaultPrettierrcConfig } from './prettier.constants'

async function handler() {
  createPrettierrc()
  const packageManager = detectPackageManager(process.cwd())
  installPrettier(packageManager)
  addPrettierScript()
}

function createPrettierrc() {
  console.log('Creating .prettierrc file with sensible defaults.')
  execSync(`echo "${defaultPrettierrcConfig}" > .prettierrc`)
}

function installPrettier(packageManager: PackageManager): void {
  let installCommand: string

  switch (packageManager) {
    case 'npm':
      installCommand = 'npm install prettier --save-dev'
      break
    case 'yarn':
      installCommand = 'yarn add prettier --dev'
      break
    case 'pnpm':
      installCommand = 'pnpm add prettier --save-dev'
      break
    default:
      throw new Error('Unsupported or unknown package manager.')
  }

  console.log(`Installing Prettier using ${packageManager}...`)
  execSync(installCommand, {
    cwd: process.cwd(),
    stdio: 'inherit',
  })
}

function addPrettierScript(): void {
  console.log('Adding Prettier format script to package.json....')

  const packageJsonPath = path.join(process.cwd(), 'package.json')

  if (!existsSync(packageJsonPath)) {
    throw new Error('package.json not found in the project.')
  }

  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'))

  packageJson.scripts = packageJson.scripts || {}
  packageJson.scripts['format'] = 'prettier --write .'

  writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))

  console.log('Running format command...')
  execSync('yarn format')
}

export default handler

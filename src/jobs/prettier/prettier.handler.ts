import { execSync } from 'child_process'
import { writeFileSync } from 'fs'
import detectPackageManager, {
  type PackageManager,
} from 'lib/detectPackageManager'
import readPackageJson from 'lib/readPackageJson'
import ora from 'ora'
import SkipError from 'types/skipError'
import { defaultPrettierrcConfig } from './prettier.constant'

const message = ora()

async function handler() {
  createPrettierrc()
  const packageManager = detectPackageManager(process.cwd())
  installPrettier(packageManager)
  addPrettierScript()
}

function createPrettierrc() {
  message.start('Creating .prettierrc file with sensible defaults...')
  execSync(`echo "${defaultPrettierrcConfig}" > .prettierrc`)
  message.succeed('Created .prettierrc file.')
}

function installPrettier(packageManager: PackageManager): void {
  message.start('Finding preferred package manager...')
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
      message.info('Unknown package manager, skipping installation.')
      throw new SkipError('Unknown package manager, skipping installation.')
  }

  message.succeed(`Found package manager: ${packageManager}`)

  message.start(`Installing Prettier using ${packageManager}...`)

  execSync(installCommand)
  message.succeed('Installed prettier as a dev dependency.')
}

function addPrettierScript(): void {
  message.start('Adding format script to package.json...')

  const { packageJsonPath, packageJsonContent } = readPackageJson()

  packageJsonContent.scripts = packageJsonContent.scripts || {}
  packageJsonContent.scripts['format'] = 'prettier --write .'

  writeFileSync(packageJsonPath, JSON.stringify(packageJsonContent, null, 2))
  message.succeed('Added format script to package.json.')
}

export default handler

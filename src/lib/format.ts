import { execSync } from 'child_process'
import readPackageJson from './readPackageJson'

function format(path: string = '') {
  const formatScript = getFormatScript()
  if (formatScript) {
    execSync(formatScript)
    return
  }
  console.log('Format script not found.')

  const hasPrettier = checkIfPrettierInstalled()
  if (hasPrettier) {
    execSync(`node prettier --write ${path}`)
    return
  }
  console.log('Prettier not found.')
}

function getFormatScript() {
  console.log('Checking if format script exists...')
  const { packageJsonContent } = readPackageJson()
  packageJsonContent.scripts = packageJsonContent.scripts || {}
  return packageJsonContent.scripts['format'] as string | undefined
}

function checkIfPrettierInstalled() {
  console.log('Checking if prettier exists...')
  const { packageJsonContent } = readPackageJson()
  packageJsonContent.devDependencies = packageJsonContent.devDependencies || {}
  return !!packageJsonContent.devDependencies['prettier']
}

export default format

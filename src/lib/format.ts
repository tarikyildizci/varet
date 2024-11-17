import { execSync } from 'child_process'
import readPackageJson from './readPackageJson'

function format(path: string = '') {
  const hasPrettier = checkIfPrettierInstalled()
  if (hasPrettier) {
    execSync(`node prettier --write ${path}`)
  }
}

function checkIfPrettierInstalled() {
  console.log('Checking if prettier exists...')
  const { packageJsonContent } = readPackageJson()
  packageJsonContent.devDependencies = packageJsonContent.devDependencies || {}
  return !!packageJsonContent.devDependencies['prettier']
}

export default format

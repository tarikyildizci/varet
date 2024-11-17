import { existsSync, readFileSync } from 'fs'
import path from 'path'

function readPackageJson() {
  const packageJsonPath = path.join(process.cwd(), 'package.json')

  if (!existsSync(packageJsonPath)) {
    throw new Error('package.json not found in the project.')
  }

  const packageJsonContent = JSON.parse(readFileSync(packageJsonPath, 'utf8'))
  return {
    packageJsonPath,
    packageJsonContent,
  }
}

export default readPackageJson

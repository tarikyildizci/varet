import { existsSync } from 'fs'
import path from 'path'

export type PackageManager = 'npm' | 'yarn' | 'pnpm' | 'unknown'

function detectPackageManager(projectPath: string): PackageManager {
  const lockFiles: Record<PackageManager, string> = {
    npm: 'package-lock.json',
    yarn: 'yarn.lock',
    pnpm: 'pnpm-lock.yaml',
    unknown: '',
  }

  for (const [manager, lockFile] of Object.entries(lockFiles)) {
    if (lockFile && existsSync(path.join(projectPath, lockFile))) {
      return manager as PackageManager
    }
  }

  return 'unknown'
}

export default detectPackageManager

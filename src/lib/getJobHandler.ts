import type { Step } from '@varet/core'
import ora from 'ora'

const getJobHandler = (steps: Array<Step>) => async () => {
  for (const step of steps) {
    const message = ora()
    await step.handler(message)
  }
  console.log('Job complete 🎉')
}

export default getJobHandler

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

export const Argv = yargs(hideBin(process.argv))
  .option('m', {
    alias: 'mode',
    type: 'string',
    demandOption: true,
    describe: 'Execution mode',
  })
  .check((argv) => {
    if (argv.mode !== 'development' && argv.mode !== 'production') {
      throw 'Mode must be development or production'
    }
    return true
  })
  .parseSync()

import * as fs from 'fs-extra'

// Sync:
try {
  fs.copySync('tmp/myfile', 'tmp/mynewfile')
  console.log('success!')
} catch (err) {
  console.error(err)
}

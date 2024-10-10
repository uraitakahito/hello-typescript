import fse from 'fs-extra/esm'

// Sync:
try {
  fse.copySync('tmp/myfile', 'tmp/mynewfile')
  console.log('success!')
} catch (err) {
  console.error(err)
}

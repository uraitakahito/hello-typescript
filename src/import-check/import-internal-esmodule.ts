// When importing ES modules without using a bundler or transpiler, file extensions are required:
//   https://nodejs.org/api/esm.html#esm_mandatory_file_extensions
import message from './exported-esmodule.js';

console.log('import-check-1.js');

console.log(message);

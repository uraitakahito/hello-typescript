// index.ts
import { format } from 'date-fns'

console.log(format(new Date(), 'yyyy-MM-dd'))

throw new Error('MY_ERROR')

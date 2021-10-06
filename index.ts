import * as fs from 'fs'

const user = 'ddaniel'
const timeSeparator = new RegExp('(/)|( )|(:)', 'g')
const timePrefix = new Date().toLocaleString().replace(timeSeparator, '-') + `-${user}`

console.log(timePrefix)
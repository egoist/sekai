#!/usr/bin/env node

require('colorful').toxic();

if (!process.argv[2]) {
  console.log('sekai ~ ' + require('../package').version.green);
  console.log('Kono nice sekai in command line'.grey);
  console.log('  $ '.cyan + 'sekai say word');
  console.log('  $ '.cyan + 'sekai get public');
  console.log('  $ '.cyan + 'sekai get username');
  return;
}

var insekai = require('..');

insekai(process.argv.slice(2));
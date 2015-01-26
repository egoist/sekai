#!/usr/bin/env node

require('colorful').toxic();

if (!process.argv[2]) {
  console.log('sekai ~ ' + require('../package').version.green);
  console.log('Kono nice sekai in command line'.grey);
  console.log('  $ '.cyan + 'sekai key YOUR_PRIVATE_KEY');
  console.log('  $ '.cyan + 'sekai say word');
  console.log('  $ '.cyan + 'sekai get public [page]');
  console.log('  $ '.cyan + 'sekai get follow [page]');
  console.log('  $ '.cyan + 'sekai get username [page]');
  console.log('  $ '.cyan + 'sekai reply TOPIC_ID');
  return;
}

var insekai = require('..');

insekai(process.argv.slice(2));
var world = require('./lib/world');

// argv
// [0] => command: say/get
// [1] => "word" or public/mine/username

module.exports = function(argv) {
  var command = argv[0];
  var target = argv[1];

  world.run(command, target);
}
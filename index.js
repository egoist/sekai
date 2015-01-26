var world = require('./lib/world');

// argv
// [0] => command: say/get
// [1] => "word" or public/follow/username
// [2] => (get) page 

module.exports = function(argv) {
  var command = argv[0];
  var target = argv[1];
  var soldiers = argv[2];

  world.run(command, target, soldiers);
}
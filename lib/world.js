var fs = require('fs');
var request = require('request');

exports.run = function (command, target) {
  var home = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;

  if(command == 'key') {
    if (target) {

      var json = {
        key: target
      };
      json = JSON.stringify(json);

      fs.writeFile(home + '/.sekaiconfig', json, function (err) {
        if (err) throw err;
        console.log('Your private key is saved!'.green);
      });
    }
  }

  if(command == 'say') {
    fs.readFile(home + '/.sekaiconfig', function (err, data) {
      if (err) {
        console.log('You don\' have a valid private key stored'.red);
        console.log('You may try:'.grey);
        console.log('  $ '.cyan + 'sekai key YOUR_PRIVATE_KEY');
        return;
      }
      var key = JSON.parse(data).key;
      var ua = process.env.TERM_PROGRAM || process.platform;
      request.post({
        headers: {'content-type' : 'application/x-www-form-urlencoded'},
        url:     'http://insekai.com/api/status/new',
        body:    "user_private_key=" + key + "&is_private=0&content=" + target + '&ua=' + ua
      }, function(error, response, body){
        if (error) throw error;
        var result = JSON.parse(body);
        if (result.status == 'good') {
          console.log('What you said is so damn right!'.green + ' see https://insekai.com/t/' + result.tokio_id);
        } else {
          console.log('Sorry, I met some issue'.red);
          console.log(body);
        }
      });
    });
  }

  if (command == 'get') {
    if (target == 'public') {
      request('http://insekai.com/api/latest?limit=8', function (error, response, body) {
        if (!error && response.statusCode == 200) {
          var content = JSON.parse(body);
          for (var order in content) {
            console.log(content[order].username.yellow);
            console.log(content[order].content.cyan);
          }
        }
      })
    } else if (target == 'mine') {

    } else {
      request('http://insekai.com/api/' + target +'/timeline?limit=8', function (error, response, body) {
        if (!error && response.statusCode == 200) {
          var content = JSON.parse(body);
          for (var order in content) {
            console.log(content[order].username.yellow);
            console.log(content[order].content.cyan);
          }
        }
      })
    }
  }
}


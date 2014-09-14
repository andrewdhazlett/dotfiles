(function() {
  var BufferedNodeProcess;

  BufferedNodeProcess = require('atom').BufferedNodeProcess;

  module.exports = function() {
    var process, start, stop;
    process = null;
    start = function(cb) {
      var args, command, exit, options, path, stderr, stdout;
      path = require('path');
      command = path.resolve(__dirname, "../node_modules/.bin/tern");
      args = ["--persistent", "--no-port-file"];
      stderr = function(output) {
        return console.error(output);
      };
      stdout = function(output) {
        var port;
        output = output.split(" ");
        port = output[output.length - 1];
        console.log("Tern server running on port " + port);
        return cb(port);
      };
      options = {
        cwd: atom.project.getRootDirectory().getPath()
      };
      console.log(options);
      exit = function(code) {
        return console.log("tern exited with code: " + code);
      };
      return process = new BufferedNodeProcess({
        command: command,
        args: args,
        options: options,
        stdout: stdout,
        stderr: stderr,
        exit: exit
      });
    };
    stop = function() {
      if (process != null) {
        process.kill();
      }
      return process = null;
    };
    return {
      start: start,
      stop: stop
    };
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLG1CQUFBOztBQUFBLEVBQUMsc0JBQXVCLE9BQUEsQ0FBUSxNQUFSLEVBQXZCLG1CQUFELENBQUE7O0FBQUEsRUFFQSxNQUFNLENBQUMsT0FBUCxHQUFpQixTQUFBLEdBQUE7QUFDYixRQUFBLG9CQUFBO0FBQUEsSUFBQSxPQUFBLEdBQVUsSUFBVixDQUFBO0FBQUEsSUFDQSxLQUFBLEdBQVEsU0FBQyxFQUFELEdBQUE7QUFDSixVQUFBLGtEQUFBO0FBQUEsTUFBQSxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVIsQ0FBUCxDQUFBO0FBQUEsTUFDQSxPQUFBLEdBQVUsSUFBSSxDQUFDLE9BQUwsQ0FBYSxTQUFiLEVBQXdCLDJCQUF4QixDQURWLENBQUE7QUFBQSxNQUVBLElBQUEsR0FBTyxDQUFDLGNBQUQsRUFBaUIsZ0JBQWpCLENBRlAsQ0FBQTtBQUFBLE1BR0EsTUFBQSxHQUFTLFNBQUMsTUFBRCxHQUFBO2VBQVksT0FBTyxDQUFDLEtBQVIsQ0FBYyxNQUFkLEVBQVo7TUFBQSxDQUhULENBQUE7QUFBQSxNQUlBLE1BQUEsR0FBUyxTQUFDLE1BQUQsR0FBQTtBQUNMLFlBQUEsSUFBQTtBQUFBLFFBQUEsTUFBQSxHQUFTLE1BQU0sQ0FBQyxLQUFQLENBQWEsR0FBYixDQUFULENBQUE7QUFBQSxRQUNBLElBQUEsR0FBTyxNQUFPLENBQUEsTUFBTSxDQUFDLE1BQVAsR0FBZ0IsQ0FBaEIsQ0FEZCxDQUFBO0FBQUEsUUFFQSxPQUFPLENBQUMsR0FBUixDQUFhLDhCQUFBLEdBQTZCLElBQTFDLENBRkEsQ0FBQTtlQUdBLEVBQUEsQ0FBRyxJQUFILEVBSks7TUFBQSxDQUpULENBQUE7QUFBQSxNQVNBLE9BQUEsR0FDSTtBQUFBLFFBQUEsR0FBQSxFQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWIsQ0FBQSxDQUErQixDQUFDLE9BQWhDLENBQUEsQ0FBTDtPQVZKLENBQUE7QUFBQSxNQVdBLE9BQU8sQ0FBQyxHQUFSLENBQVksT0FBWixDQVhBLENBQUE7QUFBQSxNQVlBLElBQUEsR0FBTyxTQUFDLElBQUQsR0FBQTtlQUFVLE9BQU8sQ0FBQyxHQUFSLENBQWEseUJBQUEsR0FBd0IsSUFBckMsRUFBVjtNQUFBLENBWlAsQ0FBQTthQWFBLE9BQUEsR0FBYyxJQUFBLG1CQUFBLENBQW9CO0FBQUEsUUFBQyxTQUFBLE9BQUQ7QUFBQSxRQUFVLE1BQUEsSUFBVjtBQUFBLFFBQWdCLFNBQUEsT0FBaEI7QUFBQSxRQUF5QixRQUFBLE1BQXpCO0FBQUEsUUFBaUMsUUFBQSxNQUFqQztBQUFBLFFBQXlDLE1BQUEsSUFBekM7T0FBcEIsRUFkVjtJQUFBLENBRFIsQ0FBQTtBQUFBLElBaUJBLElBQUEsR0FBTyxTQUFBLEdBQUE7O1FBQ0gsT0FBTyxDQUFFLElBQVQsQ0FBQTtPQUFBO2FBQ0EsT0FBQSxHQUFVLEtBRlA7SUFBQSxDQWpCUCxDQUFBO1dBb0JBO0FBQUEsTUFBQyxPQUFBLEtBQUQ7QUFBQSxNQUFRLE1BQUEsSUFBUjtNQXJCYTtFQUFBLENBRmpCLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/andrewhazlett/.atom/packages/Tern/lib/server.coffee
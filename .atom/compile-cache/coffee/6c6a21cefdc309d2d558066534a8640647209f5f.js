(function() {
  var fs, vm;

  vm = require("vm");

  fs = require("fs");

  module.exports = function(path) {
    var data, script;
    data = fs.readFileSync(path, {
      encoding: 'utf8'
    });
    script = vm.createScript(data, 'execFile.vm');
    script.runInThisContext();
    return this;
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLE1BQUE7O0FBQUEsRUFBQSxFQUFBLEdBQUssT0FBQSxDQUFRLElBQVIsQ0FBTCxDQUFBOztBQUFBLEVBQ0EsRUFBQSxHQUFLLE9BQUEsQ0FBUSxJQUFSLENBREwsQ0FBQTs7QUFBQSxFQUVBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLFNBQUMsSUFBRCxHQUFBO0FBQ2YsUUFBQSxZQUFBO0FBQUEsSUFBQSxJQUFBLEdBQU8sRUFBRSxDQUFDLFlBQUgsQ0FBZ0IsSUFBaEIsRUFBc0I7QUFBQSxNQUMzQixRQUFBLEVBQVUsTUFEaUI7S0FBdEIsQ0FBUCxDQUFBO0FBQUEsSUFHQSxNQUFBLEdBQVMsRUFBRSxDQUFDLFlBQUgsQ0FBZ0IsSUFBaEIsRUFBc0IsYUFBdEIsQ0FIVCxDQUFBO0FBQUEsSUFJQSxNQUFNLENBQUMsZ0JBQVAsQ0FBQSxDQUpBLENBQUE7V0FLQSxLQU5lO0VBQUEsQ0FGakIsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/andrewhazlett/.atom/packages/gitter/lib/execFile.coffee
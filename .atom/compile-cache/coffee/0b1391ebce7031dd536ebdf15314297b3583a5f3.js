(function() {
  var path;

  path = require('path');

  module.exports = (function() {
    var emojifyPath, execFile;
    execFile = require('./execFile');
    emojifyPath = path.resolve(__dirname, '../node_modules/emojify.js/emojify.js');
    return execFile(emojifyPath).emojify;
  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLElBQUE7O0FBQUEsRUFBQSxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVIsQ0FBUCxDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FBaUIsQ0FBQyxTQUFBLEdBQUE7QUFFaEIsUUFBQSxxQkFBQTtBQUFBLElBQUEsUUFBQSxHQUFXLE9BQUEsQ0FBUSxZQUFSLENBQVgsQ0FBQTtBQUFBLElBQ0EsV0FBQSxHQUFjLElBQUksQ0FBQyxPQUFMLENBQWEsU0FBYixFQUF3Qix1Q0FBeEIsQ0FEZCxDQUFBO1dBRUEsUUFBQSxDQUFTLFdBQVQsQ0FBcUIsQ0FBQyxRQUpOO0VBQUEsQ0FBRCxDQUFBLENBQUEsQ0FGakIsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/andrewhazlett/.atom/packages/gitter/lib/emojify.coffee
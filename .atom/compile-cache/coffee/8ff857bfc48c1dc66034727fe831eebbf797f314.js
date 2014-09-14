(function() {
  var Watcher,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  module.exports = Watcher = (function(_super) {
    __extends(Watcher, _super);

    Watcher.prototype.Ripper = require('./Ripper');

    Watcher.prototype.scopeNames = ['source.coffee', 'source.litcoffee'];

    function Watcher() {
      Watcher.__super__.constructor.apply(this, arguments);
    }

    return Watcher;

  })(require('atom-refactor').Watcher);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLE9BQUE7SUFBQTttU0FBQTs7QUFBQSxFQUFBLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFFSiw4QkFBQSxDQUFBOztBQUFBLHNCQUFBLE1BQUEsR0FBUSxPQUFBLENBQVEsVUFBUixDQUFSLENBQUE7O0FBQUEsc0JBQ0EsVUFBQSxHQUFZLENBQ1YsZUFEVSxFQUVWLGtCQUZVLENBRFosQ0FBQTs7QUFNYSxJQUFBLGlCQUFBLEdBQUE7QUFDWCxNQUFBLDBDQUFBLFNBQUEsQ0FBQSxDQURXO0lBQUEsQ0FOYjs7bUJBQUE7O0tBRm9CLE9BQUEsQ0FBUSxlQUFSLENBQXdCLENBQUMsUUFEL0MsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/andrewhazlett/.atom/packages/coffee-refactor/lib/Watcher.coffee
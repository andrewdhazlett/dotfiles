(function() {
  var StatusView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('atom').View;

  module.exports = StatusView = (function(_super) {
    __extends(StatusView, _super);

    StatusView.content = function() {
      return this.div({
        "class": 'coffee-refactor-status inline-block'
      }, (function(_this) {
        return function() {
          _this.span({
            "class": 'lint-name'
          });
          return _this.span({
            "class": 'lint-summary'
          });
        };
      })(this));
    };

    function StatusView() {
      StatusView.__super__.constructor.call(this);
      this.find('.linter-name');
      this.find('.linter-name');
    }

    StatusView.prototype.destruct = function() {};

    return StatusView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGdCQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBRSxPQUFTLE9BQUEsQ0FBUSxNQUFSLEVBQVQsSUFBRixDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUVKLGlDQUFBLENBQUE7O0FBQUEsSUFBQSxVQUFDLENBQUEsT0FBRCxHQUFVLFNBQUEsR0FBQTthQUNSLElBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxRQUFBLE9BQUEsRUFBTyxxQ0FBUDtPQUFMLEVBQW1ELENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7QUFDakQsVUFBQSxLQUFDLENBQUEsSUFBRCxDQUFNO0FBQUEsWUFBQSxPQUFBLEVBQU8sV0FBUDtXQUFOLENBQUEsQ0FBQTtpQkFDQSxLQUFDLENBQUEsSUFBRCxDQUFNO0FBQUEsWUFBQSxPQUFBLEVBQU8sY0FBUDtXQUFOLEVBRmlEO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBbkQsRUFEUTtJQUFBLENBQVYsQ0FBQTs7QUFLYSxJQUFBLG9CQUFBLEdBQUE7QUFDWCxNQUFBLDBDQUFBLENBQUEsQ0FBQTtBQUFBLE1BRUEsSUFBQyxDQUFBLElBQUQsQ0FBTSxjQUFOLENBRkEsQ0FBQTtBQUFBLE1BR0EsSUFBQyxDQUFBLElBQUQsQ0FBTSxjQUFOLENBSEEsQ0FEVztJQUFBLENBTGI7O0FBQUEseUJBV0EsUUFBQSxHQUFVLFNBQUEsR0FBQSxDQVhWLENBQUE7O3NCQUFBOztLQUZ1QixLQUh6QixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/andrewhazlett/.atom/packages/coffee-refactor/node_modules/atom-refactor/lib/status/StatusView.coffee
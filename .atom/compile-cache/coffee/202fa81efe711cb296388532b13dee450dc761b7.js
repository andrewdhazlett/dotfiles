(function() {
  var ErrorView, HighlightView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  HighlightView = require('./HighlightView');

  module.exports = ErrorView = (function(_super) {
    __extends(ErrorView, _super);

    ErrorView.className = 'refactor-error';

    ErrorView.prototype.configProperty = 'coffee-refactor.highlightError';

    function ErrorView() {
      ErrorView.__super__.constructor.apply(this, arguments);
    }

    return ErrorView;

  })(HighlightView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHdCQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxhQUFBLEdBQWdCLE9BQUEsQ0FBUSxpQkFBUixDQUFoQixDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUVKLGdDQUFBLENBQUE7O0FBQUEsSUFBQSxTQUFDLENBQUEsU0FBRCxHQUFZLGdCQUFaLENBQUE7O0FBQUEsd0JBQ0EsY0FBQSxHQUFnQixnQ0FEaEIsQ0FBQTs7QUFHYSxJQUFBLG1CQUFBLEdBQUE7QUFDWCxNQUFBLDRDQUFBLFNBQUEsQ0FBQSxDQURXO0lBQUEsQ0FIYjs7cUJBQUE7O0tBRnNCLGNBSHhCLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/andrewhazlett/.atom/packages/coffee-refactor/node_modules/atom-refactor/lib/background/ErrorView.coffee
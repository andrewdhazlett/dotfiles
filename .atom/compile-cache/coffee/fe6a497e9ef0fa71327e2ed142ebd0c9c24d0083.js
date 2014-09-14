(function() {
  var HighlightView, ReferenceView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  HighlightView = require('./HighlightView');

  module.exports = ReferenceView = (function(_super) {
    __extends(ReferenceView, _super);

    ReferenceView.className = 'refactor-reference';

    ReferenceView.prototype.configProperty = 'coffee-refactor.highlightReference';

    function ReferenceView() {
      ReferenceView.__super__.constructor.apply(this, arguments);
    }

    return ReferenceView;

  })(HighlightView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDRCQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxhQUFBLEdBQWdCLE9BQUEsQ0FBUSxpQkFBUixDQUFoQixDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUVKLG9DQUFBLENBQUE7O0FBQUEsSUFBQSxhQUFDLENBQUEsU0FBRCxHQUFZLG9CQUFaLENBQUE7O0FBQUEsNEJBQ0EsY0FBQSxHQUFnQixvQ0FEaEIsQ0FBQTs7QUFHYSxJQUFBLHVCQUFBLEdBQUE7QUFDWCxNQUFBLGdEQUFBLFNBQUEsQ0FBQSxDQURXO0lBQUEsQ0FIYjs7eUJBQUE7O0tBRjBCLGNBSDVCLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/andrewhazlett/.atom/packages/coffee-refactor/node_modules/atom-refactor/lib/background/ReferenceView.coffee
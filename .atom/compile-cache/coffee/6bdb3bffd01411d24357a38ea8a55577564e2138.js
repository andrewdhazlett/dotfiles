(function() {
  var CoffeeRefactor,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  module.exports = new (CoffeeRefactor = (function(_super) {
    __extends(CoffeeRefactor, _super);

    CoffeeRefactor.prototype.Watcher = require('./Watcher');

    CoffeeRefactor.prototype.renameCommand = 'coffee-refactor:rename';

    CoffeeRefactor.prototype.doneCommand = 'coffee-refactor:done';

    function CoffeeRefactor() {
      CoffeeRefactor.__super__.constructor.apply(this, arguments);
    }

    return CoffeeRefactor;

  })(require('atom-refactor').Main));

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGNBQUE7SUFBQTttU0FBQTs7QUFBQSxFQUFBLE1BQU0sQ0FBQyxPQUFQLEdBQ0EsR0FBQSxDQUFBLENBQVU7QUFFUixxQ0FBQSxDQUFBOztBQUFBLDZCQUFBLE9BQUEsR0FBUyxPQUFBLENBQVEsV0FBUixDQUFULENBQUE7O0FBQUEsNkJBQ0EsYUFBQSxHQUFlLHdCQURmLENBQUE7O0FBQUEsNkJBRUEsV0FBQSxHQUFhLHNCQUZiLENBQUE7O0FBSWEsSUFBQSx3QkFBQSxHQUFBO0FBQ1gsTUFBQSxpREFBQSxTQUFBLENBQUEsQ0FEVztJQUFBLENBSmI7OzBCQUFBOztLQUYrQixPQUFBLENBQVEsZUFBUixDQUF3QixDQUFDLE1BRDFELENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/andrewhazlett/.atom/packages/coffee-refactor/lib/main.coffee
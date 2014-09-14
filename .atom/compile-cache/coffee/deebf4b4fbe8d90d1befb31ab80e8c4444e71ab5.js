(function() {
  var $, GutterView;

  $ = require('atom').$;

  module.exports = GutterView = (function() {
    function GutterView(gutter) {
      this.gutter = gutter;
    }

    GutterView.prototype.destruct = function() {};

    GutterView.prototype.empty = function() {
      this.gutter.removeClassFromAllLines('coffee-refactor-error');
      return this.gutter.find('.line-number .icon-right').attr('title', '');
    };

    GutterView.prototype.update = function(errors) {
      var message, range, _i, _len, _ref, _results;
      this.empty();
      if (errors == null) {
        return;
      }
      _results = [];
      for (_i = 0, _len = errors.length; _i < _len; _i++) {
        _ref = errors[_i], range = _ref.range, message = _ref.message;
        _results.push($(this.gutter.getLineNumberElement(range.start.row)).addClass('coffee-refactor-error').attr('title', message));
      }
      return _results;
    };

    return GutterView;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGFBQUE7O0FBQUEsRUFBRSxJQUFNLE9BQUEsQ0FBUSxNQUFSLEVBQU4sQ0FBRixDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUVTLElBQUEsb0JBQUUsTUFBRixHQUFBO0FBQVcsTUFBVixJQUFDLENBQUEsU0FBQSxNQUFTLENBQVg7SUFBQSxDQUFiOztBQUFBLHlCQUVBLFFBQUEsR0FBVSxTQUFBLEdBQUEsQ0FGVixDQUFBOztBQUFBLHlCQU1BLEtBQUEsR0FBTyxTQUFBLEdBQUE7QUFDTCxNQUFBLElBQUMsQ0FBQSxNQUFNLENBQUMsdUJBQVIsQ0FBZ0MsdUJBQWhDLENBQUEsQ0FBQTthQUNBLElBQUMsQ0FBQSxNQUNELENBQUMsSUFERCxDQUNNLDBCQUROLENBRUEsQ0FBQyxJQUZELENBRU0sT0FGTixFQUVlLEVBRmYsRUFGSztJQUFBLENBTlAsQ0FBQTs7QUFBQSx5QkFZQSxNQUFBLEdBQVEsU0FBQyxNQUFELEdBQUE7QUFDTixVQUFBLHdDQUFBO0FBQUEsTUFBQSxJQUFDLENBQUEsS0FBRCxDQUFBLENBQUEsQ0FBQTtBQUNBLE1BQUEsSUFBYyxjQUFkO0FBQUEsY0FBQSxDQUFBO09BREE7QUFFQTtXQUFBLDZDQUFBLEdBQUE7QUFDRSwyQkFESSxhQUFBLE9BQU8sZUFBQSxPQUNYLENBQUE7QUFBQSxzQkFBQSxDQUFBLENBQUUsSUFBQyxDQUFBLE1BQU0sQ0FBQyxvQkFBUixDQUE2QixLQUFLLENBQUMsS0FBSyxDQUFDLEdBQXpDLENBQUYsQ0FDQSxDQUFDLFFBREQsQ0FDVSx1QkFEVixDQUVBLENBQUMsSUFGRCxDQUVNLE9BRk4sRUFFZSxPQUZmLEVBQUEsQ0FERjtBQUFBO3NCQUhNO0lBQUEsQ0FaUixDQUFBOztzQkFBQTs7TUFMRixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/andrewhazlett/.atom/packages/coffee-refactor/node_modules/atom-refactor/lib/gutter/GutterView.coffee
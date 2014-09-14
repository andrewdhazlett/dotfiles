(function() {
  var MarkerView, RegionView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('atom').View;

  RegionView = require('./RegionView');

  module.exports = MarkerView = (function(_super) {
    __extends(MarkerView, _super);

    MarkerView.content = function() {
      return this.div({
        "class": 'marker'
      });
    };

    function MarkerView(rows) {
      var i, max, min, row, _i, _len;
      MarkerView.__super__.constructor.call(this);
      min = 0;
      max = rows.length - 1;
      for (i = _i = 0, _len = rows.length; _i < _len; i = ++_i) {
        row = rows[i];
        this.append(new RegionView(row, i === min, i === max));
      }
    }

    MarkerView.prototype.remove = function() {
      this.destruct();
      return MarkerView.__super__.remove.apply(this, arguments);
    };

    MarkerView.prototype.destruct = function() {
      return console.log('MarkerView::destruct');
    };

    return MarkerView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDRCQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBRSxPQUFTLE9BQUEsQ0FBUSxNQUFSLEVBQVQsSUFBRixDQUFBOztBQUFBLEVBQ0EsVUFBQSxHQUFhLE9BQUEsQ0FBUSxjQUFSLENBRGIsQ0FBQTs7QUFBQSxFQUdBLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFFSixpQ0FBQSxDQUFBOztBQUFBLElBQUEsVUFBQyxDQUFBLE9BQUQsR0FBVSxTQUFBLEdBQUE7YUFDUixJQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsUUFBQSxPQUFBLEVBQU8sUUFBUDtPQUFMLEVBRFE7SUFBQSxDQUFWLENBQUE7O0FBSWEsSUFBQSxvQkFBQyxJQUFELEdBQUE7QUFDWCxVQUFBLDBCQUFBO0FBQUEsTUFBQSwwQ0FBQSxDQUFBLENBQUE7QUFBQSxNQUNBLEdBQUEsR0FBTSxDQUROLENBQUE7QUFBQSxNQUVBLEdBQUEsR0FBTSxJQUFJLENBQUMsTUFBTCxHQUFjLENBRnBCLENBQUE7QUFHQSxXQUFBLG1EQUFBO3NCQUFBO0FBQ0UsUUFBQSxJQUFDLENBQUEsTUFBRCxDQUFZLElBQUEsVUFBQSxDQUFXLEdBQVgsRUFBZ0IsQ0FBQSxLQUFLLEdBQXJCLEVBQTBCLENBQUEsS0FBSyxHQUEvQixDQUFaLENBQUEsQ0FERjtBQUFBLE9BSlc7SUFBQSxDQUpiOztBQUFBLHlCQVdBLE1BQUEsR0FBUSxTQUFBLEdBQUE7QUFDTixNQUFBLElBQUMsQ0FBQSxRQUFELENBQUEsQ0FBQSxDQUFBO2FBQ0Esd0NBQUEsU0FBQSxFQUZNO0lBQUEsQ0FYUixDQUFBOztBQUFBLHlCQWVBLFFBQUEsR0FBVSxTQUFBLEdBQUE7YUFDUixPQUFPLENBQUMsR0FBUixDQUFZLHNCQUFaLEVBRFE7SUFBQSxDQWZWLENBQUE7O3NCQUFBOztLQUZ1QixLQUp6QixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/andrewhazlett/.atom/packages/coffee-refactor/node_modules/atom-refactor/lib/background/MarkerView.coffee
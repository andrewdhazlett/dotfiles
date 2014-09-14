(function() {
  var HighlightView, MarkerView, View, config,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('atom').View;

  MarkerView = require('./MarkerView');

  config = atom.config;

  module.exports = HighlightView = (function(_super) {
    __extends(HighlightView, _super);

    HighlightView.className = '';

    HighlightView.content = function() {
      return this.div({
        "class": this.className
      });
    };

    HighlightView.prototype.configProperty = '';

    function HighlightView() {
      HighlightView.__super__.constructor.call(this);
      config.observe(this.configProperty, (function(_this) {
        return function() {
          return _this.setEnabled(config.get(_this.configProperty));
        };
      })(this));
    }

    HighlightView.prototype.destruct = function() {};

    HighlightView.prototype.update = function(rowsList) {
      var rows, _i, _len, _results;
      this.empty();
      if (!(rowsList != null ? rowsList.length : void 0)) {
        return;
      }
      _results = [];
      for (_i = 0, _len = rowsList.length; _i < _len; _i++) {
        rows = rowsList[_i];
        _results.push(this.append(new MarkerView(rows)));
      }
      return _results;
    };

    HighlightView.prototype.setEnabled = function(isEnabled) {
      if (isEnabled) {
        return this.removeClass('is-disabled');
      } else {
        return this.addClass('is-disabled');
      }
    };

    return HighlightView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHVDQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBRSxPQUFTLE9BQUEsQ0FBUSxNQUFSLEVBQVQsSUFBRixDQUFBOztBQUFBLEVBQ0EsVUFBQSxHQUFhLE9BQUEsQ0FBUSxjQUFSLENBRGIsQ0FBQTs7QUFBQSxFQUVFLFNBQVcsS0FBWCxNQUZGLENBQUE7O0FBQUEsRUFJQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBRUosb0NBQUEsQ0FBQTs7QUFBQSxJQUFBLGFBQUMsQ0FBQSxTQUFELEdBQVksRUFBWixDQUFBOztBQUFBLElBRUEsYUFBQyxDQUFBLE9BQUQsR0FBVSxTQUFBLEdBQUE7YUFDUixJQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsUUFBQSxPQUFBLEVBQU8sSUFBQyxDQUFBLFNBQVI7T0FBTCxFQURRO0lBQUEsQ0FGVixDQUFBOztBQUFBLDRCQU1BLGNBQUEsR0FBZ0IsRUFOaEIsQ0FBQTs7QUFRYSxJQUFBLHVCQUFBLEdBQUE7QUFDWCxNQUFBLDZDQUFBLENBQUEsQ0FBQTtBQUFBLE1BQ0EsTUFBTSxDQUFDLE9BQVAsQ0FBZSxJQUFDLENBQUEsY0FBaEIsRUFBZ0MsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFDOUIsS0FBQyxDQUFBLFVBQUQsQ0FBWSxNQUFNLENBQUMsR0FBUCxDQUFXLEtBQUMsQ0FBQSxjQUFaLENBQVosRUFEOEI7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFoQyxDQURBLENBRFc7SUFBQSxDQVJiOztBQUFBLDRCQWFBLFFBQUEsR0FBVSxTQUFBLEdBQUEsQ0FiVixDQUFBOztBQUFBLDRCQWdCQSxNQUFBLEdBQVEsU0FBQyxRQUFELEdBQUE7QUFDTixVQUFBLHdCQUFBO0FBQUEsTUFBQSxJQUFDLENBQUEsS0FBRCxDQUFBLENBQUEsQ0FBQTtBQUNBLE1BQUEsSUFBQSxDQUFBLG9CQUFjLFFBQVEsQ0FBRSxnQkFBeEI7QUFBQSxjQUFBLENBQUE7T0FEQTtBQUVBO1dBQUEsK0NBQUE7NEJBQUE7QUFDRSxzQkFBQSxJQUFDLENBQUEsTUFBRCxDQUFZLElBQUEsVUFBQSxDQUFXLElBQVgsQ0FBWixFQUFBLENBREY7QUFBQTtzQkFITTtJQUFBLENBaEJSLENBQUE7O0FBQUEsNEJBc0JBLFVBQUEsR0FBWSxTQUFDLFNBQUQsR0FBQTtBQUNWLE1BQUEsSUFBRyxTQUFIO2VBQ0UsSUFBQyxDQUFBLFdBQUQsQ0FBYSxhQUFiLEVBREY7T0FBQSxNQUFBO2VBR0UsSUFBQyxDQUFBLFFBQUQsQ0FBVSxhQUFWLEVBSEY7T0FEVTtJQUFBLENBdEJaLENBQUE7O3lCQUFBOztLQUYwQixLQUw1QixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/andrewhazlett/.atom/packages/coffee-refactor/node_modules/atom-refactor/lib/background/HighlightView.coffee
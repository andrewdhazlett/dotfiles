(function() {
  var $, $$, SelectListView, TernView, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom'), $ = _ref.$, $$ = _ref.$$, SelectListView = _ref.SelectListView;

  module.exports = TernView = (function(_super) {
    __extends(TernView, _super);

    function TernView() {
      return TernView.__super__.constructor.apply(this, arguments);
    }

    TernView.prototype.initialize = function(serializeState) {
      TernView.__super__.initialize.apply(this, arguments);
      this.addClass('tern popover-list');
      return this.filterEditorView.on('textInput', (function(_this) {
        return function(event) {
          var originalEvent, text;
          originalEvent = event.originalEvent;
          return text = originalEvent.data;
        };
      })(this));
    };

    TernView.prototype.cancelled = function() {
      TernView.__super__.cancelled.apply(this, arguments);
      return this.trigger('completed');
    };

    TernView.prototype.viewForItem = function(_arg) {
      var name, type;
      name = _arg.name, type = _arg.type;
      return $$(function() {
        return this.li((function(_this) {
          return function() {
            return _this.span("" + name + " : " + type);
          };
        })(this));
      });
    };

    TernView.prototype.confirmed = function(item) {
      this.trigger('completed', item);
      return this.cancel();
    };

    TernView.prototype.handleEvents = function() {
      this.editorView.off('tern:next');
      this.editorView.off('tern:previous');
      this.editorView.on('tern:next', (function(_this) {
        return function() {
          return _this.selectNextItemView();
        };
      })(this));
      return this.editorView.on('tern:previous', (function(_this) {
        return function() {
          return _this.selectPreviousItemView();
        };
      })(this));
    };

    TernView.prototype.selectNextItemView = function() {
      TernView.__super__.selectNextItemView.apply(this, arguments);
      return false;
    };

    TernView.prototype.selectPreviousItemView = function() {
      TernView.__super__.selectPreviousItemView.apply(this, arguments);
      return false;
    };

    TernView.prototype.getFilterKey = function() {
      return 'name';
    };

    TernView.prototype.setPosition = function() {
      var height, left, potentialBottom, potentialTop, top, _ref1;
      _ref1 = this.editorView.pixelPositionForScreenPosition(this.editor.getCursorScreenPosition()), left = _ref1.left, top = _ref1.top;
      height = this.outerHeight();
      potentialTop = top + this.editorView.lineHeight;
      potentialBottom = potentialTop - this.editorView.scrollTop() + height;
      if (this.aboveCursor || potentialBottom > this.editorView.outerHeight()) {
        this.aboveCursor = true;
        return this.css({
          left: left,
          top: top - height,
          bottom: 'inherit'
        });
      } else {
        return this.css({
          left: left,
          top: potentialTop,
          bottom: 'inherit'
        });
      }
    };

    TernView.prototype.afterAttach = function(onDom) {
      var widestCompletion;
      if (onDom) {
        widestCompletion = parseInt(this.css('min-width')) || 0;
        this.list.find('span').each(function() {
          return widestCompletion = Math.max(widestCompletion, $(this).outerWidth());
        });
        this.list.width(widestCompletion);
        return this.width(this.list.outerWidth());
      }
    };

    TernView.prototype.startCompletion = function(completions) {
      var _ref1, _ref2;
      this.setItems(completions);
      if (!this.hasParent()) {
        this.editorView = atom.workspaceView.getActivePaneView().activeView;
        if ((_ref1 = this.editorView) != null) {
          _ref1.appendToLinesView(this);
        }
        this.editor = (_ref2 = this.editorView) != null ? _ref2.getEditor() : void 0;
        this.setPosition();
        this.handleEvents();
        return this.focusFilterEditor();
      }
    };

    return TernView;

  })(SelectListView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHFDQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxPQUEwQixPQUFBLENBQVEsTUFBUixDQUExQixFQUFDLFNBQUEsQ0FBRCxFQUFJLFVBQUEsRUFBSixFQUFRLHNCQUFBLGNBQVIsQ0FBQTs7QUFBQSxFQUVBLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFFRiwrQkFBQSxDQUFBOzs7O0tBQUE7O0FBQUEsdUJBQUEsVUFBQSxHQUFZLFNBQUMsY0FBRCxHQUFBO0FBQ1IsTUFBQSwwQ0FBQSxTQUFBLENBQUEsQ0FBQTtBQUFBLE1BQ0EsSUFBQyxDQUFBLFFBQUQsQ0FBVSxtQkFBVixDQURBLENBQUE7YUFFQSxJQUFDLENBQUEsZ0JBQWdCLENBQUMsRUFBbEIsQ0FBcUIsV0FBckIsRUFBa0MsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUMsS0FBRCxHQUFBO0FBQ2hDLGNBQUEsbUJBQUE7QUFBQSxVQUFDLGdCQUFpQixNQUFqQixhQUFELENBQUE7aUJBQ0EsSUFBQSxHQUFPLGFBQWEsQ0FBQyxLQUZXO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBbEMsRUFIUTtJQUFBLENBQVosQ0FBQTs7QUFBQSx1QkFPQSxTQUFBLEdBQVcsU0FBQSxHQUFBO0FBQ1AsTUFBQSx5Q0FBQSxTQUFBLENBQUEsQ0FBQTthQUNBLElBQUMsQ0FBQSxPQUFELENBQVMsV0FBVCxFQUZPO0lBQUEsQ0FQWCxDQUFBOztBQUFBLHVCQVdBLFdBQUEsR0FBYSxTQUFDLElBQUQsR0FBQTtBQUNULFVBQUEsVUFBQTtBQUFBLE1BRFcsWUFBQSxNQUFNLFlBQUEsSUFDakIsQ0FBQTthQUFBLEVBQUEsQ0FBRyxTQUFBLEdBQUE7ZUFDQyxJQUFDLENBQUEsRUFBRCxDQUFJLENBQUEsU0FBQSxLQUFBLEdB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
//# sourceURL=/Users/andrewhazlett/.atom/packages/Tern/lib/tern-view.coffee
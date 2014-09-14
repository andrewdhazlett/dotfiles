(function() {
  var ErrorView, EventEmitter, GutterView, ReferenceView, StatusView, Watcher, locationDataToRange,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  EventEmitter = require('events').EventEmitter;

  ReferenceView = require('./background/ReferenceView');

  ErrorView = require('./background/ErrorView');

  GutterView = require('./gutter/GutterView');

  StatusView = require('./status/StatusView');

  locationDataToRange = require('./utils/LocationDataUtil').locationDataToRange;

  module.exports = Watcher = (function(_super) {
    __extends(Watcher, _super);

    Watcher.prototype.Ripper = null;

    Watcher.prototype.scopeNames = [];

    function Watcher(editorView) {
      this.editorView = editorView;
      this.onCursorMoved = __bind(this.onCursorMoved, this);
      this.onContentsModified = __bind(this.onContentsModified, this);
      this.cancel = __bind(this.cancel, this);
      this.updateReferences = __bind(this.updateReferences, this);
      this.onParseEnd = __bind(this.onParseEnd, this);
      this.hideError = __bind(this.hideError, this);
      this.showError = __bind(this.showError, this);
      this.checkGrammar = __bind(this.checkGrammar, this);
      this.onDestroyed = __bind(this.onDestroyed, this);
      this.destruct = __bind(this.destruct, this);
      Watcher.__super__.constructor.call(this);
      this.editor = this.editorView.editor;
      this.editor.on('grammar-changed', this.checkGrammar);
      this.checkGrammar();
    }

    Watcher.prototype.destruct = function() {
      this.removeAllListeners();
      this.deactivate();
      this.editor.off('grammar-changed', this.checkGrammar);
      delete this.editorView;
      return delete this.editor;
    };

    Watcher.prototype.onDestroyed = function() {
      return this.emit('destroyed', this);
    };


    /*
    Grammar checker
    1. Detect grammar changed.
    2. Destroy instances and listeners.
    3. Exit when grammar isn't CoffeeScript.
    4. Create instances and listeners.
     */

    Watcher.prototype.checkGrammar = function() {
      var scopeName;
      this.deactivate();
      scopeName = this.editor.getGrammar().scopeName;
      if (__indexOf.call(this.scopeNames, scopeName) < 0) {
        return;
      }
      return this.activate();
    };

    Watcher.prototype.activate = function() {
      this.ripper = new this.Ripper(this.editor);
      this.referenceView = new ReferenceView;
      this.editorView.underlayer.append(this.referenceView);
      this.errorView = new ErrorView;
      this.editorView.underlayer.append(this.errorView);
      this.gutterView = new GutterView(this.editorView.gutter);
      this.statusView = new StatusView;
      this.editorView.on('cursor:moved', this.onCursorMoved);
      this.editor.on('destroyed', this.onDestroyed);
      this.editor.on('contents-modified', this.onContentsModified);
      return this.parse();
    };

    Watcher.prototype.deactivate = function() {
      var _ref, _ref1, _ref2, _ref3, _ref4;
      this.editorView.off('cursor:moved', this.onCursorMoved);
      this.editor.off('destroyed', this.onDestroyed);
      this.editor.off('contents-modified', this.onContentsModified);
      if ((_ref = this.ripper) != null) {
        _ref.destruct();
      }
      if ((_ref1 = this.referenceView) != null) {
        _ref1.destruct();
      }
      if ((_ref2 = this.errorView) != null) {
        _ref2.destruct();
      }
      if ((_ref3 = this.gutterView) != null) {
        _ref3.destruct();
      }
      if ((_ref4 = this.statusView) != null) {
        _ref4.destruct();
      }
      delete this.ripper;
      delete this.referenceView;
      delete this.errorView;
      delete this.gutterView;
      return delete this.statusView;
    };


    /*
    Reference finder process
    1. Stop listening cursor move event and reset views.
    2. Parse.
    3. Show errors and exit process when compile error is thrown.
    4. Show references.
    5. Start listening cursor move event.
     */

    Watcher.prototype.parse = function() {
      var text;
      this.editorView.off('cursor:moved', this.onCursorMoved);
      this.hideError();
      this.referenceView.update();
      text = this.editor.buffer.getText();
      if (text !== this.cachedText) {
        this.cachedText = text;
        return this.ripper.parse(text, (function(_this) {
          return function(err) {
            if (err != null) {
              _this.showError(err);
              return;
            }
            _this.hideError();
            return _this.onParseEnd();
          };
        })(this));
      } else {
        return this.onParseEnd();
      }
    };

    Watcher.prototype.showError = function(_arg) {
      var err, location, message, range;
      location = _arg.location, message = _arg.message;
      if (location == null) {
        return;
      }
      range = locationDataToRange(location);
      err = {
        range: range,
        message: message
      };
      this.errorView.update([this.rangeToRows(range)]);
      return this.gutterView.update([err]);
    };

    Watcher.prototype.hideError = function() {
      this.errorView.update();
      return this.gutterView.update();
    };

    Watcher.prototype.onParseEnd = function() {
      this.updateReferences();
      this.editorView.off('cursor:moved', this.onCursorMoved);
      return this.editorView.on('cursor:moved', this.onCursorMoved);
    };

    Watcher.prototype.updateReferences = function() {
      var cursor, range, ranges, rowsList;
      ranges = [];
      cursor = this.editor.cursors[0];
      if (cursor != null) {
        range = cursor.getCurrentWordBufferRange({
          includeNonWordCharacters: false
        });
        if (!range.isEmpty()) {
          ranges = this.ripper.find(range);
        }
      }
      rowsList = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = ranges.length; _i < _len; _i++) {
          range = ranges[_i];
          _results.push(this.rangeToRows(range));
        }
        return _results;
      }).call(this);
      return this.referenceView.update(rowsList);
    };


    /*
    Rename process
    1. Detect rename command.
    2. Cancel and exit process when cursor is moved out from the symbol.
    3. Detect done command.
     */

    Watcher.prototype.rename = function() {
      var cursor, range, refRange, refRanges, _i, _len;
      if (!this.isActive()) {
        return false;
      }
      cursor = this.editor.cursors[0];
      range = cursor.getCurrentWordBufferRange({
        includeNonWordCharacters: false
      });
      refRanges = this.ripper.find(range);
      if (refRanges.length === 0) {
        return false;
      }
      this.renameInfo = {
        cursor: cursor,
        range: range
      };
      for (_i = 0, _len = refRanges.length; _i < _len; _i++) {
        refRange = refRanges[_i];
        this.editor.addSelectionForBufferRange(refRange);
      }
      this.editorView.off('cursor:moved', this.cancel);
      this.editorView.on('cursor:moved', this.cancel);
      return true;
    };

    Watcher.prototype.cancel = function() {
      if ((this.renameInfo == null) || this.renameInfo.range.start.isEqual(this.renameInfo.cursor.getCurrentWordBufferRange({
        includeNonWordCharacters: false
      }).start)) {
        return;
      }
      this.editor.setCursorBufferPosition(this.renameInfo.cursor.getBufferPosition());
      this.editorView.off('cursor:moved', this.cancel);
      return delete this.renameInfo;
    };

    Watcher.prototype.done = function() {
      if (!this.isActive()) {
        return false;
      }
      if (this.renameInfo == null) {
        return false;
      }
      this.editor.setCursorBufferPosition(this.renameInfo.cursor.getBufferPosition());
      this.editorView.off('cursor:moved', this.cancel);
      delete this.renameInfo;
      return true;
    };


    /*
    User events
     */

    Watcher.prototype.onContentsModified = function() {
      return this.parse();
    };

    Watcher.prototype.onCursorMoved = function() {
      clearTimeout(this.timeoutId);
      return this.timeoutId = setTimeout(this.updateReferences, 0);
    };


    /*
    Utility
     */

    Watcher.prototype.isActive = function() {
      return (this.ripper != null) && atom.workspaceView.getActivePaneItem() === this.editor;
    };

    Watcher.prototype.rangeToRows = function(_arg) {
      var end, pixel, point, raw, rowRange, start, _i, _ref, _ref1, _results;
      start = _arg.start, end = _arg.end;
      _results = [];
      for (raw = _i = _ref = start.row, _ref1 = end.row; _i <= _ref1; raw = _i += 1) {
        rowRange = this.editor.buffer.rangeForRow(raw);
        point = {
          left: raw === start.row ? start : rowRange.start,
          right: raw === end.row ? end : rowRange.end
        };
        pixel = {
          tl: this.editorView.pixelPositionForBufferPosition(point.left),
          br: this.editorView.pixelPositionForBufferPosition(point.right)
        };
        pixel.br.top += this.editorView.lineHeight;
        _results.push(pixel);
      }
      return _results;
    };

    return Watcher;

  })(EventEmitter);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDRGQUFBO0lBQUE7Ozt5SkFBQTs7QUFBQSxFQUFFLGVBQWlCLE9BQUEsQ0FBUSxRQUFSLEVBQWpCLFlBQUYsQ0FBQTs7QUFBQSxFQUNBLGFBQUEsR0FBZ0IsT0FBQSxDQUFRLDRCQUFSLENBRGhCLENBQUE7O0FBQUEsRUFFQSxTQUFBLEdBQVksT0FBQSxDQUFRLHdCQUFSLENBRlosQ0FBQTs7QUFBQSxFQUdBLFVBQUEsR0FBYSxPQUFBLENBQVEscUJBQVIsQ0FIYixDQUFBOztBQUFBLEVBSUEsVUFBQSxHQUFhLE9BQUEsQ0FBUSxxQkFBUixDQUpiLENBQUE7O0FBQUEsRUFLRSxzQkFBd0IsT0FBQSxDQUFRLDBCQUFSLEVBQXhCLG1CQUxGLENBQUE7O0FBQUEsRUFPQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBRUosOEJBQUEsQ0FBQTs7QUFBQSxzQkFBQSxNQUFBLEdBQVEsSUFBUixDQUFBOztBQUFBLHNCQUNBLFVBQUEsR0FBWSxFQURaLENBQUE7O0FBR2EsSUFBQSxpQkFBRSxVQUFGLEdBQUE7QUFDWCxNQURZLElBQUMsQ0FBQSxhQUFBLFVBQ2IsQ0FBQTtBQUFBLDJEQUFBLENBQUE7QUFBQSxxRUFBQSxDQUFBO0FBQUEsNkNBQUEsQ0FBQTtBQUFBLGlFQUFBLENBQUE7QUFBQSxxREFBQSxDQUFBO0FBQUEsbURBQUEsQ0FBQTtBQUFBLG1EQUFBLENBQUE7QUFBQSx5REFBQSxDQUFBO0FBQUEsdURBQUEsQ0FBQTtBQUFBLGlEQUFBLENBQUE7QUFBQSxNQUFBLHVDQUFBLENBQUEsQ0FBQTtBQUFBLE1BQ0EsSUFBQyxDQUFBLE1BQUQsR0FBVSxJQUFDLENBQUEsVUFBVSxDQUFDLE1BRHRCLENBQUE7QUFBQSxNQUVBLElBQUMsQ0FBQSxNQUFNLENBQUMsRUFBUixDQUFXLGlCQUFYLEVB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
//# sourceURL=/Users/andrewhazlett/.atom/packages/coffee-refactor/node_modules/atom-refactor/lib/Watcher.coffee
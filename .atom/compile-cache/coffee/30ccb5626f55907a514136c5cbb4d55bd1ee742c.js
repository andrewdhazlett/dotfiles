(function() {
  var EventEmitter2, Watcher, locationDataToRange,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  EventEmitter2 = require('eventemitter2').EventEmitter2;

  locationDataToRange = require('./location_data_util').locationDataToRange;

  module.exports = Watcher = (function(_super) {
    __extends(Watcher, _super);

    function Watcher(moduleManager, editorView) {
      this.moduleManager = moduleManager;
      this.editorView = editorView;
      this.onCursorMovedAfter = __bind(this.onCursorMovedAfter, this);
      this.onCursorMoved = __bind(this.onCursorMoved, this);
      this.onBufferChanged = __bind(this.onBufferChanged, this);
      this.abort = __bind(this.abort, this);
      this.createErrors = __bind(this.createErrors, this);
      this.onParseEnd = __bind(this.onParseEnd, this);
      this.parse = __bind(this.parse, this);
      this.verifyGrammar = __bind(this.verifyGrammar, this);
      this.onDestroyed = __bind(this.onDestroyed, this);
      this.destruct = __bind(this.destruct, this);
      Watcher.__super__.constructor.call(this);
      this.editor = this.editorView.editor;
      this.editor.on('grammar-changed', this.verifyGrammar);
      this.moduleManager.on('changed', this.verifyGrammar);
      this.verifyGrammar();
    }

    Watcher.prototype.destruct = function() {
      this.removeAllListeners();
      this.deactivate();
      this.editor.off('grammar-changed', this.verifyGrammar);
      this.moduleManager.off('changed', this.verifyGrammar);
      delete this.moduleManager;
      delete this.editorView;
      delete this.editor;
      return delete this.module;
    };

    Watcher.prototype.onDestroyed = function() {
      return this.emit('destroyed', this);
    };


    /*
    Grammar valification process
    1. Detect grammar changed.
    2. Destroy instances and listeners.
    3. Exit process when the language plugin of the grammar can't be found.
    4. Create instances and listeners.
     */

    Watcher.prototype.verifyGrammar = function() {
      var module, scopeName;
      scopeName = this.editor.getGrammar().scopeName;
      module = this.moduleManager.getModule(scopeName);
      if (module === this.module) {
        return;
      }
      this.deactivate();
      if (module == null) {
        return;
      }
      this.module = module;
      return this.activate();
    };

    Watcher.prototype.activate = function() {
      this.ripper = new this.module.Ripper();
      this.editorView.on('cursor:moved', this.onCursorMoved);
      this.editor.on('destroyed', this.onDestroyed);
      this.editor.buffer.on('changed', this.onBufferChanged);
      return this.parse();
    };

    Watcher.prototype.deactivate = function() {
      var _ref;
      this.editorView.off('cursor:moved', this.onCursorMoved);
      this.editor.off('destroyed', this.onDestroyed);
      this.editor.buffer.off('changed', this.onBufferChanged);
      clearTimeout(this.bufferChangedTimeoutId);
      clearTimeout(this.cursorMovedTimeoutId);
      if ((_ref = this.ripper) != null) {
        _ref.destruct();
      }
      delete this.bufferChangedTimeoutId;
      delete this.cursorMovedTimeoutId;
      delete this.module;
      delete this.ripper;
      delete this.renamingCursor;
      return delete this.renamingMarkers;
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
      this.destroyReferences();
      this.destroyErrors();
      text = this.editor.buffer.getText();
      if (text !== this.cachedText) {
        this.cachedText = text;
        return this.ripper.parse(text, this.onParseEnd);
      } else {
        return this.onParseEnd();
      }
    };

    Watcher.prototype.onParseEnd = function(errors) {
      if (errors != null) {
        return this.createErrors(errors);
      } else {
        this.createReferences();
        this.editorView.off('cursor:moved', this.onCursorMoved);
        return this.editorView.on('cursor:moved', this.onCursorMoved);
      }
    };

    Watcher.prototype.destroyErrors = function() {
      var marker, _i, _len, _ref;
      if (this.errorMarkers == null) {
        return;
      }
      _ref = this.errorMarkers;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        marker = _ref[_i];
        marker.destroy();
      }
      return delete this.errorMarkers;
    };

    Watcher.prototype.createErrors = function(errors) {
      var location, marker, message, range;
      return this.errorMarkers = (function() {
        var _i, _len, _ref, _results;
        _results = [];
        for (_i = 0, _len = errors.length; _i < _len; _i++) {
          _ref = errors[_i], location = _ref.location, range = _ref.range, message = _ref.message;
          if (location != null) {
            range = locationDataToRange(location);
          }
          marker = this.editor.markBufferRange(range);
          this.editor.decorateMarker(marker, {
            type: 'highlight',
            "class": 'refactor-error'
          });
          this.editor.decorateMarker(marker, {
            type: 'gutter',
            "class": 'refactor-error'
          });
          _results.push(marker);
        }
        return _results;
      }).call(this);
    };

    Watcher.prototype.destroyReferences = function() {
      var marker, _i, _len, _ref;
      if (this.referenceMarkers == null) {
        return;
      }
      _ref = this.referenceMarkers;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        marker = _ref[_i];
        marker.destroy();
      }
      return delete this.referenceMarkers;
    };

    Watcher.prototype.createReferences = function() {
      var marker, range, ranges;
      ranges = this.ripper.find(this.editor.getSelectedBufferRange().start);
      return this.referenceMarkers = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = ranges.length; _i < _len; _i++) {
          range = ranges[_i];
          marker = this.editor.markBufferRange(range);
          this.editor.decorateMarker(marker, {
            type: 'highlight',
            "class": 'refactor-reference'
          });
          _results.push(marker);
        }
        return _results;
      }).call(this);
    };


    /*
    Renaming life cycle.
    1. When detected rename command, start renaming process.
    2. When the cursors move out from the symbols, abort and exit renaming process.
    3. When detected done command, exit renaming process.
     */

    Watcher.prototype.rename = function() {
      var cursor, marker, range, ranges;
      if (!this.isActive()) {
        return false;
      }
      cursor = this.editor.getCursor();
      ranges = this.ripper.find(cursor.getBufferPosition());
      if (ranges.length === 0) {
        return false;
      }
      this.destroyReferences();
      this.editor.buffer.off('changed', this.onBufferChanged);
      this.editorView.off('cursor:moved', this.onCursorMoved);
      this.renamingCursor = cursor;
      this.renamingMarkers = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = ranges.length; _i < _len; _i++) {
          range = ranges[_i];
          this.editor.addSelectionForBufferRange(range);
          marker = this.editor.markBufferRange(range);
          this.editor.decorateMarker(marker, {
            type: 'highlight',
            "class": 'refactor-reference'
          });
          _results.push(marker);
        }
        return _results;
      }).call(this);
      this.editorView.off('cursor:moved', this.abort);
      this.editorView.on('cursor:moved', this.abort);
      return true;
    };

    Watcher.prototype.abort = function() {
      var isMarkerContainsCursor, isMarkersContainsCursors, marker, markerRange, selectedRange, selectedRanges, _i, _j, _len, _len1, _ref;
      if (!(this.isActive() && (this.renamingCursor != null) && (this.renamingMarkers != null))) {
        return;
      }
      selectedRanges = this.editor.getSelectedBufferRanges();
      isMarkersContainsCursors = true;
      _ref = this.renamingMarkers;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        marker = _ref[_i];
        markerRange = marker.getBufferRange();
        isMarkerContainsCursor = false;
        for (_j = 0, _len1 = selectedRanges.length; _j < _len1; _j++) {
          selectedRange = selectedRanges[_j];
          isMarkerContainsCursor || (isMarkerContainsCursor = markerRange.containsRange(selectedRange));
          if (isMarkerContainsCursor) {
            break;
          }
        }
        isMarkersContainsCursors && (isMarkersContainsCursors = isMarkerContainsCursor);
        if (!isMarkersContainsCursors) {
          break;
        }
      }
      if (isMarkersContainsCursors) {
        return;
      }
      return this.done();
    };

    Watcher.prototype.done = function() {
      var marker, _i, _len, _ref;
      if (!(this.isActive() && (this.renamingCursor != null) && (this.renamingMarkers != null))) {
        return false;
      }
      this.editorView.off('cursor:moved', this.abort);
      this.editor.setCursorBufferPosition(this.renamingCursor.getBufferPosition());
      delete this.renamingCursor;
      _ref = this.renamingMarkers;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        marker = _ref[_i];
        marker.destroy();
      }
      delete this.renamingMarkers;
      this.parse();
      this.editor.buffer.off('changed', this.onBufferChanged);
      this.editor.buffer.on('changed', this.onBufferChanged);
      this.editorView.off('cursor:moved', this.onCursorMoved);
      this.editorView.on('cursor:moved', this.onCursorMoved);
      return true;
    };


    /*
    User events
     */

    Watcher.prototype.onBufferChanged = function() {
      clearTimeout(this.bufferChangedTimeoutId);
      return this.bufferChangedTimeoutId = setTimeout(this.parse, 0);
    };

    Watcher.prototype.onCursorMoved = function() {
      clearTimeout(this.cursorMovedTimeoutId);
      return this.cursorMovedTimeoutId = setTimeout(this.onCursorMovedAfter, 0);
    };

    Watcher.prototype.onCursorMovedAfter = function() {
      this.destroyReferences();
      return this.createReferences();
    };


    /*
    Utility
     */

    Watcher.prototype.isActive = function() {
      return (this.module != null) && atom.workspace.getActivePaneItem() === this.editor;
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

  })(EventEmitter2);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDJDQUFBO0lBQUE7O21TQUFBOztBQUFBLEVBQUUsZ0JBQWtCLE9BQUEsQ0FBUSxlQUFSLEVBQWxCLGFBQUYsQ0FBQTs7QUFBQSxFQUNFLHNCQUF3QixPQUFBLENBQVEsc0JBQVIsRUFBeEIsbUJBREYsQ0FBQTs7QUFBQSxFQUdBLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFFSiw4QkFBQSxDQUFBOztBQUFhLElBQUEsaUJBQUUsYUFBRixFQUFrQixVQUFsQixHQUFBO0FBQ1gsTUFEWSxJQUFDLENBQUEsZ0JBQUEsYUFDYixDQUFBO0FBQUEsTUFENEIsSUFBQyxDQUFBLGFBQUEsVUFDN0IsQ0FBQTtBQUFBLHFFQUFBLENBQUE7QUFBQSwyREFBQSxDQUFBO0FBQUEsK0RBQUEsQ0FBQTtBQUFBLDJDQUFBLENBQUE7QUFBQSx5REFBQSxDQUFBO0FBQUEscURBQUEsQ0FBQTtBQUFBLDJDQUFBLENBQUE7QUFBQSwyREFBQSxDQUFBO0FBQUEsdURBQUEsQ0FBQTtBQUFBLGlEQUFBLENBQUE7QUFBQSxNQUFBLHVDQUFBLENBQUEsQ0FBQTtBQUFBLE1BQ0EsSUFBQyxDQUFBLE1BQUQsR0FBVSxJQUFDLENBQUEsVUFBVSxDQUFDLE1BRHRCLENBQUE7QUFBQSxNQUVBLElBQUMsQ0FBQSxNQUFNLENBQUMsRUFBUixDQUFXLGlCQUFYLEVBQThCLElBQUMsQ0FBQSxhQUEvQixDQUZBLENBQUE7QUFBQSxNQUdBLElBQUMsQ0FBQSxhQUFhLENBQUMsRUFBZixDQUFrQixTQUFsQixFQUE2QixJQUFDLENBQUEsYUFBOUIsQ0FIQSxDQUFBO0FBQUEsTUFJQSxJQUFDLENBQUEsYUFBRCxDQUFBLENBSkEsQ0FEVztJQUFBLENBQWI7O0FBQUEsc0JBT0EsUUFBQSxHQUFVLFNBQUEsR0FBQTtBQUNSLE1BQUEsSUFB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
//# sourceURL=/Users/andrewhazlett/.atom/packages/refactor/lib/watcher.coffee
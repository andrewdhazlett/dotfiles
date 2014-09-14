(function() {
  var $, CONFIGS, Debug, MinimapEditorView, MinimapIndicator, MinimapView, View, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom'), $ = _ref.$, View = _ref.View;

  MinimapEditorView = require('./minimap-editor-view');

  MinimapIndicator = require('./minimap-indicator');

  Debug = require('prolix');

  CONFIGS = require('./config');

  module.exports = MinimapView = (function(_super) {
    __extends(MinimapView, _super);

    Debug('minimap').includeInto(MinimapView);

    MinimapView.content = function() {
      return this.div({
        "class": 'minimap'
      }, (function(_this) {
        return function() {
          return _this.div({
            outlet: 'miniWrapper',
            "class": "minimap-wrapper"
          }, function() {
            _this.div({
              outlet: 'miniUnderlayer',
              "class": "minimap-underlayer"
            });
            _this.subview('miniEditorView', new MinimapEditorView());
            return _this.div({
              outlet: 'miniOverlayer',
              "class": "minimap-overlayer"
            }, function() {
              return _this.div({
                outlet: 'miniVisibleArea',
                "class": "minimap-visible-area"
              });
            });
          });
        };
      })(this));
    };

    MinimapView.prototype.configs = {};

    MinimapView.prototype.isClicked = false;

    function MinimapView(paneView) {
      this.paneView = paneView;
      this.onDragEnd = __bind(this.onDragEnd, this);
      this.onMove = __bind(this.onMove, this);
      this.onDragStart = __bind(this.onDragStart, this);
      this.onScrollViewResized = __bind(this.onScrollViewResized, this);
      this.onMouseDown = __bind(this.onMouseDown, this);
      this.onMouseWheel = __bind(this.onMouseWheel, this);
      this.onActiveItemChanged = __bind(this.onActiveItemChanged, this);
      this.updateScroll = __bind(this.updateScroll, this);
      this.updateScrollX = __bind(this.updateScrollX, this);
      this.updateScrollY = __bind(this.updateScrollY, this);
      this.updateMinimapView = __bind(this.updateMinimapView, this);
      this.updateMinimapEditorView = __bind(this.updateMinimapEditorView, this);
      MinimapView.__super__.constructor.apply(this, arguments);
      this.scaleX = 0.2;
      this.scaleY = this.scaleX * 0.8;
      this.minimapScale = this.scale(this.scaleX, this.scaleY);
      this.miniScrollView = this.miniEditorView.scrollView;
      this.transform(this.miniWrapper[0], this.minimapScale);
      this.isPressed = false;
      this.offsetLeft = 0;
      this.offsetTop = 0;
      this.indicator = new MinimapIndicator();
    }

    MinimapView.prototype.initialize = function() {
      var themeProp;
      this.on('mousewheel', this.onMouseWheel);
      this.on('mousedown', this.onMouseDown);
      this.on('mousedown', '.minimap-visible-area', this.onDragStart);
      this.subscribe(this.paneView.model.$activeItem, this.onActiveItemChanged);
      this.subscribe(this.paneView.model, 'item-removed', function(item) {
        return item.off('.minimap');
      });
      this.subscribe(this.miniEditorView, 'minimap:updated', this.updateMinimapView);
      this.subscribe($(window), 'resize:end', this.onScrollViewResized);
      themeProp = 'minimap.theme';
      return this.subscribe(atom.config.observe(themeProp, {
        callNow: true
      }, (function(_this) {
        return function() {
          var _ref1;
          _this.configs.theme = (_ref1 = atom.config.get(themeProp)) != null ? _ref1 : CONFIGS.theme;
          return _this.updateTheme();
        };
      })(this)));
    };

    MinimapView.prototype.destroy = function() {
      this.off();
      this.unsubscribe();
      this.deactivatePaneViewMinimap();
      this.miniEditorView.destroy();
      return this.remove();
    };

    MinimapView.prototype.attachToPaneView = function() {
      return this.paneView.append(this);
    };

    MinimapView.prototype.detachFromPaneView = function() {
      return this.detach();
    };

    MinimapView.prototype.activatePaneViewMinimap = function() {
      this.paneView.addClass('with-minimap');
      return this.attachToPaneView();
    };

    MinimapView.prototype.deactivatePaneViewMinimap = function() {
      this.paneView.removeClass('with-minimap');
      return this.detachFromPaneView();
    };

    MinimapView.prototype.activeViewSupportMinimap = function() {
      return this.getEditor() != null;
    };

    MinimapView.prototype.minimapIsAttached = function() {
      return this.paneView.find('.minimap').length === 1;
    };

    MinimapView.prototype.storeActiveEditor = function() {
      this.editorView = this.getEditorView();
      this.editor = this.editorView.getEditor();
      this.unsubscribeFromEditor();
      this.scrollView = this.editorView.scrollView;
      this.scrollViewLines = this.scrollView.find('.lines');
      return this.subscribeToEditor();
    };

    MinimapView.prototype.unsubscribeFromEditor = function() {
      if (this.editor != null) {
        this.unsubscribe(this.editor, '.minimap');
      }
      if (this.scrollView != null) {
        return this.unsubscribe(this.scrollView, '.minimap');
      }
    };

    MinimapView.prototype.subscribeToEditor = function() {
      this.subscribe(this.editor, 'screen-lines-changed.minimap', this.updateMinimapEditorView);
      this.subscribe(this.editor, 'scroll-top-changed.minimap', this.updateScrollY);
      return this.subscribe(this.scrollView, 'scroll.minimap', this.updateScrollX);
    };

    MinimapView.prototype.getEditorView = function() {
      return this.paneView.viewForItem(this.activeItem);
    };

    MinimapView.prototype.getEditorViewClientRect = function() {
      return this.scrollView[0].getBoundingClientRect();
    };

    MinimapView.prototype.getScrollViewClientRect = function() {
      return this.scrollViewLines[0].getBoundingClientRect();
    };

    MinimapView.prototype.getMinimapClientRect = function() {
      return this[0].getBoundingClientRect();
    };

    MinimapView.prototype.getEditor = function() {
      return this.paneView.model.getActiveEditor();
    };

    MinimapView.prototype.setMinimapEditorView = function() {
      return setImmediate((function(_this) {
        return function() {
          return _this.miniEditorView.setEditorView(_this.editorView);
        };
      })(this));
    };

    MinimapView.prototype.updateTheme = function() {
      return this.attr({
        'data-theme': this.configs.theme
      });
    };

    MinimapView.prototype.updateMinimapEditorView = function() {
      return this.miniEditorView.update();
    };

    MinimapView.prototype.updateMinimapView = function() {
      var editorViewRect, evh, evw, height, miniScrollViewRect, msvh, msvw, width, _ref1;
      if (!this.editorView) {
        return;
      }
      if (!this.indicator) {
        return;
      }
      this.offset({
        top: (this.offsetTop = this.editorView.offset().top)
      });
      _ref1 = this.getMinimapClientRect(), width = _ref1.width, height = _ref1.height;
      editorViewRect = this.getEditorViewClientRect();
      miniScrollViewRect = this.miniEditorView.getClientRect();
      width /= this.scaleX;
      height /= this.scaleY;
      evw = editorViewRect.width;
      evh = editorViewRect.height;
      this.miniWrapper.css({
        width: width
      });
      this.miniVisibleArea.css({
        width: this.indicator.width = width,
        height: this.indicator.height = evh
      });
      msvw = miniScrollViewRect.width || 0;
      msvh = miniScrollViewRect.height || 0;
      this.indicator.setWrapperSize(width, Math.min(height, msvh));
      this.indicator.setScrollerSize(msvw, msvh);
      this.indicator.updateBoundary();
      return setImmediate((function(_this) {
        return function() {
          return _this.updateScroll();
        };
      })(this));
    };

    MinimapView.prototype.updateScrollY = function(top) {
      var overlayY, overlayerOffset, scrollViewOffset;
      if (top != null) {
        overlayY = top;
      } else {
        scrollViewOffset = this.scrollView.offset().top;
        overlayerOffset = this.scrollView.find('.overlayer').offset().top;
        overlayY = -overlayerOffset + scrollViewOffset;
      }
      this.indicator.setY(overlayY);
      return this.updatePositions();
    };

    MinimapView.prototype.updateScrollX = function() {
      this.indicator.setX(this.scrollView[0].scrollLeft);
      return this.updatePositions();
    };

    MinimapView.prototype.updateScroll = function() {
      this.updateScrollX();
      return this.updateScrollY();
    };

    MinimapView.prototype.updatePositions = function() {
      this.transform(this.miniVisibleArea[0], this.translate(this.indicator.x, this.indicator.y));
      return this.transform(this.miniWrapper[0], this.minimapScale + this.translate(this.indicator.scroller.x, this.indicator.scroller.y));
    };

    MinimapView.prototype.onActiveItemChanged = function(item) {
      if (item === this.activeItem) {
        return;
      }
      this.activeItem = item;
      if (this.activeViewSupportMinimap()) {
        this.log('minimap is supported by the current tab');
        if (!this.minimapIsAttached()) {
          this.activatePaneViewMinimap();
        }
        this.storeActiveEditor();
        this.setMinimapEditorView();
        return this.updateMinimapView();
      } else {
        this.deactivatePaneViewMinimap();
        return this.log('minimap is not supported by the current tab');
      }
    };

    MinimapView.prototype.onMouseWheel = function(e) {
      var wheelDeltaX, wheelDeltaY, _ref1;
      if (this.isClicked) {
        return;
      }
      _ref1 = e.originalEvent, wheelDeltaX = _ref1.wheelDeltaX, wheelDeltaY = _ref1.wheelDeltaY;
      if (wheelDeltaX) {
        this.editorView.scrollLeft(this.editorView.scrollLeft() - wheelDeltaX);
      }
      if (wheelDeltaY) {
        return this.editorView.scrollTop(this.editorView.scrollTop() - wheelDeltaY);
      }
    };

    MinimapView.prototype.onMouseDown = function(e) {
      var top, y;
      this.isClicked = true;
      e.preventDefault();
      e.stopPropagation();
      y = e.pageY - this.offsetTop;
      top = this.indicator.computeFromCenterY(y / this.scaleY);
      this.editorView.scrollTop(top);
      return setTimeout((function(_this) {
        return function() {
          return _this.isClicked = false;
        };
      })(this), 377);
    };

    MinimapView.prototype.onScrollViewResized = function() {
      return this.updateMinimapView();
    };

    MinimapView.prototype.onDragStart = function(e) {
      if (e.which !== 1) {
        return;
      }
      this.isPressed = true;
      this.on('mousemove.visible-area', this.onMove);
      return this.on('mouseup.visible-area', this.onDragEnd);
    };

    MinimapView.prototype.onMove = function(e) {
      if (this.isPressed) {
        return this.onMouseDown(e);
      }
    };

    MinimapView.prototype.onDragEnd = function(e) {
      this.isPressed = false;
      return this.off('.visible-area');
    };

    MinimapView.prototype.scale = function(x, y) {
      if (x == null) {
        x = 1;
      }
      if (y == null) {
        y = 1;
      }
      return "scale(" + x + ", " + y + ") ";
    };

    MinimapView.prototype.translate = function(x, y) {
      if (x == null) {
        x = 0;
      }
      if (y == null) {
        y = 0;
      }
      return "translate3d(" + x + "px, " + y + "px, 0)";
    };

    MinimapView.prototype.transform = function(el, transform) {
      return el.style.webkitTransform = el.style.transform = transform;
    };

    return MinimapView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLCtFQUFBO0lBQUE7O21TQUFBOztBQUFBLEVBQUEsT0FBWSxPQUFBLENBQVEsTUFBUixDQUFaLEVBQUMsU0FBQSxDQUFELEVBQUksWUFBQSxJQUFKLENBQUE7O0FBQUEsRUFFQSxpQkFBQSxHQUFvQixPQUFBLENBQVEsdUJBQVIsQ0FGcEIsQ0FBQTs7QUFBQSxFQUdBLGdCQUFBLEdBQW1CLE9BQUEsQ0FBUSxxQkFBUixDQUhuQixDQUFBOztBQUFBLEVBSUEsS0FBQSxHQUFRLE9BQUEsQ0FBUSxRQUFSLENBSlIsQ0FBQTs7QUFBQSxFQU1BLE9BQUEsR0FBVSxPQUFBLENBQVEsVUFBUixDQU5WLENBQUE7O0FBQUEsRUFRQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ0osa0NBQUEsQ0FBQTs7QUFBQSxJQUFBLEtBQUEsQ0FBTSxTQUFOLENBQWdCLENBQUMsV0FBakIsQ0FBNkIsV0FBN0IsQ0FBQSxDQUFBOztBQUFBLElBRUEsV0FBQyxDQUFBLE9BQUQsR0FBVSxTQUFBLEdBQUE7YUFDUixJQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsUUFBQSxPQUFBLEVBQU8sU0FBUDtPQUFMLEVBQXVCLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQ3JCLEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxZQUFBLE1BQUEsRUFBUSxhQUFSO0FBQUEsWUFBdUIsT0FBQSxFQUFPLGlCQUE5QjtXQUFMLEVBQXNELFNBQUEsR0FBQTtBQUNwRCxZQUFBLEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxjQUFBLE1BQUEsRUFBUSxnQkFBUjtBQUFBLGNBQTBCLE9BQUEsRUFBTyxvQkFBakM7YUFBTCxDQUFBLENBQUE7QUFBQSxZQUNBLEtBQUMsQ0FBQSxPQUFELENBQVMsZ0JBQVQsRUFBK0IsSUFB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
//# sourceURL=/Users/andrewhazlett/.atom/packages/minimap/lib/minimap-view.coffee
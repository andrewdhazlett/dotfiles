(function() {
  var $, File, PdfEditorView, ScrollView, fs, path, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom'), $ = _ref.$, ScrollView = _ref.ScrollView;

  fs = require('fs-plus');

  path = require('path');

  require('./../node_modules/pdf.js/build/singlefile/build/pdf.combined.js');

  File = require('pathwatcher').File;

  module.exports = PdfEditorView = (function(_super) {
    __extends(PdfEditorView, _super);

    function PdfEditorView() {
      return PdfEditorView.__super__.constructor.apply(this, arguments);
    }

    atom.deserializers.add(PdfEditorView);

    PdfEditorView.deserialize = function(_arg) {
      var filePath;
      filePath = _arg.filePath;
      if (fs.isFileSync(filePath)) {
        return new PdfEditorView(filePath);
      } else {
        return console.warn("Could not deserialize PDF editor for path '" + filePath + "' because that file no longer exists");
      }
    };

    PdfEditorView.content = function() {
      return this.div({
        "class": 'pdf-view',
        tabindex: -1
      }, (function(_this) {
        return function() {
          return _this.div({
            outlet: 'container'
          });
        };
      })(this));
    };

    PdfEditorView.prototype.initialize = function(path) {
      PdfEditorView.__super__.initialize.apply(this, arguments);
      this.currentScale = 1.5;
      this.defaultScale = 1.5;
      this.scaleFactor = 10.0;
      this.filePath = path;
      this.file = new File(this.filePath);
      this.canvases = [];
      this.updatePdf();
      this.currentPageNumber = 0;
      this.totalPageNumber = 0;
      this.centersBetweenPages = [];
      this.pageHeights = [];
      this.scrollTopBeforeUpdate = 0;
      this.scrollLeftBeforeUpdate = 0;
      this.updating = false;
      this.subscribe(this.file, 'contents-changed', (function(_this) {
        return function() {
          return _this.updatePdf();
        };
      })(this));
      this.subscribe(this, 'core:move-left', (function(_this) {
        return function() {
          return _this.scrollLeft(_this.scrollLeft() - $(window).width() / 20);
        };
      })(this));
      this.subscribe(this, 'core:move-right', (function(_this) {
        return function() {
          return _this.scrollRight(_this.scrollRight() + $(window).width() / 20);
        };
      })(this));
      this.on('scroll', (function(_this) {
        return function() {
          return _this.onScroll();
        };
      })(this));
      this.subscribe($(window), 'resize', (function(_this) {
        return function() {
          return _this.setCurrentPageNumber();
        };
      })(this));
      this.command('pdf-view:zoom-in', (function(_this) {
        return function() {
          return _this.zoomIn();
        };
      })(this));
      this.command('pdf-view:zoom-out', (function(_this) {
        return function() {
          return _this.zoomOut();
        };
      })(this));
      return this.command('pdf-view:reset-zoom', (function(_this) {
        return function() {
          return _this.resetZoom();
        };
      })(this));
    };

    PdfEditorView.prototype.onScroll = function() {
      if (!this.updating) {
        this.scrollTopBeforeUpdate = this.scrollTop();
        this.scrollLeftBeforeUpdate = this.scrollLeft();
      }
      return this.setCurrentPageNumber();
    };

    PdfEditorView.prototype.setCurrentPageNumber = function() {
      var center, pdfPageNumber, _i, _j, _ref1, _ref2;
      if (!this.pdfDocument) {
        return;
      }
      center = (this.scrollBottom() + this.scrollTop()) / 2.0;
      this.currentPageNumber = 1;
      if (this.centersBetweenPages.length === 0 && this.pageHeights.length === this.pdfDocument.numPages) {
        for (pdfPageNumber = _i = 1, _ref1 = this.pdfDocument.numPages; 1 <= _ref1 ? _i <= _ref1 : _i >= _ref1; pdfPageNumber = 1 <= _ref1 ? ++_i : --_i) {
          this.centersBetweenPages.push((this.pageHeights.slice(0, +(pdfPageNumber - 1) + 1 || 9e9).reduce((function(x, y) {
            return x + y;
          }), 0)) + pdfPageNumber * 20 - 10);
        }
      }
      for (pdfPageNumber = _j = 2, _ref2 = this.pdfDocument.numPages; 2 <= _ref2 ? _j <= _ref2 : _j >= _ref2; pdfPageNumber = 2 <= _ref2 ? ++_j : --_j) {
        if (center >= this.centersBetweenPages[pdfPageNumber - 2] && center < this.centersBetweenPages[pdfPageNumber - 1]) {
          this.currentPageNumber = pdfPageNumber;
        }
      }
      return atom.workspaceView.trigger('pdf-view:current-page-update');
    };

    PdfEditorView.prototype.updatePdf = function() {
      var pdfData;
      this.updating = true;
      this.container.find("canvas").remove();
      this.canvases = [];
      pdfData = new Uint8Array(fs.readFileSync(this.filePath));
      return PDFJS.getDocument(pdfData).then((function(_this) {
        return function(pdfDocument) {
          var canvas, pdfPageNumber, _i, _ref1;
          _this.pdfDocument = pdfDocument;
          _this.totalPageNumber = _this.pdfDocument.numPages;
          for (pdfPageNumber = _i = 1, _ref1 = _this.pdfDocument.numPages; 1 <= _ref1 ? _i <= _ref1 : _i >= _ref1; pdfPageNumber = 1 <= _ref1 ? ++_i : --_i) {
            canvas = $("<canvas/>", {
              "class": "page-container"
            }).appendTo(_this.container)[0];
            _this.canvases.push(canvas);
          }
          return _this.renderPdf();
        };
      })(this));
    };

    PdfEditorView.prototype.renderPdf = function(scrollAfterRender) {
      var canvas, pdfPageNumber, _i, _ref1, _results;
      if (scrollAfterRender == null) {
        scrollAfterRender = true;
      }
      this.centersBetweenPages = [];
      this.pageHeights = [];
      _results = [];
      for (pdfPageNumber = _i = 1, _ref1 = this.pdfDocument.numPages; 1 <= _ref1 ? _i <= _ref1 : _i >= _ref1; pdfPageNumber = 1 <= _ref1 ? ++_i : --_i) {
        canvas = this.canvases[pdfPageNumber - 1];
        _results.push((function(_this) {
          return function(canvas) {
            return _this.pdfDocument.getPage(pdfPageNumber).then(function(pdfPage) {
              var context, viewport;
              viewport = pdfPage.getViewport(_this.currentScale);
              context = canvas.getContext('2d');
              canvas.height = viewport.height;
              canvas.width = viewport.width;
              _this.pageHeights.push(Math.floor(viewport.height));
              pdfPage.render({
                canvasContext: context,
                viewport: viewport
              });
              if (pdfPage.pageNumber === _this.pdfDocument.numPages && scrollAfterRender) {
                _this.scrollTop(_this.scrollTopBeforeUpdate);
                _this.scrollLeft(_this.scrollLeftBeforeUpdate);
                _this.setCurrentPageNumber();
                return _this.updating = false;
              }
            });
          };
        })(this)(canvas));
      }
      return _results;
    };

    PdfEditorView.prototype.zoomOut = function() {
      return this.adjustSize(100 / (100 + this.scaleFactor));
    };

    PdfEditorView.prototype.zoomIn = function() {
      return this.adjustSize((100 + this.scaleFactor) / 100);
    };

    PdfEditorView.prototype.resetZoom = function() {
      return this.adjustSize(this.defaultScale / this.currentScale);
    };

    PdfEditorView.prototype.computeZoomedScrollTop = function(oldScrollTop, oldPageHeights) {
      var partOfPaddingAboveUpperBorder, partOfPageAboveUpperBorder, pdfPageNumber, pixelsToZoom, spacesToSkip, zoomFactorForPage, zoomedPixels, _i, _ref1;
      pixelsToZoom = 0;
      spacesToSkip = 0;
      zoomedPixels = 0;
      for (pdfPageNumber = _i = 0, _ref1 = this.pdfDocument.numPages; 0 <= _ref1 ? _i < _ref1 : _i > _ref1; pdfPageNumber = 0 <= _ref1 ? ++_i : --_i) {
        if (pixelsToZoom + spacesToSkip + oldPageHeights[pdfPageNumber] > oldScrollTop) {
          zoomFactorForPage = this.pageHeights[pdfPageNumber] / oldPageHeights[pdfPageNumber];
          partOfPageAboveUpperBorder = oldScrollTop - (pixelsToZoom + spacesToSkip);
          zoomedPixels += Math.round(partOfPageAboveUpperBorder * zoomFactorForPage);
          pixelsToZoom += partOfPageAboveUpperBorder;
          break;
        } else {
          pixelsToZoom += oldPageHeights[pdfPageNumber];
          zoomedPixels += this.pageHeights[pdfPageNumber];
        }
        if (pixelsToZoom + spacesToSkip + 20 > oldScrollTop) {
          partOfPaddingAboveUpperBorder = oldScrollTop - (pixelsToZoom + spacesToSkip);
          spacesToSkip += partOfPaddingAboveUpperBorder;
          break;
        } else {
          spacesToSkip += 20;
        }
      }
      return zoomedPixels + spacesToSkip;
    };

    PdfEditorView.prototype.adjustSize = function(factor) {
      var oldPageHeights, oldScrollTop;
      oldScrollTop = this.scrollTop();
      oldPageHeights = this.pageHeights.slice(0);
      this.currentScale = this.currentScale * factor;
      this.renderPdf(false);
      process.nextTick((function(_this) {
        return function() {
          var newScrollTop;
          newScrollTop = _this.computeZoomedScrollTop(oldScrollTop, oldPageHeights);
          return _this.scrollTop(newScrollTop);
        };
      })(this));
      return process.nextTick((function(_this) {
        return function() {
          var newScrollLeft;
          newScrollLeft = _this.scrollLeft() * factor;
          return _this.scrollLeft(newScrollLeft);
        };
      })(this));
    };

    PdfEditorView.prototype.getCurrentPageNumber = function() {
      return this.currentPageNumber;
    };

    PdfEditorView.prototype.getTotalPageNumber = function() {
      return this.totalPageNumber;
    };

    PdfEditorView.prototype.scrollToPage = function(pdfPageNumber) {
      var pageScrollPosition;
      if (!this.pdfDocument || isNaN(pdfPageNumber)) {
        return;
      }
      if (!(pdfPageNumber < this.pdfDocument.numPages)) {
        pdfPageNumber = this.pdfDocument.numPages;
      }
      pageScrollPosition = (this.pageHeights.slice(0, pdfPageNumber - 1).reduce((function(x, y) {
        return x + y;
      }), 0)) + (pdfPageNumber - 1) * 20;
      return this.scrollTop(pageScrollPosition);
    };

    PdfEditorView.prototype.serialize = function() {
      return {
        filePath: this.filePath,
        deserializer: 'PdfEditorView'
      };
    };

    PdfEditorView.prototype.getTitle = function() {
      if (this.filePath != null) {
        return path.basename(this.filePath);
      } else {
        return 'untitled';
      }
    };

    PdfEditorView.prototype.getUri = function() {
      return this.filePath;
    };

    PdfEditorView.prototype.getPath = function() {
      return this.filePath;
    };

    PdfEditorView.prototype.destroy = function() {
      return this.detach();
    };

    return PdfEditorView;

  })(ScrollView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGtEQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxPQUFrQixPQUFBLENBQVEsTUFBUixDQUFsQixFQUFDLFNBQUEsQ0FBRCxFQUFJLGtCQUFBLFVBQUosQ0FBQTs7QUFBQSxFQUNBLEVBQUEsR0FBSyxPQUFBLENBQVEsU0FBUixDQURMLENBQUE7O0FBQUEsRUFFQSxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVIsQ0FGUCxDQUFBOztBQUFBLEVBR0EsT0FBQSxDQUFRLGlFQUFSLENBSEEsQ0FBQTs7QUFBQSxFQUlDLE9BQVEsT0FBQSxDQUFRLGFBQVIsRUFBUixJQUpELENBQUE7O0FBQUEsRUFNQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ0osb0NBQUEsQ0FBQTs7OztLQUFBOztBQUFBLElBQUEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFuQixDQUF1QixhQUF2QixDQUFBLENBQUE7O0FBQUEsSUFFQSxhQUFDLENBQUEsV0FBRCxHQUFjLFNBQUMsSUFBRCxHQUFBO0FBQ1osVUFBQSxRQUFBO0FBQUEsTUFEYyxXQUFELEtBQUMsUUFDZCxDQUFBO0FBQUEsTUFBQSxJQUFHLEVBQUUsQ0FBQyxVQUFILENBQWMsUUFBZCxDQUFIO2VBQ00sSUFBQSxhQUFBLENBQWMsUUFBZCxFQUROO09BQUEsTUFBQTtlQUdFLE9BQU8sQ0FBQyxJQUFSLENBQWMsNkNBQUEsR0FBNEMsUUFBNUMsR0FBc0Qsc0NBQXBFLEVBSEY7T0FEWTtJQUFBLENBRmQsQ0FBQTs7QUFBQSxJQVFBLGFBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQSxHQUFBO2FBQ1IsSUFBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFFBQUEsT0FBQSxFQUFPLFVBQVA7QUFBQSxRQUFtQixRQUFBLEVBQVUsQ0FBQSxDQUE3QjtPQUFMLEVBQXNDLENBQUEs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
//# sourceURL=/Users/andrewhazlett/.atom/packages/pdf-view/lib/pdf-editor-view.coffee
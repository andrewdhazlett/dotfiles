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

    PdfEditorView.prototype.renderPdf = function() {
      var canvas, pdfPageNumber, _i, _ref1, _results;
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
              _this.pageHeights.push(viewport.height);
              pdfPage.render({
                canvasContext: context,
                viewport: viewport
              });
              if (pdfPage.pageNumber === _this.pdfDocument.numPages) {
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
      return this.adjustSize((100 - this.scaleFactor) / 100);
    };

    PdfEditorView.prototype.zoomIn = function() {
      return this.adjustSize((100 + this.scaleFactor) / 100);
    };

    PdfEditorView.prototype.resetZoom = function() {
      return this.adjustSize(this.defaultScale / this.currentScale);
    };

    PdfEditorView.prototype.adjustSize = function(factor) {
      this.currentScale = this.currentScale * factor;
      this.renderPdf();
      this.scrollTop(this.scrollTop() * factor);
      return this.scrollLeft(this.scrollLeft() * factor);
    };

    PdfEditorView.prototype.getCurrentPageNumber = function() {
      return this.currentPageNumber;
    };

    PdfEditorView.prototype.getTotalPageNumber = function() {
      return this.totalPageNumber;
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
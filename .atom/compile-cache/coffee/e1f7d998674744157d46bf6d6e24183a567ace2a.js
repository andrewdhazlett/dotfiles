(function() {
  var $, EditorView, PdfGoToPageView, View, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom'), $ = _ref.$, EditorView = _ref.EditorView, View = _ref.View;

  module.exports = PdfGoToPageView = (function(_super) {
    __extends(PdfGoToPageView, _super);

    function PdfGoToPageView() {
      return PdfGoToPageView.__super__.constructor.apply(this, arguments);
    }

    PdfGoToPageView.content = function() {
      return this.div({
        "class": 'go-to-page overlay from-top mini'
      }, (function(_this) {
        return function() {
          _this.subview('miniEditor', new EditorView({
            mini: true
          }));
          return _this.div({
            "class": 'message',
            outlet: 'message'
          });
        };
      })(this));
    };

    PdfGoToPageView.prototype.detaching = false;

    PdfGoToPageView.prototype.initialize = function() {
      atom.workspaceView.command('pdf-view:go-to-page', (function(_this) {
        return function() {
          _this.toggle();
          return false;
        };
      })(this));
      this.miniEditor.hiddenInput.on('focusout', (function(_this) {
        return function() {
          if (!_this.detaching) {
            return _this.detach();
          }
        };
      })(this));
      this.on('core:confirm', (function(_this) {
        return function() {
          return _this.confirm();
        };
      })(this));
      this.on('core:cancel', (function(_this) {
        return function() {
          return _this.detach();
        };
      })(this));
      return this.miniEditor.preempt('textInput', (function(_this) {
        return function(e) {
          if (!e.originalEvent.data.match(/[0-9]/)) {
            return false;
          }
        };
      })(this));
    };

    PdfGoToPageView.prototype.toggle = function() {
      if (this.hasParent()) {
        return this.detach();
      } else {
        return this.attach();
      }
    };

    PdfGoToPageView.prototype.detach = function() {
      var miniEditorFocused;
      if (!this.hasParent()) {
        return;
      }
      this.detaching = true;
      miniEditorFocused = this.miniEditor.isFocused;
      this.miniEditor.setText('');
      this.miniEditor.updateDisplay();
      PdfGoToPageView.__super__.detach.apply(this, arguments);
      if (miniEditorFocused) {
        this.restoreFocus();
      }
      return this.detaching = false;
    };

    PdfGoToPageView.prototype.confirm = function() {
      var pageNumber, pdfView;
      pageNumber = this.miniEditor.getText();
      pageNumber = parseInt(pageNumber, 10);
      pdfView = atom.workspaceView.getActiveView();
      this.detach();
      if (pdfView && pdfView.pdfDocument && pdfView.scrollToPage) {
        return pdfView.scrollToPage(pageNumber);
      }
    };

    PdfGoToPageView.prototype.storeFocusedElement = function() {
      return this.previouslyFocusedElement = $(':focus');
    };

    PdfGoToPageView.prototype.restoreFocus = function() {
      var _ref1;
      if ((_ref1 = this.previouslyFocusedElement) != null ? _ref1.isOnDom() : void 0) {
        return this.previouslyFocusedElement.focus();
      } else {
        return atom.workspaceView.focus();
      }
    };

    PdfGoToPageView.prototype.attach = function() {
      var pdfView;
      pdfView = atom.workspaceView.getActiveView();
      if (pdfView && pdfView.pdfDocument && pdfView.scrollToPage) {
        this.storeFocusedElement();
        atom.workspaceView.append(this);
        this.message.text("Enter a page number 1-" + (pdfView.getTotalPageNumber()));
        return this.miniEditor.focus();
      }
    };

    return PdfGoToPageView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDBDQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxPQUF3QixPQUFBLENBQVEsTUFBUixDQUF4QixFQUFDLFNBQUEsQ0FBRCxFQUFJLGtCQUFBLFVBQUosRUFBZ0IsWUFBQSxJQUFoQixDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUNKLHNDQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSxJQUFBLGVBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQSxHQUFBO2FBQ1IsSUFBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFFBQUEsT0FBQSxFQUFPLGtDQUFQO09BQUwsRUFBZ0QsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtBQUM5QyxVQUFBLEtBQUMsQ0FBQSxPQUFELENBQVMsWUFBVCxFQUEyQixJQUFBLFVBQUEsQ0FBVztBQUFBLFlBQUEsSUFBQSxFQUFNLElBQU47V0FBWCxDQUEzQixDQUFBLENBQUE7aUJBQ0EsS0FBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFlBQUEsT0FBQSxFQUFPLFNBQVA7QUFBQSxZQUFrQixNQUFBLEVBQVEsU0FBMUI7V0FBTCxFQUY4QztRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWhELEVBRFE7SUFBQSxDQUFWLENBQUE7O0FBQUEsOEJBS0EsU0FBQSxHQUFXLEtBTFgsQ0FBQTs7QUFBQSw4QkFPQSxVQUFBLEdBQVksU0FBQSxHQUFBO0FBQ1YsTUFBQSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQW5CLENBQTJCLHFCQUEzQixFQUFrRCxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO0FBQ2hELFVBQUEsS0FBQyxDQUFBLE1BQUQsQ0FBQSxDQUFBLENBQUE7aUJBQ0EsTUFGZ0Q7UUFBQSxFQUFBO01BQUEs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
//# sourceURL=/Users/andrewhazlett/.atom/packages/pdf-view/lib/pdf-goto-page-view.coffee
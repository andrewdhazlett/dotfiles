(function() {
  var PdfStatusBarView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('atom').View;

  module.exports = PdfStatusBarView = (function(_super) {
    __extends(PdfStatusBarView, _super);

    function PdfStatusBarView() {
      return PdfStatusBarView.__super__.constructor.apply(this, arguments);
    }

    PdfStatusBarView.content = function() {
      return this.div({
        "class": 'status-image inline-block'
      }, (function(_this) {
        return function() {
          return _this.span({
            "class": 'pdf-status',
            outlet: 'pdfStatus'
          });
        };
      })(this));
    };

    PdfStatusBarView.prototype.initialize = function(statusBar) {
      this.statusBar = statusBar;
      this.attach();
      this.subscribe(atom.workspaceView, 'pane-container:active-pane-item-changed', (function(_this) {
        return function() {
          return _this.updatePdfStatus();
        };
      })(this));
      return this.subscribe(atom.workspaceView, 'pdf-view:current-page-update', (function(_this) {
        return function() {
          return _this.updatePdfStatus();
        };
      })(this));
    };

    PdfStatusBarView.prototype.attach = function() {
      return this.statusBar.appendLeft(this);
    };

    PdfStatusBarView.prototype.afterAttach = function() {
      return this.updatePdfStatus();
    };

    PdfStatusBarView.prototype.getPdfStatus = function(view) {
      return this.pdfStatus.text("Page: " + view.currentPageNumber + "/" + view.totalPageNumber).show();
    };

    PdfStatusBarView.prototype.updatePdfStatus = function() {
      var view;
      view = atom.workspaceView.getActiveView();
      if (view && view.pdfDocument) {
        return this.getPdfStatus(view);
      } else {
        return this.pdfStatus.hide();
      }
    };

    return PdfStatusBarView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHNCQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxPQUFRLE9BQUEsQ0FBUSxNQUFSLEVBQVIsSUFBRCxDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUNKLHVDQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSxJQUFBLGdCQUFDLENBQUEsT0FBRCxHQUFVLFNBQUEsR0FBQTthQUNSLElBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxRQUFBLE9BQUEsRUFBTywyQkFBUDtPQUFMLEVBQXlDLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQ3ZDLEtBQUMsQ0FBQSxJQUFELENBQU07QUFBQSxZQUFBLE9BQUEsRUFBTyxZQUFQO0FBQUEsWUFBcUIsTUFBQSxFQUFRLFdBQTdCO1dBQU4sRUFEdUM7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF6QyxFQURRO0lBQUEsQ0FBVixDQUFBOztBQUFBLCtCQUlBLFVBQUEsR0FBWSxTQUFFLFNBQUYsR0FBQTtBQUNWLE1BRFcsSUFBQyxDQUFBLFlBQUEsU0FDWixDQUFBO0FBQUEsTUFBQSxJQUFDLENBQUEsTUFBRCxDQUFBLENBQUEsQ0FBQTtBQUFBLE1BRUEsSUFBQyxDQUFBLFNBQUQsQ0FBVyxJQUFJLENBQUMsYUFBaEIsRUFBK0IseUNBQS9CLEVBQTBFLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQ3hFLEtBQUMsQ0FBQSxlQUFELENBQUEsRUFEd0U7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUExRSxDQUZBLENBQUE7YUFLQSxJQUFDLENBQUEsU0FBRCxDQUFXLElBQUksQ0FBQyxhQUFoQixFQUErQiw4QkFBL0IsRUFBK0QsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFDN0QsS0FBQyxDQUFBLGVBQUQsQ0FBQSxFQUQ2RDtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQS9ELEVBTlU7SUFBQSxDQUpaLENBQUE7O0FBQUEsK0JBYUEsTUFBQSxHQUFRLFNBQUEsR0FBQTthQUNOLElBQUMsQ0FBQSxTQUFTLENBQUMsVUFBWCxDQUFzQixJQUF0QixFQURNO0lBQUEsQ0FiUixDQUFBOztBQUFBLCtCQWdCQSxXQUFBLEdBQWEsU0FBQSxHQUFBO2FBQ1gsSUFBQyxDQUFBLGVBQUQsQ0FBQSxFQURXO0lBQUEsQ0FoQmIsQ0FBQTs7QUFBQSwrQkFtQkEsWUFBQSxHQUFjLFNBQUMsSUFBRCxHQUFBO2FBQ1osSUFBQyxDQUFBLFNBQVMsQ0FBQyxJQUFYLENBQWlCLFFBQUEsR0FBTyxJQUFJLENBQUMsaUJBQVosR0FBK0IsR0FBL0IsR0FBaUMsSUFBSSxDQUFDLGVBQXZELENBQTBFLENBQUMsSUFBM0UsQ0FBQSxFQURZO0lBQUEsQ0FuQmQsQ0FBQTs7QUFBQSwrQkFzQkEsZUFBQSxHQUFpQixTQUFBLEdBQUE7QUFDZixVQUFBLElBQUE7QUFBQSxNQUFBLElBQUEsR0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQW5CLENBQUEsQ0FBUCxDQUFBO0FBRUEsTUFBQSxJQUFHLElBQUEsSUFBUyxJQUFJLENBQUMsV0FBakI7ZUFDRSxJQUFDLENBQUEsWUFBRCxDQUFjLElBQWQsRUFERjtPQUFBLE1BQUE7ZUFHRSxJQUFDLENBQUEsU0FBUyxDQUFDLElBQVgsQ0FBQSxFQUhGO09BSGU7SUFBQSxDQXRCakIsQ0FBQTs7NEJBQUE7O0tBRDZCLEtBSC9CLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/andrewhazlett/.atom/packages/pdf-view/lib/pdf-status-bar-view.coffee
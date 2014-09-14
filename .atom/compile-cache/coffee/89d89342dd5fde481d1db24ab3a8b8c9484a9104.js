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
          return _this.a({
            href: '#',
            "class": 'pdf-status inline-block',
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
      this.subscribe(atom.workspaceView, 'pdf-view:current-page-update', (function(_this) {
        return function() {
          return _this.updatePdfStatus();
        };
      })(this));
      return this.subscribe(this, 'click', function() {
        atom.workspaceView.trigger('pdf-view:go-to-page');
        return false;
      });
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHNCQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxPQUFRLE9BQUEsQ0FBUSxNQUFSLEVBQVIsSUFBRCxDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUNKLHVDQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSxJQUFBLGdCQUFDLENBQUEsT0FBRCxHQUFVLFNBQUEsR0FBQTthQUNSLElBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxRQUFBLE9BQUEsRUFBTywyQkFBUDtPQUFMLEVBQXlDLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQ3ZDLEtBQUMsQ0FBQSxDQUFELENBQUc7QUFBQSxZQUFBLElBQUEsRUFBTSxHQUFOO0FBQUEsWUFBVyxPQUFBLEVBQU8seUJBQWxCO0FBQUEsWUFBNkMsTUFBQSxFQUFRLFdBQXJEO1dBQUgsRUFEdUM7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF6QyxFQURRO0lBQUEsQ0FBVixDQUFBOztBQUFBLCtCQUlBLFVBQUEsR0FBWSxTQUFFLFNBQUYsR0FBQTtBQUNWLE1BRFcsSUFBQyxDQUFBLFlBQUEsU0FDWixDQUFBO0FBQUEsTUFBQSxJQUFDLENBQUEsTUFBRCxDQUFBLENBQUEsQ0FBQTtBQUFBLE1BRUEsSUFBQyxDQUFBLFNBQUQsQ0FBVyxJQUFJLENBQUMsYUFBaEIsRUFBK0IseUNBQS9CLEVBQTBFLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQ3hFLEtBQUMsQ0FBQSxlQUFELENBQUEsRUFEd0U7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUExRSxDQUZBLENBQUE7QUFBQSxNQUtBLElBQUMsQ0FBQSxTQUFELENBQVcsSUFBSSxDQUFDLGFBQWhCLEVBQStCLDhCQUEvQixFQUErRCxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO2lCQUM3RCxLQUFDLENBQUEsZUFBRCxDQUFBLEVBRDZEO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBL0QsQ0FMQSxDQUFBO2FBUUEsSUFBQyxDQUFBLFNBQUQsQ0FBVyxJQUFYLEVBQWlCLE9BQWpCLEVBQTBCLFNBQUEsR0FBQTtBQUN4QixRQUFBLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBbkIsQ0FBMkIscUJBQTNCLENBQUEsQ0FBQTtlQUNBLE1BRndCO01BQUEsQ0FBMUIsRUFUVTtJQUFBLENBSlosQ0FBQTs7QUFBQSwrQkFpQkEsTUFBQSxHQUFRLFNBQUEsR0FBQTthQUNOLElBQUMsQ0FBQSxTQUFTLENBQUMsVUFBWCxDQUFzQixJQUF0QixFQURNO0lBQUEsQ0FqQlIsQ0FBQTs7QUFBQSwrQkFvQkEsV0FBQSxHQUFhLFNBQUEsR0FBQTthQUNYLElBQUMsQ0FBQSxlQUFELENBQUEsRUFEVztJQUFBLENBcEJiLENBQUE7O0FBQUEsK0JBdUJBLFlBQUEsR0FBYyxTQUFDLElBQUQsR0FBQTthQUNaLElBQUMsQ0FBQSxTQUFTLENBQUMsSUFBWCxDQUFpQixRQUFBLEdBQU8sSUFBSSxDQUFDLGlCQUFaLEdBQStCLEdBQS9CLEdBQWlDLElBQUksQ0FBQyxlQUF2RCxDQUEwRSxDQUFDLElBQTNFLENBQUEsRUFEWTtJQUFBLENBdkJkLENBQUE7O0FBQUEsK0JBMEJBLGVBQUEsR0FBaUIsU0FBQSxHQUFBO0FBQ2YsVUFBQSxJQUFBO0FBQUEsTUFBQSxJQUFBLEdBQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFuQixDQUFBLENBQVAsQ0FBQTtBQUVBLE1BQUEsSUFBRyxJQUFBLElBQVMsSUFBSSxDQUFDLFdBQWpCO2VBQ0UsSUFBQyxDQUFBLFlBQUQsQ0FBYyxJQUFkLEVBREY7T0FBQSxNQUFBO2VBR0UsSUFBQyxDQUFBLFNBQVMsQ0FBQyxJQUFYLENBQUEsRUFIRjtPQUhlO0lBQUEsQ0ExQmpCLENBQUE7OzRCQUFBOztLQUQ2QixLQUgvQixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/andrewhazlett/.atom/packages/pdf-view/lib/pdf-status-bar-view.coffee
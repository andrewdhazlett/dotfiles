(function() {
  var PdfEditorView, PdfStatusBarView, createPdfStatusView, openUri, path, pdfExtensions,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  path = require('path');

  PdfEditorView = require('./pdf-editor-view');

  PdfStatusBarView = require('./pdf-status-bar-view');

  module.exports = {
    activate: function(state) {
      atom.workspace.registerOpener(openUri);
      return atom.packages.once('activated', createPdfStatusView);
    },
    deactivate: function() {
      return atom.workspace.unregisterOpener(openUri);
    }
  };

  pdfExtensions = ['.pdf'];

  openUri = function(uriToOpen) {
    var uriExtension;
    uriExtension = path.extname(uriToOpen).toLowerCase();
    if (__indexOf.call(pdfExtensions, uriExtension) >= 0) {
      return new PdfEditorView(uriToOpen);
    }
  };

  createPdfStatusView = function() {
    var statusBar, view;
    statusBar = atom.workspaceView.statusBar;
    if (statusBar != null) {
      view = new PdfStatusBarView(statusBar);
      return view.attach();
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGtGQUFBO0lBQUEscUpBQUE7O0FBQUEsRUFBQSxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVIsQ0FBUCxDQUFBOztBQUFBLEVBQ0EsYUFBQSxHQUFnQixPQUFBLENBQVEsbUJBQVIsQ0FEaEIsQ0FBQTs7QUFBQSxFQUVBLGdCQUFBLEdBQW1CLE9BQUEsQ0FBUyx1QkFBVCxDQUZuQixDQUFBOztBQUFBLEVBSUEsTUFBTSxDQUFDLE9BQVAsR0FDRTtBQUFBLElBQUEsUUFBQSxFQUFVLFNBQUMsS0FBRCxHQUFBO0FBQ1IsTUFBQSxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWYsQ0FBOEIsT0FBOUIsQ0FBQSxDQUFBO2FBQ0EsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFkLENBQW1CLFdBQW5CLEVBQWdDLG1CQUFoQyxFQUZRO0lBQUEsQ0FBVjtBQUFBLElBSUEsVUFBQSxFQUFZLFNBQUEsR0FBQTthQUNWLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWYsQ0FBZ0MsT0FBaEMsRUFEVTtJQUFBLENBSlo7R0FMRixDQUFBOztBQUFBLEVBYUEsYUFBQSxHQUFnQixDQUFDLE1BQUQsQ0FiaEIsQ0FBQTs7QUFBQSxFQWNBLE9BQUEsR0FBVSxTQUFDLFNBQUQsR0FBQTtBQUNSLFFBQUEsWUFBQTtBQUFBLElBQUEsWUFBQSxHQUFlLElBQUksQ0FBQyxPQUFMLENBQWEsU0FBYixDQUF1QixDQUFDLFdBQXhCLENBQUEsQ0FBZixDQUFBO0FBQ0EsSUFBQSxJQUFHLGVBQWdCLGFBQWhCLEVBQUEsWUFBQSxNQUFIO2FBQ00sSUFBQSxhQUFBLENBQWMsU0FBZCxFQUROO0tBRlE7RUFBQSxDQWRWLENBQUE7O0FBQUEsRUFtQkEsbUJBQUEsR0FBc0IsU0FBQSxHQUFBO0FBQ3BCLFFBQUEsZUFBQTtBQUFBLElBQUMsWUFBYSxJQUFJLENBQUMsY0FBbEIsU0FBRCxDQUFBO0FBQ0EsSUFBQSxJQUFHLGlCQUFIO0FBQ0UsTUFBQSxJQUFBLEdBQVcsSUFBQSxnQkFBQSxDQUFpQixTQUFqQixDQUFYLENBQUE7YUFDQSxJQUFJLENBQUMsTUFBTCxDQUFBLEVBRkY7S0FGb0I7RUFBQSxDQW5CdEIsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/andrewhazlett/.atom/packages/pdf-view/lib/pdf-editor.coffee
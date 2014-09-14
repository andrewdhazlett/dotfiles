(function() {
  var PdfEditorView, PdfGoToPageView, PdfStatusBarView, createPdfStatusView, openUri, path, pdfExtensions,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  path = require('path');

  PdfEditorView = require('./pdf-editor-view');

  PdfStatusBarView = require('./pdf-status-bar-view');

  PdfGoToPageView = require('./pdf-goto-page-view.coffee');

  module.exports = {
    activate: function(state) {
      atom.workspace.registerOpener(openUri);
      atom.packages.once('activated', createPdfStatusView);
      return new PdfGoToPageView();
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLG1HQUFBO0lBQUEscUpBQUE7O0FBQUEsRUFBQSxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVIsQ0FBUCxDQUFBOztBQUFBLEVBQ0EsYUFBQSxHQUFnQixPQUFBLENBQVEsbUJBQVIsQ0FEaEIsQ0FBQTs7QUFBQSxFQUVBLGdCQUFBLEdBQW1CLE9BQUEsQ0FBUyx1QkFBVCxDQUZuQixDQUFBOztBQUFBLEVBR0EsZUFBQSxHQUFrQixPQUFBLENBQVMsNkJBQVQsQ0FIbEIsQ0FBQTs7QUFBQSxFQUtBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLFFBQUEsRUFBVSxTQUFDLEtBQUQsR0FBQTtBQUNSLE1BQUEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFmLENBQThCLE9BQTlCLENBQUEsQ0FBQTtBQUFBLE1BQ0EsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFkLENBQW1CLFdBQW5CLEVBQWdDLG1CQUFoQyxDQURBLENBQUE7YUFFSSxJQUFBLGVBQUEsQ0FBQSxFQUhJO0lBQUEsQ0FBVjtBQUFBLElBS0EsVUFBQSxFQUFZLFNBQUEsR0FBQTthQUNWLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWYsQ0FBZ0MsT0FBaEMsRUFEVTtJQUFBLENBTFo7R0FORixDQUFBOztBQUFBLEVBZUEsYUFBQSxHQUFnQixDQUFDLE1BQUQsQ0FmaEIsQ0FBQTs7QUFBQSxFQWdCQSxPQUFBLEdBQVUsU0FBQyxTQUFELEdBQUE7QUFDUixRQUFBLFlBQUE7QUFBQSxJQUFBLFlBQUEsR0FBZSxJQUFJLENBQUMsT0FBTCxDQUFhLFNBQWIsQ0FBdUIsQ0FBQyxXQUF4QixDQUFBLENBQWYsQ0FBQTtBQUNBLElBQUEsSUFBRyxlQUFnQixhQUFoQixFQUFBLFlBQUEsTUFBSDthQUNNLElBQUEsYUFBQSxDQUFjLFNBQWQsRUFETjtLQUZRO0VBQUEsQ0FoQlYsQ0FBQTs7QUFBQSxFQXFCQSxtQkFBQSxHQUFzQixTQUFBLEdBQUE7QUFDcEIsUUFBQSxlQUFBO0FBQUEsSUFBQyxZQUFhLElBQUksQ0FBQyxjQUFsQixTQUFELENBQUE7QUFDQSxJQUFBLElBQUcsaUJBQUg7QUFDRSxNQUFBLElBQUEsR0FBVyxJQUFBLGdCQUFBLENBQWlCLFNBQWpCLENBQVgsQ0FBQTthQUNBLElBQUksQ0FBQyxNQUFMLENBQUEsRUFGRjtLQUZvQjtFQUFBLENBckJ0QixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/andrewhazlett/.atom/packages/pdf-view/lib/pdf-editor.coffee
(function() {
  var coffee;

  coffee = require('coffee-script');

  module.exports = {
    activate: function() {
      return atom.workspaceView.on('coffee-eval:eval', (function(_this) {
        return function() {
          return _this.coffeeEval();
        };
      })(this));
    },
    coffeeEval: function() {
      var code, editor, output, _ref;
      editor = atom.workspaceView.getActivePaneItem();
      if (((_ref = editor.getGrammar()) != null ? _ref.scopeName : void 0) !== 'source.coffee') {
        return;
      }
      code = editor.getSelectedText() || editor.getText();
      output = this.evaluateCode(code);
      return this.showOutput(output);
    },
    evaluateCode: function(code) {
      var e, output;
      try {
        output = eval(coffee.compile(code, {
          bare: true
        }));
        console.log(output);
      } catch (_error) {
        e = _error;
        output = "Error:" + e;
        console.error("Eval Error:", e);
      }
      return output;
    },
    showOutput: function(output, activePane) {
      if (activePane == null) {
        activePane = atom.workspaceView.getActivePane();
      }
      if (this.outputEditor == null) {
        return atom.project.open().then((function(_this) {
          return function(outputEditor) {
            var nextPane;
            _this.outputEditor = outputEditor;
            _this.outputEditor.on('destroyed', function() {
              return _this.outputEditor = null;
            });
            if (nextPane = activePane.getNextPane()) {
              nextPane.showItem(_this.outputEditor);
            } else {
              activePane.splitDown(_this.outputEditor);
            }
            return _this.showOutput(output, activePane);
          };
        })(this));
      } else {
        this.outputEditor.setText((output != null ? output.toString() : void 0) || "");
        return activePane.focus();
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLE1BQUE7O0FBQUEsRUFBQSxNQUFBLEdBQVMsT0FBQSxDQUFRLGVBQVIsQ0FBVCxDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FDRTtBQUFBLElBQUEsUUFBQSxFQUFVLFNBQUEsR0FBQTthQUNSLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBbkIsQ0FBc0Isa0JBQXRCLEVBQTBDLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQUcsS0FBQyxDQUFBLFVBQUQsQ0FBQSxFQUFIO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBMUMsRUFEUTtJQUFBLENBQVY7QUFBQSxJQUdBLFVBQUEsRUFBWSxTQUFBLEdBQUE7QUFDVixVQUFBLDBCQUFBO0FBQUEsTUFBQSxNQUFBLEdBQVMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxpQkFBbkIsQ0FBQSxDQUFULENBQUE7QUFDQSxNQUFBLGdEQUFpQyxDQUFFLG1CQUFyQixLQUFrQyxlQUFoRDtBQUFBLGNBQUEsQ0FBQTtPQURBO0FBQUEsTUFHQSxJQUFBLEdBQU8sTUFBTSxDQUFDLGVBQVAsQ0FBQSxDQUFBLElBQTRCLE1BQU0sQ0FBQyxPQUFQLENBQUEsQ0FIbkMsQ0FBQTtBQUFBLE1BSUEsTUFBQSxHQUFTLElBQUMsQ0FBQSxZQUFELENBQWMsSUFBZCxDQUpULENBQUE7YUFLQSxJQUFDLENBQUEsVUFBRCxDQUFZLE1BQVosRUFOVTtJQUFBLENBSFo7QUFBQSxJQVdBLFlBQUEsRUFBYyxTQUFDLElBQUQsR0FBQTtBQUNaLFVBQUEsU0FBQTtBQUFBO0FBQ0UsUUFBQSxNQUFBLEdBQVMsSUFBQSxDQUFLLE1BQU0sQ0FBQyxPQUFQLENBQWUsSUFBZixFQUFxQjtBQUFBLFVBQUEsSUFBQSxFQUFNLElBQU47U0FBckIsQ0FBTCxDQUFULENBQUE7QUFBQSxRQUNBLE9BQU8sQ0FBQyxHQUFSLENBQVksTUFBWixDQURBLENBREY7T0FBQSxjQUFBO0FBSUUsUUFESSxVQUNKLENBQUE7QUFBQSxRQUFBLE1BQUEsR0FBVSxRQUFBLEdBQU8sQ0FBakIsQ0FBQTtBQUFBLFFBQ0EsT0FBTyxDQUFDLEtBQVIsQ0FBYyxhQUFkLEVBQTZCLENBQTdCLENBREEsQ0FKRjtPQUFBO2FBT0EsT0FSWTtJQUFBLENBWGQ7QUFBQSxJQXFCQSxVQUFBLEVBQVksU0FBQyxNQUFELEVBQVMsVUFBVCxHQUFBOztRQUNWLGFBQWMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFuQixDQUFBO09BQWQ7QUFDQSxNQUFBLElBQU8seUJBQVA7ZUFDRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQWIsQ0FBQSxDQUFtQixDQUFDLElBQXBCLENBQXlCLENBQUEsU0FBQSxLQUFBLEdBQUE7aUJBQUEsU0FBRSxZQUFGLEdBQUE7QUFDdkIsZ0JBQUEsUUFBQTtBQUFBLFlBRHdCLEtBQUMsQ0FBQSxlQUFBLFlBQ3pCLENBQUE7QUFBQSxZQUFBLEtBQUMsQ0FBQSxZQUFZLENBQUMsRUFBZCxDQUFpQixXQUFqQixFQUE4QixTQUFBLEdBQUE7cUJBQUcsS0FBQyxDQUFBLFlBQUQsR0FBZ0IsS0FBbkI7WUFBQSxDQUE5QixDQUFBLENBQUE7QUFDQSxZQUFBLElBQUcsUUFBQSxHQUFXLFVBQVUsQ0FBQyxXQUFYLENBQUEsQ0FBZDtBQUNFLGNBQUEsUUFBUSxDQUFDLFFBQVQsQ0FBa0IsS0FBQyxDQUFBLFlBQW5CLENBQUEsQ0FERjthQUFBLE1BQUE7QUFHRSxjQUFBLFVBQVUsQ0FBQyxTQUFYLENBQXFCLEtBQUMsQ0FBQSxZQUF0QixDQUFBLENBSEY7YUFEQTttQkFLQSxLQUFDLENBQUEsVUFBRCxDQUFZLE1BQVosRUFBb0IsVUFBcEIsRUFOdUI7VUFBQSxFQUFBO1FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF6QixFQURGO09BQUEsTUFBQTtBQVNFLFFBQUEsSUFBQyxDQUFBLFlBQVksQ0FBQyxPQUFkLG1CQUFzQixNQUFNLENBQUUsUUFBUixDQUFBLFdBQUEsSUFBc0IsRUFBNUMsQ0FBQSxDQUFBO2VBQ0EsVUFBVSxDQUFDLEtBQVgsQ0FBQSxFQVZGO09BRlU7SUFBQSxDQXJCWjtHQUhGLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/andrewhazlett/.atom/packages/coffee-eval/lib/coffee-eval.coffee
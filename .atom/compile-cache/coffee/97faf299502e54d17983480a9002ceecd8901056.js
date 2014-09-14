(function() {
  var coffee, vm;

  coffee = require('coffee-script');

  vm = require('vm');

  module.exports = {
    configDefaults: {
      showOutputPane: true
    },
    activate: function() {
      return atom.workspaceView.on('coffee-eval:eval', (function(_this) {
        return function() {
          return _this.coffeeEval();
        };
      })(this));
    },
    coffeeEval: function() {
      var code, editor, output, _ref;
      editor = atom.workspace.getActivePaneItem();
      if (((_ref = editor.getGrammar()) != null ? _ref.scopeName : void 0) !== 'source.coffee') {
        return;
      }
      code = editor.getSelectedText() || editor.getText();
      output = this.evaluateCode(code);
      if (atom.config.get('coffee-eval.showOutputPane')) {
        return this.showOutput(output);
      }
    },
    evaluateCode: function(code) {
      var e, output;
      try {
        output = vm.runInThisContext(coffee.compile(code, {
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
        activePane = atom.workspaceView.getActivePaneView();
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLFVBQUE7O0FBQUEsRUFBQSxNQUFBLEdBQVMsT0FBQSxDQUFRLGVBQVIsQ0FBVCxDQUFBOztBQUFBLEVBQ0EsRUFBQSxHQUFTLE9BQUEsQ0FBUSxJQUFSLENBRFQsQ0FBQTs7QUFBQSxFQUdBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLGNBQUEsRUFDRTtBQUFBLE1BQUEsY0FBQSxFQUFnQixJQUFoQjtLQURGO0FBQUEsSUFHQSxRQUFBLEVBQVUsU0FBQSxHQUFBO2FBQ1IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFuQixDQUFzQixrQkFBdEIsRUFBMEMsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFBRyxLQUFDLENBQUEsVUFBRCxDQUFBLEVBQUg7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUExQyxFQURRO0lBQUEsQ0FIVjtBQUFBLElBTUEsVUFBQSxFQUFZLFNBQUEsR0FBQTtBQUNWLFVBQUEsMEJBQUE7QUFBQSxNQUFBLE1BQUEsR0FBUyxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFmLENBQUEsQ0FBVCxDQUFBO0FBQ0EsTUFBQSxnREFBaUMsQ0FBRSxtQkFBckIsS0FBa0MsZUFBaEQ7QUFBQSxjQUFBLENBQUE7T0FEQTtBQUFBLE1BR0EsSUFBQSxHQUFPLE1BQU0sQ0FBQyxlQUFQLENBQUEsQ0FBQSxJQUE0QixNQUFNLENBQUMsT0FBUCxDQUFBLENBSG5DLENBQUE7QUFBQSxNQUlBLE1BQUEsR0FBUyxJQUFDLENBQUEsWUFBRCxDQUFjLElBQWQsQ0FKVCxDQUFBO0FBS0EsTUFBQSxJQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQiw0QkFBaEIsQ0FBSDtlQUNFLElBQUMsQ0FBQSxVQUFELENBQVksTUFBWixFQURGO09BTlU7SUFBQSxDQU5aO0FBQUEsSUFlQSxZQUFBLEVBQWMsU0FBQyxJQUFELEdBQUE7QUFDWixVQUFBLFNBQUE7QUFBQTtBQUNFLFFBQUEsTUFBQSxHQUFTLEVBQUUsQ0FBQyxnQkFBSCxDQUFvQixNQUFNLENBQUMsT0FBUCxDQUFlLElBQWYsRUFBcUI7QUFBQSxVQUFBLElBQUEsRUFBTSxJQUFOO1NBQXJCLENBQXBCLENBQVQsQ0FBQTtBQUFBLFFBQ0EsT0FBTyxDQUFDLEdBQVIsQ0FBWSxNQUFaLENBREEsQ0FERjtPQUFBLGNBQUE7QUFJRSxRQURJLFVBQ0osQ0FBQTtBQUFBLFFBQUEsTUFBQSxHQUFVLFFBQUEsR0FBTyxDQUFqQixDQUFBO0FBQUEsUUFDQSxPQUFPLENBQUMsS0FBUixDQUFjLGFBQWQsRUFBNkIsQ0FBN0IsQ0FEQSxDQUpGO09BQUE7YUFPQSxPQVJZO0lBQUEsQ0FmZDtBQUFBLElBeUJBLFVBQUEsRUFBWSxTQUFDLE1BQUQsRUFBUyxVQUFULEdBQUE7O1FBQ1YsYUFBYyxJQUFJLENBQUMsYUFBYSxDQUFDLGlCQUFuQixDQUFBO09BQWQ7QUFDQSxNQUFBLElBQU8seUJBQVA7ZUFDRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQWIsQ0FBQSxDQUFtQixDQUFDLElBQXBCLENBQXlCLENBQUEsU0FBQSxLQUFBLEdBQUE7aUJBQUEsU0FBRSxZQUFGLEdBQUE7QUFDdkIsZ0JBQUEsUUFBQTtBQUFBLFlBRHdCLEtBQUMsQ0FBQSxlQUFBLFlBQ3pCLENBQUE7QUFBQSxZQUFBLEtBQUMsQ0FBQSxZQUFZLENBQUMsRUFBZCxDQUFpQixXQUFqQixFQUE4QixTQUFBLEdBQUE7cUJBQUcsS0FBQyxDQUFBLFlBQUQsR0FBZ0IsS0FBbkI7WUFBQSxDQUE5QixDQUFBLENBQUE7QUFDQSxZQUFBLElBQUcsUUFBQSxHQUFXLFVBQVUsQ0FBQyxXQUFYLENBQUEsQ0FBZDtBQUNFLGNBQUEsUUFBUSxDQUFDLFFBQVQsQ0FBa0IsS0FBQyxDQUFBLFlBQW5CLENBQUEsQ0FERjthQUFBLE1BQUE7QUFHRSxjQUFBLFVBQVUsQ0FBQyxTQUFYLENBQXFCLEtBQUMsQ0FBQSxZQUF0QixDQUFBLENBSEY7YUFEQTttQkFLQSxLQUFDLENBQUEsVUFBRCxDQUFZLE1BQVosRUFBb0IsVUFBcEIsRUFOdUI7VUFBQSxFQUFBO1FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF6QixFQURGO09BQUEsTUFBQTtBQVNFLFFBQUEsSUFBQyxDQUFBLFlBQVksQ0FBQyxPQUFkLG1CQUFzQixNQUFNLENBQUUsUUFBUixDQUFBLFdBQUEsSUFBc0IsRUFBNUMsQ0FBQSxDQUFBO2VBQ0EsVUFBVSxDQUFDLEtBQVgsQ0FBQSxFQVZGO09BRlU7SUFBQSxDQXpCWjtHQUpGLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/andrewhazlett/.atom/packages/coffee-eval/lib/coffee-eval.coffee
(function() {
  var coffee, vm;

  coffee = require('coffee-script');

  vm = require('vm');

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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLFVBQUE7O0FBQUEsRUFBQSxNQUFBLEdBQVMsT0FBQSxDQUFRLGVBQVIsQ0FBVCxDQUFBOztBQUFBLEVBQ0EsRUFBQSxHQUFTLE9BQUEsQ0FBUSxJQUFSLENBRFQsQ0FBQTs7QUFBQSxFQUdBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLFFBQUEsRUFBVSxTQUFBLEdBQUE7YUFDUixJQUFJLENBQUMsYUFBYSxDQUFDLEVBQW5CLENBQXNCLGtCQUF0QixFQUEwQyxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO2lCQUFHLEtBQUMsQ0FBQSxVQUFELENBQUEsRUFBSDtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQTFDLEVBRFE7SUFBQSxDQUFWO0FBQUEsSUFHQSxVQUFBLEVBQVksU0FBQSxHQUFBO0FBQ1YsVUFBQSwwQkFBQTtBQUFBLE1BQUEsTUFBQSxHQUFTLElBQUksQ0FBQyxhQUFhLENBQUMsaUJBQW5CLENBQUEsQ0FBVCxDQUFBO0FBQ0EsTUFBQSxnREFBaUMsQ0FBRSxtQkFBckIsS0FBa0MsZUFBaEQ7QUFBQSxjQUFBLENBQUE7T0FEQTtBQUFBLE1BR0EsSUFBQSxHQUFPLE1BQU0sQ0FBQyxlQUFQLENBQUEsQ0FBQSxJQUE0QixNQUFNLENBQUMsT0FBUCxDQUFBLENBSG5DLENBQUE7QUFBQSxNQUlBLE1BQUEsR0FBUyxJQUFDLENBQUEsWUFBRCxDQUFjLElBQWQsQ0FKVCxDQUFBO2FBS0EsSUFBQyxDQUFBLFVBQUQsQ0FBWSxNQUFaLEVBTlU7SUFBQSxDQUhaO0FBQUEsSUFXQSxZQUFBLEVBQWMsU0FBQyxJQUFELEdBQUE7QUFDWixVQUFBLFNBQUE7QUFBQTtBQUNFLFFBQUEsTUFBQSxHQUFTLEVBQUUsQ0FBQyxnQkFBSCxDQUFvQixNQUFNLENBQUMsT0FBUCxDQUFlLElBQWYsRUFBcUI7QUFBQSxVQUFBLElBQUEsRUFBTSxJQUFOO1NBQXJCLENBQXBCLENBQVQsQ0FBQTtBQUFBLFFBQ0EsT0FBTyxDQUFDLEdBQVIsQ0FBWSxNQUFaLENBREEsQ0FERjtPQUFBLGNBQUE7QUFJRSxRQURJLFVBQ0osQ0FBQTtBQUFBLFFBQUEsTUFBQSxHQUFVLFFBQUEsR0FBTyxDQUFqQixDQUFBO0FBQUEsUUFDQSxPQUFPLENBQUMsS0FBUixDQUFjLGFBQWQsRUFBNkIsQ0FBN0IsQ0FEQSxDQUpGO09BQUE7YUFPQSxPQVJZO0lBQUEsQ0FYZDtBQUFBLElBcUJBLFVBQUEsRUFBWSxTQUFDLE1BQUQsRUFBUyxVQUFULEdBQUE7O1FBQ1YsYUFBYyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQW5CLENBQUE7T0FBZDtBQUNBLE1BQUEsSUFBTyx5QkFBUDtlQUNFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBYixDQUFBLENBQW1CLENBQUMsSUFBcEIsQ0FBeUIsQ0FBQSxTQUFBLEtBQUEsR0FBQTtpQkFBQSxTQUFFLFlBQUYsR0FBQTtBQUN2QixnQkFBQSxRQUFBO0FBQUEsWUFEd0IsS0FBQyxDQUFBLGVBQUEsWUFDekIsQ0FBQTtBQUFBLFlBQUEsS0FBQyxDQUFBLFlBQVksQ0FBQyxFQUFkLENBQWlCLFdBQWpCLEVBQThCLFNBQUEsR0FBQTtxQkFBRyxLQUFDLENBQUEsWUFBRCxHQUFnQixLQUFuQjtZQUFBLENBQTlCLENBQUEsQ0FBQTtBQUNBLFlBQUEsSUFBRyxRQUFBLEdBQVcsVUFBVSxDQUFDLFdBQVgsQ0FBQSxDQUFkO0FBQ0UsY0FBQSxRQUFRLENBQUMsUUFBVCxDQUFrQixLQUFDLENBQUEsWUFBbkIsQ0FBQSxDQURGO2FBQUEsTUFBQTtBQUdFLGNBQUEsVUFBVSxDQUFDLFNBQVgsQ0FBcUIsS0FBQyxDQUFBLFlBQXRCLENBQUEsQ0FIRjthQURBO21CQUtBLEtBQUMsQ0FBQSxVQUFELENBQVksTUFBWixFQUFvQixVQUFwQixFQU51QjtVQUFBLEVBQUE7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXpCLEVBREY7T0FBQSxNQUFBO0FBU0UsUUFBQSxJQUFDLENBQUEsWUFBWSxDQUFDLE9BQWQsbUJBQXNCLE1BQU0sQ0FBRSxRQUFSLENBQUEsV0FBQSxJQUFzQixFQUE1QyxDQUFBLENBQUE7ZUFDQSxVQUFVLENBQUMsS0FBWCxDQUFBLEVBVkY7T0FGVTtJQUFBLENBckJaO0dBSkYsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/andrewhazlett/.atom/packages/coffee-eval/lib/coffee-eval.coffee
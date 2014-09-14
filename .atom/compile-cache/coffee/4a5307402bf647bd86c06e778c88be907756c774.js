(function() {
  var Main,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  module.exports = Main = (function() {
    function Main() {
      this.onDone = __bind(this.onDone, this);
      this.onRename = __bind(this.onRename, this);
      this.onDestroyed = __bind(this.onDestroyed, this);
      this.onCreated = __bind(this.onCreated, this);
    }

    Main.prototype.Watcher = null;

    Main.prototype.renameCommand = '';

    Main.prototype.doneCommand = '';

    Main.prototype.configDefaults = {
      highlightError: true,
      highlightReference: true
    };


    /*
    Life cycle
     */

    Main.prototype.activate = function(state) {
      this.watchers = [];
      atom.workspaceView.eachEditorView(this.onCreated);
      atom.workspaceView.command(this.renameCommand, this.onRename);
      return atom.workspaceView.command(this.doneCommand, this.onDone);
    };

    Main.prototype.deactivate = function() {
      var watcher, _i, _len, _ref;
      atom.workspaceView.off(this.renameCommand, this.onRename);
      atom.workspaceView.off(this.doneCommand, this.onDone);
      _ref = this.watchers;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        watcher = _ref[_i];
        watcher.destruct();
      }
      return delete this.watchers;
    };

    Main.prototype.serialize = function() {};


    /*
    Events
     */

    Main.prototype.onCreated = function(editorView) {
      var watcher;
      watcher = new this.Watcher(editorView);
      watcher.on('destroyed', this.onDestroyed);
      return this.watchers.push(watcher);
    };

    Main.prototype.onDestroyed = function(watcher) {
      watcher.destruct();
      return this.watchers.splice(this.watchers.indexOf(watcher), 1);
    };

    Main.prototype.onRename = function(e) {
      var isExecuted, watcher, _i, _len, _ref;
      isExecuted = false;
      _ref = this.watchers;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        watcher = _ref[_i];
        isExecuted || (isExecuted = watcher.rename());
      }
      if (isExecuted) {
        return;
      }
      return e.abortKeyBinding();
    };

    Main.prototype.onDone = function(e) {
      var isExecuted, watcher, _i, _len, _ref;
      isExecuted = false;
      _ref = this.watchers;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        watcher = _ref[_i];
        isExecuted || (isExecuted = watcher.done());
      }
      if (isExecuted) {
        return;
      }
      return e.abortKeyBinding();
    };

    return Main;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLElBQUE7SUFBQSxrRkFBQTs7QUFBQSxFQUFBLE1BQU0sQ0FBQyxPQUFQLEdBQ007Ozs7OztLQUVKOztBQUFBLG1CQUFBLE9BQUEsR0FBUyxJQUFULENBQUE7O0FBQUEsbUJBQ0EsYUFBQSxHQUFlLEVBRGYsQ0FBQTs7QUFBQSxtQkFFQSxXQUFBLEdBQWEsRUFGYixDQUFBOztBQUFBLG1CQUlBLGNBQUEsR0FDRTtBQUFBLE1BQUEsY0FBQSxFQUFvQixJQUFwQjtBQUFBLE1BQ0Esa0JBQUEsRUFBb0IsSUFEcEI7S0FMRixDQUFBOztBQVNBO0FBQUE7O09BVEE7O0FBQUEsbUJBYUEsUUFBQSxHQUFVLFNBQUMsS0FBRCxHQUFBO0FBQ1IsTUFBQSxJQUFDLENBQUEsUUFBRCxHQUFZLEVBQVosQ0FBQTtBQUFBLE1BQ0EsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFuQixDQUFrQyxJQUFDLENBQUEsU0FBbkMsQ0FEQSxDQUFBO0FBQUEsTUFFQSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQW5CLENBQTJCLElBQUMsQ0FBQSxhQUE1QixFQUEyQyxJQUFDLENBQUEsUUFBNUMsQ0FGQSxDQUFBO2FBR0EsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFuQixDQUEyQixJQUFDLENBQUEsV0FBNUIsRUFBeUMsSUFBQyxDQUFBLE1BQTFDLEVBSlE7SUFBQSxDQWJWLENBQUE7O0FBQUEsbUJBbUJBLFVBQUEsR0FBWSxTQUFBLEdBQUE7QUFDVixVQUFBLHVCQUFBO0FBQUEsTUFBQSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQW5CLENBQXVCLElBQUMsQ0FBQSxhQUF4QixFQUF1QyxJQUFDLENBQUEsUUFBeEMsQ0FBQSxDQUFBO0FBQUEsTUFDQSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQW5CLENBQXVCLElBQUMsQ0FBQSxXQUF4QixFQUFxQyxJQUFDLENBQUEsTUFBdEMsQ0FEQSxDQUFBO0FBRUE7QUFBQSxXQUFBLDJDQUFBOzJCQUFBO0FBQ0UsUUFBQSxPQUFPLENBQUMsUUFBUixDQUFBLENBQUEsQ0FERjtBQUFBLE9BRkE7YUFJQSxNQUFBLENBQUEsSUFBUSxDQUFBLFNBTEU7SUFBQSxDQW5CWixDQUFBOztBQUFBLG1CQTBCQSxTQUFBLEdBQVcsU0FBQSxHQUFBLENBMUJYLENBQUE7O0FBNkJBO0FBQUE7O09BN0JBOztBQUFBLG1CQWlDQSxTQUFBLEdBQVcsU0FBQyxVQUFELEdBQUE7QUFDVCxVQUFBLE9BQUE7QUFBQSxNQUFBLE9BQUEsR0FBYyxJQUFBLElBQUMsQ0FBQSxPQUFELENBQVMsVUFBVCxDQUFkLENBQUE7QUFBQSxNQUNBLE9BQU8sQ0FBQyxFQUFSLENBQVcsV0FBWCxFQUF3QixJQUFDLENBQUEsV0FBekIsQ0FEQSxDQUFBO2FBRUEsSUFBQyxDQUFBLFFBQVEsQ0FBQyxJQUFWLENBQWUsT0FBZixFQUhTO0lBQUEsQ0FqQ1gsQ0FBQTs7QUFBQSxtQkFzQ0EsV0FBQSxHQUFhLFNBQUMsT0FBRCxHQUFBO0FBQ1gsTUFBQSxPQUFPLENBQUMsUUFBUixDQUFBLENBQUEsQ0FBQTthQUNBLElBQUMsQ0FBQSxRQUFRLENBQUMsTUFBVixDQUFpQixJQUFDLENBQUEsUUFBUSxDQUFDLE9BQVYsQ0FBa0IsT0FBbEIsQ0FBakIsRUFBNkMsQ0FBN0MsRUFGVztJQUFBLENBdENiLENBQUE7O0FBQUEsbUJBMENBLFFBQUEsR0FBVSxTQUFDLENBQUQsR0FBQTtBQUNSLFVBQUEsbUNBQUE7QUFBQSxNQUFBLFVBQUEsR0FBYSxLQUFiLENBQUE7QUFDQTtBQUFBLFdBQUEsMkNBQUE7MkJBQUE7QUFDRSxRQUFBLGVBQUEsYUFBZSxPQUFPLENBQUMsTUFBUixDQUFBLEVBQWYsQ0FERjtBQUFBLE9BREE7QUFHQSxNQUFBLElBQVUsVUFBVjtBQUFBLGNBQUEsQ0FBQTtPQUhBO2FBSUEsQ0FBQyxDQUFDLGVBQUYsQ0FBQSxFQUxRO0lBQUEsQ0ExQ1YsQ0FBQTs7QUFBQSxtQkFpREEsTUFBQSxHQUFRLFNBQUMsQ0FBRCxHQUFBO0FBQ04sVUFBQSxtQ0FBQTtBQUFBLE1BQUEsVUFBQSxHQUFhLEtBQWIsQ0FBQTtBQUNBO0FBQUEsV0FBQSwyQ0FBQTsyQkFBQTtBQUNFLFFBQUEsZUFBQSxhQUFlLE9BQU8sQ0FBQyxJQUFSLENBQUEsRUFBZixDQURGO0FBQUEsT0FEQTtBQUdBLE1BQUEsSUFBVSxVQUFWO0FBQUEsY0FBQSxDQUFBO09BSEE7YUFJQSxDQUFDLENBQUMsZUFBRixDQUFBLEVBTE07SUFBQSxDQWpEUixDQUFBOztnQkFBQTs7TUFIRixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/andrewhazlett/.atom/packages/coffee-refactor/node_modules/atom-refactor/lib/Main.coffee
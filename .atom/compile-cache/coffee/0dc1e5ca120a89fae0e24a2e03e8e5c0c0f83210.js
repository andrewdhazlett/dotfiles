(function() {
  var AtomGitterView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('atom').View;

  module.exports = AtomGitterView = (function(_super) {
    __extends(AtomGitterView, _super);

    function AtomGitterView() {
      return AtomGitterView.__super__.constructor.apply(this, arguments);
    }

    AtomGitterView.content = function() {
      return this.div({
        "class": 'gitter overlay from-top panel'
      }, (function(_this) {
        return function() {
          _this.div({
            "class": 'panel-heading'
          }, 'Send a message with Gitter');
          return _this.div({
            "class": 'panel-body padded'
          }, function() {
            _this.textarea({
              type: 'text',
              "class": 'form-control native-key-bindings',
              placeholder: 'Enter your message to post on Gitter',
              value: '',
              outlet: 'inputMessage'
            });
            return _this.div({
              "class": 'block'
            }, function() {
              _this.button({
                "class": 'btn btn-warning',
                click: 'toggle'
              }, 'Close');
              return _this.button({
                "class": 'btn btn-primary pull-right',
                click: 'sendMessage'
              }, 'Send message');
            });
          });
        };
      })(this));
    };

    AtomGitterView.prototype.initialize = function(serializeState) {
      this.gitter = serializeState;
      atom.workspaceView.command("gitter:toggle", (function(_this) {
        return function() {
          return _this.toggle();
        };
      })(this));
      atom.workspaceView.command("gitter:toggle-compose-message", (function(_this) {
        return function() {
          return _this.toggle();
        };
      })(this));
      atom.workspaceView.command("gitter:send-selected-code", (function(_this) {
        return function() {
          return _this.sendSelectedCode();
        };
      })(this));
      return atom.workspaceView.command("gitter:send-message", (function(_this) {
        return function() {
          return _this.sendMessage();
        };
      })(this));
    };

    AtomGitterView.prototype.serialize = function() {};

    AtomGitterView.prototype.destroy = function() {
      return this.detach();
    };

    AtomGitterView.prototype.toggle = function() {
      if (this.hasParent()) {
        return this.detach();
      } else {
        atom.workspaceView.append(this);
        return this.inputMessage.focus();
      }
    };

    AtomGitterView.prototype.sendSelectedCode = function() {
      var editor, grammar, message, name, text;
      editor = atom.workspace.getActiveEditor();
      text = editor.getSelectedText();
      if (text) {
        grammar = editor.getGrammar();
        name = grammar.name;
        message = '```' + name + '\n' + text + '\n```';
        if (this.gitter.currentRoom && text) {
          return this.gitter.currentRoom.send(message);
        }
      }
    };

    AtomGitterView.prototype.sendMessage = function() {
      var msg;
      msg = this.inputMessage.val();
      if (this.gitter.currentRoom && msg) {
        this.gitter.currentRoom.send(msg);
      }
      return this.inputMessage.val('');
    };

    return AtomGitterView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLG9CQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxPQUFRLE9BQUEsQ0FBUSxNQUFSLEVBQVIsSUFBRCxDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUNKLHFDQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSxJQUFBLGNBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQSxHQUFBO2FBQ1IsSUFBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFFBQUEsT0FBQSxFQUFPLCtCQUFQO09BQUwsRUFBNkMsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtBQUMzQyxVQUFBLEtBQUMsQ0FBQSxHQUFELENBQ0U7QUFBQSxZQUFBLE9BQUEsRUFBTyxlQUFQO1dBREYsRUFFRSw0QkFGRixDQUFBLENBQUE7aUJBR0EsS0FBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFlBQUEsT0FBQSxFQUFPLG1CQUFQO1dBQUwsRUFBaUMsU0FBQSxHQUFBO0FBQy9CLFlBQUEsS0FBQyxDQUFBLFFBQUQsQ0FDRTtBQUFBLGNBQUEsSUFBQSxFQUFNLE1BQU47QUFBQSxjQUNBLE9BQUEsRUFBTyxrQ0FEUDtBQUFBLGNBRUEsV0FBQSxFQUFhLHNDQUZiO0FBQUEsY0FHQSxLQUFBLEVBQU8sRUFIUDtBQUFBLGNBSUEsTUFBQSxFQUFRLGNBSlI7YUFERixDQUFBLENBQUE7bUJBT0EsS0FBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLGNBQUEsT0FBQSxFQUFPLE9BQVA7YUFBTCxFQUFxQixTQUFBLEdBQUE7QUFDbkIsY0FBQSxLQUFDLENBQUEsTUFBRCxDQUNFO0FBQUEsZ0JBQUEsT0FBQSxFQUFPLGlCQUFQO0FBQUEsZ0JBQ0EsS0FBQSxFQUFPLFFBRFA7ZUFERixFQUdFLE9BSEYsQ0FBQSxDQUFBO3FCQUlBLEtBQUMs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
//# sourceURL=/Users/andrewhazlett/.atom/packages/gitter/lib/atom-gitter-view.coffee
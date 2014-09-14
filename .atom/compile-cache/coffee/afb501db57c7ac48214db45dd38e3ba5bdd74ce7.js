(function() {
  var AtomGitterInputRoomView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('atom').View;

  module.exports = AtomGitterInputRoomView = (function(_super) {
    __extends(AtomGitterInputRoomView, _super);

    function AtomGitterInputRoomView() {
      return AtomGitterInputRoomView.__super__.constructor.apply(this, arguments);
    }

    AtomGitterInputRoomView.content = function() {
      return this.div({
        "class": 'gitter overlay from-top panel'
      }, (function(_this) {
        return function() {
          _this.div({
            "class": 'panel-heading'
          }, 'Switch to another Gitter room');
          return _this.div({
            "class": 'panel-body padded'
          }, function() {
            _this.input({
              type: 'text',
              "class": 'form-control native-key-bindings',
              placeholder: 'Enter the desired Gitter room URI',
              value: '',
              outlet: 'inputRoom'
            });
            return _this.div({
              "class": 'block'
            }, function() {
              _this.button({
                "class": 'btn btn-warning',
                click: 'toggle'
              }, 'Close');
              _this.button({
                "class": 'btn btn-success',
                click: 'joinProjectRepoRoom'
              }, 'Join Project\'s Repo Room');
              return _this.button({
                "class": 'btn btn-primary pull-right',
                click: 'switchRoom'
              }, 'Join Room');
            });
          });
        };
      })(this));
    };

    AtomGitterInputRoomView.prototype.initialize = function(serializeState) {
      return this.gitter = serializeState;
    };

    AtomGitterInputRoomView.prototype.serialize = function() {};

    AtomGitterInputRoomView.prototype.destroy = function() {
      return this.detach();
    };

    AtomGitterInputRoomView.prototype.toggle = function() {
      if (this.hasParent()) {
        return this.detach();
      } else {
        atom.workspaceView.append(this);
        return this.inputRoom.focus();
      }
    };

    AtomGitterInputRoomView.prototype.joinProjectRepoRoom = function() {
      this.gitter.logger.info("Join project room");
      this.gitter.joinProjectRepoRoom();
      return this.toggle();
    };

    AtomGitterInputRoomView.prototype.switchRoom = function() {
      var newRoom;
      newRoom = this.inputRoom.val();
      this.gitter.logger.info("Switch room " + newRoom);
      if (newRoom) {
        this.gitter.joinRoomWithRepoUri(newRoom);
      }
      return this.toggle();
    };

    return AtomGitterInputRoomView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDZCQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxPQUFRLE9BQUEsQ0FBUSxNQUFSLEVBQVIsSUFBRCxDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUNKLDhDQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSxJQUFBLHVCQUFDLENBQUEsT0FBRCxHQUFVLFNBQUEsR0FBQTthQUNSLElBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxRQUFBLE9BQUEsRUFBTywrQkFBUDtPQUFMLEVBQTZDLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7QUFDM0MsVUFBQSxLQUFDLENBQUEsR0FBRCxDQUNFO0FBQUEsWUFBQSxPQUFBLEVBQU8sZUFBUDtXQURGLEVBRUUsK0JBRkYsQ0FBQSxDQUFBO2lCQUdBLEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxZQUFBLE9BQUEsRUFBTyxtQkFBUDtXQUFMLEVBQWlDLFNBQUEsR0FBQTtBQUMvQixZQUFBLEtBQUMsQ0FBQSxLQUFELENBQ0U7QUFBQSxjQUFBLElBQUEsRUFBTSxNQUFOO0FBQUEsY0FDQSxPQUFBLEVBQU8sa0NBRFA7QUFBQSxjQUVBLFdBQUEsRUFBYSxtQ0FGYjtBQUFBLGNBR0EsS0FBQSxFQUFPLEVBSFA7QUFBQSxjQUlBLE1BQUEsRUFBUSxXQUpSO2FBREYsQ0FBQSxDQUFBO21CQU9BLEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxjQUFBLE9BQUEsRUFBTyxPQUFQO2FBQUwsRUFBcUIsU0FBQSxHQUFBO0FBQ25CLGNBQUEsS0FBQyxDQUFBLE1BQUQsQ0FDRTtBQUFBLGdCQUFBLE9BQUEsRUFBTyxpQkFBUDtBQUFBLGdCQUNBLEtBQUEsRUFBTyxRQURQO2VBREYsRUFHRSxPQUhGLENBQUEsQ0FBQTtBQUFBLGNBSUEsS0FBQyxDQUFBLE1BQUQsQ0FDRTtBQUFBLGdCQUFBLE9BQUEsRUFBTyxpQkFBUDtBQUFBLGdCQUNBLEtBQUEsRUFBTyxxQkFEUDtlQURGLEVBR0UsMkJBSEYsQ0FKQSxDQUFBO3FCQVFBLEtBQUMsQ0FBQSxNQUFELENBQ0U7QUFBQSxnQkFBQSxPQUFBLEVBQU8sNEJBQVA7QUFBQSxnQkFDQSxLQUFBLEVBQU8sWUFEUDtlQURGLEVBR0UsV0FIRixFQVRtQjtZQUFBLENBQXJCLEVBUitCO1VBQUEsQ0FBakMsRUFKMkM7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUE3QyxFQURRO0lBQUEsQ0FBVixDQUFBOztBQUFBLHNDQTJCQSxVQUFBLEdBQVksU0FBQyxjQUFELEdBQUE7YUFDVixJQUFDLENBQUEsTUFBRCxHQUFVLGVBREE7SUFBQSxDQTNCWixDQUFBOztBQUFBLHNDQStCQSxTQUFBLEdBQVcsU0FBQSxHQUFBLENBL0JYLENBQUE7O0FBQUEsc0NBa0NBLE9BQUEsR0FBUyxTQUFBLEdBQUE7YUFDUCxJQUFDLENBQUEsTUFBRCxDQUFBLEVBRE87SUFBQSxDQWxDVCxDQUFBOztBQUFBLHNDQXFDQSxNQUFBLEdBQVEsU0FBQSxHQUFBO0FBQ04sTUFBQSxJQUFHLElBQUMsQ0FBQSxTQUFELENBQUEsQ0FBSDtlQUNFLElBQUMsQ0FBQSxNQUFELENBQUEsRUFERjtPQUFBLE1BQUE7QUFHRSxRQUFBLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBbkIsQ0FBMEIsSUFBMUIsQ0FBQSxDQUFBO2VBQ0EsSUFBQyxDQUFBLFNBQVMsQ0FBQyxLQUFYLENBQUEsRUFKRjtPQURNO0lBQUEsQ0FyQ1IsQ0FBQTs7QUFBQSxzQ0E0Q0EsbUJBQUEsR0FBcUIsU0FBQSxHQUFBO0FBQ25CLE1BQUEsSUFBQyxDQUFBLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBZixDQUFvQixtQkFBcEIsQ0FBQSxDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsTUFBTSxDQUFDLG1CQUFSLENBQUEsQ0FEQSxDQUFBO2FBRUEsSUFBQyxDQUFBLE1BQUQsQ0FBQSxFQUhtQjtJQUFBLENBNUNyQixDQUFBOztBQUFBLHNDQWlEQSxVQUFBLEdBQVksU0FBQSxHQUFBO0FBQ1YsVUFBQSxPQUFBO0FBQUEsTUFBQSxPQUFBLEdBQVUsSUFBQyxDQUFBLFNBQVMsQ0FBQyxHQUFYLENBQUEsQ0FBVixDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFmLENBQXFCLGNBQUEsR0FBYSxPQUFsQyxDQURBLENBQUE7QUFFQSxNQUFBLElBQUcsT0FBSDtBQUNFLFFBQUEsSUFBQyxDQUFBLE1BQU0sQ0FBQyxtQkFBUixDQUE0QixPQUE1QixDQUFBLENBREY7T0FGQTthQUlBLElBQUMsQ0FBQSxNQUFELENBQUEsRUFMVTtJQUFBLENBakRaLENBQUE7O21DQUFBOztLQURvQyxLQUh0QyxDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/andrewhazlett/.atom/packages/gitter/lib/atom-gitter-input-room-view.coffee
(function() {
  var AtomGitterInputRoomView, AtomGitterView, Gitter, Logger, MessagePanelView, PlainMessageView, emojify, githubUrlFromGit, path, url;

  AtomGitterView = require("./atom-gitter-view");

  AtomGitterInputRoomView = require("./atom-gitter-input-room-view");

  MessagePanelView = require("atom-message-panel").MessagePanelView;

  PlainMessageView = require("atom-message-panel").PlainMessageView;

  githubUrlFromGit = require("github-url-from-git");

  url = require("url");

  Gitter = require("node-gitter");

  path = require('path');

  emojify = require('./emojify');

  Logger = require("atom-logger");

  module.exports = {
    configDefaults: {
      token: "",
      openOnNewMessage: true,
      recentMessagesAtTop: true,
      displaySnapshotMessages: true
    },
    emojiFolder: "atom://gitter/node_modules/emojify.js/images/emoji",
    atomGitterView: null,
    messagePanelView: null,
    gitter: null,
    currentRoom: null,
    getProjectRepoRoom: function() {
      var git, githubUrl, originUrl, projectName, temp, userName;
      git = atom.project.getRepo();
      if (!git) {
        return null;
      }
      this.logger.info("Project has Git repo");
      originUrl = git.getOriginUrl();
      githubUrl = githubUrlFromGit(originUrl);
      if (!githubUrl) {
        return null;
      }
      this.logger.info("Project has GitHub URL " + githubUrl);
      temp = url.parse(githubUrl).path.split("/");
      userName = temp[1];
      projectName = temp[2];
      return userName + "/" + projectName;
    },
    initMessagePanelView: function() {
      var _ref;
      if ((_ref = this.messagePanelView) != null ? _ref.hasParent() : void 0) {
        this.logger.info("MessagePanelView already exists and is attached.");
        return this.messagePanelView;
      }
      if (!this.messagePanelView) {
        this.logger.info("MessagePanelView does not exist.");
        this.messagePanelView = new MessagePanelView({
          title: "Gitter"
        });
        this.messagePanelView.addClass('native-key-bindings');
        this.messagePanelView.attr('tabindex', -1);
        if (this.currentRoom) {
          this.setTitle("Gitter - " + this.currentRoom.name + " - " + this.currentRoom.topic);
        }
      }
      this.logger.info("Attaching MessagePanelView");
      return this.messagePanelView.attach();
    },
    toggleMessagePanel: function() {
      var _ref;
      if ((_ref = this.messagePanelView) != null ? _ref.hasParent() : void 0) {
        return this.closeMessagePanel();
      } else {
        return this.openMessagePanel();
      }
    },
    openMessagePanel: function() {
      var _ref;
      this.initMessagePanelView();
      if (((_ref = this.messagePanelView) != null ? _ref.summary.css("display") : void 0) !== "none") {
        return this.messagePanelView.toggle();
      }
    },
    closeMessagePanel: function() {
      var _ref;
      if ((_ref = this.messagePanelView) != null ? _ref.hasParent() : void 0) {
        return this.messagePanelView.close();
      }
    },
    addMessage: function(msgView) {
      var messagePanelView, recentMessagesAtTop, summary;
      this.logger.info("Add Message " + msgView);
      recentMessagesAtTop = atom.config.get("gitter.recentMessagesAtTop");
      messagePanelView = this.messagePanelView;
      messagePanelView.messages.push(msgView);
      if (recentMessagesAtTop) {
        messagePanelView.body.prepend(msgView);
      } else {
        messagePanelView.body.append(msgView);
      }
      summary = {
        summary: msgView.message.replace(/<(?:.|\n)*?>/g, ""),
        className: msgView.className
      };
      messagePanelView.setSummary(summary);
      return this;
    },
    setTitle: function(title) {
      var messagePanelView;
      messagePanelView = this.messagePanelView;
      messagePanelView.setTitle(title);
      return this;
    },
    setSummary: function(summary) {
      var messagePanelView;
      messagePanelView = this.messagePanelView;
      messagePanelView.setSummary(summary);
      return this;
    },
    log: function(msg, raw, className) {
      this.logger.info("Gitter Log: " + msg + " " + raw + " " + className);
      this.addMessage(new PlainMessageView({
        message: msg || "",
        raw: (raw != null ? raw : false),
        className: "gitter-message " + className
      }));
      return this;
    },
    info: function(msg, raw, className) {
      this.log(msg, raw, "text-info " + className);
      return this;
    },
    error: function(msg, raw, className) {
      this.log(msg, raw, "text-danger " + className);
      return this;
    },
    warn: function(msg, raw, className) {
      this.log(msg, raw, "text-warning " + className);
      return this;
    },
    displaySetupMessage: function() {
      this.logger.info("Gitter Display Setup Message");
      this.error("Please setup your Gitter Personal Access Token. See <a href=\"https://developer.gitter.im/apps\">https://developer.gitter.im/apps</a>", true);
      this.info("If you have not already, <a href=\"https://gitter.im/\">create a Gitter account and sign in</a>. " + "Then go to <a href=\"https://developer.gitter.im/apps\">https://developer.gitter.im/apps</a> and retrieve your Personal Access Token. " + "Enter your Token in the Package Settings. " + "Go to Settings/Preferences ➔ Search for installed package \"Gitter\" and select ➔ Enter your \"Token\".", true);
      return this;
    },
    login: function(token) {
      this.logger.info("Login");
      this.gitter = new Gitter(token);
      if (!token) {
        this.displaySetupMessage();
        return false;
      }
      this.gitter.currentUser().then(function(user) {
        this.info("You are logged in as " + user.username);
      });
      return this;
    },
    joinProjectRepoRoom: function() {
      var repoUri;
      repoUri = this.getProjectRepoRoom();
      if (!repoUri) {
        this.warn("Could not determine this project's repository room.");
        return false;
      } else {
        return this.joinRoomWithRepoUri(repoUri);
      }
    },
    joinRoomWithRepoUri: function(repoUri) {
      this.gitter.rooms.join(repoUri, (function(_this) {
        return function(error, room) {
          _this.logger.info('joinRoomWithRepoUri #{repoUri}, #{error}, #{room}');
          if (!error && room) {
            return _this.joinRoom(room);
          } else {
            _this.error("Could not find room with repo URI " + repoUri + "." + (!!error ? " Error: " + error.message : ""));
            if (error.message === "Unauthorized") {
              _this.displaySetupMessage();
            }
            return false;
          }
        };
      })(this));
    },
    joinRoom: function(room) {
      var events;
      this.logger.info('Join room: #{room}');
      if (!room) {
        return this.warn("Invalid room. Cannot join.");
      }
      this.currentRoom = room;
      this.setTitle("Gitter - " + this.currentRoom.name + " - " + this.currentRoom.topic);
      this.addMessage(new PlainMessageView({
        message: "Found room: " + room.name,
        raw: true,
        className: "gitter-message text-success"
      }));
      events = room.streaming().chatMessages();
      if (atom.config.get('gitter.displaySnapshotMessages')) {
        this.logger.info("Should display snapshot messages");
        events.on("snapshot", (function(_this) {
          return function(snapshot) {
            _this.addMessage(new PlainMessageView({
              message: "Connected to Gitter chat room.",
              raw: true,
              className: "gitter-message text-success"
            }));
            snapshot.forEach(_this.newMessage, _this);
          };
        })(this));
      }
      events.on("chatMessages", (function(_this) {
        return function(msg) {
          if (msg.operation === "create") {
            _this.newMessage(msg.model);
          } else {
            _this.logger.info("Not a new message: " + msg.operation);
          }
        };
      })(this));
    },
    switchRoom: function() {
      this.logger.info("Switch room");
      if (!this.roomInputView.hasParent()) {
        this.roomInputView.toggle();
      }
      return this.roomInputView.inputRoom.val(this.currentRoom.uri);
    },
    newMessage: function(msg) {
      var d, dateStr, html, isDeleted, message, msgView, openOnNewMessage, sent, text, user;
      this.logger.info("Gitter New Message: " + msg);
      user = msg.fromUser;
      text = msg.text;
      html = msg.html;
      sent = msg.sent;
      isDeleted = !text;
      d = new Date(sent);
      dateStr = d.toDateString() + " " + d.toTimeString();
      message = "<a href=\"https://github.com" + user.url + "\" title=\"" + user.displayName + "\">" + user.username + "</a>" + " - " + dateStr + "<br/>";
      if (!isDeleted) {
        message += emojify.replace(html);
      } else {
        message += "<em class=\"text-muted\">This message was deleted.</em>";
      }
      msgView = new PlainMessageView({
        message: message,
        raw: true,
        className: "gitter-message"
      });
      this.addMessage(msgView);
      this.setSummary({
        summary: user.username + ": " + text,
        className: "text-italic"
      });
      openOnNewMessage = atom.config.get("gitter.openOnNewMessage");
      if (openOnNewMessage) {
        this.logger.info("Should open on this new message.");
        this.openMessagePanel();
      }
      return this;
    },
    restart: function() {
      var token;
      this.logger.info("Restart Gitter");
      this.initMessagePanelView();
      token = atom.config.get("gitter.token");
      this.login(token);
      return this.joinProjectRepoRoom();
    },
    setupCommands: function() {
      this.logger.info("Setup Commands");
      atom.workspaceView.command("gitter:restart", (function(_this) {
        return function() {
          return _this.restart();
        };
      })(this));
      atom.workspaceView.command("gitter:open-messages", (function(_this) {
        return function() {
          return _this.openMessagePanel();
        };
      })(this));
      atom.workspaceView.command("gitter:close-messages", (function(_this) {
        return function() {
          return _this.closeMessagePanel();
        };
      })(this));
      atom.workspaceView.command("gitter:toggle-messages", (function(_this) {
        return function() {
          return _this.toggleMessagePanel();
        };
      })(this));
      atom.workspaceView.command("gitter:clear-messages", (function(_this) {
        return function() {
          return _this.messagePanelView.clear();
        };
      })(this));
      return atom.workspaceView.command("gitter:switch-room", (function(_this) {
        return function() {
          return _this.switchRoom();
        };
      })(this));
    },
    activate: function(state) {
      var token;
      this.logger = new Logger(atom.config, "gitter");
      this.logger.info("Atom Gitter Activated!");
      this.initMessagePanelView();
      emojify.setConfig({
        img_dir: this.emojiFolder
      });
      this.atomGitterView = new AtomGitterView(this);
      this.roomInputView = new AtomGitterInputRoomView(this);
      token = atom.config.observe("gitter.token", {}, (function(_this) {
        return function(token) {
          _this.login(token);
          _this.joinProjectRepoRoom();
        };
      })(this));
      this.setupCommands();
    },
    deactivate: function() {
      this.atomGitterView.destroy();
      this.roomInputView.destroy();
      return this.logger.destroy();
    },
    serialize: function() {
      return {
        atomGitterViewState: this.atomGitterView.serialize()
      };
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGlJQUFBOztBQUFBLEVBQUEsY0FBQSxHQUFpQixPQUFBLENBQVEsb0JBQVIsQ0FBakIsQ0FBQTs7QUFBQSxFQUNBLHVCQUFBLEdBQTBCLE9BQUEsQ0FBUSwrQkFBUixDQUQxQixDQUFBOztBQUFBLEVBRUEsZ0JBQUEsR0FBbUIsT0FBQSxDQUFRLG9CQUFSLENBQTZCLENBQUMsZ0JBRmpELENBQUE7O0FBQUEsRUFHQSxnQkFBQSxHQUFtQixPQUFBLENBQVEsb0JBQVIsQ0FBNkIsQ0FBQyxnQkFIakQsQ0FBQTs7QUFBQSxFQUlBLGdCQUFBLEdBQW1CLE9BQUEsQ0FBUSxxQkFBUixDQUpuQixDQUFBOztBQUFBLEVBS0EsR0FBQSxHQUFNLE9BQUEsQ0FBUSxLQUFSLENBTE4sQ0FBQTs7QUFBQSxFQU1BLE1BQUEsR0FBUyxPQUFBLENBQVEsYUFBUixDQU5ULENBQUE7O0FBQUEsRUFPQSxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVIsQ0FQUCxDQUFBOztBQUFBLEVBUUEsT0FBQSxHQUFVLE9BQUEsQ0FBUSxXQUFSLENBUlYsQ0FBQTs7QUFBQSxFQVNBLE1BQUEsR0FBUyxPQUFBLENBQVEsYUFBUixDQVRULENBQUE7O0FBQUEsRUFXQSxNQUFNLENBQUMsT0FBUCxHQUNFO0FBQUEsSUFBQSxjQUFBLEVBQ0U7QUFBQSxNQUFBLEtBQUEsRUFBTyxFQUFQO0FBQUEsTUFDQSxnQkFBQSxFQUFrQixJQURsQjtBQUFBLE1BRUEsbUJBQUEsRUFBcUIsSUFGckI7QUFBQSxNQUdBLHVCQUFBLEVBQXlCLElBSHpCO0tBREY7QUFBQSxJQU1BLFdBQUEsRUFBYSxvREFOYjtBQUFBLElBT0EsY0FBQSxFQUFnQixJQVBoQjtBQUFBLElBUUEsZ0JBQUEsRUFBa0IsSUFSbEI7QUFBQSxJQVNBLE1BQUEsRUFBUSxJ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
//# sourceURL=/Users/andrewhazlett/.atom/packages/gitter/lib/atom-gitter.coffee
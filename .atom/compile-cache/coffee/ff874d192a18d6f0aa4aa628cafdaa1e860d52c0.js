(function() {
  "use strict";
  var Logger, exports, temp, winston;

  winston = require("winston");

  temp = require('temp');

  Logger = (function() {
    Logger.prototype._configObservers = {};

    function Logger(config, namespace, name) {
      this.config = config;
      this.namespace = namespace;
      this.name = name != null ? name : "Logger";
      if (this.config == null) {
        throw new Error('Missing Config argument.');
      }
      if (this.namespace == null) {
        throw new Error('Missing Namespace (Package name) argument.');
      }
      this._setup();
      this._config();
    }

    Logger.prototype.destroy = function() {
      return this._unobserveConfigs();
    };

    Logger.prototype._setup = function() {
      this.logFilePath = this._getLogFilePath();
      this.logger = new winston.Logger({
        transports: [
          new winston.transports.File({
            filename: this.logFilePath
          })
        ]
      });
      return this.logger;
    };

    Logger.prototype._getLogFilePath = function() {
      var p;
      if (this.logFilePath != null) {
        return this.logFilePath;
      } else {
        p = this.config.get("" + this.namespace + "." + this.name + "_filePath");
        if ((p != null)) {
          return p;
        } else {
          return temp.path({
            suffix: '.log'
          });
        }
      }
    };

    Logger.prototype._config = function() {
      var keyPath;
      keyPath = (function(_this) {
        return function(key) {
          return "" + _this.namespace + "." + _this.name + "_" + key;
        };
      })(this);
      this.config.set(keyPath('filePath'), this.logFilePath);
      return this._observeConfig(this.config, keyPath('filePath'), {}, (function(_this) {
        return function(newValue, previousValue) {
          if (newValue !== _this.logFilePath) {
            return _this.config.set(keyPath('filePath'), _this.logFilePath);
          }
        };
      })(this));
    };

    Logger.prototype._observeConfig = function(config, keyPath, options, callback) {
      return this._configObservers[keyPath] = config.observe(keyPath, options, callback);
    };

    Logger.prototype._unobserveConfigs = function() {
      var keyPath, _i, _len, _ref, _results;
      _ref = this._configObservers;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        keyPath = _ref[_i];
        _results.push(this._unobserveConfig(keyPath));
      }
      return _results;
    };

    Logger.prototype._unobserveConfig = function(keyPath) {
      this._configObservers[keyPath].off();
      return delete this._configObservers[keyPath];
    };

    Logger.prototype.log = function() {
      return this.logger.log.apply(this.logger, arguments);
    };

    Logger.prototype.info = function() {
      return this.logger.info.apply(this.logger, arguments);
    };

    Logger.prototype.warn = function() {
      return this.logger.warn.apply(this.logger, arguments);
    };

    Logger.prototype.error = function() {
      return this.logger.error.apply(this.logger, arguments);
    };

    return Logger;

  })();

  exports = module.exports = Logger;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxFQUFBLFlBQUEsQ0FBQTtBQUFBLE1BQUEsOEJBQUE7O0FBQUEsRUFTQSxPQUFBLEdBQVUsT0FBQSxDQUFRLFNBQVIsQ0FUVixDQUFBOztBQUFBLEVBVUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBVlAsQ0FBQTs7QUFBQSxFQWFNO0FBR0oscUJBQUEsZ0JBQUEsR0FBa0IsRUFBbEIsQ0FBQTs7QUFHYSxJQUFBLGdCQUFFLE1BQUYsRUFBVyxTQUFYLEVBQXVCLElBQXZCLEdBQUE7QUFFWCxNQUZZLElBQUMsQ0FBQSxTQUFBLE1BRWIsQ0FBQTtBQUFBLE1BRnFCLElBQUMsQ0FBQSxZQUFBLFNBRXRCLENBQUE7QUFBQSxNQUZpQyxJQUFDLENBQUEsc0JBQUEsT0FBTyxRQUV6QyxDQUFBO0FBQUEsTUFBQSxJQUFrRCxtQkFBbEQ7QUFBQSxjQUFVLElBQUEsS0FBQSxDQUFNLDBCQUFOLENBQVYsQ0FBQTtPQUFBO0FBQ0EsTUFBQSxJQUFPLHNCQUFQO0FBQ0UsY0FBVSxJQUFBLEtBQUEsQ0FBTSw0Q0FBTixDQUFWLENBREY7T0FEQTtBQUFBLE1BS0EsSUFBQyxDQUFBLE1BQUQsQ0FBQSxDQUxBLENBQUE7QUFBQSxNQU1BLElBQUMsQ0FBQSxPQUFELENBQUEsQ0FOQSxDQUZXO0lBQUEsQ0FIYjs7QUFBQSxxQkFjQSxPQUFBLEdBQVMsU0FBQSxHQUFBO2FBQ1AsSUFBQyxDQUFBLGlCQUFELENBQUEsRUFETztJQUFBLENBZFQsQ0FBQTs7QUFBQSxxQkFrQkEsTUFBQSxHQUFRLFNBQUEsR0FBQTtBQUNOLE1BQUEsSUFBQyxDQUFBLFdBQUQsR0FBZSxJQUFDLENBQUEsZUFBRCxDQUFBLENBQWYsQ0FBQTtBQUFBLE1BRUEsSUFBQyxDQUFBLE1BQUQsR0FBYyxJQUFDLE9BQU8sQ0FBQyxNQUFULENB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
//# sourceURL=/Users/andrewhazlett/.atom/packages/gitter/node_modules/atom-logger/lib/atom-logger.coffee
(function() {
  var EventEmitter2, ModuleManager, config, isFunction, packageManager, satisfies, workspace,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  satisfies = require('semver').satisfies;

  EventEmitter2 = require('eventemitter2').EventEmitter2;

  workspace = atom.workspace, config = atom.config, packageManager = atom.packages;

  isFunction = function(func) {
    return (typeof func) === 'function';
  };

  module.exports = ModuleManager = (function(_super) {
    __extends(ModuleManager, _super);

    ModuleManager.prototype.modules = {};

    ModuleManager.prototype.version = '0.0.0';

    function ModuleManager() {
      this.update = __bind(this.update, this);
      ModuleManager.__super__.constructor.apply(this, arguments);
      this.setMaxListeners(0);
      atom.workspace.on('coffee-refactor-became-active', this.update);
      this.update();
    }

    ModuleManager.prototype.destruct = function() {
      atom.workspace.off('coffee-refactor-became-active', this.update);
      return delete this.modules;
    };

    ModuleManager.prototype.update = function() {
      var engines, metaData, name, requiredVersion, _i, _len, _ref, _results;
      this.modules = {};
      _ref = packageManager.getAvailablePackageMetadata();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        metaData = _ref[_i];
        name = metaData.name, engines = metaData.engines;
        if (!(!packageManager.isPackageDisabled(name) && ((requiredVersion = engines != null ? engines.refactor : void 0) != null) && satisfies(this.version, requiredVersion))) {
          continue;
        }
        _results.push(this.activate(name));
      }
      return _results;
    };

    ModuleManager.prototype.activate = function(name) {
      return packageManager.activatePackage(name).then((function(_this) {
        return function(pkg) {
          var Ripper, module, scopeName, _i, _len, _ref;
          Ripper = (module = pkg.mainModule).Ripper;
          if (!((Ripper != null) && Array.isArray(Ripper.scopeNames) && isFunction(Ripper.prototype.parse) && isFunction(Ripper.prototype.find))) {
            console.error("'" + name + "' should implement Ripper.scopeNames, Ripper.parse() and Ripper.find()");
            return;
          }
          _ref = Ripper.scopeNames;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            scopeName = _ref[_i];
            _this.modules[scopeName] = module;
          }
          return _this.emit('changed');
        };
      })(this));
    };

    ModuleManager.prototype.getModule = function(sourceName) {
      return this.modules[sourceName];
    };

    return ModuleManager;

  })(EventEmitter2);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHNGQUFBO0lBQUE7O21TQUFBOztBQUFBLEVBQUUsWUFBYyxPQUFBLENBQVEsUUFBUixFQUFkLFNBQUYsQ0FBQTs7QUFBQSxFQUNFLGdCQUFrQixPQUFBLENBQVEsZUFBUixFQUFsQixhQURGLENBQUE7O0FBQUEsRUFFRSxpQkFBQSxTQUFGLEVBQWEsY0FBQSxNQUFiLEVBQStCLHNCQUFWLFFBRnJCLENBQUE7O0FBQUEsRUFJQSxVQUFBLEdBQWEsU0FBQyxJQUFELEdBQUE7V0FBVSxDQUFDLE1BQUEsQ0FBQSxJQUFELENBQUEsS0FBaUIsV0FBM0I7RUFBQSxDQUpiLENBQUE7O0FBQUEsRUFNQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBRUosb0NBQUEsQ0FBQTs7QUFBQSw0QkFBQSxPQUFBLEdBQVMsRUFBVCxDQUFBOztBQUFBLDRCQUNBLE9BQUEsR0FBUyxPQURULENBQUE7O0FBR2EsSUFBQSx1QkFBQSxHQUFBO0FBQ1gsNkNBQUEsQ0FBQTtBQUFBLE1BQUEsZ0RBQUEsU0FBQSxDQUFBLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxlQUFELENBQWlCLENBQWpCLENBREEsQ0FBQTtBQUFBLE1BTUEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFmLENBQWtCLCtCQUFsQixFQUFtRCxJQUFDLENBQUEsTUFBcEQsQ0FOQSxDQUFBO0FBQUEsTUFPQSxJQUFDLENBQUEsTUFBRCxDQUFBLENBUEEsQ0FEVztJQUFBLENBSGI7O0FBQUEsNEJBYUEsUUFBQSxHQUFVLFNBQUEsR0FBQTtBQUVSLE1BQUEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFmLENBQW1CLCtCQUFuQixFQUFvRCxJQUFDLENBQUEsTUFBckQsQ0FBQSxDQUFBO2FBRUEsTUFBQSxDQUFBLElBQVEsQ0FBQSxRQUpBO0lBQUEsQ0FiVixDQUFBOztBQUFBLDRCQW1CQSxNQUFBLEdBQVEsU0FBQSxHQUFBO0FBQ04sVUFBQSxrRUFBQTtBQUFBLE1BQUEsSUFBQyxDQUFBLE9BQUQsR0FBVyxFQUFYLENBQUE7QUFFQTtBQUFBO1dBQUEsMkNBQUE7NEJBQUE7QUFFRSxRQUFFLGdCQUFBLElBQUYsRUFBUSxtQkFBQSxPQUFSLENBQUE7QUFDQSxRQUFBLElBQUEsQ0FBQSxDQUFnQixDQUFBLGNBQWUsQ0FBQyxpQkFBZixDQUFpQyxJQUFqQyxDQUFELElBQ0EseUVBREEsSUFFQSxTQUFBLENBQVUsSUFBQyxDQUFBLE9BQVgsRUFBb0IsZUFBcEIsQ0FGaEIsQ0FBQTtBQUFBLG1CQUFBO1NBREE7QUFBQSxzQkFJQSxJQUFDLENBQUEsUUFBRCxDQUFVLElBQVYsRUFKQSxDQUZGO0FBQUE7c0JBSE07SUFBQSxDQW5CUixDQUFBOztBQUFBLDRCQThCQSxRQUFBLEdBQVUsU0FBQyxJQUFELEdBQUE7YUFDUixjQUNBLENBQUMsZUFERCxDQUNpQixJQURqQixDQUVBLENBQUMsSUFGRCxDQUVNLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFDLEdBQUQsR0FBQTtBQUVKLGNBQUEseUNBQUE7QUFBQSxVQUFFLFNBQVcsQ0FBQSxNQUFBLEdBQVMsR0FBRyxDQUFDLFVBQWIsRUFBWCxNQUFGLENBQUE7QUFDQSxVQUFBLElBQUEsQ0FBQSxDQUFPLGdCQUFBLElBQ0EsS0FBSyxDQUFDLE9BQU4sQ0FBYyxNQUFNLENBQUMsVUFBckIsQ0FEQSxJQUVBLFVBQUEsQ0FBVyxNQUFNLENBQUEsU0FBRSxDQUFBLEtBQW5CLENBRkEsSUFHQSxVQUFBLENBQVcsTUFBTSxDQUFBLFNBQUUsQ0FBQSxJQUFuQixDQUhQLENBQUE7QUFJRSxZQUFBLE9BQU8sQ0FBQyxLQUFSLENBQWUsR0FBQSxHQUFFLElBQUYsR0FBUSx3RUFBdkIsQ0FBQSxDQUFBO0FBQ0Esa0JBQUEsQ0FMRjtXQURBO0FBUUE7QUFBQSxlQUFBLDJDQUFBO2lDQUFBO0FBQ0UsWUFBQSxLQUFDLENBQUEsT0FBUSxDQUFBLFNBQUEsQ0FBVCxHQUFzQixNQUF0QixDQURGO0FBQUEsV0FSQTtpQkFXQSxLQUFDLENBQUEsSUFBRCxDQUFNLFNBQU4sRUFiSTtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBRk4sRUFEUTtJQUFBLENBOUJWLENBQUE7O0FBQUEsNEJBZ0RBLFNBQUEsR0FBVyxTQUFDLFVBQUQsR0FBQTthQUNULElBQUMsQ0FBQSxPQUFRLENBQUEsVUFBQSxFQURBO0lBQUEsQ0FoRFgsQ0FBQTs7eUJBQUE7O0tBRjBCLGNBUDVCLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/andrewhazlett/.atom/packages/refactor/lib/module_manager.coffee
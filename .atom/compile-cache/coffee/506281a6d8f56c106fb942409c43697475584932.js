(function() {
  var basename, dirname, exp, extname, findModules, join, module, name, namespace, ns, readdirSync, relative, resolve, statSync, _i, _j, _len, _len1, _ref, _ref1, _ref2, _ref3;

  _ref = require('path'), resolve = _ref.resolve, dirname = _ref.dirname, basename = _ref.basename, extname = _ref.extname, relative = _ref.relative, join = _ref.join;

  _ref1 = require('fs'), readdirSync = _ref1.readdirSync, statSync = _ref1.statSync;

  findModules = function(dir) {
    var coffeeFiles, file, files, stat, _i, _len, _ref2;
    if (dir == null) {
      dir = __dirname;
    }
    coffeeFiles = [];
    files = readdirSync(dir);
    for (_i = 0, _len = files.length; _i < _len; _i++) {
      file = files[_i];
      file = resolve(dir, file);
      if (file === __filename) {
        continue;
      }
      stat = statSync(file);
      if (stat.isDirectory()) {
        coffeeFiles = coffeeFiles.concat(findModules(file));
        continue;
      }
      if ((_ref2 = extname(file)) === '.coffee' || _ref2 === '.js') {
        coffeeFiles.push(relative(__dirname, file));
      }
    }
    return coffeeFiles;
  };

  _ref2 = findModules();
  for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
    module = _ref2[_i];
    namespace = dirname(module);
    name = basename(module, extname(module));
    exp = exports;
    if (namespace !== '.') {
      exp = exports;
      _ref3 = namespace.split('/');
      for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
        ns = _ref3[_j];
        if (exp[ns] == null) {
          exp[ns] = {};
        }
        exp = exp[ns];
      }
    }
    exp[name] = require("./" + module);
  }

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHlLQUFBOztBQUFBLEVBQUEsT0FBMEQsT0FBQSxDQUFRLE1BQVIsQ0FBMUQsRUFBRSxlQUFBLE9BQUYsRUFBVyxlQUFBLE9BQVgsRUFBb0IsZ0JBQUEsUUFBcEIsRUFBOEIsZUFBQSxPQUE5QixFQUF1QyxnQkFBQSxRQUF2QyxFQUFpRCxZQUFBLElBQWpELENBQUE7O0FBQUEsRUFDQSxRQUE0QixPQUFBLENBQVEsSUFBUixDQUE1QixFQUFFLG9CQUFBLFdBQUYsRUFBZSxpQkFBQSxRQURmLENBQUE7O0FBQUEsRUFHQSxXQUFBLEdBQWMsU0FBQyxHQUFELEdBQUE7QUFDWixRQUFBLCtDQUFBOztNQURhLE1BQU07S0FDbkI7QUFBQSxJQUFBLFdBQUEsR0FBYyxFQUFkLENBQUE7QUFBQSxJQUNBLEtBQUEsR0FBUSxXQUFBLENBQVksR0FBWixDQURSLENBQUE7QUFFQSxTQUFBLDRDQUFBO3VCQUFBO0FBQ0UsTUFBQSxJQUFBLEdBQU8sT0FBQSxDQUFRLEdBQVIsRUFBYSxJQUFiLENBQVAsQ0FBQTtBQUNBLE1BQUEsSUFBWSxJQUFBLEtBQVEsVUFBcEI7QUFBQSxpQkFBQTtPQURBO0FBQUEsTUFFQSxJQUFBLEdBQU8sUUFBQSxDQUFTLElBQVQsQ0FGUCxDQUFBO0FBR0EsTUFBQSxJQUFHLElBQUksQ0FBQyxXQUFMLENBQUEsQ0FBSDtBQUNFLFFBQUEsV0FBQSxHQUFjLFdBQVcsQ0FBQyxNQUFaLENBQW1CLFdBQUEsQ0FBWSxJQUFaLENBQW5CLENBQWQsQ0FBQTtBQUNBLGlCQUZGO09BSEE7QUFNQSxNQUFBLGFBQUcsT0FBQSxDQUFRLElBQVIsRUFBQSxLQUFtQixTQUFuQixJQUFBLEtBQUEsS0FBOEIsS0FBakM7QUFDRSxRQUFBLFdBQVcsQ0FBQyxJQUFaLENBQWlCLFFBQUEsQ0FBUyxTQUFULEVBQW9CLElBQXBCLENBQWpCLENBQUEsQ0FERjtPQVBGO0FBQUEsS0FGQTtXQVdBLFlBWlk7RUFBQSxDQUhkLENBQUE7O0FBaUJBO0FBQUEsT0FBQSw0Q0FBQTt1QkFBQTtBQUNFLElBQUEsU0FBQSxHQUFZLE9BQUEsQ0FBUSxNQUFSLENBQVosQ0FBQTtBQUFBLElBQ0EsSUFBQSxHQUFPLFFBQUEsQ0FBUyxNQUFULEVBQWlCLE9BQUEsQ0FBUSxNQUFSLENBQWpCLENBRFAsQ0FBQTtBQUFBLElBRUEsR0FBQSxHQUFNLE9BRk4sQ0FBQTtBQUdBLElBQUEsSUFBRyxTQUFBLEtBQWUsR0FBbEI7QUFDRSxNQUFBLEdBQUEsR0FBTSxPQUFOLENBQUE7QUFDQTtBQUFBLFdBQUEsOENBQUE7dUJBQUE7O1VBQ0UsR0FBSSxDQUFBLEVBQUEsSUFBTztTQUFYO0FBQUEsUUFDQSxHQUFBLEdBQU0sR0FBSSxDQUFBLEVBQUEsQ0FEVixDQURGO0FBQUEsT0FGRjtLQUhBO0FBQUEsSUFRQSxHQUFJLENBQUEsSUFBQSxDQUFKLEdBQVksT0FBQSxDQUFTLElBQUEsR0FBRyxNQUFaLENBUlosQ0FERjtBQUFBLEdBakJBO0FBQUEiCn0=
//# sourceURL=/Users/andrewhazlett/.atom/packages/coffee-refactor/node_modules/atom-refactor/lib/exports.coffee
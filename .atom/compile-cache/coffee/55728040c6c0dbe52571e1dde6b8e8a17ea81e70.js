(function() {
  var View;

  View = require('atom').View;

  module.exports = function(port) {
    return {
      completions: (function(_this) {
        return function(file, end, text) {
          return View.post("http://localhost:" + port, JSON.stringify({
            query: {
              type: 'completions',
              file: file,
              end: end,
              types: true,
              guess: true,
              lineCharPositions: true,
              caseInsensitive: true
            },
            files: [
              {
                type: 'full',
                name: file,
                text: text
              }
            ]
          })).then(function(data) {
            return data;
          });
        };
      })(this),
      update: (function(_this) {
        return function(file, text) {
          return View.post("http://localhost:" + port, JSON.stringify({
            files: [
              {
                type: 'full',
                name: file,
                text: text
              }
            ]
          })).then(function(data) {
            return data;
          });
        };
      })(this)
    };
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLElBQUE7O0FBQUEsRUFBQyxPQUFRLE9BQUEsQ0FBUSxNQUFSLEVBQVIsSUFBRCxDQUFBOztBQUFBLEVBQ0EsTUFBTSxDQUFDLE9BQVAsR0FBaUIsU0FBQyxJQUFELEdBQUE7V0FDYjtBQUFBLE1BQUEsV0FBQSxFQUFhLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFDLElBQUQsRUFBTyxHQUFQLEVBQVksSUFBWixHQUFBO2lCQUNULElBQUksQ0FBQyxJQUFMLENBQVcsbUJBQUEsR0FBa0IsSUFBN0IsRUFDSSxJQUFJLENBQUMsU0FBTCxDQUNJO0FBQUEsWUFBQSxLQUFBLEVBQ0k7QUFBQSxjQUFBLElBQUEsRUFBTSxhQUFOO0FBQUEsY0FDQSxJQUFBLEVBQU0sSUFETjtBQUFBLGNBRUEsR0FBQSxFQUFLLEdBRkw7QUFBQSxjQUdBLEtBQUEsRUFBTyxJQUhQO0FBQUEsY0FJQSxLQUFBLEVBQU8sSUFKUDtBQUFBLGNBS0EsaUJBQUEsRUFBbUIsSUFMbkI7QUFBQSxjQU1BLGVBQUEsRUFBaUIsSUFOakI7YUFESjtBQUFBLFlBUUEsS0FBQSxFQUFPO2NBQ0g7QUFBQSxnQkFBQSxJQUFBLEVBQU0sTUFBTjtBQUFBLGdCQUNBLElBQUEsRUFBTSxJQUROO0FBQUEsZ0JBRUEsSUFBQSxFQUFNLElBRk47ZUFERzthQVJQO1dBREosQ0FESixDQWVDLENBQUMsSUFmRixDQWVPLFNBQUMsSUFBRCxHQUFBO21CQUNILEtBREc7VUFBQSxDQWZQLEVBRFM7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFiO0FBQUEsTUFrQkEsTUFBQSxFQUFRLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFDLElBQUQsRUFBTyxJQUFQLEdBQUE7aUJBQ0osSUFBSSxDQUFDLElBQUwsQ0FBVyxtQkFBQSxHQUFrQixJQUE3QixFQUNJLElBQUksQ0FBQyxTQUFMLENBQ0k7QUFBQSxZQUFBLEtBQUEsRUFBTztjQUNIO0FBQUEsZ0JBQUEsSUFBQSxFQUFNLE1BQU47QUFBQSxnQkFDQSxJQUFBLEVBQU0sSUFETjtBQUFBLGdCQUVBLElBQUEsRUFBTSxJQUZOO2VBREc7YUFBUDtXQURKLENBREosQ0FPQyxDQUFDLElBUEYsQ0FPTyxTQUFDLElBQUQsR0FBQTttQkFDSCxLQURHO1VBQUEsQ0FQUCxFQURJO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FsQlI7TUFEYTtFQUFBLENBRGpCLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/andrewhazlett/.atom/packages/Tern/lib/client.coffee
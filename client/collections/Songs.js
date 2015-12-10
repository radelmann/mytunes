// Songs.js - Defines a backbone collection class for songs.
var Songs = Backbone.Collection.extend({

  model: SongModel,
  url: scConfig.url,

  parse: function(data) {
        return data;
  }
});

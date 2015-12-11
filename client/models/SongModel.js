// SongModel.js - Defines a backbone model class for songs.
var SongModel = Backbone.Model.extend({

  play: function() {
    this.trigger('play', this);
  },

  ended: function() {
    // this song is no longer in the queue, 
    // need to get access to queue from app.get
    app.get('songQueue').playFirst();
  },

  enqueue: function() {
    this.trigger('enqueue', this);
  },

  dequeue: function() {
    this.trigger('dequeue', this);
  }
});

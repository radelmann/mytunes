// SongModel.js - Defines a backbone model class for songs.
var SongModel = Backbone.Model.extend({

  play: function() {
    this.trigger('play', this);
  },

  ended: function() {
    this.trigger('ended', this);
  },

  enqueue: function() {
    this.trigger('enqueue', this);
    console.log('enqueue');
  },

  dequeue: function() {
    this.trigger('dequeue', this);
  }
});

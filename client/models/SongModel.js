// SongModel.js - Defines a backbone model class for songs.
var SongModel = Backbone.Model.extend({

  play: function() {
    // Triggering an event here will also trigger the event on the collection
    this.trigger('play', this);
  },

  ended: function() {
    // Triggering an event here will also trigger the event on the collection
    this.trigger('ended', this);
  },

  enqueue: function() {
    this.trigger('enqueue', this);
  },

  dequeue: function() {
    console.log('model dequeue');
    this.trigger('dequeue', this);
  }
});

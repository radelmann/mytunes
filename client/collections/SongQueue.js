// SongQueue.js - Defines a backbone model class for the song queue.
var SongQueue = Songs.extend({

  initialize: function() {
    this.on('dequeue', this.onDequeue, this);
    this.on('enqueue', this.onEnqueue, this);
    this.on('add', this.onAdd, this);
    this.on('ended', this.onEnd, this);
  },

  onAdd: function() {
    if (this.length === 1) {
      this.playFirst();
    }
  },

  onEnd: function() {
    var song = this.at(0);
    this.remove(song);
    if (this.at(0) !== undefined) {
      this.playFirst();
    }
  },

  onDequeue: function(song) {
    console.log('queue - dequeue');
    this.remove(song);
    if (this.at(0) !== undefined) {
      this.playFirst();
    }
  },

  onEnqueue: function(song) {
    console.log('queue - enqueue');
  },

  playFirst: function() {
    var song = this.at(0);
    song.play();
  }
});

// SongQueue.js - Defines a backbone model class for the song queue.
var SongQueue = Songs.extend({

  initialize: function() {
    this.on('dequeue', this.onDequeue, this);
    this.on('enqueue', this.onEnqueue, this);
    this.on('add', this.onAdd, this);
    this.on('ended', this.onEnd, this);
    this.on('play', this.onPlay, this);
  },

  onAdd: function() {
    //check if song is already playing
    if (!app.get('currentSong')) {
      this.playFirst();
    }
  },

  onEnd: function() {
    this.playFirst();
  },

  onDequeue: function(song) {
    this.remove(song);
  },

  onPlay: function(song) {
    this.remove(song);
  },

  playFirst: function() {
    if (this.at(0)) {
      var song = this.at(0);
        song.play();
    }
  }
});

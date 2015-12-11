// PlayerView.js - Defines a backbone view class for the music player.
var PlayerView = Backbone.View.extend({

  // HTML5 (native) audio tag is being used
  // see: https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML5_audio_and_video
  el: ['<div>',
      '<img class="song-artwork-url" />',
      '<div class="song-artist"></div>',
      '<div class="song-title"></div>',
      '<audio class="player" controls autoplay />',
      '</div>'].join(''),

  initialize: function() {},

  events: {
    'ended': 'songEnd'
  },

  setSong: function(song) {
    this.model = song;
    this.render();
  },

  songEnd: function() {
    this.model.dequeue();
  },

  render: function() {
    this.$el.find('.song-artwork-url').attr('src', this.model ? this.model.get('artwork_url') : '');
    this.$el.find('.song-title').text(this.model ? this.model.get('title') : '');
    this.$el.find('.song-artist').text(this.model ? this.model.get('user')['username'] : '');
    return this.$el.find('.player').attr('src', this.model ? this.model.get('stream_url') + scConfig.qs : '');
  }
});

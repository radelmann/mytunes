// PlayerView.js - Defines a backbone view class for the music player.
var PlayerView = Backbone.View.extend({

  el: ['<div>',
    '<p><img class="song-artwork-url" />',
    '<span class="song-artist"></span><br>',
    '<span class="song-title"></span></p>',
    '</div>'
  ].join(''),

  initialize: function() {},

  setSong: function(song) {
    this.model = song;
    this.render();
  },

  render: function() {
    this.$el.find('.song-artwork-url').attr('src', this.model ? this.model.get('artwork_url') : '');
    this.$el.find('.song-title').text(this.model ? this.model.get('title') : '');
    this.$el.find('.song-artist').text(this.model ? this.model.get('user')['username'] : '');
    
    //create a new player view
    this.$el.find('.player').detach();
    var player = new Player({model:this.model});
    this.$el.append(player.render());
  }
});


var Player = Backbone.View.extend({

  // HTML5 (native) audio tag is being used
  // see: https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML5_audio_and_video
  el: '<audio class="player" controls autoplay />',

  initialize: function() {},

  events: {
    'ended': 'songEnd'
  },

  songEnd: function() {
    this.model.dequeue();
  },

  render: function() {
    this.$el.attr('src', this.model ? this.model.get('stream_url') + scConfig.qs : '');
    return this.$el;
  }
});

// PlayerView.js - Defines a backbone view class for the music player.
var PlayerView = Backbone.View.extend({

  el: ['<div class="player-container">',
    '<span class="song-artist"></span> - ',
    '<span class="song-title"></span>',
    '<div><img class="song-artwork-url" />',
    '<div id="visualizer" class="visualizer" style="width:100%;"></div>',
    '</div>',
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
    var player = new Player({
      model: this.model
    });
    this.$el.prepend(player.render());
  }
});

var Player = Backbone.View.extend({

  // HTML5 (native) audio tag is being used
  // see: https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML5_audio_and_video
  el: '<audio id="player" crossorigin="anonymous" class="player" controls autoplay />',

  initialize: function() {},

  events: {
    'ended': 'songEnd',
    'play': 'renderAudio'
  },

  renderAudio: function(event) {
    var audioCtx = new(window.AudioContext || window.webkitAudioContext)();
    var audioElement = document.getElementById('player');

    var audioSrc = audioCtx.createMediaElementSource(audioElement);
    var analyser = audioCtx.createAnalyser();

    // Bind our analyser to the media element source.
    audioSrc.connect(analyser);
    audioSrc.connect(audioCtx.destination);

    //var frequencyData = new Uint8Array(analyser.frequencyBinCount);
    var frequencyData = new Uint8Array(100);

    var svgHeight = '100';
    var svgWidth = '675';
    var barPadding = '1';

    function createSvg(parent, height, width) {
      return d3.select(parent).append('svg').attr('height', height).attr('width', width);
    }

    var svg = createSvg('#visualizer', svgHeight, svgWidth);

    // Create our initial D3 chart.
    svg.selectAll('rect')
      .data(frequencyData)
      .enter()
      .append('rect')
      .attr('x', function(d, i) {
        return i * (svgWidth / frequencyData.length);
      })
      .attr('width', svgWidth / frequencyData.length - barPadding);

    // Continuously loop and update chart with frequency data.
    window.renderChart = function () {
      requestAnimationFrame(renderChart);

      // Copy frequency data to frequencyData array.
      analyser.getByteFrequencyData(frequencyData);

      // Update d3 chart with new data.
      svg.selectAll('rect')
        .data(frequencyData)
        .attr('y', function(d) {
          return svgHeight - (d / 255 * 100);
        })
        .attr('height', function(d) {
          return d / 255 * 100;
        })
        .attr('fill', function(d) {
          return '#00CCFF';
        });
    };

    // Run the loop
    window.renderChart();
  },

  songEnd: function() {
    this.model.ended();
  },

  render: function() {
    this.$el.attr('src', this.model ? this.model.get('stream_url') + scConfig.qs : '');
    return this.$el;
  }
});

// SongQueueView.js - Defines a backbone view class for the song queue.
var SongQueueView = Backbone.View.extend({

  initialize: function() {
    this.render();

    this.collection.on('enqueue', function() {
      this.render();
    }, this);

    this.collection.on('dequeue', function() {
      this.render();
    }, this);

    this.collection.on('remove', function() {
        this.render();
    }, this);

    this.collection.on('add', function() {
      this.render();
    }, this);
  },

  render: function() {
    // to preserve event handlers on child nodes, we must call .detach() on them before overwriting with .html()
    // see http://api.jquery.com/detach/
    this.$el.children().detach();

    this.$el.html('<span class="title">Song Queue</span>').append(
      this.collection.map(function(song) {
        return new SongQueueEntryView({
          model: song
        }).render();
      })
    );
  }
});

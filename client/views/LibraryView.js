// LibraryView.js - Defines a backbone view class for the music library.
var LibraryView = Backbone.View.extend({

  tagName: "div",

  initialize: function() {
    this.render();
  },

  //handle dom clicks here
  //
  //

  render: function() {
    // to preserve event handlers on child nodes, we must call .detach() on them before overwriting with .html()
    // see http://api.jquery.com/detach/
    this.$el.children().detach();

    this.$el.html('<h2>Library</h2>').append(
      this.collection.map(function(song) {
        return new LibraryEntryView({
          model: song
        }).render();
      })
    );
  }
});

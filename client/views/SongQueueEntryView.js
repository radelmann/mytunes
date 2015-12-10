// SongQueueEntryView.js - Defines a backbone view class for the song queue entries.
var SongQueueEntryView = Backbone.View.extend({
  tagName: 'div',

  // template: _.template('<td>(<%= artist %>)</td><td><%= title %></td>'),
  template: _.template('<div class="library-item"><%= user["username"] %> - <%= title %></div>'),

  events: {
    'click': function() {
      this.model.dequeue();
    }
  },
  render: function(){
    return this.$el.html(this.template(this.model.attributes));
  }
});

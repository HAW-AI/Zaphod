Zaphod.LearnView = Backbone.View.extend({
  template: JST['learn'],

  events: {
    'click #showBack': function(e) {
			e.stopImmediatePropagation();
      e.preventDefault();
      this.$('#front, #showBack').hide();
      this.$('#back, #showFront, #known, #unknown').show();
    },
    'click #showFront': function(e) {
			e.stopImmediatePropagation();
      e.preventDefault();
      this.$('#back, #showFront').hide();
      this.$('#front, #showBack').show();
    },
    'click #known': 'known',
    'click #unknown': 'unknown'
  },

  // requires options.deck
  initialize: function(options) {
    _.bindAll(this, 'render', 'next', 'known');

    this.deck = options.deck;
    this.card = new Zaphod.Card({ deckId: this.deck.deckId })
    this.card.bind('change', this.render);

    // render in case there are no cards
    this.render();

    this.next();
  },

  render: function() {
    var data = {
      deck: this.deck.toJSON(),
      card: this.card.toJSON()
    };
    this.$el.html(this.template(data));

    this.$('#front').show();
    this.$('#back, #showFront, #known, #unknown').hide();

    return this;
  },

  next: function() {
    var url = Zaphod.apiUrl('/decks/' + this.deck.id + '/cards/next');
    this.card.fetch({ url: url });
  },

  known: function(e) {
		if (e) e.stopImmediatePropagation();
    this.learned(e, true);
  },

  unknown: function(e) {
		if (e) e.stopImmediatePropagation();
    this.learned(e, false);
  },

  learned: function(e, hasLearned) {
    if (e) e.preventDefault(); // tests don't pass event object
    this.card.save({ event: hasLearned ? 'known' : 'unknown' });
    this.next();
  }
});

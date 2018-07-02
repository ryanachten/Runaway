import DS from 'ember-data';

export default DS.Model.extend({
  featured: DS.attr(),
  title: DS.attr(),
  category: DS.attr(),
  client: DS.attr(),
  date: DS.attr(),
  image: DS.attr(),
  description: DS.attr()
});

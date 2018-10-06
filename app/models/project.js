import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr(),
  featured: DS.attr(),
  category: DS.attr(),
  client: DS.attr(),
  date: DS.attr(),
  videoLocal:  DS.attr(),
  videoVendor:  DS.attr('string'),
  description: DS.attr(),
});

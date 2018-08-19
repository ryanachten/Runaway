import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  date: DS.attr('date'),
  email: DS.attr('string'),
  message: DS.attr('string'),
});

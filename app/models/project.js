import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  title: DS.attr(),
  featured: DS.attr(),
  category: DS.attr(),
  client: DS.attr(),
  date: DS.attr(),
  videoSnippetFileName:  DS.attr('string'),
  videoSnippetUrl:  computed('videoSnippetFileName', function() {
    return `/video/${this.get('videoSnippetFileName')}`;
  }),
  videoVendorUrl:  DS.attr('string'),
  description: DS.attr(),
});

/*
  Based on the ember-lazy-video addon: https://github.com/poteto/ember-lazy-video/blob/develop/addon/components/lazy-video.js
    Refactored to remove background image defaults
    Add autoplay functionality
*/

import { computed } from '@ember/object';
import Component from '@ember/component';
const { inject } = Ember; //pattern breaking, but works... TODO: replace w/ proper import

export default Component.extend({
  isDisplayed: false,
  videoTitle: null,
  url: null,
  classNames: ['video-vendor__container'],
  attributeBindings: ['style'],
  providers: inject.service('video-vendor-providers'),

  click(){
    this.set('isDisplayed', true);
    this.sendAction('showingVideo');
  },

  videoSrc: computed('url', function () {
    let providers = this.get('providers');
    let url = this.get('url');

    return providers.getUrl(url, 'embedUrl', {autoplay: 1});
  })
});

/*
  Based on the ember-lazy-video addon: https://github.com/poteto/ember-lazy-video/blob/develop/addon/components/lazy-video.js
    Refactored to remove background image defaults
    Add autoplay functionality
*/

import { computed } from "@ember/object";
import Component from "@ember/component";
import { htmlSafe } from "@ember/string";
import { inject as service } from "@ember/service";

export default Component.extend({
  isDisplayed: false,
  videoTitle: null,
  url: null,
  classNames: ["video-vendor__container"],
  attributeBindings: ["style"],
  videoThumbnail: null,
  poster: null,
  providers: service("video-vendor-providers"),

  async didInsertElement() {
    const providers = this.get("providers");
    const url = this.get("url");
    const poster = this.get("poster");
    if (poster) {
      return;
    }
    try {
      const thumbnailUrl = await providers.getThumbnailUrl(url);
      this.set("videoThumbnail", thumbnailUrl);
    } catch (e) {
      window.console.log("Error falling back to background image:", e);
    }
  },

  click() {
    this.set("isDisplayed", true);
  },

  videoSrc: computed("url", function() {
    let providers = this.get("providers");
    let url = this.get("url");

    return providers.getUrl(url, "embedUrl", { autoplay: 1, background: 0 });
  }),

  style: computed("videoThumbnail", "poster", function() {
    let poster = this.get("poster");
    let thumbnail = poster || this.get("videoThumbnail");
    if (thumbnail) {
      return htmlSafe(`background-image: url(${encodeURI(thumbnail)})`);
    }
  })
});

/*
  Based on the ember-lazy-video addon:
  https://github.com/poteto/ember-lazy-video/blob/develop/addon/lazy-video-providers/vimeo.js
*/

export default {
  apiUrl(videoId) {
    return `//vimeo.com/api/oembed.json?url=http%3A//vimeo.com/${videoId}`;
  },

  embedUrl(videoId) {
    return `//player.vimeo.com/video/${videoId}`;
  },

  thumbnailUrl(videoId) {
    const apiUrl = this.apiUrl(videoId);
    return new Promise((resolve, reject) => {
      $.getJSON(apiUrl)
        .then(res => {
          resolve(res.thumbnail_url);
        })
        .catch(e => {
          reject("Error getting Vimeo thumbnail", e);
        });
    });
  }
};

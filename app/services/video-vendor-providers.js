/*
  Based on the ember-lazy-video addon: https://github.com/poteto/ember-lazy-video/blob/develop/addon/services/lazy-video-providers.js
*/

import Service from '@ember/service';
import { computed } from '@ember/object';
import vimeo from './video-vendor-providers/vimeo';
import youtube from './video-vendor-providers/youtube';

const YOUTUBE_REGEX = /(https?:\/\/)?(www.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/watch\?feature=player_embedded&v=)([A-Za-z0-9_-]*)(\&\S+)?(\?\S+)?/;
const VIMEO_REGEX   = /https?:\/\/(?:www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/;

export default Service.extend({

  vimeo,
  youtube,

  getUrl(url, endpoint, opts){
    opts = (typeof opts === 'undefined') ? {} : opts;
    const params = $.param(opts);

    const provider = this.getProvider(url)[endpoint];
    const videoId = this.getVideoId(url);

    return `${provider(videoId)}?${params}`;
  },

  getProvider(url){
    let providerName, provider;

    if (url) {
      if (VIMEO_REGEX.test(url)) {
        providerName = 'vimeo';
      }
      else if (YOUTUBE_REGEX.test(url)) {
        providerName = 'youtube'
      }
      else{
        return new Error(`Couldn't determine provider from url: ${url}`);
      }

      provider = this.get(providerName);

      return provider;
    }
  },

  getVideoId(url){
    let videoId, video;
    if (url) {
      if (VIMEO_REGEX.test(url)) {
        video = VIMEO_REGEX.exec(url);
        videoId = video[3];
      }
      else if (YOUTUBE_REGEX.test(url)) {
        video = YOUTUBE_REGEX.exec(url);
        videoId = video[4];
      }
      else{
        return new Error(`Couldn't determine videoId from url: ${url}`);
      }

      return videoId;
    }
  },

  getThumbnailUrl(url) {
    const videoId = this.getVideoId(url);
    return this.getProvider(url).thumbnailUrl(videoId);
  },
});

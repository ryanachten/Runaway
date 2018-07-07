export default {
  apiUrl(videoId){
    return `//gdata.youtube.com/feeds/api/videos/${videoId}`;
  },

  embedUrl(videoId){
    return `//www.youtube.com/embed/${videoId}`;
  }
}

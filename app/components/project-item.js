import Component from "@ember/component";
import { inject as service } from "@ember/service";
import { computed } from "@ember/object";
import { htmlSafe } from "@ember/string";

export default Component.extend({
  store: service(),
  videoPlayer: null,
  videoElement: null,
  videoError: false,
  videoThumbnail: null,
  isEditing: false,
  authed: false,

  providers: service("video-vendor-providers"),

  canEdit: computed("isEditing", "authed", function() {
    const isEditing = this.get("isEditing");
    const authed = this.get("authed");
    return authed && isEditing;
  }),

  mouseEnter() {
    const player = this.get("videoPlayer");
    if (!player || this.get("isEditing")) {
      return;
    }
    player.play();
  },

  mouseLeave() {
    const player = this.get("videoPlayer");
    if (!player || this.get("isEditing")) {
      return;
    }
    player.pause();
  },

  showProjectItem() {
    this.$(this.get("element"))
      .children(".project-item")
      .fadeIn(2000);
  },

  actions: {
    toggleEditProject() {
      const isEditing = this.get("isEditing");
      this.set("isEditing", !isEditing);
    },

    toggleFeatured(featured) {
      const id = this.get("project.id");
      const store = this.get("store");
      store
        .findRecord("project", id, { backgroundReload: false })
        .then(record => {
          record.set("featured", featured);
          record.save();
        });
    },

    editProject(project) {
      const store = this.get("store");
      store
        .findRecord("project", project.id, { backgroundReload: false })
        .then(record => {
          record.set("title", project.title);
          record.set("client", project.client);
          record.set("date", project.date);
          record.set("category", project.category);
          record.set("videoSnippetUrl", project.videoSnippetUrl);
          record.set("videoVendorUrl", project.videoVendorUrl);
          record.set("description", project.description);
          record.save();
        });
    },

    deleteProject(id) {
      const store = this.get("store");
      store
        .findRecord("project", id, { backgroundReload: false })
        .then(record => {
          record.deleteRecord();
          record.save();
        });
    },

    canplay(player, component) {
      this.set("videoPlayer", player);
      this.set("videoElement", component.get("element"));
      this.showProjectItem();
    },

    async error() {
      //  If there's an error playing the video, we fallback to showing the vendor thumbnail img
      const vendorUrl = this.get("project.videoVendorUrl");
      const providers = this.get("providers");
      try {
        await providers.getThumbnailUrl(vendorUrl).then(thumbnailUrl => {
          this.set(
            "videoThumbnail",
            htmlSafe(
              `background-color: unset; background-image: url(${encodeURI(
                thumbnailUrl
              )});`
            )
          );
        });
      } catch (e) {
        //  Finally, if there's an error getting the thumbnail image, we fallback to the defualt background-color
        window.console.log("Error falling back to background image:", e);
      }
      this.set("videoError", true);
      this.showProjectItem();
    }
  }
});

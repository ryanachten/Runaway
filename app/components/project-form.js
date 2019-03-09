import Component from "@ember/component";
import { computed } from "@ember/object";

export default Component.extend({
  title: null,
  client: null,
  date: null,
  category: null,
  videoSnippetFileName: null,
  videoVendorUrl: null,
  description: null,
  featured: false,

  isAbleToCreateProject: computed(
    "title",
    "client",
    "date",
    "category",
    "description",
    "videoSnippetFileName",
    function() {
      const {
        title,
        client,
        date,
        category,
        description,
        videoSnippetFileName
      } = this.getProperties(
        "title",
        "client",
        "date",
        "category",
        "description",
        "videoSnippetFileName"
      );

      // return true; // TODO: put back
      return (
        title &&
        client &&
        date &&
        category &&
        description &&
        videoSnippetFileName
      );
    }
  ),

  actions: {
    createProject(
      title,
      client,
      date,
      category,
      videoVendorUrl,
      videoSnippetFileName,
      description,
      featured
    ) {
      if (!this.get("isAbleToCreateProject")) {
        return;
      }

      const store = this.get("store");

      const newProject = store.createRecord("project", {
        type: "project",
        title: title,
        client: client,
        date: date,
        category: category,
        videoSnippetFileName: videoSnippetFileName,
        videoVendorUrl: videoVendorUrl,
        description: description,
        featured: featured
      });

      console.log("newProject", newProject);

      // return; //TODO: remove
      const saveStatus = newProject.save();
      saveStatus
        .then(result => {
          this.setProperties({
            title: null,
            client: null,
            date: null,
            category: null,
            videoSnippetFileName: null,
            videoVendorUrl: null,
            description: null,
            featured: false,
            videoUploadStatus: null
          });
        })
        .catch(e => {
          console.log("Error while saving project", e);
        });
    },

    closeForm() {
      this.closeForm();
    }
  }
});

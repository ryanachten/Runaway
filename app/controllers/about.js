import { computed } from "@ember/object";
import { match } from "@ember/object/computed";
import Controller from "@ember/controller";

export default Controller.extend({
  fullName: "",
  emailAddress: "",
  message: "",
  messageResponse: null,

  messages: computed("model", function() {
    return this.get("model")
      .sortBy("date")
      .reverse();
  }),

  isValidEmail: match("emailAddress", /^.+@.+\..+$/),

  submitDisabled: computed("fullName", "isValidEmail", "message", function() {
    // Only return false if the all of the fields have been filled out
    // and if the email input is a valid email address pattern
    return (
      !this.get("isValidEmail") ||
      this.get("fullName") === "" ||
      this.get("message") === ""
    );
  }),

  actions: {
    createMessage(fullName, emailAddress, message) {
      const newMessage = this.get("store").createRecord("message", {
        name: fullName,
        date: new Date(),
        emailAddress: emailAddress,
        message: message
      });
      newMessage.save();

      this.set("fullName", "");
      this.set("emailAddress", "");
      this.set("message", "");

      const response = `Thanks for your interest! We'll get back to you at ${emailAddress}`;
      this.set("messageResponse", response);
    },

    deleteMessage(id) {
      this.get("store")
        .findRecord("message", id, { backgroundReload: false })
        .then(record => {
          record.destroyRecord();
        });
    }
  }
});

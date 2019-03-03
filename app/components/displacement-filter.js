import Component from "@ember/component";
import { requestFrame, cancelAnimation } from "../utilities/animation-frame";

export default Component.extend({
  classNames: ["displacementFilterWrapper"],
  baseFrequency: 0,
  maxFrequency: 0.03,
  speed: 300,
  numOctaves: 1,
  scale: 50,
  animation: null,

  didInsertElement() {
    this._super(...arguments);
    this.animate();
  },

  animate() {
    const frame = requestFrame(() => {
      this.animate();
    });
    const speed = frame / this.get("speed");
    this.set("baseFrequency", Math.sin(speed) * this.get("maxFrequency"));
    this.set("animation", frame);
  },

  willDestroyElement() {
    this._super(...arguments);
    cancelAnimation(this.get("animation"));
  }
});

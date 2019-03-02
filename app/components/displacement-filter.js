import Component from "@ember/component";
import { requestFrame, cancelAnimation } from "../utilities/animation-frame";

export default Component.extend({
  classNames: ["displacementFilterWrapper"],
  baseFrequency: 0,
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
    const speed = frame / 300;
    const maxFreq = 0.03;
    this.set("baseFrequency", Math.sin(speed) * maxFreq);
    this.set("animation", frame);
  },

  willDestroyElement() {
    this._super(...arguments);
    cancelAnimation(this.get("animation"));
  }
});

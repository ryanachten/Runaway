import Component from "@ember/component";
import { requestFrame, cancelAnimation } from "../utilities/animation-frame";

export default Component.extend({
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
    const speed = frame / 200;
    const maxFreq = 0.04;
    this.set("baseFrequency", Math.sin(speed) * maxFreq);
    this.set("animation", frame);
  },

  willDestroyElement() {
    this._super(...arguments);
    cancelAnimation(this.get("animation"));
  }
});

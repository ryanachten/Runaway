const requestFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

const cancelAnimation = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

export {requestFrame, cancelAnimation};

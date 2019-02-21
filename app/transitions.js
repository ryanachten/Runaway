export default function() {
  this.transition(
    this.toRoute("about"),
    this.use("explode", animateContainer(".about"))
  );

  this.transition(
    this.toRoute("about"),
    this.use("explode", animateContainer(".about"))
  );
}

function animateContainer(container) {
  const duration = 2000;
  return {
    pickNew: container,
    use: ["fade", { duration }]
  };
}

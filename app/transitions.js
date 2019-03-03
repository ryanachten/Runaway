export default function() {
  this.transition(
    this.toRoute("about"),
    this.use("fade", animateContainer(".about"))
  );

  this.transition(
    this.toRoute("work"),
    this.use("fade", animateContainer(".work"))
  );
}

function animateContainer(container) {
  const duration = 2000;
  return {
    pickNew: container,
    use: ["fade", { duration }]
  };
}

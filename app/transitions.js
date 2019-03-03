export default function() {
  this.transition(
    this.toRoute("index"),
    this.use("fade", animateContainer(".landing"))
  );

  this.transition(
    this.fromRoute("index"),
    this.use("fade", animateContainer(".landing"))
  );

  this.transition(
    this.toRoute("about"),
    this.use("fade", animateContainer(".about"))
  );

  this.transition(
    this.fromRoute("about"),
    this.use("fade", animateContainer(".about"))
  );

  this.transition(
    this.toRoute("work"),
    this.use("fade", animateContainer(".work"))
  );

  this.transition(
    this.fromRoute("work"),
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

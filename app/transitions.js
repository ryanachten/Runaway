export default function(){
  this.transition(
    this.toRoute('about'),
    this.use('explode',
      animateContainer('.about'),
    ),
  );

  this.transition(
    this.toRoute('contact'),
    this.use('explode',
      animateContainer('.contact'),
    ),
  );

  this.transition(
    this.toRoute('work'),
    this.use('explode',
      animateContainer('.work'),
    ),
  );
}

function animateContainer(container) {
  const duration = 2000;
  return({
    pickNew: container,
    use: ['fade', {duration}]
  });
}

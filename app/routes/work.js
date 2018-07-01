import Route from '@ember/routing/route';

export default Route.extend({
  model(){
    return [
      {
        id: "bulwagan_foundation",
        featured: true,
        title: "Philippines Festival 2017",
        client: "Bulwagan Foundation",
        date: "August, 2017",
        image: "http://via.placeholder.com/350x150",
        description: "Highlights from the Philippines Festival 2017 in Wellington"
      },
      {
        id: "fix_federation",
        featured: true,
        title: "Fix Federation Promotion",
        client: "Fix Federation",
        date: "April, 2017",
        image: "http://via.placeholder.com/350x150",
        description: "Short promo for Lower Hutt's newest bakery. Delicious!"
      },
      {
        id: "mozarts_marriage",
        featured: true,
        title: "Mozart’s Marriage of Figaro Trailer",
        client: "Hannah's Playhouse",
        date: "August, 2017",
        image: "http://via.placeholder.com/350x150",
        description: "Mozart's The Marriage of Figaro, on show now at Hannah's Playhouse in Wellington!"
      },
      {
        id: "employee_experience",
        featured: true,
        title: "Designing Great Employee Experiences",
        client: "Humankind",
        date: "March, 2017",
        image: "http://via.placeholder.com/350x150",
        description: "Need a description for this video"
      },
      {
        id: "dad_ghost",
        featured: false,
        title: "Remember When Dad Fought A Ghost",
        client: "Tropfest NZ 2017",
        date: "July, 2017",
        image: "http://via.placeholder.com/350x150",
        description: "Need a description for this video"
      },
    ]
  }
});

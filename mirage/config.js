export default function() {

  this.namespace = '/api';

  this.get('/projects', function () {
    return {
      data: [
        {
          type: "project",
          id: "bulwagan-foundation",
          attributes: {
            featured: true,
            title: "Philippines Festival 2017",
            client: "Bulwagan Foundation",
            date: "August, 2017",
            image: "http://via.placeholder.com/350x150",
            description: "Highlights from the Philippines Festival 2017 in Wellington"
          }
        },
        {
          type: "project",
          id: "fix-federation",
          attributes: {
            featured: true,
            title: "Fix Federation Promotion",
            client: "Fix Federation",
            date: "April, 2017",
            image: "http://via.placeholder.com/350x150",
            description: "Short promo for Lower Hutt's newest bakery. Delicious!"
          }
        },
        {
          type: "project",
          id: "mozarts-marriage",
          attributes: {
            featured: true,
            title: "Mozart’s Marriage of Figaro Trailer",
            client: "Hannah's Playhouse",
            date: "August, 2017",
            image: "http://via.placeholder.com/350x150",
            description: "Mozart's The Marriage of Figaro, on show now at Hannah's Playhouse in Wellington!"
          }
        },
        {
          type: "project",
          id: "employee-experience",
          attributes: {
            featured: true,
            title: "Designing Great Employee Experiences",
            client: "Humankind",
            date: "March, 2017",
            image: "http://via.placeholder.com/350x150",
            description: "Need a description for this video"
          }
        },
        {
          type: "project",
          id: "dad-ghost",
          attributes: {
            featured: false,
            title: "Remember When Dad Fought A Ghost",
            client: "Tropfest NZ 2017",
            date: "July, 2017",
            image: "http://via.placeholder.com/350x150",
            description: "Need a description for this video"
          }
        }
      ]
    }
  });
}

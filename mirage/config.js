export default function() {

  this.namespace = '/api';

  this.get('/', function () {
    return {
      data: [
        {
          type: "project",
          id: "bulwagan_foundation",
          title: "Philippines Festival 2017",
          client: "Bulwagan Foundation",
          date: "August, 2017",
          description: "Highlights from the Philippines Festival 2017 in Wellington"
        },
        {
          type: "project",
          id: "fix_federation",
          title: "Fix Federation Promotion",
          client: "Fix Federation",
          date: "April, 2017",
          description: "Short promo for Lower Hutt's newest bakery. Delicious!"
        },
        {
          type: "project",
          id: "mozarts_marriage",
          title: "Mozart’s Marriage of Figaro Trailer",
          client: "Hannah's Playhouse",
          date: "August, 2017",
          description: "Mozart's The Marriage of Figaro, on show now at Hannah's Playhouse in Wellington!"
        },
        {
          type: "project",
          id: "employee_experience",
          title: "Designing Great Employee Experiences",
          client: "Humankind",
          date: "March, 2017",
          description: "Need a description for this video"
        },
      ]
    }
  });
}

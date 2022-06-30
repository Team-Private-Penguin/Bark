const db = require("../pages/api/db");
const Promise = require('bluebird');
const { group } = require("console");

let users = [
  {
    user_id: '888111',
    zipcode: '83634',
    size: 'md',
    energy: 'hi',
    f_people: '0',
    f_dogs: '0',
    photo: 'https://cdn.shopify.com/s/files/1/0052/6198/3830/products/The-General-Poster_1100x.jpg?v=1587118245',
    name: 'Napoleon BoneBark'
  },
  {
    user_id: '888122',
    zipcode: '83642',
    size: 'lg',
    energy: 'md',
    f_people: '0',
    f_dogs: '0',
    photo: 'https://www.giveamasterpiece.com/images/funny-dog-portrait-oil-GAM2974_1000.jpg',
    name: 'Sherlock Bones'
  },
];

let groups = [
  {
    group_id: 1,
    description: 'A German Shorthair group centered around scent training',
    name: 'GSP Scent Trainers',
    admin_id: 888111
  },
  {
    group_id: 2,
    description: 'A German Shepherd group centered around home defense',
    name: 'German Shepherd Home Defense Group',
    admin_id: 888122
  }
];

let events = [
  {
    event_id: 5555,
    owner_id: 888111,
    group_id: 1,
    name: 'Scent Training 101',
    date: '2022-07-15T13:30:00.000Z',
    description: 'We will be going over the basics of scent training. We will be going over bird hunting and people finding.',
    lat: 43.4813763,
    lng: -116.3998985,
    address: '1102 E Rutherglen St, Kuna, ID 83634',
    prospective: false,
    img_url: 'https://www.mesaparks.com/home/showpublishedimage/23732/637044005290900000'
  },
  {
    event_id: 5544,
    owner_id: 888122,
    group_id: 2,
    name: 'Home Defense 101',
    date: '2022-07-31T18:30:00.000Z',
    description: 'We will be going over basic obedience skills with new members. After we will be having a potluck. Come one and come all!',
    lat: 43.5404005,
    lng: -116.32167659999999,
    address: '430 E Watertower St, Meridian, ID 83642',
    prospective: false,
    img_url: 'https://www.yourcsd.com/ImageRepository/Document?documentID=17054'
  }
];

// Promise.all(users.map((user) => {
//   db.queryAsync(`INSERT INTO barkschema.Users(
//     user_id
//     zipcode,
//     size,
//     energy,
//     f_people,
//     f_dogs,
//     photo,
//     name
//     )
//     VALUES (
//       ${user.user_id},
//       ${user.zipcode},
//       ${user.size},
//       ${user.energy},
//       ${user.f_people},
//       ${user.f_dogs},
//       ${user.photo},
//       ${user.name})`
//   )
// }))

Promise.all(groups.map((group) => {
  db.queryAsync(`INSERT INTO barkschema.Groups(
    group_id,
    description,
    name,
    admin_id
    )
    VALUES(
      ${group.group_id},
      ${group.description},
      ${group.name},
      ${group.admin_id}
    )`)
}));



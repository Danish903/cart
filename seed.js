var Product = require('./models/product');


var data = [ 
    {
        image: "http://steam.cryotank.net/wp-content/gallery/playerunknownsbattlegrounds/PlayerUnknowns-Battlegrounds-01-HD.png",
        title: "Battle Ground",
        description: "PlayerUnknown\'s Battlegrounds (PUBG) is a multiplayer online battle royale video game developed and published by Bluehole. The game is based on previous mods that were developed by Brendan \"PlayerUnknown\" Greene for other games using the 2000 film Battle Royale for inspiration, and expanded into a standalone game under Greene\'s creative direction. In the game, up to one hundred players parachute onto an island and scavenge for weapons and equipment to kill others while avoiding getting killed themselves. ",
        price: 20
    },
        {
        image: "http://cdn.akamai.steamstatic.com/steam/apps/311210/header.jpg?t=1501610978",
        title: "Call of Duty",
        description: "Throw yourself into the all-out war of Battlefield 4's multiplayer. ... Thrilling Single Player Campaign. Battlefield 4™ features an intense and character-driven single player campaign,",
        price: 10
    },
        {
        image: "http://zelda.com/breath-of-the-wild/assets/icons/BOTW-Share_icon.jpg",
        title: "Zelda",
        description: "Throw yourself into the all-out war of Battlefield 4's multiplayer. ... Thrilling Single Player Campaign. Battlefield 4™ features an intense and character-driven single player campaign,",
        price: 10
    },
        {
        image: "https://data1.origin.com/content/dam/originx/web/app/games/battlefield/battlefield-3/battlefield-3-standard-edition_pdp_3840x2160_en_WW.jpg",
        title: "Battlefiled 1",
        description: "Throw yourself into the all-out war of Battlefield 4's multiplayer. ... Thrilling Single Player Campaign. Battlefield 4™ features an intense and character-driven single player campaign,",
        price: 10
    },
        {
        image: "https://data1.origin.com/content/dam/originx/web/app/games/battlefield/battlefield-3/battlefield-3-standard-edition_pdp_3840x2160_en_WW.jpg",
        title: "Battlefiled 1",
        description: "Throw yourself into the all-out war of Battlefield 4's multiplayer. ... Thrilling Single Player Campaign. Battlefield 4™ features an intense and character-driven single player campaign,",
        price: 10
    },
        {
        image: "https://data1.origin.com/content/dam/originx/web/app/games/battlefield/battlefield-3/battlefield-3-standard-edition_pdp_3840x2160_en_WW.jpg",
        title: "Battlefiled 1",
        description: "Throw yourself into the all-out war of Battlefield 4's multiplayer. ... Thrilling Single Player Campaign. Battlefield 4™ features an intense and character-driven single player campaign,",
        price: 10
    },
];

function seedDB()  {
    Product.remove({}, function(err) {
        if(err) {
            console.log("error removing....");
        } else {
            data.forEach(function(data) {
                Product.create(data, function (err, product) {
                   if(err) {
                       console.log("error");
                   } else {
                       console.log("created");
                   }
                });
                
            });
        }
    });
}

module.exports = seedDB;
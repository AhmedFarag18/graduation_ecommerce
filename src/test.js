// import img1 from "../src/assets/images/category/appliances.png";
// import img2 from "../src/assets/images/category/laptops.png";
// import img3 from "../src/assets/images/category/mens.png";
// import img4 from "../src/assets/images/category/womens.png";
// import img5 from "../src/assets/images/category/mobiles.png";
// import img6 from "../src/assets/images/category/televisions.png";
// import img7 from "../src/assets/images/category/books.png";
// import img8 from "../src/assets/images/category/furniture.png";
// import img9 from "../src/assets/images/category/kitchen_dining.png";
// import img10 from "../src/assets/images/category/video_games.png";
// import img11 from "../src/assets/images/category/bath.png";
// import img12 from "../src/assets/images/category/cameras.png";
// import img13 from "../src/assets/images/category/sports.png";
// import img14 from "../src/assets/images/category/home_kitchen.png";
// import img15 from "../src/assets/images/category/wearables.png";
// import img16 from "../src/assets/images/category/headsets.png";

// const category = [
//     {
//         "img": img1,
//         "name": "Appliances"
//     },
//     {
//         "img": img2,
//         "name": "laptops"
//     },
//     {
//         "img": img3,
//         "name": "Men's fashion"
//     },
//     {
//         "img": img4,
//         "name": "women's fashion"
//     },
//     {
//         "img": img5,
//         "name": "mobiles"
//     },
//     {
//         "img": img6,
//         "name": "television"
//     },
//     {
//         "img": img7,
//         "name": "books"
//     },
//     {
//         "img": img8,
//         "name": "furniture"
//     },
//     {
//         "img": img9,
//         "name": "kitchen & dining"
//     },
//     {
//         "img": img10,
//         "name": "video games"
//     }
//     ,
//     {
//         "img": img11,
//         "name": "bath & bedding"
//     },
//     {
//         "img": img12,
//         "name": "cameras"
//     },
//     {
//         "img": img13,
//         "name": "sports"
//     },
//     {
//         "img": img14,
//         "name": "home & kitchen"
//     },
//     {
//         "img": img15,
//         "name": "wearables"
//     },
//     {
//         "img": img16,
//         "name": "headsets"
//     }
// ]
// const bestDeals = [
//     {
//         "id": 6,
//         "title": "Rustic Cotton Ball",
//         "price": 222,
//         "description": "The Football Is Good For Training And Recreational Purposes",
//         "images": [
//             "https://api.lorem.space/image/watch?w=640&h=480&r=6902",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=9583",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=1176"
//         ],
//         "creationAt": "2023-02-08T17:13:52.000Z",
//         "updatedAt": "2023-02-08T17:13:52.000Z",
//         "category": {
//             "id": 2,
//             "name": "Watches",
//             "image": "https://api.lorem.space/image/watch?w=640&h=480&r=1057",
//             "creationAt": "2023-02-08T17:13:52.000Z",
//             "updatedAt": "2023-02-08T20:43:54.000Z"
//         }
//     },
//     {
//         "id": 7,
//         "title": "Modern Steel Bacon",
//         "price": 426,
//         "description": "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
//         "images": [
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=8817",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=4888",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=6715"
//         ],
//         "creationAt": "2023-02-08T17:13:52.000Z",
//         "updatedAt": "2023-02-08T17:13:52.000Z",
//         "category": {
//             "id": 3,
//             "name": "Furniture",
//             "image": "https://api.lorem.space/image/furniture?w=640&h=480&r=2114",
//             "creationAt": "2023-02-08T17:13:52.000Z",
//             "updatedAt": "2023-02-08T17:13:52.000Z"
//         }
//     },
//     {
//         "id": 8,
//         "title": "Recycled Bronze Sausages",
//         "price": 476,
//         "description": "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
//         "images": [
//             "https://api.lorem.space/image/watch?w=640&h=480&r=3845",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=8784",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=189"
//         ],
//         "creationAt": "2023-02-08T17:13:52.000Z",
//         "updatedAt": "2023-02-08T17:13:52.000Z",
//         "category": {
//             "id": 2,
//             "name": "Watches",
//             "image": "https://api.lorem.space/image/watch?w=640&h=480&r=1057",
//             "creationAt": "2023-02-08T17:13:52.000Z",
//             "updatedAt": "2023-02-08T20:43:54.000Z"
//         }
//     },
//     {
//         "id": 9,
//         "title": "Refined Concrete Tuna",
//         "price": 608,
//         "description": "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
//         "images": [
//             "https://api.lorem.space/image?w=640&h=480&r=9052",
//             "https://api.lorem.space/image?w=640&h=480&r=8192",
//             "https://api.lorem.space/image?w=640&h=480&r=2037"
//         ],
//         "creationAt": "2023-02-08T17:13:52.000Z",
//         "updatedAt": "2023-02-08T17:13:52.000Z",
//         "category": {
//             "id": 5,
//             "name": "Others",
//             "image": "https://api.lorem.space/image?w=640&h=480&r=193",
//             "creationAt": "2023-02-08T17:13:52.000Z",
//             "updatedAt": "2023-02-08T17:13:52.000Z"
//         }
//     },
//     {
//         "id": 10,
//         "title": "Awesome Fresh Sausages",
//         "price": 221,
//         "description": "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
//         "images": [
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=5290",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=8492",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=8326"
//         ],
//         "creationAt": "2023-02-08T17:13:52.000Z",
//         "updatedAt": "2023-02-08T17:13:52.000Z",
//         "category": {
//             "id": 3,
//             "name": "Furniture",
//             "image": "https://api.lorem.space/image/furniture?w=640&h=480&r=2114",
//             "creationAt": "2023-02-08T17:13:52.000Z",
//             "updatedAt": "2023-02-08T17:13:52.000Z"
//         }
//     },
//     {
//         "id": 11,
//         "title": "Refined Steel Shirt",
//         "price": 758,
//         "description": "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
//         "images": [
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=1437",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=1817",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=6467"
//         ],
//         "creationAt": "2023-02-08T17:13:52.000Z",
//         "updatedAt": "2023-02-08T17:13:52.000Z",
//         "category": {
//             "id": 4,
//             "name": "Shoes",
//             "image": "https://api.lorem.space/image/shoes?w=640&h=480&r=1959",
//             "creationAt": "2023-02-08T17:13:52.000Z",
//             "updatedAt": "2023-02-08T17:13:52.000Z"
//         }
//     },
//     {
//         "id": 12,
//         "title": "Bespoke Metal Mouse",
//         "price": 72,
//         "description": "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
//         "images": [
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=1489",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=3473",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=2438"
//         ],
//         "creationAt": "2023-02-08T17:13:52.000Z",
//         "updatedAt": "2023-02-08T17:13:52.000Z",
//         "category": {
//             "id": 4,
//             "name": "Shoes",
//             "image": "https://api.lorem.space/image/shoes?w=640&h=480&r=1959",
//             "creationAt": "2023-02-08T17:13:52.000Z",
//             "updatedAt": "2023-02-08T17:13:52.000Z"
//         }
//     },
//     {
//         "id": 13,
//         "title": "Small Concrete Tuna",
//         "price": 807,
//         "description": "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
//         "images": [
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=9982",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=580",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=3058"
//         ],
//         "creationAt": "2023-02-08T17:13:52.000Z",
//         "updatedAt": "2023-02-08T17:13:52.000Z",
//         "category": {
//             "id": 1,
//             "name": "Fashion",
//             "image": "https://api.lorem.space/image/fashion?w=640&h=480&r=2189",
//             "creationAt": "2023-02-08T17:13:52.000Z",
//             "updatedAt": "2023-02-08T20:44:07.000Z"
//         }
//     },
//     {
//         "id": 14,
//         "title": "Handcrafted Steel Car",
//         "price": 269,
//         "description": "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
//         "images": [
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=6792",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=4608",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=2989"
//         ],
//         "creationAt": "2023-02-08T17:13:52.000Z",
//         "updatedAt": "2023-02-08T17:13:52.000Z",
//         "category": {
//             "id": 3,
//             "name": "Furniture",
//             "image": "https://api.lorem.space/image/furniture?w=640&h=480&r=2114",
//             "creationAt": "2023-02-08T17:13:52.000Z",
//             "updatedAt": "2023-02-08T17:13:52.000Z"
//         }
//     },
//     {
//         "id": 15,
//         "title": "Luxurious Plastic Keyboard",
//         "price": 722,
//         "description": "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
//         "images": [
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=388",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=8012",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=7158"
//         ],
//         "creationAt": "2023-02-08T17:13:52.000Z",
//         "updatedAt": "2023-02-08T17:13:52.000Z",
//         "category": {
//             "id": 4,
//             "name": "Shoes",
//             "image": "https://api.lorem.space/image/shoes?w=640&h=480&r=1959",
//             "creationAt": "2023-02-08T17:13:52.000Z",
//             "updatedAt": "2023-02-08T17:13:52.000Z"
//         }
//     },
// ]
// export { category, bestDeals };
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
const port = 3000;

const foodData = {
  action: ["Spicy Wings", "Loaded Nachos", "Cheeseburger", "Fries"],
  adventure: ["Indian Curry", "Pad Thai", "Ethiopian Stew"],
  animation: ["Gummy Bears", "Cupcakes", "Cereal", "Pizza", "Mac & Cheese"],
  comedy: ["Nachos & Guac", "Buffalo Bites", "Fries", "Blooming Onion"],
  crime: ["Steak & Butter", "Pasta Alfredo", "Coffee", "Dark Beer"],
  documentary: ["Yogurt & Berries", "Salmon & Veggies", "Lentil Soup & Bread"],
  drama: ["French Stew", "Sushi Roll", "Lasagna", "Tomato Soup"],
  fantasy: ["Pho Noodle Soup", "Baklava Pastry", "Empanadas"],
  horror: ["Spicy Chicken", "Spicy Kimchi Rice"],
  mystery: ["Cheese Board & Fruit", "Chocolate Cake"],
  romance: [
    "Salad & Goat Cheese",
    "Scallops & Rice",
    "Chocolate Strawberries",
    "Oysters",
  ],
  "sci-fi": ["Olive Spheres", "Space Ice Cream"],
  thriller: ["Beef Stew", "Grilled Chicken", "Popcorn"],
  western: ["BBQ Sandwich", "Steak & Potato", "Beef Enchiladas"],
  biography: ["Chicken Pot Pie", "Apple Pie", "Roast Chicken", "Mashed Potatoes"],
  adult: ["Spicy Calamari", "Steak Diane", "Lobster Tail", "Chocolate Martini"],
  family: ["Spaghetti & Meatballs", "Chicken Nuggets", "Mac & Cheese", "Pizza"],
  "film-noir": ["Cigarette (candy)", "Black Coffee", "Club Sandwich", "Whiskey"],
  "game-show": ["Snack Mix", "Candy Bars", "Popcorn", "Cupcakes (Mini)"],
  history: ["Shepherd's Pie (UK)", "Fish & Chips (UK)", "Jambalaya (US South)", "Pho (Vietnam)"],
  musical: ["Popcorn", "Candy (wrapped)", "Pretzels", "Drinks (colorful)"],
  news: ["Coffee", "Toast", "Yogurt", "Granola Bar"],
  "reality-tv": ["Fast Food (Generic)", "Pizza", "Burgers", "Snacks (Variety Pack)"],
  short: ["Cookies", "Brownies", "Chips", "Fruit"],
  sport: ["Hot Dogs", "Nachos", "Popcorn", "Pretzels (Salty)"],
  "talk-show": ["Coffee", "Cheese & Crackers", "Cookies", "Fruit Plate"],
  war: ["Army Stew", "Canned Food", "Bread", "Dried Fruit"],
};

app.get("/api/food/:category", (req, res) => {
  const category = req.params.category.toLowerCase();

  if (foodData[category]) {
    res.json(foodData[category]);
  } else {
    res.status(404).send("Category not found");
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

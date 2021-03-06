const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
  title: String,
  amount: String,
});

const RatingSchema = new Schema({
  user: Schema.Types.ObjectId,
  rating: {
    type: Number,
    min: 1,
    max: 5,
  }
});

const CocktailSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  recipe: {
    type: String,
    required: true,
  },
  published: {
    type: String,
    required: true,
    default: false,
    enum: [true, false],
  },
  ingredients: [IngredientSchema],
  rating: [RatingSchema],
});

const Cocktail = mongoose.model('Cocktail', CocktailSchema);
module.exports = Cocktail;
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var bookSchema = new Schema({
  // `title` is required and of type String
  title: {
    type: String,
    required: true
  },
  author: {
      type: String,
      required: true
  },
  description: {
      type: String,
      required: false
  },
  date: {
    type: Date,
    required: false,
    default: Date.now 
},
  image: {
      type: String,
      rquired: false
  },
  link: {
    type: String,
    required: false
  },
  saved: {
      type: Boolean,
      default: true
  }
});

// This creates our model from the above schema, using mongoose's model method
var Book = mongoose.model("Book", bookSchema);

// Export the Article model
module.exports = Book;

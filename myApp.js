require('dotenv').config();
let mongoose = require('mongoose');
mongoose.connect('mongodb+srv://eslarson:Buzzie3978!@freecodecampwork.jloklv1.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

//Section 2 Create a Model   
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
})
var Person = mongoose.model("Person",personSchema);

const createAndSavePerson = (done) => {
  var johnDoe = new Person({name: "John Doe", age: 22, favoriteFoods: ["Unknown"]});
  johnDoe.save(function(err, data) {
    if(err) return console.error(err);
    done(null, data)
  });
};
var arrayOfPeople = [
  {name: "Eric Larson", age: 22, favoriteFoods: ["Chicken", "Steak"]},
  {name: "Spencer Tompkins", age: 22, favoriteFoods: ["Chick-fila", "Chipoltle"]}
]
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err,people){
    if(err) return console.error(err);
    done(null ,people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err,  found){
    if(err) return console.error(err);
    done(null, found);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, found){
    if(err) return console.error(err);
    done(null, found);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, found){
    if(err) return console.error(err);
    done(null, found);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function(err, found){
    if(err) return console.error(err);
    found.favoriteFoods.push(foodToAdd);
    found.save(function(err, data) {
      if(err) return console.error(err);
      done(null, data)
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age:ageToSet}, {new: true}, function(err, found){
    if(err) return console.error(err);
    done(null, found);
   })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function(err, target){
    if(err) return console.error(err);
    done(null, target);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, res) => {
    if(err) return console.error(err);
    done(null, res);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch}).sort({name: 1}).limit(2).select({age: 0}).exec(function(err, data){
    if(err) return console.error(err);
    done(null, data);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;

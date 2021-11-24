// how to add a single property using dot notation
let user = {}
user.name = 'Jesse'
user.handle = '@jesse'
user.location = 'Reno, NV'

// how to add multiple properties to an object when creating the object using
// object literal notation
let user = {
  name: 'Jesse',
  handle: '@jesse',
  location: 'Reno, NV',
}

// destructuring an object
//old way
let name = user.name
let handle = user.handle
let location = user.location
// new way
let { name, handle, location } = user
// renaming variables from property names
let { name: first_name, handle: user_handle, location: user_location } = user

// destructure a list
let csv = '1997, Ford, F350, Must Sell!'
let [year, make, model, description] = csv.split(',')

// shorthand properties
function formatMessage(name, id, avatar) {
  return {
    name: name,
    id: id,
    avatar: avatar,
    timestamp: Date.now(),
    save: function () {
      // save message
    },
  }
}
// if the key is the same as the value, you can omit the key
// you can also remove the function keyword from methods
function formatMessage(name, id, avatar) {
  return {
    name,
    id,
    avatar,
    timestamp: Date.now(),
    save() {
      //save message
    },
  }
}

// Computed Property names
function objectify(key, value) {
  let obj = {}
  obj[key] = value
  return obj
}

objectify('name', 'Jesse') // { name: 'Jesse' }

// this can now be
function objectify(key, value) {
  return {
    [key]: value,
  }
}

objectify('name', 'Jesse')

// it will return:
{
  name: 'Jesse'
}

// String concatenation is hard. Take this code for example.

function makeGreeting(name, email, id) {
  return (
    'Hello, ' +
    name +
    ". We've emailed you at " +
    email +
    '. Your user id is "' +
    id +
    '".'
  )
}

// So using Template Literals, we can take the confusing makeGreeting function above and simplify it to look like this.

function makeGreeting(name, email, id) {
  return `Hello, ${name}. We've emailed you at ${email}. Your user id is "${id}".`
}

// Now instead of having a makeGreeting function, say we wanted a makeGreetingTemplate function that returned us an HTML string that we could throw into the DOM. Without template strings, we'd have something like this.

function makeGreetingTemplate(name, email, id) {
  return (
    '<div>' +
    '<h1>Hello, ' +
    name +
    '.</h1>' +
    "<p>We've emailed you at " +
    email +
    '. ' +
    'Your user id is "' +
    id +
    '".</p>' +
    '</div>'
  )
}

// Perfect, except for the fact that not only is it terribly hard to write, it's even harder to read. What's nice about ES6's Template Strings is they also support multi-line strings. That means, using Template Strings, we can rewrite makeGreetingTemplate to look like this.

function makeGreetingTemplate(name, email, id) {
  return `
    <div>
      <h1>Hello, ${name}</h1>
      <p>
        We've emailed you at ${email}.
        Your user id is "${id}".
      </p>
    </div>
  `
}

//Arrow Functions
//Here we have a very basic function declaration and a function expression.

// fn declaration
function add(x, y) {
  return x + y
}

// fn expression
var add = function (x, y) {
  return x + y
}

// Now, if we wanted to change that function expression to an arrow function, we'd do it like this.

var add = function (x, y) {
  return x + y
}

var add = (x, y) => {
  return x + y
}

// Example
users.map(function () {})
users.map(() => {})

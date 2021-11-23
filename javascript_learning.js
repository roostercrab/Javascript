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

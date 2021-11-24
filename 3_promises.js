// Promises
// Promises are used to set aside code so that it can run with dependencies on another
// system, such as waiting for them to deliver data, run a function, update a thing, etc...

// When a Promise is created, the running program will create a "ticket" of sorts
// that will either resolve ("fulfilled") or fail ("rejected") depending on the
// other system. While they are waiting to get into one of those states, the Promise
// is in the "pending" state

// The 2 primary methods on a Promise are (resolve, reject)
// we don't call them directly, they are methods that change the status on
// the Promise object

// "fulfilled" status happens when the resolve function is invoked
// by running the "then" method.
// Whatever function you pass to ".then" is going to get invoked as well

// "rejected" status happens when the reject function is invoked
// by running the "catch" method.
// Whatever function you pass to "catch" is going to get invoked as well

// It must be put in a queue somewhere while it is pending, and then when
// the status changes it is put back into the event loop

// To create a Promise object
const promise = new Promise()

// The Promise constructor function takes in a single argument, a (callback) function. This function is going to be passed two arguments, resolve and reject.

// resolve - a function that allows you to change the status of the promise to fulfilled

// reject - a function that allows you to change the status of the promise to rejected.

// In the code below, we use setTimeout to wait 2 seconds and then invoke resolve. This will change the status of the promise to fulfilled.

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve() // Change status to 'fulfilled'
  }, 2000)
})

// When you create a new Promise, you're really just creating a plain old JavaScript object. This object can invoke two methods, then, and catch. Here's the key.
// When the status of the promise changes to fulfilled, the function that was passed to.then will get invoked.When the status of a promise changes to rejected, the function that was passed to.catch will be invoked.What this means is that once you create a promise, you'll pass the function you want to run if the async request is successful to .then. You'll pass the function you want to run if the async request fails to.catch.

// Let's take a look at an example. We'll use setTimeout again to change the status of the promise to fulfilled after two seconds (2000 milliseconds).

function onSuccess() {
  console.log('Success!')
}

function onError() {
  console.log('💩')
}

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve()
  }, 2000)
})

promise.then(onSuccess)
promise.catch(onError)

// If you run the code above you'll notice that roughly 2 seconds later, you'll see "Success!" in the console.
// Again the reason this happens is because of two things.
// First, when we created the promise, we invoked resolve after ~2000 milliseconds - this changed the status of the promise to fulfilled.
// Second, we passed the onSuccess function to the promise's .then method.
// By doing that we told the promise to invoke onSuccess when the status of the promise changed to fulfilled which it did after ~2000 milliseconds.

// Now let's pretend something bad happened and we wanted to change the status of the promise to rejected.
// Instead of calling resolve, we would call reject.

function onSuccess() {
  console.log('Success!')
}

function onError() {
  console.log('💩')
}

var promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve()
  }, 2000)
})

// OR

var promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject()
  }, 2000)
})

promise.then(onSuccess)
promise.catch(onError)

// Now this time instead of the onSuccess function being invoked, the onError function will be invoked since we called reject.

// It's weird because you don't put the success or failure case inside the Promise
// when it is created, you call them after? And WHY do you call them separately?
// Maybe it's because you can invoke this promise at any time, and multiple times
// He's creating different invocations of that promise, they could be chained together
// In the video he had to change the constructor function to var so he could run
// it multiple times...wtf

// Longer example
import $ from 'jquery'

function showError(e) {
  console.warn('Error', e)
}

function updateUI(info) {
  $('#app').text(JSON.stringify(info))
}

function getLocationURL([city, state]) {
  return `https://api.openweathermap.org/data/2.5/forecast?q=${city},${state}&APPID=7c748e66ec4489f390a888a83eb4a0f4`
}

function getUser(id) {
  return new Promise((resolve, reject) => {
    $.getJSON({
      url: `https://api.github.com/users/${id}`,
      success: resolve,
      error: reject,
    })
  })
}

function getWeather(user) {
  return new Promise((resolve, reject) => {
    $.getJSON({
      url: getLocationURL(user.location.split(',')),
      success: (weather) => resolve({ user, weather: weather.city }),
      error: reject,
    })
  })
}

$('#btn').on('click', () => {
  getUser('tylermcginnis')
    .then(getWeather)
    .then((data) => {
      updateUI(data)
    })
    .catch(showError)
})

// Chaining
// Both .then and .catch will return a new promise. That seems like a small detail but it's important because it means that promises can be chained.

// In the example below, we call getPromise which returns us a promise that will resolve in at least 2000 milliseconds.
// From there, because .then will return a promise, we can continue to chain our .thens together until we throw a new Error which is caught by the .catch method.

function getPromise() {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000)
  })
}

function logA() {
  console.log('A')
}

function logB() {
  console.log('B')
}

function logCAndThrow() {
  console.log('C')

  throw new Error()
}

function catchError() {
  console.log('Error!')
}

getPromise()
  .then(logA) // A
  .then(logB) // B
  .then(logCAndThrow) // C
  .catch(catchError) // Error!

// Cool, but why is this so important? Remember back in the callback section we talked about one of the downfalls of callbacks being that they force you out of your natural, sequential way of thinking.
// When you chain promises together, it doesn't force you out of that natural way of thinking because chained promises are sequential. getPromise runs then logA runs then logB runs then....

// Just so you can see one more example, here's a common use case when you use the fetch API.
// fetch will return you a promise that will resolve with the HTTP response.
//To get the actual JSON, you'll need to call .json. Because of chaining, we can think about this in a sequential manner.

fetch('/api/user.json')
  .then((response) => response.json())
  .then((user) => {
    // user is now ready to go.
  })

// Now that we know about chaining, let's refactor our getUser/getWeather code from earlier to use it.

function getUser(id) {
  return new Promise((resolve, reject) => {
    $.getJSON({
      url: `https://api.github.com/users/${id}`,
      success: resolve,
      error: reject,
    })
  })
}

function getWeather(user) {
  return new Promise((resolve, reject) => {
    $.getJSON({
      url: getLocationURL(user.location.split(',')),
      success: resolve,
      error: reject,
    })
  })
}

$('#btn').on('click', () => {
  getUser('tylermcginnis')
    .then(getWeather)
    .then((weather) => {
      // We need both the user and the weather here.
      // Right now we just have the weather
      updateUI() // ????
    })
    .catch(showError)
})

// It looks much better, but now we're running into an issue. Can you spot it? In the second .then we want to call updateUI. The problem is we need to pass updateUI both the user and the weather. Currently, how we have it set up, we're only receiving the weather, not the user. Somehow we need to figure out a way to make it so the promise that getWeather returns is resolved with both the user and the weather.

// Here's the key. resolve is just a function. Any arguments you pass to it will be passed along to the function given to .then. What that means is that inside of getWeather, if we invoke resolve ourself, we can pass to it weather and user. Then, the second .then method in our chain will receive both user and weather as an argument.

function getWeather(user) {
  return new Promise((resolve, reject) => {
    $.getJSON({
      url: getLocationURL(user.location.split(',')),
      success(weather) {
        resolve({ user, weather: weather.query.results })
      },
      error: reject,
    })
  })
}

$('#btn').on('click', () => {
  getUser('tylermcginnis')
    .then(getWeather)
    .then((data) => {
      // Now, data is an object with a
      // "weather" property and a "user" property.

      updateUI(data)
    })
    .catch(showError)
})

// You can play around with the final code here
// https://codesandbox.io/s/9lkl75vqxw

// It's in our click handler where you really see the power of promises shine compared to callbacks.

// Callbacks 🚫
getUser(
  'tylermcginnis',
  (user) => {
    getWeather(
      user,
      (weather) => {
        updateUI({
          user,
          weather: weather.query.results,
        })
      },
      showError
    )
  },
  showError
)

// Promises ✅
getUser('tylermcginnis')
  .then(getWeather)
  .then((data) => updateUI(data))
  .catch(showError)

// Following that logic feels natural because it's how we're used to thinking, sequentially. getUser then getWeather then update the UI with the data.

// Now it's clear that promises drastically increase the readability of our asynchronous code, but is there a way we can make it even better? Assume that you were on the TC39 committee and you had all the power to add new features to the JavaScript language. What steps, if any, would you take to improve this code?

$('#btn').on('click', () => {
  getUser('tylermcginnis')
    .then(getWeather)
    .then((data) => updateUI(data))
    .catch(showError)
})

// As we've discussed, the code reads pretty nicely. Just as our brains work, it's in a sequential order. One issue that we did run into was that we needed to thread the data (users) from the first async request all the way through to the last .then.
// This wasn't a big deal, but it made us change up our getWeather function to also pass along users. What if we just wrote our asynchronous code the same way which we write our synchronous code? If we did, that problem would go away entirely and it would still read sequentially. Here's an idea.

$('#btn').on('click', () => {
  const user = getUser('tylermcginnis')
  const weather = getWeather(user)

  updateUI({
    user,
    weather,
  })
})

// Well, that would be nice. Our asynchronous code looks exactly like our synchronous code.
// There's no extra steps our brain needs to take because we're already very familiar with this way of thinking.
// Sadly, this obviously won't work. As you know, if we were to run the code above, user and weather would both just be promises since that's what getUser and getWeather return.
// But remember, we're on TC39. We have all the power to add any feature to the language we want. As is, this code would be really tricky to make work. We'd have to somehow teach the JavaScript engine to know the difference between asynchronous function invocations and regular, synchronous function invocations on the fly.
//Let's add a few keywords to our code to make it easier on the engine.

// First, let's add a keyword to the main function itself. This could clue the engine to the fact that inside of this function, we're going to have some asynchronous function invocations. Let's use async for this.

$('#btn').on('click', async () => {
  const user = getUser('tylermcginnis')
  const weather = getWeather(user)

  updateUI({
    user,
    weather,
  })
})

// Cool. That seems reasonable. Next let's add another keyword to let the engine know exactly when a function being invoked is asynchronous and is going to return a promise. Let's use await. As in, "Hey engine. This function is asynchronous and returns a promise. Instead of continuing on like you typically do, go ahead and 'await' the eventual value of the promise and return it before continuing". With both of our new async and await keywords in play, our new code will look like this.

$('#btn').on('click', async () => {
  const user = await getUser('tylermcginnis')
  const weather = await getWeather(user.location)

  updateUI({
    user,
    weather,
  })
})

// Pretty slick. We've invented a reasonable way to have our asynchronous code look and behave as if it were synchronous. Now the next step is to actually convince someone on TC39 that this is a good idea. Lucky for us, as you probably guessed by now, we don't need to do any convincing because this feature is already part of JavaScript and it's called Async/Await.
// Don't believe me? Here's our live code now that we've added Async/Await to it. Feel free to play around with it.
// https://codesandbox.io/s/00w10o19xn

// async functions return a promise
// Now that you've seen the benefit of Async/Await, let's discuss some smaller details that are important to know. First, anytime you add async to a function, that function is going to implicitly return a promise.

async function getPromise() {}

const promise = getPromise()

// Even though getPromise is literally empty, it'll still return a promise since it was an async function.
// If the async function returns a value, that value will also get wrapped in a promise. That means you'll have to use .then to access it.

async function add(x, y) {
  return x + y
}

add(2, 3).then((result) => {
  console.log(result) // 5
})

// await without async is bad
// If you try to use the await keyword inside of a function that isn't async, you'll get an error.

$('#btn').on('click', () => {
  const user = await getUser('tylermcginnis') // SyntaxError: await is a reserved word
  const weather = await getWeather(user.location) // SyntaxError: await is a reserved word

  updateUI({
    user,
    weather,
  })
})

// Here's how I think about it. When you add async to a function it does two things. It makes it so the function itself returns (or wraps what gets returned in) a promise and makes it so you can use await inside of it.

// Error Handling
// You may have noticed we cheated a little bit. In our original code we had a way to catch any errors using .catch. When we switched to Async/Await, we removed that code. With Async/Await, the most common approach is to wrap your code in a try/catch block to be able to catch the error.

$('#btn').on('click', async () => {
  try {
    const user = await getUser('tylermcginnis')
    const weather = await getWeather(user.location)

    updateUI({
      user,
      weather,
    })
  } catch (e) {
    showError(e)
  }
})

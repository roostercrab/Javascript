// Arrow functions provide two main benefits over regular functions. First, they're more terse. Second, they make managing the this keyword a little easier.

// What I've seen with new developers learning about Arrow Functions is that it's not really the concept itself that's difficult to grasp. Odds are you're already familiar with functions, their benefits, use cases, etc. However, for some reason, it's the actual syntax that throws your brain for a loop when you're first exposed to them. Because of that, we're going to take things slow and first just introduce how the syntax compares with typical functions you're used to.

// Here we have a very basic function declaration and a function expression.

// fn declaration
function add(x, y) {
  return x + y;
}

// fn expression
var add = function (x, y) {
  return x + y;
};

// Now, if we wanted to change that function expression to an arrow function, we'd do it like this.

var add = function (x, y) {
  return x + y;
};

var add = (x, y) => {
  return x + y;
};

// Again, the most difficult part about getting started with arrow functions is just getting used to the syntax. Once you're cool with it, move on and we'll dive deeper.

// At this point you may be wondering what all the hype is about with arrow functions. Truthfully, the example above doesn't really lend well to their strengths. What I've found is that arrow functions really thrive when you're using anonymous functions. We can warm our brain up a little more to the syntax by looking at another basic example of this is using .map.

// users.map(function () {});

// users.map(() => {});

// Alright enough with the warm up. Let's dive into it.

// Let's say we had a getTweets function that took in a user id and, after hitting a poorly designed API, returned us all of the user's Tweets with over 50 stars and retweets. Using promise chaining, that function may look something like this,

function getTweets(uid) {
  return fetch("//api.users.com/" + uid)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      return response.data;
    })
    .then(function (tweets) {
      return tweets.filter(function (tweet) {
        return tweet.stars > 50;
      });
    })
    .then(function (tweets) {
      return tweets.filter(function (tweet) {
        return tweet.rts > 50;
      });
    });
}

// Well, it works. But it's not the prettiest function in the world 🤷‍♀️. Even though this specific implementation is kind of dense, the idea is all too common. Let's take a look at how what we know about arrow functions thus far, can improve our getTweets function.

function getTweets(uid) {
  return fetch("//api.users.com/" + uid)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      return response.data;
    })
    .then((tweets) => {
      return tweets.filter((tweet) => {
        return tweet.stars > 50;
      });
    })
    .then((tweets) => {
      return tweets.filter((tweet) => {
        return tweet.rts > 50;
      });
    });
}

// OK, cool. It looks basically the same we just didn't have to type function. Beneficial, but nothing worth Tweeting about. Let's look at the next benefit of arrow functions, "implicit returns".

// With arrow functions, if your function has a "concise body" (a fancy way for saying one line function), then you can omit the "return" keyword and the value will be returned automatically (or implicitly).

// So the add example from earlier can be updated to look like this,

var add = function (x, y) {
  return x + y;
};

var add = (x, y) => x + y;

// and more importantly, the getTweets example can be update to look like this,

function getTweets(uid) {
  return fetch("//api.users.com/" + uid)
    .then((response) => response.json())
    .then((response) => response.data)
    .then((tweets) => tweets.filter((tweet) => tweet.stars > 50))
    .then((tweets) => tweets.filter((tweet) => tweet.rts > 50));
}

// Now we're talking 📈. That code is not only much easier to write, but more importantly, it's much easier to read.

// Now, one further change we can make is that if the arrow function only has one parameter, you can omit the () around it. With that in mind, getTweets now looks like this,

function getTweets(uid) {
  return fetch("//api.users.com/" + uid)
    .then((response) => response.json())
    .then((response) => response.data)
    .then((tweets) => tweets.filter((tweet) => tweet.stars > 50))
    .then((tweets) => tweets.filter((tweet) => tweet.rts > 50));
}

// Overall, I'd say that's a huge improvement in just about every category.

// The next benefit of arrow functions is how they manage the this keyword. If you're not familiar with the this keyword, check out this post - Understanding the this keyword, call, apply, and bind in JavaScript.

// Let's take a look at some typical React code.

class Popular extends React.Component {
  constructor(props) {
    super();
    this.state = {
      repos: null,
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  }
  componentDidMount() {
    this.updateLanguage("javascript");
  }
  updateLanguage(lang) {
    api.fetchPopularRepos(lang).then(function (repos) {
      this.setState(function () {
        return {
          repos: repos,
        };
      });
    });
  }
  render() {
    // Stuff
  }
}

// When the component mounts, it's making an API request (to the Github API) to fetch JavaScript's most popular repositories. When it gets the repositories, it takes them and updates the component's local state, or at least that's what we want it to do. Unfortunately, it doesn't do that. Instead, we get an error. Can you spot the bug?

// The error the code above is going to throw is "cannot read setState of undefined". Now, why that's happening is outside the scope of this post (again, read or watch Understanding the this keyword, call, apply, and bind in JavaScript if you need it) but a typical ES5 solution uses .bind and looks something like this

class Popular extends React.Component {
  constructor(props) {
    super();
    this.state = {
      repos: null,
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  }
  componentDidMount() {
    this.updateLanguage("javascript");
  }
  updateLanguage(lang) {
    api.fetchPopularRepos(lang).then(
      function (repos) {
        this.setState(function () {
          return {
            repos: repos,
          };
        });
      }.bind(this),
    );
  }
  render() {
    // Stuff
  }
}

// This is the second major benefit as to why arrow functions are great, they don't create their own context. What that means is that typically the this keyword Just Works™ without you having to worry about what context a specific function is going to be invoked in. So by using arrow functions in the updateLanguage method, we don't have to worry about this which means we don't have to call .bind anymore.

updateLanguage(lang) {
  api.fetchPopularRepos(lang)
    .then((repos) => {
      this.setState(() => {
        return {
          repos: repos
        }
      });
    });
}


//Nice to knows
//At this point, we've covered all of the "need to knows" about arrow functions. There are, however, two different "nice to knows" that I think are worth mentioning.

// Looking at the updateLanguage method again, if we wanted to implicitly return the object inside of the setState callback, how would we do that? Your first intuition would be to remove the return statement and just return an object.

api.fetchPopularRepos(lang).then((repos) => {
  this.setState(() => {
    repos: repos;
  });
});

//The problem with this, as you probably guessed, is that that syntax is the exact same as creating a function body. JavaScript can't magically tell the difference between when you want to create a function body and when you want to return an object so it'll throw an error. To fix this, we can wrap the object inside of ().

api.fetchPopularRepos(lang).then((repos) => {
  this.setState(() => ({
    repos: repos,
  }));
});

// Now, with that syntax, we can use an arrow function to implicitly return an object.

//Now I know if I don't put this, someone will mention it. As a bonus since we're using ES6, we can go ahead use ES6's shorthand property and method names feature to get rid of the repos:repos and use Arrow Function's implicit return to shorten it up a bit.

api
  .fetchPopularRepos(lang)
  .then((repos) => this.setState(() => repos));

// Next tip. Say we wanted to examine the previous state of the component inside of setState by logging it. If this was your setState function, how would you approach logging nextState?

this.setState((nextState) => ({
  repos: repos,
}));

// The obvious move would be to change your implicit return to an explicit return, create a function body, then log inside of that body.

this.setState((nextState) => {
  console.log(nextState);
  return {
    repos: repos,
  };
});

// Well, that's pretty annoying. There is a better way though and it's done using the || operator. Instead of messing with all of your code, you can do something like this

this.setState(
  (nextState) =>
    console.log(nextState) || {
      repos: repos,
    },
);

// So clever.





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
const promise = new Promise();

// The Promise constructor function takes in a single argument, a (callback) function. This function is going to be passed two arguments, resolve and reject.

// resolve - a function that allows you to change the status of the promise to fulfilled

// reject - a function that allows you to change the status of the promise to rejected.

// In the code below, we use setTimeout to wait 2 seconds and then invoke resolve. This will change the status of the promise to fulfilled.

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(); // Change status to 'fulfilled'
  }, 2000);
});

// When you create a new Promise, you're really just creating a plain old JavaScript object. This object can invoke two methods, then, and catch. Here's the key.
// When the status of the promise changes to fulfilled, the function that was passed to.then will get invoked.When the status of a promise changes to rejected, the function that was passed to.catch will be invoked.What this means is that once you create a promise, you'll pass the function you want to run if the async request is successful to .then. You'll pass the function you want to run if the async request fails to.catch.

// Let's take a look at an example. We'll use setTimeout again to change the status of the promise to fulfilled after two seconds (2000 milliseconds).

function onSuccess() {
  console.log("Success!");
}

function onError() {
  console.log("💩");
}

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve();
  }, 2000);
});

promise.then(onSuccess);
promise.catch(onError);

// If you run the code above you'll notice that roughly 2 seconds later, you'll see "Success!" in the console. Again the reason this happens is because of two things. First, when we created the promise, we invoked resolve after ~2000 milliseconds - this changed the status of the promise to fulfilled. Second, we passed the onSuccess function to the promises' .then method. By doing that we told the promise to invoke onSuccess when the status of the promise changed to fulfilled which it did after ~2000 milliseconds.

// Now let's pretend something bad happened and we wanted to change the status of the promise to rejected. Instead of calling resolve, we would call reject.

function onSuccess() {
  console.log("Success!");
}

function onError() {
  console.log("💩");
}

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject();
  }, 2000);
});

promise.then(onSuccess);
promise.catch(onError);

// Now this time instead of the onSuccess function being invoked, the onError function will be invoked since we called reject.
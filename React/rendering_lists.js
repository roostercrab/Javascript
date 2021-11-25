
Community

Course Overview
Introduction, Philosophy, and Tips
Projects (What you'll build)
State of React
React Overview
Why I Love React?
The React Ecosystem
(Bonus) Imperative vs Declarative Programming
(Bonus) Composition vs Inheritance
The Road to Hello World
An Introduction to npm
(Quiz) An Introduction to npm
Webpack: A Gentle Introduction
(Quiz) Webpack: A Gentle Introduction
(Project) First Component
JSX Tips and Gotchas for Beginners
(Quiz) JSX Tips and Gotchas for Beginners
(Bonus) React Elements vs React Components
Passing Data to Components
Introduction to Props
(Quiz) Introduction to Props
(Practice) Props
(Solution) Props
Rendering Lists
Rendering Lists in React
(Quiz) Rendering Lists in React
(Practice) Rendering Lists
(Solution) Rendering Lists
(Project) Popular Navbar
Managing State
Understanding the `this` keyword in JavaScript
(Quiz) Understanding the `this` keyword in JavaScript
Managing State in React
(Quiz) Managing State in React
(Practice) State
(Solution) State
(Project) Navbar State
Functional Components
Functional Components
(Quiz) Functional Components
(Project) Languages Nav
Validating Props with PropTypes
PropTypes
(Practice) PropTypes
(Solution) PropTypes
(Project) Language Nav PropTypes
The Component Lifecycle
The Component Lifecycle
(Quiz) The Component Lifecycle
(Project) Fetch Repos
(Project) Caching Repos
React Icons
(Project) Repositories Grid
Handling Form State
(Project) Battle Instructions
Controlled vs Uncontrolled Components
(Project) Player Input
(Project) Render PlayerInput
(Project) Player Preview
(Project) Result's Skeleton
(Project) API
(Project) Result's Data
(Project) Result's UI
Composition with children
children in React
(Project) Reusable Card Component
(Project) Profile List
(Project) Reset Players
Building Reusable Components
Default Props
(Project) Loading Component
Intermission
Check in
Code Sharing
Higher Order Components
(Quiz) Higher Order Components
(Project) Tooltip
(Project) withHover Higher Order Component
Render Props
(Quiz) Render Props
(Project) Hover Render Prop
Bypassing Props with Context
React Context
(Quiz) React Context
(Project) Theme Provider
(Project) Toggle Theme
(Project) Consume Theme
React Router v4
Introduction to React Router v4
(Quiz) Introduction to React Router v4
(Project) Adding Routes
(Project) Navbar
React Router v4 Query Strings
(Quiz) React Router v4 Query Strings
(Project) Query Strings
404 with React Router v4
(Quiz) 404 with React Router v4
(Project) 404
Better Classes with Class Fields
Class Fields
(Quiz) Class Fields
(Project) Migrating to Class Fields
Performance Gains with Code Splitting
Code Splitting with React Router v4
(Quiz) Code Splitting with React Router v4
(Project) Code Split
Production Builds with Hosting
Building React Apps for Production
(Quiz) Building React Apps for Production
(Project) Production Build
(Project) Hosting with Netlify
Bonus Time
(Bonus) React Interview Questions
(Bonus) React "AHA" Moments
Next Steps

Play Video
Eventually you come to accept that as an app developer, your primary job is to render lists. It's so fundamental, that most frameworks come with a special API to accomplish it.

Vue
<ul id="tweets">
  <li v-for="tweet in tweets">{{ tweet.text }}</li>
</ul>

Angular
<ul id="tweets">
  <li *ngFor="let tweet of tweets">{{ tweet.text }}</li>
</ul>

React
React takes a different approach. When possible, React tries to keep the API surface to a minimum. To do that, it relies heavily on features that JavaScript provides out of the box. When rendering a list, the end goal, as seen in the Vue and Angular examples above, is to create a list of <li> elements that we can then show to the UI. Can you think of anything built into JavaScript itself that would help us accomplish this? What about .map? Typically you use .map when you need to create a new array, based on a previous array. Something like this.

const tweets = [
  {
    id: 1,
    stars: 13,
    text: 'Turns out "git reset --hard HEAD^" was a terrible idea.',
  },
  { id: 2, stars: 87, text: "Tech conferences are too expensive." },
  {
    id: 3,
    stars: 51,
    text: "Clean code is subjective. Optimize for deletion.",
  },
  {
    id: 4,
    stars: 19,
    text:
      "Maybe the real benefit of open source was the friendships we made along the way?",
  },
];

const stars = tweets.map((tweet) => tweet.stars); // [13,87,51,19]

Except now instead of creating a new array of stars, we want to create a new array of <li>s. Using the same .map method, let's throw in some JSX.

<ul id="tweets">
  {tweets.map((tweet) => (
    <li>{tweet.text}</li>
  ))}
</ul>

👌 Solid. There's no new API you need to remember. If you can remember how .map works, you can remember how to create a list in React.

Caveat 💩
Unfortunately, we're not quite done yet. There's just one small addition we need to make to our code. Whenever you use .map to create a list in React, you need to make sure that you add a unique key prop to each list item.

<ul id="tweets">
  {tweets.map((tweet) => (
    <li key={tweet.id}>{tweet.text}</li>
  ))}
</ul>

It's React's job to make rendering the list as fast as possible. When you give each list item a unique key prop, it helps React know which items, if any, change throughout different renders of that component.


or discuss in the Community
Rendering Lists in React
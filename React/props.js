
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
Whenever you have a system that is reliant upon composition, it's critical that each piece of that system has an interface for accepting data from outside of itself. You can see this clearly illustrated by looking at something you're already familiar with, functions.

function getProfilePic(username) {
  return "https://photo.fb.com/" + username;
}

function getProfileLink(username) {
  return "https://www.fb.com/" + username;
}

function getAvatarInfo(username) {
  return {
    pic: getProfilePic(username),
    link: getProfileLink(username),
  };
}

getAvatarInfo("tylermcginnis");

We've seen this code before as our very soft introduction to function composition. Without the ability to pass data, in this case username, to each of our of functions, our composition would break down.

Similarly, because React relies heavily on composition, there needs to exist a way to pass data into components. This brings us to our next important React concept, props.

Props are to components what arguments are to functions.

Again, the same intuition you have about functions and passing arguments to functions can be directly applied to components and passing props to components.

There are two parts to understanding how props work. First is how to pass data into components, and second is accessing the data once it's been passed in.

Passing data to a component
This one should feel natural because you've been doing something similar ever since you learned HTML. You pass data to a React component the same way you'd set an attribute on an HTML element.

<img src='' />

<Hello name='Tyler' />

In the example above, we're passing in a name prop to the Hello component.

Accessing props
Now the next question is, how do you access the props that are being passed to a component? In a class component, you can get access to props from the props key on the component's instance (this).

class Hello extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

Each prop that is passed to a component is added as a key on this.props. If no props are passed to a component, this.props will be an empty object.

class Hello extends React.Component {
  render() {
    return (
      <h1>
        Hello, {this.props.first} {this.props.last}
      </h1>
    );
  }
}

<Hello first="Tyler" last="McGinnis" />;

It's important to note that we're not limited to what we can pass as props to components. Just like we can pass functions as arguments to other functions, we're also able to pass components (or really anything we want) as props to other components.

<Profile
  username="tylermcginnis"
  authed={true}
  logout={() => handleLogout()}
  header={<h1>👋</h1>}
/>

If you pass a prop without a value, that value will be set to true. These are equivalent.

<Profile authed={true} />

<Profile authed />


or discuss in the Community
Introduction to Props
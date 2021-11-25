
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

Functional Components
If you're using React correctly, you're going to have a lot of components that take in some data via props and output some UI - that is, components with just a render method.

class HelloWorld extends React.Component {
  render() {
    return <div>Hello {this.props.name}</div>;
  }
}

This may seem like a lot of overhead for creating such a simple component, because it is. There have been a few times now where we've mentioned how the same intuition you have about functions and function composition can be directly applied to creating React components with component composition. The disconnect, however, is that to build a component we've been using ES6 classes. What if, instead, we could use a regular ol' function? It turns out you can, but there's one caveat, that component needs to have only a render method. Again, if all your class component does is (optionally) take in some props and render some UI, you can make it a functional component instead.

function HelloWorld(props) {
  return <div>Hello {props.name}</div>;
}

❤️ Much better. Now instead of having to worry about the this keyword, your component is passed props as the first argument to the function. This is a lot cleaner and makes creating React components more natural since you're literally just making a function.

Recently React introduced Hooks, an addition to React which allows you to create functional components that can create and manage their own state. Because of this, Hooks drastically reduce the need for creating class components. However, as mentioned before, we won't use Hooks in this course. Instead, they'll have their own course fully dedicated to them that you should take once you've completed this course.


or discuss in the Community
Functional Components
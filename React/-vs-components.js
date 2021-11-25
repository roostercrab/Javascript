
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

(Bonus) React Elements vs React Components
A few months ago I had, what I thought, was a simple question that I posted to Twitter.

// Function Definition
function add (x, y) {
  return x + y
}

// Function Invocation
add(1,2)

// Component Definition
class Icon extends Component

// Component Invocation???
<Icon />

What surprised me wasn’t the joint confusion around this question, but instead was the number of inaccurate responses I received.

Instances / Instantiation

Rendering

Evaluation

Invocation

“Using it :)”

The primary reason for the confusion is that there’s an often un-talked about abstraction layer between JSX and what’s actually going on in React land. To answer this question, we need to take a deep dive into that abstraction.

Let’s start by looking at the absolute fundamentals of React. What is React? It’s a library for building user interfaces. No matter how complex React or the React ecosystem seem to be, this is React at its core — building UIs. With this in mind, we arrive at our first definition, an Element. Simply put, a React element describes what you want to see on the screen. Not so simply put, a React element is an object representation of a DOM node. Notice I used the word describe. It’s important to note that a React element isn’t actually the thing you’ll see on your screen. Instead, it’s just an object representation of it. There are a few reasons for this. The first is that JavaScript objects are lightweight — React can create and destroy these elements without too much overhead. The second reason is React can analyze the object, diff it with the previous object representation to see what changed. Then, React can update the actual DOM only where those changes occurred. This has some performance upsides to it.

In order to create our object representation of a DOM node (aka a React element), we can use React's createElement method.

const element = React.createElement(
  "div",
  { id: "login-btn" },
  "Login",
);

createElement takes in three arguments. The first is a tag name string (div, span, etc), the second is any attributes you want the element to have, the third is the contents or the children of the element, in this case, the text "Login". The createElement invocation above is going to return an object that looks like this.

{
  type: 'div',
  props: {
    children: 'Login',
    id: 'login-btn'
  }
}

When it’s rendered to the DOM (using ReactDOM.render), we’ll have a new DOM node that looks like this,

<div id='login-btn'>Login</div>

What’s interesting about learning React is that typically the first thing you’re taught are components. “Components are the building blocks of React”. Notice, however, that we started this post with elements. The reason for this is because once you understand elements, understanding components is a smooth transition. A component is a function or a Class which optionally accepts input and returns a React element.

function Button({ onLogin }) {
  return React.createElement(
    "div",
    { id: "login-btn", onClick: onLogin },
    "Login",
  );
}

By definition, we have a Button component which accepts an onLogin input and returns a React element. One thing to note is that our Button component receives an onLogin method as its prop. To pass that along to our object representation of the DOM, we pass it along as the second argument to createElement, just as we did our id attribute.

Let’s go deeper.

Up until this point we’ve only covered creating React elements with the type property of native HTML elements (span, div, etc), but you can also pass in other React components to the first argument of createElement.

const element = React.createElement(
  User,
  { name: "Tyler McGinnis" },
  null,
);

However, unlike with an HTML tag name, if React sees a class or a function as the first argument, it will then check to see what element it renders, given the corresponding props. React will continue to do this until there are no more createElement invocations which have a class or a function as their first argument. Let’s take a look at this in action.

function Button({ addFriend }) {
  return React.createElement(
    "button",
    { onClick: addFriend },
    "Add Friend",
  );
}

function User({ name, addFriend }) {
  return React.createElement(
    "div",
    null,
    React.createElement("p", null, name),
    React.createElement(Button, { addFriend }),
  );
}

Above we have two components. A Button and a User. User’s object representation of the DOM will be a div with two children, a p which wraps the user’s name and a Button component. Now, let’s swap out the createElement invocations with what they return,

function Button({ addFriend }) {
  return {
    type: "button",
    props: {
      onClick: addFriend,
      children: "Add Friend",
    },
  };
}

function User({ name, addFriend }) {
  return {
    type: "div",
    props: {
      children: [
        {
          type: "p",
          props: {
            children: name,
          },
        },
        {
          type: Button,
          props: {
            addFriend,
          },
        },
      ],
    },
  };
}

You’ll notice in the above code we have four different type properties, button, div, p, and Button. When React sees an element with a function or class type (like our type: Button above), it will then consult with that component to know which element it returns, given the corresponding props. With that in mind, at the end of this process, React has a full object representation of the DOM tree. In our example, that will look like this,

{
  type: 'div',
  props: {
    children: [
      {
        type: 'p',
        props: {
          children: 'Tyler McGinnis'
        }
      },
      {
        type: 'button',
        props: {
          onClick: addFriend,
          children: 'Add Friend'
        }
      }
    ]
  }
}

This whole process is called reconciliation in React and it’s triggered every time setState or ReactDOM.render is called.

So now let’s again take a look at our initial question that sparked this blog post,

// Function Definition
function add(x, y) {
  return x + y;
}

// Function Invocation
add(1, 2);

// Component Definition
function Icon() {}

// Component Invocation???
<Icon />;

At this point, we have all the knowledge we need to answer this question except for one crucial piece. Odds are, if you’ve been using React for any amount of time, you don’t use React.createElement to create your object representations of the DOM. Instead, you’re probably using JSX. Earlier I wrote, “The primary reason for the confusion is that there’s an often un-talked about abstraction layer between JSX and what’s actually going on in React land”. This abstraction layer is that JSX is always going to get compiled to React.createElement invocations (typically) via Babel.

Looking at our earlier example, this code

function Button({ addFriend }) {
  return React.createElement(
    "button",
    { onClick: addFriend },
    "Add Friend",
  );
}

function User({ name, addFriend }) {
  return React.createElement(
    "div",
    null,
    React.createElement("p", null, name),
    React.createElement(Button, { addFriend }),
  );
}

is the result of this JSX being compiled.

function Button({ addFriend }) {
  return <button onClick={addFriend}>Add Friend</button>;
}

function User({ name, addFriend }) {
  return (
    <div>
      <p>{name}</p>
      <Button addFriend={addFriend} />
    </div>
  );
}

So finally, what do we call it when we write out our component like this, <Icon/>? We can call it “creating an element” because after the JSX is compiled, that’s exactly what’s happening.

React.createElement(Icon, null);

All of these examples are “creating a React element”.

React.createElement(
  'div',
  { className: 'container' },
  'Hello!'
)

<div className='container'>Hello!</div>

<Hello />


or discuss in the Community
(Bonus) React Elements vs React Components
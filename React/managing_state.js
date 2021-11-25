
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

Managing State in React
There are a lot of advantages to using React. In my opinion, one of the biggest has to do with the ability of components to manage their own state. Even just the simple mental model alone has enormous benefits. With React, you don't need to keep the entire application state in your head. Instead, the surface layer of your concerns can be minimized to the state of an individual component.

In this post, there are two questions we're going to answer. First, how do you add state to a React component? Second, how do you update a React component's state?

Adding State
To add state to a class component, you'll use the constructor method. constructor is part of the ES6 class spec and isn't a React specific method.

If you're new to ES6 classes, check out this post

class Hello extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "Tyler",
    };
  }
  render() {
    return <h1>Hello, {this.state.name}</h1>;
  }
}

"Just JavaScript". There are a few things to note here. First, get in the habit of calling super(props) in the constructor. super refers to the constructor method of the class you're extending, in this case, React.Component. Again, this is just a JavaScript thing. You can't use this in a constructor until after you've called super. There are also reasons you have to pass props to super that are superfluous to this post.

Next, you add state to your class component by adding a state property on the component's instance, this. By adding state to the instance, you can now access it (via this.state) anywhere in your class.

Updating State
Now that you know how to add state to your component, the next question becomes how do you update that state?

Your first intuition might be to update the state directly.

this.state.name = "Mikenzi";

That's not a good idea. We've talked a few times how in React, your View is a function of your State. You don't need to worry about updating the DOM because React will do that for you whenever the state of your component changes. If you update the state directly yourself, React will have no idea that the component's state changed and therefore won't be able to update the UI.

Instead, React gives you a helper method you can use to update the state of your component (and re-render the UI). It's called setState and it lives on the component's instance, this. There are two forms of setState. The first, and most popular, accepts an object as its first argument that is merged with the current state.

updateName(newName) {
  this.setState({
    name: newName
  })
}

When the updateName method is invoked, React will update the name property on the component's state to be whatever newName is. Then, because the state changed, React will re-invoke the render method and get a new description of the UI based on the new state. Finally, with that new description of the UI, React will update the DOM.

Here's a full version.

class Hello extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "Tyler",
    };

    this.updateName = this.updateName.bind(this);
  }
  updateName() {
    this.setState({
      name: "Mikenzi",
    });
  }
  render() {
    return (
      <React.Fragment>
        <h1>Hello, {this.state.name}</h1>
        <button onClick={this.updateName}>Change Name</button>
      </React.Fragment>
    );
  }
}

The biggest "gotcha" when dealing with updating state has to do with the this keyword. Notice that we had to include the .bind line in our constructor.

this.updateName = this.updateName.bind(this);

Why is that? Well, without that, when a user clicks on the button, they'll get an error of

TypeError: Cannot read property 'setState' of undefined

When figuring out what the this keyword is referencing, you first need to look at where the function using the this keyword is invoked. In our example, we have no idea where updateName is being invoked because we're passing it as a prop to onClick. That means the React internals get to decide how and in which context it's invoked. To remedy this, we use .bind inside of the constructor to say "whenever updateName is invoked, always make sure it's invoked in the context of the current component."

Note that when you call setState passing in an object, that object will be merged with the current state, it won't replace it. That means if you have other properties on your state that you aren't updating, they'll remain the same.

Updating State: The Other Way
Earlier I mentioned that there are two forms of setState. The first, and most popular is passing an object to setState as you just saw. The second form of setState accepts a function as its first argument instead of an object. That function is then passed the current state and the object it returns will be merged into the new state.

addFriend(newFriend) {
  this.setState((state) => {
    return {
      friends: state.friends.concat(newFriend)
    }
  })
}

In the example above, addFriend is responsible for taking in a newFriend and adding it to state.friends.

Can you spot when you'd want to use the function setState over the object setState? The key is it depends on what changes you're making to the state. __If you're updating the current state based on the previous state (i.e., adding newFriend to the end of an existing friends array), use the function setState. For everything else, use the object setState.

The reason for this is because state updates may be asynchronous. There's a lot of work happening under the hood when you call setState, so for React to guarantee that the state value is what you'd expect it to be, they have you pass them a function that receives state rather than relying on referencing state from the component instance.


or discuss in the Community
Managing State in React
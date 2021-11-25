
Community

Course Overview
Introduction, Philosophy, and Tips
Projects (What you'll build)
But Why?
Why React Hooks?
(Quiz) Why React Hooks?
Managing State with Hooks
The useState Hook
(Quiz) The useState Hook
(Practice) Theme
(Solution) Theme
(Practice) Todos
(Solution) Todos
(Practice) Show/Hide
(Solution) Show/Hide
Adding Side Effects
(Bonus) Execution Context, Scopes, and Closures
(Quiz) (Bonus) Execution Context, Scopes, and Closures
The useEffect Hook
(Quiz) The useEffect Hook
(Practice) Character Limit
(Solution) Character Limit
(Practice) Wait Delay
(Solution) Wait Delay
(Practice) API Requests
(Solution) API Requests
Custom Hooks
Rules of Hooks
(Quiz) Rules of Hooks
Higher-order Components
(Quiz) Higher-order Components
React Render Props
(Quiz) React Render Props
Creating Custom Hooks
(Quiz) Creating Custom Hooks
(Practice) useWait
(Solution) useWait
(Practice) useWindowDimensions
(Solution) useWindowDimensions
(Practice) useFetch
(Solution) useFetch
Managing (Complex) State
The useReducer Hook
(Quiz) The useReducer Hook
(Practice) Refactor useFetch
(Solution) Refactor useFetch
New Render, Same Value
The useRef Hook
(Quiz) The useRef Hook
(Practice) Complex Form
(Solution) Complex Form
(Practice) Click Game
(Solution) Click Game
Bypassing Props
Guide to React Context
(Quiz) Guide to React Context
(Practice) LocaleContext
(Solution) LocaleContext
Performance
React.memo, useCallback, and useMemo
(Quiz) React.memo, useCallback, and useMemo
Project
(Project) Introduction
(Project) index
(Project) Battle
(Project) Card and Nav
(Project) useHover
(Project) Loading
(Project) Popular
(Project) Results
Next steps
Next Steps


Pause

Seek back 10 seconds

Seek forward 10 seconds

Mute
Remaining Time -10:03
2x
Playback Rate

Captions

auto

Picture-in-Picture

Fullscreen
Perhaps the most critical part of React is the ability for individual components to own and manage their own state. Historically (with Class components), the way we've accomplished this is by adding a state property on the component's instance (this) and updating that state with the setState method.

class Theme extends React.Component {
  state = {
    theme: "light",
  };
  toDark = () => this.setState({ theme: "dark" });
  toLight = () => this.setState({ theme: "light" });
  render() {
    const { theme } = this.state;

    return (
      <div className={theme}>
        {theme === "light" ? (
          <button onClick={this.toDark}>🔦</button>
        ) : (
          <button onClick={this.toLight}>💡</button>
        )}
      </div>
    );
  }
}

This worked fine, but with the advent of React Hooks, we no longer need to use Classes for our stateful components. Instead, we can use function components and make them stateful with the useState Hook.

useState
useState comes built-in with React and can be accessed via React.useState. It takes in a single argument, the initial value for that piece of state, and returns an array with the first item being the state value and the second item being a way to update that state.

const themeArray = React.useState('light')
const theme = themeArray[0]
const setTheme = themeArray[1]

...

theme // 'light'
setTheme('dark')
theme // 'dark'

The canonical and more precise way to write the code above is to use Array destructuring and put it all on one line. You can see that in the full example here.

function Theme() {
  const [theme, setTheme] = React.useState("light");

  const toDark = () => setTheme("dark");
  const toLight = () => setTheme("light");

  return (
    <div className={theme}>
      {theme === "light" ? (
        <button onClick={toDark}>🔦</button>
      ) : (
        <button onClick={toLight}>💡</button>
      )}
    </div>
  );
}

The Mental Model
Now that we've seen a simple example for how the useState API works, before we get into more advanced use cases, it's important to have a solid mental model for the actual functionality that it provides. Namely, useState allows you to trigger a component re-render, and it can preserve values between renders.

Trigger Re-renders
The concept here is the same as before when we'd invoke setState. Whenever you invoke the updater function that useState gives you, assuming the argument you pass in is different from the current state value, React will cause a re-render to the component, updating the UI.

Preserve Values
Typically when you invoke a function in JavaScript, unless you're utilizing closures, you expect any values defined in that function to get garbage collected once the function is finished executing and you expect each subsequent call to that function to produce its own unique values.

function foo() {
  const name = "Tyler";
  const surname = "McGinnis";
}

foo();
// name and surname are garbage collected
foo();
// name and surname are garbage collected

Because React Components are now just functions, naturally you may want to apply the same intuition to them. However, if that were the case, React wouldn't work. The whole point of React is that components are able to describe their UI based on their current state, View = fn(state). This implies that React, under the hood, has some way to preserve values between function calls to prevent them from being garbage collected once the function has finished executing. The public API for this, as you've seen, is useState.

The way I like to think about useState is it's the tool to preserve values between function calls/renders and to trigger a re-render of the component.

In a future lesson, you'll learn of another Hook (useRef) that, like useState, allows you to preserve values between renders but, unlike useState, won't trigger a re-render to the component.

setState vs useState
Right away you'll notice a few differences between the useState Hook and the traditional way we've managed state in Class components. First, there's no more instance wide API for updating all of the state of the component as there was with setState. Instead, each piece of state comes with its own updater function. Second, and this is related to the first point, there's no instance wide API for setting the initial values of all of the state properties on the component as there was with state = {}. Instead, each unique piece of state should have its own useState invocation (and therefore its own value and updater function).

Class
state = {
  loading: true,
  authed: false,
  repos: [],
};

useState
const [loading, setLoading] = React.useState(true);
const [authed, setAuthed] = React.useState(false);
const [repos, setRepos] = React.useState([]);

State Objects
Perhaps the most important distinction between setState and useState is how they handle objects. Historically, all of the state for our component would live on an object, this.state. Whenever we wanted to update that state, we'd call setState passing it an object representing the state changes we wanted to make. Any properties that existed on our state previously, that weren't included in the object passed to setState, would stay the same since React would merge the two objects to form the new state.

state = {
  loading: true,
  authed: false,
  repos: [],
};
setLoading = (loading) => {
  this.setState({
    loading,
  }); // wouldn't modify "authed" or "repos".
};

With useState, that's not the case. Unlike setState, useState won't merge the new object with the previous state. Instead, it'll replace it completely.

const [state, setState] = React.useState({
  loading: true,
  authed: false,
  repos: [],
});

const setLoading = (loading) => {
  setState({
    loading,
  }); // state.authed and state.repos are now gone.
};

This design decision makes sense in the context of what we mentioned earlier, that "each unique piece of state should have its own useState invocation (and therefore its own value and updater function)."

Of course, you can get around this by manually merging the previous state with the new state if you want, but that'll come with a performance hit.

const setLoading = (loading) => {
  setState({
    ...state,
    loading,
  });
};

If the most logical data type for your piece of state is an object, it's best to use the useReducer Hook which we'll see in an upcoming lesson.

Functional Updates
With setState, whenever you set the current state based on the previous state, it's recommended to pass a function as an argument to setState instead of an object. The reason for this is state updates may be asynchronous. There's a lot of work happening under the hood when you call setState, so for React to guarantee that the state value is up to date, they have you pass them a function that receives state rather than relying on referencing state from the component instance.

class Counter extends React.Component {
  state = { count: 0 };
  increment = () =>
    this.setState(({ count }) => ({ count: count + 1 }));
  decrement = () =>
    this.setState(({ count }) => ({ count: count - 1 }));
  render() {
    return (
      <React.Fragment>
        <button onClick={this.decrement}>-</button>
        <h1>{this.state.count}</h1>
        <button onClick={this.increment}>+</button>
      </React.Fragment>
    );
  }
}

Here, we're incrementing or decrementing count based on its previous value, so we use the function form of setState.

With useState, the same logic applies. Whenever you're setting the current state based on the previous state, you'll want to pass a function to your updater function so you get the correct, most up to date value.

function Counter() {
  const [count, setCount] = React.useState(0);

  const increment = () => setCount((count) => count + 1);
  const decrement = () => setCount((count) => count - 1);

  return (
    <React.Fragment>
      <button onClick={decrement}>-</button>
      <h1>{count}</h1>
      <button onClick={increment}>+</button>
    </React.Fragment>
  );
}

Lazy State Initialization
Here's a scenario. What if the initial value for a piece of state was the result of an expensive calculation? Something like this.

function getExpensiveCount() {
  console.log("Calculating initial count");
  return 999;
}

function Counter() {
  const [count, setCount] = React.useState(getExpensiveCount());

  const increment = () => setCount((count) => count + 1);
  const decrement = () => setCount((count) => count - 1);

  return (
    <React.Fragment>
      <button onClick={decrement}>-</button>
      <h1>{count}</h1>
      <button onClick={increment}>+</button>
    </React.Fragment>
  );
}

If you play around with that code, you'll notice that, even though React only uses the value calculated from getExpensiveCount on the initial render, anytime the component re-renders, the "expensive" getExpensiveCount is being invoked. That's not ideal at all. We only want to calculate the initial state once, not on every render. Luckily for us, React gives us an escape hatch for this scenario.

If the initial value for a piece of state is the result of an expensive calculation, you can pass useState a function that when invoked, will resolve to the initial state. When useState sees that it received a function as its initial state argument, it'll only invoke it once on the initial render.

function getExpensiveCount () {
  console.log('Calculating initial count')
  return 999
}

function Counter() {
  const [count, setCount] = React.useState(() => getExpensiveCount())

  const increment = () => setCount((count) => count + 1)
  const decrement = () => setCount((count) => count - 1)

  return (
    <React.Fragment>
      <button onClick={decrement}>-</button>
      <h1>{count}</h1>
      <button onClick={increment}>+</button>
    </React.Fragment>
  );
}

If you're confused by the difference between the last two examples, note that the key lies in what we pass to useState. In the first example, we pass useState a function invocation. In the second, we pass it a function definition. What that means is that, from useState's perspective, in the first example, it receives 999 since that's what getExpensiveCount returns. In the second, it receives a function that it needs to invoke to get the initial value.

Now that you know the API and mental model behind the useState Hook, the next Hook we're going to dive into is useEffect which will allow us to replace our lifecycle methods.


or discuss in the Community
The useState Hook
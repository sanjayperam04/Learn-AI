# React Study Notes

## Introduction to React
React is a JavaScript library for building user interfaces. It was developed by Facebook and is now maintained by Meta and a community of developers.

### Key Concepts

#### Components
Components are the building blocks of React applications. They are reusable pieces of UI that can be composed together.

**Types of Components:**
- Functional Components: Simple JavaScript functions that return JSX
- Class Components: ES6 classes that extend React.Component

#### JSX
JSX (JavaScript XML) is a syntax extension that allows you to write HTML-like code in JavaScript. It makes React code more readable and expressive.

Example:
```jsx
const element = <h1>Hello, World!</h1>
```

#### Props
Props (properties) are how data is passed from parent to child components. They are read-only and cannot be modified by the child component.

#### State
State is data that changes over time. When state changes, React re-renders the component to reflect the new data.

#### Hooks
Hooks are functions that let you use state and other React features in functional components.

**Common Hooks:**
- useState: Manage component state
- useEffect: Handle side effects
- useContext: Access context values
- useRef: Reference DOM elements

### Virtual DOM
React uses a virtual DOM to optimize rendering. Instead of updating the real DOM directly, React:
1. Creates a virtual representation of the UI
2. Compares it with the previous version
3. Updates only the parts that changed

This makes React applications fast and efficient.

## Advanced Topics

### Context API
Context provides a way to pass data through the component tree without having to pass props manually at every level.

### React Router
React Router is a library for handling navigation in React applications. It allows you to create single-page applications with multiple views.

### Performance Optimization
- Use React.memo for component memoization
- Implement shouldComponentUpdate in class components
- Use useMemo and useCallback hooks
- Code splitting with React.lazy and Suspense

### Testing
- Jest: JavaScript testing framework
- React Testing Library: Test React components
- Enzyme: Alternative testing utility

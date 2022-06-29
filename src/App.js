import React from 'react';
import './App.css';

const App = (props) => {
	const [counter, setCounter] = React.useState(0);

	return (
		<div className="App">
			<h1>Counter For React</h1>
			<h1>{counter}</h1>
			<div>
				<button onClick={() => setCounter(count => count + 1)}>+</button>
				<button onClick={() => setCounter(count => Math.max(count - 1, 0))}>-</button>
			</div>
		</div>
	)
}

export default App;
import React, { useCallback } from 'react';

import SplitScreen from './components/SplitScreen';
import Speed from './components/Speed';
import Algorithm from './components/Algorithm';
import Size from './components/Size';
import { Start, Stop } from './components/Buttons';

import { ALGORITHMS, generateRandomArray } from './skethcing/utils';
// import ArrayMember from './skethcing/ArrayMember';
import { selectionSort } from './skethcing/algorithms';

import initialSketch from './components/sketch';
import testSketch from './components/testSketch';

import './App.css';
import { ReactP5Wrapper } from 'react-p5-wrapper';
// import Sketch from 'react-p5/@types';


const App = (props) => {
	const [state, setState] = React.useState({
		size: 100,
		height: 400,
		width: 800,
		
		algorithm: ALGORITHMS.MERGESORT,
		
		unsorted: [],
		sorted: [],

		animations: [],
		speed: 15,
		status: 'RUNNING',
		unmounted: true
		// sketchNo: 1
	});

	// const [sketch, setSketch] = React.useState(() => initialSketch)
	
	// const speed = React.useRef();
	// const status = React.useRef();
	// const canvas = React.useRef();

	// const sketch = useCallback(initialSketch, [state.size]);

	const sizeRef = React.useRef();
	const algorithmRef = React.useRef();

	const handleSubmit = e => {
		e.preventDefault();
		if (sizeRef && sizeRef.current && algorithmRef && algorithmRef.current) {			
			console.log('size', sizeRef.current.value);
			console.log('algorithm', algorithmRef.current.value);
			setState({
				...state,
				algorithm: algorithmRef.current.value,
				size: Number( sizeRef.current.value ),
				unmounted: true
			});			
		}
	}

	console.log('state', state);

	const handleStart = () => {
		setState({...state, unmounted: false })
	}

	const handleStop = () => {
		setState({...state, unmounted: true })
	}

	const options = Object
		.entries(ALGORITHMS)
		.map( ([key, value]) => ({ key, value }) )

	React.useEffect(() => {
		// initially, do these things
		// const bars = arr.map((item, idx) => new ArrayMember(idx, item, 8, 4));
		const unsorted = generateRandomArray(state.size);
		const sorted = [...unsorted];

		const anim = [];

		selectionSort(sorted, state.size, anim);

		setState({
			...state,
			unsorted,
			sorted,
			animations: anim
		});

	}, [state.size, state.unmounted]);

	// console.log('Animations', state.animations);
	// console.log('Speed ref', speed.current);
	
	return (
		<div className="App">			
			<SplitScreen leftWeight={1} rightWeight={3}>
				<div className='ControlsContainer'>
					<div>
						<label>Speed</label>
						<Speed 
							onChange={ ({target}) => setState({...state, speed: target.value}) } 
							value={state.speed} />
					</div>
					<form onSubmit={handleSubmit}>
						<div>
							<label>Size</label>
							<Size 
								defaultValue={state.size}
								customRef={sizeRef}/>
						</div>
						<div>
							<label>Algorithm</label>
							<Algorithm 
								defaultValue={state.algorithm} 
								options={ options } 
								customRef={algorithmRef}/>
						</div>
						<div>
							<input
								type='submit'
								value='save'/>
						</div>
					</form>
					<div>
						<Start onClick={handleStart} />
						<Stop onClick={handleStop} />
					</div>
				</div>								
				<div className='sketch'>
					
					{
						state.unmounted
						? <h1>Click start to run the sketch</h1>						
						: <ReactP5Wrapper sketch={initialSketch} config={state}/>
					}					 					
					
				</div>
			</SplitScreen>			
		</div>
	)
}

export default App;
import React from "react";

export default function SplitScreen ({leftWeight, rightWeight, children}) {
	
	const childrenArray = React.Children.toArray(children);
	const left = childrenArray[0];
	const right = childrenArray[1];

	return (
		<div
			style={{ display: 'flex' }} 
			className='container'>
			<div
				style={{ flex: leftWeight }} 
				className='left-child'>
				{left}
			</div>
			<div
				style={{ flex: rightWeight }}  
				className='right-child'>
				{right}
			</div>
		</div>
	)
}
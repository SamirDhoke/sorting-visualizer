import React from "react";

export const Stop = ({ onClick }) => {
	const handleClick = (e) => {
		onClick();
	}

	return (
		<button onClick={handleClick}>
			Stop
		</button>
	)
}

export const Start = ({ onClick }) => {
	const handleClick = (e) => {
		onClick();
	}

	return (
		<button onClick={handleClick}>
			Start
		</button>
	)
}
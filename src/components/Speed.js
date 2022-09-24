import React from "react"

export default function Speed ({ onChange, value }) {
	return (
		<input
			type='range'
			min={1}
			max={30}
			step={1}
			value={value}
			onChange={onChange}
			className='speed-control'/>
	)
}
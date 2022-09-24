import React from "react"

export default function Size ({ defaultValue, customRef }) {
	return (
		<input
			type='range'
			id="size"
			min={2}
			max={100}
			step={1}
			defaultValue={defaultValue} 
			ref={customRef}/>
	)
}
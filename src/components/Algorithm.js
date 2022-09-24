import React from "react";

export default function Algorithm ({ options=[], defaultValue, customRef }) {
	return (
		<select id="algorithm" defaultValue={defaultValue} ref={customRef}>
			{options.map(opt => (
				<option key={opt.key} value={opt.value}>
					{ opt.value }
				</option>
			))}
		</select>
	)
}
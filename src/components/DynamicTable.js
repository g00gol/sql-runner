import { useState } from "react"
import Toolbar from "./Toolbar"

// Table component created to be dynamic
// This should allow for any amount of parsedData to be displayed
function Table({ active, data, column, handleDataChange }) {
	const [edit, setEdit] = useState(false)
	const [update, setUpdate] = useState(false)

	const handleEdit = () => {
		setEdit(edit ? false : true)
	}

	const handleInput = (e, index) => {
		const { name, value } = e.target
		console.log(e.target, index, value)
		const x = data
		console.log(x)
		x[index][name] = value
		console.log(x)
		handleDataChange(x)
		update ? setUpdate(false) : setUpdate(true)
	}

	// safeguard for undefined values
	if (!active) return <table></table>

	// dynamically maps data from .csv files
	return (
		<div>
			{/* Toolbar for editing, deleting, etc. */}
			<Toolbar dataLength={data.length} handleEdit={handleEdit} />

			<table className="block w-full max-h-96 overflow-scroll bg-white text-left">
				<thead>
					<tr>
						{/* uses map to display all columns */}
						{column.map((item, index) => (
							<th key={index} className="border bg-gray-100 p-1">{item}</th>
						))}
					</tr>
				</thead>

				<tbody>
					{/*
				-- nested map functions that
				1. maps the rows of data object onto table (given 4 rows of data, code would return 4 rows)
				2. maps each item of row into table cell (uses i as index to determine which data cell to return)
				*/}
					{
						data.map((items, index) => (
							<tr key={index} >
								{
									column.map((col, i) => {
										if (edit) {
											return (
												<td key={col} className="p-1 border whitespace-nowrap">
													<input
														value={items[Object.keys(items)[i]]}
														name={col}
														onChange={(e) => handleInput(e, index)}
													/>
												</td>
											)
										}
										return (
											<td key={col} className="p-1 border whitespace-nowrap">
												{items[Object.keys(items)[i]]}
											</td>
										)
									})
								}
							</tr>
						))
					}
				</tbody>
			</table>
		</div >
	)
}

export default Table
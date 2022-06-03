import { useState } from "react"
import Toolbar from "./Toolbar"

// Table component created to be dynamic
// This should allow for any amount of parsedData to be displayed
function Table({ active, data, column, handleDataChange }) {
	const [edit, setEdit] = useState(false)
	const [update, setUpdate] = useState(false)
	const [checkbox, setCheckbox] = useState({ checked: false, cIndex: [] })
	const [filterBy, setFilterBy] = useState("")

	// handles when editing is toggled
	const handleEdit = () => {
		setEdit(edit ? false : true)
	}

	const handleAdd = () => {
		const first = data.splice(0, data.length)
		const emptyObject = {}
		for (let i of column) {
			emptyObject[i] = " "
		}
		const added = [emptyObject].concat(first)
		handleDataChange(added)
	}

	// deletes rows from parsedData using an array with indexes of the row
	const handleDelete = () => {
		if ((checkbox.cIndex).length === 0) {
			alert("Select Row to Delete")
			return
		}

		// using for/of to get indexes stored
		var count = 0
		for (let i of checkbox.cIndex.sort((x, y) => (x - y))) {
			delete data[Object.keys(data)[i - count]]
			count++
		}
		setCheckbox({ checked: false, cIndex: [] })
		handleDataChange(data)
	}

	const handleFilter = (el) => {
		setFilterBy(el)
		console.log(el)
	}

	// handles if checkbox is checked and gets the row's index
	const handleCheckbox = (e, index) => {
		// if not checked, remove the row index from object
		if (!(e.target.checked)) {
			var array = (checkbox.cIndex).filter(el => el !== index)
			setCheckbox({ checked: false, cIndex: array })
			return
		}
		// stores row index in object
		setCheckbox({ checked: true, cIndex: [...checkbox.cIndex, index] })
	}

	// handles editing inputs
	const handleInput = (e, index) => {
		const { name, value } = e.target
		data[index][name] = value
		handleDataChange(data)
		update ? setUpdate(false) : setUpdate(true)
	}

	// safeguard for undefined values
	if (!active) return (<table></table>)

	// dynamically maps data from .csv files
	return (
		<div>
			{/* Toolbar for editing, deleting, etc. */}
			<Toolbar
				data={data}
				handleEdit={handleEdit}
				handleAdd={handleAdd}
				handleDelete={handleDelete}
				handleFilter={handleFilter}
				filterBy={filterBy}
			/>

			{/* Table */}
			<table id="table" className="block w-full max-h-96 border overflow-scroll bg-white text-left">
				<thead>
					<tr className="bg-gray-100">
						<th className="border"></th>
						{/* uses map to display all columns */}
						{column.map((item, index) => (
							<th key={index} className="border p-1">{item}</th>
						))}
					</tr>
				</thead>

				<tbody>
					{/*
				-- nested map functions that
				1. maps the rows of data object onto table (given 4 rows of data, code would return 4 rows)
				2. maps each item of row into table cell (uses i as index to determine which data cell to return)
				*/}
					{data.filter(obj => Object.values(obj).find(el => el.toLowerCase().includes(filterBy))).map((items, index) => (
						<tr key={index} >
							{edit ? (
								<td className="p-1 border">
									<input
										type="checkbox"
										onChange={(e) => handleCheckbox(e, index)}
									/>
								</td>
							) : (<td></td>)
							}
							{column.map((col, i) => {
								// editing toggled on
								// information fields are immediately updated (could be slow)
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

								// default table (editing toggled off)
								return (
									<td key={col} className="h-8 p-1 border whitespace-nowrap">
										{items[Object.keys(items)[i]]}
									</td>
								)
							})}
						</tr>
					))}
				</tbody>
			</table>
		</div >
	)
}

export default Table
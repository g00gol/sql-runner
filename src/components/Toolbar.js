import { CSVLink } from "react-csv"

export default function Toolbar({ data, handleEdit, handleAdd, handleDelete, handleFilter, filterBy }) {
	return (
		<>
			<div className="bg-gray-200">
				<CSVLink className="p-2 font-bold bg-gray-300 hover:bg-gray-400 transition-all" data={data}>Export</CSVLink>
				<button className="p-2 hover:bg-gray-400 transition-all" onClick={() => handleEdit()}>Edit</button>
				<button className="p-2 hover:bg-gray-400 transition-all" onClick={() => handleAdd()}>Add</button>
				<button className="p-2 hover:bg-gray-400 transition-all" onClick={() => handleDelete()}>Delete</button>
				<input className="m-2 px-2" type="text" placeholder="Search..." value={filterBy} onChange={(e) => handleFilter(e.target.value)} />
			</div>
		</>
	)
}
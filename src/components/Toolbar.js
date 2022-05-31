import { CSVLink } from "react-csv"

export default function Toolbar({ data, dataLength, handleEdit, handleAdd, handleDelete }) {
	return (
		<>
			<div className="bg-gray-200">
				<CSVLink className="p-2 font-bold bg-gray-300 hover:bg-gray-400 transition-all" data={data}>Export</CSVLink>
				<button className="p-2 hover:bg-gray-400 transition-all" onClick={() => handleEdit()}>Edit</button>
				<button className="p-2 hover:bg-gray-400 transition-all" onClick={() => handleAdd()}>Add</button>
				<button className="p-2 hover:bg-gray-400 transition-all" onClick={() => handleDelete()}>Delete</button>
			</div>
			<div className="bg-gray-100">
				<h1 className="px-2">Rows: {dataLength.rows}</h1>
				<h1 className="px-2">Columns: {dataLength.columns}</h1>
			</div>
		</>
	)
}
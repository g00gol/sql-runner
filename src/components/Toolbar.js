export default function Toolbar({ dataLength, handleEdit }) {
	return (
		<div className="bg-black text-white">
			<h1>Lines: {dataLength}</h1>
			<button onClick={() => handleEdit(true)}>Edit</button>
		</div>
	)
}
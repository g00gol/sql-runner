import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import Papa from "papaparse"
import Editor from "@monaco-editor/react"
import Table from "./components/DynamicTable"

// used CSV files
import shippersCSV from "./csv/shippers.csv"
import orderDetailsCSV from "./csv/order_details.csv"
import employeesCSV from "./csv/employees.csv"

function App() {
  // data parsed from .csv file
  const [parsedData, setParsedData] = useState({ value: [], header: "" }) // object
  // determines whether table should is active or not
  const [active, setActive] = useState(false) // boolean
  // sets code from value of editor
  const [code, setCode] = useState("")

  // updates data when changed in tables
  const handleDataChange = (newData) => setParsedData({ value: newData, header: parsedData.header }) // object


  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length) {
      parseThrough(acceptedFiles[0])
    }
  }, [])

  const {
    getRootProps,
    getInputProps
  } = useDropzone({
    onDrop,
    accept: "text/csv"
  })

  // function to parse through given .csv file
  function parseThrough(file) {
    Papa.parse(file, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: parsed => {
        setParsedData({ value: parsed.data, header: parsed.meta["fields"] })
      }
    })
    setActive(true)
  }

  // main function to determine what information needs to be displayed on table
  // passes data through states
  function run() {
    // determines which .csv file to parse from
    switch (code) {
      default:
        alert("Invalid input")
        setActive(false)
        return

      case "SELECT * FROM shippers":
        parseThrough(shippersCSV)
        break

      case "SELECT * FROM orderDetails":
        parseThrough(orderDetailsCSV)
        break

      case "SELECT * FROM employees":
        parseThrough(employeesCSV)
        break
    }
  }

  const defaultMsg = `-- Query from existing databases
-- DATABASES:
-- shippers
-- orderDetails
-- employees`

  return (
    <div className="w-3/4 mx-auto">
      <h1 className="text-3xl text-blue-500 my-4 font-bold">SQL Query Runner</h1>

      <div className="block mb-4 w-fit cursor-pointer" {...getRootProps()}>
        <input {...getInputProps()} />
        <button className="border rounded bg-gray-300 px-2 py-1 hover:bg-gray-500 transition-all">Upload CSV File</button>
      </div>

      <div className="inline-flex justify-center items-center">
        <div className="flex p-2 justify-center items-center border bg-blue-200 w-fit h-10">
          <p className="pr-1">Query 1</p>
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 24 24" width="14px" height="14px">
              <path d="M 19.171875 2 C 18.448125 2 17.724375 2.275625 17.171875 2.828125 L 16 4 L 20 8 L 21.171875 6.828125 C 22.275875 5.724125 22.275875 3.933125 21.171875 2.828125 C 20.619375 2.275625 19.895625 2 19.171875 2 z M 14.5 5.5 L 3 17 L 3 21 L 7 21 L 18.5 9.5 L 14.5 5.5 z" />
            </svg>
          </button>
        </div>

        <button className="flex items-center justify-center mx-2 border border-blue-500 bg-blue-500 hover:bg-gray-700 transition-all w-8 h-8 rounded-3xl text-white font-bold">
          +
        </button>
      </div>

      {/* Simple code editor from monaco */}
      <Editor
        className="border"
        onChange={(value) => { setCode(value) }}
        height="40vh"
        width="100%"
        defaultLanguage="sql"
        defaultValue={defaultMsg}
      />

      <button onClick={run} className="py-2 px-4 bg-blue-500 float-right text-white font-bold hover:bg-gray-700 transition-all">Run</button>

      {parsedData.value && parsedData.header &&
        <Table active={active} data={parsedData.value} column={parsedData.header} handleDataChange={handleDataChange} />
      }
    </div>
  )
}

export default App;

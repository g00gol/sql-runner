import { useState } from "react"
import Papa from "papaparse"
import Editor from "@monaco-editor/react"
import Table from "./components/DynamicTable"

function App() {

  // data parsed from .csv file
  const [parsedData, setParsedData] = useState([])
  const handleDataChange = (newData) => {
    setParsedData(newData)
    console.log(parsedData)
  }
  // value of table header
  const [header, setHeader] = useState([])
  // value of code in editor
  const [code, setCode] = useState("")
  // determines whether table should is active or not
  const [active, setActive] = useState(false)

  // main function to determine what information needs to be displayed on table
  // passes data through states
  function run() {
    switch (code) {
      // 
      default:
        return

      case "SELECT * FROM shippers":
        Papa.parse("https://raw.githubusercontent.com/graphql-compose/graphql-compose-examples/master/examples/northwind/data/csv/shippers.csv", {
          download: true,
          header: true,
          skipEmptyLines: true,
          complete: shippers => {
            setParsedData(shippers.data)
            setHeader(shippers.meta["fields"])
          }
        })
        setActive(true)
        break

      case "SELECT * FROM orderDetails":
        Papa.parse("https://raw.githubusercontent.com/graphql-compose/graphql-compose-examples/master/examples/northwind/data/csv/order_details.csv", {
          download: true,
          header: true,
          skipEmptyLines: true,
          complete: orderDetails => {
            setParsedData(orderDetails.data)
            setHeader(orderDetails.meta["fields"])
          }
        })
        setActive(true)
        break

      case "SELECT * FROM employees":
        Papa.parse("https://raw.githubusercontent.com/graphql-compose/graphql-compose-examples/master/examples/northwind/data/csv/employees.csv", {
          download: true,
          header: true,
          skipEmptyLines: true,
          complete: employees => {
            setParsedData(employees.data)
            setHeader(employees.meta["fields"])
          }
        })
        setActive(true)
        break

    }
  }

  return (
    <div className="bg-red-400">
      {/* Simple code editor from monaco */}
      <Editor
        onChange={(value) => { setCode(value) }}
        height="40vh"
        width="100%"
        defaultLanguage="sql"
        defaultValue="# Enter your code here"
      />
      <button onClick={run}>Run</button>

      <Table active={active} data={parsedData} column={header} handleDataChange={handleDataChange} />

    </div>
  )
}

export default App;

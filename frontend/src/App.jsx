import { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

function App() {
  const [averageValue, setAverageValue] = useState("");
  const [averageUtilization, setAverageUtilization] = useState("");
  const [result, setResult] = useState("");

  const submitCustomValues = async () => {
    try {
      const response = await axios.post("http://localhost:3001/update-hpa", {
        averageValue: parseInt(averageValue),
        averageUtilization: parseInt(averageUtilization),
      });
      setResult(response.data);
    } catch (error) {
      console.error("Error fetching custom metrics:", error);
      setResult("Error fetching custom metrics");
    }
  };

  return (
    <div className="App flex flex-col justify-center items-center gap-4 space-y-4">
      <Navbar />
      <h1 className="text-5xl pt-12 font-bold">Enter Custom Metrics</h1>
      <input
        type="number"
        value={averageValue}
        onChange={(e) => setAverageValue(e.target.value)}
        placeholder="Enter the average value"
        className="border border-gray-300 p-2 rounded-md outline-none"
      />
      <input
        type="number"
        value={averageUtilization}
        onChange={(e) => setAverageUtilization(e.target.value)}
        placeholder="Enter the average utilization"
        className="border border-gray-300 p-2 rounded-md outline-none"
      />
      <button onClick={submitCustomValues} className="bg-[#01a982] font-bold">
        Enter
      </button>
      <p className="font-semibold">{result}</p>
      <hr className="w-full" />
      <h2 className="text-5xl font-bold">Results</h2>
      {/* Results will be displayed here */}
      {/* <pre className='border-[1.6px] rounded-xl p-6 font-semibold text-xl'>Total HTTP Requests {metrics}</pre> */}
      <button className="bg-[#01a982] font-bold">Refresh Metrics</button>
    </div>
  );
}

export default App;

import { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

function App() {
  const [deploymentName, setDeploymentName] = useState("");
  const [averageValue, setAverageValue] = useState("");
  const [averageUtilization, setAverageUtilization] = useState("");
  const [memoryUtil, setMemoryUtil] = useState("");
  const [minReplicas, setMinReplicas] = useState("");
  const [maxReplicas, setMaxReplicas] = useState("");
  const [result, setResult] = useState("");

  const submitCustomValues = async () => {
    try {
      const response = await axios.post("http://localhost:3001/update-hpa", {
        deploymentName,
        minReplicas: parseInt(minReplicas),
        maxReplicas: parseInt(maxReplicas),
        memoryUtil: parseInt(memoryUtil),
        averageUtilization: parseInt(averageUtilization),
        averageValue: parseInt(averageValue),
      });
      setResult(response.data);
    } catch (error) {
      console.error("Error fetching custom metrics:", error);
      setResult("Error fetching custom metrics");
    }
  };

  return (
    <div className="App flex flex-col justify-center items-center space-y-4">
      <Navbar />
      <h1 className="text-4xl py-2 pt-16 font-bold">Create Autoscaling Policy</h1>
      <div className="flex flex-col justify-center w-full gap-3">
      <div className="flex flex-col gap-2">
      <label htmlFor="deploymentName" className="text-base">Deployment Name</label>
      <input
        type="text"
        value={deploymentName}
        name="deploymentName"
        onChange={(e) => setDeploymentName(e.target.value)}
        placeholder="Enter Deployment Name"
        className="border border-gray-300 p-2 px-4 w-full rounded-md outline-none text-sm"
        />
        </div>
      <h2 className="text-lg font-semibold text-left">Replicas</h2>
      <div className="flex flex-row gap-4 justify-center w-full">
      <div className="flex flex-col gap-2">
      <label htmlFor="minReplicas" className="text-base">Min Replicas</label>
      <input
        type="number"
        value={minReplicas}
        name="minReplicas"
        onChange={(e) => setMinReplicas(e.target.value)}
        placeholder="5"
        className="border border-gray-300 p-2 px-4 w-full rounded-md outline-none text-sm"
        />
        </div>
        <div className="flex flex-col gap-2">
      <label htmlFor="maxReplicas" className=" text-base">Max Replicas</label>
      <input
        type="number"
        value={maxReplicas}
        name="maxReplicas"
        onChange={(e) => setMaxReplicas(e.target.value)}
        placeholder="10"
        className="border border-gray-300 p-2 px-4 w-full rounded-md outline-none text-sm"
        />
        </div>
      </div>
      <h2 className="text-lg font-semibold text-left">Utilization</h2>
      <div className="flex flex-row gap-4 justify-center">
        <div className="flex flex-col gap-2">
      <label htmlFor="averageUtilization" className="text-base">CPU Utilization Target</label>
      <input
        type="number"
        value={averageUtilization}
        name="averageUtilization"
        onChange={(e) => setAverageUtilization(e.target.value)}
        placeholder="50%"
        className="border border-gray-300 p-2 px-4 w-full rounded-md outline-none text-sm"
        />
        </div>
        <div className="flex flex-col gap-2">
      <label htmlFor="memoryUtil" className="text-base">Memory Utilization Target</label>
      <input
        type="number"
        value={memoryUtil}
        name="memoryUtil"
        onChange={(e) => setMemoryUtil(e.target.value)}
        placeholder="50%"
        className="border border-gray-300 p-2 px-4 w-full rounded-md outline-none text-sm"
        />
        </div>
      </div>
      <h2 className="text-lg font-semibold text-left">Requests</h2>
      <div className="flex flex-col gap-2">
      <label htmlFor="averageValue" className="text-base">Enter HTTP Requests per second</label>
      <input
        type="number"
        value={averageValue}
        name="averageValue"
        onChange={(e) => setAverageValue(e.target.value)}
        placeholder="100"
        className="border border-gray-300 p-2 px-4 w-full rounded-md outline-none text-sm"
        />
        </div>
      <p className="font-semibold">{result}</p>
      {/* <hr className="w-full" /> */}
      {/* <h2 className="text-5xl font-bold">Results</h2> */}
      {/* Results will be displayed here */}
      {/* <pre className='border-[1.6px] rounded-xl p-6 font-semibold text-xl'>Total HTTP Requests {metrics}</pre> */}
      {/* <button className="bg-[#01a982] font-bold">Refresh Metrics</button> */}
        </div>
      <button onClick={submitCustomValues} className="bg-[#01a982] font-semibold w-full">
        Enter
      </button>
    </div>
  );
}

export default App;

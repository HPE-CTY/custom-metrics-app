const express = require("express");
const cors = require("cors");
// const bodyParser = require("body-parser");
const fs = require("fs");
const yaml = require("yaml");

const app = express();
const port = 3000;
const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/update-hpa", (req, res) => {
  const { averageValue, averageUtilization } = req.body;

  // Read the existing HPA configuration file
  fs.readFile("hpa.yaml", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error reading HPA configuration file");
    }

    let hpaConfig = yaml.parse(data);

    // Update the values
    hpaConfig.spec.metrics[0].pods.target.averageValue =
      parseInt(averageValue) + "m";
    hpaConfig.spec.metrics[1].resource.target.averageUtilization =
      parseInt(averageUtilization);
    // Convert the object back to YAML
    const newYaml = yaml.stringify(hpaConfig);

    // Write the updated YAML back to the file
    fs.writeFile("hpa.yaml", newYaml, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error writing HPA configuration file");
      }

      // Here you can also apply the updated configuration to the cluster
      // using a Kubernetes client library or `kubectl apply -f hpa.yaml`
      console.log(`Average Value: ${averageValue} Average Utilization: ${averageUtilization}`);
      res.send("HPA configuration updated successfully");
    });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
const IP = require("ip");
const dt = require("./utils/getIndexHtml");

app.get("/ip", (req, res) => {
  const ip = req.headers["x-forwarderd-for"];
  req.socket.remoteAddress;
  null;

  const parseIp = (req) => req.headers["x-forwarderd-for"]?.split(",").shift();
  const ipaddress = IP.address();
  console.log(ipaddress);
  // console.log(parseIp(ip));
});

app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  // res.sendFile(path.join(__dirname, "index.html"));
  res.send(dt.renderDynamicHtml());
});

app.get("/app.js", (req, res) => {
  res.sendFile(path.join(__dirname, "app.js"));
});

app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

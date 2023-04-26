const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const cors = require("cors");
const corsOptions = require("./config/corsOptions");

app.use(cors(corsOptions));
app.use(express.json());
// routes
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/", require("./routes/root"));
app.use("/members", require("./routes/members"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

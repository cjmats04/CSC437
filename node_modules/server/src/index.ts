import express, { Request, Response } from "express";
import { connect } from "./services/mongo";

import fs from "node:fs/promises";
import path from "path";

import auth, { authenticateUser } from "./routes/auth";
import venues from "./routes/venues";
import concerts from "./routes/concerts";
import tickets from "./routes/tickets";
import profiles from "./routes/profiles";

connect("ConcertFinder");

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));
app.use(express.json());

app.use("/app", (req: Request, res: Response) => {
  const indexHtml = path.resolve(staticDir, "index.html");
  fs.readFile(indexHtml, { encoding: "utf8" }).then((html) =>
    res.send(html)
  );
});

app.use("/auth", auth);
app.use("/api/venues", venues);
app.use("/api/concerts", concerts);
app.use("/api/tickets", tickets);
app.use("/api/profiles", profiles);

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
    
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
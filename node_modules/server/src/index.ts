// src/index.ts
import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import Venues from "./services/venue-svc";

connect("ConcertFinder");

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
    
});

app.get("/venues/:venueid", (req: Request, res: Response) => {
  const { venueid } = req.params;

  Venues.get(venueid).then((data) => {
    if (data) res
      .set("Content-Type", "application/json")
      .send(JSON.stringify(data));
    else res
      .status(404).send(`Venue ${venueid} Not Found`);
  }).catch((err) => {
    res.status(500).send(err)
    });
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
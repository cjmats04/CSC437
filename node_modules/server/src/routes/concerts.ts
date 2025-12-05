import express, { Request, Response } from "express";
import { Concert } from "../models/concert";

import Concerts from "../services/concert-svc";

const router = express.Router();

router.get("/", (_, res: Response) => {
  Concerts.index()
    .then((list: Concert[]) => res.json(list))
    .catch((err) => res.status(500).send(err));
});

router.get("/:concertid", (req: Request, res: Response) => {
  const { concertid } = req.params;

  Concerts.get(concertid)
    .then((concert: Concert) => res.json(concert))
    .catch((err) => res.status(404).send(err));
});

router.post("/", (req: Request, res: Response) => {
  const newConcert = req.body;

  Concerts.create(newConcert)
    .then((concert: Concert) => res.status(201).json(concert))
    .catch((err) => res.status(500).send(err));
});

router.put("/:concertid", (req: Request, res: Response) => {
  const { concertid } = req.params;
  const newConcert = req.body;

  Concerts.update(concertid, newConcert)
    .then((concert: Concert) => res.json(concert))
    .catch((err) => res.status(404).end());
});

router.delete("/:concertid", (req: Request, res: Response) => {
  const { concertid } = req.params;

  Concerts.remove(concertid)
    .then(() => res.status(204).end())
    .catch((err) => res.status(404).send(err));
});

export default router;

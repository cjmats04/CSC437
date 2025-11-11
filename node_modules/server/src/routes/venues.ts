import express, { Request, Response } from "express";
import { Venue } from "../models/venue";

import Venues from "../services/venue-svc";

const router = express.Router();

router.get("/", (_, res: Response) => {
  Venues.index()
    .then((list: Venue[]) => res.json(list))
    .catch((err) => res.status(500).send(err));
});

router.get("/:venueid", (req: Request, res: Response) => {
  const { venueid } = req.params;

  Venues.get(venueid)
    .then((venue: Venue) => res.json(venue))
    .catch((err) => res.status(404).send(err));
});


router.post("/", (req: Request, res: Response) => {
  const newVenue = req.body;

  Venues.create(newVenue)
    .then((venue: Venue) =>
      res.status(201).json(venue)
    )
    .catch((err) => res.status(500).send(err));
});

router.put("/:venueid", (req: Request, res: Response) => {
  const { venueid } = req.params;
  const newVenue = req.body;

  Venues.update(venueid, newVenue)
    .then((venue: Venue) => res.json(venue))
    .catch((err) => res.status(404).end());
});

router.delete("/:venueid", (req: Request, res: Response) => {
  const { venueid } = req.params;

  Venues.remove(venueid)
    .then(() => res.status(204).end())
    .catch((err) => res.status(404).send(err));
});

export default router;
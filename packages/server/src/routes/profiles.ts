import express, { Request, Response } from "express";
import { Profile } from "../models/profile";

import Profiles from "../services/profile-svc";

const router = express.Router();

router.get("/", (_, res: Response) => {
  Profiles.index()
    .then((list: Profile[]) => res.json(list))
    .catch((err) => res.status(500).send(err));
});

router.get("/:uid", (req: Request, res: Response) => {
  const { uid } = req.params;

  Profiles.get(uid)
    .then((profile: Profile) => res.json(profile))
    .catch((err) => res.status(404).send(err));
});

router.post("/", (req: Request, res: Response) => {
  const newProfile = req.body;

  Profiles.create(newProfile)
    .then((profile: Profile) => res.status(201).json(profile))
    .catch((err) => res.status(500).send(err));
});

router.put("/:uid", (req: Request, res: Response) => {
  const { uid } = req.params;
  const newProfile = req.body;

  Profiles.update(uid, newProfile)
    .then((profile: Profile) => res.json(profile))
    .catch((err) => res.status(404).end());
});

router.delete("/:uid", (req: Request, res: Response) => {
  const { uid } = req.params;

  Profiles.remove(uid)
    .then(() => res.status(204).end())
    .catch((err) => res.status(404).send(err));
});

export default router;

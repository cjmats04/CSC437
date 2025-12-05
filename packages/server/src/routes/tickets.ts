import express, { Request, Response } from "express";
import { Ticket } from "../models/ticket";

import Tickets from "../services/ticket-svc";

const router = express.Router();

router.get("/", (_, res: Response) => {
  Tickets.index()
    .then((list: Ticket[]) => res.json(list))
    .catch((err) => res.status(500).send(err));
});

router.get("/:ticketid", (req: Request, res: Response) => {
  const { ticketid } = req.params;

  Tickets.get(ticketid)
    .then((ticket: Ticket) => res.json(ticket))
    .catch((err) => res.status(404).send(err));
});

router.post("/", (req: Request, res: Response) => {
  const newTicket = req.body;

  Tickets.create(newTicket)
    .then((ticket: Ticket) => res.status(201).json(ticket))
    .catch((err) => res.status(500).send(err));
});

router.put("/:ticketid", (req: Request, res: Response) => {
  const { ticketid } = req.params;
  const newTicket = req.body;

  Tickets.update(ticketid, newTicket)
    .then((ticket: Ticket) => res.json(ticket))
    .catch((err) => res.status(404).end());
});

router.delete("/:ticketid", (req: Request, res: Response) => {
  const { ticketid } = req.params;

  Tickets.remove(ticketid)
    .then(() => res.status(204).end())
    .catch((err) => res.status(404).send(err));
});

export default router;

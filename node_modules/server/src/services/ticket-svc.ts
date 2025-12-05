import { Schema, model } from "mongoose";
import { Ticket } from "../models/ticket";

const TicketSchema = new Schema<Ticket>(
  {
    id: String,
    concertId: String,
    type: String,
    description: String,
    price: Number
  },
  { collection: "cf-tickets" }
);

const TicketModel = model<Ticket>("Ticket", TicketSchema);

function index(): Promise<Ticket[]> {
  return TicketModel.find();
}

function get(id: String): Promise<Ticket> {
  return TicketModel.find({ id })
    .then((list) => list[0])
    .catch((err) => {
      throw `${id} Not Found`;
    });
}

function create(json: Ticket): Promise<Ticket> {
  const t = new TicketModel(json);
  return t.save();
}

function update(ticketid: String, ticket: Ticket): Promise<Ticket> {
  return TicketModel.findOneAndUpdate({ id: ticketid }, ticket, {
    new: true
  }).then((updated) => {
    if (!updated) throw `${ticketid} not updated`;
    else return updated as Ticket;
  });
}

function remove(ticketid: String): Promise<void> {
  return TicketModel.findOneAndDelete({ id: ticketid }).then((deleted) => {
    if (!deleted) throw `${ticketid} not deleted`;
  });
}

export default { index, get, create, update, remove };

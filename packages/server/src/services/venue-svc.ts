// src/services/traveler-svc.ts
import { Schema, model } from "mongoose";
import { Venue } from "../models/venue";

const VenueSchema = new Schema<Venue>(
  {
    id: String,
    name: String,
    imgSrc: String,
    imgAlt: String,
    href: String,
    eventTitle: String
  },
  { collection: "cf-venues" }
);

const VenueModel = model<Venue>(
  "Venue",
  VenueSchema
);

function index(): Promise<Venue[]> {
  return VenueModel.find();
}

function get(id: String): Promise<Venue> {
  return VenueModel.find({ id })
    .then((list) => list[0])
    .catch((err) => {
      throw `${id} Not Found`;
    });
}

export default { index, get };
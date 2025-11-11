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

function create(json: Venue): Promise<Venue> {
  const v = new VenueModel(json);
  return v.save();
}

function update(
  venueid: String,
  venue: Venue
): Promise<Venue> {
  return VenueModel.findOneAndUpdate({ venueid }, venue, {
    new: true
  }).then((updated) => {
    if (!updated) throw `${venueid} not updated`;
    else return updated as Venue;
  });
}

function remove(venueid: String): Promise<void> {
  return VenueModel.findOneAndDelete({ venueid }).then(
    (deleted) => {
      if (!deleted) throw `${venueid} not deleted`;
    }
  );
}

export default { index, get, create, update, remove };
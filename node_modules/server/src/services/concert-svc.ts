import { Schema, model } from "mongoose";
import { Concert } from "../models/concert";

const ConcertSchema = new Schema<Concert>(
  {
    id: String,
    title: String,
    iconSrc: String,
    date: String,
    venueId: String,
    artist: String,
    genre: String,
    tickets: [String]
  },
  { collection: "cf-concerts" }
);

const ConcertModel = model<Concert>("Concert", ConcertSchema);

function index(): Promise<Concert[]> {
  return ConcertModel.find();
}

function get(id: String): Promise<Concert> {
  return ConcertModel.find({ id })
    .then((list) => list[0])
    .catch((err) => {
      throw `${id} Not Found`;
    });
}

function create(json: Concert): Promise<Concert> {
  const c = new ConcertModel(json);
  return c.save();
}

function update(concertid: String, concert: Concert): Promise<Concert> {
  return ConcertModel.findOneAndUpdate({ id: concertid }, concert, {
    new: true
  }).then((updated) => {
    if (!updated) throw `${concertid} not updated`;
    else return updated as Concert;
  });
}

function remove(concertid: String): Promise<void> {
  return ConcertModel.findOneAndDelete({ id: concertid }).then((deleted) => {
    if (!deleted) throw `${concertid} not deleted`;
  });
}

export default { index, get, create, update, remove };

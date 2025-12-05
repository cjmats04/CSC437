import { Schema, model } from "mongoose";
import { Profile } from "../models/profile";

const ProfileSchema = new Schema<Profile>(
  {
    uid: String,
    name: String,
    email: String,
    tickets: [String]
  },
  { collection: "cf-profiles" }
);

const ProfileModel = model<Profile>("Profile", ProfileSchema);

function index(): Promise<Profile[]> {
  return ProfileModel.find();
}

function get(uid: String): Promise<Profile> {
  return ProfileModel.find({ uid })
    .then((list) => list[0])
    .catch(() => {
      throw `${uid} Not Found`;
    });
}

function create(json: Profile): Promise<Profile> {
  const p = new ProfileModel(json);
  return p.save();
}

function update(uid: String, profile: Profile): Promise<Profile> {
  return ProfileModel.findOneAndUpdate({ uid }, profile, {
    new: true
  }).then((updated) => {
    if (!updated) throw `${uid} not updated`;
    else return updated as Profile;
  });
}

function remove(uid: String): Promise<void> {
  return ProfileModel.findOneAndDelete({ uid }).then((deleted) => {
    if (!deleted) throw `${uid} not deleted`;
  });
}

export default { index, get, create, update, remove };

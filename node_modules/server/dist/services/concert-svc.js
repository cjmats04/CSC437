"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var concert_svc_exports = {};
__export(concert_svc_exports, {
  default: () => concert_svc_default
});
module.exports = __toCommonJS(concert_svc_exports);
var import_mongoose = require("mongoose");
const ConcertSchema = new import_mongoose.Schema(
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
const ConcertModel = (0, import_mongoose.model)("Concert", ConcertSchema);
function index() {
  return ConcertModel.find();
}
function get(id) {
  return ConcertModel.find({ id }).then((list) => list[0]).catch((err) => {
    throw `${id} Not Found`;
  });
}
function create(json) {
  const c = new ConcertModel(json);
  return c.save();
}
function update(concertid, concert) {
  return ConcertModel.findOneAndUpdate({ id: concertid }, concert, {
    new: true
  }).then((updated) => {
    if (!updated) throw `${concertid} not updated`;
    else return updated;
  });
}
function remove(concertid) {
  return ConcertModel.findOneAndDelete({ id: concertid }).then((deleted) => {
    if (!deleted) throw `${concertid} not deleted`;
  });
}
var concert_svc_default = { index, get, create, update, remove };

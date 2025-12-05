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
var profile_svc_exports = {};
__export(profile_svc_exports, {
  default: () => profile_svc_default
});
module.exports = __toCommonJS(profile_svc_exports);
var import_mongoose = require("mongoose");
const ProfileSchema = new import_mongoose.Schema(
  {
    uid: String,
    name: String,
    email: String,
    tickets: [String]
  },
  { collection: "cf-profiles" }
);
const ProfileModel = (0, import_mongoose.model)("Profile", ProfileSchema);
function index() {
  return ProfileModel.find();
}
function get(uid) {
  return ProfileModel.find({ uid }).then((list) => list[0]).catch(() => {
    throw `${uid} Not Found`;
  });
}
function create(json) {
  const p = new ProfileModel(json);
  return p.save();
}
function update(uid, profile) {
  return ProfileModel.findOneAndUpdate({ uid }, profile, {
    new: true
  }).then((updated) => {
    if (!updated) throw `${uid} not updated`;
    else return updated;
  });
}
function remove(uid) {
  return ProfileModel.findOneAndDelete({ uid }).then((deleted) => {
    if (!deleted) throw `${uid} not deleted`;
  });
}
var profile_svc_default = { index, get, create, update, remove };

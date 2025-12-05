"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var concerts_exports = {};
__export(concerts_exports, {
  default: () => concerts_default
});
module.exports = __toCommonJS(concerts_exports);
var import_express = __toESM(require("express"));
var import_concert_svc = __toESM(require("../services/concert-svc"));
const router = import_express.default.Router();
router.get("/", (_, res) => {
  import_concert_svc.default.index().then((list) => res.json(list)).catch((err) => res.status(500).send(err));
});
router.get("/:concertid", (req, res) => {
  const { concertid } = req.params;
  import_concert_svc.default.get(concertid).then((concert) => res.json(concert)).catch((err) => res.status(404).send(err));
});
router.post("/", (req, res) => {
  const newConcert = req.body;
  import_concert_svc.default.create(newConcert).then((concert) => res.status(201).json(concert)).catch((err) => res.status(500).send(err));
});
router.put("/:concertid", (req, res) => {
  const { concertid } = req.params;
  const newConcert = req.body;
  import_concert_svc.default.update(concertid, newConcert).then((concert) => res.json(concert)).catch((err) => res.status(404).end());
});
router.delete("/:concertid", (req, res) => {
  const { concertid } = req.params;
  import_concert_svc.default.remove(concertid).then(() => res.status(204).end()).catch((err) => res.status(404).send(err));
});
var concerts_default = router;

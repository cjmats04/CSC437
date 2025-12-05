import { Auth, ThenUpdate } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model } from "./model";

export default function update(
  message: Msg,
  model: Model,
  user: Auth.User
): Model | ThenUpdate<Model, Msg> {
  switch (message[0]) {
    case "profile/request": {
      console.log("Handling profile/request");
      return { ...model}
    }
    case "profile/load": {
      console.log("Handling profile/load");
      user.authenticated
      return { ...model, profiles: [...(model.profiles || []), message[1].profile] };
    }
    // put the rest of your cases here
    default:
      throw new Error(`Unhandled Auth message "${message[0]}"`);
  }
}
import { Profile } from "server/models";

export type Msg =
  | ["profile/save", { userid: string; profile: Profile }]
  | ["profile/request", { userid: string }]
  | ["profile/load", { userid: string; profile: Profile }]
  | ["tour/request", { tourid: string }];
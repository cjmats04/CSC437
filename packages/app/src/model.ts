import { Profile, Ticket } from "server/models";

export interface Model {
  profiles?: Profile[];
  tickets?: Ticket[];
}

export const init: Model = {};
import {
  Auth,
  define,
  History,
  Switch,
  Store
} from "@calpoly/mustang";
import { html, TemplateResult } from "lit";

import { Msg } from "./messages";
import { Model, init } from "./model";
import update from "./update";

// components
import { HeaderElement } from "./components/cf-header";
import { VenuesList } from "./components/venues-list";
import { VenueElement } from "./components/venue-item";
import { ConcertItemElement } from "./components/concert-item";

// views
import { VenuesViewElement } from "./views/venues-view";
import { ConcertsViewElement } from "./views/concerts-view";
import { ArtistsViewElement } from "./views/artists-view";
import { VenueViewElement } from "./views/venue-view";
import { TicketViewElement } from "./views/ticket-view";
import { ProfileViewElement } from "./views/profile-view";


function requiresAuth(viewTemplate: TemplateResult): TemplateResult {
  const token = localStorage.getItem("mu:auth:jwt");
  if (!token) {
    const currentPath = window.location.pathname;
    window.location.href = `/login.html?redirect=${encodeURIComponent(
      currentPath
    )}`;
    return html`<div><h1>Redirecting to login…</h1></div>`;
  }
  return viewTemplate;
}


const routes = [
  {
    path: "/app/venues",
    view: () => html`
      <venues-view></venues-view>
    `
  },
  {
    path: "/app/venues/:id",
    view: (params: Switch.Params) => html`
      <venue-view venue-id=${params.id}></venue-view>
    `
  },
  {
    path: "/app/artists",
    view: () => html`
      <artists-view></artists-view>
    `
  },
  {
    path: "/app/concerts",
    view: () => html`
      <concerts-view></concerts-view>
    `
  },
  {
    path: "/app/concerts/:id",
    view: (params: Switch.Params) => html`
      <main class="app-main page-concerts" id="main">
        <section class="content concerts-content">
          <dl class="entity-list concerts-list">
            <concert-item concert-id=${params.id}></concert-item>
          </dl>
          
        </section>
      </main>
    `
  },
  {
    path: "/app/tickets/:id",
    view: (params: Switch.Params) => html`
      <ticket-view ticket-id=${params.id}></ticket-view>
    `
  },
  {
    path: "/app/profile",
    view: () => 
      requiresAuth(html`<profile-view></profile-view>`)
  },
  {
    path: "/",
    redirect: "/app/concerts"
  },
  {
    path: "/app",
    redirect: "/app/concerts"
  }
];

define({
  "mu-auth": Auth.Provider,
  "mu-history": History.Provider,
  "cf-header": HeaderElement,

  "venues-view": VenuesViewElement,
  "venue-view": VenueViewElement,
  "concerts-view": ConcertsViewElement,
  "artists-view": ArtistsViewElement,
  "ticket-view": TicketViewElement,
  "profile-view": ProfileViewElement,

  "concert-venue": VenueElement,
  "concert-venues": VenuesList,

  "concert-item": ConcertItemElement,

  "mu-store": class AppStore
    extends Store.Provider<Model, Msg>
  {
    constructor() {
      super(update, init, "cf:auth");
    }
  },

  "mu-switch": class AppSwitch extends Switch.Element {
    constructor() {
      super(routes, "cf:history", "cf:auth");
    }
    protected createRenderRoot() {
        return this; // use styles.css
      }
  },
});
import { LitElement, html } from "lit";
import { property, state } from "lit/decorators.js";
import { Auth, css, Observer } from "@calpoly/mustang";

import type { Venue } from "server/models";

export class VenuesList extends LitElement {
  @property()
  src?: string;

  @state()
  venues: Venue[] = [];

  _authObserver = new Observer<Auth.Model>(this, "cf:auth");
  _user?: Auth.User;

  get authorization(): Record<string, string> | undefined {
    if (this._user?.authenticated) {
      console.log("Providing auth header with token");
      return {
        Authorization: `Bearer ${(this._user as Auth.AuthenticatedUser).token}`
      };
    }
    console.log("No authenticated user; no auth header");
    return undefined;
  }

  connectedCallback() {
    super.connectedCallback();
    this._authObserver.observe((auth: Auth.Model) => {
      this._user= auth.user;
    });
    if (this.src) this.hydrate(this.src);
  }

  async hydrate(src: string) {
    try {
      const res = await fetch(src, { headers: this.authorization });
      if (!res.ok) {
        console.error("Failed to fetch", src, res.status);
        return;
      }
      const json = await res.json();
      // support either an array at top-level, or { venues: [...] }
      if (Array.isArray(json)) {
        this.venues = json as Venue[];
      } else if (json && Array.isArray(json.venues)) {
        this.venues = json.venues as Venue[];
      } else {
        console.warn("Unexpected JSON structure for", src);
      }
    } catch (e) {
      console.error("Error hydrating venues from", src, e);
    }
  }

  renderVenue(v: Venue) {
    // Lit will skip attributes that are undefined; use empty string where appropriate
    return html`
      <concert-venue
        id=${v.id ?? ''}
        img-src=${v.imgSrc ?? ''}
        img-alt=${v.imgAlt ?? ''}
        href=${v.href ?? ''}
      >
        <a href=/app/venues/${v.id ?? ''} class="venue-link"><strong>${v.name}</strong></a>
        <span slot="event-title">${v.eventTitle ?? ''}</span>
      </concert-venue>
      <br>
    `;
  }

  override render() {
    return html`
      <dl class="entity-list venues-list">
        ${this.venues.map((v) => this.renderVenue(v))}
      </dl>
    `;
  }

  static styles = css`
    .venue-link {
      text-decoration: none;
      color: inherit;
    }
    .venue-link:hover {
      text-decoration: underline;
    }
  `;
};


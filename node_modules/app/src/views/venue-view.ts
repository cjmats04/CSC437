import { LitElement, html } from "lit";
import { property, state } from "lit/decorators.js";
import { Auth, Observer } from "@calpoly/mustang";

import type { Venue } from "server/models";

export class VenueViewElement extends LitElement {
  @property({attribute: "venue-id"})
  venueid?: string;

  @state()
  venue: Venue | null = null;

  _authObserver = new Observer<Auth.Model>(this, "cf:auth");
  _user?: Auth.User;

  get src() {
    return this.venueid ? `/api/venues/${this.venueid}` : undefined;
  }

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
      if (json) {
        this.venue = json as Venue;
      }
      else {
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
        ${v.name}
        <span slot="event-title">${v.eventTitle ?? ''}</span>
      </concert-venue>
    `;
  }

  override render() {
    return html`
      <dl class="entity-list venues-list">
        ${this.venue ? this.renderVenue(this.venue) : html`<p>No venue data available.</p>`}
      </dl>
    `;
  }
};


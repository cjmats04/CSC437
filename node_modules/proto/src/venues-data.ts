import { LitElement, html } from "lit";
import { property, state } from "lit/decorators.js";

interface Venue {
  id?: string;
  name: string;
  imgSrc?: string;
  imgAlt?: string;
  href?: string;
  eventTitle?: string;
}

export class VenuesList extends LitElement {
  @property()
  src?: string;

  @state()
  venues: Venue[] = [];

  connectedCallback() {
    super.connectedCallback();
    if (this.src) this.hydrate(this.src);
  }

  async hydrate(src: string) {
    try {
      const res = await fetch(src);
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
        ${v.name}
        <span slot="event-title">${v.eventTitle ?? ''}</span>
      </concert-venue>
    `;
  }

  override render() {
    return html`
      <dl class="entity-list venues-list">
        ${this.venues.map((v) => this.renderVenue(v))}
      </dl>
    `;
  }
};


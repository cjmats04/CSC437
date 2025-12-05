import { LitElement, html, css } from "lit";
import { property, state } from "lit/decorators.js";
import { Auth, Observer } from "@calpoly/mustang";

import type { Concert, Venue, Ticket } from "server/models";

export class ConcertItemElement extends LitElement {
  @property({attribute: "concert-id"})
  concertid?: string;

  @state()
  concert: Concert | null = null;

  @state()
  venue: Venue | null = null;

  @state()
  tickets: Ticket[] = [];

  _authObserver = new Observer<Auth.Model>(this, "cf:auth");
  _user?: Auth.User;

  get src() {
    return this.concertid ? `/api/concerts/${this.concertid}` : undefined;
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
        this.concert = json as Concert;

        const venueRes = await fetch(`/api/venues/${this.concert.venueId}`, { headers: this.authorization });
        if (venueRes.ok) {
          const venueJson = await venueRes.json();
          this.venue = venueJson as Venue;
        } else {
          console.error("Failed to fetch venue", this.concert.venueId, venueRes.status);
        }

        for (const ticketId of this.concert.tickets) {
          const ticketRes = await fetch(`/api/tickets/${ticketId}`, { headers: this.authorization }); 
          if (ticketRes.ok) {
            const ticketJson = await ticketRes.json();
            this.tickets = [...this.tickets, ticketJson as Ticket];
            console.log("Fetched ticket for concert:", ticketJson);
          } else {
            console.error("Failed to fetch ticket", ticketId, ticketRes.status);
          }
        }
      }
      else {
        console.warn("Unexpected JSON structure for", src);
      }
    } catch (e) {
      console.error("Error hydrating venues from", src, e);
    }
  }

  override render() {
    return html`
      <dt id="concert1" class="entity-term concert-item">
        <span class="concert-title"><a href="/app/concerts/${this.concert?.id ?? ''}" class="concert-link">${this.concert?.title ?? ''}</a></span>
        <svg class="icon">
          <use href=${this.concert?.iconSrc ?? ''} />
        </svg>
      </dt>
      <dd class="entity-desc">
        <strong>Date/Time:</strong> ${this.concert?.date ?? ''}<br>
        <strong>Venue:</strong> <a href="/app/venues/${this.venue?.id ?? ''}">${this.venue?.name ?? ''}</a><br>
        <strong>Artist:</strong> <a href="/app/artists">${this.concert?.artist ?? ''}</a><br>
        <strong>Genre:</strong> ${this.concert?.genre ?? ''}<br>
        <strong>Tickets:</strong><br>
          ${this.tickets.map(ticket => html`<a href="/app/tickets/${ticket.id}" class="ticket-link">${ticket.type}</a><br>`)}
      </dd>
    `;
  }

  static styles = css`
    dl.entity-list {
      margin: 0;
      padding: 0;
    }
    dl.entity-list dt.entity-term {
      margin: 0 0 0.25rem 0;
      font-weight: 600;
      color: inherit;
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }
    dl.entity-list dd.entity-desc {
      margin: 0 0 1rem 0;
      color: var(--text);
      padding-left: 0;
    }

    /* make icons align when placed inside dt */
    svg.icon {
      display: inline;
      height: 2em;
      width: 2em;
      vertical-align: top;
      fill: currentColor;
    }

    a { text-decoration: none;}
    a:hover { text-decoration: underline; }

    .ticket-link { margin-left: 1rem; }
    .concert-link { font-size: 1.25rem; font-weight: bold; color: inherit; }
  `;
};


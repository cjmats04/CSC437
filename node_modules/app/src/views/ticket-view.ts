import { LitElement, html, css } from "lit";
import { property, state } from "lit/decorators.js";
import { Auth, Observer } from "@calpoly/mustang";

import type { Ticket, Concert, Profile } from "server/models";

export class TicketViewElement extends LitElement {
  @property({attribute: "ticket-id"})
  ticketid?: string;

  @state()
  ticket: Ticket | null = null;

  @state()
  concert: Concert | null = null;

  _authObserver = new Observer<Auth.Model>(this, "cf:auth");

  @state()
  _user?: Auth.User;

  @state()
  _profile?: Profile;

  get src() {
    return this.ticketid ? `/api/tickets/${this.ticketid}` : undefined;
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

      if (this._user?.authenticated) {
        fetch(`/api/profiles/${this._user.username}`, { headers: this.authorization })
          .then(res => {
            if (res.ok) {
              return res.json();
            } else {
              console.error("Failed to fetch profile", res.status);
            }
          })
          .then(profile => {
            if (profile) {
              this._profile = profile as Profile;
            }
            else {
              throw `Profile not found for user ${this._user?.username}`;
            }
          })
          .catch(error => {
            console.error("Error fetching profile", error);
          });
      } else {
        this._profile = undefined;
      }
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
        this.ticket = json as Ticket;

        const concertsRes = await fetch(`/api/concerts/${this.ticket.concertId}`, { headers: this.authorization });
        if (concertsRes.ok) {
          const concertJson = await concertsRes.json();
          this.concert = concertJson as Concert;

          console.log("Fetched concert for ticket:", this.concert);
        } else {
          console.error("Failed to fetch concert", this.ticket.concertId, concertsRes.status);
        }
      }
      else {
        console.warn("Unexpected JSON structure for", src);
      }
    } catch (e) {
      console.error("Error hydrating venues from", src, e);
    }
  }

  addTicketToProfile() {
    if (this._profile && this.ticket) {
      // avoid duplicates
      if (!this._profile.tickets.includes(this.ticket.id)) {
        // Reassign a new object/array so Lit's reactive @state notices the change
        this._profile = {
          ...(this._profile as Profile),
          tickets: [...this._profile.tickets, this.ticket.id]
        } as Profile;

        // Persist update to server (fire-and-forget)
        fetch(`/api/profiles/${this._profile.uid}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...this.authorization
          },
          body: JSON.stringify(this._profile)
        }).catch(err => console.error('Failed to update profile', err));
      }
    }
  }

  renderAddButton() {
    if (this._user?.authenticated){
      if (this._profile && this.ticket) {
        console.log("Profile tickets:", this._profile.tickets);
        console.log("Current ticket ID:", this.ticket.id);
        const alreadyAdded = this._profile.tickets.includes(this.ticket.id);
        if (alreadyAdded) {
          return html`<button disabled>Added to Profile</button>`;
        }
        else {
          return html`<button @click=${() => {
            this.addTicketToProfile();
          }}>Add Ticket to Profile</button>`;
        }
      }
    }
    else {
      return html`<button @click=${() => {
        const currentPath = window.location.pathname;
        window.location.href = `/login.html?redirect=${encodeURIComponent(
          currentPath
        )}`;
      }}>Log in to add</button>`;
    }
  }

  renderTicket(t: Ticket) {
    // Lit will skip attributes that are undefined; use empty string where appropriate
    return html`
      <section class="ticket-details">
        <h1>Ticket Details</h1>
        ${this.concert ? html`<p><strong>Concert:</strong> <a href="/app/concerts/${this.concert.id}">${this.concert.title}</a></p>` : html`<p>Loading concert details...</p>`}
        <p><strong>Type:</strong> ${t.type}</p> 
        <p><strong>Description:</strong> ${t.description}</p>
        <p><strong>Price:</strong> $${t.price.toFixed(2)}</p>
        <br>

        ${this.renderAddButton()}
      </section>
      
    `;
  }

  override render() {
    return html`
      ${this.ticket ? this.renderTicket(this.ticket) : html`<p>No ticket data available.</p>`}
    `;
  }

  static styles = css`
    .ticket-details {
      border: 1px solid #ccc;
      padding: 16px;
      border-radius: 8px;
      max-width: 600px;
      margin: 0 auto;
      background-color: #f9f9f9;
    }
    .ticket-details h1 {
      text-align: center;
    }
    .ticket-details p {
      font-size: 1.1rem;
      margin: 8px 0;
    }

    a {
      text-decoration: none;
      color: var(--link);
    }

    a:hover {
      text-decoration: underline;
    }

    button {
      display: block;
      margin: 16px auto 0;
      padding: 8px 16px;
      font-size: 1rem;
      cursor: pointer;
    }
  `;  
};


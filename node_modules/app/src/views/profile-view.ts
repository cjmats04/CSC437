import { html, css, LitElement } from "lit";
import { state } from "lit/decorators.js";
import { Auth, Observer } from "@calpoly/mustang";

import { Profile, Ticket, Concert } from "server/models";

export class ProfileViewElement extends LitElement {

  _authObserver = new Observer<Auth.Model>(this, "cf:auth");

  @state()
  _user?: Auth.User;

  @state()
  _profile?: Profile;

  @state()
  _tickets?: Ticket[];

  @state()
  _concerts?: Concert[];


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

              // Fetch tickets for this user
              for (const ticketId of this._profile.tickets) {
                fetch(`/api/tickets/${ticketId}`, { headers: this.authorization })
                  .then(res => {
                    if (res.ok) {
                      return res.json();
                    } else {
                      console.error("Failed to fetch ticket", res.status);
                    }
                  })
                  .then(ticket => {
                    if (ticket) {
                      if (!this._tickets) {
                        this._tickets = [];
                      }
                      this._tickets = [...this._tickets, ticket as Ticket];

                      fetch(`/api/concerts/${ticket.concertId}`, { headers: this.authorization })
                        .then(res => {
                          if (res.ok) {
                            return res.json();
                          } else {
                            console.error("Failed to fetch concert", res.status);
                          }
                        })
                        .then(concert => {
                          if (concert) {
                            if (!this._concerts) {
                              this._concerts = [];
                            }
                            // if concert not already in list, add it
                            if (!this._concerts.find(c => c.id === concert.id)) {
                              this._concerts = [...this._concerts, concert as Concert];
                            }
                          }
                        })
                        .catch(error => {
                          console.error("Error fetching concert", error);
                        });
                    }
                  })
                  .catch(error => {
                    console.error("Error fetching ticket", error);
                  });
              }
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
  }

  logout() {
    localStorage.removeItem("mu:auth:jwt");
    window.location.href = "/app/concerts";
  }

  deleteTicket(ticketId: string) {
    // Remove ticket from profile state
    if (this._profile) {
      this._profile = {
        ...(this._profile as Profile),
        tickets: this._profile.tickets.filter(id => id !== ticketId)
      } as Profile;
      this._tickets = this._tickets?.filter(ticket => ticket.id !== ticketId);

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

  override render() {
    if (this._user?.authenticated && this._profile) {
      return html`
        <div class="profile-container">
          <div class="header-profile">
            <h1>Welcome, ${this._profile.name}!</h1>
          </div>
          <div class="profile-details">
            <h2>Your Profile</h2>
            <p><strong>Username:</strong> ${this._profile.uid}</p>
            <p><strong>Email:</strong> ${this._profile.email}</p>
          </div>
          <div class="tickets-section">
            <h2>Your Tickets</h2>
            ${this._tickets && this._tickets.length > 0 ? html`
              <ul>
                ${this._tickets.map(ticket => html`
                  <li class="ticket-item">
                    <div class="ticket-details">
                      Ticket ID: <a href="/app/tickets/${ticket.id}">${ticket.id} </a><br>
                      Concert: <a href="/app/concerts/${ticket.concertId}">${this._concerts?.find(c => c.id === ticket.concertId)?.title}</a> <br>
                      Type: ${ticket.type}
                    </div>
                    <div class="ticket-actions">
                      <svg class="trash-icon" @click=${() => this.deleteTicket(ticket.id)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.5001 6H3.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
                        <path d="M9.5 11L10 16" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
                        <path d="M14.5 11L14 16" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
                        <path d="M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6" stroke="#1C274C" stroke-width="1.5"/>
                        <path d="M18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5M18.8334 8.5L18.6334 11.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
                      </svg>
                    </div>
                  </li>
                `)}
              </ul>
            ` : html`<p>You have no tickets.</p>`}
          </div>
          <div class="logout-section">
            <button class="logout-button" @click=${this.logout}>Log Out</button>
          </div>
        </div>
      `;
    }
    return html`
      <div> Loading...</div>
    `;
  }

  static styles = css`

    a { text-decoration: none; color: inherit; }
    a:hover { text-decoration: underline; }

    .profile-container {
      max-width: 800px;
      margin-left: 1rem;
    }

    .logout-section {
      margin-top: calc(var(--space-4, 16px) * 0.5);
      display: flex;
      justify-content: flex-start;
    }

    .logout-button {
      padding: 0.6rem 0.9rem;
      border-radius: calc(var(--radius-md, 8px) / 1.3);
      background: red;
      color: white;
      border: none;
      cursor: pointer;
      font-weight: 700;
    }

    .logout-button:hover { transform: translateY(-1px); }

    .ticket-item {
      display: flex;
      gap: 0.5rem;
      width: 300px;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 0;
    }

    /* Icon styles for inline SVG <use> references */
    .trash-icon {
      width: 1.25rem;
      height: 1.25rem;
      display: inline-block;
      vertical-align: middle;
      fill: none; /* paths in icon use stroke */
      stroke: currentColor;
      color: var(--muted);
      cursor: pointer;
    }
    .ticket-actions { display:flex; align-items:center; gap:0.5rem; }
    .trash-icon:hover { color: var(--danger); transform: translateY(-1px); }

    @media (max-width: 720px) {
      .profile-details { grid-template-columns: 1fr; }
      .avatar { width: 120px; height: 120px; margin: 0 auto; }
    }
  `;
}
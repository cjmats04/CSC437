import { html, css, LitElement } from "lit";
import { state } from "lit/decorators.js";
import { Auth, Observer } from "@calpoly/mustang";

import { Profile } from "server/models";

export class HeaderElement extends LitElement {

  _authObserver = new Observer<Auth.Model>(this, "cf:auth");

  @state()
  _user?: Auth.User;

  @state()
  _profile?: Profile;

  protected createRenderRoot() {
    return this;
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
          })
          .catch(error => {
            console.error("Error fetching profile", error);
          });
      } else {
        this._profile = undefined;
      }
    });
  }

  renderLoginStatus() {
    console.log("Rendering logged-in status for", this._user);
    if (this._user?.authenticated) {
      if (this._profile) {
        return html`<div class="login-status">Hello, ${this._profile.name}</div>`;
      } else {
        return html`<div class="login-status">Loading user profile...</div>`;
      }
    }
    return html`<button class="login-button" onclick="location.href='/login.html'">Log In</button>`;
  }

  override render() {
    return html`
      <header class="app-header">
        <h1 class="site-title">ConcertFinder</h1>

        ${this.renderLoginStatus()}
        
        <nav class="site-nav" aria-label="Main navigation">
          <div class="nav-list">
            <div class="nav-item"><a class="nav-link" href="/app/concerts">Concerts</a></div>
            <div class="nav-item"><a class="nav-link" href="/app/artists">Artists</a></div>
            <div class="nav-item"><a class="nav-link" href="/app/venues">Venues</a></div>
            <div class="nav-item"><a class="nav-link" href="/app/profile">Profile</a></div>
          </div>
        </nav>
      </header>
    `;
  }

  static styles = css`
    :host { display: block; }

    .app-header {
      background: var(--page-surface);
      padding: calc(var(--space) * 0.6) calc(var(--space) * 1);
      border-bottom: 1px solid rgba(0,0,0,0.06);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: calc(var(--space) * 1);
    }

    .site-title {
      margin: 0 0 0.25rem 0;
      font-size: 1.125rem;
    }

    .site-nav .nav-list {
      margin: 0;
      padding: 0;
      display: flex;
      gap: calc(var(--space) * 0.5);
      align-items: center;
    }

    .site-nav .nav-list .nav-item {
      padding: 0;
      margin: 0;
      display: inline-block;
    }

    .site-nav .nav-link { padding: 0.25rem 0.5rem; display:inline-block; }

    /* Login button styling when user is not authenticated */
    .login-button {
      padding: 0.45rem 0.75rem;
      border-radius: calc(var(--radius-md, 8px) / 1.2);
      background: var(--primary);
      color: var(--primary-foreground, #fff);
      border: none;
      cursor: pointer;
      font-weight: 700;
      box-shadow: 0 2px 6px rgba(2,6,23,0.06);
      transition: transform 120ms var(--ease, ease), box-shadow 120ms var(--ease, ease);
    }
    .login-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 18px rgba(2,6,23,0.08);
    }

    .login-status {
      color: var(--muted);
      font-weight: 600;
      padding-right: calc(var(--space) * 0.5);
    }

    @media (max-width: 720px) {
      .app-header {
        flex-direction: column;
        align-items: stretch;
      }
      .site-title { margin-bottom: calc(var(--space) * 0.5); }
      .site-nav .nav-list { flex-direction: column; gap: calc(var(--space) * 0.25); align-items: stretch; }
      .site-nav .nav-list .nav-item { display:block; }
      .site-nav .nav-link { display:block; width:100%; padding: calc(var(--space) * 0.5) calc(var(--space) * 0.75); }
    }
  `;
}

if (!customElements.get('cf-header')) {
  customElements.define('cf-header', HeaderElement);
}
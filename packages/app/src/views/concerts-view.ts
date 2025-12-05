import { html, LitElement } from "lit";
import { state } from "lit/decorators.js";

import { Concert } from "server/models";

export class ConcertsViewElement extends LitElement {

  @state()
  concerts: Concert[] = [];

  get src() {
    return "/api/concerts";
  }

  async connectedCallback() {
    super.connectedCallback();
    try {
      const res = await fetch(this.src);
      if (res.ok) {
        this.concerts = await res.json();
      } else {
        console.error("Failed to fetch concerts", res.status);
      }
    } catch (e) {
      console.error("Error fetching concerts", e);
    }
  }

  protected createRenderRoot() {
    return this;
  }

  override render() {
    return html`
      <main class="app-main page-concerts" id="main">
        <section class="content concerts-content">
          <h1 class="page-title">All Concerts</h1>
          <dl class="entity-list concerts-list">
            ${this.concerts.map(concert => html`
              <concert-item concert-id="${concert.id}"></concert-item>
              <br>
            `)}
          </dl>
          
        </section>
      </main>
    `;
      
  }

}
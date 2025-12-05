import { html, css, LitElement } from "lit";

export class VenuesViewElement extends LitElement {

  protected createRenderRoot() {
    return this;
  }

  override render() {
    return html`
      <main class="app-main page-venues" id="main">
        <section class="content venues-content">
          <h1 class="page-title">All Venues</h1>
          <concert-venues src="/api/venues"></concert-venues>
        </section>
      </main>
    `;

  }

  static styles = css`

  `;
}
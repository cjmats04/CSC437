import { html, css, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";

export class VenueElement extends LitElement {
  // Reflect attributes into properties
  // use inherited HTMLElement.id (non-optional string) instead of redeclaring it

  @property({ attribute: "img-src" })
  imgSrc?: string;

  @property({ attribute: "img-alt" })
  imgAlt?: string;

  @property()
  href?: string;

  override render() {
    return html`
      <dt id=${this.id ?? nothing} class="entity-term venue-item">
        ${this.imgSrc
          ? html`<img class="venue-image" src=${this.imgSrc} alt=${this.imgAlt ?? ""} />`
          : null}
        <slot></slot>
      </dt>
      <dd class="entity-desc">
        Concerts:
        ${this.href
          ? html`<a href=${this.href}><slot name="event-title"></slot></a>`
          : html`<slot name="event-title"></slot>`}
      </dd>
    `;
  }

  static styles = css``;
}
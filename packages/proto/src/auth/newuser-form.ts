import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";

interface NewUserFormData {
  username?: string;
  password?: string;
}

export class NewUserFormElement extends LitElement {

  @state()
  formData: NewUserFormData = {};

  @property()
  api?: string;

  @property()
  redirect: string = "/";

  @state()
  error?: string;

  get canSubmit(): boolean {
    return Boolean(this.api && this.formData.username && this.formData.password);
  }

  override render() {
    return html`
      <form
        @change=${(e: InputEvent) => this.handleChange(e)}
        @submit=${(e: SubmitEvent) => this.handleSubmit(e)}
      >
        <slot></slot>
        <slot name="button">
          <button
            ?disabled=${!this.canSubmit}
            type="submit">
            Create account
          </button>
        </slot>
        <p class="error">${this.error}</p>
      </form>
    `;
  }

  static styles = [
    css`
      .error:not(:empty) {
        color: var(--color-error);
        border: 1px solid var(--color-error);
        padding: var(--size-spacing-medium);
      }
  `];

  handleChange(event: InputEvent) {
    const target = event.target as HTMLInputElement;
    const name = target?.name;
    const value = target?.value;
    const prevData = this.formData;

    switch (name) {
      case "username":
        this.formData = { ...prevData, username: value };
        break;
      case "password":
        this.formData = { ...prevData, password: value };
        break;
    }
  }

  handleSubmit(submitEvent: SubmitEvent) {
    submitEvent.preventDefault();

    if (this.canSubmit) {
      const { username, password } = this.formData;

      fetch(this?.api || "", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      })
      .then((res) => {
        if (!res.ok)
          throw `Signup failed (${res.status})`;
        return res.json();
      })
      .then((json: object) => {
        // If server returns a token, dispatch auth message similar to login
        const { token } = json as { token?: string };
        if (token) {
          const customEvent = new CustomEvent(
            'auth:message', {
              bubbles: true,
              composed: true,
              detail: [
                'auth/signup',
                { token, redirect: this.redirect }
              ]
            }
          );
          this.dispatchEvent(customEvent);
        } else {
          // If no token, just redirect or show success
          window.location.href = this.redirect;
        }
      })
      .catch((error: Error | string) => {
        console.log(error);
        this.error = (error && typeof error === 'string') ? error : (error as Error).toString();
      });
    }
  }
}

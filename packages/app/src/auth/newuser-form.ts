import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";

// server Profile model is used on the server; the frontend builds its own profile object at runtime

interface NewUserFormData {
  username?: string;
  password?: string;
  name?: string;
  email?: string;
}

export class NewUserFormElement extends LitElement {

  @state()
  formData: NewUserFormData = {};

  @property({attribute: "auth-api"})
  authApi?: string;

  @property({attribute: "profile-api"})
  profileApi?: string;

  @property()
  redirect: string = "/";

  @state()
  error?: string;

  get canSubmit(): boolean {
    return Boolean(
      this.authApi &&
      this.profileApi &&
      this.formData.username &&
      this.formData.password &&
      this.formData.name &&
      this.formData.email
    );
  }

  override render() {
    return html`
      <form
        @change=${(e: InputEvent) => this.handleChange(e)}
        @submit=${(e: SubmitEvent) => this.handleSubmit(e)}
      >
        <slot></slot>
        <slot name="button">
          <div class="button-container">
            <button
              ?disabled=${!this.canSubmit}
              type="submit">
              Create account
            </button>
          </div>
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
        
      .button-container {
        align-self: start;
        padding-top: 1rem;
        width: 160px;
        box-sizing: border-box;
      }

      form {
        display: block;
        margin-bottom: var(--size-spacing-medium);
        display: flex;
        flex-direction: column;
        gap: var(--size-spacing-small);
        align-items: stretch;
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
      case "name":
        this.formData = { ...prevData, name: value };
        break;
      case "email":
        this.formData = { ...prevData, email: value };
        break;
    }
  }

  handleSubmit(submitEvent: SubmitEvent) {
    submitEvent.preventDefault();

    if (this.canSubmit) {
      const { username, password, name, email } = this.formData;

      fetch(this?.authApi || "", {
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

        if (!token) {
          throw "Signup succeeded but no token received";
        }

        // create a profile record in the profiles DB
        const profile = {
          uid: username,
          name: name,
          email: email,
          tickets: [] as string[]
        };

        // Post profile
        fetch(this?.profileApi || "", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(profile)
        })
        .then((profileRes) => {
          if (!profileRes.ok) {
            throw `Profile creation failed (${profileRes.status})`;
          }
          return token;
        })
        .then((token) => {
          if (token) {
            const customEvent = new CustomEvent(
              'auth:message', {
                bubbles: true,
                composed: true,
                detail: [
                  'auth/signin',
                  { token, redirect: this.redirect }
                ]
              }
            );
            this.dispatchEvent(customEvent);
          } else {
            // If no token, just redirect or show success
            window.location.href = this.redirect;
          };
        });
      })
      .catch((error: Error | string) => {
        console.log(error);
        this.error = (error && typeof error === 'string') ? error : (error as Error).toString();
      });
    }
  }
}

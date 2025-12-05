import{i as b,x as g,a as v,r as d,n as p,d as y,b as D}from"./state-BwQnOobu.js";var S=Object.defineProperty,n=(m,a,r,h)=>{for(var e=void 0,i=m.length-1,t;i>=0;i--)(t=m[i])&&(e=t(a,r,e)||e);return e&&S(a,r,e),e};const u=class u extends b{constructor(){super(...arguments),this.formData={},this.redirect="/"}get canSubmit(){return!!(this.authApi&&this.profileApi&&this.formData.username&&this.formData.password&&this.formData.name&&this.formData.email)}render(){return g`
      <form
        @change=${a=>this.handleChange(a)}
        @submit=${a=>this.handleSubmit(a)}
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
    `}handleChange(a){const r=a.target,h=r?.name,e=r?.value,i=this.formData;switch(h){case"username":this.formData={...i,username:e};break;case"password":this.formData={...i,password:e};break;case"name":this.formData={...i,name:e};break;case"email":this.formData={...i,email:e};break}}handleSubmit(a){if(a.preventDefault(),this.canSubmit){const{username:r,password:h,name:e,email:i}=this.formData;fetch(this?.authApi||"",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:r,password:h})}).then(t=>{if(!t.ok)throw`Signup failed (${t.status})`;return t.json()}).then(t=>{const{token:c}=t;if(!c)throw"Signup succeeded but no token received";const l={uid:r,name:e,email:i,tickets:[]};fetch(this?.profileApi||"",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${c}`},body:JSON.stringify(l)}).then(s=>{if(!s.ok)throw`Profile creation failed (${s.status})`;return c}).then(s=>{if(s){const f=new CustomEvent("auth:message",{bubbles:!0,composed:!0,detail:["auth/signin",{token:s,redirect:this.redirect}]});this.dispatchEvent(f)}else window.location.href=this.redirect})}).catch(t=>{console.log(t),this.error=t&&typeof t=="string"?t:t.toString()})}}};u.styles=[v`
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

  `];let o=u;n([d()],o.prototype,"formData");n([p({attribute:"auth-api"})],o.prototype,"authApi");n([p({attribute:"profile-api"})],o.prototype,"profileApi");n([p()],o.prototype,"redirect");n([d()],o.prototype,"error");y({"mu-auth":D.Provider,"newuser-form":o});

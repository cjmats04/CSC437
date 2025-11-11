import"./modulepreload-polyfill-B5Qt9EMX.js";import{i as d,x as m,a as l,r as c,n as p,d as f,b}from"./state-_awXqHhp.js";var g=Object.defineProperty,n=(u,e,r,o)=>{for(var t=void 0,a=u.length-1,i;a>=0;a--)(i=u[a])&&(t=i(e,r,t)||t);return t&&g(e,r,t),t};const h=class h extends d{constructor(){super(...arguments),this.formData={},this.redirect="/"}get canSubmit(){return!!(this.api&&this.formData.username&&this.formData.password)}render(){return m`
      <form
        @change=${e=>this.handleChange(e)}
        @submit=${e=>this.handleSubmit(e)}
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
    `}handleChange(e){const r=e.target,o=r?.name,t=r?.value,a=this.formData;switch(o){case"username":this.formData={...a,username:t};break;case"password":this.formData={...a,password:t};break}}handleSubmit(e){if(e.preventDefault(),this.canSubmit){const{username:r,password:o}=this.formData;fetch(this?.api||"",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:r,password:o})}).then(t=>{if(!t.ok)throw`Signup failed (${t.status})`;return t.json()}).then(t=>{const{token:a}=t;if(a){const i=new CustomEvent("auth:message",{bubbles:!0,composed:!0,detail:["auth/signup",{token:a,redirect:this.redirect}]});this.dispatchEvent(i)}else window.location.href=this.redirect}).catch(t=>{console.log(t),this.error=t&&typeof t=="string"?t:t.toString()})}}};h.styles=[l`
      .error:not(:empty) {
        color: var(--color-error);
        border: 1px solid var(--color-error);
        padding: var(--size-spacing-medium);
      }
  `];let s=h;n([c()],s.prototype,"formData");n([p()],s.prototype,"api");n([p()],s.prototype,"redirect");n([c()],s.prototype,"error");f({"mu-auth":b.Provider,"newuser-form":s});

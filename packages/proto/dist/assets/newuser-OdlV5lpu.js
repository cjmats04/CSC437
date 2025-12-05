import{i as d,x as m,b as l,d as f,a as b}from"./lit-element-Dzoz5mRd.js";import{r as c,n as p}from"./state-CASp9Hhz.js";var g=Object.defineProperty,n=(u,e,a,o)=>{for(var t=void 0,r=u.length-1,i;r>=0;r--)(i=u[r])&&(t=i(e,a,t)||t);return t&&g(e,a,t),t};const h=class h extends d{constructor(){super(...arguments),this.formData={},this.redirect="/"}get canSubmit(){return!!(this.api&&this.formData.username&&this.formData.password)}render(){return m`
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
    `}handleChange(e){const a=e.target,o=a?.name,t=a?.value,r=this.formData;switch(o){case"username":this.formData={...r,username:t};break;case"password":this.formData={...r,password:t};break}}handleSubmit(e){if(e.preventDefault(),this.canSubmit){const{username:a,password:o}=this.formData;fetch(this?.api||"",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:a,password:o})}).then(t=>{if(!t.ok)throw`Signup failed (${t.status})`;return t.json()}).then(t=>{const{token:r}=t;if(r){const i=new CustomEvent("auth:message",{bubbles:!0,composed:!0,detail:["auth/signup",{token:r,redirect:this.redirect}]});this.dispatchEvent(i)}else window.location.href=this.redirect}).catch(t=>{console.log(t),this.error=t&&typeof t=="string"?t:t.toString()})}}};h.styles=[l`
      .error:not(:empty) {
        color: var(--color-error);
        border: 1px solid var(--color-error);
        padding: var(--size-spacing-medium);
      }
  `];let s=h;n([c()],s.prototype,"formData");n([p()],s.prototype,"api");n([p()],s.prototype,"redirect");n([c()],s.prototype,"error");f({"mu-auth":b.Provider,"newuser-form":s});

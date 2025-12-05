import{i as d,x as p,b as l,d as f,a as b}from"./lit-element-Dzoz5mRd.js";import{r as u,n as m}from"./state-CASp9Hhz.js";var g=Object.defineProperty,i=(h,r,t,o)=>{for(var e=void 0,s=h.length-1,c;s>=0;s--)(c=h[s])&&(e=c(r,t,e)||e);return e&&g(r,t,e),e};const n=class n extends d{constructor(){super(...arguments),this.formData={},this.redirect="/"}get canSubmit(){return!!(this.api&&this.formData.username&&this.formData.password)}render(){return p`
      <form
        @change=${r=>this.handleChange(r)}
        @submit=${r=>this.handleSubmit(r)}
      >
        <slot></slot>
        <slot name="button">
          <button
            ?disabled=${!this.canSubmit}
            type="submit">
            Login
          </button>
        </slot>
        <p class="error">${this.error}</p>
      </form>
    `}handleChange(r){const t=r.target,o=t?.name,e=t?.value,s=this.formData;switch(o){case"username":this.formData={...s,username:e};break;case"password":this.formData={...s,password:e};break}}handleSubmit(r){r.preventDefault(),this.canSubmit&&fetch(this?.api||"",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(this.formData)}).then(t=>{if(t.status!==200)throw"Login failed";return t.json()}).then(t=>{const{token:o}=t,e=new CustomEvent("auth:message",{bubbles:!0,composed:!0,detail:["auth/signin",{token:o,redirect:this.redirect}]});console.log("dispatching message",e),this.dispatchEvent(e)}).catch(t=>{console.log(t),this.error=t.toString()})}};n.styles=[l`
      .error:not(:empty) {
        color: var(--color-error);
        border: 1px solid var(--color-error);
        padding: var(--size-spacing-medium);
      }
  `];let a=n;i([u()],a.prototype,"formData");i([m()],a.prototype,"api");i([m()],a.prototype,"redirect");i([u()],a.prototype,"error");f({"mu-auth":b.Provider,"login-form":a});

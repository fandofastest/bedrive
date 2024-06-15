import{bt as M,j as s,ax as k,O as z,r as u,cK as G,G as U,T as b,bu as W,C as H,cL as K,aD as h,a as Q,k as Y,b as E,n as B,b6 as Z,cM as J,cF as V,z as X,E as y,b5 as A,u as N,aI as ee,aF as F,aE as te,bL as D,m as p,cG as se,cH as w}from"./main-4e2f9053.js";import{S as re,l as ne,B as q}from"./billing-redirect-message-d89a4e50.js";import"./TaskAlt-d8322f93.js";function S({children:e}){const{isLoggedIn:t,isSubscribed:r}=M();return t?t&&r?s.jsx(k,{to:"/billing",replace:!0}):e||s.jsx(z,{}):s.jsx(k,{to:"/register",replace:!0})}function C({children:e}){const[t,r]=e;return u.useEffect(()=>{G("be.onboarding.selected")},[]),s.jsxs(u.Fragment,{children:[s.jsx(U,{children:s.jsx(b,{message:"Checkout"})}),s.jsx(W,{size:"sm",color:"transparent",className:"z-10 mb-20 md:mb-0",textColor:"text-main",logoColor:"dark",darkModeColor:"transparent",menuPosition:"checkout-page-navbar"}),s.jsxs("div",{className:"md:flex w-full mx-auto justify-between px-20 md:px-0 md:pt-128 md:max-w-950",children:[s.jsx("div",{className:"hidden md:block fixed right-0 top-0 w-1/2 h-full bg-alt shadow-[15px_0_30px_0_rgb(0_0_0_/_18%)]"}),s.jsxs("div",{className:"md:w-400 overflow-hidden",children:[t,s.jsx(H,{menu:"checkout-page-footer",className:"text-xs mt-50 text-muted overflow-x-auto"}),s.jsx("div",{className:"mt-40",children:s.jsx(K,{})})]}),s.jsx("div",{className:"hidden md:block w-384",children:s.jsx("div",{className:"relative z-10",children:r})})]})]})}const I=e=>`billing/products/${e}`;function ae(){var c;const{productId:e,priceId:t}=h(),r=Q({queryKey:[I(e)],queryFn:()=>ie(e),placeholderData:Y,enabled:e!=null&&t!=null}),n=(c=r.data)==null?void 0:c.product,i=(n==null?void 0:n.prices.find(a=>a.id===parseInt(t)))||(n==null?void 0:n.prices[0]);return{status:r.status,product:n,price:i}}function ie(e){return E.get(I(e)).then(t=>t.data)}function L({showBillingLine:e=!0}){const{status:t,product:r,price:n}=ae();return t==="error"||t!=="pending"&&(!r||!n)?null:s.jsxs("div",{children:[s.jsx("h2",{className:"text-2xl mb-30",children:s.jsx(b,{message:"Summary"})}),t==="pending"?s.jsx(oe,{},"loading-skeleton"):s.jsx(ce,{product:r,price:n,showBillingLine:e})]})}function ce({product:e,price:t,showBillingLine:r}){return s.jsxs(B.div,{children:[s.jsx("div",{className:"text-xl font-semibold mb-6",children:e.name}),e.description&&s.jsx("div",{className:"text-sm text-muted",children:e.description}),s.jsx(Z,{priceClassName:"font-bold text-4xl",periodClassName:"text-muted text-xs",variant:"separateLine",price:t,className:"mt-32"}),s.jsx(J,{product:e}),r&&s.jsxs("div",{className:"flex items-center justify-between gap-24 border-t pt-24 mt-32 font-medium",children:[s.jsx("div",{children:s.jsx(b,{message:"Billed today"})}),s.jsx("div",{children:s.jsx(V,{value:t.amount,currency:t.currency})})]})]})}function oe(){return s.jsxs(B.div,{...X,className:"max-w-180",children:[s.jsx(y,{className:"text-xl mb-6"}),s.jsx(y,{className:"text-sm"}),s.jsx(y,{className:"text-4xl mt-32"})]})}/*!
 * paypal-js v7.0.3 (2023-09-19T14:17:47.731Z)
 * Copyright 2020-present, PayPal, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ue(e,t){var r=document.querySelector('script[src="'.concat(e,'"]'));if(r===null)return null;var n=O(e,t),i=r.cloneNode();if(delete i.dataset.uidAuto,Object.keys(i.dataset).length!==Object.keys(n.dataset).length)return null;var c=!0;return Object.keys(i.dataset).forEach(function(a){i.dataset[a]!==n.dataset[a]&&(c=!1)}),c?r:null}function le(e){var t=e.url,r=e.attributes,n=e.onSuccess,i=e.onError,c=O(t,r);c.onerror=i,c.onload=n,document.head.insertBefore(c,document.head.firstElementChild)}function de(e){var t="https://www.paypal.com/sdk/js";e.sdkBaseUrl&&(t=e.sdkBaseUrl,delete e.sdkBaseUrl);var r=e,n=Object.keys(r).filter(function(a){return typeof r[a]<"u"&&r[a]!==null&&r[a]!==""}).reduce(function(a,o){var l=r[o].toString();return o=pe(o),o.substring(0,4)==="data"?a.dataAttributes[o]=l:a.queryParams[o]=l,a},{queryParams:{},dataAttributes:{}}),i=n.queryParams,c=n.dataAttributes;return i["merchant-id"]&&i["merchant-id"].indexOf(",")!==-1&&(c["data-merchant-id"]=i["merchant-id"],i["merchant-id"]="*"),{url:"".concat(t,"?").concat(fe(i)),dataAttributes:c}}function pe(e){var t=function(r,n){return(n?"-":"")+r.toLowerCase()};return e.replace(/[A-Z]+(?![a-z])|[A-Z]/g,t)}function fe(e){var t="";return Object.keys(e).forEach(function(r){t.length!==0&&(t+="&"),t+=r+"="+e[r]}),t}function O(e,t){t===void 0&&(t={});var r=document.createElement("script");return r.src=e,Object.keys(t).forEach(function(n){r.setAttribute(n,t[n]),n==="data-csp-nonce"&&r.setAttribute("nonce",t["data-csp-nonce"])}),r}function me(e,t){if(t===void 0&&(t=Promise),T(e,t),typeof document>"u")return t.resolve(null);var r=de(e),n=r.url,i=r.dataAttributes,c=i["data-namespace"]||"paypal",a=P(c);return ue(n,i)&&a?t.resolve(a):be({url:n,attributes:i},t).then(function(){var o=P(c);if(o)return o;throw new Error("The window.".concat(c," global variable is not available."))})}function be(e,t){t===void 0&&(t=Promise),T(e,t);var r=e.url,n=e.attributes;if(typeof r!="string"||r.length===0)throw new Error("Invalid url.");if(typeof n<"u"&&typeof n!="object")throw new Error("Expected attributes to be an object.");return new t(function(i,c){if(typeof document>"u")return i();le({url:r,attributes:n,onSuccess:function(){return i()},onError:function(){var a=new Error('The script "'.concat(r,'" failed to load. Check the HTTP status code and response body in DevTools to learn more.'));return c(a)}})})}function P(e){return window[e]}function T(e,t){if(typeof e!="object"||e===null)throw new Error("Expected an options object.");if(typeof t<"u"&&typeof t!="function")throw new Error("Expected PromisePonyfill to be a function.")}function xe({productId:e,priceId:t}){const{data:r}=A(),n=u.useRef(!1),i=u.useRef(!1),[c,a]=u.useState(!1),o=u.useRef(null),{base_url:l,billing:{stripe:{enable:f},paypal:{enable:x,public_key:d}}}=N();return u.useEffect(()=>{!x||!d||n.current||(me({clientId:d,intent:"subscription",vault:!0,disableFunding:f?"card":void 0}).then(()=>{a(!0)}),n.current=!0)},[d,x,f]),u.useEffect(()=>{var _;if(!c||!((_=window.paypal)!=null&&_.Buttons)||!o.current||!(r!=null&&r.products.length)||!e||!t||i.current)return;const g=r.products.find(m=>m.id===parseInt(e)),j=g==null?void 0:g.prices.find(m=>m.id===parseInt(t));window.paypal.Buttons({style:{label:"pay"},createSubscription:(m,v)=>v.subscription.create({application_context:{shipping_preference:"NO_SHIPPING"},plan_id:j==null?void 0:j.paypal_id}),onApprove:(m,v)=>(v.redirect(`${l}/checkout/${e}/${t}/paypal/done?subscriptionId=${m.subscriptionID}&status=success`),Promise.resolve()),onError:m=>{location.href=`${l}/checkout/${e}/${t}/paypal/done?status=error`}}).render(o.current).then(()=>{i.current=!0})},[e,t,r,c,l]),{paypalElementRef:o,stripeIsEnabled:d!=null&&x}}function he(){var l;const{productId:e,priceId:t}=h(),r=A(),{paypalElementRef:n}=xe({productId:e,priceId:t}),{base_url:i,billing:{stripe:c}}=N();if(r.isLoading)return s.jsx(ee,{screen:!0});const a=(l=r.data)==null?void 0:l.products.find(f=>f.id===parseInt(e)),o=a==null?void 0:a.prices.find(f=>f.id===parseInt(t));return!a||!o||r.status==="error"?s.jsx(k,{to:"/pricing",replace:!0}):s.jsxs(C,{children:[s.jsxs(u.Fragment,{children:[s.jsx("h1",{className:"mb-40 text-4xl",children:s.jsx(b,{message:"Checkout"})}),c.enable?s.jsxs(u.Fragment,{children:[s.jsx(re,{productId:e,priceId:t,submitLabel:s.jsx(b,{message:"Upgrade"}),type:"subscription",returnUrl:`${i}/checkout/${e}/${t}/stripe/done`}),s.jsx(ge,{})]}):null,s.jsx("div",{ref:n}),s.jsx("div",{className:"mt-30 text-xs text-muted",children:s.jsx(b,{message:"You’ll be charged until you cancel your subscription. Previous charges won’t be refunded when you cancel unless it’s legally required. Your payment data is encrypted and secure. By subscribing your agree to our terms of service and privacy policy."})})]}),s.jsx(L,{})]})}function ge(){return s.jsx("div",{className:"relative my-20 text-center before:absolute before:left-0 before:top-1/2 before:h-1 before:w-full before:-translate-y-1/2 before:bg-divider",children:s.jsx("span",{className:"relative z-10 bg px-10 text-sm text-muted",children:s.jsx(b,{message:"or"})})})}function je(){const{invalidateBootstrapData:e}=F(),{productId:t,priceId:r}=h(),n=te(),{billing:{stripe_public_key:i}}=N(),[c]=D(),a=c.get("payment_intent_client_secret"),[o,l]=u.useState(),f=u.useRef();return u.useEffect(()=>{f.current||(ne(i).then(async x=>{if(!x||!a){l(R());return}x.retrievePaymentIntent(a).then(({paymentIntent:d})=>{(d==null?void 0:d.status)==="succeeded"&&ve(d.id).then(()=>{e()}),l(R(d==null?void 0:d.status,t,r))})}),f.current=!0)},[i,a,r,t,e]),a?s.jsxs(C,{children:[s.jsx(q,{config:o}),s.jsx(L,{showBillingLine:!1})]}):(n("/"),null)}function R(e,t,r){switch(e){case"succeeded":return{message:p("Subscription successful!"),status:"success",buttonLabel:p("Return to site"),link:"/billing"};case"processing":return{message:p("Payment processing. We'll update you when payment is received."),status:"success",buttonLabel:p("Return to site"),link:"/billing"};case"requires_payment_method":return{message:p("Payment failed. Please try another payment method."),status:"error",buttonLabel:p("Go back"),link:$(t,r)};default:return{message:p("Something went wrong"),status:"error",buttonLabel:p("Go back"),link:$(t,r)}}}function $(e,t){return e&&t?`/buy/${e}/${t}`:"/"}function ve(e){return E.post("billing/stripe/store-subscription-details-locally",{payment_intent_id:e})}function ye(){const{invalidateBootstrapData:e}=F(),{productId:t,priceId:r}=h(),[n]=D(),[i,c]=u.useState();return u.useEffect(()=>{const a=n.get("subscriptionId"),o=n.get("status");c(we(o,t,r)),a&&o==="success"&&ke(a).then(()=>{e()})},[r,t,n,e]),s.jsxs(C,{children:[s.jsx(q,{config:i}),s.jsx(L,{showBillingLine:!1})]})}function we(e,t,r){switch(e){case"success":return{message:p("Subscription successful!"),status:"success",buttonLabel:p("Return to site"),link:"/billing"};default:return{message:p("Something went wrong. Please try again."),status:"error",buttonLabel:p("Go back"),link:Se(t,r)}}}function Se(e,t){return e&&t?`/buy/${e}/${t}`:"/"}function ke(e){return E.post("billing/paypal/store-subscription-details-locally",{paypal_subscription_id:e})}function Le(){return s.jsxs(se,{children:[s.jsx(w,{path:":productId/:priceId",element:s.jsx(S,{children:s.jsx(he,{})})}),s.jsx(w,{path:":productId/:priceId/stripe/done",element:s.jsx(S,{children:s.jsx(je,{})})}),s.jsx(w,{path:":productId/:priceId/paypal/done",element:s.jsx(S,{children:s.jsx(ye,{})})})]})}export{Le as default};
//# sourceMappingURL=checkout-routes-6f886a1e.js.map

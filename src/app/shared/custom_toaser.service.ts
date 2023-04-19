// import { Injectable } from '@angular/core';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class ToastService {
//   private toast: CToast | undefined;
//
//   constructor() { }
//
//   show(header: string, body: string, autohide: boolean = true, delay: number = 5000): void {
//     if (!this.toast) {
//       this.toast = new CToast();
//       document.body.appendChild(this.toast.$el);
//     }
//     this.toast.$el.addEventListener('hidden.coreui.toast', () => {
//       this.toast = undefined;
//     });
//     const toastHeader = new CToastHeader(header);
//     const toastBody = new CToastBody(body);
//     this.toast.addChild(toastHeader);
//     this.toast.addChild(toastBody);
//     this.toast.visible = true;
//     this.toast.autohide = autohide;
//     this.toast.delay = delay;
//   }
// }

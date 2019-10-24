import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";

@Injectable({
  providedIn: "root"
})
export class ErrorHandlerService {
  constructor(public toastController: ToastController) {}

  async message(message: string, position: any, duration: number) {
    const toast = await this.toastController.create({
      message: message,
      position: position,
      duration: duration
    });
    toast.present();
  }
}

import { PopoverComponent } from './../popover/popover.component';
import { TaskService } from './../services/task.service';
import { Component } from '@angular/core';
import { AlertController, ToastController,PopoverController } from '@ionic/angular';
import {Observable} from 'rxjs'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  type : string = "pendente";
  public tasks: Observable<any[]>;

  constructor(public alertController: AlertController,
    public taskService: TaskService,
    public toastController: ToastController,
    public popoverController: PopoverController,
    ) {}
    ngOnInit(){
     this.tasks = this.taskService.getFirestore();
        //this.taskService.getTaskFromStorage();
    }

    async openPopover(ev: any) {
      const popover = await this.popoverController.create({
        component: PopoverComponent,
        event: ev,
        translucent: true,
      });
      await popover.present();
  
      const { role } = await popover.onDidDismiss();
      console.log('onDidDismiss resolved with role', role);
    }

  async presentAlertPromptAdd() {
    const alert = await this.alertController.create({
      header: 'Adicionar Tarefa!',
      inputs: [
        {
          name: 'task',
          type: 'text',
          placeholder: 'Tarefa',
        },
        {
          name: 'date',
          type: 'date',
          min: '2021-01-31',
          max: '2025-01-31',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Salvar',
          handler: (alertData) => {
            if(alertData.task != "")
              this.taskService.addTask(alertData.task,alertData.date,alertData.done);
            else {
              this.presentToast();
              this.presentAlertPromptAdd();
            }
          }
        },
      ],
    });

    //recebe os dados no handler

    await alert.present();
  }

  async presentAlertPromptUpdate(index: number, task) {
    const alert = await this.alertController.create({
      header: 'Atualizar Tarefa!',
      inputs: [
        {
          name: 'task',
          type: 'text',
          placeholder: 'Tarefa',
          value: task.value
        },
        {
          name: 'date',
          type: 'date',
          min: '2021-01-31',
          max: '2025-01-31',
          value: task.date.getDate() + "/" + (task.date.getMonth()+1) + "/" + task.date.getFullYear()
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Editar',
          handler: (alertData) => {
            if(alertData.task != "")
              this.taskService.updateTask(index,alertData.task,alertData.date);
            else {
              this.presentToast();
              this.taskService.updateTask(index,alertData.task,alertData.date);
            }
          }
        },
      ],
    });

    //recebe os dados no handler

    await alert.present();
  }

  async presentAlertPromptdelete(id: number) {
    const alert = await this.alertController.create({
      header: 'Deletar Tarefa?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Excluir',
          handler: () => {
           this.taskService.deleteteOnFireStore(id);
          }
        },
      ],
    });

    //recebe os dados no handler

    await alert.present();
  }

 async presentToast(){
   const toast = await this.toastController.create({
     message: "Preencher os dados",
     duration: 2000
   });
   toast.present();
 }

}

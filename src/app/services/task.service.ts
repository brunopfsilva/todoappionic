import { getFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Plugins } from '@capacitor/core'

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasks: Task [] = [];
  //coleção para base de dados
  private colectionName: string = 'task';

  constructor(public fire: AngularFirestore) { 
    
  }


  public getTasks(): Task[]{
    return this.tasks;
  }

  public addTask (value: string, date: string,done: false){
    let task: Task;
    if(date != ''){
      task =  {value: value, date: new Date(date), done}
    }
   // date = date.replace("-","/");
   task =  {value: value,date: new Date(date), done: false}
    //adiciona tarefa no array
    this.tasks.push(task);
    //adiciona tarefa ao firestore
    this.addtoFirestore(task);
    console.log(this.tasks);
    //adiciona tarefa ao storage
    this.setStorage();
  }

  public delTask (index: number) {
    //remove o item apartir da posicao, na quantidade de 1 
    this.tasks.splice(index,1);
    this.setStorage();
  }

  public updateTask (index: number,value: string, date: string) {
    //a tarefa se encontra exatamente na posição para ser alterada
    let task = this.tasks[index];
     task.value = value;
     task.date = new Date();
     //remove uma tarefa e adiciona outra na mesma posição
     this.tasks.splice(index,1,task);
     this.setStorage();
  }

  public async getTaskFromStorage() {
    
    const resp = await Storage.get({ key: 'tasks' });
    let tempTask: any [] = JSON.parse(resp.value);
    if(!tempTask != null){
      for (let t of tempTask){

        if(t.date != null){
          t.date = t.date.substring(0,10);
          t.date = t.date.replace(/-/g,"/");
        }else {
          t.date = "";
        }
        let task: Task = {value: t.value, date: new Date(t.date), done: t.done};
        this.tasks.push(task);
      }
    }
    console.log(tempTask);

  }

  public async setStorage() {
    await Storage.set({
      key: 'tasks',
      value: JSON.stringify(this.tasks)
    });
  }


  //adiciona ao firestore
  public addtoFirestore(record: Task){
    return this.fire.collection(this.colectionName).add(record);
  }

  public getFirestore(){
    return this.fire.collection(this.colectionName).valueChanges({
      iDField : 'id'
    })
  }

}

//interface serve para definir tipos
interface Task {
 value: string;
 date?: Date;
 done: boolean;   
}

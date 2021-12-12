import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasks: Task [] = []

  constructor() { }

  public getTasks(): Task[]{
    return this.tasks;
  }

  public addTask (value: string, date: string){
   // date = date.replace("-","/");
    let task: Task = {
      value: value, date: new Date(date), done: false
    }; 
    //adiciona tarefa no array
    this.tasks.push(task);
    console.log(this.tasks);
    
  }

  public delTask (index: number) {
    //remove o item apartir da posicao, na quantidade de 1 
    this.tasks.splice(index,1);
  }

  public updateTask (index: number,value: string, date: string) {
    //a tarefa se encontra exatamente na posição para ser alterada
    let task = this.tasks[index];
     task.value = value;
     task.date = new Date();
     //remove uma tarefa e adiciona outra na mesma posição
     this.tasks.splice(index,1,task);

  }

}

//interface serve para definir tipos
interface Task {
 value: string;
 date: Date;
 done?: boolean;   
}

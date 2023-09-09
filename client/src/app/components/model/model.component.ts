import { Component, EventEmitter, Output,Input  } from '@angular/core';
import { Socket } from 'socket.io-client';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent   {
  @Input() socket : any;
  @Output() btnClick = new EventEmitter();
  description : string = "";
  title : string = ""
  error : string = "";

  titleChange(title : string) {
    this.title = title
  }

  descriptionChange(description : string) {
    this.description = description
  }


  createTodo() : void {
    if (this.title == "" || this.description == "")
    {
      this.error = "Please fill out all fields"
      return
    }
    this.socket.emit("task:create",{
      description:this.description,
      title:this.title
    })
    this.title = ""
    this.description = ""
    this.error = ""
    this.btnClick.emit()
  }

  onClick() {
    this.btnClick.emit()
  }

}

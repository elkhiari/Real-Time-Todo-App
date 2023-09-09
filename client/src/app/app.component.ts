import { Component, OnInit } from '@angular/core';
import { Task } from './interface/task.interface';
import { io } from 'socket.io-client'
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private toastr: ToastrService) {}
    showSuccess(msg : string) {
      this.toastr.success(msg);
    }

    showInfo(msg : string) {
      this.toastr.info("",msg,{
        "toastClass":"shodow-none p-3 bg-yellow-500 rounded font-black"
      })
    }

  title = 'todo';
  socket: any;
  public tasks : Task[] = []
  modelIsActive : boolean = false;


  ngOnInit(): void {
      try {
        this.socket = io("http://localhost:3000");
        this.socket.on("task:getAll",(tasks:any)=>{
          this.tasks = tasks
        })
        this.socket.on("alert",(message : string)=>{
          this.showInfo(message)
        })
      } catch (error) {
        console.log(error)
      }
  }


  onModelClick() {
    this.modelIsActive = !this.modelIsActive
  }
}

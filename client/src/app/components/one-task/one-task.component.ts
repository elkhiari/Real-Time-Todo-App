import { Component, Input } from '@angular/core';
import { Task } from '../../interface/task.interface';

@Component({
  selector: 'app-one-task',
  templateUrl: './one-task.component.html',
  styleUrls: ['./one-task.component.css']
})
export class OneTaskComponent {
  @Input() tasks : Task[] = [];
  @Input() socket : any;

  deleteTask(id : string) {
    this.socket.emit("task:delete",id);
  }

}

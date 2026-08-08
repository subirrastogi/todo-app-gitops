import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

export interface Task {
  id?: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'GitOps To-Do List';
  tasks: Task[] = [];
  newTaskTitle = '';

  private http = inject(HttpClient);
  private apiUrl = '/api/v1/tasks';

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks(): void {
    this.http.get<Task[]>(this.apiUrl).subscribe(data => {
      this.tasks = data;
    });
  }

  addTask(): void {
    if (!this.newTaskTitle.trim()) return;
    const newTask: Task = { title: this.newTaskTitle, completed: false };
    this.http.post<Task>(this.apiUrl, newTask).subscribe(savedTask => {
      this.tasks.push(savedTask);
      this.newTaskTitle = '';
    });
  }

  toggleTask(task: Task): void {
    task.completed = !task.completed;
    this.http.put<Task>(`${this.apiUrl}/${task.id}`, task).subscribe();
  }

  deleteTask(id?: number): void {
    if (!id) return;
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== id);
    });
  }
}
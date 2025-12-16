import { Component, OnInit, signal, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';


interface Todo {
  id: number;
  text: string;
  done: boolean;

  estimatedMinutes: number;
  spentSeconds: number;
  running: boolean;
}


@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  constructor() {
    // Set up an effect to auto-persist todos whenever they change.
    effect(() => {
      localStorage.setItem(this.storageKey, JSON.stringify(this.todos()));
    });
  }
  // Key used to persist todos in localStorage so reads/writes stay consistent.
  protected readonly storageKey = 'minimal-todos';

  // Two-way bound input value for the text field.
  protected draftText = '';

  // Signal holding the array of todo items for reactive updates.
  protected todos = signal<Todo[]>([]);

  // Load any persisted todos as soon as the component initializes, then set up auto-save.
  public ngOnInit(): void {
    this.loadTodosFromStorage();
  }

  // Add a new todo using the current draft text, then reset the input.
  protected addTodo(): void {
    const text = this.draftText.trim();
    if (!text) {
      return; // Ignore empty submissions to keep the list clean.
    }

    // Simple id using timestamp to avoid collisions in this demo.
    const nextTodo: Todo = {
      id: Date.now(),
      text,
      done: false,
      estimatedMinutes: 0,
      spentSeconds: 0,
      running: false
    };

    
  }

  // Toggle completion state for a single todo item.
  protected toggleTodo(id: number): void {
    this.todos.update((current) =>
      current.map((todo) => {
      if (todo.id === id) {
        return { ...todo, done: !todo.done };
      }
      return todo;
      })
    );
  }

  // Remove one todo by id so the list stays tidy.
  protected removeTodo(id: number): void {
    this.todos.update((current) => current.filter((todo) => todo.id !== id));
  }

  // Retrieve persisted todos from localStorage, safely handling bad data.
  private loadTodosFromStorage(): void {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) {
      return;
    }

    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        this.todos.set(parsed);
      }
    } catch {
      // Ignore malformed storage; start fresh without crashing.
      this.todos.set([]);
    }
  }
}

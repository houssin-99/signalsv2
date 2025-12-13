import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  // Key used to persist todos in localStorage so reads/writes stay consistent.
  protected readonly storageKey = 'minimal-todos';

  // Two-way bound input value for the text field.
  protected draftText = '';

  // Plain array of todo items; we avoid signals/observables by design.
  protected todos: Array<{ id: number; text: string; done: boolean }> = [];

  // Load any persisted todos as soon as the component initializes.
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
    const nextTodo = { id: Date.now(), text, done: false };
    this.todos = [...this.todos, nextTodo];
    this.persistTodos();
    this.draftText = '';
  }

  // Toggle completion state for a single todo item.
  protected toggleTodo(id: number): void {
    this.todos = this.todos.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    );
    this.persistTodos();
  }

  // Remove one todo by id so the list stays tidy.
  protected removeTodo(id: number): void {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.persistTodos();
  }

  // Clear all completed items in one click to declutter.
  protected clearCompleted(): void {
    this.todos = this.todos.filter((todo) => !todo.done);
    this.persistTodos();
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
        this.todos = parsed;
      }
    } catch {
      // Ignore malformed storage; start fresh without crashing.
      this.todos = [];
    }
  }

  // Save the current todo array so the list survives reloads.
  private persistTodos(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.todos));
  }
}

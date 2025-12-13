# Introduction to signals

Hey there, future signal masters! 😎 If you're a beginner fullstack dev like me, you've probably wrestled with plain old arrays and wondered why your app doesn't update magically. Enter Angular signals – the reactive superheroes that make your UI dance without the drama. Let's transition from boring arrays to shiny signals in our todo app. Buckle up! 🚀

## What are signals?

Signals are Angular's way of saying, "Hey, watch this variable – if it changes, I'll tell everyone!" They're like your favorite social media notifications, but for code. No more manually pushing updates; signals handle the reactivity. Think of them as tiny robots that whisper changes to your templates. 🤖

## Why bother with signals?

Before signals, we had plain arrays. You add a todo, manually update the array, and hope the UI notices. Spoiler: it doesn't always. Signals make it automatic – change the signal, and boom, the view updates. It's like upgrading from a flip phone to a smartphone. 📱➡️🚀 Plus, they're performant and fun to use. Who doesn't love less boilerplate? 😂

## Step-by-step transition

Let's refactor our todo app. We'll go from array gymnastics to signal serenity. Here's the before and after, with dev humor sprinkled in.

### 1. Import the magic

Before: Just plain old imports. Boring. 😴

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
```

After: Bring in the signal squad! 🦸‍♂️

```typescript
import { Component, OnInit, signal, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
```

### 2. Turn array into signal

Before: Plain array, no reactivity. It's like a statue. 🗿

```typescript
protected todos: Array<{ id: number; text: string; done: boolean }> = [];
```

After: Signal-ify it! Now it's alive and kicking. 💃

```typescript
protected todos = signal<Array<{ id: number; text: string; done: boolean }>>([]);
```

### 3. Auto-save with effect

Before: Manual save after every change. Tedious, like doing dishes by hand. 🧽

```typescript
private persistTodos(): void {
  localStorage.setItem(this.storageKey, JSON.stringify(this.todos));
}
```

After: Effect watches the signal and saves automatically. Set it and forget it! 🪄

```typescript
effect(() => {
  localStorage.setItem(this.storageKey, JSON.stringify(this.todos()));
});
```

### 4. Update methods to use signal updates

Before: Direct array mutation, then manual save. Clunky. 🤕

```typescript
this.todos = [...this.todos, nextTodo];
this.persistTodos();
```

After: Signal update – clean, reactive, and no extra steps. Smooth operator! 😏

```typescript
this.todos.update((current) => [...current, nextTodo]);
```

### 5. Template tweaks

Before: Direct array access. Static. 📜

```html
@if (todos.length === 0) {
@for (todo of todos; track todo.id) {
```

After: Call the signals! Now it's dynamic and fun. 🎢

```html
@if (todos().length === 0) {
@for (todo of todos(); track todo.id) {
```

## Signal methods: .set, .update, and .effect

Signals have superpowers! Here's the trio you need to know:

### .set() - The Direct Setter
Use `.set()` to replace the entire signal value. Like assigning a new value directly. Perfect for simple changes.

```typescript
// Set a new array
this.todos.set([{ id: 1, text: 'New todo', done: false }]);
```

### .update() - The Smart Updater
Use `.update()` to modify based on the current value. Pass a function that gets the current value and returns the new one. Great for arrays and objects.

```typescript
// Add to the current array
this.todos.update((current) => [...current, newTodo]);
```

### .effect() - The Watcher
Use `.effect()` for side effects that run when signals change. It tracks dependencies automatically. Ideal for logging, saving, or API calls.

```typescript
// Auto-save on change
effect(() => {
  console.log('Todos changed:', this.todos());
  localStorage.setItem('todos', JSON.stringify(this.todos()));
});
```

Remember: `.set()` and `.update()` change the signal; `.effect()` reacts to changes. Use them wisely! 🛠️

## Conclusion: signals win!

There you have it – from array chaos to signal bliss. Your app now reacts like a pro, and you wrote less code. Signals are the future, folks. Embrace them, or get left in the dust! 🌪️

Remember, signals aren't magic – they're just smart. If you mess up, it's probably because you forgot to call `()` on them. Rookie mistake! 😉 Keep coding, and may your builds be green. 🍀

Happy signaling! 🎉
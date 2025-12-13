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
import { Component, OnInit, signal, computed, effect } from '@angular/core';
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

### 3. Add computed for smart checks

Before: A helper method that runs every time. Lazy, but works. 😒

```typescript
protected hasCompleted(): boolean {
  return this.todos.some((todo) => todo.done);
}
```

After: Computed signal – it's smart, reactive, and only recalculates when needed. Brainy! 🧠

```typescript
protected hasCompleted = computed(() => this.todos().some((todo) => todo.done));
```

### 4. Auto-save with effect

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

### 5. Update methods to use signal updates

Before: Direct array mutation, then manual save. Clunky. 🤕

```typescript
this.todos = [...this.todos, nextTodo];
this.persistTodos();
```

After: Signal update – clean, reactive, and no extra steps. Smooth operator! 😏

```typescript
this.todos.update((current) => [...current, nextTodo]);
```

### 6. Template tweaks

Before: Direct array access. Static. 📜

```html
@if (todos.length === 0) {
@for (todo of todos; track todo.id) {
@if (hasCompleted()) {
```

After: Call the signals! Now it's dynamic and fun. 🎢

```html
@if (todos().length === 0) {
@for (todo of todos(); track todo.id) {
@if (hasCompleted()) {
```

## Conclusion: signals win!

There you have it – from array chaos to signal bliss. Your app now reacts like a pro, and you wrote less code. Signals are the future, folks. Embrace them, or get left in the dust! 🌪️

Remember, signals aren't magic – they're just smart. If you mess up, it's probably because you forgot to call `()` on them. Rookie mistake! 😉 Keep coding, and may your builds be green. 🍀

Happy signaling! 🎉
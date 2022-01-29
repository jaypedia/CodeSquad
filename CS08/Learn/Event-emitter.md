# Event Emitter

## Objectives

- how to emit custom events
- how to respond to those events when they are emitted

---

## Basic Overview of Event Emitter

> As an asynchronous **event-driven** JavaScript runtime, Node.js is designed to build scalable network applications.

- `EventEmitter` is an object provided by the events module.
- It binds a function with an event.
- This bound function is then used to handle the event and perform actions accordingly.
- We can emit events in any part of the application and have a function setup that listens to it.
- The **Observer pattern** is built into the node.js core and is available through the `EventEmitter` class.

## Observer pattern

- The observer pattern is a software design pattern in which an object(subject) changed, and all of its dependents(observers) are notified and updated automatically.
- This is a behavioral pattern which means that is concerned about communication between objects.

### Subject and Observers

- Observer Pattern is having two-component.

1. Subject: The component is capable of notifying when its state gets changed.
2. Observers : The component which can listen to the subject notifications.

## Essential methods of `EventEmitter`

### 1. `on(eventName, listener)`

- Adding event handler

### 2. `emit(eventName[, ...args])`

- Calling the event handlers for the specified event

---

### Reference

[Visualization of Node.js Event Emitter](https://javascript.plainenglish.io/visualization-of-node-js-event-emitter-4f7c9fe3a477)
[Implement the Observer Pattern with EventEmitter class](https://medium.com/@ywwwtseng/implement-observer-pattern-with-eventemitter-class-6611e7b5265)

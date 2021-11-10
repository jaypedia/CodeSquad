// https://javascript.plainenglish.io/javascript-what-are-stack-and-queue-79df7af5a566
// A stack is a type of data structure that is linear where order is conserved.
// Last in First Out(LIFO) mechanism

// Implementation #1 (Array)
class Stack {
  constructor() {
    this.stack = [];
  }

  // Insert the element into the top of the stack
  push(element) {
    this.stack.push(element);
  }

  // Removes the element from the top of the stack and return that element
  pop() {
    if (this.isEmpty()) return 'Stack is empty';
    return this.stack.pop();
  }

  // Return which element is on top of the stack
  peek() {
    if (this.isEmpty()) return 'Stack is empty';
    return this.stack[this.stack.length - 1];
  }

  // helper method
  // If 'this.stack.length' is equal to 0, then return true
  isEmpty() {
    return !this.stack.length;
  }
}

// https://javascript.plainenglish.io/javascript-what-are-stack-and-queue-79df7af5a566

// Implementation #2 (Linked List)

// Linked List에서의 Node의 역할은 무엇일까?
class Node {
  constructor(next, value) {
    this.next = next;
    this.value = value;
  }
}

class Stack {
  constructor() {
    this.stack = null;
  }

  // push, pop 부분을 이해해보자
  push(element) {
    let head = this.stack;
    let newNode = new Node(null, element);

    if (!head) {
      this.stack = newNode;
    } else {
      newNode.next = head;
      this.stack = newNode;
    }
  }

  pop() {
    let head = this.stack;

    if (!head) return 'Stack is empty!';

    this.stack = head.next;
    return head.value;
  }

  peek() {
    if (!this.stack) return 'Stack is empty!';
    return this.stack.value;
  }
}

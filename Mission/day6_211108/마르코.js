//https://github.com/trekhleb/javascript-algorithms/blob/master/src/data-structures/hash-table/HashTable.js

// Hash table size directly affects on the number of collisions.
// The bigger the hash table size the less collisions you'll get.
// For demonstrating purposes hash table size is small to show how collisions are being handled.

// 클래스가 두 개, 이것의 용도는?
class LinkedListNode {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }

  //   toString(callbackFunc) {
  //     return callbackFunc ? callbackFunc(this.value) : `${this.value}`;
  //   }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }
  findNode({ value = undefined, callbackFunc = undefined }) {
    if (!this.head) {
      return null;
    }

    let currentNode = this.head;

    while (currentNode) {
      // If callbackFunc is specified then try to find node by callbackFunc.
      if (callbackFunc && callbackFunc(currentNode.value)) {
        return currentNode;
      }

      // If value is specified then try to compare by value..
      if (value !== undefined && currentNode.value === value) {
        return currentNode;
      }

      currentNode = currentNode.next;
    }

    return null;
  }

  append(value) {
    const newNode = new LinkedListNode(value);

    // If there is no head yet let's make new node a head.
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;

      return this;
    }

    // Attach new node to the end of linked list.
    this.tail.next = newNode;
    this.tail = newNode;

    return this;
  }

  toArray() {
    const nodes = [];

    let currentNode = this.head;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    return nodes;
  }

  delete(value) {
    if (!this.head) {
      return null;
    }

    let deletedNode = null;

    // If the head must be deleted then make next node that is different
    // from the head to be a new head.
    while (this.head && this.head.value === value) {
      deletedNode = this.head;
      this.head = this.head.next;
    }

    let currentNode = this.head;

    if (currentNode !== null) {
      // If next node must be deleted then make next node to be a next next one.
      while (currentNode.next) {
        if (currentNode.next.value === value) {
          deletedNode = currentNode.next;
          currentNode.next = currentNode.next.next;
        } else {
          currentNode = currentNode.next;
        }
      }
    }

    // Check if tail must be deleted.
    if (this.tail.value === value) {
      this.tail = currentNode;
    }

    return deletedNode;
  }
}

// @param : Tags in JS used for documentation
// They help programmers to understand the code better
// {} => the type of the param, and the name of the param
class HashTable {
  /**
   * @param {number} hashTableSize
   */
  constructor(hashTableSize) {
    // Create hash table of certain size and fill each bucket with empty linked list.
    this.hashTableSize = hashTableSize;
    this.buckets = Array(hashTableSize)
      .fill(null)
      .map(() => new LinkedList());

    // Just to keep track of all actual keys in a fast way. ?? 이것의 용도는?
    this.keys = {};
  }

  /**
   * Converts key string to hash number.
   *
   * @param {string} key
   * @return {number}
   */
  hash(key) {
    // For simplicity reasons we will just use character codes sum of all characters of the key
    // to calculate the hash.
    //
    // But you may also use more sophisticated approaches like polynomial string hash to reduce the
    // number of collisions:
    //
    // hash = charCodeAt(0) * PRIME^(n-1) + charCodeAt(1) * PRIME^(n-2) + ... + charCodeAt(n-1)
    //
    // where charCodeAt(i) is the i-th character code of the key, n is the length of the key and
    // PRIME is just any prime number like 31.
    const hash = Array.from(key).reduce(
      (hashAccumulator, keySymbol) => hashAccumulator + keySymbol.charCodeAt(0),
      0
    );

    // Reduce hash number so it would fit hash table size.
    return hash % this.buckets.length;
  }

  /**
   * @param {string} key
   * @param {*} value
   */
  set(key, value) {
    const keyHash = this.hash(key);
    this.keys[key] = keyHash; // 이건 그냥 보관용?
    const bucketLinkedList = this.buckets[keyHash];
    const node = bucketLinkedList.findNode({
      callbackFunc: nodeValue => nodeValue.key === key,
    });

    if (!node) {
      // Insert new node.
      bucketLinkedList.append({ key, value });
    } else {
      // Update value of existing node.
      node.value.value = value;
    }
  }

  /**
   * @param {string} key
   * @return {*}
   */
  delete(key) {
    const keyHash = this.hash(key);
    delete this.keys[key];
    const bucketLinkedList = this.buckets[keyHash];
    const node = bucketLinkedList.findNode({
      callbackFunc: nodeValue => nodeValue.key === key,
    });

    if (node) {
      return bucketLinkedList.delete(node.value);
    }

    return null;
  }

  /**
   * @param {string} key
   * @return {*}
   */
  get(key) {
    const bucketLinkedList = this.buckets[this.hash(key)];
    const node = bucketLinkedList.findNode({
      callbackFunc: nodeValue => nodeValue.key === key,
    });

    return node ? node.value.value : undefined;
  }

  getSize() {
    return Object.keys(this.keys).length;
  }

  /**
   * @param {string} key
   * @return {boolean}
   */
  has(key) {
    return Object.hasOwnProperty.call(this.keys, key);
  }

  /**
   * @return {string[]}
   */
  getKeys() {
    return Object.keys(this.keys);
  }

  clear() {
    this.buckets = Array(this.hashTableSize)
      .fill(null)
      .map(() => new LinkedList());

    // Just to keep track of all actual keys in a fast way.
    this.keys = {};
  }

  /**
   * Gets the list of all the stored values in the hash table.
   *
   * @return {*[]}
   */
  getValues() {
    // console.log('@@0@@@@', this.buckets[0]);
    // console.log('@@1@@@@', this.buckets[1]);

    return this.buckets.reduce((values, bucket) => {
      const bucketValues = bucket
        .toArray()
        .map(linkedListNode => linkedListNode.value.value);
      return values.concat(bucketValues);
    }, []);
  }
}

const hTable = new HashTable(5);
// for (let i = 0; i < 100; i++) {
//   hTable.set(i * i, "value" + i);
// }
// console.log(hTable);
hTable.set('대한민국', '부산');
hTable.set('대한민국', '서울');
hTable.set('미국', '워싱턴');
hTable.set('일본', '도쿄');
hTable.set('베트남', '하노이');
hTable.set('인도네시아', '자카르타');
hTable.set('태국', '방콕');
hTable.set('미얀마', '양곤');
hTable.has('일본');

console.log(hTable.get('대한민국'));
console.log(hTable.getKeys());
console.log(hTable.getValues());
console.log(hTable);
hTable.delete('태국');
console.log(hTable.getKeys());
console.log(hTable.getValues());
console.log(hTable.getSize());
hTable.clear();
console.log(hTable.getSize());

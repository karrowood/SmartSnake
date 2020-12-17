"use strict";
//I turned strict null checks off to run this, because on line 30-31 and 42,
//The compiler was having issues where it was saying that this.tail is
//possibly null just because the type is ListNode | null.
//Both inplemented using a linked list
class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}
class Queue {
    constructor() {
        this.head = null;
        this.size = 0;
        this.tail = this.head;
    }
    enqueue(val) {
        if (this.head == null) {
            this.head = new ListNode(val);
            this.tail = this.head;
        }
        else {
            this.tail.next = new ListNode(val);
            this.tail = this.tail.next;
        }
        this.size++;
    }
    dequeue() {
        if (this.isEmpty()) {
            throw new Error('Queue is empty, cannot dequeue!');
            return null;
        }
        let result = this.head;
        this.head = this.head.next;
        this.size--;
        return result;
    }
    isEmpty() {
        if (this.size == 0)
            return true;
        return false;
    }
    getSize() {
        return this.size;
    }
}
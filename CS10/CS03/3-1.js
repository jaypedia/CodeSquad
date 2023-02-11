class Node {
  constructor(title, id, duration) {
    this.title = title;
    this.id = id;
    this.duration = duration;
    this.next = null;
  }
}

class ClipListMaker {
  constructor(length) {
    this.length = length;
    this.clips = [];
    this.save();
  }

  getUniqueId = num => {
    const numArr = num.toString().split('').map(Number);
    while (numArr.length < 4) numArr.unshift(0);
    return numArr
      .map(n => n + 97)
      .map(c => String.fromCharCode(c))
      .join('');
  };

  save = () => {
    for (let i = 1; i <= this.length; i++) {
      const duration = Math.floor(Math.random() * 15 + 1);
      const newNode = new Node(`TITLE${i}`, this.getUniqueId(i), duration);
      this.clips.push(newNode);
    }
  };

  print = () => {
    console.log(`
***** MOVIE CLIPS *****
[TITLE (ID) : DURATION]
***********************
    `);
    for (let i = 0; i < this.length; i++) {
      console.log(
        `${this.clips[i].title} (${this.clips[i].id}) : ${this.clips[i].duration}`
      );
    }
    console.log(`
***** TOTAL : ${this.length} ***** 
    `);
  };
}

const CLIP_COUNT = 13;
const clipList = new ClipListMaker(CLIP_COUNT);
console.log(clipList);
clipList.print();

module.exports = clipList;

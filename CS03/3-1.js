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
  }

  getUniqueId = num => {
    const numArr = num.toString().split('').map(Number);
    while (numArr.length < 4) numArr.unshift(0);
    return numArr
      .map(n => n + 97)
      .map(c => String.fromCharCode(c))
      .join('');
  };

  saveMovieClips = () => {
    for (let i = 1; i <= this.length; i++) {
      const duration = Math.floor(Math.random() * 15 + 1);
      const newNode = new Node(`title${i}`, this.getUniqueId(i), duration);
      this.clips.push(newNode);
    }
  };

  printMovieClips = () => {
    console.log('***** MOVIE CLIPS *****');
    for (let i = 0; i < this.length; i++) {
      console.log(
        `${this.clips[i].title} (${this.clips[i].id}) : ${this.clips[i].duration}`
      );
    }
  };
}

const clipListMaker = new ClipListMaker(13);

clipListMaker.saveMovieClips();
clipListMaker.printMovieClips();

//-------------------------------------------------------------//
const CLIP_NUM = 13;

// 4자리 알파벳으로 구성된 고유한 id 만들기
const getUniqueId = num => {
  const numArr = num.toString().split('').map(Number);
  while (numArr.length < 4) numArr.unshift(0);
  return numArr
    .map(n => n + 97)
    .map(c => String.fromCharCode(c))
    .join('');
};

const clips = [];

const saveMovieClip = clipNum => {
  for (let i = 1; i <= clipNum; i++) {
    const duration = Math.floor(Math.random() * 15 + 1);
    const newNode = new Node(`title${i}`, getUniqueId(i), duration);
    clips.push(newNode);
    console.log(clips);
  }
};

saveMovieClip(CLIP_NUM);

const printMovieClip = clips => {
  console.log('***** MOVIE CLIPS *****');
  for (let i = 0; i < clips.length; i++) {
    console.log(`${clips[i].title} (${clips[i].id}) : ${clips[i].duration}`);
  }
};

printMovieClip(clips);

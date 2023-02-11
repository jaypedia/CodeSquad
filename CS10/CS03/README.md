# CS03

##### 2022.1.10 ~ 1.11

---

## 3-1. Clip List Maker

#### 1. 영상의 정보가 담긴 노드를 만드는 Node 클래스

```js
class Node {
  constructor(title, id, duration) {
    this.title = title; // 영상 제목
    this.id = id; // 고유 ID
    this.duration = duration; // 영상 재생 시간(초 단위)
    this.next = null; // 다음 영상 정보
  }
}
```

#### 2. 숫자를 입력한 만큼 영상의 리스트를 생성해주는 ClipListMaker 클래스

##### (0) constructor

```js
  constructor(length) {
    this.length = length;
    this.clips = [];
    this.save();
  }
```

- 클래스 인스턴스 생성 시, `save()` 함수 역시 바로 호출됨

##### (1) 고유한 ID를 할당해주는 함수

```js
getUniqueId = num => {
  const numArr = num.toString().split('').map(Number);
  while (numArr.length < 4) numArr.unshift(0);
  return numArr
    .map(n => n + 97)
    .map(c => String.fromCharCode(c))
    .join('');
};
```

- 요구사항에 따라 아이디는 4자리의 알파벳으로 구성된다.
- 인수로 들어오는 num은 중복되지 않는 숫자라는 점에 착안하였다.
  - (예) 노드의 개수가 13개라면, 1부터 13까지의 정수가 인수로 들어가게 된다.
- 숫자가 4자리가 아니라면, 앞에 0을 넣어 준다.
- 각 숫자를 알파벳으로 변경한다.
  - 0부터 9까지의 숫자는 a부터 j까지로 대치된다.
- 총 10,000개(`10 ** 4`)의 고유 아이디를 생성할 수 있다.

##### (2) 입력한 숫자만큼 노드를 생성하고 배열에 저장하는 함수

```js
save = () => {
  for (let i = 1; i <= this.length; i++) {
    const duration = Math.floor(Math.random() * 15 + 1);
    const newNode = new Node(`TITLE${i}`, this.getUniqueId(i), duration);
    this.clips.push(newNode);
  }
};
```

- 요구사항에 따라 duration은 1부터 15까지의 랜덤한 정수로 만들어 주었다.

![image](https://user-images.githubusercontent.com/85419343/148751890-444796af-c931-429b-b892-a1f712ab5441.png)

##### (3) 콘솔에 프린트해주는 함수

```js
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
```

- for문을 활용해 clips 배열 안에 있는 요소들을 하나씩 돌면서 출력해 주었다.

![image](https://user-images.githubusercontent.com/85419343/148753453-f8167908-e0ba-4b99-a9f3-834844dd2f2c.png)

---

## 3-2. Clip Editor

- 3-1에서 만들었던 clipList를 활용하여, 각 노드들을 편집할 수 있는 편집기를 만든다.

1. add : 맨 뒤에 해당 id의 영상을 추가한다.(push)

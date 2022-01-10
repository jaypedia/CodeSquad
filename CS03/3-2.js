const clipList = require('./3-1.js');

class ClipEditor {
  constructor(clipList) {
    this.clips = clipList.clips;
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  getSelectedClip(id) {
    return this.clips.find(c => c.id === id);
  }

  add(id) {
    const selectedClip = this.getSelectedClip(id);
    if (!selectedClip) {
      this.warn('NO SUCH CLIP ID');
      return;
    }

    if (!this.head) {
      this.head = selectedClip;
      this.tail = this.head;
    } else {
      this.tail.next = selectedClip;
      this.tail = selectedClip;
    }
    this.length++;
    this.render('result');
  }

  insert(id, idx) {
    if (idx < 0) return undefined;
    const selectedClip = this.getSelectedClip(id);
    if (!selectedClip) return undefined;

    if (idx >= this.length) {
      this.add(id);
    } else {
      const prevClip = this.get(idx - 1);
      selectedClip.next = prevClip.next;
      prevClip.next = selectedClip;
      this.length++;
      this.render('result');
    }
  }

  get(idx) {
    if (idx < 0 || idx >= this.length) return null;
    let counter = 0;
    let current = this.head;
    while (counter !== idx) {
      current = current.next;
      counter++;
    }
    return current;
  }

  delete(id) {
    const selectedClip = this.getSelectedClip(id);
    if (!selectedClip) return undefined;

    const selectedClipIdx = this.getIndex(id);
    const prevClip = this.get(selectedClipIdx - 1);
    prevClip.next = selectedClip.next;
    this.length--;
    this.render('result');
  }

  getIndex(id) {
    let counter = 0;
    let current = this.head;
    while (current.id !== id) {
      current = current.next;
      counter++;
    }
    return counter;
  }

  render(command) {
    if (!this.head) return undefined;
    let totalSec = 0;
    let result = '[START]---';
    let current = this.head;
    totalSec += current.duration;
    result += `[${current.id}, ${current.duration}sec]---`;

    while (current.next) {
      current = current.next;
      totalSec += current.duration;
      result += `[${current.id}, ${current.duration}sec]---`;
    }
    result += '[END]';

    command === 'result'
      ? console.log(result)
      : console.log(`
    # NUMBER OF CLIPS : ${this.length}
    # TOTAL DURATION : ${totalSec}sec
   `);
  }

  readUserInput() {
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.setPrompt('✂️  EDIT >  ');
    rl.prompt();
    rl.on('line', line => {
      if (line === 'q') {
        console.log('FINISHED EDITING');
        rl.close();
      }
      this.execute(line);
      rl.prompt();
    }).on('close', () => process.exit());
  }

  execute(line) {
    const [command, id, idx] = line.split(' ');
    switch (command) {
      case 'add':
        this.add(id);
        break;
      case 'insert':
        this.insert(id, idx);
        break;
      case 'delete':
        this.delete(id);
        break;
      case 'render':
        this.render();
        break;
      default:
        this.warn('INVALID COMMAND');
    }
  }

  warn(reason) {
    console.log(`
    [WARNING] ${reason}
    `);
  }

  start() {
    this.readUserInput();
  }
}

const clipEditor = new ClipEditor(clipList);

clipEditor.add('aaac');
clipEditor.add('aaag');
clipEditor.add('aabd');
clipEditor.render();
clipEditor.start();

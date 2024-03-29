const clipList = require('./3-1.js');

class ClipEditor {
  constructor(clipList) {
    this.clips = clipList.clips;
    this.head = null;
    this.tail = null;
    this.length = 0;
    this.editedClipId = [];
  }

  getSelectedClip(id) {
    return this.clips.find(c => c.id === id);
  }

  add(id) {
    if (this.editedClipId.includes(id)) {
      this.warn('THIS CLIP IS CURRENTLY BEING EDITED');
      return;
    }
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
    this.editedClipId.push(id);
    this.length++;
    this.render('result');
    console.log(this.clips);
  }

  insert(id, idx) {
    if (this.editedClipId.includes(id)) {
      this.warn('THIS CLIP IS CURRENTLY BEING EDITED');
      return;
    }
    if (idx < 0) return undefined;
    const selectedClip = this.getSelectedClip(id);
    if (!selectedClip) {
      this.warn('NO SUCH CLIP ID');
      return;
    }

    if (idx >= this.length) {
      this.add(id);
    } else {
      const prevClip = this.get(idx - 1);
      selectedClip.next = prevClip.next;
      prevClip.next = selectedClip;
      this.editedClipId.push(id);
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
    if (!selectedClip) {
      this.warn('NO SUCH CLIP ID');
      return;
    }
    if (selectedClip === this.head) {
      this.head = selectedClip.next;
    } else {
      const selectedClipIdx = this.getIndex(id);
      const prevClip = this.get(selectedClipIdx - 1);
      prevClip.next = selectedClip.next;
    }
    selectedClip.next = null;
    this.editedClipId = this.editedClipId.filter(i => i !== id);
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
    if (!this.head) {
      this.warn('NO CLIPS');
      return;
    }

    let totalSec = 0;
    let result = '[START]---';
    let current = this.head;

    while (current) {
      result += `[${current.id}, ${current.duration}sec]---`;
      totalSec += current.duration;
      current = current.next;
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

    if (!['add', 'insert', 'delete', 'render'].includes(command)) {
      this.warn('INVALID COMMAND');
      return;
    }

    const run = {
      add: () => this.add(id),
      insert: () => this.insert(id, idx),
      delete: () => this.delete(id),
      render: () => this.render(),
    };

    return run[command]();
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
// clipEditor.add('aaag');
// clipEditor.add('aabd');
// clipEditor.delete('aabd');
// console.log(clipEditor.clips);
clipEditor.render();
clipEditor.start();
// console.log(clipEditor.editedClipId);

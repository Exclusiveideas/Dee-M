function* generateID(arg) {
    let id = 1;
  
    while (true) {
      const val = yield id;
      if (val) {
        id += val
      } else {
        id++;
      }
    }
  }
  
const genObj = generateID();

  console.log(genObj.next()); // {value: 1, done: false}
  console.log(genObj.next()); // {value: 2, done: false}
  console.log(genObj.next(4)); // {value: 6, done: false}
  console.log(genObj.next()); // {value: 7, done: false}
  console.log(genObj.next(3)); // {value: 10, done: false}
  console.log(genObj.next()); // {value: 11, done: false}
  
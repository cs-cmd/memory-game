function randomizeArray(arr) {
  const copyArr = arr.map(item => item);

  const newArr = [];
  let end = arr.length - 1;

  while (newArr.length < copyArr.length) {
    const index = Math.floor(Math.random() * end);
    let temp = copyArr[index];
    newArr.push(temp);
    copyArr[index] = copyArr[end];
    copyArr[end] = temp;
    end--; 
  }

  return newArr;
}

export { randomizeArray }
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

let arr = ['A','B','C','D','E','F'];
console.log(arr);
var res= new Array(arr.length);

shuffle(arr);
console.log(arr);
for(i=0;i<arr.length/2;i++) {
  console.log(arr[i] +'<>'+arr[arr.length/2+i]);
}

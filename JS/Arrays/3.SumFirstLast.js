function firstLastSum(arr) {

    let sum = Number(arr[0]);
    let last = Number(arr[arr.length - 1]);
    sum += last;

    return sum;
}

console.log(firstLastSum(['20', '30', '40']));
console.log(firstLastSum(['5', '10']));
function process(arr) {
    let result = [];

    for (let i = 0; i < arr.length; i++) {
        if (i % 2 != 0) {
            result.push(arr[i] * 2);
        }
    }

    result = result.reverse();

    return result.join(" ");
}

console.log(process([10, 15, 20, 25]));
console.log(process([3, 0, 10, 4, 7, 3]));
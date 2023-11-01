function bigger(arr) {
    arr = arr.sort((a, b) => a - b);

    let result = [];
    let startIndex = 0;

    if ((arr.length - 1) / 2 == 0) {
        startIndex = (arr.length - 1) / 2;
    }
    else {
        startIndex = Math.ceil((arr.length - 1) / 2);
    }

    for (startIndex; startIndex < arr.length; startIndex++) {
        result.push(arr[startIndex]);
    }

    return result
}

// console.log(bigger([4, 7, 2, 5]));
console.log(bigger([3, 19, 14, 7, 2, 19, 6]));
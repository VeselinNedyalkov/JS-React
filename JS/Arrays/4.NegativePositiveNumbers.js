function result(arr) {
    let answer = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < 0) {
            answer.unshift(arr[i]);
        }
        else {
            answer.push(arr[i]);
        }
    }

    console.log(answer.join('\n'));
}

result([7, -2, 8, 9]);
result([3, -2, 0, -1]);
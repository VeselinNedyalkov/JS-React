function smallest(arr) {
    let answer = [];
    arr = arr.sort((a, b) => a - b);

    answer.push(arr[0]);
    answer.push(arr[1]);

    return answer;
}


console.log(smallest([30, 15, 50, 5]));
console.log(smallest([3, 0, 10, 4, 7, 3]));
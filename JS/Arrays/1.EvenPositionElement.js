function training(arr) {
    let answer = [];

    for (let i = 0; i < arr.length; i++) {
        if (i % 2 === 0) {
            answer.push(arr[i]);
        }
    }


    console.log(answer.join(' '));
}

training(['20', '30', '40', '50', '60']);
training(['5', '10']);
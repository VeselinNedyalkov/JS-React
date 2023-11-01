function numbers(n, k) {
    let answer = [1];

    for (let i = 0; i < n - 1; i++) {
        let sum = 0;

        let calcStartIndex = i + 1 - k;
        let startIndex = calcStartIndex < 0 ? 0 : calcStartIndex;

        for (startIndex; startIndex <= i; startIndex++) {
            sum += answer[startIndex];
        }

        answer.push(sum);
    }

    return answer;
}

numbers(6, 3);
numbers(8, 2);
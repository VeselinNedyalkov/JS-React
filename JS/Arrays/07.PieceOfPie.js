function piece(arr, startFlavor, endFlavor) {
    let startIndex = arr.indexOf(startFlavor);
    let endtIndex = arr.indexOf(endFlavor);
    let result = [];

    for (startIndex; startIndex <= endtIndex; startIndex++) {
        result.push(arr[startIndex]);
    }

    return result;
}

console.log(piece(['Pumpkin Pie',
    'Key Lime Pie',
    'Cherry Pie',
    'Lemon Meringue Pie',
    'Sugar Cream Pie'],
    'Key Lime Pie',
    'Lemon Meringue Pie')
)

console.log(piece(['Apple Crisp',
    'Mississippi Mud Pie',
    'Pot Pie',
    'Steak and Cheese Pie',
    'Butter Chicken Pie',
    'Smoked Fish Pie'],
    'Pot Pie',
    'Smoked Fish Pie')
)

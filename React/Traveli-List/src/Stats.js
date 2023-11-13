export function Stats({ items }) {

    const numItems = items.length;
    const numPacked = items.filter(item => item.packed).length;
    const precentage = Math.round(numPacked / numItems * 100);

    return (
        <footer className='stats'>
            <em>
                {precentage === 100 ? 'You got everything! Ready to go ✈' :
                    `💼 You have ${numItems} items on your list, and you already packed ${numPacked} (${precentage}%)`}
            </em>
        </footer>
    );
}

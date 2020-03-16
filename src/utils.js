export const capitalizeFirst = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export const chunk = (array, size) => {
    const sortedData = array.sort((a, b) => b.reportDate - a.reportDate);
    const chunked_arr = [];
    let index = 0;
    while (index < sortedData.length) {
        chunked_arr.push(sortedData.slice(index, size + index));
        index += size;
    }
    return chunked_arr;
}
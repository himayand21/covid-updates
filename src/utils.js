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

export const sort = (nums) => {
	for (let i = 1; i < nums.length; i++) {
		let j = i - 1;
		let temp = nums[i];
		while (j >= 0 && new Date(nums[j].reportDate) > new Date(temp.reportDate)) {
			nums[j + 1] = nums[j];
			j--;
		}
		nums[j+1] = temp;
	}
	return nums;
}
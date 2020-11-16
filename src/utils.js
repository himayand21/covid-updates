export const capitalizeFirst = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export const chunk = (array, size) => {
    const sortedData = array.sort((a, b) => new Date(b.reportDate) - new Date(a.reportDate));
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

export const numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const getFormattedDate = (dateString) => {
	const date = new Date(dateString);
	return `${
		date.toLocaleDateString(
			'en-gb',
			{
				month: 'short',
				day: 'numeric'
			}
		)
	} ${date.toLocaleTimeString(
		[],
		{
			hour: '2-digit',
			minute: '2-digit',
			hour12: true,
		}
	).toUpperCase()
	}`;
}

export const getShortFormattedDate = (dateString) => {
	const date = new Date(dateString);
	return `${
		date.toLocaleDateString(
			'en-gb',
			{
				month: 'short',
				day: 'numeric'
			}
		)
	}`;
}

export const abbreviateNumber = (value) => {
    var newValue = value;
    if (value >= 1000) {
        var suffixes = ["", "k", "m", "b","t"];
        var suffixNum = Math.floor( (""+value).length/3 );
        var shortValue = '';
        for (var precision = 2; precision >= 1; precision--) {
            shortValue = parseFloat( (suffixNum != 0 ? (value / Math.pow(1000,suffixNum) ) : value).toPrecision(precision));
            var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g,'');
            if (dotLessShortValue.length <= 2) { break; }
        }
        if (shortValue % 1 != 0)  shortValue = shortValue.toFixed(1);
        newValue = shortValue+suffixes[suffixNum];
    }
    return newValue;
}
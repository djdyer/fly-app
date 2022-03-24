export default function searchFilterData(auctionsData, filter, loading) {
    if (loading) {
        return;
    } else {
        const filterOriginIds = [];
        const filterDestinationIds = [];
        const dateDestinationIds = [];
        const operatorIds = [];
        const aircraftIds = [];
        const cabinSizeIds = [];


        auctionsData.forEach(obj => {
            if (obj.origin.toLowerCase() === filter.filterOrigin.toLowerCase()) {
                filterOriginIds.push(obj._id);
            }
            if (obj.destination.toLowerCase() === filter.filterDestination.toLowerCase()) {
                filterDestinationIds.push(obj._id);
            }
            if (obj.flightDate.toLowerCase() === filter.dateDestination.toLowerCase()) {
                dateDestinationIds.push(obj._id);
            }
            if (obj.operator.toLowerCase() === filter.operator.toLowerCase()) {
                operatorIds.push(obj._id);
            }
            if (obj.aircraft.toLowerCase() === filter.aircraft.toLowerCase()) {
                aircraftIds.push(obj._id);
            }
            if (obj.cabinSize.toLowerCase() === filter.cabinSize.toLowerCase()) {
                cabinSizeIds.push(obj._id);
            }
        });
        const SearchFieldsIdArrays = {
            a: filter.filterOrigin === "" ? false : filterOriginIds,
            b: filter.filterDestination === "" ? false : filterDestinationIds,
            c: filter.dateDestination === "" ? false : dateDestinationIds,
            d: filter.operator === "" ? false : operatorIds,
            e: filter.aircraft === "" ? false : aircraftIds,
            f: filter.cabinSize === "" ? false : cabinSizeIds
        }
        const noResultinOneSearchLine = Object.values(SearchFieldsIdArrays).forEach((value) => {
            console.log(value.length === 0)
            if (value.length === 0) {
                return false;
            }
        });

        if (!noResultinOneSearchLine) {
            const justFilledSearchFields = []
            Object.values(SearchFieldsIdArrays).forEach((value) => {
                if (value) {
                    justFilledSearchFields.push(value);
                }
            });

            // combine multiple arrays into one
            const oneArrayOfAllsearch = Array.prototype.concat.apply([], justFilledSearchFields);

            // leaves just unique values in array
            const afterSearchIds = oneArrayOfAllsearch.filter(function (item, pos, self) {
                return self.indexOf(item) == pos;
            })

            console.log(oneArrayOfAllsearch)
            console.log(afterSearchIds)

            return afterSearchIds;
        } else return [];
    }
};
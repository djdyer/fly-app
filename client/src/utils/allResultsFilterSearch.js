export default function searchFilterData(auctionsData, filter, loading) {
    if (loading) {
        return;
    } else {
        const afterSearchIds = [];
        const filterOriginIds = [];
        const filterDestinationIds =[];
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


        return operatorIds;
    }
};
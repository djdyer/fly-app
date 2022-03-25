export default function searchFilterData(auctionsData, filter) {

    let filtered = [...auctionsData];

    filtered = filtered
        .filter(auction => auction.origin.toLowerCase().indexOf(filter.filterOrigin.toLowerCase()) !== -1)
        .filter(auction => auction.destination.toLowerCase().indexOf(filter.filterDestination.toLowerCase()) !== -1)
        .filter(auction => auction.flightDate.toString().indexOf(filter.dateDestination.toString()) !== -1)
        .filter(auction => auction.operator.toLowerCase().indexOf(filter.operator.toLowerCase()) !== -1)
        .filter(auction => auction.aircraft.toLowerCase().indexOf(filter.aircraft.toLowerCase()) !== -1)
        .filter(auction => auction.cabinSize.toLowerCase().indexOf(filter.cabinSize.toLowerCase()) !== -1)
        
    return filtered;
};
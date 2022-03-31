export default function searchFilterData(auctionsData, filter) {

    let filtered = [...auctionsData];
    const sd = new Date(filter.dateDestination)
    const searchDate = () => {
        if (filter.dateDestination === "") {
            return "";
        } else {
            const date = Date.UTC(sd.getFullYear(), sd.getMonth(), sd.getDate());
            return date;
        }
    }

    const flightDay = (date) => {
        const fd = new Date(+date)
        return Date.UTC(fd.getFullYear(), fd.getMonth(), fd.getDate())
    }
    const cabinSize = (cSize) => {
        if (+cSize > 20) {
            return ">20";
        } else if (+cSize < 10) {
            return "<10";
        } else {
            return "10-20";
        }
    }

    filtered = filtered
        .filter(auction => auction.origin.toLowerCase().indexOf(filter.filterOrigin.toLowerCase()) !== -1)
        .filter(auction => auction.destination.toLowerCase().indexOf(filter.filterDestination.toLowerCase()) !== -1)
        .filter(auction => flightDay(auction.flightDate).toString().indexOf(searchDate().toString()) !== -1)
        .filter(auction => auction.operator.toLowerCase().indexOf(filter.operator.toLowerCase()) !== -1)
        .filter(auction => auction.aircraft.toLowerCase().indexOf(filter.aircraft.toLowerCase()) !== -1)
        .filter(auction => cabinSize(auction.cabinSize).indexOf(filter.cabinSize) !== -1)

    return filtered;
};


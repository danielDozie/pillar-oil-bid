import reportStore from "@/store/reports";
import { Headers } from "@/constants";

const getStatsData = async () => {
    const endpoints = ["/v1/tenders", "/v1/vendors", "/v1/fx", "/v1/bids/bid-placement"];
    const requests = endpoints.map(endpoint => fetch(`${process.env.API_ENDPOINT}${endpoint}`, { headers: Headers }));
    const [resTender, resVendor, fxBids, bidPlacementData] = await Promise.all(requests);

    const [tenders, vendors, fxbids, bidPlacement] = await Promise.all([resTender.json(), resVendor.json(), fxBids.json(), bidPlacementData.json()]);

    const acceptedBidsCount = bidPlacement.data.filter(item => item.status === "accepted").length;
    const totalTender = tenders.length;
    const totalVendor = vendors.length;
    const activeTenders = tenders.filter(item => item.status === "open");
    const verifiedVendors = vendors.filter(item => item.user.verified === true);
    const activeTenderCount = activeTenders.length;
    const verifiedVendorsCount = verifiedVendors.length;
    const activeNoBid = 0;
    const data = { totalTender, totalVendor, activeTenderCount, verifiedVendorsCount, activeNoBid, vendors, acceptedBidsCount };

    const fxData = fxbids.data;

    //set the reports data
    reportStore.getState().$setReports({ totalTender, totalVendor, activeTenderCount, verifiedVendorsCount });

    return {
        data,
        fxData
    };
}

export {
    getStatsData
}
import reportStore from "@/store/reports";
import { Headers } from "@/constants";

const getStatsData = async () => {

    const resTender = await fetch(`${process.env.API_ENDPOINT}/v1/tenders`, { headers: Headers });
    const resVendor = await fetch(`${process.env.API_ENDPOINT}/v1/vendors`, { headers: Headers });
    const fxBids = await fetch(`${process.env.API_ENDPOINT}/v1/fx`, { headers: Headers });

    const fxbids = await fxBids.json();
    const tenders = await resTender.json();
    const vendors = await resVendor.json();

    const totalTender = tenders.length;
    const totalVendor = vendors.length;
    const activeTenders = tenders.filter((item) => (item.status === "open"));
    const verifiedVendors = vendors.filter((item) => (item.user.verified === true));
    const activeTenderCount = activeTenders.length;
    const verifiedVendorsCount = verifiedVendors.length;
    const activeNoBid = 0;
    const data = { totalTender, totalVendor, activeTenderCount, verifiedVendorsCount, activeNoBid, vendors };

    const fxData = fxbids.data

    //set the reports data
    reportStore.getState().$setReports({ totalTender, totalVendor, activeTenderCount, verifiedVendorsCount });

    return {
        data,
        fxData
    }
}

export {
    getStatsData
}
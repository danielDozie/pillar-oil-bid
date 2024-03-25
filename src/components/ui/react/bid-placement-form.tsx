import type { Bid } from "@/components/ui/react/bid-data-table";
import { Badge } from "./badge";
import { UserItemListComponent } from "./user-item-list-component";
import { FilesListComponenet } from "./files-list-componenet";
import { Button } from "./button";
import { UserFileUploader } from "./user-file-uploader";
import { Input } from "./input";

interface BidPlacementPageProps {
    bidData: Bid;
};


export function BidPlacementForm({ bidData }: BidPlacementPageProps) {

    
    // //@ts-ignore
    // const Items = bidData?.tender?.items;
    //@ts-ignore
    const Files = bidData?.tender?.files;
    return (
        <div className="bid-placement-page">
            <div className="bid-details px-4">
                <h2 className="text-lg font-medium text-foreground">Bid Details:</h2>
                <div className="flex flex-row justify-between my-4">
                    <div className="space-y-2">
                        <span className="font-bold flex gap-x-2 text-foreground">Bid ID: <p className="font-medium">{`POL RFX-B` + bidData?.id}</p></span>
                        <span className="font-bold flex gap-x-2 text-foreground">Status: {bidData?.status === 'pending' ? <Badge className="bg-gray-500 hover:bg-gray-500 px-4 text-[10px] text-slate-200">{bidData?.status}</Badge> : bidData?.status === 'sent' ? <Badge className="bg-primary hover:bg-primary px-4 text-[10px] text-slate-200">{bidData?.status}</Badge> : bidData?.status === 'expired' ? <Badge className="bg-red-600 hover:bg-red-600 px-4 text-[10px] text-slate-200">{bidData?.status}</Badge> : bidData?.status === 'open' ? <Badge className="bg-green-600 hover:bg-green-600 px-4 text-[10px] text-slate-200">{bidData?.status}</Badge> : <Badge className="bg-gray-500 hover:bg-gray-500 px-4 text-[10px] text-slate-200">{bidData?.status}</Badge>}</span>
                    </div>
                    <div className="space-y-2">
                        <span className="font-bold flex gap-x-2 text-foreground">Title: <p className="font-medium">{bidData?.tender?.title}</p></span>
                        <span className="font-bold flex gap-x-2 text-foreground">Location: <p className="font-medium">{bidData?.tender?.location}</p></span>
                    </div>
                    <div className="space-y-2">
                        <span className="font-bold flex gap-x-2 text-foreground">Start Date: <p className="font-medium">{new Date(bidData?.tender?.startDate).toDateString()}</p></span>
                        <span className="font-bold flex gap-x-2 text-foreground">End Date: <p className="font-medium">{new Date(bidData?.tender?.endDate).toDateString()}</p></span>
                    </div>
                </div>
                <div className="space-y-2">
                    <span className="font-bold flex gap-x-2 text-foreground">Description:</span>
                    <p className="font-normal text-foreground">{bidData?.tender?.description}</p>
                </div>
                {/* Supporting document */}
                <hr className="border-primary my-12" />
                <div className="my-4">
                    <h2 className="text-lg font-medium text-foreground">Bid Document(s):</h2>

                    <div className="w-full flex flex-row justify-between my-4">
                        <div className="w-full space-y-2">
                            <FilesListComponenet data={Files} />
                        </div>

                    </div>
                </div>

                {/* Bid items */}
                <hr className="border-primary my-12" />
                <div className="my-4">
                    {/* <h2 className="text-lg font-medium text-foreground">Bid Item(s):</h2>

                    <div className="w-full flex flex-row justify-between my-4">
                        <div className="w-full space-y-2">
                            <UserItemListComponent items={Items} />
                        </div>
                    </div> */}
                    <p className="text-sm font-medium text-foreground py-4">Supporting Document(s): Ensure to upload all applicable documents before submitting this bid.</p>
                    <UserFileUploader />
                    <div className="flex justify-center">
                        <Input type="password" placeholder="Document(s) password" className="border-2 border-slate-600 dark:border-slate-100 text-foreground rounded-lg p-6 mt-8 w-1/3 mx-auto" />
                    </div>
                    <hr className="border-primary my-12" />
                    <Button className="bg-primary flex mx-auto my-8 px-12 items-center">
                        Place Bid
                    </Button>
                </div>
                
            </div>
        </div>
    );
}



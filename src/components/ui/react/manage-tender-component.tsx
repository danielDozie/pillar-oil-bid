import { Button } from './button'
import { Input } from './input'
import { Textarea } from './text-area'
import { Badge } from './badge'
import { ItemListComponent } from './item-list-component'
import { useState } from 'react'
import { ReloadIcon } from '@radix-ui/react-icons'
import { toast } from 'sonner'
import { FilesListComponenet } from './files-list-componenet'

export function ManageTenderComponent({ result, token }: {result: any, token: string}) {
    const [loading, setLoading] = useState(false);

    const sendTenderHandler = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/v1/tenders/send-tender', {
                method: "POST",
                body: JSON.stringify(result),
                headers: {
                    "x-pol-rfx-secret": token,
                    "Content-Type": "application/json"
                }
            });
            const response = await res.json();
            if (res.status === 200) {
                setLoading(false);
                toast.success(response.message)
                window.location.reload();
            } else {
                setLoading(false);
                toast.error(response.message)
            }
        } catch (error) {
            console.log(error)
        }
        
    };

    const editTenderHandler = () => {
        alert("Edit handler")
    };

    return (
        <div
            className="flex flex-col bg-slate-100 dark:bg-natural gap-x-4 ml-24 w-[calc(100%-7rem)] p-8 mt-24 mb-8 h-full rounded-2xl">
            <div className="flex flex-row gap-8 text-foreground">
                <div className="w-full">
                    <h1 className="text-xl font-bold mb-4">Manage tender</h1>
                    <div className="flex flex-row space-x-4 w-full">
                        <div className="w-3/5">
                            <h2 className="font-semibold">General information</h2>
                            <div className="flex flex-col my-8 gap-y-4">
                                <div className="flex justify-between gap-x-4 w-full">
                                    <span className="w-1/2">
                                        <label
                                            htmlFor="title"
                                            className="block text-sm font-medium text-gray-500">Title</label
                                        >
                                        <Textarea
                                            className="text-foreground font-medium text-lg w-full border-0 ring-transparent shadow-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                            defaultValue={result?.tender?.title}
                                            readOnly
                                        />
                                    </span>
                                    <span className="w-1/2">
                                        <label
                                            htmlFor="title"
                                            className="block text-sm font-medium text-gray-500"
                                        >Location</label
                                        >
                                        <Input
                                            className="text-foreground font-medium text-lg w-full"
                                            defaultValue={result?.tender?.location}
                                            readOnly
                                        />
                                    </span>
                                </div>

                                <div className="flex justify-between gap-x-4 w-full">
                                    <span className="w-1/2">
                                        <label
                                            htmlFor="title"
                                            className="block text-sm font-medium text-gray-500"
                                        >Start date</label
                                        >
                                        <Input
                                            className="text-foreground font-medium text-lg w-full"
                                            defaultValue={new Date(
                                                result?.tender?.startDate
                                            ).toDateString()}
                                            readOnly
                                        />
                                    </span>
                                    <span className="w-1/2">
                                        <label
                                            htmlFor="title"
                                            className="block text-sm font-medium text-gray-500"
                                        >End date</label
                                        >
                                        <Input
                                            className="text-foreground font-medium text-lg w-full"
                                            defaultValue={new Date(
                                                result?.tender?.endDate
                                            ).toDateString()}
                                            readOnly
                                        />
                                    </span>
                                </div>

                                <div className="flex justify-between gap-x-4 w-full">
                                    <span className="w-1/2">
                                        <label
                                            htmlFor="title"
                                            className="block text-sm font-medium text-gray-500 pb-2"
                                        >Status</label
                                        >
                                        {
                                            result?.tender?.status === "pending" ? (
                                                <Badge className="bg-gray-500 hover:bg-gray-500 px-4 text-[14px] text-slate-200">
                                                    {result?.tender?.status}
                                                </Badge>
                                            ) : result?.tender?.status === "sent" ? (
                                                <Badge className="bg-primary hover:bg-primary px-4 text-[14px] text-slate-200">
                                                    {result?.tender?.status}
                                                </Badge>
                                            ) : result?.tender?.status === "expired" ? (
                                                <Badge className="bg-red-600 hover:bg-red-600 px-4 text-[14px] text-slate-200">
                                                    {result?.tender?.status}
                                                </Badge>
                                            ) : result?.tender?.status === "open" ? (
                                                <Badge className="bg-green-600 hover:bg-green-600 px-4 text-[14px] text-slate-200">
                                                    {result?.tender?.status}
                                                </Badge>
                                            ) : (
                                                <Badge className="bg-gray-500 hover:bg-gray-500 px-4 text-[14px] text-slate-200">
                                                    {result?.tender?.status}
                                                </Badge>
                                            )
                                        }
                                    </span>
                                    <span className="w-1/2">
                                        <label
                                            htmlFor="title"
                                            className="block text-sm font-medium text-gray-500"
                                        >Last updated</label
                                        >
                                        <Input
                                            className="text-foreground font-medium text-lg w-full"
                                            defaultValue={new Date(
                                                result?.tender?.lastUpdatedDate
                                            ).toDateString()}
                                            readOnly
                                        />
                                    </span>
                                </div>
                            </div>

                            <h2 className="font-semibold">Description</h2>
                            <div className="flex flex-col">
                                <div className="flex justify-between gap-x-4 w-full">
                                    <span className="w-full">
                                        <Textarea
                                            className="text-foreground font-regular text-md w-full border-0 ring-transparent shadow-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                            defaultValue={result?.tender?.description}
                                            rows={8}
                                            readOnly
                                        />
                                    </span>
                                </div>
                            </div>

                            <h2 className="font-semibold">Items</h2>
                            <ItemListComponent data={result?.tender?.items} />
                            
                            <h2 className="font-semibold">Files</h2>
                            <FilesListComponenet data={result?.tender?.files} />
                        </div>
                        <div
                            className="flex flex-col justify-between w-2/5 bg-white dark:bg-background-color rounded-xl p-6"
                        >
                            <div className="w-full h-[85]">
                                <h2 className="font-bold pb-4">Bidding recepients</h2>
                                <div className="w-full relative overflow-y-auto h-[95%]">
                                    {
                                        result?.recipientsWithDetails.map((item, idx) => (
                                            <div className="flex flex-col" key={idx}>
                                                <p className="text-sm font-medium py-1">
                                                    {item?.companyName}
                                                </p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="w-full flex max-h-[15] justify-end space-x-4">
                                <Button
                                    size="sm"
                                    className="flex px-12 flex-end"
                                    onClick={editTenderHandler}
                                    disabled={(result?.tender?.status !== "pending" && true) || loading}>
                                    Edit
                                </Button>
                                <Button
                                    size="sm"
                                    className="flex px-12 bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:text-white dark:hover:bg-green-700 flex-end"
                                    onClick={sendTenderHandler}
                                    disabled={(result?.tender?.status !== "pending" && true) || loading}>
                                    {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                                    Send
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

import React, { useState } from 'react';
import { Button } from './button';
import { Input } from './input';
import { SelectionSwitch } from './selection-switch';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from './sheet';
import { Textarea } from './text-area';

export function BidFormSheet() {
    const [items, setItems] = useState([{ name: '', unit: '', cost: '' }]);
    const [files, setFiles] = useState(['']);

    const handleAddItem = () => {
        setItems([...items, { name: '', unit: '', cost: '' }]);
    };

    const handleItemChange = (index, event) => {
        const { name, value } = event.target;
        const updatedItems = [...items];
        updatedItems[index][name] = value;
        setItems(updatedItems);
    };

    const handleAddFile = () => {
        setFiles([...files, '']);
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size="sm" className="bg-primary">Create new tender</Button>
            </SheetTrigger>
            <SheetContent side="right">
                <SheetHeader>
                    <SheetTitle>Add new tender</SheetTitle>
                    <SheetDescription>
                        Fill out the bid details correctly and save
                    </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-4 py-4">
                    
                    <span className="w-full space-y-1">
                        <label className="text-xs text-muted-foreground" htmlFor="title">Title</label>
                        <Input type="text" name="title" placeholder="Bid title" className="border text-xs text-muted-foreground" />
                    </span>
                    <span className="w-full space-y-1">
                        <label className="text-xs text-muted-foreground" htmlFor="description">Description</label>
                        <Textarea name="description" placeholder="Write a simple description of this bid" className="text-xs border text-muted-foreground  focus-visible:ring-0" />
                    </span>
                    <span className="w-full space-y-1">
                        <label className="text-xs text-muted-foreground" htmlFor="location">Location</label>
                        <Input name="location" placeholder="Project location" className="text-xs border text-muted-foreground" />
                    </span>
                    
                    
                    <div className="flex w-full justify-between space-x-4">
                        <span className="w-1/2 space-y-1">
                            <label className="text-xs text-muted-foreground" htmlFor="start-date">Start date</label>
                            <Input type="date" name="start-date" placeholder="Start date" className="border text-xs text-muted-foreground" />
                        </span>
                        <span className="w-1/2 space-y-1">
                            <label className="text-xs text-muted-foreground" htmlFor="end-date">End date</label>
                            <Input type="date" name="end-date" placeholder="End date" className="border text-xs text-muted-foreground" />
                        </span>
                    </div>
                    <div className="w-full">
                        <label className="text-xs text-muted-foreground" htmlFor="items">Items</label>
                        {items.map((item, index) => (
                            <div key={index} className="flex justify-betweeen my-2 space-x-4">
                                <Input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={item.name}
                                    onChange={(e) => handleItemChange(index, e)}
                                    className="item border text-xs text-muted-foreground"
                                />
                                <Input
                                    type="number"
                                    name="unit"
                                    placeholder="Unit"
                                    value={item.unit}
                                    onChange={(e) => handleItemChange(index, e)}
                                    className="item border text-xs text-muted-foreground"
                                />
                                <Input
                                    type="text"
                                    name="cost"
                                    placeholder="Cost"
                                    value={item.cost}
                                    onChange={(e) => handleItemChange(index, e)}
                                    className="item border text-xs text-muted-foreground"
                                />
                            </div>
                        ))}
                        <Button
                            variant="outline"
                            className="flex justify-end self-end float-end mt-2 text-[10px] text-muted-foreground"
                            size="sm"
                            onClick={handleAddItem}
                        >
                            + Add more
                        </Button>
                    </div>
                    <div className="w-full space-y-2">
                        <label className="text-xs text-muted-foreground" htmlFor="items">Supporting documents</label>
                        {files.map((file, index) => (
                            <div key={index} className="flex flex-col text-muted-foreground">
                                <span className="w-full">
                                    <Input type="file" name={`file${index}`} className="text-xs border text-muted-foreground" />
                                </span>
                            </div>
                        ))}
                        <Button
                            variant="outline"
                            className="flex justify-end self-end float-end mt-2 text-[10px] text-muted-foreground"
                            size="sm"
                            onClick={handleAddFile}
                        >
                            + Add more
                        </Button>
                    </div>
                    <div className="w-full space-y-2">
                        <label className="text-xs text-muted-foreground font-bold" htmlFor="items">Enable  document upload</label>
                        <div className="flex justify-betweeen gap-4 flex-wrap text-muted-foreground">
                            <div className="flex items-center space-x-2">
                                <SelectionSwitch id="airplane-mode" checked/>
                                <label htmlFor="airplane-mode" className="text-sm">NUPRC and NCDMB certificate</label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <SelectionSwitch id="airplane-mode" />
                                <label htmlFor="airplane-mode" className="text-sm">Other documents</label>
                            </div>

                        </div>
                    </div>
                </div>
                <SheetFooter className="pt-8 flex flex-col">
                    <SheetClose asChild>
                        <Button type="submit" size="sm">Save changes</Button>
                    </SheetClose>
                </SheetFooter>
                <p className="text-xs mt-4 text-muted-foreground">This tender will be saved to draft until you choose to publish. You can't send out an un-published tender.</p>
            </SheetContent>
        </Sheet>
    )
}

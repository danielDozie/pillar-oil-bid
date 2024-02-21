import * as React from "react"
import {
    CaretSortIcon,
    ChevronDownIcon,
    DotsHorizontalIcon,
} from "@radix-ui/react-icons"
import {
    type ColumnDef,
    type ColumnFiltersState,
    type SortingState,
    type VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/react/button"
import { Checkbox } from "@/components/ui/react/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/react/dropdown-menu"
import { Input } from "@/components/ui/react/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/react/table"

const data: Payment[] = [
    {
        id: "m5gr84i9",
        title: "Payment 1",
        status: "open",
        location: "Location 1",
        start_date: "2022-10-01",
        end_date: "2022-10-31",
    },
    {
        id: "3u1reuv4",
        title: "Payment 2",
        status: "closed",
        location: "Location 2",
        start_date: "2022-11-01",
        end_date: "2022-11-30",
    },
    {
        id: "derv1ws0",
        title: "Payment 3",
        status: "draft",
        location: "Location 3",
        start_date: "2022-12-01",
        end_date: "2022-12-31",
    },
    {
        id: "5kma53ae",
        title: "Payment 4",
        status: "closed",
        location: "Location 4",
        start_date: "2023-01-01",
        end_date: "2023-01-31",
    },
    {
        id: "bhqecj4p",
        title: "Payment 5",
        status: "closed",
        location: "Location 5",
        start_date: "2023-02-01",
        end_date: "2023-02-28",
    },
    {
        id: "jdhf84s",
        title: "Payment 6",
        status: "closed",
        location: "Location 6",
        start_date: "2023-03-01",
        end_date: "2023-03-31",
    },
    {
        id: "skfj29d",
        title: "Payment 7",
        status: "draft",
        location: "Location 7",
        start_date: "2023-04-01",
        end_date: "2023-04-30",
    },
    {
        id: "pqls93r",
        title: "Payment 8",
        status: "draft",
        location: "Location 8",
        start_date: "2023-05-01",
        end_date: "2023-05-31",
    },
    {
        id: "wqer21d",
        title: "Payment 9",
        status: "closed",
        location: "Location 9",
        start_date: "2023-06-01",
        end_date: "2023-06-30",
    },
    {
        id: "lqwe98r",
        title: "Payment 10",
        status: "closed",
        location: "Location 10",
        start_date: "2023-07-01",
        end_date: "2023-07-31",
    },
    {
        id: "zxcv76a",
        title: "Payment 11",
        status: "draft",
        location: "Location 11",
        start_date: "2023-08-01",
        end_date: "2023-08-31",
    },
    {
        id: "mnbv54s",
        title: "Payment 12",
        status: "draft",
        location: "Location 12",
        start_date: "2023-09-01",
        end_date: "2023-09-30",
    },
    {
        id: "poiuy76d",
        title: "Payment 13",
        status: "closed",
        location: "Location 13",
        start_date: "2023-10-01",
        end_date: "2023-10-31",
    },
    {
        id: "qwer12f",
        title: "Payment 14",
        status: "closed",
        location: "Location 14",
        start_date: "2023-11-01",
        end_date: "2023-11-30",
    },
    {
        id: "asdf98h",
        title: "Payment 15",
        status: "closed",
        location: "Location 15",
        start_date: "2023-12-01",
        end_date: "2023-12-31",
    },
]

export type Payment = {
    id: string
    title: string
    status: "open" | "closed" | "draft"
    location: string
    start_date: string
    end_date: string
}

export const columns: ColumnDef<Payment>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() ? "indeterminate" : false)
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: "Id",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("id")}</div>
        ),
    },
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("title")}</div>
        ),
    },
    {
        accessorKey: "location",
        header: "Location",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("location")}</div>
        ),
    },
    {
        accessorKey: "start_date",
        header: "Start date",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("start_date")}</div>
        ),
    },
    {
        accessorKey: "end_date",
        header: "End date",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("end_date")}</div>
        ),
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Status
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("status")}</div>,
    },
    {
        id: "actions",
        enableHiding: false,
        header: () => <div className="text-right">Action</div>,
        cell: ({ row }) => {
            const payment = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild className="float-right">
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <DotsHorizontalIcon className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(payment.id)}
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

export function DataTable() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter emails..."
                    value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("email")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm bg-white dark:bg-deep-blue"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto bg-white dark:bg-deep-blue text-foreground border-0">
                            Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize dark:bg-unset"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border dark:border-primary">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="dark:bg-foreground"
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="dark:bg-foreground"
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}

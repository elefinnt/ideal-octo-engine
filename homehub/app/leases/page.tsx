"use client";
import { useState } from "react";
import { Search, Plus, ChevronDown, ChevronUp, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Lease = {
  id: number;
  tenant: string;
  property: string;
  unit: string;
  startDate: string;
  endDate: string;
  rent: number;
  status: "Active" | "Expiring Soon" | "Expired";
};

const leases: Lease[] = [
  {
    id: 1,
    tenant: "Alice Johnson",
    property: "Sunset Apartments",
    unit: "4B",
    startDate: "2023-01-01",
    endDate: "2024-01-01",
    rent: 1200,
    status: "Active",
  },
  {
    id: 2,
    tenant: "Bob Smith",
    property: "Oakwood Residences",
    unit: "2A",
    startDate: "2023-03-15",
    endDate: "2024-03-15",
    rent: 1500,
    status: "Active",
  },
  {
    id: 3,
    tenant: "Charlie Brown",
    property: "Riverfront Condos",
    unit: "3C",
    startDate: "2022-11-01",
    endDate: "2023-11-01",
    rent: 1800,
    status: "Expiring Soon",
  },
  {
    id: 4,
    tenant: "Diana Ross",
    property: "Pine Street Houses",
    unit: "1D",
    startDate: "2023-06-01",
    endDate: "2024-06-01",
    rent: 2000,
    status: "Active",
  },
  {
    id: 5,
    tenant: "Edward Norton",
    property: "Sunset Apartments",
    unit: "5A",
    startDate: "2022-09-01",
    endDate: "2023-09-01",
    rent: 1300,
    status: "Expired",
  },
];

export default function LeasesScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<keyof Lease>("startDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [filterStatus, setFilterStatus] = useState<Lease["status"] | "All">(
    "All"
  );
  const [isAddLeaseOpen, setIsAddLeaseOpen] = useState(false);

  const filteredAndSortedLeases = leases
    .filter(
      (lease) =>
        (filterStatus === "All" || lease.status === filterStatus) &&
        (lease.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lease.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lease.unit.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (a[sortColumn] < b[sortColumn])
        return sortDirection === "asc" ? -1 : 1;
      if (a[sortColumn] > b[sortColumn])
        return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

  const handleSort = (column: keyof Lease) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Leases Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Search leases"
                  className="pl-8 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <Select
                  value={filterStatus}
                  onValueChange={(value: Lease["status"] | "All") =>
                    setFilterStatus(value)
                  }
                >
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Statuses</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Expiring Soon">Expiring Soon</SelectItem>
                    <SelectItem value="Expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
                <Dialog open={isAddLeaseOpen} onOpenChange={setIsAddLeaseOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" /> Add Lease
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Lease</DialogTitle>
                      <DialogDescription>
                        Enter the details for the new lease agreement.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="tenant" className="text-right">
                          Tenant
                        </Label>
                        <Input id="tenant" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="property" className="text-right">
                          Property
                        </Label>
                        <Input id="property" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="unit" className="text-right">
                          Unit
                        </Label>
                        <Input id="unit" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="startDate" className="text-right">
                          Start Date
                        </Label>
                        <Input
                          id="startDate"
                          type="date"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="endDate" className="text-right">
                          End Date
                        </Label>
                        <Input
                          id="endDate"
                          type="date"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="rent" className="text-right">
                          Rent
                        </Label>
                        <Input id="rent" type="number" className="col-span-3" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Add Lease</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort("tenant")}
                    >
                      Tenant
                      {sortColumn === "tenant" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="inline ml-1" />
                        ) : (
                          <ChevronDown className="inline ml-1" />
                        ))}
                    </TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort("property")}
                    >
                      Property
                      {sortColumn === "property" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="inline ml-1" />
                        ) : (
                          <ChevronDown className="inline ml-1" />
                        ))}
                    </TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort("startDate")}
                    >
                      Start Date
                      {sortColumn === "startDate" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="inline ml-1" />
                        ) : (
                          <ChevronDown className="inline ml-1" />
                        ))}
                    </TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort("endDate")}
                    >
                      End Date
                      {sortColumn === "endDate" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="inline ml-1" />
                        ) : (
                          <ChevronDown className="inline ml-1" />
                        ))}
                    </TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort("rent")}
                    >
                      Rent
                      {sortColumn === "rent" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="inline ml-1" />
                        ) : (
                          <ChevronDown className="inline ml-1" />
                        ))}
                    </TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort("status")}
                    >
                      Status
                      {sortColumn === "status" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="inline ml-1" />
                        ) : (
                          <ChevronDown className="inline ml-1" />
                        ))}
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAndSortedLeases.map((lease) => (
                    <TableRow key={lease.id}>
                      <TableCell className="font-medium">
                        {lease.tenant}
                      </TableCell>
                      <TableCell>{lease.property}</TableCell>
                      <TableCell>{lease.unit}</TableCell>
                      <TableCell>{lease.startDate}</TableCell>
                      <TableCell>{lease.endDate}</TableCell>
                      <TableCell>${lease.rent}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            lease.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : lease.status === "Expiring Soon"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {lease.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <Filter className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View details</DropdownMenuItem>
                            <DropdownMenuItem>Edit lease</DropdownMenuItem>
                            <DropdownMenuItem>Renew lease</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              Terminate lease
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

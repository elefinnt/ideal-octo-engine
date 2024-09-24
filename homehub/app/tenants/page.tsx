"use client";

import { useState } from "react";
import { Bell, Menu, Search, MoreVertical, Plus } from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const tenants = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    property: "Sunset Apartments",
    unit: "4B",
    status: "Active",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    property: "Oakwood Residences",
    unit: "2A",
    status: "Active",
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    property: "Riverfront Condos",
    unit: "3C",
    status: "Late Payment",
  },
  {
    id: 4,
    name: "Diana Ross",
    email: "diana@example.com",
    property: "Pine Street Houses",
    unit: "1D",
    status: "Active",
  },
  {
    id: 5,
    name: "Edward Norton",
    email: "edward@example.com",
    property: "Sunset Apartments",
    unit: "5A",
    status: "Moving Out",
  },
];

export default function TenantsScreen() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTenants = tenants.filter(
    (tenant) =>
      tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.unit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="md:hidden mr-2">
              <Menu className="h-6 w-6" />
            </Button>
            <h1 className="text-2xl font-semibold text-gray-800">Tenants</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarImage
                src="/placeholder.svg?height=32&width=32"
                alt="User"
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Tenants Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <div className="mb-6 flex justify-between items-center">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Search tenants"
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Tenant
              </Button>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Property</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTenants.map((tenant) => (
                    <TableRow key={tenant.id}>
                      <TableCell className="font-medium">
                        {tenant.name}
                      </TableCell>
                      <TableCell>{tenant.email}</TableCell>
                      <TableCell>{tenant.property}</TableCell>
                      <TableCell>{tenant.unit}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            tenant.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : tenant.status === "Late Payment"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {tenant.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View details</DropdownMenuItem>
                            <DropdownMenuItem>Edit tenant</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              Remove tenant
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

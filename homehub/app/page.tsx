import { Bell, Users, FileText, Settings, Menu, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Dashboard() {
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
            <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
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
              <AvatarFallback>FH</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            {/* Stats */}
            <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Properties
                  </CardTitle>
                  <Home className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">
                    +2 from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Occupancy Rate
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">92%</div>
                  <p className="text-xs text-muted-foreground">
                    +3% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Revenue
                  </CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$54,231</div>
                  <p className="text-xs text-muted-foreground">
                    +8% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Maintenance Requests
                  </CardTitle>
                  <Settings className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7</div>
                  <p className="text-xs text-muted-foreground">
                    -2 from last week
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activities and Properties */}
            <div className="grid gap-6 mb-8 md:grid-cols-2">
              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {[
                      "New tenant moved in - Apt 4B",
                      "Maintenance request resolved - Apt 2A",
                      "Rent payment received - Apt 3C",
                      "Lease renewal - Apt 1D",
                    ].map((activity, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-800">{activity}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Properties Grid */}
              <Card>
                <CardHeader>
                  <CardTitle>Properties Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      "Sunset Apartments",
                      "Oakwood Residences",
                      "Riverfront Condos",
                      "Pine Street Houses",
                    ].map((property, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-800">
                          {property}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Units: {Math.floor(Math.random() * 20) + 5}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

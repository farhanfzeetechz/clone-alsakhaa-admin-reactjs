import React from "react";
import { Route } from "react-router-dom";
import Allusers from "./Users/Allusers";
import Subcontractor from "./Users/Subcontractor";
import BlockedUser from "./Users/BlockedUser";
import Customer from "./Users/Customer";
import ProjectManager from "./Users/ProjectManager";


const DashboardRoute = React.lazy(() => import('./views/Dashboard/Dashboard'));

const Routes = [
    // Dashboard
    {
        path: "/dashboard",
        name: "Dashboard",
        element: DashboardRoute,
    },
    // Users
    { path: "/users", name: "Users", element: Allusers, },
    { path: "/subcontractor", name: "Subcontractor", element: Subcontractor },
    { path: "/customers", name: "Customer", element: Customer },
    { path: '/blocked-Users', name: 'Blocked Users', element: BlockedUser },
    { path: '/project-managers', name: 'Project Manager', element: ProjectManager },

];
export default Routes;
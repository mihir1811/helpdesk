import { FaHouseUser, FaAdn, FaList, FaAngleRight } from "react-icons/fa";

export const adminSidebarData = [
    {
        name: 'Dashboard',
        id: 'dashboard',
        // icon: FaHouseUser,
        nestedItem: [],
        route: '/'
    },
    // {
    //     name: 'Driver Management',
    //     id: 'drivermanagement',
    //     icon: FaList,
    //     route: null,
    //     nestedItem: [
    //         {
    //             name: 'Add New Driver',
    //             id: 'addnewdriver',
    //             icon: FaAngleRight,
    //             route: '/add-new-driver'
    //         },
    //         {
    //             name: 'View Driver List',
    //             id: 'viewdriverlist',
    //             icon: FaAngleRight,
    //             route: '/view-driver-list'
    //         },
    //         {
    //             name: 'Kyc Pending Driver List',
    //             id: 'kycpendingdriverlist',
    //             icon: FaAngleRight,
    //             route: '/kyc-pending'

    //         },
    //         {
    //             name: 'Online Driver',
    //             id: 'onlinedriver',
    //             icon: FaAngleRight,
    //             route: '/online-driver'
    //         }
    //     ]
    // }
    {
        name: 'Manage Admin',
        id: 'manageAdmin',
        // icon: FaHouseUser,
        nestedItem: [],
        route: '/manage-admin' 
    },
    {
        name: 'Manage User',
        id: 'manageUser',
        // icon: FaHouseUser,
        nestedItem: [],
        route: '/manage-user' 
    },
    {
        name: 'Manage Helpdesk',
        id: 'manageHelpdesk',
        // icon: FaHouseUser,
        nestedItem: [],
        route: '/manage-helpdesk' 
    },
    {
        name: 'Message',
        id: 'message',
        // icon: FaHouseUser,
        nestedItem: [],
        route: '/message' 
    },
    {
        name: 'Manage Profile',
        id: 'manageProfile',
        // icon: FaHouseUser,
        nestedItem: [],
        route: '/profile' 
    },
];


export const sideBarData = [
    {
        name: 'Message',
        id: 'message',
        // icon: FaHouseUser,
        nestedItem: [],
        route: '/message' 
    },
    {
        name: 'Manage Profile',
        id: 'manageProfile',
        // icon: FaHouseUser,
        nestedItem: [],
        route: '/profile' 
    },
]
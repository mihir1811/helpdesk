// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import APIInstance from "../API";
// import DriverListTable from "../component/DriverListTable";

// const dummyData = [
//   {
//       "_id": "65e019a2d7c6b6fe95a8a069",
//       "name": "abhi kumar",
//       "fatherName": "kk",
//       "currentAddress": "new delhi",
//       "permanentAddress": "",
//       "mobileNumber": "8882962776",
//       "email": "ranjan@webbraininfotech.com",
//       "drivingLicense": "drivingLicense-1709185404888.png",
//       "panCard": "panCard-1709185414505.png",
//       "aadharCard": "aadharCard-1709185424711.png",
//       "bankBranch": "new delhi",
//       "bankName": "Testing",
//       "beneficiaryName": "ranjan",
//       "accountNumber": "12456789101234",
//       "ifscCode": "test1234",
//       "securityDeposit": 5999,
//       "securityDepositCheque": "securityDepositCheque-1709185434193.png",
//       "accountVerificationByAdmin": false,
//       "emergencyContact": {
//           "name": "Raju",
//           "address": "hasanpur",
//           "mobileNumber": "8882962776",
//           "relationship": "wkw"
//       },
//       "createdAt": "2024-02-29T05:44:02.182Z",
//       "updatedAt": "2024-02-29T05:44:02.182Z",
//       "__v": 0
//   },
//   {
//       "_id": "65e019a2d7c6b6fe95a8a069",
//       "name": "bablu kumar",
//       "fatherName": "kk",
//       "currentAddress": "new delhi",
//       "permanentAddress": "",
//       "mobileNumber": "8882962776",
//       "email": "ranjan@webbraininfotech.com",
//       "drivingLicense": "drivingLicense-1709185404888.png",
//       "panCard": "panCard-1709185414505.png",
//       "aadharCard": "aadharCard-1709185424711.png",
//       "bankBranch": "new delhi",
//       "bankName": "Testing",
//       "beneficiaryName": "ranjan",
//       "accountNumber": "12456789101234",
//       "ifscCode": "test1234",
//       "securityDeposit": 5999,
//       "securityDepositCheque": "securityDepositCheque-1709185434193.png",
//       "accountVerificationByAdmin": false,
//       "emergencyContact": {
//           "name": "Raju",
//           "address": "hasanpur",
//           "mobileNumber": "8882962776",
//           "relationship": "wkw"
//       },
//       "createdAt": "2024-02-29T05:44:02.182Z",
//       "updatedAt": "2024-02-29T05:44:02.182Z",
//       "__v": 0
//   },
//   {
//       "_id": "65e019a2d7c6b6fe95a8a069",
//       "name": "shyam kumar",
//       "fatherName": "kk",
//       "currentAddress": "new delhi",
//       "permanentAddress": "",
//       "mobileNumber": "8882962776",
//       "email": "ranjan@webbraininfotech.com",
//       "drivingLicense": "drivingLicense-1709185404888.png",
//       "panCard": "panCard-1709185414505.png",
//       "aadharCard": "aadharCard-1709185424711.png",
//       "bankBranch": "new delhi",
//       "bankName": "Testing",
//       "beneficiaryName": "ranjan",
//       "accountNumber": "12456789101234",
//       "ifscCode": "test1234",
//       "securityDeposit": 5999,
//       "securityDepositCheque": "securityDepositCheque-1709185434193.png",
//       "accountVerificationByAdmin": false,
//       "emergencyContact": {
//           "name": "Raju",
//           "address": "hasanpur",
//           "mobileNumber": "8882962776",
//           "relationship": "wkw"
//       },
//       "createdAt": "2024-02-29T05:44:02.182Z",
//       "updatedAt": "2024-02-29T05:44:02.182Z",
//       "__v": 0
//   },
//   {
//       "_id": "65e019a2d7c6b6fe95a8a069",
//       "name": "krishna kumar",
//       "fatherName": "kk",
//       "currentAddress": "new delhi",
//       "permanentAddress": "",
//       "mobileNumber": "8882962776",
//       "email": "ranjan@webbraininfotech.com",
//       "drivingLicense": "drivingLicense-1709185404888.png",
//       "panCard": "panCard-1709185414505.png",
//       "aadharCard": "aadharCard-1709185424711.png",
//       "bankBranch": "new delhi",
//       "bankName": "Testing",
//       "beneficiaryName": "ranjan",
//       "accountNumber": "12456789101234",
//       "ifscCode": "test1234",
//       "securityDeposit": 5999,
//       "securityDepositCheque": "securityDepositCheque-1709185434193.png",
//       "accountVerificationByAdmin": false,
//       "emergencyContact": {
//           "name": "Raju",
//           "address": "hasanpur",
//           "mobileNumber": "8882962776",
//           "relationship": "wkw"
//       },
//       "createdAt": "2024-02-29T05:44:02.182Z",
//       "updatedAt": "2024-02-29T05:44:02.182Z",
//       "__v": 0
//   },
//   {
//       "_id": "65e019a2d7c6b6fe95a8a069",
//       "name": "rocky kumar",
//       "fatherName": "kk",
//       "currentAddress": "new delhi",
//       "permanentAddress": "",
//       "mobileNumber": "8882962776",
//       "email": "ranjan@webbraininfotech.com",
//       "drivingLicense": "drivingLicense-1709185404888.png",
//       "panCard": "panCard-1709185414505.png",
//       "aadharCard": "aadharCard-1709185424711.png",
//       "bankBranch": "new delhi",
//       "bankName": "Testing",
//       "beneficiaryName": "ranjan",
//       "accountNumber": "12456789101234",
//       "ifscCode": "test1234",
//       "securityDeposit": 5999,
//       "securityDepositCheque": "securityDepositCheque-1709185434193.png",
//       "accountVerificationByAdmin": false,
//       "emergencyContact": {
//           "name": "Raju",
//           "address": "hasanpur",
//           "mobileNumber": "8882962776",
//           "relationship": "wkw"
//       },
//       "createdAt": "2024-02-29T05:44:02.182Z",
//       "updatedAt": "2024-02-29T05:44:02.182Z",
//       "__v": 0
//   },
//   {
//       "_id": "65e019a2d7c6b6fe95a8a069",
//       "name": "max kumar",
//       "fatherName": "kk",
//       "currentAddress": "new delhi",
//       "permanentAddress": "",
//       "mobileNumber": "8882962776",
//       "email": "ranjan@webbraininfotech.com",
//       "drivingLicense": "drivingLicense-1709185404888.png",
//       "panCard": "panCard-1709185414505.png",
//       "aadharCard": "aadharCard-1709185424711.png",
//       "bankBranch": "new delhi",
//       "bankName": "Testing",
//       "beneficiaryName": "ranjan",
//       "accountNumber": "12456789101234",
//       "ifscCode": "test1234",
//       "securityDeposit": 5999,
//       "securityDepositCheque": "securityDepositCheque-1709185434193.png",
//       "accountVerificationByAdmin": false,
//       "emergencyContact": {
//           "name": "Raju",
//           "address": "hasanpur",
//           "mobileNumber": "8882962776",
//           "relationship": "wkw"
//       },
//       "createdAt": "2024-02-29T05:44:02.182Z",
//       "updatedAt": "2024-02-29T05:44:02.182Z",
//       "__v": 0
//   },
//   {
//       "_id": "65e019a2d7c6b6fe95a8a069",
//       "name": "jayesh kumar",
//       "fatherName": "kk",
//       "currentAddress": "new delhi",
//       "permanentAddress": "",
//       "mobileNumber": "8882962776",
//       "email": "ranjan@webbraininfotech.com",
//       "drivingLicense": "drivingLicense-1709185404888.png",
//       "panCard": "panCard-1709185414505.png",
//       "aadharCard": "aadharCard-1709185424711.png",
//       "bankBranch": "new delhi",
//       "bankName": "Testing",
//       "beneficiaryName": "ranjan",
//       "accountNumber": "12456789101234",
//       "ifscCode": "test1234",
//       "securityDeposit": 5999,
//       "securityDepositCheque": "securityDepositCheque-1709185434193.png",
//       "accountVerificationByAdmin": false,
//       "emergencyContact": {
//           "name": "Raju",
//           "address": "hasanpur",
//           "mobileNumber": "8882962776",
//           "relationship": "wkw"
//       },
//       "createdAt": "2024-02-29T05:44:02.182Z",
//       "updatedAt": "2024-02-29T05:44:02.182Z",
//       "__v": 0
//   },
//   {
//       "_id": "65e019a2d7c6b6fe95a8a069",
//       "name": "krish kumar",
//       "fatherName": "kk",
//       "currentAddress": "new delhi",
//       "permanentAddress": "",
//       "mobileNumber": "8882962776",
//       "email": "abhi@webbraininfotech.com",
//       "drivingLicense": "drivingLicense-1709185404888.png",
//       "panCard": "panCard-1709185414505.png",
//       "aadharCard": "aadharCard-1709185424711.png",
//       "bankBranch": "new delhi",
//       "bankName": "Testing",
//       "beneficiaryName": "ranjan",
//       "accountNumber": "12456789101234",
//       "ifscCode": "test1234",
//       "securityDeposit": 5999,
//       "securityDepositCheque": "securityDepositCheque-1709185434193.png",
//       "accountVerificationByAdmin": false,
//       "emergencyContact": {
//           "name": "Raju",
//           "address": "hasanpur",
//           "mobileNumber": "8882962776",
//           "relationship": "wkw"
//       },
//       "createdAt": "2024-02-29T05:44:02.182Z",
//       "updatedAt": "2024-02-29T05:44:02.182Z",
//       "__v": 0
//   },
//   ]

// const DriverList = () => {
//   const [driverList, setDriverList] = useState([]);
//   const [sortedData, setSortedData] = useState([]);
//   const [sortConfig, setSortConfig] = useState({ sortBy: "", sortOrder: "" });

//   const FetchDriverList = async () => {
//     try {
//       // const authToken = localStorage.getItem("authtoken");
//       // const res = await axios.get("https://uvahan.com/api/admin/driverlist", {
//       //   headers: {
//       //     Authorization: `Bearer ${authToken}`,
//       //   },
//       // });

//       // setDriverList(res.data.data[0].data);
//       // setSortedData(res.data.data[0].data); // Initially set sorted data to fetched data
//       setDriverList(dummyData);
//       setSortedData(dummyData); // Initially set sorted data to fetched data
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     FetchDriverList();
//   }, []);

//   const handleSort = (sortBy, sortOrder) => {
//     const dataCopy = [...sortedData];

//     dataCopy.sort((a, b) => {
//       if (sortBy === "Driver Name") {
//         if (sortOrder === "ascending") {
//           return a.driverName.localeCompare(b.driverName);
//         } else {
//           return b.driverName.localeCompare(a.driverName);
//         }
//       } else if (sortBy === "Mobile Number") { // Add comparison logic for other columns
//         if (sortOrder === "ascending") {
//           return parseInt(a.mobileNo, 10) - parseInt(b.mobileNo, 10); // Sort numbers numerically
//         } else {
//           return parseInt(b.mobileNo, 10) - parseInt(a.mobileNo, 10);
//         }
//       }
//       // Add similar comparison logic for remaining columns based on their data types
//       return 0;
//     });

//     setSortConfig({ sortBy, sortOrder });
//     setSortedData(dataCopy);
//   };
//   const tableColumns = [
//     "Driver Name",
//     "Image",
//     "Mobile Number",
//     "Email Id",
//     "Current Address",
//     "Premenant Address",
//     "Status",
//     "Created Date",
//     "Actions",
//   ];

//   return (
//     <div className="bg-white border-rounded p-5">
//       <div className="tableHeader flex items-center justify-between my-3">
//         <div>Sorting fields</div>
//         <div>
//           Search :
//           <input
//             type="text"
//             style={{ border: "1px solid black", borderRadius: "3px" }}
//             className="border ml-3 h-8 px-2"
//           />
//         </div>
//       </div>
//       <DriverListTable
//         tableColumns={tableColumns}
//         sortedData={sortedData}
//         sortConfig={sortConfig}
//         onSort={handleSort} // Pass handleSort function as a prop
//       />
//     </div>
//   );
// };

// export default DriverList;


import React, { useState, useEffect } from 'react'; // Import necessary hooks
import DriverListTable from "../component/DriverListTable";
import ReactPaginate from 'react-paginate';


const pageSize = 10

const DriverList = () => {
  const [driverList, setDriverList] = useState([]); // State to store driver data
  const [sortedData, setSortedData] = useState([]); // State for sorted data
  const [sortConfig, setSortConfig] = useState({ column: null, order: 'asc' }); // State for sort configuration
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [pageSize, setPageSize] = useState(2); // Items per page

  useEffect(() => {
    // Simulate API call with dummy data
    const dummyData = [
      {
        id: 1,
        name: 'Alice',
        image: 'https://via.placeholder.com/150', // Placeholder image
        mobileNumber: '123-456-7890',
        email: 'alice@example.com',
        currentAddress: '123 Main St, Anytown, CA',
        permanentAddress: '456 Elm St, Anytown, CA',
        status: 'Active',
        createdAt: '2024-02-29',
        actions: 'Edit | Delete', // Placeholder for actions
      },
      {
        id: 2,
        name: 'raju',
        image: 'https://via.placeholder.com/150', // Placeholder image
        mobileNumber: '123-456-7890',
        email: 'raju@example.com',
        currentAddress: '123 Main St, Anytown, CA',
        permanentAddress: '456 Elm St, Anytown, CA',
        status: 'Active',
        createdAt: '2024-02-29',
        actions: 'Edit | Delete', // Placeholder for actions
      },
      {
        id: 3,
        name: 'max',
        image: 'https://via.placeholder.com/150', // Placeholder image
        mobileNumber: '123-456-7890',
        email: 'max@example.com',
        currentAddress: '123 Main St, Anytown, CA',
        permanentAddress: '456 Elm St, Anytown, CA',
        status: 'Active',
        createdAt: '2024-02-29',
        actions: 'Edit | Delete', // Placeholder for actions
      },
      // ... add more dummy data objects
    ];
    setDriverList(dummyData);

    // Sort data initially
    setSortedData(sortData(dummyData, sortConfig));
  }, []); // Run effect only once on component mount

  const sortData = (data, config) => {
    if (!config.column) return data; // No sorting required

    const sorted = [...data].sort((a, b) => {
      const valueA = a[config.column];
      const valueB = b[config.column];

      if (valueA < valueB) return config.order === 'asc' ? -1 : 1;
      if (valueA > valueB) return config.order === 'asc' ? 1 : -1;
      return 0; // Equal values, maintain order
    });

    return sorted;
  };

  const handleSort = (column) => {
    const newOrder = sortConfig.order === 'asc' ? 'desc' : 'asc';
    setSortConfig({ column, order: newOrder });
    setSortedData(sortData(driverList, { column, order: newOrder }));
    setCurrentPage(1); // Reset page to 1 after sorting
  };

  const handlePageChange = (data) => {
    setCurrentPage(data.selected + 1); // Convert index to page number
  };

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedData.slice(startIndex, endIndex);
  };

  const pageCount = Math.ceil(sortedData.length / pageSize);

  const tableColumns = [
    'name',
    'Image',
    'Mobile Number',
    'email',
    'Current Address',
    'Premenant Address',
    'Status',
    'Created Date',
    'Actions',
  ];

    const dateConverter = (dateString) => {
    // Implement date formatting logic here (e.g., using a library like moment.js)
    return dateString; // Placeholder for date formatting
  };

  return (
    <div>
      <h1>Driver List</h1>

      <DriverListTable
       tableColumns={tableColumns}
       sortedData={getPaginatedData()} // Pass paginated data to table
       sortConfig={sortConfig}
       onSort={handleSort}
       dateConverter={dateConverter}
       currentPage={currentPage}
       pageCount={pageCount}
      />

      {/* Pagination controls */}
      {pageCount > 0 && (
        <div className="pagination">
          <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={'pagination'}
            activeClassName={'active'}
          />


          <div className='flex items-center justify-between'>
            <div>text</div>
            <div>text</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriverList;
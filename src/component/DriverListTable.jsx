import React from "react";

const DriverListTable = (props) => {
  const { sortedData, sortConfig, onSort } = props; // Receive props from parent component

  const dateConverter = (date) => {
    const timestamp = Date.parse(date); // Use Date.parse for timestamp conversion
    const data = new Date(timestamp);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(data);
    return formattedDate;
  };

  const handleTableHeaderClick = (column) => {
    // Call the onSort function (passed as a prop) with the clicked column and sort order
    onSort(column, sortConfig.sortOrder === "ascending" ? "descending" : "ascending");
  };

  const tableColumns = [
    'name',
    'Image',
    'Mobile Number',
    'email',
    'Current Address',
    'premenantAddress',
    'Status',
    'Created Date',
    'Actions',
  ];
  const printColumns = (column)=>{
    switch (column) {
      case "name":
        return "Driver Name"
        break;
    
      case "Image":
        return "Driver Image"
        break;
    
      case "Mobile Number":
        return "Mobile Number"
        break;
    
      case "email":
        return "Email Id"
        break;
      case "Current Address":
        return "Current Address"
        break;
      case "Permanent Address":
        return "Permanent Address"
        break;
    
      default:
        return column
        break;
    }
  }

  return (
    <table className="w-full table-auto border dark:border-gray-700">
      <thead>
        <tr className="border-b text-gray-500 dark:text-gray-400">
          {/* {props.tableColumns.map((column, index) => (
            <th
              key={index}
              className={`px-4 py-2 border-r dark:border-gray-700 cursor-pointer`}
              onClick={() => handleTableHeaderClick(column)} // Add onClick handler
            >
              {column}
              {sortConfig.sortBy === column && ( // Display sort indicator (optional)
                sortConfig.sortOrder === "ascending" ? (
                  <button>▲</button>
                ) : (
                  <button>▼</button>
                )
              )}
            </th>
          ))} */}
          {props.tableColumns.map((column, index) => (
            <th key={index} onClick={() => handleTableHeaderClick(column)} className={`px-4 py-2 border-r dark:border-gray-700 cursor-pointer`}>
              {printColumns(column)}
              {/* Optionally display sort indicator based on sortConfig */}
              {sortConfig.sortBy === column && ( // Display sort indicator (optional)
                sortConfig.sortOrder === "asc" ? (
                  <button>▲</button>
                ) : (
                  <button>▼</button>
                )
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((driver, index) => (
          <tr
            key={index}
            className={`border-b ${index % 2 === 0 ? "bg-gray-100 dark:bg-gray-800" : ""}`}
          >
            <td className="px-2 py-1 border-r dark:border-gray-700 text-center">
              {driver.name}
            </td>
            <td className="px-2 py-1 border-r dark:border-gray-700 text-center">
              <img
                src="https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651_640.png"
                height={80}
                width={80}
                className="mx-auto"
              />
            </td>
            <td className="px-2 py-1 border-r dark:border-gray-700 text-center">
              {driver.mobileNumber}
            </td>
            <td className="px-2 py-1 border-r dark:border-gray-700 text-center">
              {driver.email}
            </td>
            <td className="px-2 py-1 border-r dark:border-gray-700 text-center">
              {driver.currentAddress}
            </td>
            <td className="px-2 py-1 border-r dark:border-gray-700 text-center">
              {driver.permanentAddress}
            </td>
            <td className="px-2 py-1 border-r dark:border-gray-700 text-center">
              {driver.status}
            </td>
            <td className="px-2 py-1 border-r dark:border-gray-700 text-center">
              {dateConverter(driver.createdAt)}
            </td>
            <td className="px-2 py-1 border-r dark:border-gray-700 text-center">
              View | Edit
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DriverListTable;
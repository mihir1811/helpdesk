import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import DebouncedInput from "./DebounceInput";


const USERS = 
[{
  "id": 1,
  "firstName": "Miguelita",
  "lastName": "Lindell",
  "email": "mlindell0@oaic.gov.au",
  "profile": "https://robohash.org/aliasnobisdolores.png?size=50x50&set=set1",
  "password": "kO9,'OXW5PRo("
}, {
  "id": 2,
  "firstName": "Tabby",
  "lastName": "Godier",
  "email": "tgodier1@merriam-webster.com",
  "profile": "https://robohash.org/atarchitectomolestiae.png?size=50x50&set=set1",
  "password": "wO0(o.LI$p/Ilm"
}, {
  "id": 3,
  "firstName": "Vail",
  "lastName": "Comsty",
  "email": "vcomsty2@salon.com",
  "profile": "https://robohash.org/fugiatutillo.png?size=50x50&set=set1",
  "password": "eH5_xs6?)~oNRch"
}, {
  "id": 4,
  "firstName": "Gabie",
  "lastName": "Langhorn",
  "email": "glanghorn3@chron.com",
  "profile": "https://robohash.org/istenonet.png?size=50x50&set=set1",
  "password": "eY7=nB*tYk@"
}, {
  "id": 5,
  "firstName": "Jammal",
  "lastName": "Barock",
  "email": "jbarock4@qq.com",
  "profile": "https://robohash.org/velitquisequi.png?size=50x50&set=set1",
  "password": "qY2|t|Ah}y"
}, {
  "id": 6,
  "firstName": "Alexa",
  "lastName": "Stedall",
  "email": "astedall5@github.com",
  "profile": "https://robohash.org/necessitatibusaperiamvoluptas.png?size=50x50&set=set1",
  "password": "uB0\"mBb`|jn"
}
]

const TanStackTable = (props) => {
  const columnHelper = createColumnHelper();
  const {users  , deleteUser , editUser} = props

console.log(props ,"Dfbfgbdfvdfs")

  const [data, setData] = useState(() => []);
  const [globalFilter, setGlobalFilter] = useState("");


  // const deleteUser = async (id) =>{
  //   console.log("delete user" , id)
  //   // deleteUser(id)
  // }


  useEffect(() => {
    setData(() => [...users]); // Update data using spread operator
  }, [users]); // Dependency array ensures update on users change

  const columns = [
    columnHelper.accessor("", {
      id: "S.No",
      cell: (info) => <span>{info.row.index + 1}</span>,
      header: "S.No",
    }),
    columnHelper.accessor("first_name", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "First Name",
    }),
    columnHelper.accessor("last_name", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Last Name",
    }),
    columnHelper.accessor("email", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "E-mail",
    }),
    columnHelper.accessor("action", {
      cell: (info) => <div>
          <span className="cursor-pointer" onClick={() => editUser(info.row.original)}>Edit</span> |&nbsp;
          <span className="cursor-pointer" onClick={() => deleteUser(info.row.original.id)}>Delete</span>
        </div>,
      header: "Actions",
    }),
    // ... Add profile column if needed (ensure image handling)
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });


  return (
    <div className="p-2 mx-auto text-white fill-gray-400">
      <div className="flex justify-between mb-2">
        <div className="w-full flex items-center gap-1">
          {/* <SearchIcon /> */}
          <DebouncedInput
            value={globalFilter ?? ""}
            onChange={(value) => setGlobalFilter(String(value))}
            className="p-2 bg-transparent text-black outline-none border-b-2 w-1/5 focus:w-1/4 duration-300 border-[#ffce47]-- border-black"
            placeholder="Search all columns..."
          />
        </div>
      </div>
      <table className="border border-gray-700 w-full text-left">
        <thead className="bg-[#ffce47]">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="capitalize px-3.5 py-2 text-black">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row, i) => (
              <tr
                key={row.id}
                className={`
                ${i % 2 === 0 ? "bg-gray-900" : "bg-gray-800"}
                `}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-3.5 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr className="text-center h-32 text-black">
              <td colSpan={12}>No Data Found!</td>
            </tr>
          )}
        </tbody>
      </table>
      {/* pagination */}
      <div className="flex items-center justify-end mt-2 gap-2 text-black">
        <button
          onClick={() => {
            table.previousPage();
          }}
          disabled={!table.getCanPreviousPage()}
          className="p-1 border border-gray-300 px-2 disabled:opacity-30"
        >
          {"<"}
        </button>
        <button
          onClick={() => {
            table.nextPage();
          }}
          disabled={!table.getCanNextPage()}
          className="p-1 border border-gray-300 px-2 disabled:opacity-30"
        >
          {">"}
        </button>

        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16 bg-transparent"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          className="p-2 bg-transparent "
        >
          {[10, 20, 30, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TanStackTable;
import React, { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import { Search, ChevronLeft, ChevronRight, ArrowUpDown, ArrowUp, ArrowDown, Filter, TrendingUp } from 'lucide-react';

const TanStackTableExample = () => {
  // Sample data
  const data = useMemo(() => [
    {
      schemeName: "Motilal Oswal Multi Cap Fund Reg Gr",
      launchDate: "18-06-2024",
      aum: 3886.21,
      expenseRatio: 1.87,
      oneYearRet: 24.58,
      threeYearRet: null,
      fiveYearRet: null,
      tenYearRet: null,
      sinceLaunchRet: 26.57
    },
    {
      schemeName: "WhiteOak Capital Multi Cap Fund Reg Gr",
      launchDate: "22-09-2023",
      aum: 2065.13,
      expenseRatio: 1.99,
      oneYearRet: 10.4,
      threeYearRet: null,
      fiveYearRet: null,
      tenYearRet: null,
      sinceLaunchRet: 23.06
    },
    {
      schemeName: "SBI Multicap Fund Reg Gr",
      launchDate: "05-03-2022",
      aum: 21724.53,
      expenseRatio: 1.67,
      oneYearRet: 8.44,
      threeYearRet: 17.08,
      fiveYearRet: null,
      tenYearRet: null,
      sinceLaunchRet: 16.34
    },
    {
      schemeName: "Axis Multicap Fund Reg Gr",
      launchDate: "05-12-2021",
      aum: 8256.00,
      expenseRatio: 1.78,
      oneYearRet: 6.12,
      threeYearRet: 21.57,
      fiveYearRet: null,
      tenYearRet: null,
      sinceLaunchRet: 16.68
    },
    {
      schemeName: "Invesco India Multi Cap Gr",
      launchDate: "17-03-2008",
      aum: 4182.05,
      expenseRatio: 1.89,
      oneYearRet: 4.16,
      threeYearRet: 19.36,
      fiveYearRet: 23.04,
      tenYearRet: 13.06,
      sinceLaunchRet: 15.79
    },
    {
      schemeName: "Nippon India Multi Cap Gr Gr",
      launchDate: "25-03-2005",
      aum: 45366.09,
      expenseRatio: 1.52,
      oneYearRet: 3.79,
      threeYearRet: 23.89,
      fiveYearRet: 30.93,
      tenYearRet: 14.13,
      sinceLaunchRet: 18.08
    },
    {
      schemeName: "HDFC Multi Cap Fund Reg Gr",
      launchDate: "15-01-2020",
      aum: 12500.75,
      expenseRatio: 1.65,
      oneYearRet: 15.32,
      threeYearRet: 18.45,
      fiveYearRet: null,
      tenYearRet: null,
      sinceLaunchRet: 17.89
    },
    {
      schemeName: "ICICI Prudential Multi Cap Fund Reg Gr",
      launchDate: "10-08-2019",
      aum: 9876.43,
      expenseRatio: 1.75,
      oneYearRet: 12.67,
      threeYearRet: 20.11,
      fiveYearRet: 25.33,
      tenYearRet: null,
      sinceLaunchRet: 19.45
    }
  ], []);

  const [globalFilter, setGlobalFilter] = useState('');

  // Column definitions with improved styling
  const columns = useMemo(() => [
    {
      accessorKey: 'schemeName',
      header: 'Scheme Name',
      cell: ({ getValue }) => (
        <div className="min-w-64">
          <span className="text-blue-700 hover:text-blue-900 hover:underline cursor-pointer font-semibold text-sm leading-tight">
            {getValue()}
          </span>
        </div>
      ),
    },
    {
      accessorKey: 'launchDate',
      header: 'Launch Date',
      cell: ({ getValue }) => (
        <span className="text-gray-700 text-sm whitespace-nowrap">{getValue()}</span>
      ),
    },
    {
      accessorKey: 'aum',
      header: 'AUM (₹Cr)',
      cell: ({ getValue }) => (
        <span className="font-semibold text-gray-800 text-sm whitespace-nowrap">
          {getValue()?.toLocaleString('en-IN') || '-'}
        </span>
      ),
    },
    {
      accessorKey: 'expenseRatio',
      header: 'Expense Ratio',
      cell: ({ getValue }) => (
        <span className="text-gray-700 text-sm">{getValue()?.toFixed(2)}%</span>
      ),
    },
    {
      accessorKey: 'oneYearRet',
      header: '1Y Return',
      cell: ({ getValue }) => {
        const value = getValue();
        if (value === null) return <span className="text-gray-400 text-sm">-</span>;
        return (
          <span className={`font-semibold text-sm ${value > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {value.toFixed(2)}%
          </span>
        );
      },
    },
    {
      accessorKey: 'threeYearRet',
      header: '3Y Return',
      cell: ({ getValue }) => {
        const value = getValue();
        if (value === null) return <span className="text-gray-400 text-sm">-</span>;
        return (
          <span className={`font-semibold text-sm ${value > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {value.toFixed(2)}%
          </span>
        );
      },
    },
    {
      accessorKey: 'fiveYearRet',
      header: '5Y Return',
      cell: ({ getValue }) => {
        const value = getValue();
        if (value === null) return <span className="text-gray-400 text-sm">-</span>;
        return (
          <span className={`font-semibold text-sm ${value > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {value.toFixed(2)}%
          </span>
        );
      },
    },
    {
      accessorKey: 'tenYearRet',
      header: '10Y Return',
      cell: ({ getValue }) => {
        const value = getValue();
        if (value === null) return <span className="text-gray-400 text-sm">-</span>;
        return (
          <span className={`font-semibold text-sm ${value > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {value.toFixed(2)}%
          </span>
        );
      },
    },
    {
      accessorKey: 'sinceLaunchRet',
      header: 'Since Launch',
      cell: ({ getValue }) => {
        const value = getValue();
        if (value === null) return <span className="text-gray-400 text-sm">-</span>;
        return (
          <span className={`font-bold text-sm ${value > 0 ? 'text-green-700' : 'text-red-700'}`}>
            {value.toFixed(2)}%
          </span>
        );
      },
    },
  ], []);

  // Initialize table
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: 'includesString',
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  const getSortIcon = (column) => {
    const sorted = column.getIsSorted();
    if (!sorted) return <ArrowUpDown className="w-3.5 h-3.5 text-gray-400 opacity-60" />;
    if (sorted === 'asc') return <ArrowUp className="w-3.5 h-3.5 text-blue-600" />;
    return <ArrowDown className="w-3.5 h-3.5 text-blue-600" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Mutual Fund Analytics</h1>
          </div>
          <p className="text-gray-600 text-sm sm:text-base">Compare and analyze multi-cap mutual fund performance</p>
        </div>

        {/* Filter Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold text-gray-800">Filters</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">Category</label>
              <select className="px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                <option>Equity: Multi Cap</option>
                <option>Equity: Large Cap</option>
                <option>Equity: Mid Cap</option>
              </select>
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">Period</label>
              <select className="px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                <option>1 Year</option>
                <option>3 Years</option>
                <option>5 Years</option>
              </select>
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select className="px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                <option>Returns (High to Low)</option>
                <option>AUM (High to Low)</option>
                <option>Expense Ratio (Low to High)</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button className="w-full px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium text-sm shadow-sm">
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Table Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Show</span>
              <select 
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={table.getState().pagination.pageSize}
                onChange={(e) => table.setPageSize(Number(e.target.value))}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span className="text-sm text-gray-600">entries</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="text-sm text-gray-600 whitespace-nowrap">Search:</span>
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="Search funds..."
                  value={globalFilter ?? ''}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="whitespace-nowrap">
                            {flexRender(header.column.columnDef.header, header.getContext())}
                          </span>
                          {header.column.getCanSort() && getSortIcon(header.column)}
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="divide-y divide-gray-100">
                {table.getRowModel().rows.map((row, index) => (
                  <tr 
                    key={row.id} 
                    className={`transition-colors hover:bg-blue-50/50 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                    }`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-4 whitespace-nowrap">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary Rows */}
          <div className="border-t-2 border-gray-200">
            <table className="w-full">
              <tbody>
                <tr className="bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-yellow-200">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                      <span className="text-sm font-semibold text-amber-800">Category Average</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">-</td>
                  <td className="px-4 py-3 text-sm text-gray-500">-</td>
                  <td className="px-4 py-3 text-sm font-semibold text-amber-700">2.87%</td>
                  <td className="px-4 py-3 text-sm font-semibold text-green-600">19.32%</td>
                  <td className="px-4 py-3 text-sm font-semibold text-green-600">23.99%</td>
                  <td className="px-4 py-3 text-sm font-semibold text-green-600">14.03%</td>
                  <td className="px-4 py-3 text-sm text-gray-500">-</td>
                  <td className="px-4 py-3 text-sm font-semibold text-green-700">14.36%</td>
                </tr>
                <tr className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span className="text-sm font-semibold text-blue-800">NIFTY 500 TRI</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">-</td>
                  <td className="px-4 py-3 text-sm text-gray-500">-</td>
                  <td className="px-4 py-3 text-sm font-semibold text-blue-700">0.32%</td>
                  <td className="px-4 py-3 text-sm font-semibold text-green-600">16.11%</td>
                  <td className="px-4 py-3 text-sm font-semibold text-green-600">21.04%</td>
                  <td className="px-4 py-3 text-sm font-semibold text-green-600">13.44%</td>
                  <td className="px-4 py-3 text-sm text-gray-500">-</td>
                  <td className="px-4 py-3 text-sm font-semibold text-green-700">12.43%</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-6 bg-gray-50 border-t border-gray-200">
            <div className="text-sm text-gray-600 order-2 sm:order-1">
              Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
              {Math.min(
                (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                table.getFilteredRowModel().rows.length
              )}{' '}
              of {table.getFilteredRowModel().rows.length} entries
            </div>

            <div className="flex items-center gap-2 order-1 sm:order-2">
              <button
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                First
              </button>
              
              <button
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 transition-colors"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous</span>
              </button>

              <span className="px-4 py-2 text-sm font-medium bg-blue-100 text-blue-700 rounded-lg">
                {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
              </span>

              <button
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 transition-colors"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              
              <button
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                Last
              </button>
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Why TanStack Table?</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: '🎨', title: 'Headless UI', desc: 'Complete styling freedom' },
              { icon: '🔒', title: 'TypeScript', desc: 'Built-in type safety' },
              { icon: '⚡', title: 'Performance', desc: 'Virtual scrolling ready' },
              { icon: '🚀', title: 'Feature Rich', desc: 'Everything you need' }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
                <div className="text-2xl mb-2">{feature.icon}</div>
                <div className="font-semibold text-blue-800 text-sm mb-1">{feature.title}</div>
                <div className="text-gray-600 text-xs">{feature.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TanStackTableExample;
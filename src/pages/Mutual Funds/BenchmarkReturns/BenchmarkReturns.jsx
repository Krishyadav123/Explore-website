import React, { useState, useMemo, useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import { Search, ChevronLeft, ChevronRight, ArrowUpDown, ArrowUp, ArrowDown, Filter, TrendingUp, Loader2 } from 'lucide-react';
import axios from 'axios';
import Footer from '@/component/Footer';
import Navbar from '@/component/Navbar';

const BenchmarkReturns = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [globalFilter, setGlobalFilter] = useState('');
  const [returnType, setReturnType] = useState('returns_cmp');
  const [selectedYear, setSelectedYear] = useState('1year');

  // Fetch data from API
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(
        `https://mfapi.advisorkhoj.com/getSchemeBenchmarkPerformance?key=e5485103-6f73-49a2-b45e-8008eefe38ba`,
        {
          timeout: 10000, // 10 second timeout
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        }
      );
      
      if (response.data.status === 200 && response.data.list) {
        setData(response.data.list);
      } else {
        setError('Failed to fetch data: ' + (response.data.msg || 'Unknown error'));
      }
    } catch (err) {
      if (err.code === 'ECONNABORTED') {
        setError('Request timeout - please try again');
      } else if (err.response) {
        setError(`Server error: ${err.response.status} - ${err.response.data?.msg || err.response.statusText}`);
      } else if (err.request) {
        setError('Network error - please check your internet connection');
      } else {
        setError('Error fetching data: ' + err.message);
      }
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-IN');
    } catch {
      return dateString; // Return original if parsing fails
    }
  };

  // Format percentage
  const formatPercentage = (value) => {
    if (value === null || value === undefined || value === 0) return '-';
    const color = value > 0 ? 'text-green-600' : 'text-red-600';
    return (
      <span className={`font-semibold text-sm ${color}`}>
        {value.toFixed(2)}%
      </span>
    );
  };

  // Get return periods for filters
  const getReturnPeriods = () => {
    const periods = [
      { value: '7days', label: '7 Days', key: '7days' },
      { value: '1month', label: '1 Month', key: '1month' },
      { value: '3month', label: '3 Months', key: '3month' },
      { value: '6month', label: '6 Months', key: '6month' },
      { value: 'ytd', label: 'YTD', key: 'ytd' },
      { value: '1year', label: '1 Year', key: '1year' },
      { value: '2year', label: '2 Years', key: '2year' },
      { value: '3year', label: '3 Years', key: '3year' },
      { value: '4year', label: '4 Years', key: '4year' },
      { value: '5year', label: '5 Years', key: '5year' },
      { value: '8year', label: '8 Years', key: '8year' },
      { value: '10year', label: '10 Years', key: '10year' },
      { value: 'inception', label: 'Since Inception', key: 'inception' }
    ];
    return periods;
  };

  // Get yearly return periods for absolute returns
  const getYearlyPeriods = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = 2007; year <= currentYear; year++) {
      years.push({ value: year.toString(), label: `${year}`, key: year.toString() });
    }
    return years.reverse();
  };

  // Column definitions
  const columns = useMemo(() => {
    const baseColumns = [
      {
        accessorKey: 'benchmark_name',
        header: 'Benchmark Name',
        cell: ({ getValue, row }) => (
          <div className="min-w-48">
            <span className="text-blue-700 hover:text-blue-900 hover:underline cursor-pointer font-semibold text-sm leading-tight">
              {getValue()}
            </span>
            <div className="text-xs text-gray-500 mt-1">
              Code: {row.original.citicode}
            </div>
          </div>
        ),
      },
      {
        accessorKey: 'price_date',
        header: 'Price Date',
        cell: ({ getValue }) => (
          <span className="text-gray-700 text-sm whitespace-nowrap">{getValue()}</span>
        ),
      },
    ];

    // Add return columns based on selected type and period
    if (returnType === 'returns_abs' && selectedYear !== '1year') {
      // For absolute returns, show yearly data
      baseColumns.push({
        accessorKey: `returns_abs_${selectedYear}`,
        header: `${selectedYear} Return`,
        cell: ({ getValue }) => formatPercentage(getValue()),
      });
    } else {
      // For compound returns or 1year absolute, show period-based data
      const returnKey = returnType === 'returns_abs' ? `returns_abs_${selectedYear}` : `returns_cmp_${selectedYear}`;
      baseColumns.push({
        accessorKey: returnKey,
        header: `${getReturnPeriods().find(p => p.value === selectedYear)?.label || selectedYear} Return`,
        cell: ({ getValue }) => formatPercentage(getValue()),
      });
    }

    // Add some additional useful columns
    baseColumns.push(
      {
        accessorKey: 'returns_abs_7days',
        header: '7D Return',
        cell: ({ getValue }) => formatPercentage(getValue()),
      },
      {
        accessorKey: 'returns_abs_1month',
        header: '1M Return',
        cell: ({ getValue }) => formatPercentage(getValue()),
      },
      {
        accessorKey: 'returns_abs_ytd',
        header: 'YTD Return',
        cell: ({ getValue }) => formatPercentage(getValue()),
      }
    );

    return baseColumns;
  }, [returnType, selectedYear]);

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
      sorting: [
        {
          id: 'returns_abs_1year',
          desc: true, // Sort by 1 year returns descending by default
        },
      ],
    },
  });

  const getSortIcon = (column) => {
    const sorted = column.getIsSorted();
    if (!sorted) return <ArrowUpDown className="w-3.5 h-3.5 text-gray-400 opacity-60" />;
    if (sorted === 'asc') return <ArrowUp className="w-3.5 h-3.5 text-blue-600" />;
    return <ArrowDown className="w-3.5 h-3.5 text-blue-600" />;
  };

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    if (!data.length) return null;
    
    const validOneYear = data.filter(item => item.returns_abs_1year != null && item.returns_abs_1year !== 0).map(item => item.returns_abs_1year);
    const validYTD = data.filter(item => item.returns_abs_ytd != null && item.returns_abs_ytd !== 0).map(item => item.returns_abs_ytd);
    const valid3Year = data.filter(item => item.returns_cmp_3year != null && item.returns_cmp_3year !== 0).map(item => item.returns_cmp_3year);
    const valid5Year = data.filter(item => item.returns_cmp_5year != null && item.returns_cmp_5year !== 0).map(item => item.returns_cmp_5year);
    
    return {
      avgOneYear: validOneYear.length ? (validOneYear.reduce((a, b) => a + b, 0) / validOneYear.length) : 0,
      maxOneYear: validOneYear.length ? Math.max(...validOneYear) : 0,
      minOneYear: validOneYear.length ? Math.min(...validOneYear) : 0,
      avgYTD: validYTD.length ? (validYTD.reduce((a, b) => a + b, 0) / validYTD.length) : 0,
      avg3Year: valid3Year.length ? (valid3Year.reduce((a, b) => a + b, 0) / valid3Year.length) : 0,
      avg5Year: valid5Year.length ? (valid5Year.reduce((a, b) => a + b, 0) / valid5Year.length) : 0,
      benchmarkCount: data.length
    };
  }, [data]);

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Benchmark Performance</h1>
          </div>
          <p className="text-gray-600 text-sm sm:text-base">Track and compare benchmark index performance across different time periods</p>
        </div>

        {/* Summary Stats */}
        {summaryStats && !loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="text-2xl font-bold text-blue-600">{summaryStats.benchmarkCount}</div>
              <div className="text-sm text-gray-600">Benchmarks</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="text-2xl font-bold text-green-600">{summaryStats.avgOneYear.toFixed(1)}%</div>
              <div className="text-sm text-gray-600">Avg 1Y Return</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="text-2xl font-bold text-emerald-600">{summaryStats.maxOneYear.toFixed(1)}%</div>
              <div className="text-sm text-gray-600">Best 1Y Return</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="text-2xl font-bold text-orange-600">{summaryStats.avgYTD.toFixed(1)}%</div>
              <div className="text-sm text-gray-600">Avg YTD</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="text-lg font-bold text-purple-600">{summaryStats.avg3Year.toFixed(1)}%</div>
              <div className="text-sm text-gray-600">Avg 3Y CAGR</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="text-lg font-bold text-indigo-600">{summaryStats.avg5Year.toFixed(1)}%</div>
              <div className="text-sm text-gray-600">Avg 5Y CAGR</div>
            </div>
          </div>
        )}

        {/* Filter Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold text-gray-800">Filters</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">Return Type</label>
              <select 
                className="px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={returnType}
                onChange={(e) => setReturnType(e.target.value)}
              >
                <option value="returns_cmp">Compound Returns (CAGR)</option>
                <option value="returns_abs">Absolute Returns</option>
              </select>
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">
                {returnType === 'returns_abs' ? 'Period/Year' : 'Period'}
              </label>
              <select 
                className="px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                {returnType === 'returns_abs' ? (
                  <>
                    {getReturnPeriods().slice(0, 6).map(period => (
                      <option key={period.value} value={period.value}>{period.label}</option>
                    ))}
                    <optgroup label="Yearly Returns">
                      {getYearlyPeriods().map(year => (
                        <option key={year.value} value={year.value}>{year.label}</option>
                      ))}
                    </optgroup>
                  </>
                ) : (
                  getReturnPeriods().slice(6).map(period => (
                    <option key={period.value} value={period.value}>{period.label}</option>
                  ))
                )}
              </select>
            </div>
            
            <div className="flex items-end">
              <button 
                className="w-full px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium text-sm shadow-sm disabled:opacity-50"
                onClick={fetchData}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
                    Loading...
                  </>
                ) : (
                  'Refresh Data'
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 text-red-600">⚠</div>
              <div>
                <strong>Error:</strong> {error}
                <button 
                  onClick={fetchData} 
                  className="ml-4 text-sm underline hover:no-underline"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}

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
                <option value={100}>100</option>
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
                  placeholder="Search benchmarks..."
                  value={globalFilter ?? ''}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              <span className="ml-2 text-gray-600">Loading benchmark data...</span>
            </div>
          ) : (
            <>
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

              {/* No Data State */}
              {!loading && data.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-lg mb-2">📊 No data found</div>
                  <div className="text-gray-500 text-sm">
                    Try refreshing the data or check back later
                  </div>
                  <button 
                    onClick={fetchData}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                  >
                    Reload Data
                  </button>
                </div>
              )}

              {/* Pagination */}
              {data.length > 0 && (
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-6 bg-gray-50 border-t border-gray-200">
                  <div className="text-sm text-gray-600 order-2 sm:order-1">
                    Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
                    {Math.min(
                      (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                      table.getFilteredRowModel().rows.length
                    )}{' '}
                    of {table.getFilteredRowModel().rows.length} entries
                    {table.getFilteredRowModel().rows.length < data.length && (
                      <span className="text-gray-400"> (filtered from {data.length} total)</span>
                    )}
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
              )}
            </>
          )}
        </div>

        {/* API Info */}
        {/* <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Live Benchmark Data powered by AdvisorKhoj API</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: '📊', title: 'Real-time Data', desc: 'Live benchmark index performance' },
              { icon: '🎯', title: 'Multiple Benchmarks', desc: 'Nifty, NASDAQ, MSCI & more' },
              { icon: '📈', title: 'Historical Returns', desc: 'Compound & absolute returns' },
              { icon: '⏱️', title: 'Multiple Timeframes', desc: '7 days to inception returns' }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
                <div className="text-2xl mb-2">{feature.icon}</div>
                <div className="font-semibold text-blue-800 text-sm mb-1">{feature.title}</div>
                <div className="text-gray-600 text-xs">{feature.desc}</div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default BenchmarkReturns;
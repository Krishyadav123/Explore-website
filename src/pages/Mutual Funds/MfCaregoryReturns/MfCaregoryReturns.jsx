import React, { useState, useMemo, useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import { Search, ChevronLeft, ChevronRight, ArrowUpDown, ArrowUp, ArrowDown, Filter, TrendingUp, Loader2, BarChart3 } from 'lucide-react';
import axios from 'axios';
import Navbar from '@/component/Navbar';
import Footer from '@/component/Footer';

const MfCategoryReturns = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [globalFilter, setGlobalFilter] = useState('');
  const [period, setPeriod] = useState('3y');

  // Fetch data from API
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(
        `https://mfapi.advisorkhoj.com/getMutualFundsCategoryReturns?key=e5485103-6f73-49a2-b45e-8008eefe38ba&period=${period}`,
        {
          timeout: 10000,
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

  const handleApplyFilters = () => {
    fetchData();
  };

  // Format percentage
  const formatPercentage = (value) => {
    if (value === null || value === undefined) return '-';
    return `${value.toFixed(2)}%`;
  };

  // Get return color based on value
  const getReturnColor = (value) => {
    if (value === null || value === undefined) return 'text-gray-400';
    if (value > 0) return 'text-green-600';
    if (value < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  // Column definitions
  const columns = useMemo(() => [
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ getValue }) => (
        <div className="min-w-48">
          <span className="text-blue-700 font-semibold text-sm leading-tight">
            {getValue()}
          </span>
        </div>
      ),
    },
    {
      accessorKey: 'average_rolling_returns',
      header: 'Average Return',
      cell: ({ getValue }) => {
        const value = getValue();
        return (
          <span className={`font-semibold text-sm ${getReturnColor(value)}`}>
            {formatPercentage(value)}
          </span>
        );
      },
    },
    {
      accessorKey: 'median_rolling_returns',
      header: 'Median Return',
      cell: ({ getValue }) => {
        const value = getValue();
        return (
          <span className={`font-semibold text-sm ${getReturnColor(value)}`}>
            {formatPercentage(value)}
          </span>
        );
      },
    },
    {
      accessorKey: 'max_rolling_returns',
      header: 'Max Return',
      cell: ({ getValue }) => {
        const value = getValue();
        return (
          <span className={`font-semibold text-sm ${getReturnColor(value)}`}>
            {formatPercentage(value)}
          </span>
        );
      },
    },
    {
      accessorKey: 'min_rolling_returns',
      header: 'Min Return',
      cell: ({ getValue }) => {
        const value = getValue();
        return (
          <span className={`font-semibold text-sm ${getReturnColor(value)}`}>
            {formatPercentage(value)}
          </span>
        );
      },
    },
    {
      accessorKey: 'return_range',
      header: 'Return Range',
      cell: ({ row }) => {
        const max = row.original.max_rolling_returns;
        const min = row.original.min_rolling_returns;
        const range = max !== null && min !== null ? max - min : null;
        return (
          <span className="text-gray-700 font-medium text-sm">
            {range !== null ? `${range.toFixed(2)}%` : '-'}
          </span>
        );
      },
    },
    {
      accessorKey: 'performance_indicator',
      header: 'Performance',
      cell: ({ row }) => {
        const avg = row.original.average_rolling_returns;
        if (avg === null || avg === undefined) return <span className="text-gray-400">-</span>;
        
        const getPerformanceLevel = (value) => {
          if (value >= 15) return { label: 'Excellent', color: 'bg-green-100 text-green-800' };
          if (value >= 10) return { label: 'Good', color: 'bg-emerald-100 text-emerald-800' };
          if (value >= 5) return { label: 'Fair', color: 'bg-yellow-100 text-yellow-800' };
          if (value >= 0) return { label: 'Poor', color: 'bg-orange-100 text-orange-800' };
          return { label: 'Negative', color: 'bg-red-100 text-red-800' };
        };
        
        const performance = getPerformanceLevel(avg);
        return (
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${performance.color}`}>
            {performance.label}
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
      sorting: [
        {
          id: 'average_rolling_returns',
          desc: true,
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
    
    const validAvgReturns = data.filter(item => item.average_rolling_returns != null).map(item => item.average_rolling_returns);
    const validMaxReturns = data.filter(item => item.max_rolling_returns != null).map(item => item.max_rolling_returns);
    const validMinReturns = data.filter(item => item.min_rolling_returns != null).map(item => item.min_rolling_returns);
    
    return {
      categoryCount: data.length,
      avgReturn: validAvgReturns.length ? (validAvgReturns.reduce((a, b) => a + b, 0) / validAvgReturns.length) : 0,
      bestCategory: validAvgReturns.length ? Math.max(...validAvgReturns) : 0,
      worstCategory: validAvgReturns.length ? Math.min(...validAvgReturns) : 0,
      overallMax: validMaxReturns.length ? Math.max(...validMaxReturns) : 0,
      overallMin: validMinReturns.length ? Math.min(...validMinReturns) : 0,
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
            <BarChart3 className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Mutual Fund Category Returns</h1>
          </div>
          <p className="text-gray-600 text-sm sm:text-base">Compare rolling returns across different mutual fund categories</p>
        </div>

        {/* Summary Stats */}
        {summaryStats && !loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="text-2xl font-bold text-blue-600">{summaryStats.categoryCount}</div>
              <div className="text-sm text-gray-600">Categories</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="text-2xl font-bold text-green-600">{summaryStats.avgReturn.toFixed(1)}%</div>
              <div className="text-sm text-gray-600">Avg Return</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="text-2xl font-bold text-emerald-600">{summaryStats.bestCategory.toFixed(1)}%</div>
              <div className="text-sm text-gray-600">Best Category</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="text-2xl font-bold text-red-600">{summaryStats.worstCategory.toFixed(1)}%</div>
              <div className="text-sm text-gray-600">Worst Category</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="text-lg font-bold text-purple-600">{summaryStats.overallMax.toFixed(1)}%</div>
              <div className="text-sm text-gray-600">Highest Return</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="text-lg font-bold text-orange-600">{summaryStats.overallMin.toFixed(1)}%</div>
              <div className="text-sm text-gray-600">Lowest Return</div>
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
              <label className="text-sm font-medium text-gray-700 mb-2">Period</label>
              <select 
                className="px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
              >
                <option value="1w">1 Week</option>
                <option value="1m">1 Month</option>
                <option value="3m">3 Months</option>
                <option value="6m">6 Months</option>
                <option value="ytd">YTD</option>
                <option value="1y">1 Year</option>
                <option value="3y">3 Years</option>
                <option value="5y">5 Years</option>
                <option value="10y">10 Years</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button 
                className="w-full px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium text-sm shadow-sm disabled:opacity-50"
                onClick={handleApplyFilters}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
                    Loading...
                  </>
                ) : (
                  'Apply Filters'
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
                  placeholder="Search categories..."
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
              <span className="ml-2 text-gray-600">Loading category data...</span>
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
                    Try adjusting your filters or check back later
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
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Category-wise Rolling Returns powered by AdvisorKhoj API</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: '📈', title: 'Rolling Returns', desc: 'Category-wise rolling return analysis' },
              { icon: '🎯', title: 'Performance Metrics', desc: 'Average, median, min, and max returns' },
              { icon: '📊', title: 'Statistical Analysis', desc: 'Comprehensive statistical data' },
              { icon: '🔍', title: 'Category Comparison', desc: 'Compare performance across fund categories' }
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
         <Footer />
    </>
  );
};

export default MfCategoryReturns;
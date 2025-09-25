import React, { useState, useMemo, useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import { Search, ChevronLeft, ChevronRight, ArrowUpDown, ArrowUp, ArrowDown, TrendingUp, Loader2, Monitor, RefreshCw } from 'lucide-react';
import Navbar from '@/component/Navbar';
import Footer from '@/component/Footer';


const MfCategoryMonitor = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [globalFilter, setGlobalFilter] = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);

  // Fetch data from API
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);
      
      const response = await fetch(
        'https://mfapi.advisorkhoj.com/getCategoryPerformance?key=e5485103-6f73-49a2-b45e-8008eefe38ba',
        {
          method: 'POST',
          signal: controller.signal,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        }
      );
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const responseData = await response.json();
      
      if (responseData.status === 200 && responseData.list) {
        setData(responseData.list);
        setLastUpdated(new Date());
      } else {
        setError('Failed to fetch data: ' + (responseData.msg || 'Unknown error'));
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        setError('Request timeout - please try again');
      } else if (err.message.includes('HTTP error!')) {
        setError(`Server error: ${err.message}`);
      } else if (err.message.includes('Failed to fetch')) {
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

  // Format percentage
  const formatPercentage = (value) => {
    if (value === null || value === undefined || value === 0) return '-';
    return `${value.toFixed(2)}%`;
  };

  // Get return color based on value
  const getReturnColor = (value) => {
    if (value === null || value === undefined || value === 0) return 'text-gray-400';
    if (value > 0) return 'text-green-600';
    if (value < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  // Format date for display
  const formatDateTime = (date) => {
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Column definitions
  const columns = useMemo(() => [
    {
      accessorKey: 'sector',
      header: 'Category',
      cell: ({ getValue, row }) => (
        <div className="min-w-64">
          <span className="text-blue-700 font-semibold text-sm leading-tight">
            {getValue()}
          </span>
          <div className="text-xs text-gray-500 mt-1">
            {row.original.scheme_broad_category}
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'returns_abs_7days',
      header: '7D Return',
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
      accessorKey: 'returns_abs_1month',
      header: '1M Return',
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
      accessorKey: 'returns_abs_3month',
      header: '3M Return',
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
      accessorKey: 'returns_abs_6month',
      header: '6M Return',
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
      accessorKey: 'returns_abs_ytd',
      header: 'YTD Return',
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
      accessorKey: 'returns_abs_1year',
      header: '1Y Return',
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
      accessorKey: 'returns_cmp_3year',
      header: '3Y Return',
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
      accessorKey: 'returns_cmp_5year',
      header: '5Y Return',
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
      accessorKey: 'volatility_cm_3year',
      header: '3Y Volatility',
      cell: ({ getValue }) => {
        const value = getValue();
        return (
          <span className="text-gray-700 text-sm">
            {value && value !== 0 ? `${value.toFixed(2)}%` : '-'}
          </span>
        );
      },
    },
    {
      accessorKey: 'sharpratio_cm_3year',
      header: '3Y Sharpe Ratio',
      cell: ({ getValue }) => {
        const value = getValue();
        return (
          <span className="text-gray-700 text-sm">
            {value && value !== 0 ? value.toFixed(2) : '-'}
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
        pageSize: 15,
      },
      sorting: [
        {
          id: 'returns_abs_1year',
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
    
    const valid1YReturns = data.filter(item => item.returns_abs_1year != null && item.returns_abs_1year !== 0).map(item => item.returns_abs_1year);
    const valid3YReturns = data.filter(item => item.returns_cmp_3year != null && item.returns_cmp_3year !== 0).map(item => item.returns_cmp_3year);
    const validYTDReturns = data.filter(item => item.returns_abs_ytd != null && item.returns_abs_ytd !== 0).map(item => item.returns_abs_ytd);
    const valid1MReturns = data.filter(item => item.returns_abs_1month != null && item.returns_abs_1month !== 0).map(item => item.returns_abs_1month);
    
    return {
      categoryCount: data.length,
      avg1YReturn: valid1YReturns.length ? (valid1YReturns.reduce((a, b) => a + b, 0) / valid1YReturns.length) : 0,
      best1YReturn: valid1YReturns.length ? Math.max(...valid1YReturns) : 0,
      worst1YReturn: valid1YReturns.length ? Math.min(...valid1YReturns) : 0,
      avgYTDReturn: validYTDReturns.length ? (validYTDReturns.reduce((a, b) => a + b, 0) / validYTDReturns.length) : 0,
      avg1MReturn: valid1MReturns.length ? (valid1MReturns.reduce((a, b) => a + b, 0) / valid1MReturns.length) : 0,
    };
  }, [data]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <Monitor className="w-8 h-8 text-blue-600" />
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Category Performance Monitor</h1>
              </div>
              <button 
                onClick={fetchData}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
            <p className="text-gray-600 text-sm sm:text-base">Real-time monitoring of mutual fund category performance across different time periods</p>
            {lastUpdated && (
              <p className="text-gray-500 text-xs mt-1">Last updated: {formatDateTime(lastUpdated)}</p>
            )}
          </div>

          {/* Summary Stats */}
          {summaryStats && !loading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="text-2xl font-bold text-blue-600">{summaryStats.categoryCount}</div>
                <div className="text-sm text-gray-600">Categories</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="text-2xl font-bold text-green-600">{summaryStats.avg1YReturn.toFixed(1)}%</div>
                <div className="text-sm text-gray-600">Avg 1Y Return</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="text-2xl font-bold text-emerald-600">{summaryStats.best1YReturn.toFixed(1)}%</div>
                <div className="text-sm text-gray-600">Best 1Y</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="text-2xl font-bold text-red-600">{summaryStats.worst1YReturn.toFixed(1)}%</div>
                <div className="text-sm text-gray-600">Worst 1Y</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="text-lg font-bold text-purple-600">{summaryStats.avgYTDReturn.toFixed(1)}%</div>
                <div className="text-sm text-gray-600">Avg YTD</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="text-lg font-bold text-indigo-600">{summaryStats.avg1MReturn.toFixed(1)}%</div>
                <div className="text-sm text-gray-600">Avg 1M</div>
              </div>
            </div>
          )}

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
                  <option value={10}>10</option>
                  <option value={15}>15</option>
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
                <span className="ml-2 text-gray-600">Loading category performance data...</span>
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
                      Unable to fetch category performance data
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
                <Monitor className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Real-time Category Performance Monitoring powered by AdvisorKhoj API</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: '📊', title: 'Live Monitoring', desc: 'Real-time category performance tracking' },
                { icon: '📈', title: 'Multiple Timeframes', desc: 'Returns from 7 days to 5 years' },
                { icon: '⚡', title: 'Instant Updates', desc: 'Refresh data with one click' },
                { icon: '🎯', title: 'Risk Metrics', desc: 'Volatility and Sharpe ratio analysis' }
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

export default MfCategoryMonitor;
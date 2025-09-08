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

const TopPerformance = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [globalFilter, setGlobalFilter] = useState('');
  const [category, setCategory] = useState('Equity: Mid Cap');
  const [period, setPeriod] = useState('3');
  const [amount, setAmount] = useState('3000');

  // Fetch data from API
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(
        `https://mfapi.advisorkhoj.com/getSIPReturnsForCategoryPeriodAmount?key=e5485103-6f73-49a2-b45e-8008eefe38ba&category=${encodeURIComponent(category)}&period=${period}&amount=${amount}`,
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

  const handleApplyFilters = () => {
    fetchData();
  };

  // Format currency
  const formatCurrency = (value) => {
    if (!value) return '-';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

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

  // Column definitions
  const columns = useMemo(() => [
    {
      accessorKey: 'scheme_name',
      header: 'Scheme Name',
      cell: ({ getValue, row }) => (
        <div className="min-w-64">
          <span className="text-blue-700 hover:text-blue-900 hover:underline cursor-pointer font-semibold text-sm leading-tight">
            {getValue()}
          </span>
          <div className="text-xs text-gray-500 mt-1">
            {row.original.scheme_company_short_name || row.original.scheme_company}
          </div>
          {row.original.fund_manager && (
            <div className="text-xs text-gray-400 mt-0.5">
              FM: {row.original.fund_manager}
            </div>
          )}
        </div>
      ),
    },
    {
      accessorKey: 'inception_date',
      header: 'Launch Date',
      cell: ({ getValue }) => (
        <span className="text-gray-700 text-sm whitespace-nowrap">{formatDate(getValue())}</span>
      ),
    },
    {
      accessorKey: 'scheme_assets',
      header: 'AUM (₹Cr)',
      cell: ({ getValue }) => (
        <span className="font-semibold text-gray-800 text-sm whitespace-nowrap">
          {getValue()?.toLocaleString('en-IN') || '-'}
        </span>
      ),
    },
    {
      accessorKey: 'ter',
      header: 'Expense Ratio',
      cell: ({ getValue }) => (
        <span className="text-gray-700 text-sm">{getValue()?.toFixed(2)}%</span>
      ),
    },
    {
      accessorKey: 'current_cost',
      header: 'Invested Amount',
      cell: ({ getValue }) => (
        <span className="text-gray-700 text-sm whitespace-nowrap">
          {formatCurrency(getValue())}
        </span>
      ),
    },
    {
      accessorKey: 'current_value',
      header: 'Current Value',
      cell: ({ getValue }) => (
        <span className="font-semibold text-green-700 text-sm whitespace-nowrap">
          {formatCurrency(getValue())}
        </span>
      ),
    },
    {
        accessorKey: 'returns',
        header: `${period}Y Return`,
        cell: ({ getValue }) => {
          const value = getValue();
          if (value === null || value === undefined) return <span className="text-gray-400 text-sm">-</span>;
          return (
            <span className={`font-semibold text-sm ${value > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {value.toFixed(2)}%
            </span>
          );
        },
      },
    // {
    //   id: 'profit_loss',
    //   header: 'Gain/Loss',
    //   cell: ({ row }) => {
    //     const currentValue = row.original.current_value;
    //     const invested = row.original.current_cost;
    //     if (!currentValue || !invested) return <span className="text-gray-400 text-sm">-</span>;
        
    //     const profitLoss = currentValue - invested;
    //     return (
    //       <div className="text-sm">
    //         <div className={`font-semibold ${profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
    //           {formatCurrency(profitLoss)}
    //         </div>
    //         <div className="text-xs text-gray-500">
    //           ({((profitLoss / invested) * 100).toFixed(1)}%)
    //         </div>
    //       </div>
    //     );
    //   },
    // },
    // {
    //   accessorKey: 'rank_3_yr',
    //   header: 'Rank',
    //   cell: ({ getValue, row }) => {
    //     const rank = getValue();
    //     const totalRanks = row.original.rank_3_yr_total_rank;
    //     if (!rank) return <span className="text-gray-400 text-sm">-</span>;
        
    //     const percentile = ((totalRanks - rank + 1) / totalRanks) * 100;
    //     const getPercentileColor = (perc) => {
    //       if (perc >= 80) return 'text-green-600';
    //       if (perc >= 60) return 'text-blue-600';
    //       if (perc >= 40) return 'text-yellow-600';
    //       return 'text-red-600';
    //     };
        
    //     return (
    //       <div className="text-sm">
    //         <div className="font-medium">
    //           <span className={getPercentileColor(percentile)}>{rank}</span>
    //           <span className="text-gray-500">/{totalRanks}</span>
    //         </div>
    //         <div className="text-xs text-gray-400">
    //           {percentile.toFixed(0)}%ile
    //         </div>
    //       </div>
    //     );
    //   },
    // },
    // {
    //   accessorKey: 'riskometer',
    //   header: 'Risk Level',
    //   cell: ({ getValue }) => {
    //     const risk = getValue();
    //     const getRiskColor = (level) => {
    //       switch (level?.toLowerCase()) {
    //         case 'low': return 'bg-green-100 text-green-800';
    //         case 'moderate': return 'bg-yellow-100 text-yellow-800';
    //         case 'high': return 'bg-orange-100 text-orange-800';
    //         case 'very high': return 'bg-red-100 text-red-800';
    //         default: return 'bg-gray-100 text-gray-800';
    //       }
    //     };
        
    //     return (
    //       <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskColor(risk)}`}>
    //         {risk || '-'}
    //       </span>
    //     );
    //   },
    // },
  ], [period]);

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
          id: 'returns',
          desc: true, // Sort by returns descending by default
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
    
    const validReturns = data.filter(item => item.returns != null).map(item => item.returns);
    const validTER = data.filter(item => item.ter != null).map(item => item.ter);
    const totalInvested = data.reduce((sum, item) => sum + (item.current_cost || 0), 0);
    const totalCurrentValue = data.reduce((sum, item) => sum + (item.current_value || 0), 0);
    const totalAUM = data.reduce((sum, item) => sum + (item.scheme_assets || 0), 0);
    
    return {
      avgReturn: validReturns.length ? (validReturns.reduce((a, b) => a + b, 0) / validReturns.length) : 0,
      maxReturn: validReturns.length ? Math.max(...validReturns) : 0,
      minReturn: validReturns.length ? Math.min(...validReturns) : 0,
      avgTER: validTER.length ? (validTER.reduce((a, b) => a + b, 0) / validTER.length) : 0,
      totalInvested,
      totalCurrentValue,
      totalAUM,
      totalProfitLoss: totalCurrentValue - totalInvested,
      fundCount: data.length
    };
  }, [data]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Mutual Fund Analytics</h1>
          </div>
          <p className="text-gray-600 text-sm sm:text-base">Compare and analyze SIP returns across different mutual fund categories</p>
        </div>

        {/* Summary Stats */}
        {summaryStats && !loading && (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="text-2xl font-bold text-blue-600">{summaryStats.fundCount}</div>
              <div className="text-sm text-gray-600">Total Funds</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="text-2xl font-bold text-green-600">{summaryStats.avgReturn.toFixed(1)}%</div>
              <div className="text-sm text-gray-600">Avg Return</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="text-2xl font-bold text-emerald-600">{summaryStats.maxReturn.toFixed(1)}%</div>
              <div className="text-sm text-gray-600">Best Return</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="text-2xl font-bold text-orange-600">{summaryStats.avgTER.toFixed(2)}%</div>
              <div className="text-sm text-gray-600">Avg Expense</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="text-lg font-bold text-purple-600">{(summaryStats.totalAUM / 1000).toFixed(0)}K</div>
              <div className="text-sm text-gray-600">Total AUM (Cr)</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className={`text-lg font-bold ${summaryStats.totalProfitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(summaryStats.totalProfitLoss).replace('₹', '₹')}
              </div>
              <div className="text-sm text-gray-600">Total P&L</div>
            </div>
          </div>
        )}

        {/* Filter Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold text-gray-800">Filters</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">Category</label>
              <select 
                className="px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Equity: Multi Cap">Equity: Multi Cap</option>
                <option value="Equity: Large Cap">Equity: Large Cap</option>
                <option value="Equity: Mid Cap">Equity: Mid Cap</option>
                <option value="Equity: Small Cap">Equity: Small Cap</option>
                <option value="Hybrid: Conservative">Hybrid: Conservative</option>
                <option value="Hybrid: Aggressive">Hybrid: Aggressive</option>
                <option value="Debt: Ultra Short Duration">Debt: Ultra Short Duration</option>
                <option value="Debt: Short Duration">Debt: Short Duration</option>
                <option value="Solution Oriented: Retirement Fund">Solution Oriented: Retirement Fund</option>
              </select>
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">Period (Years)</label>
              <select 
                className="px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
              >
                <option value="1">1 Year</option>
                <option value="3">3 Years</option>
                <option value="5">5 Years</option>
                <option value="10">10 Years</option>
              </select>
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">SIP Amount (₹)</label>
              <select 
                className="px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              >
                <option value="1000">₹1,000</option>
                <option value="2000">₹2,000</option>
                <option value="3000">₹3,000</option>
                <option value="5000">₹5,000</option>
                <option value="10000">₹10,000</option>
                <option value="15000">₹15,000</option>
                <option value="20000">₹20,000</option>
                <option value="25000">₹25,000</option>
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
                  placeholder="Search funds..."
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
              <span className="ml-2 text-gray-600">Loading fund data...</span>
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
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Real-time SIP Data powered by AdvisorKhoj API</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: '📊', title: 'Live Data', desc: 'Real-time mutual fund data with axios' },
              { icon: '💰', title: 'SIP Calculator', desc: 'Calculate actual SIP performance' },
              { icon: '🔄', title: 'Dynamic Filters', desc: 'Category, period & amount selection' },
              { icon: '📈', title: 'Analytics', desc: 'Comprehensive fund comparison' }
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

export default TopPerformance;
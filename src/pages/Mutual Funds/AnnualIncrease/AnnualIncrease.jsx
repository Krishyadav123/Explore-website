import React, { useState, useMemo, useEffect, useContext } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import { Search, ChevronLeft, ChevronRight, ArrowUpDown, ArrowUp, ArrowDown, Filter, TrendingUp, Loader2, Calendar } from 'lucide-react';
import axios from 'axios';
import { CategoryContext } from '@/context/CategoryContext';
import Footer from '@/component/Footer';
import Navbar from '@/component/Navbar';

const AnnualIncrease = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [globalFilter, setGlobalFilter] = useState('');
  
  // Form parameters
  const [scheme, setScheme] = useState('Aditya Birla Sun Life Flexi Cap Fund - Growth - Regular Plan');
  const [amount, setAmount] = useState('5000');
  const [frequency, setFrequency] = useState('Monthly');
  const [startDate, setStartDate] = useState('01-01-2010');
  const [endDate, setEndDate] = useState('10-09-2025');
  const [enhancementPercentage, setEnhancementPercentage] = useState('10');

  const { categories, loading: categoryLoading, error: categoryError } = useContext(CategoryContext);

  useEffect(() => {
    fetchData();
  }, [])

  // Fetch data from API
  const fetchData = async () => {
    if (!scheme.trim()) {
      setError('Please enter a scheme name');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(
        `https://mfapi.advisorkhoj.com/getSIPReturnWithAnnualIncrease?key=e5485103-6f73-49a2-b45e-8008eefe38ba&scheme=${encodeURIComponent(scheme)}&amount=${amount}&frequency=${frequency}&start_date=${startDate}&end_date=${endDate}&enhancement_percentage=${enhancementPercentage}`,
        {
          timeout: 15000, // 15 second timeout
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        }
      );
      
      if (response.data.status === 200 && response.data.sipYearlyEnhancementResponse) {
        setData(response.data.sipYearlyEnhancementResponse);
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

  const handleSubmit = () => {
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
    }).format(parseFloat(value));
  };

  // Column definitions
  const columns = useMemo(() => [
    {
      accessorKey: 'scheme',
      header: 'Scheme',
      cell: ({ getValue, row }) => (
        <div className="min-w-64">
          <span className="text-blue-700 hover:text-blue-900 hover:underline cursor-pointer font-semibold text-sm leading-tight">
            {getValue()}
          </span>
          <div className="text-xs text-gray-500 mt-1">
            {row.original.scheme_name}
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'investmentAmount',
      header: 'SIP Investment Cost',
      cell: ({ getValue }) => (
        <span className="font-semibold text-gray-800 text-sm whitespace-nowrap">
          {formatCurrency(getValue())}
        </span>
      ),
    },
    {
      accessorKey: 'investmentValue',
      header: 'SIP Value as on End Date',
      cell: ({ getValue }) => (
        <span className="font-semibold text-green-700 text-sm whitespace-nowrap">
          {formatCurrency(getValue())}
        </span>
      ),
    },
    {
      accessorKey: 'sipGrowth',
      header: 'Growth Amount',
      cell: ({ getValue }) => (
        <span className="font-semibold text-blue-600 text-sm whitespace-nowrap">
          {formatCurrency(getValue())}
        </span>
      ),
    },
    {
      accessorKey: 'enhancementGrowth',
      header: 'Enhanced Growth Amount',
      cell: ({ getValue }) => {
        const value = getValue();
        if (value === '-' || !value) return <span className="text-gray-400 text-sm">-</span>;
        return (
          <span className="font-semibold text-blue-600 text-sm whitespace-nowrap">
            {formatCurrency(value)}
          </span>
        );
      },
    },
    {
      accessorKey: 'enhancementGrowthPercent',
      header: 'Enhanced Growth (%)',
      cell: ({ getValue }) => {
        const value = getValue();
        if (value === '-' || !value) return <span className="text-gray-400 text-sm">-</span>;
        return (
          <span className="font-semibold text-orange-600 text-sm">
            {parseFloat(value).toFixed(2)}%
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
          id: 'enhancementGrowthPercent',
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
    
    const totalInvestment = data.reduce((sum, item) => sum + (parseFloat(item.investmentAmount) || 0), 0);
    const totalValue = data.reduce((sum, item) => sum + (parseFloat(item.investmentValue) || 0), 0);
    const totalGrowth = data.reduce((sum, item) => sum + (parseFloat(item.sipGrowth) || 0), 0);
    const enhancedGrowthData = data.filter(item => item.enhancementGrowth !== '-' && item.enhancementGrowth);
    const totalEnhancedGrowth = enhancedGrowthData.reduce((sum, item) => sum + (parseFloat(item.enhancementGrowth) || 0), 0);
    
    return {
      totalInvestment,
      totalValue,
      totalGrowth,
      totalEnhancedGrowth,
      scenarioCount: data.length,
      avgEnhancedGrowthPercent: enhancedGrowthData.length ? 
        enhancedGrowthData.reduce((sum, item) => sum + (parseFloat(item.enhancementGrowthPercent) || 0), 0) / enhancedGrowthData.length : 0
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
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">SIP Annual Increase Calculator</h1>
            </div>
            <p className="text-gray-600 text-sm sm:text-base">Compare SIP performance with yearly enhancement scenarios</p>
          </div>

          {/* Summary Stats */}
          {summaryStats && !loading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="text-2xl font-bold text-blue-600">{summaryStats.scenarioCount}</div>
                <div className="text-sm text-gray-600">Scenarios</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="text-lg font-bold text-blue-600">{formatCurrency(summaryStats.totalInvestment / summaryStats.scenarioCount)}</div>
                <div className="text-sm text-gray-600">Avg Investment</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="text-lg font-bold text-green-600">{formatCurrency(summaryStats.totalValue / summaryStats.scenarioCount)}</div>
                <div className="text-sm text-gray-600">Avg Value</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="text-lg font-bold text-indigo-600">{formatCurrency(summaryStats.totalGrowth / summaryStats.scenarioCount)}</div>
                <div className="text-sm text-gray-600">Avg Growth</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="text-lg font-bold text-orange-600">{summaryStats.avgEnhancedGrowthPercent.toFixed(1)}%</div>
                <div className="text-sm text-gray-600">Avg Enhanced %</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="text-lg font-bold text-emerald-600">{formatCurrency(summaryStats.totalEnhancedGrowth / Math.max(1, data.filter(item => item.enhancementGrowth !== '-').length))}</div>
                <div className="text-sm text-gray-600">Avg Enhanced Growth</div>
              </div>
            </div>
          )}

          {/* Input Form */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-gray-600" />
              <h3 className="font-semibold text-gray-800">SIP Parameters</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <div className="flex flex-col lg:col-span-2">
                <label className="text-sm font-medium text-gray-700 mb-2">Type Any Scheme Name</label>
                <input 
                  type="text"
                  className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={scheme}
                  onChange={(e) => setScheme(e.target.value)}
                  placeholder="Enter mutual fund scheme name"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-2">Installment Amount</label>
                <input 
                  type="number"
                  className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-2">Select Frequency</label>
                <select 
                  className="px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                >
                <option value="Fortnightly">Fortnightly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Annually">Annually</option>
                </select>
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-2">Select Start Date</label>
                <input 
                  type="text"
                  className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  placeholder="DD-MM-YYYY"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-2">Select End Date</label>
                <input 
                  type="text"
                  className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  placeholder="DD-MM-YYYY"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-2">Select Yearly Enhancement(%)</label>
                <select 
                  className="px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={enhancementPercentage}
                  onChange={(e) => setEnhancementPercentage(e.target.value)}
                >
                  <option value="0">0%</option>
                  <option value="5">5%</option>
                  <option value="10">10%</option>
                  <option value="15">15%</option>
                  <option value="20">20%</option>
                  <option value="25">25%</option>
                  <option value="50">50%</option>
                  <option value="75">75%</option>
                  <option value="100">100%</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button 
                className="px-8 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-200 font-medium text-sm shadow-sm disabled:opacity-50"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
                    Loading...
                  </>
                ) : (
                  'Submit'
                )}
              </button>
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
                    placeholder="Search scenarios..."
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
                <span className="ml-2 text-gray-600">Loading SIP scenarios...</span>
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
                      Please submit your parameters to see SIP scenarios
                    </div>
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
              <h3 className="text-lg font-semibold text-gray-800">SIP Annual Enhancement Analysis powered by AdvisorKhoj API</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: '📈', title: 'SIP Calculator', desc: 'Calculate with yearly enhancements' },
                { icon: '💰', title: 'Multiple Scenarios', desc: 'Compare different enhancement rates' },
                { icon: '🔄', title: 'Flexible Parameters', desc: 'Custom dates, amounts & frequency' },
                { icon: '📊', title: 'Growth Analysis', desc: 'Detailed enhancement impact' }
              ].map((feature, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
                  <div className="text-2xl mb-2">{feature.icon}</div>
                  <div className="font-semibold text-blue-600 text-sm mb-1">{feature.title}</div>
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

export default AnnualIncrease;
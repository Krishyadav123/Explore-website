import React, { useState, useMemo, useEffect, useContext } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import { Search, ChevronLeft, ChevronRight, ArrowUpDown, ArrowUp, ArrowDown, Filter, TrendingDown, Loader2, Calendar } from 'lucide-react';
import axios from 'axios';
import { CategoryContext } from '@/context/CategoryContext';
import Footer from '@/component/Footer';
import Navbar from '@/component/Navbar';

const TopSwpReturns = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [globalFilter, setGlobalFilter] = useState('');
  
  // Filter states
  const [amc, setAmc] = useState('All');
  const [category, setCategory] = useState('Equity: Multi Cap');
  const [initialAmount, setInitialAmount] = useState('100000');
  const [swpDate, setSwpDate] = useState('10');
  const [withdrawalAmount, setWithdrawalAmount] = useState('3000');
  const [period, setPeriod] = useState('Monthly');
  const [fromDate, setFromDate] = useState('22-05-2018');
  const [toDate, setToDate] = useState('22-04-2019');
  const [initStartDate, setInitStartDate] = useState('22-05-2018');

  const { categories, loading: categoryLoading, error: categoryError } = useContext(CategoryContext);

  // AMC options (you can expand this based on available AMCs)
  const amcOptions = [
    'All',
    'Shriram Mutual Fund',
    'ICICI Prudential Mutual Fund',
    'Nippon India Mutual Fund', 
    'Axis Mutual Fund',
    'SBI Mutual Fund',
    'HDFC Mutual Fund',
    'Kotak Mahindra Mutual Fund',
    'UTI Mutual Fund',
    'Aditya Birla Sun Life Mutual Fund',
    'Franklin Templeton Mutual Fund',
    'DSP Mutual Fund'
  ];

  // Fetch data from API
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const params = new URLSearchParams({
        key: 'e5485103-6f73-49a2-b45e-8008eefe38ba',
        period: period,
        amc: amc,
        category: category,
        initial_amount: initialAmount,
        swp_date: swpDate,
        withdrawal_amount: withdrawalAmount,
        from_date: fromDate,
        to_date: toDate,
        init_start_date: initStartDate
      });

      const response = await axios.get(
        `https://mfapi.advisorkhoj.com/getTopSWPFunds?${params.toString()}`,
        {
          timeout: 15000, // 15 second timeout for SWP calculations
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
        setError('Request timeout - SWP calculations are taking longer than expected. Please try again.');
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
      // Handle DD-MM-YYYY format
      const [day, month, year] = dateString.split('-');
      const date = new Date(year, month - 1, day);
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
      accessorKey: 'investment_date',
      header: 'Investment Date',
      cell: ({ getValue }) => (
        <span className="text-gray-700 text-sm whitespace-nowrap">{formatDate(getValue())}</span>
      ),
    },
    {
      accessorKey: 'start_date',
      header: 'SWP Start Date',
      cell: ({ getValue }) => (
        <span className="text-blue-600 text-sm whitespace-nowrap">{formatDate(getValue())}</span>
      ),
    },
    {
      accessorKey: 'end_date',
      header: 'SWP End Date',
      cell: ({ getValue }) => (
        <span className="text-blue-600 text-sm whitespace-nowrap">{formatDate(getValue())}</span>
      ),
    },
    {
      accessorKey: 'no_of_installments',
      header: 'Installments',
      cell: ({ getValue }) => (
        <span className="text-gray-700 text-sm font-medium">{getValue() || '-'}</span>
      ),
    },
    {
      accessorKey: 'total_withdrawal_amount',
      header: 'Total Withdrawn',
      cell: ({ getValue }) => (
        <span className="text-red-600 font-semibold text-sm whitespace-nowrap">
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
      header: 'Returns (%)',
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
    {
      id: 'net_value',
      header: 'Net Position',
      cell: ({ row }) => {
        const currentValue = row.original.current_value;
        const totalWithdrawn = row.original.total_withdrawal_amount;
        const initialAmount = "10000"
        
        if (!currentValue || !totalWithdrawn) return <span className="text-gray-400 text-sm">-</span>;
        
        const netValue = currentValue + totalWithdrawn - initialAmount;
        return (
          <div className="text-sm">
            <div className={`font-semibold ${netValue >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(netValue)}
            </div>
            <div className="text-xs text-gray-500">
              Net Gain/Loss
            </div>
          </div>
        );
      },
    },
  ], [initialAmount]);

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
    const totalCurrentValue = data.reduce((sum, item) => sum + (item.current_value || 0), 0);
    const totalWithdrawn = data.reduce((sum, item) => sum + (item.total_withdrawal_amount || 0), 0);
    const totalInstallments = data.reduce((sum, item) => sum + (item.no_of_installments || 0), 0);
    const initialInvestment = parseFloat(initialAmount) * data.length;
    const totalNetValue = totalCurrentValue + totalWithdrawn - initialInvestment;
    
    return {
      avgReturn: validReturns.length ? (validReturns.reduce((a, b) => a + b, 0) / validReturns.length) : 0,
      maxReturn: validReturns.length ? Math.max(...validReturns) : 0,
      minReturn: validReturns.length ? Math.min(...validReturns) : 0,
      totalCurrentValue,
      totalWithdrawn,
      totalInstallments,
      totalNetValue,
      fundCount: data.length
    };
  }, [data, initialAmount]);

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <TrendingDown className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Top SWP Funds Performance</h1>
          </div>
          <p className="text-gray-600 text-sm sm:text-base">Analyze Systematic Withdrawal Plan (SWP) performance across mutual funds</p>
        </div>

        {/* Summary Stats */}
        {summaryStats && !loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
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
              <div className="text-lg font-bold text-purple-600">{formatCurrency(summaryStats.totalCurrentValue).replace('₹', '₹')}</div>
              <div className="text-sm text-gray-600">Current Value</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="text-lg font-bold text-red-600">{formatCurrency(summaryStats.totalWithdrawn).replace('₹', '₹')}</div>
              <div className="text-sm text-gray-600">Total Withdrawn</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className={`text-lg font-bold ${summaryStats.totalNetValue >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(summaryStats.totalNetValue).replace('₹', '₹')}
              </div>
              <div className="text-sm text-gray-600">Net Position</div>
            </div>
          </div>
        )}

        {/* Filter Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold text-gray-800">SWP Filters</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">AMC</label>
              <select 
                className="px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={amc}
                onChange={(e) => setAmc(e.target.value)}
              >
                {amcOptions.map((amcOption) => (
                  <option key={amcOption} value={amcOption}>{amcOption}</option>
                ))}
              </select>
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">Category</label>
              <select 
                className="px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categoryLoading ? (
                  <option>Loading...</option>
                ) : (
                  categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))
                )}
              </select>
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">Initial Amount (₹)</label>
              <input
                type="number"
                className="px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={initialAmount}
                onChange={(e) => setInitialAmount(e.target.value)}
                placeholder="100000"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">Period</label>
              <select 
                className="px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
              >
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Half-Yearly">Half-Yearly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">SWP Date</label>
              <input
                type="number"
                min="1"
                max="28"
                className="px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={swpDate}
                onChange={(e) => setSwpDate(e.target.value)}
                placeholder="10"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">Withdrawal Amount (₹)</label>
              <input
                type="number"
                className="px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={withdrawalAmount}
                onChange={(e) => setWithdrawalAmount(e.target.value)}
                placeholder="3000"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">From Date</label>
              <input
                type="text"
                className="px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                placeholder="DD-MM-YYYY"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">To Date</label>
              <input
                type="text"
                className="px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                placeholder="DD-MM-YYYY"
              />
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
              <span className="ml-2 text-gray-600">Calculating SWP performance...</span>
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
                  <div className="text-gray-400 text-lg mb-2">📊 No SWP data found</div>
                  <div className="text-gray-500 text-sm">
                    Try adjusting your filters or date range
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
              <TrendingDown className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">SWP Performance Analytics powered by AdvisorKhoj API</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: '💰', title: 'SWP Calculator', desc: 'Real-time systematic withdrawal analysis' },
              { icon: '📊', title: 'Live Performance', desc: 'Track returns with withdrawals' },
              { icon: '🔄', title: 'Flexible Filters', desc: 'AMC, category, dates & amounts' },
              { icon: '📈', title: 'Net Position', desc: 'Complete gain/loss analysis' }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
                <div className="text-2xl mb-2">{feature.icon}</div>
                <div className="font-semibold text-blue-800 text-sm mb-1">{feature.title}</div>
                <div className="text-gray-600 text-xs">{feature.desc}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-white rounded-lg border border-blue-100">
            <h4 className="font-semibold text-blue-800 mb-2">Understanding SWP Metrics:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <strong>Total Withdrawn:</strong> Sum of all SWP installments
              </div>
              <div>
                <strong>Current Value:</strong> Remaining investment value
              </div>
              <div>
                <strong>Net Position:</strong> Current Value + Withdrawn - Initial Investment
              </div>
              <div>
                <strong>Returns:</strong> Annualized returns considering withdrawals
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default TopSwpReturns;
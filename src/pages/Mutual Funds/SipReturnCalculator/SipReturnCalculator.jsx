import React, { useState, useMemo, useEffect, useContext } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import { Search, ChevronLeft, ChevronRight, ArrowUpDown, ArrowUp, ArrowDown, Filter, Calculator, Loader2, Calendar } from 'lucide-react';
import axios from 'axios';
import { CategoryContext } from '@/context/CategoryContext';
import Footer from '@/component/Footer';
import Navbar from '@/component/Navbar';

const SipReturnCalculator = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [globalFilter, setGlobalFilter] = useState('');
  
  // Filter states
  const [category, setCategory] = useState('Equity: Mid Cap');
  const [amount, setAmount] = useState('1000');
  const [frequency, setFrequency] = useState('Quarterly');
  const [startdate, setStartdate] = useState('19-05-2018');
  const [enddate, setEnddate] = useState('19-04-2019');
  const [funds, setFunds] = useState([]);
  const [selectedFunds, setSelectedFunds] = useState([]);
  const [loadingFunds, setLoadingFunds] = useState(false);

  const { categories, loading: categoryLoading } = useContext(CategoryContext);

  // Fetch funds for selected category
  const fetchFunds = async (categoryName) => {
    if (!categoryName) return;
    
    setLoadingFunds(true);
    try {
      const response = await axios.get(
        `https://mfapi.advisorkhoj.com/getSIPReturnsForCategoryPeriodAmount?key=e5485103-6f73-49a2-b45e-8008eefe38ba&category=${encodeURIComponent(categoryName)}&period=3&amount=1000`,
        { timeout: 10000 }
      );
      
      if (response.data.status === 200 && response.data.list) {
        const uniqueFunds = response.data.list.map(item => item.scheme_name).sort();
        setFunds(uniqueFunds);
        // Select first 5 funds by default for demonstration
        setSelectedFunds(uniqueFunds.slice(0, 5));
      }
    } catch (err) {
      console.error('Error fetching funds:', err);
      setFunds([]);
      setSelectedFunds([]);
    } finally {
      setLoadingFunds(false);
    }
  };

  useEffect(() => {
    if (category) {
      fetchFunds(category);
    }
  }, [category]);

  // Format date for API (DD-MM-YYYY)
  const formatDateForAPI = (dateString) => {
    if (!dateString) return '';
    if (dateString.includes('-') && dateString.split('-')[0].length === 2) {
      return dateString; // Already in DD-MM-YYYY format
    }
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Convert DD-MM-YYYY to YYYY-MM-DD for input field
  const convertToInputDate = (apiDate) => {
    if (!apiDate) return '';
    const parts = apiDate.split('-');
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return apiDate;
  };

  // Convert YYYY-MM-DD to DD-MM-YYYY for API
  const convertFromInputDate = (inputDate) => {
    if (!inputDate) return '';
    const parts = inputDate.split('-');
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return inputDate;
  };

  // Fetch SIP data for multiple funds
  const fetchSIPData = async () => {
    if (!category || selectedFunds.length === 0 || !amount || !frequency || !startdate || !enddate) {
      setError('Please fill in all required fields and select at least one fund');
      return;
    }

    setLoading(true);
    setError(null);
    setData([]);

    try {
      const promises = selectedFunds.map(async (fund) => {
        try {
          const response = await axios.get(
            `https://mfapi.advisorkhoj.com/getSIPReturnCalculator`,
            {
              params: {
                key: 'e5485103-6f73-49a2-b45e-8008eefe38ba',
                category: category,
                fund: fund,
                amount: amount,
                frequency: frequency,
                startdate: startdate,
                enddate: enddate
              },
              timeout: 15000
            }
          );

          if (response.data.status === 200 && response.data.list && response.data.list.length > 0) {
            return {
              ...response.data.list[0],
              original_fund_name: fund,
              category: response.data.category,
              frequency: response.data.frequency,
              startdate: response.data.startdate,
              enddate: response.data.enddate,
              id: `${fund}-${Date.now()}-${Math.random()}`
            };
          }
          return null;
        } catch (err) {
          console.error(`Error fetching data for ${fund}:`, err);
          return null;
        }
      });

      const results = await Promise.all(promises);
      const validResults = results.filter(result => result !== null);
      
      if (validResults.length === 0) {
        setError('No data found for the selected criteria');
      } else {
        setData(validResults);
      }
    } catch (err) {
      setError('Error fetching SIP data: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedFunds.length > 0) {
      fetchSIPData();
    }
  }, []);

  // Format currency
  const formatCurrency = (value) => {
    if (!value) return '₹0';
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
      return dateString;
    }
  };

  // Column definitions
  const columns = useMemo(() => [
    {
      accessorKey: 'scheme',
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
      header: 'Inception Date',
      cell: ({ getValue }) => (
        <span className="text-gray-700 text-sm whitespace-nowrap">{formatDate(getValue())}</span>
      ),
    },
    {
      accessorKey: 'invested_amount',
      header: 'Invested Amount',
      cell: ({ getValue }) => (
        <span className="text-gray-700 text-sm whitespace-nowrap font-semibold">
          {formatCurrency(getValue())}
        </span>
      ),
    },
    {
      accessorKey: 'current_value',
      header: 'Maturity Value',
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
      id: 'profit_loss',
      header: 'Profit/Loss',
      cell: ({ row }) => {
        const currentValue = row.original.current_value;
        const invested = row.original.invested_amount;
        if (!currentValue || !invested) return <span className="text-gray-400 text-sm">-</span>;
        
        const profitLoss = currentValue - invested;
        return (
          <div className="text-sm">
            <div className={`font-semibold ${profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(profitLoss)}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'no_of_installment',
      header: 'Installments',
      cell: ({ getValue }) => (
        <span className="text-gray-700 text-sm">{getValue()}</span>
      ),
    },
    {
      accessorKey: 'units',
      header: 'Total Units',
      cell: ({ getValue }) => (
        <span className="text-gray-700 text-sm">{getValue()?.toFixed(4)}</span>
      ),
    },
    {
      accessorKey: 'nav',
      header: 'Final NAV',
      cell: ({ getValue }) => (
        <span className="text-gray-700 text-sm">₹{getValue()}</span>
      ),
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
          id: 'returns',
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
    
    const totalInvested = data.reduce((sum, item) => sum + (item.invested_amount || 0), 0);
    const totalCurrentValue = data.reduce((sum, item) => sum + (item.current_value || 0), 0);
    const avgReturns = data.reduce((sum, item) => sum + (item.returns || 0), 0) / data.length;
    const maxReturns = Math.max(...data.map(item => item.returns || 0));
    const totalProfitLoss = totalCurrentValue - totalInvested;
    
    return {
      fundCount: data.length,
      totalInvested,
      totalCurrentValue,
      avgReturns,
      maxReturns,
      totalProfitLoss
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
            <Calculator className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">SIP Return Calculator</h1>
          </div>
          <p className="text-gray-600 text-sm sm:text-base">Compare SIP returns across multiple funds with historical data</p>
        </div>

        {/* Summary Stats */}
        {summaryStats && !loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="text-2xl font-bold text-blue-600">{summaryStats.fundCount}</div>
              <div className="text-sm text-gray-600">Funds Compared</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="text-lg font-bold text-purple-600">{formatCurrency(summaryStats.totalInvested)}</div>
              <div className="text-sm text-gray-600">Total Invested</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="text-lg font-bold text-green-600">{formatCurrency(summaryStats.totalCurrentValue)}</div>
              <div className="text-sm text-gray-600">Total Value</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="text-2xl font-bold text-orange-600">{summaryStats.avgReturns.toFixed(1)}%</div>
              <div className="text-sm text-gray-600">Avg Return</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="text-2xl font-bold text-emerald-600">{summaryStats.maxReturns.toFixed(1)}%</div>
              <div className="text-sm text-gray-600">Best Return</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className={`text-lg font-bold ${summaryStats.totalProfitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(summaryStats.totalProfitLoss)}
              </div>
              <div className="text-sm text-gray-600">Total P&L</div>
            </div>
          </div>
        )}

        {/* Filter Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold text-gray-800">SIP Parameters</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">Category</label>
              <select 
                className="px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={categoryLoading}
              >
                {categoryLoading ? (
                  <option>Loading...</option>
                ) : (
                  categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))
                )}
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
                <option value="30000">₹30,000</option>
                <option value="50000">₹50,000</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">Frequency</label>
              <select 
                className="px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
              >
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Half-yearly">Half-yearly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Start Date
              </label>
              <input
                type="date"
                className="px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={convertToInputDate(startdate)}
                onChange={(e) => setStartdate(convertFromInputDate(e.target.value))}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                End Date
              </label>
              <input
                type="date"
                className="px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={convertToInputDate(enddate)}
                onChange={(e) => setEnddate(convertFromInputDate(e.target.value))}
              />
            </div>
          </div>

          {/* Fund Selection */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 mb-2 block">Select Funds to Compare</label>
            {loadingFunds ? (
              <div className="flex items-center text-sm text-gray-500">
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Loading funds...
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-3">
                {funds.map((fund) => (
                  <label key={fund} className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      className="mr-2 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      checked={selectedFunds.includes(fund)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedFunds([...selectedFunds, fund]);
                        } else {
                          setSelectedFunds(selectedFunds.filter(f => f !== fund));
                        }
                      }}
                    />
                    <span className="text-xs text-gray-700">{fund}</span>
                  </label>
                ))}
              </div>
            )}
            <div className="text-xs text-gray-500 mt-1">
              Selected: {selectedFunds.length} funds
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium text-sm shadow-sm disabled:opacity-50 flex items-center gap-2"
              onClick={fetchSIPData}
              disabled={loading || selectedFunds.length === 0}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Calculating...
                </>
              ) : (
                <>
                  <Calculator className="w-4 h-4" />
                  Calculate SIP Returns
                </>
              )}
            </button>
            <div className="text-sm text-gray-600">
              {selectedFunds.length} fund(s) selected
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
                  onClick={fetchSIPData} 
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
              <span className="ml-2 text-gray-600">Calculating SIP returns...</span>
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
                  <div className="text-gray-500 text-sm mb-4">
                    Select funds and click "Calculate SIP Returns" to view results
                  </div>
                  <button 
                    onClick={fetchSIPData}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm disabled:opacity-50"
                    disabled={selectedFunds.length === 0}
                  >
                    Calculate Returns
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
                  </div>

                  <div className="flex items-center gap-2 order-1 sm:order-2">
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
              <Calculator className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Comprehensive SIP Analysis powered by AdvisorKhoj API</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: '📊', title: 'Historical Data', desc: 'Real NAV-based SIP calculations' },
              { icon: '💰', title: 'Multi-fund Compare', desc: 'Compare multiple funds side-by-side' },
              { icon: '📅', title: 'Flexible Dates', desc: 'Custom investment period selection' },
              { icon: '📈', title: 'Detailed Returns', desc: 'Comprehensive performance metrics' }
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

export default SipReturnCalculator
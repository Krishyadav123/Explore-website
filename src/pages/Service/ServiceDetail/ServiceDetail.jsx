import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ServiceDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const service = location.state?.service;

  if (!service) {
    return <p className="text-center mt-20">Service not found.</p>;
  }

  const renderContentByTitle = (title) => {
    switch (title) {
      case "Personalized Goal Planning":
        return (
          <>
            <h2 className="text-2xl font-semibold mb-3">
              Steps in Personal Financial Goal Planning
            </h2>
            <ol className="list-decimal pl-6 text-gray-700 space-y-2">
              <li>
                <strong>Identify Your Financial Needs</strong> – Think about
                what you want: saving, buying a house, child’s education,
                retirement, etc.
              </li>
              <li>
                <strong>Set Clear Goals</strong> – Write them clearly
                (short-term, medium-term, long-term).
              </li>
              <li>
                <strong>Make Them SMART</strong> – Specific (e.g., buy a car
                worth ₹6 lakh), Measurable, Achievable, Relevant, Time-bound.
              </li>
              <li>
                <strong>Prioritize Your Goals</strong> – Decide which goal is
                most urgent or important.
              </li>
              <li>
                <strong>Check Your Current Financial Position</strong> – Income,
                expenses, savings, loans, assets.
              </li>
              <li>
                <strong>Estimate How Much You Need</strong> – Calculate the
                future cost (consider inflation).
              </li>
              <li>
                <strong>Create an Action Plan</strong> – Decide how much to
                save/invest regularly (monthly SIPs, deposits).
              </li>
              <li>
                <strong>Choose the Right Investment Options</strong> –
                <ul className="list-disc pl-6">
                  <li>Short-term → safer investments (FD, RD, liquid funds)</li>
                  <li>Long-term → growth investments (mutual funds, stocks)</li>
                </ul>
              </li>
              <li>
                <strong>Implement and Automate</strong> – Start and automate
                your investments.
              </li>
              <li>
                <strong>Review and Adjust</strong> – Check progress yearly and
                adjust as needed.
              </li>
              <li>
                <strong>Celebrate Milestones</strong> – Acknowledge achievements
                and stay motivated.
              </li>
            </ol>
          </>
        );

      case "Comprehensive Portfolio Analysis":
        return (
          <>
            <h2 className="text-2xl font-semibold mb-3">
              Portfolio Review Best Practices
            </h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>
                <strong>Rebalance Your Portfolio</strong> –<em>Example:</em> If
                your original 70% equity + 30% debt has become 80% equity + 20%
                debt, sell equity and buy debt to restore balance.
              </li>
              <li>
                <strong>Identify Underperforming Schemes</strong> –
                <br />
                <em>Example:</em> If a mid-cap fund gave 6% in 3 years but Nifty
                Midcap gave 12%, it’s underperforming.
              </li>
              <li>
                <strong>Optimise Diversification</strong> –
                <br />
                <em>Example:</em> 5–6 well-selected funds are better than 15–20
                redundant ones.
              </li>
            </ul>

            <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-400">
              <p className="font-semibold">📌 In short:</p>
              <ol className="list-decimal pl-6 mt-1 text-gray-700 space-y-1">
                <li>Review = Check regularly</li>
                <li>Eliminate Overlap = Avoid duplication</li>
                <li>Rebalance = Adjust to target allocation</li>
                <li>Identify Underperformance = Cut weak funds</li>
                <li>Optimise Diversification = Spread risk smartly</li>
              </ol>
            </div>
          </>
        );

      case "Retirement Planning":
        return (
          <>
            <h2 className="text-2xl font-semibold mb-4">
              Steps in Retirement Planning
            </h2>
            <ol className="list-decimal pl-6 text-gray-700 space-y-2 mb-6">
              <li>
                <strong>Estimate Future Expenses</strong> – Living, lifestyle,
                one-time costs, healthcare.
              </li>
              <li>
                <strong>Hybrid & Index Fund Strategies</strong> – Equity-heavy
                early, shift to hybrid/debt near retirement.
              </li>
              <li>
                <strong>Account for Inflation and Medical Costs</strong> –
                Invest to beat inflation and cover rising healthcare costs.
              </li>
              <li>
                <strong>Regular Review and Adjustment</strong> – Rebalance
                annually and adapt to lifestyle/medical changes.
              </li>
            </ol>

            <h3 className="text-xl font-bold mb-2">✅ In short:</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-6">
              <li>Early years → equity/index funds</li>
              <li>Mid-late years → hybrid & debt</li>
              <li>Review & plan for inflation + health</li>
            </ul>

            <h3 className="text-xl font-bold mb-3">
              📊 Retirement Mutual Fund Allocation by Age
            </h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-3">
              <li>
                🟢 Age 25–35: 70% Equity, 15% Mid-cap, 10% Debt, 5% Hybrid
              </li>
              <li>
                🟡 Age 36–45: 55% Equity, 10% Mid-cap, 20% Hybrid, 15% Debt
              </li>
              <li>🟠 Age 46–55: 40% Equity, 30% Hybrid, 30% Debt</li>
              <li>🔴 Age 56–65: 25% Equity, 30% Hybrid, 45% Debt</li>
              <li>⚪ 65+: 15% Equity, 25% Hybrid, 60% Debt</li>
            </ul>

            <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-400">
              <p>
                <strong>✅ Key Takeaways:</strong>
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Start equity-heavy, shift to safety with age</li>
                <li>Account for inflation & medical expenses</li>
                <li>Review annually</li>
              </ul>
            </div>
          </>
        );

      case "Risk Profiling (As Per SEBI Guidelines)":
        return (
          <>
            <h2 className="text-2xl font-semibold mb-4">
              Steps in Risk Profiling
            </h2>
            <ol className="list-decimal pl-6 text-gray-700 space-y-2 mb-6">
              <li>
                <strong>Assess Risk Capital</strong> – Based on income,
                liabilities, dependents, savings.
                <br />✅ Example: Young, debt-free salaried = high risk capital.
              </li>
              <li>
                <strong>Profile Categorization (Risk Appetite)</strong> –
                Conservative, Moderate, Aggressive.
                <br />✅ Example: High-income but anxious =
                conservative/moderate.
              </li>
              <li>
                <strong>Evaluate Investment Horizon</strong> – Long-term = more
                equity possible.
                <br />✅ Example: Retirement in 20 years → equity. College in 3
                → debt/hybrid.
              </li>
            </ol>

            <h3 className="text-xl font-bold mb-2">
              📌 Fund Recommendation by Risk Level
            </h3>
            <table className="w-full table-auto border-collapse text-left text-sm mb-6">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2">Risk Profile</th>
                  <th className="border px-4 py-2">Investment Horizon</th>
                  <th className="border px-4 py-2">Recommended Funds</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">Conservative</td>
                  <td className="border px-4 py-2">1–3 years</td>
                  <td className="border px-4 py-2">
                    Liquid, Ultra-short, Short-term Debt
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Moderate</td>
                  <td className="border px-4 py-2">3–5 years</td>
                  <td className="border px-4 py-2">
                    Hybrid, Balanced Advantage, Large-cap Equity
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Aggressive</td>
                  <td className="border px-4 py-2">5+ years</td>
                  <td className="border px-4 py-2">
                    Equity (Multi/Mid/Small-cap), Thematic
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400">
              <p>
                <strong>📌 In summary:</strong>
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Risk = Ability + Willingness + Time</li>
                <li>Use it to match investors to correct funds</li>
              </ul>
            </div>
          </>
        );

      case "Child Education Planning":
        return (
          <>
            <h2 className="text-2xl font-semibold mb-4">
              Child Education Planning through Mutual Funds
            </h2>
            <p className="mb-4">
              As education costs are rising steeply, planning early using mutual
              funds can help you accumulate the required corpus for your child’s
              higher education.
            </p>
            <ol className="list-decimal pl-6 text-gray-700 space-y-2">
              <li>
                <strong>Estimate Future Cost:</strong> Calculate expected
                education expenses including tuition, living, travel, and
                inflation (~8-10% p.a).
              </li>
              <li>
                <strong>Choose Funds Based on Time Horizon:</strong>
                <ul className="list-disc pl-6">
                  <li>Long term (10+ years): Equity / Index Funds</li>
                  <li>Medium term (5-10 years): Hybrid Funds</li>
                  <li>Short term (&lt;5 years): Debt / Liquid Funds</li>
                </ul>
              </li>
              <li>
                <strong>Start Early and Invest Regularly:</strong> Use SIPs for
                disciplined investing.
              </li>
              <li>
                <strong>Review Periodically:</strong> Check progress every 6 to
                12 months and adjust if needed.
              </li>
              <li>
                <strong>Stay Invested Through Market Cycles:</strong> Avoid panic
                selling.
              </li>
            </ol>
          </>
        );

      case "Child Marriage Planning":
        return (
          <>
            <h2 className="text-2xl font-semibold mb-4">
              Child Marriage Planning through Mutual Funds
            </h2>
            <p className="mb-4">
              Marriage expenses are significant and tend to rise over time due
              to inflation and lifestyle changes. Planning early ensures
              sufficient funds are available.
            </p>
            <ol className="list-decimal pl-6 text-gray-700 space-y-2">
              <li>
                <strong>Estimate Future Expenses:</strong> Include venue,
                rituals, gifts, travel, and assume 6-8% inflation.
              </li>
              <li>
                <strong>Investment Horizon Based Fund Choice:</strong>
                <ul className="list-disc pl-6">
                  <li>Long term (10+ years): Equity Funds</li>
                  <li>Medium term (5-10 years): Hybrid / Debt Funds</li>
                </ul>
              </li>
              <li>
                <strong>Start SIPs Early:</strong> Benefit from compounding.
              </li>
              <li>
                <strong>Tax Planning:</strong> Use ELSS and plan capital gains
                tax efficiently.
              </li>
              <li>
                <strong>Liquidity Planning:</strong> Use debt/liquid funds as the
                marriage date approaches.
              </li>
              <li>
                <strong>Withdrawal Strategy:</strong> Avoid withdrawing during
                market downturns.
              </li>
            </ol>
          </>
        );

      case "Wealth Creation":
        return (
          <>
            <h2 className="text-2xl font-semibold mb-4">
              Wealth Creation through Mutual Funds
            </h2>
            <p className="mb-4">
              Mutual funds provide an effective avenue for long-term wealth
              creation by investing in diversified portfolios managed by
              professionals.
            </p>
            <ol className="list-decimal pl-6 text-gray-700 space-y-2">
              <li>
                <strong>Long-term Focus:</strong> Invest for 8-15+ years in
                equity, sector/thematic, or index funds to harness growth.
              </li>
              <li>
                <strong>Diversification:</strong> Across asset classes, sectors,
                and geographies to mitigate risk.
              </li>
              <li>
                <strong>Systematic Investment Plan (SIP):</strong> Regular monthly
                investments help smooth market volatility and build corpus.
              </li>
              <li>
                <strong>Performance Review and Rebalancing:</strong> Periodically
                track fund performance, cut underperformers, and rebalance portfolio.
              </li>
              <li>
                <strong>Discipline and Patience:</strong> Key for successful
                wealth creation.
              </li>
            </ol>
            <div className="p-4 bg-green-50 border-l-4 border-green-400 mt-6">
              <strong>Summary:</strong> Wealth creation requires patience,
              discipline, and strategic portfolio management.
            </div>
          </>
        );

      default:
        return (
          <>
            <h2 className="text-2xl font-semibold mb-3">Features</h2>
            <ul className="list-disc pl-6 mb-6">
              {service.features?.map((feature, index) => (
                <li key={index} className="text-gray-600 mb-1">
                  {feature}
                </li>
              ))}
            </ul>
          </>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-14 px-4">

      <h1 className="text-3xl font-bold mb-4">{service.title}</h1>
      <p className="text-gray-700 mb-6">{service.description}</p>

      {renderContentByTitle(service.title)}
      <button
        onClick={() => navigate(-1)}
        className="inline-block text-right mt-6 px-3 py-2 text-brown-700 bg-gradient-to-r from-gray-400 to-gray-300 rounded-lg "
      >
        ← Back to Services
      </button>
    </div>
  );
};

export default ServiceDetail;

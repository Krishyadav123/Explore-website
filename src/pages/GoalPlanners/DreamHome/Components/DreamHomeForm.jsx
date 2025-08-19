import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DreamHomeForm = () => {
  const [form, setForm] = useState({
    years: "",
    cost: "",
    inflation: "",
    goalName: "",
    risk: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Check if all fields are filled
  const isFormComplete =
    form.years && form.cost && form.inflation && form.goalName;

  return (
    <div className="bg-gray-100 py-40 flex items-center justify-center">
      <div className="max-w-6xl w-full mx-auto p-10 bg-white shadow-2xl rounded-2xl">
        <h2 className="text-2xl font-bold text-center text-blue-900 mb-8">
          Dream Home
        </h2>

        <div className="space-y-8 text-center text-gray-700">
          {/* Step 1 */}
          <p className="text-lg">
            You are planning to buy your Dream House{" "}
            <input
              type="number"
              name="years"
              value={form.years}
              onChange={handleChange}
              className="border-b-2 border-gray-400 focus:outline-none w-28 text-center mx-2"
            />{" "}
            years.
          </p>

          {/* Step 2 */}
          <AnimatePresence>
            {form.years && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-lg">
                  The cost of this House would be around ₹{" "}
                  <input
                    type="number"
                    name="cost"
                    value={form.cost}
                    onChange={handleChange}
                    className="border-b-2 border-gray-400 focus:outline-none w-28 text-center mx-2"
                  />{" "}
                  in today's value.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 3 */}
          <AnimatePresence>
            {form.cost && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-lg">
                  You assume the inflation to be{" "}
                  <input
                    type="number"
                    name="inflation"
                    value={form.inflation}
                    onChange={handleChange}
                    className="border-b-2 border-gray-400 focus:outline-none w-24 text-center mx-2"
                  />{" "}
                  % and You would like to name this goal as{" "}
                  <input
                    type="text"
                    name="goalName"
                    value={form.goalName}
                    onChange={handleChange}
                    className="border-b-2 border-gray-400 focus:outline-none w-32 text-center mx-2"
                  />
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 4 */}
          <AnimatePresence>
            {form.inflation && form.goalName && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-lg">
                  You can take{" "}
                  <select
                    name="risk"
                    value={form.risk}
                    onChange={handleChange}
                    className="border-b-2 border-gray-400 focus:outline-none mx-2 px-5"
                  >
                    {/* <option value="">Select</option> */}
                    <option value="Conservative">Conservative</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Aggressive">Aggressive</option>
                  </select>{" "}
                  risk with your investments.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ✅ Final Button (always visible, but disabled until complete) */}
        <div className="pt-10 text-center">
          <button
            disabled={!isFormComplete}
            className={`px-6 py-2 rounded-lg transition ${
              isFormComplete
                ? "bg-orange-500 text-white hover:bg-orange-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Build My Dream Home Goal
          </button>
        </div>
      </div>
    </div>
  );
};

export default DreamHomeForm;

import React, { useState, useEffect } from "react";

const Admin = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [isAuth, setIsAuth] = useState(false);
  const [siteDisabled, setSiteDisabled] = useState(false);

  useEffect(() => {
    // Load saved status on mount
    const status = localStorage.getItem("siteDisabled") === "true";
    setSiteDisabled(status);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    // ✅ Hardcoded username & password
    if (form.username === "krish" && form.password === "1234") {
      setIsAuth(true);
    } else {
      alert("Invalid credentials!");
    }
  };

  const handleToggle = () => {
    const newStatus = !siteDisabled;
    setSiteDisabled(newStatus);
    localStorage.setItem("siteDisabled", newStatus); // 🔐 Save globally
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {!isAuth ? (
        // 🔐 Login Form
        <form
          onSubmit={handleLogin}
          className="bg-white p-6 rounded-2xl shadow-md w-80"
        >
          <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="w-full p-2 mb-3 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full p-2 mb-3 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      ) : (
        // ⚡ After Login → Kill Switch
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Kill Switch Panel</h2>
          <p className="mb-4">
            Website Status:{" "}
            <span
              className={`font-bold ${
                siteDisabled ? "text-red-600" : "text-green-600"
              }`}
            >
              {siteDisabled ? "Disabled" : "Active"}
            </span>
          </p>
          <button
            onClick={handleToggle}
            className={`px-6 py-2 rounded text-white ${
              siteDisabled
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {siteDisabled ? "Enable Website" : "Disable Website"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Admin;

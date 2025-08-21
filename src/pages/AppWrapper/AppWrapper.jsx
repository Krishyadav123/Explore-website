import React, { useEffect, useState } from "react";

const AppWrapper = ({ children }) => {
  const [siteDisabled, setSiteDisabled] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await fetch("/status.json?_=" + Date.now()); // avoid caching
        const data = await res.json();
        setSiteDisabled(data.disabled);
      } catch (err) {
        console.error("Status check failed:", err);
      }
    };

    checkStatus(); // first check
    const interval = setInterval(checkStatus, 10000); // re-check every 10 sec

    return () => clearInterval(interval);
  }, []);

  if (siteDisabled) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-100 text-red-800 text-xl font-bold">
        🚨 Website is temporarily disabled. Please check back later.
      </div>
    );
  }

  return children;
};

export default AppWrapper;

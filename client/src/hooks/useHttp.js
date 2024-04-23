import { useCallback, useEffect, useState } from "react";

// Function to to receive HTTP requests
async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || "Request failed!");
  }

  return resData;
}

// Custom hook to manage HTTP requests
export default function useHttp(url, config, initialData) {
  // React states
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(initialData);
  const [error, setError] = useState();

  // Function to reset the data
  function clearData() {
    setData(initialData);
  }

  // Function object to send a request
  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true); // Toggle the request status

      // Try to send the request
      try {
        // Call the sendHttpRequest function
        const resData = await sendHttpRequest(url, { ...config, body: data });
        setData(resData); // Set the data
      } catch (error) {
        setError(error.message || "Something went wrong!");
      }

      setIsLoading(false);
    },
    [url, config]
  );

  // Use effect to send the request before the component is rendered
  useEffect(() => {
    // Validate the method
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    isLoading,
    data,
    error,
    sendRequest,
    clearData,
  };
}

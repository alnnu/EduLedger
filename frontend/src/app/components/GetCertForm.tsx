"use client"
import { useState } from "react";

interface GetCertFormProps {
    getCert: (id: number) => Promise<void>;
    setCert: (cert: any) => void;
  }
  
  export default function GetCertForm({ getCert, setCert }: GetCertFormProps) {
    const [searchId, setSearchId] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setCert("Fetching certificate...");
      try {
        await getCert(searchId);
      } catch (error) {
        console.error(error);
        // @ts-ignore
        setCert(`Error: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Get Certificate</h2>
        <div className="mb-4">
          <label htmlFor="searchId" className="block text-gray-700 text-sm font-bold mb-2">
            Certificate ID
          </label>
          <input
            type="number"
            id="searchId"
            value={searchId}
            onChange={(e) => setSearchId(Number(e.target.value))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
        >
          {isLoading ? "Fetching..." : "Get Certificate"}
        </button>
      </form>
    );
  }
  
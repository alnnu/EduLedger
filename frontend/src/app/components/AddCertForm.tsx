"use client"
import { useState } from "react";

interface AddCertFormProps {
    addCert: () => Promise<void>;
    setCert: (cert: any) => void;
  }
  
  export default function AddCertForm({ addCert, setCert }: AddCertFormProps) {
    const [isLoading, setIsLoading] = useState(false);
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setCert("Adding certificate...");
      try {
        await addCert();
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
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Certificate</h2>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
        >
          {isLoading ? "Adding..." : "Add Certificate"}
        </button>
      </form>
    );
  }
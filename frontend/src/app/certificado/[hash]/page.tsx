"use client"
import { getCertService } from "@/service/web3"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"

export default function CertificadoIdPage() {
  const { hash } = useParams();

  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    const certService = await getCertService(`${hash}`);
    console.log(certService);

    setLoading(false);
  }


  useEffect(() => {
    if (hash) fetchData();
  }, [hash, fetchData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Carregando...</p>
      </div>
    )
  }
  return (
    <div>
      em breve
    </div>
  )
}

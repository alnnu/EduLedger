"use client"

import { getAllCertsService } from "@/service/web3"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import CertTable from "../components/certificado/certTable"

export default function CertificadoPage() {
  const [certs, setCerts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const certs = await getAllCertsService();
      setCerts(certs);
    } catch (error) {
      console.error("Falha ao buscar os certificados:", error);
      toast.error("Falha ao buscar os certificado");
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  },);


  if (loading) {
    return <div>Carregando certificados...</div>;
  }
  return (
    <div>
      <CertTable certificados={certs} />
    </div>
  )
}

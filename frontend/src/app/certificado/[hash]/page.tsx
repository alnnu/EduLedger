"use client"
import { getCertService } from "@/service/web3"
import { useState } from "react"
import { useParams } from "next/navigation"

export default function CertificadoIdPage() {
  const { hash } = useParams();

  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    const certService = await getCertService(`${hash}`);
    console.log(certService);
  }

  fetchData();
  return (
    <div>
      em breve
    </div>
  )
}

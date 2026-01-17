"use client"
import {
  getCertService
} from "@/service/web3";
import {
  useState,
  useEffect
} from "react";
import {
  useParams
} from "next/navigation";
import Image from "next/image"
import ipfs from "@/service/ipfs";
import {
  CertType
} from "@/schema/certSchema";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Button
} from "@/components/ui/button";
import Link from "next/link";
import {
  Separator
} from "@/components/ui/separator";
import { toast } from "sonner";

export default function CertificadoIdPage() {
  const {
    hash
  } = useParams();

  const [loading, setLoading] = useState<boolean>(true);

  const [certData, setCertData] = useState<CertType | null>(null);
  const [metadado, setMetadado] = useState<any>(null);

  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '';
  const contractAddressNFT = process.env.NEXT_PUBLIC_CONTRACT_NFT_ADDRESS || '';

  const fetchData = async () => {
    try {
      const certService = await getCertService(`${hash}`);
      setCertData(certService);
      console.log(certService);
      const metadado = await ipfs.getObject(certService.display.metadado);
      setMetadado(metadado.data);
    } catch (error) {
      console.error("Erro ao buscar dados do certificado:", error);
      toast.error("Erro ao buscar dados do certificado.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hash) {
      fetchData();
    }
  }, [hash]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl">Carregando...</div>
      </div>
    );
  }


  console.log(certData);

  if (!certData || !metadado) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl text-red-500">Certificado não encontrado</div>
      </div>
    );
  }
  // console.log(metadado.image);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-4xl overflow-hidden">
        <div className="md:flex p-4">
          <div className="md:flex-shrink-0">
            <Image src={metadado.image} alt="Certificado" width={500} height={400} className="object-cover rounded-md" />
          </div>
          <div className="flex-grow">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">{metadado.name}</CardTitle>
              <CardDescription>Este certificado foi registrado na blockchain.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Aluno</p>
                  <p className="text-lg font-semibold">{certData?.aluno}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Curso</p>
                  <p className="text-lg font-semibold">{certData?.curso}</p>
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Instituição</p>
                  <p className="text-lg font-semibold">{certData?.credenciais.instituicao}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Data de Emissão</p>
                  <p className="text-lg font-semibold">{certData?.data}</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-1 mb-2">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Hash do Certificado</p>
                <p className="text-sm font-mono break-all">{hash}</p>
                <div className="flex flex-col sm:flex-row justify-center gap-2">
                  <Button asChild>
                    <Link href={metadado.image} target="_blank" rel="noopener noreferrer">
                      Ver no IPFS
                    </Link>
                  </Button>
                </div>


              </div>
            </CardContent>
          </div>
        </div>

        <Separator />
        <CardFooter className="flex">
          <div className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Endereço do contrato que emitiu</p>
                <p className="text-lg font-semibold">{contractAddress}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Endereço do contrato que gerou o NFT</p>
                <p className="text-lg font-semibold">{contractAddressNFT}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Id do Nft</p>
                <p className="text-lg font-semibold">{certData?.display.NFTid}</p>
              </div>
            </div>
          </div>

        </CardFooter>
      </Card>
    </div>
  );
}

"use client"
import {
  useState
} from "react"
import CertForm from "../components/certificado/createForm";



export default function MyForm() {

  const [files, setFiles] = useState<File[] | null>(null);


  return (
    <CertForm setFiles={setFiles} files={files} />
  )
}

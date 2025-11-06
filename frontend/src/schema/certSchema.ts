export type addCertType = {
  instituicao: string;
  curso: string;
  data: string;
  aluno: string;
  hashImagen: string;
  hashMetadado: string;
}

export type CertType = {
  aluno: string;
  curso: string;
  data: string;
  credenciais: {
    instituicao: string;
    carteira: string;
  }
  display: {
    imagem: string;
    metadado: string;
  }
}




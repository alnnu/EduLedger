"use client"
import {
  useState,
  useEffect
} from "react"
import {
  toast
} from "sonner"
import {
  useForm
} from "react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import {
  z
} from "zod"
import {
  cn
} from "@/lib/utils"
import {
  Button
} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Input
} from "@/components/ui/input"
import {
  format
} from "date-fns"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import {
  Calendar
} from "@/components/ui/calendar"
import {
  Calendar as CalendarIcon
} from "lucide-react"
import {
  CloudUpload,
  Paperclip
} from "lucide-react"
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem
} from "@/components/ui/file-upload"
import Ipsf from "@/service/ipfs"
import { addCertService } from "@/service/web3"
import { addCertType } from "@/schema/certSchema"




const formSchema = z.object({
  nome: z.string().min(1, "O nome é obrigatório"),
  curso: z.string().min(1, "O curso é obrigatório"),
  data: z.date(),
  instituicao: z.string().min(1, "A instituição é obrigatória"),
  imagem: z.any()
    .refine((file) => file instanceof File, `A imagem é obrigatória.`),
});


export default function CertForm(/* { files, setFiles }: Props */) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      curso: "",
      data: new Date(),
      instituicao: "",
      imagem: undefined,
    },
  })

  // NOTE: Usamos `watch` do react-hook-form para observar o campo 'imagem'
  const imageFile = form.watch("imagem");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (imageFile instanceof File) {
      const objectUrl = URL.createObjectURL(imageFile);
      setImagePreview(objectUrl);

      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    } else {
      setImagePreview(null);
    }
  }, [imageFile]);


  const dropZoneConfig = {
    accept: {
      "image/*": [".jpg", ".jpeg", ".png"],
    },
    maxFiles: 1,
    maxSize: 1024 * 1024 * 4,
    multiple: false,
  };

  const printError = (err: string) => {
    console.error(`Erro: ${err}`);
    toast.error("falha ao enviar o formulário. tente novamente.");
  }


  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values.imagem);

      const resImmage = await Ipsf.createImage(values.imagem);

      if (resImmage.status == 200) {
        const resMetadata = await Ipsf.createMetadata(resImmage.data.Hash, `diploma do curso ${values.curso}`, `Certificado do curso de ${values.curso} emitido por ${values.instituicao} na data de ${format(values.data, "PPP")} para o aluno ${values.nome}.`);

        if (resMetadata.status == 200) {

          const dados: addCertType = {
            instituicao: values.instituicao,
            data: values.data.toISOString(),
            aluno: values.nome,
            hashImagen: resImmage.data.Hash,
            hashMetadado: resMetadata.data.Hash,

          }

          const cert = await addCertService(dados);

          console.log("Certificado adicionado com sucesso:", cert);
        } else {
          printError("Erro ao criar metadata no IPFS");
        }
      } else {
        printError("Erro ao fazer upload da imagem no IPFS");
      }

      toast(
        <div>
          <p>Formulário enviado com sucesso!</p>
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify({ ...values, imagem: values.imagem.name }, null, 2)}</code>
          </pre>
        </div>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("falha ao enviar o formulário. tente novamente.");
    }
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">

        <div className="grid grid-cols-12 gap-4">

          <div className="col-span-6">

            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do aluno</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: João da Silva"
                      {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">

            <FormField
              control={form.control}
              name="curso"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Curso</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Engenharia de Software"
                      {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

        </div>

        <div className="grid grid-cols-12 gap-4">

          <div className="col-span-6">

            <FormField
              control={form.control}
              name="data"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Data da emissão</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Escolha uma data</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>Data de emissão do certificado.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">

            <FormField
              control={form.control}
              name="instituicao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instituição</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Universidade Federal"
                      {...field} />
                  </FormControl>
                  <FormDescription>Instituição que emitiu o certificado.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

        </div>

        <FormField
          control={form.control}
          name="imagem"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imagem do Certificado</FormLabel>
              <FormControl>
                <FileUploader
                  onValueChange={(files) => {
                    field.onChange(files?.[0]);
                  }}
                  dropzoneOptions={dropZoneConfig}
                  className="relative bg-background rounded-lg p-2"
                >
                  <FileInput
                    id="fileInput"
                    className="outline-dashed outline-1 outline-slate-500"
                  >
                    <div className="flex items-center justify-center flex-col p-8 w-full ">
                      <CloudUpload className='text-gray-500 w-10 h-10' />
                      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Clique para fazer o upload</span>
                        &nbsp; ou arraste e solte
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG
                      </p>
                    </div>
                  </FileInput>
                  <FileUploaderContent>
                    {imageFile && (
                      <>
                        <FileUploaderItem index={0}>
                          <Paperclip className="h-4 w-4 stroke-current" />
                          <span>{imageFile.name}</span>
                        </FileUploaderItem>
                        {imagePreview && (
                          <div className="mt-4 flex justify-center">
                            <img src={imagePreview} alt="Preview" className="rounded-md max-h-48" />
                          </div>
                        )}
                      </>
                    )}
                  </FileUploaderContent>
                </FileUploader>
              </FormControl>
              <FormDescription>Imagem que será usada no certificado.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form >

  )
}


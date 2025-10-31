"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"


import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"


export default function Hero() {

  const formSchema = z.object({
    hash: z
      .string()
  })


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hash: "",
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data)
  }


  return (
    <Card className="w-full sm:max-w-4xl py-10 gap-8">
      <CardHeader className="mb-10 mt-5">
        <CardTitle className="text-center text-4xl">Eduledger</CardTitle>
        <CardDescription className="text-center text-xl">
          Sistema para validar e emitir certificados digitais em uma rede Blockchain
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="hash"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    id="hash"
                    aria-invalid={fieldState.invalid}
                    placeholder="Hash do certificado como 0x000...."
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="mb-5">
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Apagar
          </Button>
          <Button type="submit" form="form-rhf-demo">
            Verificar Certificado
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}

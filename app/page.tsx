"use client";

import { FileText, AlignLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShortDescriptionForm } from "@/components/short-description-form";
import { LongDescriptionForm } from "@/components/long-description-form";

export default function HtmlGeneratorPage() {
  return (
    <div className="container max-w-4xl mx-auto py-10 px-4">
      <Tabs defaultValue="curta" className="w-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Gerador de HTML
            </h1>
            <p className="text-sm text-muted-foreground">
              Selecione o modelo desejado e preencha os dados.
            </p>
          </div>
          <TabsList className="grid w-full max-w-[360px] grid-cols-2">
            <TabsTrigger value="curta" className="flex items-center gap-2">
              <AlignLeft className="w-4 h-4" /> Descrição Curta
            </TabsTrigger>
            <TabsTrigger value="longa" className="flex items-center gap-2">
              <FileText className="w-4 h-4" /> Descrição Longa
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="curta">
          <ShortDescriptionForm />
        </TabsContent>

        <TabsContent value="longa">
          <LongDescriptionForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}

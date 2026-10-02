"use client";

import { useState } from "react";
import { Copy, Check, FileText, AlignLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function HtmlGenerator() {
  // --- ESTADOS: Descrição Longa ---
  const [longIframe, setLongIframe] = useState("");
  const [longTitle, setLongTitle] = useState("");
  const [longText, setLongText] = useState("");

  // --- ESTADOS: Descrição Curta ---
  const [shortLogo, setShortLogo] = useState("");
  const [shortText, setShortText] = useState("");
  const [shortPhone, setShortPhone] = useState("");
  const [shortEmail, setShortEmail] = useState("");
  const [shortAddress, setShortAddress] = useState("");
  const [shortState, setShortState] = useState("");
  const [shortInstagram, setShortInstagram] = useState("");
  const [shortFacebook, setShortFacebook] = useState("");
  const [shortWhatsapp, setShortWhatsapp] = useState("");

  // Estado global para feedback do botão copiar
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  // --- FUNÇÕES AUXILIARES DE VALIDAÇÃO E MÁSCARA ---

  // Restringe a entrada para apenas números e até 11 caracteres
  const handlePhoneChange = (value: string, setter: (val: string) => void) => {
    const onlyNumbers = value.replace(/\D/g, "").slice(0, 11);
    setter(onlyNumbers);
  };

  // Formata os números para exibição visual no HTML gerado: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
  const formatPhoneDisplay = (phone: string) => {
    const digits = phone.replace(/\D/g, "");
    if (digits.length === 11) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    }
    if (digits.length === 10) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    }
    return digits;
  };

  // Valida o formato do e-mail
  const isValidEmail = (email: string) => {
    if (!email.trim()) return true; // Campo vazio é considerado neutro (opcional)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  // --- GERADOR: Descrição Longa ---
  const generateLongHtml = () => {
    let html = "";

    if (longIframe.trim() !== "") {
      html += `<div class="long-description__video">\n<canvas width="520" height="299"><br /><br /></canvas>\n${longIframe.trim()}\n</div>\n`;
    }

    const formattedText = longText.replace(/\n/g, "<br>");

    html += `<div class="long-description__texts">\n<p class="long-description__title">${longTitle}</p>\n<p class="long-description__p">${formattedText}</p>\n</div>`;

    return html;
  };

  // --- GERADOR: Descrição Curta ---
  const generateShortHtml = () => {
    let html = `<div class="resume-content__content" style="gap: 16px">\n`;

    // 1. Logo (Figura)
    if (shortLogo.trim() !== "") {
      html += `  <figure style="margin: 0">\n    <img\n      style="border-radius: 8px"\n      src="${shortLogo.trim()}"\n      caption="false"\n      width="120"\n      height="120"\n    />\n  </figure>\n\n`;
    }

    // 2. Texto do Parágrafo
    if (shortText.trim() !== "") {
      const formattedDesc = shortText.replace(/\n/g, "<br>");
      html += `  <p class="resume-content__p">\n    ${formattedDesc}\n  </p>\n\n`;
    }

    // 3. Contatos (Só renderiza e-mail se for válido)
    const hasPhone = shortPhone.trim() !== "";
    const isEmailValidAndNotEmpty =
      shortEmail.trim() !== "" && isValidEmail(shortEmail);
    const hasAddress = shortAddress.trim() !== "";
    const hasState = shortState.trim() !== "";

    if (hasPhone || isEmailValidAndNotEmpty || hasAddress || hasState) {
      html += `  <div class="resume-content__contact">\n    <p class="resume-content__contact-label">Contato</p>\n`;

      // Telefone
      if (hasPhone) {
        const rawPhone = shortPhone.trim();
        const formattedPhone = formatPhoneDisplay(rawPhone);
        html += `    <div class="resume-content__contact-items">\n      <a href="tel:${rawPhone}" class="resume-content__contact-item tel">\n        <img\n          src="https://feiradigitalsaborgaucho.com.br/upload/editor/I%CC%81cones.png"\n          width="16"\n          height="16"\n          caption="false"\n        />\n        ${formattedPhone}\n      </a>\n    </div>\n`;
      }

      // E-mail, Endereço e Estado
      if (isEmailValidAndNotEmpty || hasAddress || hasState) {
        html += `    <div class="resume-content__contact-items">\n`;

        if (isEmailValidAndNotEmpty) {
          html += `      <a\n        href="mailto:${shortEmail.trim()}"\n        class="resume-content__contact-item mail"\n      >\n        <img\n          src="https://feiradigitalsaborgaucho.com.br/upload/editor/I%CC%81cones%20%281%29.png"\n          width="16"\n          height="16"\n          caption="false"\n        />\n        ${shortEmail.trim()}\n      </a>\n`;
        }

        if (hasAddress) {
          html += `      <div class="resume-content__contact-item address">\n        <img\n          src="https://feiradigitalsaborgaucho.com.br/upload/editor/I%CC%81cones%20%282%29.png"\n          width="16"\n          height="16"\n          caption="false"\n        />\n        ${shortAddress.trim()}\n      </div>\n`;
        }

        if (hasState) {
          html += `      <div class="resume-content__contact-item state">\n        <img\n          src="https://feiradigitalsaborgaucho.com.br/upload/editor/Estados.png"\n          width="16"\n          height="16"\n          caption="false"\n        />\n        ${shortState.trim()}\n      </div>\n`;
        }

        html += `    </div>\n`;
      }

      html += `  </div>\n\n`;
    }

    // 4. Redes Sociais
    const hasInstagram = shortInstagram.trim() !== "";
    const hasFacebook = shortFacebook.trim() !== "";
    const hasWhatsapp = shortWhatsapp.trim() !== "";

    if (hasInstagram || hasFacebook || hasWhatsapp) {
      html += `  <div class="resume-content__follow-us">\n    <p class="resume-content__follow-us-label">Siga-nos</p>\n    <div class="resume-content__follow-us-items">\n`;

      if (hasInstagram) {
        html += `      <a\n        href="${shortInstagram.trim()}"\n        target="_blank"\n        class="resume-content--follow-us-item instagram"\n        rel="noopener noreferrer"\n      >\n        <img\n          src="https://feiradigitalsaborgaucho.com.br/upload/editor/I%CC%81cones%20%283%29.png"\n          width="20"\n          height="20"\n          caption="false"\n        />\n      </a>\n`;
      }

      if (hasFacebook) {
        html += `      <a\n        href="${shortFacebook.trim()}"\n        target="_blank"\n        class="resume-content--follow-us-item facebook"\n        rel="noopener noreferrer"\n      >\n        <img\n          src="https://feiradigitalsaborgaucho.com.br/upload/editor/I%CC%81cones%20%284%29.png"\n          width="20"\n          height="20"\n          caption="false"\n        />\n      </a>\n`;
      }

      if (hasWhatsapp) {
        html += `      <a\n        href="https://wa.me/55${shortWhatsapp.trim()}"\n        target="_blank"\n        class="resume-content--follow-us-item wpp"\n        rel="noopener noreferrer"\n      >\n        <img\n          src="https://feiradigitalsaborgaucho.com.br/upload/editor/I%CC%81cones%20%285%29.png"\n          width="20"\n          height="20"\n          caption="false"\n        /></a>\n`;
      }

      html += `    </div>\n  </div>\n`;
    }

    html += `</div>`;
    return html;
  };

  const copyToClipboard = (code: string, tabName: string) => {
    navigator.clipboard.writeText(code);
    setCopiedTab(tabName);
    setTimeout(() => setCopiedTab(null), 2000);
  };

  const isEmailValid = isValidEmail(shortEmail);

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

        {/* ================= TAB: DESCRIÇÃO CURTA ================= */}
        <TabsContent value="curta">
          <Card>
            <CardHeader>
              <CardTitle>Descrição Curta</CardTitle>
              <CardDescription>
                Gere o HTML com logo, resumo, contatos e links de redes sociais.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* URL do Logo */}
              <div className="space-y-2">
                <Label htmlFor="short-logo">URL da Imagem / Logo</Label>
                <Input
                  id="short-logo"
                  value={shortLogo}
                  onChange={(e) => setShortLogo(e.target.value)}
                  placeholder="https://feiradigitalsaborgaucho.com.br/upload/editor/logo.jpg"
                />
              </div>

              {/* Resumo */}
              <div className="space-y-2">
                <Label htmlFor="short-text">Texto de Resumo</Label>
                <Textarea
                  id="short-text"
                  value={shortText}
                  onChange={(e) => setShortText(e.target.value)}
                  placeholder="Descreva brevemente o produtor ou marca..."
                  className="min-h-[120px] resize-y"
                />
              </div>

              {/* Seção de Contatos */}
              <div className="pt-4 border-t space-y-4">
                <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                  Informações de Contato
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Telefone */}
                  <div className="space-y-2">
                    <Label htmlFor="short-phone">
                      Telefone (Apenas Números)
                    </Label>
                    <Input
                      id="short-phone"
                      value={shortPhone}
                      onChange={(e) =>
                        handlePhoneChange(e.target.value, setShortPhone)
                      }
                      placeholder="51981501789"
                    />
                    <p className="text-[11px] text-muted-foreground">
                      Digite DDD + número. Máximo de 11 dígitos.
                    </p>
                  </div>

                  {/* E-mail com Validação */}
                  <div className="space-y-2">
                    <Label htmlFor="short-email">E-mail</Label>
                    <Input
                      id="short-email"
                      type="email"
                      value={shortEmail}
                      onChange={(e) => setShortEmail(e.target.value)}
                      placeholder="contato@empresa.com.br"
                      className={
                        !isEmailValid
                          ? "border-destructive focus-visible:ring-destructive"
                          : ""
                      }
                    />
                    {!isEmailValid ? (
                      <p className="text-[11px] text-destructive font-medium">
                        Por favor, digite um e-mail em formato válido (ex:
                        nome@dominio.com).
                      </p>
                    ) : (
                      <p className="text-[11px] text-muted-foreground">
                        Sera inserido apenas se o formato for válido.
                      </p>
                    )}
                  </div>

                  {/* Endereço */}
                  <div className="space-y-2">
                    <Label htmlFor="short-address">Endereço</Label>
                    <Input
                      id="short-address"
                      value={shortAddress}
                      onChange={(e) => setShortAddress(e.target.value)}
                      placeholder="Linha Rosenthal, s/n - Imigrante"
                    />
                  </div>

                  {/* Estado */}
                  <div className="space-y-2">
                    <Label htmlFor="short-state">Estado</Label>
                    <Input
                      id="short-state"
                      value={shortState}
                      onChange={(e) => setShortState(e.target.value)}
                      placeholder="Rio Grande do Sul"
                    />
                  </div>
                </div>
              </div>

              {/* Seção de Redes Sociais */}
              <div className="pt-4 border-t space-y-4">
                <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                  Redes Sociais
                </h4>
                <div className="flex flex-col gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="short-instagram">Instagram (URL)</Label>
                    <Input
                      id="short-instagram"
                      value={shortInstagram}
                      onChange={(e) => setShortInstagram(e.target.value)}
                      placeholder="https://instagram.com/usuario"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="short-facebook">Facebook (URL)</Label>
                    <Input
                      id="short-facebook"
                      value={shortFacebook}
                      onChange={(e) => setShortFacebook(e.target.value)}
                      placeholder="https://facebook.com/usuario"
                    />
                  </div>
                  {/* WhatsApp */}
                  <div className="space-y-2">
                    <Label htmlFor="short-whatsapp">
                      WhatsApp (Apenas Números)
                    </Label>
                    <Input
                      id="short-whatsapp"
                      value={shortWhatsapp}
                      onChange={(e) =>
                        handlePhoneChange(e.target.value, setShortWhatsapp)
                      }
                      placeholder="51981501789"
                    />
                    <p className="text-[11px] text-muted-foreground">
                      Digite DDD + número. O país (55) é adicionado
                      automaticamente.
                    </p>
                  </div>
                </div>
              </div>

              {/* Área do Código Gerado */}
              <div className="pt-6 border-t">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Código HTML Gerado:</h3>
                  <Button
                    onClick={() =>
                      copyToClipboard(generateShortHtml(), "curta")
                    }
                    variant={copiedTab === "curta" ? "default" : "outline"}
                    className="w-36 transition-all"
                  >
                    {copiedTab === "curta" ? (
                      <>
                        <Check className="w-4 h-4 mr-2" /> Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" /> Copiar HTML
                      </>
                    )}
                  </Button>
                </div>

                <pre className="bg-zinc-950 text-zinc-100 p-4 rounded-lg overflow-x-auto text-xs leading-relaxed border shadow-inner max-h-[350px]">
                  <code>{generateShortHtml()}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ================= TAB: DESCRIÇÃO LONGA ================= */}
        <TabsContent value="longa">
          <Card>
            <CardHeader>
              <CardTitle>Descrição Longa</CardTitle>
              <CardDescription>
                Gere o HTML com bloco de vídeo opcional e texto estruturado.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="long-iframe">Iframe do Vídeo (Opcional)</Label>
                <Input
                  id="long-iframe"
                  value={longIframe}
                  onChange={(e) => setLongIframe(e.target.value)}
                  placeholder='Cole aqui o <iframe src="..."></iframe>'
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="long-title">Título</Label>
                <Input
                  id="long-title"
                  value={longTitle}
                  onChange={(e) => setLongTitle(e.target.value)}
                  placeholder="Ex: Do campo para a sua mesa"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="long-text">Texto do Parágrafo</Label>
                <Textarea
                  id="long-text"
                  value={longText}
                  onChange={(e) => setLongText(e.target.value)}
                  placeholder="Cole o texto completo aqui..."
                  className="min-h-[200px] resize-y"
                />
                <p className="text-xs text-muted-foreground">
                  As quebras de linha serão convertidas automaticamente para
                  &lt;br&gt;. Para aplicar negrito, utilize as tags
                  &lt;b&gt;palavra&lt;/b&gt;.
                </p>
              </div>

              <div className="pt-6 border-t">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Código HTML Gerado:</h3>
                  <Button
                    onClick={() => copyToClipboard(generateLongHtml(), "longa")}
                    variant={copiedTab === "longa" ? "default" : "outline"}
                    className="w-36 transition-all"
                  >
                    {copiedTab === "longa" ? (
                      <>
                        <Check className="w-4 h-4 mr-2" /> Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" /> Copiar HTML
                      </>
                    )}
                  </Button>
                </div>

                <pre className="bg-zinc-950 text-zinc-100 p-4 rounded-lg overflow-x-auto text-xs leading-relaxed border shadow-inner max-h-[350px]">
                  <code>{generateLongHtml()}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

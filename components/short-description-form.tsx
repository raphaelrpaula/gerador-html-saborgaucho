"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
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

export function ShortDescriptionForm() {
  const [shortLogo, setShortLogo] = useState("");
  const [shortText, setShortText] = useState("");
  const [shortPhone, setShortPhone] = useState("");
  const [shortEmail, setShortEmail] = useState("");
  const [shortAddress, setShortAddress] = useState("");
  const [shortState, setShortState] = useState("");
  const [shortInstagram, setShortInstagram] = useState("");
  const [shortFacebook, setShortFacebook] = useState("");
  const [shortWhatsapp, setShortWhatsapp] = useState("");
  const [copied, setCopied] = useState(false);

  // Trava para apenas números e máximo de 11 dígitos
  const handlePhoneChange = (value: string, setter: (val: string) => void) => {
    const onlyNumbers = value.replace(/\D/g, "").slice(0, 11);
    setter(onlyNumbers);
  };

  // Formatação visual para o HTML exibido
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

  // Validação de e-mail
  const isValidEmail = (email: string) => {
    if (!email.trim()) return true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  const generateShortHtml = () => {
    let html = `<div class="resume-content__content" style="gap: 16px">\n`;

    if (shortLogo.trim() !== "") {
      html += `<figure style="margin: 0"><img style="border-radius: 8px" src="${shortLogo.trim()}" caption="false" width="120" height="120" /></figure>\n\n`;
    }

    if (shortText.trim() !== "") {
      const formattedDesc = shortText.replace(/\n/g, "<br>");
      html += `<p class="resume-content__p">${formattedDesc}</p>\n\n`;
    }

    const hasPhone = shortPhone.trim() !== "";
    const isEmailValidAndNotEmpty =
      shortEmail.trim() !== "" && isValidEmail(shortEmail);
    const hasAddress = shortAddress.trim() !== "";
    const hasState = shortState.trim() !== "";

    if (hasPhone || isEmailValidAndNotEmpty || hasAddress || hasState) {
      html += `<div class="resume-content__contact">\n <p class="resume-content__contact-label">Contato</p>\n`;

      if (hasPhone) {
        const rawPhone = shortPhone.trim();
        const formattedPhone = formatPhoneDisplay(rawPhone);
        html += `<div class="resume-content__contact-items">\n <a href="tel:${rawPhone}" class="resume-content__contact-item tel">\n <img src="https://feiradigitalsaborgaucho.com.br/upload/editor/I%CC%81cones.png" width="16" height="16" caption="false" />\n ${formattedPhone}\n</a>\n</div>\n`;
      }

      if (isEmailValidAndNotEmpty || hasAddress || hasState) {
        html += `<div class="resume-content__contact-items">\n`;

        if (isEmailValidAndNotEmpty) {
          html += `<a href="mailto:${shortEmail.trim()}" class="resume-content__contact-item mail">\n <img src="https://feiradigitalsaborgaucho.com.br/upload/editor/I%CC%81cones%20%281%29.png" width="16" height="16" caption="false" />\n ${shortEmail.trim()}\n</a>\n`;
        }

        if (hasAddress) {
          html += `<div class="resume-content__contact-item address">\n <img src="https://feiradigitalsaborgaucho.com.br/upload/editor/I%CC%81cones%20%282%29.png" width="16" height="16" caption="false" />\n ${shortAddress.trim()}\n</div>\n`;
        }

        if (hasState) {
          html += `<div class="resume-content__contact-item state">\n <img src="https://feiradigitalsaborgaucho.com.br/upload/editor/Estados.png" width="16"\n          height="16" caption="false" />\n ${shortState.trim()}\n</div>\n`;
        }

        html += `</div>\n`;
      }

      html += `</div>\n\n`;
    }

    const hasInstagram = shortInstagram.trim() !== "";
    const hasFacebook = shortFacebook.trim() !== "";
    const hasWhatsapp = shortWhatsapp.trim() !== "";

    if (hasInstagram || hasFacebook || hasWhatsapp) {
      html += `<div class="resume-content__follow-us">\n <p class="resume-content__follow-us-label">Siga-nos</p>\n <div class="resume-content__follow-us-items">\n`;

      if (hasInstagram) {
        html += `<a href="${shortInstagram.trim()}" target="_blank" class="resume-content--follow-us-item instagram" rel="noopener noreferrer">\n <img src="https://feiradigitalsaborgaucho.com.br/upload/editor/I%CC%81cones%20%283%29.png" width="20" height="20" caption="false" />\n</a>\n`;
      }

      if (hasFacebook) {
        html += `<a href="${shortFacebook.trim()}" target="_blank" class="resume-content--follow-us-item facebook" rel="noopener noreferrer">\n <img src="https://feiradigitalsaborgaucho.com.br/upload/editor/I%CC%81cones%20%284%29.png" width="20" height="20" caption="false" />\n</a>\n`;
      }

      if (hasWhatsapp) {
        html += `<a href="https://wa.me/55${shortWhatsapp.trim()}" target="_blank" class="resume-content--follow-us-item wpp" rel="noopener noreferrer">\n <img src="https://feiradigitalsaborgaucho.com.br/upload/editor/I%CC%81cones%20%285%29.png" width="20" height="20" caption="false" />\n</a>\n`;
      }

      html += `</div>\n</div>\n`;
    }

    html += `</div>`;
    return html;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateShortHtml());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isEmailValid = isValidEmail(shortEmail);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Descrição Curta</CardTitle>
        <CardDescription>
          Gere o HTML com logo, resumo, contatos e links de redes sociais.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="short-logo">URL da Imagem / Logo</Label>
          <Input
            id="short-logo"
            value={shortLogo}
            onChange={(e) => setShortLogo(e.target.value)}
            placeholder="https://feiradigitalsaborgaucho.com.br/upload/editor/logo.jpg"
          />
        </div>

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

        <div className="pt-4 border-t space-y-4">
          <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
            Informações de Contato
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="short-phone">Telefone (Apenas Números)</Label>
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
                  Por favor, digite um e-mail em formato válido.
                </p>
              ) : (
                <p className="text-[11px] text-muted-foreground">
                  Será inserido apenas se o formato for válido.
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="short-address">Endereço</Label>
              <Input
                id="short-address"
                value={shortAddress}
                onChange={(e) => setShortAddress(e.target.value)}
                placeholder="Linha Rosenthal, s/n - Imigrante"
              />
            </div>

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
            <div className="space-y-2">
              <Label htmlFor="short-whatsapp">WhatsApp (Apenas Números)</Label>
              <Input
                id="short-whatsapp"
                value={shortWhatsapp}
                onChange={(e) =>
                  handlePhoneChange(e.target.value, setShortWhatsapp)
                }
                placeholder="51981501789"
              />
              <p className="text-[11px] text-muted-foreground">
                Digite DDD + número. O país (55) é adicionado automaticamente.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Código HTML Gerado:</h3>
            <Button
              onClick={copyToClipboard}
              variant={copied ? "default" : "outline"}
              className="w-36 transition-all"
            >
              {copied ? (
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
  );
}

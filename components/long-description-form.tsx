"use client";

import { useState, useRef } from "react";
import { Copy, Check, Bold } from "lucide-react";
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

export function LongDescriptionForm() {
  const [longIframe, setLongIframe] = useState("");
  const [longTitle, setLongTitle] = useState("");
  const [longText, setLongText] = useState("");
  const [copied, setCopied] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Aplica as tags <b> no texto selecionado ou insere um placeholder
  const handleApplyBold = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = longText.substring(start, end);

    const before = longText.substring(0, start);
    const after = longText.substring(end);

    const textToInsert = selectedText
      ? `<b>${selectedText}</b>`
      : `<b>texto em negrito</b>`;
    const newText = `${before}${textToInsert}${after}`;

    setLongText(newText);

    // Devolve o foco e ajusta a seleção no cursor
    setTimeout(() => {
      textarea.focus();
      if (selectedText) {
        textarea.setSelectionRange(start, start + textToInsert.length);
      } else {
        textarea.setSelectionRange(start + 3, start + 18);
      }
    }, 0);
  };

  const generateLongHtml = () => {
    let html = "";

    if (longIframe.trim() !== "") {
      html += `<div class="long-description__video">\n<canvas width="520" height="299"><br /><br /></canvas>\n${longIframe.trim()}\n</div>\n`;
    }

    const formattedText = longText.replace(/\n/g, "<br>");

    html += `<div class="long-description__texts">\n<p class="long-description__title">${longTitle}</p>\n<p class="long-description__p">${formattedText}</p>\n</div>`;

    return html;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateLongHtml());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
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
          <div className="flex items-center justify-between">
            <Label htmlFor="long-text">Texto do Parágrafo</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleApplyBold}
              className="h-8 text-xs flex items-center gap-1.5"
            >
              <Bold className="w-3.5 h-3.5" /> Negrito
            </Button>
          </div>

          <Textarea
            ref={textareaRef}
            id="long-text"
            value={longText}
            onChange={(e) => setLongText(e.target.value)}
            placeholder="Cole o texto completo aqui..."
            className="min-h-[220px] resize-y font-mono text-sm"
          />
          <p className="text-xs text-muted-foreground">
            Selecione uma palavra ou trecho do texto e clique no botão{" "}
            <strong>Negrito</strong> para aplicar a tag &lt;b&gt;.
          </p>
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
            <code>{generateLongHtml()}</code>
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}

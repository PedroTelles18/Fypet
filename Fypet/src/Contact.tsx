import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação básica
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    // Simulação de envio
    toast.success("Mensagem enviada com sucesso! Responderemos em breve.");

    // Limpar formulário
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              Fale Conosco
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Estamos aqui para ajudar
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Tem dúvidas, sugestões ou precisa de ajuda? Entre em contato
              conosco e responderemos o mais rápido possível.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <Card className="border-border/50 hover:border-primary/50 transition-colors">
              <CardContent className="pt-8 pb-8 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Email
                </h3>
                <p className="text-sm text-muted-foreground">
                  contato@fypet.com.br
                </p>
                <p className="text-sm text-muted-foreground">
                  suporte@fypet.com.br
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:border-primary/50 transition-colors">
              <CardContent className="pt-8 pb-8 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Telefone
                </h3>
                <p className="text-sm text-muted-foreground">
                  (11) 9999-9999
                </p>
                <p className="text-sm text-muted-foreground">
                  Segunda a Sexta: 9h às 18h
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:border-primary/50 transition-colors">
              <CardContent className="pt-8 pb-8 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Endereço
                </h3>
                <p className="text-sm text-muted-foreground">
                  Rua das Flores, 123
                </p>
                <p className="text-sm text-muted-foreground">
                  São Paulo, SP - CEP 01234-567
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/contact-support.png"
                  alt="Atendimento FyPet"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-8 space-y-4">
                <h3 className="text-2xl font-bold text-foreground">
                  Perguntas Frequentes
                </h3>
                <div className="space-y-3">
                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer p-4 bg-card rounded-lg border border-border/50 hover:border-primary/50 transition-colors">
                      <span className="font-medium text-foreground">
                        Como funciona o processo de adoção?
                      </span>
                      <MessageSquare className="w-5 h-5 text-muted-foreground group-open:text-primary transition-colors" />
                    </summary>
                    <div className="p-4 text-sm text-muted-foreground leading-relaxed">
                      Você busca o animal desejado, entra em contato com a ONG
                      ou protetor, agenda uma visita e, após aprovação, finaliza
                      o processo de adoção com documentação adequada.
                    </div>
                  </details>

                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer p-4 bg-card rounded-lg border border-border/50 hover:border-primary/50 transition-colors">
                      <span className="font-medium text-foreground">
                        Como cadastrar minha ONG?
                      </span>
                      <MessageSquare className="w-5 h-5 text-muted-foreground group-open:text-primary transition-colors" />
                    </summary>
                    <div className="p-4 text-sm text-muted-foreground leading-relaxed">
                      Acesse a página de cadastro, preencha os dados da sua ONG
                      com documentação comprobatória, e aguarde a verificação
                      da nossa equipe (geralmente 24-48h).
                    </div>
                  </details>

                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer p-4 bg-card rounded-lg border border-border/50 hover:border-primary/50 transition-colors">
                      <span className="font-medium text-foreground">
                        O serviço é gratuito?
                      </span>
                      <MessageSquare className="w-5 h-5 text-muted-foreground group-open:text-primary transition-colors" />
                    </summary>
                    <div className="p-4 text-sm text-muted-foreground leading-relaxed">
                      Sim! Nossa plataforma é 100% gratuita tanto para ONGs
                      quanto para adotantes. Nosso objetivo é facilitar a adoção
                      e ajudar o máximo de animais possível.
                    </div>
                  </details>
                </div>
              </div>
            </div>

            <Card className="border-border/50">
              <CardContent className="pt-8 pb-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      Envie sua mensagem
                    </h3>
                    <p className="text-muted-foreground">
                      Preencha o formulário abaixo e entraremos em contato
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        Nome completo <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Seu nome"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="seu@email.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(11) 99999-9999"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">
                        Assunto <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Sobre o que você quer falar?"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">
                        Mensagem <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Escreva sua mensagem aqui..."
                        rows={6}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90"
                      size="lg"
                    >
                      Enviar Mensagem
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

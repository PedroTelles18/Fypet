import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ArrowRight, Heart, Search, Shield, Users } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/10">
        <div className="container py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <Heart className="w-4 h-4" />
                  Conectando vidas
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Encontre seu novo{" "}
                <span className="text-primary">melhor amigo</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                Milhares de animais esperando por um lar amoroso. Conectamos
                ONGs, protetores e pessoas que desejam adotar ou ajudar animais
                perdidos a voltarem para casa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/adocao">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground group"
                  >
                    Quero Adotar
                    <Heart className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                  </Button>
                </Link>
                <Link href="/perdidos">
                  <Button size="lg" variant="outline">
                    Animais Perdidos
                    <Search className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">
                    Animais adotados
                  </div>
                </div>
                <div className="h-12 w-px bg-border"></div>
                <div>
                  <div className="text-3xl font-bold text-primary">50+</div>
                  <div className="text-sm text-muted-foreground">
                    ONGs parceiras
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/hero-banner.png"
                  alt="Animais felizes esperando adoção"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
              <div className="absolute -top-6 -right-6 w-40 h-40 bg-accent/30 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Como Funciona
            </h2>
            <p className="text-muted-foreground text-lg">
              Facilitamos o processo de adoção e ajudamos animais perdidos a
              voltarem para casa
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-border/50 hover:border-primary/50 transition-colors">
              <CardContent className="pt-8 pb-8 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <Search className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  Busque seu Pet
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Navegue por centenas de animais disponíveis para adoção.
                  Filtre por espécie, raça, idade e localização.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:border-primary/50 transition-colors">
              <CardContent className="pt-8 pb-8 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  Conecte-se
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Entre em contato direto com ONGs e protetores. Agende visitas
                  e conheça seu futuro companheiro.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:border-primary/50 transition-colors">
              <CardContent className="pt-8 pb-8 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  Adote com Segurança
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Processo transparente e seguro. Todas as ONGs são verificadas
                  e os animais têm histórico completo.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Adoption Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/adoption-section.png"
                  alt="Cachorro esperando adoção"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                Adoção Responsável
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Dê uma segunda chance para um animal
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Cada animal tem uma história única e merece um lar cheio de
                amor. Nossa plataforma conecta você com ONGs e protetores
                confiáveis que cuidam desses animais com carinho e dedicação.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Heart className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-muted-foreground">
                    Animais de todas as espécies: cães, gatos, aves, coelhos e
                    muito mais
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Shield className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-muted-foreground">
                    Histórico completo de saúde e comportamento
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-muted-foreground">
                    Suporte durante e após o processo de adoção
                  </span>
                </li>
              </ul>
              <Link href="/adocao">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 group"
                >
                  Ver Animais Disponíveis
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Lost Pets Section */}
      <section className="py-20 bg-card">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="inline-block px-4 py-2 rounded-full bg-destructive/10 text-destructive text-sm font-medium">
                Animais Perdidos
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Ajude a reunir famílias
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Perdeu seu pet ou encontrou um animal perdido? Nossa plataforma
                facilita o reencontro. Publique fotos, compartilhe informações
                e ajude animais a voltarem para casa.
              </p>
              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Search className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      Busca Inteligente
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Filtre por região, espécie, cor e características para
                      encontrar rapidamente
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      Comunidade Ativa
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Milhares de pessoas prontas para ajudar na busca e
                      compartilhamento
                    </p>
                  </div>
                </div>
              </div>
              <Link href="/perdidos">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  Acessar Área de Perdidos
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
            <div>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/lost-pets-section.png"
                  alt="Ajudando animais perdidos"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-accent/5 to-background">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Pronto para fazer a diferença?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Seja adotando um animal, ajudando a encontrar pets perdidos ou
              cadastrando sua ONG, você pode transformar vidas hoje mesmo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/cadastro">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Começar Agora
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/sobre">
                <Button size="lg" variant="outline">
                  Saiba Mais
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Award, Heart, Shield, Target, Users } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              Sobre o FyPet
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Nossa missão é conectar corações e transformar vidas
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Acreditamos que todo animal merece um lar amoroso e toda família
              merece a alegria de ter um companheiro fiel.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/about-us.png"
                  alt="Equipe FyPet com animais resgatados"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Nossa História
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  O FyPet nasceu da paixão por animais e do desejo de fazer a
                  diferença na vida de milhares de pets que precisam de um lar.
                  Fundada em 2024, nossa plataforma surgiu para facilitar a
                  conexão entre ONGs, protetores independentes e pessoas que
                  desejam adotar.
                </p>
                <p>
                  Percebemos que muitos animais ficavam sem lar não por falta
                  de pessoas interessadas, mas pela dificuldade de encontrar
                  informações confiáveis e centralizadas. Decidimos criar uma
                  solução moderna, acessível e segura para todos.
                </p>
                <p>
                  Hoje, trabalhamos com mais de 50 ONGs parceiras e já
                  ajudamos centenas de animais a encontrarem famílias amorosas.
                  Além disso, nossa seção de animais perdidos já reuniu
                  dezenas de pets com seus tutores.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-card">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nossos Valores
            </h2>
            <p className="text-muted-foreground text-lg">
              Princípios que guiam cada decisão e ação do FyPet
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-border/50">
              <CardContent className="pt-8 pb-8 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Compaixão
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Tratamos cada animal com amor, respeito e dignidade que
                  merecem.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="pt-8 pb-8 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Transparência
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Informações claras e verificadas sobre todos os animais e
                  ONGs.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="pt-8 pb-8 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Comunidade
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Construímos uma rede de pessoas unidas pelo amor aos animais.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="pt-8 pb-8 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Excelência
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Buscamos sempre melhorar nossos serviços e experiência do
                  usuário.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-background">
              <CardContent className="pt-8 pb-8 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Missão</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Facilitar a adoção responsável de animais e ajudar pets
                  perdidos a voltarem para casa, conectando pessoas e
                  instituições através de uma plataforma moderna e confiável.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-gradient-to-br from-accent/5 to-background">
              <CardContent className="pt-8 pb-8 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Visão</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Ser a principal plataforma de adoção de animais no Brasil,
                  reconhecida pela confiança, inovação e impacto positivo na
                  vida de milhares de pets e famílias.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-background">
              <CardContent className="pt-8 pb-8 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  Compromisso
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Garantir que cada adoção seja responsável, cada animal seja
                  tratado com dignidade e cada usuário tenha uma experiência
                  excepcional em nossa plataforma.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-accent/5 to-background">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nosso Impacto
            </h2>
            <p className="text-muted-foreground text-lg">
              Números que mostram a diferença que estamos fazendo
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center space-y-2">
              <div className="text-5xl font-bold text-primary">500+</div>
              <div className="text-muted-foreground">Animais Adotados</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-5xl font-bold text-primary">50+</div>
              <div className="text-muted-foreground">ONGs Parceiras</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-5xl font-bold text-primary">1.200+</div>
              <div className="text-muted-foreground">Usuários Ativos</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-5xl font-bold text-primary">95%</div>
              <div className="text-muted-foreground">Taxa de Satisfação</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

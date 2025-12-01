import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { mockAnimals } from "@/lib/mockData";
import {
  ArrowLeft,
  Calendar,
  Check,
  Heart,
  Mail,
  MapPin,
  Phone,
  Share2,
  X,
} from "lucide-react";
import { Link, useParams } from "wouter";
import { toast } from "sonner";

export default function AnimalDetail() {
  const { id } = useParams();
  const animal = mockAnimals.find((a) => a.id === id);

  if (!animal) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Animal não encontrado
            </h2>
            <Link href="/adocao">
              <Button>
                <ArrowLeft className="mr-2 w-4 h-4" />
                Voltar para listagem
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleContact = () => {
    toast.success(
      `Entrando em contato com ${animal.ongName}. Aguarde o redirecionamento...`
    );
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `Adote ${animal.name}`,
          text: `Conheça ${animal.name}, um ${animal.species.toLowerCase()} esperando por um lar!`,
          url: window.location.href,
        })
        .then(() => toast.success("Compartilhado com sucesso!"))
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copiado para a área de transferência!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="py-8">
        <div className="container">
          <Link href="/adocao">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Voltar para listagem
            </Button>
          </Link>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={animal.image}
                  alt={animal.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleShare}
                >
                  <Share2 className="mr-2 w-4 h-4" />
                  Compartilhar
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => toast.info("Funcionalidade em desenvolvimento")}
                >
                  <Heart className="mr-2 w-4 h-4" />
                  Favoritar
                </Button>
              </div>
            </div>

            {/* Details Section */}
            <div className="space-y-6">
              <div>
                <div className="flex items-start justify-between mb-2">
                  <h1 className="text-4xl font-bold text-foreground">
                    {animal.name}
                  </h1>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      animal.status === "Disponível"
                        ? "bg-primary text-primary-foreground"
                        : animal.status === "Em processo"
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {animal.status}
                  </span>
                </div>
                <p className="text-xl text-muted-foreground">
                  {animal.breed} • {animal.species}
                </p>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="border-border/50">
                  <CardContent className="pt-4 pb-4">
                    <div className="text-sm text-muted-foreground mb-1">
                      Idade
                    </div>
                    <div className="text-lg font-semibold text-foreground">
                      {animal.age}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardContent className="pt-4 pb-4">
                    <div className="text-sm text-muted-foreground mb-1">
                      Gênero
                    </div>
                    <div className="text-lg font-semibold text-foreground">
                      {animal.gender}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardContent className="pt-4 pb-4">
                    <div className="text-sm text-muted-foreground mb-1">
                      Porte
                    </div>
                    <div className="text-lg font-semibold text-foreground">
                      {animal.size}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardContent className="pt-4 pb-4">
                    <div className="text-sm text-muted-foreground mb-1">
                      Localização
                    </div>
                    <div className="text-sm font-semibold text-foreground flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-primary" />
                      {animal.location}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Health Status */}
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="pt-4 pb-4">
                  <h3 className="font-semibold text-foreground mb-3">
                    Status de Saúde
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {animal.vaccinated ? (
                        <Check className="w-5 h-5 text-primary" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground" />
                      )}
                      <span
                        className={
                          animal.vaccinated
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }
                      >
                        Vacinado
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {animal.neutered ? (
                        <Check className="w-5 h-5 text-primary" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground" />
                      )}
                      <span
                        className={
                          animal.neutered
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }
                      >
                        Castrado
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Description */}
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Sobre {animal.name}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {animal.description}
                </p>
              </div>

              {/* ONG Info */}
              <Card className="border-border/50">
                <CardContent className="pt-4 pb-4 space-y-3">
                  <h3 className="font-semibold text-foreground">
                    Responsável pela Adoção
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Heart className="w-4 h-4 text-primary" />
                      <span>{animal.ongName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="w-4 h-4 text-primary" />
                      <span>{animal.ongContact}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>
                        Publicado em{" "}
                        {new Date(animal.postedDate).toLocaleDateString(
                          "pt-BR"
                        )}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <Button
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={handleContact}
                  disabled={animal.status === "Adotado"}
                >
                  <Heart className="mr-2 w-5 h-5" />
                  {animal.status === "Adotado"
                    ? "Animal já adotado"
                    : "Quero Adotar"}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    toast.info("Funcionalidade de mensagem em desenvolvimento")
                  }
                >
                  <Mail className="mr-2 w-5 h-5" />
                  Enviar Mensagem
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

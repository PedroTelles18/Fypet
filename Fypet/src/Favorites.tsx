import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { mockAnimals, type Animal } from "@/lib/mockData";
import { Check, Heart, MapPin, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

export default function Favorites() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const [favoriteAnimals, setFavoriteAnimals] = useState<Animal[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!user) {
      navigate("/entrar");
      return;
    }

    // Carregar favoritos do localStorage
    const storedFavorites = localStorage.getItem(`favorites_${user.id}`);
    if (storedFavorites) {
      const favSet = new Set<string>(JSON.parse(storedFavorites));
      setFavorites(favSet);

      // Filtrar animais favoritos
      const favs = mockAnimals.filter((animal) => favSet.has(animal.id));
      setFavoriteAnimals(favs);
    }
  }, [user, navigate]);

  const handleRemoveFavorite = (animalId: string) => {
    const newFavorites = new Set(favorites);
    newFavorites.delete(animalId);
    setFavorites(newFavorites);
    setFavoriteAnimals(favoriteAnimals.filter((a) => a.id !== animalId));

    if (user) {
      localStorage.setItem(`favorites_${user.id}`, JSON.stringify(Array.from(newFavorites)));
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-primary/5 via-background to-accent/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Meus Favoritos
            </h1>
            <p className="text-lg text-muted-foreground">
              Animais que você salvou e gostaria de conhecer melhor
            </p>
          </div>
        </div>
      </section>

      {/* Favorites Grid */}
      <section className="py-12 flex-1">
        <div className="container">
          {favoriteAnimals.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <Heart className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Nenhum favorito ainda
              </h3>
              <p className="text-muted-foreground mb-6">
                Comece a adicionar animais aos seus favoritos clicando no ícone de coração
              </p>
              <Link href="/adocao">
                <Button className="bg-primary hover:bg-primary/90">
                  Explorar Animais
                </Button>
              </Link>
            </div>
          ) : (
            <div>
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {favoriteAnimals.length} animal(is) nos favoritos
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteAnimals.map((animal) => (
                  <FavoriteCard
                    key={animal.id}
                    animal={animal}
                    onRemove={handleRemoveFavorite}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

function FavoriteCard({
  animal,
  onRemove,
}: {
  animal: Animal;
  onRemove: (id: string) => void;
}) {
  return (
    <Card className="border-border/50 hover:border-primary/50 transition-all hover:shadow-lg overflow-hidden group">
      <div className="aspect-square overflow-hidden relative">
        <img
          src={animal.image}
          alt={animal.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 flex gap-2 items-start">
          <button
            onClick={() => onRemove(animal.id)}
            className="p-2 rounded-full bg-white/90 hover:bg-white transition-all shadow-md hover:shadow-lg"
            title="Remover dos favoritos"
          >
            <Trash2 className="w-5 h-5 text-red-500 hover:text-red-600" />
          </button>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
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
      </div>
      <CardContent className="pt-4 pb-4 space-y-3">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-1">
            {animal.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {animal.breed} • {animal.age} • {animal.gender}
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 text-primary" />
          <span>{animal.location}</span>
        </div>

        <div className="flex gap-2">
          {animal.vaccinated && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 text-primary text-xs">
              <Check className="w-3 h-3" />
              Vacinado
            </span>
          )}
          {animal.neutered && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 text-primary text-xs">
              <Check className="w-3 h-3" />
              Castrado
            </span>
          )}
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {animal.description}
        </p>

        <Link href={`/adocao/${animal.id}`}>
          <Button className="w-full bg-primary hover:bg-primary/90">
            Ver Detalhes
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

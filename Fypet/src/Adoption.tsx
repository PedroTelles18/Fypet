import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { useDebounce } from "@/hooks/useDebounce";
import { mockAnimals, type Animal } from "@/lib/mockData";
import { Check, Heart, MapPin, Search, Loader2, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "wouter";

// Extrair raças únicas por espécie
const getBreedsBySpecies = (species: string): string[] => {
  if (species === "all") {
    return Array.from(new Set(mockAnimals.map((a) => a.breed))).sort();
  }
  return Array.from(
    new Set(mockAnimals.filter((a) => a.species === species).map((a) => a.breed))
  ).sort();
};

// Extrair localizações únicas
const getLocations = (): string[] => {
  return Array.from(new Set(mockAnimals.map((a) => a.location))).sort();
};

export default function Adoption() {
  const [searchTerm, setSearchTerm] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("all");
  const [breedFilter, setBreedFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [sizeFilter, setSizeFilter] = useState("all");

  // Usar debounce para busca
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredAnimals = useMemo(() => {
    return mockAnimals.filter((animal) => {
      const matchesSearch =
        debouncedSearchTerm === "" ||
        animal.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        animal.breed
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase()) ||
        animal.description
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase());

      const matchesSpecies =
        speciesFilter === "all" || animal.species === speciesFilter;

      const matchesBreed =
        breedFilter === "all" || animal.breed === breedFilter;

      const matchesStatus =
        statusFilter === "all" || animal.status === statusFilter;

      const matchesLocation =
        locationFilter === "all" || animal.location === locationFilter;

      const matchesSize = sizeFilter === "all" || animal.size === sizeFilter;

      return (
        matchesSearch &&
        matchesSpecies &&
        matchesBreed &&
        matchesStatus &&
        matchesLocation &&
        matchesSize
      );
    });
  }, [
    debouncedSearchTerm,
    speciesFilter,
    breedFilter,
    statusFilter,
    locationFilter,
    sizeFilter,
  ]);

  const hasActiveFilters =
    searchTerm ||
    speciesFilter !== "all" ||
    breedFilter !== "all" ||
    statusFilter !== "all" ||
    locationFilter !== "all" ||
    sizeFilter !== "all";

  const handleClearFilters = () => {
    setSearchTerm("");
    setSpeciesFilter("all");
    setBreedFilter("all");
    setStatusFilter("all");
    setLocationFilter("all");
    setSizeFilter("all");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-primary/5 via-background to-accent/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Animais para Adoção
            </h1>
            <p className="text-lg text-muted-foreground">
              Encontre seu novo melhor amigo entre centenas de animais esperando
              por um lar amoroso
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 border-b border-border bg-card">
        <div className="container">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="space-y-2">
              <Label htmlFor="search" className="text-sm font-medium">
                Buscar por nome, raça ou descrição
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Digite para buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            {/* Filter Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="space-y-2">
                <Label htmlFor="species" className="text-sm font-medium">
                  Espécie
                </Label>
                <Select value={speciesFilter} onValueChange={setSpeciesFilter}>
                  <SelectTrigger id="species">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="Cachorro">Cachorro</SelectItem>
                    <SelectItem value="Gato">Gato</SelectItem>
                    <SelectItem value="Coelho">Coelho</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="breed" className="text-sm font-medium">
                  Raça
                </Label>
                <Select value={breedFilter} onValueChange={setBreedFilter}>
                  <SelectTrigger id="breed">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    {getBreedsBySpecies(speciesFilter).map((breed) => (
                      <SelectItem key={breed} value={breed}>
                        {breed}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="size" className="text-sm font-medium">
                  Tamanho
                </Label>
                <Select value={sizeFilter} onValueChange={setSizeFilter}>
                  <SelectTrigger id="size">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="Pequeno">Pequeno</SelectItem>
                    <SelectItem value="Médio">Médio</SelectItem>
                    <SelectItem value="Grande">Grande</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status" className="text-sm font-medium">
                  Status
                </Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="Disponível">Disponível</SelectItem>
                    <SelectItem value="Em processo">Em processo</SelectItem>
                    <SelectItem value="Adotado">Adotado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium">
                  Localização
                </Label>
                <Select
                  value={locationFilter}
                  onValueChange={setLocationFilter}
                >
                  <SelectTrigger id="location">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    {getLocations().map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Filter Summary and Clear Button */}
            {hasActiveFilters && (
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">
                    {filteredAnimals.length}{" "}
                    {filteredAnimals.length === 1 ? "animal" : "animais"}{" "}
                    encontrado(s)
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {searchTerm && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 text-primary text-xs">
                        Busca: {searchTerm}
                        <X className="w-3 h-3" />
                      </span>
                    )}
                    {speciesFilter !== "all" && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 text-primary text-xs">
                        {speciesFilter}
                        <X className="w-3 h-3" />
                      </span>
                    )}
                    {breedFilter !== "all" && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 text-primary text-xs">
                        {breedFilter}
                        <X className="w-3 h-3" />
                      </span>
                    )}
                    {sizeFilter !== "all" && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 text-primary text-xs">
                        {sizeFilter}
                        <X className="w-3 h-3" />
                      </span>
                    )}
                    {statusFilter !== "all" && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 text-primary text-xs">
                        {statusFilter}
                        <X className="w-3 h-3" />
                      </span>
                    )}
                    {locationFilter !== "all" && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 text-primary text-xs">
                        {locationFilter}
                        <X className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearFilters}
                  className="shrink-0"
                >
                  Limpar filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Animals Grid */}
      <section className="py-12 flex-1">
        <div className="container">
          {filteredAnimals.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <Search className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Nenhum animal encontrado
              </h3>
              <p className="text-muted-foreground mb-6">
                Tente ajustar os filtros para ver mais resultados
              </p>
              <Button onClick={handleClearFilters} variant="outline">
                Limpar filtros
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAnimals.map((animal) => (
                <AnimalCard key={animal.id} animal={animal} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

function AnimalCard({ animal }: { animal: Animal }) {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(() => {
    if (!user) return false;
    const storedFavorites = localStorage.getItem(`favorites_${user.id}`);
    if (!storedFavorites) return false;
    const favs = JSON.parse(storedFavorites) as string[];
    return favs.includes(animal.id);
  });

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) return;

    const storedFavorites = localStorage.getItem(`favorites_${user.id}`);
    const favs = storedFavorites ? (JSON.parse(storedFavorites) as string[]) : [];

    if (isFavorite) {
      const newFavs = favs.filter((id) => id !== animal.id);
      localStorage.setItem(`favorites_${user.id}`, JSON.stringify(newFavs));
    } else {
      favs.push(animal.id);
      localStorage.setItem(`favorites_${user.id}`, JSON.stringify(favs));
    }

    setIsFavorite(!isFavorite);
  };

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
            onClick={handleFavoriteClick}
            className="p-2 rounded-full bg-white/90 hover:bg-white transition-all shadow-md hover:shadow-lg"
            title={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          >
            <Heart
              className={`w-5 h-5 transition-all ${
                isFavorite
                  ? "fill-red-500 text-red-500"
                  : "text-gray-400 hover:text-red-400"
              }`}
            />
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

        <Button 
          onClick={() => window.location.href = `/adocao/${animal.id}`}
          className="w-full bg-primary hover:bg-primary/90 group/btn"
        >
          Ver Detalhes
          <Heart className="ml-2 w-4 h-4 group-hover/btn:scale-110 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
}

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { Upload, X, Check, AlertCircle, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";

interface FormData {
  name: string;
  species: string;
  breed: string;
  age: string;
  gender: string;
  size: string;
  location: string;
  description: string;
  vaccinated: boolean;
  neutered: boolean;
  ongName: string;
  ongContact: string;
}

export default function PublishAnnouncement() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    species: "Cachorro",
    breed: "",
    age: "",
    gender: "Macho",
    size: "Médio",
    location: "",
    description: "",
    vaccinated: true,
    neutered: false,
    ongName: "",
    ongContact: "",
  });

  // Redirecionar se não estiver logado
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 container py-12">
          <Card className="max-w-md mx-auto border-destructive/20">
            <CardHeader>
              <CardTitle className="text-destructive flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Acesso Restrito
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Você precisa estar logado para publicar um anúncio.
              </p>
              <Button
                onClick={() => setLocation("/login")}
                className="w-full"
              >
                Ir para Login
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const maxImages = 5;
    if (uploadedImages.length + files.length > maxImages) {
      toast.error(`Máximo de ${maxImages} fotos permitidas`);
      return;
    }

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setUploadedImages((prev) => [...prev, result]);
      };
      reader.readAsDataURL(file);
    });

    // Limpar input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validações
    if (!formData.name.trim()) {
      toast.error("Nome do animal é obrigatório");
      return;
    }

    if (!formData.breed.trim()) {
      toast.error("Raça é obrigatória");
      return;
    }

    if (!formData.age.trim()) {
      toast.error("Idade é obrigatória");
      return;
    }

    if (!formData.location.trim()) {
      toast.error("Localização é obrigatória");
      return;
    }

    if (!formData.description.trim()) {
      toast.error("Descrição é obrigatória");
      return;
    }

    if (uploadedImages.length === 0) {
      toast.error("Adicione pelo menos uma foto");
      return;
    }

    if (!formData.ongName.trim() && !formData.ongContact.trim()) {
      toast.error("Informações de contato são obrigatórias");
      return;
    }

    setIsLoading(true);

    try {
      // Simular delay de envio
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Aqui você faria a chamada para a API tRPC
      // const result = await trpc.animals.create.mutate({...formData, images: uploadedImages});

      toast.success("Anúncio publicado com sucesso! 🎉");

      // Redirecionar para página de adoção após sucesso
      setTimeout(() => {
        setLocation("/adocao");
      }, 1500);
    } catch (error) {
      toast.error("Erro ao publicar anúncio. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="py-8 bg-gradient-to-br from-primary/5 via-background to-accent/10">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Publicar Anúncio de Adoção
            </h1>
            <p className="text-muted-foreground">
              Ajude um animal a encontrar um lar amoroso. Preencha o formulário abaixo com as informações do seu animal.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 flex-1">
        <div className="container max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Informações Básicas */}
            <Card>
              <CardHeader>
                <CardTitle>Informações Básicas do Animal</CardTitle>
                <CardDescription>
                  Dados essenciais sobre o animal que deseja colocar para adoção
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-medium">
                      Nome do Animal *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Ex: Thor"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="species" className="font-medium">
                      Espécie *
                    </Label>
                    <Select
                      value={formData.species}
                      onValueChange={(value) =>
                        handleSelectChange("species", value)
                      }
                    >
                      <SelectTrigger id="species">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cachorro">Cachorro</SelectItem>
                        <SelectItem value="Gato">Gato</SelectItem>
                        <SelectItem value="Coelho">Coelho</SelectItem>
                        <SelectItem value="Ave">Ave</SelectItem>
                        <SelectItem value="Roedor">Roedor</SelectItem>
                        <SelectItem value="Outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="breed" className="font-medium">
                      Raça *
                    </Label>
                    <Input
                      id="breed"
                      name="breed"
                      placeholder="Ex: Labrador"
                      value={formData.breed}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="age" className="font-medium">
                      Idade *
                    </Label>
                    <Input
                      id="age"
                      name="age"
                      placeholder="Ex: 3 anos"
                      value={formData.age}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender" className="font-medium">
                      Gênero *
                    </Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) =>
                        handleSelectChange("gender", value)
                      }
                    >
                      <SelectTrigger id="gender">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Macho">Macho</SelectItem>
                        <SelectItem value="Fêmea">Fêmea</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="size" className="font-medium">
                      Tamanho *
                    </Label>
                    <Select
                      value={formData.size}
                      onValueChange={(value) =>
                        handleSelectChange("size", value)
                      }
                    >
                      <SelectTrigger id="size">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pequeno">Pequeno</SelectItem>
                        <SelectItem value="Médio">Médio</SelectItem>
                        <SelectItem value="Grande">Grande</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="font-medium">
                    Localização *
                  </Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="Ex: São Paulo, SP"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="font-medium">
                    Descrição do Animal *
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Descreva a personalidade, características especiais, necessidades de cuidado, etc..."
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4 pt-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="vaccinated"
                      checked={formData.vaccinated}
                      onChange={(e) =>
                        handleCheckboxChange("vaccinated", e.target.checked)
                      }
                      className="w-4 h-4 rounded border-border"
                    />
                    <Label htmlFor="vaccinated" className="font-normal cursor-pointer">
                      Vacinado
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="neutered"
                      checked={formData.neutered}
                      onChange={(e) =>
                        handleCheckboxChange("neutered", e.target.checked)
                      }
                      className="w-4 h-4 rounded border-border"
                    />
                    <Label htmlFor="neutered" className="font-normal cursor-pointer">
                      Castrado/Esterilizado
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fotos */}
            <Card>
              <CardHeader>
                <CardTitle>Fotos do Animal</CardTitle>
                <CardDescription>
                  Adicione até 5 fotos de alta qualidade (máximo 5MB cada)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploadedImages.length >= 5}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadedImages.length >= 5}
                    className="flex flex-col items-center gap-2 mx-auto"
                  >
                    <Upload className="w-8 h-8 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">
                        Clique para fazer upload
                      </p>
                      <p className="text-sm text-muted-foreground">
                        ou arraste as fotos aqui
                      </p>
                    </div>
                  </button>
                  <p className="text-xs text-muted-foreground mt-2">
                    {uploadedImages.length}/5 fotos adicionadas
                  </p>
                </div>

                {uploadedImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {uploadedImages.map((image, index) => (
                      <div
                        key={index}
                        className="relative group rounded-lg overflow-hidden"
                      >
                        <img
                          src={image}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 p-1 bg-destructive/90 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        {index === 0 && (
                          <div className="absolute top-1 left-1 px-2 py-1 bg-primary text-primary-foreground text-xs rounded font-medium">
                            Principal
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Informações de Contato */}
            <Card>
              <CardHeader>
                <CardTitle>Informações de Contato</CardTitle>
                <CardDescription>
                  Como as pessoas interessadas podem entrar em contato
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ongName" className="font-medium">
                    Nome da ONG / Pessoa Responsável *
                  </Label>
                  <Input
                    id="ongName"
                    name="ongName"
                    placeholder="Ex: Proteção Animal SP"
                    value={formData.ongName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ongContact" className="font-medium">
                    Telefone/WhatsApp *
                  </Label>
                  <Input
                    id="ongContact"
                    name="ongContact"
                    placeholder="Ex: (11) 99999-8888"
                    value={formData.ongContact}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex gap-3 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setLocation("/adocao")}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Publicando...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    Publicar Anúncio
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}

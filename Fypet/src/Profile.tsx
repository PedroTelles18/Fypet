import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Camera, Save, X, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";

export default function Profile() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    bio: "",
    userType: "individual" as "individual" | "ong",
  });

  const profileQuery = trpc.profile.get.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const profileUpdateMutation = trpc.profile.update.useMutation({
    onSuccess: () => {
      toast.success("Perfil atualizado com sucesso!");
      setIsEditing(false);
      profileQuery.refetch();
    },
    onError: (error) => {
      toast.error("Erro ao atualizar perfil: " + error.message);
    },
  });

  const uploadMutation = trpc.upload.file.useMutation({
    onSuccess: (result) => {
      toast.success("Foto enviada com sucesso!");
      setPhotoPreview(result.url);
      profileUpdateMutation.mutate({
        photoUrl: result.url,
      });
    },
    onError: (error) => {
      toast.error("Erro ao enviar foto: " + error.message);
    },
  });

  useEffect(() => {
    if (!isAuthenticated && !authLoading) {
      setLocation("/login");
      return;
    }

    if (profileQuery.data) {
      setFormData({
        phone: profileQuery.data.phone || "",
        address: profileQuery.data.address || "",
        city: profileQuery.data.city || "",
        state: profileQuery.data.state || "",
        zipCode: profileQuery.data.zipCode || "",
        bio: profileQuery.data.bio || "",
        userType: profileQuery.data.userType || "individual",
      });

      if (profileQuery.data.photoUrl) {
        setPhotoPreview(profileQuery.data.photoUrl);
      }
    }
  }, [isAuthenticated, authLoading, profileQuery.data, setLocation]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setPhotoPreview(base64.split(",")[1]);
      uploadMutation.mutate({
        fileName: file.name,
        fileData: base64.split(",")[1],
        contentType: file.type,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    profileUpdateMutation.mutate(formData);
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container py-12">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Meu Perfil</h1>
            <p className="text-muted-foreground">
              Gerencie suas informações pessoais e preferências
            </p>
          </div>

          <Card className="p-8">
            {/* Profile Photo Section */}
            <div className="mb-8 pb-8 border-b border-border">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                    {photoPreview ? (
                      <img
                        src={photoPreview}
                        alt="Foto de perfil"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Camera className="w-12 h-12 text-primary" />
                    )}
                  </div>
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-2 cursor-pointer transition-colors">
                      <Camera className="w-4 h-4" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                        disabled={uploadMutation.isPending}
                      />
                    </label>
                  )}
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    {user.name}
                  </h2>
                  <p className="text-muted-foreground">{user.email}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {formData.userType === "ong" ? "Organização" : "Pessoa Física"}
                  </p>
                </div>
              </div>
            </div>

            {/* Informações Básicas */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Informações Básicas
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <Input
                    value={user.email || ""}
                    disabled
                    className="bg-muted"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Telefone
                  </label>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Tipo de Usuário
                  </label>
                  <select
                    name="userType"
                    value={formData.userType}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground disabled:bg-muted disabled:cursor-not-allowed"
                  >
                    <option value="individual">Pessoa Física</option>
                    <option value="ong">Organização (ONG)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Endereço */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Endereço
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Endereço
                  </label>
                  <Input
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Rua, número, complemento"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Cidade
                    </label>
                    <Input
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="São Paulo"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Estado
                    </label>
                    <Input
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="SP"
                      maxLength={2}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      CEP
                    </label>
                    <Input
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="12345-678"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Sobre Você
              </h3>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Conte um pouco sobre você e suas preferências com animais..."
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground disabled:bg-muted disabled:cursor-not-allowed min-h-24 resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-end">
              {isEditing ? (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                    disabled={profileUpdateMutation.isPending}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={profileUpdateMutation.isPending}
                    className="bg-primary hover:bg-primary/90"
                  >
                    {profileUpdateMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Salvando...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Salvar Mudanças
                      </>
                    )}
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Editar Perfil
                </Button>
              )}
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}

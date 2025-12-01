import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { mockLostPets, type LostPet } from "@/lib/mockData";
import {
  AlertCircle,
  Calendar,
  Mail,
  MapPin,
  Phone,
  Plus,
  Search,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function LostPets() {
  const [searchTerm, setSearchTerm] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    petName: "",
    species: "",
    breed: "",
    color: "",
    lastSeenLocation: "",
    lastSeenDate: "",
    description: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
  });

  const filteredPets = mockLostPets.filter((pet) => {
    const matchesSearch =
      (pet.name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
      pet.color.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (pet.breed?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    const matchesSpecies =
      speciesFilter === "all" || pet.species === speciesFilter;
    const matchesLocation =
      !locationFilter ||
      pet.lastSeenLocation.toLowerCase().includes(locationFilter.toLowerCase());

    return matchesSearch && matchesSpecies && matchesLocation;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.species ||
      !formData.color ||
      !formData.lastSeenLocation ||
      !formData.lastSeenDate ||
      !formData.contactName ||
      !formData.contactPhone
    ) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    toast.success(
      "Denúncia registrada com sucesso! Vamos ajudar a encontrar seu pet."
    );
    setDialogOpen(false);
    setFormData({
      petName: "",
      species: "",
      breed: "",
      color: "",
      lastSeenLocation: "",
      lastSeenDate: "",
      description: "",
      contactName: "",
      contactPhone: "",
      contactEmail: "",
    });
  };
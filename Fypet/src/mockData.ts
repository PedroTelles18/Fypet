export interface Animal {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: string;
  gender: "Macho" | "Fêmea";
  size: "Pequeno" | "Médio" | "Grande";
  location: string;
  description: string;
  image: string;
  status: "Disponível" | "Adotado" | "Em processo";
  vaccinated: boolean;
  neutered: boolean;
  ongName: string;
  ongContact: string;
  postedDate: string;
}

export interface LostPet {
  id: string;
  name?: string;
  species: string;
  breed?: string;
  color: string;
  lastSeenLocation: string;
  lastSeenDate: string;
  description: string;
  image: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  status: "Perdido" | "Encontrado";
}

export const mockAnimals: Animal[] = [
  {
    id: "1",
    name: "Thor",
    species: "Cachorro",
    breed: "Labrador",
    age: "3 anos",
    gender: "Macho",
    size: "Grande",
    location: "São Paulo, SP",
    description:
      "Thor é um cachorro muito carinhoso e brincalhão. Adora crianças e outros animais. Está castrado, vacinado e pronto para encontrar uma família amorosa. É muito obediente e aprende comandos rapidamente.",
    image: "/animal-1.jpg",
    status: "Disponível",
    vaccinated: true,
    neutered: true,
    ongName: "ONG Patinhas Felizes",
    ongContact: "(11) 98765-4321",
    postedDate: "2024-11-20",
  },
  {
    id: "2",
    name: "Luna",
    species: "Gato",
    breed: "Siamês",
    age: "2 anos",
    gender: "Fêmea",
    size: "Pequeno",
    location: "Rio de Janeiro, RJ",
    description:
      "Luna é uma gatinha muito dócil e carinhosa. Gosta de colo e de brincar. É independente mas adora companhia. Está castrada e com todas as vacinas em dia.",
    image: "/animal-8.jpg",
    status: "Disponível",
    vaccinated: true,
    neutered: true,
    ongName: "Resgate Felino RJ",
    ongContact: "(21) 97654-3210",
    postedDate: "2024-11-22",
  },
  {
    id: "3",
    name: "Bob",
    species: "Cachorro",
    breed: "Vira-lata",
    age: "5 anos",
    gender: "Macho",
    size: "Médio",
    location: "Belo Horizonte, MG",
    description:
      "Bob é um cachorro muito tranquilo e companheiro. Ideal para apartamentos. É muito fiel e adora passear. Convive bem com outros animais.",
    image: "/animal-4.jpg",
    status: "Disponível",
    vaccinated: true,
    neutered: true,
    ongName: "Amigos de Quatro Patas BH",
    ongContact: "(31) 96543-2109",
    postedDate: "2024-11-18",
  },
  {
    id: "4",
    name: "Mel",
    species: "Gato",
    breed: "Persa",
    age: "1 ano",
    gender: "Fêmea",
    size: "Pequeno",
    location: "Curitiba, PR",
    description:
      "Mel é uma gatinha muito fofa e brincalhona. Adora brinquedos e arranhadores. É muito sociável e se adapta facilmente a novos ambientes.",
    image: "/animal-6.jpg",
    status: "Disponível",
    vaccinated: true,
    neutered: false,
    ongName: "Lar dos Gatos PR",
    ongContact: "(41) 95432-1098",
    postedDate: "2024-11-25",
  },
  {
    id: "5",
    name: "Rex",
    species: "Cachorro",
    breed: "Pastor Alemão",
    age: "4 anos",
    gender: "Macho",
    size: "Grande",
    location: "Porto Alegre, RS",
    description:
      "Rex é um cachorro muito inteligente e protetor. Ideal para casas com quintal. É muito leal e obediente. Precisa de exercícios diários.",
    image: "/animal-7.jpg",
    status: "Em processo",
    vaccinated: true,
    neutered: true,
    ongName: "Proteção Animal RS",
    ongContact: "(51) 94321-0987",
    postedDate: "2024-11-15",
  },
  {
    id: "6",
    name: "Nina",
    species: "Coelho",
    breed: "Mini Lion",
    age: "6 meses",
    gender: "Fêmea",
    size: "Pequeno",
    location: "São Paulo, SP",
    description:
      "Nina é uma coelhinha muito dócil e carinhosa. Adora cenouras e folhas verdes. É muito limpa e fácil de cuidar. Ideal para apartamentos.",
    image: "/animal-3.jpg",
    status: "Disponível",
    vaccinated: true,
    neutered: true,
    ongName: "Resgate de Pequenos Animais",
    ongContact: "(11) 93210-9876",
    postedDate: "2024-11-23",
  },
];

export const mockLostPets: LostPet[] = [
  {
    id: "1",
    name: "Toby",
    species: "Cachorro",
    breed: "Beagle",
    color: "Tricolor (marrom, preto e branco)",
    lastSeenLocation: "Parque Ibirapuera, São Paulo - SP",
    lastSeenDate: "2024-11-26",
    description:
      "Toby fugiu durante um passeio no parque. Ele usa uma coleira azul com plaquinha de identificação. É muito amigável e responde ao nome.",
    image: "/lost-pet-2.jpg",
    contactName: "Maria Silva",
    contactPhone: "(11) 99999-8888",
    contactEmail: "maria.silva@email.com",
    status: "Perdido",
  },
  {
    id: "2",
    name: "Mimi",
    species: "Gato",
    breed: "Vira-lata",
    color: "Laranja com listras",
    lastSeenLocation: "Rua das Flores, 456 - Copacabana, Rio de Janeiro - RJ",
    lastSeenDate: "2024-11-25",
    description:
      "Mimi saiu de casa e não voltou. É uma gata muito assustada com estranhos. Tem uma mancha branca no peito.",
    image: "/lost-pet-1.jpg",
    contactName: "João Santos",
    contactPhone: "(21) 98888-7777",
    contactEmail: "joao.santos@email.com",
    status: "Perdido",
  },
  {
    id: "3",
    name: "Pipoca",
    species: "Cachorro",
    breed: "Poodle",
    color: "Branco",
    lastSeenLocation: "Shopping Center, Belo Horizonte - MG",
    lastSeenDate: "2024-11-24",
    description:
      "Pipoca se perdeu na área de estacionamento do shopping. É um cachorro pequeno, muito peludo e usa laço rosa na cabeça.",
    image: "/lost-pet-4.jpg",
    contactName: "Ana Paula",
    contactPhone: "(31) 97777-6666",
    contactEmail: "ana.paula@email.com",
    status: "Perdido",
  },
  {
    id: "4",
    species: "Gato",
    color: "Preto com olhos verdes",
    lastSeenLocation: "Bairro Água Verde, Curitiba - PR",
    lastSeenDate: "2024-11-23",
    description:
      "Gato preto sem coleira. Muito arisco. Foi visto várias vezes na região mas foge quando alguém se aproxima.",
    image: "/lost-pet-3.jpg",
    contactName: "Carlos Mendes",
    contactPhone: "(41) 96666-5555",
    contactEmail: "carlos.mendes@email.com",
    status: "Perdido",
  },
  {
    id: "5",
    name: "Bolinha",
    species: "Cachorro",
    breed: "Shih Tzu",
    color: "Marrom e branco",
    lastSeenLocation: "Parque da Redenção, Porto Alegre - RS",
    lastSeenDate: "2024-11-27",
    description:
      "Bolinha fugiu assustado com fogos de artifício. Usa coleira vermelha. É muito dócil e gosta de crianças.",
    image: "/lost-pet-2.jpg",
    contactName: "Fernanda Costa",
    contactPhone: "(51) 95555-4444",
    contactEmail: "fernanda.costa@email.com",
    status: "Perdido",
  },
];

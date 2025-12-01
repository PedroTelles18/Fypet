import { Heart, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="space-y-4">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground">
                  <Heart className="w-6 h-6 fill-current" />
                </div>
                <span className="text-2xl font-bold text-foreground">
                  Fy<span className="text-primary">Pet</span>
                </span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Conectando corações e patas. Ajudamos animais a encontrarem lares
              amorosos e famílias a encontrarem seus novos melhores amigos.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              Links Rápidos
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/adocao">
                  <a className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Adotar um Pet
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/perdidos">
                  <a className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Animais Perdidos
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/sobre">
                  <a className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Sobre Nós
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/contato">
                  <a className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Contato
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Para ONGs */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Para ONGs</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/cadastro">
                  <a className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Cadastrar ONG
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/cadastro">
                  <a className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Publicar Anúncio
                  </a>
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Como Funciona
                </a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  contato@fypet.com.br
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  (11) 9999-9999
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  São Paulo, SP - Brasil
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} FyPet. Todos os direitos reservados.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Política de Privacidade
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

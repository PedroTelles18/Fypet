        const users = JSON.parse(usersData);
        const foundUser = users.find(
          (u: any) => u.email === email && u.password === password
        );

        if (foundUser) {
          const { password: _, ...userWithoutPassword } = foundUser;
          setUser(userWithoutPassword);
          localStorage.setItem("fypet_user", JSON.stringify(userWithoutPassword));
          return true;
        }
      } catch (error) {
        console.error("Erro ao fazer login:", error);
      }
    }

    // Se não encontrou, retornar falso
    return false;
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    try {
      // Simular cadastro
      // Em produção, isso seria uma chamada à API
      
      // Verificar se o email já existe
      const usersData = localStorage.getItem("fypet_users");
      let users = [];
      
      if (usersData) {
        users = JSON.parse(usersData);
        const emailExists = users.some((u: any) => u.email === data.email);
        if (emailExists) {
          return false; // Email já cadastrado
        }
      }

      // Criar novo usuário
      const newUser = {
        id: Date.now().toString(),
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        type: data.type,
      };

      users.push(newUser);
      localStorage.setItem("fypet_users", JSON.stringify(users));

      // Fazer login automaticamente
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem("fypet_user", JSON.stringify(userWithoutPassword));

      return true;
    } catch (error) {
      console.error("Erro ao registrar:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("fypet_user");
  };

  const updateUser = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
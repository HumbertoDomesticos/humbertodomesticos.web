"use client"

import type { Produto } from "@/services/routes/produtos/page";
import type React from "react";
import { createContext, useContext, useState } from "react";

interface ProdutoContextType {
  carrinho: Produto[];
  adicionarAoCarrinho: (produto: Produto) => void;
  removerDoCarrinho: (produtoId: number) => void;
  limparCarrinho: () => void;
  quantidadeItens: number;
}

interface ProdutoProviderProps {
  children: React.ReactNode;
}

const ProdutoContext = createContext<ProdutoContextType | undefined>(undefined);

export const ProdutoProvider: React.FC<ProdutoProviderProps> = ({ children }) => {

  const [carrinho, setCarrinho] = useState<Produto[]>([]);

  const adicionarAoCarrinho = (produto: Produto) => {
    setCarrinho((prev) => {
      const existeNoCarrinho = prev.some(item => item.id_prod === produto.id_prod);

      if (existeNoCarrinho) {
        // Se já existe, pode aumentar a quantidade ou não fazer nada
        // Aqui estou apenas retornando o carrinho sem alterações
        // Você pode implementar lógica para incrementar quantidade se quiser
        return prev;
      }

      // Se não existe, adiciona ao carrinho
      return [...prev, produto];
    });

    
  };

  const removerDoCarrinho = (produtoId: number) => {
    setCarrinho((prev) => prev.filter(item => item.id_prod !== produtoId));
  };

  const limparCarrinho = () => {
    setCarrinho([]);
  };

  const quantidadeItens = carrinho.length;

  return (
    <ProdutoContext.Provider
      value={{
        carrinho,
        adicionarAoCarrinho,
        removerDoCarrinho,
        limparCarrinho,
        quantidadeItens
      }}
    >
      {children}
    </ProdutoContext.Provider>
  );
};

export const useProduto = () => {
  const context = useContext(ProdutoContext);
  if (context === undefined) {
    throw new Error("useProduto must be used within a ProdutoProvider");
  }
  return context;
};

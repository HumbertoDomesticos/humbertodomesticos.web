"use client"

import type { Produto } from "@/services/routes/produtos/page";
import type React from "react";
import { createContext, useContext, useState } from "react";

interface ProdutoContextType {
  carrinho: Produto[];
  adicionarAoCarrinho: (produto: Produto) => void;
  removerDoCarrinho: (produtoId: number) => void;
  limparCarrinho: () => void;
  atualizarQuantidade: (produtoId: number, novaQuantidade: number) => void;
  quantidadeItens: number;
  getQuantidade: (produtoId: number) => number;


}

interface ProdutoCarrinho extends Produto {
  quantidade: number;
}

interface ProdutoProviderProps {
  children: React.ReactNode;
}

const ProdutoContext = createContext<ProdutoContextType | undefined>(undefined);

export const ProdutoProvider: React.FC<ProdutoProviderProps> = ({ children }) => {

  const [carrinho, setCarrinho] = useState<ProdutoCarrinho[]>([]);

  const adicionarAoCarrinho = (produto: Produto) => {
    setCarrinho((prev) => {
      const produtoExistente = prev.find(item => item.id_prod === produto.id_prod);

      if (produtoExistente) {
        // Já está no carrinho, incrementa se não ultrapassar o estoque
        if (produtoExistente.quantidade < produto.estoque_prod) {
          return prev.map(item =>
            item.id_prod === produto.id_prod
              ? { ...item, quantidade: item.quantidade + 1 }
              : item
          );
          // biome-ignore lint/style/noUselessElse: <explanation>
        } else {
          return prev; // Não ultrapassa o estoque
        }
      }

      // Adiciona novo com quantidade 1
      return [...prev, { ...produto, quantidade: 1 }];
    });
  };

  const atualizarQuantidade = (produtoId: number, novaQuantidade: number) => {
    if (novaQuantidade <= 0) {
      removerDoCarrinho(produtoId);
      return;
    }

    setCarrinho((prev) =>
      prev.map(item =>
        item.id_prod === produtoId
          ? { ...item, quantidade: novaQuantidade }
          : item
      )
    );
  };

  const removerDoCarrinho = (produtoId: number) => {
    setCarrinho((prev) => prev.filter(item => item.id_prod !== produtoId));
  };

  const limparCarrinho = () => {
    setCarrinho([]);
  };

  const getQuantidade = (produtoId: number) => {
    return carrinho.find(item => item.id_prod === produtoId)?.quantidade || 0;
  };


  const quantidadeItens = carrinho.reduce((total, item) => total + item.quantidade, 0);

  return (
    <ProdutoContext.Provider
      value={{
        carrinho,
        adicionarAoCarrinho,
        removerDoCarrinho,
        limparCarrinho,
        quantidadeItens,
        atualizarQuantidade,
        getQuantidade,
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

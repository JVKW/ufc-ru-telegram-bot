export interface Categoria {
  nome: string
  itens: string[]
}

export interface Refeicao {
  tipo: string
  categorias: Categoria[]
}
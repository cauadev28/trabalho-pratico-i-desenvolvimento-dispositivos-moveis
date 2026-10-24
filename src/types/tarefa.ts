export type Prioridade = 'Baixa' | 'Média' | 'Alta';

export interface Tarefa {
  id: string;
  titulo: string;
  descricao: string;
  prioridade: Prioridade;
  concluida: boolean;
}

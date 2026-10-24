import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import { Tarefa, Prioridade } from '../types/tarefa';

interface ItemTarefaProps {
  tarefa: Tarefa;
  onAlternarStatus: (id: string) => void;
  onExcluir: (id: string) => void;
}

export const ItemTarefa: React.FC<ItemTarefaProps> = ({
  tarefa,
  onAlternarStatus,
  onExcluir,
}) => {
  // Retorna a cor correspondente a cada nível de prioridade
  const obterCorPrioridade = (prioridade: Prioridade) => {
    switch (prioridade) {
      case 'Alta':
        return { bg: '#FEE2E2', texto: '#DC2626' };
      case 'Média':
        return { bg: '#FEF3C7', texto: '#D97706' };
      case 'Baixa':
        return { bg: '#DCFCE7', texto: '#16A34A' };
      default:
        return { bg: '#F1F5F9', texto: '#64748B' };
    }
  };

  const coresPrioridade = obterCorPrioridade(tarefa.prioridade);

  // Confirmação antes de excluir (compatível com Mobile e Web)
  const confirmarExclusao = () => {
    if (Platform.OS === 'web') {
      const confirmou = window.confirm(`Deseja realmente excluir "${tarefa.titulo}"?`);
      if (confirmou) {
        onExcluir(tarefa.id);
      }
      return;
    }

    Alert.alert(
      'Excluir Tarefa',
      `Deseja realmente excluir "${tarefa.titulo}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => onExcluir(tarefa.id),
        },
      ]
    );
  };

  return (
    <View
      style={[
        styles.card,
        tarefa.concluida && styles.cardConcluido,
      ]}
    >
      <View style={styles.conteudoPrincipal}>
        {/* Título e Tag de Prioridade */}
        <View style={styles.cabecalhoCard}>
          <Text
            style={[
              styles.titulo,
              tarefa.concluida && styles.textoRiscado,
            ]}
          >
            {tarefa.titulo}
          </Text>

          <View
            style={[
              styles.tagPrioridade,
              { backgroundColor: coresPrioridade.bg },
            ]}
          >
            <Text
              style={[
                styles.textoTagPrioridade,
                { color: coresPrioridade.texto },
              ]}
            >
              {tarefa.prioridade}
            </Text>
          </View>
        </View>

        {/* Descrição */}
        <Text
          style={[
            styles.descricao,
            tarefa.concluida && styles.descricaoConcluida,
          ]}
        >
          {tarefa.descricao}
        </Text>
      </View>

      {/* Ações: Concluir/Reabrir e Excluir */}
      <View style={styles.rodapeCard}>
        <TouchableOpacity
          style={[
            styles.botaoAcao,
            tarefa.concluida ? styles.botaoReabrir : styles.botaoConcluir,
          ]}
          onPress={() => onAlternarStatus(tarefa.id)}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.textoBotaoAcao,
              tarefa.concluida
                ? styles.textoBotaoReabrir
                : styles.textoBotaoConcluir,
            ]}
          >
            {tarefa.concluida ? '✓ Concluída (Reabrir)' : 'Marcar como Concluída'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoExcluir}
          onPress={confirmarExclusao}
          activeOpacity={0.7}
        >
          <Text style={styles.textoBotaoExcluir}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  cardConcluido: {
    backgroundColor: '#F8FAFC',
    borderColor: '#CBD5E1',
    opacity: 0.85,
  },
  conteudoPrincipal: {
    marginBottom: 12,
  },
  cabecalhoCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  titulo: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    flex: 1,
  },
  textoRiscado: {
    textDecorationLine: 'line-through',
    color: '#64748B',
  },
  tagPrioridade: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  textoTagPrioridade: {
    fontSize: 11,
    fontWeight: '700',
  },
  descricao: {
    fontSize: 13,
    color: '#475569',
    marginTop: 6,
    lineHeight: 18,
  },
  descricaoConcluida: {
    color: '#94A3B8',
  },
  rodapeCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 10,
    gap: 8,
  },
  botaoAcao: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
  },
  botaoConcluir: {
    backgroundColor: '#EFF6FF',
    borderColor: '#BFDBFE',
  },
  botaoReabrir: {
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
  },
  textoBotaoAcao: {
    fontSize: 12,
    fontWeight: '600',
  },
  textoBotaoConcluir: {
    color: '#1D4ED8',
  },
  textoBotaoReabrir: {
    color: '#15803D',
  },
  botaoExcluir: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  textoBotaoExcluir: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '600',
  },
});

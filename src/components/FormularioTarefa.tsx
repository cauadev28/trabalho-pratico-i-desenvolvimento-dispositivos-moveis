import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Prioridade } from '../types/tarefa';

interface FormularioTarefaProps {
  onAdicionarTarefa: (
    titulo: string,
    descricao: string,
    prioridade: Prioridade
  ) => void;
}

export const FormularioTarefa: React.FC<FormularioTarefaProps> = ({
  onAdicionarTarefa,
}) => {
  // Estados para controlar os 3 campos do formulário
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [prioridade, setPrioridade] = useState<Prioridade>('Média');
  const [erro, setErro] = useState('');

  const lidarComEnvio = () => {
    // Validação dos campos obrigatórios
    if (!titulo.trim()) {
      setErro('Por favor, informe o título da tarefa.');
      return;
    }

    if (!descricao.trim()) {
      setErro('Por favor, informe uma breve descrição.');
      return;
    }

    // Se estiver tudo preenchido, limpa o erro e envia para o componente pai
    setErro('');
    onAdicionarTarefa(titulo.trim(), descricao.trim(), prioridade);

    // Limpa os campos após o cadastro
    setTitulo('');
    setDescricao('');
    setPrioridade('Média');
  };

  const prioridadesDisponiveis: Prioridade[] = ['Baixa', 'Média', 'Alta'];

  return (
    <View style={styles.cardFormulario}>
      <Text style={styles.tituloForm}>Nova Tarefa</Text>

      {/* Exibição da mensagem de validação se houver erro */}
      {erro ? <Text style={styles.textoErro}>{erro}</Text> : null}

      {/* Campo 1: Título */}
      <Text style={styles.label}>Título *</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Estudar React Native"
        placeholderTextColor="#94A3B8"
        value={titulo}
        onChangeText={(texto) => {
          setTitulo(texto);
          if (erro) setErro('');
        }}
      />

      {/* Campo 2: Descrição */}
      <Text style={styles.label}>Descrição *</Text>
      <TextInput
        style={[styles.input, styles.inputDescricao]}
        placeholder="Ex: Fazer os componentes do Trabalho Prático I"
        placeholderTextColor="#94A3B8"
        value={descricao}
        onChangeText={(texto) => {
          setDescricao(texto);
          if (erro) setErro('');
        }}
        multiline
      />

      {/* Campo 3: Prioridade */}
      <Text style={styles.label}>Prioridade</Text>
      <View style={styles.containerPrioridades}>
        {prioridadesDisponiveis.map((item) => {
          const selecionada = prioridade === item;
          return (
            <TouchableOpacity
              key={item}
              style={[
                styles.botaoPrioridade,
                selecionada && styles.botaoPrioridadeSelecionada,
              ]}
              onPress={() => setPrioridade(item)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.textoPrioridade,
                  selecionada && styles.textoPrioridadeSelecionada,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Botão de Cadastrar */}
      <TouchableOpacity
        style={styles.botaoAdicionar}
        onPress={lidarComEnvio}
        activeOpacity={0.8}
      >
        <Text style={styles.textoBotaoAdicionar}>+ Adicionar Tarefa</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardFormulario: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tituloForm: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 4,
    marginTop: 8,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: '#0F172A',
  },
  inputDescricao: {
    minHeight: 50,
    textAlignVertical: 'top',
  },
  textoErro: {
    backgroundColor: '#FEE2E2',
    color: '#B91C1C',
    padding: 8,
    borderRadius: 6,
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 8,
  },
  containerPrioridades: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  botaoPrioridade: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
  },
  botaoPrioridadeSelecionada: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  textoPrioridade: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  textoPrioridadeSelecionada: {
    color: '#FFFFFF',
  },
  botaoAdicionar: {
    backgroundColor: '#2563EB',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  textoBotaoAdicionar: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
});

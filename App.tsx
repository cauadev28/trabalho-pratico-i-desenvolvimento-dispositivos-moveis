import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Tarefa, Prioridade } from './src/types/tarefa';
import { Cabecalho } from './src/components/Cabecalho';
import { FormularioTarefa } from './src/components/FormularioTarefa';
import { ItemTarefa } from './src/components/ItemTarefa';

export default function App() {
  // Estado inicial com algumas tarefas de exemplo para demonstração
  const [tarefas, setTarefas] = useState<Tarefa[]>([
    {
      id: '1',
      titulo: 'Estudar React Native',
      descricao: 'Revisar componentes básicos, Props e State com TypeScript.',
      prioridade: 'Alta',
      concluida: true,
    },
    {
      id: '2',
      titulo: 'Desenvolver Trabalho Prático I',
      descricao: 'Criar os componentes e testar no emulador/dispositivo.',
      prioridade: 'Alta',
      concluida: false,
    },
    {
      id: '3',
      titulo: 'Subir projeto no GitHub',
      descricao: 'Criar o repositório público trabalho-pratico-i e enviar o link.',
      prioridade: 'Média',
      concluida: false,
    },
  ]);

  // Função para cadastrar uma nova tarefa
  const adicionarTarefa = (
    titulo: string,
    descricao: string,
    prioridade: Prioridade
  ) => {
    const novaTarefa: Tarefa = {
      id: Date.now().toString(),
      titulo,
      descricao,
      prioridade,
      concluida: false,
    };

    // Atualiza a lista dinamicamente
    setTarefas((tarefasAnteriores) => [novaTarefa, ...tarefasAnteriores]);
  };

  // Função para alternar entre pendente e concluída
  const alternarStatusTarefa = (id: string) => {
    setTarefas((tarefasAnteriores) =>
      tarefasAnteriores.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
      )
    );
  };

  // Função para excluir uma tarefa da lista
  const excluirTarefa = (id: string) => {
    setTarefas((tarefasAnteriores) =>
      tarefasAnteriores.filter((tarefa) => tarefa.id !== id)
    );
  };

  // Contadores para o cabeçalho
  const totalTarefas = tarefas.length;
  const totalConcluidas = tarefas.filter((t) => t.concluida).length;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Componente 1: Cabeçalho com identificação do app */}
        <Cabecalho
          titulo="Gerenciador de Tarefas"
          subtitulo="Trabalho Prático I • Desenvolvimento Móvel"
          totalTarefas={totalTarefas}
          totalConcluidas={totalConcluidas}
        />

        {/* Lista com FlatList: Formulario no ListHeaderComponent para scroll suave */}
        <FlatList
          data={tarefas}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <>
              {/* Componente 2: Formulário com 3 campos e validação */}
              <FormularioTarefa onAdicionarTarefa={adicionarTarefa} />
              <View style={styles.divisorSecao}>
                <Text style={styles.tituloSecao}>Minhas Tarefas ({totalTarefas})</Text>
              </View>
            </>
          }
          renderItem={({ item }) => (
            /* Componente 3: Item da tarefa com ações via props */
            <ItemTarefa
              tarefa={item}
              onAlternarStatus={alternarStatusTarefa}
              onExcluir={excluirTarefa}
            />
          )}
          ListEmptyComponent={
            <View style={styles.containerVazio}>
              <Text style={styles.textoVazioTitulo}>Nenhuma tarefa por aqui!</Text>
              <Text style={styles.textoVazioSubtitulo}>
                Preencha o formulário acima para cadastrar sua primeira tarefa.
              </Text>
            </View>
          }
          contentContainerStyle={styles.listaConteudo}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },
  keyboardContainer: {
    flex: 1,
  },
  listaConteudo: {
    paddingBottom: 28,
  },
  divisorSecao: {
    paddingHorizontal: 20,
    marginTop: 14,
    marginBottom: 6,
  },
  tituloSecao: {
    fontSize: 15,
    fontWeight: '700',
    color: '#334155',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  containerVazio: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  textoVazioTitulo: {
    fontSize: 16,
    fontWeight: '700',
    color: '#64748B',
    marginBottom: 6,
  },
  textoVazioSubtitulo: {
    fontSize: 13,
    color: '#94A3B8',
    textAlign: 'center',
  },
});

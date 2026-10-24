import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CabecalhoProps {
  titulo: string;
  subtitulo: string;
  totalTarefas: number;
  totalConcluidas: number;
}

export const Cabecalho: React.FC<CabecalhoProps> = ({
  titulo,
  subtitulo,
  totalTarefas,
  totalConcluidas,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.subtitulo}>{subtitulo}</Text>

      <View style={styles.badgeContainer}>
        <View style={styles.badge}>
          <Text style={styles.badgeTexto}>
            Total: {totalTarefas}
          </Text>
        </View>
        <View style={[styles.badge, styles.badgeConcluidas]}>
          <Text style={styles.badgeTextoConcluidas}>
            Concluídas: {totalConcluidas}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    backgroundColor: '#1E293B',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#F8FAFC',
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 13,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 4,
  },
  badgeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginTop: 14,
  },
  badge: {
    backgroundColor: '#334155',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  badgeConcluidas: {
    backgroundColor: '#065F46',
  },
  badgeTexto: {
    color: '#E2E8F0',
    fontSize: 12,
    fontWeight: '600',
  },
  badgeTextoConcluidas: {
    color: '#A7F3D0',
    fontSize: 12,
    fontWeight: '600',
  },
});

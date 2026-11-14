import { Alert, Platform } from 'react-native';

export const mostrarAlerta = (titulo, mensagem, aoFechar) => {
  if (Platform.OS === 'web') {
    window.alert(`${titulo}\n\n${mensagem}`);
    if (typeof aoFechar === 'function') {
      aoFechar();
    }
    return;
  }

  Alert.alert(titulo, mensagem, [
    {
      text: 'OK',
      onPress: () => {
        if (typeof aoFechar === 'function') {
          aoFechar();
        }
      },
    },
  ]);
};

export const mostrarConfirmacao = (titulo, mensagem, aoConfirmar) => {
  if (Platform.OS === 'web') {
    const confirmado = window.confirm(`${titulo}\n\n${mensagem}`);
    if (confirmado && typeof aoConfirmar === 'function') {
      aoConfirmar();
    }
    return;
  }

  Alert.alert(titulo, mensagem, [
    { text: 'Cancelar', style: 'cancel' },
    {
      text: 'Confirmar',
      style: 'destructive',
      onPress: () => {
        if (typeof aoConfirmar === 'function') {
          aoConfirmar();
        }
      },
    },
  ]);
};

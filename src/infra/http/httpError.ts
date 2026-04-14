import axios from "axios";

function getHttpStatusMessage(status?: number): string {
  switch (status) {
    case 400:
      return "Não foi possível concluir a solicitação. Revise os dados e tente novamente.";
    case 401:
      return "E-mail ou senha inválidos.";
    case 403:
      return "Você não tem permissão para realizar esta ação.";
    case 404:
      return "O recurso solicitado não foi encontrado.";
    case 409:
      return "Não foi possível concluir a solicitação porque os dados informados já existem.";
    case 422:
      return "Os dados informados são inválidos.";
    case 429:
      return "Muitas tentativas em pouco tempo. Aguarde e tente novamente.";
    default:
      if (status && status >= 500) {
        return "Ocorreu um erro interno. Tente novamente mais tarde.";
      }

      return "Não foi possível concluir a solicitação.";
  }
}

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (error.code === "ERR_NETWORK" || !error.response) {
      return "Não foi possível conectar ao servidor. Verifique sua internet e tente novamente.";
    }

    if (error.code === "ECONNABORTED") {
      return "A solicitação demorou mais do que o esperado. Tente novamente.";
    }

    return getHttpStatusMessage(error.response.status);
  }

  if (error instanceof Error) {
    return "Ocorreu um erro ao processar sua solicitação. Tente novamente.";
  }

  return "Erro inesperado. Tente novamente.";
}
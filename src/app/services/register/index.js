


// Função assíncrona para registrar um novo usuário
export const registerNewUser = async (formData) => {
    try {
      // Envia uma requisição POST para o endpoint "/api/register"
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData), // Converte os dados do formulário em formato JSON e envia no corpo da requisição
      });
  
      // Aguarda a resposta e a converte em um objeto JavaScript
      const finalData = await response.json();
  
      // Retorna os dados finais recebidos do servidor
      return finalData;
    } catch (e) {
      // Em caso de erro, exibe uma mensagem de erro no console
      console.log("error", e);
    }
  };
  
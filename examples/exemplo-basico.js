import { AcqClient } from "acq-sdk";

// Exemplo básico de uso
async function exemploBasico() {
  const client = new AcqClient({
    apiKey: "sua-api-key-aqui",
  });

  try {
    // Criar um email temporário
    const email = await client.mails.create();
    console.log("Email criado:", email.mail);

    // Renderizar HTML simples
    const html = "<h1>Olá mundo!</h1>";
    const imagem = await client.render.htmlToImage({ html });
    console.log("Imagem gerada:", imagem.length, "bytes");
  } catch (error) {
    console.error("Erro:", error.message);
  }
}

exemploBasico();

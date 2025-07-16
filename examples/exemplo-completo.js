import { AcqClient } from "acq-sdk";
import { writeFileSync } from "fs";

async function exemploCompleto() {
  // Inicializar o cliente
  const client = new AcqClient({
    apiKey: "sua-api-key-aqui",
    // baseUrl: 'https://api.acq.lat', // opcional
    // timeout: 30000 // opcional
  });

  try {
    console.log("🚀 Iniciando exemplos do ACQ SDK...\n");

    // === GERENCIAMENTO DE EMAILS ===
    console.log("📧 Testando gerenciamento de emails...");

    // Listar emails existentes
    const emails = await client.mails.list();
    console.log("Emails existentes:", emails);

    // Criar um novo email
    const novoEmail = await client.mails.create();
    console.log("Novo email criado:", novoEmail.mail);

    // Criar email com domínio específico
    const emailCustom = await client.mails.create({
      domain: "acq.lat",
    });
    console.log("Email com domínio customizado:", emailCustom.mail);

    // Verificar mensagens do email
    const mensagens = await client.mails.getMessages({
      mail: novoEmail.mail,
    });
    console.log(`Mensagens para ${mensagens.email}:`, mensagens.messages);
    console.log(`Total de mensagens: ${mensagens.total}`);

    // === RENDERIZAÇÃO DE HTML ===
    console.log("\n🎨 Testando renderização de HTML...");

    const htmlExemplo = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 40px;
              margin: 0;
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .card {
              background: rgba(255, 255, 255, 0.1);
              border-radius: 15px;
              padding: 30px;
              backdrop-filter: blur(10px);
              box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
              text-align: center;
              max-width: 400px;
            }
            h1 {
              font-size: 2.5em;
              margin-bottom: 20px;
              text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
            }
            p {
              font-size: 1.2em;
              line-height: 1.6;
              margin-bottom: 20px;
            }
            .badge {
              background: #ff6b6b;
              color: white;
              padding: 8px 16px;
              border-radius: 20px;
              font-weight: bold;
              display: inline-block;
            }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>🚀 ACQ SDK</h1>
            <p>SDK oficial para renderização de HTML e gerenciamento de emails temporários</p>
            <div class="badge">Powered by ACQ</div>
          </div>
        </body>
      </html>
    `;

    // Renderizar HTML em imagem
    const imagemBuffer = await client.render.htmlToImage({
      html: htmlExemplo,
    });

    // Salvar a imagem
    const nomeArquivo = `exemplo-${Date.now()}.png`;
    writeFileSync(nomeArquivo, imagemBuffer);
    console.log(`✅ Imagem salva como: ${nomeArquivo}`);
    console.log(`📊 Tamanho da imagem: ${imagemBuffer.length} bytes`);

    // === LIMPEZA (OPCIONAL) ===
    console.log("\n🧹 Limpando recursos criados...");

    // Deletar mensagens do email (se houver)
    try {
      const resultadoDelecao = await client.mails.deleteMessages(
        novoEmail.mail
      );
      console.log("Mensagens deletadas:", resultadoDelecao);
    } catch (error) {
      console.log("Nenhuma mensagem para deletar ou email não encontrado");
    }

    // Deletar o email criado
    try {
      const emailDeletado = await client.mails.delete(novoEmail.mail);
      console.log("Email deletado:", emailDeletado);
    } catch (error) {
      console.log("Erro ao deletar email:", error);
    }

    console.log("\n✅ Exemplos concluídos com sucesso!");
  } catch (error) {
    console.error("❌ Erro durante a execução:", error);

    if (error.name === "AcqApiError") {
      console.error("Código do erro:", error.code);
      console.error("Status HTTP:", error.status);
      console.error("Detalhes:", error.details);
    }
  }
}

// Executar o exemplo
exemploCompleto();

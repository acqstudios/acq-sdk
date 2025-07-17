# ACQ SDK

[![npm version](https://img.shields.io/npm/v/acq-sdk.svg)](https://www.npmjs.com/package/acq-sdk)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

SDK oficial em Node.js para a **API da ACQ**. Oferece funcionalidades para renderização de HTML em imagens, gerenciamento de emails temporários e monitoramento em tempo real via WebSocket.

## 📦 Instalação

```bash
npm install acq-sdk
```

ou

```bash
yarn add acq-sdk
```

ou

```bash
pnpm add acq-sdk
```

## 🔑 Configuração

### Cliente HTTP

```typescript
import { AcqClient } from "acq-sdk";

const client = new AcqClient({
  apiKey: "sua-api-key-aqui",
  // Opcionais:
  baseUrl: "https://api.acq.lat", // URL base customizada
  timeout: 30000, // Timeout em milissegundos
});
```

### Cliente WebSocket

```typescript
import { AcqSocketClient, SocketEvents } from "acq-sdk";

const socketClient = new AcqSocketClient({
  apiKey: "sua-api-key-aqui",
  email: "seu-email@acq.lat", // Email para monitorar
  // Opcionais:
  baseUrl: "wss://ws.acq.lat", // URL base customizada
  timeout: 30000, // Timeout em milissegundos
});
```

## 📧 Gerenciamento de Emails

### Listar emails

```typescript
const emails = await client.mails.list();
console.log("Seus emails:", emails);
// Retorna: [{ email: 'test@acq.lat', expiraEm: '2025-07-16T23:37:29.111Z' }]
```

### Criar novo email

```typescript
// Email com domínio padrão
const novoEmail = await client.mails.create();
console.log("Novo email:", novoEmail.mail);

// Email com domínio específico
const emailCustom = await client.mails.create({
  domain: "acq.lat",
});
console.log("Email customizado:", emailCustom.mail);
```

### Verificar mensagens

```typescript
const mensagens = await client.mails.getMessages({
  mail: "seu-email@acq.lat",
});

console.log(`Email: ${mensagens.email}`);
console.log(`Total de mensagens: ${mensagens.total}`);
console.log("Mensagens:", mensagens.messages);
```

### Deletar email

```typescript
const resultado = await client.mails.delete("email@acq.lat");
console.log("Email deletado:", resultado.deleted_email);
```

### Deletar mensagens

```typescript
const resultado = await client.mails.deleteMessages("email@acq.lat");
console.log(`${resultado.deleted_count} mensagens deletadas`);
```

## 🔌 WebSocket - Monitoramento em Tempo Real

### Conectar e ouvir eventos

```typescript
import { AcqSocketClient, SocketEvents } from "acq-sdk";

const socketClient = new AcqSocketClient({
  apiKey: "sua-api-key-aqui",
  email: "seu-email@acq.lat",
});

// Conectar ao WebSocket
await socketClient.connect();
console.log("Conectado ao WebSocket!");

// Ouvir novos emails
socketClient.on(SocketEvents.NEW, data => {
  console.log("Nova mensagem recebida:", data);
  // data contém informações da nova mensagem
});

// Ouvir eventos de conexão
socketClient.on(SocketEvents.CONNECT, () => {
  console.log("WebSocket conectado!");
});

// Ouvir eventos de desconexão
socketClient.on(SocketEvents.DISCONNECT, () => {
  console.log("WebSocket desconectado!");
});
```

### Gerenciar conexão

```typescript
// Conectar
await socketClient.connect();

// Desconectar quando necessário
await socketClient.disconnect();
```

### Exemplo prático - Monitor de emails

```typescript
import { AcqClient, AcqSocketClient, SocketEvents } from "acq-sdk";

async function monitorarEmail() {
  const client = new AcqClient({
    apiKey: "sua-api-key-aqui",
  });

  // Criar um novo email
  const novoEmail = await client.mails.create();
  console.log("Email criado:", novoEmail.mail);

  // Conectar ao WebSocket para monitorar
  const socketClient = new AcqSocketClient({
    apiKey: "sua-api-key-aqui",
    email: novoEmail.mail,
  });

  await socketClient.connect();

  // Ouvir novos emails
  socketClient.on(SocketEvents.NEW, mensagem => {
    console.log("Nova mensagem:", {
      from: mensagem.from,
      subject: mensagem.subject,
      body: mensagem.body,
    });
  });

  console.log("Monitorando emails em tempo real...");

  // Manter ativo por 5 minutos
  setTimeout(
    async () => {
      await socketClient.disconnect();
      console.log("Monitoramento finalizado");
    },
    5 * 60 * 1000
  );
}

monitorarEmail().catch(console.error);
```

## 🎨 Renderização de HTML

### Renderizar HTML em imagem

```typescript
import { writeFileSync } from "fs";

const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 40px;
          text-align: center;
        }
        .card {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          padding: 30px;
          backdrop-filter: blur(10px);
        }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>🚀 Minha Imagem</h1>
        <p>Gerada com ACQ SDK!</p>
      </div>
    </body>
  </html>
`;

const imagemBuffer = await client.render.htmlToImage({ html });

// Salvar como arquivo
writeFileSync("minha-imagem.png", imagemBuffer);

// Ou usar em uma aplicação web
// res.set('Content-Type', 'image/png');
// res.send(imagemBuffer);
```

## 🛡️ Tratamento de Erros

O SDK fornece tipos específicos de erro para diferentes situações:

```typescript
import { AcqApiError, AcqValidationError, AcqConfigError } from "acq-sdk";

try {
  await client.mails.create();
} catch (error) {
  if (error instanceof AcqApiError) {
    console.error("Erro da API:", error.message);
    console.error("Código:", error.code);
    console.error("Status HTTP:", error.status);
  } else if (error instanceof AcqValidationError) {
    console.error("Erro de validação:", error.message);
  } else if (error instanceof AcqConfigError) {
    console.error("Erro de configuração:", error.message);
  }
}
```

### Erros específicos do WebSocket

```typescript
import { AcqSocketClient, SocketEvents } from "acq-sdk";

const socketClient = new AcqSocketClient({
  apiKey: "sua-api-key-aqui",
  email: "seu-email@acq.lat",
});

try {
  await socketClient.connect();
} catch (error) {
  console.error("Erro ao conectar WebSocket:", error);
}

// Ouvir erros de conexão
socketClient.on("connect_error", error => {
  console.error("Erro de conexão:", error);
});
```

## 📚 Tipos e Interfaces

### Tipos principais

```typescript
import type {
  AcqClientConfig,
  AcqSocketConfig,
  EmailInfo,
  EmailMessage,
  MailboxResponse,
  CreateEmailResponse,
  DeleteEmailResponse,
  DeleteMessagesResponse,
  RenderOptions,
  CreateEmailOptions,
  GetMessagesOptions,
  AcqSocket,
  SocketEvents,
} from "acq-sdk";

// Configuração do cliente HTTP
const config: AcqClientConfig = {
  apiKey: "sua-chave",
  baseUrl: "https://api.acq.lat", // opcional
  timeout: 30000, // opcional
};

// Configuração do cliente WebSocket
const socketConfig: AcqSocketConfig = {
  apiKey: "sua-chave",
  email: "email@acq.lat",
  baseUrl: "wss://ws.acq.lat", // opcional
  timeout: 30000, // opcional
};

// Eventos disponíveis
const eventos = {
  CONNECT: SocketEvents.CONNECT,
  DISCONNECT: SocketEvents.DISCONNECT,
  NEW: SocketEvents.NEW,
};
```

## 📄 Licença

MIT © [ACQ Team](https://acq.lat)

## 🆘 Suporte

- 📧 Email: [support@acq.lat](mailto:support@acq.lat)
- 🐛 Issues: [GitHub Issues](https://github.com/acq-lat/acq-sdk/issues)
- 📖 Documentação: [docs.acq.lat](https://docs.acq.lat)

---

Feito com ❤️ pela equipe [ACQ](https://acq.lat)

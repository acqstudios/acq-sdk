# ACQ SDK

[![npm version](https://img.shields.io/npm/v/acq-sdk.svg)](https://www.npmjs.com/package/acq-sdk)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

SDK oficial em Node.js para a **API da ACQ**. Oferece funcionalidades para renderização de HTML em imagens e gerenciamento de emails temporários.

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

```typescript
import { AcqClient } from "acq-sdk";

const client = new AcqClient({
  apiKey: "sua-api-key-aqui",
  // Opcionais:
  baseUrl: "https://api.acq.lat", // URL base customizada
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

## 📄 Licença

MIT © [ACQ Team](https://acq.lat)

## 🆘 Suporte

- 📧 Email: [support@acq.lat](mailto:support@acq.lat)
- 🐛 Issues: [GitHub Issues](https://github.com/acq-lat/acq-sdk/issues)
- 📖 Documentação: [docs.acq.lat](https://docs.acq.lat)

---

Feito com ❤️ pela equipe [ACQ](https://acq.lat)

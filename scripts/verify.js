#!/usr/bin/env node

// Script de verificação do SDK antes da publicação
console.log("🔍 Verificando SDK ACQ...\n");

import { AcqClient, AcqSocketClient } from "../dist/index.js";
import fs from "fs";

// Verificar se os arquivos essenciais existem
const requiredFiles = [
  "dist/index.js",
  "dist/index.cjs",
  "dist/index.d.ts",
  "README.md",
  "LICENSE",
  "package.json",
];

console.log("📁 Verificando arquivos essenciais...");
for (const file of requiredFiles) {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - AUSENTE!`);
    process.exit(1);
  }
}

// Verificar se o SDK pode ser importado
console.log("\n📦 Verificando importação do SDK...");
try {
  const testClient = new AcqClient({ apiKey: "test-key" });
  console.log("✅ SDK pode ser importado e instanciado");
  console.log(
    "✅ Serviços disponíveis:",
    Object.keys(testClient).filter(k => typeof testClient[k] === "object")
  );

  // Verificar socket client
  const testSocketClient = new AcqSocketClient({
    apiKey: "test-key",
    email: "test@example.com"
  });
  console.log("✅ Socket client pode ser importado e instanciado");
} catch (error) {
  console.log("❌ Erro ao importar SDK:", error.message);
  process.exit(1);
}

// Verificar package.json
console.log("\n📋 Verificando package.json...");
const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));

const requiredFields = [
  "name",
  "version",
  "description",
  "main",
  "types",
  "author",
  "license",
];
for (const field of requiredFields) {
  if (pkg[field]) {
    console.log(`✅ ${field}: ${pkg[field]}`);
  } else {
    console.log(`❌ ${field} - AUSENTE!`);
  }
}

console.log("\n🎉 Verificação concluída!");
process.exit(0);

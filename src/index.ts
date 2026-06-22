import { askClaude } from "./llm/anthropic-client.js";
import { CODE_REVIEWER_PROMPT } from "./llm/prompts.js";

const CODIGO_CON_PROBLEMAS = `
async function getUser(id) {
  const query = "SELECT * FROM users WHERE id = " + id;
  const result = await db.query(query);
  return result[0];
}

function calcularDescuento(precio, tipo) {
  if (tipo == "vip") {
    return precio * 0.8;
  } else if (tipo == "regular") {
    return precio * 0.9;
  } else {
    return precio;
  }
}
`;

async function main(): Promise<void> {
  console.log("╔════════════════════════════════════════╗");
  console.log("║        DevAssistant - Curso IA         ║");
  console.log("║            Primera llamada             ║");
  console.log("╚════════════════════════════════════════╝");
  console.log("");
  console.log(" Demo 1: Enviando código SIN system prompt");
  console.log("");
  const question = `Revisa este código:\n\`\`javascript\n ${CODIGO_CON_PROBLEMAS}\n\`\``;
  // console.log(`❓ Pregunta: ${question}`);
  const answer = await askClaude(question)
  console.log("-".repeat(50));
  console.log(` Answer recibida: ${answer}`);
  console.log("-".repeat(50));
   console.log("");

  console.log(" Demo 2: Enviando código CON system prompt");
  console.log("");
  // console.log(`❓ Pregunta: ${question}`);
  const reviewerPrompAnswer = await askClaude(question, CODE_REVIEWER_PROMPT)
  console.log("-".repeat(50));
  console.log(` Answer recibida: ${reviewerPrompAnswer}`);
  console.log("-".repeat(50));
  console.log("");
}

main().catch((error) => {
  console.error("Error:", error.message);
});
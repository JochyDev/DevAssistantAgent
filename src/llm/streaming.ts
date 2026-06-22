import { config } from "../config.js";
import { client } from "./anthropic-client.js";

export async function streamClaude(prompt: string, systemPrompt?: string): Promise<string> {
    let fullResponse = "";
    const responseStream = await client.messages.stream({
        model: config.anthropicModel,
        max_tokens: 1024, 
        ...(systemPrompt && { system: systemPrompt }),
        messages: [
            {
                role: 'user',
                content: prompt
            }
        ]
    })
    responseStream.on("text", (chunck) => {
        process.stdout.write(chunck);
        fullResponse += chunck;
    });
    await responseStream.finalMessage();
    process.stdout.write("\n");
    return fullResponse;
}
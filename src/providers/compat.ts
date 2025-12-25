import OpenAI from 'openai';
import type { Message } from './openai';

const apiKey = process.env.COMPAT_API_KEY;
const baseURL = process.env.COMPAT_BASE_URL || 'https://api.x.ai/v1';
const defaultModel = process.env.COMPAT_MODEL || 'grok-beta';

const client = new OpenAI({ apiKey, baseURL });

export async function chatCompat(messages: Message[], model = defaultModel): Promise<string> {
  if (!apiKey) throw new Error('COMPAT_API_KEY not set');
  const res = await client.chat.completions.create({ model, messages, temperature: 0.7 });
  return res.choices?.[0]?.message?.content ?? '';
}

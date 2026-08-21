interface Env {
  AI: {
    run(model: string, input: unknown): Promise<unknown>;
  };
  ASSETS: {
    fetch(request: Request): Promise<Response>;
  };
}

type ChatMessage = { role: 'user' | 'assistant'; content: string };

const systemPrompt = `You are the portfolio assistant for Marcus Wong, a Hong Kong-based Multimedia Designer and Creative Technologist. Marcus works across UI/UX, responsive web design, branding, motion, social content, print, packaging, and AI-powered creative workflows. He has 3+ years of experience and has worked with AsiaPac Net Media, GL.iNet Technology, and As One Interactive. Keep replies concise, warm, professional, and under 90 words. Help visitors understand Marcus's work and invite qualified project enquiries. For pricing, availability, detailed scope, or hiring, direct visitors to marcus2000wong@yahoo.com. Never invent clients, awards, dates, prices, or availability.`;

const json = (data: unknown, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
  },
});

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname !== '/api/chat') return env.ASSETS.fetch(request);
    if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

    try {
      const body = await request.json() as { messages?: ChatMessage[] };
      const messages = (body.messages ?? [])
        .filter((message): message is ChatMessage =>
          (message.role === 'user' || message.role === 'assistant') &&
          typeof message.content === 'string' &&
          message.content.trim().length > 0,
        )
        .slice(-8)
        .map((message) => ({ ...message, content: message.content.trim().slice(0, 800) }));

      if (!messages.length) return json({ error: 'A message is required' }, 400);

      const result = await env.AI.run('@cf/zai-org/glm-4.7-flash', {
        messages: [{ role: 'system', content: systemPrompt }, ...messages],
        max_completion_tokens: 180,
        temperature: 0.45,
      }) as {
        response?: string;
        choices?: Array<{
          message?: {
            content?: string;
          };
        }>;
      };

      const reply =
        result.response?.trim() ||
        result.choices?.[0]?.message?.content?.trim();
      if (!reply) throw new Error('Empty model response');
      return json({ reply });
    } catch (error) {
      console.error('Portfolio chat failed', error);
      return json({ error: 'The assistant is temporarily unavailable.' }, 503);
    }
  },
};

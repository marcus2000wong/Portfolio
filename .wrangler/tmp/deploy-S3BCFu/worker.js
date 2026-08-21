var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// worker.ts
var systemPrompt = `You are the portfolio assistant for Marcus Wong, a Hong Kong-based Multimedia Designer and Creative Technologist. Marcus works across UI/UX, responsive web design, branding, motion, social content, print, packaging, and AI-powered creative workflows. He has 3+ years of experience and has worked with AsiaPac Net Media, GL.iNet Technology, and As One Interactive. Keep replies concise, warm, professional, and under 90 words. Help visitors understand Marcus's work and invite qualified project enquiries. For pricing, availability, detailed scope, or hiring, direct visitors to marcus2000wong@yahoo.com. Never invent clients, awards, dates, prices, or availability.`;
var json = /* @__PURE__ */ __name((data, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store"
  }
}), "json");
var worker_default = {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname !== "/api/chat") return env.ASSETS.fetch(request);
    if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
    try {
      const body = await request.json();
      const messages = (body.messages ?? []).filter(
        (message) => (message.role === "user" || message.role === "assistant") && typeof message.content === "string" && message.content.trim().length > 0
      ).slice(-8).map((message) => ({ ...message, content: message.content.trim().slice(0, 800) }));
      if (!messages.length) return json({ error: "A message is required" }, 400);
      const result = await env.AI.run("@cf/zai-org/glm-4.7-flash", {
        messages: [{ role: "system", content: systemPrompt }, ...messages],
        max_completion_tokens: 180,
        temperature: 0.45
      });
      const reply = result.response?.trim() || result.choices?.[0]?.message?.content?.trim();
      if (!reply) throw new Error("Empty model response");
      return json({ reply });
    } catch (error) {
      console.error("Portfolio chat failed", error);
      return json({ error: "The assistant is temporarily unavailable." }, 503);
    }
  }
};
export {
  worker_default as default
};
//# sourceMappingURL=worker.js.map

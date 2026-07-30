import { NextResponse } from "next/server";

export const runtime = "nodejs";

const BREVO_CONTACTS_URL = "https://api.brevo.com/v3/contacts";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LENGTH = 254;

type WaitlistRequest = {
  email?: unknown;
  website?: unknown;
};

function getBrevoConfig() {
  const apiKey = process.env.BREVO_API_KEY?.trim();
  const listIdValue = process.env.BREVO_LIST_ID?.trim();
  const listId = Number(listIdValue);

  if (!apiKey || !listIdValue || !Number.isInteger(listId) || listId <= 0) {
    return null;
  }

  return { apiKey, listId };
}

export async function POST(request: Request) {
  let body: WaitlistRequest;

  try {
    body = (await request.json()) as WaitlistRequest;
  } catch {
    return NextResponse.json(
      { message: "Não foi possível interpretar os dados enviados." },
      { status: 400 },
    );
  }

  // Honeypot: bots costumam preencher campos invisíveis.
  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!email || email.length > MAX_EMAIL_LENGTH || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json(
      { message: "Digite um e-mail válido." },
      { status: 400 },
    );
  }

  const config = getBrevoConfig();

  if (!config) {
    console.error("Brevo não configurada: verifique BREVO_API_KEY e BREVO_LIST_ID.");
    return NextResponse.json(
      { message: "A lista de espera ainda não está configurada." },
      { status: 500 },
    );
  }

  try {
    const brevoResponse = await fetch(BREVO_CONTACTS_URL, {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": config.apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        listIds: [config.listId],
        updateEnabled: true,
      }),
      cache: "no-store",
    });

    if (!brevoResponse.ok) {
      const details = await brevoResponse.text();
      console.error("Erro da Brevo ao cadastrar contato:", brevoResponse.status, details);

      return NextResponse.json(
        { message: "Não foi possível concluir sua inscrição agora. Tente novamente." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Falha de comunicação com a Brevo:", error);

    return NextResponse.json(
      { message: "Não foi possível concluir sua inscrição agora. Tente novamente." },
      { status: 502 },
    );
  }
}

import { fetchPlacesAudit } from "@/lib/audit";

export async function POST(request: Request) {
  let query = "";

  try {
    const body = (await request.json()) as { query?: unknown };
    query = typeof body.query === "string" ? body.query.trim() : "";
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (query.length < 2) {
    return Response.json(
      { error: "Enter a business name or Google Maps link." },
      { status: 400 },
    );
  }

  if (query.length > 200) {
    query = query.slice(0, 200);
  }

  const result = await fetchPlacesAudit(query);

  return Response.json(result);
}

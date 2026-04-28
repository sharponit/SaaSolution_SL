import { registerPdf } from '@/lib/pdf';
export async function POST(req: Request) {
  const { company, rows } = await req.json();
  const pdf = await registerPdf('Incidents Register', company, rows);
  return new Response(new Uint8Array(pdf), { headers: { 'content-type': 'application/pdf', 'content-disposition': 'attachment; filename=incidents.pdf' } });
}

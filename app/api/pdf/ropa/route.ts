import { registerPdf } from '@/lib/pdf';
export async function POST(req: Request) {
  const { company, rows } = await req.json();
  const pdf = await registerPdf('Ropa Register', company, rows);
  return new Response(new Uint8Array(pdf), { headers: { 'content-type': 'application/pdf', 'content-disposition': 'attachment; filename=ropa.pdf' } });
}

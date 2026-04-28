import PDFDocument from 'pdfkit';
export function registerPdf(title: string, company: string, rows: Record<string, string>[]) {
  const doc = new PDFDocument({ margin: 40 });
  const chunks: Buffer[] = [];
  doc.on('data', (c) => chunks.push(c));
  doc.fontSize(16).text(title).moveDown().fontSize(12).text(`Company: ${company}`).text(`Exported: ${new Date().toISOString().slice(0,10)}`).moveDown();
  rows.forEach((row, i) => doc.text(`${i + 1}. ${Object.entries(row).map(([k, v]) => `${k}: ${v}`).join(' | ')}`).moveDown(0.5));
  doc.end();
  return new Promise<Buffer>((resolve) => doc.on('end', () => resolve(Buffer.concat(chunks))));
}

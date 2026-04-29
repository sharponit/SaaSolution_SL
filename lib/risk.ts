export type RiskInput = { employee_count: number; third_country_transfer: boolean; high_risk_vendors: number; data_categories: string[]; missing_retention: boolean };
export function computeRisk(input: RiskInput) {
  let score = 0; const reasons: string[] = [];
  if (input.employee_count > 20) { score += 2; reasons.push('More than 20 employees'); }
  if (input.third_country_transfer) { score += 2; reasons.push('Third-country transfer in ROPA'); }
  if (input.high_risk_vendors > 0) { score += input.high_risk_vendors; reasons.push(`${input.high_risk_vendors} high-risk vendor(s)`); }
  if (input.data_categories.some((c) => /(health|biometric|children)/i.test(c))) { score += 3; reasons.push('Sensitive categories detected'); }
  if (input.missing_retention) { score += 2; reasons.push('Missing retention period on one or more activities'); }
  return { score, level: score >= 8 ? 'High' : score >= 4 ? 'Medium' : 'Low', reasons };
}

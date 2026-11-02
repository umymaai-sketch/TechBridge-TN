export function calculateFees(budgetCents: number) {
  const publicationFeeCents = Math.round(budgetCents * 0.10);
  const completionFeeCents = Math.round(budgetCents * 0.05);
  return { publicationFeeCents, completionFeeCents, totalFeeCents: publicationFeeCents + completionFeeCents };
}
export function money(cents: number) {
  return new Intl.NumberFormat("en-TN", { style: "currency", currency: "TND", maximumFractionDigits: 3 }).format(cents / 1000);
}

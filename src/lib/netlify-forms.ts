// Submits a form to Netlify Forms. Netlify registers forms at deploy time from the
// static detection file public/__forms.html; field names there must match.
// Only works on a Netlify deploy (local dev has no form handler).
export async function submitNetlifyForm(formName: string, fields: Record<string, string>) {
  const body = new URLSearchParams({ "form-name": formName, ...fields });
  const res = await fetch("/__forms.html", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });
  if (!res.ok) throw new Error(`Form submission failed (${res.status})`);
}

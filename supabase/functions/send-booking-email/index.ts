import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const RECIPIENT_EMAILS = [
  "doctormago2018@gmail.com",
  "georgefartenadze@gmail.com",
];

interface BookingPayload {
  preferred_date: string;
  full_name: string;
  email: string;
  phone: string;
  age: number | string;
  relationship: string;
  medical_history: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const booking: BookingPayload = await req.json();

    const relationshipMap: Record<string, string> = {
      patient: "Patient / პაციენტი / Пациент",
      family: "Family Member / ოჯახის წევრი / Член семьи",
      friend: "Friend / მეგობარი / Друг",
    };

    const relationshipLabel = relationshipMap[booking.relationship] || booking.relationship || "—";

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: Arial, sans-serif; background: #f4f7fb; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 32px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.1); }
    .header { background: #00265E; color: #ffffff; padding: 28px 32px; }
    .header h1 { margin: 0; font-size: 22px; }
    .header p { margin: 6px 0 0; font-size: 14px; opacity: 0.85; }
    .body { padding: 28px 32px; }
    .field { margin-bottom: 18px; }
    .field label { font-size: 12px; font-weight: bold; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 4px; }
    .field value { font-size: 16px; color: #111827; display: block; }
    .divider { border: none; border-top: 1px solid #e5e7eb; margin: 24px 0; }
    .footer { background: #f9fafb; padding: 16px 32px; font-size: 12px; color: #9ca3af; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Appointment Booking</h1>
      <p>MaGo Eye Clinic — New form submission received</p>
    </div>
    <div class="body">
      <div class="field">
        <label>Full Name</label>
        <value>${booking.full_name}</value>
      </div>
      <div class="field">
        <label>Phone</label>
        <value>${booking.phone}</value>
      </div>
      <div class="field">
        <label>Email</label>
        <value>${booking.email || "—"}</value>
      </div>
      <div class="field">
        <label>Preferred Date</label>
        <value>${booking.preferred_date || "—"}</value>
      </div>
      <div class="field">
        <label>Age</label>
        <value>${booking.age || "—"}</value>
      </div>
      <div class="field">
        <label>Relationship</label>
        <value>${relationshipLabel}</value>
      </div>
      <hr class="divider" />
      <div class="field">
        <label>Medical History / Notes</label>
        <value>${booking.medical_history || "—"}</value>
      </div>
    </div>
    <div class="footer">
      Submitted via mago.ge website booking form
    </div>
  </div>
</body>
</html>
    `;

    const sendPromises = RECIPIENT_EMAILS.map((to) =>
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: "MaGo Clinic Bookings <bookings@mago.ge>",
          to,
          subject: `New Booking: ${booking.full_name} — ${booking.preferred_date || "No date"}`,
          html: emailHtml,
        }),
      })
    );

    const results = await Promise.all(sendPromises);
    const allOk = results.every((r) => r.ok);

    if (!allOk) {
      const errors = await Promise.all(
        results.map(async (r) => (r.ok ? null : await r.text()))
      );
      return new Response(
        JSON.stringify({ error: "Some emails failed to send", details: errors }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { name, email, date, time, guests } = await request.json();

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #1a1a1a;">Reservation Confirmed! 🎉</h1>
      <p>Hi <strong>${name}</strong>,</p>
      <p>Your reservation has been confirmed. Here are the details:</p>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 8px; color: #666;">Date</td>
          <td style="padding: 8px; font-weight: bold;">${date}</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 8px; color: #666;">Time</td>
          <td style="padding: 8px; font-weight: bold;">${time}</td>
        </tr>
        <tr>
          <td style="padding: 8px; color: #666;">Guests</td>
          <td style="padding: 8px; font-weight: bold;">${guests}</td>
        </tr>
      </table>
      <p style="margin-top: 24px; color: #666;">
        We look forward to seeing you!
      </p>
    </div>
  `;

  const { error } = await resend.emails.send({
    from: "Reservations <onboarding@resend.dev>",
    to: email,
    subject: "Your reservation is confirmed!",
    html,
  });

  if (error) {
    return Response.json({ error }, { status: 400 });
  }

  return Response.json({ success: true });
}

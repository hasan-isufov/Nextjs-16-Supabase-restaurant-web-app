interface BookingConfirmationProps {
  name: string;
  date: string;
  time: string;
  guests: number;
}

export function BookingConfirmation({
  name,
  date,
  time,
  guests,
}: BookingConfirmationProps) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <h1 style={{ color: "#1a1a1a" }}>Reservation Confirmed! 🎉</h1>
      <p>
        Hi <strong>{name}</strong>,
      </p>
      <p>Your reservation has been confirmed. Here are the details:</p>
      <table
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "16px" }}
      >
        <tbody>
          <tr style={{ borderBottom: "1px solid #eee" }}>
            <td style={{ padding: "8px", color: "#666" }}>Date</td>
            <td style={{ padding: "8px", fontWeight: "bold" }}>{date}</td>
          </tr>
          <tr style={{ borderBottom: "1px solid #eee" }}>
            <td style={{ padding: "8px", color: "#666" }}>Time</td>
            <td style={{ padding: "8px", fontWeight: "bold" }}>{time}</td>
          </tr>
          <tr>
            <td style={{ padding: "8px", color: "#666" }}>Guests</td>
            <td style={{ padding: "8px", fontWeight: "bold" }}>{guests}</td>
          </tr>
        </tbody>
      </table>
      <p style={{ marginTop: "24px", color: "#666" }}>
        We look forward to seeing you! If you need to make any changes, please
        contact us.
      </p>
    </div>
  );
}

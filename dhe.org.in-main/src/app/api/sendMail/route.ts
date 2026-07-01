import { NextRequest, NextResponse } from "next/server";
import qr from "qrcode";
import { isAdminAuthorized } from "@/lib/auth/admin-gate";
import { getSmtpConfig, createSmtpTransporter } from "@/lib/env/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LENGTH = 254;
const MAX_QR_PAYLOAD_BYTES = 8_192;

export async function POST(req: NextRequest) {
  if (!isAdminAuthorized(req.headers.get("authorization"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const smtp = getSmtpConfig();

  if (!smtp) {
    return NextResponse.json(
      {
        error:
          "Email service is not configured. Set SMTP_USER and SMTP_PASS in .env.local.",
      },
      { status: 503 }
    );
  }

  try {
    const reqBody = await req.json();
    const { email, qrCodeData } = reqBody as {
      email?: string;
      qrCodeData?: unknown;
    };

    if (!email || email.length > MAX_EMAIL_LENGTH || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "A valid recipient email is required." },
        { status: 400 }
      );
    }

    if (qrCodeData === undefined || qrCodeData === null) {
      return NextResponse.json(
        { error: "QR code data is required." },
        { status: 400 }
      );
    }

    const qrPayload = JSON.stringify(qrCodeData);
    if (Buffer.byteLength(qrPayload, "utf8") > MAX_QR_PAYLOAD_BYTES) {
      return NextResponse.json(
        { error: "QR code data exceeds the allowed size." },
        { status: 400 }
      );
    }

    const qrDataURL = await qr.toDataURL(qrPayload);

    const transporter = createSmtpTransporter(smtp);

    const mailOptions = {
      from: smtp.from,
      to: email,
      subject: "Invitation for the Workshop held on 10 May, 2024",
      html: `
      <p style="font-family: Arial, sans-serif; font-size: 18px; font-weight: bold; color: #a52a2a; ">Department of Holistic Education</p>
      <img src="https://i.pinimg.com/736x/58/1b/c2/581bc29d2d2454f96c1fce932af83462.jpg" alt="QR Code" style="display: block; height:60px; width: 60px; align-items: center; margin: 20px auto;">
      <p style="font-family: Arial, sans-serif; font-size: 13px; color: #5072a7;">The Department of Holistic Education cordially invites you to our workshop. Your participation is highly valued, and we look forward to your presence.</p>
      <p style="font-family: Arial, sans-serif; font-size: 13px; color: #5072a7;">As proof of registration, please find attached your electronic ticket. This ticket contains a unique QR code, which you will need to present at the time of entry to the workshop. Your cooperation in presenting the QR code will facilitate a smooth check-in process.</p>
      <p style="font-family: Arial, sans-serif; font-size: 13px; color: #5072a7;">Thank you for your attention, and we eagerly anticipate your attendance at the workshop.</p>
      <p style="font-family: Arial, sans-serif; font-size: 14px; color: #a52a2a;">Date: 10th May 2024</p>
      <p style="font-family: Arial, sans-serif; font-size: 14px; color: #a52a2a;">Time: 10AM to 5PM</p>
      <p style="font-family: Arial, sans-serif; font-size: 14px; color: #a52a2a;">Venue: CSIO Chandigarh</p>
      <p style="font-family: Arial, sans-serif; text-align: right; font-size: 14px; font-weight: bold; color:#a52a2a; ">Regards</p>
      <p style="font-family: Arial, sans-serif; text-align: right; font-size: 14px; font-weight: bold; color:#a52a2a; ">Dr. Thakur SKR</p>
      <p style="font-family: Arial, sans-serif; text-align: right; font-size: 14px; font-weight: bold; color:#a52a2a; ">(Director DHE)</p>
      `,
      attachments: [
        {
          filename: "ticket.png",
          content: qrDataURL.split(";base64,").pop(),
          encoding: "base64",
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}

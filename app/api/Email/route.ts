import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function sendMail(name: string,message:string,email:string):Promise<boolean> {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `#Contact vrindasrigaur.me`,
      to: "sksunnyking124@gmail.com", // will make email to email parameter
      subject: "Hey!! Billu You have a new Contact",
      html: `
      <div style="max-width:600px; padding:24px; background:#fff0f5; border-radius:8px; font-family:'Segoe UI', Tahoma, sans-serif; color:#333; line-height:1.6;">
  <h2 style="margin-top:0; color:#cc2b5e;">📬 New Contact Form Submission</h2>

  <p style="margin:0 0 12px 0;">You’ve received a new message from the contact form on <strong>vrindasrigaur.me</strong>.</p>

  <table style="width:100%; border-collapse:collapse; margin-bottom:16px;">
    <tr>
      <td style="font-weight:bold; padding:8px; background:#fde2f3; border-radius:4px 0 0 4px; width:120px;">Name:</td>
      <td style="padding:8px; background:#fff; border-radius:0 4px 4px 0;">${name}</td>
    </tr>
    <tr>
      <td style="font-weight:bold; padding:8px; background:#fde2f3; border-radius:4px 0 0 4px;">Email:</td>
      <td style="padding:8px; background:#fff; border-radius:0 4px 4px 0;">${email}</td>
    </tr>
    <tr>
      <td style="font-weight:bold; padding:8px; background:#fde2f3; border-radius:4px 0 0 4px;">Message:</td>
      <td style="padding:8px; background:#fff; border-radius:0 4px 4px 0;">${message}</td>
    </tr>
  </table>

  <p style="font-size:13px; color:#777; margin-top:24px;">
    This message was automatically sent from the contact form on your portfolio website.
  </p>
</div>
`,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (err) {
    console.error("Email error:", err);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Here you would typically handle the email sending logic
    // For example, using a service like SendGrid, Nodemailer, etc.
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);
sendMail(name, message, email);
    return NextResponse.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ success: false, message: "Failed to send email." }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    
    return NextResponse.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ success: false, message: "Failed to send email." }, { status: 500 });
  }
}
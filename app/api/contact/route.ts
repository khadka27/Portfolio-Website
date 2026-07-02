import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    let host = process.env.SMTP_HOST;
    let port = parseInt(process.env.SMTP_PORT || "587", 10);
    let secure = port === 465;
    let user = process.env.SMTP_USER;
    let pass = process.env.SMTP_PASS;
    let isEthereal = false;

    // Check if configuration is missing and handle fallback in non-production
    if (!host || !user || !pass) {
      if (process.env.NODE_ENV !== "production") {
        console.log("SMTP credentials missing. Creating an Ethereal test account for local testing...");
        try {
          const testAccount = await nodemailer.createTestAccount();
          host = testAccount.smtp.host;
          port = testAccount.smtp.port;
          secure = testAccount.smtp.secure;
          user = testAccount.user;
          pass = testAccount.pass;
          isEthereal = true;
          console.log(`Created Ethereal test account: ${user}`);
        } catch (err) {
          console.error("Error creating Ethereal test account:", err);
          return NextResponse.json(
            { error: "SMTP settings missing, and failed to generate a fallback Ethereal test account." },
            { status: 500 }
          );
        }
      } else {
        return NextResponse.json(
          { error: "SMTP settings not configured. Please define SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS." },
          { status: 500 }
        );
      }
    }

    // Configure transporter
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
    });

    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || "abishekkhadka90@gmail.com";

    // Since many SMTP servers reject emails with a 'from' domain that does not match the authenticated user,
    // we set the 'from' to the authenticated user and include the client's email in the 'replyTo' header.
    const mailOptions = {
      from: `"${name} via khadka27" <${user}>`,
      replyTo: email,
      to: receiverEmail,
      subject: `New Contact Form Message from ${name}`,
      text: `New contact form submission:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Message</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f4f5f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f5f7; padding: 40px 10px;">
            <tr>
              <td align="center">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05); border: 1px solid #e1e4e8;">
                  <!-- Top Decorative Bar -->
                  <tr>
                    <td style="background: linear-gradient(90deg, #f97316 0%, #f59e0b 100%); height: 6px;"></td>
                  </tr>
                  
                  <!-- Header -->
                  <tr>
                    <td style="padding: 32px 32px 24px 32px; border-bottom: 1px solid #f0f2f5;">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                          <td>
                            <span style="font-size: 12px; font-weight: 700; color: #f97316; text-transform: uppercase; letter-spacing: 0.1em; display: block; margin-bottom: 4px;">Inquiry Received</span>
                            <h1 style="font-size: 24px; font-weight: 800; color: #111827; margin: 0; letter-spacing: -0.02em;">New Contact Form Message</h1>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Main Content Area -->
                  <tr>
                    <td style="padding: 32px;">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <!-- Metadata Fields -->
                        <tr>
                          <td style="padding-bottom: 24px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                              <tr>
                                <td width="50%" style="vertical-align: top; padding-right: 10px;">
                                  <span style="font-size: 11px; font-weight: 700; color: #4b5563; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 6px;">Sender Name</span>
                                  <span style="font-size: 15px; font-weight: 600; color: #1f2937; display: block;">${name}</span>
                                </td>
                                <td width="50%" style="vertical-align: top;">
                                  <span style="font-size: 11px; font-weight: 700; color: #4b5563; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 6px;">Sender Email</span>
                                  <a href="mailto:${email}" style="font-size: 15px; font-weight: 600; color: #f97316; text-decoration: none; display: block;">${email}</a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>

                        <!-- Message Block -->
                        <tr>
                          <td style="padding-bottom: 32px;">
                            <span style="font-size: 11px; font-weight: 700; color: #4b5563; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 8px;">Message</span>
                            <div style="font-size: 15px; line-height: 1.6; color: #374151; background-color: #f8fafc; border-left: 4px solid #f97316; padding: 20px; border-radius: 0 12px 12px 0; white-space: pre-wrap; font-family: inherit;">${message}</div>
                          </td>
                        </tr>

                        <!-- Call to Action -->
                        <tr>
                          <td align="center" style="padding-bottom: 12px;">
                            <table border="0" cellpadding="0" cellspacing="0">
                              <tr>
                                <td align="center" style="border-radius: 12px; background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);">
                                  <a href="mailto:${email}?subject=Re: Portfolio Inquiry" target="_blank" style="border: 1px solid #ea580c; border-radius: 12px; color: #ffffff; display: inline-block; font-size: 14px; font-weight: 700; padding: 14px 32px; text-decoration: none; text-transform: uppercase; letter-spacing: 0.05em; box-shadow: 0 4px 12px rgba(249, 115, 22, 0.2);">
                                    Reply Directly
                                  </a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f8fafc; padding: 24px 32px; border-top: 1px solid #f0f2f5; text-align: center;">
                      <p style="font-size: 12px; line-height: 1.5; color: #6b7280; margin: 0;">
                        This message was sent securely from the contact form on your portfolio website.<br>
                        <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.abishekkhadka27.com.np'}" style="color: #9ca3af; text-decoration: underline; font-weight: 500;">${process.env.NEXT_PUBLIC_SITE_URL || 'www.abishekkhadka27.com.np'}</a>
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    };

    // Define the auto-reply message sent back to the user
    const autoReplyOptions = {
      from: `"Abishek Khadka" <${user}>`,
      to: email,
      subject: `Thanks for reaching out, ${name}! | Abishek Khadka`,
      text: `Hi ${name},\n\nThank you for reaching out! I have received your message and will get back to you as soon as possible (usually within 24 hours).\n\nHere is a copy of your message:\n"${message}"\n\nBest regards,\nAbishek Khadka\nhttps://www.abishekkhadka27.com.np`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank You for Contacting Me</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f4f5f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f5f7; padding: 40px 10px;">
            <tr>
              <td align="center">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05); border: 1px solid #e1e4e8;">
                  <!-- Top Decorative Bar -->
                  <tr>
                    <td style="background: linear-gradient(90deg, #f97316 0%, #f59e0b 100%); height: 6px;"></td>
                  </tr>
                  
                  <!-- Header -->
                  <tr>
                    <td style="padding: 32px; border-bottom: 1px solid #f0f2f5; text-align: center;">
                      <span style="font-size: 12px; font-weight: 700; color: #f97316; text-transform: uppercase; letter-spacing: 0.1em; display: block; margin-bottom: 8px;">Message Received</span>
                      <h1 style="font-size: 24px; font-weight: 800; color: #111827; margin: 0; letter-spacing: -0.02em;">Thank You, ${name}!</h1>
                    </td>
                  </tr>

                  <!-- Main Content Area -->
                  <tr>
                    <td style="padding: 32px;">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                          <td style="font-size: 15px; line-height: 1.6; color: #374151; padding-bottom: 24px;">
                            Hi ${name},<br><br>
                            Thank you for reaching out! I've successfully received your message from my portfolio's contact form.
                            I review my inquiries daily and will get back to you as soon as possible—typically within 24 hours.
                          </td>
                        </tr>
                        
                        <!-- Sender Message Copy Box -->
                        <tr>
                          <td style="padding-bottom: 32px;">
                            <span style="font-size: 11px; font-weight: 700; color: #4b5563; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 8px;">A copy of your message:</span>
                            <div style="font-size: 14px; line-height: 1.6; color: #4b5563; background-color: #f8fafc; border-left: 4px solid #d1d5db; padding: 16px; border-radius: 0 8px 8px 0; white-space: pre-wrap; font-style: italic; font-family: inherit;">"${message}"</div>
                          </td>
                        </tr>

                        <!-- Social Buttons / Quick Info -->
                        <tr>
                          <td style="border-top: 1px solid #f0f2f5; padding-top: 32px; padding-bottom: 12px;">
                            <h3 style="font-size: 13px; font-weight: 700; color: #111827; margin: 0 0 16px 0; text-transform: uppercase; letter-spacing: 0.05em; text-align: center;">Connect with me</h3>
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                              <tr>
                                <td align="center">
                                  <table border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                                    <tr>
                                      <td style="padding: 0 8px;">
                                        <a href="https://github.com/khadka27" target="_blank" style="background-color: #111827; border-radius: 8px; color: #ffffff; display: inline-block; font-size: 12px; font-weight: 600; padding: 10px 16px; text-decoration: none;">
                                          GitHub
                                        </a>
                                      </td>
                                      <td style="padding: 0 8px;">
                                        <a href="https://linkedin.com/in/khadka27" target="_blank" style="background-color: #0077b5; border-radius: 8px; color: #ffffff; display: inline-block; font-size: 12px; font-weight: 600; padding: 10px 16px; text-decoration: none;">
                                          LinkedIn
                                        </a>
                                      </td>
                                      <td style="padding: 0 8px;">
                                        <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.abishekkhadka27.com.np'}" target="_blank" style="background-color: #f97316; border-radius: 8px; color: #ffffff; display: inline-block; font-size: 12px; font-weight: 600; padding: 10px 16px; text-decoration: none;">
                                          Website
                                        </a>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f8fafc; padding: 24px 32px; border-top: 1px solid #f0f2f5; text-align: center;">
                      <p style="font-size: 12px; line-height: 1.5; color: #6b7280; margin: 0;">
                        Best regards,<br>
                        <strong>Abishek Khadka</strong><br>
                        Full-Stack Developer & Freelancer
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `
    };

    // Send both emails (notification to receiver, auto-reply to sender) in parallel
    const [info, autoReplyInfo] = await Promise.all([
      transporter.sendMail(mailOptions),
      transporter.sendMail(autoReplyOptions)
    ]);
    console.log("Notification message sent:", info.messageId);
    console.log("Auto-reply message sent:", autoReplyInfo.messageId);

    let previewUrl: string | null = null;
    let autoReplyPreviewUrl: string | null = null;
    if (isEthereal || (host && host.includes("ethereal.email"))) {
      const testUrl = nodemailer.getTestMessageUrl(info);
      const testAutoReplyUrl = nodemailer.getTestMessageUrl(autoReplyInfo);
      if (testUrl) {
        previewUrl = testUrl;
        console.log("Ethereal Mail Preview URL:", previewUrl);
      }
      if (testAutoReplyUrl) {
        autoReplyPreviewUrl = testAutoReplyUrl;
        console.log("Ethereal Auto-Reply Preview URL:", autoReplyPreviewUrl);
      }
    }

    return NextResponse.json({
      success: true,
      messageId: info.messageId,
      previewUrl,
      autoReplyPreviewUrl,
    });
  } catch (error: any) {
    console.error("Error in contact API:", error);
    
    let errorMessage = error?.message || "Failed to send email message.";
    if (error?.code === "EAUTH") {
      errorMessage = "Authentication failed (EAUTH). If you are using Gmail/Google Workspace, please make sure 2-Step Verification is enabled and that you are using an 'App Password' instead of your main Google account password.";
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

export const runtime = "nodejs";

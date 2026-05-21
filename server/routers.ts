import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { sendEmail, buildEmailHtml } from "./_core/notification";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const ADMIN_TOKEN = "nudge_admin_authenticated";

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      ctx.res.clearCookie("admin_auth", { path: "/" });
      return { success: true } as const;
    }),
  }),

  // Admin login — checks password against ADMIN_PASSWORD env var
  adminLogin: publicProcedure
    .input(z.object({
      email:    z.string().email(),
      password: z.string().min(1),
    }))
    .mutation(({ input, ctx }) => {
      const validEmail    = process.env.ADMIN_EMAIL    || "harrison@nudgedigital.com.au";
      const validPassword = process.env.ADMIN_PASSWORD || "nudge";

      if (input.email !== validEmail || input.password !== validPassword) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid credentials" });
      }

      // Set a simple httpOnly cookie so the server can recognise admin sessions
      ctx.res.cookie("admin_auth", ADMIN_TOKEN, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7 * 1000, // 7 days
        path: "/",
      });

      return { success: true };
    }),

  // Check if current request is authenticated as admin
  adminMe: publicProcedure.query(({ ctx }) => {
    const token = ctx.req.cookies?.admin_auth;
    return { isAdmin: token === ADMIN_TOKEN };
  }),

  contact: publicProcedure
    .input(z.object({
      name:    z.string().min(1, "Name is required"),
      email:   z.string().email("Valid email required"),
      company: z.string().optional(),
      service: z.string().optional(),
      price:   z.string().optional(),
      message: z.string().min(1, "Message is required"),
    }))
    .mutation(async ({ input }) => {
      await sendEmail({
        subject: `New enquiry from ${input.name}${input.service ? ` — ${input.service}` : ""}`,
        replyTo: input.email,
        html: buildEmailHtml({
          "Name":    input.name,
          "Email":   input.email,
          "Company": input.company || "—",
          "Service": input.service || "—",
          "Price":   input.price   || "—",
          "Message": input.message,
        }),
      });
      return { success: true, message: "Message sent successfully!" };
    }),

  chatbot: publicProcedure
    .input(z.object({
      message: z.string().min(1, "Message is required"),
    }))
    .mutation(async ({ input }) => {
      await sendEmail({
        subject: "New chatbot message — NUDGE",
        html: buildEmailHtml({
          "Message": input.message,
        }),
      });
      return { success: true, message: "Thank you for your message!" };
    }),
});

export type AppRouter = typeof appRouter;

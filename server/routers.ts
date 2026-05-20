import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { sendEmail, buildEmailHtml } from "./_core/notification";
import { z } from "zod";

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
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

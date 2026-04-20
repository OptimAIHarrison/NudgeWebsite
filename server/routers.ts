import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { notifyOwner } from "./_core/notification";
import { z } from "zod";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  contact: publicProcedure
    .input(z.object({
      name: z.string().min(1, "Name is required"),
      email: z.string().email("Valid email required"),
      company: z.string().optional(),
      service: z.string().optional(),
      message: z.string().min(1, "Message is required")
    }))
    .mutation(async ({ input }) => {
      try {
        await notifyOwner({
          title: `New Contact Form Submission from ${input.name}`,
          content: `Name: ${input.name}\nEmail: ${input.email}\nCompany: ${input.company || 'Not provided'}\nService: ${input.service || 'Not provided'}\n\nMessage:\n${input.message}`
        });
        return { success: true, message: 'Message sent successfully!' };
      } catch (error) {
        console.error('Contact form error:', error);
        return { success: false, message: 'Failed to send message' };
      }
    }),

  chatbot: publicProcedure
    .input(z.object({
      message: z.string().min(1, "Message is required")
    }))
    .mutation(async ({ input }) => {
      try {
        await notifyOwner({
          title: 'New Chatbot Message',
          content: `Message:\n${input.message}`
        });
        return { success: true, message: 'Thank you for your message!' };
      } catch (error) {
        console.error('Chatbot error:', error);
        return { success: false, message: 'Failed to send message' };
      }
    }),
});

export type AppRouter = typeof appRouter;

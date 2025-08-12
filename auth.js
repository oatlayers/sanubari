import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import User from "@/models/User";
import connectDB from "./lib/database";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user }) {
      try {
        await connectDB();

        const userExists = await User.findOne({ email: user.email });

        if (!userExists) {
          const username = user.name.slice(0, 20);
          await User.create({
            email: user.email,
            username,
            image: user.image,
          });
        }

        return true;
      } catch (err) {
        console.error("SignIn error:", err);
        return false;
      }
    },

    async session({ session }) {
      try {
        await connectDB();
        const dbUser = await User.findOne({ email: session.user.email });
        session.user.id = dbUser._id.toString();
        return session;
      } catch (err) {
        console.error("Session callback error:", err);
        return session;
      }
    },
  },
});

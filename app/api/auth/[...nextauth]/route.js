import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import ConnectDB from "@/aboutData/ConnectDB";
import CredentialsProvider from "next-auth/providers/credentials";
import Users from "@/aboutData/Users";
const Handler = NextAuth({
  providers: [
    // OAuth authentication providers...
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email:",
          type: "text",
          placeholder: "your-email",
        },
        password: {
          label: "password:",
          type: "text",
          placeholder: "your-email",
        },
      },
      async authorize(credentials) {
        try {
          const data = await fetch("http://localhost:3000/api/user", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email }),
          });
          let foundUser= await data.json();
          if (foundUser !== null) {
            if (foundUser.password === credentials.password) {
              console.log("Good Pass");
              delete foundUser.password;
              // foundUser["role"] = "Unverified Email";
              return foundUser;
            }
          }
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async signIn({ user, account, profile, email, credentials }) {
      await ConnectDB();
      let res = await fetch("http://localhost:3000/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.email }),
      });
      let currentUser = await res.json();
      if (!currentUser) {
        await fetch("http://localhost:3000/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: user.email }),
        });
      }
      return true;
    },

    async session({ session, user, token }) {
        if (session?.user) session.user.role = token.role;
      await ConnectDB();
      let res = await fetch("http://localhost:3000/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: session.user.email }),
      });
      let dbuser = await res.json();
      session.user.uData = dbuser;
      return session;
    },
  },
});

export { Handler as GET, Handler as POST };

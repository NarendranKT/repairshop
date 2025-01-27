import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'jsmith@gmail.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials?.email ?? '';
        const password = credentials?.password ?? '';

        const res = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const user = await res.json();
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      authorization: {
        params: {
          access_type: 'offline',
          prompt: 'consent',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    // async signIn({ profile, account, email, credentials }) {
    //   if (account?.provider === 'google') {
    //     return true;
    //   }
    //   return false;
    // },
    async jwt({ token, user, trigger, session }) {
      if (trigger === 'update') {
        return { ...token, ...session.user };
      }
      return { ...user, ...token };
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
  // pages: {
  //   signIn: '/auth/signin',
  //   // signOut: '/auth/signout',
  // },
});

export { handler as GET, handler as POST };

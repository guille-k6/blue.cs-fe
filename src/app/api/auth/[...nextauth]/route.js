import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "email", type: "email", placeholder: "test@test.com" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          const url = process.env.NEXT_PUBLIC_BACKEND_URL + 'v1/auth/authenticate';
          const body = { ...credentials };
          try{
              const response = await fetch(url, { method: 'POST',
                                                  headers: { 'Content-Type': 'application/json'},
                                                  body: JSON.stringify(body)
                                                  });
              const data = await response.json()
  
              if(response.ok){
                 return data;
              }else{
                throw new Error(data.message || "Fallo en la autenticación");
              }
        } catch(error){
          throw new Error(error.message || "Fallo en la autenticación");
        }},
      }),
    ],
    callbacks: {
      async jwt( {token, user} ) {
          return { ...token, ...user };
      },
      async session({ session, token }){
          session.user = token;
          return session;
      },
    },
  });

export { handler as GET, handler as POST };
// import 'tailwindcss/tailwind.css';
import { getServerSession } from 'next-auth';
import { NextAuthProvider } from './Provider';
import Navbar from './components/Navbar';

import './tailwind.css';

export const metadata = {
    title: 'Welcome to frontend',
    description: 'Generated by create-nx-workspace'
};

// async function getSession(cookie: string): Promise<Session> {
//     const response = await fetch(`http://localhost:3000/api/auth/session`, {
//         headers: {
//             cookie
//         }
//     });

//     const session = await response.json();

//     return Object.keys(session).length > 0 ? session : null;
// }

export default async function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession();

    return (
        <html lang="en">
            <body className="flex flex-grow flex-col h-screen">
                <NextAuthProvider session={session}>
                    <Navbar />
                    {children}
                </NextAuthProvider>
            </body>
        </html>
    );
}

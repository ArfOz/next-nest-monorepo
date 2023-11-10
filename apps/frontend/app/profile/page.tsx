'use client';
import { useSession } from 'next-auth/react';

export default function Profile() {
    const { data: session, status, update } = useSession();

    console.log('statussssssss', status, 'dataaaaaaaaa', session);

    // const session = await getSession();

    // useEffect(() => {
    //     const visibilityHandler = () =>
    //         document.visibilityState === 'visible' && update();
    //     window.addEventListener('visibilitychange', visibilityHandler, false);
    //     return () =>
    //         window.removeEventListener(
    //             'visibilitychange',
    //             visibilityHandler,
    //             false
    //         );
    // }, [update]);

    const user = session?.user;
    console.log(
        'profile sessionssssssssssssssssssssssssssssssss',
        session?.user
    );

    return (
        <>
            <section className="bg-ct-blue-600  min-h-screen pt-20">
                <div className="max-w-4xl mx-auto bg-ct-dark-100 rounded-md h-[20rem] flex justify-center items-center">
                    <div>
                        <p className="mb-3 text-5xl text-center font-semibold">
                            Profile Page
                        </p>
                        {!user ? (
                            <p>Loading...</p>
                        ) : (
                            <div className="flex items-center gap-8">
                                <div></div>
                                <div className="mt-8">
                                    {/* <p className="mb-3">
                                        Name: {user.username}
                                    </p> */}
                                    <p className="mb-3">Email: {user.email}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}

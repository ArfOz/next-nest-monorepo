import React, { useState } from 'react';
import { Rating, Stack } from '@mui/material';

// type Props = {};

const AddComment = () => {
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
    const [starValue, setStarValue] = useState(3);

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            console.log('titleeeee', title, comment, starValue);
            // const isValidForm = handleValidation();
            // if (isValidForm) {
            //     setButtonText('Sending');
            //     const data: MailData = {
            //         Email: email,
            //         Fullname: fullname,
            //         Subject: subject,
            //         Message: message
            //     };
            //     const res = await fetch('/api/sendemail', {
            //         body: JSON.stringify(data),
            //         headers: {
            //             'Content-Type': 'application/json'
            //         },
            //         method: 'POST'
            //     });
            //     const response = await res.json();
            //     if (response.Data.Error) {
            //         setShowSuccessMessage(false);
            //         setShowFailureMessage(true);
            //         setButtonText('Send');
            //         // Reset form fields
            //         setFullname('');
            //         setEmail('');
            //         setMessage('');
            //         setSubject('');
            //         return;
            //     }
            //     setShowSuccessMessage(true);
            //     setShowFailureMessage(false);
            //     setButtonText('Send');
            //     // Reset form fields
            //     setFullname('');
            //     setEmail('');
            //     setMessage('');
            //     setSubject('');
            // }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="title" className="sr-only">
                                Title
                            </label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-t-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Title"
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                }}
                            />
                        </div>
                        <div>
                            <label htmlFor="comment" className="sr-only">
                                Comment
                            </label>
                            <textarea
                                id="comment"
                                name="comment"
                                required
                                rows={3}
                                className="appearance-none rounded-none relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-b-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Comment"
                                onChange={(e) => {
                                    setComment(e.target.value);
                                }}
                            />
                        </div>
                        <div>
                            <Stack spacing={1}>
                                <Rating
                                    name="simple-controlled"
                                    value={starValue}
                                    onChange={(event, newValue) => {
                                        setStarValue(newValue);
                                    }}
                                />
                            </Stack>
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center
                py-2 px-4 border border-transparent text-sm font-medium
                rounded-md text-white bg-indigo-600 hover:bg-indigo-700
                focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-indigo-500"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                {/* <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                /> */}
                            </span>
                            Send Comment
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddComment;

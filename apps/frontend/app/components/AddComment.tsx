import React, { useState } from 'react';
import { Rating, Stack } from '@mui/material';
import { SendCommentDto } from '../Dtos';

type Props = {
    restaurant_id: string;
};

const AddComment = (props: Props) => {
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
    const [starValue, setStarValue] = useState(3);
    const [buttonText, setButtonText] = useState('Send Comment');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showFailureMessage, setShowFailureMessage] = useState(false);

    //   Form validation
    const [errors, setErrors] = useState({
        title: '',
        comment: ''
    });

    const handleValidation = () => {
        const tempErrors: any = {};
        let isValid = true;

        if (title.length <= 5) {
            tempErrors['fullname'] = true;
            isValid = false;
        }
        if (comment.length <= 20) {
            tempErrors['comment'] = true;
            isValid = false;
        }
        // if (subject.length <= 0) {
        //     tempErrors['subject'] = true;
        //     isValid = false;
        // }
        // if (message.length <= 0) {
        //     tempErrors['message'] = true;
        //     isValid = false;
        // }

        setErrors({ ...tempErrors });
        // console.log('errors', errors);
        return isValid;
    };

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            console.log('titleeeee', title, comment, starValue);
            const isValidForm = handleValidation();
            if (isValidForm) {
                setButtonText('Sending');
                const data: SendCommentDto = {
                    restaurant_id: props.restaurant_id,
                    name: title,
                    comment,
                    stars: starValue
                };
                const res = await fetch(
                    'http://localhost:3300/api/comments/addcomments',
                    {
                        body: JSON.stringify(data),
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        cache: 'no-cache'
                    }
                );
                const response = await res.json();
                // if (response.Data.Error) {
                //     setShowSuccessMessage(false);
                //     setShowFailureMessage(true);
                //     setButtonText('Send');
                //     // Reset form fields
                //     setFullname('');
                //     setEmail('');
                //     setMessage('');
                //     setSubject('');
                //     return;
                // }
                console.log('resssssss', response);
                setShowSuccessMessage(true);
                setShowFailureMessage(false);
                setButtonText('Send');
                // Reset form fields
                setComment('');
                setTitle('');
                setStarValue(0);
                // setSubject('');
            }
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
                            {errors.title && (
                                <p className="text-red-500">
                                    Title cannot be less than 5 characaters.
                                </p>
                            )}
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
                            {errors.comment && (
                                <p className="text-red-500">
                                    Fullname cannot be less than 20 characaters.
                                </p>
                            )}
                        </div>
                        <div>
                            <Stack spacing={1}>
                                <Rating
                                    name="simple-controlled"
                                    value={starValue}
                                    onChange={(event, newValue) => {
                                        setStarValue(newValue!);
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
                            {buttonText}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddComment;
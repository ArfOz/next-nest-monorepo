'use client';
import React, { useState } from 'react';
import { CommentDetails } from '../Dtos/CityDetails.dto';
import { Stack } from '@mui/material';
import Rating from '@mui/material/Rating';
import Modal from './Modal/Modal';

import DropdownThreedots from './Dropdown/Dropdown';
import { useSession } from 'next-auth/react';
import { UpdateCommentDataDto } from './dtos/navigate.type';

export const Comments = ({
    comments: comment
}: {
    comments: CommentDetails;
}) => {
    const { data: session, status, update } = useSession();
    const [showModal, setShowModal] = useState(false);
    const [starValue, setStarValue] = useState(comment.star);

    const [isEditing, setIsEditing] = useState(false);
    const [commentText, setCommentText] = useState(comment.comment);
    const [commentTitle, setCommentTitle] = useState(comment.title);

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showFailureMessage, setShowFailureMessage] = useState(false);
    const [error, setError] = useState('');
    const [modalMessage, setModalMessage] = useState('');

    const UpdatePost = () => {
        console.log('update');
        setIsEditing(true);
        // setShowModal(true);
    };

    const DeletePost = async () => {
        console.log('delete');
        const res = await fetch(
            'http://localhost:3300/api/comments/deletecomment',
            {
                body: JSON.stringify({ id: comment.id }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session?.accessToken}`
                },
                method: 'POST',
                cache: 'no-cache'
            }
        );
        const response = await res.json();

        if (response?.Error) {
            setShowSuccessMessage(false);
            setShowFailureMessage(true);
            setShowModal(true);
            // Reset form fields
            setError(response.Details);

            return;
        }

        if (response?.Success) {
            setError('');
            setShowSuccessMessage(true);
            setShowFailureMessage(false);
            setShowModal(true);

            setTimeout(function () {
                window.location.reload();
            }, 2000);
        }
    };

    const closeModal = () => {
        // Close the modal
        setShowModal(false);
    };

    const handleCancelClick = () => {
        // Close the modal
        setIsEditing(false);
    };

    const handleSaveClick = async () => {
        setIsEditing(false);

        const updatedData: UpdateCommentDataDto = {
            id: comment.id,
            comment: commentText,
            star: starValue,
            title: commentTitle
        };

        const res = await fetch(
            'http://localhost:3300/api/comments/updatecomment',
            {
                body: JSON.stringify(updatedData),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session?.accessToken}`
                },
                method: 'PUT',
                cache: 'no-cache'
            }
        );
        const response = await res.json();
        if (response?.Error) {
            // setShowSuccessMessage(false);
            // setShowFailureMessage(true);
            setModalMessage(response.Error);
            setShowModal(true);
            // Reset form fields
            setError(response.Details);

            return;
        }

        if (response?.Success) {
            setError('');
            setModalMessage('Successfully updated');
            // setShowSuccessMessage(true);
            // setShowFailureMessage(false);
            setShowModal(true);

            setTimeout(function () {
                window.location.reload();
            }, 2000);
        }
    };

    const isEditDeleteAble = () => {
        if (session?.user?.id === comment.user.id) {
            return true;
        }

        return false;
    };

    return (
        <div className="bg-white p-4 shadow-md rounded-md max-w-md mx-auto mt-8">
            <div className="flex items-center gap-x-4 text-sm w-full justify-between">
                <div>
                    <p className="font-semibold">{comment.user.username}</p>
                    <p className="text-gray-500 text-sm">
                        {new Date(Date.parse(comment.updatedAt))
                            .toDateString()
                            .toString()}
                    </p>
                </div>
                <Stack spacing={1}>
                    <Rating
                        value={starValue}
                        precision={0.1}
                        readOnly={!isEditing}
                        onChange={(event, newValue) => {
                            setStarValue(newValue!);
                        }}
                    />
                </Stack>

                {isEditDeleteAble() && (
                    <DropdownThreedots
                        DeletePost={() => DeletePost()}
                        UpdatePost={() => UpdatePost()}
                    />
                )}
            </div>
            {isEditing ? (
                <>
                    <textarea
                        defaultValue={comment.title}
                        // value={commentTitle}
                        onChange={(e) => setCommentTitle(e?.target?.value)}
                        className=" p-2 border border-gray-300 rounded-md w-full"
                    />

                    <textarea
                        defaultValue={comment.comment}
                        // value={commentText}
                        onChange={(e) => setCommentText(e?.target?.value)}
                        className="p-2 border border-gray-300 rounded-md w-full"
                    />
                </>
            ) : (
                <div className="group relative">
                    <h3
                        className="mt-3 text-lg font-semibold  
                                               leading-6 text-gray-900  
                                               group-hover:text-gray-600"
                    >
                        <a href="#">
                            <span className="absolute inset-0"></span>
                            {comment.title}
                        </a>
                    </h3>
                    <p
                        className="mt-5 line-clamp-3 text-sm  
                                              leading-6 text-gray-600"
                    >
                        {comment.comment}
                    </p>
                </div>
            )}
            <div className="flex items-center mt-4">
                {isEditing && (
                    <>
                        <button
                            onClick={handleSaveClick}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4"
                        >
                            Kaydet
                        </button>
                        <button
                            onClick={handleCancelClick}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4"
                        >
                            Iptal
                        </button>
                    </>
                )}

                {/* <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500"> */}
                {/* <svg */}
                {/* xmlns="http://www.w3.org/2000/svg" */}
                {/* fill="none" */}
                {/* viewBox="0 0 24 24" */}
                {/* stroke="currentColor" */}
                {/* className="w-5 h-5" */}
                {/* > */}
                {/* Beğeni ikonu SVG buraya gelecek */}
                {/* </svg> */}
                {/* <span>Beğen</span> */}
                {/* </button> */}

                {/* <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 ml-4"> */}
                {/* <svg */}
                {/* xmlns="http://www.w3.org/2000/svg" */}
                {/* fill="none" */}
                {/* viewBox="0 0 24 24" */}
                {/* stroke="currentColor" */}
                {/* className="w-5 h-5" */}
                {/* // > */}
                {/* Yorum ikonu SVG buraya gelecek */}
                {/* </svg> */}
                {/* <span>Yorum Yap</span> */}
                {/* </button> */}
            </div>
            <Modal
                showModal={showModal}
                closeModal={closeModal}
                data={modalMessage}
            />
        </div>
    );
};

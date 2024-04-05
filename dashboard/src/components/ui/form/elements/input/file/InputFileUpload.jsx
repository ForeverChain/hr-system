import React, { useEffect, useState } from 'react';
import { FiUploadCloud, FiXCircle } from 'react-icons/fi';
import { useDropzone } from 'react-dropzone';
import { IoCloseCircleOutline } from 'react-icons/io5';
import ImageViewer from './ImageViewer';

export default function InputFileUpload(props) {
    const { idName, onChange, isValid, required, name, value } = props;
    const [files, setFiles] = useState([]);
    const [fileError, setFileError] = useState(null);
    const [imgUrl, setImgUrl] = useState(value);

    const { getRootProps, getInputProps, fileRejections } = useDropzone({
        accept: {
            'image/jpeg': [],
            'image/jpg': [],
            'image/png': [],
            'image/webp': [],
        },
        multiple: false,
        maxSize: 20000000,
        maxFiles: 1,
        onDrop: (acceptedFiles, fileRejections) => {
            if (fileRejections.length > 0) {
                alert(
                    'There is error. Please select a JPEG, JPG, PNG, or WEBP file and below 20mb',
                );
            } else {
                setFiles(
                    acceptedFiles.map((file) =>
                        Object.assign(file, {
                            preview: URL.createObjectURL(file),
                        }),
                    ),
                );
                setFileError(null); // Reset file error state if valid file is dropped
            }
        },
    });

    const handleClick1 = () => {
        setFiles([]);
    };

    const handleClick2 = () => {
        setFiles([null]);
        onChange('image', null);
        setImgUrl(null);
    };

    useEffect(() => {
        onChange('image', files[0]);
    }, [files]);

    useEffect(() => {
        setImgUrl(value);
    }, [value]);

    return (
        <div className='w-full flex flex-col gap-2'>
            <label htmlFor={idName} className='w-full text-center'>
                <div
                    className='border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md cursor-pointer px-6 pt-5 pb-6'
                    {...getRootProps()}
                >
                    <input {...getInputProps()} />
                    <span className='mx-auto flex justify-center'>
                        <FiUploadCloud className='text-3xl text-emerald-500' />
                    </span>
                    <p className='text-sm mt-2'>Drag your images here</p>
                    <em className='text-xs text-gray-400'>(JPEG, WEBP, PNG) </em>
                </div>
            </label>
            {files[0] ? (
                <div className=' relative w-[100px]'>
                    <ImageViewer file={files[0]} width='100' height='100' />
                    <IoCloseCircleOutline
                        onClick={handleClick1}
                        className='text-red-800 cursor-pointer right-0 top-0 absolute'
                    />
                </div>
            ) : (
                imgUrl && (
                    <div className=' relative w-[100px] '>
                        <img src={imgUrl} alt='edittting_profile_pic' width='100' height='100' />
                        <IoCloseCircleOutline
                            onClick={handleClick2}
                            className=' text-red-800 cursor-pointer right-0 top-0 absolute'
                        />
                    </div>
                )
            )}
        </div>
    );
}

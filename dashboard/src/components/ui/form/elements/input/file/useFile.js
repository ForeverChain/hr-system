import { useState, useRef, useEffect } from 'react';

function useFile(file) {
    const fileRef = useRef(null);
    const [convertedFile, setConvertedFile] = useState(null);

    function convertBase64(file, callback) {
        if (file instanceof Blob) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    callback(reader.result);
                }
            };
            reader.readAsDataURL(file);
        } else {
            console.info('file instanceof not Blob');
        }
    }

    function checkFileExtension(file) {
        const fileType = file.type;
        const fileExtension = fileType.split('/')[1];

        let msg = null;
        let isValid = false;
        const allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf'];

        allowedExtensions.forEach((extension) => {
            if (fileExtension === extension) {
                isValid = true;
            }
        });

        if (!isValid) {
            msg = 'jpg, jpeg, png өргөтгөлтэй файл биш байна';
        }
        return msg;
    }

    useEffect(() => {
        if (file) {
            convertBase64(file, (base64File) => setConvertedFile(base64File));
        } else {
            setConvertedFile(null);
        }
    }, [file]);
    return {
        fileRef,
        checkFileExtension,
        convertBase64,
        convertedFile,
        setConvertedFile,
    };
}

export default useFile;

import React from 'react';
import useFile from './useFile';

function ImageViewer({ file, width, height, style }) {
    const { convertedFile } = useFile(file);

    return (
        <div style={style}>
            <img
                alt={file?.name}
                src={convertedFile}
                width={width ? `${width}` : '100'}
                height={height ? `${height}` : '100'}
            />
        </div>
    );
}

export default ImageViewer;

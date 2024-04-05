// array - ийн элэмэнтүүдийг өгөгдсөн урттайгаар хуваана
export async function sliceIntoChunks(arr, chunkSize) {
    if (!arr) {
        alert('array baihgui');
    }
    if (!chunkSize) {
        alert('хэдээр хуваах вэ? chunkSize оруулна уу');
        return;
    }

    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
}

function useEvent() {
    async function calcExportNftData(data) {
        const newData = data.map((nft) => ({
            type: nft.type,
            tokenId: nft?.tokenId,
            assetTokenId: nft.assetTokenId,
            owner: nft?.owner,
        }));
        return newData;
    }

    return {
        calcExportNftData,
    };
}

export default useEvent;

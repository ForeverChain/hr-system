import ClaimServices from '../claims/ClaimsServices';
import { useClaimsCtx } from '../claims/useClaimsCtx';
import { reportTypes } from '@/utils/constants';

export const claimProcessStatus = {
    WAITING: 'WAITING',
    INCINERATION_COMPLETE: 'INCINERATION_COMPLETE',
    EXPLANATION_COMPLETE: 'EXPLANATION_COMPLETE',
};

export const processStatusOptions = [
    {
        label: '전체 보기',
        value: null,
    },
    {
        label: '📅 대기중',
        value: claimProcessStatus?.WAITING,
    },
    {
        label: '✅ 소명완료',
        value: claimProcessStatus?.EXPLANATION_COMPLETE,
    },
    {
        label: '🔥 소각완료',
        value: claimProcessStatus?.INCINERATION_COMPLETE,
    },
];

function useClaims() {
    const { setClaimList, setExportEventData } = useClaimsCtx();

    async function calcExportClaimData(data) {
        const newData = data.map((nft) => ({
            type: nft.type,
            tokenId: nft?.tokenId,
            assetTokenId: nft.assetTokenId,
            owner: nft?.owner,
        }));
        return newData;
    }

    function displayClaimType(claimType) {
        return reportTypes.find((report) => report.value === claimType).label;
    }

    async function getClaimsExportData(props) {
        try {
            const res = await ClaimServices.getClaimExportList({ ...props })
                .then((res) => {
                    const tempArr = [];
                    res?.result?.forEach((e) => {
                        const { asset, ...rest } = e;
                        const modifiedObject = {
                            claimId: e.id,
                            reason: e.reason,
                            processStatus: e.processStatus,
                            description: e.description,
                            reporterName: e.reporterName,
                            assetId: e.asset.id,
                            assetToken: e.asset.token,
                            assetTitle: e.asset.title,
                        };
                        tempArr.push(modifiedObject);
                    });

                    setExportEventData(tempArr);
                    return res;
                })
                .catch((err) => {
                    console.error(err);
                });
            return res;
        } catch (e) {
            console.error(e);
        }
    }

    function displayClaimProcessStatus(processStatus) {
        return processStatusOptions.find((status) => status.value === processStatus).label;
    }

    return {
        calcExportClaimData,
        displayClaimType,
        displayClaimProcessStatus,
        getClaimsExportData,
    };
}

export default useClaims;

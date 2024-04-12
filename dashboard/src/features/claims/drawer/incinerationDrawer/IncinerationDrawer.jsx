import React, { useState } from 'react';
import {
    DrawerContent,
    DrawerFooter,
    DrawerFooterContent,
    DrawerHeader,
    DrawerLabel,
    DrawerRow,
    DrawerRowWrapper,
} from '@/common/drawer/_partials/drawerParts';
import { useDrawerCtx } from '@/common/drawer/useDrawerCtx';
import useClaims, { claimProcessStatus } from '../../../interview/useClaims';
import Btn, { OutlineBtn } from '@/components/ui/button/Button';
import ClaimServices from '../../ClaimsServices';
import { notifyError, notifySuccess } from '@/utils/toast';
import { useClaimsCtx } from '../../useClaimsCtx';
import { updateListItem } from '@/common/list/list-crud';
import IncinerationNftList from './IncinerationNftList';

function IncinerationDrawer() {
    const { claimList, setClaimList, allNftList } = useClaimsCtx();
    const { drawerState, toggleDrawer } = useDrawerCtx();
    const { displayClaimType } = useClaims();
    const [isLoading, setIsLoading] = useState(false);

    async function handleIncineration() {
        setIsLoading(true);
        try {
            for (let nft of allNftList?.items) {
                if (nft.type === 'AssetNFT') {
                    await ClaimServices.burnAssetNft(nft.tokenId);
                }
                if (nft.type === 'CopyrightNFT') {
                    await ClaimServices.burnCopyrightNFT(nft.tokenId);
                }
                if (nft.type === 'LicenseNFT') {
                    await ClaimServices.burnLicenseNFT(nft.tokenId);
                }
            }
            const { id } = drawerState;
            await ClaimServices.editAssetReport(id, claimProcessStatus.INCINERATION_COMPLETE);
            const theClaimList = claimList?.result?.content;
            const updatedClaimList = await updateListItem({
                dataList: theClaimList,
                id,
                fieldName: 'processStatus',
                editValue: claimProcessStatus.INCINERATION_COMPLETE,
            });
            setClaimList((prev) => ({
                ...prev,
                result: {
                    ...prev.result,
                    content: updatedClaimList,
                },
            }));
            toggleDrawer();
            notifySuccess('소각처리 되었습니다.');
        } catch (e) {
            notifyError('something went wrong burning process on blockchain');
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div>
            <DrawerHeader>에셋 신고 - 소각처리</DrawerHeader>
            <div>
                <DrawerRow>
                    <DrawerRowWrapper>
                        <DrawerLabel>에셋 이름</DrawerLabel>
                        <DrawerContent>{drawerState?.asset?.title}</DrawerContent>
                    </DrawerRowWrapper>
                </DrawerRow>
                <DrawerRow>
                    <DrawerRowWrapper>
                        <DrawerLabel>신고자</DrawerLabel>
                        <DrawerContent>{drawerState?.reporterName}</DrawerContent>
                    </DrawerRowWrapper>
                </DrawerRow>
                <DrawerRow>
                    <DrawerRowWrapper>
                        <DrawerLabel>신고유형</DrawerLabel>
                        <DrawerContent>{displayClaimType(drawerState?.reason)}</DrawerContent>
                    </DrawerRowWrapper>
                </DrawerRow>
                <DrawerRow>
                    <DrawerRowWrapper>
                        <DrawerLabel>신고 사유</DrawerLabel>
                        <DrawerContent>
                            {drawerState?.description || 'no description'}
                        </DrawerContent>
                    </DrawerRowWrapper>
                </DrawerRow>
                <DrawerRow>
                    <DrawerRowWrapper>
                        <DrawerLabel>처리현황</DrawerLabel>
                        <DrawerContent>대기중</DrawerContent>
                    </DrawerRowWrapper>
                </DrawerRow>
                <DrawerRow>
                    <DrawerLabel>소각 NFT 리스트</DrawerLabel>
                    <IncinerationNftList />
                </DrawerRow>
            </div>
            <DrawerFooter>
                <DrawerFooterContent>
                    <OutlineBtn onClick={toggleDrawer}>취소</OutlineBtn>
                </DrawerFooterContent>
                <DrawerFooterContent>
                    <Btn disabled={isLoading} isLoading={isLoading} onClick={handleIncineration}>
                        소각처리
                    </Btn>
                </DrawerFooterContent>
            </DrawerFooter>
        </div>
    );
}

export default IncinerationDrawer;

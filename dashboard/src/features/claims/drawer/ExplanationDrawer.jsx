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
import useClaims, { claimProcessStatus } from '../../place/useClaims';
import Btn, { OutlineBtn } from '@/components/ui/button/Button';
import ClaimServices from '../ClaimsServices';
import { notifyError, notifySuccess } from '@/utils/toast';
import { useClaimsCtx } from '../useClaimsCtx';
import { updateListItem } from '@/common/list/list-crud';

function ExplanationDrawer() {
    const { claimList, setClaimList } = useClaimsCtx();
    const { drawerState, toggleDrawer } = useDrawerCtx();
    const { displayClaimType } = useClaims();
    const [isLoading, setIsLoading] = useState(false);

    async function handleExplanation() {
        setIsLoading(true);
        try {
            const { id } = drawerState;
            await ClaimServices.editAssetReport(id, claimProcessStatus.EXPLANATION_COMPLETE);
            const theClaimList = claimList?.result?.content;
            const updatedClaimList = await updateListItem({
                dataList: theClaimList,
                id,
                fieldName: 'processStatus',
                editValue: claimProcessStatus.EXPLANATION_COMPLETE,
            });
            setClaimList((prev) => ({
                ...prev,
                result: {
                    ...prev.result,
                    content: updatedClaimList,
                },
            }));
            toggleDrawer();
            notifySuccess('소명처리 되었습니다.');
        } catch (e) {
            console.error(e?.response);
            const statusCode = e?.response?.status;
            const errMsg =
                statusCode === 400
                    ? 'bad request'
                    : statusCode === 404
                      ? 'not found'
                      : 'something went wrong on server!!!';
            notifyError(errMsg);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <DrawerHeader>에셋 신고 - 소명처리</DrawerHeader>
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
            </div>
            <DrawerFooter>
                <DrawerFooterContent>
                    <OutlineBtn onClick={toggleDrawer}>취소</OutlineBtn>
                </DrawerFooterContent>
                <DrawerFooterContent>
                    <Btn disabled={isLoading} isLoading={isLoading} onClick={handleExplanation}>
                        소명처리
                    </Btn>
                </DrawerFooterContent>
            </DrawerFooter>
        </div>
    );
}

export default ExplanationDrawer;

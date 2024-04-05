import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import AssetAbi from '../blockchain/contracts/AssetNFT/AssetNFT.json';
import CopyrightAbi from '../blockchain/contracts/CopyrightNFT/CopyrightNFT.json';
import LicenseAbi from '../blockchain/contracts/LicenseNFT/LicenseNFT.json';
import assetContractAddress from '../blockchain/contracts/AssetNFT/location.json';
import copyrightContractAddress from '../blockchain/contracts/CopyrightNFT/location.json';
import licenseContractAddress from '../blockchain/contracts/LicenseNFT/location.json';
import { useGlobalCtx } from '../global/useGlobalCtx';
import { useGlobalPopupCtx } from '../popup/globalPopups/useGlobalPopupCtx';
import { GLOBAL_POPUP_TYPES } from '../popup/globalPopups/globalPopupRegistration';
// import { useEffect } from 'react'
function useWeb3() {
    const { web3Items, setWeb3Items } = useGlobalCtx();
    const { showGlobalPopup } = useGlobalPopupCtx();

    async function setWeb3Provider(providerObject) {
        setWeb3Items((prev) => ({
            ...prev,
            web3: providerObject,
        }));
    }

    async function instanceWeb3() {
        try {
            if (window.ethereum) {
                const providerObj = new Web3(window.ethereum);
                setWeb3Provider(providerObj);
                try {
                    // Request account access if needed
                    await window.ethereum.enable();
                } catch (error) {
                    // User denied account access
                    console.error('User denied account access');
                }
            } else if (window.web3) {
                const providerObj = new Web3(window.web3.currentProvider);
                setWeb3Provider(providerObj);
            } else {
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                    message: 'No Ethereum provider detected! Please install metamask',
                });
            }
        } catch (e) {
            console.error(e);
        }
    }

    async function checkNetwork() {
        try {
            const provider = await detectEthereumProvider();
            return provider.networkVersion ?? 'Metamask not detected';
        } catch (e) {
            console.error(e);
        }
    }

    async function changeNetwork() {
        try {
            if (!window.ethereum) {
                console.error('Metamask not detected!');
                return;
            }
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x7E5' }],
            });
        } catch (e) {
            console.error(e);
        }
    }

    async function assetMint(payload) {
        try {
            const { web3 } = web3Items;
            const assetContractAddr = assetContractAddress.address;
            const assetContract = new web3.eth.Contract(AssetAbi.abi, assetContractAddr);

            const result = await assetContract.methods
                .safeMint(
                    payload.to,
                    payload.assetInfos,
                    payload.creatorNames,
                    payload.creatorIds,
                    payload.validityInfos,
                )
                .send({
                    // gas: 300000,
                    from: payload.to,
                });
            return result;
        } catch (e) {
            console.error(e);
        }
    }

    async function copyrightMint(payload) {
        try {
            const { web3 } = web3Items;
            const copyrightContractAddr = copyrightContractAddress.address;
            const copyrightContract = new web3.eth.Contract(
                CopyrightAbi.abi,
                copyrightContractAddr,
            );

            const result = await copyrightContract.methods
                .safeMint(
                    payload.to,
                    payload.srcTokenId,
                    payload.copyrightOnwerNames,
                    payload.copyrightOwnerIds,
                    payload.copyrightOwnerStakes,
                    payload.copyrightTypes,
                )
                .send({
                    // gas: 300000,
                    from: payload.to,
                });
            return result;
        } catch (e) {
            console.error(e);
        }
    }

    async function licenseMint(payload) {
        try {
            const { web3 } = web3Items;
            const licenseContractAddr = licenseContractAddress.address;
            const licenseContract = new web3.eth.Contract(LicenseAbi.abi, licenseContractAddr);
            // const accounts = await web3.eth.getAccounts()
            // const payload = {
            //     to: accounts[0],
            //     srcTokenId: tokenId,
            //     userInfos: ['nana', 'pana'],
            //     licenseContractInfos: ['license-1', 'license-2', 'license-3'],
            // }
            const result = await licenseContract.methods
                .safeMint(
                    payload.to,
                    payload.srcTokenId,
                    payload.userInfos,
                    payload.licenseContractInfos,
                )
                .send({
                    // gas: 300000,
                    from: payload.to,
                });
            return result;
        } catch (e) {
            console.error(e);
        }
    }

    return {
        instanceWeb3,
        assetMint,
        copyrightMint,
        licenseMint,
        changeNetwork,
        checkNetwork,
    };
}

export default useWeb3;

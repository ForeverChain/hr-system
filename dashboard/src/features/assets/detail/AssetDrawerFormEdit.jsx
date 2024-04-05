import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@windmill/react-ui';
import { ImCross } from 'react-icons/im';
import LabelArea from '@/components/ui/form/selectOption/LabelArea';
import { SidebarContext } from '@/components/layout/sidebar/SidebarContext';
import InputText, { InputTw } from '@/components/ui/form/elements/input/InputText';
import useForm from '@/components/ui/form/store/useForm';
import FormRow from '@/components/ui/form/FormRow';
import InputFileUpload from '@/components/ui/form/elements/input/file/InputFileUpload';
import InputPassword from '@/components/ui/form/elements/input/InputPassword';
import useAsset from '../useAsset';
import { useGlobalCtx } from '@/common/global/useGlobalCtx';
import { useAssetsCtx } from '../useAssetCtx';
import TextArea from '@/components/ui/form/elements/textArea/TextArea';
import Select from '@/components/ui/form/elements/select/_choices/simpleSelect/Select';

const selectOptions = [
    {
        label: 'Unity',
        value: '1',
    },
    {
        label: 'Unreal',
        value: '2',
    },
    {
        label: 'WebXR',
        value: '3',
    },
];

export default function AssetDrawerFormEdit({ id, selectOptions }) {
    const { toggleDrawer, isDrawerOpen } = useContext(SidebarContext);
    const { getAllAssetList, updateAssetDetail } = useAsset();
    const { edittingRowInfo } = useGlobalCtx();
    const { assetDetail } = useGlobalCtx();
    const [initialFormData, setInitialFormData] = useState({
        image: { value: assetDetail?.image?.url, error: null },
        name: { value: assetDetail?.title, error: null },
        description: { value: assetDetail?.description, error: null },
        platform: { value: assetDetail?.platform?.id, error: null },
    });
    const { currentPage } = useAssetsCtx();
    const [tagList, setTagList] = useState([]);

    useEffect(() => {
        const initialFormTimer = setTimeout(() => {
            if (assetDetail && id) {
                const tempArr = [];
                assetDetail?.tags?.forEach((tag) => {
                    tempArr.push(tag.name);
                });
                setTagList(tempArr);

                // setInitialFormData({
                //     image: { value: assetDetail?.image?.url, error: null },
                //     name: { value: assetDetail?.title, error: null },
                //     description: { value: assetDetail?.description, error: null },
                //     platform: { value: assetDetail?.platform?.id, error: null },
                // });
            }
        }, 500);
        return () => clearTimeout(initialFormTimer);
    }, [assetDetail, id]);

    const { onChange, onError, formState, setValueField } = useForm(initialFormData);
    const [tempText, setTempText] = useState('');

    function deleteFromtagList(index) {
        if (index >= 0 && index < tagList.length) {
            setTagList(
                tagList.filter((tag, indx) => {
                    return index !== indx;
                }),
            );
        } else {
            tagList;
        }
    }

    function addTempTextToTagList() {
        setTagList((prev) => [...prev, tempText]);
        setTempText('');
    }

    function submitFormForEdit(e) {
        e.preventDefault();
        const formdata = new FormData();

        formdata.append('title', formState?.name?.value);
        formdata.append('platformId', +formState?.platform?.value);
        formdata.append('description', formState?.description?.value);
        formdata.append('tags', tagList);
        if (typeof formState?.image?.value === 'object' && formState?.image?.value) {
            formdata.append('thumbnail', formState?.image?.value);
        } else if (formState?.image?.value == null) {
            formdata.append('imgDeleted', true);
        }

        updateAssetDetail({ id: +assetDetail?.id, body: formdata })
            .then((res) => {
                if (res.message === 'success') {
                    toggleDrawer();
                    getAllAssetList({ page: +currentPage - 1 });
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    useEffect(() => {
        if (assetDetail) {
            setInitialFormData({
                image: { value: assetDetail?.image?.url, error: null },
                name: { value: assetDetail?.title, error: null },
                description: { value: assetDetail?.description, error: null },
                platform: { value: assetDetail?.platform?.id, error: null },
            });
        }
    }, [assetDetail]);

    return (
        <form>
            <div className='px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40'>
                <FormRow
                    errMsg={formState?.name?.error}
                    className='px-6 pt-6 flex-grow scrollbar-hide w-full max-h-full grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6'
                >
                    <LabelArea label='이미지' />
                    <div className='col-span-8 sm:col-span-4'>
                        <InputFileUpload
                            idName='adminFileUpload'
                            onChange={setValueField}
                            isValid={Boolean(formState?.image?.error)}
                            name='image'
                            value={assetDetail?.thumbnailUrl}
                        />
                    </div>
                </FormRow>
                <FormRow
                    errMsg={formState?.name?.error}
                    className='px-6 pt-6 flex-grow scrollbar-hide w-full max-h-full grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6'
                >
                    <LabelArea label='이름' />
                    <div className='col-span-8 sm:col-span-4'>
                        <InputText
                            name='name'
                            onChange={onChange}
                            value={formState?.name?.value}
                            isValid={Boolean(formState?.name?.error)}
                            placeholder='발전기-Mk2'
                        />
                    </div>
                </FormRow>
                <FormRow
                    errMsg={formState?.email?.error}
                    className='px-6 pt-6 flex-grow scrollbar-hide w-full max-h-full grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6'
                >
                    <LabelArea label='설명' />
                    <div className='col-span-8 sm:col-span-4'>
                        <TextArea
                            name='description'
                            onChange={onChange}
                            value={formState?.description?.value}
                            isValid={Boolean(formState?.description?.error)}
                            placeholder='발전기-Mk2 입니다.'
                        />
                    </div>
                </FormRow>
                <FormRow
                    errMsg={formState?.password?.error}
                    className='px-6 pt-6 flex-grow scrollbar-hide w-full max-h-full grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6'
                >
                    <LabelArea label='플랫폼' />
                    <div className='col-span-8 sm:col-span-4'>
                        <Select
                            name='platform'
                            options={selectOptions}
                            defaultValue={selectOptions[2].label}
                            // defaultValue={selectOptions[selectOptions.findIndex(e => e.label === assetDetail?.platform?.name)]}
                            onChange={onChange}
                            placeholder='플랫폼'
                        />
                    </div>
                </FormRow>
                <FormRow
                    errMsg={formState?.password?.error}
                    className='px-6 pt-6 flex-grow scrollbar-hide w-full max-h-full grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6'
                >
                    <LabelArea label='태그' />
                    <div className='col-span-8 sm:col-span-4'>
                        <div className='flex gap-2 mb-2 flex-wrap'>
                            {tagList?.length !== 0 &&
                                tagList
                                    ?.sort((a, b) => a.localeCompare(b))
                                    .map((tag, index) => (
                                        <span
                                            key={'fhndjska' + index}
                                            className='text-white bg-slate-500 rounded-xl px-2 py-1 h-6 text-center text-sm items-center flex gap-1'
                                        >
                                            {tag}
                                            <div
                                                className=' cursor-pointer'
                                                onClick={() => deleteFromtagList(index)}
                                            >
                                                <ImCross />
                                            </div>
                                        </span>
                                    ))}
                        </div>
                        <InputTw
                            type='text'
                            value={tempText}
                            onChange={(e) => setTempText(e.target.value)}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    addTempTextToTagList();
                                }
                            }}
                            placeholder='Asset Tag (입력 후 Enter 키를 누르면 태그 추가)'
                        />
                    </div>
                </FormRow>
            </div>
            <div
                className='fixed z-10 bottom-0 w-full right-0 py-4 lg:py-8 px-6 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex bg-gray-50 border-t border-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300'
                style={{ right: !isDrawerOpen && -50 }}
            >
                <div className='flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow'>
                    <Button
                        onClick={toggleDrawer}
                        className='h-12 bg-white w-full text-red-500 hover:bg-red-50 hover:border-red-100 hover:text-red-600 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-red-700'
                        layout='outline'
                    >
                        취소
                    </Button>
                </div>
                <div className='flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow'>
                    <Button onClick={submitFormForEdit} className='w-full h-12'>
                        <span>수정</span>
                    </Button>
                </div>
            </div>
        </form>
    );
}

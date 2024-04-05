import { Button } from '@windmill/react-ui';

function ResetBtn({ onClick, children }) {
    return (
        <Button
            layout='outline'
            onClick={onClick}
            type='reset'
            className='px-4 md:py-1 py-2 h-12 text-sm dark:bg-gray-700'
        >
            <span className='text-black dark:text-gray-200'>{children}</span>
        </Button>
    );
}

export default ResetBtn;

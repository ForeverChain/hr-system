import tw from 'tailwind-styled-components';

function FormRow({ children, className, errMsg }) {
    return (
        <FormRowStyled className={`${className || ''}`}>
            {children}
            {errMsg && <ErrorText>{errMsg}</ErrorText>}
        </FormRowStyled>
    );
}

const FormRowStyled = tw.div`
   relative
   flex
   flex-col
   w-full
   text-left
   pt-4
   last:pb-0
`;

// ErrMsgTw
export const ErrorText = tw.span`
    text-red-400 
    text-sm 
    mt-2
`;

export default FormRow;

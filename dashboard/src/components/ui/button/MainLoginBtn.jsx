import { useRouter } from 'next/router';
import { BiUserCircle } from 'react-icons/bi';
import styled from 'styled-components';
import Button from './Button';

function MainLoginBtn() {
    const { push } = useRouter();
    return (
        <MainLoginBtnWrapper>
            <Button onClick={() => push('/login')} width={150}>
                <BiUserCircle fontSize={20} />
                <span>login</span>
            </Button>
        </MainLoginBtnWrapper>
    );
}

const MainLoginBtnWrapper = styled.div`
    @media (max-width: 990px) {
        display: none;
    }
`;

export default MainLoginBtn;

import { css } from '@emotion/react';
import { BounceLoader } from 'react-spinners';

const overrideStyles = css`
    margin: auto;
`;

const Loading = () => (
    <div className="loading__container">
        <BounceLoader size={ 300 } css={ overrideStyles }/>
    </div>
);

export default Loading;
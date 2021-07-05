import styled from 'styled-components'

type IconWrapperProps = {
    top: number;
    right: number;
    borderColor: string;
    shadowColor: string;
};

export const IconWrapper = styled.div<IconWrapperProps>`
    border: 2px solid ${props => props.borderColor};
    border-radius: 50%;
    padding: 3px;
    cursor: pointer;
    position: absolute;
    top: ${props => props.top}px;
    right: ${props => props.right}px;

    &:hover {
        box-shadow: 0px 0px 3px 3px ${props => props.shadowColor};
    }
`;

import React from "react";
import styled from "@emotion/styled";
import { v4 as uuidv4 } from 'uuid';
import Tooltip from "@atlaskit/tooltip";

const Wrapper = styled.div`
    display: flex;
`;

const DateMarker = styled.div`
    background-color: pink;
    width: ${props => (props.days * props.width)}px;
    height: 20px;
    border: 1px solid black;
    margin-left: ${props => props.offset * props.width}px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    user-select: none;
    cursor: pointer;
`;

export const DateRangeMarker = ({ id, numOfDays, name, offset, width = 6 }) => {
    return (
        <Wrapper>
            <Tooltip content={name}>
                <DateMarker
                    id={id}
                    key={uuidv4()} 
                    days={numOfDays} 
                    width={width} 
                    offset={offset}
                >
                    {name}
                </DateMarker>
            </Tooltip>
        </Wrapper>
    );
};
import React from "react";
import { v4 as uuidv4 } from 'uuid';
import styled from "@emotion/styled";

import { Row } from "./Row";

const RowsWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Rows = ({ timelineRows, minStart, onRowDoubleClicked }) => {

    return (
        <RowsWrapper onDoubleClick={onRowDoubleClicked}>
            {timelineRows.map((item) => {
                return (
                    <Row 
                        key={uuidv4()} 
                        item={item} 
                        minStart={minStart}
                    />
                );
            })}
        </RowsWrapper>
    );
};
import React from "react";
import styled from "@emotion/styled";
import { v4 as uuidv4 } from 'uuid';

import { calculateOffset } from "../helper";
import { DateRangeMarker } from "./DateRangeMarker";

const RowWrapper = styled.div`
    display: flex;
`;

export const Row = ({ item, minStart }) => {
    const calculated = calculateOffset(item, minStart);

    return (
        <RowWrapper>
            {calculated.items.map((item) =>  (
                <DateRangeMarker key={uuidv4()} {...item} />
            ))}
        </RowWrapper>
    );
}
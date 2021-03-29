import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import format from 'date-fns/format';
import { v4 as uuidv4 } from 'uuid';
import Tooltip from "@atlaskit/tooltip";
import Button from '@atlaskit/button';
import Modal, { ModalTransition } from '@atlaskit/modal-dialog';
import Textfield from '@atlaskit/textfield';

import { 
    getMinMaxRange, 
    getMonthLabels, 
    constructTimelineRows, 
    getDaysInMonths 
} from "../helper";
import timelineItems from "./timelineItems";
import { Rows } from "./Rows";

const TitleContainer = styled.div`
    display: flex;
    align-items: center;
`;

const LabelWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 916px;
`;

const MonthLabelWrapper = styled.div`
    display: flex;
    text-align: center;
`;

const MonthSquaresWrapper = styled.div`
    display: flex;
`;

const SquareWrapper = styled.div`
    display: flex;
    border: 1px solid black;
`;

const MonthLabel = styled.div`
    height: 20px;
    width: ${props => (props.days) * 6}px;
    background-color: grey;
    border: 1px solid black;
`;
const Square = styled.div`
    height: 20px;
    width: 6px;
    background-color: grey;
    outline: 1px solid black;
`;

const AddButton = styled(Button)`
    margin-left: 10px;
`;

export const GanttChart = () => {
    const [timelineItemsData, setTimelineItemsData] = useState(timelineItems);
    const [editItemId, setEditItemId] = useState(null);
    const close = () => setEditItemId(null);

    const { start, end, numOfMonths } = getMinMaxRange(timelineItemsData);
    const monthLabelStrings = getMonthLabels(start, numOfMonths + 1);
    const daysInMonths = getDaysInMonths(start, numOfMonths + 1);

    const renderTimelineLabel = () => {
        let monthSquares = [];
        let monthLabels = [];
        for (let i = 0; i < numOfMonths + 1; i++) {
            const days = daysInMonths[i];
            monthSquares.push(<MonthSquare key={uuidv4()} days={days} />);
            monthLabels.push(
            <MonthLabel key={uuidv4()} days={days}>
                {monthLabelStrings[i]}
            </MonthLabel>
            );
        }

        return (
            <>
                <MonthSquaresWrapper>
                    {monthSquares}
                </MonthSquaresWrapper>
                <MonthLabelWrapper>
                    {monthLabels}
                </MonthLabelWrapper>
                <LabelWrapper>
                    <RangeLabel key="range-start" mill={start} />
                    <RangeLabel key="range-end" mill={end} />
                </LabelWrapper>
            </>
        );
    };

    const handleRowDoubleClicked = (event) => {
        // id is not 0 based
        setEditItemId(parseInt(event.target.id) - 1);
    };

    const handleEditSave = () => {
        const newName = document.getElementById("editItemTextField").value;
        const updated = {
            ...timelineItemsData[editItemId],
            name: newName,
        };
        timelineItemsData.splice(editItemId, 1, updated);
        setTimelineItemsData(timelineItemsData.slice());
        setEditItemId(null);
    }

    const timelineRows = constructTimelineRows(timelineItemsData);

    return (
        <>  
            <TitleContainer>
                <h1>Gantt Chart</h1>
            </TitleContainer>
            <Rows 
                timelineRows={timelineRows}
                minStart={new Date(start)} 
                onRowDoubleClicked={handleRowDoubleClicked}
            />
            {renderTimelineLabel()}

            <ModalTransition>
                {editItemId !== null && (
                    <Modal
                        actions={[{ text: 'Save', onClick: handleEditSave }, { text: 'Cancel', onClick: close }]}
                        onClose={close}
                        heading="Edit Item name"
                        appearance="primary"
                    >   
                        <Textfield
                            placeholder={timelineItemsData[editItemId].name} 
                            id="editItemTextField"
                        />
                    </Modal>
                )}
            </ModalTransition>
        </>
    );
}

const RangeLabel = ({ mill }) => (
    <span>{format(new Date(mill), "LLL yyyy")}</span>
);

const MonthSquare = ({ days }) => {
    const squares = [];
    for (let i = 0 ; i < days; i++) {
        squares.push(
            <Tooltip content={`${i + 1}`}>
                <Square key={uuidv4()} />
            </Tooltip>
        );
    }
    return (
        <SquareWrapper>
            {squares}
        </SquareWrapper>
    );
}

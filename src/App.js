import React from "react";
import styled from "@emotion/styled";

import { GanttChart } from "./Chart/GanttChart";

const GanttChartWrapper = styled.div`
    max-width: 916px;
    margin: 300px auto;
`;

export const App = () => (
    <GanttChartWrapper>
        <GanttChart />
    </GanttChartWrapper>  
);
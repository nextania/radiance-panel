const { requestsServed, dataServed, requestsChallenged, dataCached, topCountries } = {
    requestsServed: [
        { time: "10:00", count: 120 },
        { time: "11:00", count: 150 },
        { time: "12:00", count: 170 },
        { time: "13:00", count: 200 },
        { time: "14:00", count: 220 },
        { time: "15:00", count: 250 },
        { time: "16:00", count: 300 },
        { time: "17:00", count: 280 },
        { time: "18:00", count: 320 },
        { time: "19:00", count: 350 },
        { time: "20:00", count: 400 },
        { time: "21:00", count: 450 },
        { time: "22:00", count: 500 },
        { time: "23:00", count: 550 },
        { time: "00:00", count: 600 },
        { time: "01:00", count: 580 },
        { time: "02:00", count: 560 },
        { time: "03:00", count: 540 },
        { time: "04:00", count: 520 },
        { time: "05:00", count: 500 },
        { time: "06:00", count: 480 },
        { time: "07:00", count: 460 },
        { time: "08:00", count: 440 },
        { time: "09:00", count: 420 },
    ],
    dataServed: [
        { time: "10:00", mb: 30 },
        { time: "11:00", mb: 27 },
        { time: "12:00", mb: 25 },
        { time: "13:00", mb: 35 },
        { time: "14:00", mb: 40 },
        { time: "15:00", mb: 45 },
        { time: "16:00", mb: 50 },
        { time: "17:00", mb: 48 },
        { time: "18:00", mb: 55 },
        { time: "19:00", mb: 60 },
        { time: "20:00", mb: 65 },
        { time: "21:00", mb: 70 },
        { time: "22:00", mb: 75 },
        { time: "23:00", mb: 80 },
        { time: "00:00", mb: 85 },
        { time: "01:00", mb: 82 },
        { time: "02:00", mb: 78 },
        { time: "03:00", mb: 74 },
        { time: "04:00", mb: 70 },
        { time: "05:00", mb: 68 },
        { time: "06:00", mb: 65 },
        { time: "07:00", mb: 62 },
        { time: "08:00", mb: 60 },
        { time: "09:00", mb: 58 },
    ],
    requestsChallenged: [
        { time: "10:00", count: 20 },
        { time: "11:00", count: 25 },
        { time: "12:00", count: 30 },
        { time: "13:00", count: 35 },
        { time: "14:00", count: 40 },
        { time: "15:00", count: 45 },
        { time: "16:00", count: 50 },
        { time: "17:00", count: 48 },
        { time: "18:00", count: 55 },
        { time: "19:00", count: 60 },
        { time: "20:00", count: 65 },
        { time: "21:00", count: 70 },
        { time: "22:00", count: 75 },
        { time: "23:00", count: 80 },
        { time: "00:00", count: 85 },
        { time: "01:00", count: 82 },
        { time: "02:00", count: 78 },
        { time: "03:00", count: 74 },
        { time: "04:00", count: 70 },
        { time: "05:00", count: 68 },
        { time: "06:00", count: 65 },
        { time: "07:00", count: 62 },
        { time: "08:00", count: 60 },
        { time: "09:00", count: 58 },
    ],
    dataCached: [
        { time: "10:00", percent: 70 },
        { time: "11:00", percent: 72 },
        { time: "12:00", percent: 75 },
        { time: "13:00", percent: 73 },
        { time: "14:00", percent: 74 },
        { time: "15:00", percent: 76 },
        { time: "16:00", percent: 78 },
        { time: "17:00", percent: 77 },
        { time: "18:00", percent: 79 },
        { time: "19:00", percent: 80 },
        { time: "20:00", percent: 81 },
        { time: "21:00", percent: 82 },
        { time: "22:00", percent: 83 },
        { time: "23:00", percent: 84 },
        { time: "00:00", percent: 85 },
        { time: "01:00", percent: 84 },
        { time: "02:00", percent: 83 },
        { time: "03:00", percent: 82 },
        { time: "04:00", percent: 81 },
        { time: "05:00", percent: 80 },
        { time: "06:00", percent: 79 },
        { time: "07:00", percent: 78 },
        { time: "08:00", percent: 77 },
        { time: "09:00", percent: 76 },
    ],
    topCountries: [
        { country: "Australia", requests: 300 },
        { country: "Germany", requests: 400 },
        { country: "United Kingdom", requests: 600 },
        { country: "Canada", requests: 800 },
        { country: "United States", requests: 1500 },
    ],
}

import {
    Axis,
    AxisCursor,
    AxisGrid,
    AxisLabel,
    AxisLine,
    AxisTooltip,
    Chart,
    Line,
    Point,
    Bar,
    Area,
} from "solid-charts";
import { styled } from "solid-styled-components";
import { useTranslate } from "../i18n";
import { HeadingLarge } from "../components/Layout";

const ChartContainer = styled.div`
    height: 20rem;
    font-size: 0.875rem;
    width: 100%;
    color: #e5e7eb;
`;

const StyledAxisGrid = styled(AxisGrid)`
    stroke: #374151;
`;

const StyledAxisLine = styled(AxisLine)`
    stroke: #6b7280;
`;

const StyledAxisCursor = styled(AxisCursor)`
    stroke: rgba(156, 163, 175, 0.7);
    transition: opacity 0.2s;
`;

const TooltipContainer = styled.div`
    border-radius: 0.375rem;
    font-size: 0.75rem;
    overflow: hidden;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
    border: 1px solid #4b5563;
    background: #1f2937;
    color: #e5e7eb;
`;

const TooltipHeader = styled.div`
    background: #374151;
    border-bottom: 1px solid #4b5563;
    padding: 0.25rem 0.5rem;
    font-weight: 500;
`;

const TooltipContent = styled.div`
    display: flex;
    align-items: center;
    padding: 0.25rem 0.5rem;
`;

const TooltipDot = styled.div<{ color: string }>`
    border-radius: 9999px;
    width: 0.5rem;
    height: 0.5rem;
    background: ${(props) => props.color};
`;

const TooltipLabel = styled.span`
    flex-grow: 1;
    margin-left: 0.375rem;
`;

const TooltipValue = styled.span`
    margin-left: 0.75rem;
`;

const BlueStroke = styled.g`
    stroke: #3b82f6;
    fill: #3b82f6;
`;

const GreenFill = styled(Area)`
    stroke: #10b981;
    fill: rgba(16, 185, 129, 0.2);
`;

const AmberStroke = styled.g`
    stroke: #f59e0b;
    fill: #f59e0b;
`;

const PurpleStroke = styled.g`
    stroke: #a855f7;
    fill: #a855f7;
`;

const RedStroke = styled.g`
    stroke: #ef4444;
    fill: #ef4444;
`;

const OverviewContainer = styled.div`
    padding: 3rem;
    max-width: 1400px;
    margin: 0 auto;
    gap: 2rem;
    display: flex;
    flex-direction: column;
`;

const ChartGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
`;

const ChartCard = styled.div`
    background: var(--bg-card);
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.3);
    border: 1px solid var(--border-color);
`;

const ChartLabel = styled.div`
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
`;

const Overview = () => {
    const t = useTranslate();
    return (
        <OverviewContainer>
            <HeadingLarge>
                {t("navigation.overview")}
            </HeadingLarge>

            <ChartGrid>
                <ChartCard>
                    <ChartLabel>
                        {t("metrics.requestsServed")}
                    </ChartLabel>
                    <ChartContainer>
                        <Chart data={requestsServed}>
                            <Axis axis="y" position="left" tickCount={5}>
                                <AxisLabel />
                                <StyledAxisGrid />
                            </Axis>
                            <Axis dataKey="time" axis="x" position="bottom" type="categorial">
                                <AxisLabel />
                                <StyledAxisLine />
                                <StyledAxisCursor
                                    stroke-dasharray="10,10"
                                    stroke-width={2}
                                />
                                <AxisTooltip>
                                    {(props) => (
                                        <TooltipContainer>
                                            <TooltipHeader>
                                                <span>{props.data.time}</span>
                                            </TooltipHeader>
                                            <TooltipContent>
                                                <TooltipDot color="#3b82f6" />
                                                <TooltipLabel>Requests</TooltipLabel>
                                                <TooltipValue>{props.data.count}</TooltipValue>
                                            </TooltipContent>
                                        </TooltipContainer>
                                    )}
                                </AxisTooltip>
                            </Axis>
                            <BlueStroke>
                                <Line dataKey="count" stroke-width={3} />
                            </BlueStroke>
                            <Point
                                dataKey="count"
                                style={{ fill: "#3b82f6", stroke: "white" }}
                                r={4}
                                stroke-width={2}
                            />
                        </Chart>
                    </ChartContainer>
                </ChartCard>

                <ChartCard>
                    <ChartLabel>
                        {t("metrics.dataServedMB")}
                    </ChartLabel>
                    <ChartContainer>
                        <Chart data={dataServed}>
                            <Axis axis="y" position="left" tickCount={5}>
                                <AxisLabel />
                                <StyledAxisGrid />
                            </Axis>
                            <Axis dataKey="time" axis="x" position="bottom" type="categorial">
                                <AxisLabel />
                                <StyledAxisLine />
                                <StyledAxisCursor
                                    stroke-dasharray="10,10"
                                    stroke-width={2}
                                />
                                <AxisTooltip>
                                    {(props) => (
                                        <TooltipContainer>
                                            <TooltipHeader>
                                                <span>{props.data.time}</span>
                                            </TooltipHeader>
                                            <TooltipContent>
                                                <TooltipDot color="#10b981" />
                                                <TooltipLabel>MB served</TooltipLabel>
                                                <TooltipValue>{props.data.mb}</TooltipValue>
                                            </TooltipContent>
                                        </TooltipContainer>
                                    )}
                                </AxisTooltip>
                            </Axis>
                            <GreenFill dataKey="mb" stroke-width={3} />
                            <Point
                                dataKey="mb"
                                style={{ fill: "#10b981", stroke: "white" }}
                                r={4}
                                stroke-width={2}
                            />
                        </Chart>
                    </ChartContainer>
                </ChartCard>

                <ChartCard>
                    <ChartLabel>
                        {t("metrics.requestsChallenged")}
                    </ChartLabel>
                    <ChartContainer>
                        <Chart data={requestsChallenged}>
                            <Axis axis="y" position="left" tickCount={5}>
                                <AxisLabel />
                                <StyledAxisGrid />
                            </Axis>
                            <Axis dataKey="time" axis="x" position="bottom" type="categorial">
                                <AxisLabel />
                                <StyledAxisLine />
                                <StyledAxisCursor
                                    stroke-dasharray="10,10"
                                    stroke-width={2}
                                />
                                <AxisTooltip>
                                    {(props) => (
                                        <TooltipContainer>
                                            <TooltipHeader>
                                                <span>{props.data.time}</span>
                                            </TooltipHeader>
                                            <TooltipContent>
                                                <TooltipDot color="#f59e0b" />
                                                <TooltipLabel>Challenged</TooltipLabel>
                                                <TooltipValue>{props.data.count}</TooltipValue>
                                            </TooltipContent>
                                        </TooltipContainer>
                                    )}
                                </AxisTooltip>
                            </Axis>
                            <AmberStroke>
                                <Bar dataKey="count" />
                            </AmberStroke>
                        </Chart>
                    </ChartContainer>
                </ChartCard>

                <ChartCard>
                    <ChartLabel>
                        {t("metrics.cacheHitRatePercent")}
                    </ChartLabel>
                    <ChartContainer>
                        <Chart data={dataCached}>
                            <Axis axis="y" position="left" tickCount={5}>
                                <AxisLabel />
                                <StyledAxisGrid />
                            </Axis>
                            <Axis dataKey="time" axis="x" position="bottom" type="categorial">
                                <AxisLabel />
                                <StyledAxisLine />
                                <StyledAxisCursor
                                    stroke-dasharray="10,10"
                                    stroke-width={2}
                                />
                                <AxisTooltip>
                                    {(props) => (
                                        <TooltipContainer>
                                            <TooltipHeader>
                                                <span>{props.data.time}</span>
                                            </TooltipHeader>
                                            <TooltipContent>
                                                <TooltipDot color="#a855f7" />
                                                <TooltipLabel>Cached</TooltipLabel>
                                                <TooltipValue>{props.data.percent}%</TooltipValue>
                                            </TooltipContent>
                                        </TooltipContainer>
                                    )}
                                </AxisTooltip>
                            </Axis>
                            <PurpleStroke>
                                <Line dataKey="percent" stroke-width={3} />
                            </PurpleStroke>
                            <Point
                                dataKey="percent"
                                style={{ fill: "#a855f7", stroke: "white" }}
                                r={4}
                                stroke-width={2}
                            />
                        </Chart>
                    </ChartContainer>
                </ChartCard>
                {/* TODO: update upstream to support horizontal bar graphs */}
                {/* <ChartCard>
                    <ChartLabel>
                        Top countries by requests
                    </ChartLabel>
                    <ChartContainer>
                        <Chart data={topCountries}>
                            <Axis dataKey="requests" axis="x" position="bottom" tickCount={5}>
                                <AxisLabel />
                                <StyledAxisGrid />
                            </Axis>
                            <Axis dataKey="country" axis="y" position="left" type="categorial">
                                <AxisLabel />
                                <StyledAxisLine />
                                <StyledAxisCursor
                                    stroke-dasharray="10,10"
                                    stroke-width={2}
                                />
                                <AxisTooltip>
                                    {(props) => (
                                        <TooltipContainer>
                                            <TooltipHeader>
                                                <span>{props.data.country}</span>
                                            </TooltipHeader>
                                            <TooltipContent>
                                                <TooltipDot color="#ef4444" />
                                                <TooltipLabel>Requests</TooltipLabel>
                                                <TooltipValue>{props.data.requests}</TooltipValue>
                                            </TooltipContent>
                                        </TooltipContainer>
                                    )}
                                </AxisTooltip>
                            </Axis>
                            <RedStroke>
                                <Bar dataKey="requests" />
                            </RedStroke>
                        </Chart>
                    </ChartContainer>
                </ChartCard> */}
            </ChartGrid>

        </OverviewContainer>
    );
};

export default Overview;

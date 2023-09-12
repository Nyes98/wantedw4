import { ResponsiveBar } from '@nivo/bar';
import { ResponsiveLine } from '@nivo/line';

import dummy from '../../db/data.json';
import styled from 'styled-components';

export const BarGraph = () => {
    interface RawData {
        [timestamp: string]: {
            id: string;
            value_area: number;
            value_bar: number;
        };
    }

    const rawData: RawData = dummy.response;

    const barData = Object.keys(rawData).map((timestamp) => ({
        id: rawData[timestamp].id,
        value: rawData[timestamp].value_bar,
        index: timestamp,
    }));

    const areaDetail = Object.keys(rawData).map((timestamp) => ({
        x: timestamp,
        y: rawData[timestamp].value_area,
    }));

    const areaData = Object.keys(rawData).map((timestamp) => ({
        id: 'Area',
        color: 'hsl(37, 70%, 50%)',
        data: areaDetail,
    }));

    return (
        <Wrap>
            <ResponsiveBar
                data={barData}
                keys={['value']}
                indexBy="index"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.5}
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={{ scheme: 'nivo' }}
                borderColor={{
                    from: 'color',
                    modifiers: [['darker', 1.6]],
                }}
                axisTop={null}
                axisRight={null}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 20,
                    legend: 'bar',
                    legendPosition: 'middle',
                    legendOffset: -50,
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{
                    from: 'color',
                    modifiers: [['darker', 1.6]],
                }}
                legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 10,
                        itemHeight: 20,
                        itemDirection: 'left-to-right',
                        itemOpacity: 0.85,
                        symbolSize: 20,
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemOpacity: 1,
                                },
                            },
                        ],
                    },
                ]}
                role="application"
                ariaLabel="Nivo bar chart demo"
                barAriaLabel={(e) => e.id + ': ' + e.formattedValue + ' in country: ' + e.indexValue}
            />
            <ResponsiveLine
                data={areaData}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: 'point' }}
                yScale={{
                    type: 'linear',
                    min: 0,
                    max: 100,
                    stacked: true,
                    reverse: false,
                }}
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'transportation',
                    legendOffset: 36,
                    legendPosition: 'middle',
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'area',
                    legendOffset: -40,
                    legendPosition: 'middle',
                }}
                colors={{ scheme: 'dark2' }}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={1}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                enableArea={true}
                useMesh={true}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 60,
                        itemHeight: 20,
                        itemOpacity: 0,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                    itemOpacity: 1,
                                },
                            },
                        ],
                    },
                ]}
            />
            ;
        </Wrap>
    );
};

const Wrap = styled.div`
    width: 14000px;
    height: 700px;
`;

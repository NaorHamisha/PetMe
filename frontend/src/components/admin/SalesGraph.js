import {useD3} from '../../hooks/useD3';
import * as d3 from 'd3';
import { nest } from 'd3-collection';
import useGet from '../../utils/requests/useGet';
import {Card} from 'react-bootstrap';
import styled from 'styled-components';

export default function SalesGraph() {
    let graphOrders = [];

    useGet('getLastWeekOrders').data?.forEach((order) => {
        let date = getStartOfDate(order.date);

        graphOrders.push({
            date: date,
            dayOfTheWeek: date.toLocaleDateString('en-us', {
                weekday: 'long',
            }),
            quantity: order.products
                .map((product) => product.quantity)
                .reduce((a, b) => a + b),
        });

        graphOrders.sort((a, b) => a.date - b.date);
    });

    function getStartOfDate(date) {
        let newDate = new Date(date);
        newDate.setHours(0);
        newDate.setMinutes(0);
        newDate.setSeconds(0);
        newDate.setMilliseconds(0);
        return newDate;
    }

    const ref = useD3(
        (svg) => {
            const height = 500;
            const width = 800;
            const margin = {top: 20, right: 30, bottom: 30, left: 40};

            const color = d3
                .scaleOrdinal()
                .domain([
                    'Sunday',
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                ])
                .range([
                    '#1f77b4',
                    '#ff7f0e',
                    '#2ca02c',
                    '#d62728',
                    '#9467bd',
                    '#8c564b',
                    '#e377c2',
                ]);

            const nestedData = nest()
                .key((d) => d.date)
                .entries(graphOrders);

            nestedData.forEach((day) => {
                day.totalQuantity = d3.sum(day.values, (d) => d.quantity);
            });

            const x = d3
                .scaleBand()
                .domain(nestedData.map((d) => d.key))
                .rangeRound([margin.left, width - margin.right])
                .padding(0.1);

            const xAxis = (g) =>
                g
                    .attr('transform', `translate(0,${height - margin.bottom})`)
                    .call(
                        d3
                            .axisBottom(x)
                            .tickFormat((d) => `${d3.timeFormat('%A %d-%b-%y')(new Date(d))}`)
                    )
                    .call((g) =>
                        g
                            .append('text')
                            .attr('x', margin.left + 10)
                            .attr('y', margin.top - 4)
                            .attr('fill', 'currentColor')
                            .attr('text-anchor', 'end')
                            .text('Date')
                    );

            const y1 = d3
                .scaleLinear()
                .domain([0, d3.max(nestedData, (d) => d.totalQuantity)])
                .rangeRound([height - margin.bottom, margin.top]);

            const y1Axis = (g) => {
                g.attr('transform', `translate(${margin.left},0)`)
                    .call(d3.axisLeft(y1))
                    .call((g) => g.select('.domain').remove());
                g.append('text')
                    .attr('x', -margin.right)
                    .attr('y', 10)
                    .attr('fill', 'currentColor')
                    .attr('text-anchor', 'start')
                    .text('Total Quantity');
            };

            svg.select('.x-axis').call(xAxis);
            svg.select('.y-axis').call(y1Axis);

            svg
                .select('.plot-area')
                .selectAll('.bar')
                .data(nestedData)
                .join('rect')
                .attr('class', 'bar')
                .attr('x', (d) => x(d.key))
                .attr('fill', (d) => color(d3.timeFormat('%A')(new Date(d.key))))
                .attr('width', x.bandwidth())
                .attr('y', (d) => y1(d.totalQuantity))
                .attr('height', (d) => y1(0) - y1(d.totalQuantity));
        },
        [graphOrders.length]
    );

    return (
        <Card className="align-items-center">
            <Body>
                <Card.Title>Last week's products sold</Card.Title>
                <svg
                    ref={ref}
                    style={{
                        height: 500,
                        width: '100%',
                        marginRight: '0px',
                        marginLeft: '0px',
                    }}
                >
                    <g className="plot-area"/>
                    <g className="x-axis"/>
                    <g className="y-axis"/>
                </svg>
            </Body>
        </Card>
    );
}


const Body = styled(Card.Body)`
  width: 50vw;
`;
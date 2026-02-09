'use client';

import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine, ReferenceArea, LabelList } from 'recharts';

interface BioAgeScatterPlotProps {
  chronologicalAge: number;
  biologicalAge: number;
}

export default function BioAgeScatterPlot({ chronologicalAge, biologicalAge }: BioAgeScatterPlotProps) {
  // Tick marks at intervals of 5 for both axes
  const axisTicks = React.useMemo(() => {
    return [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80];
  }, []);

  // User's data point
  const userData = [{ chronoAge: chronologicalAge, bioAge: biologicalAge, label: 'YOU' }];

  // Build stepped ReferenceArea bands to approximate the diagonal split.
  // For each 5-unit step along x, we shade:
  //   - GREEN below the diagonal (y from 20 up to x)
  //   - RED above the diagonal (y from x up to 80)
  const steps = [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75];
  const stepSize = 5;

  return (
    <div className="bio-age-chart-frame">
      <div className="bio-age-chart-row">
        <div className="bio-age-chart-plot">
          <ResponsiveContainer width="100%" height="100%" minHeight={480}>
            <ScatterChart margin={{ top: 8, right: 8, bottom: 40, left: 44 }}>
              <CartesianGrid
                strokeDasharray="none"
                stroke="#e0e0de"
                strokeWidth={0.5}
              />

              <XAxis
                type="number"
                dataKey="chronoAge"
                name="Chronological Age"
                domain={[20, 80]}
                ticks={axisTicks}
                tick={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 9,
                  fill: '#6b6b6b'
                }}
                tickLine={{ stroke: '#6b6b6b' }}
                label={{
                  value: 'CHRONOLOGICAL AGE (YEARS)',
                  position: 'bottom',
                  offset: 28,
                  style: {
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 8,
                    fill: '#6b6b6b',
                    letterSpacing: '0.1em',
                    fontWeight: 500
                  }
                }}
                stroke="#3d3d3d"
                strokeWidth={1}
              />
              <YAxis
                type="number"
                dataKey="bioAge"
                name="Biological Age"
                domain={[20, 80]}
                ticks={axisTicks}
                tick={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 9,
                  fill: '#6b6b6b'
                }}
                tickLine={{ stroke: '#6b6b6b' }}
                label={{
                  value: 'BIOLOGICAL AGE (YEARS)',
                  angle: -90,
                  position: 'insideLeft',
                  offset: -4,
                  style: {
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 8,
                    fill: '#6b6b6b',
                    letterSpacing: '0.1em',
                    fontWeight: 500,
                    textAnchor: 'middle'
                  }
                }}
                stroke="#3d3d3d"
                strokeWidth={1}
              />

              {/* Stepped zone fills approximating the diagonal split */}
              {steps.map((x) => (
                <React.Fragment key={x}>
                  {/* Green zone: below diagonal (bio age < chrono age = slower aging) */}
                  <ReferenceArea
                    x1={x}
                    x2={x + stepSize}
                    y1={20}
                    y2={x + stepSize}
                    fill="#436436"
                    fillOpacity={0.07}
                    stroke="none"
                    ifOverflow="hidden"
                  />
                  {/* Red zone: above diagonal (bio age > chrono age = faster aging) */}
                  <ReferenceArea
                    x1={x}
                    x2={x + stepSize}
                    y1={x}
                    y2={80}
                    fill="#bc2c1a"
                    fillOpacity={0.06}
                    stroke="none"
                    ifOverflow="hidden"
                  />
                </React.Fragment>
              ))}

              {/* Zone labels */}
              <ReferenceArea
                x1={22}
                x2={38}
                y1={72}
                y2={78}
                fill="transparent"
                stroke="none"
                label={{
                  value: 'FASTER AGING',
                  position: 'center',
                  style: {
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 7,
                    fontWeight: 600,
                    fill: '#bc2c1a',
                    letterSpacing: '0.06em',
                    opacity: 0.8
                  }
                }}
              />
              <ReferenceArea
                x1={62}
                x2={78}
                y1={22}
                y2={28}
                fill="transparent"
                stroke="none"
                label={{
                  value: 'SLOWER AGING',
                  position: 'center',
                  style: {
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 7,
                    fontWeight: 600,
                    fill: '#436436',
                    letterSpacing: '0.06em',
                    opacity: 0.8
                  }
                }}
              />

              {/* Baseline diagonal line */}
              <ReferenceLine
                stroke="#0a0a0a"
                strokeWidth={1.5}
                strokeDasharray="6 4"
                segment={[{ x: 20, y: 20 }, { x: 80, y: 80 }]}
              />

              {/* User's data point */}
              <Scatter
                name="Your Result"
                data={userData}
                fill="#bc2c1a"
                shape="diamond"
              >
                <LabelList
                  dataKey="label"
                  position="top"
                  fill="#bc2c1a"
                  fontSize={10}
                  fontWeight={600}
                  fontFamily="'Inter', sans-serif"
                  offset={8}
                  formatter={(value: unknown) => (value == null ? '' : String(value))}
                />
              </Scatter>

            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Legend below chart */}
      <div className="bio-age-chart-legend">
        <div className="bio-age-chart-legend-item">
          <div className="bio-age-chart-legend-marker user"></div>
          <span>Your Result</span>
        </div>
        <div className="bio-age-chart-legend-item">
          <div className="bio-age-chart-legend-marker baseline"></div>
          <span>Bio = Chrono Age</span>
        </div>
      </div>
    </div>
  );
}

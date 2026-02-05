'use client';

import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Customized, LabelList } from 'recharts';

interface BioAgeScatterPlotProps {
  chronologicalAge: number;
  biologicalAge: number;
}

export default function BioAgeScatterPlot({ chronologicalAge, biologicalAge }: BioAgeScatterPlotProps) {
  // Generate population reference data with fixed seed for consistency
  const populationData = React.useMemo(() => {
    const data = [];
    // Use a seeded approach for consistent rendering
    const seed = 42;
    const random = (i: number) => {
      const x = Math.sin(seed + i) * 10000;
      return x - Math.floor(x);
    };
    for (let i = 0; i < 400; i++) {
      const chronoAge = random(i) * 55 + 22;
      const variance = (random(i + 1000) - 0.5) * 14;
      const rawBioAge = chronoAge + variance;
      const bioAge = Math.min(78, Math.max(22, rawBioAge));
      data.push({ chronoAge, bioAge });
    }
    return data;
  }, []);

  // Tick marks at intervals of 5 for both axes
  const axisTicks = React.useMemo(() => {
    return [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80];
  }, []);

  // User's data point
  const userData = [{ chronoAge: chronologicalAge, bioAge: biologicalAge, label: 'YOU' }];

  const QuadrantOverlay: React.FC<any> = ({ xAxisMap, yAxisMap }) => {
    if (!xAxisMap || !yAxisMap) return null;
    const xAxis = Object.values(xAxisMap)[0] as { scale?: (value: number) => number };
    const yAxis = Object.values(yAxisMap)[0] as { scale?: (value: number) => number };
    if (!xAxis || !yAxis || !xAxis.scale || !yAxis.scale) return null;

    const xScale = xAxis.scale;
    const yScale = yAxis.scale;
    const x20 = xScale(20);
    const x80 = xScale(80);
    const y20 = yScale(20);
    const y80 = yScale(80);

    return (
      <g>
        <polygon
          points={`${x20},${y80} ${x80},${y80} ${x20},${y20}`}
          fill="#bc2c1a"
          opacity={0.05}
        />
        <polygon
          points={`${x20},${y20} ${x80},${y20} ${x80},${y80}`}
          fill="#436436"
          opacity={0.05}
        />
        {/* Zone labels inside the chart */}
        <text
          x={x20 + 8}
          y={y80 + 14}
          fill="#bc2c1a"
          fontSize="7"
          fontFamily="'Inter', sans-serif"
          fontWeight="500"
          style={{ textTransform: 'uppercase', letterSpacing: '0.06em' }}
        >
          Faster aging
        </text>
        <text
          x={x80 - 72}
          y={y20 - 6}
          fill="#436436"
          fontSize="7"
          fontFamily="'Inter', sans-serif"
          fontWeight="500"
          style={{ textTransform: 'uppercase', letterSpacing: '0.06em' }}
        >
          Slower aging
        </text>
      </g>
    );
  };

  return (
    <div className="bio-age-chart-frame">
      <div className="bio-age-chart-row">
        <div className="bio-age-chart-plot">
          <ResponsiveContainer width="100%" height="100%" minHeight={480}>
            <ScatterChart margin={{ top: 8, right: 8, bottom: 40, left: 44 }}>
              <Customized component={QuadrantOverlay} />
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
              <Tooltip 
                cursor={{ strokeDasharray: '3 3', stroke: '#6b6b6b' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div style={{
                        background: '#ffffff',
                        padding: '10px 14px',
                        border: '1px solid #e0e0de',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        fontFamily: "'Inter', sans-serif"
                      }}>
                        <p style={{ fontSize: '8pt', color: '#6b6b6b', margin: '0 0 4px 0' }}>
                          Chronological: {Number(payload[0].value).toFixed(1)} years
                        </p>
                        <p style={{ fontSize: '8pt', color: '#6b6b6b', margin: 0 }}>
                          Biological: {Number(payload[1].value).toFixed(1)} years
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              
              {/* Baseline diagonal line */}
              <ReferenceLine 
                stroke="#0a0a0a" 
                strokeWidth={1.5}
                strokeDasharray="6 4"
                segment={[{ x: 20, y: 20 }, { x: 80, y: 80 }]}
              />

              {/* Population reference data */}
              <Scatter 
                name="Population" 
                data={populationData} 
                fill="#031a6b" 
                fillOpacity={0.12}
                shape="circle"
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
          <div className="bio-age-chart-legend-marker population"></div>
          <span>Population Reference</span>
        </div>
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

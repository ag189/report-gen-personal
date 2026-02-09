'use client';

import React from 'react';

interface PaceOfAgingGaugeProps {
  dunedinPACE: number;
}

export default function PaceOfAgingGauge({ dunedinPACE }: PaceOfAgingGaugeProps) {
  const minValue = 0.5;
  const maxValue = 1.5;
  const normalizedValue = Math.max(minValue, Math.min(maxValue, dunedinPACE));
  const percentage = ((normalizedValue - minValue) / (maxValue - minValue)) * 100;

  // Determine which zone (for label highlighting)
  const getZone = (pace: number) => {
    if (pace < 0.9) return 'slower';
    if (pace <= 1.1) return 'normal';
    return 'faster';
  };

  const zone = getZone(dunedinPACE);

  // Generate tick marks: major every 0.1, minor every 0.05
  const ticks: { value: number; major: boolean; zoneBreak: boolean }[] = [];
  for (let v = minValue; v <= maxValue + 0.001; v += 0.05) {
    const rounded = Math.round(v * 100) / 100;
    const isMajor = Math.round(rounded * 10) % 1 === 0 && Math.round(rounded * 100) % 10 === 0;
    const isZoneBreak = rounded === 0.9 || rounded === 1.1;
    ticks.push({ value: rounded, major: isMajor, zoneBreak: isZoneBreak });
  }

  const getTickPercent = (val: number) => ((val - minValue) / (maxValue - minValue)) * 100;

  // Zone boundary percentages
  const zone1End = getTickPercent(0.9); // 40%
  const zone2End = getTickPercent(1.1); // 60%

  return (
    <div style={{ width: '100%' }}>
      {/* Gauge container */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '80px',
        marginBottom: '8px'
      }}>
        {/* "YOU" label + data value above the marker */}
        <div style={{
          position: 'absolute',
          left: `${percentage}%`,
          top: '0px',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          whiteSpace: 'nowrap'
        }}>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '9pt',
            fontWeight: 700,
            color: '#0a0a0a',
            letterSpacing: '0.05em'
          }}>YOU</span>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '9pt',
            fontWeight: 600,
            color: '#3d3d3d',
            marginLeft: '3px'
          }}>({dunedinPACE.toFixed(3)})</span>
        </div>

        {/* Vertical connector line from label to track */}
        <div style={{
          position: 'absolute',
          left: `${percentage}%`,
          top: '18px',
          width: '2px',
          height: '20px',
          background: '#0a0a0a',
          transform: 'translateX(-50%)'
        }}></div>

        {/* Diamond marker */}
        <div style={{
          position: 'absolute',
          left: `${percentage}%`,
          top: '36px',
          width: '12px',
          height: '12px',
          background: '#0a0a0a',
          transform: 'translateX(-50%) rotate(45deg)',
          zIndex: 3
        }}></div>

        {/* Main colored track */}
        <div style={{
          position: 'absolute',
          top: '42px',
          width: '100%',
          height: '6px',
          borderRadius: '3px',
          overflow: 'hidden',
          background: '#e0e0de'
        }}>
          {/* Slower aging zone */}
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: `${zone1End}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #5a8a4a, #436436)'
          }}></div>
          {/* Normal pace zone */}
          <div style={{
            position: 'absolute',
            left: `${zone1End}%`,
            top: 0,
            width: `${zone2End - zone1End}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #1b98d6, #1580b5)'
          }}></div>
          {/* Faster aging zone */}
          <div style={{
            position: 'absolute',
            left: `${zone2End}%`,
            top: 0,
            width: `${100 - zone2End}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #bc2c1a, #9a2315)'
          }}></div>
        </div>

        {/* Tick marks (ruler) */}
        {ticks.map((tick) => {
          const pct = getTickPercent(tick.value);
          const tickHeight = tick.zoneBreak ? 14 : tick.major ? 10 : 6;
          const tickWidth = tick.zoneBreak ? 2 : 1;
          const tickColor = tick.zoneBreak ? '#0a0a0a' : tick.major ? '#6b6b6b' : '#b0b0b0';
          return (
            <div
              key={tick.value}
              style={{
                position: 'absolute',
                left: `${pct}%`,
                top: `${45 - (tickHeight - 6) / 2}px`,
                width: `${tickWidth}px`,
                height: `${tickHeight}px`,
                background: tickColor,
                transform: 'translateX(-50%)',
                zIndex: tick.zoneBreak ? 2 : 1
              }}
            />
          );
        })}
      </div>

      {/* Scale labels — major ticks only */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '16px',
        marginBottom: '16px'
      }}>
        {ticks.filter(t => t.major).map((tick) => {
          const pct = getTickPercent(tick.value);
          return (
            <span
              key={tick.value}
              style={{
                position: 'absolute',
                left: `${pct}%`,
                transform: 'translateX(-50%)',
                fontFamily: "'Inter', sans-serif",
                fontSize: tick.zoneBreak ? '8.5pt' : '8pt',
                fontWeight: tick.zoneBreak ? 700 : 400,
                color: tick.zoneBreak ? '#0a0a0a' : '#6b6b6b'
              }}
            >
              {tick.value.toFixed(1)}
            </span>
          );
        })}
      </div>

      {/* Zone range callout cards */}
      <div style={{
        display: 'flex',
        gap: '8px',
        paddingTop: '16px',
        borderTop: '1px solid #e0e0de'
      }}>
        {/* Slower Aging */}
        <div style={{
          flex: '2',
          padding: '10px 12px',
          borderRadius: '6px',
          background: zone === 'slower' ? '#f0f7ee' : '#fafafa',
          border: zone === 'slower' ? '1.5px solid #436436' : '1px solid #e0e0de'
        }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '7.5pt',
            fontWeight: 700,
            color: '#436436',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            margin: 0
          }}>
            Slower Aging
          </p>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '8.5pt',
            fontWeight: 500,
            color: '#3d3d3d',
            marginTop: '2px',
            marginBottom: 0
          }}>
            0.50 – 0.89
          </p>
        </div>

        {/* Normal Pace */}
        <div style={{
          flex: '1',
          padding: '10px 12px',
          borderRadius: '6px',
          background: zone === 'normal' ? '#edf6fc' : '#fafafa',
          border: zone === 'normal' ? '1.5px solid #1b98d6' : '1px solid #e0e0de',
          textAlign: 'center'
        }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '7.5pt',
            fontWeight: 700,
            color: '#1b98d6',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            margin: 0
          }}>
            Normal
          </p>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '8.5pt',
            fontWeight: 500,
            color: '#3d3d3d',
            marginTop: '2px',
            marginBottom: 0
          }}>
            0.90 – 1.10
          </p>
        </div>

        {/* Faster Aging */}
        <div style={{
          flex: '2',
          padding: '10px 12px',
          borderRadius: '6px',
          background: zone === 'faster' ? '#fdf1ef' : '#fafafa',
          border: zone === 'faster' ? '1.5px solid #bc2c1a' : '1px solid #e0e0de',
          textAlign: 'right'
        }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '7.5pt',
            fontWeight: 700,
            color: '#bc2c1a',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            margin: 0
          }}>
            Faster Aging
          </p>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '8.5pt',
            fontWeight: 500,
            color: '#3d3d3d',
            marginTop: '2px',
            marginBottom: 0
          }}>
            1.11 – 1.50
          </p>
        </div>
      </div>
    </div>
  );
}

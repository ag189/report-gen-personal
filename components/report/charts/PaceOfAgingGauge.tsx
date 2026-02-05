'use client';

import React from 'react';

interface PaceOfAgingGaugeProps {
  dunedinPACE: number;
}

export default function PaceOfAgingGauge({ dunedinPACE }: PaceOfAgingGaugeProps) {
  // Normalize the value to percentage for the linear gauge
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

  return (
    <div style={{ width: '100%' }}>
      {/* Linear Gauge - Premium minimal design */}
      <div style={{ 
        position: 'relative',
        width: '100%',
        height: '48px',
        marginBottom: '32px'
      }}>
        {/* Background track */}
        <div style={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '100%',
          height: '4px',
          background: '#e0e0de'
        }}>
          {/* Colored segments: green (callout green), yellow, bright red */}
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '40%',
            height: '100%',
            background: '#436436' // hunter-green
          }}></div>
          <div style={{
            position: 'absolute',
            left: '40%',
            top: 0,
            width: '20%',
            height: '100%',
            background: '#1b98d6' // blue-bell (normal)
          }}></div>
          <div style={{
            position: 'absolute',
            left: '60%',
            top: 0,
            width: '40%',
            height: '100%',
            background: '#bc2c1a' // brick-ember
          }}></div>
        </div>

        {/* Position indicator - sharp triangle */}
        <div style={{
          position: 'absolute',
          left: `${percentage}%`,
          top: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
          {/* Vertical line */}
          <div style={{
            width: '2px',
            height: '32px',
            background: '#0a0a0a',
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}></div>
          {/* Diamond marker */}
          <div style={{
            width: '12px',
            height: '12px',
            background: '#0a0a0a',
            transform: 'rotate(45deg)',
            position: 'absolute',
            left: '50%',
            top: '50%',
            marginLeft: '-6px',
            marginTop: '-6px'
          }}></div>
        </div>
      </div>

      {/* Scale labels */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontFamily: "'Inter', sans-serif",
        fontSize: '9pt',
        color: '#6b6b6b',
        marginBottom: '40px'
      }}>
        <span>0.5</span>
        <span>1.0</span>
        <span>1.5</span>
      </div>

      {/* Zone indicators - minimal text labels */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: '24px',
        borderTop: '1px solid #e0e0de'
      }}>
        <div style={{ textAlign: 'left' }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '8pt',
            fontWeight: zone === 'slower' ? 600 : 400,
            color: zone === 'slower' ? '#436436' : '#6b6b6b',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            margin: 0
          }}>
            Slower Aging
          </p>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '9pt',
            fontWeight: 400,
            color: '#6b6b6b',
            marginTop: '4px'
          }}>
            Below 0.9
          </p>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '8pt',
            fontWeight: zone === 'normal' ? 600 : 400,
            color: zone === 'normal' ? '#1b98d6' : '#6b6b6b',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            margin: 0
          }}>
            Normal Pace
          </p>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '9pt',
            fontWeight: 400,
            color: '#6b6b6b',
            marginTop: '4px'
          }}>
            0.9 – 1.1
          </p>
        </div>
        
        <div style={{ textAlign: 'right' }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '8pt',
            fontWeight: zone === 'faster' ? 600 : 400,
            color: zone === 'faster' ? '#bc2c1a' : '#6b6b6b',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            margin: 0
          }}>
            Faster Aging
          </p>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '9pt',
            fontWeight: 400,
            color: '#6b6b6b',
            marginTop: '4px'
          }}>
            Above 1.1
          </p>
        </div>
      </div>
    </div>
  );
}

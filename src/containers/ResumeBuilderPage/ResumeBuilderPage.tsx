/* eslint-disable react/no-multi-comp */
import { useWindowDimensions } from '@/hooks/useWindowDimension';
import { useState } from 'react';
import { Rnd } from 'react-rnd';

// CareerCup / A4 Constants
const A4_BASE_WIDTH = 794;
const A4_BASE_HEIGHT = 1123;
const A4_RATIO = A4_BASE_WIDTH / A4_BASE_HEIGHT;

export const ResumeBuilderPage = () => {
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
  const [size, setSize] = useState(() => {
    if (windowHeight > 0) {
      const initialHeight = windowHeight * 0.9;
      const initialWidth = initialHeight * A4_RATIO;
      return { width: initialWidth, height: initialHeight };
    }
    return { width: 0, height: 0 };
  });
  const [position, setPosition] = useState(() => {
    if (windowHeight > 0 && windowWidth > 0) {
      const initialHeight = windowHeight * 0.9;
      const initialWidth = initialHeight * A4_RATIO;
      return { x: (windowWidth - initialWidth) / 2, y: (windowHeight - initialHeight) / 2 };
    }
    return { x: 0, y: 0 };
  });

  if (size.height === 0) return null;

  const scale = size.width / A4_BASE_WIDTH;

  return (
    <main
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#1a1a1a',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Workspace Boundary */}
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <Rnd
          size={size}
          position={position}
          lockAspectRatio={A4_RATIO}
          bounds='parent'
          minHeight={300}
          maxHeight={windowHeight * 0.98}
          onDragStop={(e, d) => setPosition({ x: d.x, y: d.y })}
          onResize={(e, direction, ref, delta, pos) => {
            setSize({ width: ref.offsetWidth, height: ref.offsetHeight });
            setPosition(pos);
          }}
        >
          {/* The Paper / Canvas */}
          <div
            style={{
              width: `${A4_BASE_WIDTH}px`,
              height: `${A4_BASE_HEIGHT}px`,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              backgroundColor: 'white',
              boxShadow: '0 0 40px rgba(0,0,0,0.5)',
              display: 'flex',
              flexDirection: 'column',
              padding: '48px 72px', // ~0.5in top, 0.75in sides
              boxSizing: 'border-box',
              fontFamily: 'Calibri, "Helvetica Neue", Helvetica, sans-serif',
              color: '#000',
            }}
          >
            <ResumeContent scale={scale} />
          </div>
        </Rnd>
      </div>
    </main>
  );
};

interface EditableBlockProps {
  text: string;
  style: React.CSSProperties;
  scale: number;
  onCTA: () => void;
}

const EditableBlock = ({ text, style, scale, onCTA }: EditableBlockProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      style={{ position: 'relative', width: '100%' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Floating CTA: Inverse scaled so it stays consistent size */}
      {isFocused && (
        <button
          onClick={onCTA}
          style={{
            position: 'absolute',
            left: 'calc(100% + 20px)',
            top: '50%',
            transform: `translateY(-50%) scale(${1 / scale})`,
            transformOrigin: 'left center',
            whiteSpace: 'nowrap',
            zIndex: 100,
            padding: '4px 12px',
            background: '#4f46e5',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '12px',
            cursor: 'pointer',
          }}
        >
          ✨ AI Polish
        </button>
      )}

      <div
        contentEditable
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        suppressContentEditableWarning
        style={{ outline: isHovered ? '1px dashed #4f46e5' : 'none', minHeight: '1em', ...style }}
      >
        {text}
      </div>
    </div>
  );
};

// The Actual CareerCup Layout
const ResumeContent = ({ scale }: { scale: number }) => (
  <>
    <header style={{ textAlign: 'center', marginBottom: '20px' }}>
      <EditableBlock text='FULL NAME' scale={scale} style={{ fontSize: '26px', fontWeight: 'bold' }} />
      <EditableBlock
        text='City, State | Phone | Email | LinkedIn'
        scale={scale}
        style={{ fontSize: '11px', marginTop: '4px' }}
      />
    </header>

    <section style={{ marginBottom: '15px' }}>
      <div
        style={{ borderBottom: '1px solid black', fontWeight: 'bold', fontSize: '14px', marginBottom: '5px' }}
      >
        EDUCATION
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
        <EditableBlock text='University Name' scale={scale} style={{ fontWeight: 'bold' }} />
        <EditableBlock text='Location' scale={scale} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
        <EditableBlock
          text='Degree in Major; Minor in Subject'
          scale={scale}
          style={{ fontStyle: 'italic' }}
        />
        <EditableBlock text='Graduation Date' scale={scale} />
      </div>
    </section>

    <section>
      <div
        style={{ borderBottom: '1px solid black', fontWeight: 'bold', fontSize: '14px', marginBottom: '5px' }}
      >
        EXPERIENCE
      </div>
      {/* Repeat similar blocks for Work Experience */}
    </section>
  </>
);

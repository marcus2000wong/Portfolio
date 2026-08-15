import React from 'react';

const BRAND_LOGOS = [
  { name: 'GUCCI', style: 'font-serif tracking-widest' },
  { name: 'ZARA', style: 'font-mono tracking-tighter' },
  { name: 'VOGUE', style: 'font-serif tracking-widest' },
  { name: 'SONY', style: 'font-sans tracking-widest font-black' },
  { name: 'ZALORA', style: 'font-sans tracking-widest font-semibold' },
  { name: 'ASIAPAC', style: 'font-mono tracking-wider font-bold' },
  { name: 'GL.iNET', style: 'font-sans tracking-tight font-black' },
  { name: 'MAINFRAME', style: 'font-mono tracking-widest font-extrabold' },
];

export const BrandSlider: React.FC = () => {
  const positions = [
    'col-start-1 row-start-1', 'col-start-2 row-start-2',
    'col-start-1 row-start-3', 'col-start-3 row-start-3',
    'col-start-2 row-start-4', 'col-start-3 row-start-4',
    'col-start-1 row-start-5', 'col-start-2 row-start-5',
  ];

  return (
    <div className="grid w-full max-w-[430px] grid-cols-3 grid-rows-5 gap-px overflow-hidden bg-white/10 select-none">
      {BRAND_LOGOS.map((brand, index) => (
          <div
            key={brand.name}
            className={`${positions[index]} flex aspect-square items-center justify-center bg-black/35 p-3 text-center transition-colors hover:bg-white/10`}
          >
            <span className={`text-xs text-white/55 uppercase transition-opacity hover:text-white sm:text-sm ${brand.style}`}>
              {brand.name}
            </span>
          </div>
      ))}
    </div>
  );
};

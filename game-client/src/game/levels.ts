import type { LevelDef, PointDef } from './types';

const row = (x: number, y: number, count: number, gap = 48): PointDef[] =>
  Array.from({ length: count }, (_, i) => ({ x: x + i * gap, y }));

export const levels: LevelDef[] = [
  {
    name: 'Aravalli Udaan', subtitle: 'Veer begins above the emerald hills of Bharat', theme: 'emerald', width: 4400,
    start: { x: 140, y: 560 }, portal: { x: 4250, y: 560 }, checkpoints: [{ x: 2050, y: 550 }],
    platforms: [
      { x: 0, y: 650, w: 760 }, { x: 900, y: 650, w: 620 }, { x: 1660, y: 650, w: 700 },
      { x: 2500, y: 650, w: 550 }, { x: 3210, y: 650, w: 1190 },
      { x: 430, y: 510, w: 220 }, { x: 790, y: 455, w: 180, moving: { axis: 'y', distance: 90, duration: 1800 } },
      { x: 1120, y: 500, w: 240 }, { x: 1510, y: 425, w: 220 }, { x: 1930, y: 500, w: 250 },
      { x: 2290, y: 400, w: 200, moving: { axis: 'x', distance: 130, duration: 2200 } },
      { x: 2700, y: 485, w: 240 }, { x: 3070, y: 410, w: 200 }, { x: 3450, y: 500, w: 260 },
      { x: 3850, y: 420, w: 230 }
    ],
    gems: [...row(220, 575, 6), ...row(445, 445, 4), ...row(935, 575, 7), ...row(1535, 360, 4), ...row(1960, 435, 4), ...row(2535, 575, 5), ...row(3460, 435, 5), ...row(3900, 355, 3)],
    shards: [{ x: 860, y: 360 }, { x: 2390, y: 315 }, { x: 3970, y: 335 }],
    enemies: [{ x: 620, y: 590, type: 'beetle', range: 180 }, { x: 1200, y: 590, type: 'hopper', range: 120 }, { x: 1840, y: 590, type: 'beetle', range: 180 }, { x: 2820, y: 590, type: 'hopper', range: 140 }, { x: 3520, y: 590, type: 'beetle', range: 220 }],
    hazards: [{ x: 815, y: 625 }, { x: 1575, y: 625 }, { x: 2425, y: 625 }, { x: 3125, y: 625 }]
  },
  {
    name: 'Neelam Caverns', subtitle: 'Follow the blue gemstones beneath the ancient hills', theme: 'crystal', width: 4700,
    start: { x: 120, y: 560 }, portal: { x: 4520, y: 520 }, checkpoints: [{ x: 2290, y: 530 }],
    platforms: [
      { x: 0, y: 650, w: 620 }, { x: 760, y: 650, w: 720 }, { x: 1630, y: 650, w: 590 },
      { x: 2380, y: 650, w: 720 }, { x: 3250, y: 650, w: 540 }, { x: 3920, y: 650, w: 780 },
      { x: 520, y: 500, w: 190 }, { x: 880, y: 430, w: 230 }, { x: 1260, y: 340, w: 190, moving: { axis: 'y', distance: 120, duration: 2200 } },
      { x: 1510, y: 500, w: 220 }, { x: 1900, y: 410, w: 220 }, { x: 2200, y: 320, w: 190 },
      { x: 2650, y: 470, w: 250 }, { x: 3050, y: 370, w: 180, moving: { axis: 'x', distance: 150, duration: 2100 } },
      { x: 3460, y: 470, w: 230 }, { x: 3800, y: 360, w: 200 }, { x: 4200, y: 480, w: 280 }
    ],
    gems: [...row(180, 575, 5), ...row(790, 575, 7), ...row(905, 365, 4), ...row(1665, 575, 6), ...row(1925, 345, 4), ...row(2415, 575, 7), ...row(3290, 575, 5), ...row(3955, 575, 7)],
    shards: [{ x: 1345, y: 255 }, { x: 2260, y: 235 }, { x: 3890, y: 275 }],
    enemies: [{ x: 450, y: 590, type: 'roller', range: 190 }, { x: 970, y: 590, type: 'beetle', range: 220 }, { x: 1760, y: 590, type: 'hopper' }, { x: 2730, y: 590, type: 'roller', range: 220 }, { x: 3500, y: 590, type: 'beetle' }, { x: 4080, y: 590, type: 'hopper' }],
    hazards: [{ x: 680, y: 625 }, { x: 1535, y: 625 }, { x: 2300, y: 625 }, { x: 3165, y: 625 }, { x: 3850, y: 625 }]
  },
  {
    name: 'Surya Fort Ruins', subtitle: 'Outrun the desert wind through a forgotten sky-fort', theme: 'sunset', width: 4900,
    start: { x: 120, y: 560 }, portal: { x: 4730, y: 520 }, checkpoints: [{ x: 2450, y: 520 }],
    platforms: [
      { x: 0, y: 650, w: 560 }, { x: 710, y: 650, w: 500 }, { x: 1360, y: 650, w: 560 },
      { x: 2090, y: 650, w: 520 }, { x: 2760, y: 650, w: 470 }, { x: 3380, y: 650, w: 600 }, { x: 4130, y: 650, w: 770 },
      { x: 450, y: 490, w: 200 }, { x: 770, y: 390, w: 180 }, { x: 1100, y: 290, w: 190, moving: { axis: 'x', distance: 150, duration: 1800 } },
      { x: 1450, y: 480, w: 230 }, { x: 1780, y: 370, w: 190 }, { x: 2040, y: 275, w: 180 },
      { x: 2420, y: 460, w: 230 }, { x: 2730, y: 345, w: 180, moving: { axis: 'y', distance: 130, duration: 1900 } },
      { x: 3110, y: 430, w: 210 }, { x: 3510, y: 315, w: 190 }, { x: 3880, y: 430, w: 220 }, { x: 4320, y: 360, w: 250 }
    ],
    gems: [...row(150, 575, 5), ...row(730, 575, 5), ...row(790, 325, 3), ...row(1390, 575, 5), ...row(1810, 305, 3), ...row(2120, 575, 5), ...row(2800, 575, 4), ...row(3410, 575, 6), ...row(4160, 575, 7)],
    shards: [{ x: 1170, y: 205 }, { x: 2810, y: 255 }, { x: 4430, y: 275 }],
    enemies: [{ x: 350, y: 590, type: 'beetle' }, { x: 840, y: 590, type: 'hopper' }, { x: 1540, y: 590, type: 'roller' }, { x: 2180, y: 590, type: 'beetle' }, { x: 2900, y: 590, type: 'hopper' }, { x: 3630, y: 590, type: 'roller' }, { x: 4320, y: 590, type: 'beetle' }],
    hazards: [{ x: 630, y: 625 }, { x: 1280, y: 625 }, { x: 2000, y: 625 }, { x: 2690, y: 625 }, { x: 3310, y: 625 }, { x: 4050, y: 625 }]
  },
  {
    name: 'Himadri Peaks', subtitle: 'Cross the moonlit snow beyond the northern mountains', theme: 'frost', width: 5000,
    start: { x: 120, y: 560 }, portal: { x: 4820, y: 520 }, checkpoints: [{ x: 2500, y: 530 }],
    platforms: [
      { x: 0, y: 650, w: 520 }, { x: 670, y: 650, w: 560 }, { x: 1390, y: 650, w: 480 }, { x: 2030, y: 650, w: 530 },
      { x: 2720, y: 650, w: 490 }, { x: 3370, y: 650, w: 500 }, { x: 4030, y: 650, w: 970 },
      { x: 430, y: 490, w: 180 }, { x: 760, y: 390, w: 190, moving: { axis: 'y', distance: 110, duration: 1900 } },
      { x: 1080, y: 300, w: 170 }, { x: 1450, y: 470, w: 210 }, { x: 1780, y: 350, w: 180 },
      { x: 2110, y: 260, w: 180, moving: { axis: 'x', distance: 160, duration: 1900 } }, { x: 2470, y: 450, w: 220 },
      { x: 2830, y: 340, w: 190 }, { x: 3210, y: 250, w: 170 }, { x: 3520, y: 450, w: 220 },
      { x: 3900, y: 340, w: 190 }, { x: 4310, y: 450, w: 240 }
    ],
    gems: [...row(140, 575, 5), ...row(700, 575, 5), ...row(785, 325, 3), ...row(1415, 575, 4), ...row(2055, 575, 5), ...row(2750, 575, 4), ...row(3400, 575, 4), ...row(4060, 575, 8)],
    shards: [{ x: 1140, y: 215 }, { x: 3280, y: 165 }, { x: 4420, y: 365 }],
    enemies: [{ x: 340, y: 590, type: 'roller' }, { x: 820, y: 590, type: 'beetle' }, { x: 1480, y: 590, type: 'hopper' }, { x: 2170, y: 590, type: 'roller' }, { x: 2850, y: 590, type: 'beetle' }, { x: 3490, y: 590, type: 'hopper' }, { x: 4210, y: 590, type: 'roller' }],
    hazards: [{ x: 590, y: 625 }, { x: 1310, y: 625 }, { x: 1950, y: 625 }, { x: 2640, y: 625 }, { x: 3290, y: 625 }, { x: 3950, y: 625 }]
  },
  {
    name: 'Kamal Stepwells', subtitle: 'Race the monsoon through enchanted lotus ghats', theme: 'lotus', width: 5100,
    start: { x: 120, y: 560 }, portal: { x: 4930, y: 520 }, checkpoints: [{ x: 2520, y: 530 }],
    platforms: [
      { x: 0, y: 650, w: 600 }, { x: 760, y: 650, w: 540 }, { x: 1450, y: 650, w: 520 }, { x: 2120, y: 650, w: 540 },
      { x: 2810, y: 650, w: 530 }, { x: 3490, y: 650, w: 560 }, { x: 4200, y: 650, w: 900 },
      { x: 460, y: 490, w: 180 }, { x: 780, y: 390, w: 190, moving: { axis: 'y', distance: 120, duration: 1750 } },
      { x: 1110, y: 300, w: 180 }, { x: 1490, y: 470, w: 220 }, { x: 1820, y: 350, w: 190 },
      { x: 2190, y: 260, w: 180, moving: { axis: 'x', distance: 155, duration: 1800 } }, { x: 2540, y: 450, w: 220 },
      { x: 2890, y: 330, w: 190 }, { x: 3270, y: 250, w: 180 }, { x: 3610, y: 450, w: 230 },
      { x: 3990, y: 340, w: 190 }, { x: 4400, y: 450, w: 240 }
    ],
    gems: [...row(150, 575, 6), ...row(790, 575, 5), ...row(800, 325, 3), ...row(1480, 575, 5), ...row(2145, 575, 5), ...row(2840, 575, 5), ...row(3520, 575, 6), ...row(4230, 575, 8)],
    shards: [{ x: 1170, y: 215 }, { x: 3350, y: 165 }, { x: 4510, y: 365 }],
    enemies: [{ x: 380, y: 590, type: 'hopper' }, { x: 900, y: 590, type: 'beetle' }, { x: 1540, y: 590, type: 'roller' }, { x: 2260, y: 590, type: 'hopper' }, { x: 2940, y: 590, type: 'beetle' }, { x: 3640, y: 590, type: 'roller' }, { x: 4380, y: 590, type: 'hopper' }],
    hazards: [{ x: 675, y: 625 }, { x: 1375, y: 625 }, { x: 2045, y: 625 }, { x: 2735, y: 625 }, { x: 3415, y: 625 }, { x: 4125, y: 625 }]
  },
  {
    name: 'Thar Sky Palace', subtitle: 'Ride the golden wind beyond the floating dunes', theme: 'desert', width: 5250,
    start: { x: 120, y: 560 }, portal: { x: 5070, y: 520 }, checkpoints: [{ x: 2600, y: 520 }],
    platforms: [
      { x: 0, y: 650, w: 560 }, { x: 710, y: 650, w: 520 }, { x: 1380, y: 650, w: 520 }, { x: 2050, y: 650, w: 550 },
      { x: 2750, y: 650, w: 500 }, { x: 3400, y: 650, w: 560 }, { x: 4110, y: 650, w: 1140 },
      { x: 430, y: 480, w: 200 }, { x: 760, y: 360, w: 180, moving: { axis: 'x', distance: 145, duration: 1650 } },
      { x: 1080, y: 250, w: 180 }, { x: 1450, y: 460, w: 220 }, { x: 1800, y: 335, w: 180, moving: { axis: 'y', distance: 125, duration: 1700 } },
      { x: 2160, y: 430, w: 220 }, { x: 2520, y: 300, w: 180 }, { x: 2880, y: 430, w: 210 },
      { x: 3230, y: 295, w: 180, moving: { axis: 'x', distance: 170, duration: 1650 } }, { x: 3600, y: 445, w: 220 },
      { x: 3970, y: 320, w: 190 }, { x: 4360, y: 450, w: 250 }, { x: 4740, y: 345, w: 190 }
    ],
    gems: [...row(140, 575, 5), ...row(735, 575, 5), ...row(785, 295, 3), ...row(1410, 575, 5), ...row(2080, 575, 6), ...row(2780, 575, 5), ...row(3430, 575, 6), ...row(4140, 575, 8)],
    shards: [{ x: 1140, y: 165 }, { x: 3300, y: 205 }, { x: 4820, y: 260 }],
    enemies: [{ x: 360, y: 590, type: 'roller' }, { x: 830, y: 590, type: 'beetle' }, { x: 1490, y: 590, type: 'hopper' }, { x: 2180, y: 590, type: 'roller' }, { x: 2860, y: 590, type: 'beetle' }, { x: 3540, y: 590, type: 'roller' }, { x: 4290, y: 590, type: 'hopper' }],
    hazards: [{ x: 635, y: 625 }, { x: 1305, y: 625 }, { x: 1975, y: 625 }, { x: 2675, y: 625 }, { x: 3325, y: 625 }, { x: 4035, y: 625 }]
  },
  {
    name: 'Meghraj Citadel', subtitle: 'Face Gravox in the heart of the monsoon storm', theme: 'storm', width: 5400,
    start: { x: 120, y: 560 }, portal: { x: 5200, y: 520 }, checkpoints: [{ x: 2500, y: 530 }, { x: 4300, y: 530 }], boss: true,
    platforms: [
      { x: 0, y: 650, w: 590 }, { x: 730, y: 650, w: 520 }, { x: 1390, y: 650, w: 520 }, { x: 2050, y: 650, w: 600 },
      { x: 2790, y: 650, w: 520 }, { x: 3450, y: 650, w: 600 }, { x: 4190, y: 650, w: 1210 },
      { x: 480, y: 470, w: 190 }, { x: 790, y: 350, w: 180, moving: { axis: 'x', distance: 150, duration: 1600 } },
      { x: 1100, y: 260, w: 180 }, { x: 1450, y: 460, w: 210 }, { x: 1770, y: 330, w: 180, moving: { axis: 'y', distance: 130, duration: 1700 } },
      { x: 2130, y: 430, w: 220 }, { x: 2500, y: 300, w: 180 }, { x: 2860, y: 430, w: 210 },
      { x: 3210, y: 300, w: 180, moving: { axis: 'x', distance: 160, duration: 1700 } }, { x: 3560, y: 450, w: 230 },
      { x: 3920, y: 330, w: 190 }, { x: 4320, y: 470, w: 210 }
    ],
    gems: [...row(150, 575, 5), ...row(760, 575, 5), ...row(810, 285, 3), ...row(1420, 575, 5), ...row(2080, 575, 6), ...row(2820, 575, 5), ...row(3480, 575, 6), ...row(4220, 575, 5)],
    shards: [{ x: 1170, y: 175 }, { x: 2580, y: 215 }, { x: 4000, y: 245 }],
    enemies: [{ x: 390, y: 590, type: 'beetle' }, { x: 850, y: 590, type: 'roller' }, { x: 1510, y: 590, type: 'hopper' }, { x: 2180, y: 590, type: 'roller' }, { x: 2910, y: 590, type: 'beetle' }, { x: 3610, y: 590, type: 'roller' }],
    hazards: [{ x: 660, y: 625 }, { x: 1320, y: 625 }, { x: 1980, y: 625 }, { x: 2720, y: 625 }, { x: 3380, y: 625 }, { x: 4120, y: 625 }]
  }
];

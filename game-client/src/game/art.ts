import Phaser from 'phaser';
import type { SkinId } from './types';
import { skinTexture } from './skins';

export const palette = {
  emerald: { sky: 0x7cd7dc, haze: 0xd8f5df, far: 0x5aa69a, near: 0x236b62, ground: 0x294b3c, top: 0x65d16e, accent: 0xffd45c },
  crystal: { sky: 0x141a3f, haze: 0x493d82, far: 0x2c2d64, near: 0x191b42, ground: 0x24264f, top: 0x7e7ee8, accent: 0x6df5ff },
  sunset: { sky: 0xff9966, haze: 0xffd28e, far: 0xb65b67, near: 0x563d5f, ground: 0x4d3546, top: 0xe2b35d, accent: 0xfff1a3 },
  frost: { sky: 0x9dddf2, haze: 0xe7fbff, far: 0x74aeca, near: 0x3f7197, ground: 0x305375, top: 0xe9fbff, accent: 0x79f2ff },
  storm: { sky: 0x171a35, haze: 0x5d4c7d, far: 0x30284f, near: 0x17162d, ground: 0x242238, top: 0x735a92, accent: 0xf2d65c },
  lotus: { sky: 0x84c9b7, haze: 0xf5b6c8, far: 0x557c70, near: 0x294b46, ground: 0x5a3d37, top: 0xe9a66d, accent: 0xffcf77 },
  desert: { sky: 0xf6a45f, haze: 0xffd995, far: 0xb96649, near: 0x673b43, ground: 0x674238, top: 0xe4a457, accent: 0xffe18a },
};

function texture(scene: Phaser.Scene, key: string, w: number, h: number, draw: (g: Phaser.GameObjects.Graphics) => void): void {
  if (scene.textures.exists(key)) return;
  const g = scene.add.graphics();
  draw(g);
  g.generateTexture(key, w, h);
  g.destroy();
}

export function generateTextures(scene: Phaser.Scene): void {
  const colors: Record<SkinId, { coat: number; dark: number; scarf: number; trim: number; glow: number; head: number }> = {
    veer: { coat: 0x27448a, dark: 0x17294f, scarf: 0xf28c28, trim: 0xffc95c, glow: 0x62f5ff, head: 0xf28c28 },
    rajput: { coat: 0x8f273d, dark: 0x4a1727, scarf: 0xd9a441, trim: 0xffdd7d, glow: 0xffd45c, head: 0xb93746 },
    monsoon: { coat: 0x087f83, dark: 0x084a5b, scarf: 0x9fe8e2, trim: 0xd7fbff, glow: 0x62f5ff, head: 0x1aa6aa },
    shadow: { coat: 0x272142, dark: 0x11101f, scarf: 0x8d5bc9, trim: 0xca98ff, glow: 0xbb7dff, head: 0x4a326b },
  };
  const hero = (skin: SkinId, frame: 'idle' | 'run1' | 'run2' | 'jump', leftLeg = 11, rightLeg = 28, armY = 25) => texture(scene, skinTexture(skin, frame), 50, 64, g => {
    const c = colors[skin];
    g.fillStyle(c.dark).fillRoundedRect(leftLeg, 43, 10, 17, 4).fillRoundedRect(rightLeg, 43, 10, 17, 4);
    g.fillStyle(c.trim).fillRoundedRect(leftLeg - 2, 57, 15, 6, 3).fillRoundedRect(rightLeg - 2, 57, 15, 6, 3);
    g.fillStyle(c.coat).fillRoundedRect(7, 22, 35, 29, 8);
    g.fillStyle(c.dark).fillTriangle(8, 48, 25, 24, 31, 50);
    g.lineStyle(2, c.trim, .95).lineBetween(23, 25, 30, 48).lineBetween(13, 35, 36, 35);
    g.fillStyle(c.dark).fillRoundedRect(36, armY, 10, 22, 4);
    g.fillStyle(c.scarf).fillRoundedRect(7, 21, 30, 5, 2).fillTriangle(3, 24, 24, 27, 6, 39);
    g.fillStyle(0xc67f5a).fillCircle(25, 14, 13);
    g.fillStyle(0x2b2024).fillRoundedRect(13, 4, 25, 8, 4).fillTriangle(10, 12, 39, 7, 18, 1);
    g.fillStyle(c.head).fillRoundedRect(12, 7, 27, 5, 2);
    if (skin === 'rajput') g.fillStyle(c.head).fillCircle(27, 4, 8).fillTriangle(32, 1, 42, 7, 31, 9);
    g.fillStyle(0x172033).fillCircle(21, 15, 2).fillCircle(30, 15, 2);
    g.fillStyle(c.scarf).fillRoundedRect(24, 9, 3, 7, 1);
    g.lineStyle(2, 0x8f493e).beginPath().arc(26, 18, 4, .2, 2.7).strokePath();
    g.fillStyle(c.glow, .35).fillCircle(40, 35, 7); g.fillStyle(c.glow).fillCircle(40, 35, 4);
  });
  (Object.keys(colors) as SkinId[]).forEach(skin => {
    hero(skin, 'idle'); hero(skin, 'run1', 7, 31, 21); hero(skin, 'run2', 15, 23, 29); hero(skin, 'jump', 8, 30, 17);
  });
  texture(scene, 'coin', 32, 32, g => {
    g.fillStyle(0xffdf66, .22).fillCircle(16, 16, 16);
    g.fillStyle(0xb87922).fillCircle(16, 16, 13);
    g.fillStyle(0xffdc58).fillCircle(16, 16, 10);
    g.lineStyle(2, 0xfff1a0).strokeCircle(16, 16, 8);
    g.fillStyle(0xb87922).fillTriangle(15, 8, 22, 16, 15, 24).fillTriangle(15, 8, 10, 16, 15, 24);
    g.fillStyle(0xffffff, .55).fillCircle(11, 10, 2);
  });
  texture(scene, 'shard', 34, 46, g => {
    g.fillStyle(0xffe783, .25).fillCircle(17, 23, 17);
    g.fillStyle(0xfff2aa).fillTriangle(17, 1, 31, 17, 18, 44).fillTriangle(17, 1, 5, 20, 18, 44);
    g.fillStyle(0xffc84a).fillTriangle(17, 6, 26, 18, 18, 38);
  });
  texture(scene, 'heart', 30, 28, g => {
    g.fillStyle(0xff5f79).fillCircle(9, 9, 8).fillCircle(21, 9, 8).fillTriangle(2, 10, 28, 10, 15, 27);
    g.fillStyle(0xffa0ae).fillCircle(8, 7, 3);
  });
  texture(scene, 'hopper', 42, 38, g => {
    g.fillStyle(0x31523b).fillRoundedRect(5, 13, 32, 23, 10);
    g.fillStyle(0x6bd35f).fillCircle(13, 13, 9).fillCircle(29, 13, 9);
    g.fillStyle(0xffffff).fillCircle(14, 14, 4).fillCircle(28, 14, 4);
    g.fillStyle(0x1c2431).fillCircle(15, 15, 2).fillCircle(27, 15, 2);
    g.lineStyle(3, 0x1c3828).lineBetween(10, 35, 4, 38).lineBetween(32, 35, 38, 38);
  });
  texture(scene, 'beetle', 48, 34, g => {
    g.fillStyle(0x362f53).fillRoundedRect(4, 5, 40, 27, 14);
    g.fillStyle(0xab69d4).fillRoundedRect(7, 4, 34, 22, 12);
    g.lineStyle(3, 0x5c367b).lineBetween(24, 5, 24, 27);
    g.fillStyle(0xffe784).fillCircle(13, 15, 3).fillCircle(35, 15, 3);
  });
  texture(scene, 'roller', 42, 42, g => {
    g.fillStyle(0x9b6f55).fillCircle(21, 21, 20);
    g.lineStyle(4, 0x5b4350).strokeCircle(21, 21, 14).lineBetween(10, 10, 32, 32).lineBetween(32, 10, 10, 32);
    g.fillStyle(0xffdf75).fillCircle(15, 16, 3).fillCircle(27, 16, 3);
  });
  texture(scene, 'wisp', 42, 42, g => {
    g.fillStyle(0x8df7ff, .3).fillCircle(21, 21, 20);
    g.fillStyle(0xbdfbff).fillCircle(21, 18, 13).fillTriangle(9, 21, 33, 21, 21, 41);
    g.fillStyle(0x224261).fillCircle(17, 17, 2).fillCircle(25, 17, 2);
  });
  texture(scene, 'spike', 46, 28, g => {
    g.fillStyle(0x253343).fillTriangle(1, 28, 12, 2, 23, 28).fillTriangle(15, 28, 28, 0, 41, 28);
    g.fillStyle(0x9fb7c7).fillTriangle(4, 27, 12, 7, 20, 27).fillTriangle(19, 27, 28, 5, 37, 27);
  });
  texture(scene, 'checkpoint', 34, 90, g => {
    g.fillStyle(0xb9c4ce).fillRoundedRect(6, 3, 6, 84, 3);
    g.fillStyle(0x1d5062).fillTriangle(12, 8, 33, 18, 12, 31);
    g.fillStyle(0x6df5ff).fillCircle(9, 8, 6);
    g.fillStyle(0x263746).fillRoundedRect(0, 83, 22, 7, 3);
  });
  texture(scene, 'portal', 84, 118, g => {
    g.lineStyle(12, 0x334761, 1).strokeRoundedRect(7, 7, 70, 108, 34);
    g.lineStyle(6, 0x6df5ff, 1).strokeRoundedRect(12, 12, 60, 98, 29);
    g.fillStyle(0x5adfe8, .28).fillRoundedRect(18, 18, 48, 86, 24);
    g.fillStyle(0xffffff, .7).fillCircle(30, 42, 4).fillCircle(52, 71, 3).fillCircle(36, 88, 2);
  });
  texture(scene, 'boss', 112, 104, g => {
    g.fillStyle(0x241d3c).fillRoundedRect(10, 25, 92, 72, 28);
    g.fillStyle(0x64427e).fillCircle(56, 42, 38);
    g.fillStyle(0xad74d0).fillTriangle(20, 30, 8, 2, 40, 22).fillTriangle(72, 22, 103, 2, 91, 32);
    g.fillStyle(0xffdc62).fillCircle(41, 42, 7).fillCircle(71, 42, 7);
    g.fillStyle(0x37233d).fillCircle(42, 43, 3).fillCircle(70, 43, 3);
    g.fillStyle(0x151827).fillRoundedRect(36, 62, 40, 11, 5);
    g.fillStyle(0xe6edf4).fillTriangle(42, 63, 49, 75, 55, 63).fillTriangle(60, 63, 67, 75, 72, 63);
  });
  texture(scene, 'bolt', 24, 48, g => {
    g.fillStyle(0xffe766).fillPoints([{x:14,y:0},{x:3,y:27},{x:12,y:26},{x:8,y:48},{x:22,y:19},{x:13,y:20}], true);
  });
}

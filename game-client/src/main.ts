import Phaser from 'phaser';
import './styles.css';
import { levels } from './game/levels';
import { generateTextures, palette } from './game/art';
import { skinCatalog, skinTexture } from './game/skins';
import { audio } from './game/audio';
import { clearSave, loadSave, writeSave } from './game/save';
import { validateGameData } from './game/validate';
import type { LevelDef, SaveData, SkinId } from './game/types';

const W = 1280;
const H = 720;
let save: SaveData = loadSave();
audio.setMuted(save.muted);

const font = 'Nunito, Arial Rounded MT Bold, Arial, sans-serif';
const titleFont = 'Impact, Arial Black, sans-serif';

function label(scene: Phaser.Scene, x: number, y: number, text: string, size = 24, color = '#ffffff'): Phaser.GameObjects.Text {
  return scene.add.text(x, y, text, { fontFamily: font, fontSize: `${size}px`, fontStyle: 'bold', color, stroke: '#09111f', strokeThickness: 5 }).setOrigin(.5);
}

function addButton(scene: Phaser.Scene, x: number, y: number, text: string, action: () => void, width = 280): Phaser.GameObjects.Container {
  const bg = scene.add.rectangle(0, 0, width, 58, 0x10263d, .96).setStrokeStyle(2, 0x73f3e6, .9);
  const shine = scene.add.rectangle(-width / 2 + 5, -24, 5, 48, 0x73f3e6, .85).setOrigin(0);
  const txt = scene.add.text(0, 0, text, { fontFamily: font, fontSize: '20px', fontStyle: 'bold', color: '#ffffff' }).setOrigin(.5);
  const c = scene.add.container(x, y, [bg, shine, txt]).setSize(width, 58).setInteractive({ useHandCursor: true });
  c.on('pointerover', () => { bg.setFillStyle(0x16475a, 1); c.setScale(1.035); audio.tone(390, .04, 'sine', .015); });
  c.on('pointerout', () => { bg.setFillStyle(0x10263d, .96); c.setScale(1); });
  c.on('pointerdown', () => { c.setScale(.98); audio.tone(560, .06, 'triangle', .025); });
  c.on('pointerup', () => { c.setScale(1.035); action(); });
  return c;
}

class BootScene extends Phaser.Scene {
  constructor() { super('Boot'); }
  preload(): void {
    this.load.image('bg-emerald', 'worlds/emerald-heights.webp');
    this.load.image('bg-crystal', 'worlds/crystal-caverns.webp');
    this.load.image('bg-sunset', 'worlds/sunset-ruins.webp');
    this.load.image('bg-frost', 'worlds/frostpeak-isles.webp');
    this.load.image('bg-lotus', 'worlds/lotus-ghats.webp');
    this.load.image('bg-desert', 'worlds/thar-sky-palace.webp');
    this.load.image('bg-storm', 'worlds/storm-citadel.webp');
  }
  create(): void {
    validateGameData(levels, skinCatalog.map(s => s.id));
    generateTextures(this);
    this.scene.start('Menu');
  }
}

class MenuScene extends Phaser.Scene {
  private stars: Phaser.GameObjects.Arc[] = [];
  private wardrobe?: Phaser.GameObjects.Container;
  constructor() { super('Menu'); }

  create(): void {
    audio.stopMusic();
    this.cameras.main.setBackgroundColor(0x07111f);
    for (let i = 0; i < 95; i++) {
      const s = this.add.circle(Phaser.Math.Between(0, W), Phaser.Math.Between(0, H), Phaser.Math.Between(1, 3), 0xa8f8ff, Phaser.Math.FloatBetween(.15, .8));
      this.stars.push(s);
    }
    this.add.circle(1010, 135, 160, 0xf08b32, .12);
    this.add.circle(1010, 135, 110, 0x6df5ff, .07).setStrokeStyle(3, 0xf2a149, .28);
    this.add.polygon(0, 0, [{x:0,y:660},{x:230,y:470},{x:470,y:660}], 0x102c3a).setOrigin(0);
    this.add.polygon(330, 0, [{x:0,y:660},{x:300,y:410},{x:660,y:660}], 0x0d2433).setOrigin(0);
    this.add.polygon(820, 0, [{x:0,y:660},{x:260,y:450},{x:560,y:660}], 0x0b1d2c).setOrigin(0);
    this.add.rectangle(W / 2, 676, W, 88, 0x061019);

    this.add.text(70, 62, 'AETHER RUN', { fontFamily: titleFont, fontSize: '76px', color: '#ffffff', stroke: '#0b1d2d', strokeThickness: 12, letterSpacing: 3 });
    this.add.text(76, 143, 'V E E R  â€¢  S K Y B O U N D', { fontFamily: font, fontSize: '20px', color: '#f3a24a', fontStyle: 'bold', letterSpacing: 6 });
    this.add.text(76, 190, 'An original Indian-fantasy platform adventure', { fontFamily: font, fontSize: '18px', color: '#9eb5c8' });
    this.add.text(76, 222, 'Collect Surya Coins â€¢ Recover 21 Sky Shards â€¢ Defeat Gravox', { fontFamily: font, fontSize: '14px', color: '#67859a' });

    const hero = this.add.image(1010, 342, skinTexture(save.selectedSkin)).setScale(3.15).setRotation(-.06);
    this.tweens.add({ targets: hero, y: 324, angle: 3, duration: 1700, yoyo: true, repeat: -1, ease: 'Sine.inOut' });
    const scarf = this.add.triangle(845, 340, 0, 10, 125, 0, 104, 28, 0xf28c28, .8).setAngle(-7);
    this.tweens.add({ targets: scarf, scaleX: .8, alpha: .5, duration: 900, yoyo: true, repeat: -1 });
    label(this, 1010, 475, skinCatalog.find(s => s.id === save.selectedSkin)?.name ?? 'VEER', 16, '#ffd27c');
    this.add.text(1010, 503, `â— ${save.wallet} SURYA COINS   â—† ${save.totalShards}/21 SHARDS`, { fontFamily: font, fontSize: '14px', color: '#b9cbd7', fontStyle: 'bold' }).setOrigin(.5);

    addButton(this, 225, 305, save.completed.some(Boolean) || save.unlocked > 0 ? 'CONTINUE JOURNEY' : 'START JOURNEY', () => this.scene.start('Play', { level: save.unlocked }), 300);
    addButton(this, 225, 373, 'NEW ADVENTURE', () => {
      const skin = save.selectedSkin; const unlockedSkins = [...save.unlockedSkins]; const wallet = save.wallet;
      save = clearSave(); save.selectedSkin = skin; save.unlockedSkins = unlockedSkins; save.wallet = wallet; writeSave(save);
      audio.setMuted(false); this.scene.start('Play', { level: 0 });
    }, 300);
    addButton(this, 225, 441, 'WARDROBE & SKINS', () => this.showWardrobe(), 300);
    addButton(this, 225, 509, save.muted ? 'SOUND: OFF' : 'SOUND: ON', () => {
      save.muted = !save.muted; audio.setMuted(save.muted); writeSave(save); this.scene.restart();
    }, 300);

    this.add.text(76, 567, 'BHARAT SKY MAP â€¢ 7 ROUNDS', { fontFamily: font, fontSize: '13px', color: '#6f8da4', fontStyle: 'bold', letterSpacing: 2 });
    this.add.line(0, 0, 98, 626, 558, 626, 0xf3a24a, .28).setOrigin(0);
    const mapName = this.add.text(330, 675, 'Select an unlocked round', { fontFamily: font, fontSize: '13px', color: '#6f8da4', fontStyle: 'bold' }).setOrigin(.5);
    levels.forEach((lvl, i) => {
      const unlocked = i <= save.unlocked;
      const x = 100 + i * 77;
      const circle = this.add.circle(x, 626, 24, unlocked ? 0x4a3025 : 0x111923, 1).setStrokeStyle(2, unlocked ? 0xf3a24a : 0x34414f);
      this.add.text(x, 626, unlocked ? `${i + 1}` : 'Ã—', { fontFamily: font, fontSize: '17px', fontStyle: 'bold', color: unlocked ? '#ffffff' : '#65717e' }).setOrigin(.5);
      if (save.completed[i]) this.add.star(x + 20, 605, 5, 3, 8, 0xffdb68).setAngle(-12);
      if (unlocked) circle.setInteractive({ useHandCursor: true }).on('pointerup', () => this.scene.start('Play', { level: i }));
      circle.on('pointerover', () => mapName.setText(unlocked ? `ROUND ${i + 1} â€¢ ${lvl.name}` : 'Complete the previous round to unlock'));
      circle.on('pointerout', () => mapName.setText('Select an unlocked round'));
    });

    this.add.text(830, 565, 'CREATED BY PRUTHVIRAJSINH MAKWANA', { fontFamily: font, fontSize: '12px', color: '#6f8da4', fontStyle: 'bold', letterSpacing: 1 });
    this.socialButton(850, 607, 'GITHUB', 'https://github.com/PruthvirajsinhMakwana');
    this.socialButton(985, 607, 'INSTAGRAM', 'https://www.instagram.com/pruthvirajsinh__makwana?igsh=Y2p4cTZzc2pza3d6&utm_source=qr');
    this.socialButton(1135, 607, 'LINKEDIN', 'https://www.linkedin.com/in/pruthvirajsinh-makwana-635974393?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app');
    this.add.text(W - 28, H - 24, 'Original Indian-fantasy art â€¢ Open-source engine â€¢ v2.0', { fontFamily: font, fontSize: '12px', color: '#527086' }).setOrigin(1);
    this.input.once('pointerdown', () => audio.unlock());
  }

  private socialButton(x: number, y: number, text: string, url: string): void {
    const bg = this.add.rectangle(x, y, 122, 38, 0x0d1b29, .9).setStrokeStyle(1, 0xf3a24a, .6).setInteractive({ useHandCursor: true });
    this.add.text(x, y, text, { fontFamily: font, fontSize: '11px', fontStyle: 'bold', color: '#dbe8ef', letterSpacing: 1 }).setOrigin(.5);
    bg.on('pointerover', () => bg.setFillStyle(0x4a3025, 1));
    bg.on('pointerout', () => bg.setFillStyle(0x0d1b29, .9));
    bg.on('pointerup', () => window.open(url, '_blank', 'noopener,noreferrer'));
  }

  private showWardrobe(): void {
    if (this.wardrobe) return;
    const modal = this.add.container(0, 0).setDepth(100);
    modal.add(this.add.rectangle(W / 2, H / 2, W, H, 0x03070e, .94).setInteractive());
    modal.add(label(this, W / 2, 70, 'VEERâ€™S WARDROBE', 38, '#ffffff'));
    modal.add(label(this, W / 2, 112, `Wallet: ${save.wallet} Surya Coins`, 16, '#ffd27c'));
    skinCatalog.forEach((skin, i) => {
      const x = 190 + i * 300;
      const unlocked = save.unlockedSkins.includes(skin.id);
      const selected = save.selectedSkin === skin.id;
      const card = this.add.rectangle(x, 330, 250, 350, selected ? 0x4a3025 : 0x0d1b29, .98).setStrokeStyle(2, selected ? 0xffd27c : 0x315064, .9);
      const preview = this.add.image(x, 270, skinTexture(skin.id)).setScale(2.45);
      const name = label(this, x, 405, skin.name, 18, selected ? '#ffd27c' : '#ffffff');
      const desc = this.add.text(x, 438, skin.tagline, { fontFamily: font, fontSize: '12px', color: '#8fa8b9', align: 'center', wordWrap: { width: 205 } }).setOrigin(.5);
      const button = addButton(this, x, 506, selected ? 'EQUIPPED' : unlocked ? 'EQUIP' : `UNLOCK â€¢ ${skin.price}`, () => this.chooseSkin(skin.id, skin.price), 205);
      modal.add([card, preview, name, desc, button]);
    });
    const close = addButton(this, W / 2, 625, 'BACK TO HOME', () => { modal.destroy(true); this.wardrobe = undefined; }, 260);
    modal.add(close); this.wardrobe = modal;
  }

  private chooseSkin(id: SkinId, price: number): void {
    if (!save.unlockedSkins.includes(id)) {
      if (save.wallet < price) { audio.hurt(); return; }
      save.wallet -= price; save.unlockedSkins.push(id); audio.shard();
    }
    save.selectedSkin = id; writeSave(save); this.scene.restart();
  }

  update(_: number, delta: number): void {
    this.stars.forEach((s, i) => { s.x -= delta * (.003 + (i % 4) * .002); if (s.x < 0) s.x = W; });
  }
}

type ArcadeSprite = Phaser.Physics.Arcade.Sprite;

class PlayScene extends Phaser.Scene {
  private levelIndex = 0;
  private def!: LevelDef;
  private player!: ArcadeSprite;
  private platforms!: Phaser.Physics.Arcade.Group;
  private enemies!: Phaser.Physics.Arcade.Group;
  private gems!: Phaser.Physics.Arcade.StaticGroup;
  private shards!: Phaser.Physics.Arcade.StaticGroup;
  private hazards!: Phaser.Physics.Arcade.StaticGroup;
  private checkpoints!: Phaser.Physics.Arcade.StaticGroup;
  private portal!: ArcadeSprite;
  private boss?: ArcadeSprite;
  private bolts!: Phaser.Physics.Arcade.Group;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private keys!: Record<string, Phaser.Input.Keyboard.Key>;
  private moveLeft = false;
  private moveRight = false;
  private jumpHeld = false;
  private jumpPressed = false;
  private dashPressed = false;
  private downPressed = false;
  private health = 3;
  private score = 0;
  private gemCount = 0;
  private shardCount = 0;
  private elapsed = 0;
  private coyote = 0;
  private jumpBuffer = 0;
  private airJumps = 0;
  private invulnerable = 0;
  private dashCooldown = 0;
  private facing = 1;
  private respawn = { x: 0, y: 0 };
  private finished = false;
  private paused = false;
  private hud!: Phaser.GameObjects.Text;
  private ability!: Phaser.GameObjects.Text;
  private bossBar?: Phaser.GameObjects.Rectangle;
  private pauseLayer?: Phaser.GameObjects.Container;
  private touchButtons: Phaser.GameObjects.GameObject[] = [];
  private wasGrounded = true;
  private landingPulse = 0;
  private runDustCooldown = 0;

  constructor() { super('Play'); }
  init(data: { level?: number }): void { this.levelIndex = Phaser.Math.Clamp(data.level ?? 0, 0, levels.length - 1); }

  create(): void {
    this.def = levels[this.levelIndex];
    this.health = 3; this.score = 0; this.gemCount = 0; this.shardCount = 0; this.elapsed = 0;
    this.finished = false; this.paused = false; this.respawn = { ...this.def.start };
    this.wasGrounded = true; this.landingPulse = 0; this.runDustCooldown = 0;
    audio.startMusic(this.levelIndex);
    this.physics.world.setBounds(0, 0, this.def.width, H + 180);
    this.buildBackground();
    this.platforms = this.physics.add.group({ allowGravity: false, immovable: true });
    this.enemies = this.physics.add.group();
    this.gems = this.physics.add.staticGroup();
    this.shards = this.physics.add.staticGroup();
    this.hazards = this.physics.add.staticGroup();
    this.checkpoints = this.physics.add.staticGroup();
    this.bolts = this.physics.add.group({ allowGravity: false });
    this.buildLevel();
    this.createPlayer();
    this.createHud();
    this.bindInput();
    this.bindCollisions();
    this.showIntro();
  }

  private buildBackground(): void {
    const p = palette[this.def.theme];
    this.cameras.main.setBackgroundColor(p.sky);
    const bgKey = `bg-${this.def.theme}`;
    if (this.textures.exists(bgKey)) {
      this.add.image(W / 2, H / 2, bgKey).setDisplaySize(W, H).setScrollFactor(0).setAlpha(.9).setDepth(-5);
      this.add.rectangle(W / 2, H / 2, W, H, p.sky, .16).setScrollFactor(0).setDepth(-4);
    }
    const glow = this.add.circle(W * .74, 150, this.def.theme === 'storm' ? 75 : 110, p.haze, this.def.theme === 'crystal' ? .18 : .7).setScrollFactor(0);
    glow.setStrokeStyle(12, p.haze, .08);
    for (let i = 0; i < Math.ceil(this.def.width / 420) + 2; i++) {
      const x = i * 420 - 120;
      this.add.polygon(x, 0, [{x:0,y:650},{x:210,y:310 + (i % 3) * 55},{x:430,y:650}], p.far, .65).setOrigin(0).setScrollFactor(.12);
      this.add.polygon(x + 130, 0, [{x:0,y:650},{x:230,y:410 - (i % 2) * 60},{x:470,y:650}], p.near, .75).setOrigin(0).setScrollFactor(.28);
    }
    if (this.def.theme === 'crystal') {
      for (let i = 0; i < 18; i++) this.add.triangle(i * 300 + 80, 510, 0, 130, 38, 0, 76, 130, 0x6b66c9, .16).setScrollFactor(.18);
    }
    if (this.def.theme === 'storm') {
      for (let i = 0; i < 9; i++) {
        const cloud = this.add.ellipse(i * 560 + 150, 150 + (i % 3) * 55, 330, 90, 0x11162d, .72).setScrollFactor(.18);
        this.tweens.add({ targets: cloud, x: cloud.x + 90, duration: 5000 + i * 250, yoyo: true, repeat: -1 });
      }
    }
    this.add.rectangle(this.def.width / 2, 690, this.def.width, 80, p.near).setDepth(-1);
  }

  private buildLevel(): void {
    const p = palette[this.def.theme];
    this.def.platforms.forEach((d) => {
      const h = d.h ?? 38;
      const shadow = this.add.rectangle(d.x + d.w / 2 + 7, d.y + h / 2 + 9, d.w, h, 0x07111f, .3);
      const block = this.add.rectangle(d.x + d.w / 2, d.y + h / 2, d.w, h, p.ground).setStrokeStyle(2, p.top, .55);
      const cap = this.add.rectangle(d.x + d.w / 2, d.y + 5, d.w - 4, 9, p.top).setDepth(block.depth + 1);
      const motifs: Phaser.GameObjects.GameObject[] = [];
      for (let mx = d.x + 28; mx < d.x + d.w - 18; mx += 54) {
        motifs.push(this.add.rectangle(mx, d.y + 24, 9, 9, p.top, .22).setAngle(45).setDepth(block.depth + 1));
      }
      this.physics.add.existing(block);
      const body = block.body as Phaser.Physics.Arcade.Body;
      body.setAllowGravity(false).setImmovable(true);
      this.platforms.add(block);
      if (d.moving) {
        const prop = d.moving.axis;
        this.tweens.add({ targets: [block, shadow, cap, ...motifs], [prop]: `+=${d.moving.distance}`, duration: d.moving.duration, yoyo: true, repeat: -1, ease: 'Sine.inOut' });
      }
    });
    this.def.gems.forEach(d => {
      const g = this.gems.create(d.x, d.y, 'coin') as ArcadeSprite;
      this.tweens.add({ targets: g, y: d.y - 7, scaleX: .35, duration: 620 + (d.x % 180), yoyo: true, repeat: -1, ease: 'Sine.inOut' });
    });
    this.def.shards.forEach(d => {
      const s = this.shards.create(d.x, d.y, 'shard') as ArcadeSprite;
      this.tweens.add({ targets: s, scale: 1.13, angle: -7, duration: 720, yoyo: true, repeat: -1 });
    });
    this.def.hazards.forEach(d => this.hazards.create(d.x, d.y, 'spike'));
    this.def.checkpoints.forEach(d => {
      const cp = this.checkpoints.create(d.x, d.y, 'checkpoint') as ArcadeSprite;
      cp.setData('active', false);
    });
    this.def.enemies.forEach(d => {
      const e = this.enemies.create(d.x, d.y, d.type) as ArcadeSprite;
      e.setBounce(0).setCollideWorldBounds(false).setDataEnabled();
      e.setData({ type: d.type, originX: d.x, range: d.range ?? 150, direction: -1, nextHop: 0 });
      if (d.type === 'wisp') { (e.body as Phaser.Physics.Arcade.Body).setAllowGravity(false); }
      else e.setVelocityX(d.type === 'roller' ? -120 : -60);
    });
    this.portal = this.physics.add.sprite(this.def.portal.x, this.def.portal.y, 'portal').setImmovable(true);
    (this.portal.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
    this.tweens.add({ targets: this.portal, scale: 1.06, alpha: .82, duration: 900, yoyo: true, repeat: -1 });
    if (this.def.boss) { this.portal.setVisible(false).disableBody(true, true); this.spawnBoss(); }
  }

  private createPlayer(): void {
    this.player = this.physics.add.sprite(this.def.start.x, this.def.start.y, skinTexture(save.selectedSkin));
    this.player.setCollideWorldBounds(true).setBounce(0).setDepth(5);
    this.player.setOrigin(.5, .58);
    (this.player.body as Phaser.Physics.Arcade.Body).setSize(31, 56).setOffset(9, 6).setMaxVelocity(700, 850);
    this.cameras.main.setBounds(0, 0, this.def.width, H);
    this.cameras.main.startFollow(this.player, true, .11, .11, -130, 35);
  }

  private bindInput(): void {
    const keyboard = this.input.keyboard;
    if (!keyboard) return;
    this.cursors = keyboard.createCursorKeys();
    this.keys = keyboard.addKeys({
      a: Phaser.Input.Keyboard.KeyCodes.A, d: Phaser.Input.Keyboard.KeyCodes.D,
      w: Phaser.Input.Keyboard.KeyCodes.W, s: Phaser.Input.Keyboard.KeyCodes.S,
      space: Phaser.Input.Keyboard.KeyCodes.SPACE, shift: Phaser.Input.Keyboard.KeyCodes.SHIFT,
      esc: Phaser.Input.Keyboard.KeyCodes.ESC
    }) as Record<string, Phaser.Input.Keyboard.Key>;
    this.createTouchControls();
  }

  private bindCollisions(): void {
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.enemies, this.platforms);
    if (this.boss) this.physics.add.collider(this.boss, this.platforms);
    this.physics.add.collider(this.player, this.enemies, (_p, e) => this.hitEnemy(e as ArcadeSprite));
    if (this.boss) this.physics.add.collider(this.player, this.boss, () => this.hitBoss());
    this.physics.add.overlap(this.player, this.gems, (_p, g) => this.collectGem(g as ArcadeSprite));
    this.physics.add.overlap(this.player, this.shards, (_p, s) => this.collectShard(s as ArcadeSprite));
    this.physics.add.overlap(this.player, this.hazards, () => this.hurtPlayer());
    this.physics.add.overlap(this.player, this.checkpoints, (_p, c) => this.activateCheckpoint(c as ArcadeSprite));
    this.physics.add.overlap(this.player, this.portal, () => this.completeLevel());
    this.physics.add.overlap(this.player, this.bolts, (_p, b) => { (b as ArcadeSprite).destroy(); this.hurtPlayer(); });
  }

  private createHud(): void {
    const bar = this.add.rectangle(20, 18, 570, 58, 0x07111f, .78).setOrigin(0).setScrollFactor(0).setDepth(30).setStrokeStyle(1, 0x73f3e6, .35);
    this.hud = this.add.text(40, 34, '', { fontFamily: font, fontSize: '18px', fontStyle: 'bold', color: '#ffffff' }).setScrollFactor(0).setDepth(31);
    this.ability = this.add.text(W - 34, 32, this.abilityName(), { fontFamily: font, fontSize: '15px', fontStyle: 'bold', color: '#aefcf5', backgroundColor: '#0a1b2bd9', padding: { x: 14, y: 9 } }).setOrigin(1, 0).setScrollFactor(0).setDepth(31);
    bar.setInteractive();
    const pause = this.add.text(W - 35, 84, 'â…¡  PAUSE', { fontFamily: font, fontSize: '14px', fontStyle: 'bold', color: '#ffffff', backgroundColor: '#0a1b2bd9', padding: { x: 12, y: 8 } }).setOrigin(1, 0).setScrollFactor(0).setDepth(31).setInteractive({ useHandCursor: true });
    pause.on('pointerup', () => this.togglePause());
    this.refreshHud();
  }

  private createTouchControls(): void {
    const mobile = this.sys.game.device.input.touch || window.innerWidth < 900;
    if (!mobile) return;
    const make = (x: number, y: number, symbol: string, down: () => void, up: () => void) => {
      const c = this.add.circle(x, y, 42, 0x07111f, .5).setStrokeStyle(2, 0xffffff, .45).setScrollFactor(0).setDepth(40).setInteractive();
      const t = this.add.text(x, y, symbol, { fontFamily: font, fontSize: '25px', fontStyle: 'bold', color: '#ffffff' }).setOrigin(.5).setScrollFactor(0).setDepth(41);
      c.on('pointerdown', () => { c.setFillStyle(0x2b6d77, .7); down(); });
      c.on('pointerup', () => { c.setFillStyle(0x07111f, .5); up(); });
      c.on('pointerout', () => { c.setFillStyle(0x07111f, .5); up(); });
      this.touchButtons.push(c, t);
    };
    make(78, H - 76, 'LEFT', () => this.moveLeft = true, () => this.moveLeft = false);
    make(176, H - 76, 'RIGHT', () => this.moveRight = true, () => this.moveRight = false);
    make(W - 88, H - 80, 'JUMP', () => { this.jumpPressed = true; this.jumpHeld = true; }, () => this.jumpHeld = false);
    if (this.levelIndex >= 2) make(W - 188, H - 74, 'STOMP', () => this.downPressed = true, () => undefined);
    if (this.levelIndex >= 3) make(W - 286, H - 74, 'DASH', () => this.dashPressed = true, () => undefined);
  }

  private abilityName(): string {
    if (this.levelIndex >= 3) return 'SHIFT â€¢ DASH    DOWN â€¢ STOMP';
    if (this.levelIndex >= 2) return 'DOWN IN AIR  â€¢  GROUND STOMP';
    if (this.levelIndex >= 1) return 'JUMP AGAIN  â€¢  DOUBLE JUMP';
    return 'RUN + JUMP  â€¢  FIND 3 SHARDS';
  }

  private showIntro(): void {
    const panel = this.add.container(W / 2, H / 2).setScrollFactor(0).setDepth(60);
    const bg = this.add.rectangle(0, 0, 620, 180, 0x07111f, .92).setStrokeStyle(2, 0x73f3e6, .55);
    const world = this.add.text(0, -45, `ROUND ${this.levelIndex + 1} OF ${levels.length}`, { fontFamily: font, fontSize: '15px', color: '#ffd27c', fontStyle: 'bold', letterSpacing: 3 }).setOrigin(.5);
    const name = this.add.text(0, -4, this.def.name, { fontFamily: titleFont, fontSize: '38px', color: '#ffffff' }).setOrigin(.5);
    const sub = this.add.text(0, 43, this.def.subtitle, { fontFamily: font, fontSize: '16px', color: '#a7bac9' }).setOrigin(.5);
    panel.add([bg, world, name, sub]);
    this.physics.pause();
    this.tweens.add({ targets: panel, alpha: 0, y: H / 2 - 25, delay: 1550, duration: 450, onComplete: () => { panel.destroy(); if (!this.paused) this.physics.resume(); } });
  }

  update(_time: number, delta: number): void {
    if (this.finished || this.paused || !this.player?.active) return;
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    this.elapsed += delta;
    this.coyote = Math.max(0, this.coyote - delta);
    this.jumpBuffer = Math.max(0, this.jumpBuffer - delta);
    this.invulnerable = Math.max(0, this.invulnerable - delta);
    this.dashCooldown = Math.max(0, this.dashCooldown - delta);
    const grounded = body.blocked.down || body.touching.down;
    if (grounded && !this.wasGrounded) {
      this.landingPulse = 1;
      this.spark(this.player.x, this.player.y + 28, 0xdffcff, 4);
    }
    this.wasGrounded = grounded;
    this.landingPulse = Math.max(0, this.landingPulse - delta / 180);
    this.runDustCooldown = Math.max(0, this.runDustCooldown - delta);
    if (grounded) { this.coyote = 115; this.airJumps = 0; this.player.setAngle(0); }

    const left = this.moveLeft || this.cursors.left.isDown || this.keys.a.isDown;
    const right = this.moveRight || this.cursors.right.isDown || this.keys.d.isDown;
    const jumpDown = this.jumpPressed || Phaser.Input.Keyboard.JustDown(this.cursors.up) || Phaser.Input.Keyboard.JustDown(this.keys.w) || Phaser.Input.Keyboard.JustDown(this.keys.space);
    const jumpHeld = this.jumpHeld || this.cursors.up.isDown || this.keys.w.isDown || this.keys.space.isDown;
    const dashDown = this.dashPressed || Phaser.Input.Keyboard.JustDown(this.keys.shift);
    const downDown = this.downPressed || Phaser.Input.Keyboard.JustDown(this.cursors.down) || Phaser.Input.Keyboard.JustDown(this.keys.s);
    this.jumpPressed = false; this.dashPressed = false; this.downPressed = false;
    if (Phaser.Input.Keyboard.JustDown(this.keys.esc)) { this.togglePause(); return; }

    const accel = this.def.theme === 'frost' ? 22 : 34;
    const drag = this.def.theme === 'frost' ? .965 : .80;
    if (left) { body.setVelocityX(Math.max(-330, body.velocity.x - accel)); this.facing = -1; }
    else if (right) { body.setVelocityX(Math.min(330, body.velocity.x + accel)); this.facing = 1; }
    else body.setVelocityX(body.velocity.x * drag);
    this.player.setFlipX(this.facing < 0);

    if (jumpDown) this.jumpBuffer = 130;
    if (this.jumpBuffer > 0 && (this.coyote > 0 || (this.levelIndex >= 1 && this.airJumps < 1))) {
      const isAir = this.coyote <= 0;
      body.setVelocityY(isAir ? -515 : -565);
      if (isAir) this.airJumps++;
      this.coyote = 0; this.jumpBuffer = 0; audio.jump(); this.spark(this.player.x, this.player.y + 24, 0xdffcff, 5);
    }
    if (!jumpHeld && body.velocity.y < -190) body.setVelocityY(body.velocity.y * .91);
    if (downDown && this.levelIndex >= 2 && !grounded) { body.setVelocityY(760); this.player.setAngle(this.facing * 12); }
    if (dashDown && this.levelIndex >= 3 && this.dashCooldown <= 0) {
      body.setVelocityX(this.facing * 690); body.setVelocityY(Math.min(body.velocity.y, 40)); this.dashCooldown = 850; audio.dash();
      this.spark(this.player.x - this.facing * 18, this.player.y, 0x73f3e6, 9);
    }

    if (!grounded) this.player.setAngle(Phaser.Math.Clamp(body.velocity.x / 55, -9, 9));
    if (!grounded) this.player.setTexture(skinTexture(save.selectedSkin, 'jump'));
    else if (Math.abs(body.velocity.x) > 55) {
      this.player.setTexture(skinTexture(save.selectedSkin, Math.floor(this.elapsed / 115) % 2 ? 'run1' : 'run2'));
      if (this.runDustCooldown <= 0) {
        this.runDustCooldown = 110;
        this.spark(this.player.x - this.facing * 18, this.player.y + 28, 0xffd27c, 2);
      }
    } else this.player.setTexture(skinTexture(save.selectedSkin));
    const idleBob = grounded && Math.abs(body.velocity.x) <= 55 ? Math.sin(this.elapsed / 180) * .025 : 0;
    const jumpStretch = grounded ? 0 : Phaser.Math.Clamp(-body.velocity.y / 1500, -.06, .08);
    const squash = this.landingPulse * .10;
    this.player.setScale(1 + squash - jumpStretch + idleBob, 1 - squash + jumpStretch - idleBob);
    if (this.invulnerable > 0) this.player.setAlpha(Math.floor(this.invulnerable / 75) % 2 ? .25 : 1); else this.player.setAlpha(1);
    if (this.player.y > H + 70) this.hurtPlayer(true);
    this.updateEnemies(delta);
    this.updateBoss(delta);
    this.refreshHud();
  }

  private updateEnemies(delta: number): void {
    this.enemies.getChildren().forEach(obj => {
      const e = obj as ArcadeSprite;
      if (!e.active) return;
      const type = e.getData('type') as string;
      const origin = e.getData('originX') as number;
      const range = e.getData('range') as number;
      let dir = e.getData('direction') as number;
      if (e.x < origin - range) dir = 1;
      if (e.x > origin + range) dir = -1;
      e.setData('direction', dir).setFlipX(dir > 0);
      if (type === 'hopper') {
        const body = e.body as Phaser.Physics.Arcade.Body;
        let next = e.getData('nextHop') as number;
        next -= delta;
        if (body.blocked.down && next <= 0) { e.setVelocity(dir * 105, -360); next = 1250; }
        e.setData('nextHop', next);
      } else if (type === 'roller') { e.setVelocityX(dir * 125).setAngularVelocity(dir * 230); }
      else e.setVelocityX(dir * 65);
    });
  }

  private hitEnemy(enemy: ArcadeSprite): void {
    if (!enemy.active || this.finished) return;
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    if (body.velocity.y > 120 && this.player.y < enemy.y - 4) {
      enemy.disableBody(true, true); body.setVelocityY(-390); this.score += 250; audio.stomp(); this.spark(enemy.x, enemy.y, 0xffdf73, 10);
      this.floatScore(enemy.x, enemy.y - 24, '+250', '#ffdf73');
    } else this.hurtPlayer();
  }

  private collectGem(gem: ArcadeSprite): void {
    if (!gem.active) return;
    gem.disableBody(true, true); this.gemCount++; this.score += 50; audio.coin(); this.spark(gem.x, gem.y, 0xffdf73, 7);
    this.floatScore(gem.x, gem.y - 18, '+50', '#ffef9a');
  }

  private collectShard(shard: ArcadeSprite): void {
    if (!shard.active) return;
    shard.disableBody(true, true); this.shardCount++; this.score += 600; audio.shard(); this.cameras.main.flash(120, 255, 231, 120, false);
    this.spark(shard.x, shard.y, 0xffdf73, 14);
    this.floatScore(shard.x, shard.y - 28, '+600 SHARD', '#fff0a8');
  }

  private activateCheckpoint(cp: ArcadeSprite): void {
    if (cp.getData('active')) return;
    this.checkpoints.getChildren().forEach(x => (x as ArcadeSprite).setTint(0xffffff).setData('active', false));
    cp.setData('active', true).setTint(0x7dffff); this.respawn = { x: cp.x, y: cp.y - 50 }; this.score += 200; audio.checkpoint();
    const t = label(this, cp.x, cp.y - 82, 'CHECKPOINT', 16, '#aefcf5');
    this.tweens.add({ targets: t, y: t.y - 35, alpha: 0, duration: 1100, onComplete: () => t.destroy() });
  }

  private hurtPlayer(fell = false): void {
    if (this.invulnerable > 0 || this.finished) return;
    this.health--; audio.hurt(); this.cameras.main.shake(save.reducedMotion ? 0 : 150, .008);
    if (this.health <= 0) { this.gameOver(); return; }
    this.invulnerable = 1400; this.player.setPosition(this.respawn.x, this.respawn.y).setVelocity(0, -120);
    if (fell) this.cameras.main.fadeIn(180, 7, 17, 31);
  }

  private gameOver(): void {
    this.finished = true; this.physics.pause(); this.player.setTint(0x7c8290);
    const shade = this.add.rectangle(W / 2, H / 2, W, H, 0x050a13, .82).setScrollFactor(0).setDepth(70);
    const ttl = label(this, W / 2, 245, 'THE WIND FADESâ€¦', 42, '#ffffff').setScrollFactor(0).setDepth(71);
    const sub = label(this, W / 2, 305, 'Veer can rise again from the last checkpoint.', 17, '#9eb5c8').setScrollFactor(0).setDepth(71);
    const retry = addButton(this, W / 2, 390, 'RETRY WORLD', () => this.scene.restart({ level: this.levelIndex }), 270).setScrollFactor(0).setDepth(71);
    const menu = addButton(this, W / 2, 465, 'RETURN TO CAMP', () => this.scene.start('Menu'), 270).setScrollFactor(0).setDepth(71);
    void shade; void ttl; void sub; void retry; void menu;
  }

  private spawnBoss(): void {
    this.boss = this.physics.add.sprite(4920, 540, 'boss').setData({ health: 6, dir: -1, cooldown: 900, invuln: 0 }).setDepth(4);
    this.boss.setCollideWorldBounds(false).setBounce(.15);
    const bg = this.add.rectangle(W / 2, 105, 420, 20, 0x07111f, .9).setScrollFactor(0).setDepth(32).setStrokeStyle(2, 0xffffff, .25);
    this.bossBar = this.add.rectangle(W / 2 - 205, 105, 410, 12, 0xb75be0).setOrigin(0, .5).setScrollFactor(0).setDepth(33);
    const name = label(this, W / 2, 78, 'GRAVOX â€¢ KEEPER OF THE STORM', 15, '#f1d9ff').setScrollFactor(0).setDepth(33);
    bg.setVisible(true); name.setVisible(true);
  }

  private updateBoss(delta: number): void {
    if (!this.boss?.active) return;
    let dir = this.boss.getData('dir') as number;
    if (this.boss.x < 4610) dir = 1;
    if (this.boss.x > 5100) dir = -1;
    this.boss.setData('dir', dir).setVelocityX(dir * 82).setFlipX(dir > 0);
    this.boss.setData('invuln', Math.max(0, (this.boss.getData('invuln') as number) - delta));
    let cooldown = (this.boss.getData('cooldown') as number) - delta;
    if (cooldown <= 0 && Math.abs(this.player.x - this.boss.x) < 900) {
      const bolt = this.bolts.create(this.boss.x, this.boss.y - 15, 'bolt') as ArcadeSprite;
      this.physics.moveToObject(bolt, this.player, 280 + (6 - (this.boss.getData('health') as number)) * 25);
      bolt.setAngularVelocity(200); this.time.delayedCall(3500, () => bolt.active && bolt.destroy());
      cooldown = 1100;
    }
    this.boss.setData('cooldown', cooldown);
  }

  private hitBoss(): void {
    if (!this.boss?.active || (this.boss.getData('invuln') as number) > 0) return;
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    if (body.velocity.y > 150 && this.player.y < this.boss.y - 30) {
      const health = (this.boss.getData('health') as number) - 1;
      this.boss.setData('health', health).setData('invuln', 550).setTint(0xffffff);
      this.time.delayedCall(120, () => this.boss?.clearTint());
      body.setVelocityY(-470); this.score += 500; audio.bossHit(); this.spark(this.boss.x, this.boss.y, 0xffdf73, 18);
      this.floatScore(this.boss.x, this.boss.y - 55, '+500', '#ffdf73');
      if (this.bossBar) this.bossBar.width = 410 * (health / 6);
      if (health <= 0) this.defeatBoss();
    } else this.hurtPlayer();
  }

  private defeatBoss(): void {
    if (!this.boss) return;
    this.score += 3000; this.cameras.main.flash(350, 220, 180, 255, false); this.spark(this.boss.x, this.boss.y, 0xc98df5, 34);
    this.boss.disableBody(true, true); this.portal.enableBody(false, this.def.portal.x, this.def.portal.y, true, true);
    audio.portal();
    const t = label(this, this.def.portal.x, this.def.portal.y - 100, 'THE FINAL PORTAL IS OPEN', 18, '#fff0a8');
    this.tweens.add({ targets: t, y: t.y - 35, alpha: 0, duration: 1800, onComplete: () => t.destroy() });
  }

  private completeLevel(): void {
    if (this.finished || (this.def.boss && this.boss?.active)) return;
    this.finished = true; this.physics.pause(); audio.portal();
    const seconds = Math.floor(this.elapsed / 1000);
    const timeBonus = Math.max(0, 6000 - seconds * 20);
    const shardBonus = this.shardCount * 1000;
    this.score += timeBonus + shardBonus;
    save.completed[this.levelIndex] = true;
    save.unlocked = Math.max(save.unlocked, Math.min(levels.length - 1, this.levelIndex + 1));
    save.bestScores[this.levelIndex] = Math.max(save.bestScores[this.levelIndex], this.score);
    save.bestTimes[this.levelIndex] = !save.bestTimes[this.levelIndex] ? seconds : Math.min(save.bestTimes[this.levelIndex], seconds);
    const previousShards = save.bestShards[this.levelIndex] ?? 0;
    save.bestShards[this.levelIndex] = Math.max(previousShards, this.shardCount);
    save.totalShards += Math.max(0, this.shardCount - previousShards);
    save.wallet += this.gemCount;
    writeSave(save);
    const shade = this.add.rectangle(W / 2, H / 2, W, H, 0x050a13, .84).setScrollFactor(0).setDepth(70);
    const cap = this.levelIndex === levels.length - 1 ? 'THE SKY IS FREE' : 'PORTAL REACHED';
    label(this, W / 2, 160, cap, 46, '#ffffff').setScrollFactor(0).setDepth(71);
    label(this, W / 2, 217, this.def.name, 20, '#73f3e6').setScrollFactor(0).setDepth(71);
    label(this, W / 2, 285, `${this.shardCount}/3 SHARDS     ${this.gemCount} COINS     ${seconds}s`, 19, '#c8d6e0').setScrollFactor(0).setDepth(71);
    label(this, W / 2, 330, `FINAL SCORE  ${this.score.toLocaleString()}`, 27, '#ffdf73').setScrollFactor(0).setDepth(71);
    const rank = this.shardCount === 3 && seconds < 105 ? 'S' : this.shardCount >= 2 ? 'A' : this.shardCount === 1 ? 'B' : 'C';
    label(this, W / 2, 370, `ROUND RANK  ${rank}`, 20, rank === 'S' ? '#ffd27c' : '#aefcf5').setScrollFactor(0).setDepth(71);
    const nextText = this.levelIndex < levels.length - 1 ? 'ENTER NEXT WORLD' : 'RETURN TO TITLE';
    addButton(this, W / 2, 445, nextText, () => this.levelIndex < levels.length - 1 ? this.scene.start('Play', { level: this.levelIndex + 1 }) : this.scene.start('Menu'), 300).setScrollFactor(0).setDepth(71);
    addButton(this, W / 2, 518, 'WORLD SELECT', () => this.scene.start('Menu'), 300).setScrollFactor(0).setDepth(71);
    shade.setInteractive();
  }

  private togglePause(): void {
    if (this.finished) return;
    this.paused = !this.paused;
    if (this.paused) {
      this.physics.pause();
      const bg = this.add.rectangle(0, 0, W, H, 0x050a13, .8);
      const ttl = label(this, 0, -120, 'PAUSED', 46);
      const resume = addButton(this, 0, -30, 'RESUME', () => this.togglePause(), 260);
      const restart = addButton(this, 0, 45, 'RESTART WORLD', () => this.scene.restart({ level: this.levelIndex }), 260);
      const menu = addButton(this, 0, 120, 'RETURN TO CAMP', () => this.scene.start('Menu'), 260);
      this.pauseLayer = this.add.container(W / 2, H / 2, [bg, ttl, resume, restart, menu]).setScrollFactor(0).setDepth(80);
    } else {
      this.pauseLayer?.destroy(true); this.pauseLayer = undefined; this.physics.resume();
    }
  }

  private spark(x: number, y: number, color: number, count: number): void {
    for (let i = 0; i < count; i++) {
      const s = this.add.rectangle(x, y, Phaser.Math.Between(3, 7), Phaser.Math.Between(3, 7), color).setDepth(10);
      this.tweens.add({ targets: s, x: x + Phaser.Math.Between(-55, 55), y: y + Phaser.Math.Between(-65, 25), alpha: 0, angle: Phaser.Math.Between(-180, 180), duration: Phaser.Math.Between(350, 650), onComplete: () => s.destroy() });
    }
  }

  private floatScore(x: number, y: number, text: string, color: string): void {
    const t = this.add.text(x, y, text, { fontFamily: font, fontSize: '16px', fontStyle: 'bold', color, stroke: '#07111f', strokeThickness: 4 }).setOrigin(.5).setDepth(20);
    this.tweens.add({ targets: t, y: y - 42, alpha: 0, scale: 1.15, duration: 720, ease: 'Cubic.out', onComplete: () => t.destroy() });
  }

  private refreshHud(): void {
    const hearts = 'â™¥'.repeat(Math.max(0, this.health)) + 'â™¡'.repeat(Math.max(0, 3 - this.health));
    this.hud.setText(`${hearts}     â— ${this.gemCount} COINS     â—† ${this.shardCount}/3     SCORE ${this.score.toString().padStart(5, '0')}     ${Math.floor(this.elapsed / 1000)}s`);
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game',
  width: W,
  height: H,
  backgroundColor: '#07111f',
  physics: { default: 'arcade', arcade: { gravity: { x: 0, y: 1250 }, debug: false } },
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
  render: { antialias: true, pixelArt: false, roundPixels: true },
  input: { activePointers: 4 },
  scene: [BootScene, MenuScene, PlayScene],
};

new Phaser.Game(config);

// Central catalogue of imagery. Uses Unsplash CDN (stable, hot-linkable).
const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

export const IMG = {
  // Wildlife / safari
  elephants: u("1516026672322-bc52d61a55d5"),
  elephantClose: u("1534177616072-ef7dc120449d"),
  lion: u("1535941339077-2dd1c7963098"),
  giraffe: u("1547471080-7cc2caa01a7e"),
  giraffes: u("1503917988258-f87a78e3c995"),
  zebra: u("1571406252241-db0280bd36cd"),
  savanna: u("1547970810-dc1eac37d174"),
  safariJeep: u("1549366021-9f761d450615"),
  cheetah: u("1456926631375-92c8ce872def"),
  wildebeest: u("1518459384564-ecfd8e80721f"),
  // Landscapes
  kilimanjaro: u("1564507592333-c60657eea523"),
  acaciaSunset: u("1523805009345-7448845a9e53"),
  flamingos: u("1602002418082-a4443e081dd1"),
  riftValley: u("1489493887464-892be6d1daae"),
  // Beach / coast
  beach: u("1505761671935-60b3a7427bad"),
  beachAerial: u("1518803194621-27188ba362c9"),
  dhow: u("1559827260-dc66d52bef19"),
  beachResort: u("1571896349842-33c89424de2d"),
  // City / culture
  nairobi: u("1611348586804-61bf6c080437"),
  maasaiCulture: u("1523805009345-7448845a9e53"),
  lodgeTent: u("1571003123894-1f0594d2b5d9"),
  campfire: u("1504280390367-361c6d9f38f4"),
  // People (testimonials / team)
  p1: u("1500648767791-00dcc994a43e", 200),
  p2: u("1494790108377-be9c29b29330", 200),
  p3: u("1507003211169-0a1dd7228f2d", 200),
  p4: u("1438761681033-6461ffad8d80", 200),
  p5: u("1472099645785-5658abf4ff4e", 200),
  p6: u("1544005313-94ddf0286df2", 200),
  p7: u("1519085360753-af0119f7cbe7", 200),
  p8: u("1573497019940-1c28c88b4f3e", 200),
  // Hero
  hero: u("1516026672322-bc52d61a55d5", 2000),
} as const;

// Helper to grab a rotating gallery for cards/details
export const galleryPool = [
  IMG.elephants, IMG.lion, IMG.giraffe, IMG.savanna, IMG.safariJeep,
  IMG.beach, IMG.flamingos, IMG.kilimanjaro, IMG.zebra, IMG.dhow,
  IMG.acaciaSunset, IMG.cheetah, IMG.lodgeTent, IMG.beachAerial,
];

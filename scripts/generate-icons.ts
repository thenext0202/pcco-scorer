import sharp from "sharp";
import { readFileSync } from "fs";
import { join } from "path";

const svgPath = join(process.cwd(), "public/icons/icon.svg");
const outputDir = join(process.cwd(), "public/icons");

const svgBuffer = readFileSync(svgPath);

interface IconConfig {
  size: number;
  name: string;
  maskable?: boolean;
}

const icons: IconConfig[] = [
  // 기본 아이콘
  { size: 192, name: "icon-192.png" },
  { size: 512, name: "icon-512.png" },

  // Maskable 아이콘 (여백 20%)
  { size: 192, name: "maskable-192.png", maskable: true },
  { size: 512, name: "maskable-512.png", maskable: true },

  // Apple Touch Icon
  { size: 180, name: "apple-touch-icon.png" },

  // Favicon
  { size: 32, name: "favicon-32x32.png" },
  { size: 16, name: "favicon-16x16.png" },
];

async function generateIcons() {
  console.log("🎨 Generating PWA icons...\n");

  for (const icon of icons) {
    try {
      let image = sharp(svgBuffer);

      if (icon.maskable) {
        // Maskable 아이콘: 20% 여백 추가
        const paddedSize = Math.round(icon.size * 0.8);
        const padding = Math.round((icon.size - paddedSize) / 2);

        image = image
          .resize(paddedSize, paddedSize)
          .extend({
            top: padding,
            bottom: padding,
            left: padding,
            right: padding,
            background: { r: 15, g: 23, b: 42, alpha: 1 }, // slate-900
          });
      } else {
        image = image.resize(icon.size, icon.size);
      }

      const outputPath = join(outputDir, icon.name);
      await image.png().toFile(outputPath);

      console.log(`✅ ${icon.name} (${icon.size}x${icon.size})`);
    } catch (error) {
      console.error(`❌ Failed to generate ${icon.name}:`, error);
    }
  }

  console.log("\n🎉 All icons generated successfully!");
}

generateIcons().catch(console.error);

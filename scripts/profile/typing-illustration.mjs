// Position the original PNG inside an SVG viewport; no image pixels are changed.
import {readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {out,svg} from './design.mjs';
export async function buildTypingIllustration(){
  const png=await readFile(path.join(out,'practice/monkeytype-monkey.png'));
  const width=png.readUInt32BE(16),height=png.readUInt32BE(20);
  const inset=Math.round(width*.24);
  const image='<image x="0" y="'+inset+'" width="'+width+'" height="'+height+'" xlink:href="data:image/png;base64,'+png.toString('base64')+'"/>';
  await writeFile(path.join(out,'practice/monkeytype-typing-layout.svg'),svg(width,height+inset,'Monkeytype typing monkey',image));
}

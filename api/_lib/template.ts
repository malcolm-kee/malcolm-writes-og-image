
import { readFileSync } from 'fs';
import { marked } from 'marked';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';
const twemoji = require('twemoji');
const twOptions = { folder: 'svg', ext: '.svg' };
const emojify = (text: string) => twemoji.parse(text, twOptions);

const styles = readFileSync(`${__dirname}/../_static/styles.css`, 'utf-8');

export function getHtml(parsedReq: ParsedRequest) {
    const { text, md, date } = parsedReq;
    return /*html*/`<!DOCTYPE html>
    <html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>${styles}</style>
    <body class="flex justify-center items-center h-screen w-screen">
        <div class="absolute top-0 inset-x-0 px-12 py-6 flex justify-between items-center bg-cyan-800 text-white">
            <div class="text-6xl font-extrabold tracking-wide">Malcolm Writes</div>
            <div class="text-4xl">${date}</div>
        </div>
        <div class="text-center px-12">
            <div class="text-9xl font-medium leading-normal text-gray-800">${emojify(
                md ? marked(text) : sanitizeHtml(text)
            )}
            </div>
        </div>
        <div class="absolute bottom-0 inset-x-0 bg-cyan-800 h-5"></div>
    </body>
</html>`;
}

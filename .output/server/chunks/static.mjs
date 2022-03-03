import { createError } from 'h3';
import { withLeadingSlash, withoutTrailingSlash, parseURL } from 'ufo';
import { promises } from 'fs';
import { resolve, dirname } from 'pathe';
import { fileURLToPath } from 'url';
import { c as buildAssetsDir } from './server.mjs';
import 'unenv/runtime/polyfill/fetch.node';
import 'http';
import 'https';
import 'destr';
import 'ohmyfetch';
import 'unenv/runtime/fetch/index';
import 'defu';

const assets = {
  "/_nuxt/Checkmark.3a02cf8a.svg": {
    "type": "image/svg+xml",
    "etag": "\"483-IgmNcsPyMkH0iaSywhH9io0xMIs\"",
    "mtime": "2022-03-03T13:47:34.939Z",
    "path": "../public/_nuxt/Checkmark.3a02cf8a.svg"
  },
  "/_nuxt/entry-985efb4b.mjs": {
    "type": "application/javascript",
    "etag": "\"1e559-Y86QQbBgEfGDG24gScVOC66mGRg\"",
    "mtime": "2022-03-03T13:47:34.939Z",
    "path": "../public/_nuxt/entry-985efb4b.mjs"
  },
  "/_nuxt/entry.3e5d539e.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"55f03-5LxRgqG4Fla7E116qj5eqqbIioE\"",
    "mtime": "2022-03-03T13:47:34.940Z",
    "path": "../public/_nuxt/entry.3e5d539e.css"
  },
  "/_nuxt/footer-logo.5f2e1674.svg": {
    "type": "image/svg+xml",
    "etag": "\"1699-aDEWsiHD55w75e02xEejrzXwUJk\"",
    "mtime": "2022-03-03T13:47:34.939Z",
    "path": "../public/_nuxt/footer-logo.5f2e1674.svg"
  },
  "/_nuxt/gimport.66edca1c.svg": {
    "type": "image/svg+xml",
    "etag": "\"43a-1CmSyWDKaw2nZpFeCwjSEkxok7I\"",
    "mtime": "2022-03-03T13:47:34.939Z",
    "path": "../public/_nuxt/gimport.66edca1c.svg"
  },
  "/_nuxt/import.07b709e3.svg": {
    "type": "image/svg+xml",
    "etag": "\"3e4-YTs+4FDiAi2ONykkncefhfjBheg\"",
    "mtime": "2022-03-03T13:47:34.939Z",
    "path": "../public/_nuxt/import.07b709e3.svg"
  },
  "/_nuxt/index-60d52283.mjs": {
    "type": "application/javascript",
    "etag": "\"e2-OroJ3azC4TglZ0PrlsZWQ793cw8\"",
    "mtime": "2022-03-03T13:47:34.939Z",
    "path": "../public/_nuxt/index-60d52283.mjs"
  },
  "/_nuxt/logo1.a5935c29.svg": {
    "type": "image/svg+xml",
    "etag": "\"1690-Ni9KJOE92q4KVikPL3Wr7+B3M2w\"",
    "mtime": "2022-03-03T13:47:34.939Z",
    "path": "../public/_nuxt/logo1.a5935c29.svg"
  },
  "/_nuxt/manifest.json": {
    "type": "application/json",
    "etag": "\"366-lC2bEb48LcppmP4ITSooN2mkQ8Q\"",
    "mtime": "2022-03-03T13:47:34.939Z",
    "path": "../public/_nuxt/manifest.json"
  },
  "/_nuxt/mockup01@2x.3841722f.webp": {
    "type": "image/webp",
    "etag": "\"d270-1YNsv1fAQnfkMzIZEIuEKzL1OBM\"",
    "mtime": "2022-03-03T13:47:34.939Z",
    "path": "../public/_nuxt/mockup01@2x.3841722f.webp"
  },
  "/_nuxt/mockup02@2x.69a30983.webp": {
    "type": "image/webp",
    "etag": "\"8d36-6P7Ghcfyfutj7Se0zxT1C850fNM\"",
    "mtime": "2022-03-03T13:47:34.939Z",
    "path": "../public/_nuxt/mockup02@2x.69a30983.webp"
  },
  "/_nuxt/mockup03@2x.cba11add.webp": {
    "type": "image/webp",
    "etag": "\"1088a-exlbgkBGNb+P6/vCM4TWkU64Mko\"",
    "mtime": "2022-03-03T13:47:34.939Z",
    "path": "../public/_nuxt/mockup03@2x.cba11add.webp"
  },
  "/_nuxt/ntree.c8e13021.svg": {
    "type": "image/svg+xml",
    "etag": "\"3eb-sWdrY32j098P+R/JZ0mTi4CAdZk\"",
    "mtime": "2022-03-03T13:47:34.939Z",
    "path": "../public/_nuxt/ntree.c8e13021.svg"
  },
  "/_nuxt/record.9f36145b.svg": {
    "type": "image/svg+xml",
    "etag": "\"6fd-kqlxza0XfsIOW8pzJ2aH98Zsvn4\"",
    "mtime": "2022-03-03T13:47:34.939Z",
    "path": "../public/_nuxt/record.9f36145b.svg"
  },
  "/_nuxt/sd.de0e25d4.svg": {
    "type": "image/svg+xml",
    "etag": "\"10047-0Ms35AifiiUoclTS34pJvWfVSZ0\"",
    "mtime": "2022-03-03T13:47:34.939Z",
    "path": "../public/_nuxt/sd.de0e25d4.svg"
  },
  "/_nuxt/secured.4e414d30.svg": {
    "type": "image/svg+xml",
    "etag": "\"385-A850ENq1M0gGtyH6tD+yNyQ4wvE\"",
    "mtime": "2022-03-03T13:47:34.936Z",
    "path": "../public/_nuxt/secured.4e414d30.svg"
  },
  "/_nuxt/upload.685963e0.svg": {
    "type": "image/svg+xml",
    "etag": "\"4d2-YPzEMbCKqJ231jc26QS8qxnuIKQ\"",
    "mtime": "2022-03-03T13:47:34.939Z",
    "path": "../public/_nuxt/upload.685963e0.svg"
  }
};

const mainDir = dirname(fileURLToPath(globalThis.entryURL));

function readAsset (id) {
  return promises.readFile(resolve(mainDir, getAsset(id).path))
}

function getAsset (id) {
  return assets[id]
}

const METHODS = ["HEAD", "GET"];
const TWO_DAYS = 2 * 60 * 60 * 24;
const STATIC_ASSETS_BASE = "/_nuxt/D:/task/family365/nuxt/dist" + "/" + "1646315250";
async function serveStatic(req, res) {
  if (!METHODS.includes(req.method)) {
    return;
  }
  let id = withLeadingSlash(withoutTrailingSlash(parseURL(req.url).pathname));
  let asset = getAsset(id);
  if (!asset) {
    const _id = id + "/index.html";
    const _asset = getAsset(_id);
    if (_asset) {
      asset = _asset;
      id = _id;
    }
  }
  const isBuildAsset = id.startsWith(buildAssetsDir());
  if (!asset) {
    if (isBuildAsset && !id.startsWith(STATIC_ASSETS_BASE)) {
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    res.statusCode = 304;
    return res.end("Not Modified (etag)");
  }
  const ifModifiedSinceH = req.headers["if-modified-since"];
  if (ifModifiedSinceH && asset.mtime) {
    if (new Date(ifModifiedSinceH) >= new Date(asset.mtime)) {
      res.statusCode = 304;
      return res.end("Not Modified (mtime)");
    }
  }
  if (asset.type) {
    res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag) {
    res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime) {
    res.setHeader("Last-Modified", asset.mtime);
  }
  if (isBuildAsset) {
    res.setHeader("Cache-Control", `max-age=${TWO_DAYS}, immutable`);
  }
  const contents = await readAsset(id);
  return res.end(contents);
}

export { serveStatic as default };

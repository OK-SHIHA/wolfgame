const http = require("http");
const fs = require("fs");
const path = require("path");

const rootDir = __dirname;
const host = process.env.HOST || "0.0.0.0";
const port = Number(process.env.PORT || 8080);

const contentTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "application/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".webmanifest", "application/manifest+json; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".ico", "image/x-icon"],
]);

function getContentType(filePath) {
  return contentTypes.get(path.extname(filePath).toLowerCase()) || "application/octet-stream";
}

function resolvePath(requestUrl) {
  const decoded = decodeURIComponent(new URL(requestUrl, "http://localhost").pathname);
  const normalized = path.normalize(decoded).replace(/^([.]{2}[\/\\])+/, "");
  const candidate = path.join(rootDir, normalized);
  if (!candidate.startsWith(rootDir)) {
    return path.join(rootDir, "index.html");
  }

  try {
    const stat = fs.statSync(candidate);
    if (stat.isDirectory()) {
      return path.join(candidate, "index.html");
    }
    return candidate;
  } catch {
    return path.join(rootDir, "index.html");
  }
}

const server = http.createServer((req, res) => {
  if (!req.url) {
    res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Bad Request");
    return;
  }

  const filePath = resolvePath(req.url);

  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not Found");
      return;
    }

    res.writeHead(200, {
      "Content-Type": getContentType(filePath),
      "Cache-Control": "no-cache",
    });
    res.end(data);
  });
});

server.on("error", (error) => {
  if (error && error.code === "EACCES" && port < 1024) {
    console.error(`Port ${port} requires elevated privileges on macOS/Linux.`);
    console.error(`Try: sudo PORT=${port} HOST=${host} node server.js`);
    process.exit(1);
  }

  console.error(error);
  process.exit(1);
});

server.listen(port, host, () => {
  console.log(`Serving ${rootDir} at http://${host}:${port}`);
  console.log(`Same-WiFi access: http://<your-ip>:${port}`);
});
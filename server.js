const http=require("node:http");
const fs=require("node:fs");
const path=require("node:path");
const ROOT=__dirname,PORT=Number(process.env.PORT||3000);
const MIME={".html":"text/html; charset=utf-8",".css":"text/css; charset=utf-8",".js":"text/javascript; charset=utf-8",".json":"application/json; charset=utf-8",".svg":"image/svg+xml",".png":"image/png",".ico":"image/x-icon"};
const server=http.createServer((req,res)=>{
 let pathname;
 try{pathname=decodeURIComponent(new URL(req.url,`http://${req.headers.host||"localhost"}`).pathname)}catch(_){res.writeHead(400);res.end("400 Bad Request");return}
 const relative=pathname==="/"?"index.html":pathname.split("/").filter(Boolean).join("/");
 const file=path.resolve(ROOT,relative);
 if(file!==ROOT&&!file.startsWith(ROOT+path.sep)){res.writeHead(403,{"Content-Type":"text/plain; charset=utf-8"});res.end("403 Forbidden");return}
 fs.readFile(file,(err,data)=>{if(err){res.writeHead(err.code==="ENOENT"?404:500,{"Content-Type":"text/plain; charset=utf-8"});res.end(err.code==="ENOENT"?"404 Not Found":"500 Internal Server Error");return}
 res.writeHead(200,{"Content-Type":MIME[path.extname(file).toLowerCase()]||"application/octet-stream","X-Content-Type-Options":"nosniff","Cache-Control":"no-store"});res.end(data)});
});
server.listen(PORT,"127.0.0.1",()=>console.log(`CampusFlow running at http://localhost:${PORT}\\nPress Ctrl+C to stop.`));
server.on("error",e=>{console.error(`Unable to start server: ${e.message}`);process.exitCode=1});

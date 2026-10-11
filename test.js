const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const read = name => fs.readFileSync(path.join(__dirname, name), "utf8");
const html = read("index.html");
const css = read("styles.css");
const app = read("app.js");
const server = read("server.js");
const pkg = JSON.parse(read("package.json"));
const tests = [];
const test = (name, fn) => tests.push([name, fn]);

test("HTML includes CampusFlow and student directory", () => {
  assert.ok(html.includes("CampusFlow") && html.includes("Student directory") && html.includes("studentTable"));
});
test("Responsive styles and dark theme are included", () => {
  assert.ok(css.includes("@media(max-width:760px)") && css.includes("body.dark"));
});
test("HTML provides CRUD modal, search, filters and export controls", () => {
  for (const id of ["addStudentBtn","studentForm","searchInput","programmeFilter","statusFilter","exportBtn","modalBackdrop"]) assert.ok(html.includes('id="' + id + '"'), "Missing " + id);
});
test("App implements CRUD, search, persistence and CSV export", () => {
  for (const feature of ['data-action="edit"','data-action="delete"',"localStorage","exportCSV","function filtered()","function submit("]) assert.ok(app.includes(feature), "Missing " + feature);
});
test("HTML escaping and initials helpers are present", () => {
  assert.ok(app.includes("function esc(v)") && app.includes("function initials(n)"));
});
test("Server uses built-in HTTP and path safety checks", () => {
  assert.ok(server.includes("createServer") && server.includes("path.resolve") && server.includes("Content-Type") && server.includes("pathname.split"));
});
test("Package scripts expose start, test and syntax checks", () => {
  assert.equal(pkg.scripts.start, "node server.js");
  assert.equal(pkg.scripts.test, "node test.js");
  assert.ok(pkg.scripts.check.includes("node --check"));
});
test("Jenkinsfile has all four pipeline stages and deployment", () => {
  const j = read("Jenkinsfile");
  for (const stage of ["Checkout","Build","Test","Deploy"]) assert.ok(j.includes("stage('" + stage + "')"));
  assert.ok(j.includes("npm test") && j.includes("deployment"));
});
let failed = 0;
for (const [name, fn] of tests) {
  try { fn(); console.log("PASS " + name); }
  catch (error) { failed++; console.error("FAIL " + name + ": " + error.message); }
}
console.log((tests.length - failed) + "/" + tests.length + " tests passed.");
if (failed) process.exit(1);

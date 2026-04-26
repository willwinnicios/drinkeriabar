const d = new Date("invalid");
try {
  d.toLocaleDateString();
  console.log("Success");
} catch(e) {
  console.error("Error:", e.message);
}

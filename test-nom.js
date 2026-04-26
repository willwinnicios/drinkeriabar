async function test() {
  const q = "Pato Branco";
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&addressdetails=1&countrycodes=br&limit=5`;
  const res = await fetch(url, { headers: { 'User-Agent': 'DrinkeriaBar/1.0' }});
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}
test();

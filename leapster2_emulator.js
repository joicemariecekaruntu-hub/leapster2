const canvas = document.getElementById('emulator-screen');
const ctx = canvas.getContext('2d');

const fileInput = document.getElementById('fileInput');

let gameBinData = null; // Will hold the extracted .bin file data

// Handle ZIP file upload
fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      JSZip.loadAsync(e.target.result).then((zip) => {
        // Find all .bin files inside ZIP
        zip.forEach((relativePath, zipEntry) => {
          if (zipEntry.name.endsWith('.bin')) {
            zipEntry.async('arraybuffer').then((data) => {
              gameBinData = data;
              alert(`Loaded game: ${zipEntry.name}`);
              // Here, you can add code to initialize emulation with gameBinData
            });
          }
        });
      });
    };
    reader.readAsArrayBuffer(file);
  }
});

// Basic color palette for demonstration
const palette = [
  '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'
];

// Example function to draw a test pattern
function drawTestPattern() {
  for (let y = 0; y < 240; y += 20) {
    for (let x = 0; x < 320; x += 20) {
      ctx.fillStyle = palette[(x + y) / 20 % palette.length];
      ctx.fillRect(x, y, 20, 20);
    }
  }
}

// Initialize with test pattern
drawTestPattern();

// Emulation loop placeholder
function emulateFrame() {
  // Your emulation code would go here

  // For demo, keep the test pattern
  requestAnimationFrame(emulateFrame);
}

// Start emulation loop
emulateFrame();

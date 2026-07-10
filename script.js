const upload = document.getElementById("upload");
const drop = document.getElementById("drop");
const before = document.getElementById("before");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const qualitySlider = document.getElementById("quality");
const download = document.getElementById("download");

let currentImg;

// Upload function
function handleFile(file) {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = function() {
        currentImg = img;

        before.src = img.src;

        compress();
    }
}

// Compress function
function compress() {
    if (!currentImg) return;

    const quality = qualitySlider.value;

    canvas.width = currentImg.width / 2;
    canvas.height = currentImg.height / 2;

    ctx.drawImage(currentImg, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(function(blob) {
        const url = URL.createObjectURL(blob);
        download.href = url;
        download.download = "compressed.jpg";
    }, "image/jpeg", quality);
}

// File input
upload.addEventListener("change", e => {
    handleFile(e.target.files[0]);
});

// Drag & Drop
drop.addEventListener("dragover", e => {
    e.preventDefault();
});

drop.addEventListener("drop", e => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
});

// Slider change
qualitySlider.addEventListener("input", compress);

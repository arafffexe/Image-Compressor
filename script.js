document.getElementById("upload").addEventListener("change", function(e) {
    const file = e.target.files[0];
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = function() {
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = img.width / 2;
        canvas.height = img.height / 2;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // download link
        const link = document.getElementById("download");
        link.href = canvas.toDataURL("image/jpeg", 0.7);
        link.innerText = "Download Compressed Image";
    }
});

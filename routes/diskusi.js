// Tombol kembali
document.querySelector('.back-btn')?.addEventListener('click', () => {
  alert("Kembali ke halaman utama");
});

// Kirim pertanyaan
document.getElementById('submitQuestion')?.addEventListener('click', () => {
  const input = document.getElementById('questionInput');
  const question = input.value.trim();

  if (!question) {
    alert("Silakan tulis pertanyaan Anda terlebih dahulu.");
    return;
  }

  // Simulasi: tampilkan notifikasi sukses
  alert("✅ Pertanyaan Anda telah dikirim!\nDokter akan menjawab dalam 1x24 jam.");

  // Reset form
  input.value = '';
});

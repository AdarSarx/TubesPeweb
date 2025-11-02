const products = [
  // Vitamin & Suplemen
  {
    id: 1,
    name: "Vitamin C 500 mg",
    category: "vitamin",
    price: 5000,
    image: "vitamin_c.png",
    description: "Vitamin C adalah suplemen esensial yang berfungsi sebagai antioksidan kuat.\n\nManfaatnya termasuk meningkatkan sistem kekebalan tubuh, membantu penyerapan zat besi, dan menjaga kesehatan kulit.",
    dosage: "Dewasa: 1 tablet per hari sesudah makan."
  },
  {
    id: 2,
    name: "Multivitamin Imboost",
    category: "vitamin",
    price: 50000,
    image: "imboost.png",
    description: "Imboost adalah suplemen yang dirancang untuk meningkatkan daya tahan tubuh secara efektif.\n\nManfaatnya adalah membantu mencegah penyakit seperti flu dan mempercepat proses pemulihan saat sakit.",
    dosage: "Dewasa: 1 tablet, 2-3 kali sehari."
  },
  {
    id: 3,
    name: "Minyak Ikan Omega 3",
    category: "vitamin",
    price: 450000,
    image: "omega3.png",
    description: "Omega 3 adalah asam lemak esensial yang penting untuk kesehatan otak dan jantung.\n\nManfaatnya meliputi menjaga kesehatan kardiovaskular, mendukung fungsi kognitif, dan mengurangi peradangan.",
    dosage: "1 kapsul lunak per hari."
  },
  
  // Obat Bebas
  {
    id: 4,
    name: "Paracetamol 500 mg",
    category: "obat-bebas",
    price: 10000,
    image: "paracetamol.png",
    description: "Paracetamol adalah obat analgesik (pereda nyeri) dan antipiretik (penurun demam) yang umum digunakan.\n\nManfaat utamanya adalah meredakan nyeri ringan hingga sedang seperti sakit kepala, sakit gigi, serta menurunkan demam.",
    dosage: "Dewasa: 1-2 tablet, 3-4 kali sehari.\nAnak 6-12 tahun: ½-1 tablet, 3-4 kali sehari. Atau sesuai anjuran dokter."
  },
  {
    id: 5,
    name: "Antasida Doen",
    category: "obat-bebas",
    price: 5000,
    image: "antasida.png",
    description: "Antasida Doen adalah obat yang bekerja dengan cara menetralkan asam lambung yang berlebih.\n\nManfaatnya adalah untuk meredakan gejala sakit maag, seperti mual, nyeri ulu hati, dan perut kembung.",
    dosage: "Kunyah 1-2 tablet, 3-4 kali sehari, 1 jam sebelum makan atau sebelum tidur."
  },
  {
    id: 6,
    name: "OBH Combi 100 ml",
    category: "obat-bebas",
    price: 25000,
    image: "obh.png",
    description: "OBH Combi adalah sirup obat batuk yang efektif untuk meredakan batuk berdahak yang disertai gejala flu.\n\nManfaatnya adalah mengencerkan dahak, melegakan pernapasan, dan meredakan hidung tersumbat.",
    dosage: "Dewasa: 3 kali sehari, 1 sendok takar (15 ml)."
  },

  // Perawatan Tubuh
  {
    id: 7,
    name: "Salep Luka Betadine",
    category: "perawatan",
    price: 20000,
    image: "betadine.png",
    description: "Betadine Salep Antiseptik adalah pertolongan pertama untuk luka gores, luka bakar ringan, dan luka sunat.\n\nManfaatnya adalah untuk membunuh kuman penyebab infeksi sehingga mempercepat penyembuhan luka.",
    dosage: "Oleskan tipis-tipis pada permukaan luka 2-3 kali sehari."
  },
  {
    id: 8,
    name: "Handbody Vaseline 200 ml",
    category: "perawatan",
    price: 30000,
    image: "vaseline.png",
    description: "Vaseline Healthy Bright adalah lotion yang diperkaya dengan Vitamin B3 dan triple sunscreens.\n\nManfaatnya untuk mencerahkan kulit, melembapkan kulit kering, dan melindunginya dari sinar matahari.",
    dosage: "Gunakan ke seluruh permukaan kulit tubuh dua kali sehari untuk hasil terbaik."
  },
  {
    id: 9,
    name: "Shampo Lifebuoy 170 ml",
    category: "perawatan",
    price: 25000,
    image: "lifebuoy.png",
    description: "Shampo Lifebuoy Anti-Dandruff mengandung Milk Protein Lock Formula & Zinc.\n\nManfaatnya adalah untuk membersihkan kulit kepala secara menyeluruh, mengatasi ketombe, dan menjaga rambut tetap sehat.",
    dosage: "Pijat pada rambut yang basah hingga berbusa, lalu bilas hingga bersih. Gunakan secara teratur."
  },

  // Alat Kesehatan
  {
    id: 10,
    name: "Masker Medis 50 pcs",
    category: "alat-kesehatan",
    price: 20000,
    image: "masker.png",
    description: "Masker medis 3-lapis (3 ply) yang dirancang untuk memberikan perlindungan dari debu, polusi, dan partikel mikro lainnya.\n\nManfaatnya adalah menyaring udara dan mencegah penyebaran kuman.",
    dosage: "Gunakan sekali pakai. Ganti masker jika sudah basah atau setelah 4 jam pemakaian."
  },
  {
    id: 11,
    name: "Termometer Digital",
    category: "alat-kesehatan",
    price: 40000,
    image: "termometer.png",
    description: "Termometer digital dengan ujung fleksibel yang memberikan hasil pengukuran suhu tubuh yang cepat dan akurat.\n\nManfaatnya adalah untuk memantau suhu tubuh saat demam dengan mudah dan aman.",
    dosage: "Dapat digunakan secara oral (mulut), rektal (anus), atau aksila (ketiak). Bersihkan ujung termometer sebelum dan sesudah digunakan."
  },
  {
    id: 12,
    name: "Tensimeter Manual",
    category: "alat-kesehatan",
    price: 150000,
    image: "tensimeter.png",
    description: "Tensimeter aneroid (jarum) manual yang dilengkapi dengan stetoskop.\n\nManfaatnya adalah untuk melakukan pengukuran tekanan darah sistolik dan diastolik secara akurat bagi yang sudah terlatih.",
    dosage: "Gunakan pada lengan atas sesuai dengan petunjuk penggunaan alat."
  }
];
/**
 * ============================================================================
 * LOCAL RAG KNOWLEDGE BASE (knowledge.js)
 * ============================================================================
 */

const KNOWLEDGE_BASE = [
    {
        id: "doc-01",
        title: "mengenali jenis hama wereng",
        keywords: ["hama", "wereng"],
        content: `Kenali jenis wereng: Wereng Cokelat (Nilaparvata lugens) paling merusak karena menghisap cairan batang, memicu gejala hopperburn (tanaman menguning lalu mengering seperti terbakar), serta menularkan virus kerdil rumput dan kerdil hampa. Ada juga Wereng Punggung Putih (Sogatella furcifera) dan Wereng Hijau (Nephotettix virescens)..`
    },
    {
        id: "doc-02",
        title: "hewan pembantu pengurangan hama",
        keywords: ["bebek", "itik", "ikan", "hewan", "pengurang hama"],
        content: `Di Indonesia, pemanfaatan hewan untuk menekan hama merupakan bagian dari Pengendalian Hama Terpadu (PHT) dan budidaya terpadu. Hewan-hewan ini membantu memakan hama, gulma, atau organisme pengganggu—dan di sisi lain juga bisa memberi nilai tambah ekonomi.

Berikut hewan yang paling umum dimanfaatkan petani di Indonesia beserta cara kerjanya:

1. Bebek / Itik (Paling Populer di Sawah)
Hama & gulma yang ditekan: Keong mas (Pomacea canaliculata), serangga hama (wereng, ulat, belalang), dan gulma air muda di sela-sela tanaman padi.

Cara penerapan: Biasanya dilepas pada waktu tertentu—misalnya sebelum tanam, saat padi sudah cukup kuat/berumur tertentu (setelah fase bibit sangat muda agar tidak terinjak/tercabut), atau setelah panen untuk memakan sisa gabah dan hama yang tersisa.

Keuntungan tambahan: Kotoran bebek menyumbang bahan organik ke tanah dan bebek sendiri bisa dipanen untuk telur atau daging.

2. Ikan (Sistem Mina-Padi / Rice-Fish)
Hama & organisme yang ditekan: Membantu menekan jentik serangga air, sebagian hama/gulma kecil, serta menjaga keseimbangan ekosistem air sawah.

Jenis yang umum dipakai: Ikan nila, ikan mas, atau lele/patin (tergantung ketersediaan air, kedalaman parit/caren, dan sistem budidaya).

Catatan pengelolaan: Memerlukan saluran/caren atau bagian yang lebih dalam sebagai tempat berlindung ikan saat air menyusut atau suhu panas, serta harus berhati-hati bila ada aplikasi pestisida.

3. Burung Hantu (Tyto alba)
Hama yang ditekan: Tikus sawah (Rattus argentiventer), salah satu hama paling merugikan pada tanaman padi dan palawija.

Cara penerapan: Banyak kelompok tani atau desa memasang rumah burung hantu (rubuha) di area persawahan sebagai tempat bersarang alami agar populasi burung hantu tetap terjaga di sekitar lahan.

4. Predator Alami Kecil di Ekosistem Sawah & Kebun
Selain ternak/hewan besar, serangga dan arthropoda predator alami sebenarnya menjadi "tentara garis depan" yang paling sering bekerja di lahan tanpa perlu diternakkan khusus:

Laba-laba (seperti laba-laba serigala / Lycosa): Memangsa wereng, ngengat, dan serangga kecil lainnya.

Kepik predator (Cyrtorhinus lividipennis) & kumbang Paederus: Membantu menekan telur, nimfa, atau larva hama seperti wereng dan penggerek/ulat.

Capung & burung pemakan serangga: Membantu mengendalikan serangga terbang di sekitar pertanaman.

Hal yang Perlu Diperhatikan di Lapangan
Waktu pelepasan: Melepas bebek terlalu awal saat bibit padi masih sangat muda bisa merusak tanaman, begitu juga melepas hewan terlalu dekat dengan jadwal penyemprotan pestisida dapat membahayakan hewan tersebut.

Keseimbangan ekosistem: Hewan bukan pengganti tunggal untuk semua hama—tetap perlu dipadukan dengan sanitasi lahan, tanam serempak, pengelolaan air/pupuk berimbang, dan pemantauan rutin..`
    },
    {
        id: "doc-01",
        title: "jenis jenis pestisida",
        keywords: ["pestisida"],
        content: `🌱 Berikut jenis-jenis pestisida yang umum digunakan dalam pertanian:
- 🐛 Insektisida → untuk mengendalikan serangga.
- 🍄 Fungisida → untuk mengendalikan penyakit jamur.
- 🌿 Herbisida → untuk mengendalikan gulma.
- 🐭 Rodentisida → untuk mengendalikan tikus.
- 🕷️ Akarisida → untuk mengendalikan tungau.
- 🪱 Nematisida → untuk mengendalikan nematoda.
- 🦠 Bakterisida → untuk mengendalikan penyakit bakteri.
- 🐌 Moluskisida → untuk mengendalikan keong mas dan siput.
Tips: Pilih jenis pestisida berdasarkan organisme pengganggu yang menyerang tanaman, bukan berdasarkan merek dagangnya. Penggunaan yang tepat membantu meningkatkan efektivitas sekaligus mengurangi dampak terhadap lingkungan.`
    },
];

Object.freeze(KNOWLEDGE_BASE);

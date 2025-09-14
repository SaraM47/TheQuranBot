const fetch = require("node-fetch");

const QURAN_API_BASE = "https://quranapi.pages.dev/api";

const RECITERS = {
  mishary_rashid_alafasy: { id: 1, name: "Mishary Rashid Al Afasy" },
  abu_bakr_al_shatri: { id: 2, name: "Abu Bakr Al Shatri" },
  nasser_al_qatami: { id: 3, name: "Nasser Al Qatami" },
  yasser_al_dosari: { id: 4, name: "Yasser Al Dosari" },
  hani_ar_rifai: { id: 5, name: "Hani Ar Rifai" },
};

// Cache for surah
let surahCache = null;

/**
 * Gets all surahs from API
 */
async function fetchSurahs() {
    if (surahCache) return surahCache;
  
    try {
      const res = await fetch(`${QURAN_API_BASE}/surah.json`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
  
      surahCache = data.map((s, i) => ({
        ...s,
        surahNo: i + 1,
      }));
  
      console.log("Surah data cached successfully");
      return surahCache;
    } catch (err) {
      console.error("Error fetching surahs:", err);
      return [];
    }
  }  

/**
* Find surah based on number or name
 */
async function getSurahInfo(input) {
  const surahs = await fetchSurahs();
  const cleanInput = input.trim().toLowerCase();

  const surahNo = parseInt(cleanInput);
  if (!isNaN(surahNo)) {
    return surahs[surahNo - 1];
  }

  return surahs.find(
    (s) =>
      s.surahName.toLowerCase() === cleanInput ||
      s.surahNameArabic.toLowerCase() === cleanInput
  );
}

/**
 * Get audio URL for an entire surah (chapter recitation)
 */
async function getAudioUrl(surahNumber, reciterId) {
    try {
      const url = `${QURAN_API_BASE}/audio/${surahNumber}.json`;
      let res = await fetch(url);
  
      if (res.ok) {
        const data = await res.json();
        console.log("Available reciters for this surah:", Object.keys(data));
  
        let reciter = data[reciterId] || data[1]; 
        const audioUrl = reciter.originalUrl || reciter.url;
        console.log(`Full surah audio URL for Surah ${surahNumber}: ${audioUrl}`);
        return audioUrl;
      }
  
      console.warn(`Full surah audio not found for Surah ${surahNumber}, trying per-ayah fallback`);
  
      const ayahUrl = `${QURAN_API_BASE}/audio/${surahNumber}/1.json`;
      res = await fetch(ayahUrl);
      if (!res.ok) throw new Error(`Ayah audio also missing: HTTP ${res.status}`);
  
      const data = await res.json();
      let reciter = data[reciterId] || data[1]; 
      const audioUrl = reciter.originalUrl || reciter.url;
      console.log(`🎵 First ayah audio URL for Surah ${surahNumber}: ${audioUrl}`);
      return audioUrl;
  
    } catch (err) {
      console.error("Error fetching audio URL:", err);
      return null;
    }
  }
  
module.exports = {
  getSurahInfo,
  getAudioUrl,
  fetchSurahs,
  RECITERS,
};
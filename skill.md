🧠 0. ANA SİSTEM MANTIĞI

Platformun çekirdeği şu 3 şey:

İlan (Supply)
İstek (Demand)
Eşleşme (Matching Engine)

Bunu şöyle düşün:

Kullanıcı → İlan oluşturur
         → İstek belirtir
         → Sistem eşleşme önerir
         → Kullanıcı etkileşir → Sistem öğrenir
⚙️ 1. VERİ MODELİ (TEMEL ALTYAPI)

Önce veri düzgün olmazsa algoritma çöp olur.

👤 User Table
user_id
location (lat, long)
trust_score
created_at
📦 Item (İlan)
item_id
owner_id
category
tags[]
estimated_value
location
created_at
quality_score
🎯 Demand (İstek)
demand_id
user_id
desired_categories[]
desired_tags[]
min_value
max_value
🔁 Swap Graph (kritik)
from_item_id
to_desired_category
weight (istek gücü)
🔄 2. ANA ALGORİTMA AKIŞI
AŞAMA 1 — Aday Havuzu (Candidate Generation)

Amaç: 10.000 ilan içinden 50 taneye düşmek

candidates =
    konum_filtre (<= 30km)
  ∩ kategori_uyum
  ∩ aktif_ilanlar

Pseudo:

candidates = filter(items,
    distance(user, item) < 30km
    AND item.category IN user.interests
)
AŞAMA 2 — Skorlama (Ranking Engine)

Her ilana bir skor verilir:

🎯 Final Score
score =
    (interest_score * 0.35)
  + (distance_score * 0.20)
  + (fairness_score * 0.15)
  + (trust_score * 0.15)
  + (trend_score * 0.10)
  + (quality_score * 0.05)
🧩 3. ALT ALGORİTMALAR (TEK TEK)
3.1 🎥 Interest Score (Davranış Bazlı)
interest_score =
    (kategori_benzerliği)
  + (etiket_benzerliği)
  + (geçmiş_etkileşim)

Davranış ağırlıkları:

view = +1
click = +3
favorite = +5
message = +8
skip = -2
3.2 📍 Distance Score
distance_score = 1 / (1 + distance_km)

Boost:

aynı mahalle → x1.5
aynı şehir → x1.2
3.3 ⚖️ Fairness Score
fairness = min(A, B) / max(A, B)

Gelişmiş:

kullanıcı davranışıyla düzelt:
bazı kullanıcılar düşük değere razı → öğren
3.4 🛡️ Trust Score
trust =
    (rating * 0.4)
  + (completed_swaps * 0.3)
  + (account_age * 0.2)
  - (cancellation_rate * 0.1)
3.5 🔥 Trend Score
trend =
    (views * 0.3)
  + (messages * 0.5)
  + (favorites * 0.2)
3.6 🧹 Quality Score
quality =
    (photo_count * 0.4)
  + (description_length * 0.3)
  + (engagement * 0.3)
🔁 4. TAKAS MOTORU (MATCHING ENGINE)

Burası seni rakiplerden ayırır.

🧠 4.1 İkili Eşleşme
A → B'nin istediği var mı?
B → A'nın istediği var mı?

Varsa → MATCH ✅

🔺 4.2 Çoklu Takas (Cycle Detection)

Graf oluştur:

Item A → wants B
Item B → wants C
Item C → wants A

👉 Cycle = TAKAS

Algoritma:

DFS veya Tarjan SCC
max cycle length = 4 (performans için)
⚙️ Pseudo:
for item in items:
  find_cycles(graph, max_depth=4)
🎯 UX Çıktısı:

“3 kişilik takas bulundu”

📱 5. FEED ALGORİTMASI (SHORT STYLE)
AŞAMA 1: Başlangıç
feed =
  %40 popüler
  %30 yakın
  %30 random
AŞAMA 2: Öğrenme

20 swipe sonrası:

feed = tamamen kişiselleştirilmiş
AŞAMA 3: Reel-time update

Her swipe sonrası:

update_user_vector(action)
recalculate_scores()
🧠 6. USER EMBEDDING (GELİŞMİŞ AMA ÖNEMLİ)

Kullanıcıyı vektöre çevir:

user_vector = [
  kategori1 ilgisi,
  kategori2 ilgisi,
  fiyat toleransı,
  mesafe toleransı
]

İlan da vektör olur → cosine similarity

🚨 7. SPAM & FRAUD FİLTRE
if same_image_detected:
    downrank

if too_many_posts:
    limit

if low_response_rate:
    penalty
🔁 8. FEEDBACK LOOP

Her aksiyon sonrası:

model öğrenir
→ daha iyi öneri
🗺️ 9. GELİŞTİRME YOL HARİTASI
🟢 MVP (ilk 1–2 ay)
ilan sistemi
basit eşleşme (2’li)
konum filtresi
basic feed
🟡 V2
interest scoring
trust system
trend sistemi
🔴 V3 (asıl fark burada)
multi-swap (3’lü takas)
ML tabanlı öneri
embedding sistemi
⚠️ GERÇEK UYARI

Şu hatayı yaparsan proje ölür:

❌ sadece “ilan listesi” yaparsan
❌ eşleşme zayıf olursa
❌ kullanıcı “aradığını bulamazsa”

👉 insanlar 3 gün sonra bırakır

💡 STRATEJİK ÖNERİ

Başta şuna odaklan:

“Kullanıcıya 24 saat içinde ilk başarılı takasını yaptırmak”

Bunu başarırsan platform tutar.



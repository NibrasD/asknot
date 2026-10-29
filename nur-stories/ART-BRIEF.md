# دليل الرسومات — قصة «البرج الذي سقط» / «Башня упала»

هذا الملف يحدد **كل صورة** يحتاجها المشروع، لكل نسخة، مع وصف المشهد وأمر التوليد (Prompt) الجاهز لـ Adobe Firefly.
يصلح أيضًا كتكليف لرسّام بشري كما هو.

## القواعد العامة (لكل الصور)

- **المقاس:** أفقي 4:3 (مثلًا 1600×1200). الصيغة: `.jpg` أو `.webp` أو `.png`.
- **بدون أي نص** داخل الصورة (لا حروف، لا كلمات، لا فقاعات كلام). الفقاعات والنصوص يضيفها الموقع فوق الصورة.
- **اترك مساحة فارغة هادئة في الثلث العلوي** من الصورة، لأن فقاعة الكلام توضع هناك.
- **المكعّبات بلا حروف** (خشب ملوّن سادة) — لأن أدوات التوليد تخطئ في الحروف.
- **الأسلوب الواحد لكل الصور:** رسم كتب أطفال يدوي، ألوان مائية وأقلام رصاص ملوّنة، خطوط قلم حبر دافئة غير منتظمة، ملمس ورق، ألوان دافئة هادئة، تعابير وجه واضحة ولطيفة.
- **الحشمة:** ملابس طويلة ومحتشمة، البنت بحجاب، لا موسيقى ولا صور ذوات أرواح معلّقة على الجدران.
- **ثبات الشخصيات:** ولّد «ورقة الشخصية» أولًا (القسم أدناه)، ثم استعملها كـ *Style reference / Structure reference* في Firefly لكل مشهد حتى تبقى الشخصيات نفسها.

### جملة الأسلوب (تُلصق في آخر كل Prompt)

```
Style: hand-painted children's picture book illustration, watercolor and colored pencil on textured paper, warm loose ink outlines, soft natural lighting, gentle muted warm palette, expressive friendly faces, modest clothing, no text, no letters, no words, no speech bubbles, plain wooden toy blocks without letters, calm empty space in the upper third of the image, 4:3 landscape.
```

### جملة ملف التلوين (للصور `*-line`)

```
Style: black and white coloring book page for children, clean bold black outlines only, no shading, no gray, no color, no texture, large simple closed shapes easy to color, white background, no text, no letters, 4:3 landscape.
```

---

## النسخة العربية — `images/ar/`

**الشخصيات**
- **عمر:** ولد عربي عمره ٧ سنوات، بشرة حنطية، شعر أسود قصير مجعّد قليلًا، عيون بنية، يلبس ثوبًا (دشداشة) أبيض قصير الأكمام قليلًا عند المعصم، صندل بني.
- **أمينة:** أخته، ٥ سنوات، بشرة حنطية فاتحة، حجاب وردي فاتح ناعم، فستان طويل أخضر فيروزي بحاشية صفراء، حذاء أحمر صغير.
- **المكان:** صالة بيت عربي دافئة: جدار جصّي بلون الرمل، شبّاك مقوّس بمشربية خشبية، جلسة أرضية (مجلس) بوسائد حمراء، سجادة حمراء بنقوش هندسية، فانوس نحاسي معلّق، نبتة.

**ورقة الشخصية (ولّدها أولًا):**
```
Character sheet of two Arab Muslim siblings for a children's book: Omar, a 7-year-old Arab boy with light-brown skin, short slightly curly black hair, brown eyes, wearing a white thobe and brown sandals; and his little sister Amina, 5 years old, light-brown skin, soft light-pink hijab, long teal dress with yellow hem, small red shoes. Front view, full body, standing side by side, friendly smiles, plain cream background. [جملة الأسلوب]
```

| الملف | المشهد | Prompt (يُضاف بعده «جملة الأسلوب») |
|---|---|---|
| `cover` | غلاف | Omar kneeling on a red patterned rug in a warm Arab living room proudly building a tall tower of plain wooden blocks while his little sister Amina in a pink hijab peeks in from the doorway holding a drawing, arched mashrabiya window, floor cushions, brass lantern. |
| `p1` | عمر يبدأ البناء | Omar kneeling on a red geometric rug in a warm Arab living room, happily placing a third plain wooden block on a small tower, sand-colored plaster wall, arched wooden mashrabiya window, red floor cushions along the wall, hanging brass lantern. |
| `p2` | البرج يعلو | Same room, Omar kneeling and reaching up to place a block on a tower of six plain wooden blocks, focused happy face, tongue slightly out in concentration. |
| `p3` | البرج أطول منه | Same room, Omar standing next to a tower of plain wooden blocks that is taller than him, both arms raised in joy, big proud smile. |
| `p4` | أمينة تدخل | Same room, Omar standing beside his tall block tower; his little sister Amina in a pink hijab and teal dress runs in from the right side holding up her crayon drawing of a sun and sea, very excited. |
| `p5` | سقوط البرج | Same room, Amina accidentally bumps the tall tower while running; plain wooden blocks fly through the air, her drawing flutters away, Omar on the left with hands on his cheeks and mouth open in shock, Amina surprised and off balance. Dynamic but gentle, nobody hurt. |
| `p6` | عمر يغضب | Same room, closer view: Omar standing with clenched fists and a red angry face, frowning; Amina on the left looking small and sorry, hands together, a tear on her cheek; scattered wooden blocks on the rug. |
| `p7` | لحظة التفكير | Close-up of Omar's face and shoulders, still upset but thinking, eyebrows pulled together, eyes looking up to the side, empty space on both upper sides of the image. |
| `bad` | الاختيار الخاطئ | Same room: Omar shouting angrily and pointing at his little sister Amina, who is crying with her hands near her face; scattered wooden blocks on the rug. |
| `good` | الاختيار الصحيح | Same room: Omar kneeling with a calm kind smile, handing a wooden block to his little sister Amina, who smiles with relief; together they start a new small tower on the rug; warm cozy feeling. |
| `bad-line` | تلوين | (صفّ نفس مشهد `bad` + «جملة ملف التلوين») |
| `good-line` | تلوين | (صفّ نفس مشهد `good` + «جملة ملف التلوين») |

---

## النسخة الروسية — `images/ru/`

**الشخصيات**
- **تيمور (Тимур):** ولد تتري/باشكيري عمره ٧ سنوات، بشرة فاتحة، شعر بني فاتح قصير، يلبس **تُوبيتيكا** (قلنسوة تترية مخملية خضراء مطرّزة بخيط ذهبي)، كنزة صوف زرقاء بشريط أحمر بنقش متعرّج، بنطال رمادي غامق، شبشب بيت أحمر.
- **عليّة (Алия):** أخته، ٥ سنوات، بشرة فاتحة، **منديل/حجاب أبيض بورود حمراء صغيرة** (طراز «بلاتوك» تتري)، فستان طويل بنفسجي بحاشية ذهبية، جوارب زرقاء.
- **المكان:** غرفة شقة في قازان شتاءً: ورق جدران فاتح بزهور صغيرة، **سجادة جدارية حمراء بنقش تقليدي** معلّقة على الجدار، شبّاك أبيض يطلّ على ثلج وأشجار بتولا (بيريوزا)، **مشعاع تدفئة** تحت الشبّاك، أرضية باركيه، سجادة دائرية منسوجة ملوّنة.

**ورقة الشخصية (ولّدها أولًا):**
```
Character sheet of two Tatar Muslim siblings from Kazan, Russia, for a children's book: Timur, a 7-year-old boy with fair skin and short light-brown hair, wearing a green velvet Tatar tubeteika skullcap with gold embroidery, a blue knitted sweater with a red zigzag ornament band, dark gray trousers and red house slippers; and his little sister Aliya, 5 years old, fair skin, a white headscarf with small red flowers tied modestly, long purple dress with golden hem, blue socks. Front view, full body, standing side by side, friendly smiles, plain cream background. [جملة الأسلوب]
```

| الملف | المشهد | Prompt (يُضاف بعده «جملة الأسلوب») |
|---|---|---|
| `cover` | غلاف | Timur kneeling on a round colorful woven rug in a cozy Kazan apartment in winter, proudly building a tall tower of plain wooden blocks, while his little sister Aliya in a white flowered headscarf peeks in holding a drawing; red ornamental carpet on the wall, white window with snow and birch trees, radiator under the window. |
| `p1` | تيمور يبدأ البناء | Timur kneeling on a round woven rug in a cozy Russian apartment in winter, happily placing a third plain wooden block on a small tower; light floral wallpaper, traditional red patterned carpet hanging on the wall, white window with falling snow and birch trees outside, radiator below the window, parquet floor. |
| `p2` | البرج يعلو | Same room, Timur kneeling and reaching up to place a block on a tower of six plain wooden blocks, focused happy face. |
| `p3` | البرج أطول منه | Same room, Timur standing next to a tower of plain wooden blocks taller than him, both arms raised in joy, big proud smile. |
| `p4` | عليّة تدخل | Same room, Timur standing beside his tall block tower; his little sister Aliya in a white flowered headscarf and purple dress runs in from the right holding up her crayon drawing of a sun and sea, very excited. |
| `p5` | سقوط البرج | Same room, Aliya accidentally bumps the tall tower while running; plain wooden blocks fly through the air, her drawing flutters away, Timur on the left with hands on his cheeks and mouth open in shock, Aliya surprised and off balance. Gentle, nobody hurt. |
| `p6` | تيمور يغضب | Same room, closer view: Timur standing with clenched fists and a red angry face; Aliya on the left looking small and sorry, hands together, a tear on her cheek; scattered wooden blocks on the rug. |
| `p7` | لحظة التفكير | Close-up of Timur's face and shoulders in his tubeteika, upset but thinking, eyebrows pulled together, eyes looking up to the side, empty space on both upper sides. |
| `bad` | الاختيار الخاطئ | Same room: Timur shouting angrily and pointing at his little sister Aliya, who is crying; scattered wooden blocks on the rug. |
| `good` | الاختيار الصحيح | Same room: Timur kneeling with a calm kind smile, handing a wooden block to Aliya, who smiles with relief; together they start a new small tower; warm cozy winter feeling. |
| `bad-line` | تلوين | (نفس مشهد `bad` + «جملة ملف التلوين») |
| `good-line` | تلوين | (نفس مشهد `good` + «جملة ملف التلوين») |

---

## بعد التوليد

1. ضع كل صورة باسمها في المجلد الصحيح (مثال: `images/ar/p1.jpg`).
2. افتح الموقع — الصور تظهر تلقائيًا مكان الإطارات «الرسم قيد الإعداد».
3. إن غطّت فقاعةُ كلامٍ وجهَ شخصية، عدّل موضعها في `data/ar.js` أو `data/ru.js` (الحقلان `x` و`y` نسبة مئوية من عرض/ارتفاع الصورة).
4. راجع كل صورة بعين ناقدة: الأيدي والأصابع، ثبات ملامح الشخصيات بين اللوحات، الحجاب يغطي الشعر، لا نص داخل الصورة.

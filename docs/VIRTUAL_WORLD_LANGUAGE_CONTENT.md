# Virtual World V0.4 — language content

World locales are `my`, `en`, `ja`; visible choices are **မြန်မာ / English / 日本語**. A valid saved `vw-language` wins, followed by a supported browser language, then English. Invalid/inherited object-property names are rejected. Storage failure is handled; existing `mw-*` preferences are untouched. `html.lang` follows the current selection. Myanmar text is Unicode; there is no Zawgyi conversion or online translation. Native-speaker/customer approval remains pending.

## Coverage and review

570 semantic keys each have English, Myanmar and Japanese values with matching interpolation placeholders. The dictionary table below contains the shipped visitor copy for review. Showroom purpose, exploration route, five layout descriptions, three full product explanations, concept limitations and app-language guidance are included. The same state covers welcome/loading/help, prompts, map labels, home, office/news links, mall/catalog/cart, avatar, garage, race, range, golf and gym.

World layout IDs remain `i/type-i`, `ii/type-ii`, `l/type-l`, `peninsula/face-to-face`, `island/island`. In every translation the L Sink is on the long leg, and Cooktop/Hood are on the perpendicular short return. Models and installation qualifications are unchanged.

## Intentional identifiers

Virtual World, Panasonic, S-CLASS, Raku-Suru/ラクするー, Flat Wide, Alacrity Research, Tun-PS-Lin, GitHub and the five car model names remain appropriate names. I/II/L, bay numbers, N compass marker, key symbols, URLs, currency/numerical units, hex colour values and debug measurements are identifiers. Generic merchandise names and all descriptions are translated. Existing fictional model identifiers retained verbatim:

- Air Slim 13"
- Pro Studio 16"
- Gamer X 17"
- Flip 2-in-1
- Chromebook Go
- Creator 15" OLED
- Nova 15 Pro
- Nova 15
- Fold Z
- Tab Pro 12.9"
- Tab Mini
- Alpha DSLR Kit
- Mirrorless M5
- Action Cam 12
- Studio Max Headphones
- Beat Pop Headphones
- Smartwatch S9
- PlayBox Series
- Switcheroo OLED
- VR Headset Quest
- RGB Tower RTX
- Boom Portable
- SkyPro 4K Drone
- FPV Racer

External page content belongs to its own application. The unchanged S-CLASS destination is [S-CLASS kitchen](https://game-s-class-kitchen.iida-mm.com/), opened with `target=_blank` and `noopener noreferrer`. World visitors receive translated guidance to choose a language in that app. World `my` does not change the kitchen app's existing `mm`; no forwarding/query/iframe contract was added.

## Runtime and font details

Panel owners rerender their existing body through one callback, keeping their closure state and close ownership. Focus, scroll and keyed input values/selection are restored; real stateful screens retain gallery index, cart, avatar tab/look and car options. The persistent modal selector is in the Tab loop while HUD/world stay inert. The welcome/HUD selectors share the same state and minimum 44 px native input height. Language input clears held controls; a held golf charge cannot become an unintended putt.

Signs retain their canvas/texture resource after static baking. Stable message/style/dimension keys reuse cached materials; current-language text redraws the same canvases after a language/font event. Identifier signs also redraw for font consistency. Custom news/map/contribution/race-poster/product screens reuse their resources and existing updates. Minimap region shapes remain prerendered, while labels resolve on draw; overlapping/out-of-bounds labels are skipped, with canonical bay numbers and I/II/L on compact maps and on longer-script maps. Full names remain in the guide.

Locally served font subsets have requested weight range 400–700, one WOFF2 file per family, with SIL OFL 1.1 license/source records. Startup waits at most 1.8 seconds for the selected face; late faces redraw current text, and stale requests cannot revert the selection. Failure uses Myanmar Text / Yu Gothic / Meiryo and other system fallbacks, allowing play. DOM and canvas stacks match; Myanmar paragraphs/buttons have extra line spacing. Subset characters cover every shipped dictionary character.

| Locale | Family | Local file | Bytes | License |
| --- | --- | --- | ---: | --- |
| my | Noto Sans Myanmar | [vw-myanmar.woff2](<C:/Users/OE-DKP-20-006/Videos/ThreeJS-Roblox/Mingalar-World-main/Mingalar-World-main/public/fonts/vw-myanmar.woff2>) | 85,584 | [OFL source](https://raw.githubusercontent.com/google/fonts/main/ofl/notosansmyanmar/OFL.txt) |
| ja | Noto Sans JP | [vw-japanese.woff2](<C:/Users/OE-DKP-20-006/Videos/ThreeJS-Roblox/Mingalar-World-main/Mingalar-World-main/public/fonts/vw-japanese.woff2>) | 223,668 | [OFL source](https://raw.githubusercontent.com/google/fonts/main/ofl/notosansjp/OFL.txt) |
| en | Fredoka | [fredoka.woff2](<C:/Users/OE-DKP-20-006/Videos/ThreeJS-Roblox/Mingalar-World-main/Mingalar-World-main/public/fonts/fredoka.woff2>) | 20,392 | [OFL source](https://raw.githubusercontent.com/google/fonts/main/ofl/fredoka/OFL.txt) |

[Font download/source hashes](<C:/Users/OE-DKP-20-006/Videos/ThreeJS-Roblox/Mingalar-World-main/Mingalar-World-main/public/fonts/sources.json>)

## Complete content table

| Semantic key | English | မြန်မာ | 日本語 |
| --- | --- | --- | --- |
| showroom.place | Panasonic S-CLASS Showroom | Panasonic S-CLASS ပြခန်း | Panasonic S-CLASS展示室 |
| race.bestDetails | Best lap {best} · Personal best in the {name}: {personal} | အကောင်းဆုံးပတ် {best} · {name} ဖြင့်ကိုယ်ပိုင်အကောင်းဆုံး: {personal} | ベストラップ {best} · {name} の自己ベスト：{personal} |
| range.headLabel | HEADSHOT | ခေါင်းထိ | ヘッドショット |
| range.bullseyeLabel | BULLSEYE | ဗဟိုထိ | ど真ん中 |
| sign.bayHeading | {number}  {heading} | {number}  {heading} | {number}  {heading} |
| world.home | Luxury Home | အဆင့်မြင့်အိမ် | 邸宅 |
| world.homeSign | LUXURY HOME GALLERY | အဆင့်မြင့်အိမ်ပြခန်း | 邸宅ギャラリー |
| world.homePrompt | Tour the Luxury Home Gallery | အိမ်ပြခန်းကို လေ့လာမည် | 邸宅ギャラリーを見学 |
| world.pool | Pool | ရေကူးကန် | プール |
| world.poolSign | POOL | ရေကူးကန် | プール |
| world.gym | Gym | အားကစားခန်း | ジム |
| world.gymSign | GYM | အားကစားခန်း | ジム |
| world.workout | Start a workout | လေ့ကျင့်ခန်းစမည် | 運動を始める |
| world.golf | Mini Golf | ဂေါက်အသေးစား | ミニゴルフ |
| world.golfSign | MINI GOLF | ဂေါက်အသေးစား | ミニゴルフ |
| world.golfPrompt | Play Mini Golf | ဂေါက်အသေးစားကစားမည် | ミニゴルフを遊ぶ |
| world.fountain | Fountain | ရေပန်း | 噴水 |
| world.court | Court | အားကစားကွင်း | コート |
| world.pond | Pond | ရေကန် | 池 |
| world.garden | Garden | ဥယျာဉ် | 庭園 |
| world.spawn | Spawn | စတင်နေရာ | 出発点 |
| world.bus | BUS | ဘတ်စ်ကား | バス |
| workout.touch | Jumping jacks! Move the stick to stop | လက်ခြေဖြန့်ခုန်နေသည်။ ရပ်ရန် လှုပ်ရှားခလုတ်ကို ရွှေ့ပါ | ジャンピングジャック！スティックを動かすと終了 |
| workout.desktop | Jumping jacks! Move or press E to stop | လက်ခြေဖြန့်ခုန်နေသည်။ ရပ်ရန် ရွေ့ပါ သို့မဟုတ် E ကိုနှိပ်ပါ | ジャンピングジャック！移動または E で終了 |
| workout.done | Workout done: {count} jumping jacks | လေ့ကျင့်ခန်းပြီးပြီ။ လက်ခြေဖြန့်ခုန် {count} ကြိမ် | 運動終了：ジャンピングジャック {count} 回 |
| workout.status | Jumping jacks | လက်ခြေဖြန့်ခုန် | ジャンピングジャック |
| home.living | Living Room | ဧည့်ခန်း | リビング |
| home.livingText | Double-height glass wall facing the garden, with a sunken lounge and fireplace. | ဥယျာဉ်ဘက်သို့ မျက်နှာမူသော နှစ်ထပ်မြင့်မှန်နံရံ၊ အနိမ့်ချထားသော ဧည့်နေရာနှင့် မီးဖိုရှိသည်။ | 庭に面した吹き抜けのガラス壁、床を下げたラウンジ、暖炉があります。 |
| home.kitchen | Chef’s Kitchen | စားဖိုမှူးမီးဖိုခန်း | シェフのキッチン |
| home.kitchenText | Stone island, integrated appliances and a walk-in pantry behind a hidden door. | ကျောက်သားကျွန်းကောင်တာ၊ ထည့်သွင်းထားသော စက်ပစ္စည်းများနှင့် ဝှက်ထားသောတံခါးနောက်တွင် ဝင်လျှောက်နိုင်သော စားစရာသိုလှောင်ခန်းရှိသည်။ | 石のアイランド、組み込み機器、隠し扉の奥にウォークインパントリーがあります。 |
| home.suite | Master Suite | ပင်မအိပ်ခန်းတွဲ | 主寝室スイート |
| home.suiteText | Corner suite with a private balcony, dressing room and spa bathroom. | ထောင့်အခန်းတွဲတွင် ကိုယ်ပိုင်လသာဆောင်၊ အဝတ်လဲခန်းနှင့် စပါပုံစံရေချိုးခန်းရှိသည်။ | コーナースイートに専用バルコニー、着替え室、スパ風の浴室があります。 |
| home.cinema | Home Cinema | အိမ်တွင်းရုပ်ရှင်ခန်း | ホームシネマ |
| home.cinemaText | Eight reclining seats, acoustic panelling and a starlight ceiling. | နောက်လှန်နိုင်သောထိုင်ခုံ ရှစ်လုံး၊ အသံထိန်းနံရံအကန့်များနှင့် ကြယ်ရောင်မျက်နှာကျက်ရှိသည်။ | リクライニング席8席、防音パネル、星空を模した天井があります。 |
| home.terrace | Roof Terrace | အမိုးပေါ်အပန်းဖြေနေရာ | 屋上テラス |
| home.terraceText | Open-air lounge with an outdoor kitchen and sunset views over the town. | အပြင်မီးဖိုခန်းနှင့် မြို့အပေါ် နေဝင်ချိန်ရှုခင်းကို မြင်နိုင်သော လေဟာပြင်အပန်းဖြေနေရာဖြစ်သည်။ | 屋外キッチンがあり、街の夕景を眺められるオープンエアのラウンジです。 |
| home.smart | Smart lighting | စမတ်မီးအလင်း | スマート照明 |
| home.gardenView | Garden view | ဥယျာဉ်မြင်ကွင်း | 庭園の眺め |
| home.seating | Island seating | ကျွန်းကောင်တာထိုင်နေရာ | アイランド席 |
| home.wine | Wine wall | ဝိုင်စင်နံရံ | ワインウォール |
| home.pantry | Pantry | စားစရာသိုလှောင်ခန်း | パントリー |
| home.balcony | Balcony | လသာဆောင် | バルコニー |
| home.dressing | Dressing room | အဝတ်လဲခန်း | 着替え室 |
| home.spa | Spa bath | စပါရေချိုးခန်း | スパバス |
| home.seats | 8 seats | ထိုင်ခုံ ၈ လုံး | 8席 |
| home.laser | 4K laser | 4K လေဆာ | 4Kレーザー |
| home.sound | Soundproofed | အသံလုံထား | 防音 |
| home.outdoor | Outdoor kitchen | အပြင်မီးဖိုခန်း | 屋外キッチン |
| home.fire | Fire pit | မီးဖိုဝိုင်း | ファイヤーピット |
| home.solar | Solar roof | နေရောင်ခြည်စွမ်းအင်အမိုး | ソーラールーフ |
| home.off | Turn house lights off | အိမ်မီးပိတ်မည် | 家の照明を消す |
| home.on | Turn house lights on | အိမ်မီးဖွင့်မည် | 家の照明をつける |
| home.note | Placeholder rooms. Swap in real photos or renders later. | နမူနာအခန်းများဖြစ်သည်။ နောက်ပိုင်းတွင် အမှန်တကယ်ဓာတ်ပုံ သို့မဟုတ် ပုံဖော်ထားသောပုံများဖြင့် အစားထိုးနိုင်သည်။ | 仮の部屋です。後から実際の写真やレンダリング画像に差し替えられます。 |
| home.tour | Gallery tour | ပြခန်းလေ့လာခြင်း | ギャラリー見学 |
| home.previous | Previous room | ယခင်အခန်း | 前の部屋 |
| home.next | Next room | နောက်အခန်း | 次の部屋 |
| office.name | Virtual Office | Virtual ရုံး | Virtualオフィス |
| office.sign | VIRTUAL OFFICE | Virtual ရုံး | Virtualオフィス |
| office.enter | Enter the Virtual Office | Virtual ရုံးသို့ဝင်မည် | Virtualオフィスに入る |
| office.welcome | Welcome to the Virtual Office | Virtual ရုံးမှ ကြိုဆိုပါသည် | Virtualオフィスへようこそ |
| office.exit | Exit to the street | လမ်းသို့ထွက်မည် | 通りへ出る |
| office.exitSign | EXIT | ထွက်ပေါက် | 出口 |
| office.reception | Reception | ဧည့်ကြို | 受付 |
| office.talk | Talk to reception | ဧည့်ကြိုနှင့်ပြောမည် | 受付で案内を聞く |
| office.intro | Welcome to the Virtual Office! Three teams work on this floor: | Virtual ရုံးမှ ကြိုဆိုပါသည်။ ဤထပ်တွင် အဖွဲ့သုံးဖွဲ့ အလုပ်လုပ်သည်။ | Virtualオフィスへようこそ！この階には3つのチームがあります。 |
| office.nw | North-west corner. Walk up to the holographic city table. | အနောက်မြောက်ထောင့်ရှိ မြို့ပုံဟိုလိုဂရမ်စားပွဲအနီးသို့ သွားပါ။ | 北西の角。ホログラムの街のテーブルに近づいてください。 |
| office.ne | North-east corner. The studio with the video wall. | အရှေ့မြောက်ထောင့်၊ ဗီဒီယိုနံရံပါသော စတူဒီယိုဖြစ်သည်။ | 北東の角。ビデオウォールのあるスタジオです。 |
| office.se | South-east corner. The developer desk with the contribution wall. | အရှေ့တောင်ထောင့်၊ ပါဝင်လုပ်ဆောင်မှုနံရံပါသော ဆော့ဖ်ဝဲဖန်တီးသူ၏ စားပွဲဖြစ်သည်။ | 南東の角。貢献履歴の壁がある開発者のデスクです。 |
| office.instructions | Press <kbd>E</kbd> near each one to visit their site. The exit is right behind you. | အဖွဲ့တစ်ဖွဲ့ချင်းအနီးတွင် <kbd>E</kbd> နှိပ်၍ သူတို့၏ဝက်ဘ်ဆိုက်သို့ သွားပါ။ ထွက်ပေါက်သည် သင့်နောက်တွင် ရှိသည်။ | 各チームの近くで <kbd>E</kbd> を押すとサイトへ移動できます。出口はすぐ後ろです。 |
| office.map | City Map | မြို့မြေပုံ | 都市マップ |
| office.mapSign | CITY MAP | မြို့မြေပုံ | 都市マップ |
| office.mapText | An interactive map of the city by Alacrity Research. Explore neighbourhoods, data layers and points of interest. | Alacrity Research ၏ အပြန်အလှန်အသုံးပြုနိုင်သော မြို့မြေပုံဖြစ်သည်။ ရပ်ကွက်များ၊ ဒေတာအလွှာများနှင့် စိတ်ဝင်စားဖွယ်နေရာများကို လေ့လာပါ။ | Alacrity Researchによるインタラクティブな都市マップ。地区、データレイヤー、見どころを探索できます。 |
| office.mapAction | Open the city map | မြို့မြေပုံဖွင့်မည် | 都市マップを開く |
| office.news | Virtual News | Virtual သတင်း | Virtualニュース |
| office.newsSign | VIRTUAL NEWS | Virtual သတင်း | Virtualニュース |
| office.newsroom | Newsroom | သတင်းခန်း | ニュースルーム |
| office.newsText | Breaking stories, analysis and features from the Virtual News desk. | Virtual သတင်းဌာန၏ နောက်ဆုံးသတင်းများ၊ သုံးသပ်ချက်များနှင့် အထူးဆောင်းပါးများဖြစ်သည်။ | Virtualニュースの最新情報、分析、特集を紹介します。 |
| office.readNews | Read Virtual News | Virtual သတင်းဖတ်မည် | Virtualニュースを読む |
| office.dev | Developer studio | ဆော့ဖ်ဝဲဖန်တီးသူစတူဒီယို | 開発者スタジオ |
| office.devText | Projects, experiments and open source work, including this virtual world. | ဤကမ္ဘာအပါအဝင် စီမံကိန်းများ၊ စမ်းသပ်မှုများနှင့် အများပြည်သူသုံးရင်းမြစ်အလုပ်များဖြစ်သည်။ | この仮想世界を含むプロジェクト、実験、オープンソースの取り組みです。 |
| office.github | Visit GitHub profile | GitHub ကိုယ်ရေးစာမျက်နှာသို့သွားမည် | GitHubプロフィールへ |
| office.newTab | Opens {site} in a new tab. | {site} ကို တက်ဘ်အသစ်တွင် ဖွင့်မည်။ | {site} を新しいタブで開きます。 |
| office.kicker | Virtual Office · {section} | Virtual ရုံး · {section} | Virtualオフィス · {section} |
| office.teams | Alacrity Research  ·  Virtual News  ·  Tun-PS-Lin | Alacrity Research  ·  Virtual သတင်း  ·  Tun-PS-Lin | Alacrity Research  ·  Virtualニュース  ·  Tun-PS-Lin |
| office.mapPrompt | Open the City Map — map.alacrityresearch.xyz | မြို့မြေပုံဖွင့်မည် — map.alacrityresearch.xyz | 都市マップを開く — map.alacrityresearch.xyz |
| office.newsPrompt | Watch Virtual News | Virtual သတင်းကြည့်မည် | Virtualニュースを見る |
| office.githubPrompt | Visit Tun-PS-Lin on GitHub | GitHub ရှိ Tun-PS-Lin သို့သွားမည် | GitHubでTun-PS-Linを見る |
| office.short | Office | ရုံး | オフィス |
| office.newsShort | News | သတင်း | ニュース |
| office.lounge | Lounge | အပန်းဖြေနေရာ | ラウンジ |
| office.coffee | COFFEE | ကော်ဖီ | コーヒー |
| office.onAir | ON AIR | ထုတ်လွှင့်နေ | 放送中 |
| office.live | LIVE  ● | တိုက်ရိုက်  ● | 生放送  ● |
| office.breaking | BREAKING | နောက်ဆုံးသတင်း | 速報 |
| office.ticker | Virtual World opens its new raceway  ·  Virtual Mall unveils Tech and Fashion floors  ·  Markets steady  ·  Weather: sunny all week  ·   | Virtual World ပြိုင်ကွင်းအသစ်ဖွင့်ပြီ  ·  Virtual ကုန်တိုက်တွင် နည်းပညာ၊ ဖက်ရှင်အထပ်များဖွင့်ပြီ  ·  ဈေးကွက်တည်ငြိမ်  ·  တစ်ပတ်လုံးနေပူမည်  ·   | Virtual Worldの新レース場が開場  ·  Virtualモールにテックとファッションのフロア登場  ·  市場は安定  ·  一週間晴れの予報  · |
| office.contributions | contributions in the last year | ပြီးခဲ့သည့်နှစ်၏ ပါဝင်လုပ်ဆောင်မှုများ | 過去一年の貢献履歴 |
| mall.name | Virtual Mall | Virtual ကုန်တိုက် | Virtualモール |
| mall.sign | VIRTUAL MALL | Virtual ကုန်တိုက် | Virtualモール |
| mall.sectionsSign | TECH  ·  FASHION | နည်းပညာ  ·  ဖက်ရှင် | テック  ·  ファッション |
| mall.tech | Tech | နည်းပညာ | テック |
| mall.techSign | TECH | နည်းပညာ | テック |
| mall.fashion | Fashion | ဖက်ရှင် | ファッション |
| mall.fashionSign | FASHION | ဖက်ရှင် | ファッション |
| mall.techKicker | Virtual Mall · Tech | Virtual ကုန်တိုက် · နည်းပညာ | Virtualモール · テック |
| mall.fashionKicker | Virtual Mall · Fashion | Virtual ကုန်တိုက် · ဖက်ရှင် | Virtualモール · ファッション |
| mall.browse | Browse {display} | {display} ကိုကြည့်မည် | {display} を見る |
| mall.add | Add | ထည့်မည် | 追加 |
| mall.try | Try it on | ဝတ်ကြည့်မည် | 試着 |
| mall.added | {name} added to cart | {name} ကို ခြင်းထဲထည့်ပြီးပြီ | {name} をカートに追加 |
| mall.wearing | Wearing {name} | {name} ကို ဝတ်ဆင်ထားသည် | {name} を着用中 |
| mall.viewCart | View cart ({count}) | ခြင်းကြည့်မည် ({count}) | カートを見る ({count}) |
| mall.cart | Your cart | သင့်ဈေးဝယ်ခြင်း | カート |
| mall.empty | Your cart is empty.<br>Walk up to a display and add something. | သင့်ခြင်းတွင် ဘာမှမရှိသေးပါ။<br>ပြကွက်အနီးသို့ သွား၍ ပစ္စည်းတစ်ခုထည့်ပါ။ | カートは空です。<br>展示に近づいて商品を追加してください。 |
| mall.total | Total | စုစုပေါင်း | 合計 |
| mall.checkout | Checkout | ဝယ်ယူမှုအဆုံးသတ်မည် | 購入手続き |
| mall.note | Demo store. No payment is taken and nothing is ordered. | နမူနာဆိုင်ဖြစ်သည်။ ငွေမကောက်ခံဘဲ အမှန်တကယ်မှာယူမှုလည်း မရှိပါ။ | デモ店舗です。支払いや実際の注文は発生しません。 |
| mall.thanks | Demo checkout complete. Thanks for shopping! | နမူနာဝယ်ယူမှု ပြီးပြီ။ ဈေးဝယ်သည့်အတွက် ကျေးဇူးတင်ပါသည်။ | デモ購入手続き完了。ご利用ありがとうございます！ |
| mall.fitting | FITTING | အဝတ်စမ်းခန်း | 試着室 |
| mall.increase | Increase quantity | အရေအတွက်တိုးမည် | 数量を増やす |
| mall.decrease | Decrease quantity | အရေအတွက်လျှော့မည် | 数量を減らす |
| garage.name | Virtual Garage | Virtual ကားပြခန်း | Virtualガレージ |
| garage.sign | VIRTUAL GARAGE | Virtual ကားပြခန်း | Virtualガレージ |
| garage.modSign | MOD SHOP | ကားပြင်ဆင်ခန်း | カスタムショップ |
| garage.kicker | Virtual Garage · Mod shop | Virtual ကားပြခန်း · ပြင်ဆင်ခန်း | Virtualガレージ · カスタム |
| garage.prompt | Customise the {name} | {name} ကိုပြင်ဆင်မည် | {name} をカスタム |
| garage.carSign | {name}<br>{tag} | {name}<br>{tag} | {name}<br>{tag} |
| garage.help | Press E at a car to customise it and race at the Virtual Raceway | ကားအနီးတွင် E နှိပ်၍ ပြင်ဆင်ပြီး Virtual ပြိုင်ကွင်းတွင် မောင်းပါ | 車の近くで E を押してカスタムし、Virtualレース場で走ろう |
| garage.parking | Parking | ကားရပ်နားရန် | 駐車場 |
| garage.top | Top speed | အမြင့်ဆုံးအမြန်နှုန်း | 最高速度 |
| garage.accel | Acceleration | အရှိန်တင်နှုန်း | 加速 |
| garage.grip | Grip | လမ်းကပ်အား | グリップ |
| garage.speedNote | {speed} km/h top speed{nitro} | အမြင့်ဆုံးအမြန်နှုန်း {speed} km/h{nitro} | 最高速度 {speed} km/h{nitro} |
| garage.nitroFitted |  · Nitro fitted |  · နိုက်ထရိုတပ်ထား |  · ニトロ装備 |
| garage.race | 🏁 Race this car | 🏁 ဤကားဖြင့်ပြိုင်မည် | 🏁 この車でレース |
| garage.paint | Paint | ဆေးအရောင် | 塗装色 |
| garage.rim | Rim colour | ဘီးခွေအရောင် | リムの色 |
| garage.stripeColor | Stripe colour | အစင်းအရောင် | ストライプの色 |
| garage.finish | Finish | မျက်နှာပြင်အချောသတ် | 仕上げ |
| garage.wheels | Wheels | ဘီးများ | ホイール |
| garage.spoiler | Spoiler | လေခွဲတောင်ပံ | スポイラー |
| garage.kit | Body kit | ကိုယ်ထည်အစုံ | ボディキット |
| garage.underglow | Underglow | ကားအောက်မီး | アンダーライト |
| garage.stripes | Stripes | အစင်းများ | ストライプ |
| garage.tint | Tint | မှန်အမည်း | ガラスの色 |
| garage.engine | Engine | အင်ဂျင် | エンジン |
| garage.tires | Tires | တာယာ | タイヤ |
| garage.nitro | Nitro | နိုက်ထရို | ニトロ |
| garage.boost | Nitro boost (Shift) | နိုက်ထရိုအရှိန် (Shift) | ニトロブースト (Shift) |
| garage.reset | Reset to factory | စက်ရုံပုံစံပြန်ထားမည် | 工場設定に戻す |
| race.name | Virtual Raceway | Virtual ပြိုင်ကွင်း | Virtualレース場 |
| race.sign | VIRTUAL RACEWAY | Virtual ပြိုင်ကွင်း | Virtualレース場 |
| race.map | Raceway | ပြိုင်ကွင်း | レース場 |
| race.stand | GRANDSTAND | ပွဲကြည့်စင် | 観覧席 |
| race.day | RACE DAY | ပြိုင်ပွဲနေ့ | レースの日 |
| race.touch | Left stick: steer & throttle · Run: nitro · Jump: handbrake | ဘယ်ခလုတ်ဖြင့်ကွေ့၊ အရှိန်တင် · ပြေးခလုတ်: နိုက်ထရို · ခုန်ခလုတ်: လက်ဘရိတ် | 左スティック：操舵と加速 · 走る：ニトロ · ジャンプ：ハンドブレーキ |
| race.desktop | W/S throttle & brake · A/D steer · Space handbrake · Shift nitro · V camera · Esc leave | W/S အရှိန်၊ ဘရိတ် · A/D ကွေ့ · Space လက်ဘရိတ် · Shift နိုက်ထရို · V မြင်ကွင်း · Esc ထွက် | W/S 加速とブレーキ · A/D 操舵 · Space ハンドブレーキ · Shift ニトロ · V カメラ · Esc 退出 |
| race.lap | Lap | ပတ် | 周 |
| race.pos | Pos | အဆင့် | 順位 |
| race.best | Best | အကောင်းဆုံး | ベスト |
| race.go | GO! | စမောင်းပါ! | スタート！ |
| race.lapToast | Lap {lap}: {time} | ပတ် {lap}: {time} | {lap} 周目：{time} |
| race.newBest | New best lap! | အကောင်းဆုံးပတ်အသစ်! | ラップ記録更新！ |
| race.results | Race results | ပြိုင်ပွဲရလဒ် | レース結果 |
| race.win | You win! | သင်အနိုင်ရပြီ! | 優勝！ |
| race.finished | Finished {place}{suffix} | အဆင့် {place} ဖြင့်ပြီးပြီ{suffix} | {place} 位でゴール{suffix} |
| race.summary | Three laps in {time}. Best lap {best}. | သုံးပတ်ကို {time} ဖြင့်ပြီးသည်။ အကောင်းဆုံးပတ် {best}။ | 3周のタイム {time}。ベストラップ {best}。 |
| race.you | You | သင် | あなた |
| race.time | Time | အချိန် | タイム |
| race.again | Race again | ထပ်ပြိုင်မည် | 再レース |
| race.back | Back to garage | ကားပြခန်းပြန်မည် | ガレージに戻る |
| range.name | Gun Range | ပစ်ကွင်း | 射撃場 |
| range.sign | GUN RANGE | ပစ်ကွင်း | 射撃場 |
| range.pick | Pick a weapon | လက်နက်ရွေးမည် | 武器を選ぶ |
| range.counter | Press E at the counter to pick a weapon | ကောင်တာအနီးတွင် E နှိပ်၍ လက်နက်ရွေးပါ | カウンターで E を押して武器を選ぶ |
| range.lane | LANE {number} | လမ်း {number} | レーン {number} |
| range.auto | Auto | အော်တို | 自動 |
| range.semi | Semi | တစ်ချက်ချင်း | 半自動 |
| range.rounds | {count} rds | {count} တောင့် | {count} 発 |
| range.shoot | Shoot | ပစ်မည် | 射撃 |
| range.note | 60-second rounds. Dummies score 10 (head 25), bullseye boards up to 50. Moving and far targets give a bonus. | တစ်ပွဲလျှင် စက္ကန့် ၆၀ ဖြစ်သည်။ အရုပ်ထိလျှင် ၁၀ မှတ်၊ ခေါင်းထိလျှင် ၂၅ မှတ်၊ ပစ်မှတ်ဗဟိုထိလျှင် ၅၀ မှတ်အထိ ရနိုင်သည်။ ရွေ့လျားသော သို့မဟုတ် ဝေးသောပစ်မှတ်များတွင် အပိုမှတ်ရသည်။ | 1ラウンド60秒。人形は10点（頭は25点）、的の中心は最大50点。移動する的や遠い的にはボーナスがあります。 |
| range.touch | Drag to aim · FIRE to shoot · Run = reload | ဆွဲ၍ချိန် · ပစ်ခလုတ်ဖြင့်ပစ် · ပြေးခလုတ်ဖြင့်ကျည်ဖြည့် | ドラッグで照準 · 発射ボタンで射撃 · 走るボタンでリロード |
| range.desktop | Click to shoot · R reload · {scope}V view · Esc leave | နှိပ်၍ပစ် · R ကျည်ဖြည့် · {scope}V မြင်ကွင်း · Esc ထွက် | クリックで射撃 · R リロード · {scope}V 視点 · Esc 退出 |
| range.scope | Right-click / Q scope ·  | ညာနှိပ် / Q မှန်ပြောင်း ·  | 右クリック / Q スコープ · |
| range.firstShot | Round starts on your first shot | ပထမဆုံးပစ်ချက်မှ ပွဲစမည် | 最初の射撃でラウンド開始 |
| range.ammo | Ammo | ကျည် | 弾薬 |
| range.score | Score | ရမှတ် | スコア |
| range.acc | Acc | ထိမှန်နှုန်း | 命中率 |
| range.head | HEADSHOT! | ခေါင်းထိပြီ! | ヘッドショット！ |
| range.bullseye | BULLSEYE! | ဗဟိုထိပြီ! | ど真ん中！ |
| range.hits | Hits | ထိမှန်ချက် | 命中 |
| range.shots | Shots | ပစ်ချက် | 射撃数 |
| range.accuracy | Accuracy | ထိမှန်နှုန်း | 命中率 |
| range.bestNew | New personal best with the {name}! | {name} ဖြင့် ကိုယ်ပိုင်စံချိန်အသစ်ရပြီ! | {name} の自己ベスト更新！ |
| range.bestWith | Best with the {name}: {score} | {name} ဖြင့် အကောင်းဆုံး: {score} | {name} のベスト：{score} |
| range.again | Go again | ထပ်ကစားမည် | もう一度 |
| range.change | Change weapon | လက်နက်ပြောင်းမည် | 武器を変更 |
| range.over | Round over | ပွဲပြီးပြီ | ラウンド終了 |
| golf.touch | Drag to aim · hold PUTT to charge, release to hit | ဆွဲ၍ချိန် · ရိုက်ခလုတ်ကိုဖိ၍ အားတင်ပြီး လွှတ်၍ရိုက်ပါ | ドラッグで狙い、パットを長押しで力をため、離して打つ |
| golf.desktop | Drag or A / D to aim · hold Space to charge, release to putt · Esc to leave | ဆွဲပါ သို့မဟုတ် A / D ဖြင့်ချိန် · Space ဖိ၍အားတင်၊ လွှတ်၍ရိုက် · Esc ထွက် | ドラッグまたは A / D で狙う · Space 長押しで力をため、離して打つ · Esc 退出 |
| golf.hole | Hole | အပေါက် | ホール |
| golf.par | Par | ပါ | パー |
| golf.strokes | Strokes | ရိုက်ချက် | 打数 |
| golf.eagle | Eagle! | ပါထက်နှစ်ချက်လျော့! | イーグル！ |
| golf.birdie | Birdie! | ပါထက်တစ်ချက်လျော့! | バーディー！ |
| golf.bogey | Bogey | ပါထက်တစ်ချက်ပို | ボギー |
| golf.double | Double bogey | ပါထက်နှစ်ချက်ပို | ダブルボギー |
| golf.one | Hole in one! | တစ်ချက်တည်းဝင်ပြီ! | ホールインワン！ |
| golf.under | {count} under par. Superb round! | ပါထက် {count} ချက်လျော့သည်။ အလွန်ကောင်းသောပွဲဖြစ်သည်! | パーより {count} 打少ない。素晴らしいラウンド！ |
| golf.level | Level par. Nicely played. | ပါနှင့်ညီသည်။ ကောင်းစွာကစားခဲ့သည်။ | パーと同じ。ナイスプレー。 |
| golf.over | {count} over par. Have another go? | ပါထက် {count} ချက်ပိုသည်။ ထပ်ကစားကြည့်ပါ။ | パーより {count} 打多い。もう一度挑戦しますか？ |
| golf.again | Play again | ထပ်ကစားမည် | もう一度遊ぶ |
| golf.card | Scorecard | ရမှတ်စာရင်း | スコアカード |
| avatar.body | Body | ကိုယ်ခန္ဓာ | 体型 |
| avatar.skin | Skin tone | အသားအရေ | 肌の色 |
| avatar.face | Face | မျက်နှာ | 表情 |
| avatar.presets | Presets | ကြိုတင်ပုံစံများ | プリセット |
| avatar.hairStyle | Hair style | ဆံပင်ပုံစံ | 髪型 |
| avatar.hairColor | Hair colour | ဆံပင်အရောင် | 髪の色 |
| avatar.top | Top | အပေါ်အင်္ကျီ | トップス |
| avatar.color | Colour | အရောင် | 色 |
| avatar.design | Design | ဒီဇိုင်း | 柄 |
| avatar.bottom | Bottoms | အောက်ပိုင်းအဝတ် | ボトムス |
| avatar.shoes | Shoes | ဖိနပ် | 靴 |
| avatar.hat | Hat | ဦးထုပ် | 帽子 |
| avatar.hatColor | Hat colour | ဦးထုပ်အရောင် | 帽子の色 |
| avatar.glasses | Glasses | မျက်မှန် | 眼鏡 |
| avatar.back | Back | နောက်ကျောအလှ | 背中 |
| avatar.backColor | Back colour | နောက်ကျောအလှအရောင် | 背中の色 |
| avatar.tabBody | 🧍 Body | 🧍 ကိုယ်ခန္ဓာ | 🧍 体型 |
| avatar.tabHair | 💇 Hair | 💇 ဆံပင် | 💇 髪 |
| avatar.tabTop | 👕 Top | 👕 အင်္ကျီ | 👕 トップス |
| avatar.tabBottom | 👖 Bottom | 👖 အောက်ပိုင်း | 👖 ボトムス |
| avatar.tabExtras | 🎩 Extras | 🎩 အပိုအလှ | 🎩 アクセサリー |
| avatar.classic | Classic | မူရင်းပုံစံ | クラシック |
| avatar.street | Street | လမ်းပေါ်စတိုင် | ストリート |
| avatar.sunny | Sunny | နေပူစတိုင် | サニー |
| avatar.formal | Formal | တရားဝင်ဝတ်စုံ | フォーマル |
| avatar.hero | Hero | သူရဲကောင်း | ヒーロー |
| avatar.random | 🎲 Randomise | 🎲 ကျပန်းရွေး | 🎲 ランダム |
| avatar.done | Done | ပြီးပြီ | 完了 |
| avatar.note | Drag on the scene to spin the camera around your avatar. | ဇာတ်ကောင်ပတ်လည် မြင်ကွင်းလှည့်ရန် ကမ္ဘာမြင်ကွင်းပေါ်တွင် ဆွဲပါ။ | シーンをドラッグするとアバターの周りにカメラを回せます。 |
| option.male | Male | အမျိုးသား | 男性 |
| option.female | Female | အမျိုးသမီး | 女性 |
| option.smile | 🙂 Smile | 🙂 ပြုံး | 🙂 微笑み |
| option.grin | 😁 Grin | 😁 ရယ်ပြုံး | 😁 笑顔 |
| option.cool | 😎 Cool | 😎 အမိုက်စား | 😎 クール |
| option.wink | 😉 Wink | 😉 မျက်စိမှိတ် | 😉 ウィンク |
| option.cute | 😊 Cute | 😊 ချစ်စရာ | 😊 キュート |
| option.wow | 😮 Wow | 😮 အံ့ဩ | 😮 びっくり |
| option.determined | 😤 Determined | 😤 စိတ်ပိုင်းဖြတ် | 😤 決意 |
| option.short | Short | တို | ショート |
| option.spiky | Spiky | ချွန်ထောင် | ツンツン |
| option.long | Long | ရှည် | ロング |
| option.ponytail | Ponytail | မြင်းမြီး | ポニーテール |
| option.bun | Bun | ဆံထုံး | お団子 |
| option.curly | Curly | ကောက် | カーリー |
| option.mohawk | Mohawk | အလယ်တန်းထောင် | モヒカン |
| option.pigtails | Pigtails | နှစ်ဖက်ဆံမြီး | ツインテール |
| option.bald | Bald | ဆံပင်မရှိ | 坊主 |
| option.tee | T-shirt | တီရှပ် | Tシャツ |
| option.hoodie | Hoodie | ခေါင်းစွပ်အင်္ကျီ | パーカー |
| option.jacket | Jacket | ဂျာကင် | ジャケット |
| option.polo | Polo | ပိုလိုအင်္ကျီ | ポロシャツ |
| option.tank | Tank top | လက်ပြတ်အင်္ကျီ | タンクトップ |
| option.dress | Dress | ဂါဝန် | ワンピース |
| option.plain | Plain | အပြောင် | 無地 |
| option.stripes | Stripes | အစင်း | ストライプ |
| option.logo | Logo | အမှတ်တံဆိပ် | ロゴ |
| option.star | Star | ကြယ် | 星 |
| option.heart | Heart | နှလုံး | ハート |
| option.camo | Camo | ပြောက်ကျား | 迷彩 |
| option.jeans | Jeans | ဂျင်းဘောင်းဘီ | ジーンズ |
| option.joggers | Joggers | အားကစားဘောင်းဘီ | ジョガー |
| option.shorts | Shorts | ဘောင်းဘီတို | ショートパンツ |
| option.skirt | Skirt | စကတ် | スカート |
| option.none | None | မရှိ | なし |
| option.cap | Cap | ကက်ဦးထုပ် | キャップ |
| option.beanie | Beanie | ချည်ဦးထုပ် | ニット帽 |
| option.tophat | Top hat | ထိပ်မြင့်ဦးထုပ် | シルクハット |
| option.crown | Crown | သရဖူ | 王冠 |
| option.headphones | Headphones | နားကြပ် | ヘッドホン |
| option.round | Round | အဝိုင်း | 丸型 |
| option.shades | Shades | နေကာမျက်မှန် | サングラス |
| option.backpack | Backpack | ကျောပိုးအိတ် | リュック |
| option.cape | Cape | ဝတ်ရုံနောက်လွှာ | マント |
| option.wings | Wings | တောင်ပံ | 翼 |
| option.gloss | Gloss | တောက်ပြောင် | 光沢 |
| option.metallic | Metallic | သတ္တုရောင် | メタリック |
| option.matte | Matte | အရောင်မှိန် | マット |
| option.chrome | Chrome | ခရုမ်း | クローム |
| option.pearl | Pearl | ပုလဲရောင် | パール |
| option.sportSpoke | Sport 5-spoke | ပြိုင်ကားငါးတံဘီး | スポーツ5スポーク |
| option.turbine | Turbine | တာဘိုင် | タービン |
| option.mesh | Mesh | ဇကာပုံ | メッシュ |
| option.classicChrome | Classic chrome | ရိုးရာခရုမ်း | クラシッククローム |
| option.offroad | Off-road | လမ်းကြမ်း | オフロード |
| option.lip | Lip | အစွန်းတို | リップ |
| option.wing | Wing | တောင်ပံ | ウイング |
| option.gt | GT wing | GT တောင်ပံ | GTウイング |
| option.stock | Stock | မူရင်း | 標準 |
| option.streetKit | Street kit | လမ်းမသုံးအစုံ | ストリートキット |
| option.raceKit | Race kit | ပြိုင်ပွဲသုံးအစုံ | レースキット |
| option.off | Off | ပိတ် | オフ |
| option.cyan | Cyan | စိမ်းပြာ | シアン |
| option.pink | Pink | ပန်းရောင် | ピンク |
| option.green | Green | အစိမ်း | 緑 |
| option.purple | Purple | ခရမ်း | 紫 |
| option.light | Light | အလင်း | ライト |
| option.dark | Dark | အမှောင် | ダーク |
| option.limo | Limo | အမည်းထူ | リムジン |
| option.racing | Racing | ပြိုင်ကားပုံ | レーシング |
| option.side | Side | ဘေး | サイド |
| option.sport8 | Sport +8% | အားကစား +8% | スポーツ +8% |
| option.race16 | Race +16% | ပြိုင်ပွဲ +16% | レース +16% |
| option.turbo25 | Turbo +25% | တာဘို +25% | ターボ +25% |
| option.sport | Sport | အားကစား | スポーツ |
| option.slick | Slicks | အပြောင်တာယာ | スリック |
| car.sports | Sports coupe | အားကစားတံခါးနှစ်ပေါက်ကား | スポーツクーペ |
| car.suv | Luxury SUV | အဆင့်မြင့် SUV | 高級SUV |
| car.open | Convertible | အမိုးဖွင့်ကား | オープンカー |
| car.muscle | Muscle car | အင်အားကြီးကား | マッスルカー |
| car.hyper | Hypercar | စွမ်းရည်အလွန်မြင့်ကား | ハイパーカー |
| weapon.pistol | Pistol | ပစ္စတို | ピストル |
| weapon.pistolText | Accurate and quick. A good place to start. | တိကျပြီးမြန်သည်။ စတင်လေ့ကျင့်ရန် သင့်တော်သည်။ | 正確で素早い。初めての練習に向いています。 |
| weapon.revolver | Revolver | ခြောက်လုံးပြူး | リボルバー |
| weapon.revolverText | Six heavy rounds, pin-point accurate. | အားကောင်းသောကျည် ခြောက်တောင့်၊ အလွန်တိကျသည်။ | 強力な6発。ピンポイントで正確。 |
| weapon.smg | SMG | SMG | SMG |
| weapon.smgText | Hold to spray. Very fast, not very precise. | ဖိထား၍ဆက်တိုက်ပစ်ပါ။ အလွန်မြန်သော်လည်း မတိကျလှပါ။ | 長押しで連射。非常に速いですが精度は低め。 |
| weapon.rifle | Assault Rifle | တိုက်ခိုက်ရေးရိုင်ဖယ် | アサルトライフル |
| weapon.rifleText | Full-auto with a red-dot sight. | အနီစက်ချိန်ကိရိယာပါသော အလိုအလျောက်သေနတ်ဖြစ်သည်။ | レッドドットサイト付きのフルオート。 |
| weapon.shotgun | Shotgun | ရှော့ဂန်း | ショットガン |
| weapon.shotgunText | Eight pellets per shot. Get close. | တစ်ချက်လျှင် ကျည်စေ့ရှစ်လုံး။ အနီးကပ်ပစ်ပါ။ | 一発で8粒の散弾。近くから狙ってください。 |
| weapon.sniper | Sniper Rifle | စနိုက်ပါရိုင်ဖယ် | スナイパーライフル |
| weapon.sniperText | Right-click (or Q) to scope in. Long range kills. | ညာနှိပ် သို့မဟုတ် Q ဖြင့် မှန်ပြောင်းကြည့်ပါ။ အဝေးပစ်မှတ်များအတွက် ဖြစ်သည်။ | 右クリックまたは Q でスコープ。遠距離の標的向け。 |
| screen.score | SCORE {score} | ရမှတ် {score} | スコア {score} |
| catalog.laptops | Laptops | လက်တော့ပ်များ | ノートPC |
| catalog.phones | Phones & Tablets | ဖုန်း၊ တက်ဘလက်များ | スマートフォンとタブレット |
| catalog.cameras | Cameras | ကင်မရာများ | カメラ |
| catalog.audio | Headphones & Watches | နားကြပ်၊ နာရီများ | ヘッドホンと時計 |
| catalog.gaming | Gaming & VR | ဂိမ်း၊ VR | ゲームとVR |
| catalog.desktops | Desktops & Monitors | ဒက်စ်တော့ပ်၊ မော်နီတာများ | デスクトップとモニター |
| catalog.speakers | Speakers | စပီကာများ | スピーカー |
| catalog.tvs | TVs | တီဗီများ | テレビ |
| catalog.drones | Drones | ဒရုန်းများ | ドローン |
| catalog.tees | T-Shirts & Polos | တီရှပ်၊ ပိုလိုများ | Tシャツとポロシャツ |
| catalog.hoodies | Hoodies & Jackets | ခေါင်းစွပ်၊ ဂျာကင်များ | パーカーとジャケット |
| catalog.pants | Jeans & Pants | ဂျင်း၊ ဘောင်းဘီများ | ジーンズとパンツ |
| catalog.dresses | Dresses & Skirts | ဂါဝန်၊ စကတ်များ | ワンピースとスカート |
| catalog.hats | Hats & Sunglasses | ဦးထုပ်၊ နေကာမျက်မှန်များ | 帽子とサングラス |
| catalog.bags | Handbags & Purses | လက်ကိုင်အိတ်များ | ハンドバッグと小型バッグ |
| catalog.shoes | Shoes | ဖိနပ်များ | 靴 |
| catalog.backpacks | Backpacks | ကျောပိုးအိတ်များ | リュック |
| catalog.laptops0 | Featherweight aluminium laptop with an all-day battery. | အလွန်ပေါ့သော အလူမီနီယမ်လက်တော့ပ်၊ တစ်နေ့တာခံဘက်ထရီပါသည်။ | 軽量アルミ製ノートPC。一日使えるバッテリー。 |
| catalog.laptops1 | Workstation power for video and 3D. | ဗီဒီယို၊ 3D အတွက် အလုပ်ရုံသုံးစွမ်းအား။ | 動画と3D向けのワークステーション性能。 |
| catalog.laptops2 | 240 Hz screen and RGB keyboard. | 240 Hz မျက်နှာပြင်၊ RGB ကီးဘုတ်။ | 240 Hz画面とRGBキーボード。 |
| catalog.laptops3 | Folds into a tablet, pen included. | တက်ဘလက်အဖြစ် ခေါက်နိုင်ပြီး ပင်ပါသည်။ | 折りたたんでタブレットに。ペン付属。 |
| catalog.laptops4 | Light, simple, perfect for school. | ပေါ့ပါး၊ ရိုးရှင်းပြီး ကျောင်းသုံးရန်သင့်တော်သည်။ | 軽くてシンプル。学校での使用に。 |
| catalog.laptops5 | Colour-accurate OLED for designers. | ဒီဇိုင်နာများအတွက် အရောင်တိကျသော OLED။ | デザイナー向けの色再現に優れたOLED。 |
| catalog.phones0 | Triple camera flagship. | ကင်မရာသုံးလုံးပါ ထိပ်တန်းဖုန်း။ | トリプルカメラのフラッグシップ。 |
| catalog.phones1 | Everything you need, nothing you don’t. | လိုအပ်သမျှပါပြီး မလိုအပ်သည်များမပါ။ | 必要なものを、必要なだけ。 |
| catalog.phones2 | A phone that unfolds into a tablet. | ဖြန့်ဖွင့်လျှင် တက်ဘလက်ဖြစ်သောဖုန်း။ | 開くとタブレットになるスマートフォン。 |
| catalog.phones3 | Pro tablet with a laptop-class chip. | လက်တော့ပ်အဆင့်ချစ်ပ်ပါ ပရော်တက်ဘလက်။ | ノートPC級チップ搭載のプロ向けタブレット。 |
| catalog.phones4 | Pocketable reading and gaming tablet. | စာဖတ်၊ ဂိမ်းကစားရန် အိတ်ဆောင်တက်ဘလက်။ | 読書とゲーム用の持ち運べるタブレット。 |
| catalog.phones5 | Three colourful silicone cases. | အရောင်စုံ ဆီလီကွန်ကာဗာသုံးခု။ | カラフルなシリコンケース3個。 |
| catalog.cameras0 | 24 MP DSLR with 18-55 mm lens. | 24 MP DSLR၊ 18-55 mm မှန်ဘီလူးပါသည်။ | 24 MP DSLRと18-55 mmレンズ。 |
| catalog.cameras1 | Compact full-frame mirrorless. | အရွယ်ငယ် ဖူးဖရိမ်းမီရာလက်စ်။ | コンパクトなフルサイズミラーレス。 |
| catalog.cameras2 | Waterproof 5K action camera. | ရေလုံ 5K အက်ရှင်ကင်မရာ။ | 防水5Kアクションカメラ。 |
| catalog.cameras3 | The classic portrait prime. | ပုံတူအတွက် ရိုးရာတစ်ဆမှန်ဘီလူး။ | 定番のポートレート用単焦点レンズ。 |
| catalog.cameras4 | Pro telephoto zoom. | ပရော်ဖက်ရှင်နယ် အဝေးဆွဲမှန်ဘီလူး။ | プロ向け望遠ズーム。 |
| catalog.cameras5 | Prints photos in seconds. | စက္ကန့်ပိုင်းအတွင်း ဓာတ်ပုံထုတ်ပေးသည်။ | 数秒で写真をプリント。 |
| catalog.audio0 | Noise cancelling over-ears. | ဆူညံသံလျှော့ နားဖုံးနားကြပ်။ | ノイズキャンセル付きオーバーイヤー。 |
| catalog.audio1 | Punchy bass, bright colours. | အားကောင်းသောဘေ့စ်၊ တောက်ပသောအရောင်များ။ | 力強い低音と鮮やかな色。 |
| catalog.audio2 | Tiny earbuds, big sound. | နားကြပ်သေးသေး၊ အသံကြီးကြီး။ | 小さなイヤホン、大きなサウンド。 |
| catalog.audio3 | Health tracking and notifications. | ကျန်းမာရေးခြေရာခံခြင်း၊ အသိပေးချက်များ။ | 健康管理と通知機能。 |
| catalog.audio4 | GPS running watch. | GPS ပြေးလေ့ကျင့်ရေးနာရီ။ | GPSランニングウォッチ。 |
| catalog.gaming0 | 4K console with a 1 TB SSD. | 1 TB SSD ပါသော 4K ဂိမ်းစက်။ | 1 TB SSD搭載4Kゲーム機。 |
| catalog.gaming1 | Handheld and TV console. | လက်ကိုင်၊ တီဗီချိတ်ဂိမ်းစက်။ | 携帯でもテレビでも遊べるゲーム機。 |
| catalog.gaming2 | Wireless pad with paddles. | နောက်ခလုတ်ပါ ကြိုးမဲ့ဂိမ်းခလုတ်။ | パドル付きワイヤレスコントローラー。 |
| catalog.gaming3 | Standalone mixed-reality headset. | သီးခြားသုံးနိုင်သော ရောနှောမြင်ကွင်းခေါင်းစွပ်။ | 単体で使える複合現実ヘッドセット。 |
| catalog.gaming4 | Ergonomic racing-style chair. | ကိုယ်ခန္ဓာသက်သာသော ပြိုင်ကားပုံစံထိုင်ခုံ။ | 人間工学に基づくレーシング型チェア。 |
| catalog.desktops0 | Liquid cooled gaming tower. | အရည်အေးပေးစနစ်ပါ ဂိမ်းကွန်ပျူတာ။ | 液冷ゲーミングタワー。 |
| catalog.desktops1 | Quiet, compact creative workstation. | ငြိမ်သက်၊ အရွယ်ငယ် ဖန်တီးရေးအလုပ်ရုံကွန်ပျူတာ။ | 静かでコンパクトな制作用ワークステーション。 |
| catalog.desktops2 | Sharp IPS panel, USB-C. | ပုံကြည်သော IPS မျက်နှာပြင်၊ USB-C။ | 鮮明なIPSパネル、USB-C。 |
| catalog.desktops3 | Curved 144 Hz ultrawide. | ကွေးသော 144 Hz အလွန်ကျယ်မျက်နှာပြင်။ | 曲面144 Hzウルトラワイド。 |
| catalog.desktops4 | Hot-swap switches, per-key RGB. | လွယ်ကူစွာလဲနိုင်သောခလုတ်များ၊ တစ်ခလုတ်စီ RGB။ | ホットスワップスイッチ、各キーRGB。 |
| catalog.desktops5 | Lightweight wireless mouse. | ပေါ့ပါးသော ကြိုးမဲ့မောက်စ်။ | 軽量ワイヤレスマウス。 |
| catalog.speakers0 | Floor-standing hi-fi towers. | ကြမ်းပြင်ပေါ်ထားသော အသံကောင်းစပီကာများ။ | 床置きHi-Fiタワースピーカー。 |
| catalog.speakers1 | Compact powered speakers. | အရွယ်ငယ် ပါဝါပါစပီကာများ။ | コンパクトなアクティブスピーカー。 |
| catalog.speakers2 | Dolby Atmos soundbar. | Dolby Atmos အသံဘား။ | Dolby Atmosサウンドバー。 |
| catalog.speakers3 | Waterproof party speaker. | ရေလုံပါတီစပီကာ။ | 防水パーティースピーカー。 |
| catalog.speakers4 | Voice assistant speaker. | အသံဖြင့်ကူညီပေးသော စပီကာ။ | 音声アシスタントスピーカー。 |
| catalog.tvs0 | Perfect blacks, 120 Hz. | အနက်ရောင်ကောင်း၊ 120 Hz။ | 深い黒、120 Hz。 |
| catalog.tvs1 | Huge, bright, cinematic. | ကြီးမား၊ တောက်ပပြီး ရုပ်ရှင်ဆန်သည်။ | 大きく明るい、映画のような画面。 |
| catalog.tvs2 | All your apps built in. | သင့်အက်ပ်များအားလုံး ထည့်ထားသည်။ | アプリを内蔵。 |
| catalog.tvs3 | 120" picture from a small box. | စက်သေးသေးမှ 120" ပုံရသည်။ | 小さな本体から120インチ映像。 |
| catalog.drones0 | 40 min flight time, obstacle sensing. | မိနစ် ၄၀ ပျံနိုင်၊ အတားအဆီးအာရုံခံ။ | 飛行時間40分、障害物検知。 |
| catalog.drones1 | Under 250 g, fly almost anywhere. | 250 g အောက်၊ နေရာများစွာတွင် ပျံနိုင်သည်။ | 250 g未満で、さまざまな場所で飛ばせます。 |
| catalog.drones2 | Goggles included. Very fast. | မျက်မှန်ပါသည်။ အလွန်မြန်သည်။ | ゴーグル付属。非常に高速。 |
| catalog.bags0 | Leather tote with gold hardware. | ရွှေရောင်အဆင်ပါ သားရေလက်ဆွဲအိတ်။ | 金色の金具付きレザートート。 |
| catalog.bags1 | Satin clutch for nights out. | ညပွဲအတွက် ဖဲသားလက်ကိုင်အိတ်။ | 夜のお出かけ用サテンクラッチ。 |
| catalog.bags2 | Hands-free everyday bag. | နေ့စဉ်သုံး လက်လွတ်လွယ်အိတ်။ | 両手が空く普段使いバッグ。 |
| catalog.bags3 | Drawstring bucket bag. | ကြိုးဆွဲပိတ်ပုံးပုံအိတ်။ | 巾着型バケットバッグ。 |
| catalog.bags4 | Just your cards and keys. | ကတ်များ၊ သော့များအတွက်သာ။ | カードと鍵だけを持ち歩く。 |
| catalog.bags5 | Fits a whole weekend. | ပိတ်ရက်ခရီးအတွက် လုံလောက်သည်။ | 週末旅行の荷物が入ります。 |
| item.case | Phone Case Pack | ဖုန်းကာဗာအစုံ | スマートフォンケースセット |
| item.lens | 50 mm f/1.8 Lens | 50 mm f/1.8 မှန်ဘီလူး | 50 mm f/1.8レンズ |
| item.zoom | 70-200 mm Zoom | 70-200 mm အဝေးဆွဲ | 70-200 mmズーム |
| item.instant | Instant Camera | လက်ငင်းဓာတ်ပုံကင်မရာ | インスタントカメラ |
| item.buds | Wireless Buds Pro | ကြိုးမဲ့နားကြပ် Pro | ワイヤレスイヤホンPro |
| item.sportWatch | Sport Band Watch | အားကစားနာရီ | スポーツバンドウォッチ |
| item.controller | Pro Controller | Pro ဂိမ်းခလုတ် | Proコントローラー |
| item.chair | Gaming Chair | ဂိမ်းထိုင်ခုံ | ゲーミングチェア |
| item.desktop | Studio Desktop | စတူဒီယိုဒက်စ်တော့ပ် | スタジオデスクトップ |
| item.monitor | 27" 4K Monitor | 27" 4K မော်နီတာ | 27インチ4Kモニター |
| item.ultrawide | 34" Ultrawide | 34" အလွန်ကျယ်မျက်နှာပြင် | 34インチウルトラワイド |
| item.keyboard | Mech Keyboard | မက္ကင်းနစ်ကီးဘုတ် | メカニカルキーボード |
| item.mouse | Pro Mouse | Pro မောက်စ် | Proマウス |
| item.towerSpeakers | Tower Speakers (pair) | တာဝါစပီကာ (တစ်စုံ) | タワースピーカー（ペア） |
| item.bookshelf | Bookshelf Speakers | စင်တင်စပီကာ | ブックシェルフスピーカー |
| item.soundbar | Cinema Soundbar | ရုပ်ရှင်အသံဘား | シネマサウンドバー |
| item.smartSpeaker | Home Smart Speaker | အိမ်သုံးစမတ်စပီကာ | ホームスマートスピーカー |
| item.oled | 65" OLED TV | 65" OLED တီဗီ | 65インチOLEDテレビ |
| item.qled | 75" QLED TV | 75" QLED တီဗီ | 75インチQLEDテレビ |
| item.tv | 55" Smart TV | 55" စမတ်တီဗီ | 55インチスマートテレビ |
| item.projector | 4K Projector | 4K ပရိုဂျက်တာ | 4Kプロジェクター |
| item.drone | Mini Drone | ဒရုန်းအသေး | ミニドローン |
| item.redTee | Classic Tee — Red | မူရင်းတီရှပ် — အနီ | クラシックTシャツ — 赤 |
| item.stripeTee | Breton Stripe Tee | အစင်းတီရှပ် | ボーダーTシャツ |
| item.logoTee | Logo Tee — Black | လိုဂိုတီရှပ် — အနက် | ロゴTシャツ — 黒 |
| item.starTee | Star Tee — Yellow | ကြယ်တီရှပ် — အဝါ | 星柄Tシャツ — 黄 |
| item.whitePolo | Polo — White | ပိုလို — အဖြူ | ポロシャツ — 白 |
| item.greenPolo | Polo — Green | ပိုလို — အစိမ်း | ポロシャツ — 緑 |
| item.greyHoodie | Cloud Hoodie — Grey | ပေါ့ပါးခေါင်းစွပ်အင်္ကျီ — မီးခိုး | クラウドパーカー — グレー |
| item.blueHoodie | Logo Hoodie — Blue | လိုဂိုခေါင်းစွပ်အင်္ကျီ — အပြာ | ロゴパーカー — 青 |
| item.camoHoodie | Camo Hoodie | ပြောက်ကျားခေါင်းစွပ်အင်္ကျီ | 迷彩パーカー |
| item.bomber | Bomber Jacket | ဘွန်ဘာဂျာကင် | ボンバージャケット |
| item.denim | Denim Jacket | ဂျင်းဂျာကင် | デニムジャケット |
| item.varsity | Varsity Jacket | ကျောင်းအသင်းဂျာကင် | スタジャン |
| item.slimJeans | Slim Jeans — Indigo | ဂျင်းအကျပ် — မဲနယ် | スリムジーンズ — インディゴ |
| item.lightJeans | Light Wash Jeans | အရောင်ဖျော့ဂျင်း | ライトウォッシュジーンズ |
| item.joggers | Black Joggers | အနက်ရောင်အားကစားဘောင်းဘီ | 黒のジョガーパンツ |
| item.chino | Chino Shorts | ချီနိုဘောင်းဘီတို | チノショーツ |
| item.cargo | Cargo Pants | အိတ်များပါဘောင်းဘီ | カーゴパンツ |
| item.summer | Summer Dress — Pink | နွေရာသီဂါဝန် — ပန်းရောင် | サマーワンピース — ピンク |
| item.floral | Floral Dress | ပန်းပွင့်ဂါဝန် | 花柄ワンピース |
| item.eveningDress | Evening Dress | ညပွဲဂါဝန် | イブニングドレス |
| item.pleated | Pleated Skirt — Navy | အတွန့်စကတ် — နက်ပြာ | プリーツスカート — ネイビー |
| item.tennis | Tennis Skirt — White | တင်းနစ်စကတ် — အဖြူ | テニススカート — 白 |
| item.snapback | Snapback Cap | နောက်ချိန်နိုင်သောကက်ဦးထုပ် | スナップバックキャップ |
| item.redCap | Red Cap | အနီရောင်ကက်ဦးထုပ် | 赤のキャップ |
| item.beanie | Knit Beanie | ချည်ထိုးဦးထုပ် | ニット帽 |
| item.topHat | Top Hat | ထိပ်မြင့်ဦးထုပ် | シルクハット |
| item.aviator | Aviator Shades | လေယာဉ်မှူးပုံနေကာမျက်မှန် | アビエーターサングラス |
| item.glasses | Round Glasses | မျက်မှန်အဝိုင်း | 丸眼鏡 |
| item.goldWatch | Gold Watch | ရွှေရောင်နာရီ | 金色の時計 |
| item.tote | Classic Tote — Tan | ရိုးရာလက်ဆွဲအိတ် — အညိုဖျော့ | クラシックトート — タン |
| item.clutch | Evening Clutch | ညပွဲလက်ကိုင်အိတ် | イブニングクラッチ |
| item.crossbody | Crossbody Bag | စလွယ်သိုင်းအိတ် | クロスボディバッグ |
| item.bucket | Bucket Bag — Red | ပုံးပုံအိတ် — အနီ | バケットバッグ — 赤 |
| item.purse | Mini Purse | အိတ်အသေး | ミニバッグ |
| item.duffel | Weekender Duffel | ပိတ်ရက်ခရီးအိတ် | 週末用ダッフルバッグ |
| item.runner | Block Runner Sneakers | ပြေးဖိနပ် | ランニングスニーカー |
| item.highTop | High-top Sneakers — Red | အမြင့်ပြေးဖိနပ် — အနီ | ハイカットスニーカー — 赤 |
| item.boots | Chelsea Boots | ချယ်လ်ဆီးဘွတ်ဖိနပ် | チェルシーブーツ |
| item.heels | Classic Heels | ရိုးရာဒေါက်ဖိနပ် | クラシックヒール |
| item.slides | Slides | ခြေညှပ်ဖိနပ် | スライドサンダル |
| item.bluePack | Daypack — Blue | နေ့သုံးကျောပိုးအိတ် — အပြာ | デイパック — 青 |
| item.yellowPack | Daypack — Yellow | နေ့သုံးကျောပိုးအိတ် — အဝါ | デイパック — 黄 |
| item.hiker | Hiker 40L | တောင်တက်အိတ် 40L | 登山リュック40L |
| item.cape | Hero Cape | သူရဲကောင်းဝတ်ရုံ | ヒーローマント |
| item.wings | Neon Wings | နီယွန်တောင်ပံ | ネオンウイング |
| language.label | Language | ဘာသာစကား | 言語 |
| welcome.kicker | Welcome to | ကြိုဆိုပါသည် | ようこそ |
| welcome.play | Play | စတင်မည် | スタート |
| welcome.loading | Loading… | ဖွင့်နေသည်… | 読み込み中… |
| welcome.walk | Walk up to a building and press E | အဆောက်အဦအနီးသို့ သွားပြီး E ကိုနှိပ်ပါ | 建物に近づいて E を押してください |
| controls.tap | TAP | နှိပ်ပါ | タップ |
| controls.close | Close | ပိတ်မည် | 閉じる |
| controls.help | Controls | ထိန်းချုပ်နည်း | 操作方法 |
| controls.avatar | Avatar | ဇာတ်ကောင် | アバター |
| controls.customize | Customise your character | ဇာတ်ကောင်ကို ပြင်ဆင်မည် | アバターを編集 |
| controls.customizeHint | Customise your character (C) | ဇာတ်ကောင်ကို ပြင်ဆင်မည် (C) | アバターを編集 (C) |
| controls.switchCamera | Switch camera (V) | မြင်ကွင်းပြောင်းမည် (V) | カメラ切り替え (V) |
| controls.first | First person (V) | ကိုယ်တိုင်မြင်ကွင်း (V) | 一人称視点 (V) |
| controls.third | Third person (V) | နောက်မှမြင်ကွင်း (V) | 三人称視点 (V) |
| controls.firstToast | First person (V to switch) | ကိုယ်တိုင်မြင်ကွင်း (V ဖြင့်ပြောင်းနိုင်သည်) | 一人称視点 (V で切り替え) |
| controls.thirdToast | Third person (V to switch) | နောက်မှမြင်ကွင်း (V ဖြင့်ပြောင်းနိုင်သည်) | 三人称視点 (V で切り替え) |
| controls.firstShort | 1st | ကိုယ်တိုင် | 一人称 |
| controls.thirdShort | 3rd | နောက်မှ | 三人称 |
| controls.run | Run | ပြေး | 走る |
| controls.jump | Jump | ခုန် | ジャンプ |
| controls.fire | Fire | ပစ် | 発射 |
| controls.putt | Putt | ရိုက် | パット |
| controls.drift | Drift | ကွေ့လျှော | ドリフト |
| controls.leave | Leave | ထွက်မည် | 退出 |
| map.minimize | Minimise map | မြေပုံချုံ့မည် | 地図を縮小 |
| map.show | Show map | မြေပုံပြမည် | 地図を表示 |
| map.places | Places | နေရာများ | 場所 |
| canvas.label | Virtual World game. Use WASD or arrow keys to move and E to interact. | Virtual World ဂိမ်း။ WASD သို့မဟုတ် မြားခလုတ်များဖြင့် ရွေ့ပြီး E ဖြင့် ဆောင်ရွက်ပါ။ | Virtual World。WASD または矢印キーで移動、E で操作します。 |
| controls.desktop | <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> move · <kbd>Shift</kbd> run · <kbd>Space</kbd> jump<br><kbd>E</kbd> interact · <kbd>V</kbd> 1st/3rd person · <kbd>C</kbd> customise · <kbd>M</kbd> map<br>Drag to look · scroll to zoom · <kbd>Esc</kbd> close / leave | <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> ရွေ့ · <kbd>Shift</kbd> ပြေး · <kbd>Space</kbd> ခုန်<br><kbd>E</kbd> ဆောင်ရွက် · <kbd>V</kbd> မြင်ကွင်း · <kbd>C</kbd> ပြင်ဆင် · <kbd>M</kbd> မြေပုံ<br>ဆွဲ၍ကြည့် · ဘီးလှိမ့်၍ အနီးအဝေးပြောင်း · <kbd>Esc</kbd> ပိတ် / ထွက် | <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> 移動 · <kbd>Shift</kbd> 走る · <kbd>Space</kbd> ジャンプ<br><kbd>E</kbd> 操作 · <kbd>V</kbd> 視点 · <kbd>C</kbd> 編集 · <kbd>M</kbd> 地図<br>ドラッグで見回す · スクロールでズーム · <kbd>Esc</kbd> 閉じる / 退出 |
| controls.touch | Left thumb: move · Drag: look · Pinch: zoom<br>Buttons: jump and run · Tap prompts to interact | ဘယ်လက်မဖြင့် ရွေ့ · ဆွဲ၍ကြည့် · လက်နှစ်ချောင်းဖြင့် အနီးအဝေးပြောင်း<br>ခလုတ်များဖြင့် ခုန်၊ ပြေး · ပြထားသောခလုတ်ကိုနှိပ်၍ ဆောင်ရွက် | 左の親指で移動 · ドラッグで見回す · ピンチでズーム<br>ボタンでジャンプと走る · 案内をタップして操作 |
| showroom.concept | Concept display only. These simplified exhibits and walkways are not installation specifications or exact product models. | အယူအဆပြကွက်သာ ဖြစ်သည်။ ရိုးရှင်းထားသော ပြကွက်များနှင့် လမ်းကြောင်းများသည် တပ်ဆင်မှုသတ်မှတ်ချက်များ သို့မဟုတ် တိကျသော ထုတ်ကုန်မော်ဒယ်များ မဟုတ်ပါ။ | コンセプト展示です。簡略化した展示や通路は、施工仕様や正確な製品モデルを示すものではありません。 |
| showroom.purpose | Compare five kitchen layouts and learn about the Sink, Cooktop and Range Hood. Then explore the S-CLASS kitchen configurator and training. | မီးဖိုခန်းအပြင်အဆင် ၅ မျိုးကို နှိုင်းယှဉ်ပြီး ဘေစင်၊ မီးဖိုနှင့် အငွေ့စုပ်စက်အကြောင်း လေ့လာပါ။ ထို့နောက် S-CLASS မီးဖိုခန်းပုံစံရွေးချယ်ရေးနှင့် လေ့ကျင့်ရေးကို ဆက်လက်လေ့လာနိုင်ပါသည်။ | 5種類のキッチンレイアウトを比較し、シンク・加熱機器・レンジフードについて学びます。続いて、S-CLASSのキッチンコンフィギュレーターとトレーニングを体験できます。 |
| showroom.i.title | I-Type (Straight) | I ပုံစံ (တန်းဖြောင့်) | I型（直線） |
| showroom.i.heading | I-Type<br>(Straight) | I ပုံစံ<br>တန်းဖြောင့် | I型<br>直線 |
| showroom.i.caption | One wall row<br>Sink + cooking together | နံရံဘေးတစ်တန်း<br>ဘေစင်နှင့် မီးဖိုအတူ | 壁沿いの一列<br>シンクと加熱機器 |
| showroom.i.text | One straight working row against a local wall. The Sink and cooking zone share the same run. | နံရံဘေးတွင် တန်းဖြောင့် အလုပ်လုပ်သည့်ကောင်တာတစ်တန်း ဖြစ်သည်။ ဘေစင်နှင့် ချက်ပြုတ်နေရာသည် ကောင်တာတစ်တန်းတည်းပေါ်တွင် ရှိသည်။ | 壁沿いに一直線の作業カウンターを配置。シンクと加熱機器を同じ列にまとめています。 |
| showroom.ii.title | II-Type (Parallel) | II ပုံစံ (အပြိုင်) | II型（並列） |
| showroom.ii.heading | II-Type<br>(Parallel) | II ပုံစံ<br>အပြိုင် | II型<br>並列 |
| showroom.ii.caption | Two parallel rows<br>Sink / cooking separated | အပြိုင်နှစ်တန်း<br>ဘေစင်၊ မီးဖိုခွဲထား | 並列の二列<br>シンクと加熱機器を分離 |
| showroom.ii.text | Two parallel working rows with a walkable gallery aisle. The front row holds the Sink; the rear row holds the Cooktop and Range Hood. These are display walkways, not verified installation clearances. | အပြိုင် အလုပ်လုပ်သည့်ကောင်တာနှစ်တန်းကြားတွင် လျှောက်နိုင်သည့် ပြခန်းလမ်း ရှိသည်။ ရှေ့တန်းတွင် ဘေစင်၊ နောက်တန်းတွင် မီးဖိုနှင့် အငွေ့စုပ်စက် ရှိသည်။ ဤလမ်းများသည် ပြကွက်အတွက်သာ ဖြစ်ပြီး တပ်ဆင်မှုအတွက် အတည်ပြုထားသော အကွာအဝေးများ မဟုတ်ပါ။ | 並列の作業カウンター二列の間に、歩ける展示通路を設けています。手前にシンク、奥に加熱機器とレンジフードを配置。展示用の通路であり、確認済みの施工クリアランスではありません。 |
| showroom.l.title | L-Type (Corner) | L ပုံစံ (ထောင့်ချိုး) | L型（コーナー） |
| showroom.l.heading | L-Type<br>(Corner) | L ပုံစံ<br>ထောင့်ချိုး | L型<br>コーナー |
| showroom.l.caption | Connected corner<br>Sink / cooking on two legs | ဆက်ထားသောထောင့်<br>ဘေစင်၊ မီးဖိုတစ်ဘက်စီ | つながるコーナー<br>二辺にシンクと加熱機器 |
| showroom.l.text | A connected L-shaped worktop in a local corner. The Sink sits on the longer leg; the Cooktop and Range Hood sit on the perpendicular shorter leg. Upper cabinets follow the corner. This is a representative concept arrangement. | ထောင့်တွင် ဆက်ထားသော L ပုံစံကောင်တာ ဖြစ်သည်။ ဘေစင်သည် ရှည်သောဘက်တွင်ရှိပြီး မီးဖိုနှင့် အငွေ့စုပ်စက်သည် ထောင့်မှန်ချိုးထားသော တိုသောဘက်တွင် ရှိသည်။ အပေါ်ဗီရိုများလည်း ထောင့်အတိုင်း ဆက်ထားသည်။ ဤသည်မှာ ကိုယ်စားပြု အယူအဆအပြင်အဆင် ဖြစ်သည်။ | コーナーでつながるL字のワークトップ。長い辺にシンク、直角につながる短い辺に加熱機器とレンジフードを配置。吊戸棚もコーナーに沿っています。代表的なコンセプト配置です。 |
| showroom.peninsula.title | Face to Face (Peninsula) | မျက်နှာချင်းဆိုင် (ကျွန်းဆွယ်) | 対面型（ペニンシュラ） |
| showroom.peninsula.heading | Face to Face<br>(Peninsula) | မျက်နှာချင်းဆိုင်<br>ကျွန်းဆွယ် | 対面型<br>ペニンシュラ |
| showroom.peninsula.caption | One end connected<br>Long rear side open | တစ်ဖက်စွန်းဆက်ထား<br>နောက်ဘက်အရှည်ဖွင့်ထား | 片端がつながる<br>長い背面は開放 |
| showroom.peninsula.text | A deeper counter with one end connected to a short side partition. The Sink and Cooktop share the run, with a suspended Range Hood above cooking. Its long rear side opens toward the living display space; walk around the free end to visit that side. | နက်သောကောင်တာ၏ တစ်ဖက်စွန်းကို ဘေးအကန့်တိုနှင့် ဆက်ထားသည်။ ဘေစင်နှင့် မီးဖိုသည် တစ်တန်းတည်းပေါ်တွင်ရှိပြီး မီးဖိုအပေါ်တွင် ချိတ်ဆွဲထားသော အငွေ့စုပ်စက် ရှိသည်။ နောက်ဘက်အရှည်သည် ဧည့်ခန်းပြကွက်ဘက်သို့ ဖွင့်ထားသည်။ လွတ်နေသောစွန်းကို ပတ်လျှောက်ပြီး နောက်ဘက်သို့ သွားနိုင်သည်။ | 奥行きのあるカウンターの片端を短い側面の仕切りにつなげています。シンクと加熱機器は同じ列で、加熱機器の上に吊り下げ型レンジフードを配置。長い背面はリビング展示側に開き、独立した端を回って背面へ歩けます。 |
| showroom.island.title | Island (Center) | ကျွန်းပုံစံ (အလယ်) | アイランド型（中央） |
| showroom.island.heading | Island<br>(Center) | ကျွန်းပုံစံ<br>အလယ် | アイランド型<br>中央 |
| showroom.island.caption | Freestanding counter<br>Walk around all four sides | သီးခြားကောင်တာ<br>လေးဘက်ပတ်လျှောက်နိုင် | 独立したカウンター<br>四方から歩いて見学 |
| showroom.island.text | A freestanding counter with the Sink and Cooktop together, a suspended Range Hood and gallery access around all four sides. Finished panels close its ends and rear. Neither end connects to a wall, and no rear backsplash blocks the open side. | သီးခြားကောင်တာပေါ်တွင် ဘေစင်နှင့် မီးဖိုအတူရှိပြီး ချိတ်ဆွဲထားသော အငွေ့စုပ်စက်နှင့် လေးဘက်လုံးမှ ဝင်ရောက်နိုင်သည့် ပြခန်းလမ်း ရှိသည်။ စွန်းများနှင့် နောက်ဘက်ကို အချောသတ်အကန့်များဖြင့် ပိတ်ထားသည်။ စွန်းနှစ်ဖက်လုံး နံရံနှင့် မဆက်ထားဘဲ နောက်ဘက်ဖွင့်ထားသောနေရာကို ကာထားသည့် နောက်ခံအကန့်လည်း မရှိပါ။ | シンクと加熱機器をまとめた独立カウンター。吊り下げ型レンジフードがあり、四方から歩いて見学できます。両端と背面は仕上げパネルで閉じています。壁につながる端はなく、開放した背面を遮る立ち上がりもありません。 |
| showroom.sink.title | Sink | ဘေစင် | シンク |
| showroom.sink.text | The Raku-Suru Sink’s low-step, gapless construction supports easier wiping and cleaning. | Raku-Suru ဘေစင်၏ အဆင့်ကွာဟမှုနည်းပြီး အဟကြားမရှိသော ဖွဲ့စည်းပုံသည် သုတ်ခြင်းနှင့် သန့်ရှင်းရေးကို ပိုလွယ်ကူစေသည်။ | ラクするーシンクの段差が小さく隙間のない構造は、拭き取りやお手入れのしやすさにつながります。 |
| showroom.cooktop.title | Cooktop | မီးဖို | 加熱機器 |
| showroom.cooktop.text | The Flat Wide series has horizontal cooking zones, easier access to pots, and a front area for preparation and plating. | Flat Wide စီးရီးတွင် အလျားလိုက် ချက်ပြုတ်နေရာများ၊ အိုးများကို ပိုလွယ်ကူစွာ လှမ်းနိုင်မှုနှင့် ပြင်ဆင်ခြင်း၊ ပန်းကန်ထဲထည့်ခြင်းအတွက် ရှေ့ဘက်နေရာ ရှိသည်။ | フラットワイドシリーズは横並びの加熱ゾーンで鍋に手が届きやすく、手前に下ごしらえや盛り付けのスペースがあります。 |
| showroom.hood.title | Range Hood | အငွေ့စုပ်စက် | レンジフード |
| showroom.hood.text | Reduced fan maintenance still requires routine plate and surface cleaning. Consult the kitchen experience for qualified, model-specific guidance. | ပန်ကာထိန်းသိမ်းမှု လျော့နည်းသော်လည်း ပလိတ်နှင့် မျက်နှာပြင်များကို ပုံမှန် သန့်ရှင်းရပါမည်။ သက်ဆိုင်ရာမော်ဒယ်အတွက် အခြေအနေကန့်သတ်ချက်ပါသော လမ်းညွှန်ကို မီးဖိုခန်းအက်ပ်တွင် လေ့လာပါ။ | ファンのお手入れ負担が減っても、プレートや表面の定期的な清掃は必要です。条件や機種ごとの案内はキッチン体験で確認してください。 |
| showroom.enter | Enter S-CLASS showroom | S-CLASS ပြခန်းသို့ ဝင်မည် | S-CLASS展示室に入る |
| showroom.exit | Leave S-CLASS showroom | S-CLASS ပြခန်းမှ ထွက်မည် | S-CLASS展示室を出る |
| showroom.guide | Read the showroom guide | ပြခန်းလမ်းညွှန်ကို ဖတ်မည် | 展示ガイドを読む |
| showroom.kioskPrompt | Open the S-CLASS kiosk | S-CLASS ကီယော့စ်ဖွင့်မည် | S-CLASSキオスクを開く |
| showroom.explore | Explore {layout} concept | {layout} အယူအဆကို လေ့လာမည် | {layout}のコンセプトを見る |
| showroom.learn | Learn about the {product} | {product} အကြောင်း လေ့လာမည် | {product}について学ぶ |
| showroom.layoutTitle | {layout} concept | {layout} အယူအဆ | {layout}のコンセプト |
| showroom.welcome | Welcome to the S-CLASS showroom | S-CLASS ပြခန်းမှ ကြိုဆိုပါသည် | S-CLASS展示室へようこそ |
| showroom.back | Back in Virtual World | Virtual World သို့ ပြန်ရောက်ပါပြီ | Virtual Worldに戻りました |
| showroom.receptionTitle | Welcome to the showroom | ပြခန်းမှ ကြိုဆိုပါသည် | 展示室へようこそ |
| showroom.route | Browse five concept layouts. I-Type, II-Type and L-Type are in the first row. Follow the side aisles to the second row for Face to Face (Peninsula) and Island (Center). | အယူအဆအပြင်အဆင် ၅ မျိုးကို ကြည့်ရှုပါ။ I၊ II၊ L ပုံစံများသည် ပထမတန်းတွင်ရှိသည်။ ဘေးလမ်းများမှ ဒုတိယတန်းသို့သွားပြီး မျက်နှာချင်းဆိုင် (ကျွန်းဆွယ်) နှင့် အလယ်ကျွန်းပုံစံကို ကြည့်ပါ။ | 5種類のコンセプトを見学できます。I型・II型・L型は一列目。側面の通路を進むと、二列目に対面型（ペニンシュラ）とアイランド型があります。 |
| showroom.how | Walk up to a display or cabinet label and press E, or tap its prompt. Read a layout below for its full description and product information. | ပြကွက် သို့မဟုတ် ဗီရိုစာတန်းအနီးသို့သွားပြီး E ကိုနှိပ်ပါ၊ သို့မဟုတ် ပြထားသောခလုတ်ကို နှိပ်ပါ။ အပြည့်အစုံနှင့် ထုတ်ကုန်အချက်အလက်အတွက် အောက်ပါပုံစံတစ်ခုကို ရွေးဖတ်ပါ။ | 展示やキャビネットのラベルに近づき、E または案内をタップしてください。下のレイアウトを選ぶと、詳しい説明と製品情報を読めます。 |
| showroom.return | The kitchen kiosk is beside reception. The marked exit returns you to Virtual World. | မီးဖိုခန်းကီယော့စ်သည် ဧည့်ကြိုဘေးတွင် ရှိသည်။ အမှတ်အသားပါသော ထွက်ပေါက်မှ Virtual World သို့ ပြန်နိုင်သည်။ | キッチンキオスクは受付の横です。表示された出口からVirtual Worldに戻れます。 |
| showroom.kioskTitle | S-CLASS Kitchen & Training | S-CLASS မီးဖိုခန်းနှင့် လေ့ကျင့်ရေး | S-CLASS キッチン・トレーニング |
| showroom.launch | Open S-CLASS Kitchen & Training | S-CLASS မီးဖိုခန်းနှင့် လေ့ကျင့်ရေးဖွင့်မည် | S-CLASS キッチン・トレーニングを開く |
| showroom.kioskCopy | Continue in the existing kitchen experience. It opens in a new tab; return to this world tab afterward to continue from the same spot. | ရှိပြီးသား မီးဖိုခန်းအက်ပ်တွင် ဆက်လေ့လာပါ။ တက်ဘ်အသစ်တွင် ဖွင့်မည်ဖြစ်ပြီး ဤကမ္ဘာတက်ဘ်သို့ ပြန်လာလျှင် တူညီသောနေရာမှ ဆက်လက်နိုင်သည်။ | 既存のキッチン体験へ進みます。新しいタブで開くので、この世界のタブに戻れば同じ場所から続けられます。 |
| showroom.chooseLayout | Choose your layout inside the configurator. | ပုံစံရွေးချယ်ရေးအက်ပ်အတွင်း၌ အပြင်အဆင်ကို ရွေးပါ။ | レイアウトはコンフィギュレーター内で選んでください。 |
| showroom.chooseLanguage | Choose your language inside the kitchen app if needed. Its language selection is separate. | လိုအပ်ပါက မီးဖိုခန်းအက်ပ်အတွင်း၌ ဘာသာစကားရွေးပါ။ ၎င်း၏ ဘာသာစကားရွေးချယ်မှုသည် သီးခြားဖြစ်သည်။ | 必要に応じてキッチンアプリ内でも言語を選んでください。言語の選択は別々です。 |
| showroom.unavailable | The kitchen experience is currently unavailable. Please enjoy the concept gallery and try again later. | မီးဖိုခန်းအက်ပ်ကို ယခုဖွင့်မရသေးပါ။ အယူအဆပြခန်းကို ကြည့်ရှုပြီး နောက်မှ ပြန်စမ်းပါ။ | 現在キッチン体験を利用できません。コンセプト展示をご覧いただき、後でお試しください。 |
| showroom.continueVisit | Continue your visit | ဆက်လက်လေ့လာပါ | 見学を続ける |
| showroom.eyebrow | Panasonic S-CLASS · Concept gallery | Panasonic S-CLASS · အယူအဆပြခန်း | Panasonic S-CLASS · コンセプト展示 |
| showroom.more | Learn more in the S-CLASS kitchen experience. | S-CLASS မီးဖိုခန်းအက်ပ်တွင် ပိုမိုလေ့လာပါ။ | 詳しくはS-CLASSのキッチン体験をご覧ください。 |
| showroom.five | Five layout concepts | အပြင်အဆင်အယူအဆ ၅ မျိုး | 5種類のレイアウト |
| showroom.products | Product information | ထုတ်ကုန်အချက်အလက် | 製品情報 |
| showroom.kioskAction | Kitchen experience kiosk | မီးဖိုခန်းလေ့လာရေး ကီယော့စ် | キッチン体験キオスク |
| sign.showroom | Concept Showroom | အယူအဆပြခန်း | コンセプト展示室 |
| sign.enter | E / TAP TO ENTER | E / နှိပ်၍ဝင်ပါ | E / タップで入る |
| sign.reception | Reception | ဧည့်ကြို | 受付 |
| sign.showroomWelcome | Panasonic S-CLASS<br>Concept Showroom | Panasonic S-CLASS<br>အယူအဆပြခန်း | Panasonic S-CLASS<br>コンセプト展示室 |
| sign.fiveRows | Five layouts · Two gallery rows | ပုံစံ ၅ မျိုး · ပြခန်းနှစ်တန်း | 5種類 · 展示二列 |
| sign.exitWorld | EXIT<br>Return to Virtual World | ထွက်ပေါက်<br>Virtual World သို့ပြန်ပါ | 出口<br>Virtual Worldに戻る |
| sign.openLiving | OPEN LIVING SIDE | ဧည့်ခန်းဘက်ဖွင့်ထား | 開放したリビング側 |
| sign.conceptDetails | CONCEPT DISPLAY<br>E / TAP FOR DETAILS | အယူအဆပြကွက်<br>E / နှိပ်၍ဖတ်ပါ | コンセプト展示<br>E / タップで詳細 |
| sign.secondGallery | SECOND GALLERY<br>04 Peninsula · 05 Island | ဒုတိယပြခန်း<br>04 ကျွန်းဆွယ် · 05 ကျွန်း | 第二展示<br>04 対面型 · 05 アイランド |
| sign.kitchenTraining | S-CLASS<br>Kitchen & Training | S-CLASS<br>မီးဖိုခန်း၊ လေ့ကျင့်ရေး | S-CLASS<br>キッチン・練習 |
| sign.continueKitchen | Continue in the kitchen experience | မီးဖိုခန်းအက်ပ်တွင် ဆက်လေ့လာပါ | キッチン体験へ進む |
| sign.conceptLimit | Concept gallery · Not installation guidance | အယူအဆပြခန်း · တပ်ဆင်မှုလမ်းညွှန်မဟုတ် | コンセプト展示 · 施工案内ではありません |
| map.showroom | Showroom | ပြခန်း | 展示室 |
| map.exit | Exit | ထွက်ပေါက် | 出口 |
| map.gallery2 | Gallery 2 | ပြခန်း ၂ | 展示2 |
| map.kiosk | Kiosk | ကီယော့စ် | キオスク |

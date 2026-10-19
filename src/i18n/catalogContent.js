// Demo merchandise descriptions and category labels; no changes to price or wear data.
const rows = String.raw`
catalog.laptops|Laptops|လက်တော့ပ်များ|ノートPC
catalog.phones|Phones & Tablets|ဖုန်း၊ တက်ဘလက်များ|スマートフォンとタブレット
catalog.cameras|Cameras|ကင်မရာများ|カメラ
catalog.audio|Headphones & Watches|နားကြပ်၊ နာရီများ|ヘッドホンと時計
catalog.gaming|Gaming & VR|ဂိမ်း၊ VR|ゲームとVR
catalog.desktops|Desktops & Monitors|ဒက်စ်တော့ပ်၊ မော်နီတာများ|デスクトップとモニター
catalog.speakers|Speakers|စပီကာများ|スピーカー
catalog.tvs|TVs|တီဗီများ|テレビ
catalog.drones|Drones|ဒရုန်းများ|ドローン
catalog.tees|T-Shirts & Polos|တီရှပ်၊ ပိုလိုများ|Tシャツとポロシャツ
catalog.hoodies|Hoodies & Jackets|ခေါင်းစွပ်၊ ဂျာကင်များ|パーカーとジャケット
catalog.pants|Jeans & Pants|ဂျင်း၊ ဘောင်းဘီများ|ジーンズとパンツ
catalog.dresses|Dresses & Skirts|ဂါဝန်၊ စကတ်များ|ワンピースとスカート
catalog.hats|Hats & Sunglasses|ဦးထုပ်၊ နေကာမျက်မှန်များ|帽子とサングラス
catalog.bags|Handbags & Purses|လက်ကိုင်အိတ်များ|ハンドバッグと小型バッグ
catalog.shoes|Shoes|ဖိနပ်များ|靴
catalog.backpacks|Backpacks|ကျောပိုးအိတ်များ|リュック
catalog.laptops0|Featherweight aluminium laptop with an all-day battery.|အလွန်ပေါ့သော အလူမီနီယမ်လက်တော့ပ်၊ တစ်နေ့တာခံဘက်ထရီပါသည်။|軽量アルミ製ノートPC。一日使えるバッテリー。
catalog.laptops1|Workstation power for video and 3D.|ဗီဒီယို၊ 3D အတွက် အလုပ်ရုံသုံးစွမ်းအား။|動画と3D向けのワークステーション性能。
catalog.laptops2|240 Hz screen and RGB keyboard.|240 Hz မျက်နှာပြင်၊ RGB ကီးဘုတ်။|240 Hz画面とRGBキーボード。
catalog.laptops3|Folds into a tablet, pen included.|တက်ဘလက်အဖြစ် ခေါက်နိုင်ပြီး ပင်ပါသည်။|折りたたんでタブレットに。ペン付属。
catalog.laptops4|Light, simple, perfect for school.|ပေါ့ပါး၊ ရိုးရှင်းပြီး ကျောင်းသုံးရန်သင့်တော်သည်။|軽くてシンプル。学校での使用に。
catalog.laptops5|Colour-accurate OLED for designers.|ဒီဇိုင်နာများအတွက် အရောင်တိကျသော OLED။|デザイナー向けの色再現に優れたOLED。
catalog.phones0|Triple camera flagship.|ကင်မရာသုံးလုံးပါ ထိပ်တန်းဖုန်း။|トリプルカメラのフラッグシップ。
catalog.phones1|Everything you need, nothing you don’t.|လိုအပ်သမျှပါပြီး မလိုအပ်သည်များမပါ။|必要なものを、必要なだけ。
catalog.phones2|A phone that unfolds into a tablet.|ဖြန့်ဖွင့်လျှင် တက်ဘလက်ဖြစ်သောဖုန်း။|開くとタブレットになるスマートフォン。
catalog.phones3|Pro tablet with a laptop-class chip.|လက်တော့ပ်အဆင့်ချစ်ပ်ပါ ပရော်တက်ဘလက်။|ノートPC級チップ搭載のプロ向けタブレット。
catalog.phones4|Pocketable reading and gaming tablet.|စာဖတ်၊ ဂိမ်းကစားရန် အိတ်ဆောင်တက်ဘလက်။|読書とゲーム用の持ち運べるタブレット。
catalog.phones5|Three colourful silicone cases.|အရောင်စုံ ဆီလီကွန်ကာဗာသုံးခု။|カラフルなシリコンケース3個。
catalog.cameras0|24 MP DSLR with 18-55 mm lens.|24 MP DSLR၊ 18-55 mm မှန်ဘီလူးပါသည်။|24 MP DSLRと18-55 mmレンズ。
catalog.cameras1|Compact full-frame mirrorless.|အရွယ်ငယ် ဖူးဖရိမ်းမီရာလက်စ်။|コンパクトなフルサイズミラーレス。
catalog.cameras2|Waterproof 5K action camera.|ရေလုံ 5K အက်ရှင်ကင်မရာ။|防水5Kアクションカメラ。
catalog.cameras3|The classic portrait prime.|ပုံတူအတွက် ရိုးရာတစ်ဆမှန်ဘီလူး။|定番のポートレート用単焦点レンズ。
catalog.cameras4|Pro telephoto zoom.|ပရော်ဖက်ရှင်နယ် အဝေးဆွဲမှန်ဘီလူး။|プロ向け望遠ズーム。
catalog.cameras5|Prints photos in seconds.|စက္ကန့်ပိုင်းအတွင်း ဓာတ်ပုံထုတ်ပေးသည်။|数秒で写真をプリント。
catalog.audio0|Noise cancelling over-ears.|ဆူညံသံလျှော့ နားဖုံးနားကြပ်။|ノイズキャンセル付きオーバーイヤー。
catalog.audio1|Punchy bass, bright colours.|အားကောင်းသောဘေ့စ်၊ တောက်ပသောအရောင်များ။|力強い低音と鮮やかな色。
catalog.audio2|Tiny earbuds, big sound.|နားကြပ်သေးသေး၊ အသံကြီးကြီး။|小さなイヤホン、大きなサウンド。
catalog.audio3|Health tracking and notifications.|ကျန်းမာရေးခြေရာခံခြင်း၊ အသိပေးချက်များ။|健康管理と通知機能。
catalog.audio4|GPS running watch.|GPS ပြေးလေ့ကျင့်ရေးနာရီ။|GPSランニングウォッチ。
catalog.gaming0|4K console with a 1 TB SSD.|1 TB SSD ပါသော 4K ဂိမ်းစက်။|1 TB SSD搭載4Kゲーム機。
catalog.gaming1|Handheld and TV console.|လက်ကိုင်၊ တီဗီချိတ်ဂိမ်းစက်။|携帯でもテレビでも遊べるゲーム機。
catalog.gaming2|Wireless pad with paddles.|နောက်ခလုတ်ပါ ကြိုးမဲ့ဂိမ်းခလုတ်။|パドル付きワイヤレスコントローラー。
catalog.gaming3|Standalone mixed-reality headset.|သီးခြားသုံးနိုင်သော ရောနှောမြင်ကွင်းခေါင်းစွပ်။|単体で使える複合現実ヘッドセット。
catalog.gaming4|Ergonomic racing-style chair.|ကိုယ်ခန္ဓာသက်သာသော ပြိုင်ကားပုံစံထိုင်ခုံ။|人間工学に基づくレーシング型チェア。
catalog.desktops0|Liquid cooled gaming tower.|အရည်အေးပေးစနစ်ပါ ဂိမ်းကွန်ပျူတာ။|液冷ゲーミングタワー。
catalog.desktops1|Quiet, compact creative workstation.|ငြိမ်သက်၊ အရွယ်ငယ် ဖန်တီးရေးအလုပ်ရုံကွန်ပျူတာ။|静かでコンパクトな制作用ワークステーション。
catalog.desktops2|Sharp IPS panel, USB-C.|ပုံကြည်သော IPS မျက်နှာပြင်၊ USB-C။|鮮明なIPSパネル、USB-C。
catalog.desktops3|Curved 144 Hz ultrawide.|ကွေးသော 144 Hz အလွန်ကျယ်မျက်နှာပြင်။|曲面144 Hzウルトラワイド。
catalog.desktops4|Hot-swap switches, per-key RGB.|လွယ်ကူစွာလဲနိုင်သောခလုတ်များ၊ တစ်ခလုတ်စီ RGB။|ホットスワップスイッチ、各キーRGB。
catalog.desktops5|Lightweight wireless mouse.|ပေါ့ပါးသော ကြိုးမဲ့မောက်စ်။|軽量ワイヤレスマウス。
catalog.speakers0|Floor-standing hi-fi towers.|ကြမ်းပြင်ပေါ်ထားသော အသံကောင်းစပီကာများ။|床置きHi-Fiタワースピーカー。
catalog.speakers1|Compact powered speakers.|အရွယ်ငယ် ပါဝါပါစပီကာများ။|コンパクトなアクティブスピーカー。
catalog.speakers2|Dolby Atmos soundbar.|Dolby Atmos အသံဘား။|Dolby Atmosサウンドバー。
catalog.speakers3|Waterproof party speaker.|ရေလုံပါတီစပီကာ။|防水パーティースピーカー。
catalog.speakers4|Voice assistant speaker.|အသံဖြင့်ကူညီပေးသော စပီကာ။|音声アシスタントスピーカー。
catalog.tvs0|Perfect blacks, 120 Hz.|အနက်ရောင်ကောင်း၊ 120 Hz။|深い黒、120 Hz。
catalog.tvs1|Huge, bright, cinematic.|ကြီးမား၊ တောက်ပပြီး ရုပ်ရှင်ဆန်သည်။|大きく明るい、映画のような画面。
catalog.tvs2|All your apps built in.|သင့်အက်ပ်များအားလုံး ထည့်ထားသည်။|アプリを内蔵。
catalog.tvs3|120" picture from a small box.|စက်သေးသေးမှ 120" ပုံရသည်။|小さな本体から120インチ映像。
catalog.drones0|40 min flight time, obstacle sensing.|မိနစ် ၄၀ ပျံနိုင်၊ အတားအဆီးအာရုံခံ။|飛行時間40分、障害物検知。
catalog.drones1|Under 250 g, fly almost anywhere.|250 g အောက်၊ နေရာများစွာတွင် ပျံနိုင်သည်။|250 g未満で、さまざまな場所で飛ばせます。
catalog.drones2|Goggles included. Very fast.|မျက်မှန်ပါသည်။ အလွန်မြန်သည်။|ゴーグル付属。非常に高速。
catalog.bags0|Leather tote with gold hardware.|ရွှေရောင်အဆင်ပါ သားရေလက်ဆွဲအိတ်။|金色の金具付きレザートート。
catalog.bags1|Satin clutch for nights out.|ညပွဲအတွက် ဖဲသားလက်ကိုင်အိတ်။|夜のお出かけ用サテンクラッチ。
catalog.bags2|Hands-free everyday bag.|နေ့စဉ်သုံး လက်လွတ်လွယ်အိတ်။|両手が空く普段使いバッグ。
catalog.bags3|Drawstring bucket bag.|ကြိုးဆွဲပိတ်ပုံးပုံအိတ်။|巾着型バケットバッグ。
catalog.bags4|Just your cards and keys.|ကတ်များ၊ သော့များအတွက်သာ။|カードと鍵だけを持ち歩く。
catalog.bags5|Fits a whole weekend.|ပိတ်ရက်ခရီးအတွက် လုံလောက်သည်။|週末旅行の荷物が入ります。
item.case|Phone Case Pack|ဖုန်းကာဗာအစုံ|スマートフォンケースセット
item.lens|50 mm f/1.8 Lens|50 mm f/1.8 မှန်ဘီလူး|50 mm f/1.8レンズ
item.zoom|70-200 mm Zoom|70-200 mm အဝေးဆွဲ|70-200 mmズーム
item.instant|Instant Camera|လက်ငင်းဓာတ်ပုံကင်မရာ|インスタントカメラ
item.buds|Wireless Buds Pro|ကြိုးမဲ့နားကြပ် Pro|ワイヤレスイヤホンPro
item.sportWatch|Sport Band Watch|အားကစားနာရီ|スポーツバンドウォッチ
item.controller|Pro Controller|Pro ဂိမ်းခလုတ်|Proコントローラー
item.chair|Gaming Chair|ဂိမ်းထိုင်ခုံ|ゲーミングチェア
item.desktop|Studio Desktop|စတူဒီယိုဒက်စ်တော့ပ်|スタジオデスクトップ
item.monitor|27" 4K Monitor|27" 4K မော်နီတာ|27インチ4Kモニター
item.ultrawide|34" Ultrawide|34" အလွန်ကျယ်မျက်နှာပြင်|34インチウルトラワイド
item.keyboard|Mech Keyboard|မက္ကင်းနစ်ကီးဘုတ်|メカニカルキーボード
item.mouse|Pro Mouse|Pro မောက်စ်|Proマウス
item.towerSpeakers|Tower Speakers (pair)|တာဝါစပီကာ (တစ်စုံ)|タワースピーカー（ペア）
item.bookshelf|Bookshelf Speakers|စင်တင်စပီကာ|ブックシェルフスピーカー
item.soundbar|Cinema Soundbar|ရုပ်ရှင်အသံဘား|シネマサウンドバー
item.smartSpeaker|Home Smart Speaker|အိမ်သုံးစမတ်စပီကာ|ホームスマートスピーカー
item.oled|65" OLED TV|65" OLED တီဗီ|65インチOLEDテレビ
item.qled|75" QLED TV|75" QLED တီဗီ|75インチQLEDテレビ
item.tv|55" Smart TV|55" စမတ်တီဗီ|55インチスマートテレビ
item.projector|4K Projector|4K ပရိုဂျက်တာ|4Kプロジェクター
item.drone|Mini Drone|ဒရုန်းအသေး|ミニドローン
item.redTee|Classic Tee — Red|မူရင်းတီရှပ် — အနီ|クラシックTシャツ — 赤
item.stripeTee|Breton Stripe Tee|အစင်းတီရှပ်|ボーダーTシャツ
item.logoTee|Logo Tee — Black|လိုဂိုတီရှပ် — အနက်|ロゴTシャツ — 黒
item.starTee|Star Tee — Yellow|ကြယ်တီရှပ် — အဝါ|星柄Tシャツ — 黄
item.whitePolo|Polo — White|ပိုလို — အဖြူ|ポロシャツ — 白
item.greenPolo|Polo — Green|ပိုလို — အစိမ်း|ポロシャツ — 緑
item.greyHoodie|Cloud Hoodie — Grey|ပေါ့ပါးခေါင်းစွပ်အင်္ကျီ — မီးခိုး|クラウドパーカー — グレー
item.blueHoodie|Logo Hoodie — Blue|လိုဂိုခေါင်းစွပ်အင်္ကျီ — အပြာ|ロゴパーカー — 青
item.camoHoodie|Camo Hoodie|ပြောက်ကျားခေါင်းစွပ်အင်္ကျီ|迷彩パーカー
item.bomber|Bomber Jacket|ဘွန်ဘာဂျာကင်|ボンバージャケット
item.denim|Denim Jacket|ဂျင်းဂျာကင်|デニムジャケット
item.varsity|Varsity Jacket|ကျောင်းအသင်းဂျာကင်|スタジャン
item.slimJeans|Slim Jeans — Indigo|ဂျင်းအကျပ် — မဲနယ်|スリムジーンズ — インディゴ
item.lightJeans|Light Wash Jeans|အရောင်ဖျော့ဂျင်း|ライトウォッシュジーンズ
item.joggers|Black Joggers|အနက်ရောင်အားကစားဘောင်းဘီ|黒のジョガーパンツ
item.chino|Chino Shorts|ချီနိုဘောင်းဘီတို|チノショーツ
item.cargo|Cargo Pants|အိတ်များပါဘောင်းဘီ|カーゴパンツ
item.summer|Summer Dress — Pink|နွေရာသီဂါဝန် — ပန်းရောင်|サマーワンピース — ピンク
item.floral|Floral Dress|ပန်းပွင့်ဂါဝန်|花柄ワンピース
item.eveningDress|Evening Dress|ညပွဲဂါဝန်|イブニングドレス
item.pleated|Pleated Skirt — Navy|အတွန့်စကတ် — နက်ပြာ|プリーツスカート — ネイビー
item.tennis|Tennis Skirt — White|တင်းနစ်စကတ် — အဖြူ|テニススカート — 白
item.snapback|Snapback Cap|နောက်ချိန်နိုင်သောကက်ဦးထုပ်|スナップバックキャップ
item.redCap|Red Cap|အနီရောင်ကက်ဦးထုပ်|赤のキャップ
item.beanie|Knit Beanie|ချည်ထိုးဦးထုပ်|ニット帽
item.topHat|Top Hat|ထိပ်မြင့်ဦးထုပ်|シルクハット
item.aviator|Aviator Shades|လေယာဉ်မှူးပုံနေကာမျက်မှန်|アビエーターサングラス
item.glasses|Round Glasses|မျက်မှန်အဝိုင်း|丸眼鏡
item.goldWatch|Gold Watch|ရွှေရောင်နာရီ|金色の時計
item.tote|Classic Tote — Tan|ရိုးရာလက်ဆွဲအိတ် — အညိုဖျော့|クラシックトート — タン
item.clutch|Evening Clutch|ညပွဲလက်ကိုင်အိတ်|イブニングクラッチ
item.crossbody|Crossbody Bag|စလွယ်သိုင်းအိတ်|クロスボディバッグ
item.bucket|Bucket Bag — Red|ပုံးပုံအိတ် — အနီ|バケットバッグ — 赤
item.purse|Mini Purse|အိတ်အသေး|ミニバッグ
item.duffel|Weekender Duffel|ပိတ်ရက်ခရီးအိတ်|週末用ダッフルバッグ
item.runner|Block Runner Sneakers|ပြေးဖိနပ်|ランニングスニーカー
item.highTop|High-top Sneakers — Red|အမြင့်ပြေးဖိနပ် — အနီ|ハイカットスニーカー — 赤
item.boots|Chelsea Boots|ချယ်လ်ဆီးဘွတ်ဖိနပ်|チェルシーブーツ
item.heels|Classic Heels|ရိုးရာဒေါက်ဖိနပ်|クラシックヒール
item.slides|Slides|ခြေညှပ်ဖိနပ်|スライドサンダル
item.bluePack|Daypack — Blue|နေ့သုံးကျောပိုးအိတ် — အပြာ|デイパック — 青
item.yellowPack|Daypack — Yellow|နေ့သုံးကျောပိုးအိတ် — အဝါ|デイパック — 黄
item.hiker|Hiker 40L|တောင်တက်အိတ် 40L|登山リュック40L
item.cape|Hero Cape|သူရဲကောင်းဝတ်ရုံ|ヒーローマント
item.wings|Neon Wings|နီယွန်တောင်ပံ|ネオンウイング
`;
export const catalogContent = Object.fromEntries(rows.trim().split('\n').map(line => {
  const [key, ...values] = line.split('|'); return [key, values];
}));

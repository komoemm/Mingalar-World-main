// Shared visitor copy. IDs and simulation data stay independent of these labels.
const rows = String.raw`
showroom.place|Panasonic S-CLASS Showroom|Panasonic S-CLASS ပြခန်း|Panasonic S-CLASS展示室
race.bestDetails|Best lap {best} · Personal best in the {name}: {personal}|အကောင်းဆုံးပတ် {best} · {name} ဖြင့်ကိုယ်ပိုင်အကောင်းဆုံး: {personal}|ベストラップ {best} · {name} の自己ベスト：{personal}
range.headLabel|HEADSHOT|ခေါင်းထိ|ヘッドショット
range.bullseyeLabel|BULLSEYE|ဗဟိုထိ|ど真ん中
sign.bayHeading|{number}  {heading}|{number}  {heading}|{number}  {heading}
world.home|Luxury Home|အဆင့်မြင့်အိမ်|邸宅
world.homeSign|LUXURY HOME GALLERY|အဆင့်မြင့်အိမ်ပြခန်း|邸宅ギャラリー
world.homePrompt|Tour the Luxury Home Gallery|အိမ်ပြခန်းကို လေ့လာမည်|邸宅ギャラリーを見学
world.pool|Pool|ရေကူးကန်|プール
world.poolSign|POOL|ရေကူးကန်|プール
world.gym|Gym|အားကစားခန်း|ジム
world.gymSign|GYM|အားကစားခန်း|ジム
world.workout|Start a workout|လေ့ကျင့်ခန်းစမည်|運動を始める
world.golf|Mini Golf|ဂေါက်အသေးစား|ミニゴルフ
world.golfSign|MINI GOLF|ဂေါက်အသေးစား|ミニゴルフ
world.golfPrompt|Play Mini Golf|ဂေါက်အသေးစားကစားမည်|ミニゴルフを遊ぶ
world.fountain|Fountain|ရေပန်း|噴水
world.court|Court|အားကစားကွင်း|コート
world.pond|Pond|ရေကန်|池
world.garden|Garden|ဥယျာဉ်|庭園
world.spawn|Spawn|စတင်နေရာ|出発点
world.bus|BUS|ဘတ်စ်ကား|バス
workout.touch|Jumping jacks! Move the stick to stop|လက်ခြေဖြန့်ခုန်နေသည်။ ရပ်ရန် လှုပ်ရှားခလုတ်ကို ရွှေ့ပါ|ジャンピングジャック！スティックを動かすと終了
workout.desktop|Jumping jacks! Move or press E to stop|လက်ခြေဖြန့်ခုန်နေသည်။ ရပ်ရန် ရွေ့ပါ သို့မဟုတ် E ကိုနှိပ်ပါ|ジャンピングジャック！移動または E で終了
workout.done|Workout done: {count} jumping jacks|လေ့ကျင့်ခန်းပြီးပြီ။ လက်ခြေဖြန့်ခုန် {count} ကြိမ်|運動終了：ジャンピングジャック {count} 回
workout.status|Jumping jacks|လက်ခြေဖြန့်ခုန်|ジャンピングジャック
home.living|Living Room|ဧည့်ခန်း|リビング
home.livingText|Double-height glass wall facing the garden, with a sunken lounge and fireplace.|ဥယျာဉ်ဘက်သို့ မျက်နှာမူသော နှစ်ထပ်မြင့်မှန်နံရံ၊ အနိမ့်ချထားသော ဧည့်နေရာနှင့် မီးဖိုရှိသည်။|庭に面した吹き抜けのガラス壁、床を下げたラウンジ、暖炉があります。
home.kitchen|Chef’s Kitchen|စားဖိုမှူးမီးဖိုခန်း|シェフのキッチン
home.kitchenText|Stone island, integrated appliances and a walk-in pantry behind a hidden door.|ကျောက်သားကျွန်းကောင်တာ၊ ထည့်သွင်းထားသော စက်ပစ္စည်းများနှင့် ဝှက်ထားသောတံခါးနောက်တွင် ဝင်လျှောက်နိုင်သော စားစရာသိုလှောင်ခန်းရှိသည်။|石のアイランド、組み込み機器、隠し扉の奥にウォークインパントリーがあります。
home.suite|Master Suite|ပင်မအိပ်ခန်းတွဲ|主寝室スイート
home.suiteText|Corner suite with a private balcony, dressing room and spa bathroom.|ထောင့်အခန်းတွဲတွင် ကိုယ်ပိုင်လသာဆောင်၊ အဝတ်လဲခန်းနှင့် စပါပုံစံရေချိုးခန်းရှိသည်။|コーナースイートに専用バルコニー、着替え室、スパ風の浴室があります。
home.cinema|Home Cinema|အိမ်တွင်းရုပ်ရှင်ခန်း|ホームシネマ
home.cinemaText|Eight reclining seats, acoustic panelling and a starlight ceiling.|နောက်လှန်နိုင်သောထိုင်ခုံ ရှစ်လုံး၊ အသံထိန်းနံရံအကန့်များနှင့် ကြယ်ရောင်မျက်နှာကျက်ရှိသည်။|リクライニング席8席、防音パネル、星空を模した天井があります。
home.terrace|Roof Terrace|အမိုးပေါ်အပန်းဖြေနေရာ|屋上テラス
home.terraceText|Open-air lounge with an outdoor kitchen and sunset views over the town.|အပြင်မီးဖိုခန်းနှင့် မြို့အပေါ် နေဝင်ချိန်ရှုခင်းကို မြင်နိုင်သော လေဟာပြင်အပန်းဖြေနေရာဖြစ်သည်။|屋外キッチンがあり、街の夕景を眺められるオープンエアのラウンジです。
home.smart|Smart lighting|စမတ်မီးအလင်း|スマート照明
home.gardenView|Garden view|ဥယျာဉ်မြင်ကွင်း|庭園の眺め
home.seating|Island seating|ကျွန်းကောင်တာထိုင်နေရာ|アイランド席
home.wine|Wine wall|ဝိုင်စင်နံရံ|ワインウォール
home.pantry|Pantry|စားစရာသိုလှောင်ခန်း|パントリー
home.balcony|Balcony|လသာဆောင်|バルコニー
home.dressing|Dressing room|အဝတ်လဲခန်း|着替え室
home.spa|Spa bath|စပါရေချိုးခန်း|スパバス
home.seats|8 seats|ထိုင်ခုံ ၈ လုံး|8席
home.laser|4K laser|4K လေဆာ|4Kレーザー
home.sound|Soundproofed|အသံလုံထား|防音
home.outdoor|Outdoor kitchen|အပြင်မီးဖိုခန်း|屋外キッチン
home.fire|Fire pit|မီးဖိုဝိုင်း|ファイヤーピット
home.solar|Solar roof|နေရောင်ခြည်စွမ်းအင်အမိုး|ソーラールーフ
home.off|Turn house lights off|အိမ်မီးပိတ်မည်|家の照明を消す
home.on|Turn house lights on|အိမ်မီးဖွင့်မည်|家の照明をつける
home.note|Placeholder rooms. Swap in real photos or renders later.|နမူနာအခန်းများဖြစ်သည်။ နောက်ပိုင်းတွင် အမှန်တကယ်ဓာတ်ပုံ သို့မဟုတ် ပုံဖော်ထားသောပုံများဖြင့် အစားထိုးနိုင်သည်။|仮の部屋です。後から実際の写真やレンダリング画像に差し替えられます。
home.tour|Gallery tour|ပြခန်းလေ့လာခြင်း|ギャラリー見学
home.previous|Previous room|ယခင်အခန်း|前の部屋
home.next|Next room|နောက်အခန်း|次の部屋
office.name|Virtual Office|Virtual ရုံး|Virtualオフィス
office.sign|VIRTUAL OFFICE|Virtual ရုံး|Virtualオフィス
office.enter|Enter the Virtual Office|Virtual ရုံးသို့ဝင်မည်|Virtualオフィスに入る
office.welcome|Welcome to the Virtual Office|Virtual ရုံးမှ ကြိုဆိုပါသည်|Virtualオフィスへようこそ
office.exit|Exit to the street|လမ်းသို့ထွက်မည်|通りへ出る
office.exitSign|EXIT|ထွက်ပေါက်|出口
office.reception|Reception|ဧည့်ကြို|受付
office.talk|Talk to reception|ဧည့်ကြိုနှင့်ပြောမည်|受付で案内を聞く
office.intro|Welcome to the Virtual Office! Three teams work on this floor:|Virtual ရုံးမှ ကြိုဆိုပါသည်။ ဤထပ်တွင် အဖွဲ့သုံးဖွဲ့ အလုပ်လုပ်သည်။|Virtualオフィスへようこそ！この階には3つのチームがあります。
office.nw|North-west corner. Walk up to the holographic city table.|အနောက်မြောက်ထောင့်ရှိ မြို့ပုံဟိုလိုဂရမ်စားပွဲအနီးသို့ သွားပါ။|北西の角。ホログラムの街のテーブルに近づいてください。
office.ne|North-east corner. The studio with the video wall.|အရှေ့မြောက်ထောင့်၊ ဗီဒီယိုနံရံပါသော စတူဒီယိုဖြစ်သည်။|北東の角。ビデオウォールのあるスタジオです。
office.se|South-east corner. The developer desk with the contribution wall.|အရှေ့တောင်ထောင့်၊ ပါဝင်လုပ်ဆောင်မှုနံရံပါသော ဆော့ဖ်ဝဲဖန်တီးသူ၏ စားပွဲဖြစ်သည်။|南東の角。貢献履歴の壁がある開発者のデスクです。
office.instructions|Press <kbd>E</kbd> near each one to visit their site. The exit is right behind you.|အဖွဲ့တစ်ဖွဲ့ချင်းအနီးတွင် <kbd>E</kbd> နှိပ်၍ သူတို့၏ဝက်ဘ်ဆိုက်သို့ သွားပါ။ ထွက်ပေါက်သည် သင့်နောက်တွင် ရှိသည်။|各チームの近くで <kbd>E</kbd> を押すとサイトへ移動できます。出口はすぐ後ろです。
office.map|City Map|မြို့မြေပုံ|都市マップ
office.mapSign|CITY MAP|မြို့မြေပုံ|都市マップ
office.mapText|An interactive map of the city by Alacrity Research. Explore neighbourhoods, data layers and points of interest.|Alacrity Research ၏ အပြန်အလှန်အသုံးပြုနိုင်သော မြို့မြေပုံဖြစ်သည်။ ရပ်ကွက်များ၊ ဒေတာအလွှာများနှင့် စိတ်ဝင်စားဖွယ်နေရာများကို လေ့လာပါ။|Alacrity Researchによるインタラクティブな都市マップ。地区、データレイヤー、見どころを探索できます。
office.mapAction|Open the city map|မြို့မြေပုံဖွင့်မည်|都市マップを開く
office.news|Virtual News|Virtual သတင်း|Virtualニュース
office.newsSign|VIRTUAL NEWS|Virtual သတင်း|Virtualニュース
office.newsroom|Newsroom|သတင်းခန်း|ニュースルーム
office.newsText|Breaking stories, analysis and features from the Virtual News desk.|Virtual သတင်းဌာန၏ နောက်ဆုံးသတင်းများ၊ သုံးသပ်ချက်များနှင့် အထူးဆောင်းပါးများဖြစ်သည်။|Virtualニュースの最新情報、分析、特集を紹介します。
office.readNews|Read Virtual News|Virtual သတင်းဖတ်မည်|Virtualニュースを読む
office.dev|Developer studio|ဆော့ဖ်ဝဲဖန်တီးသူစတူဒီယို|開発者スタジオ
office.devText|Projects, experiments and open source work, including this virtual world.|ဤကမ္ဘာအပါအဝင် စီမံကိန်းများ၊ စမ်းသပ်မှုများနှင့် အများပြည်သူသုံးရင်းမြစ်အလုပ်များဖြစ်သည်။|この仮想世界を含むプロジェクト、実験、オープンソースの取り組みです。
office.github|Visit GitHub profile|GitHub ကိုယ်ရေးစာမျက်နှာသို့သွားမည်|GitHubプロフィールへ
office.newTab|Opens {site} in a new tab.|{site} ကို တက်ဘ်အသစ်တွင် ဖွင့်မည်။|{site} を新しいタブで開きます。
office.kicker|Virtual Office · {section}|Virtual ရုံး · {section}|Virtualオフィス · {section}
office.teams|Alacrity Research  ·  Virtual News  ·  Tun-PS-Lin|Alacrity Research  ·  Virtual သတင်း  ·  Tun-PS-Lin|Alacrity Research  ·  Virtualニュース  ·  Tun-PS-Lin
office.mapPrompt|Open the City Map — map.alacrityresearch.xyz|မြို့မြေပုံဖွင့်မည် — map.alacrityresearch.xyz|都市マップを開く — map.alacrityresearch.xyz
office.newsPrompt|Watch Virtual News|Virtual သတင်းကြည့်မည်|Virtualニュースを見る
office.githubPrompt|Visit Tun-PS-Lin on GitHub|GitHub ရှိ Tun-PS-Lin သို့သွားမည်|GitHubでTun-PS-Linを見る
office.short|Office|ရုံး|オフィス
office.newsShort|News|သတင်း|ニュース
office.lounge|Lounge|အပန်းဖြေနေရာ|ラウンジ
office.coffee|COFFEE|ကော်ဖီ|コーヒー
office.onAir|ON AIR|ထုတ်လွှင့်နေ|放送中
office.live|LIVE  ●|တိုက်ရိုက်  ●|生放送  ●
office.breaking|BREAKING|နောက်ဆုံးသတင်း|速報
office.ticker|Virtual World opens its new raceway  ·  Virtual Mall unveils Tech and Fashion floors  ·  Markets steady  ·  Weather: sunny all week  ·  |Virtual World ပြိုင်ကွင်းအသစ်ဖွင့်ပြီ  ·  Virtual ကုန်တိုက်တွင် နည်းပညာ၊ ဖက်ရှင်အထပ်များဖွင့်ပြီ  ·  ဈေးကွက်တည်ငြိမ်  ·  တစ်ပတ်လုံးနေပူမည်  ·  |Virtual Worldの新レース場が開場  ·  Virtualモールにテックとファッションのフロア登場  ·  市場は安定  ·  一週間晴れの予報  ·
office.contributions|contributions in the last year|ပြီးခဲ့သည့်နှစ်၏ ပါဝင်လုပ်ဆောင်မှုများ|過去一年の貢献履歴
mall.name|Virtual Mall|Virtual ကုန်တိုက်|Virtualモール
mall.sign|VIRTUAL MALL|Virtual ကုန်တိုက်|Virtualモール
mall.sectionsSign|TECH  ·  FASHION|နည်းပညာ  ·  ဖက်ရှင်|テック  ·  ファッション
mall.tech|Tech|နည်းပညာ|テック
mall.techSign|TECH|နည်းပညာ|テック
mall.fashion|Fashion|ဖက်ရှင်|ファッション
mall.fashionSign|FASHION|ဖက်ရှင်|ファッション
mall.techKicker|Virtual Mall · Tech|Virtual ကုန်တိုက် · နည်းပညာ|Virtualモール · テック
mall.fashionKicker|Virtual Mall · Fashion|Virtual ကုန်တိုက် · ဖက်ရှင်|Virtualモール · ファッション
mall.browse|Browse {display}|{display} ကိုကြည့်မည်|{display} を見る
mall.add|Add|ထည့်မည်|追加
mall.try|Try it on|ဝတ်ကြည့်မည်|試着
mall.added|{name} added to cart|{name} ကို ခြင်းထဲထည့်ပြီးပြီ|{name} をカートに追加
mall.wearing|Wearing {name}|{name} ကို ဝတ်ဆင်ထားသည်|{name} を着用中
mall.viewCart|View cart ({count})|ခြင်းကြည့်မည် ({count})|カートを見る ({count})
mall.cart|Your cart|သင့်ဈေးဝယ်ခြင်း|カート
mall.empty|Your cart is empty.<br>Walk up to a display and add something.|သင့်ခြင်းတွင် ဘာမှမရှိသေးပါ။<br>ပြကွက်အနီးသို့ သွား၍ ပစ္စည်းတစ်ခုထည့်ပါ။|カートは空です。<br>展示に近づいて商品を追加してください。
mall.total|Total|စုစုပေါင်း|合計
mall.checkout|Checkout|ဝယ်ယူမှုအဆုံးသတ်မည်|購入手続き
mall.note|Demo store. No payment is taken and nothing is ordered.|နမူနာဆိုင်ဖြစ်သည်။ ငွေမကောက်ခံဘဲ အမှန်တကယ်မှာယူမှုလည်း မရှိပါ။|デモ店舗です。支払いや実際の注文は発生しません。
mall.thanks|Demo checkout complete. Thanks for shopping!|နမူနာဝယ်ယူမှု ပြီးပြီ။ ဈေးဝယ်သည့်အတွက် ကျေးဇူးတင်ပါသည်။|デモ購入手続き完了。ご利用ありがとうございます！
mall.fitting|FITTING|အဝတ်စမ်းခန်း|試着室
mall.increase|Increase quantity|အရေအတွက်တိုးမည်|数量を増やす
mall.decrease|Decrease quantity|အရေအတွက်လျှော့မည်|数量を減らす
garage.name|Virtual Garage|Virtual ကားပြခန်း|Virtualガレージ
garage.sign|VIRTUAL GARAGE|Virtual ကားပြခန်း|Virtualガレージ
garage.modSign|MOD SHOP|ကားပြင်ဆင်ခန်း|カスタムショップ
garage.kicker|Virtual Garage · Mod shop|Virtual ကားပြခန်း · ပြင်ဆင်ခန်း|Virtualガレージ · カスタム
garage.prompt|Customise the {name}|{name} ကိုပြင်ဆင်မည်|{name} をカスタム
garage.carSign|{name}\n{tag}|{name}\n{tag}|{name}\n{tag}
garage.help|Press E at a car to customise it and race at the Virtual Raceway|ကားအနီးတွင် E နှိပ်၍ ပြင်ဆင်ပြီး Virtual ပြိုင်ကွင်းတွင် မောင်းပါ|車の近くで E を押してカスタムし、Virtualレース場で走ろう
garage.parking|Parking|ကားရပ်နားရန်|駐車場
garage.top|Top speed|အမြင့်ဆုံးအမြန်နှုန်း|最高速度
garage.accel|Acceleration|အရှိန်တင်နှုန်း|加速
garage.grip|Grip|လမ်းကပ်အား|グリップ
garage.speedNote|{speed} km/h top speed{nitro}|အမြင့်ဆုံးအမြန်နှုန်း {speed} km/h{nitro}|最高速度 {speed} km/h{nitro}
garage.nitroFitted| · Nitro fitted| · နိုက်ထရိုတပ်ထား| · ニトロ装備
garage.race|🏁 Race this car|🏁 ဤကားဖြင့်ပြိုင်မည်|🏁 この車でレース
garage.paint|Paint|ဆေးအရောင်|塗装色
garage.rim|Rim colour|ဘီးခွေအရောင်|リムの色
garage.stripeColor|Stripe colour|အစင်းအရောင်|ストライプの色
garage.finish|Finish|မျက်နှာပြင်အချောသတ်|仕上げ
garage.wheels|Wheels|ဘီးများ|ホイール
garage.spoiler|Spoiler|လေခွဲတောင်ပံ|スポイラー
garage.kit|Body kit|ကိုယ်ထည်အစုံ|ボディキット
garage.underglow|Underglow|ကားအောက်မီး|アンダーライト
garage.stripes|Stripes|အစင်းများ|ストライプ
garage.tint|Tint|မှန်အမည်း|ガラスの色
garage.engine|Engine|အင်ဂျင်|エンジン
garage.tires|Tires|တာယာ|タイヤ
garage.nitro|Nitro|နိုက်ထရို|ニトロ
garage.boost|Nitro boost (Shift)|နိုက်ထရိုအရှိန် (Shift)|ニトロブースト (Shift)
garage.reset|Reset to factory|စက်ရုံပုံစံပြန်ထားမည်|工場設定に戻す
race.name|Virtual Raceway|Virtual ပြိုင်ကွင်း|Virtualレース場
race.sign|VIRTUAL RACEWAY|Virtual ပြိုင်ကွင်း|Virtualレース場
race.map|Raceway|ပြိုင်ကွင်း|レース場
race.stand|GRANDSTAND|ပွဲကြည့်စင်|観覧席
race.day|RACE DAY|ပြိုင်ပွဲနေ့|レースの日
race.touch|Left stick: steer & throttle · Run: nitro · Jump: handbrake|ဘယ်ခလုတ်ဖြင့်ကွေ့၊ အရှိန်တင် · ပြေးခလုတ်: နိုက်ထရို · ခုန်ခလုတ်: လက်ဘရိတ်|左スティック：操舵と加速 · 走る：ニトロ · ジャンプ：ハンドブレーキ
race.desktop|W/S throttle & brake · A/D steer · Space handbrake · Shift nitro · V camera · Esc leave|W/S အရှိန်၊ ဘရိတ် · A/D ကွေ့ · Space လက်ဘရိတ် · Shift နိုက်ထရို · V မြင်ကွင်း · Esc ထွက်|W/S 加速とブレーキ · A/D 操舵 · Space ハンドブレーキ · Shift ニトロ · V カメラ · Esc 退出
race.lap|Lap|ပတ်|周
race.pos|Pos|အဆင့်|順位
race.best|Best|အကောင်းဆုံး|ベスト
race.go|GO!|စမောင်းပါ!|スタート！
race.lapToast|Lap {lap}: {time}|ပတ် {lap}: {time}|{lap} 周目：{time}
race.newBest|New best lap!|အကောင်းဆုံးပတ်အသစ်!|ラップ記録更新！
race.results|Race results|ပြိုင်ပွဲရလဒ်|レース結果
race.win|You win!|သင်အနိုင်ရပြီ!|優勝！
race.finished|Finished {place}{suffix}|အဆင့် {place} ဖြင့်ပြီးပြီ{suffix}|{place} 位でゴール{suffix}
race.summary|Three laps in {time}. Best lap {best}.|သုံးပတ်ကို {time} ဖြင့်ပြီးသည်။ အကောင်းဆုံးပတ် {best}။|3周のタイム {time}。ベストラップ {best}。
race.you|You|သင်|あなた
race.time|Time|အချိန်|タイム
race.again|Race again|ထပ်ပြိုင်မည်|再レース
race.back|Back to garage|ကားပြခန်းပြန်မည်|ガレージに戻る
range.name|Gun Range|ပစ်ကွင်း|射撃場
range.sign|GUN RANGE|ပစ်ကွင်း|射撃場
range.pick|Pick a weapon|လက်နက်ရွေးမည်|武器を選ぶ
range.counter|Press E at the counter to pick a weapon|ကောင်တာအနီးတွင် E နှိပ်၍ လက်နက်ရွေးပါ|カウンターで E を押して武器を選ぶ
range.lane|LANE {number}|လမ်း {number}|レーン {number}
range.auto|Auto|အော်တို|自動
range.semi|Semi|တစ်ချက်ချင်း|半自動
range.rounds|{count} rds|{count} တောင့်|{count} 発
range.shoot|Shoot|ပစ်မည်|射撃
range.note|60-second rounds. Dummies score 10 (head 25), bullseye boards up to 50. Moving and far targets give a bonus.|တစ်ပွဲလျှင် စက္ကန့် ၆၀ ဖြစ်သည်။ အရုပ်ထိလျှင် ၁၀ မှတ်၊ ခေါင်းထိလျှင် ၂၅ မှတ်၊ ပစ်မှတ်ဗဟိုထိလျှင် ၅၀ မှတ်အထိ ရနိုင်သည်။ ရွေ့လျားသော သို့မဟုတ် ဝေးသောပစ်မှတ်များတွင် အပိုမှတ်ရသည်။|1ラウンド60秒。人形は10点（頭は25点）、的の中心は最大50点。移動する的や遠い的にはボーナスがあります。
range.touch|Drag to aim · FIRE to shoot · Run = reload|ဆွဲ၍ချိန် · ပစ်ခလုတ်ဖြင့်ပစ် · ပြေးခလုတ်ဖြင့်ကျည်ဖြည့်|ドラッグで照準 · 発射ボタンで射撃 · 走るボタンでリロード
range.desktop|Click to shoot · R reload · {scope}V view · Esc leave|နှိပ်၍ပစ် · R ကျည်ဖြည့် · {scope}V မြင်ကွင်း · Esc ထွက်|クリックで射撃 · R リロード · {scope}V 視点 · Esc 退出
range.scope|Right-click / Q scope · |ညာနှိပ် / Q မှန်ပြောင်း · |右クリック / Q スコープ ·
range.firstShot|Round starts on your first shot|ပထမဆုံးပစ်ချက်မှ ပွဲစမည်|最初の射撃でラウンド開始
range.ammo|Ammo|ကျည်|弾薬
range.score|Score|ရမှတ်|スコア
range.acc|Acc|ထိမှန်နှုန်း|命中率
range.head|HEADSHOT!|ခေါင်းထိပြီ!|ヘッドショット！
range.bullseye|BULLSEYE!|ဗဟိုထိပြီ!|ど真ん中！
range.hits|Hits|ထိမှန်ချက်|命中
range.shots|Shots|ပစ်ချက်|射撃数
range.accuracy|Accuracy|ထိမှန်နှုန်း|命中率
range.bestNew|New personal best with the {name}!|{name} ဖြင့် ကိုယ်ပိုင်စံချိန်အသစ်ရပြီ!|{name} の自己ベスト更新！
range.bestWith|Best with the {name}: {score}|{name} ဖြင့် အကောင်းဆုံး: {score}|{name} のベスト：{score}
range.again|Go again|ထပ်ကစားမည်|もう一度
range.change|Change weapon|လက်နက်ပြောင်းမည်|武器を変更
range.over|Round over|ပွဲပြီးပြီ|ラウンド終了
golf.touch|Drag to aim · hold PUTT to charge, release to hit|ဆွဲ၍ချိန် · ရိုက်ခလုတ်ကိုဖိ၍ အားတင်ပြီး လွှတ်၍ရိုက်ပါ|ドラッグで狙い、パットを長押しで力をため、離して打つ
golf.desktop|Drag or A / D to aim · hold Space to charge, release to putt · Esc to leave|ဆွဲပါ သို့မဟုတ် A / D ဖြင့်ချိန် · Space ဖိ၍အားတင်၊ လွှတ်၍ရိုက် · Esc ထွက်|ドラッグまたは A / D で狙う · Space 長押しで力をため、離して打つ · Esc 退出
golf.hole|Hole|အပေါက်|ホール
golf.par|Par|ပါ|パー
golf.strokes|Strokes|ရိုက်ချက်|打数
golf.eagle|Eagle!|ပါထက်နှစ်ချက်လျော့!|イーグル！
golf.birdie|Birdie!|ပါထက်တစ်ချက်လျော့!|バーディー！
golf.bogey|Bogey|ပါထက်တစ်ချက်ပို|ボギー
golf.double|Double bogey|ပါထက်နှစ်ချက်ပို|ダブルボギー
golf.one|Hole in one!|တစ်ချက်တည်းဝင်ပြီ!|ホールインワン！
golf.under|{count} under par. Superb round!|ပါထက် {count} ချက်လျော့သည်။ အလွန်ကောင်းသောပွဲဖြစ်သည်!|パーより {count} 打少ない。素晴らしいラウンド！
golf.level|Level par. Nicely played.|ပါနှင့်ညီသည်။ ကောင်းစွာကစားခဲ့သည်။|パーと同じ。ナイスプレー。
golf.over|{count} over par. Have another go?|ပါထက် {count} ချက်ပိုသည်။ ထပ်ကစားကြည့်ပါ။|パーより {count} 打多い。もう一度挑戦しますか？
golf.again|Play again|ထပ်ကစားမည်|もう一度遊ぶ
golf.card|Scorecard|ရမှတ်စာရင်း|スコアカード
avatar.body|Body|ကိုယ်ခန္ဓာ|体型
avatar.skin|Skin tone|အသားအရေ|肌の色
avatar.face|Face|မျက်နှာ|表情
avatar.presets|Presets|ကြိုတင်ပုံစံများ|プリセット
avatar.hairStyle|Hair style|ဆံပင်ပုံစံ|髪型
avatar.hairColor|Hair colour|ဆံပင်အရောင်|髪の色
avatar.top|Top|အပေါ်အင်္ကျီ|トップス
avatar.color|Colour|အရောင်|色
avatar.design|Design|ဒီဇိုင်း|柄
avatar.bottom|Bottoms|အောက်ပိုင်းအဝတ်|ボトムス
avatar.shoes|Shoes|ဖိနပ်|靴
avatar.hat|Hat|ဦးထုပ်|帽子
avatar.hatColor|Hat colour|ဦးထုပ်အရောင်|帽子の色
avatar.glasses|Glasses|မျက်မှန်|眼鏡
avatar.back|Back|နောက်ကျောအလှ|背中
avatar.backColor|Back colour|နောက်ကျောအလှအရောင်|背中の色
avatar.tabBody|🧍 Body|🧍 ကိုယ်ခန္ဓာ|🧍 体型
avatar.tabHair|💇 Hair|💇 ဆံပင်|💇 髪
avatar.tabTop|👕 Top|👕 အင်္ကျီ|👕 トップス
avatar.tabBottom|👖 Bottom|👖 အောက်ပိုင်း|👖 ボトムス
avatar.tabExtras|🎩 Extras|🎩 အပိုအလှ|🎩 アクセサリー
avatar.classic|Classic|မူရင်းပုံစံ|クラシック
avatar.street|Street|လမ်းပေါ်စတိုင်|ストリート
avatar.sunny|Sunny|နေပူစတိုင်|サニー
avatar.formal|Formal|တရားဝင်ဝတ်စုံ|フォーマル
avatar.hero|Hero|သူရဲကောင်း|ヒーロー
avatar.random|🎲 Randomise|🎲 ကျပန်းရွေး|🎲 ランダム
avatar.done|Done|ပြီးပြီ|完了
avatar.note|Drag on the scene to spin the camera around your avatar.|ဇာတ်ကောင်ပတ်လည် မြင်ကွင်းလှည့်ရန် ကမ္ဘာမြင်ကွင်းပေါ်တွင် ဆွဲပါ။|シーンをドラッグするとアバターの周りにカメラを回せます。
option.male|Male|အမျိုးသား|男性
option.female|Female|အမျိုးသမီး|女性
option.smile|🙂 Smile|🙂 ပြုံး|🙂 微笑み
option.grin|😁 Grin|😁 ရယ်ပြုံး|😁 笑顔
option.cool|😎 Cool|😎 အမိုက်စား|😎 クール
option.wink|😉 Wink|😉 မျက်စိမှိတ်|😉 ウィンク
option.cute|😊 Cute|😊 ချစ်စရာ|😊 キュート
option.wow|😮 Wow|😮 အံ့ဩ|😮 びっくり
option.determined|😤 Determined|😤 စိတ်ပိုင်းဖြတ်|😤 決意
option.short|Short|တို|ショート
option.spiky|Spiky|ချွန်ထောင်|ツンツン
option.long|Long|ရှည်|ロング
option.ponytail|Ponytail|မြင်းမြီး|ポニーテール
option.bun|Bun|ဆံထုံး|お団子
option.curly|Curly|ကောက်|カーリー
option.mohawk|Mohawk|အလယ်တန်းထောင်|モヒカン
option.pigtails|Pigtails|နှစ်ဖက်ဆံမြီး|ツインテール
option.bald|Bald|ဆံပင်မရှိ|坊主
option.tee|T-shirt|တီရှပ်|Tシャツ
option.hoodie|Hoodie|ခေါင်းစွပ်အင်္ကျီ|パーカー
option.jacket|Jacket|ဂျာကင်|ジャケット
option.polo|Polo|ပိုလိုအင်္ကျီ|ポロシャツ
option.tank|Tank top|လက်ပြတ်အင်္ကျီ|タンクトップ
option.dress|Dress|ဂါဝန်|ワンピース
option.plain|Plain|အပြောင်|無地
option.stripes|Stripes|အစင်း|ストライプ
option.logo|Logo|အမှတ်တံဆိပ်|ロゴ
option.star|Star|ကြယ်|星
option.heart|Heart|နှလုံး|ハート
option.camo|Camo|ပြောက်ကျား|迷彩
option.jeans|Jeans|ဂျင်းဘောင်းဘီ|ジーンズ
option.joggers|Joggers|အားကစားဘောင်းဘီ|ジョガー
option.shorts|Shorts|ဘောင်းဘီတို|ショートパンツ
option.skirt|Skirt|စကတ်|スカート
option.none|None|မရှိ|なし
option.cap|Cap|ကက်ဦးထုပ်|キャップ
option.beanie|Beanie|ချည်ဦးထုပ်|ニット帽
option.tophat|Top hat|ထိပ်မြင့်ဦးထုပ်|シルクハット
option.crown|Crown|သရဖူ|王冠
option.headphones|Headphones|နားကြပ်|ヘッドホン
option.round|Round|အဝိုင်း|丸型
option.shades|Shades|နေကာမျက်မှန်|サングラス
option.backpack|Backpack|ကျောပိုးအိတ်|リュック
option.cape|Cape|ဝတ်ရုံနောက်လွှာ|マント
option.wings|Wings|တောင်ပံ|翼
option.gloss|Gloss|တောက်ပြောင်|光沢
option.metallic|Metallic|သတ္တုရောင်|メタリック
option.matte|Matte|အရောင်မှိန်|マット
option.chrome|Chrome|ခရုမ်း|クローム
option.pearl|Pearl|ပုလဲရောင်|パール
option.sportSpoke|Sport 5-spoke|ပြိုင်ကားငါးတံဘီး|スポーツ5スポーク
option.turbine|Turbine|တာဘိုင်|タービン
option.mesh|Mesh|ဇကာပုံ|メッシュ
option.classicChrome|Classic chrome|ရိုးရာခရုမ်း|クラシッククローム
option.offroad|Off-road|လမ်းကြမ်း|オフロード
option.lip|Lip|အစွန်းတို|リップ
option.wing|Wing|တောင်ပံ|ウイング
option.gt|GT wing|GT တောင်ပံ|GTウイング
option.stock|Stock|မူရင်း|標準
option.streetKit|Street kit|လမ်းမသုံးအစုံ|ストリートキット
option.raceKit|Race kit|ပြိုင်ပွဲသုံးအစုံ|レースキット
option.off|Off|ပိတ်|オフ
option.cyan|Cyan|စိမ်းပြာ|シアン
option.pink|Pink|ပန်းရောင်|ピンク
option.green|Green|အစိမ်း|緑
option.purple|Purple|ခရမ်း|紫
option.light|Light|အလင်း|ライト
option.dark|Dark|အမှောင်|ダーク
option.limo|Limo|အမည်းထူ|リムジン
option.racing|Racing|ပြိုင်ကားပုံ|レーシング
option.side|Side|ဘေး|サイド
option.sport8|Sport +8%|အားကစား +8%|スポーツ +8%
option.race16|Race +16%|ပြိုင်ပွဲ +16%|レース +16%
option.turbo25|Turbo +25%|တာဘို +25%|ターボ +25%
option.sport|Sport|အားကစား|スポーツ
option.slick|Slicks|အပြောင်တာယာ|スリック
car.sports|Sports coupe|အားကစားတံခါးနှစ်ပေါက်ကား|スポーツクーペ
car.suv|Luxury SUV|အဆင့်မြင့် SUV|高級SUV
car.open|Convertible|အမိုးဖွင့်ကား|オープンカー
car.muscle|Muscle car|အင်အားကြီးကား|マッスルカー
car.hyper|Hypercar|စွမ်းရည်အလွန်မြင့်ကား|ハイパーカー
weapon.pistol|Pistol|ပစ္စတို|ピストル
weapon.pistolText|Accurate and quick. A good place to start.|တိကျပြီးမြန်သည်။ စတင်လေ့ကျင့်ရန် သင့်တော်သည်။|正確で素早い。初めての練習に向いています。
weapon.revolver|Revolver|ခြောက်လုံးပြူး|リボルバー
weapon.revolverText|Six heavy rounds, pin-point accurate.|အားကောင်းသောကျည် ခြောက်တောင့်၊ အလွန်တိကျသည်။|強力な6発。ピンポイントで正確。
weapon.smg|SMG|SMG|SMG
weapon.smgText|Hold to spray. Very fast, not very precise.|ဖိထား၍ဆက်တိုက်ပစ်ပါ။ အလွန်မြန်သော်လည်း မတိကျလှပါ။|長押しで連射。非常に速いですが精度は低め。
weapon.rifle|Assault Rifle|တိုက်ခိုက်ရေးရိုင်ဖယ်|アサルトライフル
weapon.rifleText|Full-auto with a red-dot sight.|အနီစက်ချိန်ကိရိယာပါသော အလိုအလျောက်သေနတ်ဖြစ်သည်။|レッドドットサイト付きのフルオート。
weapon.shotgun|Shotgun|ရှော့ဂန်း|ショットガン
weapon.shotgunText|Eight pellets per shot. Get close.|တစ်ချက်လျှင် ကျည်စေ့ရှစ်လုံး။ အနီးကပ်ပစ်ပါ။|一発で8粒の散弾。近くから狙ってください。
weapon.sniper|Sniper Rifle|စနိုက်ပါရိုင်ဖယ်|スナイパーライフル
weapon.sniperText|Right-click (or Q) to scope in. Long range kills.|ညာနှိပ် သို့မဟုတ် Q ဖြင့် မှန်ပြောင်းကြည့်ပါ။ အဝေးပစ်မှတ်များအတွက် ဖြစ်သည်။|右クリックまたは Q でスコープ。遠距離の標的向け。
screen.score|SCORE {score}|ရမှတ် {score}|スコア {score}
`;
export const worldContent = Object.fromEntries(rows.trim().split('\n').map(line => {
  const [key, ...values] = line.split('|');
  return [key, values.map(value => value.replaceAll('\\n', '\n'))];
}));

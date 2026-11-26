import type { GrammarPoint, ReadingPassage, SpeakingTask } from "./types"

// Original editorial study stages, not official assignments of HSK grammar.
// Stages 7–9 prepare for the combined advanced exam, not three separate exams.
// Pinyin uses dictionary tones; 一 and 不 undergo tone changes in connected speech.
export const grammar: GrammarPoint[] = [
  {
    id: "g1-identity",
    level: 1,
    title: "Identify someone with 是",
    pattern: "Subject + 是 + noun",
    explanation:
      "Use 是 to identify someone or something as a member of a category. It links two noun phrases; do not add it automatically before an adjective.",
    exampleZh: "她是老师。",
    examplePinyin: "Tā shì lǎoshī.",
    exampleEn: "She is a teacher.",
    tokens: ["她", "是", "老师", "。"],
    cloze: "她＿＿老师，不是学生。",
    options: ["在", "是", "有", "去"],
    answer: 1,
    why: "是 links 她 to the identity 老师. 在 locates someone, 有 expresses possession, and 去 describes going.",
  },
  {
    id: "g1-yes-no",
    level: 1,
    title: "Ask a yes-or-no question with 吗",
    pattern: "Statement + 吗？",
    explanation:
      "Keep statement word order and put 吗 at the end to ask whether it is true. Do not combine 吗 with an ordinary question-word question.",
    exampleZh: "你喝茶吗？",
    examplePinyin: "Nǐ hē chá ma?",
    exampleEn: "Do you drink tea?",
    tokens: ["你", "喝", "茶", "吗", "？"],
    cloze: "你是学生＿＿？（Ask whether the statement is true.）",
    options: ["的", "了", "吗", "和"],
    answer: 2,
    why: "吗 turns 你是学生 into a yes-or-no question. 的 and 和 cannot perform that role; 了 would introduce a change rather than a neutral question.",
  },
  {
    id: "g1-negation",
    level: 1,
    title: "Negate habits and intentions with 不",
    pattern: "Subject + 不 + verb",
    explanation:
      "不 negates a habit, preference, or intended action. For an action that did not happen, Mandarin normally uses 没 instead.",
    exampleZh: "我不喝咖啡。",
    examplePinyin: "Wǒ bù hē kāfēi.",
    exampleEn: "I do not drink coffee.",
    tokens: ["我", "不", "喝", "咖啡", "。"],
    cloze: "我每天喝茶，＿＿喝咖啡。（Describe a habit.）",
    options: ["没", "别", "无", "不"],
    answer: 3,
    why: "不喝 describes the stated daily habit. 没喝 reports a non-occurrence, 别喝 tells someone not to drink, and 无 is not the ordinary negator before 喝.",
  },
  {
    id: "g1-possession",
    level: 1,
    title: "Say what you do not have with 没有",
    pattern: "Subject + 没有 + noun",
    explanation:
      "有 means to have or to exist. Its ordinary negative is 没有, not 不有. 没 can also stand alone before a noun in informal speech.",
    exampleZh: "我没有车。",
    examplePinyin: "Wǒ méiyǒu chē.",
    exampleEn: "I do not have a car.",
    tokens: ["我", "没有", "车", "。"],
    cloze: "我＿＿车，每天走路去学校。",
    options: ["没有", "不是", "不在", "不去"],
    answer: 0,
    why: "没有车 says that the speaker has no car. The following walk to school fits that information; 不是车 would mean 'am not a car.'",
  },
  {
    id: "g1-location",
    level: 1,
    title: "Locate a person with 在",
    pattern: "Subject + 在 + place",
    explanation:
      "在 can be the main verb meaning 'be at.' Put the place after 在. Do not use 是 to give someone's physical location.",
    exampleZh: "爸爸在家。",
    examplePinyin: "Bàba zài jiā.",
    exampleEn: "Dad is at home.",
    tokens: ["爸爸", "在", "家", "。"],
    cloze: "爸爸不＿＿学校，他在家。",
    options: ["是", "在", "有", "去过"],
    answer: 1,
    why: "不在学校 contrasts a current location with 在家. 去过 would concern past experience, not where Dad is now.",
  },
  {
    id: "g1-owner",
    level: 1,
    title: "Mark an owner with 的",
    pattern: "Owner + 的 + noun",
    explanation:
      "Place 的 between an owner and the thing owned. Mandarin puts this entire owner phrase before the noun: 我的书, 'my book.'",
    exampleZh: "这是我的书。",
    examplePinyin: "Zhè shì wǒ de shū.",
    exampleEn: "This is my book.",
    tokens: ["这", "是", "我", "的", "书", "。"],
    cloze: "这是老师＿＿书，不是我的。",
    options: ["吗", "在", "的", "和"],
    answer: 2,
    why: "老师的书 means 'the teacher's book.' The contrast with 我的 confirms that the question concerns ownership.",
  },
  {
    id: "g1-classifier",
    level: 1,
    title: "Count people with 个",
    pattern: "Number + 个 + person noun",
    explanation:
      "A number normally needs a measure word before a countable noun. 个 is the common measure word for 学生 and many everyday nouns; use 两, rather than 二, before 个 for two.",
    exampleZh: "这里有两个学生。",
    examplePinyin: "Zhèlǐ yǒu liǎng ge xuésheng.",
    exampleEn: "There are two students here.",
    tokens: ["这里", "有", "两", "个", "学生", "。"],
    cloze: "这里有两＿＿学生。",
    options: ["本", "杯", "岁", "个"],
    answer: 3,
    why: "个 counts students. 本 counts books, 杯 counts cupfuls, and 岁 measures age.",
  },
  {
    id: "g1-time",
    level: 1,
    title: "Put a time before the action",
    pattern: "Subject + time + verb",
    explanation:
      "An ordinary time expression comes before the verb, either before or after the subject. 点 gives an hour of the day; a bare clock time does not need 在.",
    exampleZh: "我八点上课。",
    examplePinyin: "Wǒ bā diǎn shàngkè.",
    exampleEn: "I start class at eight.",
    tokens: ["我", "八", "点", "上课", "。"],
    cloze: "我早上八＿＿上课。",
    options: ["点", "个", "岁", "本"],
    answer: 0,
    why: "八点 is a clock time. The other measure words cannot specify the hour of a class.",
  },
  {
    id: "g1-also",
    level: 1,
    title: "Add a shared action with 也",
    pattern: "Subject + 也 + verb",
    explanation:
      "也 means 'also' and goes before the verb, not at the end of the sentence. It can show that another person shares the first person's action or preference.",
    exampleZh: "我也学中文。",
    examplePinyin: "Wǒ yě xué Zhōngwén.",
    exampleEn: "I also study Chinese.",
    tokens: ["我", "也", "学", "中文", "。"],
    cloze: "姐姐学中文，我＿＿学中文。（We share the same activity.）",
    options: ["只", "也", "不", "别"],
    answer: 1,
    why: "也 explicitly adds the speaker to the same activity. 只 means 'only,' while 不 and 别 would negate or prohibit it.",
  },
  {
    id: "g1-where",
    level: 1,
    title: "Ask where without changing word order",
    pattern: "Subject + 在 + 哪里？",
    explanation:
      "Replace the unknown place with 哪里 in its normal sentence position. A question word already makes the sentence a question, so no 吗 is needed.",
    exampleZh: "你的书在哪里？",
    examplePinyin: "Nǐ de shū zài nǎlǐ?",
    exampleEn: "Where is your book?",
    tokens: ["你", "的", "书", "在", "哪里", "？"],
    cloze: "你的书在＿＿？我找不到。",
    options: ["谁", "什么", "哪里", "多少"],
    answer: 2,
    why: "哪里 asks for the missing location after 在. 谁 asks about a person and 多少 about an amount.",
  },
  {
    id: "g2-completed",
    level: 2,
    title: "Mark a completed action with 了",
    pattern: "Verb + 了 + object",
    explanation:
      "了 after a verb presents an action as completed. It is not a general past-tense ending: a past habit may have no 了, and a future completed action can have it.",
    exampleZh: "我买了两本书。",
    examplePinyin: "Wǒ mǎi le liǎng běn shū.",
    exampleEn: "I bought two books.",
    tokens: ["我", "买", "了", "两", "本", "书", "。"],
    cloze: "昨天我买＿＿两本书，已经带回家了。（Mark completion.）",
    options: ["了", "着", "在", "的"],
    answer: 0,
    why: "买了 marks the purchase as completed, supported by 已经带回家了. 着 marks a continuing state rather than a completed purchase.",
  },
  {
    id: "g2-experience",
    level: 2,
    title: "Talk about experience with 过",
    pattern: "Verb + 过 + object",
    explanation:
      "过 presents something as an experience at some unspecified time. It answers 'Have you ever…?' rather than narrating one particular completed event.",
    exampleZh: "我去过北京。",
    examplePinyin: "Wǒ qù guo Běijīng.",
    exampleEn: "I have been to Beijing.",
    tokens: ["我", "去", "过", "北京", "。"],
    cloze: "我以前去＿＿北京，但不记得是哪一年。（Mark experience.）",
    options: ["着", "过", "在", "得"],
    answer: 1,
    why: "去过 reports a prior experience without identifying a particular trip. 过 directly follows the verb.",
  },
  {
    id: "g2-progressive",
    level: 2,
    title: "Describe an action happening now",
    pattern: "Subject + 正在 + verb",
    explanation:
      "正在 before a verb focuses on an action in progress at the reference time. It is different from 在 followed by a place, which tells you where someone is.",
    exampleZh: "妈妈正在做饭。",
    examplePinyin: "Māma zhèngzài zuòfàn.",
    exampleEn: "Mom is cooking right now.",
    tokens: ["妈妈", "正在", "做饭", "。"],
    cloze: "现在别给妈妈打电话，她＿＿做饭。（The action is in progress.）",
    options: ["已经", "从来", "正在", "曾经"],
    answer: 2,
    why: "正在 matches an activity happening now. 已经 means 'already'; 从来 and 曾经 refer to patterns or experience rather than ongoing action.",
  },
  {
    id: "g2-adjective",
    level: 2,
    title: "Describe a quality without 是",
    pattern: "Subject + 很 + adjective",
    explanation:
      "An adjective can serve as the predicate in Mandarin. In a neutral description, 很 often links it smoothly to the subject without strongly emphasizing 'very.'",
    exampleZh: "今天很冷。",
    examplePinyin: "Jīntiān hěn lěng.",
    exampleEn: "It is cold today.",
    tokens: ["今天", "很", "冷", "。"],
    cloze: "今天＿＿冷，我们多穿一点衣服。（A neutral description.）",
    options: ["是", "有", "在", "很"],
    answer: 3,
    why: "很冷 is an ordinary adjectival predicate. Bare 是冷 is not the neutral pattern intended here.",
  },
  {
    id: "g2-like-action",
    level: 2,
    title: "Name an activity you enjoy",
    pattern: "喜欢 + verb phrase",
    explanation:
      "An activity can follow 喜欢 directly. Mandarin does not require an equivalent of English 'to' or '-ing' between 喜欢 and the activity.",
    exampleZh: "我喜欢听音乐。",
    examplePinyin: "Wǒ xǐhuan tīng yīnyuè.",
    exampleEn: "I enjoy listening to music.",
    tokens: ["我", "喜欢", "听", "音乐", "。"],
    cloze: "我喜欢＿＿音乐，晚上常常戴着耳机。",
    options: ["听", "看", "读", "写"],
    answer: 0,
    why: "听音乐 is the normal expression for listening to music; wearing headphones provides the contextual evidence. 写音乐 would mean composing it.",
  },
  {
    id: "g2-intention",
    level: 2,
    title: "Express a wish with 想",
    pattern: "Subject + 想 + verb phrase",
    explanation:
      "想 before an action expresses a wish or intention, not a guarantee that the action will happen. It can be softened with 一下 when asking to try something.",
    exampleZh: "我想明天去书店。",
    examplePinyin: "Wǒ xiǎng míngtiān qù shūdiàn.",
    exampleEn: "I would like to go to the bookstore tomorrow.",
    tokens: ["我", "想", "明天", "去", "书店", "。"],
    cloze: "我＿＿去书店，可是还没决定。（Express a wish, not a requirement.）",
    options: ["必须", "想", "已经", "正在"],
    answer: 1,
    why: "想 expresses the undecided wish. 必须 would assert necessity; 已经 and 正在 do not express a wish.",
  },
  {
    id: "g2-circumstances",
    level: 2,
    title: "Distinguish opportunity from learned skill",
    pattern: "能 + verb",
    explanation:
      "能 often describes whether circumstances allow an action. You may know how to swim but not 能游泳 today because the pool is closed.",
    exampleZh: "今天我能来，明天不能来。",
    examplePinyin: "Jīntiān wǒ néng lái, míngtiān bù néng lái.",
    exampleEn: "I can come today, but I cannot come tomorrow.",
    tokens: ["今天", "我", "能", "来", "，", "明天", "不", "能", "来", "。"],
    cloze:
      "泳池今天不开门，所以我们不＿＿进去游泳。（Circumstances prevent entry.）",
    options: ["会", "想", "能", "爱"],
    answer: 2,
    why: "不能 refers to the closed pool preventing entry. 不会 would mean lacking a skill or predicting non-occurrence, not lack of access.",
  },
  {
    id: "g2-learned-skill",
    level: 2,
    title: "Describe a learned ability with 会",
    pattern: "会 + skill",
    explanation:
      "会 before a skill means knowing how to do it. For this meaning, contrast 会 with 不会; 会 also has a prediction meaning in other contexts.",
    exampleZh: "妹妹会游泳。",
    examplePinyin: "Mèimei huì yóuyǒng.",
    exampleEn: "My younger sister knows how to swim.",
    tokens: ["妹妹", "会", "游泳", "。"],
    cloze: "妹妹学了半年，现在＿＿游泳了。（She has learned the skill.）",
    options: ["在", "给", "从", "会"],
    answer: 3,
    why: "会游泳 states the learned skill resulting from six months of lessons. 在游泳 would describe an action happening now.",
  },
  {
    id: "g2-recipient",
    level: 2,
    title: "Introduce a recipient with 给",
    pattern: "给 + person + verb + object",
    explanation:
      "A 给 phrase before the main verb identifies the recipient or beneficiary. In 给朋友打电话, the friend is the person receiving the call.",
    exampleZh: "我给朋友打电话。",
    examplePinyin: "Wǒ gěi péngyou dǎ diànhuà.",
    exampleEn: "I call my friend.",
    tokens: ["我", "给", "朋友", "打", "电话", "。"],
    cloze: "我＿＿朋友打电话，问他几点来。",
    options: ["给", "从", "离", "比"],
    answer: 0,
    why: "给朋友 marks the recipient of the call. 从 marks a starting point, 离 distance, and 比 comparison.",
  },
  {
    id: "g2-range",
    level: 2,
    title: "Set a beginning and an end",
    pattern: "从 + start + 到 + end",
    explanation:
      "从…到… defines the two endpoints of a time or space range. Keep the start after 从 and the destination or ending time after 到.",
    exampleZh: "我从九点到五点工作。",
    examplePinyin: "Wǒ cóng jiǔ diǎn dào wǔ diǎn gōngzuò.",
    exampleEn: "I work from nine to five.",
    tokens: ["我", "从", "九", "点", "到", "五", "点", "工作", "。"],
    cloze: "图书馆从早上九点＿＿晚上六点开放。",
    options: ["给", "在", "到", "比"],
    answer: 2,
    why: "从九点到六点 gives the opening interval. 到 supplies the end of the range paired with 从.",
  },
  {
    id: "g3-comparison",
    level: 3,
    title: "Compare two people with 比",
    pattern: "A + 比 + B + adjective",
    explanation:
      "Put the reference point after 比, then the quality being compared. Do not insert 很 into the basic 比 comparison; use a difference such as 三岁 or 一点 if needed.",
    exampleZh: "姐姐比我高。",
    examplePinyin: "Jiějie bǐ wǒ gāo.",
    exampleEn: "My older sister is taller than I am.",
    tokens: ["姐姐", "比", "我", "高", "。"],
    cloze: "姐姐＿＿我高十厘米。",
    options: ["跟", "比", "给", "离"],
    answer: 1,
    why: "比 introduces the comparison target 我, and 十厘米 measures the height difference.",
  },
  {
    id: "g3-small-difference",
    level: 3,
    title: "Quantify a small difference with 一点",
    pattern: "A + 比 + B + adjective + 一点",
    explanation:
      "一点 after the adjective measures a small difference. Before an adjective, 有点 instead expresses a mildly undesirable quality, not the size of a comparison.",
    exampleZh: "这杯茶比那杯热一点。",
    examplePinyin: "Zhè bēi chá bǐ nà bēi rè yīdiǎn.",
    exampleEn: "This cup of tea is a little hotter than that one.",
    tokens: ["这", "杯", "茶", "比", "那", "杯", "热", "一点", "。"],
    cloze: "这杯茶比那杯热＿＿，但差别不大。",
    options: ["有点", "很", "一点", "最"],
    answer: 2,
    why: "一点 follows 热 and measures the small difference explicitly confirmed by 差别不大. 有点 belongs before an adjective.",
  },
  {
    id: "g3-superlative",
    level: 3,
    title: "Choose the highest degree with 最",
    pattern: "Scope + subject + 最 + adjective",
    explanation:
      "最 identifies the highest degree within a stated or understood group. Supply a clear comparison set so 'the most' has a meaningful reference.",
    exampleZh: "我们班里，小林最高。",
    examplePinyin: "Wǒmen bān lǐ, Xiǎo Lín zuì gāo.",
    exampleEn: "In our class, Xiaolin is the tallest.",
    tokens: ["我们", "班", "里", "，", "小林", "最", "高", "。"],
    cloze:
      "这三条路里，河边那条＿＿短，走它最快。（Identify the shortest of the three.）",
    options: ["比", "有点", "更", "最"],
    answer: 3,
    why: "最 selects the shortest route from the stated group of three. 更 needs a comparison reference rather than declaring the group winner.",
  },
  {
    id: "g3-completed-result",
    level: 3,
    title: "Show that an action reached its end",
    pattern: "Verb + 完 + object",
    explanation:
      "完 is a result complement meaning that an action has been finished. It tells you the result, while 了 alone merely presents an event as completed.",
    exampleZh: "我看完这本书了。",
    examplePinyin: "Wǒ kàn wán zhè běn shū le.",
    exampleEn: "I have finished reading this book.",
    tokens: ["我", "看", "完", "这", "本", "书", "了", "。"],
    cloze:
      "我看＿＿这本书了，最后一页也看了。（Mark finishing the whole book.）",
    options: ["完", "见", "错", "懂不了"],
    answer: 0,
    why: "看完 means reading through to the end, confirmed by 最后一页也看了. 看见 means seeing something, not finishing a book.",
  },
  {
    id: "g3-potential",
    level: 3,
    title: "Say whether understanding is possible",
    pattern: "Verb + 得/不 + result",
    explanation:
      "A potential complement says whether an action can achieve a result: 听得懂 versus 听不懂. This differs from 没听懂, which reports that understanding did not occur on a particular occasion.",
    exampleZh: "他说得太快，我听不懂。",
    examplePinyin: "Tā shuō de tài kuài, wǒ tīng bù dǒng.",
    exampleEn: "He speaks too fast; I cannot understand him.",
    tokens: ["他", "说", "得", "太", "快", "，", "我", "听", "不", "懂", "。"],
    cloze: "声音太小，我听＿＿清楚。（The result is not achievable.）",
    options: ["得", "不", "了", "着"],
    answer: 1,
    why: "听不清楚 is the negative potential complement: the volume prevents hearing clearly. 听得清楚 would state the opposite.",
  },
  {
    id: "g3-manner",
    level: 3,
    title: "Evaluate an action with 得",
    pattern: "Verb + 得 + description",
    explanation:
      "得 introduces a description of how an action is performed. If the verb has an object, you can repeat the verb: 她说中文说得很清楚.",
    exampleZh: "她说得很清楚。",
    examplePinyin: "Tā shuō de hěn qīngchu.",
    exampleEn: "She speaks very clearly.",
    tokens: ["她", "说", "得", "很", "清楚", "。"],
    cloze: "他跑＿＿很快，我跟不上。",
    options: ["的", "地", "得", "了"],
    answer: 2,
    why: "得 follows 跑 and introduces the evaluation 很快. 地 instead precedes a verb, and 的 normally modifies a noun.",
  },
  {
    id: "g3-unwelcome-degree",
    level: 3,
    title: "Soften a negative judgment with 有点",
    pattern: "有点 + adjective",
    explanation:
      "有点 means 'a little' before an adjective and often signals an unwelcome quality. It can make a complaint gentler, but still suggests that the speaker would prefer less of that quality.",
    exampleZh: "这件衣服有点贵。",
    examplePinyin: "Zhè jiàn yīfu yǒudiǎn guì.",
    exampleEn: "This item of clothing is a little expensive.",
    tokens: ["这", "件", "衣服", "有点", "贵", "。"],
    cloze: "这件衣服＿＿贵，我想看看便宜的。（A mild complaint.）",
    options: ["一点", "不太", "多么", "有点"],
    answer: 3,
    why: "有点贵 makes a mild complaint about price, consistent with seeking a cheaper item. 一点 would need a different position.",
  },
  {
    id: "g3-distance",
    level: 3,
    title: "Measure separation with 离",
    pattern: "A + 离 + B + distance",
    explanation:
      "离 introduces a reference location when describing distance. It does not itself mean 'from…to…' a traveled route; the predicate says how far apart the places are.",
    exampleZh: "我家离学校两公里。",
    examplePinyin: "Wǒ jiā lí xuéxiào liǎng gōnglǐ.",
    exampleEn: "My home is two kilometers from the school.",
    tokens: ["我", "家", "离", "学校", "两", "公里", "。"],
    cloze: "我家＿＿学校很近，走路只要五分钟。",
    options: ["离", "比", "给", "向"],
    answer: 0,
    why: "离学校很近 describes proximity to the school. 向 indicates direction rather than distance.",
  },
  {
    id: "g3-sequence",
    level: 3,
    title: "Order two steps with 先…再…",
    pattern: "先 + first action，再 + next action",
    explanation:
      "先…再… gives the intended order of actions. 再 here means 'then/next,' not necessarily repeating an earlier action.",
    exampleZh: "我们先吃饭，再去看电影。",
    examplePinyin: "Wǒmen xiān chīfàn, zài qù kàn diànyǐng.",
    exampleEn: "We will eat first and then go to see a film.",
    tokens: ["我们", "先", "吃饭", "，", "再", "去", "看", "电影", "。"],
    cloze: "请先洗手，＿＿吃饭。（Give the next step, not a consequence.）",
    options: ["才", "再", "却", "又"],
    answer: 1,
    why: "再 pairs with 先 to give the next requested step. 才 would emphasize that eating is conditional on washing first.",
  },
  {
    id: "g3-cause",
    level: 3,
    title: "Connect a reason to its result",
    pattern: "因为 + reason，所以 + result",
    explanation:
      "Mandarin can explicitly mark both the reason with 因为 and its result with 所以. Either connector can sometimes be omitted when the relation is clear.",
    exampleZh: "因为下雨，所以我们没去公园。",
    examplePinyin: "Yīnwèi xià yǔ, suǒyǐ wǒmen méi qù gōngyuán.",
    exampleEn: "Because it rained, we did not go to the park.",
    tokens: [
      "因为",
      "下",
      "雨",
      "，",
      "所以",
      "我们",
      "没",
      "去",
      "公园",
      "。",
    ],
    cloze: "因为车坏了，＿＿我今天坐地铁上班。（State the result.）",
    options: ["虽然", "如果", "所以", "但是"],
    answer: 2,
    why: "所以 introduces the consequence of the broken car. 虽然 and 如果 introduce concessions or conditions, not this result.",
  },
  {
    id: "g4-disposal",
    level: 4,
    title: "Put an affected object first with 把",
    pattern: "Subject + 把 + known object + verb + result",
    explanation:
      "把 foregrounds a specific object and tells what happens to it. The predicate normally needs more than a bare verb, such as a result, destination, or completed action.",
    exampleZh: "请把书放在桌子上。",
    examplePinyin: "Qǐng bǎ shū fàng zài zhuōzi shàng.",
    exampleEn: "Please put the book on the table.",
    tokens: ["请", "把", "书", "放", "在", "桌子", "上", "。"],
    cloze: "请＿＿这本书放回书架，别留在桌上。",
    options: ["被", "把", "让", "向"],
    answer: 1,
    why: "把 introduces the known object 这本书 and 放回书架 gives its destination. 被 would make the book an agent rather than the object here.",
  },
  {
    id: "g4-passive",
    level: 4,
    title: "Focus on the receiver with 被",
    pattern: "Affected subject + 被 + agent + verb + result",
    explanation:
      "被 makes the affected participant the subject. The agent may be stated or omitted. Although common for unwelcome events, 被 is not restricted to negative outcomes.",
    exampleZh: "我的自行车被弟弟骑走了。",
    examplePinyin: "Wǒ de zìxíngchē bèi dìdi qí zǒu le.",
    exampleEn: "My younger brother rode my bicycle away.",
    tokens: ["我", "的", "自行车", "被", "弟弟", "骑", "走", "了", "。"],
    cloze: "窗户＿＿风吹开了，屋里很冷。",
    options: ["把", "从", "被", "给了"],
    answer: 2,
    why: "窗户 receives the action and 风 causes it, so 被 introduces the agent 风. 吹开 supplies the resulting state.",
  },
  {
    id: "g4-continuing-state",
    level: 4,
    title: "Describe a maintained state with 着",
    pattern: "Verb + 着",
    explanation:
      "着 often describes a state that continues, such as a door being open or someone wearing a hat. Contrast it with 正在, which highlights an unfolding action.",
    exampleZh: "门开着，里面有人。",
    examplePinyin: "Mén kāi zhe, lǐmiàn yǒu rén.",
    exampleEn: "The door is open, and someone is inside.",
    tokens: ["门", "开", "着", "，", "里面", "有", "人", "。"],
    cloze: "他戴＿＿一顶帽子，坐在门口。（Describe what he is wearing.）",
    options: ["过", "得", "完", "着"],
    answer: 3,
    why: "戴着 describes the maintained state of wearing the hat. 戴过 refers to previous experience and 戴完 to completing an action.",
  },
  {
    id: "g4-imminent",
    level: 4,
    title: "Announce an imminent event",
    pattern: "就要 + verb phrase + 了",
    explanation:
      "就要…了 says an event is about to occur. A time expression can precede it. Sentence-final 了 marks the approaching new situation, not a completed future action.",
    exampleZh: "火车就要进站了。",
    examplePinyin: "Huǒchē jiù yào jìn zhàn le.",
    exampleEn: "The train is about to enter the station.",
    tokens: ["火车", "就", "要", "进", "站", "了", "。"],
    cloze: "听到进站广播，大家说：火车＿＿进站了。（It is about to arrive.）",
    options: ["就要", "从来", "曾经", "已经"],
    answer: 0,
    why: "就要 marks imminent arrival. 已经 would mean that entry has already occurred, contrary to the intended meaning.",
  },
  {
    id: "g4-new-situation",
    level: 4,
    title: "Signal a changed situation with 了",
    pattern: "New situation + 了",
    explanation:
      "Sentence-final 了 can announce that a situation has changed. In 不喝了, it means 'no longer drinking' or 'will stop drinking,' not 'did not drink.'",
    exampleZh: "我现在不喝咖啡了。",
    examplePinyin: "Wǒ xiànzài bù hē kāfēi le.",
    exampleEn: "I no longer drink coffee now.",
    tokens: ["我", "现在", "不", "喝", "咖啡", "了", "。"],
    cloze: "我以前喝咖啡，现在不喝＿＿。（Mark a change in habit.）",
    options: ["过", "了", "着", "得"],
    answer: 1,
    why: "Final 了 signals the change from the earlier coffee-drinking habit. 不喝过 and 不喝着 do not express this change.",
  },
  {
    id: "g4-simultaneous",
    level: 4,
    title: "Describe two concurrent actions",
    pattern: "一边 + action，一边 + action",
    explanation:
      "一边…一边… connects actions performed at the same time, usually by the same person. It does not describe a first step followed by a second.",
    exampleZh: "她一边走路，一边听音乐。",
    examplePinyin: "Tā yībiān zǒulù, yībiān tīng yīnyuè.",
    exampleEn: "She listens to music while walking.",
    tokens: ["她", "一边", "走路", "，", "一边", "听", "音乐", "。"],
    cloze: "她一边洗菜，＿＿跟我聊天。（The actions overlap.）",
    options: ["然后", "才", "一边", "以后"],
    answer: 2,
    why: "The repeated 一边 links overlapping actions. 然后 and 以后 would present a sequence.",
  },
  {
    id: "g4-hypothetical",
    level: 4,
    title: "Make a simple conditional plan",
    pattern: "如果 + condition，就 + consequence",
    explanation:
      "如果 presents a possible condition rather than an established fact. 就 introduces what follows if that condition is met.",
    exampleZh: "如果明天下雨，我们就坐地铁。",
    examplePinyin: "Rúguǒ míngtiān xià yǔ, wǒmen jiù zuò dìtiě.",
    exampleEn: "If it rains tomorrow, we will take the subway.",
    tokens: [
      "如果",
      "明天",
      "下",
      "雨",
      "，",
      "我们",
      "就",
      "坐",
      "地铁",
      "。",
    ],
    cloze: "如果你有时间，＿＿来帮我一下吧。（Give the proposed consequence.）",
    options: ["却", "也许", "甚至", "就"],
    answer: 3,
    why: "就 supplies the consequence of the condition in the standard 如果…就… pattern.",
  },
  {
    id: "g4-concession",
    level: 4,
    title: "Contrast an expectation with reality",
    pattern: "虽然 + fact，但是 + contrasting fact",
    explanation:
      "虽然 acknowledges a real fact, while 但是 introduces an outcome that does not follow the usual expectation. Unlike 即使, it need not describe a hypothetical situation.",
    exampleZh: "虽然路很远，但是我们还是走到了。",
    examplePinyin: "Suīrán lù hěn yuǎn, dànshì wǒmen háishi zǒu dào le.",
    exampleEn: "Although it was a long way, we still made it there on foot.",
    tokens: [
      "虽然",
      "路",
      "很",
      "远",
      "，",
      "但是",
      "我们",
      "还是",
      "走",
      "到",
      "了",
      "。",
    ],
    cloze: "虽然今天很冷，＿＿他还是去跑步了。",
    options: ["但是", "所以", "因为", "于是"],
    answer: 0,
    why: "但是 introduces the unexpected action despite the cold. 所以 and 于是 would present it as a consequence of the cold.",
  },
  {
    id: "g4-two-qualities",
    level: 4,
    title: "Combine two qualities with 又…又…",
    pattern: "又 + adjective，又 + adjective",
    explanation:
      "又…又… combines two qualities of the same person or thing. Here 又 means 'both…and,' not a repetition in past time.",
    exampleZh: "这家饭馆又便宜又好吃。",
    examplePinyin: "Zhè jiā fànguǎn yòu piányi yòu hǎochī.",
    exampleEn: "This restaurant is both inexpensive and good to eat at.",
    tokens: ["这", "家", "饭馆", "又", "便宜", "又", "好吃", "。"],
    cloze: "这个房间又大＿＿亮。",
    options: ["再", "又", "才", "却"],
    answer: 1,
    why: "The second 又 joins 大 and 亮 as two qualities of the room. 再 would instead suggest repetition or a next action.",
  },
  {
    id: "g4-growing-degree",
    level: 4,
    title: "Describe a gradual trend",
    pattern: "越来越 + adjective",
    explanation:
      "越来越 presents a quality as increasing over time. It describes a trend, not simply a single comparison between two people or objects.",
    exampleZh: "天气越来越暖和。",
    examplePinyin: "Tiānqì yuèláiyuè nuǎnhuo.",
    exampleEn: "The weather is getting warmer and warmer.",
    tokens: ["天气", "越来越", "暖和", "。"],
    cloze: "春天来了，天气＿＿暖和。（Describe an ongoing trend.）",
    options: ["最", "有点", "越来越", "一共"],
    answer: 2,
    why: "越来越 expresses the progressive warming. 最 gives a highest degree, 有点 a mild degree, and 一共 a total.",
  },
  {
    id: "g5-even-if",
    level: 5,
    title: "Keep a result even under a difficult condition",
    pattern: "即使 + hypothetical condition，也 + unchanged result",
    explanation:
      "即使…也… says that even a hypothetical or extreme condition will not alter the result. It differs from 虽然, which ordinarily acknowledges an actual fact.",
    exampleZh: "即使下雨，比赛也不会取消。",
    examplePinyin: "Jíshǐ xià yǔ, bǐsài yě bù huì qǔxiāo.",
    exampleEn: "Even if it rains, the competition will not be canceled.",
    tokens: ["即使", "下", "雨", "，", "比赛", "也", "不", "会", "取消", "。"],
    cloze: "即使报名人数少，活动＿＿不会取消。",
    options: ["才", "却", "就", "也"],
    answer: 3,
    why: "也 marks that the result remains true even under the unfavorable condition. 才 would express a necessary threshold instead.",
  },
  {
    id: "g5-sufficient",
    level: 5,
    title: "Give a sufficient condition with 只要",
    pattern: "只要 + sufficient condition，就 + result",
    explanation:
      "只要 says that meeting this condition is enough for the result. It does not claim that this is the only possible way to reach the result.",
    exampleZh: "只要提前预约，就能参观。",
    examplePinyin: "Zhǐyào tíqián yùyuē, jiù néng cānguān.",
    exampleEn: "As long as you book in advance, you can visit.",
    tokens: ["只要", "提前", "预约", "，", "就", "能", "参观", "。"],
    cloze: "只要带上身份证，＿＿能领取票，不需要其他材料。",
    options: ["就", "才", "却", "反而"],
    answer: 0,
    why: "就 introduces the result of a sufficient condition. 不需要其他材料 confirms that bringing identification is enough.",
  },
  {
    id: "g5-necessary",
    level: 5,
    title: "Set a necessary condition with 只有",
    pattern: "只有 + necessary condition，才 + result",
    explanation:
      "只有…才… says the result is possible only when the condition holds. Necessity alone does not guarantee that the result will occur.",
    exampleZh: "只有拿到许可证，才能施工。",
    examplePinyin: "Zhǐyǒu ná dào xǔkězhèng, cái néng shīgōng.",
    exampleEn:
      "Construction can proceed only after the permit has been obtained.",
    tokens: ["只有", "拿", "到", "许可证", "，", "才", "能", "施工", "。"],
    cloze: "只有通过安全检查，＿＿能入场；没通过的人不能进。",
    options: ["也", "才", "反而", "仍然"],
    answer: 1,
    why: "才 pairs with 只有 to make passing the check necessary. The final clause explicitly excludes people who have not passed.",
  },
  {
    id: "g5-unless",
    level: 5,
    title: "Name the exception with 除非",
    pattern: "除非 + exception，否则 + default outcome",
    explanation:
      "除非 names the exception that could prevent an otherwise expected outcome. 否则 states what happens if that exception does not apply.",
    exampleZh: "除非你现在出发，否则会迟到。",
    examplePinyin: "Chúfēi nǐ xiànzài chūfā, fǒuzé huì chídào.",
    exampleEn: "Unless you leave now, you will be late.",
    tokens: ["除非", "你", "现在", "出发", "，", "否则", "会", "迟到", "。"],
    cloze: "除非今晚修好车，＿＿明天只能坐公交。",
    options: ["因此", "而且", "否则", "于是"],
    answer: 2,
    why: "否则 means 'otherwise': if the car is not repaired tonight, the default is taking the bus.",
  },
  {
    id: "g5-accepted-premise",
    level: 5,
    title: "Reason from an accepted fact with 既然",
    pattern: "既然 + accepted premise，就 + decision",
    explanation:
      "既然 treats the premise as already true or accepted and uses it to justify a decision. 如果 instead leaves the premise hypothetical.",
    exampleZh: "既然大家都到了，我们就开始吧。",
    examplePinyin: "Jìrán dàjiā dōu dào le, wǒmen jiù kāishǐ ba.",
    exampleEn: "Since everyone has arrived, let's begin.",
    tokens: [
      "既然",
      "大家",
      "都",
      "到",
      "了",
      "，",
      "我们",
      "就",
      "开始",
      "吧",
      "。",
    ],
    cloze:
      "大家确实都到了。＿＿大家都到了，我们就开始吧。（Use the accepted fact as a reason.）",
    options: ["即使", "除非", "尽管", "既然"],
    answer: 3,
    why: "既然 reasons from the explicitly confirmed arrival. 即使 makes a concessive supposition, and 尽管 introduces an obstacle rather than this reason.",
  },
  {
    id: "g5-additive-emphasis",
    level: 5,
    title: "Add a stronger point with 不但…而且…",
    pattern: "不但 + first point，而且 + additional point",
    explanation:
      "不但…而且… adds a second, often more significant point. Keep the two parts grammatically parallel, such as two actions by the same subject.",
    exampleZh: "她不但修好了电脑，而且教会了我怎么修。",
    examplePinyin:
      "Tā bùdàn xiū hǎo le diànnǎo, érqiě jiāo huì le wǒ zěnme xiū.",
    exampleEn:
      "She not only repaired the computer but also taught me how to repair it.",
    tokens: [
      "她",
      "不但",
      "修",
      "好",
      "了",
      "电脑",
      "，",
      "而且",
      "教",
      "会",
      "了",
      "我",
      "怎么",
      "修",
      "。",
    ],
    cloze:
      "他不但准时完成任务，＿＿帮助同事解决了难题。（Add another achievement.）",
    options: ["而且", "但是", "否则", "尽管"],
    answer: 0,
    why: "而且 adds a second achievement to the first. 但是 would oppose it, and 否则 introduces an alternative consequence.",
  },
  {
    id: "g5-scalar-focus",
    level: 5,
    title: "Highlight an unexpected case with 连…都…",
    pattern: "连 + unexpected item + 都 + predicate",
    explanation:
      "连…都… highlights a case that is especially surprising on an implied scale. If even the least likely person can do something, the listener may infer that others can too.",
    exampleZh: "连五岁的孩子都听懂了。",
    examplePinyin: "Lián wǔ suì de háizi dōu tīng dǒng le.",
    exampleEn: "Even a five-year-old child understood.",
    tokens: ["连", "五", "岁", "的", "孩子", "都", "听", "懂", "了", "。"],
    cloze: "这个故事很清楚，连刚开始学中文的人＿＿听懂了。",
    options: ["才", "都", "却", "只"],
    answer: 1,
    why: "都 pairs with 连 to highlight beginners as an unexpected group that understood. 才 would emphasize lateness or a condition.",
  },
  {
    id: "g5-causative",
    level: 5,
    title: "Introduce a caused feeling with 让",
    pattern: "Cause + 让 + person + predicate",
    explanation:
      "让 can mean 'make' or 'cause' when followed by a person and their resulting state. In other contexts it means 'let'; the predicate helps distinguish the reading.",
    exampleZh: "这个消息让我很放心。",
    examplePinyin: "Zhège xiāoxi ràng wǒ hěn fàngxīn.",
    exampleEn: "This news puts my mind at ease.",
    tokens: ["这个", "消息", "让", "我", "很", "放心", "。"],
    cloze: "他的解释＿＿大家很放心。（The explanation causes reassurance.）",
    options: ["被", "把", "让", "对"],
    answer: 2,
    why: "让 introduces the people who experience the caused state 很放心. 把 requires a predicate describing disposal of an affected object.",
  },
  {
    id: "g5-action-measure",
    level: 5,
    title: "Count round trips with 趟",
    pattern: "Motion verb + number + 趟 + destination",
    explanation:
      "趟 counts trips or journeys, while 次 counts occurrences more generally. After 去, one 趟 can package a visit as a trip rather than count a physical object.",
    exampleZh: "我得去一趟银行。",
    examplePinyin: "Wǒ děi qù yī tàng yínháng.",
    exampleEn: "I need to make a trip to the bank.",
    tokens: ["我", "得", "去", "一", "趟", "银行", "。"],
    cloze: "我得去一＿＿银行办手续，办完就回来。",
    options: ["场", "遍", "件", "趟"],
    answer: 3,
    why: "趟 measures a trip to a destination. 遍 measures going through an activity from beginning to end; 场 and 件 do not measure this journey.",
  },
  {
    id: "g5-settling-complement",
    level: 5,
    title: "Use 下来 for settling into a state",
    pattern: "Verb/adjective + 下来",
    explanation:
      "下来 can extend beyond literal downward movement. In 安静下来 or 冷静下来, it describes a transition into a stable or calmer state.",
    exampleZh: "大家慢慢安静下来了。",
    examplePinyin: "Dàjiā mànmàn ānjìng xiàlai le.",
    exampleEn: "Everyone gradually quieted down.",
    tokens: ["大家", "慢慢", "安静", "下来", "了", "。"],
    cloze: "讨论太激动了，大家先冷静＿＿，再作决定。",
    options: ["下来", "出去", "进去", "上去"],
    answer: 0,
    why: "冷静下来 is the conventional metaphorical complement for calming down. The other directions do not give this meaning.",
  },
  {
    id: "g6-not-necessarily",
    level: 6,
    title: "Limit a prediction with 未必",
    pattern: "Subject + 未必 + predicate",
    explanation:
      "未必 means 'not necessarily.' It rejects certainty, not the possibility itself: 未必成功 does not mean 一定失败.",
    exampleZh: "价格高的产品未必更耐用。",
    examplePinyin: "Jiàgé gāo de chǎnpǐn wèibì gèng nàiyòng.",
    exampleEn: "More expensive products are not necessarily more durable.",
    tokens: ["价格", "高", "的", "产品", "未必", "更", "耐用", "。"],
    cloze: "这次未必成功，但也＿＿会失败；现在还不能下结论。",
    options: ["必定", "未必", "已经", "必须"],
    answer: 1,
    why: "The second 未必 keeps both success and failure uncertain, matching 还不能下结论. 必定 would assert certainty.",
  },
  {
    id: "g6-corrective-contrast",
    level: 6,
    title: "Replace a mistaken explanation",
    pattern: "并非 + rejected account，而是 + correction",
    explanation:
      "并非 firmly rejects an account in a more formal register. 而是 replaces it with the account the speaker endorses; the two sides should address the same issue.",
    exampleZh: "他并非不愿合作，而是没有时间。",
    examplePinyin: "Tā bìngfēi bù yuàn hézuò, érshì méiyǒu shíjiān.",
    exampleEn:
      "It is not that he is unwilling to cooperate; rather, he has no time.",
    tokens: [
      "他",
      "并非",
      "不",
      "愿",
      "合作",
      "，",
      "而是",
      "没有",
      "时间",
      "。",
    ],
    cloze:
      "问题并非设备太旧，＿＿使用方法不对。（Replace the first explanation.）",
    options: ["而且", "否则", "而是", "即使"],
    answer: 2,
    why: "而是 introduces the replacement diagnosis. 而且 would add another problem rather than correct the rejected explanation.",
  },
  {
    id: "g6-explanatory-focus",
    level: 6,
    title: "Foreground why something happened",
    pattern: "之所以 + outcome，是因为 + reason",
    explanation:
      "之所以…是因为… focuses the sentence on explaining an already identified outcome. Keep the outcome in the first part and its cause after 是因为.",
    exampleZh: "这家店之所以受欢迎，是因为服务很细心。",
    examplePinyin:
      "Zhè jiā diàn zhīsuǒyǐ shòu huānyíng, shì yīnwèi fúwù hěn xìxīn.",
    exampleEn:
      "The reason this shop is popular is that its service is attentive.",
    tokens: [
      "这",
      "家",
      "店",
      "之所以",
      "受",
      "欢迎",
      "，",
      "是",
      "因为",
      "服务",
      "很",
      "细心",
      "。",
    ],
    cloze: "他之所以改乘地铁，＿＿原来的公交线路停运了。",
    options: ["因此", "以便", "尽管", "是因为"],
    answer: 3,
    why: "是因为 introduces the cause paired with 之所以. 因此 would instead introduce a consequence.",
  },
  {
    id: "g6-regardless",
    level: 6,
    title: "Keep a result across all alternatives",
    pattern: "无论 + alternative question，都 + result",
    explanation:
      "无论…都… makes the result independent of alternatives such as 谁, 什么时候, or 是否. The first part must offer a range rather than assert one isolated fact.",
    exampleZh: "无论结果如何，我们都会继续研究。",
    examplePinyin: "Wúlùn jiéguǒ rúhé, wǒmen dōu huì jìxù yánjiū.",
    exampleEn: "Whatever the result, we will continue the research.",
    tokens: [
      "无论",
      "结果",
      "如何",
      "，",
      "我们",
      "都",
      "会",
      "继续",
      "研究",
      "。",
    ],
    cloze: "无论谁负责这个项目，＿＿必须遵守同样的规定。",
    options: ["都", "才", "反而", "否则"],
    answer: 0,
    why: "都 applies the requirement to every alternative named by 无论谁. 才 would restrict rather than generalize the result.",
  },
  {
    id: "g6-preference-sacrifice",
    level: 6,
    title: "Choose a cost over an unacceptable option",
    pattern: "宁可 + accepted cost，也不 + rejected option",
    explanation:
      "宁可…也不… makes a deliberate preference explicit, often choosing an inconvenience to avoid something worse. It expresses a value judgment rather than a prediction.",
    exampleZh: "我宁可多走一公里，也不在危险的地方过马路。",
    examplePinyin:
      "Wǒ nìngkě duō zǒu yī gōnglǐ, yě bù zài wēixiǎn de dìfang guò mǎlù.",
    exampleEn:
      "I would rather walk an extra kilometer than cross the road somewhere dangerous.",
    tokens: [
      "我",
      "宁可",
      "多",
      "走",
      "一",
      "公里",
      "，",
      "也",
      "不",
      "在",
      "危险",
      "的",
      "地方",
      "过",
      "马路",
      "。",
    ],
    cloze: "他宁可晚一点交报告，＿＿编造数据。（He refuses fabrication.）",
    options: ["就会", "也不", "才会", "反而会"],
    answer: 1,
    why: "也不 introduces the rejected alternative in 宁可…也不…. The context explicitly rules out fabrication.",
  },
  {
    id: "g6-advisory-alternative",
    level: 6,
    title: "Recommend a better alternative",
    pattern: "与其 + less useful action，不如 + better action",
    explanation:
      "与其…不如… compares two courses of action and recommends the second. Unlike 宁可, it commonly advises someone what would be more worthwhile.",
    exampleZh: "与其一直抱怨，不如先试一个办法。",
    examplePinyin: "Yǔqí yīzhí bàoyuàn, bùrú xiān shì yī ge bànfǎ.",
    exampleEn:
      "Rather than keep complaining, it would be better to try a solution first.",
    tokens: [
      "与其",
      "一直",
      "抱怨",
      "，",
      "不如",
      "先",
      "试",
      "一",
      "个",
      "办法",
      "。",
    ],
    cloze: "与其猜测他的意思，＿＿直接问清楚。（Recommend the second action.）",
    options: ["否则", "尽管", "不如", "以免"],
    answer: 2,
    why: "不如 pairs with 与其 to recommend asking instead of guessing. 以免 introduces something to avoid, not a better alternative.",
  },
  {
    id: "g6-forced-necessity",
    level: 6,
    title: "Express a constrained necessity",
    pattern: "不得不 + verb phrase",
    explanation:
      "不得不 means 'have no choice but to.' The double negative conveys external necessity, often with reluctance, rather than an enthusiastic preference.",
    exampleZh: "航班取消了，我们不得不改坐火车。",
    examplePinyin: "Hángbān qǔxiāo le, wǒmen bùdébù gǎi zuò huǒchē.",
    exampleEn:
      "The flight was canceled, so we had no choice but to take the train instead.",
    tokens: [
      "航班",
      "取消",
      "了",
      "，",
      "我们",
      "不得不",
      "改",
      "坐",
      "火车",
      "。",
    ],
    cloze: "最后一班车已经走了，他＿＿步行回家。（No other option remains.）",
    options: ["未必", "何必", "不必", "不得不"],
    answer: 3,
    why: "不得不 expresses the forced choice. 不必 says it is unnecessary, and 何必 questions the need.",
  },
  {
    id: "g6-expected-imperfection",
    level: 6,
    title: "Acknowledge something hard to avoid",
    pattern: "难免 + undesirable event",
    explanation:
      "难免 frames a usually unwelcome event as difficult to avoid. It often normalizes small mistakes without saying that every person must make them on every occasion.",
    exampleZh: "第一次主持会议，难免有些紧张。",
    examplePinyin: "Dì yī cì zhǔchí huìyì, nánmiǎn yǒuxiē jǐnzhāng.",
    exampleEn:
      "Some nervousness is hard to avoid when chairing a meeting for the first time.",
    tokens: ["第一", "次", "主持", "会议", "，", "难免", "有些", "紧张", "。"],
    cloze:
      "新手＿＿犯错，我们应该帮助他们，而不是要求第一次就完美。（Acknowledge errors as hard to avoid.）",
    options: ["难免", "免得", "以免", "避免"],
    answer: 0,
    why: "难免 acknowledges that errors are hard to avoid for beginners. 免得 and 以免 introduce a preventive purpose; 避免 means to avoid.",
  },
  {
    id: "g6-evaluative-complement",
    level: 6,
    title: "Evaluate an impression with 起来",
    pattern: "看/听/用 + 起来 + evaluation",
    explanation:
      "起来 can frame an evaluation based on seeing, hearing, or trying something. 看起来 is an impression, not proof of the underlying reality.",
    exampleZh: "这个方案听起来不错，但还需要测试。",
    examplePinyin: "Zhège fāng'àn tīng qǐlai bùcuò, dàn hái xūyào cèshì.",
    exampleEn: "This plan sounds good, but it still needs testing.",
    tokens: [
      "这个",
      "方案",
      "听",
      "起来",
      "不错",
      "，",
      "但",
      "还",
      "需要",
      "测试",
      "。",
    ],
    cloze:
      "这个工具用＿＿很方便，我试过之后才这样评价。（Evaluate the experience of using it.）",
    options: ["下去", "起来", "过来", "出去"],
    answer: 1,
    why: "用起来 introduces an evaluation based on actual use. 下去 emphasizes continuation, not the experience-based evaluation intended.",
  },
  {
    id: "g6-perspective",
    level: 6,
    title: "Make a viewpoint explicit",
    pattern: "在 + person + 看来，judgment",
    explanation:
      "在…看来 attributes a judgment to a viewpoint rather than presenting it as universal fact. It is useful for contrasting stakeholders' assessments.",
    exampleZh: "在居民看来，安静比速度更重要。",
    examplePinyin: "Zài jūmín kànlái, ānjìng bǐ sùdù gèng zhòngyào.",
    exampleEn: "In the residents' view, quiet matters more than speed.",
    tokens: [
      "在",
      "居民",
      "看来",
      "，",
      "安静",
      "比",
      "速度",
      "更",
      "重要",
      "。",
    ],
    cloze:
      "在老师＿＿，这次修改比原稿更清楚。（Attribute a judgment to the teacher.）",
    options: ["看见", "看过", "看来", "看完"],
    answer: 2,
    why: "在老师看来 is the viewpoint frame. 看见, 看过, and 看完 describe seeing actions rather than an attributed opinion.",
  },
  {
    id: "g7-persistent-concession",
    level: 7,
    title: "Acknowledge an obstacle without yielding",
    pattern: "尽管 + established obstacle，仍然 + persistence",
    explanation:
      "尽管…仍然… is suitable for reporting persistence despite an actual obstacle. 尽管 can also introduce 'go ahead and…' in speech, but that is a different construction.",
    exampleZh: "尽管经费减少，团队仍然保留了免费咨询。",
    examplePinyin:
      "Jǐnguǎn jīngfèi jiǎnshǎo, tuánduì réngrán bǎoliú le miǎnfèi zīxún.",
    exampleEn:
      "Although funding decreased, the team still retained free consultations.",
    tokens: [
      "尽管",
      "经费",
      "减少",
      "，",
      "团队",
      "仍然",
      "保留",
      "了",
      "免费",
      "咨询",
      "。",
    ],
    cloze:
      "尽管已经遭到两次拒绝，她＿＿继续申请。（Emphasize persistence despite the obstacle.）",
    options: ["才", "否则", "因此", "仍然"],
    answer: 3,
    why: "仍然 marks persistence contrary to the expectation raised by the refusals. 因此 would frame continuation as a consequence, not concession.",
  },
  {
    id: "g7-not-yet-formal",
    level: 7,
    title: "Report an unfinished process with 尚未",
    pattern: "尚未 + verb/result",
    explanation:
      "尚未 is a formal 'not yet,' common in notices and reports. It leaves completion open; 永不 would rule it out indefinitely.",
    exampleZh: "申请尚未获批，请勿提前施工。",
    examplePinyin: "Shēnqǐng shàngwèi huò pī, qǐng wù tíqián shīgōng.",
    exampleEn:
      "The application has not yet been approved; please do not begin construction early.",
    tokens: [
      "申请",
      "尚未",
      "获",
      "批",
      "，",
      "请",
      "勿",
      "提前",
      "施工",
      "。",
    ],
    cloze: "审核正在进行，结果＿＿公布，请继续等待。",
    options: ["尚未", "不再", "早已", "从不"],
    answer: 0,
    why: "尚未 matches an ongoing review whose result has not yet been released. 不再 would imply a previous practice has stopped.",
  },
  {
    id: "g7-purpose",
    level: 7,
    title: "Explain a practical purpose with 以便",
    pattern: "Action，以便 + intended benefit",
    explanation:
      "以便 introduces the purpose an action is meant to enable. It does not certify that the benefit has already occurred, so distinguish it from a result connector such as 因此.",
    exampleZh: "请提前提交问题，以便专家准备材料。",
    examplePinyin: "Qǐng tíqián tíjiāo wèntí, yǐbiàn zhuānjiā zhǔnbèi cáiliào.",
    exampleEn:
      "Please submit questions in advance so that the experts can prepare materials.",
    tokens: [
      "请",
      "提前",
      "提交",
      "问题",
      "，",
      "以便",
      "专家",
      "准备",
      "材料",
      "。",
    ],
    cloze:
      "我们先标出资料来源，＿＿读者日后核查。（State the intended benefit.）",
    options: ["以免", "以便", "尽管", "否则"],
    answer: 1,
    why: "以便 introduces the intended ability to verify sources. 以免 would mean avoiding verification, the opposite purpose.",
  },
  {
    id: "g7-locate-essence",
    level: 7,
    title: "Locate the key issue with 在于",
    pattern: "Key/problem + 在于 + noun or clause",
    explanation:
      "在于 identifies what an issue essentially consists in or depends on. Unlike 在 followed by a place, it locates an abstract explanation.",
    exampleZh: "问题不在于数量，而在于分配方式。",
    examplePinyin: "Wèntí bù zàiyú shùliàng, ér zàiyú fēnpèi fāngshì.",
    exampleEn:
      "The problem lies not in the quantity but in the method of distribution.",
    tokens: [
      "问题",
      "不",
      "在于",
      "数量",
      "，",
      "而",
      "在于",
      "分配",
      "方式",
      "。",
    ],
    cloze: "成败的关键＿＿能否持续执行，而不是口号是否响亮。",
    options: ["由于", "对于", "在于", "至于"],
    answer: 2,
    why: "在于 locates the key determinant in sustained execution. 对于 marks a topic or target, and 由于 introduces a cause differently.",
  },
  {
    id: "g7-policy-premise",
    level: 7,
    title: "Introduce a considered basis with 鉴于",
    pattern: "鉴于 + relevant circumstance，decision",
    explanation:
      "鉴于 introduces a circumstance taken into account when making a formal decision. It is well suited to administrative explanations, not casual instructions about physical location.",
    exampleZh: "鉴于道路结冰，学校决定推迟上课。",
    examplePinyin: "Jiànyú dàolù jiébīng, xuéxiào juédìng tuīchí shàngkè.",
    exampleEn:
      "In view of the icy roads, the school decided to postpone classes.",
    tokens: [
      "鉴于",
      "道路",
      "结冰",
      "，",
      "学校",
      "决定",
      "推迟",
      "上课",
      "。",
    ],
    cloze:
      "＿＿道路已经结冰，学校决定推迟上课。（State the circumstance considered in the decision.）",
    options: ["至于", "以便", "除非", "鉴于"],
    answer: 3,
    why: "鉴于 frames the established icy-road condition as the basis for the decision. 除非 makes an exception, while 以便 gives a purpose.",
  },
  {
    id: "g7-deeper-significance",
    level: 7,
    title: "Move from a limited role to a larger one",
    pattern: "不仅仅是 + limited description，更是 + deeper description",
    explanation:
      "不仅仅是…更是… does more than list two properties: it presents the second description as a deeper or more important characterization.",
    exampleZh: "图书馆不仅仅是借书的地方，更是社区交流的空间。",
    examplePinyin:
      "Túshūguǎn bù jǐnjǐn shì jiè shū de dìfang, gèng shì shèqū jiāoliú de kōngjiān.",
    exampleEn:
      "A library is not merely a place to borrow books; more importantly, it is a space for community exchange.",
    tokens: [
      "图书馆",
      "不",
      "仅仅",
      "是",
      "借",
      "书",
      "的",
      "地方",
      "，",
      "更",
      "是",
      "社区",
      "交流",
      "的",
      "空间",
      "。",
    ],
    cloze:
      "这不仅仅是一次修缮，＿＿是重新建立居民信任的机会。（Elevate the second description.）",
    options: ["更", "才", "却不", "否则"],
    answer: 0,
    why: "更是 elevates the rebuilding of trust beyond the limited description of repairs. 才是 would correct an earlier identification rather than add this deeper significance.",
  },
  {
    id: "g7-reversed-expectation",
    level: 7,
    title: "Report the opposite effect with 非但…反而…",
    pattern: "非但没有 + expected benefit，反而 + opposite outcome",
    explanation:
      "非但…反而… denies an expected result and replaces it with an opposite or worsening result. It is stronger than simply adding another outcome with 而且.",
    exampleZh: "这项改动非但没有节省时间，反而增加了手续。",
    examplePinyin:
      "Zhè xiàng gǎidòng fēidàn méiyǒu jiéshěng shíjiān, fǎn'ér zēngjiā le shǒuxù.",
    exampleEn:
      "This change not only failed to save time; it actually added procedures.",
    tokens: [
      "这",
      "项",
      "改动",
      "非但",
      "没有",
      "节省",
      "时间",
      "，",
      "反而",
      "增加",
      "了",
      "手续",
      "。",
    ],
    cloze:
      "解释非但没有消除疑虑，＿＿让大家更加担心。（Give the opposite effect.）",
    options: ["从而", "反而", "以便", "况且"],
    answer: 1,
    why: "反而 highlights increased worry as the opposite of the expected reassurance. 从而 would merely indicate a resulting effect.",
  },
  {
    id: "g7-trigger",
    level: 7,
    title: "Present an event as a decisive trigger",
    pattern: "一旦 + trigger，便 + consequence",
    explanation:
      "一旦 marks the occurrence of a condition as a significant turning point. 便 is a relatively formal counterpart of 就 introducing the ensuing result.",
    exampleZh: "一旦发现泄漏，设备便会自动停机。",
    examplePinyin: "Yīdàn fāxiàn xièlòu, shèbèi biàn huì zìdòng tíngjī.",
    exampleEn:
      "Once a leak is detected, the equipment will shut down automatically.",
    tokens: [
      "一旦",
      "发现",
      "泄漏",
      "，",
      "设备",
      "便",
      "会",
      "自动",
      "停机",
      "。",
    ],
    cloze:
      "一旦确认地址错误，系统＿＿会停止投递。（Use a formal trigger–result connector.）",
    options: ["却", "才未", "便", "反而"],
    answer: 2,
    why: "便 introduces the immediate consequence of the 一旦 trigger. 却 and 反而 would signal an unexpected contrast.",
  },
  {
    id: "g7-universal-rule",
    level: 7,
    title: "State an inclusive rule with 凡是…均…",
    pattern: "凡是 + qualifying category，均 + rule",
    explanation:
      "凡是 defines every member of a category, and 均 applies the rule uniformly. This formal pattern is useful in notices; it is not an assertion about a single person.",
    exampleZh: "凡是参加培训的人员，均须完成安全测试。",
    examplePinyin:
      "Fánshì cānjiā péixùn de rényuán, jūn xū wánchéng ānquán cèshì.",
    exampleEn:
      "All personnel attending the training must complete the safety test.",
    tokens: [
      "凡是",
      "参加",
      "培训",
      "的",
      "人员",
      "，",
      "均",
      "须",
      "完成",
      "安全",
      "测试",
      "。",
    ],
    cloze:
      "凡是符合条件的申请，＿＿可进入下一轮；没有例外。（Apply the rule to every qualifying application.）",
    options: ["仅", "才不", "偶尔", "均"],
    answer: 3,
    why: "均 distributes eligibility to all qualifying applications, matching 没有例外. 仅 restricts rather than universally distributes.",
  },
  {
    id: "g7-relative-nominalization",
    level: 7,
    title: "Form a formal object-relative phrase with 所",
    pattern: "Agent + 所 + verb + 的 + noun",
    explanation:
      "所 can precede a verb in a formal relative clause: 团队所收集的资料 means the materials the team collected. The following noun is the understood object of 收集.",
    exampleZh: "团队所收集的资料均已公开。",
    examplePinyin: "Tuánduì suǒ shōují de zīliào jūn yǐ gōngkāi.",
    exampleEn: "All the materials collected by the team have been made public.",
    tokens: ["团队", "所", "收集", "的", "资料", "均", "已", "公开", "。"],
    cloze:
      "我们＿＿提出的建议已被采纳。（Use a formal relative clause, not a time adverb.）",
    options: ["所", "正", "曾", "才"],
    answer: 0,
    why: "所提出的建议 is the formal object-relative phrase intended. 曾 would add past experience rather than perform that grammatical role.",
  },
  {
    id: "g8-evidence-inference",
    level: 8,
    title: "Link evidence to a bounded inference",
    pattern: "Evidence；由此可见 + supported conclusion",
    explanation:
      "由此可见 draws an inference from the preceding evidence. The strength and scope of the conclusion must not exceed the evidence; a connector does not turn correlation into causation.",
    exampleZh: "两次检测结果一致，由此可见仪器在本次测试中表现稳定。",
    examplePinyin:
      "Liǎng cì jiǎncè jiéguǒ yīzhì, yóucǐ kě jiàn yíqì zài běn cì cèshì zhōng biǎoxiàn wěndìng.",
    exampleEn:
      "The two measurements agree; this indicates that the instrument performed consistently in this test.",
    tokens: [
      "两",
      "次",
      "检测",
      "结果",
      "一致",
      "，",
      "由此",
      "可",
      "见",
      "仪器",
      "在",
      "本",
      "次",
      "测试",
      "中",
      "表现",
      "稳定",
      "。",
    ],
    cloze:
      "两次检测结果一致，＿＿仪器在本次测试中表现稳定。（Draw an inference from this evidence.）",
    options: ["以免", "由此可见", "尽管如此", "在此之前"],
    answer: 1,
    why: "由此可见 explicitly links the evidence to a limited inference about this test. 尽管如此 would introduce concession.",
  },
  {
    id: "g8-inference-limit",
    level: 8,
    title: "Refuse an unsupported conclusion",
    pattern: "不能 + 据此 + 断言 + claim",
    explanation:
      "据此 points back to the evidence, while 不能断言 limits what it warrants. This challenges the inference, not necessarily the observed fact.",
    exampleZh: "样本仅来自一座城市，不能据此断言全国情况相同。",
    examplePinyin:
      "Yàngběn jǐn láizì yī zuò chéngshì, bù néng jùcǐ duànyán quánguó qíngkuàng xiāngtóng.",
    exampleEn:
      "The sample comes from only one city; we cannot conclude from it that the situation is the same nationwide.",
    tokens: [
      "样本",
      "仅",
      "来自",
      "一",
      "座",
      "城市",
      "，",
      "不",
      "能",
      "据此",
      "断言",
      "全国",
      "情况",
      "相同",
      "。",
    ],
    cloze:
      "样本只有十人，不能＿＿断言所有用户都满意。（Refer back to this evidence.）",
    options: ["以便", "鉴于", "据此", "否则"],
    answer: 2,
    why: "据此 functions adverbially before 断言 and means 'on this basis.' 鉴于 introduces a circumstance clause, not this reference-back structure.",
  },
  {
    id: "g8-formal-hypothesis",
    level: 8,
    title: "Build a formal hypothetical argument",
    pattern: "倘若 + hypothesis，则 + implication",
    explanation:
      "倘若…则… frames a hypothetical premise and its implication in a formal register. It does not claim that the premise has already been verified.",
    exampleZh: "倘若成本持续上升，则现有预算不足以支持扩建。",
    examplePinyin:
      "Tǎngruò chéngběn chíxù shàngshēng, zé xiànyǒu yùsuàn bù zúyǐ zhīchí kuòjiàn.",
    exampleEn:
      "If costs keep rising, the current budget will be insufficient to support expansion.",
    tokens: [
      "倘若",
      "成本",
      "持续",
      "上升",
      "，",
      "则",
      "现有",
      "预算",
      "不",
      "足以",
      "支持",
      "扩建",
      "。",
    ],
    cloze:
      "倘若该假设成立，＿＿需要重新解释现有数据。（State its implication formally.）",
    options: ["却", "乃至", "况且", "则"],
    answer: 3,
    why: "则 introduces the implication of the 倘若 premise. 乃至 extends a range and 况且 adds another consideration.",
  },
  {
    id: "g8-literary-concession",
    level: 8,
    title: "Recognize a concession in literary register",
    pattern: "纵然 + concession，亦 + unchanged position",
    explanation:
      "纵然…亦… is a literary or elevated counterpart of 即使…也…. It suits reflective argument but can sound unnecessarily grand in a casual request.",
    exampleZh: "纵然前路艰难，亦不可放弃求证。",
    examplePinyin: "Zòngrán qiánlù jiānnán, yì bù kě fàngqì qiúzhèng.",
    exampleEn:
      "Even if the road ahead is difficult, one must not give up seeking verification.",
    tokens: [
      "纵然",
      "前路",
      "艰难",
      "，",
      "亦",
      "不",
      "可",
      "放弃",
      "求证",
      "。",
    ],
    cloze:
      "纵然意见相左，＿＿应尊重彼此。（Use the elevated counterpart of 也.）",
    options: ["亦", "则", "乃", "遂"],
    answer: 0,
    why: "亦 is the elevated 'also/still' paired with 纵然 here. 则 and 遂 introduce consequences instead of the intended concession.",
  },
  {
    id: "g8-no-means",
    level: 8,
    title: "State that there is no means to act",
    pattern: "无以 + verb",
    explanation:
      "无以 means having no means or basis by which to do something. It is formal and differs from simply choosing not to act.",
    exampleZh: "缺少原始记录，我们无以核实这项说法。",
    examplePinyin: "Quēshǎo yuánshǐ jìlù, wǒmen wúyǐ héshí zhè xiàng shuōfǎ.",
    exampleEn:
      "Without the original records, we have no means to verify this claim.",
    tokens: [
      "缺少",
      "原始",
      "记录",
      "，",
      "我们",
      "无以",
      "核实",
      "这",
      "项",
      "说法",
      "。",
    ],
    cloze:
      "没有任何可查的记录，我们＿＿核实其来源。（Lack the means, rather than the desire.）",
    options: ["不愿", "无以", "无须", "足以"],
    answer: 1,
    why: "无以 expresses a lack of means caused by the missing records. 不愿 expresses unwillingness; 无须 expresses lack of necessity.",
  },
  {
    id: "g8-cautious-positive",
    level: 8,
    title: "Offer a cautious positive reading",
    pattern: "未尝不是 + positive characterization",
    explanation:
      "未尝不是 is a rhetorical double negative meaning 'may well be' or 'is not necessarily not.' It invites a favorable interpretation without presenting it as the only interpretation.",
    exampleZh: "暂缓扩张，未尝不是重新检验方向的机会。",
    examplePinyin:
      "Zànhuǎn kuòzhāng, wèicháng bù shì chóngxīn jiǎnyàn fāngxiàng de jīhuì.",
    exampleEn:
      "Pausing expansion may well be an opportunity to reassess the direction.",
    tokens: [
      "暂缓",
      "扩张",
      "，",
      "未尝",
      "不",
      "是",
      "重新",
      "检验",
      "方向",
      "的",
      "机会",
      "。",
    ],
    cloze:
      "这次受挫＿＿重新审视方法的机会。（Offer a cautiously positive reinterpretation.）",
    options: ["绝不可能是", "并非", "未尝不是", "未必是"],
    answer: 2,
    why: "未尝不是 invites the positive reading that the setback may be an opportunity. 未必是 instead weakens a claim that it is one.",
  },
  {
    id: "g8-await-resolution",
    level: 8,
    title: "Identify what remains to be done",
    pattern: "Issue + 有待 + verb",
    explanation:
      "有待 marks something as awaiting further work or resolution. It is common in analytical writing and should be followed by a task such as 核实, 完善, or 讨论.",
    exampleZh: "这项结论仍有待独立验证。",
    examplePinyin: "Zhè xiàng jiélùn réng yǒudài dúlì yànzhèng.",
    exampleEn: "This conclusion still awaits independent verification.",
    tokens: ["这", "项", "结论", "仍", "有待", "独立", "验证", "。"],
    cloze: "这一解释尚未证实，仍＿＿进一步检验。",
    options: ["免于", "已经", "无须", "有待"],
    answer: 3,
    why: "有待 identifies the verification still required. 已经 contradicts 尚未证实, while 无须 would deny the need for testing.",
  },
  {
    id: "g8-admit-then-limit",
    level: 8,
    title: "Grant a point before limiting it",
    pattern: "诚然 + conceded truth，然而 + qualification",
    explanation:
      "诚然 explicitly grants that a point is valid. 然而 then limits its implications or introduces a neglected consideration; this is concession, not retraction.",
    exampleZh: "诚然，数字服务提高了效率，然而并非人人都能顺利使用。",
    examplePinyin:
      "Chéngrán, shùzì fúwù tígāo le xiàolǜ, rán'ér bìngfēi rénrén dōu néng shùnlì shǐyòng.",
    exampleEn:
      "Admittedly, digital services improve efficiency; however, not everyone can use them easily.",
    tokens: [
      "诚然",
      "，",
      "数字",
      "服务",
      "提高",
      "了",
      "效率",
      "，",
      "然而",
      "并非",
      "人人",
      "都",
      "能",
      "顺利",
      "使用",
      "。",
    ],
    cloze:
      "诚然，方案节省了费用，＿＿也减少了必要的服务。（Introduce the limiting drawback.）",
    options: ["然而", "因此", "以便", "于是"],
    answer: 0,
    why: "然而 introduces a drawback that qualifies the admitted saving. 因此 and 于是 would frame the next clause as a consequence rather than the requested contrast.",
  },
  {
    id: "g8-formal-addition",
    level: 8,
    title: "Add another requirement beyond a named one",
    pattern: "除 + item + 之外，尚 + additional requirement",
    explanation:
      "除…之外 can mean 'besides' when the next clause adds something. 尚 is a formal 'also/still.' Distinguish this additive reading from an exception followed by 都不.",
    exampleZh: "除技术评估之外，尚需征求居民意见。",
    examplePinyin: "Chú jìshù pínggū zhīwài, shàng xū zhēngqiú jūmín yìjiàn.",
    exampleEn:
      "Besides the technical assessment, residents' opinions must also be sought.",
    tokens: [
      "除",
      "技术",
      "评估",
      "之外",
      "，",
      "尚",
      "需",
      "征求",
      "居民",
      "意见",
      "。",
    ],
    cloze: "除预算审查＿＿，尚需开展环境评估。",
    options: ["之内", "之外", "之中", "之前"],
    answer: 1,
    why: "除…之外 forms the intended 'besides' frame. 之前 would specify time order instead of adding another requirement.",
  },
  {
    id: "g8-formal-passive",
    level: 8,
    title: "Recognize the formal passive 为…所…",
    pattern: "Affected subject + 为 + agent + 所 + verb",
    explanation:
      "为…所… is a formal passive construction. 为 is pronounced wéi here. It foregrounds an affected entity, much as 被 does, but belongs chiefly to written argument and reporting.",
    exampleZh: "这一观点为多数研究者所接受。",
    examplePinyin: "Zhè yī guāndiǎn wéi duōshù yánjiūzhě suǒ jiēshòu.",
    exampleEn: "This view is accepted by most researchers.",
    tokens: ["这", "一", "观点", "为", "多数", "研究者", "所", "接受", "。"],
    cloze: "该建议为委员会＿＿采纳。（Complete the formal passive.）",
    options: ["在", "以", "所", "向"],
    answer: 2,
    why: "所 completes 为委员会所采纳. The committee is the agent and the suggestion is the affected subject.",
  },
  {
    id: "g9-concede-weight",
    level: 9,
    title: "Concede importance without giving it priority",
    pattern: "A + 固然 + valid point，B + 却 + counterweight",
    explanation:
      "固然 grants a point, while 却 introduces a counterweight that limits its priority. A good argument retains the truth of the concession rather than treating it as a straw man.",
    exampleZh: "效率固然重要，公平却不能因此被忽略。",
    examplePinyin:
      "Xiàolǜ gùrán zhòngyào, gōngpíng què bù néng yīncǐ bèi hūlüè.",
    exampleEn:
      "Efficiency is certainly important, but fairness must not be overlooked on that account.",
    tokens: [
      "效率",
      "固然",
      "重要",
      "，",
      "公平",
      "却",
      "不",
      "能",
      "因此",
      "被",
      "忽略",
      "。",
    ],
    cloze:
      "速度固然值得追求，安全＿＿不能因此让步。（Introduce a counterweight.）",
    options: ["遂", "因而", "从而", "却"],
    answer: 3,
    why: "却 contrasts the priority of safety with the conceded value of speed. The other connectors introduce consequences.",
  },
  {
    id: "g9-insistent-necessity",
    level: 9,
    title: "Recognize emphatic necessity with 非…不可",
    pattern: "非 + action + 不可",
    explanation:
      "非…不可 expresses insistence that an action must be taken. It is stronger than ordinary 需要 and can sound uncompromising, so consider the speaker's authority and tone.",
    exampleZh: "涉及人身安全的问题，非查清不可。",
    examplePinyin: "Shèjí rénshēn ānquán de wèntí, fēi chá qīng bù kě.",
    exampleEn:
      "Issues concerning personal safety must be thoroughly investigated.",
    tokens: [
      "涉及",
      "人身",
      "安全",
      "的",
      "问题",
      "，",
      "非",
      "查",
      "清",
      "不",
      "可",
      "。",
    ],
    cloze: "这笔账关系到公众资金，非核实＿＿。（Express emphatic necessity.）",
    options: ["不可", "不必", "未必", "无须"],
    answer: 0,
    why: "非核实不可 is the emphatic double-negative necessity pattern. The alternatives deny or weaken necessity.",
  },
  {
    id: "g9-reframe-description",
    level: 9,
    title: "Replace a label with a more accurate account",
    pattern: "与其说 + label，不如说 + better characterization",
    explanation:
      "与其说…不如说… compares descriptions, not necessarily actions. It reframes how an event should be understood and can correct an overly simple label.",
    exampleZh: "与其说这是技术失败，不如说是沟通机制失灵。",
    examplePinyin:
      "Yǔqí shuō zhè shì jìshù shībài, bùrú shuō shì gōutōng jīzhì shīlíng.",
    exampleEn:
      "Rather than a technological failure, this is more accurately a breakdown in the communication mechanism.",
    tokens: [
      "与其",
      "说",
      "这",
      "是",
      "技术",
      "失败",
      "，",
      "不如",
      "说",
      "是",
      "沟通",
      "机制",
      "失灵",
      "。",
    ],
    cloze:
      "与其说大家拒绝改变，＿＿说大家尚未理解改变的理由。（Choose the more accurate characterization.）",
    options: ["何况", "不如", "以便", "因此"],
    answer: 1,
    why: "不如说 offers the preferred characterization paired with 与其说. It is not a purpose or a consequence.",
  },
  {
    id: "g9-fallback-argument",
    level: 9,
    title: "Preserve an argument after granting a premise",
    pattern: "退一步说，即便 + conceded premise，仍 + remaining claim",
    explanation:
      "退一步说 temporarily grants a disputed premise to test whether the central claim still holds. It is an argumentative fallback, not a literal instruction to move backward.",
    exampleZh: "退一步说，即便成本估算准确，资金来源仍需说明。",
    examplePinyin:
      "Tuì yī bù shuō, jíbiàn chéngběn gūsuàn zhǔnquè, zījīn láiyuán réng xū shuōmíng.",
    exampleEn:
      "Even granting that the cost estimate is accurate, the source of funding still needs to be explained.",
    tokens: [
      "退",
      "一",
      "步",
      "说",
      "，",
      "即便",
      "成本",
      "估算",
      "准确",
      "，",
      "资金",
      "来源",
      "仍",
      "需",
      "说明",
      "。",
    ],
    cloze:
      "＿＿，即便全部数字属实，也不能忽略调查对象的局限。（Introduce a fallback concession.）",
    options: ["总而言之", "换言之", "退一步说", "由此可见"],
    answer: 2,
    why: "退一步说 grants the disputed figures for the sake of argument while preserving the sampling objection. 换言之 merely restates a claim.",
  },
  {
    id: "g9-reductive-framing",
    level: 9,
    title: "Recognize a reductive claim with 无非",
    pattern: "Subject + 无非是 + limited account",
    explanation:
      "无非是 means 'is nothing more than' and narrows the interpretation. It can dismiss complexity, so readers should ask whether the reduction is justified rather than treating it as neutral description.",
    exampleZh: "把争论说成个人恩怨，无非是回避制度问题。",
    examplePinyin:
      "Bǎ zhēnglùn shuō chéng gèrén ēnyuàn, wúfēi shì huíbì zhìdù wèntí.",
    exampleEn:
      "Calling the dispute a personal grudge is nothing more than an evasion of institutional issues.",
    tokens: [
      "把",
      "争论",
      "说",
      "成",
      "个人",
      "恩怨",
      "，",
      "无非",
      "是",
      "回避",
      "制度",
      "问题",
      "。",
    ],
    cloze:
      "所谓新方案＿＿是给旧流程换了个名字，并无实质改变。（Restrict it to this account.）",
    options: ["未必", "并非", "何尝", "无非"],
    answer: 3,
    why: "无非是 restricts the alleged innovation to renaming, consistent with 并无实质改变. 并非 would deny that account.",
  },
  {
    id: "g9-qualified-acknowledgment",
    level: 9,
    title: "Acknowledge a degree with 不无",
    pattern: "不无 + abstract noun",
    explanation:
      "不无 means 'not without' and cautiously acknowledges some degree of an abstract quality, such as 道理 or 风险. It is weaker than declaring a claim completely correct.",
    exampleZh: "他的担忧不无道理，但尚不足以否定整个计划。",
    examplePinyin:
      "Tā de dānyōu bù wú dàolǐ, dàn shàng bù zúyǐ fǒudìng zhěng ge jìhuà.",
    exampleEn:
      "His concerns are not without reason, but they are not yet enough to reject the entire plan.",
    tokens: [
      "他",
      "的",
      "担忧",
      "不",
      "无",
      "道理",
      "，",
      "但",
      "尚",
      "不",
      "足以",
      "否定",
      "整",
      "个",
      "计划",
      "。",
    ],
    cloze:
      "这个判断＿＿道理，但也有明显局限。（Acknowledge some merit cautiously.）",
    options: ["不无", "毫无", "无以", "有待"],
    answer: 0,
    why: "不无道理 grants some merit without full endorsement. 毫无道理 would deny any merit.",
  },
  {
    id: "g9-rhetorical-denial",
    level: 9,
    title: "Interpret a rhetorical question with 何尝",
    pattern: "Subject + 何尝 + verb + 过？",
    explanation:
      "何尝 in a rhetorical question often denies that the supposed experience has occurred. Here 我何尝放弃过 means 'I have never given up,' not a request for a date.",
    exampleZh: "面对这些困难，我们何尝放弃过？",
    examplePinyin: "Miànduì zhèxiē kùnnan, wǒmen hécháng fàngqì guo?",
    exampleEn: "In the face of these difficulties, when have we ever given up?",
    tokens: ["面对", "这些", "困难", "，", "我们", "何尝", "放弃", "过", "？"],
    cloze: "我们一直坚持，＿＿放弃过？（Rhetorically deny ever giving up.）",
    options: ["经常", "何尝", "已经", "偶尔"],
    answer: 1,
    why: "何尝 creates a rhetorical denial that accords with 一直坚持. The alternatives assert occurrences instead of denying them.",
  },
  {
    id: "g9-scope-of-claim",
    level: 9,
    title: "Restrict an assessment to a domain",
    pattern: "就 + domain + 而言，bounded claim",
    explanation:
      "就…而言 specifies the dimension in which a claim applies. A favorable judgment about cost alone does not establish that a proposal is best overall.",
    exampleZh: "就长期维护而言，便宜的设备未必经济。",
    examplePinyin: "Jiù chángqī wéihù éryán, piányi de shèbèi wèibì jīngjì.",
    exampleEn:
      "In terms of long-term maintenance, inexpensive equipment is not necessarily economical.",
    tokens: [
      "就",
      "长期",
      "维护",
      "而言",
      "，",
      "便宜",
      "的",
      "设备",
      "未必",
      "经济",
      "。",
    ],
    cloze: "就短期成本＿＿，甲方案更低，但长期效果仍需比较。",
    options: ["以来", "以外", "而言", "之下"],
    answer: 2,
    why: "就短期成本而言 limits the comparison to short-term cost, leaving long-term effects open.",
  },
  {
    id: "g9-causal-attribution",
    level: 9,
    title: "Make a causal attribution explicit",
    pattern: "将 + outcome + 归因于 + proposed cause",
    explanation:
      "将…归因于… identifies the cause someone assigns to an outcome. The grammar reports an attribution; it does not establish that the proposed cause is scientifically proven.",
    exampleZh: "不能将所有差异都归因于个人努力。",
    examplePinyin: "Bù néng jiāng suǒyǒu chāyì dōu guīyīnyú gèrén nǔlì.",
    exampleEn: "We cannot attribute every difference to individual effort.",
    tokens: [
      "不",
      "能",
      "将",
      "所有",
      "差异",
      "都",
      "归因于",
      "个人",
      "努力",
      "。",
    ],
    cloze:
      "报告将销量下降＿＿渠道调整，而非产品质量。（Name the proposed cause.）",
    options: ["取决于", "着眼于", "区别于", "归因于"],
    answer: 3,
    why: "归因于 makes 渠道调整 the attributed cause of 下降. 取决于 has a different dependency structure and cannot follow 将销量下降 this way.",
  },
  {
    id: "g9-conditional-safeguard",
    level: 9,
    title: "Make a safeguard a prerequisite",
    pattern: "在 + safeguard + 的前提下，方能 + permitted result",
    explanation:
      "在…的前提下 states the prerequisite under which a claim or action is valid. 方能 is a formal 'only then can'; the frame prevents an unconditional recommendation.",
    exampleZh: "在数据得到保护的前提下，方能扩大共享范围。",
    examplePinyin:
      "Zài shùjù dédào bǎohù de qiántí xià, fāng néng kuòdà gòngxiǎng fànwéi.",
    exampleEn:
      "The scope of sharing can be expanded only if the data are protected.",
    tokens: [
      "在",
      "数据",
      "得到",
      "保护",
      "的",
      "前提",
      "下",
      "，",
      "方",
      "能",
      "扩大",
      "共享",
      "范围",
      "。",
    ],
    cloze:
      "在责任明确的前提下，＿＿扩大试点；责任不明时不得扩大。（Use a formal necessary-condition result.）",
    options: ["方能", "依旧", "反而", "何必"],
    answer: 0,
    why: "方能 says expansion is possible only once the prerequisite is met. The following prohibition makes that necessity explicit.",
  },
]

export const readings: ReadingPassage[] = [
  {
    id: "r1-library-bag",
    level: 1,
    title: "A bag in the library",
    text: "我叫小林，是学生。今天我在学校的图书馆。我的书在桌子上，包不在这里。老师说：“你的蓝色包在门口。”我去门口，包在那里。",
    translation:
      "My name is Xiaolin, and I am a student. Today I am in the school library. My book is on the table, but my bag is not here. The teacher says, 'Your blue bag is by the entrance.' I go to the entrance. The bag is there.",
    questions: [
      {
        prompt: "Who is Xiaolin?",
        options: ["A teacher", "A student", "A doctor", "A driver"],
        answer: 1,
        explanation: "The opening says 我叫小林，是学生: Xiaolin is a student.",
      },
      {
        prompt: "Where is the book?",
        options: ["In the bag", "By the entrance", "On the table", "At home"],
        answer: 2,
        explanation: "我的书在桌子上 explicitly locates the book on the table.",
      },
      {
        prompt: "What does Xiaolin find by the entrance?",
        options: [
          "A blue book",
          "The teacher's bag",
          "A red bag",
          "Xiaolin's blue bag",
        ],
        answer: 3,
        explanation:
          "The teacher identifies 你的蓝色包, and the ending confirms 包在那里.",
      },
    ],
  },
  {
    id: "r1-lunch-visit",
    level: 1,
    title: "Lunch with a friend",
    text: "今天是星期六。我十一点去朋友家。朋友叫安安，她妈妈也在家。我们吃米饭，喝茶。我不喝咖啡。下午一点，我们去学校。安安的书在学校。",
    translation:
      "Today is Saturday. I go to my friend's home at eleven. My friend's name is An'an, and her mother is also at home. We eat rice and drink tea. I do not drink coffee. At one in the afternoon, we go to school. An'an's book is at school.",
    questions: [
      {
        prompt: "When does the narrator visit An'an's home?",
        options: [
          "At eleven",
          "At one in the afternoon",
          "At eight",
          "At six in the evening",
        ],
        answer: 0,
        explanation: "我十一点去朋友家 gives eleven as the time of the visit.",
      },
      {
        prompt: "What does the narrator not drink?",
        options: ["Tea", "Coffee", "Water", "Milk"],
        answer: 1,
        explanation:
          "我不喝咖啡 states that the narrator does not drink coffee.",
      },
      {
        prompt: "Where is An'an's book?",
        options: [
          "At the narrator's home",
          "At her mother's workplace",
          "At school",
          "In a restaurant",
        ],
        answer: 2,
        explanation: "The final sentence says 安安的书在学校.",
      },
    ],
  },
  {
    id: "r2-shop-hours",
    level: 2,
    title: "An early visit to the bookshop",
    text: "星期日早上，我想去新开的书店。我八点到了，可是门还没开。门上的纸写着：“九点开门。”我给朋友打电话，她正在吃早饭。她说可以九点来。我去旁边的小店喝了一杯茶。九点，我们一起进了书店，各买了一本书。",
    translation:
      "On Sunday morning, I wanted to visit the newly opened bookshop. I arrived at eight, but the door was not open yet. A notice on the door said, 'We open at nine.' I called my friend; she was eating breakfast. She said she could come at nine. I went to the small shop next door and had a cup of tea. At nine, we entered the bookshop together and each bought a book.",
    questions: [
      {
        prompt: "Why could the narrator not enter at eight?",
        options: [
          "The shop had closed forever",
          "The narrator had no money",
          "The friend had the key",
          "The shop did not open until nine",
        ],
        answer: 3,
        explanation:
          "The notice reads 九点开门, and the narrator arrived at 八点.",
      },
      {
        prompt: "What was the friend doing during the call?",
        options: [
          "Eating breakfast",
          "Buying a book",
          "Drinking tea next door",
          "Opening the shop",
        ],
        answer: 0,
        explanation:
          "她正在吃早饭 describes what the friend was doing at that moment.",
      },
      {
        prompt: "What happened after both people entered?",
        options: [
          "They bought one book to share",
          "Each bought one book",
          "They left without buying anything",
          "They bought two cups of tea",
        ],
        answer: 1,
        explanation: "各买了一本书 means that each person bought one book.",
      },
    ],
  },
  {
    id: "r2-borrowed-umbrella",
    level: 2,
    title: "Returning an umbrella",
    text: "昨天晚上下雨了，我没带伞。邻居李阿姨给了我一把伞。我以前见过她，可是没跟她说过话。今天早上，我去她家还伞。她正在门口给花浇水。我说谢谢，她笑着说：“下次有困难，可以来找我。”下午，我买了水果送给她。",
    translation:
      "It rained last night, and I had not brought an umbrella. My neighbor, Auntie Li, gave me one. I had seen her before but had never spoken with her. This morning, I took the umbrella back to her home. She was watering flowers by the entrance. I thanked her, and she said with a smile, 'Next time you have a problem, you can come to me.' In the afternoon, I bought fruit and gave it to her.",
    questions: [
      {
        prompt: "Why did the narrator need an umbrella?",
        options: [
          "It was very sunny",
          "The narrator had brought a broken umbrella",
          "It rained and the narrator had no umbrella",
          "Auntie Li asked for a new umbrella",
        ],
        answer: 2,
        explanation:
          "昨天晚上下雨了，我没带伞 directly gives both the rain and the missing umbrella.",
      },
      {
        prompt: "What was true before last night's encounter?",
        options: [
          "They often ate together",
          "They had never seen each other",
          "They had spoken many times",
          "The narrator had seen Auntie Li but not spoken to her",
        ],
        answer: 3,
        explanation:
          "我以前见过她，可是没跟她说过话 distinguishes having seen her from having spoken to her.",
      },
      {
        prompt: "What did the narrator give her in the afternoon?",
        options: ["Fruit", "Flowers", "A new umbrella", "A book"],
        answer: 0,
        explanation: "The last sentence says 买了水果送给她.",
      },
    ],
  },
  {
    id: "r3-river-route",
    level: 3,
    title: "The route that looked shorter",
    text: "周六，小陈约朋友十点在博物馆门口见面。他查了地图，发现河边的路比大路短一点，就决定走河边。走到一半，他看见一块牌子：前面正在修桥，不能过去。他只好回到大路。虽然多走了二十分钟，但是他没有迟到，因为他出门很早。朋友听完以后说，下次除了看地图，还要看看路上的消息。",
    translation:
      "On Saturday, Xiao Chen arranged to meet a friend at the museum entrance at ten. He checked the map and found that the riverside route was a little shorter than the main road, so he chose it. Halfway along, he saw a sign: the bridge ahead was under repair and could not be crossed. He had to return to the main road. Although he walked an extra twenty minutes, he was not late because he had left home early. After hearing the story, his friend said that next time he should check road updates as well as the map.",
    questions: [
      {
        prompt: "Why did Xiao Chen choose the riverside route?",
        options: [
          "It had more shops",
          "The map showed it was a little shorter",
          "His friend was repairing the bridge",
          "The museum was beside his home",
        ],
        answer: 1,
        explanation:
          "河边的路比大路短一点 is the stated reason for his choice.",
      },
      {
        prompt: "Why was he still on time?",
        options: [
          "The bridge reopened immediately",
          "His friend changed the meeting time",
          "He left home early",
          "He took a taxi halfway",
        ],
        answer: 2,
        explanation:
          "The passage explicitly explains 没有迟到，因为他出门很早. No taxi or changed appointment is mentioned.",
      },
      {
        prompt: "What does the friend's advice suggest about the map?",
        options: [
          "It always shows bridge repairs",
          "It is useless for finding distances",
          "It shows the friend's location",
          "Route length alone does not show current road conditions",
        ],
        answer: 3,
        explanation:
          "除了看地图，还要看看路上的消息 suggests that the map's distance information was not enough to reveal the repair.",
      },
    ],
  },
  {
    id: "r3-plant-gift",
    level: 3,
    title: "A gift suited to a small room",
    text: "小许想给刚搬家的姐姐买礼物。姐姐的房间不大，桌子上已经放了电脑和几本书。小许先看了一盏大台灯，觉得有点占地方。他又看到一盆小花，卖花的人说这种花不用每天浇水。小许买了花，还写了一张卡片。姐姐收到后很高兴，把花放在窗边。她说自己每天早上都能看见它，房间也好看了一点。",
    translation:
      "Xiao Xu wanted to buy a gift for his older sister, who had just moved. Her room was small, and a computer and several books already occupied the desk. He first looked at a large desk lamp but thought it took up a little too much space. Then he saw a small flowering plant. The seller said it did not need watering every day. Xiao Xu bought it and wrote a card. His sister was pleased to receive it and put it by the window. She said she could see it every morning and that the room looked a little nicer.",
    questions: [
      {
        prompt: "Why did Xiao Xu decide against the large lamp?",
        options: [
          "It took up too much space",
          "His sister already owned the same lamp",
          "It was broken",
          "It needed daily watering",
        ],
        answer: 0,
        explanation:
          "He thought the lamp 有点占地方, after the passage described the small room and crowded desk.",
      },
      {
        prompt: "What did the seller say about the plant?",
        options: [
          "It needed a larger room",
          "It did not need watering every day",
          "It should stay on the desk",
          "It would never need water",
        ],
        answer: 1,
        explanation: "不用每天浇水 means not every day, not never.",
      },
      {
        prompt:
          "Which response shows that the gift fit the sister's daily life?",
        options: [
          "She replaced her computer with it",
          "She put it in a cupboard",
          "She could see it every morning by the window",
          "She asked Xiao Xu to return it",
        ],
        answer: 2,
        explanation:
          "The sister places it 窗边 and says 每天早上都能看见它, showing how it fits into her routine.",
      },
    ],
  },
  {
    id: "r4-library-zones",
    level: 4,
    title: "A library makes room for discussion",
    text: "区图书馆最近收到两种意见。准备考试的读者希望更安静，来做小组作业的学生却觉得没有地方讨论。管理员没有简单地禁止说话，而是把二楼的小房间改成讨论区，每组可以预约一小时。大厅仍然是安静阅读区，门口还放着提醒牌。新办法实行后，学生能一边查资料一边交流，其他读者也不再被讨论声打扰。不过，周末的小房间常常满员，图书馆正在记录预约情况，准备根据需要调整开放时间。",
    translation:
      "The district library recently received two kinds of feedback. Readers preparing for exams wanted more quiet, while students doing group assignments felt they had nowhere to discuss their work. Rather than simply ban talking, the librarian turned a small room upstairs into a discussion area; each group could reserve it for an hour. The main hall remained a quiet reading area, with a reminder sign at the entrance. Under the new arrangement, students could exchange ideas while consulting materials, and other readers were no longer disturbed by discussion. However, the small room was often fully booked at weekends, so the library was recording reservations and preparing to adjust opening hours according to demand.",
    questions: [
      {
        prompt: "管理员怎样回应两种不同的需要？",
        options: [
          "禁止所有学生进入",
          "把整个大厅改成讨论区",
          "停止接受预约",
          "设置讨论区，同时保留安静区",
        ],
        answer: 3,
        explanation:
          "The small room becomes 讨论区 while 大厅仍然是安静阅读区, preserving both functions.",
      },
      {
        prompt: "每组一次可以预约多长时间？",
        options: ["一小时", "半小时", "两小时", "一整天"],
        answer: 0,
        explanation: "每组可以预约一小时 gives the booking length explicitly.",
      },
      {
        prompt: "为什么还要记录预约情况？",
        options: [
          "证明读者不需要安静",
          "了解需求，再调整开放时间",
          "取消所有周末活动",
          "找出谁把提醒牌拿走了",
        ],
        answer: 1,
        explanation:
          "周末…常常满员 leads to recording bookings and 根据需要调整开放时间, rather than declaring the arrangement finished.",
      },
    ],
  },
  {
    id: "r4-shared-delivery",
    level: 4,
    title: "A shared collection point",
    text: "陈女士每天很晚下班，常常错过送货时间。她发现楼里的几位邻居也有这个问题，就提出在门口放一个带锁的柜子。起初，有人担心包裹会被拿错。大家商量后决定，柜子只放已经联系过收件人的包裹，每个包裹都贴上房号，贵重物品仍由本人签收。柜子用了一个月，错过送货的次数越来越少。陈女士并没有说所有问题都解决了，因为大件物品放不进去。她建议继续保留电话联系，不要完全依靠柜子。",
    translation:
      "Ms. Chen gets home from work very late and often misses deliveries. She found that several neighbors had the same problem and proposed a locked cabinet by the entrance. At first, some worried that parcels would be taken by the wrong person. After discussing it, they decided that the cabinet would hold only parcels whose recipients had already been contacted. Each parcel would carry an apartment number, and valuable items would still require the recipient's own signature. After a month, missed deliveries became less frequent. Ms. Chen did not claim that all problems were solved, because large items would not fit. She suggested keeping telephone contact rather than relying entirely on the cabinet.",
    questions: [
      {
        prompt: "陈女士提出柜子的主要原因是什么？",
        options: [
          "她想出售贵重物品",
          "她想让邻居停止购物",
          "她和几位邻居常错过送货",
          "楼里没有电话信号",
        ],
        answer: 2,
        explanation:
          "The opening states that she 常常错过送货时间 and several neighbors 也有这个问题.",
      },
      {
        prompt: "哪类物品仍需要本人签收？",
        options: [
          "所有贴房号的包裹",
          "所有小包裹",
          "柜子里的日用品",
          "贵重物品",
        ],
        answer: 3,
        explanation:
          "贵重物品仍由本人签收 gives this exception to cabinet collection.",
      },
      {
        prompt: "陈女士最后的建议说明了什么？",
        options: [
          "柜子有帮助，但不能处理所有送货情况",
          "柜子已经完全没有用处",
          "大件物品最适合放进柜子",
          "以后不必联系收件人",
        ],
        answer: 0,
        explanation:
          "Missed deliveries decrease, but 大件物品放不进去 and 不要完全依靠柜子 establish usefulness with limits.",
      },
    ],
  },
  {
    id: "r5-market-preorders",
    level: 5,
    title: "Ordering before the weekend market",
    text: "河边的周末市场过去常在收摊时剩下不少蔬菜。摊主为了让桌面看起来丰富，总是带来比实际需要更多的货。一位居民提出先登记订单，摊主再根据数量备货。有人担心，这样会使没有预约的人买不到东西。市场于是保留少量现场销售，并说明预订不是入场条件。试行四周后，剩菜明显减少，摊主的收入却没有下降。管理者没有马上把办法推广到所有摊位，因为蔬菜可以按份准备，手工艺品的购买习惯可能不同。他们决定先邀请更多蔬菜摊参加，同时记录临时顾客的意见，看看方便预订的人与临时来的人是否都得到了照顾。",
    translation:
      "The weekend market by the river used to have considerable vegetables left over at closing time. Vendors brought more stock than was actually needed to make their displays look abundant. A resident suggested registering orders first so vendors could prepare stock according to the quantities requested. Some worried that people without reservations would then be unable to buy anything. The market therefore retained a small amount for on-site sales and clarified that preordering was not a condition of entry. After a four-week trial, leftovers decreased markedly without a drop in vendor income. The managers did not immediately extend the method to every stall: vegetables could be prepared in portions, while handicraft purchasing habits might differ. They decided to invite more vegetable vendors first and record walk-in customers' opinions to see whether both those who could preorder and those who arrived spontaneously were being served.",
    questions: [
      {
        prompt: "市场为什么保留少量现场销售？",
        options: [
          "保证摊主每次都剩下蔬菜",
          "照顾没有预订的顾客",
          "取消登记订单的办法",
          "只允许临时顾客进入",
        ],
        answer: 1,
        explanation:
          "The concern was 没有预约的人买不到东西; retaining on-site stock answers that concern without making preordering an entry requirement.",
      },
      {
        prompt: "四周试行后，文中确认了哪项变化？",
        options: [
          "所有摊位都参加了",
          "手工艺品销量下降了",
          "剩菜减少，摊主收入没有下降",
          "临时顾客全部改为预订",
        ],
        answer: 2,
        explanation:
          "The stated result is 剩菜明显减少，摊主的收入却没有下降. The other changes are not reported.",
      },
      {
        prompt: "管理者没有立即全面推广，主要是因为他们认识到什么？",
        options: [
          "预订一定会损害收入",
          "市场已经不需要顾客意见",
          "手工艺品比蔬菜更容易按份准备",
          "一种商品的成功经验未必适合另一种商品",
        ],
        answer: 3,
        explanation:
          "They distinguish vegetables that 可以按份准备 from handicrafts whose 购买习惯可能不同, limiting the scope of the trial's evidence.",
      },
    ],
  },
  {
    id: "r5-oral-history",
    level: 5,
    title: "Learning to listen before recording",
    text: "大学生小陶参加社区的口述历史项目，原以为带上录音机就能完成采访。第一次见面时，他连续问了十几个问题，老人只给了很短的回答。负责老师提醒他，采访不是把问题全部念完，而是让对方有时间回忆。第二次，小陶先问老人年轻时最喜欢去哪里，然后顺着回答追问。老人谈起一家已经关闭的电影院，还拿出了旧票根。小陶没有立即把录音放到网上，而是整理文字后请老人确认，并让他选择哪些部分可以公开。最后公开的故事比原计划短，却保留了老人最想讲的经历。小陶发现，得到更多材料并不是采访的唯一目标，尊重讲述者的选择同样重要。",
    translation:
      "University student Xiao Tao joined a community oral-history project, initially assuming that bringing a recorder would be enough to complete an interview. At their first meeting, he asked more than ten questions in succession, and the older man gave only short answers. The supervising teacher reminded him that an interview was not about reading every question aloud but about giving the other person time to remember. At their second meeting, Xiao Tao first asked where the man most liked to go when he was young, then followed up on the answer. The man talked about a cinema that had closed and produced old ticket stubs. Instead of immediately uploading the recording, Xiao Tao prepared a transcript for the man to check and let him choose which parts could be made public. The published story was shorter than originally planned but retained the experiences the man most wanted to share. Xiao Tao realized that gathering more material was not an interview's only goal; respecting the storyteller's choices mattered just as much.",
    questions: [
      {
        prompt: "第二次采访时，小陶主要改变了什么？",
        options: [
          "根据老人的回答继续追问",
          "要求老人只回答是或不是",
          "把问题念得更快",
          "取消所有关于过去的问题",
        ],
        answer: 0,
        explanation:
          "He asks one opening question and 然后顺着回答追问, unlike the first interview's continuous list.",
      },
      {
        prompt: "录音公开前，老人获得了什么机会？",
        options: [
          "替所有邻居决定公开内容",
          "确认文字并选择可公开的部分",
          "要求电影院重新营业",
          "把录音改成大学考试题",
        ],
        answer: 1,
        explanation: "小陶请老人确认整理的文字，并让他选择哪些部分可以公开.",
      },
      {
        prompt: "为什么较短的成品仍可视为有价值？",
        options: [
          "短故事一定比长故事真实",
          "老师要求删除所有票根信息",
          "它保留了老人最想讲的经历并尊重其选择",
          "它证明采访不需要任何准备",
        ],
        answer: 2,
        explanation:
          "The ending emphasizes 保留了老人最想讲的经历 and 尊重讲述者的选择, not length as the sole measure of success.",
      },
    ],
  },
  {
    id: "r6-commute-survey",
    level: 6,
    title: "Who answered the commuting survey?",
    text: "一家企业准备调整班车路线，先在内部网站上做了问卷。结果显示，大多数答卷者支持取消最早的一班车，管理层因此认为这项调整不会带来明显不便。负责核查的员工小周却发现，问卷只开放了两个工作日，而上早班的工人通常不在工作时使用电脑。他走到车间，听到几位工人说，最早的班车是他们按时到岗的唯一选择。小周并没有据此断言原问卷完全无效，而是建议补充纸质调查，并分别统计不同班次的需求。补充调查后，公司保留了早班车，同时合并了两条利用率较低的午间路线。会议记录还写明，节省费用只是目标之一，不能以少数人的出行困难作为默认代价。小周认为，重要的不是让数字显得整齐，而是弄清楚数字代表了谁，又遗漏了谁。",
    translation:
      "A company preparing to adjust its shuttle routes first ran a questionnaire on its internal website. Most respondents supported canceling the earliest shuttle, so management believed the change would not cause significant inconvenience. Xiao Zhou, the employee checking the findings, noticed that the survey had been open for only two working days and that early-shift workers generally did not use computers at work. He went to the workshop and heard several workers explain that the earliest shuttle was their only way to arrive on time. He did not conclude from this that the original survey was wholly invalid; instead, he recommended a supplementary paper survey and separate counts of demand for different shifts. After the additional survey, the company retained the early shuttle and merged two less-used midday routes. The meeting minutes also stated that saving money was only one goal and that travel difficulties for a minority should not be treated as an assumed cost. Xiao Zhou believed the important thing was not making the figures look tidy but understanding whom they represented and whom they omitted.",
    questions: [
      {
        prompt: "小周认为原问卷的主要风险是什么？",
        options: [
          "所有答卷者都故意撒谎",
          "班车没有固定路线",
          "调查持续时间太长",
          "部分重要使用者可能没有被充分纳入",
        ],
        answer: 3,
        explanation:
          "The short online window and early-shift workers' lack of computer use suggest underrepresentation, not dishonesty by respondents.",
      },
      {
        prompt: "补充调查后，公司采取了哪种做法？",
        options: [
          "保留早班车，合并两条午间路线",
          "取消全部班车",
          "只保留问卷支持最多的一条路线",
          "把早班工人全部调到午班",
        ],
        answer: 0,
        explanation:
          "The passage explicitly reports 保留了早班车，同时合并了两条…午间路线.",
      },
      {
        prompt: "结尾对数字的态度最接近哪一项？",
        options: [
          "只要多数支持，就不必了解少数需求",
          "数字有价值，但必须检查其代表范围",
          "面对不便时应完全放弃调查",
          "纸质调查永远比网络调查准确",
        ],
        answer: 1,
        explanation:
          "Xiao Zhou does not call the original survey 完全无效 and asks whom the numbers represent or omit, supporting scrutiny rather than rejection of data.",
      },
    ],
  },
  {
    id: "r6-community-course",
    level: 6,
    title: "A course that was free but not equally accessible",
    text: "街道开设了一门免费的手机使用课，宣传海报上写着“人人都能轻松参加”。报名却必须扫描二维码，再在网页上填写资料。课程开始后，工作人员发现，来的多是已经会使用手机的人，最需要帮助的几位老人反而没有出现。一位志愿者指出，免费并不意味着没有门槛，报名方式本身就可能挡住目标学员。街道随后增加电话报名和现场登记，还把课堂安排在一楼活动室。为照顾听力较弱的人，老师放慢了讲解速度，并提供大字步骤卡。第二期到课人数增加了，但团队没有把人数增长直接当成学习成功。他们在两周后回访，询问学员能否独立完成一次挂号。有些人已经做到了，有些仍需帮助。团队据此增加了小组练习，而没有继续承诺所有人都能“轻松”掌握。",
    translation:
      "A neighborhood office offered a free course on using smartphones, with a poster promising that 'everyone can easily participate.' Registration, however, required scanning a QR code and filling in an online form. Once the course began, staff found that most attendees already knew how to use smartphones, while several older people who most needed help had not come. A volunteer pointed out that free did not mean barrier-free: registration itself could exclude the intended learners. The office added telephone registration and an in-person sign-up option, and moved classes to a ground-floor activity room. To accommodate people with reduced hearing, the teacher slowed the explanations and provided large-print instruction cards. Attendance rose in the second round, but the team did not equate increased numbers with successful learning. Two weeks later, they followed up to ask whether learners could independently make a medical appointment. Some could, while others still needed help. The team therefore added small-group practice instead of continuing to promise that everyone would master the skills 'easily.'",
    questions: [
      {
        prompt: "为什么“免费”仍不足以保证参加机会？",
        options: [
          "课程只招收年轻人",
          "老师要求学员购买新手机",
          "网上报名会排除部分不会操作手机的人",
          "活动室不允许老人进入",
        ],
        answer: 2,
        explanation:
          "The required QR code and online form create precisely the skill barrier the course is meant to address.",
      },
      {
        prompt: "团队为什么没有只看第二期的到课人数？",
        options: [
          "他们不再关心课程效果",
          "人数增长证明所有人都掌握了",
          "他们打算停止回访",
          "参加课程不等于能够独立完成实际任务",
        ],
        answer: 3,
        explanation:
          "The follow-up checks independent appointment booking, separating 到课人数 from real-world capability.",
      },
      {
        prompt: "最后增加小组练习的依据是什么？",
        options: [
          "回访显示部分学员仍需帮助",
          "所有学员都拒绝使用步骤卡",
          "第一期学员全部通过考试",
          "海报已经承诺不用练习",
        ],
        answer: 0,
        explanation:
          "有些仍需帮助 is the follow-up finding that leads to additional small-group practice.",
      },
    ],
  },
  {
    id: "r7-river-lighting",
    level: 7,
    title: "Lighting a river path without erasing the night",
    text: "河边步道改造之初，设计单位建议安装连续照明，使夜间散步更安全。方案公布后，一些居民表示赞成，附近的自然观察小组却提出，过强的灯光可能干扰昆虫和鸟类。双方最初都认为对方只顾自己的需要。街道没有立即选择一方，而是安排共同踏查：居民指出几处台阶和转弯，观察小组则标出了动物活动较集中的区域。讨论逐渐从“要不要灯”转向“哪里需要怎样的灯”。修改后的方案在危险路段设置向下照射的灯具，在生态敏感区降低亮度，并在深夜缩短照明时段。试运行期间，街道同时收集跌倒事件和动物活动的记录。有人希望马上宣布改造成功，负责人却提醒，短期没有事故并不足以证明长期效果，动物活动也会随季节变化。项目因此保留了可调整的设置，而不是把第一版亮度固定下来。这次讨论没有消除所有分歧，却让原本相互指责的人有了可以共同核查的问题。",
    translation:
      "At the start of the riverside path renovation, the design firm proposed continuous lighting to make evening walks safer. Some residents supported the published plan, while a nearby nature-observation group warned that excessive light might disturb insects and birds. Initially, each side thought the other was considering only its own needs. Instead of choosing a side immediately, the neighborhood office organized a joint site walk: residents identified steps and bends, and the observation group marked areas with concentrated animal activity. The discussion shifted from 'whether to have lights' to 'where and what kind of lighting was needed.' The revised plan installed downward-facing lights on hazardous sections, reduced brightness in ecologically sensitive areas, and shortened late-night lighting hours. During the trial, the office collected records of both falls and animal activity. Some wanted to declare immediate success, but the project leader noted that a short period without accidents could not establish long-term effectiveness and that animal activity also changed with the seasons. The project therefore retained adjustable settings rather than fixing the first brightness level permanently. The discussion did not eliminate all disagreement, but it gave people who had blamed one another questions they could investigate together.",
    questions: [
      {
        prompt: "共同踏查如何改变了争论？",
        options: [
          "让自然观察小组撤回所有意见",
          "把抽象的支持或反对转为具体位置和照明方式的讨论",
          "证明夜间步道完全不需要灯",
          "使居民不再有发言机会",
        ],
        answer: 1,
        explanation:
          "The text explicitly shifts from 要不要灯 to 哪里需要怎样的灯 after both groups identify specific sites.",
      },
      {
        prompt: "为什么负责人反对立即宣布长期成功？",
        options: [
          "试运行已经证明灯具无法使用",
          "所有危险路段都没有照明",
          "短期事故记录和季节性动物变化不足以确定长期效果",
          "居民拒绝提供任何记录",
        ],
        answer: 2,
        explanation:
          "The leader cites 短期没有事故并不足以证明长期效果 and seasonal changes in animal activity, two limits on the evidence.",
      },
      {
        prompt: "保留可调整设置反映了怎样的决策方式？",
        options: [
          "认为任何记录都没有意义",
          "准备无条件恢复原方案",
          "只按最响亮的意见行动",
          "根据后续证据继续修正，而非把初步方案当成定论",
        ],
        answer: 3,
        explanation:
          "Ongoing records and adjustable settings allow revision; the final paragraph does not claim that every disagreement has been resolved.",
      },
    ],
  },
  {
    id: "r7-repair-workshop",
    level: 7,
    title: "What a repair workshop really saves",
    text: "社区开办维修工坊，希望减少旧物被过早丢弃。宣传时，有人建议把“修复件数”作为唯一成绩，因为它直观又便于比较。负责工坊的阿梅却发现，一位老人每周都带同一台收音机来，并不是因为机器反复损坏，而是想学会自己检查接触不良。若只统计完成的维修，这种逐渐获得能力的过程几乎不会出现。另一些物品虽然能够修好，所需零件却难以取得，志愿者还要花大量时间寻找替代品。阿梅因此提出同时记录物品继续使用的时间、参与者学到的技能和志愿者投入的工时。新的记录办法并不轻松，也有人担心它会增加负担。工坊便先选取少量案例，说明记录用途，并允许参与者拒绝留下个人经历。几个月后，大家发现，有些维修数量不高的活动反而形成了稳定的互助关系。阿梅没有据此否定件数指标，而是把它放回适当的位置：它能说明一部分产出，却不能独自回答工坊究竟为社区保存了什么。",
    translation:
      "A community opened a repair workshop to reduce premature disposal of old belongings. During publicity planning, someone suggested making the number of repaired items its sole achievement measure because it was intuitive and easy to compare. The organizer, Amei, noticed that an older man brought the same radio every week, not because it kept breaking but because he wanted to learn how to check a loose electrical connection himself. A count of completed repairs would barely capture that gradual development of capability. Some other items were repairable, but their parts were hard to obtain, and volunteers spent considerable time finding substitutes. Amei therefore proposed also recording how long objects remained in use, the skills participants learned, and volunteers' working hours. The new system was not easy, and some worried it would add a burden. The workshop began with a small selection of cases, explained the records' purpose, and allowed participants to decline to leave personal accounts. After several months, people found that some activities with low repair counts had nevertheless created stable mutual-help relationships. Amei did not reject the item-count measure on that basis; she put it in its proper place: it described part of the output but could not alone explain what the workshop preserved for the community.",
    questions: [
      {
        prompt: "老人反复带来同一台收音机，主要是为了什么？",
        options: [
          "学习自己检查接触问题",
          "证明志愿者每次都修坏机器",
          "增加工坊的维修统计",
          "要求工坊买一台新收音机",
        ],
        answer: 0,
        explanation:
          "The passage denies repeated breakdown and explicitly gives 想学会自己检查接触不良 as his purpose.",
      },
      {
        prompt: "工坊怎样处理增加记录负担的担忧？",
        options: [
          "强制记录所有人的完整经历",
          "先选少量案例并允许拒绝留下个人经历",
          "立即取消全部统计",
          "只记录容易修好的物品",
        ],
        answer: 1,
        explanation:
          "The response is a small initial sample, explanation of purpose, and permission to refuse personal-history recording.",
      },
      {
        prompt: "阿梅对“修复件数”的最终立场是什么？",
        options: [
          "件数越少，社区价值一定越高",
          "任何可比较的指标都应废除",
          "保留它，但不把它当作衡量全部价值的唯一尺度",
          "它足以解释互助关系和学习过程",
        ],
        answer: 2,
        explanation:
          "她没有…否定件数指标 but says it captures 一部分产出, not the whole community value.",
      },
    ],
  },
  {
    id: "r8-feedback-silence",
    level: 8,
    title: "Silence is not the same as agreement",
    text: "一所学校试行新的选课制度，公布问卷结果时强调，九成答卷者没有提出反对意见。校方据此称制度“获得广泛认可”。学生研究小组复核后指出，问卷把“没有意见”与“赞成”放在同一选项中，而且不少尚未选到课程的学生没有收到调查链接。校方起初认为，小组是在否定改革取得的效率提升。小组却把问题区分为两层：系统是否缩短了办理时间，与学生是否认可分配规则，并不是同一个判断。前者可以通过操作记录核查，后者则需要让受影响的人充分表达。为避免争论停留在立场对抗，双方约定重新设计问卷，分别询问使用体验、规则理解和分配公平，并为未成功选课者设置独立入口。新调查显示，多数人肯定操作更快，但对热门课程的分配仍有明显分歧。学校保留了系统，却修改了抽签规则，还公开了修改所依据的意见。研究小组没有声称新的规则已经公平无缺，而是要求下学期继续追踪。此事说明，承认一项改革具有某种优点，并不等于接受对它的所有评价；辨明评价对象，反而可能为改进留下空间。",
    translation:
      "A school piloted a new course-selection system. When announcing the survey results, it emphasized that ninety percent of respondents had expressed no objection and described the system as 'widely endorsed.' A student research group found that the questionnaire combined 'no opinion' and 'support' in one response option, and that many students who had not secured a course never received the survey link. The school initially thought the group was denying the reform's efficiency gains. The group distinguished two questions: whether the system shortened processing time and whether students endorsed the allocation rules. The former could be checked through operation logs; the latter required adequate opportunities for affected students to speak. To avoid a clash of positions, the two sides agreed to redesign the survey, asking separately about user experience, understanding of the rules, and allocation fairness, with a separate entry point for unsuccessful applicants. The new survey found that most people appreciated faster operation, but considerable disagreement remained over allocation of popular courses. The school retained the system, revised the lottery rules, and disclosed the feedback behind the changes. The group did not claim the new rules were perfectly fair; it asked for follow-up next term. The case shows that acknowledging one advantage of a reform does not mean accepting every assessment of it; identifying exactly what is being evaluated can instead leave room for improvement.",
    questions: [
      {
        prompt: "“九成答卷者没有提出反对意见”为何不足以支持“广泛认可”？",
        options: [
          "九成永远不能代表多数",
          "学校没有任何操作记录",
          "学生研究小组反对所有数字服务",
          "选项混合了不同态度，且部分受影响者未被纳入",
        ],
        answer: 3,
        explanation:
          "The response option merges 没有意见 with 赞成, and unsuccessful applicants were omitted; both undermine that inference without denying faster operation.",
      },
      {
        prompt: "小组区分两个判断的主要作用是什么？",
        options: [
          "避免把效率提升当作规则公平已获认可的证据",
          "证明办理时间与制度评价完全无关",
          "要求学校恢复全部旧系统",
          "把热门课程排除在调查之外",
        ],
        answer: 0,
        explanation:
          "The group distinguishes processing-time evidence from endorsement of allocation rules, allowing each claim to be checked on its own terms.",
      },
      {
        prompt: "学校与小组最后共同形成了哪种改进路径？",
        options: [
          "宣布新规则再无争议并结束调查",
          "保留已显示的优点，修改有争议的规则并继续追踪",
          "只调查成功选课者以提高认可比例",
          "用系统速度决定所有课程归属",
        ],
        answer: 1,
        explanation:
          "The school retains the system, revises the lottery, discloses the basis, and the group requests continued tracking next term.",
      },
    ],
  },
  {
    id: "r8-open-data",
    level: 8,
    title: "When open data need a boundary",
    text: "某市准备公开公共服务的使用数据，希望研究者据此发现资源配置中的不足。初稿只删除姓名，却保留了精确日期、住址片区和少见的服务类型。负责审查的工作人员指出，若把这些信息与公开报道结合，个别使用者仍可能被识别。支持公开的人担心，过度处理数据会使研究失去价值；关注隐私的人则强调，服务对象从未同意承担这种额外风险。讨论没有以“公开”或“保密”二选一结束。团队将常见项目按月汇总，对人数极少的类别合并处理，并为确需细节的研究设置受约束的申请渠道。申请者须说明目的、保存期限和安全措施，研究结果公开前还要检查是否暴露个人。有人把新流程批评为效率低下，审查人员承认它增加了工作，却指出速度并非唯一标准。若信任受损，居民可能不再如实提供信息，未来的数据质量也会下降。新办法仍有待检验：汇总会损失多少分析能力，申请渠道是否真正平等，都需要持续评估。公开的价值没有被否定，而是被置于保护使用者与说明用途的前提之下。",
    translation:
      "A city planned to release public-service usage data so researchers could identify weaknesses in resource allocation. The draft removed names but retained exact dates, residential areas, and rare service types. A reviewer noted that, combined with public reports, these details could still identify individual users. Advocates of disclosure worried that excessive processing would destroy research value, while privacy advocates emphasized that service users had never agreed to bear this additional risk. The discussion did not end with a binary choice between disclosure and secrecy. The team aggregated common services by month, combined categories with very few users, and created a controlled application process for research genuinely requiring detail. Applicants had to explain their purpose, retention period, and safeguards, and research outputs would be checked for exposure of individuals before publication. Some criticized the new process as inefficient. Reviewers acknowledged the extra work but argued that speed was not the only standard: lost trust might cause residents to stop providing truthful information, reducing future data quality. The method still needed testing, including how much analytical power aggregation lost and whether access was genuinely equitable. The value of disclosure was not rejected; it was made conditional on protecting users and explaining the purpose.",
    questions: [
      {
        prompt: "删除姓名后，初稿为什么仍可能暴露个人？",
        options: [
          "所有公共报道都会直接列出姓名",
          "按月汇总必然公开个人住址",
          "保留的细节可与外部信息结合识别个别人",
          "研究者已经获得所有人的同意",
        ],
        answer: 2,
        explanation:
          "Exact dates, areas, and rare services can be linked to 公开报道; removing names alone does not remove re-identification risk.",
      },
      {
        prompt: "新办法怎样回应公开与隐私之间的张力？",
        options: [
          "完全禁止任何数据研究",
          "不作处理地公开所有细节",
          "只允许管理者自行解释数据",
          "公开汇总信息，并为必要的细节研究设置受约束渠道",
        ],
        answer: 3,
        explanation:
          "The plan combines monthly aggregation and category merging with a controlled detail-access route, rather than choosing total openness or secrecy.",
      },
      {
        prompt: "关于信任与数据质量的论述在文中起什么作用？",
        options: [
          "说明保护隐私也可能维护长期研究价值",
          "证明新办法已经没有分析损失",
          "说明效率低下总是值得赞扬",
          "证明居民一定会停止使用全部服务",
        ],
        answer: 0,
        explanation:
          "The conditional chain 信任受损→不再如实提供信息→数据质量下降 links privacy protection with future evidence quality; it is not a claim that the harm has already occurred.",
      },
    ],
  },
  {
    id: "r9-station-memory",
    level: 9,
    title: "Whose past does a station preserve?",
    text: "旧车站改建为文化中心时，设计团队打算保留钟楼和候车大厅，并以此证明项目尊重了地方记忆。方案在公开讨论中获得不少赞许，一位退休售票员却问：“如果只留下最适合拍照的部分，谁还会知道这里怎样运转？”她提到夜班工人的休息室、临时售票窗口和旅客寻找失物的走廊。这些空间并不壮观，却承载了日常劳动与相互照应的经历。团队起初担心，保存所有细节会使改建无法推进。历史研究者则指出，争论未必在于全部保留还是全部拆除，而在于由谁决定哪些经历值得被讲述。随后，项目邀请不同岗位的退休职工、附近居民和曾经通勤的乘客共同选择展示内容。部分原有空间仍被改造，但其用途通过平面图、声音记录和经授权的个人故事得到说明。与此同时，团队公开了取舍理由，也保留了未被采用的建议，供以后复议。有人认为这种做法削弱了统一的展览叙事，负责人承认展示不再那么简洁，却不愿把简洁当作排除异议的依据。文化中心开幕并非讨论的终点：新的观众可能提出此前未被看见的经历。保护记忆由此不只是保存几件物体，更是让有关过去的解释保持可质疑、可补充的状态。至于这些机制能否持续运作，仍取决于管理者是否愿意在热闹的开幕之后继续投入时间。",
    translation:
      "When an old station was converted into a cultural center, the design team planned to preserve the clock tower and waiting hall as proof that the project respected local memory. The proposal received considerable praise at a public discussion, but a retired ticket clerk asked, 'If only the most photogenic parts remain, who will know how this place actually worked?' She mentioned the night workers' rest room, temporary ticket windows, and the corridor where passengers searched for lost belongings. These spaces were not spectacular, but they carried experiences of everyday labor and mutual care. The team initially worried that preserving every detail would prevent redevelopment. A historian suggested that the issue was not necessarily saving everything or demolishing everything, but who decided which experiences deserved telling. The project then invited retired workers from different roles, nearby residents, and former commuters to choose display content together. Some original spaces were still altered, but their uses were explained through floor plans, audio records, and authorized personal stories. The team published the reasons for its choices and retained unadopted suggestions for future reconsideration. Some felt this weakened a unified exhibition narrative. The leader acknowledged that the display was less concise but refused to use simplicity as a reason to exclude dissent. Opening the center was not the end of the discussion: new visitors might contribute previously unseen experiences. Preserving memory thus meant not only keeping a few objects but allowing interpretations of the past to remain open to challenge and additions. Whether those mechanisms would continue depended on managers investing time after the excitement of the opening.",
    questions: [
      {
        prompt: "退休售票员的提问主要挑战了哪种假设？",
        options: [
          "车站从未有过日常劳动",
          "保留醒目建筑就足以代表地方记忆",
          "所有旧空间都不能改造",
          "游客不应拍摄文化中心",
        ],
        answer: 1,
        explanation:
          "Her contrast between photogenic features and ordinary workspaces challenges whether the clock tower and hall alone represent local memory, not whether every space must remain unchanged.",
      },
      {
        prompt: "保留未被采用的建议，与结尾的论点有何关系？",
        options: [
          "表明项目不愿作出任何决定",
          "保证所有建议最终都会实施",
          "为解释的补充和取舍的复议留下制度空间",
          "证明统一叙事完全没有价值",
        ],
        answer: 2,
        explanation:
          "Retained suggestions are explicitly 供以后复议, supporting an account of memory that stays 可质疑、可补充.",
      },
      {
        prompt: "作者对项目的最终评价最接近哪一项？",
        options: [
          "开幕已证明长期机制成功",
          "只要保存声音就不必投入管理",
          "叙事复杂化意味着项目失败",
          "方向具有价值，但持续效果取决于后续投入",
        ],
        answer: 3,
        explanation:
          "The ending approves open interpretation while making continued operation conditional on management time after the opening; it does not claim verified long-term success.",
      },
    ],
  },
  {
    id: "r9-performance-model",
    level: 9,
    title: "What a faster service score leaves out",
    text: "一家服务机构引入自动评分模型，按每位员工处理请求的速度安排奖励。试行报告显示，平均等待时间下降，管理层于是准备把模型作为主要考核依据。一名员工提出，系统没有区分请求的复杂程度：帮助一位语言不熟练的来访者，往往需要反复解释；处理一个资料齐全的申请，则可能几分钟就能结束。若把速度直接等同于贡献，耐心处理复杂问题的人反而可能被视为效率低下。模型开发者回应，只要加入更多变量，就能消除偏差。员工代表并未否认改进变量的必要性，却指出，哪些因素值得计算，本身就是关于服务目标的判断，而非纯粹的技术选择。双方随后抽取案例，比较速度评分与服务是否真正完成的差异，还邀请来访者说明他们认为有帮助的环节。结果发现，有些快速结案只是把困难转移到下一次来访，并未减少总耗时。机构因此保留等待时间指标，却降低其奖励权重，增加问题解决情况的人工复核，并设置申诉渠道。新办法仍可能带来额外成本，也不能保证复核完全公正。报告最终不再宣称模型已经“客观衡量贡献”，而是说明它只能提供部分线索，考核责任仍由机构承担。与其把争论理解为技术与人工之间的胜负，不如说它迫使管理者公开回答：他们究竟希望奖励哪一种服务，又愿意为这种选择承担什么代价。",
    translation:
      "A service organization introduced an automated scoring model that assigned rewards according to how quickly employees handled requests. The pilot report showed a decline in average waiting time, and management planned to make the model its main assessment basis. An employee noted that the system did not distinguish request complexity: helping someone with limited language proficiency might require repeated explanations, while an application with complete documents could be finished in minutes. Equating speed with contribution could penalize people who patiently handled complex problems. Developers replied that adding more variables would eliminate bias. Employee representatives did not deny the need to improve variables, but argued that deciding which factors deserved measurement was itself a judgment about service goals, not a purely technical choice. The parties sampled cases, comparing speed scores with whether service was truly completed, and invited visitors to describe helpful aspects. They found that some quick closures merely shifted difficulties to the next visit without reducing total time. The organization retained waiting time as a measure, lowered its reward weighting, added human review of problem resolution, and created an appeal process. The new approach could still cost more and could not guarantee perfectly fair review. The final report no longer claimed that the model 'objectively measured contribution'; it explained that the model provided only partial evidence and that assessment responsibility remained with the organization. Rather than a contest between technology and humans, the dispute forced managers to state what kind of service they wished to reward and what costs they were willing to accept.",
    questions: [
      {
        prompt: "“快速结案”与“减少总耗时”的区别揭示了什么？",
        options: [
          "局部速度指标可能掩盖尚未解决的问题",
          "任何快速服务都没有实际价值",
          "所有复杂请求都应拒绝处理",
          "平均等待时间从未下降",
        ],
        answer: 0,
        explanation:
          "Some quick closures transfer problems to a later visit, showing that a local speed gain can coexist with unchanged total work. The text does report lower average waiting time.",
      },
      {
        prompt: "员工代表为什么不接受“增加变量即可消除偏差”作为充分回答？",
        options: [
          "他们认为变量不可能改进",
          "选择测量什么还涉及服务价值与目标的判断",
          "他们已经证明人工复核绝对公平",
          "他们希望完全取消所有技术工具",
        ],
        answer: 1,
        explanation:
          "They accept variable improvement but argue that deciding 哪些因素值得计算 is a judgment about 服务目标, beyond a purely technical fix.",
      },
      {
        prompt: "结尾将责任留给机构，意味着什么？",
        options: [
          "开发者必须独自决定奖励目标",
          "模型输出可以自动免除管理责任",
          "机构须解释取舍，不能把价值选择伪装成模型的客观结论",
          "有申诉渠道就不再需要复核",
        ],
        answer: 2,
        explanation:
          "The revised report calls model outputs partial clues and asks management to state which service it rewards and at what cost; the appeal channel does not guarantee perfect fairness.",
      },
    ],
  },
]

// Additional connected passages also work as listening scripts.
readings.push(
  {
    id: "r1-two-jobs",
    level: 1,
    title: "Two friends after work",
    text: "小王是医生，小李是老师。他们是朋友。今天小王在医院，小李在学校。下午六点，他们去小王家吃饭。小李喝茶，小王喝水。他们都不喝咖啡。",
    translation:
      "Xiao Wang is a doctor, and Xiao Li is a teacher. They are friends. Today Xiao Wang is at the hospital and Xiao Li is at school. At six in the afternoon, they go to Xiao Wang's home for dinner. Xiao Li drinks tea, and Xiao Wang drinks water. Neither drinks coffee.",
    questions: [
      {
        prompt: "What does Xiao Li do?",
        options: ["Doctor", "Teacher", "Driver", "Student"],
        answer: 1,
        explanation: "小李是老师 identifies Xiao Li as a teacher.",
      },
      {
        prompt: "Where do they eat dinner?",
        options: [
          "At school",
          "At the hospital",
          "At Xiao Wang's home",
          "At Xiao Li's home",
        ],
        answer: 2,
        explanation: "他们去小王家吃饭 gives the dinner location.",
      },
      {
        prompt: "What does Xiao Wang drink?",
        options: ["Tea", "Coffee", "Milk", "Water"],
        answer: 3,
        explanation: "小王喝水 states that Xiao Wang drinks water.",
      },
    ],
  },
  {
    id: "r1-grandmother",
    level: 1,
    title: "A visit to Grandma",
    text: "星期天，我和妈妈去奶奶家。奶奶家有一个小花园。爸爸不去，他在家工作。我们十点到奶奶家，十二点吃饭。奶奶说：“下个星期，爸爸也来吧。”",
    translation:
      "On Sunday, Mom and I go to Grandma's home. Grandma has a small garden. Dad does not go; he works at home. We arrive at Grandma's at ten and eat at twelve. Grandma says, 'Next week, let Dad come too.'",
    questions: [
      {
        prompt: "Who visits Grandma this Sunday?",
        options: [
          "The narrator and Mom",
          "Dad and Mom",
          "Only Dad",
          "The narrator and a teacher",
        ],
        answer: 0,
        explanation: "我和妈妈去奶奶家 names the two visitors.",
      },
      {
        prompt: "Why does Dad not go?",
        options: [
          "He is at school",
          "He is working at home",
          "He is in the garden",
          "He is eating at a restaurant",
        ],
        answer: 1,
        explanation: "爸爸不去，他在家工作 explains his absence.",
      },
      {
        prompt: "When do the visitors eat?",
        options: ["At ten", "At six", "At twelve", "At eight"],
        answer: 2,
        explanation: "十二点吃饭 gives the mealtime, not the arrival time.",
      },
    ],
  },
  {
    id: "r1-station-ticket",
    level: 1,
    title: "Finding a ticket",
    text: "我和哥哥在车站。哥哥的票在包里，我的票不在包里。我问：“我的票在哪里？”哥哥说：“在你的书里。”我打开书，票在那里。我们的车九点开。",
    translation:
      "My older brother and I are at the station. His ticket is in his bag, but mine is not in my bag. I ask, 'Where is my ticket?' He says, 'In your book.' I open the book, and the ticket is there. Our train leaves at nine.",
    questions: [
      {
        prompt: "Where are the two people?",
        options: ["At school", "At a bookshop", "At home", "At the station"],
        answer: 3,
        explanation: "我和哥哥在车站 gives their location.",
      },
      {
        prompt: "Where is the narrator's ticket?",
        options: [
          "In the narrator's book",
          "In the brother's bag",
          "On a chair",
          "At home",
        ],
        answer: 0,
        explanation:
          "The brother says 在你的书里, and opening the book confirms it.",
      },
      {
        prompt: "When does their train leave?",
        options: ["At eight", "At nine", "At ten", "At twelve"],
        answer: 1,
        explanation: "我们的车九点开 gives nine as the departure time.",
      },
    ],
  },
  {
    id: "r1-fruit-shop",
    level: 1,
    title: "Fruit for the family",
    text: "今天我去商店买水果。妈妈喜欢苹果，爸爸喜欢香蕉。我买三个苹果和两个香蕉。我不买西瓜，家里有一个。下午，我和妹妹在家吃水果，喝水。",
    translation:
      "Today I go to the shop to buy fruit. Mom likes apples, and Dad likes bananas. I buy three apples and two bananas. I do not buy a watermelon because there is one at home. In the afternoon, my younger sister and I eat fruit and drink water at home.",
    questions: [
      {
        prompt: "Which fruit does Mom like?",
        options: ["Bananas", "Watermelon", "Apples", "Oranges"],
        answer: 2,
        explanation: "妈妈喜欢苹果 states Mom's preference.",
      },
      {
        prompt: "Why does the narrator not buy a watermelon?",
        options: [
          "Dad dislikes it",
          "The shop has none",
          "It costs too much",
          "There is already one at home",
        ],
        answer: 3,
        explanation: "我不买西瓜，家里有一个 gives the reason.",
      },
      {
        prompt: "Who eats fruit with the narrator in the afternoon?",
        options: ["The younger sister", "Dad", "Mom", "A friend"],
        answer: 0,
        explanation: "我和妹妹在家吃水果 identifies the companion.",
      },
    ],
  },
  {
    id: "r1-cats-at-home",
    level: 1,
    title: "Two cats at home",
    text: "我家有两只猫。白猫叫小米，黑猫叫小黑。早上，小米在椅子上，小黑在门口。我给它们水和鱼。晚上，两只猫都在我的房间里。它们不是我的，是姐姐的。",
    translation:
      "There are two cats in my home. The white cat is called Xiaomi, and the black cat is Xiaohei. In the morning, Xiaomi is on a chair and Xiaohei is by the entrance. I give them water and fish. At night, both cats are in my room. They are not mine; they belong to my older sister.",
    questions: [
      {
        prompt: "Which cat is by the entrance in the morning?",
        options: ["Xiaomi", "Xiaohei", "Both cats", "Neither cat"],
        answer: 1,
        explanation: "小黑在门口 places the black cat there.",
      },
      {
        prompt: "Who owns the cats?",
        options: [
          "The narrator",
          "The younger brother",
          "The older sister",
          "The neighbor",
        ],
        answer: 2,
        explanation: "它们不是我的，是姐姐的 explicitly identifies the owner.",
      },
      {
        prompt: "Where are both cats at night?",
        options: [
          "In the garden",
          "At the entrance",
          "On the kitchen table",
          "In the narrator's room",
        ],
        answer: 3,
        explanation:
          "晚上，两只猫都在我的房间里 gives their nighttime location.",
      },
    ],
  },
  {
    id: "r1-language-partner",
    level: 1,
    title: "A new language partner",
    text: "我的新朋友叫玛丽。她学中文，我学英文。星期三晚上，我们在网上见面。我说中文，她说英文。我们八点开始，九点结束。星期五，我们也一起学习。",
    translation:
      "My new friend is Mary. She studies Chinese, and I study English. On Wednesday evening, we meet online. I speak Chinese, and she speaks English. We start at eight and finish at nine. On Friday, we also study together.",
    questions: [
      {
        prompt: "What does Mary study?",
        options: ["Chinese", "English", "French", "Japanese"],
        answer: 0,
        explanation: "她学中文 refers to Mary.",
      },
      {
        prompt: "Where do they meet on Wednesday?",
        options: ["At school", "Online", "At Mary's home", "In a café"],
        answer: 1,
        explanation: "我们在网上见面 states that the meeting is online.",
      },
      {
        prompt: "When does the Wednesday session finish?",
        options: ["At seven", "At eight", "At nine", "At ten"],
        answer: 2,
        explanation: "九点结束 gives the ending time.",
      },
    ],
  },
  {
    id: "r2-appointment-call",
    level: 2,
    title: "Checking an appointment time",
    text: "今天我想去医院看牙。昨天我打电话预约了下午三点，可是手机上的消息写着两点。我不知道哪个时间对，就又给医院打了电话。护士说三点才是我的时间，两点的消息发错了。我两点半出门，坐公交车去医院，到了以后还等了十分钟。",
    translation:
      "Today I wanted to go to the hospital for a dental appointment. Yesterday I booked three in the afternoon by phone, but the message on my phone said two. Unsure which was right, I called the hospital again. The nurse said three was my time and that the two o'clock message had been sent by mistake. I left home at half past two, took the bus to the hospital, and waited another ten minutes after arriving.",
    questions: [
      {
        prompt: "Why did the narrator call again?",
        options: [
          "The bus was late",
          "The tooth no longer hurt",
          "The hospital was closed",
          "Two different appointment times had been given",
        ],
        answer: 3,
        explanation:
          "The phone booking was 三点 but the message said 两点, creating uncertainty.",
      },
      {
        prompt: "What was the correct appointment time?",
        options: [
          "Three in the afternoon",
          "Two in the afternoon",
          "Half past two",
          "Ten in the morning",
        ],
        answer: 0,
        explanation: "The nurse confirms 三点才是我的时间.",
      },
      {
        prompt: "How did the narrator travel to the hospital?",
        options: ["By taxi", "By bus", "On foot", "By bicycle"],
        answer: 1,
        explanation: "坐公交车去医院 gives the transport.",
      },
    ],
  },
  {
    id: "r2-train-meeting",
    level: 2,
    title: "Meeting at the right station",
    text: "小吴今天来我的城市。我以前没见过他，我们只在网上聊过天。他说火车十二点到。我去了老车站，可是他说自己在新车站。我查了地址，坐地铁过去。见面时已经一点了。我们都笑了，决定下次先说清楚车站的名字，再出门。",
    translation:
      "Xiao Wu came to my city today. I had never met him; we had only chatted online. He said his train would arrive at twelve. I went to the old station, but he said he was at the new one. I checked the address and took the subway there. It was already one when we met. We both laughed and decided that next time we would confirm the station name before leaving.",
    questions: [
      {
        prompt: "How had the two people communicated before today?",
        options: ["At school", "By letter", "Online", "At the old station"],
        answer: 2,
        explanation: "我们只在网上聊过天 describes their previous contact.",
      },
      {
        prompt: "Where was Xiao Wu waiting?",
        options: [
          "The old station",
          "The airport",
          "The narrator's home",
          "The new station",
        ],
        answer: 3,
        explanation: "他说自己在新车站 gives his actual location.",
      },
      {
        prompt: "What will they clarify next time?",
        options: [
          "The station's name",
          "The lunch price",
          "The train's color",
          "The weather",
        ],
        answer: 0,
        explanation: "They decide to 先说清楚车站的名字.",
      },
    ],
  },
  {
    id: "r2-dinner-substitute",
    level: 2,
    title: "Dinner without noodles",
    text: "晚上，爸爸想做面条。我打开柜子，发现家里没有面条了，但是还有米。爸爸说可以做米饭。我帮他洗菜，他正在切鸡肉。半小时后，饭做好了。妈妈下班回来，说今天的饭很好吃。我们没吃面条，也吃得很开心。",
    translation:
      "In the evening, Dad wanted to make noodles. I opened the cupboard and found that we had no noodles left, but we still had rice. Dad said we could cook rice instead. I helped him wash vegetables while he cut chicken. Half an hour later, dinner was ready. Mom came home from work and said the meal tasted good. We did not eat noodles, but we still enjoyed ourselves.",
    questions: [
      {
        prompt: "Why did Dad change the dinner plan?",
        options: [
          "Mom disliked chicken",
          "There were no noodles left",
          "The rice was missing",
          "The cupboard was broken",
        ],
        answer: 1,
        explanation: "家里没有面条了 explains the change to rice.",
      },
      {
        prompt: "How did the narrator help?",
        options: [
          "Buying chicken",
          "Cooking noodles",
          "Washing vegetables",
          "Calling Mom",
        ],
        answer: 2,
        explanation: "我帮他洗菜 names the narrator's task.",
      },
      {
        prompt: "How did Mom respond to dinner?",
        options: [
          "She wanted to return it",
          "She refused to eat",
          "She said it was too cold",
          "She said it tasted good",
        ],
        answer: 3,
        explanation: "妈妈…说今天的饭很好吃 gives her positive response.",
      },
    ],
  },
  {
    id: "r2-swimming-lesson",
    level: 2,
    title: "Learning one step at a time",
    text: "弟弟以前不会游泳，这个月开始上课。第一次，他不想下水，老师让他先在旁边看。第二次，他能在水里走了。今天他给我打电话，说自己会游一小段了。他很高兴，可是还不能一个人去深水的地方。下个星期他还要去练习。",
    translation:
      "My younger brother did not know how to swim before and started lessons this month. The first time, he did not want to enter the water, so the teacher let him watch from the side first. The second time, he could walk in the water. Today he called to say he could swim a short distance. He was pleased, but he still could not go into deep water alone. He would practice again next week.",
    questions: [
      {
        prompt: "What did the brother do at his first lesson?",
        options: [
          "Watched from the side",
          "Swam a long distance",
          "Entered deep water alone",
          "Taught another student",
        ],
        answer: 0,
        explanation: "老师让他先在旁边看 describes the first lesson.",
      },
      {
        prompt: "What new skill did he report today?",
        options: [
          "Diving",
          "Swimming a short distance",
          "Teaching swimming",
          "Swimming across a lake",
        ],
        answer: 1,
        explanation: "自己会游一小段了 is the reported progress.",
      },
      {
        prompt: "What restriction remains?",
        options: [
          "He cannot attend more lessons",
          "He cannot telephone home",
          "He cannot go into deep water alone",
          "He cannot stand in water",
        ],
        answer: 2,
        explanation:
          "还不能一个人去深水的地方 limits what his new skill permits.",
      },
    ],
  },
  {
    id: "r2-phone-return",
    level: 2,
    title: "A phone left in a shop",
    text: "我买完东西回家，发现手机不在包里。我记得买水果时用过手机，就用妈妈的电话给水果店打电话。老板说，桌子上有一部黑色手机。我去店里，说出了手机号码。老板听到手机响了，就把它还给我。我说谢谢，也买了一袋橙子。",
    translation:
      "After shopping, I went home and discovered that my phone was not in my bag. I remembered using it while buying fruit, so I used Mom's phone to call the fruit shop. The owner said there was a black phone on the table. I went to the shop and gave my phone number. When the owner heard the phone ring, he returned it to me. I thanked him and also bought a bag of oranges.",
    questions: [
      {
        prompt: "Whose phone did the narrator use to call the shop?",
        options: ["The owner's", "A friend's", "A neighbor's", "Mom's"],
        answer: 3,
        explanation: "用妈妈的电话 gives the borrowed phone.",
      },
      {
        prompt:
          "What helped confirm that the black phone belonged to the narrator?",
        options: [
          "It rang after the narrator gave the number",
          "It had an orange picture",
          "It was inside the narrator's bag",
          "The owner knew the narrator's name",
        ],
        answer: 0,
        explanation:
          "The number and subsequent ringing link the phone to the narrator.",
      },
      {
        prompt: "What did the narrator buy when returning?",
        options: ["Apples", "Oranges", "A new phone", "Tea"],
        answer: 1,
        explanation: "买了一袋橙子 gives the additional purchase.",
      },
    ],
  },
  {
    id: "r2-hotel-breakfast",
    level: 2,
    title: "An early breakfast",
    text: "我们住的旅馆有早餐，从七点到九点供应。明天我们的车六点半开，来不及在旅馆吃饭。我问工作人员附近有没有早开的店。他说可以给我们准备面包和牛奶，晚上放在前台。我们吃完晚饭去拿了早餐，也问清楚了去车站的路。",
    translation:
      "Our hotel serves breakfast from seven to nine. Tomorrow our train leaves at half past six, so we cannot eat breakfast at the hotel in time. I asked a staff member if any nearby shop opened early. He said he could prepare bread and milk and leave them at reception in the evening. We collected breakfast after dinner and also checked the route to the station.",
    questions: [
      {
        prompt:
          "Why could the travelers not eat during normal breakfast hours?",
        options: [
          "Breakfast ended at six",
          "They did not like bread",
          "Their train left before breakfast began",
          "The hotel had no breakfast",
        ],
        answer: 2,
        explanation:
          "The train leaves at 六点半, before breakfast starts at 七点.",
      },
      {
        prompt: "What did the staff member offer?",
        options: [
          "A later train",
          "Dinner at the station",
          "A room change",
          "Bread and milk to collect in advance",
        ],
        answer: 3,
        explanation:
          "He offers to prepare 面包和牛奶 and leave them at 前台 that evening.",
      },
      {
        prompt: "What else did the travelers check?",
        options: [
          "The route to the station",
          "The price of a new room",
          "The lunch menu",
          "The staff member's address",
        ],
        answer: 0,
        explanation: "问清楚了去车站的路 gives the extra information obtained.",
      },
    ],
  },
  {
    id: "r3-repair-pickup",
    level: 3,
    title: "Waiting for the right part",
    text: "小杨的电脑突然打不开了，他送到维修店。店员检查后说，需要换一个零件，两天后可以来拿。小杨星期四去的时候，电脑还没修好，因为送零件的车晚到了。店员向他道歉，提出先借给他一台旧电脑。小杨第二天要交作业，就接受了这个办法。星期六，他收到电话，才去取自己的电脑，并把借来的还给店里。",
    translation:
      "Xiao Yang's computer suddenly would not start, so he took it to a repair shop. After checking it, the assistant said a part needed replacing and he could collect it two days later. When Xiao Yang went on Thursday, it was not ready because the vehicle bringing the part had arrived late. The assistant apologized and offered to lend him an old computer. Xiao Yang had an assignment due the next day, so he accepted. On Saturday, he received a call, collected his own computer, and returned the borrowed one.",
    questions: [
      {
        prompt: "Why was the repair not finished on Thursday?",
        options: [
          "Xiao Yang forgot to pay",
          "The replacement part arrived late",
          "The shop had lost the computer",
          "The assistant could not find any problem",
        ],
        answer: 1,
        explanation: "送零件的车晚到了 explains the delay.",
      },
      {
        prompt: "Why did Xiao Yang accept a borrowed computer?",
        options: [
          "He wanted to sell it",
          "His own computer was too heavy",
          "He had an assignment due the next day",
          "The shop refused to repair his computer",
        ],
        answer: 2,
        explanation: "第二天要交作业 gives the immediate need.",
      },
      {
        prompt: "What prompted the Saturday collection?",
        options: [
          "A message from his teacher",
          "Seeing the delivery vehicle",
          "The original two-day estimate",
          "A call from the shop",
        ],
        answer: 3,
        explanation:
          "星期六，他收到电话，才去取自己的电脑 indicates that he waited for confirmation.",
      },
    ],
  },
  {
    id: "r3-volunteer-roles",
    level: 3,
    title: "Finding a useful volunteer role",
    text: "周末，社区请志愿者帮忙整理旧书。小顾报名时说自己不太会搬重东西，担心帮不上忙。负责人让他先按书名分类，再检查有没有少页。两位力气大的志愿者负责把纸箱搬到楼下。小顾做得很认真，还发现几本儿童书放错了地方。活动结束时，负责人说，整理书不只是搬箱子，每个人都可以找到合适的任务。",
    translation:
      "At the weekend, the community asked volunteers to organize old books. When Xiao Gu signed up, he said he was not good at carrying heavy things and worried he would be of little help. The organizer asked him to sort the books by title and then check for missing pages. Two stronger volunteers carried boxes downstairs. Xiao Gu worked carefully and found several children's books in the wrong place. At the end, the organizer said that organizing books was more than moving boxes; everyone could find a suitable task.",
    questions: [
      {
        prompt: "What worried Xiao Gu at first?",
        options: [
          "His difficulty carrying heavy things",
          "His inability to read any book",
          "The activity starting too late",
          "The absence of children's books",
        ],
        answer: 0,
        explanation: "He says 不太会搬重东西 and worries he cannot help.",
      },
      {
        prompt: "What was he asked to do after sorting?",
        options: [
          "Move boxes downstairs",
          "Check for missing pages",
          "Buy new books",
          "Read every story aloud",
        ],
        answer: 1,
        explanation: "先按书名分类，再检查有没有少页 specifies the sequence.",
      },
      {
        prompt: "What does the organizer's final comment suggest?",
        options: [
          "Only strong volunteers are useful",
          "The books no longer need organizing",
          "Different abilities can contribute in different ways",
          "All volunteers should do the same task",
        ],
        answer: 2,
        explanation:
          "The division of tasks and 每个人…合适的任务 support varied contributions.",
      },
    ],
  },
  {
    id: "r3-picnic-choice",
    level: 3,
    title: "Choosing a picnic spot",
    text: "三个朋友准备星期日去野餐。湖边的地方风景最好，但是离公交站比较远。山脚下有大树，走过去只要十分钟，可是附近没有商店。他们商量后选择了山脚下，因为其中一位朋友脚不舒服，不能走太久。大家提前买好水和食物，还带了一张大垫子。出发前，他们看了天气消息，知道下午可能下雨，就决定午饭后早点回家。",
    translation:
      "Three friends planned a Sunday picnic. The lakeside had the best scenery but was relatively far from the bus stop. There were large trees at the foot of the hill, only a ten-minute walk away, but no shop nearby. They chose the hill because one friend had a sore foot and could not walk for long. They bought water and food in advance and brought a large mat. Before leaving, they checked the forecast, learned that it might rain in the afternoon, and decided to go home early after lunch.",
    questions: [
      {
        prompt: "What most directly influenced their choice of location?",
        options: [
          "The cheapest shop",
          "The largest lake",
          "A bus driver's advice",
          "A friend's difficulty walking far",
        ],
        answer: 3,
        explanation: "The explicit reason is 一位朋友脚不舒服，不能走太久.",
      },
      {
        prompt: "Why did they buy supplies beforehand?",
        options: [
          "There was no shop near the chosen spot",
          "All nearby shops sold only fruit",
          "They planned to stay overnight",
          "The bus did not allow bags",
        ],
        answer: 0,
        explanation: "山脚下…附近没有商店 makes advance supplies useful.",
      },
      {
        prompt: "Why did they plan an early return?",
        options: [
          "The friend had to work at noon",
          "Rain was possible in the afternoon",
          "The park closed before lunch",
          "They had forgotten their mat",
        ],
        answer: 1,
        explanation: "下午可能下雨 leads to 午饭后早点回家.",
      },
    ],
  },
  {
    id: "r3-hotel-change",
    level: 3,
    title: "A room farther from the lift",
    text: "小梅出差住旅馆，第一晚一直睡不好。她的房间在电梯旁边，晚上常常听见人说话。第二天，她问前台能不能换一个安静一点的房间。前台说，五楼有一间空房，但是比现在的房间小。小梅看过以后觉得够用，就换了房间。新房间虽然没有大桌子，但是离电梯远，她晚上睡得很好。她觉得这次选房，安静比大小更重要。",
    translation:
      "Xiao Mei stayed in a hotel on a business trip and slept poorly the first night. Her room was beside the lift, and she often heard people talking at night. The next day, she asked reception for a quieter room. There was a vacant room on the fifth floor, but it was smaller. After seeing it, she felt it was adequate and moved. Although the new room lacked a large desk, it was far from the lift and she slept well. For this room choice, she considered quiet more important than size.",
    questions: [
      {
        prompt: "Why did Xiao Mei ask to change rooms?",
        options: [
          "The room was too small",
          "The lift was broken",
          "Noise kept her from sleeping well",
          "The room had no bed",
        ],
        answer: 2,
        explanation: "People talking near the lift disturbed her sleep.",
      },
      {
        prompt: "What disadvantage did the new room have?",
        options: [
          "It was nearer the lift",
          "It was not vacant",
          "It was on the ground floor",
          "It was smaller and lacked a large desk",
        ],
        answer: 3,
        explanation: "The text says 比现在的房间小 and 没有大桌子.",
      },
      {
        prompt: "What did she prioritize?",
        options: [
          "Quiet",
          "A larger desk",
          "Being beside the lift",
          "A ground-floor room",
        ],
        answer: 0,
        explanation: "安静比大小更重要 states her priority.",
      },
    ],
  },
  {
    id: "r3-book-club",
    level: 3,
    title: "Making space for everyone to speak",
    text: "读书小组每周见一次面。以前，大家一开始就自由讨论，几位说话快的人常常讲很久，小方总是没机会开口。上周，组长试了一个新办法：先让每个人用两分钟说感受，再一起提问。小方第一次讲完了自己的想法。她说，两分钟不长，但是先有一个轮到自己的机会，她就不那么紧张了。大家决定下周继续试这个办法。",
    translation:
      "The book group met weekly. Previously, discussion was open from the start, and several fast speakers often talked for a long time, leaving Xiao Fang no chance to speak. Last week, the leader tried a new approach: each person had two minutes to share impressions before joint questions. Xiao Fang finished expressing her ideas for the first time. She said two minutes was not long, but having a guaranteed turn first made her less nervous. The group decided to try the approach again next week.",
    questions: [
      {
        prompt: "What problem did the new approach address?",
        options: [
          "Nobody had read the book",
          "Some members lacked a chance to speak",
          "The group met too often",
          "Questions were forbidden",
        ],
        answer: 1,
        explanation:
          "小方总是没机会开口 describes the problem in the previous format.",
      },
      {
        prompt: "What happens first under the new arrangement?",
        options: [
          "The leader gives a long lecture",
          "Everyone asks questions at once",
          "Each person shares impressions for two minutes",
          "Members vote on next year's books",
        ],
        answer: 2,
        explanation: "先让每个人用两分钟说感受 precedes joint questions.",
      },
      {
        prompt: "Why was Xiao Fang less nervous?",
        options: [
          "She no longer had to speak",
          "She could talk for the whole meeting",
          "The fast speakers left the group",
          "She knew she would get her own turn",
        ],
        answer: 3,
        explanation:
          "先有一个轮到自己的机会 explains the reduction in nervousness.",
      },
    ],
  },
  {
    id: "r3-shared-flat",
    level: 3,
    title: "Asking before renting",
    text: "小赵想和同事一起租房。第一套离公司很近，但是只有一个卧室。第二套有两个卧室，坐车上班要半小时。小赵原来想选第一套，同事却说自己晚上需要安静看书。两人又问了第二套的房东，知道附近有早班公交。最后他们选了第二套。虽然上班远一点，但是每个人都有自己的房间，不必每天商量谁先休息。",
    translation:
      "Xiao Zhao wanted to rent a flat with a colleague. The first was near work but had only one bedroom. The second had two bedrooms and required a half-hour journey to work. Xiao Zhao initially preferred the first, but the colleague needed quiet to read at night. They asked the second flat's landlord and learned that an early bus served the area. They chose the second: although the commute was a little longer, each had a room and they would not have to negotiate every day about who rested first.",
    questions: [
      {
        prompt: "What was the first flat's main limitation?",
        options: [
          "Only one bedroom",
          "No early bus",
          "A half-hour commute",
          "No landlord contact",
        ],
        answer: 0,
        explanation: "The first flat 只有一个卧室.",
      },
      {
        prompt: "What did they learn from the second landlord?",
        options: [
          "The flat had only one bedroom",
          "There was an early bus nearby",
          "The company would move",
          "The colleague could not read there",
        ],
        answer: 1,
        explanation: "知道附近有早班公交 is the new information.",
      },
      {
        prompt: "What trade-off did they accept?",
        options: [
          "Less privacy for cheaper food",
          "No transport for a larger kitchen",
          "A longer commute for separate rooms",
          "A smaller flat for a quieter company",
        ],
        answer: 2,
        explanation:
          "They accept 上班远一点 in exchange for 每个人…自己的房间.",
      },
    ],
  },
  {
    id: "r4-school-detour",
    level: 4,
    title: "A safer route during construction",
    text: "学校门前正在修路，原来的斑马线被围起来了。有些家长为了少走几步，带孩子从施工车辆之间穿过去。学校发现后，没有只发一句“注意安全”的提醒，而是请老师画出临时路线，并安排志愿者在早上带路。新路线要绕到街角，多走五分钟，却有正常的红绿灯。第一天，有孩子抱怨路太长，老师就带他们看施工车辆转弯时看不到的地方。后来，更多家庭愿意绕路。学校说，等道路重新开放，再取消临时安排。",
    translation:
      "Roadworks outside the school had fenced off the original pedestrian crossing. Some parents took children between construction vehicles to save a few steps. Instead of merely issuing a 'be careful' warning, the school asked teachers to map a temporary route and arranged morning volunteer guides. It went around the street corner, adding five minutes, but had working traffic lights. When children complained on the first day, a teacher showed them the areas drivers could not see while turning. More families then accepted the detour. The school said the temporary arrangement would end when the road reopened.",
    questions: [
      {
        prompt: "临时路线的主要好处是什么？",
        options: [
          "比原路线少走五分钟",
          "可以穿过施工车辆之间",
          "不需要任何红绿灯",
          "通过有正常红绿灯的地方",
        ],
        answer: 3,
        explanation:
          "The detour costs five minutes but has 正常的红绿灯, unlike the route through works.",
      },
      {
        prompt: "老师为什么让孩子看车辆转弯时看不到的地方？",
        options: [
          "让他们具体理解风险",
          "教他们驾驶施工车辆",
          "证明绕路没有必要",
          "让他们搬走围栏",
        ],
        answer: 0,
        explanation:
          "Showing the blind areas makes the safety concern concrete and is followed by greater acceptance.",
      },
      {
        prompt: "学校计划何时取消临时安排？",
        options: [
          "第一天结束后",
          "道路重新开放后",
          "所有家长抱怨后",
          "志愿者画完路线后",
        ],
        answer: 1,
        explanation: "等道路重新开放，再取消临时安排 states the condition.",
      },
    ],
  },
  {
    id: "r4-lost-coat",
    level: 4,
    title: "Two similar coats",
    text: "运动课结束后，小何发现自己的灰色外套不见了，椅子上却留着另一件差不多的外套。他没有直接拿走，而是把情况告诉工作人员。工作人员在群里发消息，请大家检查衣服口袋。一位同学发现，自己带回家的外套里有一张不属于自己的车票。她联系小何，两人核对了口袋里的东西，第二天交换了外套。工作人员后来给衣架加了号码牌。小何觉得，衣服看起来一样时，先核实比马上认定有人故意拿走更有用。",
    translation:
      "After a sports class, Xiao He found his gray coat missing, with a very similar coat left on a chair. He did not take it but informed staff. Staff messaged the group and asked everyone to check their pockets. One classmate found an unfamiliar travel ticket in the coat she had taken home. She contacted Xiao He; they checked the pocket contents and exchanged coats the next day. Staff later added numbered tags to the coat racks. Xiao He felt that when clothes looked alike, verification was more useful than immediately assuming deliberate theft.",
    questions: [
      {
        prompt: "哪项信息帮助他们确认拿错了外套？",
        options: [
          "衣架的颜色",
          "课程的价格",
          "口袋里不属于穿衣者的车票",
          "工作人员的电话号码",
        ],
        answer: 2,
        explanation:
          "The unfamiliar ticket led to contact and checking pocket contents.",
      },
      {
        prompt: "小何最初怎样处理另一件外套？",
        options: [
          "直接穿回家",
          "把它卖掉",
          "扔到门外",
          "先告知工作人员，没有直接拿走",
        ],
        answer: 3,
        explanation: "他没有直接拿走，而是…告诉工作人员 is explicit.",
      },
      {
        prompt: "结尾强调了什么？",
        options: [
          "相似物品丢失时应先核实原因",
          "灰色衣服一定容易被偷",
          "号码牌能解决所有失物问题",
          "发现失物就不应联系同学",
        ],
        answer: 0,
        explanation:
          "The accidental exchange supports checking before assuming intent; no universal guarantee is made.",
      },
    ],
  },
  {
    id: "r4-office-network",
    level: 4,
    title: "A meeting when the network fails",
    text: "上午九点，办公室的网络突然断了，十点的客户会议却不能随便取消。小丁先检查电脑，发现几个人都连不上网，就给技术人员打电话。对方说维修大约需要两小时。小丁于是把已经下载的资料放到会议室电脑里，又请客户通过电话参加。虽然不能演示网页，但是大家仍然讨论了最重要的三个问题。下午网络恢复后，小丁补发了网页链接。经理说，下次准备会议时，不但要检查设备，而且要留一份可以离线使用的材料。",
    translation:
      "At nine, the office network failed, but the ten o'clock client meeting could not simply be canceled. Xiao Ding checked computers and found several people unable to connect, then called technical support. Repairs would take about two hours. He put previously downloaded materials on the meeting-room computer and asked the client to join by phone. Although they could not demonstrate the website, they discussed the three key issues. After the network returned in the afternoon, he sent the links. The manager said future preparation should include both equipment checks and an offline copy of materials.",
    questions: [
      {
        prompt: "小丁为什么不只检查自己的电脑？",
        options: [
          "他不会使用任何电脑",
          "几个人都连不上网，可能是共同的问题",
          "客户要求换所有电脑",
          "会议室没有电脑",
        ],
        answer: 1,
        explanation:
          "Several users failing to connect points beyond his individual machine.",
      },
      {
        prompt: "会议怎样继续进行？",
        options: [
          "完全不用任何资料",
          "等到下午才开始",
          "使用已下载资料，让客户通过电话参加",
          "要求客户自行修好网络",
        ],
        answer: 2,
        explanation:
          "The downloaded materials and phone participation are the backup arrangements.",
      },
      {
        prompt: "经理的建议主要为了什么？",
        options: [
          "以后不再开客户会议",
          "证明技术人员没有作用",
          "取消所有网页演示",
          "减少会议对即时网络连接的依赖",
        ],
        answer: 3,
        explanation:
          "An offline copy supports a meeting even if the network is unavailable.",
      },
    ],
  },
  {
    id: "r4-gym-membership",
    level: 4,
    title: "A membership that fits a schedule",
    text: "小罗想办健身卡，店员推荐了价格最低的年卡。他仔细问后才知道，这张卡只能在工作日上午使用，而他那个时间要上班。店员又介绍了不限时间的卡，价格高一些。小罗没有马上购买，先买了两次单次票，试试晚上是否太拥挤。第一次器材很快就轮到了，第二次却等了很久。最后，他选了附近另一家较小的健身房。虽然每次花的钱多一点，但是不用买全年卡，也更适合他不固定的下班时间。",
    translation:
      "Xiao Luo wanted a gym membership, and an assistant recommended the cheapest annual card. Only after asking carefully did he learn it was valid solely on weekday mornings, when he worked. An unrestricted card cost more. Rather than buy immediately, he purchased two single visits to test evening crowding. On the first visit, equipment became available quickly; on the second, he waited a long time. He ultimately chose a smaller nearby gym. Each visit cost a little more, but no annual commitment was needed and it better suited his variable finishing time.",
    questions: [
      {
        prompt: "最便宜的年卡为什么不适合小罗？",
        options: [
          "可用时间与他的工作时间冲突",
          "只允许晚上使用",
          "不允许使用任何器材",
          "必须每天参加比赛",
        ],
        answer: 0,
        explanation: "The card is for 工作日上午, when he has to work.",
      },
      {
        prompt: "他先买单次票的目的是什么？",
        options: [
          "替店员推销年卡",
          "了解晚上实际的拥挤情况",
          "参加两次考试",
          "保证以后每天来",
        ],
        answer: 1,
        explanation: "He explicitly wants to 试试晚上是否太拥挤.",
      },
      {
        prompt: "最后的选择体现了什么？",
        options: [
          "价格越高一定越好",
          "年卡永远不划算",
          "使用方式与个人日程比最低标价更重要",
          "只要器材多就适合所有人",
        ],
        answer: 2,
        explanation:
          "He accepts a higher per-visit cost for flexibility that fits his schedule.",
      },
    ],
  },
  {
    id: "r4-guided-tour",
    level: 4,
    title: "Changing a walking tour",
    text: "小城的导游原计划带游客走一圈老街，最后到山上的观景台。出发前，一位游客说明自己的膝盖不舒服，希望少爬楼梯。导游没有要求她留在车上，而是把观景台改成河边的小广场。那里也能看到老街全景，还可以坐下来休息。几位游客担心少看一个景点，导游就介绍了广场旁边老码头的故事。活动结束后，大家仍觉得行程丰富。导游说，路线可以调整，重要的是让参加者真正有机会了解这座城。",
    translation:
      "A guide planned a circuit of the old streets ending at a hilltop viewpoint. Before departure, one visitor explained that her knee hurt and she hoped to climb fewer stairs. Instead of asking her to remain on the bus, the guide replaced the viewpoint with a riverside square. It also offered a panoramic view of the old streets and seats for resting. When some visitors worried about missing a sight, the guide told stories about the old dock beside the square. They still found the tour rich. The guide said routes could change; the goal was to give participants a real chance to understand the town.",
    questions: [
      {
        prompt: "导游调整路线的直接原因是什么？",
        options: [
          "老街全部关闭",
          "所有游客都想坐车",
          "河边不能休息",
          "一位游客的膝盖不适合多爬楼梯",
        ],
        answer: 3,
        explanation:
          "The visitor's knee problem and request for fewer stairs prompt the change.",
      },
      {
        prompt: "新地点如何保持行程的内容？",
        options: [
          "提供老街全景，并结合老码头故事",
          "只让游客等待其他人",
          "取消所有城市介绍",
          "要求游客自己查地图",
        ],
        answer: 0,
        explanation:
          "The square offers a view and the guide adds local dock history.",
      },
      {
        prompt: "导游怎样理解路线与目的的关系？",
        options: [
          "路线永远不能变",
          "路线是帮助参与者了解城市的手段",
          "景点数量是唯一目的",
          "需要休息的人不应参加",
        ],
        answer: 1,
        explanation:
          "路线可以调整 is justified by the central goal of meaningful participation.",
      },
    ],
  },
  {
    id: "r4-moving-labels",
    level: 4,
    title: "Labels that help on moving day",
    text: "朋友搬家时，小陆帮忙装箱。她原来只在箱子上写“书”或“衣服”，朋友却提醒她，新家有三个房间，搬运的人不知道东西该放哪里。两人于是给每个箱子加上房间名，还把当天要用的杯子、毛巾和充电器放在一个小箱子里。到了新家，大箱子可以慢慢整理，小箱子先打开。虽然装箱时多花了一点时间，但是他们当天晚上就能喝水、洗澡和给手机充电，不用把所有箱子翻一遍。两人都松了口气。",
    translation:
      "Xiao Lu helped a friend pack for a move. She initially labeled boxes only 'books' or 'clothes,' but the friend pointed out that the new home had three rooms and movers would not know where to put things. They added room names to each box and placed cups, towels, and chargers needed that day in a small separate box. At the new home, they could unpack large boxes gradually and open the small one first. The extra packing time meant they could drink water, bathe, and charge phones that evening without searching every box. Both felt relieved.",
    questions: [
      {
        prompt: "为什么只写物品种类还不够？",
        options: [
          "搬运人员不会读任何字",
          "所有物品都要放厨房",
          "搬运人员还需要知道目标房间",
          "新家没有房间",
        ],
        answer: 2,
        explanation:
          "The three-room home requires destination information, not just contents.",
      },
      {
        prompt: "小箱子里装的是什么？",
        options: [
          "最重的书",
          "暂时不用的装饰品",
          "搬运人员的工具",
          "当天需要的生活用品",
        ],
        answer: 3,
        explanation:
          "Cups, towels, and chargers are grouped as 当天要用的 items.",
      },
      {
        prompt: "多花装箱时间带来了什么结果？",
        options: [
          "到家后不必为基本需要翻遍箱子",
          "所有大箱子当天都整理完了",
          "搬家不再需要任何计划",
          "物品数量减少了一半",
        ],
        answer: 0,
        explanation:
          "The evening essentials are available without opening every box; complete unpacking is not claimed.",
      },
    ],
  },
  {
    id: "r5-reusable-boxes",
    level: 5,
    title: "A deposit for reusable lunch boxes",
    text: "一家餐馆想减少一次性饭盒，开始提供可归还的餐盒。顾客付一笔押金，七天内归还就能拿回钱。老板原以为大家都会选择这个办法，实际使用的人却不多。午休时来买饭的员工说，他们愿意减少垃圾，但下班后餐馆已经关门，专程归还很不方便。老板听完后，与附近便利店合作，增加了晚间归还点，还允许顾客下次买饭时直接换盒。两周后，归还率提高了。老板仍保留一次性饭盒，因为有些游客只来一次。他在店里说明清洗方式和押金规则，避免把选择普通饭盒的人说成不关心环境。对他来说，让环保选择容易做到，比只要求顾客改变习惯更有效。",
    translation:
      "A restaurant introduced returnable containers to reduce disposable lunch boxes. Customers paid a deposit refunded on return within seven days. The owner expected everyone to choose them, but uptake was low. Office workers said they wanted less waste, yet the restaurant closed before they finished work and a special return trip was inconvenient. The owner partnered with a convenience store for evening returns and allowed exchanges on the next purchase. Return rates rose after two weeks. He kept disposable boxes for occasional visitors, explained washing and deposit rules, and avoided portraying ordinary-box users as uncaring. Making the environmental choice practical mattered more than simply demanding new habits.",
    questions: [
      {
        prompt: "员工不常选择可归还餐盒，主要障碍是什么？",
        options: [
          "他们都反对减少垃圾",
          "归还时间与工作日程不合",
          "餐馆不退任何押金",
          "餐盒只能装冷食",
        ],
        answer: 1,
        explanation:
          "Workers support less waste but cannot conveniently return boxes after work because the restaurant is closed.",
      },
      {
        prompt: "老板采取了哪项改进？",
        options: [
          "把押金变成永久费用",
          "禁止游客购买",
          "增加晚间归还点和换盒方式",
          "要求员工午休时不吃饭",
        ],
        answer: 2,
        explanation:
          "Evening returns at a convenience store and exchanges on the next visit address practical access.",
      },
      {
        prompt: "结尾体现了怎样的态度？",
        options: [
          "环保只靠批评顾客就能实现",
          "使用一次性饭盒的人都不负责",
          "归还率提高就证明所有问题已解决",
          "应降低行动障碍，而不是简单评价个人道德",
        ],
        answer: 3,
        explanation:
          "The owner makes the choice easier and avoids labeling ordinary-box users as indifferent.",
      },
    ],
  },
  {
    id: "r5-interview-example",
    level: 5,
    title: "An interview answer with a real example",
    text: "小潘准备应聘客服工作，练习时总说自己“沟通能力强”。朋友问他能不能讲一个具体例子，他一时答不上来。后来，小潘想起在书店兼职时，一位顾客买错了版本，十分着急。他先问清楚顾客需要哪一版，再查其他门店的库存，最后安排第二天取书。面试时，小潘没有把这件事说成自己解决了所有问题，而是说明，他也曾因为急着解释而没听完顾客的话，后来才学会先确认需求。面试官继续问，如果其他门店也没有书，他会怎么办。小潘提出联系出版社，并清楚说明等待时间。面试结束后，他觉得，具体经历不但能展示做过什么，而且能让对方看见自己怎样思考和改进。",
    translation:
      "Preparing for a customer-service interview, Xiao Pan repeatedly claimed 'strong communication skills.' A friend asked for an example, and he could not immediately give one. He recalled a bookshop customer upset about buying the wrong edition. He clarified the required edition, checked other branches' stock, and arranged collection the next day. In the interview, he did not claim to solve everything: he admitted previously rushing to explain before hearing customers fully and learning to confirm needs first. Asked what he would do if no branch had the book, he proposed contacting the publisher and clearly explaining the wait. He felt concrete experience showed both actions and how he thought and improved.",
    questions: [
      {
        prompt: "朋友为什么追问具体例子？",
        options: [
          "单说能力强还没有展示实际表现",
          "客服工作不需要沟通",
          "小潘从未做过兼职",
          "面试只允许背口号",
        ],
        answer: 0,
        explanation:
          "The unsupported claim leads the friend to ask for an actual case.",
      },
      {
        prompt: "小潘处理买错版本的顾客时，先做了什么？",
        options: [
          "保证当天必定有书",
          "确认顾客需要的版本",
          "责怪顾客没有看清",
          "立即联系出版社",
        ],
        answer: 1,
        explanation: "他先问清楚顾客需要哪一版 precedes checking stock.",
      },
      {
        prompt: "小潘提到自己过去的不足，有什么作用？",
        options: [
          "证明他现在不能工作",
          "回避面试官的所有问题",
          "说明他能反思并调整服务方式",
          "保证今后不会再犯任何错误",
        ],
        answer: 2,
        explanation:
          "He contrasts rushing to explain with learning to confirm needs, showing development rather than perfect performance.",
      },
    ],
  },
  {
    id: "r5-dry-season",
    level: 5,
    title: "Watering at a better time",
    text: "连续几周少雨，村里的菜农都担心收成。老赵每天中午浇水，觉得太阳最强时植物最需要水。农业技术员来访后解释，中午水分蒸发快，未必能让根部得到更多水。她建议改在清晨浇，并在土上覆盖一些干草。老赵没有立刻改变全部菜地，而是先选两块条件相近的小地，一块照旧，一块用新办法。几周后，新办法用水较少，菜的生长情况也没有变差。老赵于是逐步扩大试用范围。他仍然记录天气，因为下雨多少会影响比较。邻居问是否所有作物都适合这样做，他说不能只凭这两块地就下结论，可以请技术员结合不同作物再判断。",
    translation:
      "After weeks with little rain, vegetable growers worried about their harvest. Lao Zhao watered at midday, believing plants needed water most under strong sun. An agricultural adviser explained that rapid evaporation could prevent more water reaching roots and suggested early watering and dry-grass cover. He first tested two similar plots, keeping one unchanged and applying the new method to the other. Weeks later, the new method used less water without poorer growth, so he expanded gradually. He continued recording weather because rainfall affected comparisons. Asked whether it suited every crop, he said two plots were insufficient evidence and advised consulting the expert about different crops.",
    questions: [
      {
        prompt: "技术员为什么不建议中午浇水？",
        options: [
          "中午植物完全不需要水",
          "清晨不会有阳光",
          "村里禁止中午劳动",
          "水分蒸发快，根部未必得到更多水",
        ],
        answer: 3,
        explanation:
          "The explanation concerns evaporation and water reaching roots, not a claim that plants need none.",
      },
      {
        prompt: "老赵怎样开始试用新办法？",
        options: [
          "比较两块条件相近的小地",
          "立即改变所有邻居的菜地",
          "只观察一场雨",
          "停止记录天气",
        ],
        answer: 0,
        explanation:
          "One similar plot stays unchanged and the other receives the new method.",
      },
      {
        prompt: "他为什么不直接回答所有作物都适合？",
        options: [
          "他已经证明新办法无效",
          "试用证据的范围有限",
          "技术员不愿回答任何问题",
          "所有作物都完全一样",
        ],
        answer: 1,
        explanation:
          "He explicitly says the two plots cannot support a universal conclusion.",
      },
    ],
  },
  {
    id: "r5-music-neighbors",
    level: 5,
    title: "A festival with a quieter ending",
    text: "青年中心计划在小广场办音乐节，附近居民担心晚上太吵。组织者起初认为，活动一年只有一次，大家应该理解。开会时，一位上夜班的护士说明，她下午就需要睡觉，并不只是深夜怕吵。组织者这才发现，统一规定十点结束还不够。他们把音响转向远离住宅的一侧，下午先安排不用扩音器的小活动，正式演出放在较短的时段。中心还提前公布节目时间，并留下联系号码。音乐节结束后，有居民说影响比预想小，也有人仍觉得最后一场太响。组织者没有只收集赞扬，而是把这些意见留给下次安排。他们认为，举办成功不等于所有人都满意，回应不方便的人也是活动的一部分。",
    translation:
      "A youth center planned a square music festival, worrying nearby residents. Organizers first argued that a once-a-year event deserved understanding. At a meeting, a night-shift nurse explained she needed afternoon sleep, not merely quiet late at night. A ten o'clock finish alone was inadequate. They turned speakers away from homes, scheduled unamplified afternoon activities, and shortened the main performance period. They published times and a contact number. Some residents found the impact smaller than expected; others still found the last performance too loud. Organizers retained criticism for future planning, recognizing that success did not mean universal satisfaction and that responding to affected people was part of the event.",
    questions: [
      {
        prompt: "护士的说明让组织者认识到什么？",
        options: [
          "所有居民都在夜间睡觉",
          "活动一年只能办一次",
          "噪声影响与个人作息有关，不只取决于结束时间",
          "不用扩音器就一定没有声音",
        ],
        answer: 2,
        explanation:
          "Her afternoon sleep shows why a single late-night cutoff does not meet all needs.",
      },
      {
        prompt: "哪项是实际采取的措施？",
        options: [
          "取消所有音乐活动",
          "只允许居民赞扬",
          "把演出延长到午夜",
          "调整音响方向并缩短正式演出时段",
        ],
        answer: 3,
        explanation:
          "Both measures are explicitly part of the revised arrangements.",
      },
      {
        prompt: "他们为什么保留仍然不满的意见？",
        options: [
          "作为下次改进的依据",
          "证明活动完全失败",
          "要求护士改变工作",
          "保证以后不会有人抱怨",
        ],
        answer: 0,
        explanation:
          "把这些意见留给下次安排 treats feedback as an ongoing planning input.",
      },
    ],
  },
  {
    id: "r5-used-bicycle",
    level: 5,
    title: "Buying a bicycle after checking it",
    text: "小沈在网上看到一辆二手自行车，照片很新，价格也低。卖家说车只骑过几次，今天付款就能便宜一些。小沈没有因为折扣马上转账，而是约好见面试骑。他发现车灯不亮，刹车也需要调整。卖家解释，车放了很久，有些地方没有检查。小沈请附近修车师傅估算维修费用，再与卖家商量价格。最后他买下了车，并先送去修好才骑回家。朋友问他为什么花这么多时间，他说，便宜不只是购买价格低，还要考虑之后的费用和安全。照片能提供一些信息，却不能代替现场检查实际状况。",
    translation:
      "Xiao Shen found a used bicycle online with fresh-looking photos and a low price. The seller claimed it had been ridden only a few times and offered a discount for payment that day. Rather than transfer money immediately, Xiao Shen arranged a test ride and found a failed light and brakes needing adjustment. The seller said the bike had been stored a long time without full checks. Xiao Shen obtained a repair estimate and negotiated the price. He bought it but had it repaired before riding home. He explained that low cost included later expenses and safety, and photos could not replace an on-site inspection.",
    questions: [
      {
        prompt: "小沈为什么没有立即转账？",
        options: [
          "他已经买了另一辆车",
          "他想先核实车的实际状况",
          "他不知道照片是什么",
          "卖家拒绝任何见面",
        ],
        answer: 1,
        explanation:
          "He arranges a test ride instead of reacting only to the same-day discount.",
      },
      {
        prompt: "维修估价在购买决定中起了什么作用？",
        options: [
          "证明照片绝对真实",
          "让他不用检查刹车",
          "帮助考虑总费用并商量价格",
          "保证自行车永不损坏",
        ],
        answer: 2,
        explanation:
          "He gets the estimate before negotiating and later emphasizes purchase plus repair costs.",
      },
      {
        prompt: "哪项最符合小沈对“便宜”的理解？",
        options: [
          "只看卖家的折扣",
          "价格低就不必考虑安全",
          "照片新就说明无需维修",
          "应结合后续费用和安全判断",
        ],
        answer: 3,
        explanation:
          "The closing statement explicitly includes 之后的费用和安全.",
      },
    ],
  },
  {
    id: "r5-restaurant-allergy",
    level: 5,
    title: "Checking ingredients before ordering",
    text: "小乔对花生过敏，和朋友去一家新餐馆吃饭。菜单上的炒菜没有写花生，她却没有直接点，而是请服务员确认酱料和用油。服务员先说菜里看不到花生，后来问过厨师，才知道酱料含有花生成分。餐馆不能保证所有锅具都没有接触过花生，便如实告诉小乔。朋友建议换一家，小乔同意了。她没有责怪服务员，而是感谢他继续核查。几天后，餐馆在菜单上补充了常见过敏原提示，也提醒顾客提前说明需要。小乔觉得，承认不能保证安全，比为了留住客人随口保证更负责任；提示可以帮助沟通，却不能代替每次具体确认。",
    translation:
      "Xiao Qiao, allergic to peanuts, visited a new restaurant with a friend. A stir-fry listing omitted peanuts, but she asked staff to check sauces and oil. The server initially said no peanuts were visible, then learned from the chef that the sauce contained peanut ingredients. The restaurant honestly said it could not guarantee equipment had no peanut contact. They chose another restaurant, and she thanked the server for checking. Days later, the menu added common-allergen notices and encouraged advance disclosure. She valued an honest inability to guarantee safety over unsupported reassurance: notices helped communication but did not replace specific confirmation.",
    questions: [
      {
        prompt: "为什么只看菜里有没有花生还不够？",
        options: [
          "酱料也可能含花生成分",
          "所有炒菜都必定含花生",
          "菜单不允许写任何材料",
          "服务员不能询问厨师",
        ],
        answer: 0,
        explanation:
          "The sauce contains peanut ingredients despite no visible peanuts.",
      },
      {
        prompt: "餐馆最终怎样回应安全问题？",
        options: [
          "保证所有锅具从未接触花生",
          "如实说明不能保证没有接触",
          "要求小乔忽略过敏",
          "隐瞒厨师的答复",
        ],
        answer: 1,
        explanation:
          "The restaurant states its inability to guarantee absence of contact.",
      },
      {
        prompt: "小乔如何看待新增提示？",
        options: [
          "提示能消除所有过敏风险",
          "提示使询问厨师毫无意义",
          "它有帮助，但仍需要具体确认",
          "它证明每道菜都不含花生",
        ],
        answer: 2,
        explanation:
          "The final sentence distinguishes a communication aid from case-specific confirmation.",
      },
    ],
  },
  {
    id: "r6-medical-interpreter",
    level: 6,
    title: "Interpreting rather than deciding",
    text: "医院邀请志愿者帮助不熟悉当地语言的患者沟通。小黎第一次参加时，觉得自己应该尽快替患者把事情办好。一位老人听不懂检查安排，小黎便替他回答了医生的问题。培训老师随后指出，帮助沟通不等于代替患者决定，尤其不能把没有确认的意思说成患者已经同意。第二次服务时，小黎先请医生用短句解释，再把每一项选择转述给老人，并留出提问的时间。遇到不确定的医学词语，她没有凭印象翻译，而是请医院的专业译员协助。过程比第一次慢一些，老人却能说明自己担心什么，医生也调整了说明方式。小黎在记录中写道，效率不只是对话用了几分钟，还包括是否减少误解、让患者真正理解。她仍然愿意提供帮助，但也学会说明自己的能力边界，而不是把热心当作专业知识的替代品。",
    translation:
      "A hospital recruited volunteers to assist patients unfamiliar with the local language. On her first shift, Xiao Li wanted to handle things quickly and answered a doctor's questions for an older patient who did not understand the examination plan. A trainer explained that facilitating communication was not deciding for patients or presenting unconfirmed wishes as consent. Next time, she asked for short explanations, conveyed each choice, and left time for questions. With uncertain medical terminology, she sought a professional interpreter rather than guessing. The process was slower, but the patient expressed concerns and the doctor adapted the explanation. Her notes defined efficiency through reduced misunderstanding and actual comprehension, and recognized that enthusiasm could not substitute for professional knowledge.",
    questions: [
      {
        prompt: "培训老师指出的核心问题是什么？",
        options: [
          "志愿者不应与任何患者说话",
          "所有解释都应越快越好",
          "老人不能参与医疗沟通",
          "小黎把协助理解变成了代替患者表达决定",
        ],
        answer: 3,
        explanation:
          "Answering for the patient risks treating unconfirmed intent as consent.",
      },
      {
        prompt: "遇到不确定的医学词语，小黎怎样处理？",
        options: [
          "寻求专业译员协助",
          "按照自己的印象猜测",
          "让老人自己查词典",
          "直接删除医生的说明",
        ],
        answer: 0,
        explanation:
          "She specifically asks the hospital's professional interpreter for help.",
      },
      {
        prompt: "较慢的过程为什么仍可能更有效？",
        options: [
          "它使医生不再需要解释",
          "它帮助患者理解并表达担忧，减少误解",
          "对话时间越长总是越好",
          "热心保证翻译全部正确",
        ],
        answer: 1,
        explanation:
          "The patient can express concerns and the doctor adapts; usefulness is not measured solely in minutes.",
      },
    ],
  },
  {
    id: "r6-return-policy",
    level: 6,
    title: "A return promise that needs conditions",
    text: "一家小网店宣传“七天内都能退”，店主觉得这句话简单，顾客容易记住。后来，一位顾客退回已经拆封使用的耳机，店员却说这类商品不在普通退货范围内。顾客认为自己受到误导，因为购买时没有看到例外说明。店主复查页面后发现，限制确实藏在很长的说明里，而广告没有提醒。他没有只责怪顾客读得不仔细，而是先按当时的承诺处理这笔订单，再把适用条件放到购买前能明确了解的位置。店员还接受培训，学习怎样区分质量问题与改变主意的退货。修改后，咨询变多了，订单完成速度稍慢，但相关争议减少。店主说，说明条件可能让一部分人不买，却也能减少买后才发现不合适的冲突。他不再把一句容易传播的话当作完整服务承诺，而是检查顾客是否有机会理解它的边界。",
    translation:
      "A small online shop advertised 'returns within seven days' because the owner thought it memorable. A customer returned opened, used earphones, and staff said that category was excluded from ordinary returns. The customer felt misled. Reviewing the page, the owner found the restriction buried in lengthy details without an advertising warning. Instead of blaming inattentive reading, he honored the original promise for that order and made conditions clear before purchase. Staff learned to distinguish defects from changes of mind. Questions increased and checkout slowed slightly, but disputes declined. The owner accepted that clear conditions might deter purchases while preventing later conflict, and checked whether customers could understand the promise's limits.",
    questions: [
      {
        prompt: "店主复查后承认了什么？",
        options: [
          "顾客从未购买耳机",
          "广告已经清楚列出所有例外",
          "限制没有在购买前得到足够明确的提示",
          "所有商品依法都不能退",
        ],
        answer: 2,
        explanation:
          "The restriction was hidden in lengthy details and absent from the advertisement's warning.",
      },
      {
        prompt: "修改后出现了哪组变化？",
        options: [
          "咨询和争议都完全消失",
          "订单更快但争议更多",
          "所有顾客都停止购买",
          "咨询增多、速度稍慢，但相关争议减少",
        ],
        answer: 3,
        explanation: "These three changes are explicitly reported together.",
      },
      {
        prompt: "店主最终怎样理解服务承诺？",
        options: [
          "不仅要容易传播，还要让顾客理解适用边界",
          "只要口号简单就不必说明条件",
          "任何例外都应隐藏",
          "顾客不买就证明说明失败",
        ],
        answer: 0,
        explanation:
          "The ending shifts from a memorable slogan to an informed understanding of scope.",
      },
    ],
  },
  {
    id: "r6-apprentice-skills",
    level: 6,
    title: "Learning what a checklist cannot show",
    text: "家具厂让新学徒按照操作清单学习打磨。小钟把每个步骤都记住了，却总在最后检查时留下细小划痕。他以为是自己动作不够快，老师傅却请他闭上眼，用手轻轻摸木面。小钟这才发现，看起来平整的地方仍有方向不同的纹路。老师傅解释，清单能提醒顺序，但木材情况不同，力度和方向还要根据触感判断。接下来的练习中，小钟先观察一小块，再试着调整，而不是整块照同一个力度做。他也把判断时注意的线索写进笔记，供其他学徒讨论。老师傅提醒，这些笔记不是新的万能清单，因为不同材料还会带来不同问题。一个月后，小钟完成得更稳定，却不再把熟练理解为照步骤做得最快。他说，真正的进步是知道何时可以照常操作，何时应该停下来检查，而不是等成品出现问题才发现自己忽略了差别。",
    translation:
      "A furniture factory trained apprentices with a sanding checklist. Xiao Zhong memorized every step but left fine scratches at final inspection. Thinking he needed greater speed, he was instead asked to close his eyes and feel the wood. Apparently smooth areas contained differently oriented grain. The master explained that a checklist gave order, while pressure and direction required judgment for each piece. Xiao Zhong began testing a small area and adjusting rather than using uniform pressure throughout. He recorded judgment cues for discussion, but was warned that these were no universal checklist. A month later, his work was more consistent. He understood expertise as knowing when ordinary procedures sufficed and when to stop and inspect, not simply maximum speed.",
    questions: [
      {
        prompt: "老师傅让小钟触摸木面，是为了什么？",
        options: [
          "让他忘记所有操作顺序",
          "发现仅凭外观看不出的材料差异",
          "训练他闭眼完成所有工作",
          "证明动作速度决定一切",
        ],
        answer: 1,
        explanation:
          "Touch reveals differing grain in areas that appear flat, informing pressure and direction.",
      },
      {
        prompt: "为什么新笔记也不是万能清单？",
        options: [
          "小钟没有写任何线索",
          "所有木材情况都相同",
          "不同材料仍需要具体判断",
          "其他学徒不允许讨论",
        ],
        answer: 2,
        explanation:
          "The master explicitly says different materials bring different problems.",
      },
      {
        prompt: "小钟对熟练的理解发生了什么变化？",
        options: [
          "完全放弃任何步骤",
          "只重视完成速度",
          "认为检查只能在成品阶段进行",
          "重视识别何时需要调整和检查",
        ],
        answer: 3,
        explanation:
          "The final distinction is between routine operation and knowing when to pause.",
      },
    ],
  },
  {
    id: "r6-museum-audio",
    level: 6,
    title: "An audio guide for more than dates",
    text: "博物馆准备更新语音导览，原稿主要介绍画家的生平和作品年代。一位视障参观者试听后说，自己听到了许多背景，却仍不知道画面里有什么。策展人起初认为，描述颜色和位置会挤占讲解时间。双方一起试走展厅后发现，有些信息必须先交代，观众才有机会理解后面的分析。新版本先说明画面中人物的位置、动作和主要物件，再介绍历史解释，同时把细节分成可以自行选择的段落。团队请不同经验的参观者试听，而不是只请熟悉艺术的人评价。结果，有视力的观众也觉得这种顺序更容易跟上。策展人没有因此宣称所有人需要完全相同的导览，因为有人希望听得简短，有人愿意深入。更新保留了选择长度的方式，还提供文字版本。项目让团队认识到，增加可理解的入口未必降低内容深度，关键在于组织信息，而不是把所有解释一次塞给每位观众。",
    translation:
      "A museum's audio-guide draft focused on artists' lives and dates. A visually impaired visitor said it gave background without explaining what the paintings contained. The curator worried that describing color and position would consume time. A joint gallery trial showed that basic scene information could make later analysis comprehensible. The revision described figures, actions, and objects first, then historical interpretations, with optional detail segments. People of varied experience tested it, not just art experts, and sighted visitors also found the sequence easier. The team did not infer everyone wanted identical guidance: it retained length choices and a text version. Accessible entry points could coexist with depth through better information organization.",
    questions: [
      {
        prompt: "试听者指出原稿缺少什么？",
        options: [
          "对画面具体内容的说明",
          "画家的任何生平资料",
          "作品年代",
          "策展人的姓名",
        ],
        answer: 0,
        explanation:
          "She heard background but still did not know what was in the picture.",
      },
      {
        prompt: "新版本怎样兼顾基础理解与深入内容？",
        options: [
          "取消所有历史解释",
          "先描述画面，再提供可选择的深入段落",
          "只让艺术专家试听",
          "要求每个人听同样长的内容",
        ],
        answer: 1,
        explanation:
          "Scene description precedes analysis, with detail segments selectable by listeners.",
      },
      {
        prompt: "有视力的观众也受益，能支持哪项结论？",
        options: [
          "所有人对长度的需要都相同",
          "文字版本已经无用",
          "更清楚的信息顺序可帮助不止一种观众",
          "视觉信息从此不重要",
        ],
        answer: 2,
        explanation:
          "The shared benefit concerns sequence; the text explicitly retains differing length needs.",
      },
    ],
  },
  {
    id: "r6-street-trees",
    level: 6,
    title: "Shade is not the same as green area",
    text: "街道计划改造一片空地，最初方案是在路边种低矮灌木，因为整齐、容易维护。一位每天步行接孩子的居民提出，夏天这条路很晒，灌木虽然增加绿化面积，却不能提供头顶的阴凉。设计师承认，原方案主要考虑从远处看是否美观，没有充分观察行人的使用情况。团队随后在下午测了几个路段的温度，并记录人们停留的位置，发现最热的地方正好缺少可休息的树荫。他们改为在适合的区域种树，同时保留一部分灌木，以免影响路口视线。新树需要几年才能长大，街道便先增加临时遮阳设施。负责人没有把种树数量直接当成舒适程度，而是计划继续了解不同季节的体验。这次修改并不是说灌木没有价值，而是提醒大家，绿化指标与人实际感受到的环境之间，还需要具体的设计和长期维护来连接。",
    translation:
      "A street renovation first proposed low shrubs for neatness and easy maintenance. A resident walking to collect a child pointed out that the exposed summer route needed overhead shade, not merely more green area. The designer admitted prioritizing distant appearance over pedestrian use. Afternoon temperature measurements and observations showed the hottest sections lacked resting shade. The revision added trees where suitable and retained some shrubs to preserve junction visibility. Since trees would take years to grow, temporary shade was added. The team planned seasonal feedback rather than equating tree count with comfort. Shrubs still had value, but numerical greening targets required specific design and maintenance to become experienced benefits.",
    questions: [
      {
        prompt: "居民的意见区分了哪两个概念？",
        options: [
          "步行与乘车的票价",
          "路口与学校的距离",
          "树木与所有维护成本",
          "绿化面积与行人实际获得的阴凉",
        ],
        answer: 3,
        explanation:
          "Shrubs increase green area but do not provide overhead shade for walkers.",
      },
      {
        prompt: "为什么没有把所有灌木都换成树？",
        options: [
          "部分位置需要保持路口视线",
          "树木永远不能遮阳",
          "居民只想看远景",
          "温度测量已经取消",
        ],
        answer: 0,
        explanation: "Some shrubs remain 以免影响路口视线.",
      },
      {
        prompt: "负责人为何继续了解不同季节的体验？",
        options: [
          "种树后不必再维护",
          "数量不能直接证明实际舒适程度",
          "临时遮阳设施必须永久替代树木",
          "所有季节体验都必定相同",
        ],
        answer: 1,
        explanation:
          "The plan explicitly rejects tree count as a direct measure of comfort.",
      },
    ],
  },
  {
    id: "r6-remote-boundaries",
    level: 6,
    title: "Availability while working from home",
    text: "公司允许部分员工在家办公后，经理发现晚间消息的回复速度提高了，便认为大家更有工作积极性。员工小程却说，自己常怕不及时回复会被认为偷懒，因此睡前也不停查看手机。几位同事有类似感受，但此前没有主动提出。经理听完后，意识到回复快不一定代表自愿，也可能是规则不明确带来的压力。团队随后约定普通消息在工作时间回复，紧急事务使用单独的联系渠道，并说明什么情况才算紧急。每周会议还检查任务是否完成，而不再以在线时间判断贡献。一个月后，晚间回复变少，项目进度没有明显变差。小程仍然会在特殊情况协助，但不必每天证明自己随时可用。经理说，灵活办公不应把办公室的边界完全取消，清楚约定何时需要回应，反而能让真正紧急的沟通更容易得到注意。",
    translation:
      "After allowing home working, a manager saw faster evening replies and inferred greater enthusiasm. Xiao Cheng explained that he checked his phone before bed for fear of appearing lazy; colleagues felt similarly. The manager realized speed might reflect unclear expectations rather than voluntary commitment. The team set normal replies during work hours, a separate urgent channel, and a definition of emergencies. Weekly meetings checked completed tasks instead of online time. Evening replies decreased without clearly worse project progress. Staff could still help exceptionally without proving constant availability. The manager concluded that flexible work needed boundaries, which could also make genuine emergencies more noticeable.",
    questions: [
      {
        prompt: "经理最初的推断忽略了什么可能性？",
        options: [
          "员工从不看手机",
          "所有任务已经停止",
          "快速回复可能来自担忧和隐性压力",
          "晚间消息完全无法发送",
        ],
        answer: 2,
        explanation:
          "Xiao Cheng replies from fear of seeming lazy, not necessarily enthusiasm.",
      },
      {
        prompt: "新约定怎样处理紧急事务？",
        options: [
          "一律等到下周会议",
          "把所有消息都称为紧急",
          "不允许员工联系经理",
          "使用单独渠道，并明确紧急的定义",
        ],
        answer: 3,
        explanation:
          "The team distinguishes emergencies with both a channel and criteria.",
      },
      {
        prompt: "一个月后的结果最直接支持什么？",
        options: [
          "减少常态晚间回复并未明显损害进度",
          "所有远程办公都比办公室高效",
          "团队以后不会遇到紧急事务",
          "工作时间的回复也应取消",
        ],
        answer: 0,
        explanation:
          "Evening replies fall while progress does not clearly worsen; broader claims are not established.",
      },
    ],
  },
  {
    id: "r7-news-correction",
    level: 7,
    title: "Correcting a story without hiding the change",
    text: "地方报纸报道一家工厂即将关闭，消息很快被转发。记者依据的是一位员工听到的会议片段，标题却没有保留“可能”二字。第二天，工厂说明只准备关闭一条旧生产线，其他部门仍将运转。编辑最初想直接修改网页，让错误内容不再出现。年轻记者提出，已经读过或转发的人未必会再次打开原文，悄悄修改也不能解释为何出错。报社于是发布单独的更正，说明原报道把局部调整写成整体停产，并联系主要转发者提供更新。记者还重新采访员工，发现他们担心的是岗位调整，而不是已经确认的全面关闭。新报道把已知事实、员工忧虑和仍待核实的问题分别交代。有人批评公开错误会损害报纸形象，编辑却认为，承认错误不能自动恢复信任，但至少让读者知道变化的依据。报社随后增加标题复核，要求编辑检查标题的确定程度是否超过正文证据。这件事没有使报道从此不出错，却改变了他们处理不确定信息与更正责任的方式。",
    translation:
      "A local paper reported that a factory would close, based on a worker's fragment of a meeting, but the headline omitted 'possibly.' The factory clarified that only an old production line might close while other departments continued. The editor first wanted to silently change the webpage. A reporter noted that previous readers might never reopen it and that silent changes did not explain the error. The paper issued a separate correction, contacted major sharers, and reinterviewed workers, distinguishing known facts, job concerns, and unresolved questions. The editor acknowledged that admitting error could not automatically restore trust but explained the basis for change. Headline review was added to prevent stronger certainty than the evidence supported. Errors remained possible, but handling of uncertainty and corrections changed.",
    questions: [
      {
        prompt: "原报道主要怎样超出了证据？",
        options: [
          "把旧生产线写成新生产线",
          "把局部可能调整写成工厂确定关闭",
          "把员工担忧写成没有担忧",
          "把正式更正写成私人意见",
        ],
        answer: 1,
        explanation:
          "A meeting fragment and possible line closure became a definite factory-closure headline.",
      },
      {
        prompt: "为什么不只悄悄修改网页？",
        options: [
          "原网页从未被阅读",
          "报社无法修改任何网页",
          "已传播的读者需要知道更正及其原因",
          "单独更正能保证所有人立刻信任",
        ],
        answer: 2,
        explanation:
          "Previous readers may not reopen the original, and a silent change fails to explain the error.",
      },
      {
        prompt: "标题复核针对的核心问题是什么？",
        options: [
          "标题必须比正文更长",
          "任何报道都不能表达确定事实",
          "员工意见不能进入新闻",
          "标题的确定程度不应超过证据",
        ],
        answer: 3,
        explanation:
          "The new requirement explicitly checks certainty in headlines against body evidence.",
      },
    ],
  },
  {
    id: "r7-irrigation-turns",
    level: 7,
    title: "Sharing water along one channel",
    text: "旱季来临时，上游与下游的农户为灌溉争执。上游认为自己先维护了水渠，理应先用；下游则说，若上游长时间取水，流到后面的水就不足。村里原想按田地面积分配相同的用水时长，却发现不同位置的流量并不一样，同样一小时不等于得到同样多的水。负责协调的技术员请大家一起测量，并记录不同作物急需水的时期。新的安排不只规定轮流顺序，还根据实际流量调整时长，在最干的时候优先照顾不能延迟灌溉的地块。为避免谁说了算的问题，测量结果由双方代表共同确认，临时改变也须说明理由。第一轮执行仍有抱怨，因为有人觉得照顾急需地块意味着自己等待更久。协调者没有把这种不满说成自私，而是承认分配必须面对真实代价，并约定下一轮复查。大家最后接受的是一个可以核查和修改的程序，而不是相信任何一次安排都能让所有人毫无损失。",
    translation:
      "During drought, upstream farmers claimed priority for maintaining the channel, while downstream farmers feared insufficient remaining water. Equal irrigation time by field area initially seemed fair, but differing flow meant equal hours did not provide equal water. A technician organized joint measurements and crop-need records. The revised schedule adjusted time for actual flow and prioritized plots unable to delay irrigation in the driest period. Both sides confirmed measurements, and temporary changes required reasons. Complaints persisted from farmers waiting longer. Rather than label them selfish, the coordinator acknowledged real allocation costs and promised review. The agreement rested on a checkable, revisable process, not a claim that any allocation could leave everyone without loss.",
    questions: [
      {
        prompt: "为什么相同用水时长未必公平？",
        options: [
          "不同位置流量不同，实际得到的水量可能不同",
          "所有田地都不需要水",
          "下游没有任何作物",
          "维护水渠与灌溉完全无关",
        ],
        answer: 0,
        explanation:
          "The passage distinguishes equal time from equal quantity because flow varies by location.",
      },
      {
        prompt: "共同确认测量结果有什么作用？",
        options: [
          "取消所有轮流安排",
          "让分配依据可由双方核查",
          "保证任何农户都不用等待",
          "使临时改变不必解释",
        ],
        answer: 1,
        explanation:
          "Joint confirmation and stated reasons reduce dependence on one side's unchecked authority.",
      },
      {
        prompt: "最后的接受主要建立在什么基础上？",
        options: [
          "每个人都完全满意",
          "上游永久拥有优先权",
          "程序能够核查并在下一轮调整",
          "一次测量能解决所有未来旱季",
        ],
        answer: 2,
        explanation:
          "The ending emphasizes a checkable, revisable procedure despite continuing costs.",
      },
    ],
  },
  {
    id: "r7-translating-humor",
    level: 7,
    title: "Keeping a joke alive in translation",
    text: "剧团准备把一出地方喜剧带到外地演出。译者小孟发现，其中一句笑话依靠当地词语的两个意思，直译后观众只能听见普通陈述。导演建议删掉，演员却觉得，这句台词表现了角色总爱假装聪明的性格。小孟于是没有寻找一模一样的词，而是设计了另一种误会，让角色仍在自作聪明时暴露自己的无知。排练中，新的笑点有效，但原作者担心它改变了人物的说话习惯。几人一起比较后，保留了情节功能，又把措辞改得更接近角色平时的语气。演出说明交代了这一改动，而没有宣称所有语言细节都能无损转换。小孟说，忠实不一定等于逐词相同，也不能成为译者随意发挥的借口；需要先说明保留什么、改变什么，以及为什么。外地观众的反馈随后被带回讨论，有人喜欢新笑话，有人更想了解原来的双关。剧团因此在交流活动中演示两个版本，让翻译的取舍本身也成为理解地方文化的入口。",
    translation:
      "A troupe touring a regional comedy found that a local pun became an ordinary statement in literal translation. The director suggested removal, but actors saw it as revealing a character's pretended intelligence. Translator Xiao Meng created another misunderstanding with the same dramatic function. It got laughs, yet the author worried about the character's voice. They retained the function and revised wording toward the usual voice, disclosing the adaptation rather than claiming lossless transfer. Xiao Meng argued that fidelity was neither word-for-word identity nor unrestricted invention: choices needed explanation. Audience feedback included enjoyment and curiosity about the original pun, so the troupe demonstrated both versions in discussions, using translation decisions as an entry to local culture.",
    questions: [
      {
        prompt: "为什么演员不愿直接删掉笑话？",
        options: [
          "所有台词都必须逐字不变",
          "外地观众已经听懂双关",
          "导演禁止讨论人物",
          "笑话还承担表现角色性格的功能",
        ],
        answer: 3,
        explanation:
          "The joke reveals the character's habit of pretending to be clever.",
      },
      {
        prompt: "最终修改怎样兼顾不同要求？",
        options: [
          "保留情节功能，并调整措辞贴近角色语气",
          "只追求笑声，完全忽略人物",
          "删除所有地方文化内容",
          "保证两个语言中的每个词都相同",
        ],
        answer: 0,
        explanation:
          "The collaborators preserve dramatic function while revising voice.",
      },
      {
        prompt: "演示两个版本有什么意义？",
        options: [
          "证明原版本没有价值",
          "让观众理解翻译的取舍和地方文化",
          "免除译者说明改动的责任",
          "要求观众只能喜欢一个版本",
        ],
        answer: 1,
        explanation:
          "The ending explicitly makes translation choices a route to understanding local culture.",
      },
    ],
  },
  {
    id: "r7-negative-study",
    level: 7,
    title: "Publishing a result that did not confirm the hope",
    text: "研究团队测试一种新的节能材料，最初预计它会明显降低建筑耗电。几个月的实验结束后，结果却与普通材料相近。部分成员担心公开会让资助者失望，建议等到下一轮有好结果再发布。负责人认为，如果只让成功实验进入讨论，其他团队可能重复同样的无效尝试，公众也会高估技术成熟程度。报告因此如实说明测试条件、测量误差和没有发现明显优势的结果，同时避免把一次实验写成材料永远无效的证明。资助者追问下一步是否还值得投入，团队提出先检查材料在不同气候下的表现，再决定是否扩大研究，而不是为了维持乐观不断重复原方案。公开后，一家实验室联系他们，指出自己曾遇到相似限制，并愿意共享记录。负责人说，负面结果不是自动有用，必须把方法和边界交代清楚；但它也不应仅因不符合期待而被隐藏。研究价值既包括找到可行方向，也包括让别人知道哪些路径还缺少支持。",
    translation:
      "A team expected a new energy-saving material to reduce electricity use, but months of testing found performance similar to ordinary material. Some wanted to delay publication until a favorable result. The leader argued that publishing only successes invited duplicated unsuccessful work and exaggerated perceived maturity. The report disclosed conditions, uncertainty, and no clear advantage without declaring permanent uselessness. For future funding, the team proposed testing different climates before expansion, not repeating the same plan to sustain optimism. Another lab shared similar limitations. The leader said negative findings needed clear methods and boundaries to be useful, but should not be hidden merely for disappointing expectations. Research also identified paths lacking support.",
    questions: [
      {
        prompt: "负责人为什么主张公开结果？",
        options: [
          "一次实验已证明材料永远无效",
          "资助者要求只看好消息",
          "隐藏不利结果可能导致重复尝试和过度乐观",
          "任何负面结果都自动有价值",
        ],
        answer: 2,
        explanation:
          "The stated risks are duplicated ineffective attempts and overstated technological maturity.",
      },
      {
        prompt: "报告怎样限制结论？",
        options: [
          "删除全部测试条件",
          "把相近结果写成巨大优势",
          "保证所有气候下都一样",
          "说明本次条件与误差，不作永久无效的断言",
        ],
        answer: 3,
        explanation:
          "It reports the observed result while refusing a universal impossibility claim.",
      },
      {
        prompt: "下一步计划体现了什么？",
        options: [
          "先检查新的相关条件，再判断是否扩大投入",
          "为保持乐观无限重复原实验",
          "立即取消所有材料研究",
          "只选择可能成功的记录公开",
        ],
        answer: 0,
        explanation:
          "Different-climate checks are proposed before committing to expansion.",
      },
    ],
  },
  {
    id: "r7-alert-verification",
    level: 7,
    title: "A warning with a missing date",
    text: "暴雨期间，居民群里流传一段通知，称附近道路已经封闭。消息没有日期，却附着过去一次积水的照片。有人催大家立即转发，也有人说一定是假消息。社区工作人员没有只凭照片下判断，而是联系道路管理部门，确认当天实际关闭的路段与预计恢复时间。她发现，照片确实来自旧事件，但其中一条道路当天也因积水暂时关闭。若简单说整条消息是假的，同样可能让居民误以为所有道路畅通。工作人员于是发布新的说明，分别列出已核实的情况和仍需等待更新的部分，并提醒大家使用带时间的最新通知。她还请已经转发的人补充更正，而不是只在群里批评他们。随后，志愿者帮助不常看手机的居民了解出行变化。事件过后，社区讨论如何让紧急信息有固定来源和更新时间。大家认识到，判断消息不只是给它贴上真或假的标签，还需要把具体内容、适用时间和行动建议核对清楚。",
    translation:
      "During heavy rain, a neighborhood group shared an undated road-closure notice with an old flooding photograph. Some urged immediate forwarding; others called it certainly fake. A worker checked with road authorities for current closures and reopening estimates. The photo was old, but one mentioned road was also temporarily closed that day. Dismissing the whole message could falsely suggest all roads were open. She issued an updated account separating verified facts from pending updates, advised using dated current notices, and asked sharers to add corrections rather than only blaming them. Volunteers reached residents who rarely checked phones. Afterwards, the community discussed fixed sources and update times: verification required checking specific content, timing, and action advice, not just a true-or-false label.",
    questions: [
      {
        prompt: "为什么不能仅凭旧照片把整条消息判为虚假？",
        options: [
          "旧照片一定能证明当天情况",
          "其中一条道路当天确实暂时关闭",
          "所有道路每天都封闭",
          "日期对道路信息没有影响",
        ],
        answer: 1,
        explanation:
          "An outdated image coexists with one genuinely current closure, so the contents need separate verification.",
      },
      {
        prompt: "工作人员怎样减少已传播信息的影响？",
        options: [
          "只责备转发者",
          "删除全部出行建议",
          "发布更新并请转发者补充更正",
          "保证道路马上全部开放",
        ],
        answer: 2,
        explanation:
          "She supplies verified updates and asks earlier sharers to append corrections.",
      },
      {
        prompt: "结尾强调的核查方式是什么？",
        options: [
          "只看图片是否熟悉",
          "只看转发人数多少",
          "任何紧急消息都不应阅读",
          "核对内容、时间和行动建议",
        ],
        answer: 3,
        explanation:
          "The ending explicitly names these dimensions beyond a binary label.",
      },
    ],
  },
  {
    id: "r7-family-care",
    level: 7,
    title: "Sharing care across two cities",
    text: "母亲出院后，两个住在不同城市的孩子商量怎样照顾她。姐姐离得近，负责陪同复诊；弟弟提出承担主要费用，认为这样分工已经公平。姐姐却说，临时请假、安排交通和夜里接电话的时间，没有出现在费用表里。弟弟起初觉得她是在计较，后来跟着陪诊一天，才发现等待与沟通占了许多精力。两人重新安排，弟弟每月来住几天，也负责预约和整理医疗资料，姐姐不必独自处理所有突发联系。他们还请母亲说明自己希望获得什么帮助，而不是只替她作决定。新安排仍不可能把每一小时算得完全相等，母亲也不愿所有生活都被记录。家人因此只在每月谈一次主要负担，允许根据工作和身体情况调整。姐姐说，她需要的不是证明自己付出最多，而是让不容易看见的劳动得到理解。弟弟也发现，出钱很重要，却不能自动代替参与；公平有时来自持续沟通，而不是一次分工后再也不问。",
    translation:
      "After their mother's discharge, siblings in different cities divided care. The nearby sister handled follow-ups; the brother offered most expenses and considered this fair. She pointed out uncounted leave, transport planning, and nighttime calls. After accompanying a visit, he understood the time and effort. He began staying several days monthly and handling appointments and records, while their mother was asked about her own preferences. Hours could not be perfectly equal, and she did not want every detail logged. They discussed major burdens monthly and adjusted for work and health. The sister wanted invisible labor understood rather than to prove she gave most. The brother recognized money's value without treating it as a substitute for participation.",
    questions: [
      {
        prompt: "姐姐指出原分工忽略了什么？",
        options: [
          "陪诊安排和突发联系等不易计入费用的劳动",
          "弟弟从未愿意付钱",
          "母亲没有任何个人意愿",
          "两个孩子住在同一城市",
        ],
        answer: 0,
        explanation:
          "She names time off, travel planning, and nighttime calls absent from expense calculations.",
      },
      {
        prompt: "为什么只定期讨论主要负担，而不记录每个细节？",
        options: [
          "家人决定停止照顾",
          "既要调整分工，也尊重母亲不愿全面记录的意愿",
          "所有劳动已经完全相等",
          "姐姐不再有任何工作",
        ],
        answer: 1,
        explanation:
          "The limited monthly discussion responds to changing burdens and the mother's preference.",
      },
      {
        prompt: "结尾对公平的理解最接近哪项？",
        options: [
          "谁出钱就永远不用参与",
          "精确费用表足以解决所有关系",
          "需要持续了解负担并调整，而非一次性分配",
          "只有证明自己付出最多才公平",
        ],
        answer: 2,
        explanation:
          "Both siblings move toward ongoing communication rather than permanent settlement by money or ranking.",
      },
    ],
  },
  {
    id: "r8-flood-insurance",
    level: 8,
    title: "Insurance when the map changes",
    text: "沿海小镇准备更新洪水保险，保险公司根据近年的风险模型提高部分街区的费用。居民并不否认水灾威胁，却质疑模型只按居住位置分类，没有充分考虑已经完成的排水改造。一些人要求维持旧价，另一些人担心若价格过低，未来损失最终仍由全体投保者承担。镇议会邀请研究者解释模型，发现改造确实可能降低某些风险，但其长期效果尚缺少连续记录。讨论于是区分了两个问题：如何估计真实风险，以及无法承担高费用的人应获得什么支持。前者不能仅凭居民愿望改变，后者也不能被一句“模型算出来的”取消。最终，保险公司同意公开主要假设，并允许提交具体改造证据申请复核；议会则设立有期限的补助，同时持续监测排水效果。有人认为补助只是把费用转给其他人，议会承认资源有限，因而公开资金来源和退出条件。新安排没有消除风险预测的不确定性，也没有保证所有街区同价。它试图让技术判断接受核查，让分担成本的选择获得明确解释，而不是把两种不同责任混在一个数字里。",
    translation:
      "A coastal town faced higher flood-insurance charges based on recent models. Residents accepted the threat but questioned geographic classification that might overlook drainage improvements. Others feared underpricing would shift future losses to all policyholders. Researchers found possible benefits from improvements but insufficient long-term records. Discussion separated risk estimation from support for people unable to afford premiums: wishes could not determine risk, nor could a model remove social choices. Insurers agreed to disclose assumptions and review specific improvement evidence. The council offered temporary support while monitoring drainage, publishing funding sources and exit conditions in response to cost-shifting objections. The arrangement neither removed predictive uncertainty nor guaranteed equal prices; it made technical claims reviewable and cost-sharing choices explicable.",
    questions: [
      {
        prompt: "讨论为什么要区分风险估计与费用支持？",
        options: [
          "两者都只需居民投票决定",
          "技术预测与成本分担涉及不同责任",
          "模型可以自动决定所有补助",
          "排水改造已证明没有风险",
        ],
        answer: 1,
        explanation:
          "Risk requires evidence, while support is a distributive choice not canceled by a model output.",
      },
      {
        prompt: "提交排水改造证据的渠道针对什么问题？",
        options: [
          "保证所有街区恢复旧价",
          "停止全部风险研究",
          "让具体条件有机会改变未经细分的判断",
          "免除居民承担任何费用",
        ],
        answer: 2,
        explanation:
          "Review can incorporate local improvement evidence overlooked by location-based classification.",
      },
      {
        prompt: "公开资金来源与退出条件有什么作用？",
        options: [
          "证明补助没有任何代价",
          "消除所有未来水灾",
          "使保险公司不再需要模型",
          "让有限资源的分担选择可以被讨论和核查",
        ],
        answer: 3,
        explanation:
          "The council acknowledges limited resources and makes the support's costs and boundaries explicit.",
      },
    ],
  },
  {
    id: "r8-collective-art",
    level: 8,
    title: "A mural with more than one author",
    text: "艺术家受邀为社区创作壁画，最初计划把居民提供的故事转化为自己的作品。完成草稿后，一位参与者发现，祖母的经历被改写成励志故事，原本关于迁居困难的部分却消失了。艺术家解释，画面需要集中主题，不能容纳采访的全部复杂性。居民并未要求逐句照搬，而是希望知道，谁有权决定删去哪些含义。项目因此暂停，把创作权与故事提供者的解释权分开讨论。艺术家仍负责视觉形式，但重要情节的改写须与相关参与者确认；不同意见无法统一时，不把其中一方的版本写成全体共同记忆。最终壁画旁的介绍保留了几种声音，作品署名也说明居民的贡献。有人批评这削弱了艺术家的自主性，艺术家承认合作带来约束，却认为约束并非毫无创造价值，它迫使自己寻找能容纳差异的表达。项目结束后，团队还约定，若故事被用于新的商业宣传，需要重新说明用途，而不能把一次参与当成永久授权。这里的共同创作并不意味着每个人都拥有相同的艺术判断能力，而是让贡献、改写与后续使用的责任不再隐形。",
    translation:
      "An artist used community stories for a mural. A participant found her grandmother's migration difficulties reduced to inspiration. The artist cited thematic focus; residents did not demand literal reproduction, but questioned who could remove meanings. The project paused to distinguish artistic creation from contributors' interpretive rights. The artist retained visual control, while major narrative changes required consultation; unresolved versions could not be presented as unanimous memory. The introduction retained several voices and credited contributions. The artist acknowledged constraints but found creative value in accommodating difference. New commercial uses required renewed explanation, not permanent authorization from one participation. Co-creation did not imply equal artistic expertise; it made contribution, revision, and reuse responsibilities visible.",
    questions: [
      {
        prompt: "居民的异议主要针对什么？",
        options: [
          "重要含义被删改却缺少参与者确认",
          "艺术家使用了任何颜色",
          "所有采访必须逐句画出",
          "社区不应有艺术作品",
        ],
        answer: 0,
        explanation:
          "The concern is loss of migration difficulties and authority over meaning, not literal transcription.",
      },
      {
        prompt: "无法统一的意见怎样处理？",
        options: [
          "由艺术家假称全体同意",
          "不把单一版本当作共同记忆，并保留不同声音",
          "删除所有居民贡献",
          "让每个人画完全相同的部分",
        ],
        answer: 1,
        explanation:
          "The arrangement rejects false consensus and keeps several voices.",
      },
      {
        prompt: "重新说明商业用途的约定体现了什么？",
        options: [
          "任何商业使用都必然违法",
          "艺术家从此不能创作",
          "一次参与不能自动成为无限后续授权",
          "署名能替代所有用途说明",
        ],
        answer: 2,
        explanation:
          "The text explicitly refuses to treat initial participation as permanent permission.",
      },
    ],
  },
  {
    id: "r8-credit-explanation",
    level: 8,
    title: "A credit decision that needs a reason",
    text: "一家银行把小额贷款初审交给自动系统，希望减少人工等待。某位经营修理店的申请者被拒绝，工作人员只能说“评分不足”，无法解释具体原因。申请者发现，系统把收入波动视为高风险，却没有考虑他的业务本来就集中在几个季节。银行起初认为，解释太多会让人学会绕过规则。消费者代表承认审核需要防止欺骗，但指出，不能让这一顾虑成为拒绝任何说明的理由，尤其当资料可能错误时。双方讨论后，银行不公开能够直接被利用的细节，却提供主要影响因素，并允许申请者补充季节性经营记录。复核不保证批准，负责人员仍需判断还款能力，但必须说明补充资料是否改变了原结论。银行还抽查不同职业的拒绝情况，检查某些稳定的评分习惯是否对特定工作方式不利。试行期间，处理时间增加，部分申请仍被拒绝。负责人表示，申诉渠道的价值不在于让每个人得到贷款，而在于使错误可以修正、合理限制可以理解。效率与说明责任因此不是简单替代关系；一个难以质疑的快速结论，可能把未被发现的成本留给申请者。",
    translation:
      "A bank automated initial small-loan reviews. A repair-shop owner was rejected with only 'insufficient score,' although seasonal revenue variation explained an apparent risk. The bank feared explanations would enable gaming. Consumer representatives accepted fraud prevention but rejected it as a reason for no explanation, especially with possible data errors. The bank withheld exploitable details while disclosing major factors and allowing seasonal records. Review did not guarantee approval; repayment assessment remained, with reasons for whether new evidence changed the outcome. Occupational rejection patterns were audited. Processing slowed and some rejections persisted. The appeal route aimed to correct errors and explain reasonable limits, not grant every loan. Fast, unchallengeable decisions could leave hidden costs with applicants.",
    questions: [
      {
        prompt: "修理店案例指出初审可能忽略了什么？",
        options: [
          "申请者从未有收入",
          "所有收入波动都毫无风险",
          "银行不需要判断还款能力",
          "职业的季节性可能解释收入波动",
        ],
        answer: 3,
        explanation:
          "The repair business is concentrated in certain seasons, a relevant context for variability.",
      },
      {
        prompt: "新办法如何回应防止欺骗与说明责任？",
        options: [
          "保留部分敏感细节，同时说明主要因素并允许补充证据",
          "公开所有可利用规则",
          "拒绝任何复核",
          "保证补交资料就批准",
        ],
        answer: 0,
        explanation:
          "The compromise gives meaningful reasons without releasing directly exploitable specifics.",
      },
      {
        prompt: "负责人如何界定申诉渠道的价值？",
        options: [
          "让所有人获得同额贷款",
          "纠正错误并使合理限制可理解",
          "取消还款能力审核",
          "保证处理时间永不增加",
        ],
        answer: 1,
        explanation:
          "The stated aim is correctability and understandable limits, not universal approval.",
      },
    ],
  },
  {
    id: "r8-archaeology-absence",
    level: 8,
    title: "What an empty excavation can show",
    text: "考古队在一处旧聚落没有发现金属工具，地方宣传因此称这里的居民“从不使用金属”。研究员小尹提出，出土材料能说明目前发现了什么，却不能直接证明所有未发现的东西从未存在。工具可能被回收、带走，也可能留在尚未发掘的区域。负责人同意谨慎措辞，但担心过多可能性会使公众觉得研究没有结论。小尹并没有要求把每种想象都写进去，而是区分有依据的替代解释与没有证据的猜测：附近聚落的回收记录可以支持一种可能，任意假设隐藏仓库则不能同样对待。团队随后把结论改为“已发掘区域尚未出土金属工具”，并说明下一步如何比较土层和邻近遗址。讲解员也用这个案例解释，研究的确定程度会随证据改变。有人认为限定语太繁琐，小尹回答，删去限定语虽然简洁，却把地点、范围和时间上的限制变成了对整个文化的判断。公众需要的不是永远没有疑问的故事，而是知道当前解释为什么成立、在哪些条件下可能被修正。谨慎因此不等于放弃判断，而是把判断与它所依靠的材料保持相称。",
    translation:
      "An excavation found no metal tools, and publicity claimed residents never used metal. Xiao Yin argued that findings showed what had been recovered, not that everything absent had never existed: tools might have been recycled, removed, or left in unexcavated areas. She distinguished supported alternatives from arbitrary speculation, citing nearby recycling records but not an imagined hidden store. The team changed the claim to 'no metal tools recovered in excavated areas yet' and outlined comparisons with strata and neighboring sites. Guides explained changing certainty. Xiao Yin argued that removing qualifiers turned limits of place, scope, and time into a whole-culture judgment. Caution meant matching conclusions to evidence, not refusing all judgment.",
    questions: [
      {
        prompt: "宣传结论的主要问题是什么？",
        options: [
          "金属工具不能被考古发现",
          "所有替代解释都已经证实",
          "把未发现直接等同于从未存在",
          "发掘区域等于整个聚落",
        ],
        answer: 2,
        explanation:
          "Absence in current finds does not establish universal historical nonexistence.",
      },
      {
        prompt: "小尹怎样对待不同的替代解释？",
        options: [
          "所有想象都同样可信",
          "只保留最吸引游客的说法",
          "完全拒绝考虑回收",
          "按证据支持程度区分，而非一概并列",
        ],
        answer: 3,
        explanation:
          "Nearby recycling evidence and arbitrary hidden-store speculation are explicitly distinguished.",
      },
      {
        prompt: "文中“谨慎”最接近什么？",
        options: [
          "使结论的范围和确定程度与材料相称",
          "永远不作任何解释",
          "用最多可能性代替全部证据",
          "保证将来不会修改结论",
        ],
        answer: 0,
        explanation:
          "The closing sentence defines caution as proportional judgment, open to revision.",
      },
    ],
  },
  {
    id: "r8-language-course",
    level: 8,
    title: "A language course owned by its speakers",
    text: "几位年轻人想保存祖辈使用的方言，计划录制词语并制作课程。起初，他们按普通话词表逐项询问，老人虽然配合，却觉得说出来的话不像日常聊天。一位教师建议从买菜、劝孩子吃饭和讲旧事等情境开始，让表达与使用场合一起出现。录音变得丰富后，团队又发现不同家庭有不同说法，不能轻易挑一个当作唯一正确答案。老人还担心，带有私人经历的片段被放到网上后，亲友会认出讲述者。项目因此把语言材料与个人故事分别取得许可，允许只用于课堂而不公开传播，并让参与者查看剪辑后的版本。有人觉得这些程序拖慢了保存工作，教师却指出，若为了抢救语言而忽略说话者的选择，所谓保存可能变成把活的交流转为别人可随意使用的资源。课程最后包含多种变体，也说明它们适用的关系和语气。它没有承诺靠几节课就能恢复整种语言，而是邀请学习者继续在家庭与社区中使用。录音有价值，但语言的延续还取决于人们是否有愿意说、能够说的空间。",
    translation:
      "Young people sought to preserve grandparents' dialect through recordings and lessons. Mandarin word-list elicitation felt unlike ordinary conversation, so a teacher proposed contexts such as shopping, urging children to eat, and storytelling. Richer recordings revealed family variants rather than one correct form. Speakers worried private stories could identify them online. The project obtained separate permissions for language and stories, allowed classroom-only use, and showed edited versions. The teacher argued that preservation ignoring speakers' choices could turn living interaction into freely exploitable resources. Lessons included variants and their relationships and tone, without promising full revitalization from a few classes. Continued family and community use needed spaces where people could and wanted to speak.",
    questions: [
      {
        prompt: "从情境开始录音的主要好处是什么？",
        options: [
          "消除所有家庭变体",
          "把表达与实际使用场合联系起来",
          "让老人只说普通话",
          "保证每个词只有一种意思",
        ],
        answer: 1,
        explanation:
          "Everyday situations connect language with where and how it is used.",
      },
      {
        prompt: "为什么分别取得语言材料与个人故事的许可？",
        options: [
          "语言材料完全没有价值",
          "所有故事都必须公开",
          "同意提供表达不等于同意公开私人经历",
          "查看剪辑会破坏方言",
        ],
        answer: 2,
        explanation:
          "The separate permissions respond to identifiable personal details and differing allowed uses.",
      },
      {
        prompt: "结尾为什么强调使用空间？",
        options: [
          "录音可以完全替代交流",
          "课程越短越能恢复语言",
          "变体越多越不能学习",
          "语言延续不仅需要存档，还需要真实交流",
        ],
        answer: 3,
        explanation:
          "The course invites use in families and communities, distinguishing recording from ongoing life.",
      },
    ],
  },
  {
    id: "r8-documentary-edit",
    level: 8,
    title: "Consent after the documentary is edited",
    text: "纪录片导演采访一位返乡创业者，拍摄前取得了公开许可。剪辑时，团队为了形成清晰的转折，把他谈到家庭矛盾的一段放在失败经历之后，使观众容易理解为家人导致了失败。受访者看片后提出，这不是自己原本的意思，家庭问题与经营失误发生在不同阶段。导演起初认为，已经获得许可，剪辑属于创作决定。制片人却指出，许可不能自动消除重新排列造成的含义变化；真实句子也可能在新的顺序中形成误导。团队重新核对时间线，保留创业困难，但增加必要的交代，避免把复杂原因归到某个人身上。导演担心影片失去戏剧性，试映后却发现，观众更愿意讨论主人公如何理解自己的责任，而不是寻找一个坏人。此后，团队在涉及敏感经历的段落中设置事实与含义核查，不让受访者决定所有艺术形式，也不把他们的异议当成必须忽略的干扰。影片的真实性因此不仅来自镜头拍到了什么，还来自剪辑怎样连接材料，以及这种连接是否能向相关的人和观众作出解释。",
    translation:
      "A documentary had advance publication consent from an entrepreneur. Editing placed family conflict after business failure, implying family caused it, though the events belonged to different periods. The director cited creative authority and consent, but the producer noted that true statements could become misleading in a new sequence. They rechecked chronology, retained difficulties, and added context to avoid blaming one person. The director feared lost drama, yet viewers engaged with the protagonist's responsibility rather than seeking a villain. Sensitive passages now received fact-and-meaning checks without giving subjects all artistic control or dismissing objections. Authenticity depended on how editing connected material and whether those connections could be explained, not just recorded footage.",
    questions: [
      {
        prompt: "受访者反对的主要原因是什么？",
        options: [
          "他从未允许任何拍摄",
          "影片完全没有使用真实句子",
          "他要求删除所有经营困难",
          "剪辑顺序形成了不符合原意的因果暗示",
        ],
        answer: 3,
        explanation:
          "Events from different periods were arranged to suggest family caused the failure.",
      },
      {
        prompt: "修改后仍保留创业困难，说明什么？",
        options: [
          "核查误导不等于把人物经历全部美化",
          "受访者获得了所有艺术决定权",
          "所有困难都由家庭造成",
          "影片不再需要时间线",
        ],
        answer: 0,
        explanation:
          "The team keeps difficulties while correcting chronology and simplistic blame.",
      },
      {
        prompt: "结尾如何理解纪录片真实性？",
        options: [
          "只要每句话真实，任何组合都真实",
          "既要核查材料，也要负责地解释材料之间的连接",
          "戏剧性越强越真实",
          "取得一次许可后无需再回应异议",
        ],
        answer: 1,
        explanation:
          "The final account includes editorial relationships and accountability, not just camera capture.",
      },
    ],
  },
  {
    id: "r9-ecological-compensation",
    level: 9,
    title: "Compensation is not the same as replacement",
    text: "一项建设工程拟占用旧林地，承办方提出在别处种植更多树木，称这样足以补偿生态损失。方案把树木数量作为主要比较依据，公众讨论却很快转向森林形成的时间、土壤关系和动物栖息条件。承办方回应，新林地总会逐渐成熟，不能因为无法立即恢复就否定所有补偿。生态研究者承认补植可能有价值，但指出，未来可能形成的功能与眼前已经存在的功能并非同一事物；几十年的等待也不是没有代价。双方随后把“是否允许占用”与“若占用如何减轻损失”分开评估，避免用补偿承诺直接替代对必要性的审查。新的报告比较了绕开林地的替代路线，并说明各方案的费用、工期与不可恢复部分。最终选择没有完全避免损失，但缩小了占用范围，补植计划也增加长期监测和未达目标时的责任安排。有人认为这只是让项目更贵，研究者则说，过去没有写进预算的损失，并不因此等于不存在。项目结束后的评估仍需追踪，因为漂亮的种植数字不能提前证明生态关系已经重建。讨论的意义不在于宣布一种万能换算，而在于使不可替代的价值、可以减轻的损失与由谁承担的不确定性分别得到说明，让补偿成为承担责任的一部分，而不是购买不再追问的许可。",
    translation:
      "A construction project proposed replacing old woodland with more trees elsewhere, treating counts as sufficient compensation. Debate raised forest age, soil relationships, and habitat. Developers argued replacement would mature; researchers accepted possible value but distinguished future functions from present ones and the cost of decades of waiting. Assessment separated whether occupation was justified from how to reduce damage, comparing alternative routes, cost, duration, and irrecoverable losses. The final choice reduced but did not remove occupation, with long-term monitoring and responsibility for failed targets. Researchers noted that unbudgeted losses still existed. Planting totals could not prove restored ecological relationships. Compensation needed to acknowledge irreplaceable value, reducible loss, and who bore uncertainty, rather than purchase permission to stop asking questions.",
    questions: [
      {
        prompt: "为什么种植更多树木不能自动证明充分补偿？",
        options: [
          "新树永远没有任何生态价值",
          "数量未涵盖成熟时间和既有生态关系",
          "旧林地只由树木数量决定价值",
          "所有建设都不需要必要性审查",
        ],
        answer: 1,
        explanation:
          "Age, soil, habitat, and waiting costs distinguish future trees from existing ecological functions.",
      },
      {
        prompt: "把允许占用与减轻损失分开评估，主要避免什么？",
        options: [
          "讨论任何工程费用",
          "比较不同路线",
          "以补偿承诺代替是否有必要占用的判断",
          "为监测规定责任",
        ],
        answer: 2,
        explanation:
          "The text explicitly prevents compensation promises from replacing necessity review.",
      },
      {
        prompt: "结尾对补偿的要求是什么？",
        options: [
          "只要种树数量漂亮就结束追踪",
          "补偿应让公众永远不再质疑",
          "所有损失都能立即等价交换",
          "说明价值差异与责任，并持续检验实际效果",
        ],
        answer: 3,
        explanation:
          "Long-term evaluation and distinct kinds of value prevent a simplistic exchange formula.",
      },
    ],
  },
  {
    id: "r9-transport-average",
    level: 9,
    title: "A faster average with slower journeys for some",
    text: "城市调整公交线路后，报告称平均通勤时间减少了八分钟，因此改革已经成功。居民代表没有否认这个平均值，却询问被取消直达路线的人发生了什么变化。复核发现，多数中心城区乘客节省时间，少量偏远地区乘客却需要换乘，部分人的行程增加了半小时。支持改革的人认为，总体收益仍然明显，不应让少数需求阻止所有改进。反对者则指出，时间损失落在谁身上很重要，尤其当这些人没有其他可负担的交通选择。研究小组没有把两方简化为效率与公平的敌对阵营，而是比较保留部分早晚直达车、提供换乘保障和增加支线等方案，说明各自的成本与受益范围。市政府最后保留总体调整，补充高需求时段的直达服务，并承诺公开不同地区的通勤分布，而不只公布单一平均值。新办法仍无法让每个人都更快，也需要额外资金。报告因此改为说明整体改善和仍存在的负担，不再把统计上的进步写成所有人的共同体验。此事表明，平均数可以支持一个有限结论，却不能替代对分布与选择余地的了解。公共决策必须解释为何接受某些代价、如何减轻集中损失，以及受影响者能否继续提出异议；否则，看似客观的汇总也可能把需要讨论的价值判断隐藏起来。",
    translation:
      "After bus-route changes, a report claimed success from an eight-minute average commute reduction. Resident representatives accepted the average but asked about lost direct routes. Most central riders benefited, while some outlying riders needed transfers and lost half an hour. Supporters emphasized overall gains; critics emphasized who paid costs, especially without affordable alternatives. Researchers compared peak-hour direct buses, transfer guarantees, and feeders rather than casting efficiency and fairness as enemies. The city kept the overall change, added peak direct service, and promised regional distributions rather than one average. Costs and unequal outcomes remained. The revised report distinguished aggregate improvement from universal experience, requiring reasons for accepted costs, mitigation of concentrated losses, and continuing opportunities to object.",
    questions: [
      {
        prompt: "居民代表的提问为什么没有直接否定平均值？",
        options: [
          "平均值可以真实，却不足以说明不同群体的变化",
          "平均值从来不能计算",
          "所有乘客都损失半小时",
          "中心城区乘客没有受益",
        ],
        answer: 0,
        explanation:
          "They accept the aggregate while investigating its distribution and omitted burdens.",
      },
      {
        prompt: "比较多种补充方案有什么作用？",
        options: [
          "证明效率与公平无法一起讨论",
          "把价值冲突转为可比较的减损选择",
          "保证不用任何额外资金",
          "取消所有总体调整",
        ],
        answer: 1,
        explanation:
          "Concrete alternatives allow costs and benefit ranges to be compared without a binary opposition.",
      },
      {
        prompt: "新报告为何不再宣称所有人共同受益？",
        options: [
          "它不再报告任何数据",
          "平均通勤时间实际没有减少",
          "总体改善仍伴随部分人的额外负担",
          "所有异议都已经消失",
        ],
        answer: 2,
        explanation:
          "The policy still cannot make every journey faster and requires extra resources.",
      },
    ],
  },
  {
    id: "r9-source-authority",
    level: 9,
    title: "A confident answer with uncertain sources",
    text: "研究所试用一个自动问答工具，帮助公众了解地方历史。工具把多份档案连接起来，回答流畅，使用者很少继续查看来源。一次公开活动中，它把两位同名人物的经历合并，给出一个看似完整的生平。工作人员最初只想改正这个答案，档案员却指出，问题不仅是某条信息错误，还在于系统没有显示连接材料时经过了怎样的判断。开发团队提出增加置信度数字，认为这样能提示不确定性。档案员承认数字可能有帮助，但普通读者未必知道它与历史证据之间有什么关系。双方于是把答案拆成可追溯的陈述，标明各自依据，并在存在冲突时说明没有统一结论。工具仍能提供概括，却不再把不同来源的缝隙自动补成确定事实。试行发现，回答变短，部分用户觉得不如原来方便，也有人更愿意查看原档案。研究所没有把这些反馈写成新版本全面优越的证明，而是继续比较理解准确性与使用负担。负责人强调，机器生成的流畅表达并不创造新的档案权威；最后发布答案的机构，仍须承担核查与更正责任。与其把争论停在相信或不相信机器，不如追问一个结论怎样形成、哪些证据支持它、谁能解释和修正它。可追溯性由此不是附加装饰，而是让公众有机会区分材料、推断与仍然未知之处。",
    translation:
      "A research institute trialed a fluent local-history question tool that users rarely source-checked. It merged two people with the same name into one biography. An archivist saw not only an error but invisible reasoning connecting records. Developers proposed confidence scores, but users might not understand their relation to evidence. Answers were broken into traceable statements with sources and explicit conflicts; gaps were no longer filled as certain fact. Responses shortened, convenience feedback varied, and the institute continued comparing accurate understanding with burden rather than claiming universal superiority. The institute retained verification and correction responsibility: fluency did not create archival authority. Traceability let the public distinguish material, inference, and unknowns.",
    questions: [
      {
        prompt: "档案员为什么认为只改一个答案还不够？",
        options: [
          "所有档案都没有价值",
          "两位同名人物确实是同一人",
          "回答越流畅越能自动保证真实",
          "形成结论的材料连接与判断过程仍不可见",
        ],
        answer: 3,
        explanation:
          "The concern extends to hidden reasoning linking sources, beyond the one factual correction.",
      },
      {
        prompt: "为什么置信度数字未必是充分提示？",
        options: [
          "读者未必理解数字与历史证据的关系",
          "任何数字都必定错误",
          "系统从未使用过档案",
          "档案员拒绝任何概括",
        ],
        answer: 0,
        explanation:
          "The archivist accepts possible usefulness but questions interpretability for ordinary readers.",
      },
      {
        prompt: "结尾将核查责任留给机构，意味着什么？",
        options: [
          "使用工具后可以取消更正",
          "流畅答案不能替发布者免除证据和说明责任",
          "公众必须无条件相信所有来源",
          "工具不应再提供任何帮助",
        ],
        answer: 1,
        explanation:
          "The publishing institute remains accountable for verification and correction despite automation.",
      },
    ],
  },
  {
    id: "r9-failure-archive",
    level: 9,
    title: "An archive of abandoned ideas",
    text: "一家研究机构整理周年展览，准备只展示最终成功的项目。曾参与早期工作的工程师提出，许多后来被放弃的尝试也值得保存，因为它们解释了成功方案为何采用现在的结构。管理者担心失败记录会削弱机构形象，年轻研究员却说，若只看到结果，后人容易以为正确方向从一开始就很明显。团队随后建立内部失败档案，记录当时的假设、停止的理由和仍未解决的问题，而不是给参与者排出能力高低。整理过程中，他们发现有个项目被放弃并非因为技术无效，而是当时所需零件太贵；后来条件变化，这条路径可能值得重新检查。也有成员提醒，不能把所有失败都包装成必然通向成功的步骤，那会抹去真实的浪费与错误。档案因此同时说明产生的知识和付出的代价，并允许不同成员补充彼此不一致的回忆。对外展览最终加入少量案例，避免泄露受限资料，却交代创新并非连续胜利的故事。管理者承认，公开复杂过程可能不如展示奖项简洁，但它有助于让公众理解判断如何在有限条件下形成。保存失败的价值不在于美化过去，也不只是防止重复，而是为后来者提供可以重新质疑的依据。只有保留当时的不确定性，机构才不至于用今天的结果替过去的人制造一种他们从未拥有的必然知识。",
    translation:
      "An anniversary exhibition initially featured only successful research. Engineers argued abandoned attempts explained later designs; younger staff warned that results alone made the correct path seem obvious from the start. An internal failure archive recorded hypotheses, stopping reasons, and unresolved issues without ranking participants. One route had failed on component cost rather than technical merit and might merit reconsideration under changed conditions. Staff also rejected portraying every failure as a necessary step toward success, which erased waste. The archive kept costs, learning, and differing memories. Public exhibits used selected cases without restricted information. Preserving failure meant neither beautifying history nor only preventing repetition, but providing revisable reasons while retaining the uncertainty people actually faced.",
    questions: [
      {
        prompt: "只展示成功结果可能造成什么误解？",
        options: [
          "所有失败都没有成本",
          "所有技术从未改变",
          "正确方向在当时就已经显而易见",
          "研究员不需要任何材料",
        ],
        answer: 2,
        explanation:
          "The younger researcher warns against hindsight making the path appear obvious from the outset.",
      },
      {
        prompt: "零件成本的案例说明了什么？",
        options: [
          "被放弃的方案必定无效",
          "今天的成本永远与过去相同",
          "档案只能记录最终结果",
          "停止理由可能受条件限制，条件改变后值得复查",
        ],
        answer: 3,
        explanation:
          "The project stopped for expense, not proven ineffectiveness, so changed conditions matter.",
      },
      {
        prompt: "为什么不能把所有失败包装成成功的必要步骤？",
        options: [
          "那会掩盖真实浪费、错误和当时的不确定性",
          "失败档案不应记录任何知识",
          "公众只愿意阅读奖项",
          "不同回忆必须完全相同",
        ],
        answer: 0,
        explanation:
          "The archive deliberately preserves both learning and costs rather than a predetermined victory story.",
      },
    ],
  },
  {
    id: "r9-public-apology",
    level: 9,
    title: "An apology with an accountable next step",
    text: "一家机构因预约系统错误，重复取消了部分使用者的服务。负责人公开道歉，称问题来自技术故障，并表示工作人员已经十分努力。受影响者认可他们的辛苦，却认为这种说明仍没有回答谁负责检查、如何避免再次发生，以及此前损失怎样处理。有人要求立即处罚所有经手人员，内部调查则发现，故障本身只是起点：异常报告曾被多次转交，却没有明确的决定权限。负责人于是把个人操作、流程安排和管理监督分开说明，没有把全部责任推给软件，也没有把每位员工都当成同样有错。机构设置补办渠道，公开修复进度，并让未能通过网络联系的人使用电话登记。关于补偿，它说明可以处理哪些直接损失、哪些要求仍需讨论，而没有用一句“深表歉意”代替具体回应。几周后，错误减少，但受影响者的信任并未马上恢复。负责人承认，道歉的作用不是要求别人立刻原谅，而是承认他们有理由追问，并使承诺能够在后续行动中被核查。此事也提醒公众，责任不应被简化为找到一个替罪者；若造成问题的权限结构不变，即便语气诚恳或处罚严厉，类似损害仍可能重演。真正需要说明的是哪些改变发生了、由谁执行，以及失败时还可以向谁提出异议。",
    translation:
      "A booking error repeatedly canceled services. The leader apologized, citing technical faults and hard-working staff, but users still wanted oversight, prevention, and loss remedies. Calls to punish everyone met an investigation showing unclear decision authority over repeatedly passed-on anomaly reports. The institution distinguished operation, process, and supervision without blaming all software or all staff. It offered replacement service, repair updates, and phone registration, explaining which losses could be addressed and which remained debated. Errors decreased, but trust did not instantly return. Apology acknowledged reasons to question and made commitments checkable, rather than demanding forgiveness. Accountability required changing authority structures and naming implementers and appeal routes, not only a scapegoat, sincerity, or severe punishment.",
    questions: [
      {
        prompt: "受影响者认为最初道歉缺少什么？",
        options: [
          "对工作人员辛苦的任何承认",
          "对检查责任、后续预防和损失处理的具体回答",
          "对技术故障的任何提及",
          "要求大家立即原谅的命令",
        ],
        answer: 1,
        explanation:
          "They acknowledge effort but ask unanswered accountability and remedy questions.",
      },
      {
        prompt: "调查为什么不支持把所有责任归给一个因素？",
        options: [
          "预约从未出错",
          "所有工作人员行为都完全相同",
          "故障之外还存在权限和转交流程问题",
          "软件错误能够自动免除管理责任",
        ],
        answer: 2,
        explanation:
          "The technical trigger interacted with unclear authority and repeated transfers.",
      },
      {
        prompt: "负责人后来怎样理解道歉？",
        options: [
          "它应立即消除任何不信任",
          "它能替代修复与补办",
          "它只需措辞诚恳而无需核查",
          "它应承认追问的正当性并接受后续行动检验",
        ],
        answer: 3,
        explanation:
          "The leader explicitly refuses to demand immediate forgiveness and emphasizes verifiable commitments.",
      },
    ],
  },
  {
    id: "r9-shared-principles",
    level: 9,
    title: "Agreement on words, disagreement on practice",
    text: "几个城市共同制定公共文化合作原则，都同意使用“开放参与”这个表达。签署前，一位代表却问，开放究竟意味着任何人可以旁听，还是公众能够影响议程。主持人担心细究会拖延合作，建议先保留宽泛措辞，具体做法以后再谈。另一位代表认为，模糊有时可以让谈判继续，但若各方对同一句话的理解完全不同，签署后的合作也可能迅速陷入争议。讨论于是先列出最低共同要求：提前公布讨论主题、提供提出建议的渠道，并解释哪些建议进入决定过程。至于公众能否直接表决，各城市仍保留不同安排，不把暂时无法统一的部分写成已经达成共识。文件同时约定定期比较执行情况，允许补充案例和修改条款。有人批评这样不够雄心勃勃，也有人认为它比一份承诺一切却无法核查的声明更有意义。最终协议没有消除制度差异，却让共同语言对应到可观察的行动，也让未解决的分歧保持可见。合作的基础因此并非所有人使用相同词语，而是能说明自己承诺了什么、没有承诺什么，并愿意接受持续对照。原则若只是避免冲突的漂亮包装，可能把冲突推迟而非解决；若能明确最低要求与修正程序，它才可能成为不同实践之间可以继续协商的桥梁。",
    translation:
      "Cities drafting cultural-cooperation principles agreed on 'open participation,' but a representative asked whether that meant observing or influencing agendas. The chair preferred broad wording to avoid delay; another warned that radically different interpretations could create later disputes. They defined minimum requirements: advance topics, suggestion channels, and explanations of which suggestions influenced decisions. Direct voting remained different across cities and was not falsely presented as consensus. Regular implementation comparisons and amendments were agreed. Some found the ambition modest; others preferred checkable commitments to sweeping promises. The agreement retained institutional differences while tying words to observable actions and visible disagreement. Cooperation required stating both commitments and limits, with continuing comparison, rather than merely using identical terms.",
    questions: [
      {
        prompt: "代表对“开放参与”的追问揭示了什么？",
        options: [
          "相同词语可能对应不同的实际权利",
          "所有城市已经采用直接表决",
          "旁听与影响议程完全相同",
          "合作不需要任何共同原则",
        ],
        answer: 0,
        explanation:
          "The contrast between observing and influencing reveals materially different meanings of the same phrase.",
      },
      {
        prompt: "协议怎样处理尚未统一的公众表决问题？",
        options: [
          "假称所有城市已经一致",
          "保留不同安排，并明确分歧仍在",
          "禁止以后讨论",
          "取消全部最低要求",
        ],
        answer: 1,
        explanation:
          "Cities retain arrangements and do not label unresolved points as consensus.",
      },
      {
        prompt: "结尾认为原则何时能成为协商的桥梁？",
        options: [
          "只要措辞漂亮就足够",
          "当它让所有差异永远隐形时",
          "明确最低行动要求并保留对照和修正程序时",
          "只有承诺所有人完全相同时",
        ],
        answer: 2,
        explanation:
          "The closing condition links principles to minimum requirements and revisable practice.",
      },
    ],
  }
)

export const speaking: SpeakingTask[] = [
  {
    id: "s1-introduction",
    level: 1,
    title: "Introduce yourself to a study partner",
    prompt:
      "Give your name, say whether you are a student or work, and name one language you study. Then ask your partner one yes-or-no question. Replace the model's details with true or invented details of your own.",
    supportZh: "我叫安安。我是学生。我学中文。你也学中文吗？",
    supportPinyin:
      "Wǒ jiào Ān'ān. Wǒ shì xuésheng. Wǒ xué Zhōngwén. Nǐ yě xué Zhōngwén ma?",
    supportEn:
      "My name is An'an. I am a student. I study Chinese. Do you also study Chinese?",
    seconds: 20,
    tips: [
      "Build three short statements before the question.",
      "Put 也 before 学 and 吗 at the end.",
      "Pause between complete thoughts; speed is not the goal.",
    ],
  },
  {
    id: "s1-morning",
    level: 1,
    title: "Describe a simple morning",
    prompt:
      "Say where you are in the morning, when you eat, and what you drink or do not drink. Ask where your partner is. Use two different clock times if you can.",
    supportZh:
      "早上我在家。我七点吃饭，八点去学校。我喝茶，不喝咖啡。你在哪里？",
    supportPinyin:
      "Zǎoshang wǒ zài jiā. Wǒ qī diǎn chīfàn, bā diǎn qù xuéxiào. Wǒ hē chá, bù hē kāfēi. Nǐ zài nǎlǐ?",
    supportEn:
      "I am at home in the morning. I eat at seven and go to school at eight. I drink tea, not coffee. Where are you?",
    seconds: 25,
    tips: [
      "Put each clock time before its action.",
      "Use 在 for location and 去 for going somewhere.",
      "Do not add 吗 to the 哪里 question.",
    ],
  },
  {
    id: "s2-weekend-plan",
    level: 2,
    title: "Arrange a short visit",
    prompt:
      "Invite a friend to a bookstore or café. Say what you want to do, give an available time, and explain one time when you cannot come. Finish with a question about the friend's availability.",
    supportZh:
      "我想星期六去书店。我上午要上课，下午能来。我们两点见面，好吗？你下午有时间吗？",
    supportPinyin:
      "Wǒ xiǎng Xīngqīliù qù shūdiàn. Wǒ shàngwǔ yào shàngkè, xiàwǔ néng lái. Wǒmen liǎng diǎn jiànmiàn, hǎo ma? Nǐ xiàwǔ yǒu shíjiān ma?",
    supportEn:
      "I would like to go to the bookstore on Saturday. I have class in the morning but can come in the afternoon. Shall we meet at two? Do you have time in the afternoon?",
    seconds: 40,
    tips: [
      "Use 想 for your wish and 能 for availability.",
      "Give a specific day and time rather than only saying 'later.'",
      "After asking the question, leave a pause for a reply.",
    ],
  },
  {
    id: "s2-recent-outing",
    level: 2,
    title: "Tell a partner about a recent outing",
    prompt:
      "Describe where you went yesterday, who went with you, and one thing you bought or ate. Contrast that particular outing with somewhere you have or have not been before.",
    supportZh:
      "昨天我和朋友去了公园。我们喝了茶，还买了水果。我以前去过这个公园，可是朋友没去过。",
    supportPinyin:
      "Zuótiān wǒ hé péngyou qù le gōngyuán. Wǒmen hē le chá, hái mǎi le shuǐguǒ. Wǒ yǐqián qù guo zhège gōngyuán, kěshì péngyou méi qù guo.",
    supportEn:
      "Yesterday my friend and I went to the park. We had tea and also bought fruit. I had been to this park before, but my friend had not.",
    seconds: 45,
    tips: [
      "Anchor the particular event with 昨天.",
      "Use 了 for the completed event and 过 for prior experience.",
      "Expand with one detail about the place; do not repeat the model to fill time.",
    ],
  },
  {
    id: "s3-choose-place",
    level: 3,
    title: "Choose between two places to meet",
    prompt:
      "Compare two cafés, parks, or study spaces. Mention distance, one quality, and a small disadvantage. Choose one and explain why it fits your meeting.",
    supportZh:
      "河边的咖啡馆比车站旁边的安静一点，也离我家近。但是饮料有点贵。因为我们要聊天，所以我想去河边那家。",
    supportPinyin:
      "Hébiān de kāfēiguǎn bǐ chēzhàn pángbiān de ānjìng yīdiǎn, yě lí wǒ jiā jìn. Dànshì yǐnliào yǒudiǎn guì. Yīnwèi wǒmen yào liáotiān, suǒyǐ wǒ xiǎng qù hébiān nà jiā.",
    supportEn:
      "The riverside café is a little quieter than the one beside the station and is also near my home. However, the drinks are a little expensive. Because we want to chat, I would like to go to the riverside one.",
    seconds: 60,
    tips: [
      "Name both comparison targets before using 比.",
      "Use 一点 after a comparative adjective and 有点 before a mild complaint.",
      "End with a clear choice, not only a list of differences.",
    ],
  },
  {
    id: "s3-clarify-instructions",
    level: 3,
    title: "Ask someone to explain again",
    prompt:
      "You cannot understand instructions at a service desk. Explain what is difficult, ask for slower speech, and check two steps in the correct order. Invent a simple task such as collecting a ticket.",
    supportZh:
      "不好意思，您说得有点快，我听不懂。请您慢一点说。我要先填这张表，再去那个窗口，对吗？",
    supportPinyin:
      "Bù hǎoyìsi, nín shuō de yǒudiǎn kuài, wǒ tīng bù dǒng. Qǐng nín màn yīdiǎn shuō. Wǒ yào xiān tián zhè zhāng biǎo, zài qù nàge chuāngkǒu, duì ma?",
    supportEn:
      "Excuse me, you are speaking a little fast and I cannot understand. Please speak a little more slowly. I should fill in this form first and then go to that window, right?",
    seconds: 60,
    tips: [
      "Make the problem specific: speed, volume, or one unknown word.",
      "Distinguish 说得… describing manner from 听不懂 describing inability to reach a result.",
      "Use 先…再… to check the sequence.",
    ],
  },
  {
    id: "s4-prepare-room",
    level: 4,
    title: "Give instructions for a shared room",
    prompt:
      "Explain how to prepare a room for a study group. Give three actions involving specific objects, describe one state that should remain, and say what to do if more people arrive.",
    supportZh:
      "请先把桌子移到窗边，再把椅子放好。门可以开着。如果来的人比较多，我们就去隔壁的大房间。",
    supportPinyin:
      "Qǐng xiān bǎ zhuōzi yí dào chuāngbiān, zài bǎ yǐzi fàng hǎo. Mén kěyǐ kāi zhe. Rúguǒ lái de rén bǐjiào duō, wǒmen jiù qù gébì de dà fángjiān.",
    supportEn:
      "Please first move the table beside the window, then put the chairs in place. The door can stay open. If more people come, we will go to the large room next door.",
    seconds: 75,
    tips: [
      "After 把, give a result or destination, not just a bare verb.",
      "Add your own third object-related instruction to the model's two.",
      "Use 着 for a continuing state and 如果…就… for the backup plan.",
    ],
  },
  {
    id: "s4-change-routine",
    level: 4,
    title: "Explain a change in your routine",
    prompt:
      "Describe something you used to do but no longer do. Explain the reason, acknowledge one difficulty, and describe a benefit that is growing over time.",
    supportZh:
      "我以前开车上班，现在坐地铁了。虽然路上花的时间多一点，但是我可以一边坐车一边看书。我觉得这样的生活越来越轻松。",
    supportPinyin:
      "Wǒ yǐqián kāichē shàngbān, xiànzài zuò dìtiě le. Suīrán lùshang huā de shíjiān duō yīdiǎn, dànshì wǒ kěyǐ yībiān zuò chē yībiān kàn shū. Wǒ juéde zhèyàng de shēnghuó yuèláiyuè qīngsōng.",
    supportEn:
      "I used to drive to work, but now I take the subway. Although the journey takes a little longer, I can read while riding. I feel that life this way is becoming more relaxed.",
    seconds: 80,
    tips: [
      "Contrast 以前 with 现在 and use final 了 to mark the change.",
      "Give a real difficulty after 虽然 rather than pretending the choice has no cost.",
      "Add a reason for changing; the model supplies a contrast and benefit, not your full account.",
    ],
  },
  {
    id: "s5-booking-rules",
    level: 5,
    title: "Explain fair booking rules",
    prompt:
      "Propose rules for booking a shared study room. Distinguish one condition that is enough to reserve from one condition that is required to enter. Address what happens if the booking is late and how walk-in users are treated.",
    supportZh:
      "只要房间还有空位，就能预约。只有出示预约信息，才能进入预约区。即使没有预约，也可以使用大厅。除非提前说明原因，否则迟到十分钟后会失去预约。",
    supportPinyin:
      "Zhǐyào fángjiān hái yǒu kōngwèi, jiù néng yùyuē. Zhǐyǒu chūshì yùyuē xìnxī, cái néng jìnrù yùyuē qū. Jíshǐ méiyǒu yùyuē, yě kěyǐ shǐyòng dàtīng. Chúfēi tíqián shuōmíng yuányīn, fǒuzé chídào shí fēnzhōng hòu huì shīqù yùyuē.",
    supportEn:
      "As long as the room has spaces left, a reservation can be made. Only by showing reservation information can someone enter the reserved area. Even without a reservation, people may use the main hall. Unless the reason is explained in advance, a reservation will be lost after someone is ten minutes late.",
    seconds: 90,
    tips: [
      "Do not interchange 只要…就… and 只有…才….",
      "State who each rule applies to and which space it concerns.",
      "The model is a starting proposal: explain why your rules balance access and reliability.",
    ],
  },
  {
    id: "s5-weather-compromise",
    level: 5,
    title: "Negotiate an outdoor event",
    prompt:
      "Two friends disagree about holding an outdoor reading event in uncertain weather. Propose a compromise, state a backup condition, and reassure someone who cannot attend. Explain one benefit beyond avoiding rain.",
    supportZh:
      "既然大家都想见面，我们就保留活动。只要天气合适，就在公园举行；如果下雨，就改到图书馆。这样不但能避免淋雨，而且让路远的人更放心。即使你不能来，也可以以后听大家介绍。",
    supportPinyin:
      "Jìrán dàjiā dōu xiǎng jiànmiàn, wǒmen jiù bǎoliú huódòng. Zhǐyào tiānqì héshì, jiù zài gōngyuán jǔxíng; rúguǒ xià yǔ, jiù gǎi dào túshūguǎn. Zhèyàng bùdàn néng bìmiǎn lín yǔ, érqiě ràng lù yuǎn de rén gèng fàngxīn. Jíshǐ nǐ bù néng lái, yě kěyǐ yǐhòu tīng dàjiā jièshào.",
    supportEn:
      "Since everyone wants to meet, let's keep the event. If the weather is suitable, we will hold it in the park; if it rains, we will move to the library. This not only avoids getting wet but also reassures people who travel far. Even if you cannot come, you can hear everyone describe it later.",
    seconds: 90,
    tips: [
      "Start with the shared goal rather than declaring one friend wrong.",
      "Clarify that an indoor space would need permission or booking.",
      "Add one practical action you will take to make the compromise work.",
    ],
  },
  {
    id: "s6-survey-caution",
    level: 6,
    title: "Explain a survey without overstating it",
    prompt:
      "An online survey of forty volunteers favors changing a café's opening hours. Explain one useful finding, one limitation, and what additional evidence you would collect before recommending a change.",
    supportZh:
      "这份调查说明，答卷者中有不少人希望延长营业时间。但他们未必代表所有顾客。在早班顾客看来，提前开门可能更重要。与其立刻改时间，不如先补充调查不同时间段的需求。",
    supportPinyin:
      "Zhè fèn diàochá shuōmíng, dájuànzhě zhōng yǒu bù shǎo rén xīwàng yáncháng yíngyè shíjiān. Dàn tāmen wèibì dàibiǎo suǒyǒu gùkè. Zài zǎobān gùkè kànlái, tíqián kāimén kěnéng gèng zhòngyào. Yǔqí lìkè gǎi shíjiān, bùrú xiān bǔchōng diàochá bùtóng shíjiān duàn de xūqiú.",
    supportEn:
      "The survey shows that quite a few respondents want longer opening hours. But they may not represent all customers. Customers on early shifts might care more about earlier opening. Rather than change the hours immediately, we should first supplement the survey with demand from different time periods.",
    seconds: 120,
    tips: [
      "Keep the finding about respondents separate from claims about all customers.",
      "Label the early-shift preference as a possibility, not an observed result.",
      "Explain how you would reach people who did not answer online.",
    ],
  },
  {
    id: "s6-pressure-response",
    level: 6,
    title: "Respond to pressure to finish quickly",
    prompt:
      "A colleague wants to submit an unchecked report before a deadline. State your preference, acknowledge the time pressure, and propose a workable alternative without accusing the colleague of bad intentions.",
    supportZh:
      "我理解你担心迟交，但这并非只是格式问题，而是数据还没有核实。我宁可先交一份说明，也不把不确定的数字当作事实。我们可以分工检查，并向负责人说明哪些部分需要延期。",
    supportPinyin:
      "Wǒ lǐjiě nǐ dānxīn chí jiāo, dàn zhè bìngfēi zhǐ shì géshì wèntí, érshì shùjù hái méiyǒu héshí. Wǒ nìngkě xiān jiāo yī fèn shuōmíng, yě bù bǎ bù quèdìng de shùzì dàngzuò shìshí. Wǒmen kěyǐ fēngōng jiǎnchá, bìng xiàng fùzérén shuōmíng nǎxiē bùfen xūyào yánqī.",
    supportEn:
      "I understand your worry about submitting late, but this is not merely a formatting issue; the data have not been checked. I would rather submit an explanation first than present uncertain figures as facts. We can divide the checking work and tell the person in charge which parts need an extension.",
    seconds: 120,
    tips: [
      "Use 并非…而是… to correct the issue, not to attack the person.",
      "Specify one part that could be submitted now and one that needs checking.",
      "End by asking for agreement on an actionable division of work.",
    ],
  },
  {
    id: "s7-consultation",
    level: 7,
    title: "Present a revisable community proposal",
    prompt:
      "A community wants to extend the hours of a public square. Present a proposal balancing access, noise, and evidence. Explain a trial period, what would trigger a change, and how people could challenge the decision.",
    supportZh:
      "鉴于居民的作息不同，我建议先分区域试行，而不是统一延长开放时间。问题在于如何兼顾活动与休息。我们应记录不同时间段的意见，以便调整安排。一旦噪声持续超标，便应缩短相关区域的开放时段。",
    supportPinyin:
      "Jiànyú jūmín de zuòxī bùtóng, wǒ jiànyì xiān fēn qūyù shìxíng, ér bù shì tǒngyī yáncháng kāifàng shíjiān. Wèntí zàiyú rúhé jiāngù huódòng yǔ xiūxi. Wǒmen yīng jìlù bùtóng shíjiān duàn de yìjiàn, yǐbiàn tiáozhěng ānpái. Yīdàn zàoshēng chíxù chāobiāo, biàn yīng suōduǎn xiāngguān qūyù de kāifàng shíduàn.",
    supportEn:
      "Given residents' different routines, I suggest a trial by area rather than extending all opening hours uniformly. The issue is how to balance activity and rest. We should record feedback from different time periods so we can adjust arrangements. Once noise repeatedly exceeds the standard, the relevant area's hours should be shortened.",
    seconds: 150,
    tips: [
      "Use the model as an opening; add a trial length and a feedback channel.",
      "Define who measures the noise and which standard applies rather than treating 超标 as self-explanatory.",
      "Include one reason someone might oppose your proposal and a specific response.",
    ],
  },
  {
    id: "s7-beyond-counts",
    level: 7,
    title: "Defend a richer measure of success",
    prompt:
      "A volunteer project is judged only by attendance. Argue for keeping attendance figures while adding two other measures. Discuss the burden of collecting evidence and participants' choice about personal information.",
    supportZh:
      "参与人数并非没有价值，但它只能反映一部分情况。项目不仅仅是一次活动，更是建立互助关系的过程。我建议先记录少量案例，并说明资料的用途。凡是涉及个人经历的记录，均须获得本人同意。",
    supportPinyin:
      "Cānyù rénshù bìngfēi méiyǒu jiàzhí, dàn tā zhǐ néng fǎnyìng yī bùfen qíngkuàng. Xiàngmù bù jǐnjǐn shì yī cì huódòng, gèng shì jiànlì hùzhù guānxì de guòchéng. Wǒ jiànyì xiān jìlù shǎoliàng ànlì, bìng shuōmíng zīliào de yòngtú. Fánshì shèjí gèrén jīnglì de jìlù, jūn xū huòdé běnrén tóngyì.",
    supportEn:
      "Attendance is not without value, but it reflects only part of the situation. The project is not merely an event; more importantly, it is a process of building mutual-help relationships. I suggest beginning with a few recorded cases and explaining the materials' purpose. Any record involving personal experiences must have the person's consent.",
    seconds: 150,
    tips: [
      "Propose two observable additions, such as continued participation or a skill used later.",
      "Explain how your measures avoid rewarding only large projects.",
      "Consent is a safeguard, not proof that all privacy risks have vanished.",
    ],
  },
  {
    id: "s8-data-boundaries",
    level: 8,
    title: "Argue for useful but protected data access",
    prompt:
      "Give a short policy argument about releasing public-service data. Concede a benefit of openness, identify a risk that removing names may not solve, and propose access conditions. State what remains uncertain.",
    supportZh:
      "诚然，公开数据有助于发现资源分配的问题，然而删除姓名并不等于消除识别风险。除汇总信息之外，确需细节的研究可通过受约束的渠道申请。这一办法仍有待检验，尤其需要比较研究价值与使用者承担的风险。",
    supportPinyin:
      "Chéngrán, gōngkāi shùjù yǒuzhùyú fāxiàn zīyuán fēnpèi de wèntí, rán'ér shānchú xìngmíng bìng bù děngyú xiāochú shíbié fēngxiǎn. Chú huìzǒng xìnxī zhīwài, què xū xìjié de yánjiū kě tōngguò shòu yuēshù de qúdào shēnqǐng. Zhè yī bànfǎ réng yǒudài jiǎnyàn, yóuqí xūyào bǐjiào yánjiū jiàzhí yǔ shǐyòngzhě chéngdān de fēngxiǎn.",
    supportEn:
      "Admittedly, open data help reveal problems in resource allocation, but deleting names does not eliminate identification risk. Beyond aggregate information, research genuinely needing detail can apply through a controlled channel. This approach still needs testing, especially a comparison of research value and the risk users bear.",
    seconds: 180,
    tips: [
      "Illustrate re-identification with a hypothetical combination of details, not a real person's information.",
      "Specify purpose, retention limits, and review as possible conditions.",
      "Explain both the cost of safeguards and why speed alone is insufficient.",
      "End with a testable question rather than claiming the trade-off is solved.",
    ],
  },
  {
    id: "s8-rebut-inference",
    level: 8,
    title: "Challenge an inference without rejecting the evidence",
    prompt:
      "A small pilot found that users completed a task faster, and a manager claims all users will benefit. Acknowledge the observation, challenge the generalization, and propose a fair follow-up study. Answer one likely objection.",
    supportZh:
      "两次测试都显示速度提高，由此可见方案在本次测试中有一定效果。但样本有限，不能据此断言所有用户都会受益。倘若参与者本来就熟悉设备，则结果可能高估推广效果。我们还需纳入不同经验的人，并检查任务是否真正完成。",
    supportPinyin:
      "Liǎng cì cèshì dōu xiǎnshì sùdù tígāo, yóucǐ kě jiàn fāng'àn zài běn cì cèshì zhōng yǒu yīdìng xiàoguǒ. Dàn yàngběn yǒuxiàn, bù néng jùcǐ duànyán suǒyǒu yònghù dōu huì shòuyì. Tǎngruò cānyùzhě běnlái jiù shúxī shèbèi, zé jiéguǒ kěnéng gāogū tuīguǎng xiàoguǒ. Wǒmen hái xū nàrù bùtóng jīngyàn de rén, bìng jiǎnchá rènwu shìfǒu zhēnzhèng wánchéng.",
    supportEn:
      "Both tests showed faster performance, indicating some effect in this test. But the sample is limited, so we cannot conclude that all users will benefit. If participants were already familiar with the equipment, the results may overestimate the effect of wider rollout. We also need people with different experience and must check whether the task was truly completed.",
    seconds: 180,
    tips: [
      "Do not turn a possible sampling problem into a claim that the reported observations are false.",
      "Define benefit beyond speed, such as successful independent completion.",
      "Respond to 'another study takes too long' with a bounded trial rather than unlimited delay.",
      "Restate exactly which conclusion your evidence can support.",
    ],
  },
  {
    id: "s9-memory-argument",
    level: 9,
    title: "Defend an institution's interpretation of the past",
    prompt:
      "A museum wants a simple, unified local-history exhibition. Argue for a clear exhibition that also permits conflicting memories. Grant the value of simplicity, explain who should help select stories, and propose a continuing correction process.",
    supportZh:
      "叙事简洁固然有助于理解，却不能成为排除不同经历的理由。与其说保护记忆就是保存物件，不如说是让过去的解释保持可补充。就展示而言，我们需要明确主线；退一步说，即便不能容纳所有故事，也应公开取舍依据，并保留复议渠道。",
    supportPinyin:
      "Xùshì jiǎnjié gùrán yǒuzhùyú lǐjiě, què bù néng chéngwéi páichú bùtóng jīnglì de lǐyóu. Yǔqí shuō bǎohù jìyì jiù shì bǎocún wùjiàn, bùrú shuō shì ràng guòqù de jiěshì bǎochí kě bǔchōng. Jiù zhǎnshì éryán, wǒmen xūyào míngquè zhǔxiàn; tuì yī bù shuō, jíbiàn bù néng róngnà suǒyǒu gùshi, yě yīng gōngkāi qǔshě yījù, bìng bǎoliú fùyì qúdào.",
    supportEn:
      "Concise storytelling certainly aids understanding, but it cannot justify excluding different experiences. Preserving memory is better understood not merely as keeping objects but as allowing interpretations of the past to be supplemented. An exhibition needs a clear main thread; even granting that it cannot include every story, it should publish the basis for its choices and retain a channel for reconsideration.",
    seconds: 210,
    tips: [
      "Develop a thesis, a concrete selection procedure, and an objection–response pair.",
      "Distinguish giving a story a hearing from guaranteeing it will be displayed.",
      "Specify who can request a correction and who explains the decision.",
      "Conclude with a condition for long-term accountability, not only an opening-day promise.",
    ],
  },
  {
    id: "s9-model-accountability",
    level: 9,
    title: "Make a case for accountable automated assessment",
    prompt:
      "An organization rewards staff using a speed-based model. Give an extended argument about what the model can and cannot establish. Consider technical improvement, human review, appeal costs, and who remains responsible for the criteria.",
    supportZh:
      "等待时间下降不无价值，但不能将服务质量的差异都归因于个人速度。退一步说，即便增加变量能够改善预测，选择奖励什么仍是机构的责任。在标准公开、申诉可行的前提下，方能扩大模型的使用。技术可以提供线索，却不能替管理者承担价值判断。",
    supportPinyin:
      "Děngdài shíjiān xiàjiàng bù wú jiàzhí, dàn bù néng jiāng fúwù zhìliàng de chāyì dōu guīyīnyú gèrén sùdù. Tuì yī bù shuō, jíbiàn zēngjiā biànliàng nénggòu gǎishàn yùcè, xuǎnzé jiǎnglì shénme réng shì jīgòu de zérèn. Zài biāozhǔn gōngkāi, shēnsù kěxíng de qiántí xià, fāng néng kuòdà móxíng de shǐyòng. Jìshù kěyǐ tígōng xiànsuǒ, què bù néng tì guǎnlǐzhě chéngdān jiàzhí pànduàn.",
    supportEn:
      "Reduced waiting time has some value, but differences in service quality cannot all be attributed to individual speed. Even granting that additional variables can improve predictions, deciding what to reward remains the organization's responsibility. Model use should expand only when the criteria are public and appeals are workable. Technology can provide clues, but it cannot assume managers' responsibility for value judgments.",
    seconds: 210,
    tips: [
      "Use a hypothetical complex case to show how speed and successful service may diverge.",
      "Concede that human review can also be biased and costly.",
      "Propose a limited trial, an appeal route, and evidence that would justify revising the criteria.",
      "Close by assigning responsibility clearly rather than presenting technology and people as opposing teams.",
    ],
  },
]

speaking.push(
  {
    id: "s1-order-drinks",
    level: 1,
    title: "Order drinks for two people",
    prompt:
      "At a café, greet the server and order a drink for yourself and one for a friend. Say what you do not want. Ask one simple question about availability.",
    supportZh: "你好，我要一杯茶。朋友要一杯咖啡。我们不要牛奶。这里有水吗？",
    supportPinyin:
      "Nǐ hǎo, wǒ yào yī bēi chá. Péngyou yào yī bēi kāfēi. Wǒmen bù yào niúnǎi. Zhèlǐ yǒu shuǐ ma?",
    supportEn:
      "Hello, I would like a cup of tea. My friend would like a cup of coffee. We do not want milk. Is there water here?",
    seconds: 25,
    tips: [
      "Use 杯 when counting cups of drinks.",
      "Name whose order you are giving.",
      "Make the question different from the statements.",
    ],
  },
  {
    id: "s1-family-photo",
    level: 1,
    title: "Introduce two family members",
    prompt:
      "Imagine introducing two family members to a friend. Give their relationship to you, one name or job, and where each person is today. You do not need an actual photograph.",
    supportZh:
      "这是我姐姐，她叫小雨，是老师。这是我哥哥，他是医生。今天姐姐在学校，哥哥在家。",
    supportPinyin:
      "Zhè shì wǒ jiějie, tā jiào Xiǎo Yǔ, shì lǎoshī. Zhè shì wǒ gēge, tā shì yīshēng. Jīntiān jiějie zài xuéxiào, gēge zài jiā.",
    supportEn:
      "This is my older sister. Her name is Xiaoyu, and she is a teacher. This is my older brother; he is a doctor. Today my sister is at school and my brother is at home.",
    seconds: 25,
    tips: [
      "Use 是 for identity and 在 for location.",
      "Invent details if you prefer not to discuss your own family.",
      "Introduce one person fully before moving to the other.",
    ],
  },
  {
    id: "s2-restaurant-request",
    level: 2,
    title: "Request a different meal",
    prompt:
      "You planned to order noodles, but they are unavailable. Choose another meal, ask whether it includes something you dislike, and request a drink. Keep the exchange polite and specific.",
    supportZh:
      "没有面条了吗？那我想吃米饭。这道菜有鸡肉吗？我不吃鸡肉，可以换成鸡蛋吗？请再给我一杯水。",
    supportPinyin:
      "Méiyǒu miàntiáo le ma? Nà wǒ xiǎng chī mǐfàn. Zhè dào cài yǒu jīròu ma? Wǒ bù chī jīròu, kěyǐ huàn chéng jīdàn ma? Qǐng zài gěi wǒ yī bēi shuǐ.",
    supportEn:
      "Are there no noodles left? Then I would like rice. Does this dish contain chicken? I do not eat chicken; could it be replaced with egg? Please also give me a cup of water.",
    seconds: 45,
    tips: [
      "A preference request is not a food-safety guarantee.",
      "Ask about one ingredient rather than listing every possible food.",
      "Use 请 and 可以…吗 to make clear requests.",
    ],
  },
  {
    id: "s2-teach-skill",
    level: 2,
    title: "Explain a beginner activity",
    prompt:
      "Tell a friend about a skill you can do, such as swimming, cooking, or playing a sport. Say when you learned it and suggest one easy thing the friend can practice first.",
    supportZh:
      "我会做饭，是去年学的。我以前不会做米饭。你可以先洗米，再加水。今天我有时间，能和你一起试试。",
    supportPinyin:
      "Wǒ huì zuòfàn, shì qùnián xué de. Wǒ yǐqián bù huì zuò mǐfàn. Nǐ kěyǐ xiān xǐ mǐ, zài jiā shuǐ. Jīntiān wǒ yǒu shíjiān, néng hé nǐ yīqǐ shìshi.",
    supportEn:
      "I can cook; I learned last year. I could not cook rice before. You can wash the rice first, then add water. I have time today and can try with you.",
    seconds: 45,
    tips: [
      "Use 会 for a learned skill and 能 for today's availability.",
      "Explain only an easy opening step, not a complete technical lesson.",
      "Add one thing you found difficult when learning.",
    ],
  },
  {
    id: "s3-gift-advice",
    level: 3,
    title: "Recommend a gift for a particular person",
    prompt:
      "A friend wants a gift for someone with a small room. Compare two gifts, explain one disadvantage, and recommend one based on that person's needs rather than your own preference.",
    supportZh:
      "台灯比这盆花大，也贵一点。她的桌子已经放满了东西，台灯有点占地方。我觉得小花更合适，因为可以放在窗边。",
    supportPinyin:
      "Táidēng bǐ zhè pén huā dà, yě guì yīdiǎn. Tā de zhuōzi yǐjīng fàng mǎn le dōngxi, táidēng yǒudiǎn zhàn dìfang. Wǒ juéde xiǎo huā gèng héshì, yīnwèi kěyǐ fàng zài chuāngbiān.",
    supportEn:
      "The lamp is larger than this plant and a little more expensive. Her desk is already full of things, and the lamp takes up a little too much space. I think the small plant is more suitable because it can sit by the window.",
    seconds: 60,
    tips: [
      "Give two concrete comparisons.",
      "Mention a recipient need, such as space or ease of care.",
      "Add a question to confirm your assumption about the recipient.",
    ],
  },
  {
    id: "s3-travel-mistake",
    level: 3,
    title: "Retell a small travel mistake",
    prompt:
      "Tell someone about going to the wrong station, stop, or entrance. Explain what happened first, how you corrected it, and one thing you will check next time.",
    supportZh:
      "我先去了老车站，可是朋友在新车站。我查了地址，再坐地铁过去。因为出门早，所以没有迟到。下次我会先问清楚车站的名字。",
    supportPinyin:
      "Wǒ xiān qù le lǎo chēzhàn, kěshì péngyou zài xīn chēzhàn. Wǒ chá le dìzhǐ, zài zuò dìtiě guòqu. Yīnwèi chūmén zǎo, suǒyǐ méiyǒu chídào. Xià cì wǒ huì xiān wèn qīngchu chēzhàn de míngzi.",
    supportEn:
      "I first went to the old station, but my friend was at the new station. I checked the address, then took the subway there. Because I left early, I was not late. Next time I will confirm the station name first.",
    seconds: 60,
    tips: [
      "Make the mistaken place and correct place distinct.",
      "Use time and sequence markers to keep the listener oriented.",
      "Finish with a specific lesson, not only 'I will be careful.'",
    ],
  },
  {
    id: "s4-apologize-mixup",
    level: 4,
    title: "Apologize and repair a mix-up",
    prompt:
      "You accidentally took a classmate's similar coat. Explain how it happened, say how you checked ownership, apologize, and propose a clear time and place to exchange the coats.",
    supportZh:
      "不好意思，你的外套被我拿错了。两件看起来很像，我回家后才发现口袋里的票不是我的。我已经把衣服放好，明天上课前带来，可以吗？",
    supportPinyin:
      "Bù hǎoyìsi, nǐ de wàitào bèi wǒ ná cuò le. Liǎng jiàn kàn qǐlai hěn xiàng, wǒ huí jiā hòu cái fāxiàn kǒudài lǐ de piào bù shì wǒ de. Wǒ yǐjīng bǎ yīfu fàng hǎo, míngtiān shàngkè qián dài lái, kěyǐ ma?",
    supportEn:
      "Sorry, I took your coat by mistake. The two looked very similar, and only after getting home did I discover the ticket in the pocket was not mine. I have put the coat safely away. May I bring it before class tomorrow?",
    seconds: 75,
    tips: [
      "Use 被 to name the affected coat and your role clearly.",
      "Do not use the explanation to avoid acknowledging the mistake.",
      "Add a specific meeting location to complete the model's proposal.",
    ],
  },
  {
    id: "s4-adapt-tour",
    level: 4,
    title: "Offer an accessible alternative route",
    prompt:
      "You are guiding visitors, and one person cannot climb many stairs. Explain a changed route, what everyone can still experience, where to rest, and a plan if it rains.",
    supportZh:
      "虽然山上的风景很好，但是楼梯太多。我们可以改去河边广场，那里也能看到老街。如果下雨，就先去旁边的展厅。大家可以一边休息一边听介绍。",
    supportPinyin:
      "Suīrán shān shàng de fēngjǐng hěn hǎo, dànshì lóutī tài duō. Wǒmen kěyǐ gǎi qù hébiān guǎngchǎng, nàlǐ yě néng kàn dào lǎojiē. Rúguǒ xià yǔ, jiù xiān qù pángbiān de zhǎntīng. Dàjiā kěyǐ yībiān xiūxi yībiān tīng jièshào.",
    supportEn:
      "Although the hill offers a good view, there are too many stairs. We can go to the riverside square instead, which also overlooks the old streets. If it rains, we will first go to the nearby exhibition hall. Everyone can rest while listening to the introduction.",
    seconds: 80,
    tips: [
      "Describe the alternative positively without singling someone out as a burden.",
      "Keep the purpose of the visit, not necessarily every original stop.",
      "Ask whether the new route suits the participant's needs.",
    ],
  },
  {
    id: "s5-interview-story",
    level: 5,
    title: "Support a skill claim in an interview",
    prompt:
      "Answer 'Tell me about a time you helped someone.' Give the problem, your actions, the result, and one limitation or lesson. Then respond to a hypothetical change in the situation.",
    supportZh:
      "我在书店遇到过买错版本的顾客。我先确认需求，再联系其他门店。这不但解决了取书问题，而且让我学会先听完再解释。即使没有库存，我也会说明等待时间，不随便保证。",
    supportPinyin:
      "Wǒ zài shūdiàn yùdào guo mǎi cuò bǎnběn de gùkè. Wǒ xiān quèrèn xūqiú, zài liánxì qítā méndiàn. Zhè bùdàn jiějué le qǔ shū wèntí, érqiě ràng wǒ xuéhuì xiān tīng wán zài jiěshì. Jíshǐ méiyǒu kùcún, wǒ yě huì shuōmíng děngdài shíjiān, bù suíbiàn bǎozhèng.",
    supportEn:
      "At a bookshop, I once helped a customer who bought the wrong edition. I confirmed the need, then contacted other branches. This solved collection and taught me to listen fully before explaining. Even with no stock, I would explain the wait rather than give careless guarantees.",
    seconds: 90,
    tips: [
      "Use your own or an invented example, not just a claim that you communicate well.",
      "Distinguish an observed result from what you would do hypothetically.",
      "Include a specific lesson without claiming perfect performance.",
    ],
  },
  {
    id: "s5-purchase-negotiation",
    level: 5,
    title: "Negotiate a purchase with a condition",
    prompt:
      "You want a used bicycle but find a fault. Explain your concern, ask about repair costs, propose a conditional purchase, and say what would make you walk away.",
    supportZh:
      "这辆车价格合适，可是刹车需要检查。只要修好以后能安全使用，我就愿意买。只有确认维修费用，才能决定总价。除非您同意先检查，否则我今天不付款。",
    supportPinyin:
      "Zhè liàng chē jiàgé héshì, kěshì shāchē xūyào jiǎnchá. Zhǐyào xiū hǎo yǐhòu néng ānquán shǐyòng, wǒ jiù yuànyì mǎi. Zhǐyǒu quèrèn wéixiū fèiyòng, cái néng juédìng zǒngjià. Chúfēi nín tóngyì xiān jiǎnchá, fǒuzé wǒ jīntiān bù fùkuǎn.",
    supportEn:
      "The price is suitable, but the brakes need checking. If it can be safely used after repair, I am willing to buy. The total price can be decided only after confirming repair costs. Unless you agree to an inspection first, I will not pay today.",
    seconds: 90,
    tips: [
      "Make the sufficient and necessary conditions different and explicit.",
      "Ask who arranges and pays for an inspection.",
      "Stay firm without accusing the seller of intentional deception.",
    ],
  },
  {
    id: "s6-learning-reflection",
    level: 6,
    title: "Explain how your learning method changed",
    prompt:
      "Describe a task where following memorized steps was not enough. Explain what evidence changed your approach, what you now do differently, and why your new method is not a universal solution.",
    supportZh:
      "我之所以总留下划痕，是因为忽略了木材的差别。记住步骤未必等于掌握判断。与其一味加快动作，不如先试一小块。现在我会记录线索，但也知道不同材料需要重新检查。",
    supportPinyin:
      "Wǒ zhīsuǒyǐ zǒng liú xià huáhén, shì yīnwèi hūlüè le mùcái de chābié. Jì zhù bùzhòu wèibì děngyú zhǎngwò pànduàn. Yǔqí yīwèi jiākuài dòngzuò, bùrú xiān shì yī xiǎo kuài. Xiànzài wǒ huì jìlù xiànsuǒ, dàn yě zhīdào bùtóng cáiliào xūyào chóngxīn jiǎnchá.",
    supportEn:
      "I kept leaving scratches because I ignored differences in the wood. Memorizing steps does not necessarily mean mastering judgment. Rather than simply speed up, I should test a small area first. I now record cues, while knowing that different materials need fresh checks.",
    seconds: 120,
    tips: [
      "Replace the workshop example with a skill you can explain clearly.",
      "Separate what you observed from how you interpreted it.",
      "End with a boundary on when your improved method applies.",
    ],
  },
  {
    id: "s6-care-coordination",
    level: 6,
    title: "Coordinate a shared responsibility",
    prompt:
      "Two relatives divide care for an older family member, but one feels invisible work is overlooked. Summarize both positions, propose two concrete shared tasks, and explain a regular review without measuring every minute.",
    supportZh:
      "在弟弟看来，承担费用已经是主要帮助；姐姐却还要安排交通和临时联系。公平并非只是比较钱，而是理解实际负担。我们可以轮流预约，每月讨论一次需要调整的地方，也听听母亲的意愿。",
    supportPinyin:
      "Zài dìdi kànlái, chéngdān fèiyòng yǐjīng shì zhǔyào bāngzhù; jiějie què hái yào ānpái jiāotōng hé línshí liánxì. Gōngpíng bìngfēi zhǐ shì bǐjiào qián, érshì lǐjiě shíjì fùdān. Wǒmen kěyǐ lúnliú yùyuē, měi yuè tǎolùn yī cì xūyào tiáozhěng de dìfang, yě tīngting mǔqīn de yìyuàn.",
    supportEn:
      "The brother sees paying expenses as the main help, while the sister also arranges transport and unexpected contact. Fairness is not just comparing money but understanding actual burdens. We can alternate appointments, review adjustments monthly, and hear the mother's preferences.",
    seconds: 120,
    tips: [
      "Acknowledge the value of money without treating it as the only contribution.",
      "Add a second concrete task to the model's appointment proposal.",
      "Respect the cared-for person's choices, not only the helpers' agreement.",
    ],
  },
  {
    id: "s7-translation-choices",
    level: 7,
    title: "Explain a cultural translation choice",
    prompt:
      "A local joke loses its effect in translation. Explain whether you would translate literally, adapt it, or add context. Identify what must be preserved, one possible loss, and how you would explain the choice to the creator.",
    supportZh:
      "这句台词的作用在于表现角色自作聪明。逐词翻译非但没有保留笑点，反而使人物显得严肃。我建议调整误会的形式，以便外地观众理解，但改写后的语气仍须与原作者讨论。",
    supportPinyin:
      "Zhè jù táicí de zuòyòng zàiyú biǎoxiàn juésè zìzuò cōngmíng. Zhú cí fānyì fēidàn méiyǒu bǎoliú xiàodiǎn, fǎn'ér shǐ rénwù xiǎnde yánsù. Wǒ jiànyì tiáozhěng wùhuì de xíngshì, yǐbiàn wàidì guānzhòng lǐjiě, dàn gǎixiě hòu de yǔqì réng xū yǔ yuán zuòzhě tǎolùn.",
    supportEn:
      "The line's function is to show the character pretending to be clever. Word-for-word translation not only loses the joke but makes the character seem serious. I suggest changing the misunderstanding so outside audiences understand, while discussing the adapted voice with the original author.",
    seconds: 150,
    tips: [
      "Explain the joke's function without needing a real copyrighted script.",
      "Distinguish preserving character from preserving every word.",
      "Add one adaptation risk and a way to test it with an audience.",
      "Do not claim that adaptation has no loss.",
    ],
  },
  {
    id: "s7-report-null-result",
    level: 7,
    title: "Report a disappointing research result",
    prompt:
      "A pilot did not show the expected energy savings. Brief a funder honestly: explain the observed result, what it does not prove, and a limited next step. Address why publishing the result could still be useful.",
    supportZh:
      "本次测试尚未发现明显优势，但这不等于材料在所有条件下都无效。鉴于气候可能影响表现，我们建议先做小范围比较。公开方法和限制，可以让其他团队少走重复的路，也便于核查结论。",
    supportPinyin:
      "Běn cì cèshì shàngwèi fāxiàn míngxiǎn yōushì, dàn zhè bù děngyú cáiliào zài suǒyǒu tiáojiàn xià dōu wúxiào. Jiànyú qìhòu kěnéng yǐngxiǎng biǎoxiàn, wǒmen jiànyì xiān zuò xiǎo fànwéi bǐjiào. Gōngkāi fāngfǎ hé xiànzhì, kěyǐ ràng qítā tuánduì shǎo zǒu chóngfù de lù, yě biànyú héchá jiélùn.",
    supportEn:
      "This test has not found a clear advantage, but that does not mean the material is ineffective under every condition. Since climate may affect performance, we propose a small comparison first. Publishing methods and limits can reduce duplicated effort and enable checking.",
    seconds: 150,
    tips: [
      "State the disappointing observation before discussing future promise.",
      "Treat climate effects as a hypothesis unless tested.",
      "Specify a stopping or review condition for the next study.",
      "Explain why clear methods matter, rather than saying all negative findings are automatically valuable.",
    ],
  },
  {
    id: "s8-documentary-objection",
    level: 8,
    title: "Respond to an objection about documentary editing",
    prompt:
      "An interviewee says an edit creates a misleading causal story. Respond as the producer: grant artistic needs, distinguish permission from meaning, propose a verification procedure, and state what control the interviewee would not automatically receive.",
    supportZh:
      "诚然，剪辑需要形成结构，然而真实句子的组合也可能产生误导。不能据此断言一次公开许可涵盖了所有含义变化。我建议先核对时间线，再讨论必要交代；艺术形式仍由团队负责，但敏感解释有待共同核查。",
    supportPinyin:
      "Chéngrán, jiǎnjí xūyào xíngchéng jiégòu, rán'ér zhēnshí jùzi de zǔhé yě kěnéng chǎnshēng wùdǎo. Bù néng jùcǐ duànyán yī cì gōngkāi xǔkě hángài le suǒyǒu hányì biànhuà. Wǒ jiànyì xiān héduì shíjiānxiàn, zài tǎolùn bìyào jiāodài; yìshù xíngshì réng yóu tuánduì fùzé, dàn mǐngǎn jiěshì yǒudài gòngtóng héchá.",
    supportEn:
      "Editing does need structure, but combining true sentences can still mislead. We cannot conclude that one publication permission covers every change in meaning. I suggest checking chronology and necessary context first. The team retains artistic form, while sensitive interpretations need joint checking.",
    seconds: 180,
    tips: [
      "Use an invented chronology to demonstrate the possible misleading link.",
      "Do not treat all objections as either a veto or an irrelevant interruption.",
      "Explain how you would document the checked facts and remaining disagreement.",
      "Close with a clear responsibility for the final published interpretation.",
    ],
  },
  {
    id: "s8-collaborative-art",
    level: 8,
    title: "Negotiate credit and reuse in a collaborative project",
    prompt:
      "You are planning art based on community stories. Propose how to credit contributions, handle conflicting accounts, and obtain permission for later commercial reuse. Answer an objection that these steps make creation too slow.",
    supportZh:
      "共同创作未尝不是理解差异的机会，但不能把提供故事等同于同意一切改写。除署名之外，尚需说明用途和修改方式。倘若后续转为商业宣传，则应重新确认许可，而不是把最初参与当成永久授权。",
    supportPinyin:
      "Gòngtóng chuàngzuò wèicháng bù shì lǐjiě chāyì de jīhuì, dàn bù néng bǎ tígōng gùshi děngtóng yú tóngyì yīqiè gǎixiě. Chú shǔmíng zhīwài, shàng xū shuōmíng yòngtú hé xiūgǎi fāngshì. Tǎngruò hòuxù zhuǎn wéi shāngyè xuānchuán, zé yīng chóngxīn quèrèn xǔkě, ér bù shì bǎ zuìchū cānyù dàngchéng yǒngjiǔ shòuquán.",
    supportEn:
      "Co-creation may be an opportunity to understand differences, but providing a story is not agreement to every rewrite. Beyond credit, uses and changes need explanation. If later use becomes commercial promotion, permission should be confirmed again rather than treating initial participation as permanent authorization.",
    seconds: 180,
    tips: [
      "Distinguish attribution, permission, and authority over interpretation.",
      "Propose a bounded consultation stage rather than unlimited revision.",
      "Explain how unresolved accounts could remain visible.",
      "Grant that procedures have costs, then justify the specific safeguards.",
    ],
  },
  {
    id: "s9-compensation-policy",
    level: 9,
    title: "Evaluate a compensation claim",
    prompt:
      "A project claims planting more trees compensates for removing mature woodland. Give an extended assessment: concede possible benefits, distinguish replaceable and nonreplaceable functions, consider alternatives, and assign responsibility for uncertain long-term results.",
    supportZh:
      "补植固然不无价值，却不能把树木数量当作生态关系的等价证明。退一步说，即便新林最终成熟，等待期间的损失仍需说明。就审批而言，应先比较替代路线；在责任明确、长期监测可行的前提下，方能讨论补偿是否充分。",
    supportPinyin:
      "Bǔzhí gùrán bù wú jiàzhí, què bù néng bǎ shùmù shùliàng dàngzuò shēngtài guānxì de děngjià zhèngmíng. Tuì yī bù shuō, jíbiàn xīn lín zuìzhōng chéngshú, děngdài qījiān de sǔnshī réng xū shuōmíng. Jiù shěnpī éryán, yīng xiān bǐjiào tìdài lùxiàn; zài zérèn míngquè, chángqī jiāncè kěxíng de qiántí xià, fāng néng tǎolùn bǔcháng shìfǒu chōngfèn.",
    supportEn:
      "Replacement planting has some value, but tree counts cannot prove equivalent ecological relationships. Even granting eventual maturity, losses during the wait require explanation. Approval should first compare alternatives; adequate compensation can be discussed only with clear responsibility and feasible long-term monitoring.",
    seconds: 210,
    tips: [
      "Separate whether damage is necessary from how to reduce it if allowed.",
      "Use a concrete function, such as mature habitat, to explain the limits of counting.",
      "Concede the costs of alternatives rather than presenting a cost-free answer.",
      "End with review criteria and responsibility if targets are not met.",
    ],
  },
  {
    id: "s9-chair-negotiation",
    level: 9,
    title: "Turn a shared slogan into a workable agreement",
    prompt:
      "Chair a discussion where partners all endorse 'open participation' but mean different things. Clarify the disagreement, propose minimum shared actions, preserve unresolved differences honestly, and set a review procedure.",
    supportZh:
      "与其说我们已经达成共识，不如说我们暂时使用了同一句话。若开放无非是允许旁听，就不能宣传成能够影响决定。就最低承诺而言，可以先明确建议渠道和回应责任；未统一的表决方式应保留说明，并定期比较执行情况。",
    supportPinyin:
      "Yǔqí shuō wǒmen yǐjīng dáchéng gòngshí, bùrú shuō wǒmen zànshí shǐyòng le tóng yī jù huà. Ruò kāifàng wúfēi shì yǔnxǔ pángtīng, jiù bù néng xuānchuán chéng nénggòu yǐngxiǎng juédìng. Jiù zuìdī chéngnuò éryán, kěyǐ xiān míngquè jiànyì qúdào hé huíyìng zérèn; wèi tǒngyī de biǎojué fāngshì yīng bǎoliú shuōmíng, bìng dìngqī bǐjiào zhíxíng qíngkuàng.",
    supportEn:
      "Rather than having reached consensus, we are temporarily using the same phrase. Mere permission to observe must not be advertised as influence over decisions. As a minimum, we can define suggestion channels and response responsibilities, explain differing voting arrangements, and regularly compare implementation.",
    seconds: 210,
    tips: [
      "Ask each side to define the term before negotiating procedures.",
      "Make two observable commitments rather than another broad slogan.",
      "Do not describe an unresolved issue as settled just to produce an agreement.",
      "Explain who reviews implementation and how amendments can be proposed.",
    ],
  }
)

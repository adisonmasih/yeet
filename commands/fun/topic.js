const responses = [
    "Favorite holiday destination",
    "Best book you've read",
    "Dream job",
    "Most memorable childhood moment",
    "Top travel destinations on your bucket list",
    "Favorite hobby",
    "Best movie you've watched",
    "Dream car",
    "Favorite cuisine",
    "Biggest fear",
    "Most cherished possession",
    "Favorite music genre",
    "Bucket list experiences",
    "Top places to visit in your city",
    "Dream pet",
    "Favorite TV show",
    "Hobbies you want to try",
    "Greatest accomplishment",
    "Most admired historical figure",
    "Favorite sports to watch",
    "Dream concert lineup",
    "Best way to relax",
    "Memorable family tradition",
    "Favorite childhood TV show",
    "Dream invention",
    "Best gift you've received",
    "Favorite season",
    "Dream party theme",
    "Top social media platform",
    "Bucket list adventure activities",
    "Favorite color",
    "Dream skill to learn",
    "Most inspiring quote",
    "Best concert you've attended",
    "Favorite board game",
    "Dream charity to support",
    "Greatest personal strength",
    "Most relaxing vacation activity",
    "Favorite artist",
    "Dream historic era to visit",
    "Top motivational speaker",
    "Best podcast you've listened to",
    "Dream fitness goal",
    "Favorite app on your phone",
    "Hobbies you enjoyed as a child",
    "Greatest travel memory",
    "Most unforgettable meal",
    "Favorite actor or actress",
    "Dream outdoor activity",
    "Top social cause to support",
    "Favorite genre of art",
    "Dream home location",
    "Most prized possession",
    "Best advice you've received",
    "Dream academic subject to study",
    "Favorite item in your wardrobe",
    "Dream place to retire",
    "Most inspiring movie",
    "Favorite food to cook",
    "Dream way to spend a day off",
    "Most cherished childhood memory",
    "Favorite way to stay active",
    "Dream fictional universe to visit",
    "Best childhood memory",
    "Favorite piece of technology",
    "Dream sustainable living practice",
    "Most treasured family recipe",
    "Favorite activity to do with friends",
    "Dream historical event to witness",
    "Best way to spend a rainy day",
    "Favorite genre of literature",
    "Dream music festival lineup",
    "Most inspirational person in your life",
    "Favorite way to give back to the community",
    "Dream room in a house",
    "Top leisure activity",
    "Best childhood toy",
    "Favorite historical landmark",
    "Dream relaxation spot",
    "Most fascinating animal",
    "Favorite childhood book",
    "Dream place to watch the sunset",
    "Best way to enjoy nature",
    "Most cherished family tradition",
    "Favorite way to start the day",
    "Dream business to own",
    "Best way to unwind after a long day",
    "Most used phone app",
    "Favorite form of artistic expression",
    "Dream celebrity to meet",
    "Top skill to master",
    "Best childhood vacation memory",
    "Dream fictional character to meet",
    "Favorite type of cuisine to cook",
    "Most binge-worthy TV show",
    "Dream holiday celebration",
    "Favorite way to de-stress",
    "Best childhood playground game",
    "Top way to learn something new",
    "Dream goal for personal growth",
    "Favorite smell",
    "Most interesting historical event",
    "Dream adventure sport to try",
    "Best way to support a friend in need",
    "Favorite childhood snack",
    "Dream city to live in",
    "Ideal weekend getaway",
    "Most exciting form of transportation",
    "Dream skill to teach others",
    "Favorite social media platform for inspiration",
    "Top museum or art gallery",
    "Dream theatrical production to watch",
    "Best way to spend quality time alone",
    "Favorite way to be creative",
    "Dream outdoor destination for relaxation",
    "Most cherished piece of art",
    "Top inspirational movie",
    "Dream video game to play",
    "Favorite childhood memory with a friend",
    "Top way to boost energy",
    "Dream wildlife encounter",
    "Best way to learn about other cultures",
    "Favorite form of self-expression",
    "Dream community project to initiate",
    "Most inspiring natural phenomenon",
    "Favorite artist to see live",
    "Dream way to give back to society",
    "Best documentary you've watched",
    "Dream adventure with friends",
    "Most cherished family holiday tradition",
    "Favorite way to support local businesses",
    "Dream hobby to turn into a career",
    "Most fascinating technology innovation",
    "Best way to spark creativity",
    "Dream clothing item",
    "Favorite childhood game to play",
    "Top way to stay connected with loved ones",
    "Dream scientific discovery",
    "Most intriguing conspiracy theory",
    "Favorite social cause to advocate for",
    "Dream instrument to master",
    "Best way to overcome a challenge",
    "Dream way to capture memories",
    "Favorite childhood playtime activity",
    "Top fashion trend you love",
    "Dream travel companion",
    "Most heartwarming act of kindness witnessed",
    "Favorite way to show appreciation",
    "Dream content creation project",
    "Best hobby for relaxation",
    "Dream way to contribute to a better world",
    "Favorite fairytale",
    "Top creative outlet for stress relief",
    "Dream technological advancement",
    "Most loved childhood pet",
    "Favorite childhood bedtime story",
    "Dream personal sanctuary",
    "Best way to express gratitude",
    "Dream imaginary world to escape to",
    "Favorite sound in nature",
    "Top way to promote mental well-being",
    "Dream way to connect with nature",
    "Most intriguing unsolved mystery",
    "Favorite childhood adventure",
    "Dream culinary masterpiece to create",
    "Best way to share joy with others",
    "Dream way to experience different cultures",
    "Favorite time of day and why",
    "Top escape from reality",
    "Dream way to preserve memories",
    "Favorite rainy day activity",
    "Dream role in a movie or play",
    "Best way to unwind before bed",
    "Most liked social media platform",
    "Favorite childhood TV commercial",
    "Dream outdoor event to attend",
    "Top personal achievement",
    "Best way to support local artists",
    "Favorite street food",
    "Most cherished childhood possession",
    "Dream philanthropic cause to support",
    "Top way to practice mindfulness",
    "Best way to celebrate small victories",
    "Favorite local spot to relax",
    "Dream way to spend a Saturday",
    "Most memorable concert experience",
    "Favorite childhood memory with a sibling",
    "Top way to spread kindness",
    "Dream public speaking opportunity",
    "Best way to practice gratitude",
    "Favorite childhood learning experience",
    "Dream way to learn a new language",
    "Ideal family vacation destination",
    "Most cherished childhood game",
    "Dream educational field trip",
    "Favorite family tradition",
    "Top way to overcome a fear",
    "Dream writing project",
    "Best way to support environmental causes",
    "Favorite childhood playground equipment",
    "Dream inspirational figure to meet",
    "Most inspiring childhood teacher",
    "Dream way to celebrate a milestone",
    "Favorite local event to attend",
    "Top way to stay positive during tough times",
    "Dream adventure to embark on",
    "Best way to nurture creativity",
    "Favorite childhood summer activity",
    "Dream way to make a difference in the world",
    "Most treasured childhood friendship",
    "Dream personal development goal",
    "Favorite childhood school subject",
    "Top way to take care of yourself",
    "Dream way to inspire others",
    "Best way to show self-love",
    "Favorite childhood arts and crafts project",
    "Dream way to give back to your community",
    "Most impactful childhood lesson",
    "Dream way to promote inclusivity",
    "Favorite childhood family meal",
    "Top way to foster innovation",
    "Dream volunteer opportunity",
    "Best way to support animal welfare",
    "Favorite childhood vacation memory",
    "Most cherished childhood tradition",
    "Dream way to encourage teamwork",
    "Favorite childhood bedtime routine",
    "Top way to cultivate empathy",
    "Dream way to showcase creativity",
    "Best way to support underprivileged communities",
    "Favorite childhood outdoor game",
    "Most memorable childhood field trip",
    "Dream way to facilitate communication",
    "Favorite childhood holiday celebration",
    "Top way to spark curiosity",
    "Dream cooperative project",
    "Best way to empower others",
    "Favorite childhood museum visit",
    "Dream community event to organize",
    "Most cherished childhood learning moment",
    "Dream way to enhance accessibility",
    "Favorite childhood book character",
    "Top way to encourage learning",
    "Dream collaborative endeavor",
    "Best way to promote mental health awareness",
    "Favorite childhood storytelling experience",
    "Dream way to support youth development",
    "Most cherished childhood outing",
    "Dream way to foster courage",
    "Favorite childhood invention idea",
    "Top way to champion equality",
    "Dream way to instill confidence",
    "Best way to support creative expression",
    "Favorite childhood nature walk",
    "Dream initiative to promote sustainability",
    "Most memorable childhood classroom activity",
    "Dream way to promote social justice",
    "Favorite childhood science experiment",
    "Top way to inspire imagination",
    "Dream way to encourage critical thinking",
    "Favorite holiday destination",
    "Best book you've read",
    "Dream job",
    "Most memorable childhood moment",
    "Top travel destinations on your bucket list",
    "Favorite hobby",
    "Best movie you've watched",
    "Dream car",
    "Favorite cuisine",
    "Biggest fear",
    "Most cherished possession",
    "Favorite music genre",
    "Bucket list experiences",
    "Top places to visit in your city",
    "Dream pet",
    "Favorite TV show",
    "Hobbies you want to try",
    "Greatest accomplishment",
    "Most admired historical figure",
    "Favorite sports to watch",
    "Ideal first date",
    "Most important qualities in a partner",
    "Favorite way to show affection",
    "Biggest relationship deal-breaker",
    "Best relationship advice received",
    "Thoughts on long-distance relationships",
    "Favorite love song",
    "Ideal vacation with a partner",
    "Favorite romantic movie",
    "Opinion on public displays of affection",
    "Preferred method of communication in a relationship",
    "Beliefs about soulmates",
    "Favorite couple activity",
    "Opinion on staying friends with exes",
    "Dream proposal location",
    "Honesty vs. compassion in a relationship",
    "Favorite relationship milestone",
    "Views on marriage",
    "Importance of shared interests in a relationship",
    "Favorite memory with a past partner",
    "Ideal way to spend a rainy day with a partner",
    "Cooking together vs. dining out",
    "Acceptable frequency of communication in a relationship",
    "Importance of alone time in a relationship",
    "Favorite relationship book or movie",
    "Pet peeves in a relationship",
    "Opinion on couple's therapy",
    "Dealing with disagreements in a relationship",
    "Opinion on surprise gifts",
    "Value of celebrating anniversaries",
    "Handling jealousy in a relationship",
    "Opinion on joint vs. separate bank accounts",
    "Beliefs about love at first sight",
    "Thoughts on meeting the family",
    "Balance between independence and togetherness",
    "Opinion on social media presence in a relationship",
    "Choosing between love and career",
    "Favorite relationship tradition",
    "Handling ex-partners reaching out",
    "Creating boundaries with friends in a relationship",
    "Future plans: living together, pets, kids",
    "Resolving conflicts through communication",
    "Favorite relationship-related memory",
    "Impact of past relationships on current one",
    "Managing stress as a couple",
    "Comfort with public vs. private displays of affection",
    "Opinion on surprise dates",
    "Preferred way to express love: words, actions, gifts",
    "Beliefs about finding 'the one'",
    "Respecting each other's personal space",
    "Sharing responsibilities in the relationship",
    "Handling disagreements about money",
    "Thoughts on joint vs. separate vacations",
    "Expressing emotions in a relationship",
    "Value of date nights",
    "Navigating cultural differences in a relationship",
    "Handling disagreements about future plans",
    "Favorite aspect of being in a relationship",
    "Quality time vs. physical touch",
    "Balancing time with partner and time with friends",
    "Dealing with insecurities in a relationship",
    "Thoughts on relationship labels: boyfriend/girlfriend",
    "Showing appreciation for your partner",
    "Importance of humor in a relationship",
    "Navigating differing interests in a relationship",
    "Opinion on surprises vs. planned events",
    "Handling stress together as a couple",
    "Importance of trust in a relationship",
    "Opinion on couple activities vs. individual hobbies",
    "Discussing past relationships with your partner",
    "Value of personal growth within a relationship",
    "Handling time apart in a relationship",
    "Opinion on PDA in various settings",
    "Supporting each other's goals and aspirations",
    "Thoughts on sharing passwords in a relationship",
    "Handling social events as a couple",
    "Favorite way to celebrate special occasions",
    "Navigating supporting roles in a relationship",
    "Views on celebrating Valentine's Day",
    "Handling conflicts with in-laws",
    "Maintaining intimacy in a long-term relationship",
    "Balancing work and personal life in a relationship",
    "Dealing with changes in physical appearance",
    "Navigating career changes within a relationship",
    "Preferred method of apology in a relationship",
    "Communicating love languages",
    "Celebrating achievements as a couple",
    "Handling personal insecurities in a relationship",
    "Views on giving each other space when needed",
    "Thoughts on surprises vs. planned gestures",
    "Beliefs about maintaining friendships in a relationship",
    "Opinion on sharing social media accounts as a couple",
    "Value of reflecting on relationship milestones",
    "Handling changes in the relationship dynamic",
    "Navigating differing opinions on major life decisions",
    "Discussing each other's love languages",
    "Importance of emotional support in a relationship",
    "Thoughts on giving each other space for personal growth",
    "Favorite date night idea",
    "Most cherished relationship milestone",
    "Ideal way to surprise your partner",
    "Opinion on couple's vacations",
    "Handling cultural differences in a relationship",
    "Thoughts on pet names in a relationship",
    "Preferred method of resolving conflicts",
    "Importance of compromise in a relationship",
    "Favorite love language to receive",
    "Handling disagreements about household chores",
    "Sharing responsibilities in a partnership",
    "Balancing personal space in a relationship",
    "Supporting each other's hobbies and interests",
    "Navigating financial decisions as a couple",
    "Importance of relationship boundaries",
    "Dealing with long-distance challenges",
    "Favorite way to express gratitude to your partner",
    "Opinion on couple's time apart",
    "Handling jealousy in a trusting relationship",
    "Beliefs about fate and timing in relationships",
    "Favorite romantic getaway destination",
    "Ideal way to celebrate relationship anniversaries",
    "Discussing future goals and aspirations together",
    "Navigating changes in career paths within a relationship",
    "Thoughts on introducing your partner to friends and family",
    "Balancing quality time with friends and partner",
    "Handling differing opinions on parenting styles",
    "Favorite way to support your partner during tough times",
    "Expressing appreciation for little gestures in a relationship",
    "Maintaining intimacy and affection in a long-term relationship",
    "Dealing with past baggage and insecurities in a relationship",
    "Navigating conflicting schedules and busy lives together",
    "Favorite memory from early days of the relationship",
    "Importance of setting relationship goals together",
    "Handling surprises and unexpected events as a couple",
    "Thoughts on expressing emotions and vulnerability",
    "Balancing spontaneity and routine in a relationship",
    "Favorite way to keep the romance alive in a long-term relationship",
    "Navigating social obligations and events as a couple",
    "Supporting each other's physical and mental well-being",
    "Discussing and respecting each other's boundaries",
    "Handling social media presence and privacy as a couple",
    "Favorite way to make up after an argument",
    "Opinion on joint decision-making vs. individual autonomy",
    "Valuing personal growth and self-improvement in a relationship",
    "Navigating transitions and changes in life stages together",
    "Handling external pressures and influences on the relationship",
    "Favorite way to start or end the day together",
    "Thoughts on love languages and communication styles",
    "Balancing independence and interdependence in a relationship",
    "Discussing values, beliefs, and life philosophies as a couple",
    "Navigating conflicts of interest and differing priorities",
    "Supporting each other's career ambitions and goals",
    "Dealing with external stressors and challenges as a team",
    "Expressing gratitude and appreciation for each other daily",
    "Maintaining a sense of humor and fun in the relationship",
    "Handling disagreements about money and financial matters",
    "Favorite tradition or ritual you share as a couple",
    "Opinion on surprises and spontaneous gestures of love",
    "Valuing trust, honesty, and transparency in the relationship",
    "Navigating family dynamics and relationships as a couple",
    "Discussing long-term plans, goals, and aspirations together",
    "Balancing individual interests and shared activities",

];

const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("topic")
        .setDescription("get a random topic to talk about.")
    ,
    testOnly: false,
    async execute(interaction, client) {
        // respond to it as a message

        const response = responses[Math.floor(Math.random() * responses.length)];

        interaction.reply(response)

    },
};
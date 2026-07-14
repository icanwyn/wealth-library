/**
 * Wealth Library — Top 100 Financial Literature
 * Each entry: hover blurb, essence, 10 meat paragraphs, expandable applications
 */
window.WEALTH_BOOKS = [
  {
    id: 1,
    title: "The Intelligent Investor",
    author: "Benjamin Graham",
    year: 1949,
    category: "Value Investing",
    short: "The definitive guide to defensive investing and margin of safety.",
    essence: "Investing is most intelligent when it is most businesslike. Protect capital first; growth follows discipline.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    spine: "#2c3e50",
    accent: "#c4a35a",
    paragraphs: [
      "Graham distinguishes investment from speculation: an investment operation promises safety of principal and an adequate return after thorough analysis; everything else is speculation.",
      "The margin of safety is the central concept—buy securities at a significant discount to intrinsic value so that errors in judgment or bad luck do not destroy capital.",
      "Mr. Market is a manic-depressive partner who offers prices daily. You are free to ignore him when his quotes are foolish and to deal with him when they are sensible.",
      "Defensive investors should favor diversification, dollar-cost averaging into high-grade bonds and leading common stocks, and minimal forecasting.",
      "Enterprising investors may dig deeper into undervalued issues, but must still demand a margin of safety and avoid glamorous stocks priced for perfection.",
      "Market fluctuations are not risks to be feared but opportunities to be exploited—if your analysis of value is sound and your temperament is steady.",
      "Earnings power, asset values, and dividend records matter more than stories. Price is what you pay; value is what you get.",
      "Inflation erodes bond purchasing power; common stocks of sound businesses have historically offered better long-term protection when bought reasonably.",
      "Investment policy should match the investor’s knowledge, time, and emotional capacity—not peer pressure or market fashion.",
      "The investor’s chief problem—and even his worst enemy—is likely to be himself. Temperament and process beat cleverness."
    ],
    applications: [
      { title: "Build a personal margin of safety", body: "Before any major purchase or investment, require a 20–30% buffer: emergency fund covering 6 months expenses, house offers below comparable sales, or stocks below conservative intrinsic value estimates. This single habit protects against life’s surprises—job loss, medical bills, or market crashes—the way Graham protected portfolios." },
      { title: "Ignore daily market noise", body: "Turn off push notifications from trading apps. Check portfolio balances monthly, not hourly. When markets panic, write down why you own each holding; only sell if the business thesis broke, not because Mr. Market is screaming." },
      { title: "Automate defensive investing", body: "Set up automatic transfers into a broad low-cost index fund on payday. You become a dollar-cost averager by default—buying more shares when prices fall and fewer when they rise—without needing to time the market." }
    ]
  },
  {
    id: 2,
    title: "Security Analysis",
    author: "Graham & Dodd",
    year: 1934,
    category: "Value Investing",
    short: "The founding text of fundamental analysis and intrinsic value.",
    essence: "True analysis digs past price into balance sheets, earnings power, and capital structure.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    spine: "#1a2332",
    accent: "#8b7355",
    paragraphs: [
      "Security analysis is the disciplined study of facts about a security to determine whether it is a suitable purchase.",
      "Balance sheet analysis reveals assets that can support value even when earnings temporarily collapse.",
      "Earnings should be normalized across cycles; one good year does not make a permanent growth story.",
      "Senior securities (bonds, preferred) demand scrutiny of coverage ratios and protective covenants.",
      "Common stock valuation rests on earnings power, dividends, and tangible asset support—not mere momentum.",
      "Quantitative factors must be weighed with qualitative judgment about management and industry position.",
      "Overpaying for growth is a classic error; the future is uncertain and should be discounted heavily.",
      "Comparative analysis across similar companies exposes relative bargains and overvaluations.",
      "Capital structure matters: leverage magnifies both returns and ruin.",
      "The analyst’s job is to reduce uncertainty to a range of values and demand a discount to the low end."
    ],
    applications: [
      { title: "Read financial statements for life decisions", body: "Before joining a startup or freelancing for a client, apply Graham-Dodd thinking: review cash runway, debt, and revenue concentration. A beautiful pitch deck is price; the bank account is value." },
      { title: "Normalize your own income", body: "If you freelanced a great year, don’t budget as if every year will match. Average the last 3–5 years of income for housing and lifestyle decisions—just as analysts normalize earnings." },
      { title: "Compare like with like", body: "When shopping for insurance, mortgages, or SaaS tools, build a simple comparison sheet of fees, coverage, and exit costs. Relative analysis beats marketing slogans." }
    ]
  },
  {
    id: 3,
    title: "A Random Walk Down Wall Street",
    author: "Burton Malkiel",
    year: 1973,
    category: "Markets",
    short: "Why markets are hard to beat and index funds win for most people.",
    essence: "Stock prices largely reflect available information; costs and behavior sink most active strategies.",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80",
    spine: "#3d5a5b",
    accent: "#c4a35a",
    paragraphs: [
      "The efficient market hypothesis suggests that prices incorporate information quickly, making consistent outperformance difficult.",
      "Technical chart patterns often fail out-of-sample; randomness can look like patterns to the human eye.",
      "Fundamental analysis is valuable but competing smart money limits easy excess returns.",
      "Transaction costs, taxes, and management fees compound into large performance gaps over decades.",
      "Index funds offer broad diversification at minimal cost—the practical answer for most investors.",
      "Asset allocation across stocks, bonds, and cash drives long-term outcomes more than stock picking for amateurs.",
      "Bubbles and crashes happen; valuation and temperament still matter even if pure timing is unreliable.",
      "Behavioral biases—overconfidence, herd following—explain why individuals underperform the averages.",
      "Lifecycle investing: more equities when young, more bonds as needs for capital preservation rise.",
      "A simple, low-cost, diversified plan held for decades beats most complex strategies."
    ],
    applications: [
      { title: "Choose boring by default", body: "Open a brokerage IRA or 401(k) and put new savings into a total-market or S&P 500 index fund. Rebalance once a year. This is Malkiel’s prescription translated to 2020s apps like Vanguard, Fidelity, or Schwab." },
      { title: "Audit your fees", body: "Login to every investment account and note expense ratios. Move money out of funds charging over ~0.20% unless you have a clear, proven reason. A 1% fee can cost hundreds of thousands over a career." },
      { title: "Stop stock-tip culture", body: "When friends share hot tips, thank them and keep indexing. Use a small ‘play money’ sleeve (under 5%) if you must experiment—protect the core." }
    ]
  },
  {
    id: 4,
    title: "The Little Book of Common Sense Investing",
    author: "John C. Bogle",
    year: 2007,
    category: "Indexing",
    short: "Own the market, minimize costs, stay the course.",
    essence: "In investing, you get what you don’t pay for. Capture market returns by owning the haystack, not hunting needles.",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80",
    spine: "#1e3a5f",
    accent: "#c23b22",
    paragraphs: [
      "All investors as a group earn the market return before costs; after costs, active managers as a group underperform.",
      "The magic of compounding returns is overwhelmed by the tyranny of compounding costs.",
      "Own a low-cost total stock market index fund and hold it forever—Bogle’s core recommendation.",
      "Dividends and earnings growth of businesses drive long-term stock returns; speculation drives short-term noise.",
      "Reversion to the mean punishes hot funds and hot sectors over time.",
      "Bond index funds have a place for ballast, income, and sleep-well-at-night capital.",
      "Stay the course through bear markets; selling low is the surest path to permanent loss of capital.",
      "Simplicity is a virtue: fewer funds, fewer trades, fewer decisions that can go wrong.",
      "Don’t peek obsessively; long-term wealth is built in years and decades, not days.",
      "The winning formula is low cost + broad diversification + patience + discipline."
    ],
    applications: [
      { title: "One-fund portfolio", body: "If choice paralysis hits, buy a single target-date or total-world stock index fund for retirement. Bogle would approve of ruthless simplicity." },
      { title: "Calculate cost of delay", body: "Use a compound interest calculator: investing $500/month from age 25 vs 35. The ‘lost decade’ is often more expensive than any fund fee—start now, refine later." },
      { title: "Write an investment policy", body: "One page: ‘I will contribute X% of income, hold low-cost indexes, rebalance annually, and not sell in panics.’ Sign it. Read it when markets crash." }
    ]
  },
  {
    id: 5,
    title: "Common Stocks and Uncommon Profits",
    author: "Philip Fisher",
    year: 1958,
    category: "Growth Investing",
    short: "Buy great companies and hold them for the long haul.",
    essence: "Scuttlebutt research finds exceptional growth businesses worth holding for decades.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    spine: "#4a3728",
    accent: "#c4a35a",
    paragraphs: [
      "Fisher’s fifteen points evaluate management quality, R&D, sales organization, profit margins, and labor relations.",
      "The scuttlebutt method: talk to customers, suppliers, competitors, and former employees to learn what filings hide.",
      "Buy when a superior company is temporarily out of favor, then hold through ordinary volatility.",
      "A few outstanding companies held for decades can create life-changing wealth—concentration with knowledge.",
      "Don’t over-diversify into mediocrity; know fewer businesses deeply.",
      "When to sell: when the original thesis is broken, or a far better opportunity appears—not because of price swings alone.",
      "Management integrity and ability are as important as numbers.",
      "Growth is not a temporary fad but sustainable competitive advantage and reinvestment opportunity.",
      "Ignore tips and market gossip; do original work.",
      "Patience is a competitive advantage few investors possess."
    ],
    applications: [
      { title: "Scuttlebutt your career", body: "Before joining a company, talk to current and former employees on LinkedIn, read Glassdoor carefully, and try the product. Fisher’s method works for job offers as well as stocks." },
      { title: "Own what you understand", body: "If you work in healthcare, software, or retail, you may spot industry shifts early. Translate domain expertise into informed long-term holdings—never day trades based on gossip." },
      { title: "Hold winners longer", body: "Review sell decisions from the past five years. How often did you sell great assets too early for ‘rebalancing’ or fear? Raise the bar for selling quality." }
    ]
  },
  {
    id: 6,
    title: "One Up On Wall Street",
    author: "Peter Lynch",
    year: 1989,
    category: "Stock Picking",
    short: "Use what you know as a consumer to find great stocks early.",
    essence: "Amateur investors have an edge in everyday life if they do homework and think long term.",
    image: "https://images.unsplash.com/photo-1560472355-536de3962603?w=800&q=80",
    spine: "#2d4a3e",
    accent: "#c4a35a",
    paragraphs: [
      "Invest in what you know—products and services you use and understand as a customer.",
      "Classify stocks: slow growers, stalwarts, fast growers, cyclicals, turnarounds, asset plays—each needs different expectations.",
      "The best stock to buy may be the one you already encounter at the mall, not the one on CNBC.",
      "Do homework: PEG ratios, debt levels, cash positions, and competitive dynamics still matter.",
      "Avoid hot tips, IPOs you don’t understand, and companies that diversify into unrelated businesses (‘diworsification’).",
      "Earnings drive stock prices over time; stories without earnings are dangerous.",
      "Be patient with good companies; the market can take years to reward obvious winners.",
      "Small investors can buy small companies institutions ignore—until they grow large.",
      "Know why you own a stock in two minutes; if you can’t explain it, you don’t understand it.",
      "The person who turns over the most rocks wins—curiosity beats credentials."
    ],
    applications: [
      { title: "Consumer edge journal", body: "Keep a note on your phone of brands you love that keep raising prices without losing customers—potential pricing power. Research them as businesses, not just products." },
      { title: "Two-minute thesis", body: "For every holding, write two sentences: what the company does and why it will be more valuable in five years. If you can’t, sell or don’t buy." },
      { title: "Kids and trends", body: "Watch what younger people spend on—apps, fashion, food. Trends often start there. Still verify unit economics before investing a dollar." }
    ]
  },
  {
    id: 7,
    title: "Beating the Street",
    author: "Peter Lynch",
    year: 1993,
    category: "Stock Picking",
    short: "Practical Magellan-era lessons on research and portfolio craft.",
    essence: "Rigorous visiting, reading, and common sense beat complex theories for stock selection.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    spine: "#3e2723",
    accent: "#c23b22",
    paragraphs: [
      "Lynch walks through real portfolio decisions, showing research habits that scale from funds to individuals.",
      "Visit companies, read annual reports, and track same-store sales and margins over time.",
      "Cyclical industries require different timing instincts than compounder growth stocks.",
      "Don’t fear stocks that have already risen if fundamentals still improve faster than price.",
      "Cash is a position; dry powder matters when opportunities appear.",
      "Retail investors can outperform by specializing in niches Wall Street neglects.",
      "Selling winners too early is a common regret; let compounders run with monitoring.",
      "Macro forecasts are less useful than company-level facts.",
      "A stock is not a lottery ticket; it is a share of a living business.",
      "Keep learning: markets evolve, but curiosity and discipline do not expire."
    ],
    applications: [
      { title: "Annual report habit", body: "Once a quarter, read one annual report of a company you use. Start with the CEO letter and risk factors. Build literacy the Lynch way." },
      { title: "Local economy investing", body: "Notice which local businesses expand despite recessions—those operators understand unit economics. Public analogs may exist for research." },
      { title: "Dry powder rule", body: "Keep 5–10% of investable assets in cash or short Treasuries so a crash becomes an opportunity, not a forced spectator event." }
    ]
  },
  {
    id: 8,
    title: "The Essays of Warren Buffett",
    author: "Lawrence Cunningham (ed.)",
    year: 1997,
    category: "Value Investing",
    short: "Buffett’s shareholder letters organized as a masterclass.",
    essence: "Buy wonderful businesses at fair prices, trust able managers, and think in decades.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80",
    spine: "#1a2744",
    accent: "#c4a35a",
    paragraphs: [
      "Corporate governance and owner-oriented management create lasting value for shareholders.",
      "Economic moats—brand, cost advantage, network effects, switching costs—protect returns on capital.",
      "Intrinsic value is the discounted cash the business will produce for owners over its life.",
      "Accounting can mislead; look through reported earnings to economic reality.",
      "Acquisitions often destroy value when ego and premium prices override discipline.",
      "Insurance float can be a powerful funding source when underwriting is rational.",
      "Stock options and compensation should align managers with long-term owners, not short-term EPS games.",
      "Mr. Market remains Graham’s gift; temperament is Buffett’s edge as much as intellect.",
      "Circle of competence: stay within what you can understand and expand it slowly.",
      "Time is the friend of the wonderful business and the enemy of the mediocre."
    ],
    applications: [
      { title: "Circle of competence map", body: "List industries you truly understand from work or study. Put 80%+ of stock exposure there or in broad indexes. Expand the circle with deliberate learning, not FOMO." },
      { title: "Wonderful vs cheap", body: "When tempted by a deep-value ‘cigar butt,’ ask: would I be happy if the market closed for ten years? Prefer durable quality at a fair price for long holds." },
      { title: "Owner mindset at work", body: "Treat your career skill stack like a business: reinvest in rare skills, avoid ‘diworsifying’ into shiny side projects that dilute focus." }
    ]
  },
  {
    id: 9,
    title: "Poor Charlie's Almanack",
    author: "Charlie Munger",
    year: 2005,
    category: "Mental Models",
    short: "Multidisciplinary wisdom and latticework thinking for better decisions.",
    essence: "Invert, always invert. Use mental models from many fields to avoid stupidity.",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80",
    spine: "#4a1942",
    accent: "#c4a35a",
    paragraphs: [
      "A latticework of mental models from psychology, physics, biology, and economics beats single-discipline thinking.",
      "Inversion: solve problems by studying how to fail, then avoiding those paths.",
      "Psychology of human misjudgment catalogs biases that destroy wealth and relationships.",
      "Sit on your ass investing: great opportunities are rare; activity is not achievement.",
      "Avoiding stupidity is often easier and more profitable than seeking brilliance.",
      "Incentives rule the world; always ask ‘what’s in it for them?’",
      "Compound interest applies to knowledge and reputation as well as money.",
      "Reliability and integrity are economic assets with infinite optionality.",
      "Learn from the mistakes of others—vicarious experience is cheaper than personal disaster.",
      "The best way to get what you want is to deserve what you want."
    ],
    applications: [
      { title: "Pre-mortem every big decision", body: "Before a house purchase, career change, or business launch, write: ‘It is two years later and this failed. Why?’ Fix those failure modes in advance—Munger’s inversion in daily life." },
      { title: "Incentive audit", body: "When a salesperson, advisor, or influencer recommends something, map how they get paid. Commission-heavy advice needs extra skepticism." },
      { title: "Build a latticework habit", body: "Read one great book outside finance each quarter—psychology, biology, history. Connect ideas to money decisions in a notebook." }
    ]
  },
  {
    id: 10,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    year: 2020,
    category: "Behavior",
    short: "Soft skills of money: behavior beats spreadsheets.",
    essence: "Doing well with money has little to do with intelligence and much to do with behavior.",
    image: "https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=800&q=80",
    spine: "#2c2c54",
    accent: "#c23b22",
    paragraphs: [
      "No one is crazy: people make financial decisions based on unique life experiences and incentives.",
      "Luck and risk are siblings; never judge outcomes without considering both.",
      "Enough is a powerful concept—the hardest financial skill is getting the goalpost to stop moving.",
      "Compounding works when you leave money alone long enough for math to work.",
      "Getting wealthy and staying wealthy require different skills: optimism to build, paranoia and humility to keep.",
      "Tails drive results: a few events and holdings dominate lifetime outcomes.",
      "Freedom is the highest dividend money pays—control over your time.",
      "Room for error: margins of safety in savings rates, career, and portfolios keep you in the game.",
      "Man in the car paradox: people want respect and admiration, not your car—which nobody notices as you hoped.",
      "Define your own game; don’t play someone else’s status competition with your savings rate."
    ],
    applications: [
      { title: "Define ‘enough’", body: "Write numbers: monthly spend for a good life, savings rate that still lets you enjoy today, and a net-worth level where more stuff won’t buy more happiness. Revisit yearly." },
      { title: "Buy freedom units", body: "Every $1,000 saved at a 4% safe withdrawal mindset is ~$40/year of freedom. Frame savings as hours of future autonomy, not deprivation." },
      { title: "Room for error budget", body: "Live below means even when income rises. Keep lifestyle inflation at half the raise rate so shocks—kids, health, recessions—don’t force desperate choices." }
    ]
  }
];

// Continue books 11-100 in extended catalog
window.WEALTH_BOOKS = window.WEALTH_BOOKS.concat([
  {
    id: 11, title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", year: 1997, category: "Mindset",
    short: "Assets put money in your pocket; liabilities take it out.",
    essence: "Financial education and cash-flowing assets beat the pure employee mindset.",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80", spine: "#6b2d5c", accent: "#c4a35a",
    paragraphs: [
      "The rich buy assets; the middle class buys liabilities they think are assets.",
      "Your house can be a lifestyle choice, but treat cash flow honestly.",
      "Financial literacy—accounting, investing, markets, law—is a survival skill.",
      "Work to learn, not only to earn, especially early in your career.",
      "Corporations and legal structures can create tax and liability advantages when used ethically.",
      "Mind your own business: build a side asset base even while employed.",
      "Fear and desire drive bad financial behavior; awareness is the first defense.",
      "Job security is an illusion; skill and assets create real security.",
      "Cash flow statements matter more than vanity net worth for freedom.",
      "Teach children money skills early through games and real examples."
    ],
    applications: [
      { title: "Monthly asset check", body: "List everything you own that puts money in your pocket (rentals, dividends, royalties, online products). Grow that list deliberately each year." },
      { title: "Learn one money skill per quarter", body: "Taxes, negotiation, indexing, real estate basics, or coding a small digital product—skills compound like capital." },
      { title: "Side cash-flow experiment", body: "Launch a small asset: a digital template, a rental room, dividend drip. Aim for $100/month passive-ish income first, then scale." }
    ]
  },
  {
    id: 12, title: "Think and Grow Rich", author: "Napoleon Hill", year: 1937, category: "Mindset",
    short: "Desire, faith, and organized planning as wealth foundations.",
    essence: "Definite purpose plus persistence transforms ideas into riches.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80", spine: "#3d2914", accent: "#c4a35a",
    paragraphs: [
      "Burning desire for a definite financial goal is the starting point of achievement.",
      "Faith and autosuggestion program the subconscious toward opportunity recognition.",
      "Specialized knowledge beats general knowledge when applied with a plan.",
      "Imagination creates plans; organized planning executes them with a mastermind group.",
      "Decision: successful people decide promptly and change slowly; failures reverse that.",
      "Persistence is willpower applied daily when motivation fades.",
      "The mastermind alliance multiplies intelligence through coordinated effort.",
      "Transmute sexual and creative energy into productive drive.",
      "The subconscious mind is influenced by emotion-charged thoughts.",
      "The sixth sense and intuition emerge after disciplined practice of the other principles."
    ],
    applications: [
      { title: "Write a definite chief aim", body: "One sentence: exact dollar amount or outcome, date, and what you will give in return. Read it morning and night for 90 days." },
      { title: "Form a modern mastermind", body: "Three to five peers who meet monthly to review goals, intros, and obstacles. Zoom counts; consistency matters more than prestige." },
      { title: "Decision diet", body: "For 30 days, make small decisions within 60 seconds (restaurant, outfit, email reply). Build decision muscle for bigger career bets." }
    ]
  },
  {
    id: 13, title: "The Richest Man in Babylon", author: "George S. Clason", year: 1926, category: "Foundations",
    short: "Pay yourself first and make gold multiply—ancient rules still work.",
    essence: "A part of all you earn is yours to keep; put it to work.",
    image: "https://images.unsplash.com/photo-1607863680198-23d4b2565df0?w=800&q=80", spine: "#8b4513", accent: "#c4a35a",
    paragraphs: [
      "Save at least one-tenth of all you earn before spending on desires.",
      "Control thy expenditures; budget lifestyle to fit income after saving.",
      "Make thy gold multiply through prudent investment, not idle storage alone.",
      "Guard thy treasures from loss; avoid schemes you do not understand.",
      "Make of thy dwelling a profitable investment when possible.",
      "Insure a future income for yourself and family through foresight.",
      "Increase thy ability to earn through skill and reputation.",
      "Advice from those experienced in handling money is worth seeking.",
      "Luck follows opportunity prepared for by thrift and action.",
      "Debt can be conquered with disciplined repayment plans and living below means."
    ],
    applications: [
      { title: "10% automatic", body: "On payday, auto-transfer 10% (or more) to savings/investments before any discretionary spending. Babylon’s first law in fintech form." },
      { title: "Desire list vs budget", body: "Write wants separately from needs. Fund wants only from the remaining 70–80% after save and necessities. Shame-free but structured." },
      { title: "Debt snowball/avalanche", body: "List debts, pick a method, automate minimums + extra to one target. Clason’s debt parable is a modern payoff plan." }
    ]
  },
  {
    id: 14, title: "Your Money or Your Life", author: "Vicki Robin & Joe Dominguez", year: 1992, category: "Lifestyle",
    short: "Trade life energy wisely; money is hours of your life.",
    essence: "Financial independence comes from aligning spending with real fulfillment.",
    image: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=800&q=80", spine: "#2e5a4c", accent: "#c4a35a",
    paragraphs: [
      "Money equals life energy—hours spent earning after true work-related costs.",
      "Track every cent to see where life energy actually goes.",
      "Calculate real hourly wage after commuting, clothes, and stress recovery.",
      "Ask of each expense: was it fulfillment, alignment with values, and worth the life energy?",
      "The fulfillment curve: more spending eventually adds little happiness.",
      "Lower expenses raise savings rate and hasten independence more reliably than only raising income.",
      "Crossovers: when investment income covers expenses, work becomes optional.",
      "Wall charts of income, expenses, and investment income make progress visible.",
      "Meaningful work can continue after FI; the point is choice.",
      "Community, frugality, and purpose replace consumption as identity."
    ],
    applications: [
      { title: "True hourly wage", body: "Add commute, work clothes, and decompression time to your job. Divide take-home by total hours. Use that number when deciding if a $50 purchase is ‘worth it.’" },
      { title: "Values spending audit", body: "For one month categorize every expense as: aligns with values / neutral / regret. Cut one regret category completely next month." },
      { title: "FI crossover tracker", body: "Spreadsheet: annual expenses vs expected portfolio income at 3–4%. Update yearly. Watch the gap close—motivation without crash dieting life." }
    ]
  },
  {
    id: 15, title: "I Will Teach You To Be Rich", author: "Ramit Sethi", year: 2009, category: "Personal Finance",
    short: "Automate systems; spend extravagantly on what you love.",
    essence: "Conscious spending and automation beat guilt-based budgeting.",
    image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&q=80", spine: "#1a472a", accent: "#c23b22",
    paragraphs: [
      "A six-week program: accounts, credit optimization, conscious spending, automation, investing.",
      "Credit cards and credit scores are tools when paid in full and used strategically.",
      "Negotiate bills, salaries, and bank fees—money is often left on the table by silence.",
      "Conscious spending plan: cover fixed costs, invest, save, then guilt-free spending.",
      "Automate transfers so good behavior happens without willpower.",
      "Invest early in low-cost funds; don’t wait for perfect knowledge.",
      "Big wins (housing, cars, subscriptions, career) matter more than latte math alone.",
      "Spend extravagantly on what you love and cut costs mercilessly on what you don’t.",
      "Student loans and debt need systems, not shame.",
      "Rich life is personal—define yours in concrete experiences, not generic luxury."
    ],
    applications: [
      { title: "Automation day", body: "Schedule: paycheck → rent/bills → retirement → savings → checking for fun money. One afternoon of setup saves years of decision fatigue." },
      { title: "Negotiate one bill this week", body: "Call internet/phone/insurance; ask for loyalty discounts or competitor rates. Script: ‘I’d like to lower my bill or I’ll need to cancel.’" },
      { title: "Rich life list", body: "10 experiences that would make life rich (travel, family dinners, tools for hobbies). Fund those first; ignore status purchases that don’t appear on the list." }
    ]
  },
  {
    id: 16, title: "The Millionaire Next Door", author: "Stanley & Danko", year: 1996, category: "Wealth Habits",
    short: "Most millionaires live below their means, quietly.",
    essence: "Wealth is what you accumulate, not what you spend for show.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80", spine: "#4a4a4a", accent: "#c4a35a",
    paragraphs: [
      "Many high-income earners have low net worth due to lifestyle inflation.",
      "Prodigious accumulators of wealth (PAWs) budget, invest, and ignore status competition.",
      "Under-accumulators (UAWs) look rich and are one job loss from crisis.",
      "Economic outpatient care can impair adult children’s financial independence.",
      "Self-employed and small-business owners are overrepresented among millionaires.",
      "Time allocation: PAWs spend hours on financial planning and career skill, not shopping.",
      "Cars, watches, and clothes are weak signals of true wealth.",
      "Frugality is a lifestyle of intentional allocation, not misery.",
      "Choose a spouse with compatible money values—critical and underrated.",
      "Income is a path; discipline converts income into wealth."
    ],
    applications: [
      { title: "Net worth over Instagram", body: "Calculate net worth quarterly. Celebrate increases in assets and decreases in debt—not new purchases." },
      { title: "Neighbor lifestyle audit", body: "Before upgrading house/car to match peers, estimate the after-tax income required. Often the ‘normal’ lifestyle is a UAW trap." },
      { title: "Kids and money independence", body: "Teach earning and saving; limit unlimited bailouts. Stanley’s research: too much financial help can reduce children’s wealth-building muscle." }
    ]
  },
  {
    id: 17, title: "The Total Money Makeover", author: "Dave Ramsey", year: 2003, category: "Debt",
    short: "Baby steps out of debt to financial peace.",
    essence: "Behavior change and intense debt focus create momentum and peace.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80", spine: "#0d3b66", accent: "#c23b22",
    paragraphs: [
      "Personal finance is 80% behavior and 20% head knowledge.",
      "Baby Step 1: starter emergency fund ($1,000) to stop new debt spirals.",
      "Baby Step 2: debt snowball—smallest balances first for psychological wins.",
      "Baby Step 3: full emergency fund of 3–6 months of expenses.",
      "Baby Steps 4–6: invest 15% for retirement, college savings, pay off the mortgage.",
      "Baby Step 7: build wealth and give generously.",
      "Gazelle intensity: temporary sacrifice beats lifelong interest payments.",
      "Debt is marketed as normal; refuse the marketing.",
      "Spouses must share a written plan and weekly money meetings.",
      "Live like no one else now so you can live and give like no one else later."
    ],
    applications: [
      { title: "Snowball board", body: "List debts smallest to largest. Attack #1 with every extra dollar while paying minimums on others. Cross off wins publicly at home." },
      { title: "Starter emergency fund sprint", body: "Sell clutter, take a short side gig, pause subscriptions until $1,000 cash exists. Prevents credit-card backsliding." },
      { title: "Weekly money date", body: "15 minutes with partner or self: review spending, upcoming bills, and debt progress. Ramsey’s behavior focus needs a ritual." }
    ]
  },
  {
    id: 18, title: "Principles", author: "Ray Dalio", year: 2017, category: "Decision Making",
    short: "Radical truth, radical transparency, and systematized decisions.",
    essence: "Pain + reflection = progress. Codify principles so emotions don’t run the firm—or your life.",
    image: "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=800&q=80", spine: "#1c2833", accent: "#c4a35a",
    paragraphs: [
      "Reality is a machine; understand cause-effect to get what you want.",
      "Embrace reality and deal with it—radical truth over ego protection.",
      "Pain is a signal; reflect systematically to upgrade principles.",
      "Believability-weighted decision making: weigh opinions by track record.",
      "An idea meritocracy beats hierarchy of ego or pure democracy of opinions.",
      "Algorithms and decision logs reduce repeated mistakes.",
      "Organize teams around goals, culture fit, and thoughtful disagreement.",
      "Evolve or die: personal and organizational evolution is continuous.",
      "Diversify bets; life and markets have uncertain distributions.",
      "Write your principles down; unwritten rules can’t be stress-tested."
    ],
    applications: [
      { title: "Personal principles doc", body: "Start a note: money, career, health, relationships principles (e.g., ‘never invest in what I can’t explain’). Review after every major mistake." },
      { title: "Pain journal", body: "When something stings—rejected offer, bad trade, conflict—write what happened, root cause, and a new rule. Dalio’s loop in personal form." },
      { title: "Believability map", body: "For advice on taxes, fitness, or investing, weight people by demonstrated results, not confidence or follower count." }
    ]
  },
  {
    id: 19, title: "The Big Short", author: "Michael Lewis", year: 2010, category: "Crisis",
    short: "How a few outsiders shorted the housing bubble.",
    essence: "Incentives, complexity, and denial can hide systemic risk in plain sight.",
    image: "https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?w=800&q=80", spine: "#2c1654", accent: "#c23b22",
    paragraphs: [
      "Subprime mortgages were sliced into securities few fully understood.",
      "Rating agencies failed under misaligned incentives and models.",
      "A handful of skeptics read the prospectuses and bet against the crowd.",
      "Wall Street packaging can obscure risk until it detonates.",
      "Being early looks identical to being wrong—until it doesn’t.",
      "Housing was treated as never-falling; that axiom became fragile.",
      "Complexity is often a smokescreen for extracted fees.",
      "Character and independence matter when consensus is profitable but false.",
      "Main Street pays for crises it didn’t design.",
      "Skepticism toward ‘financial innovation’ is a civic and personal virtue."
    ],
    applications: [
      { title: "Read the fine print", body: "Mortgages, HELOCs, BNPL, and crypto products: if you can’t explain fees and failure modes, don’t sign. Complexity is a warning light." },
      { title: "Incentive check on advisors", body: "Ask how your mortgage broker, realtor, or financial advisor is paid. Misaligned incentives preceded 2008—and still shape advice." },
      { title: "House as investment humility", body: "Primary homes are dual-purpose. Stress-test payments at higher rates and possible price drops before stretching for max approval." }
    ]
  },
  {
    id: 20, title: "Liar's Poker", author: "Michael Lewis", year: 1989, category: "Wall Street",
    short: "Bond traders, culture, and excess on the 1980s Street.",
    essence: "Culture and ego can dominate institutions that claim pure rationality.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80", spine: "#4a1525", accent: "#c4a35a",
    paragraphs: [
      "Salomon Brothers’ training program throws rookies into a Darwinian trading culture.",
      "Mortgage bonds and salesmanship reshaped modern finance.",
      "Big Swinging Dick culture rewards swagger over client stewardship.",
      "Markets are human theaters of status as much as pricing machines.",
      "Luck and timing can masquerade as genius in rising markets.",
      "Firms extract value from information asymmetry and customer ignorance.",
      "Ambition without ethics corrodes both people and systems.",
      "Memoir as education: culture eats org charts for breakfast.",
      "The customer is sometimes the product on trading floors.",
      "Understanding Wall Street incentives protects Main Street consumers."
    ],
    applications: [
      { title: "Don’t be the customer product", body: "If an investment pitch emphasizes exclusivity and urgency over clear economics, walk away—you may be the other side of someone else’s trade." },
      { title: "Culture fit career filter", body: "Interview the culture: how are juniors treated? Who gets promoted? Toxic high-pay can cost health and values compound interest." },
      { title: "Status vs substance", body: "When evaluating a job or investment club, ask whether prestige replaces process. Lewis shows how theater replaces analysis." }
    ]
  }
]);

window.WEALTH_BOOKS = window.WEALTH_BOOKS.concat([
  {id:21,title:"Flash Boys",author:"Michael Lewis",year:2014,category:"Markets",short:"High-frequency trading and the fight for a fairer market.",essence:"Speed and secrecy can tax ordinary investors; transparency is a public good.",image:"https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",spine:"#0a2540",accent:"#c4a35a",paragraphs:["HFT firms race in microseconds to front-run slower orders.","IEX was built as an exchange with a speed bump for fairness.","Market structure complexity benefits insiders who understand the plumbing.","Reg NMS and order routing create unintended consequences.","Retail investors experience the market through layers of intermediaries.","Information advantage measured in cables and colocation is not skill in the classic sense.","Trust in markets requires perceived fairness, not only efficiency claims.","Technology can either democratize or extract depending on design.","Journalism can force reform by making the invisible visible.","Ask who profits from complexity whenever a new product appears."],applications:[{title:"Use investor-friendly brokers",body:"Prefer brokers with clear routing, low fees, and strong reputation for not selling you toxic order flow dynamics you don't understand."},{title:"Ignore micro-timing",body:"Long-term investors should not obsess over second-level prices. Focus on asset allocation and costs, not beating HFT."},{title:"Demand simplicity",body:"If a financial product needs a physics degree to understand, it may be designed for the seller—not you."}]},
  {id:22,title:"When Genius Failed",author:"Roger Lowenstein",year:2000,category:"Crisis",short:"The rise and fall of Long-Term Capital Management.",essence:"Leverage and model certainty can destroy brilliant minds.",image:"https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80",spine:"#3b0a45",accent:"#c23b22",paragraphs:["LTCM combined Nobel-caliber intellect with extreme leverage.","Models assumed relationships that broke in crisis correlations.","Liquidity vanishes when everyone needs it simultaneously.","Hubris follows a streak of success.","Counterparties and systemic risk force public concern over private bets.","Diversification fails when strategies share the same hidden factor.","Risk management that ignores human panic is incomplete.","Genius without humility is a leveraged short on reality.","Regulators and banks learned partial lessons about contagion.","Personal takeaway: never bet the ranch on a model."],applications:[{title:"Leverage limits",body:"Avoid margin debt for long-term investing. If you use leverage for a house or business, stress-test rates and income shocks."},{title:"Correlation humility",body:"In crises, 'unrelated' assets often fall together. Keep true cash reserves, not only assets you assume will be liquid."},{title:"Success audit",body:"After a winning streak at work or investing, write what was skill vs luck. Lowenstein's characters skipped this step."}]},
  {id:23,title:"The Snowball",author:"Alice Schroeder",year:2008,category:"Biography",short:"The definitive life of Warren Buffett.",essence:"Character, compounding, and relationships built the Oracle's fortune.",image:"https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80",spine:"#1a3a2a",accent:"#c4a35a",paragraphs:["Buffett's early scrapes and paper routes trained commercial instinct.","Graham's teaching met Fisher's quality bias in Buffett's mature style.","Partnerships and Berkshire's structure enabled long-duration capital.","Personal life and public myth intertwine with investment results.","Reputation compounds like capital when carefully protected.","Focus and saying no created opportunity cost advantages.","Teaching through letters scaled his philosophy beyond Omaha.","Mistakes are admitted more often than average CEOs admit.","Philanthropy and family complexity humanize the wealth story.","The snowball needs a long hill—time is the secret ingredient."],applications:[{title:"Protect reputation capital",body:"One dishonest shortcut can wipe decades of trust. Treat integrity as a non-negotiable asset on your personal balance sheet."},{title:"Say no more",body:"Buffett's power is selective focus. Decline projects that don't fit your circle of competence or life priorities."},{title:"Find a long hill",body:"Pick a career or craft where compounding skill for 20+ years is possible. Job-hopping without a thesis resets the snowball."}]},
  {id:24,title:"Buffett: The Making of an American Capitalist",author:"Roger Lowenstein",year:1995,category:"Biography",short:"How Buffett became Buffett—habits, deals, and philosophy.",essence:"Rationality, patience, and ownership thinking create outsized results.",image:"https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",spine:"#2c3e50",accent:"#c4a35a",paragraphs:["Early entrepreneurial ventures reveal pattern recognition.","Reading voraciously was a competitive advantage.","Insurance float and capital allocation became Berkshire's engine.","Avoiding ego deals preserved capital for great ones.","Public markets occasionally offer private-equity quality at discounts.","Temperament under stress separates theory from practice.","Partnerships with the right people multiply outcomes.","Simple ideas executed consistently beat complex theories abandoned early.","Media myth-making can obscure replicable habits.","American capitalism's long runway rewarded patient owners."],applications:[{title:"Reading hour",body:"Block 30–60 minutes daily for annual reports, industry essays, or deep books. Buffett's edge was hours with the page."},{title:"Capital allocation at home",body:"Treat bonuses like Berkshire cash: debt paydown vs invest vs lifestyle. Write the rationale before spending."},{title:"Partner carefully",body:"Business partners, co-founders, and spouses shape wealth outcomes. Interview for values, not only talent."}]},
  {id:25,title:"Margin of Safety",author:"Seth Klarman",year:1991,category:"Value Investing",short:"Rare value classic on risk control and absolute returns.",essence:"Avoid loss first; absolute performance beats relative benchmarking games.",image:"https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80",spine:"#1a1a2e",accent:"#c4a35a",paragraphs:["Risk is permanent capital loss, not volatility alone.","Margin of safety is purchased, not assumed.","Institutional constraints create opportunities for patient capital.","Cash is an option on future bargains, not a sin.","Complex securities can hide value or landmines.","Catalysts help unlock value but aren't mandatory if discount is large.","Avoid the relative-performance derby that forces bad buys.","Psychology of investing underpins every quantitative screen.","Distressed debt and special situations reward specialized work.","Integrity and client alignment define sustainable firms."],applications:[{title:"Redefine risk",body:"Ask of every investment: 'How can I permanently lose money?' Volatility is discomfort; insolvency and fraud are risk."},{title:"Hold cash without shame",body:"If nothing is attractive, high-yield savings or T-bills beat forced speculation. Patience is a position."},{title:"Ignore peer rankings",body:"Don't buy a stock because you're 'behind' a friend's returns this year. Absolute goals (retirement date, house) beat relative envy."}]},
  {id:26,title:"The Most Important Thing",author:"Howard Marks",year:2011,category:"Risk",short:"Second-level thinking about risk, cycles, and cycles of psychology.",essence:"You can't predict, but you can prepare—especially regarding risk.",image:"https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=800&q=80",spine:"#2d3436",accent:"#c23b22",paragraphs:["Second-level thinking asks what others miss, not what is obvious.","Risk is highest when it looks lowest—and vice versa.","Cycles in credit, psychology, and markets are inevitable.","Knowing where we are in the cycle beats precise forecasting.","Contrarianism is useful only when you are right and patient.","Luck disguises itself as skill in bull markets.","Defensive investing accepts less upside to avoid ruin.","The relationship between price and value is the investor's compass.","Oaktree memos model clear writing as clear thinking.","The most important thing is risk control, repeatedly."],applications:[{title:"Cycle checklist",body:"Are friends bragging about easy gains? Credit easy? Valuations extreme? When everyone feels safe, raise your personal caution and cash buffer."},{title:"Second-level career moves",body:"Obvious path: chase hottest industry. Second-level: which skill will be scarce in 10 years? Apply Marks beyond markets."},{title:"Price vs value shopping",body:"Sales aren't always value—sometimes cheap is cheap for a reason. Compare quality and total cost of ownership, not sticker price alone."}]},
  {id:27,title:"Fooled by Randomness",author:"Nassim Nicholas Taleb",year:2001,category:"Uncertainty",short:"How luck is mistaken for skill in markets and life.",essence:"Randomness rules more than we admit; survivors write history.",image:"https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80",spine:"#4a1942",accent:"#c4a35a",paragraphs:["Survivorship bias makes lucky fools look like geniuses.","Alternative histories matter: what almost happened.","Emotions hijack probability thinking under P&L noise.","Skin in the game and personal ruin change calculations.","Journalists and pundits overfit stories to noise.","Monte Carlo thinking: many paths, not one destiny.","Asymmetric payoffs and optionality beat naive forecasting.","Humility about knowledge is a practical edge.","Noise vs signal: most short-term market moves are noise.","Beware those who don't bear the consequences of their advice."],applications:[{title:"Track decisions, not outcomes only",body:"Keep a decision journal. A good process with a bad outcome can be right; a bad process with a good outcome is still bad."},{title:"Mute financial TV",body:"Constant narrative-fitting of daily market moves is noise theater. Check long-term plans quarterly."},{title:"Prefer asymmetric bets",body:"Small downside, large upside experiments—side projects, skills, options-like career moves—beat all-in predictions."}]},
  {id:28,title:"The Black Swan",author:"Nassim Nicholas Taleb",year:2007,category:"Uncertainty",short:"High-impact rare events shape history more than averages.",essence:"Prepare for extremes; the map of Gaussian comfort is incomplete.",image:"https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80",spine:"#0d0d0d",accent:"#c23b22",paragraphs:["Black Swans are rare, high-impact, and retrospectively predictable-looking.","Mediocristan vs Extremistan: different domains, different rules.","Narrative fallacy makes us invent causes after the fact.","Experts in some fields are no better than chance.","Robustness and antifragile positioning beat precise prediction.","Silent evidence hides failures that never get written up.","Globalization and complexity may increase impact of extremes.","Knowledge grows, but the unknown grows with it.","Barbell strategy: extreme safety plus small speculative upside.","Ethics of prediction: don't sell certainty you don't have."],applications:[{title:"Barbell personal finance",body:"Core: boring cash emergency fund + index funds. Sleeve: small experiments (business, learning). Avoid the fragile middle of high leverage and moderate 'sure things.'"},{title:"Insurance as anti-Black-Swan",body:"Health, disability, and term life insurance are payments against personal Black Swans. Don't skip them to chase returns."},{title:"Scenario plans",body:"Write three life scenarios: job loss, market -40%, family emergency. Pre-decide actions so panic doesn't decide for you."}]},
  {id:29,title:"Antifragile",author:"Nassim Nicholas Taleb",year:2012,category:"Uncertainty",short:"Things that gain from disorder—and how to become one.",essence:"Don't merely resist shocks; position so volatility helps you.",image:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",spine:"#1b4332",accent:"#c4a35a",paragraphs:["Antifragile systems improve under stress; fragile ones break.","Overstabilization creates hidden fragility (the turkeys' calendar).","Via negativa: improvement by subtraction of harms.","Optionality is more valuable than forecasts.","Small stressors (exercise, criticism) strengthen; large uncompensated shocks kill.","Skin in the game aligns advice with outcomes.","Top-down planning often creates fragile monocultures.","Tinkering and heuristics beat fragile optimization.","Debt can be fragility; redundancy looks inefficient until the storm.","Ethics: don't transfer fragility onto others silently."],applications:[{title:"Build optionality career",body:"Multiple skills, network, and a small savings runway make job loss a pivot, not a catastrophe. Fragility is one employer, zero savings."},{title:"Via negativa money",body:"Cut stupid debt, unused subscriptions, and toxic clients before hunting exotic investments. Subtraction is underrated alpha."},{title:"Redundancy is not waste",body:"Backup income ideas, spare tire, extra month of expenses—inefficient on paper, antifragile in life."}]},
  {id:30,title:"Skin in the Game",author:"Nassim Nicholas Taleb",year:2018,category:"Ethics",short:"Risk-sharing, fairness, and who should bear downside.",essence:"No advice without downside; symmetry of risk creates justice and wisdom.",image:"https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",spine:"#5c1a1a",accent:"#c4a35a",paragraphs:["Symmetry: those who gain from risk must share downside.","Intellectuals yet idiots transfer risk onto others.","Minority rules and stubborn preferences can dominate systems.","Learning requires contact with reality's penalties.","Bureaucracy can hide personal risklessness.","Religion and tradition sometimes encode risk wisdom.","Employees vs entrepreneurs face different risk distributions.","Virtue signaling without cost is not virtue.","Dynamic systems punish hidden risk transfer eventually.","Personal ethics: never give advice you wouldn't take with your own capital."],applications:[{title:"Advisor filter",body:"Prefer financial advisors who co-invest or charge flat fees over pure product commissions. Ask: 'Do you own this yourself?'"},{title:"Leadership test",body:"Managers who impose layoffs while taking bonuses fail skin in the game. Choose employers with aligned incentives when you can."},{title:"Advice you give",body:"Before recommending a stock, side hustle, or diet to friends, ask if you'd stake your reputation and money the same way."}]}
]);

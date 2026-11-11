// Typing library. "If—" by Rudyard Kipling (public domain), then curated quotes
// with attributions in comments. All lowercase, light punctuation, one line per entry.
const TYPER_LINES = [
    // kipling — "if—" (stanza 1)
    "if you can keep your head when all about you are losing theirs and blaming it on you,",
    "if you can trust yourself when all men doubt you, but make allowance for their doubting too:",
    "if you can wait and not be tired by waiting, or being lied about, don't deal in lies,",
    "or being hated, don't give way to hating, and yet don't look too good, nor talk too wise:",
    // stanza 2
    "if you can dream - and not make dreams your master; if you can think - and not make thoughts your aim;",
    "if you can meet with triumph and disaster and treat those two impostors just the same:",
    "if you can bear to hear the truth you've spoken twisted by knaves to make a trap for fools,",
    "or watch the things you gave your life to, broken, and stoop and build 'em up with worn-out tools:",
    // stanza 3
    "if you can make one heap of all your winnings and risk it on one turn of pitch-and-toss,",
    "and lose, and start again at your beginnings and never breathe a word about your loss:",
    "if you can force your heart and nerve and sinew to serve your turn long after they are gone,",
    "and so hold on when there is nothing in you except the will which says to them: 'hold on!'",
    // stanza 4
    "if you can talk with crowds and keep your virtue, or walk with kings - nor lose the common touch,",
    "if neither foes nor loving friends can hurt you, if all men count with you, but none too much:",
    "if you can fill the unforgiving minute with sixty seconds' worth of distance run,",
    "yours is the earth and everything that's in it, and - which is more - you'll be a man, my son!",

    // great opening lines
    "it was the best of times it was the worst of times it was the age of wisdom it was the age of foolishness", // charles dickens
    "it is a truth universally acknowledged that a single man in possession of a good fortune must be in want of a wife", // jane austen
    "all happy families are alike each unhappy family is unhappy in its own way", // leo tolstoy
    "it was a bright cold day in april and the clocks were striking thirteen", // george orwell
    "the sky above the port was the color of television tuned to a dead channel", // william gibson
    "the past is a foreign country they do things differently there", // l.p. hartley
    "in the middle of the journey of our life i found myself in a dark wood where the straight way was lost", // dante
    "call me ishmael", // herman melville
    "it is not down in any map true places never are", // herman melville

    // wit
    "we are all in the gutter but some of us are looking at the stars", // oscar wilde
    "be yourself everyone else is already taken", // oscar wilde
    "i can resist everything except temptation", // oscar wilde
    "to live is the rarest thing in the world most people exist and that is all", // oscar wilde
    "the truth is rarely pure and never simple", // oscar wilde
    "the two most important days in your life are the day you are born and the day you find out why", // mark twain
    "if you tell the truth you don't have to remember anything", // mark twain
    "the secret of getting ahead is getting started", // mark twain
    "whenever you find yourself on the side of the majority it is time to pause and reflect", // mark twain
    "courage is resistance to fear mastery of fear not absence of fear", // mark twain
    "the cure for boredom is curiosity there is no cure for curiosity", // dorothy parker

    // stoics & philosophers
    "you have power over your mind not outside events realize this and you will find strength", // marcus aurelius
    "the impediment to action advances action what stands in the way becomes the way", // marcus aurelius
    "waste no more time arguing about what a good man should be be one", // marcus aurelius
    "we suffer more often in imagination than in reality", // seneca
    "luck is what happens when preparation meets opportunity", // seneca
    "it is not that we have a short time to live but that we waste a lot of it", // seneca
    "it's not what happens to you but how you react to it that matters", // epictetus
    "no man is free who is not master of himself", // epictetus
    "he who has a why to live can bear almost any how", // nietzsche
    "without music life would be a mistake", // nietzsche
    "you must have chaos within you to give birth to a dancing star", // nietzsche
    "if you gaze long into an abyss the abyss also gazes into you", // nietzsche
    "and those who were seen dancing were thought to be insane by those who could not hear the music", // attributed to nietzsche
    "in the depth of winter i finally learned that within me there lay an invincible summer", // albert camus
    "nobody realizes that some people expend tremendous energy merely to be normal", // albert camus

    // poets
    "do not go gentle into that good night rage rage against the dying of the light", // dylan thomas
    "the woods are lovely dark and deep but i have promises to keep and miles to go before i sleep", // robert frost
    "that you are here that life exists and identity that the powerful play goes on and you may contribute a verse", // walt whitman
    "hope is the thing with feathers that perches in the soul", // emily dickinson
    "tell me what is it you plan to do with your one wild and precious life", // mary oliver
    "instructions for living a life pay attention be astonished tell about it", // mary oliver
    "the art of losing isn't hard to master", // elizabeth bishop
    "out beyond ideas of wrongdoing and rightdoing there is a field i'll meet you there", // rumi
    "the wound is the place where the light enters you", // rumi
    "yesterday i was clever so i wanted to change the world today i am wise so i am changing myself", // rumi
    "what you seek is seeking you", // rumi
    "of all creatures that breathe and move upon the earth nothing is bred that is weaker than man", // homer, the odyssey

    // wisdom, eastern
    "nature does not hurry yet everything is accomplished", // lao tzu
    "when i let go of what i am i become what i might be", // lao tzu
    "a good traveler has no fixed plans and is not intent on arriving", // lao tzu
    "the man who moves a mountain begins by carrying away small stones", // confucius
    "it does not matter how slowly you go as long as you do not stop", // confucius
    "in the midst of chaos there is also opportunity", // sun tzu
    "we are what we think all that we are arises with our thoughts", // dhammapada
    "i fear not the man who has practiced ten thousand kicks once but i fear the man who has practiced one kick ten thousand times", // bruce lee

    // science & space
    "we are made of star stuff", // carl sagan
    "for small creatures such as we the vastness is bearable only through love", // carl sagan
    "somewhere something incredible is waiting to be known", // carl sagan
    "two possibilities exist either we are alone in the universe or we are not both are equally terrifying", // arthur c. clarke
    "any sufficiently advanced technology is indistinguishable from magic", // arthur c. clarke
    "the first principle is that you must not fool yourself and you are the easiest person to fool", // richard feynman
    "i would rather have questions that can't be answered than answers that can't be questioned", // attributed to feynman
    "remember to look up at the stars and not down at your feet try to make sense of what you see and wonder about what makes the universe exist", // stephen hawking
    "imagination is more important than knowledge", // albert einstein
    "life is like riding a bicycle to keep your balance you must keep moving", // albert einstein
    "a person who never made a mistake never tried anything new", // albert einstein

    // sci-fi & fantasy
    "i love deadlines i love the whooshing noise they make as they go by", // douglas adams
    "in the beginning the universe was created this has made a lot of people very angry and been widely regarded as a bad move", // douglas adams
    "time is an illusion lunchtime doubly so", // douglas adams
    "the ships hung in the sky in much the same way that bricks don't", // douglas adams
    "far out in the uncharted backwaters of the unfashionable end of the western spiral arm of the galaxy lies a small unregarded yellow sun", // douglas adams
    "would it save you a lot of time if i just gave up and went mad now", // douglas adams
    "violence is the last refuge of the incompetent", // isaac asimov
    "never let your sense of morals prevent you from doing what is right", // isaac asimov
    "he who can destroy a thing controls a thing", // frank herbert, dune
    "the mystery of life isn't a problem to solve but a reality to experience", // frank herbert, dune
    "all we have to decide is what to do with the time that is given us", // j.r.r. tolkien
    "not all those who wander are lost", // j.r.r. tolkien
    "even the smallest person can change the course of the future", // j.r.r. tolkien
    "there is some good in this world and it's worth fighting for", // j.r.r. tolkien
    "the street finds its own uses for things", // william gibson
    "the future is already here it's just not evenly distributed", // william gibson
    "million-to-one chances crop up nine times out of ten", // terry pratchett
    "light thinks it travels faster than anything but it is wrong no matter how fast light travels it finds the darkness has always got there first and is waiting for it", // terry pratchett
    "you don't have to burn books to destroy a culture just get people to stop reading them", // ray bradbury
    "jump and you will find out how to unfold your wings as you fall", // ray bradbury
    "everything was beautiful and nothing hurt", // kurt vonnegut
    "the things you own end up owning you", // fight club
    "there is a difference between knowing the path and walking the path", // the matrix

    // tech & code
    "talk is cheap show me the code", // linus torvalds
    "premature optimization is the root of all evil", // donald knuth
    "programs must be written for people to read and only incidentally for machines to execute", // abelson & sussman, sicp
    "a language that doesn't affect the way you think about programming is not worth knowing", // alan perlis
    "to understand recursion you must first understand recursion", // folklore
    "there are only two hard things in computer science cache invalidation and naming things", // folklore
    "it's not a bug it's an undocumented feature", // folklore
    "weeks of coding can save you hours of planning", // folklore
    "there's no place like 127.0.0.1", // folklore
    "the best error message is the one that never shows up", // thomas fuchs

    // latin quickies
    "carpe diem seize the day", // horace
    "per aspera ad astra through hardships to the stars",
    "ars longa vita brevis life is short art is long", // hippocrates
    "memento mori remember that you will die",
    "amor fati love your fate", // nietzsche's maxim
    "facta non verba deeds not words",
    "festina lente make haste slowly", // augustus
    "alea iacta est the die is cast", // caesar
    "cogito ergo sum i think therefore i am", // descartes

    // epic endurance runs
    "i must not fear fear is the mind-killer fear is the little-death that brings total obliteration i will face my fear and permit it to pass over me and through me", // frank herbert, dune
    "and when it has gone past i will turn the inner eye to see its path where the fear has gone there will be nothing only i will remain", // frank herbert, dune
    "look again at that dot that's here that's home that's us on it everyone you love everyone you know everyone you ever heard of every human being who ever was lived out their lives", // carl sagan, pale blue dot
    "i went to the woods because i wished to live deliberately to front only the essential facts of life and see if i could not learn what it had to teach and not when i came to die discover that i had not lived", // henry david thoreau
    "there are two ways of constructing software one way is to make it so simple that there are obviously no deficiencies and the other way is to make it so complicated that there are no obvious deficiencies", // c.a.r. hoare
    "empty your mind be formless shapeless like water you put water into a cup it becomes the cup you put water into a bottle it becomes the bottle you put it in a teapot it becomes the teapot now water can flow or it can crash be water my friend", // bruce lee
];

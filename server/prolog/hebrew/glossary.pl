% =============================================================================
% Hebrew/Aramaic Glossary
% Author: rpadgett
%
% glossary_term(Key, Language, Word, Transliteration, Pronunciation, Definition, Note).
%
% Key            - lowercase atom identifier, unique
% Language       - hebrew, greek, or aramaic
% Word           - the Hebrew/Greek/Aramaic word or name in its own script
% Transliteration- common Latin transliteration
% Pronunciation  - simple English-syllable pronunciation guide
% Definition     - short gloss / meaning
% Note           - an optional "cool fact" or cross-reference; '' if none
%
% Admin-added terms are appended below the seed list by the admin glossary
% routes. No rebuild or restart needed - Prolog is reconsulted fresh on every
% API request.
% =============================================================================

:- multifile glossary_term/7.

glossary_term(holy_spirit, hebrew, 'רוּחַ הַקֹּדֶשׁ', 'Ruach HaKodesh', 'ROO-akh ha-KO-desh',
    'The Holy Spirit.',
    'Ruach also means breath or wind; HaKodesh means "the set-apart one" - the same word used for holiness elsewhere in Torah.').

glossary_term(peter, aramaic, 'כֵּיפָא', 'Kepha (Cephas)', 'KAY-fah',
    'The name Yeshua gave to Simon, meaning "Rock."',
    'Peter comes from the Greek Petros, a translation of the Aramaic Kepha (Matthew 16:18, John 1:42).').

glossary_term(yeshua, hebrew, 'יֵשׁוּעַ', 'Yeshua', 'yeh-SHOO-ah',
    'The Hebrew name of Jesus.',
    'Related to the word yeshuah, meaning "salvation" - His name itself declares His mission.').

glossary_term(torah, hebrew, 'תּוֹרָה', 'Torah', 'toh-RAH',
    'Instruction, teaching, law.',
    'Comes from a root meaning "to point" or "to aim" - Torah is meant to point people toward right living, not just a list of rules.').

glossary_term(shalom, hebrew, 'שָׁלוֹם', 'Shalom', 'shah-LOHM',
    'Peace, wholeness, completeness.',
    'Used as both a greeting and a farewell; its root implies far more than the absence of conflict - full well-being.').

glossary_term(chesed, hebrew, 'חֶסֶד', 'Chesed', 'KHEH-sed',
    'Loving-kindness, steadfast covenant love.',
    'Often paired with "emet" (truth) in scripture - chesed v''emet, God''s loyal love combined with faithfulness.').

glossary_term(emet, hebrew, 'אֱמֶת', 'Emet', 'eh-MET',
    'Truth, faithfulness, firmness.',
    'Shares a root with "aman" (to support/confirm) - the same root behind the word "amen."').

glossary_term(ruach, hebrew, 'רוּחַ', 'Ruach', 'ROO-akh',
    'Breath, wind, spirit.',
    'The same word describes the wind, a person''s breath, and the Spirit of God - showing how closely these ideas are tied together in Hebrew thought.').

glossary_term(kadosh, hebrew, 'קָדוֹשׁ', 'Kadosh', 'kah-DOSH',
    'Holy, set apart.',
    'The root idea is separation for a special purpose, not merely moral purity - to be kadosh is to be set apart for God''s use.').

glossary_term(mashiach, hebrew, 'מָשִׁיחַ', 'Mashiach', 'mah-SHEE-akh',
    'Messiah, anointed one.',
    'The Greek word "Christ" (Christos) is simply a translation of this Hebrew title.').

glossary_term(elohim, hebrew, 'אֱלֹהִים', 'Elohim', 'el-oh-HEEM',
    'God.',
    'Grammatically plural in form but used with singular verbs when referring to the one true God - a "plural of majesty."').

glossary_term(yhwh, hebrew, 'יהוה', 'YHWH', 'unpronounced / "Adonai" read aloud',
    'The personal covenant name of God, the Tetragrammaton.',
    'Traditionally not pronounced aloud out of reverence; "Adonai" (Lord) is substituted when reading scripture.').

glossary_term(abba, aramaic, 'אַבָּא', 'Abba', 'AH-bah',
    'Father, dad - an intimate, familial term.',
    'Used by Yeshua in Gethsemane (Mark 14:36) and by believers to address God directly (Romans 8:15).').

glossary_term(amen, hebrew, 'אָמֵן', 'Amen', 'ah-MEN',
    'So be it; truly; confirmed.',
    'From the same root as "emet" (truth) and "aman" (to support) - saying amen affirms something as trustworthy and true.').

% -----------------------------------------------------------------------------
% Terms drawn from command source_term facts (server/prolog/commands/*.pl) -
% these are words that already appear tagged on specific commands, gathered
% here as a general study glossary.
% -----------------------------------------------------------------------------

glossary_term(mishpat, hebrew, 'מִשְׁפָּט', 'Mishpat', 'meesh-PAHT',
    'Justice, judgment, a legal ruling.',
    'The word behind Torah''s courts and justice commands (Deuteronomy 16-25) - a mishpat is a specific case-ruling, not an abstract ideal.').

glossary_term(tsedaqah, hebrew, 'צְדָקָה', 'Tsedaqah', 'tseh-dah-KAH',
    'Righteousness; what is right, just, and in right relationship.',
    'Often paired with mishpat (justice) in scripture - tsedaqah u''mishpat, righteousness and justice together.').

glossary_term(ahav, hebrew, 'אָהַב', 'Ahav', 'ah-HAV',
    'To love.',
    'The verb behind "love YHWH your God" (Deuteronomy 6:5) and "love your neighbor" (Leviticus 19:18).').

glossary_term(shamar, hebrew, 'שָׁמַר', 'Shamar', 'shah-MAR',
    'To keep, guard, watch over, observe.',
    'The verb behind "keep My commandments" and "keep the Sabbath" - shamar implies active guarding, not passive awareness.').

glossary_term(qahal, hebrew, 'קָהָל', 'Qahal', 'kah-HAL',
    'Assembly, congregation - those gathered to hear Torah.',
    'Used in "gather to hear Torah" commands describing Israel assembled as one body.').

glossary_term(shama, hebrew, 'שָׁמַע', 'Shama', 'shah-MAH',
    'To hear, listen, obey.',
    'The root of "Shema Yisrael" (Hear, O Israel) - in Hebrew thought, truly hearing implies obeying.').

glossary_term(lamad, hebrew, 'לָמַד', 'Lamad', 'lah-MAD',
    'To learn, to be taught.',
    'Shares a root with "Talmud" (that which is learned) and "melamed" (teacher).').

glossary_term(mitsvah, hebrew, 'מִצְוָה', 'Mitsvah', 'meets-VAH',
    'Commandment.',
    'Plural "mitzvot" - the word used throughout Torah for YHWH''s specific commands.').

glossary_term(berith, hebrew, 'בְּרִית', 'Berith', 'beh-REET',
    'Covenant.',
    'Describes the Sabbath (Exodus 31), circumcision, and YHWH''s relationship with Israel - a binding, mutual agreement, not a one-sided contract.').

glossary_term(qadash, hebrew, 'קָדַשׁ', 'Qadash', 'kah-DASH',
    'To set apart, consecrate, sanctify.',
    'The verb form behind "kadosh" (holy) - Sabbath keeping teaches that YHWH sanctifies His people (Exodus 31:13).').

glossary_term(moed, hebrew, 'מוֹעֵד', 'Moed', 'moh-ED',
    'Appointed time, fixed season, meeting.',
    'The word behind "mo''adim" - YHWH''s appointed times/feasts (Leviticus 23).').

glossary_term(chodesh, hebrew, 'חֹדֶשׁ', 'Chodesh', 'KHO-desh',
    'New moon, month.',
    'Exodus 12:2 marks this chodesh (the month of the Exodus) as the head of months for Israel.').

glossary_term(shabbat, hebrew, 'שַׁבָּת', 'Shabbat', 'shah-BAHT',
    'Sabbath; cessation, rest.',
    'From the root "shabath" (to cease/rest) - the seventh-day rest commanded from creation (Genesis 2:2-3).').

glossary_term(oth, hebrew, 'אוֹת', 'Oth', 'OHT',
    'Sign, mark, token.',
    'The Sabbath is called an oth - a covenant sign between YHWH and Israel (Exodus 31:13,17).').

glossary_term(teruah, hebrew, 'תְּרוּעָה', 'Teruah', 'teh-roo-AH',
    'Shout, blast, loud sounding.',
    'Root of Yom Teruah (the Day of Trumpets/Shouting), one of YHWH''s appointed times (Leviticus 23:24).').

glossary_term(zikkaron, hebrew, 'זִכָּרוֹן', 'Zikkaron', 'zee-kah-ROHN',
    'Memorial, remembrance.',
    'Yom Teruah is called a "zikkaron teruah" - a memorial of blowing/shouting.').

glossary_term(kippurim, hebrew, 'כִּפֻּרִים', 'Kippurim', 'kee-poo-REEM',
    'Atonements, coverings.',
    'Root of "Yom Kippur" (Yom ha-Kippurim) - the Day of Atonement (Leviticus 23:27).').

glossary_term(tahor, hebrew, 'טָהוֹר', 'Tahor', 'tah-HOR',
    'Clean, pure.',
    'The permitted category in Torah''s clean/unclean animal and purity distinctions.').

glossary_term(tame, hebrew, 'טָמֵא', 'Tame', 'tah-MAY',
    'Unclean, impure.',
    'The prohibited category throughout Torah''s purity laws - opposite of tahor.').

glossary_term(niddah, hebrew, 'נִדָּה', 'Niddah', 'nee-DAH',
    'Separation; menstrual impurity.',
    'Describes the impurity period addressed in Leviticus 15 and 18.').

glossary_term(tumah, hebrew, 'טֻמְאָה', 'Tumah', 'toom-AH',
    'Uncleanness, impurity.',
    'The general condition that must be resolved before entering the sanctuary or camp.').

glossary_term(miqdash, hebrew, 'מִקְדָּשׁ', 'Miqdash', 'meek-DASH',
    'Sanctuary, holy place.',
    'Shares a root with "qadash" (to set apart) - the place set apart for YHWH''s presence.').

glossary_term(mishkan, hebrew, 'מִשְׁכָּן', 'Mishkan', 'meesh-KAHN',
    'Tabernacle; dwelling place.',
    'From "shakan" (to dwell) - the portable sanctuary where YHWH''s presence dwelt among Israel.').

glossary_term(machaneh, hebrew, 'מַחֲנֶה', 'Machaneh', 'mah-khah-NEH',
    'Camp.',
    'The bounded community space that certain unclean conditions require a person to dwell outside of.').

glossary_term(kohen, hebrew, 'כֹּהֵן', 'Kohen', 'koh-HEN',
    'Priest.',
    'Plural "kohanim" - the examiner and authority in many purity and sacrificial procedures.').

glossary_term(olah, hebrew, 'עֹלָה', 'Olah', 'oh-LAH',
    'Burnt offering.',
    'From "alah" (to go up) - an offering wholly consumed, its smoke going up to YHWH.').

glossary_term(chattat, hebrew, 'חַטָּאת', 'Chattat', 'khah-TAHT',
    'Sin offering; purification offering.',
    'Shares a root with "chata" (to miss the mark/sin) - the offering that addresses unintentional sin or impurity.').

glossary_term(dam, hebrew, 'דָּם', 'Dam', 'DAHM',
    'Blood.',
    'Leviticus 17 ties dam directly to nephesh (life) - "the life of the flesh is in the blood."').

glossary_term(nephesh, hebrew, 'נֶפֶשׁ', 'Nephesh', 'NEH-fesh',
    'Life, soul, living being, person.',
    'A broader word than the English "soul" - nephesh describes the whole living person, not just an inner spirit.').

glossary_term(rea, hebrew, 'רֵעַ', 'Rea', 'REH-ah',
    'Neighbor, companion, fellow.',
    'The word behind "love your neighbor as yourself" (Leviticus 19:18).').

glossary_term(ger, hebrew, 'גֵּר', 'Ger', 'GAIR',
    'Sojourner; resident foreigner.',
    'Torah repeatedly commands justice and care for the ger alongside the widow and orphan.').

glossary_term(almanah, hebrew, 'אַלְמָנָה', 'Almanah', 'al-mah-NAH',
    'Widow.',
    'Grouped with the orphan and sojourner as those Torah singles out for protection from oppression.').

glossary_term(yathom, hebrew, 'יָתוֹם', 'Yathom', 'yah-TOHM',
    'Orphan; fatherless.',
    'Grouped with the widow and sojourner as those Torah singles out for protection from oppression.').

glossary_term(ratsach, hebrew, 'רָצַח', 'Ratsach', 'rah-TSAKH',
    'To murder; unlawfully kill.',
    'The verb behind "You shall not murder" (Exodus 20:13) - distinct from other Hebrew words for killing in war or accident.').

glossary_term(naaph, hebrew, 'נָאַף', 'Naaph', 'nah-AF',
    'To commit adultery.',
    'The verb behind "You shall not commit adultery" (Exodus 20:14).').

glossary_term(toevah, hebrew, 'תּוֹעֵבָה', 'Toevah', 'toh-eh-VAH',
    'Abomination; detestable thing.',
    'A strong term used throughout Torah for practices YHWH calls utterly out of bounds, especially idolatry and sexual sin.').

glossary_term(dor, hebrew, 'דּוֹר', 'Dor', 'DOR',
    'Generation.',
    'Several commands (like Sabbath-keeping) are explicitly said to apply "throughout your generations" (le-doroteichem).').

glossary_term(shaphat, hebrew, 'שָׁפַט', 'Shaphat', 'shah-FAHT',
    'To judge.',
    'Root behind mishpat (justice) and the title "judges" (shoftim) - those who render judgment at the gate.').

glossary_term(ed, hebrew, 'עֵד', 'Ed', 'ED',
    'Witness; testimony.',
    'Torah requires a matter to stand on the testimony of two or three witnesses (Deuteronomy 19:15).').


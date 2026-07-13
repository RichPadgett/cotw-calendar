% =============================================================================
% Hebrew/Aramaic Glossary
% Author: rpadgett
%
% glossary_term(Key, Word, Transliteration, Pronunciation, Definition, Note).
%
% Key            - lowercase atom identifier, unique
% Word           - the Hebrew (or Aramaic) word/name in its own script
% Transliteration- common Latin transliteration
% Pronunciation  - simple English-syllable pronunciation guide
% Definition     - short gloss / meaning
% Note           - an optional "cool fact" or cross-reference; '' if none
%
% Admin-added terms are appended below the seed list by the admin glossary
% routes. No rebuild or restart needed - Prolog is reconsulted fresh on every
% API request.
% =============================================================================

:- multifile glossary_term/6.

glossary_term(holy_spirit, 'רוּחַ הַקֹּדֶשׁ', 'Ruach HaKodesh', 'ROO-akh ha-KO-desh',
    'The Holy Spirit.',
    'Ruach also means breath or wind; HaKodesh means "the set-apart one" - the same word used for holiness elsewhere in Torah.').

glossary_term(peter, 'כֵּיפָא', 'Kepha (Cephas)', 'KAY-fah',
    'The name Yeshua gave to Simon, meaning "Rock."',
    'Peter comes from the Greek Petros, a translation of the Aramaic Kepha (Matthew 16:18, John 1:42).').

glossary_term(yeshua, 'יֵשׁוּעַ', 'Yeshua', 'yeh-SHOO-ah',
    'The Hebrew name of Jesus.',
    'Related to the word yeshuah, meaning "salvation" - His name itself declares His mission.').

glossary_term(torah, 'תּוֹרָה', 'Torah', 'toh-RAH',
    'Instruction, teaching, law.',
    'Comes from a root meaning "to point" or "to aim" - Torah is meant to point people toward right living, not just a list of rules.').

glossary_term(shalom, 'שָׁלוֹם', 'Shalom', 'shah-LOHM',
    'Peace, wholeness, completeness.',
    'Used as both a greeting and a farewell; its root implies far more than the absence of conflict - full well-being.').

glossary_term(chesed, 'חֶסֶד', 'Chesed', 'KHEH-sed',
    'Loving-kindness, steadfast covenant love.',
    'Often paired with "emet" (truth) in scripture - chesed v''emet, God''s loyal love combined with faithfulness.').

glossary_term(emet, 'אֱמֶת', 'Emet', 'eh-MET',
    'Truth, faithfulness, firmness.',
    'Shares a root with "aman" (to support/confirm) - the same root behind the word "amen."').

glossary_term(ruach, 'רוּחַ', 'Ruach', 'ROO-akh',
    'Breath, wind, spirit.',
    'The same word describes the wind, a person''s breath, and the Spirit of God - showing how closely these ideas are tied together in Hebrew thought.').

glossary_term(kadosh, 'קָדוֹשׁ', 'Kadosh', 'kah-DOSH',
    'Holy, set apart.',
    'The root idea is separation for a special purpose, not merely moral purity - to be kadosh is to be set apart for God''s use.').

glossary_term(mashiach, 'מָשִׁיחַ', 'Mashiach', 'mah-SHEE-akh',
    'Messiah, anointed one.',
    'The Greek word "Christ" (Christos) is simply a translation of this Hebrew title.').

glossary_term(elohim, 'אֱלֹהִים', 'Elohim', 'el-oh-HEEM',
    'God.',
    'Grammatically plural in form but used with singular verbs when referring to the one true God - a "plural of majesty."').

glossary_term(yhwh, 'יהוה', 'YHWH', 'unpronounced / "Adonai" read aloud',
    'The personal covenant name of God, the Tetragrammaton.',
    'Traditionally not pronounced aloud out of reverence; "Adonai" (Lord) is substituted when reading scripture.').

glossary_term(abba, 'אַבָּא', 'Abba', 'AH-bah',
    'Father, dad - an intimate, familial term.',
    'Used by Yeshua in Gethsemane (Mark 14:36) and by believers to address God directly (Romans 8:15).').

glossary_term(amen, 'אָמֵן', 'Amen', 'ah-MEN',
    'So be it; truly; confirmed.',
    'From the same root as "emet" (truth) and "aman" (to support) - saying amen affirms something as trustworthy and true.').


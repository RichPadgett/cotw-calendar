% =============================================================================
% Hebrew Alphabet
% Author: rpadgett
%
% hebrew_letter(Order, Name, Letter, Transliteration, Sound, Meaning).
%
% Order          - position in the alphabet (1-22)
% Name           - the letter's name (e.g. 'Aleph')
% Letter         - the Hebrew character itself
% Transliteration- common Latin transliteration(s)
% Sound          - how it is typically pronounced
% Meaning        - traditional pictograph/meaning associated with the letter
% =============================================================================

:- multifile hebrew_letter/6.

hebrew_letter(1, 'Aleph', 'א', 'Aleph', 'Silent (glottal stop)', 'Ox, strength, leader').
hebrew_letter(2, 'Bet', 'ב', 'Bet/Vet', 'B as in "boy" / V as in "van"', 'House, family, tent').
hebrew_letter(3, 'Gimel', 'ג', 'Gimel', 'G as in "go"', 'Camel, to lift up, pride').
hebrew_letter(4, 'Dalet', 'ד', 'Dalet', 'D as in "day"', 'Door, pathway').
hebrew_letter(5, 'Hey', 'ה', 'Hey/He', 'H as in "hay"', 'Behold, window, revelation').
hebrew_letter(6, 'Vav', 'ו', 'Vav/Waw', 'V as in "van" / W', 'Hook, nail, connection').
hebrew_letter(7, 'Zayin', 'ז', 'Zayin', 'Z as in "zoo"', 'Weapon, sword, cutting').
hebrew_letter(8, 'Het', 'ח', 'Het/Chet', 'Guttural H, like "Bach"', 'Fence, wall, enclosure').
hebrew_letter(9, 'Tet', 'ט', 'Tet', 'T as in "top"', 'Basket, coiled snake, containment').
hebrew_letter(10, 'Yod', 'י', 'Yod/Yud', 'Y as in "yes"', 'Hand, work, deed').
hebrew_letter(11, 'Kaf', 'כ', 'Kaf/Khaf', 'K as in "kite" / KH guttural', 'Open palm, to cover, bend').
hebrew_letter(12, 'Lamed', 'ל', 'Lamed', 'L as in "love"', 'Staff, goad, to teach').
hebrew_letter(13, 'Mem', 'מ', 'Mem', 'M as in "moon"', 'Water, chaos, mighty').
hebrew_letter(14, 'Nun', 'נ', 'Nun', 'N as in "now"', 'Fish, activity, life').
hebrew_letter(15, 'Samekh', 'ס', 'Samekh', 'S as in "sun"', 'Prop, support, to grab hold').
hebrew_letter(16, 'Ayin', 'ע', 'Ayin', 'Silent (guttural)', 'Eye, to see, understanding').
hebrew_letter(17, 'Pe', 'פ', 'Pe/Fe', 'P as in "pen" / F as in "fun"', 'Mouth, word, speaking').
hebrew_letter(18, 'Tsadi', 'צ', 'Tsadi/Tzade', 'TS as in "nets"', 'Fish hook, to hunt, righteous man').
hebrew_letter(19, 'Qof', 'ק', 'Qof/Kof', 'Hard K (back of throat)', 'Back of the head, behind, the sun').
hebrew_letter(20, 'Resh', 'ר', 'Resh', 'R as in "run"', 'Head, top, beginning').
hebrew_letter(21, 'Shin', 'ש', 'Shin/Sin', 'SH as in "shoe" / S as in "sun"', 'Teeth, to consume, sharp').
hebrew_letter(22, 'Tav', 'ת', 'Tav/Taw', 'T as in "top"', 'Mark, sign, covenant, seal').

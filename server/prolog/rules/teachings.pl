% =============================================================================
% Podcast Teaching Matching Rules
% Author: rpadgett
%
% related_teaching/3 surfaces Church of the Word episodes that discuss the same
% book/chapter as a command's own scripture_reference. This is a mechanical
% overlap match, not a hand-verified content link like story_reference or
% non_canonical_story_reference — treat it as "may cover this passage."
% =============================================================================

% -----------------------------------------------------------------------------
% Known Bible Books
% -----------------------------------------------------------------------------
% Longer, multi-word names are listed so exact prefix matching (book name
% followed by a space) resolves correctly against a scripture_reference atom.

known_book('1 Samuel'). known_book('2 Samuel').
known_book('1 Kings'). known_book('2 Kings').
known_book('1 Chronicles'). known_book('2 Chronicles').
known_book('Song of Solomon').
known_book('1 Corinthians'). known_book('2 Corinthians').
known_book('1 Thessalonians'). known_book('2 Thessalonians').
known_book('1 Timothy'). known_book('2 Timothy').
known_book('1 Peter'). known_book('2 Peter').
known_book('1 John'). known_book('2 John'). known_book('3 John').
known_book('Genesis'). known_book('Exodus'). known_book('Leviticus').
known_book('Numbers'). known_book('Deuteronomy'). known_book('Joshua').
known_book('Judges'). known_book('Ruth'). known_book('Ezra').
known_book('Nehemiah'). known_book('Esther'). known_book('Job').
known_book('Psalm'). known_book('Psalms'). known_book('Proverbs').
known_book('Ecclesiastes'). known_book('Isaiah'). known_book('Jeremiah').
known_book('Lamentations'). known_book('Ezekiel'). known_book('Daniel').
known_book('Hosea'). known_book('Joel'). known_book('Amos').
known_book('Obadiah'). known_book('Jonah'). known_book('Micah').
known_book('Nahum'). known_book('Habakkuk'). known_book('Zephaniah').
known_book('Haggai'). known_book('Zechariah'). known_book('Malachi').
known_book('Matthew'). known_book('Mark'). known_book('Luke').
known_book('John'). known_book('Acts'). known_book('Romans').
known_book('Galatians'). known_book('Ephesians'). known_book('Philippians').
known_book('Colossians'). known_book('Titus'). known_book('Philemon').
known_book('Hebrews'). known_book('James'). known_book('Jude').
known_book('Revelation').

normalize_book(Book, 'Psalms') :- Book == 'Psalm', !.
normalize_book(Book, Book).

% -----------------------------------------------------------------------------
% Reference Parsing
% -----------------------------------------------------------------------------
% reference_book_chapters(+Reference, -BookChapters).
%
% Splits a scripture_reference atom like 'Leviticus 19:9-10' or 'Numbers 28-29'
% into a list of 'Book Chapter' tags, e.g. ['Leviticus 19'] or
% ['Numbers 28', 'Numbers 29'].

reference_book_chapters(Reference, BookChapters) :-
    known_book(Book),
    atom_concat(Book, ' ', Prefix),
    atom_concat(Prefix, Rest, Reference),
    !,
    normalize_book(Book, NormalizedBook),
    parse_chapters(Rest, Chapters),
    findall(BookChapter, (
        member(Chapter, Chapters),
        format(atom(BookChapter), '~w ~w', [NormalizedBook, Chapter])
    ), BookChapters).
reference_book_chapters(_, []).

parse_chapters(Rest, [Chapter]) :-
    sub_atom(Rest, Before, 1, _, ':'),
    !,
    sub_atom(Rest, 0, Before, _, ChapterAtom),
    atom_number(ChapterAtom, Chapter).
parse_chapters(Rest, Chapters) :-
    sub_atom(Rest, Before, 1, After, '-'),
    !,
    sub_atom(Rest, 0, Before, _, Chapter1Atom),
    RestFrom is Before + 1,
    sub_atom(Rest, RestFrom, After, 0, Chapter2Atom),
    ( atom_number(Chapter1Atom, Chapter1), atom_number(Chapter2Atom, Chapter2) ->
        ( Chapter2 >= Chapter1, Chapter2 - Chapter1 =< 20 ->
            numlist(Chapter1, Chapter2, Chapters)
        ; Chapters = [Chapter1]
        )
    ; Chapters = []
    ).
parse_chapters(Rest, [Chapter]) :-
    atom_number(Rest, Chapter),
    !.
parse_chapters(_, []).

% -----------------------------------------------------------------------------
% Related Teachings
% -----------------------------------------------------------------------------
% related_teaching(Command, Title, Url).
%
% True if a Church of the Word episode shares a book/chapter tag with one of
% the command's own scripture_reference facts.

related_teaching(Command, Title, Url) :-
    scripture_reference(Command, Reference),
    reference_book_chapters(Reference, BookChapters),
    member(BookChapter, BookChapters),
    podcast_episode_reference(EpisodeId, BookChapter),
    podcast_episode(EpisodeId, Title, Url).

related_teachings_list(Command, Teachings) :-
    findall(Title-Url, related_teaching(Command, Title, Url), Pairs),
    sort(Pairs, SortedPairs),
    findall(json([title=Title, url=Url]), member(Title-Url, SortedPairs), Teachings).

has_related_teaching(Command) :-
    related_teaching(Command, _, _),
    !.

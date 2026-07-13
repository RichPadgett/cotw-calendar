% =============================================================================
% Hebrew Study - API Queries
% Author: rpadgett
%
% This file exposes JSON-producing predicates for the Hebrew Letter Study
% section (alphabet + searchable glossary), independent of the command
% catalog's Prolog wiring.
% =============================================================================

:- use_module(library(http/json)).

:- consult('alphabet.pl').
:- consult('glossary.pl').

% -----------------------------------------------------------------------------
% Alphabet
% -----------------------------------------------------------------------------

api_hebrew_alphabet_json :-
    findall(Order-json([
        order=Order,
        name=Name,
        letter=Letter,
        transliteration=Transliteration,
        sound=Sound,
        meaning=Meaning
    ]), hebrew_letter(Order, Name, Letter, Transliteration, Sound, Meaning), Pairs),
    keysort(Pairs, SortedPairs),
    findall(LetterJson, member(_-LetterJson, SortedPairs), Letters),
    json_write(current_output, json([letters=Letters])).

% -----------------------------------------------------------------------------
% Glossary
% -----------------------------------------------------------------------------

api_hebrew_glossary_json :-
    findall(Key-TermJson, glossary_term_json(Key, TermJson), Pairs),
    keysort(Pairs, SortedPairs),
    findall(TermJson, member(_-TermJson, SortedPairs), Terms),
    json_write(current_output, json([terms=Terms])).

api_hebrew_glossary_search_json(Query, Language) :-
    downcase_atom(Query, LowerQuery),
    findall(Key-TermJson, (
        glossary_term_json(Key, TermJson),
        glossary_term_matches(Key, LowerQuery, Language)
    ), Pairs),
    keysort(Pairs, SortedPairs),
    findall(TermJson, member(_-TermJson, SortedPairs), Terms),
    json_write(current_output, json([terms=Terms])).

glossary_term_json(Key, json([
    key=Key,
    language=Language,
    word=Word,
    transliteration=Transliteration,
    pronunciation=Pronunciation,
    definition=Definition,
    note=Note
])) :-
    glossary_term(Key, Language, Word, Transliteration, Pronunciation, Definition, Note).

glossary_term_matches(Key, LowerQuery, Language) :-
    glossary_term(Key, TermLanguage, Word, Transliteration, _Pronunciation, Definition, Note),
    ( Language == '' ; Language == all ; TermLanguage == Language ),
    ( LowerQuery == ''
    ; atom_contains_ci(Key, LowerQuery)
    ; atom_contains_ci(Word, LowerQuery)
    ; atom_contains_ci(Transliteration, LowerQuery)
    ; atom_contains_ci(Definition, LowerQuery)
    ; atom_contains_ci(Note, LowerQuery)
    ),
    !.

atom_contains_ci(Atom, LowerQuery) :-
    downcase_atom(Atom, LowerAtom),
    sub_atom(LowerAtom, _, _, _, LowerQuery).

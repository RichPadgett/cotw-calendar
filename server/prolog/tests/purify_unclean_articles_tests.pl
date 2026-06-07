% =============================================================================
% Purify Unclean Articles Smoke Tests
% Author: rpadgett
%
% These checks make sure the second command is loaded and follows the same
% command, requirement, flow, and embodiment pattern as clean meats.
% =============================================================================

:- begin_tests(purify_unclean_articles).

:- consult('../main.pl').

test(purify_unclean_articles_can_be_obeyed_today) :-
    can_obey_today(purify_unclean_articles).

test(purify_unclean_articles_has_no_blocked_requirements, true(Requirements == [])) :-
    findall(Requirement, blocked_requirement(purify_unclean_articles, Requirement), Requirements).

test(purify_unclean_articles_embodies_love_god, true(GreatCommands == [love_god])) :-
    embodies_list(purify_unclean_articles, GreatCommands).

test(purify_unclean_articles_next_question_starts_at_first_requirement) :-
    next_question(purify_unclean_articles, [], identify_dead_animal_article_contact).

test(purify_unclean_articles_next_question_resumes_from_answers) :-
    next_question(
        purify_unclean_articles,
        [answer(identify_dead_animal_article_contact, yes)],
        individual_can_purify_article
    ).

test(purify_unclean_articles_flow_complete_after_all_answers) :-
    flow_complete(
        purify_unclean_articles,
        [
            answer(identify_dead_animal_article_contact, yes),
            answer(individual_can_purify_article, yes)
        ]
    ).

:- end_tests(purify_unclean_articles).

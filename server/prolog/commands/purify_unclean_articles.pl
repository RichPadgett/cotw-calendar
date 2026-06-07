% =============================================================================
% Command: Purify Unclean Articles
% Author: rpadgett
%
% This file defines one command and the requirements needed to reason about it.
%
% The command is intentionally small so the structure is easy to learn:
% - identify the command
% - define normal obedience
% - define requirements
% - define the question flow
% - connect the command to what it embodies
% =============================================================================

% -----------------------------------------------------------------------------
% Command Identity
% -----------------------------------------------------------------------------
% command(CommandKey).
%
% Read this as:
% "purify unclean articles is a known command."

command(purify_unclean_articles).

% -----------------------------------------------------------------------------
% Human-Facing Summary
% -----------------------------------------------------------------------------
% These facts are not needed for pure logic, but they give the API stable text
% it can return to the UI.

command_title(purify_unclean_articles, 'Purify articles of wood, skin, or textile that have become unclean from contact with a dead animal. Put them in water until the evening.').

normal_obedience(purify_unclean_articles, 'Purify articles once you know they have become unclean.').

% -----------------------------------------------------------------------------
% Requirements
% -----------------------------------------------------------------------------
% requires(Command, Requirement).
%
% Read this as:
% "The purify_unclean_articles command requires individual_can_purify_article."

requires(purify_unclean_articles, individual_can_purify_article).
requires(purify_unclean_articles, identify_dead_animal_article_contact).

% -----------------------------------------------------------------------------
% Decision Flow
% -----------------------------------------------------------------------------
% question_order(Command, Questions).
%
% This controls the order of a guided UI flow. The UI can send previous answers
% to the API, and Prolog can return the next unanswered question.

question_order(purify_unclean_articles, [
    identify_dead_animal_article_contact,
    individual_can_purify_article
]).

% -----------------------------------------------------------------------------
% Embodiment / Teaching Connection
% -----------------------------------------------------------------------------
% concerns(Command, Concern).
%
% This connects a command to a teaching concern. Shared rules can then infer
% whether the command embodies love_god, love_neighbor, or both.

concerns(purify_unclean_articles, clean_and_unclean_distinction).
concerns(purify_unclean_articles, restore_unclean_article).

% -----------------------------------------------------------------------------
% End Of Flow Study Notes
% -----------------------------------------------------------------------------
% These are placeholders for the final teaching area of the decision tree.
% They can grow into richer structured data later.

scripture_reference(purify_unclean_articles, 'Leviticus 11:33').

study_note(purify_unclean_articles, 'This command teaches healthy habits and gives a practical daily expression of honoring YHWH''s instruction.').

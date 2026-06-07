% =============================================================================
% Command: Clean Meats
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
% "clean_meats is a known command."

command(clean_meats).

% -----------------------------------------------------------------------------
% Human-Facing Summary
% -----------------------------------------------------------------------------
% These facts are not needed for pure logic, but they give the API stable text
% it can return to the UI.

command_title(clean_meats, 'Deu 14:3 - You shall not eat any abomination.').

normal_obedience(clean_meats, 'Choose clean foods and avoid unclean meats.').

% -----------------------------------------------------------------------------
% Requirements
% -----------------------------------------------------------------------------
% requires(Command, Requirement).
%
% Read this as:
% "The clean_meats command requires individual_can_choose_food."

requires(clean_meats, individual_can_choose_food).
requires(clean_meats, distinguish_clean_from_unclean).

% -----------------------------------------------------------------------------
% Decision Flow
% -----------------------------------------------------------------------------
% question_order(Command, Questions).
%
% This controls the order of a guided UI flow. The UI can send previous answers
% to the API, and Prolog can return the next unanswered question.

question_order(clean_meats, [
    distinguish_clean_from_unclean,
    individual_can_choose_food
]).

% -----------------------------------------------------------------------------
% Embodiment / Teaching Connection
% -----------------------------------------------------------------------------
% concerns(Command, Concern).
%
% This connects a command to a teaching concern. Shared rules can then infer
% whether the command embodies love_god, love_neighbor, or both.

concerns(clean_meats, clean_and_unclean_distinction).

% -----------------------------------------------------------------------------
% End Of Flow Study Notes
% -----------------------------------------------------------------------------
% These are placeholders for the final teaching area of the decision tree.
% They can grow into richer structured data later.

scripture_reference(clean_meats, 'Leviticus 11').
scripture_reference(clean_meats, 'Deuteronomy 14').

study_note(clean_meats, 'This command teaches the distinction between clean and unclean and gives a practical daily expression of honoring YHWH''s instruction.').

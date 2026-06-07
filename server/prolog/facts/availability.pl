% =============================================================================
% Requirement Availability Facts
% Author: rpadgett
%
% This file describes whether command requirements are structurally available
% today. These are general facts, not personalized user answers.
% =============================================================================

% -----------------------------------------------------------------------------
% Available Today
% -----------------------------------------------------------------------------
% available_today(Requirement).
%
% Read this as:
% "This requirement can generally be fulfilled today."

available_today(individual_can_choose_food).
available_today(distinguish_clean_from_unclean).
available_today(individual_can_purify_article).
available_today(identify_dead_animal_article_contact).

% -----------------------------------------------------------------------------
% Unavailable Today
% -----------------------------------------------------------------------------
% unavailable_today(Requirement).
%
% This is here for future commands. Clean meats does not currently use an
% unavailable structural requirement.

unavailable_today(recognized_torah_court).
unavailable_today(priests_levites_and_judge).
unavailable_today(authorized_public_penalty).

unavailable_today(_) :-
    fail.

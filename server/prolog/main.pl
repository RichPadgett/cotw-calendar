% =============================================================================
% COTW Commands - Main Loader
% Author: rpadgett
%
% This file loads the complete Prolog knowledge base.
%
% Keep this file small. As the project grows, new command files, fact files, and
% rule files should be added here so the API can load one stable entry point.
% =============================================================================

% -----------------------------------------------------------------------------
% Shared Predicate Declarations
% -----------------------------------------------------------------------------
% These predicates are intentionally defined across multiple command and fact
% files. multifile/1 tells Prolog to combine those definitions instead of
% treating each new file as a replacement for the previous one.

:- multifile command/1.
:- multifile command_title/2.
:- multifile normal_obedience/2.
:- multifile requires/2.
:- multifile question_order/2.
:- multifile concerns/2.
:- multifile scripture_reference/2.
:- multifile study_note/2.
:- multifile available_today/1.
:- multifile unavailable_today/1.
:- multifile points_to/2.
:- multifile requirement_title/2.
:- multifile requirement_description/2.

% -----------------------------------------------------------------------------
% Shared Facts
% -----------------------------------------------------------------------------
% These files define reusable values that many commands can reference.

:- consult('facts/availability.pl').
:- consult('facts/great_commands.pl').
:- consult('facts/requirement_labels.pl').

% -----------------------------------------------------------------------------
% Shared Rules
% -----------------------------------------------------------------------------
% These files define the logic used to evaluate commands.

:- consult('rules/obeyability.pl').
:- consult('rules/embodiment.pl').
:- consult('rules/flow.pl').

% -----------------------------------------------------------------------------
% Command Definitions
% -----------------------------------------------------------------------------
% Each command gets its own file so the Torah command library can grow without
% turning one file into a wall of facts.

:- consult('commands/clean_meats.pl').
:- consult('commands/purify_unclean_articles.pl').
:- consult('commands/blasphemy_penalty.pl').

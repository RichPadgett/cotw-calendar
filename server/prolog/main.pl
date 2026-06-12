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
:- multifile command_requirement/2.
:- multifile command_category/2.
:- multifile command_fact/2.
:- multifile applies_if/2.
:- multifile reminder_text/2.
:- multifile concerns/2.
:- multifile scripture_reference/2.
:- multifile story_reference/3.
:- multifile study_note/2.
:- multifile source_term/4.
:- multifile clarification_note/2.
:- multifile translation_note/2.
:- multifile points_to/2.

% -----------------------------------------------------------------------------
% Shared Facts
% -----------------------------------------------------------------------------
% These files define reusable values that many commands can reference.

:- consult('facts/great_commands.pl').

% -----------------------------------------------------------------------------
% Shared Rules
% -----------------------------------------------------------------------------
% These files define the logic used to classify and describe commands.

:- consult('rules/embodiment.pl').
:- consult('rules/catalog.pl').

% -----------------------------------------------------------------------------
% Command Definitions
% -----------------------------------------------------------------------------
% Each command gets its own file so the Torah command library can grow without
% turning one file into a wall of facts.

:- consult('commands/foundation_commands.pl').
:- consult('commands/passover_unleavened_bread_commands.pl').
:- consult('commands/firstfruits_omer_commands.pl').
:- consult('commands/shavuot_commands.pl').
:- consult('commands/trumpets_commands.pl').
:- consult('commands/day_of_atonement_commands.pl').
:- consult('commands/tabernacles_commands.pl').
:- consult('commands/offerings_commands.pl').
:- consult('commands/general_torah_review_commands.pl').
:- consult('commands/worship_idolatry_commands.pl').
:- consult('commands/name_vows_remembrance_commands.pl').
:- consult('commands/clean_purity_commands.pl').
:- consult('commands/justice_neighbor_commands.pl').
:- consult('commands/family_household_commands.pl').
:- consult('commands/property_economics_land_commands.pl').
:- consult('commands/priestly_holiness_commands.pl').
:- consult('commands/leadership_warfare_commands.pl').
:- consult('commands/text_specific_detail_commands.pl').

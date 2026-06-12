% =============================================================================
% Command Group: Trumpets / Memorial Blowing
% Author: rpadgett
% =============================================================================

% -----------------------------------------------------------------------------
% Command Entry Reference
% -----------------------------------------------------------------------------
% Required fields for a normal command entry:
%
% % Command: command_key
% command(command_key).
% command_title(command_key, 'Book 1:1 - Short command title.').
% normal_obedience(command_key, 'Text-faithful statement of what the command says to do or not do.').
% concerns(command_key, concern_key).
% scripture_reference(command_key, 'Book 1:1-2').
% study_note(command_key, 'Short human note about scope, context, or catalog status.').
%
% Optional detail fields:
%
% source_term(command_key, hebrew, word, 'brief gloss').
% source_term(command_key, greek, word, 'brief gloss').
% source_term(command_key, aramaic, word, 'brief gloss').
% translation_note(command_key, 'Short note about a translation wording such as KJV, LXX, etc.').
% clarification_note(command_key, 'Explain how the source wording should or should not narrow the command.').
%
% How these are used downstream:
% - command_title, normal_obedience, concerns, scripture_reference, and study_note appear in command detail APIs.
% - source_term appears as sourceTerms with language, term, and gloss.
% - translation_note appears as translationNotes.
% - clarification_note appears as clarificationNotes.
% - concerns drives derived facts, categories, applicability, filtering, and notification selection.
%
% Full example:
%
% % Command: do_not_destroy_the_edge_of_the_beard
% command(do_not_destroy_the_edge_of_the_beard).
% command_title(do_not_destroy_the_edge_of_the_beard, 'Leviticus 19:27 - Do not destroy the edge of the beard.').
% normal_obedience(do_not_destroy_the_edge_of_the_beard, 'Do not destroy the edge of the beard.').
% concerns(do_not_destroy_the_edge_of_the_beard, mixed_kinds_boundary).
% scripture_reference(do_not_destroy_the_edge_of_the_beard, 'Leviticus 19:27').
% source_term(do_not_destroy_the_edge_of_the_beard, hebrew, shachath, 'mar / ruin / destroy').
% translation_note(do_not_destroy_the_edge_of_the_beard, 'KJV says, "neither shalt thou mar the corners of thy beard."').
% clarification_note(do_not_destroy_the_edge_of_the_beard, 'The Hebrew shachath means to spoil, ruin, corrupt, or destroy; this supports wording the command as destruction of the beard edge rather than a broad ban on all trimming.').
% study_note(do_not_destroy_the_edge_of_the_beard, 'Catalog wording stays close to the source-language action word and avoids adding a man-made fence.').

% Command: memorial_of_blowing
command(memorial_of_blowing).
command_title(memorial_of_blowing, 'Lev 23:23-25 - Memorial of blowing.').
normal_obedience(memorial_of_blowing, 'Keep the day as a memorial of trumpet or blowing.').
concerns(memorial_of_blowing, appointed_times).
scripture_reference(memorial_of_blowing, 'Leviticus 23:23-25').
scripture_reference(memorial_of_blowing, 'Numbers 29:1').
story_reference(memorial_of_blowing, 'Nehemiah 8:2', 'The people gather for Torah reading on the first day of the seventh month.').
study_note(memorial_of_blowing, 'The day is remembered through blowing and sacred assembly.').

% Command: trumpets_sacred_assembly
command(trumpets_sacred_assembly).
command_title(trumpets_sacred_assembly, 'Num 29:1 - Trumpets sacred assembly.').
normal_obedience(trumpets_sacred_assembly, 'Hold a sacred assembly and do no ordinary work.').
concerns(trumpets_sacred_assembly, sacred_assembly).
scripture_reference(trumpets_sacred_assembly, 'Leviticus 23:24-25').
scripture_reference(trumpets_sacred_assembly, 'Numbers 29:1').
story_reference(trumpets_sacred_assembly, 'Nehemiah 8:1-12', 'A public assembly gathers in the seventh month to hear and understand Torah.').
study_note(trumpets_sacred_assembly, 'The day is set apart from ordinary work.').

% =============================================================================
% Command Group: Shavuot / Weeks
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

% Command: keep_feast_of_weeks
command(keep_feast_of_weeks).
command_title(keep_feast_of_weeks, 'Deu 16:9-12 - Keep the Feast of Weeks.').
normal_obedience(keep_feast_of_weeks, 'Observe the Feast of Weeks after the seven-week count.').
concerns(keep_feast_of_weeks, appointed_times).
scripture_reference(keep_feast_of_weeks, 'Exodus 34:22').
scripture_reference(keep_feast_of_weeks, 'Leviticus 23:15-21').
scripture_reference(keep_feast_of_weeks, 'Deuteronomy 16:9-12').
story_reference(keep_feast_of_weeks, '2 Chronicles 8:13', 'Solomon observes the yearly appointed feasts, including the Feast of Weeks.').
source_term(keep_feast_of_weeks, hebrew, shabua, 'week or seven; Shavuot is the Feast of Weeks').
source_term(keep_feast_of_weeks, hebrew, chag, 'feast or pilgrimage festival; used of the Feast of Weeks').
study_note(keep_feast_of_weeks, 'Shavuot is reached through the commanded count from Firstfruits.').

% Command: bring_new_grain_offering
command(bring_new_grain_offering).
command_title(bring_new_grain_offering, 'Lev 23:16-17 - Bring the new grain offering.').
normal_obedience(bring_new_grain_offering, 'Present the firstfruits or new grain offering.').
concerns(bring_new_grain_offering, firstfruits_and_counting).
scripture_reference(bring_new_grain_offering, 'Leviticus 23:16-17').
scripture_reference(bring_new_grain_offering, 'Numbers 28:26').
story_reference(bring_new_grain_offering, '2 Chronicles 31:5', 'Israel brings firstfruits of grain, wine, oil, honey, and field produce abundantly.').
source_term(bring_new_grain_offering, hebrew, minchah, 'grain offering or tribute offering; Shavuot includes a new grain offering').
source_term(bring_new_grain_offering, hebrew, chadash, 'new; the offering is from new grain').
study_note(bring_new_grain_offering, 'The offering marks the completion of the count.').

% Command: shavuot_sacred_assembly
command(shavuot_sacred_assembly).
command_title(shavuot_sacred_assembly, 'Lev 23:21 - Shavuot sacred assembly.').
normal_obedience(shavuot_sacred_assembly, 'Hold a sacred assembly and do no ordinary work.').
concerns(shavuot_sacred_assembly, sacred_assembly).
scripture_reference(shavuot_sacred_assembly, 'Leviticus 23:21').
scripture_reference(shavuot_sacred_assembly, 'Numbers 28:26').
source_term(shavuot_sacred_assembly, hebrew, miqra, 'convocation or called assembly; Shavuot is a sacred assembly').
source_term(shavuot_sacred_assembly, hebrew, qodesh, 'holy or set apart; the assembly is holy').
source_term(shavuot_sacred_assembly, hebrew, melakah, 'work, occupation, or service; ordinary work is forbidden on the day').
study_note(shavuot_sacred_assembly, 'The day is set apart as a sacred assembly.').

% Command: rejoice_at_shavuot
command(rejoice_at_shavuot).
command_title(rejoice_at_shavuot, 'Deu 16:10-12 - Rejoice at Shavuot.').
normal_obedience(rejoice_at_shavuot, 'Rejoice before YHWH with household, servants, Levite, stranger, orphan, and widow.').
concerns(rejoice_at_shavuot, include_vulnerable_neighbors).
scripture_reference(rejoice_at_shavuot, 'Deuteronomy 16:10-12').
source_term(rejoice_at_shavuot, hebrew, samach, 'to rejoice or be glad; the feast command includes rejoicing before YHWH').
source_term(rejoice_at_shavuot, hebrew, ger, 'sojourner or stranger; included among those sharing feast joy').
study_note(rejoice_at_shavuot, 'The feast includes joy that extends beyond the individual household.').

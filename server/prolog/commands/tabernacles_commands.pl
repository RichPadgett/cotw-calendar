% =============================================================================
% Command Group: Tabernacles / Booths
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

% Command: keep_feast_of_booths_seven_days
command(keep_feast_of_booths_seven_days).
command_title(keep_feast_of_booths_seven_days, 'Lev 23:33-36 - Keep Booths seven days.').
normal_obedience(keep_feast_of_booths_seven_days, 'Keep the seven-day Feast of Booths.').
concerns(keep_feast_of_booths_seven_days, tabernacles_rejoicing).
scripture_reference(keep_feast_of_booths_seven_days, 'Leviticus 23:33-36').
scripture_reference(keep_feast_of_booths_seven_days, 'Deuteronomy 16:13-15').
story_reference(keep_feast_of_booths_seven_days, '1 Kings 8:2, 65-66', 'Solomon and Israel gather in the seventh month and keep the feast.').
story_reference(keep_feast_of_booths_seven_days, 'Ezra 3:4', 'The returned exiles keep the Feast of Booths as written.').
story_reference(keep_feast_of_booths_seven_days, 'Nehemiah 8:14-18', 'The people make booths and keep the feast with great gladness.').
study_note(keep_feast_of_booths_seven_days, 'Booths is a seven-day feast of remembrance and rejoicing.').

% Command: first_day_booths_assembly
command(first_day_booths_assembly).
command_title(first_day_booths_assembly, 'Lev 23:35 - First day Booths assembly.').
normal_obedience(first_day_booths_assembly, 'Hold a sacred assembly and do no ordinary work on the first day.').
concerns(first_day_booths_assembly, sacred_assembly).
scripture_reference(first_day_booths_assembly, 'Leviticus 23:35').
scripture_reference(first_day_booths_assembly, 'Numbers 29:12').
story_reference(first_day_booths_assembly, 'Nehemiah 8:18', 'The feast includes daily Torah reading and an assembly on the eighth day according to the ordinance.').
study_note(first_day_booths_assembly, 'The first day of Booths is set apart as sacred assembly.').

% Command: eighth_day_assembly
command(eighth_day_assembly).
command_title(eighth_day_assembly, 'Lev 23:36 - Eighth day assembly.').
normal_obedience(eighth_day_assembly, 'Hold the eighth-day solemn or sacred assembly and do no ordinary work.').
concerns(eighth_day_assembly, sacred_assembly).
scripture_reference(eighth_day_assembly, 'Leviticus 23:36').
scripture_reference(eighth_day_assembly, 'Numbers 29:35').
story_reference(eighth_day_assembly, 'Nehemiah 8:18', 'The returned exiles hold the eighth-day assembly according to the ordinance.').
study_note(eighth_day_assembly, 'The eighth day closes the festival sequence with assembly and rest.').

% Command: dwell_in_booths_seven_days
command(dwell_in_booths_seven_days).
command_title(dwell_in_booths_seven_days, 'Lev 23:42-43 - Dwell in booths seven days.').
normal_obedience(dwell_in_booths_seven_days, 'Dwell in booths for seven days as commanded.').
concerns(dwell_in_booths_seven_days, tabernacles_rejoicing).
scripture_reference(dwell_in_booths_seven_days, 'Leviticus 23:42-43').
story_reference(dwell_in_booths_seven_days, 'Nehemiah 8:14-17', 'The people find the command written, make booths, and dwell in them.').
study_note(dwell_in_booths_seven_days, 'Dwelling in booths teaches remembrance of how YHWH made Israel dwell in booths.').

% Command: rejoice_with_branches_and_fruit
command(rejoice_with_branches_and_fruit).
command_title(rejoice_with_branches_and_fruit, 'Lev 23:40 - Rejoice with branches and fruit.').
normal_obedience(rejoice_with_branches_and_fruit, 'Take fruit and branches and rejoice before YHWH.').
concerns(rejoice_with_branches_and_fruit, tabernacles_rejoicing).
scripture_reference(rejoice_with_branches_and_fruit, 'Leviticus 23:40').
story_reference(rejoice_with_branches_and_fruit, 'Nehemiah 8:15-17', 'The people gather branches, make booths, and rejoice greatly.').
study_note(rejoice_with_branches_and_fruit, 'The feast includes visible, embodied rejoicing before YHWH.').

% Command: rejoice_at_booths_with_household_and_vulnerable
command(rejoice_at_booths_with_household_and_vulnerable).
command_title(rejoice_at_booths_with_household_and_vulnerable, 'Deu 16:13-15 - Rejoice at Booths.').
normal_obedience(rejoice_at_booths_with_household_and_vulnerable, 'Rejoice before YHWH with household, Levite, stranger, orphan, and widow.').
concerns(rejoice_at_booths_with_household_and_vulnerable, include_vulnerable_neighbors).
scripture_reference(rejoice_at_booths_with_household_and_vulnerable, 'Deuteronomy 16:13-15').
story_reference(rejoice_at_booths_with_household_and_vulnerable, 'Nehemiah 8:17', 'The assembly keeps Booths with very great gladness.').
study_note(rejoice_at_booths_with_household_and_vulnerable, 'Feast joy is shared with the community, including vulnerable neighbors.').

% Command: public_torah_reading_release_year
command(public_torah_reading_release_year).
command_title(public_torah_reading_release_year, 'Deu 31:10-13 - Public Torah reading in the release year.').
normal_obedience(public_torah_reading_release_year, 'Read Torah at Booths during the release year so the people hear and learn.').
concerns(public_torah_reading_release_year, teach_children_torah).
scripture_reference(public_torah_reading_release_year, 'Deuteronomy 31:10-13').
story_reference(public_torah_reading_release_year, 'Nehemiah 8:18', 'Torah is read day by day during the Feast of Booths.').
study_note(public_torah_reading_release_year, 'The command gathers men, women, children, and the stranger to hear Torah.').

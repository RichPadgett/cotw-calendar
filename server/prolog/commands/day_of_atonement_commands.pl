% =============================================================================
% Command Group: Day of Atonement
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

% Command: observe_day_of_atonement
command(observe_day_of_atonement).
command_title(observe_day_of_atonement, 'Lev 23:26-32 - Observe the Day of Atonement.').
normal_obedience(observe_day_of_atonement, 'Keep the appointed day of atonement.').
concerns(observe_day_of_atonement, atonement_rest).
scripture_reference(observe_day_of_atonement, 'Leviticus 16').
scripture_reference(observe_day_of_atonement, 'Leviticus 23:26-32').
scripture_reference(observe_day_of_atonement, 'Numbers 29:7-11').
story_reference(observe_day_of_atonement, 'Leviticus 16:1-34', 'After the death of Aaron''s sons, YHWH gives the Day of Atonement service and appointed-day instructions.').
source_term(observe_day_of_atonement, hebrew, kippurim, 'atonements or coverings; the appointed day is Yom ha-Kippurim').
study_note(observe_day_of_atonement, 'The Day of Atonement is a solemn appointed day of rest and affliction.').

% Command: afflict_yourselves_on_atonement
command(afflict_yourselves_on_atonement).
command_title(afflict_yourselves_on_atonement, 'Lev 23:27 - Afflict yourselves on Atonement.').
normal_obedience(afflict_yourselves_on_atonement, 'Humble or afflict the soul on the Day of Atonement.').
concerns(afflict_yourselves_on_atonement, atonement_rest).
scripture_reference(afflict_yourselves_on_atonement, 'Leviticus 16:29').
scripture_reference(afflict_yourselves_on_atonement, 'Leviticus 16:31').
scripture_reference(afflict_yourselves_on_atonement, 'Leviticus 23:27').
scripture_reference(afflict_yourselves_on_atonement, 'Leviticus 23:29').
scripture_reference(afflict_yourselves_on_atonement, 'Leviticus 23:32').
scripture_reference(afflict_yourselves_on_atonement, 'Numbers 29:7').
story_reference(afflict_yourselves_on_atonement, 'Leviticus 16:29-34', 'The Atonement service is given with the command for Israel and the stranger to afflict themselves.').
source_term(afflict_yourselves_on_atonement, hebrew, anah, 'to afflict, humble, or bow down; used for afflicting the soul on Atonement').
source_term(afflict_yourselves_on_atonement, hebrew, nephesh, 'soul, life, or person; Leviticus speaks of afflicting your souls').
study_note(afflict_yourselves_on_atonement, 'The command emphasizes humility and seriousness before YHWH.').
study_note(afflict_yourselves_on_atonement, 'Leviticus 16:29 describes afflicting your souls. ').

% Command: no_work_on_atonement
command(no_work_on_atonement).
command_title(no_work_on_atonement, 'Lev 23:28 - Do no work on Atonement.').
normal_obedience(no_work_on_atonement, 'Keep complete rest and do no work on the Day of Atonement.').
concerns(no_work_on_atonement, atonement_rest).
scripture_reference(no_work_on_atonement, 'Leviticus 16:29').
scripture_reference(no_work_on_atonement, 'Leviticus 16:31').
scripture_reference(no_work_on_atonement, 'Leviticus 23:28').
scripture_reference(no_work_on_atonement, 'Leviticus 23:30-32').
story_reference(no_work_on_atonement, 'Leviticus 16:29-34', 'The Atonement service instructions include the command to do no work on that appointed day.').
source_term(no_work_on_atonement, hebrew, melakah, 'work, occupation, or service; the day forbids work').
source_term(no_work_on_atonement, hebrew, shabbathon, 'complete rest or solemn rest; Atonement is called a sabbath of rest').
study_note(no_work_on_atonement, 'The day is treated as complete rest before YHWH.').

% Command: observe_atonement_evening_to_evening
command(observe_atonement_evening_to_evening).
command_title(observe_atonement_evening_to_evening, 'Lev 23:32 - Observe evening to evening.').
normal_obedience(observe_atonement_evening_to_evening, 'Observe the Day of Atonement from evening to evening.').
concerns(observe_atonement_evening_to_evening, atonement_rest).
scripture_reference(observe_atonement_evening_to_evening, 'Leviticus 23:32').
story_reference(observe_atonement_evening_to_evening, 'Leviticus 16:29-34', 'The Atonement ordinance supplies the narrative setting for the solemn day that Leviticus 23 bounds from evening to evening.').
source_term(observe_atonement_evening_to_evening, hebrew, ereb, 'evening; the text sets the observance from evening to evening').
study_note(observe_atonement_evening_to_evening, 'The text gives a boundary for observing the day.').

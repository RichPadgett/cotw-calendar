% =============================================================================
% Command Group: General Torah Participation
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

% Command: teach_children_diligently
command(teach_children_diligently).
command_title(teach_children_diligently, 'Deu 6:4-9 - Teach children diligently.').
normal_obedience(teach_children_diligently, 'Teach Torah diligently to children and speak of it in daily life.').
concerns(teach_children_diligently, teach_children_torah).
scripture_reference(teach_children_diligently, 'Deuteronomy 6:4-9').
scripture_reference(teach_children_diligently, 'Deuteronomy 11:18-21').
story_reference(teach_children_diligently, 'Genesis 18:19', 'YHWH speaks of Abraham commanding his children and household to keep the way of YHWH.').
story_reference(teach_children_diligently, 'Joshua 4:21-24', 'Joshua uses the memorial stones to teach children about YHWH''s deliverance.').
study_note(teach_children_diligently, 'This command supports the app idea of daily reminders and household teaching.').

% Command: remember_deliverance_from_egypt
command(remember_deliverance_from_egypt).
command_title(remember_deliverance_from_egypt, 'Exo 12:14 - Remember deliverance from Egypt.').
normal_obedience(remember_deliverance_from_egypt, 'Keep the feasts as memorials of deliverance.').
concerns(remember_deliverance_from_egypt, passover_memorial).
scripture_reference(remember_deliverance_from_egypt, 'Exodus 12:14').
scripture_reference(remember_deliverance_from_egypt, 'Exodus 13:3').
scripture_reference(remember_deliverance_from_egypt, 'Deuteronomy 16:1-3').
story_reference(remember_deliverance_from_egypt, 'Joshua 5:10-12', 'Israel keeps Passover in the land after the wilderness journey.').
story_reference(remember_deliverance_from_egypt, '2 Chronicles 30:1-27', 'Hezekiah calls Israel and Judah to keep Passover as a return to YHWH.').
story_reference(remember_deliverance_from_egypt, 'Ezra 6:19-22', 'The returned exiles keep Passover and Unleavened Bread with joy.').
study_note(remember_deliverance_from_egypt, 'The feasts repeatedly point back to YHWH''s deliverance.').

% Command: do_not_add_or_subtract
command(do_not_add_or_subtract).
command_title(do_not_add_or_subtract, 'Deu 4:2 - Do not add or subtract.').
normal_obedience(do_not_add_or_subtract, 'Preserve command integrity by not adding to or taking away from YHWH''s command.').
concerns(do_not_add_or_subtract, remember_yhwhs_commands).
scripture_reference(do_not_add_or_subtract, 'Deuteronomy 4:2').
scripture_reference(do_not_add_or_subtract, 'Deuteronomy 12:32').
study_note(do_not_add_or_subtract, 'This command guards the integrity of the command list itself.').

% Command: love_yhwh_and_keep_commands
command(love_yhwh_and_keep_commands).
command_title(love_yhwh_and_keep_commands, 'Deu 6:4-5 - Love YHWH and keep His commands.').
normal_obedience(love_yhwh_and_keep_commands, 'Love YHWH and walk in covenant obedience.').
concerns(love_yhwh_and_keep_commands, remember_yhwhs_commands).
scripture_reference(love_yhwh_and_keep_commands, 'Deuteronomy 6:4-5').
scripture_reference(love_yhwh_and_keep_commands, 'Deuteronomy 10:12-13').
scripture_reference(love_yhwh_and_keep_commands, 'Deuteronomy 11:1').
story_reference(love_yhwh_and_keep_commands, 'Joshua 22:5', 'Joshua exhorts the tribes to love YHWH, walk in His ways, and keep His commandments.').
story_reference(love_yhwh_and_keep_commands, '2 Kings 23:25', 'Josiah is remembered as turning to YHWH with all his heart, soul, and might.').
study_note(love_yhwh_and_keep_commands, 'The command reminder feature can point daily obedience back to love for YHWH.').

% Command: gather_to_hear_torah
command(gather_to_hear_torah).
command_title(gather_to_hear_torah, 'Deu 31:10-13 - Gather to hear Torah.').
normal_obedience(gather_to_hear_torah, 'Gather men, women, children, and the stranger to hear and learn Torah.').
concerns(gather_to_hear_torah, teach_children_torah).
scripture_reference(gather_to_hear_torah, 'Deuteronomy 31:10-13').
story_reference(gather_to_hear_torah, 'Nehemiah 8:1-12', 'The people gather as Ezra reads the Torah and the Levites give understanding.').
study_note(gather_to_hear_torah, 'Public Torah hearing forms a communal rhythm of learning and reverence.').

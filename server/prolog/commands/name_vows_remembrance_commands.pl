% =============================================================================
% Command Group: Name, Vows, And Remembrance
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

% Command: do_not_take_name_in_vain
command(do_not_take_name_in_vain).
command_title(do_not_take_name_in_vain, 'Exo 20:7 - Do not take YHWH''s Name in vain.').
normal_obedience(do_not_take_name_in_vain, 'Do not misuse or bear YHWH''s Name falsely.').
concerns(do_not_take_name_in_vain, honor_yhwhs_name).
scripture_reference(do_not_take_name_in_vain, 'Exodus 20:7').
scripture_reference(do_not_take_name_in_vain, 'Deuteronomy 5:11').
story_reference(do_not_take_name_in_vain, 'Leviticus 24:10-16', 'The blasphemy case shows the seriousness of profaning the Name.').
source_term(do_not_take_name_in_vain, hebrew, nasa, 'to lift, carry, bear, or take up; the command can include bearing YHWH''s Name falsely, not only speaking it').
source_term(do_not_take_name_in_vain, hebrew, shav, 'emptiness, vanity, worthlessness, or falsehood').
study_note(do_not_take_name_in_vain, 'The command protects reverence for YHWH''s Name.').

% Command: do_not_swear_falsely
command(do_not_swear_falsely).
command_title(do_not_swear_falsely, 'Lev 19:12 - Do not swear falsely by YHWH''s Name.').
normal_obedience(do_not_swear_falsely, 'Do not swear falsely and profane YHWH''s Name.').
concerns(do_not_swear_falsely, honor_yhwhs_name).
scripture_reference(do_not_swear_falsely, 'Leviticus 19:12').
story_reference(do_not_swear_falsely, 'Joshua 9:14-20', 'Israel swears to the Gibeonites and then must reckon with the oath even though it was made without asking YHWH.').
source_term(do_not_swear_falsely, hebrew, shaba, 'to swear, take an oath, or bind oneself by oath').
source_term(do_not_swear_falsely, hebrew, sheqer, 'falsehood or deception; the oath misuse profanes the Name').
study_note(do_not_swear_falsely, 'Truthfulness and reverence are joined when YHWH''s Name is invoked.').

% Command: do_not_profane_yhwhs_name
command(do_not_profane_yhwhs_name).
command_title(do_not_profane_yhwhs_name, 'Lev 22:32 - Do not profane YHWH''s Name.').
normal_obedience(do_not_profane_yhwhs_name, 'Do not profane YHWH''s holy Name.').
concerns(do_not_profane_yhwhs_name, honor_yhwhs_name).
scripture_reference(do_not_profane_yhwhs_name, 'Leviticus 22:32').
story_reference(do_not_profane_yhwhs_name, 'Leviticus 24:10-16', 'The son of the Israelite woman blasphemes the Name and the matter is brought before YHWH.').
source_term(do_not_profane_yhwhs_name, hebrew, chalal, 'to profane, defile, treat as common, or dishonor what is holy').
source_term(do_not_profane_yhwhs_name, hebrew, qadash, 'to sanctify, set apart, or treat as holy; paired with not profaning the Name').
study_note(do_not_profane_yhwhs_name, 'The command is paired with sanctifying YHWH among Israel.').

% Command: keep_vows
command(keep_vows).
command_title(keep_vows, 'Num 30:2 - Keep vows made to YHWH.').
normal_obedience(keep_vows, 'Keep vows and do according to what has gone out of the mouth.').
concerns(keep_vows, honor_yhwhs_name).
scripture_reference(keep_vows, 'Numbers 30:2').
scripture_reference(keep_vows, 'Deuteronomy 23:21-23').
story_reference(keep_vows, '1 Samuel 1:21-28', 'Hannah fulfills her vow by bringing Samuel to serve before YHWH.').
story_reference(keep_vows, 'Jonah 2:9', 'Jonah declares that he will pay what he vowed.').
source_term(keep_vows, hebrew, neder, 'vow, voluntary promise, or spoken obligation made before YHWH').
source_term(keep_vows, hebrew, asar, 'to bind or bind oneself; Numbers 30 also speaks of binding obligation on the soul').
source_term(keep_vows, hebrew, motsa_saphah, 'what goes out of the lips; the command treats spoken words as binding once vowed').
study_note(keep_vows, 'Vows require careful speech and faithful completion.').

% Command: do_not_delay_vow_payment
command(do_not_delay_vow_payment).
command_title(do_not_delay_vow_payment, 'Deu 23:21 - Do not delay paying vows.').
normal_obedience(do_not_delay_vow_payment, 'Do not delay fulfilling a vow made to YHWH.').
concerns(do_not_delay_vow_payment, honor_yhwhs_name).
scripture_reference(do_not_delay_vow_payment, 'Deuteronomy 23:21-23').
story_reference(do_not_delay_vow_payment, '1 Samuel 1:21-28', 'Hannah does not abandon her vow but brings Samuel after he is weaned.').
source_term(do_not_delay_vow_payment, hebrew, achar, 'to delay, tarry, or postpone').
source_term(do_not_delay_vow_payment, hebrew, shalam, 'to complete, fulfill, or pay; used for fulfilling what was vowed').
study_note(do_not_delay_vow_payment, 'Voluntary vows become serious obligations once spoken.').

% Command: wear_tassels_to_remember_commands
command(wear_tassels_to_remember_commands).
command_title(wear_tassels_to_remember_commands, 'Num 15:37-41 - Wear tassels to remember the commands.').
normal_obedience(wear_tassels_to_remember_commands, 'Make tassels and look at them to remember and do YHWH''s commands.').
concerns(wear_tassels_to_remember_commands, tassel_remembrance).
scripture_reference(wear_tassels_to_remember_commands, 'Numbers 15:37-41').
scripture_reference(wear_tassels_to_remember_commands, 'Deuteronomy 22:12').
story_reference(wear_tassels_to_remember_commands, 'Numbers 15:32-41', 'The tassel command follows the Sabbath violation case as a visible reminder to do YHWH''s commands.').
source_term(wear_tassels_to_remember_commands, hebrew, tsitsit, 'tassel, fringe, or visible thread marker for remembering the commands').
source_term(wear_tassels_to_remember_commands, hebrew, tekhelet, 'blue or violet-blue thread named in the tassel command').
source_term(wear_tassels_to_remember_commands, hebrew, zakar, 'to remember; looking at the tassels is tied to remembering and doing the commands').
study_note(wear_tassels_to_remember_commands, 'This is the inspiration for a daily command reminder in the app.').
study_note(wear_tassels_to_remember_commands, 'Numbers does not specify four corners, Deuteronomy does specify four corners').

% Command: bind_words_as_sign
command(bind_words_as_sign).
command_title(bind_words_as_sign, 'Deu 6:8 - Bind these words as a sign.').
normal_obedience(bind_words_as_sign, 'Bind YHWH''s words as a sign and keep them before you.').
concerns(bind_words_as_sign, remember_yhwhs_commands).
scripture_reference(bind_words_as_sign, 'Deuteronomy 6:8').
scripture_reference(bind_words_as_sign, 'Deuteronomy 11:18').
source_term(bind_words_as_sign, hebrew, qashar, 'to bind or tie; the words are bound as a sign for embodied remembrance').
source_term(bind_words_as_sign, hebrew, oth, 'sign, mark, or token placed before the person').
study_note(bind_words_as_sign, 'The command emphasizes visible and embodied remembrance.').

% Command: write_words_on_doorposts
command(write_words_on_doorposts).
command_title(write_words_on_doorposts, 'Deu 6:9 - Write these words on doorposts.').
normal_obedience(write_words_on_doorposts, 'Write YHWH''s words on the doorposts and gates.').
concerns(write_words_on_doorposts, remember_yhwhs_commands).
scripture_reference(write_words_on_doorposts, 'Deuteronomy 6:9').
scripture_reference(write_words_on_doorposts, 'Deuteronomy 11:20').
source_term(write_words_on_doorposts, hebrew, mezuzah, 'doorpost; the household entrance becomes a place of Torah remembrance').
source_term(write_words_on_doorposts, hebrew, shaar, 'gate; the command extends remembrance to public/household thresholds').
study_note(write_words_on_doorposts, 'The home itself becomes a place of Torah remembrance.').

% -----------------------------------------------------------------------------
% Additional Vow And Remembrance Commands
% -----------------------------------------------------------------------------

% Command: a_father_may_annul_a_young_daughter_s_vow_in_the_stated_case
command(a_father_may_annul_a_young_daughter_s_vow_in_the_stated_case).
command_title(a_father_may_annul_a_young_daughter_s_vow_in_the_stated_case, 'Numbers 30:3-5 - A father may annul a young daughter''s vow in the stated case.').
normal_obedience(a_father_may_annul_a_young_daughter_s_vow_in_the_stated_case, 'A father may annul a young daughter''s vow in the stated case.').
concerns(a_father_may_annul_a_young_daughter_s_vow_in_the_stated_case, vow_separation).
scripture_reference(a_father_may_annul_a_young_daughter_s_vow_in_the_stated_case, 'Numbers 30:3-5').
source_term(a_father_may_annul_a_young_daughter_s_vow_in_the_stated_case, hebrew, parar, 'to break, annul, frustrate, or make void; used for annulling a vow in the stated household case').
source_term(a_father_may_annul_a_young_daughter_s_vow_in_the_stated_case, hebrew, neder, 'vow or spoken obligation').
study_note(a_father_may_annul_a_young_daughter_s_vow_in_the_stated_case, 'This command governs vowed separation and spoken obligation so voluntary devotion is handled with care before YHWH: A father may annul a young daughter''s vow in the stated case.').

% Command: a_husband_may_annul_a_wife_s_vow_in_the_stated_case
command(a_husband_may_annul_a_wife_s_vow_in_the_stated_case).
command_title(a_husband_may_annul_a_wife_s_vow_in_the_stated_case, 'Numbers 30:6-15 - A husband may annul a wife''s vow in the stated case.').
normal_obedience(a_husband_may_annul_a_wife_s_vow_in_the_stated_case, 'A husband may annul a wife''s vow in the stated case.').
concerns(a_husband_may_annul_a_wife_s_vow_in_the_stated_case, vow_separation).
scripture_reference(a_husband_may_annul_a_wife_s_vow_in_the_stated_case, 'Numbers 30:6-15').
source_term(a_husband_may_annul_a_wife_s_vow_in_the_stated_case, hebrew, parar, 'to break, annul, frustrate, or make void; used for annulling a vow in the stated household case').
source_term(a_husband_may_annul_a_wife_s_vow_in_the_stated_case, hebrew, asar, 'to bind oneself by obligation or prohibition').
study_note(a_husband_may_annul_a_wife_s_vow_in_the_stated_case, 'This command governs vowed separation and spoken obligation so voluntary devotion is handled with care before YHWH: A husband may annul a wife''s vow in the stated case.').

% Command: nazirite_made_unclean_must_follow_the_reset_purification_procedure
command(nazirite_made_unclean_must_follow_the_reset_purification_procedure).
command_title(nazirite_made_unclean_must_follow_the_reset_purification_procedure, 'Numbers 6:9-12 - Nazirite made unclean must follow the reset purification procedure.').
normal_obedience(nazirite_made_unclean_must_follow_the_reset_purification_procedure, 'Nazirite made unclean must follow the reset purification procedure.').
concerns(nazirite_made_unclean_must_follow_the_reset_purification_procedure, vow_separation).
scripture_reference(nazirite_made_unclean_must_follow_the_reset_purification_procedure, 'Numbers 6:9-12').
source_term(nazirite_made_unclean_must_follow_the_reset_purification_procedure, hebrew, nazir, 'one separated or consecrated by Nazirite vow').
source_term(nazirite_made_unclean_must_follow_the_reset_purification_procedure, hebrew, tame, 'unclean or ritually defiled; accidental defilement resets the Nazirite procedure').
study_note(nazirite_made_unclean_must_follow_the_reset_purification_procedure, 'This command governs vowed separation and spoken obligation so voluntary devotion is handled with care before YHWH: Nazirite made unclean must follow the reset purification procedure.').

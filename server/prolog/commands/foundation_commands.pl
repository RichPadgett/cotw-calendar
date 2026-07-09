% =============================================================================
% Command Group: Foundation Commands
% Author: rpadgett
%
% App-ready command resources for daily Torah command reminders.
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
% story_reference(command_key, 'Book 1:1-2', 'Short label for where the command is seen practiced or enforced.').
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
% story_reference(do_not_destroy_the_edge_of_the_beard, 'Example 1:1-2', 'Optional Tanakh story reference where this command is seen in practice.').
% source_term(do_not_destroy_the_edge_of_the_beard, hebrew, shachath, 'mar / ruin / destroy').
% translation_note(do_not_destroy_the_edge_of_the_beard, 'KJV says, "neither shalt thou mar the corners of thy beard."').
% clarification_note(do_not_destroy_the_edge_of_the_beard, 'The Hebrew shachath means to spoil, ruin, corrupt, or destroy; this supports wording the command as destruction of the beard edge rather than a broad ban on all trimming.').
% study_note(do_not_destroy_the_edge_of_the_beard, 'Catalog wording stays close to the source-language action word and avoids adding a man-made fence.').

% Command: keep_yhwhs_appointed_times
command(keep_yhwhs_appointed_times).
command_title(keep_yhwhs_appointed_times, 'Lev 23:1-4 - Keep YHWH''s appointed times.').
normal_obedience(keep_yhwhs_appointed_times, 'Treat YHWH''s appointed times as sacred convocations.').
concerns(keep_yhwhs_appointed_times, appointed_times).
scripture_reference(keep_yhwhs_appointed_times, 'Leviticus 23:1-4').
story_reference(keep_yhwhs_appointed_times, '2 Chronicles 8:12-13', 'Solomon offers according to the daily, Sabbath, new moon, and appointed feast order.').
source_term(keep_yhwhs_appointed_times, hebrew, moed, 'appointed time, meeting, or fixed season set by YHWH').
source_term(keep_yhwhs_appointed_times, hebrew, miqra_qodesh, 'holy convocation or sacred assembly called for worship and remembrance').
study_note(keep_yhwhs_appointed_times, 'The appointed times are introduced as YHWH''s feasts and holy convocations.').

% Command: follow_appointed_calendar_rhythm
command(follow_appointed_calendar_rhythm).
command_title(follow_appointed_calendar_rhythm, 'Exo 12:1-2 - Follow the appointed calendar rhythm.').
normal_obedience(follow_appointed_calendar_rhythm, 'Recognize that appointed times are tied to set days and months.').
concerns(follow_appointed_calendar_rhythm, appointed_times).
scripture_reference(follow_appointed_calendar_rhythm, 'Exodus 12:1-2').
scripture_reference(follow_appointed_calendar_rhythm, 'Leviticus 23').
scripture_reference(follow_appointed_calendar_rhythm, 'Numbers 28-29').
source_term(follow_appointed_calendar_rhythm, hebrew, chodesh, 'month or new moon/month cycle; Exodus 12 marks the head of months for Israel').
study_note(follow_appointed_calendar_rhythm, 'The calendar rhythm gives the app its structure for remembering appointed days.').

% Command: observe_weekly_sabbath
command(observe_weekly_sabbath).
command_title(observe_weekly_sabbath, 'Exo 20:8-11 - Remember the Sabbath day.').
normal_obedience(observe_weekly_sabbath, 'Rest on the seventh day and do no ordinary work.').
concerns(observe_weekly_sabbath, sabbath_rest).
scripture_reference(observe_weekly_sabbath, 'Exodus 20:8-11').
scripture_reference(observe_weekly_sabbath, 'Exodus 31:12-17').
scripture_reference(observe_weekly_sabbath, 'Leviticus 23:3').
scripture_reference(observe_weekly_sabbath, 'Deuteronomy 5:12-15').
story_reference(observe_weekly_sabbath, 'Exodus 16:22-30', 'Israel gathers a double portion before the Sabbath and rests on the seventh day.').
story_reference(observe_weekly_sabbath, 'Nehemiah 13:15-22', 'Nehemiah corrects buying, selling, and burden-bearing on the Sabbath.').
source_term(observe_weekly_sabbath, hebrew, zakar, 'to remember, call to mind, or mark; Exodus says to remember the Sabbath day').
source_term(observe_weekly_sabbath, hebrew, shabbat, 'Sabbath or cessation from ordinary work on the seventh day').
source_term(observe_weekly_sabbath, hebrew, melakah, 'work, occupation, or craftsmanship; the Sabbath command restricts ordinary work').
study_note(observe_weekly_sabbath, 'Weekly Sabbath rest is a recurring command of remembrance and covenant rhythm.').

% Command: sabbath_as_covenant_sign
command(sabbath_as_covenant_sign).
command_title(sabbath_as_covenant_sign, 'Exo 31:13 - Sabbath is a sign.').
normal_obedience(sabbath_as_covenant_sign, 'Remember Sabbath as a covenant sign between YHWH and His people.').
concerns(sabbath_as_covenant_sign, sabbath_rest).
scripture_reference(sabbath_as_covenant_sign, 'Exodus 31:13').
scripture_reference(sabbath_as_covenant_sign, 'Exodus 31:16-17').
source_term(sabbath_as_covenant_sign, hebrew, oth, 'sign, mark, or token; Sabbath is called a covenant sign').
source_term(sabbath_as_covenant_sign, hebrew, qadash, 'to set apart, consecrate, or sanctify; Sabbath teaches that YHWH sanctifies His people').
study_note(sabbath_as_covenant_sign, 'The Sabbath sign teaches remembrance, identity, and sanctification.').

% Command: do_not_kindle_fire_on_sabbath
command(do_not_kindle_fire_on_sabbath).
command_title(do_not_kindle_fire_on_sabbath, 'Exo 35:3 - Do not kindle fire on Sabbath.').
normal_obedience(do_not_kindle_fire_on_sabbath, 'Do not kindle fire in dwellings on the Sabbath.').
concerns(do_not_kindle_fire_on_sabbath, sabbath_rest).
scripture_reference(do_not_kindle_fire_on_sabbath, 'Exodus 35:3').
source_term(do_not_kindle_fire_on_sabbath, hebrew, baar, 'to burn, consume, or kindle; used here for kindling fire on Sabbath').
source_term(do_not_kindle_fire_on_sabbath, hebrew, moshav, 'dwelling place or settlement; the command names fire in your dwellings').
study_note(do_not_kindle_fire_on_sabbath, 'This command belongs to the practical boundaries around Sabbath rest.').

% -----------------------------------------------------------------------------
% Additional Appointed Time Commands
% -----------------------------------------------------------------------------

% Command: do_not_go_out_to_gather_manna_on_the_sabbath
command(do_not_go_out_to_gather_manna_on_the_sabbath).
command_title(do_not_go_out_to_gather_manna_on_the_sabbath, 'Exodus 16:29 - Do not go out to gather manna on the Sabbath.').
normal_obedience(do_not_go_out_to_gather_manna_on_the_sabbath, 'Do not go out to gather manna on the Sabbath.').
concerns(do_not_go_out_to_gather_manna_on_the_sabbath, appointed_times).
scripture_reference(do_not_go_out_to_gather_manna_on_the_sabbath, 'Exodus 16:29').
study_note(do_not_go_out_to_gather_manna_on_the_sabbath, 'This command anchors appointed time practice in the dates and rhythms given by Torah: Do not go out to gather manna on the Sabbath.').

% Command: prepare_the_sabbath_portion_before_sabbath_in_the_manna_context
command(prepare_the_sabbath_portion_before_sabbath_in_the_manna_context).
command_title(prepare_the_sabbath_portion_before_sabbath_in_the_manna_context, 'Exodus 16:23 - Prepare the Sabbath portion before Sabbath in the manna context.').
normal_obedience(prepare_the_sabbath_portion_before_sabbath_in_the_manna_context, 'Prepare the Sabbath portion before Sabbath in the manna context.').
concerns(prepare_the_sabbath_portion_before_sabbath_in_the_manna_context, appointed_times).
scripture_reference(prepare_the_sabbath_portion_before_sabbath_in_the_manna_context, 'Exodus 16:23').
study_note(prepare_the_sabbath_portion_before_sabbath_in_the_manna_context, 'This command anchors appointed time practice in the dates and rhythms given by Torah: Prepare the Sabbath portion before Sabbath in the manna context.').

% Command: do_not_do_work_on_the_sabbath
command(do_not_do_work_on_the_sabbath).
command_title(do_not_do_work_on_the_sabbath, 'Exodus 20:10 - Do not do work on the Sabbath.').
normal_obedience(do_not_do_work_on_the_sabbath, 'Do not do work on the Sabbath.').
concerns(do_not_do_work_on_the_sabbath, appointed_times).
scripture_reference(do_not_do_work_on_the_sabbath, 'Exodus 20:10').
scripture_reference(do_not_do_work_on_the_sabbath, 'Deuteronomy 5:14').
source_term(do_not_do_work_on_the_sabbath, hebrew, melakah, 'ordinary work, labor, or craftsmanship restricted on Sabbath').
study_note(do_not_do_work_on_the_sabbath, 'This command anchors appointed time practice in the dates and rhythms given by Torah: Do not do work on the Sabbath.').

% Command: let_son_daughter_servants_animals_and_stranger_rest_on_sabbath
command(let_son_daughter_servants_animals_and_stranger_rest_on_sabbath).
command_title(let_son_daughter_servants_animals_and_stranger_rest_on_sabbath, 'Exodus 20:10 - Let son, daughter, servants, animals, and stranger rest on Sabbath.').
normal_obedience(let_son_daughter_servants_animals_and_stranger_rest_on_sabbath, 'Let son, daughter, servants, animals, and stranger rest on Sabbath.').
concerns(let_son_daughter_servants_animals_and_stranger_rest_on_sabbath, appointed_times).
scripture_reference(let_son_daughter_servants_animals_and_stranger_rest_on_sabbath, 'Exodus 20:10').
scripture_reference(let_son_daughter_servants_animals_and_stranger_rest_on_sabbath, 'Deuteronomy 5:14').
source_term(let_son_daughter_servants_animals_and_stranger_rest_on_sabbath, hebrew, nuach, 'to rest, settle, or be given relief; Sabbath rest extends to household, animals, and stranger').
source_term(let_son_daughter_servants_animals_and_stranger_rest_on_sabbath, hebrew, ger, 'sojourner or stranger within the gates, included in Sabbath rest').
study_note(let_son_daughter_servants_animals_and_stranger_rest_on_sabbath, 'This command anchors appointed time practice in the dates and rhythms given by Torah: Let son, daughter, servants, animals, and stranger rest on Sabbath.').

% Command: keep_the_sabbath_throughout_generations_as_a_covenant
command(keep_the_sabbath_throughout_generations_as_a_covenant).
command_title(keep_the_sabbath_throughout_generations_as_a_covenant, 'Exodus 31:16 - Keep the Sabbath throughout generations as a covenant.').
normal_obedience(keep_the_sabbath_throughout_generations_as_a_covenant, 'Keep the Sabbath throughout generations as a covenant.').
concerns(keep_the_sabbath_throughout_generations_as_a_covenant, appointed_times).
scripture_reference(keep_the_sabbath_throughout_generations_as_a_covenant, 'Exodus 31:16').
study_note(keep_the_sabbath_throughout_generations_as_a_covenant, 'This command anchors appointed time practice in the dates and rhythms given by Torah: Keep the Sabbath throughout generations as a covenant.').

% Command: keep_the_sabbath_as_a_sign
command(keep_the_sabbath_as_a_sign).
command_title(keep_the_sabbath_as_a_sign, 'Exodus 31:13 - Keep the Sabbath as a sign.').
normal_obedience(keep_the_sabbath_as_a_sign, 'Keep the Sabbath as a sign.').
concerns(keep_the_sabbath_as_a_sign, appointed_times).
scripture_reference(keep_the_sabbath_as_a_sign, 'Exodus 31:13').
study_note(keep_the_sabbath_as_a_sign, 'This command anchors appointed time practice in the dates and rhythms given by Torah: Keep the Sabbath as a sign.').

% Command: keep_yom_teruah_as_a_memorial_of_blowing
command(keep_yom_teruah_as_a_memorial_of_blowing).
command_title(keep_yom_teruah_as_a_memorial_of_blowing, 'Leviticus 23:24 - Keep Yom Teruah as a memorial of blowing.').
normal_obedience(keep_yom_teruah_as_a_memorial_of_blowing, 'Keep Yom Teruah as a memorial of blowing.').
concerns(keep_yom_teruah_as_a_memorial_of_blowing, appointed_times).
scripture_reference(keep_yom_teruah_as_a_memorial_of_blowing, 'Leviticus 23:24').
source_term(keep_yom_teruah_as_a_memorial_of_blowing, hebrew, teruah, 'alarm, shout, blast, or loud sounding associated with the day').
source_term(keep_yom_teruah_as_a_memorial_of_blowing, hebrew, zikron, 'memorial or remembrance; the day is a memorial of sounding').
study_note(keep_yom_teruah_as_a_memorial_of_blowing, 'This command anchors appointed time practice in the dates and rhythms given by Torah: Keep Yom Teruah as a memorial of blowing.').

% Command: do_no_ordinary_work_on_yom_teruah
command(do_no_ordinary_work_on_yom_teruah).
command_title(do_no_ordinary_work_on_yom_teruah, 'Leviticus 23:25 - Do no ordinary work on Yom Teruah.').
normal_obedience(do_no_ordinary_work_on_yom_teruah, 'Do no ordinary work on Yom Teruah.').
concerns(do_no_ordinary_work_on_yom_teruah, appointed_times).
scripture_reference(do_no_ordinary_work_on_yom_teruah, 'Leviticus 23:25').
scripture_reference(do_no_ordinary_work_on_yom_teruah, 'Numbers 29:1').
study_note(do_no_ordinary_work_on_yom_teruah, 'This command anchors appointed time practice in the dates and rhythms given by Torah: Do no ordinary work on Yom Teruah.').

% Command: afflict_yourselves_on_the_day_of_atonement
command(afflict_yourselves_on_the_day_of_atonement).
command_title(afflict_yourselves_on_the_day_of_atonement, 'Leviticus 23:27 - Afflict yourselves on the Day of Atonement.').
normal_obedience(afflict_yourselves_on_the_day_of_atonement, 'Afflict yourselves on the Day of Atonement.').
concerns(afflict_yourselves_on_the_day_of_atonement, appointed_times).
scripture_reference(afflict_yourselves_on_the_day_of_atonement, 'Leviticus 23:27').
scripture_reference(afflict_yourselves_on_the_day_of_atonement, 'Numbers 29:7').
source_term(afflict_yourselves_on_the_day_of_atonement, hebrew, anah, 'to afflict, humble, bow down, or deny oneself').
source_term(afflict_yourselves_on_the_day_of_atonement, hebrew, kippurim, 'atonements; the day centers on covering, purging, and reconciliation before YHWH').
study_note(afflict_yourselves_on_the_day_of_atonement, 'This command anchors appointed time practice in the dates and rhythms given by Torah: Afflict yourselves on the Day of Atonement.').

% Command: do_no_work_at_all_on_the_day_of_atonement
command(do_no_work_at_all_on_the_day_of_atonement).
command_title(do_no_work_at_all_on_the_day_of_atonement, 'Leviticus 23:28 - Do no work at all on the Day of Atonement.').
normal_obedience(do_no_work_at_all_on_the_day_of_atonement, 'Do no work at all on the Day of Atonement.').
concerns(do_no_work_at_all_on_the_day_of_atonement, appointed_times).
scripture_reference(do_no_work_at_all_on_the_day_of_atonement, 'Leviticus 23:28').
study_note(do_no_work_at_all_on_the_day_of_atonement, 'This command anchors appointed time practice in the dates and rhythms given by Torah: Do no work at all on the Day of Atonement.').

% Command: observe_the_day_of_atonement_from_evening_to_evening
command(observe_the_day_of_atonement_from_evening_to_evening).
command_title(observe_the_day_of_atonement_from_evening_to_evening, 'Leviticus 23:32 - Observe the Day of Atonement from evening to evening.').
normal_obedience(observe_the_day_of_atonement_from_evening_to_evening, 'Observe the Day of Atonement from evening to evening.').
concerns(observe_the_day_of_atonement_from_evening_to_evening, appointed_times).
scripture_reference(observe_the_day_of_atonement_from_evening_to_evening, 'Leviticus 23:32').
study_note(observe_the_day_of_atonement_from_evening_to_evening, 'This command anchors appointed time practice in the dates and rhythms given by Torah: Observe the Day of Atonement from evening to evening.').
clarification_note(observe_the_day_of_atonement_from_evening_to_evening, 'Day of Atonement begins on the evening of the 9th all the way to the evening of the 10th. This fortifies that the biblical day begins at dawn as it is still the 9th when it is evening.').

% Command: take_fruit_of_splendid_trees_and_branches_for_booths
command(take_fruit_of_splendid_trees_and_branches_for_booths).
command_title(take_fruit_of_splendid_trees_and_branches_for_booths, 'Leviticus 23:40 - Take fruit of splendid trees and branches for Booths.').
normal_obedience(take_fruit_of_splendid_trees_and_branches_for_booths, 'Take fruit of splendid trees and branches for Booths.').
concerns(take_fruit_of_splendid_trees_and_branches_for_booths, appointed_times).
scripture_reference(take_fruit_of_splendid_trees_and_branches_for_booths, 'Leviticus 23:40').
source_term(take_fruit_of_splendid_trees_and_branches_for_booths, hebrew, peri_ets_hadar, 'fruit of splendid or beautiful trees in the Booths command').
source_term(take_fruit_of_splendid_trees_and_branches_for_booths, hebrew, aravah, 'willow or brook branch named among the Booths branches').
study_note(take_fruit_of_splendid_trees_and_branches_for_booths, 'This command anchors appointed time practice in the dates and rhythms given by Torah: Take fruit of splendid trees and branches for Booths.').

% Command: dwell_in_booths_seven_days_2
command(dwell_in_booths_seven_days_2).
command_title(dwell_in_booths_seven_days_2, 'Leviticus 23:42 - Dwell in booths seven days.').
normal_obedience(dwell_in_booths_seven_days_2, 'Dwell in booths seven days.').
concerns(dwell_in_booths_seven_days_2, appointed_times).
scripture_reference(dwell_in_booths_seven_days_2, 'Leviticus 23:42').
source_term(dwell_in_booths_seven_days_2, hebrew, sukkah, 'booth, hut, or temporary shelter; Israel dwells in booths to remember wilderness provision').
study_note(dwell_in_booths_seven_days_2, 'This command anchors appointed time practice in the dates and rhythms given by Torah: Dwell in booths seven days.').

% Command: rejoice_at_the_appointed_feasts_with_household_and_vulnerable_neighbors
command(rejoice_at_the_appointed_feasts_with_household_and_vulnerable_neighbors).
command_title(rejoice_at_the_appointed_feasts_with_household_and_vulnerable_neighbors, 'Deuteronomy 16:11, 14 - Rejoice at the appointed feasts with household and vulnerable neighbors.').
normal_obedience(rejoice_at_the_appointed_feasts_with_household_and_vulnerable_neighbors, 'Rejoice at the appointed feasts with household and vulnerable neighbors.').
concerns(rejoice_at_the_appointed_feasts_with_household_and_vulnerable_neighbors, appointed_times).
scripture_reference(rejoice_at_the_appointed_feasts_with_household_and_vulnerable_neighbors, 'Deuteronomy 16:11, 14').
study_note(rejoice_at_the_appointed_feasts_with_household_and_vulnerable_neighbors, 'This command anchors appointed time practice in the dates and rhythms given by Torah: Rejoice at the appointed feasts with household and vulnerable neighbors.').

% Command: appear_before_yhwh_at_the_three_pilgrimage_feasts
command(appear_before_yhwh_at_the_three_pilgrimage_feasts).
command_title(appear_before_yhwh_at_the_three_pilgrimage_feasts, 'Deuteronomy 16:16 - Appear before YHWH at the three pilgrimage feasts.').
normal_obedience(appear_before_yhwh_at_the_three_pilgrimage_feasts, 'Appear before YHWH at the three pilgrimage feasts.').
concerns(appear_before_yhwh_at_the_three_pilgrimage_feasts, appointed_times).
scripture_reference(appear_before_yhwh_at_the_three_pilgrimage_feasts, 'Deuteronomy 16:16').
study_note(appear_before_yhwh_at_the_three_pilgrimage_feasts, 'This command anchors appointed time practice in the dates and rhythms given by Torah: Appear before YHWH at the three pilgrimage feasts.').

% Command: do_not_appear_before_yhwh_empty_handed_at_the_pilgrimage_feasts
command(do_not_appear_before_yhwh_empty_handed_at_the_pilgrimage_feasts).
command_title(do_not_appear_before_yhwh_empty_handed_at_the_pilgrimage_feasts, 'Deuteronomy 16:16-17 - Do not appear before YHWH empty-handed at the pilgrimage feasts.').
normal_obedience(do_not_appear_before_yhwh_empty_handed_at_the_pilgrimage_feasts, 'Do not appear before YHWH empty-handed at the pilgrimage feasts.').
concerns(do_not_appear_before_yhwh_empty_handed_at_the_pilgrimage_feasts, appointed_times).
scripture_reference(do_not_appear_before_yhwh_empty_handed_at_the_pilgrimage_feasts, 'Deuteronomy 16:16-17').
study_note(do_not_appear_before_yhwh_empty_handed_at_the_pilgrimage_feasts, 'This command anchors appointed time practice in the dates and rhythms given by Torah: Do not appear before YHWH empty-handed at the pilgrimage feasts.').

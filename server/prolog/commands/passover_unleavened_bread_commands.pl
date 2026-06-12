% =============================================================================
% Command Group: Passover and Unleavened Bread
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

% Command: keep_passover
command(keep_passover).
command_title(keep_passover, 'Exo 12:1-14 - Keep Passover at its appointed time.').
normal_obedience(keep_passover, 'Observe Passover at its appointed time as a memorial of deliverance.').
concerns(keep_passover, passover_memorial).
scripture_reference(keep_passover, 'Exodus 12:1-14').
scripture_reference(keep_passover, 'Leviticus 23:5').
scripture_reference(keep_passover, 'Numbers 9:1-14').
scripture_reference(keep_passover, 'Deuteronomy 16:1-2').
story_reference(keep_passover, 'Numbers 9:1-5', 'Israel keeps Passover in the wilderness according to the command.').
story_reference(keep_passover, 'Joshua 5:10', 'Israel keeps Passover at Gilgal after entering the land.').
story_reference(keep_passover, '2 Kings 23:21-23', 'Josiah commands the people to keep Passover according to the book of the covenant.').
story_reference(keep_passover, '2 Chronicles 35:1-19', 'Josiah keeps Passover with priests, Levites, and the people in order.').
story_reference(keep_passover, 'Ezra 6:19-22', 'The returned exiles keep Passover after the temple is rebuilt.').
study_note(keep_passover, 'Passover anchors the remembrance of deliverance and covenant identity.').

% Command: passover_lamb_without_blemish
command(passover_lamb_without_blemish).
command_title(passover_lamb_without_blemish, 'Exo 12:3-6 - Select the Passover lamb.').
normal_obedience(passover_lamb_without_blemish, 'Select and slaughter a lamb or goat without blemish for Passover.').
concerns(passover_lamb_without_blemish, passover_memorial).
scripture_reference(passover_lamb_without_blemish, 'Exodus 12:3-6').
story_reference(passover_lamb_without_blemish, '2 Chronicles 35:7-9', 'Josiah and the leaders provide lambs, kids, and bulls for the Passover offerings.').
study_note(passover_lamb_without_blemish, 'The lamb command is central to the original Passover memorial.').

% Command: eat_passover_with_unleavened_bread_and_bitter_herbs
command(eat_passover_with_unleavened_bread_and_bitter_herbs).
command_title(eat_passover_with_unleavened_bread_and_bitter_herbs, 'Exo 12:8 - Eat Passover with unleavened bread and bitter herbs.').
normal_obedience(eat_passover_with_unleavened_bread_and_bitter_herbs, 'Eat the Passover meal with unleavened bread and bitter herbs.').
concerns(eat_passover_with_unleavened_bread_and_bitter_herbs, passover_memorial).
scripture_reference(eat_passover_with_unleavened_bread_and_bitter_herbs, 'Exodus 12:8').
story_reference(eat_passover_with_unleavened_bread_and_bitter_herbs, '2 Chronicles 35:13', 'The Passover is prepared according to the ordinance for the people.').
study_note(eat_passover_with_unleavened_bread_and_bitter_herbs, 'The meal elements teach remembrance through embodied participation.').

% Command: roast_passover_with_fire
command(roast_passover_with_fire).
command_title(roast_passover_with_fire, 'Exo 12:9 - Roast the Passover with fire.').
normal_obedience(roast_passover_with_fire, 'Do not eat Passover raw or boiled; roast it with fire.').
concerns(roast_passover_with_fire, passover_memorial).
scripture_reference(roast_passover_with_fire, 'Exodus 12:9').
study_note(roast_passover_with_fire, 'The preparation details preserve the commanded form of the Passover meal.').

% Command: burn_passover_leftovers
command(burn_passover_leftovers).
command_title(burn_passover_leftovers, 'Exo 12:10 - Do not leave Passover until morning.').
normal_obedience(burn_passover_leftovers, 'Burn what remains of the Passover by morning.').
concerns(burn_passover_leftovers, passover_memorial).
scripture_reference(burn_passover_leftovers, 'Exodus 12:10').
scripture_reference(burn_passover_leftovers, 'Deuteronomy 16:4').
study_note(burn_passover_leftovers, 'This command protects the integrity of the Passover observance.').

% Command: eat_passover_in_readiness
command(eat_passover_in_readiness).
command_title(eat_passover_in_readiness, 'Exo 12:11 - Eat Passover in readiness.').
normal_obedience(eat_passover_in_readiness, 'Eat with loins girded, sandals on, and staff in hand.').
concerns(eat_passover_in_readiness, passover_memorial).
scripture_reference(eat_passover_in_readiness, 'Exodus 12:11').
study_note(eat_passover_in_readiness, 'Readiness teaches the urgency of deliverance.').

% Command: passover_participation_boundary
command(passover_participation_boundary).
command_title(passover_participation_boundary, 'Exo 12:43-49 - Passover participation boundary.').
normal_obedience(passover_participation_boundary, 'Recognize the Torah boundary for who may eat Passover.').
concerns(passover_participation_boundary, passover_memorial).
scripture_reference(passover_participation_boundary, 'Exodus 12:43-49').
study_note(passover_participation_boundary, 'The Passover meal includes covenant participation boundaries in the Torah text.').

% Command: remove_leaven
command(remove_leaven).
command_title(remove_leaven, 'Exo 12:15 - Remove leaven.').
normal_obedience(remove_leaven, 'Remove leaven from houses during the appointed feast.').
concerns(remove_leaven, unleavened_bread_obedience).
scripture_reference(remove_leaven, 'Exodus 12:15').
scripture_reference(remove_leaven, 'Exodus 12:19').
scripture_reference(remove_leaven, 'Exodus 13:7').
scripture_reference(remove_leaven, 'Deuteronomy 16:4').
story_reference(remove_leaven, '2 Chronicles 30:21', 'Hezekiah and the assembly keep the Feast of Unleavened Bread seven days.').
story_reference(remove_leaven, 'Ezra 6:22', 'The returned exiles keep the Feast of Unleavened Bread seven days.').
study_note(remove_leaven, 'Removing leaven is a concrete household expression of the feast.').

% Command: do_not_eat_leaven_during_feast
command(do_not_eat_leaven_during_feast).
command_title(do_not_eat_leaven_during_feast, 'Exo 12:15 - Do not eat leaven during the feast.').
normal_obedience(do_not_eat_leaven_during_feast, 'Do not eat leavened bread during the seven days.').
concerns(do_not_eat_leaven_during_feast, unleavened_bread_obedience).
scripture_reference(do_not_eat_leaven_during_feast, 'Exodus 12:15').
scripture_reference(do_not_eat_leaven_during_feast, 'Exodus 12:19-20').
scripture_reference(do_not_eat_leaven_during_feast, 'Exodus 13:3').
scripture_reference(do_not_eat_leaven_during_feast, 'Deuteronomy 16:3-4').
story_reference(do_not_eat_leaven_during_feast, 'Joshua 5:11', 'Israel eats unleavened cakes from the produce of the land after Passover.').
story_reference(do_not_eat_leaven_during_feast, '2 Chronicles 30:21', 'The assembly keeps the Feast of Unleavened Bread with gladness.').
study_note(do_not_eat_leaven_during_feast, 'The prohibition frames the seven-day feast as a distinct embodied practice.').

% Command: eat_unleavened_bread_seven_days
command(eat_unleavened_bread_seven_days).
command_title(eat_unleavened_bread_seven_days, 'Exo 12:15 - Eat unleavened bread seven days.').
normal_obedience(eat_unleavened_bread_seven_days, 'Eat unleavened bread throughout the Feast of Unleavened Bread.').
concerns(eat_unleavened_bread_seven_days, unleavened_bread_obedience).
scripture_reference(eat_unleavened_bread_seven_days, 'Exodus 12:15').
scripture_reference(eat_unleavened_bread_seven_days, 'Exodus 12:18').
scripture_reference(eat_unleavened_bread_seven_days, 'Exodus 13:6-7').
scripture_reference(eat_unleavened_bread_seven_days, 'Leviticus 23:6').
scripture_reference(eat_unleavened_bread_seven_days, 'Numbers 28:17').
scripture_reference(eat_unleavened_bread_seven_days, 'Deuteronomy 16:3').
story_reference(eat_unleavened_bread_seven_days, 'Joshua 5:10-12', 'Israel keeps Passover and eats unleavened cakes from the produce of the land.').
story_reference(eat_unleavened_bread_seven_days, '2 Chronicles 30:21', 'Hezekiah and the assembly keep the Feast of Unleavened Bread with joy.').
story_reference(eat_unleavened_bread_seven_days, 'Ezra 6:21-22', 'The returned exiles keep Passover and the Feast of Unleavened Bread.').
study_note(eat_unleavened_bread_seven_days, 'This is the specific positive requirement to eat unleavened bread during the seven-day feast.').

% Command: first_day_unleavened_bread_assembly
command(first_day_unleavened_bread_assembly).
command_title(first_day_unleavened_bread_assembly, 'Lev 23:7 - First day sacred assembly.').
normal_obedience(first_day_unleavened_bread_assembly, 'Hold a sacred assembly and do no ordinary work on the first day.').
concerns(first_day_unleavened_bread_assembly, sacred_assembly).
scripture_reference(first_day_unleavened_bread_assembly, 'Exodus 12:16').
scripture_reference(first_day_unleavened_bread_assembly, 'Leviticus 23:7').
scripture_reference(first_day_unleavened_bread_assembly, 'Numbers 28:18').
story_reference(first_day_unleavened_bread_assembly, '2 Chronicles 30:13', 'A very great assembly gathers in Jerusalem for the Feast of Unleavened Bread.').
study_note(first_day_unleavened_bread_assembly, 'The first day of the feast is set apart as a sacred assembly.').

% Command: seventh_day_unleavened_bread_assembly
command(seventh_day_unleavened_bread_assembly).
command_title(seventh_day_unleavened_bread_assembly, 'Lev 23:8 - Seventh day sacred assembly.').
normal_obedience(seventh_day_unleavened_bread_assembly, 'Hold a sacred assembly and do no ordinary work on the seventh day.').
concerns(seventh_day_unleavened_bread_assembly, sacred_assembly).
scripture_reference(seventh_day_unleavened_bread_assembly, 'Exodus 12:16').
scripture_reference(seventh_day_unleavened_bread_assembly, 'Leviticus 23:8').
scripture_reference(seventh_day_unleavened_bread_assembly, 'Numbers 28:25').
study_note(seventh_day_unleavened_bread_assembly, 'The seventh day closes the feast with sacred assembly and rest from ordinary work.').

% Command: tell_children_passover_meaning
command(tell_children_passover_meaning).
command_title(tell_children_passover_meaning, 'Exo 13:8 - Tell children the meaning.').
normal_obedience(tell_children_passover_meaning, 'Teach children the memorial of deliverance.').
concerns(tell_children_passover_meaning, teach_children_torah).
scripture_reference(tell_children_passover_meaning, 'Exodus 12:26-27').
scripture_reference(tell_children_passover_meaning, 'Exodus 13:8').
scripture_reference(tell_children_passover_meaning, 'Exodus 13:14-16').
story_reference(tell_children_passover_meaning, 'Joshua 4:21-24', 'Joshua models memorial teaching by explaining YHWH''s deliverance to the children.').
study_note(tell_children_passover_meaning, 'The feast includes teaching the next generation why the observance matters.').

% -----------------------------------------------------------------------------
% Additional Passover Commands
% -----------------------------------------------------------------------------

% Command: choose_the_passover_lamb_on_the_tenth_day
command(choose_the_passover_lamb_on_the_tenth_day).
command_title(choose_the_passover_lamb_on_the_tenth_day, 'Exodus 12:3 - Choose the Passover lamb on the tenth day.').
normal_obedience(choose_the_passover_lamb_on_the_tenth_day, 'Choose the Passover lamb on the tenth day.').
concerns(choose_the_passover_lamb_on_the_tenth_day, passover_memorial).
scripture_reference(choose_the_passover_lamb_on_the_tenth_day, 'Exodus 12:3').
study_note(choose_the_passover_lamb_on_the_tenth_day, 'This command preserves Passover as a memorial of deliverance and keeps its details tied to the written Torah: Choose the Passover lamb on the tenth day.').

% Command: keep_the_passover_lamb_until_the_fourteenth_day
command(keep_the_passover_lamb_until_the_fourteenth_day).
command_title(keep_the_passover_lamb_until_the_fourteenth_day, 'Exodus 12:6 - Keep the Passover lamb until the fourteenth day.').
normal_obedience(keep_the_passover_lamb_until_the_fourteenth_day, 'Keep the Passover lamb until the fourteenth day.').
concerns(keep_the_passover_lamb_until_the_fourteenth_day, passover_memorial).
scripture_reference(keep_the_passover_lamb_until_the_fourteenth_day, 'Exodus 12:6').
study_note(keep_the_passover_lamb_until_the_fourteenth_day, 'This command preserves Passover as a memorial of deliverance and keeps its details tied to the written Torah: Keep the Passover lamb until the fourteenth day.').

% Command: slaughter_the_passover_at_twilight_on_the_appointed_day
command(slaughter_the_passover_at_twilight_on_the_appointed_day).
command_title(slaughter_the_passover_at_twilight_on_the_appointed_day, 'Exodus 12:6 - Slaughter the Passover at twilight on the appointed day.').
normal_obedience(slaughter_the_passover_at_twilight_on_the_appointed_day, 'Slaughter the Passover at twilight on the appointed day.').
concerns(slaughter_the_passover_at_twilight_on_the_appointed_day, passover_memorial).
scripture_reference(slaughter_the_passover_at_twilight_on_the_appointed_day, 'Exodus 12:6').
scripture_reference(slaughter_the_passover_at_twilight_on_the_appointed_day, 'Deuteronomy 16:6').
study_note(slaughter_the_passover_at_twilight_on_the_appointed_day, 'This command preserves Passover as a memorial of deliverance and keeps its details tied to the written Torah: Slaughter the Passover at twilight on the appointed day.').

% Command: put_passover_blood_on_the_doorposts_and_lintel_in_the_exodus_context
command(put_passover_blood_on_the_doorposts_and_lintel_in_the_exodus_context).
command_title(put_passover_blood_on_the_doorposts_and_lintel_in_the_exodus_context, 'Exodus 12:7 - Put Passover blood on the doorposts and lintel in the Exodus context.').
normal_obedience(put_passover_blood_on_the_doorposts_and_lintel_in_the_exodus_context, 'Put Passover blood on the doorposts and lintel in the Exodus context.').
concerns(put_passover_blood_on_the_doorposts_and_lintel_in_the_exodus_context, passover_memorial).
scripture_reference(put_passover_blood_on_the_doorposts_and_lintel_in_the_exodus_context, 'Exodus 12:7').
study_note(put_passover_blood_on_the_doorposts_and_lintel_in_the_exodus_context, 'This command preserves Passover as a memorial of deliverance and keeps its details tied to the written Torah: Put Passover blood on the doorposts and lintel in the Exodus context.').

% Command: eat_the_passover_with_loins_girded_sandals_on_and_staff_in_hand
command(eat_the_passover_with_loins_girded_sandals_on_and_staff_in_hand).
command_title(eat_the_passover_with_loins_girded_sandals_on_and_staff_in_hand, 'Exodus 12:11 - Eat the Passover with loins girded, sandals on, and staff in hand.').
normal_obedience(eat_the_passover_with_loins_girded_sandals_on_and_staff_in_hand, 'Eat the Passover with loins girded, sandals on, and staff in hand.').
concerns(eat_the_passover_with_loins_girded_sandals_on_and_staff_in_hand, passover_memorial).
scripture_reference(eat_the_passover_with_loins_girded_sandals_on_and_staff_in_hand, 'Exodus 12:11').
study_note(eat_the_passover_with_loins_girded_sandals_on_and_staff_in_hand, 'This command preserves Passover as a memorial of deliverance and keeps its details tied to the written Torah: Eat the Passover with loins girded, sandals on, and staff in hand.').

% Command: do_not_eat_the_passover_raw
command(do_not_eat_the_passover_raw).
command_title(do_not_eat_the_passover_raw, 'Exodus 12:9 - Do not eat the Passover raw.').
normal_obedience(do_not_eat_the_passover_raw, 'Do not eat the Passover raw.').
concerns(do_not_eat_the_passover_raw, passover_memorial).
scripture_reference(do_not_eat_the_passover_raw, 'Exodus 12:9').
study_note(do_not_eat_the_passover_raw, 'This command preserves Passover as a memorial of deliverance and keeps its details tied to the written Torah: Do not eat the Passover raw.').

% Command: do_not_eat_the_passover_boiled_in_water
command(do_not_eat_the_passover_boiled_in_water).
command_title(do_not_eat_the_passover_boiled_in_water, 'Exodus 12:9 - Do not eat the Passover boiled in water.').
normal_obedience(do_not_eat_the_passover_boiled_in_water, 'Do not eat the Passover boiled in water.').
concerns(do_not_eat_the_passover_boiled_in_water, passover_memorial).
scripture_reference(do_not_eat_the_passover_boiled_in_water, 'Exodus 12:9').
study_note(do_not_eat_the_passover_boiled_in_water, 'This command preserves Passover as a memorial of deliverance and keeps its details tied to the written Torah: Do not eat the Passover boiled in water.').

% Command: roast_the_passover_with_fire
command(roast_the_passover_with_fire).
command_title(roast_the_passover_with_fire, 'Exodus 12:9 - Roast the Passover with fire.').
normal_obedience(roast_the_passover_with_fire, 'Roast the Passover with fire.').
concerns(roast_the_passover_with_fire, passover_memorial).
scripture_reference(roast_the_passover_with_fire, 'Exodus 12:9').
study_note(roast_the_passover_with_fire, 'This command preserves Passover as a memorial of deliverance and keeps its details tied to the written Torah: Roast the Passover with fire.').

% Command: do_not_leave_any_passover_until_morning
command(do_not_leave_any_passover_until_morning).
command_title(do_not_leave_any_passover_until_morning, 'Exodus 12:10 - Do not leave any Passover until morning.').
normal_obedience(do_not_leave_any_passover_until_morning, 'Do not leave any Passover until morning.').
concerns(do_not_leave_any_passover_until_morning, passover_memorial).
scripture_reference(do_not_leave_any_passover_until_morning, 'Exodus 12:10').
study_note(do_not_leave_any_passover_until_morning, 'This command preserves Passover as a memorial of deliverance and keeps its details tied to the written Torah: Do not leave any Passover until morning.').

% Command: burn_what_remains_until_morning
command(burn_what_remains_until_morning).
command_title(burn_what_remains_until_morning, 'Exodus 12:10 - Burn what remains until morning.').
normal_obedience(burn_what_remains_until_morning, 'Burn what remains until morning.').
concerns(burn_what_remains_until_morning, passover_memorial).
scripture_reference(burn_what_remains_until_morning, 'Exodus 12:10').
study_note(burn_what_remains_until_morning, 'This command preserves Passover as a memorial of deliverance and keeps its details tied to the written Torah: Burn what remains until morning.').

% Command: no_uncircumcised_male_may_eat_the_passover
command(no_uncircumcised_male_may_eat_the_passover).
command_title(no_uncircumcised_male_may_eat_the_passover, 'Exodus 12:48 - No uncircumcised male may eat the Passover.').
normal_obedience(no_uncircumcised_male_may_eat_the_passover, 'No uncircumcised male may eat the Passover.').
concerns(no_uncircumcised_male_may_eat_the_passover, passover_memorial).
scripture_reference(no_uncircumcised_male_may_eat_the_passover, 'Exodus 12:48').
study_note(no_uncircumcised_male_may_eat_the_passover, 'This command preserves Passover as a memorial of deliverance and keeps its details tied to the written Torah: No uncircumcised male may eat the Passover.').

% Command: no_foreigner_may_eat_the_passover_unless_joined_under_the_stated_covenant_sign
command(no_foreigner_may_eat_the_passover_unless_joined_under_the_stated_covenant_sign).
command_title(no_foreigner_may_eat_the_passover_unless_joined_under_the_stated_covenant_sign, 'Exodus 12:43-49 - No foreigner may eat the Passover unless joined under the stated covenant sign.').
normal_obedience(no_foreigner_may_eat_the_passover_unless_joined_under_the_stated_covenant_sign, 'No foreigner may eat the Passover unless joined under the stated covenant sign.').
concerns(no_foreigner_may_eat_the_passover_unless_joined_under_the_stated_covenant_sign, passover_memorial).
scripture_reference(no_foreigner_may_eat_the_passover_unless_joined_under_the_stated_covenant_sign, 'Exodus 12:43-49').
study_note(no_foreigner_may_eat_the_passover_unless_joined_under_the_stated_covenant_sign, 'This command preserves Passover as a memorial of deliverance and keeps its details tied to the written Torah: No foreigner may eat the Passover unless joined under the stated covenant sign.').

% Command: do_not_break_a_bone_of_the_passover_lamb
command(do_not_break_a_bone_of_the_passover_lamb).
command_title(do_not_break_a_bone_of_the_passover_lamb, 'Exodus 12:46 - Do not break a bone of the Passover lamb.').
normal_obedience(do_not_break_a_bone_of_the_passover_lamb, 'Do not break a bone of the Passover lamb.').
concerns(do_not_break_a_bone_of_the_passover_lamb, passover_memorial).
scripture_reference(do_not_break_a_bone_of_the_passover_lamb, 'Exodus 12:46').
study_note(do_not_break_a_bone_of_the_passover_lamb, 'This command preserves Passover as a memorial of deliverance and keeps its details tied to the written Torah: Do not break a bone of the Passover lamb.').

% Command: eat_passover_in_one_house
command(eat_passover_in_one_house).
command_title(eat_passover_in_one_house, 'Exodus 12:46 - Eat Passover in one house.').
normal_obedience(eat_passover_in_one_house, 'Eat Passover in one house.').
concerns(eat_passover_in_one_house, passover_memorial).
scripture_reference(eat_passover_in_one_house, 'Exodus 12:46').
study_note(eat_passover_in_one_house, 'This command preserves Passover as a memorial of deliverance and keeps its details tied to the written Torah: Eat Passover in one house.').

% Command: do_not_take_passover_meat_outside_the_house
command(do_not_take_passover_meat_outside_the_house).
command_title(do_not_take_passover_meat_outside_the_house, 'Exodus 12:46 - Do not take Passover meat outside the house.').
normal_obedience(do_not_take_passover_meat_outside_the_house, 'Do not take Passover meat outside the house.').
concerns(do_not_take_passover_meat_outside_the_house, passover_memorial).
scripture_reference(do_not_take_passover_meat_outside_the_house, 'Exodus 12:46').
study_note(do_not_take_passover_meat_outside_the_house, 'This command preserves Passover as a memorial of deliverance and keeps its details tied to the written Torah: Do not take Passover meat outside the house.').

% Command: keep_passover_in_the_second_month_if_unclean_by_corpse_or_on_a_distant_journey
command(keep_passover_in_the_second_month_if_unclean_by_corpse_or_on_a_distant_journey).
command_title(keep_passover_in_the_second_month_if_unclean_by_corpse_or_on_a_distant_journey, 'Numbers 9:9-14 - Keep Passover in the second month if unclean by corpse or on a distant journey.').
normal_obedience(keep_passover_in_the_second_month_if_unclean_by_corpse_or_on_a_distant_journey, 'Keep Passover in the second month if unclean by corpse or on a distant journey.').
concerns(keep_passover_in_the_second_month_if_unclean_by_corpse_or_on_a_distant_journey, passover_memorial).
scripture_reference(keep_passover_in_the_second_month_if_unclean_by_corpse_or_on_a_distant_journey, 'Numbers 9:9-14').
study_note(keep_passover_in_the_second_month_if_unclean_by_corpse_or_on_a_distant_journey, 'This command preserves Passover as a memorial of deliverance and keeps its details tied to the written Torah: Keep Passover in the second month if unclean by corpse or on a distant journey.').

% Command: do_not_leave_second_passover_until_morning
command(do_not_leave_second_passover_until_morning).
command_title(do_not_leave_second_passover_until_morning, 'Numbers 9:12 - Do not leave second Passover until morning.').
normal_obedience(do_not_leave_second_passover_until_morning, 'Do not leave second Passover until morning.').
concerns(do_not_leave_second_passover_until_morning, passover_memorial).
scripture_reference(do_not_leave_second_passover_until_morning, 'Numbers 9:12').
study_note(do_not_leave_second_passover_until_morning, 'This command preserves Passover as a memorial of deliverance and keeps its details tied to the written Torah: Do not leave second Passover until morning.').

% Command: do_not_break_a_bone_of_second_passover
command(do_not_break_a_bone_of_second_passover).
command_title(do_not_break_a_bone_of_second_passover, 'Numbers 9:12 - Do not break a bone of second Passover.').
normal_obedience(do_not_break_a_bone_of_second_passover, 'Do not break a bone of second Passover.').
concerns(do_not_break_a_bone_of_second_passover, passover_memorial).
scripture_reference(do_not_break_a_bone_of_second_passover, 'Numbers 9:12').
study_note(do_not_break_a_bone_of_second_passover, 'This command preserves Passover as a memorial of deliverance and keeps its details tied to the written Torah: Do not break a bone of second Passover.').

% Command: remove_leaven_by_the_first_day
command(remove_leaven_by_the_first_day).
command_title(remove_leaven_by_the_first_day, 'Exodus 12:15 - Remove leaven by the first day.').
normal_obedience(remove_leaven_by_the_first_day, 'Remove leaven by the first day.').
concerns(remove_leaven_by_the_first_day, passover_memorial).
scripture_reference(remove_leaven_by_the_first_day, 'Exodus 12:15').
study_note(remove_leaven_by_the_first_day, 'This command preserves Passover as a memorial of deliverance and keeps its details tied to the written Torah: Remove leaven by the first day.').

% Command: no_leaven_shall_be_seen_with_you_during_the_feast
command(no_leaven_shall_be_seen_with_you_during_the_feast).
command_title(no_leaven_shall_be_seen_with_you_during_the_feast, 'Exodus 13:7 - No leaven shall be seen with you during the feast.').
normal_obedience(no_leaven_shall_be_seen_with_you_during_the_feast, 'No leaven shall be seen with you during the feast.').
concerns(no_leaven_shall_be_seen_with_you_during_the_feast, passover_memorial).
scripture_reference(no_leaven_shall_be_seen_with_you_during_the_feast, 'Exodus 13:7').
study_note(no_leaven_shall_be_seen_with_you_during_the_feast, 'This command preserves Passover as a memorial of deliverance and keeps its details tied to the written Torah: No leaven shall be seen with you during the feast.').

% Command: do_not_eat_leaven_during_the_seven_days
command(do_not_eat_leaven_during_the_seven_days).
command_title(do_not_eat_leaven_during_the_seven_days, 'Exodus 12:15, 19-20 - Do not eat leaven during the seven days.').
normal_obedience(do_not_eat_leaven_during_the_seven_days, 'Do not eat leaven during the seven days.').
concerns(do_not_eat_leaven_during_the_seven_days, passover_memorial).
scripture_reference(do_not_eat_leaven_during_the_seven_days, 'Exodus 12:15, 19-20').
study_note(do_not_eat_leaven_during_the_seven_days, 'This command preserves Passover as a memorial of deliverance and keeps its details tied to the written Torah: Do not eat leaven during the seven days.').

% Command: eat_unleavened_bread_from_the_evening_of_the_fourteenth_to_the_evening_of_the
command(eat_unleavened_bread_from_the_evening_of_the_fourteenth_to_the_evening_of_the).
command_title(eat_unleavened_bread_from_the_evening_of_the_fourteenth_to_the_evening_of_the, 'Exodus 12:18 - Eat unleavened bread from the evening of the fourteenth to the evening of the twenty-first.').
normal_obedience(eat_unleavened_bread_from_the_evening_of_the_fourteenth_to_the_evening_of_the, 'Eat unleavened bread from the evening of the fourteenth to the evening of the twenty-first.').
concerns(eat_unleavened_bread_from_the_evening_of_the_fourteenth_to_the_evening_of_the, passover_memorial).
scripture_reference(eat_unleavened_bread_from_the_evening_of_the_fourteenth_to_the_evening_of_the, 'Exodus 12:18').
study_note(eat_unleavened_bread_from_the_evening_of_the_fourteenth_to_the_evening_of_the, 'This command preserves Passover as a memorial of deliverance and keeps its details tied to the written Torah: Eat unleavened bread from the evening of the fourteenth to the evening of the twenty-first.').

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
source_term(keep_passover, hebrew, pesach, 'Passover or pass-over offering; the appointed memorial of YHWH passing over Israel in Egypt').
source_term(keep_passover, hebrew, moed, 'appointed time or fixed season; Passover is kept at its appointed time').
study_note(keep_passover, 'Passover anchors the remembrance of deliverance and covenant identity.').

% Command: passover_lamb_without_blemish
command(passover_lamb_without_blemish).
command_title(passover_lamb_without_blemish, 'Exo 12:3-6 - Select the Passover lamb.').
normal_obedience(passover_lamb_without_blemish, 'Select and slaughter a lamb or goat without blemish for Passover.').
concerns(passover_lamb_without_blemish, passover_memorial).
scripture_reference(passover_lamb_without_blemish, 'Exodus 12:3-6').
story_reference(passover_lamb_without_blemish, '2 Chronicles 35:7-9', 'Josiah and the leaders provide lambs, kids, and bulls for the Passover offerings.').
source_term(passover_lamb_without_blemish, hebrew, seh, 'a lamb or small livestock animal from the sheep or goats selected for Passover').
source_term(passover_lamb_without_blemish, hebrew, tamim, 'complete, whole, or without blemish; the Passover animal must be unblemished').
translation_note(passover_lamb_without_blemish, 'Speak ye unto all the congregation of Israel, saying, In the tenth day of this month they shall take to them every man a lamb, according to the house of their fathers, a lamb for an house:

This verse indicates that the lamb needs to be taken to someone. Perhaps a person (priest) of authority.').

% Command: eat_passover_with_unleavened_bread_and_bitter_herbs
command(eat_passover_with_unleavened_bread_and_bitter_herbs).
command_title(eat_passover_with_unleavened_bread_and_bitter_herbs, 'Exo 12:8 - Eat Passover with unleavened bread and bitter herbs.').
normal_obedience(eat_passover_with_unleavened_bread_and_bitter_herbs, 'Eat the Passover meal with unleavened bread and bitter herbs.').
concerns(eat_passover_with_unleavened_bread_and_bitter_herbs, passover_memorial).
scripture_reference(eat_passover_with_unleavened_bread_and_bitter_herbs, 'Exodus 12:8').
story_reference(eat_passover_with_unleavened_bread_and_bitter_herbs, '2 Chronicles 35:13', 'The Passover is prepared according to the ordinance for the people.').
source_term(eat_passover_with_unleavened_bread_and_bitter_herbs, hebrew, matsah, 'unleavened bread; the bread eaten with the Passover meal').
source_term(eat_passover_with_unleavened_bread_and_bitter_herbs, hebrew, merorim, 'bitter herbs or bitter things eaten with the Passover meal').
study_note(eat_passover_with_unleavened_bread_and_bitter_herbs, 'The meal elements teach remembrance through embodied participation.').

% Command: roast_passover_with_fire
command(roast_passover_with_fire).
command_title(roast_passover_with_fire, 'Exo 12:9 - Roast the Passover with fire.').
normal_obedience(roast_passover_with_fire, 'Do not eat Passover raw or boiled; roast it with fire.').
concerns(roast_passover_with_fire, passover_memorial).
scripture_reference(roast_passover_with_fire, 'Exodus 12:9').
story_reference(roast_passover_with_fire, '2 Chronicles 35:13', 'The Levites roast the Passover with fire according to the ordinance.').
source_term(roast_passover_with_fire, hebrew, esh, 'fire; the Passover is roasted with fire rather than boiled').
source_term(roast_passover_with_fire, hebrew, bashal, 'to boil, cook, or seethe; Exodus 12:9 forbids preparing the Passover boiled in water').
study_note(roast_passover_with_fire, 'The preparation details preserve the commanded form of the Passover meal.').

% Command: burn_passover_leftovers
command(burn_passover_leftovers).
command_title(burn_passover_leftovers, 'Exo 12:10 - Do not leave Passover until morning.').
normal_obedience(burn_passover_leftovers, 'Burn what remains of the Passover by morning.').
concerns(burn_passover_leftovers, passover_memorial).
scripture_reference(burn_passover_leftovers, 'Exodus 12:10').
scripture_reference(burn_passover_leftovers, 'Deuteronomy 16:4').
story_reference(burn_passover_leftovers, 'Exodus 12:28-30', 'Israel obeys the Passover instructions before YHWH strikes Egypt at midnight.').
source_term(burn_passover_leftovers, hebrew, yathar, 'to remain or be left over; the Passover must not remain until morning').
source_term(burn_passover_leftovers, hebrew, boqer, 'morning; the boundary by which leftovers must be burned').
study_note(burn_passover_leftovers, 'This command protects the integrity of the Passover observance.').

% Command: eat_passover_in_readiness
command(eat_passover_in_readiness).
command_title(eat_passover_in_readiness, 'Exo 12:11 - Eat Passover in readiness.').
normal_obedience(eat_passover_in_readiness, 'Eat with loins girded, sandals on, and staff in hand.').
concerns(eat_passover_in_readiness, passover_memorial).
scripture_reference(eat_passover_in_readiness, 'Exodus 12:11').
story_reference(eat_passover_in_readiness, 'Exodus 12:29-34', 'Israel leaves Egypt in haste after eating the Passover in readiness.').
source_term(eat_passover_in_readiness, hebrew, chippazon, 'haste or hurried readiness; Exodus says to eat the Passover in haste').
source_term(eat_passover_in_readiness, hebrew, maqqel, 'staff or walking stick held in the hand for departure readiness').
study_note(eat_passover_in_readiness, 'Readiness teaches the urgency of deliverance.').

% Command: passover_participation_boundary
command(passover_participation_boundary).
command_title(passover_participation_boundary, 'Exo 12:43-49 - Passover participation boundary.').
normal_obedience(passover_participation_boundary, 'Recognize the Torah boundary for who may eat Passover.').
concerns(passover_participation_boundary, passover_memorial).
scripture_reference(passover_participation_boundary, 'Exodus 12:43-49').
story_reference(passover_participation_boundary, '2 Chronicles 30:15-20', 'Hezekiah prays for those not cleansed according to sanctuary purity as the Passover is kept.').
source_term(passover_participation_boundary, hebrew, nekar, 'foreigner or foreigner-status person excluded from eating Passover in Exodus 12:43').
source_term(passover_participation_boundary, hebrew, aral, 'uncircumcised; Exodus 12:48 says no uncircumcised male may eat Passover').
source_term(passover_participation_boundary, hebrew, ger, 'sojourner or stranger who may participate when brought under the covenant sign named in the passage').
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
source_term(remove_leaven, hebrew, seor, 'leaven or sourdough starter to be removed from houses for the feast').
source_term(remove_leaven, hebrew, chamets, 'leavened thing or leavened bread excluded during Unleavened Bread').
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
source_term(do_not_eat_leaven_during_feast, hebrew, chamets, 'leavened bread or leavened food forbidden during the seven days').
source_term(do_not_eat_leaven_during_feast, hebrew, matsah, 'unleavened bread, the commanded bread of the feast in contrast with chamets').
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
source_term(eat_unleavened_bread_seven_days, hebrew, matsah, 'unleavened bread eaten throughout the seven-day feast').
source_term(eat_unleavened_bread_seven_days, hebrew, shibah, 'seven; the number of days for eating unleavened bread').
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
source_term(first_day_unleavened_bread_assembly, hebrew, miqra_qodesh, 'holy convocation or sacred assembly called on the first day').
source_term(first_day_unleavened_bread_assembly, hebrew, melakah, 'work or ordinary labor restricted on the sacred assembly day').
study_note(first_day_unleavened_bread_assembly, 'The first day of the feast is set apart as a sacred assembly.').

% Command: seventh_day_unleavened_bread_assembly
command(seventh_day_unleavened_bread_assembly).
command_title(seventh_day_unleavened_bread_assembly, 'Lev 23:8 - Seventh day sacred assembly.').
normal_obedience(seventh_day_unleavened_bread_assembly, 'Hold a sacred assembly and do no ordinary work on the seventh day.').
concerns(seventh_day_unleavened_bread_assembly, sacred_assembly).
scripture_reference(seventh_day_unleavened_bread_assembly, 'Exodus 12:16').
scripture_reference(seventh_day_unleavened_bread_assembly, 'Leviticus 23:8').
scripture_reference(seventh_day_unleavened_bread_assembly, 'Numbers 28:25').
story_reference(seventh_day_unleavened_bread_assembly, '2 Chronicles 30:21-23', 'Hezekiah and the assembly keep Unleavened Bread for seven days and continue the feast with joy.').
source_term(seventh_day_unleavened_bread_assembly, hebrew, miqra_qodesh, 'holy convocation or sacred assembly called on the seventh day').
source_term(seventh_day_unleavened_bread_assembly, hebrew, shebii, 'seventh; the closing day of the feast').
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
source_term(tell_children_passover_meaning, hebrew, nagad, 'to tell, declare, or explain; used for telling the child the meaning of the memorial').
source_term(tell_children_passover_meaning, hebrew, ben, 'son or child; the command explicitly addresses household teaching to children').
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
story_reference(choose_the_passover_lamb_on_the_tenth_day, 'Exodus 12:3-6', 'Israel is instructed to select the Passover lamb on the tenth day before the exodus.').
source_term(choose_the_passover_lamb_on_the_tenth_day, hebrew, asor, 'tenth; the day of the month when the Passover animal is selected').
source_term(choose_the_passover_lamb_on_the_tenth_day, hebrew, laqach, 'to take, select, or receive; the household takes a lamb on the tenth day').

% Command: keep_the_passover_lamb_until_the_fourteenth_day
command(keep_the_passover_lamb_until_the_fourteenth_day).
command_title(keep_the_passover_lamb_until_the_fourteenth_day, 'Exodus 12:6 - Keep the Passover lamb until the fourteenth day.').
normal_obedience(keep_the_passover_lamb_until_the_fourteenth_day, 'Keep the Passover lamb until the fourteenth day.').
concerns(keep_the_passover_lamb_until_the_fourteenth_day, passover_memorial).
scripture_reference(keep_the_passover_lamb_until_the_fourteenth_day, 'Exodus 12:6').
story_reference(keep_the_passover_lamb_until_the_fourteenth_day, 'Exodus 12:3-6', 'The Passover lamb is kept until the fourteenth day before being slaughtered.').
source_term(keep_the_passover_lamb_until_the_fourteenth_day, hebrew, mishmereth, 'keeping, guard, or charge; the animal is kept under care until the fourteenth day').
source_term(keep_the_passover_lamb_until_the_fourteenth_day, hebrew, arba_asar, 'fourteen; the day of the month when the Passover is slaughtered').

% Command: slaughter_the_passover_at_twilight_on_the_appointed_day
command(slaughter_the_passover_at_twilight_on_the_appointed_day).
command_title(slaughter_the_passover_at_twilight_on_the_appointed_day, 'Exodus 12:6 - Slaughter the Passover at twilight on the appointed day.').
normal_obedience(slaughter_the_passover_at_twilight_on_the_appointed_day, 'Slaughter the Passover at twilight on the appointed day.').
concerns(slaughter_the_passover_at_twilight_on_the_appointed_day, passover_memorial).
scripture_reference(slaughter_the_passover_at_twilight_on_the_appointed_day, 'Exodus 12:6').
scripture_reference(slaughter_the_passover_at_twilight_on_the_appointed_day, 'Deuteronomy 16:6').
story_reference(slaughter_the_passover_at_twilight_on_the_appointed_day, '2 Chronicles 35:10-14', 'Josiah''s Passover is slaughtered and prepared according to the command.').
source_term(slaughter_the_passover_at_twilight_on_the_appointed_day, hebrew, shachat, 'to slaughter; the Passover animal is slaughtered at the appointed time').
source_term(slaughter_the_passover_at_twilight_on_the_appointed_day, hebrew, ben_ha_arbayim, 'between the evenings or twilight; the time boundary for slaughtering the Passover').
study_note(slaughter_the_passover_at_twilight_on_the_appointed_day, 'This command preserves Passover as a memorial of deliverance and keeps its details tied to the written Torah: Slaughter the Passover at twilight on the appointed day.').

% Command: put_passover_blood_on_the_doorposts_and_lintel_in_the_exodus_context
command(put_passover_blood_on_the_doorposts_and_lintel_in_the_exodus_context).
command_title(put_passover_blood_on_the_doorposts_and_lintel_in_the_exodus_context, 'Exodus 12:7 - Put Passover blood on the doorposts and lintel in the Exodus context.').
normal_obedience(put_passover_blood_on_the_doorposts_and_lintel_in_the_exodus_context, 'Put Passover blood on the doorposts and lintel in the Exodus context.').
concerns(put_passover_blood_on_the_doorposts_and_lintel_in_the_exodus_context, passover_memorial).
scripture_reference(put_passover_blood_on_the_doorposts_and_lintel_in_the_exodus_context, 'Exodus 12:7').
story_reference(put_passover_blood_on_the_doorposts_and_lintel_in_the_exodus_context, 'Exodus 12:21-30', 'Israel marks the houses with Passover blood before YHWH passes through Egypt.').
source_term(put_passover_blood_on_the_doorposts_and_lintel_in_the_exodus_context, hebrew, dam, 'blood; the Passover blood is placed on the house entrance in the Exodus context').
source_term(put_passover_blood_on_the_doorposts_and_lintel_in_the_exodus_context, hebrew, mezuzah, 'doorpost; one of the entrance points marked with Passover blood').
source_term(put_passover_blood_on_the_doorposts_and_lintel_in_the_exodus_context, hebrew, mashqoph, 'lintel or upper doorframe marked with Passover blood').
study_note(put_passover_blood_on_the_doorposts_and_lintel_in_the_exodus_context, 'This command preserves Passover as a memorial of deliverance and keeps its details tied to the written Torah: Put Passover blood on the doorposts and lintel in the Exodus context.').

% Command: eat_the_passover_with_loins_girded_sandals_on_and_staff_in_hand
command(eat_the_passover_with_loins_girded_sandals_on_and_staff_in_hand).
command_title(eat_the_passover_with_loins_girded_sandals_on_and_staff_in_hand, 'Exodus 12:11 - Eat the Passover with loins girded, sandals on, and staff in hand.').
normal_obedience(eat_the_passover_with_loins_girded_sandals_on_and_staff_in_hand, 'Eat the Passover with loins girded, sandals on, and staff in hand.').
concerns(eat_the_passover_with_loins_girded_sandals_on_and_staff_in_hand, passover_memorial).
scripture_reference(eat_the_passover_with_loins_girded_sandals_on_and_staff_in_hand, 'Exodus 12:11').
story_reference(eat_the_passover_with_loins_girded_sandals_on_and_staff_in_hand, 'Exodus 12:29-34', 'Israel leaves Egypt in haste after the Passover night.').
source_term(eat_the_passover_with_loins_girded_sandals_on_and_staff_in_hand, hebrew, mothen, 'loins or waist; the command pictures the loins girded for departure').
source_term(eat_the_passover_with_loins_girded_sandals_on_and_staff_in_hand, hebrew, naal, 'sandal or shoe; sandals are on the feet in readiness').
source_term(eat_the_passover_with_loins_girded_sandals_on_and_staff_in_hand, hebrew, maqqel, 'staff or walking stick held in the hand for departure').
study_note(eat_the_passover_with_loins_girded_sandals_on_and_staff_in_hand, 'This command preserves Passover as a memorial of deliverance and keeps its details tied to the written Torah: Eat the Passover with loins girded, sandals on, and staff in hand.').

% Command: do_not_eat_the_passover_raw
command(do_not_eat_the_passover_raw).
command_title(do_not_eat_the_passover_raw, 'Exodus 12:9 - Do not eat the Passover raw.').
normal_obedience(do_not_eat_the_passover_raw, 'Do not eat the Passover raw.').
concerns(do_not_eat_the_passover_raw, passover_memorial).
scripture_reference(do_not_eat_the_passover_raw, 'Exodus 12:9').
story_reference(do_not_eat_the_passover_raw, '2 Chronicles 35:13', 'The Passover is roasted with fire according to the ordinance, not eaten raw.').
source_term(do_not_eat_the_passover_raw, hebrew, na, 'raw or underdone; Exodus 12:9 forbids eating the Passover raw').
study_note(do_not_eat_the_passover_raw, 'This command preserves Passover as a memorial of deliverance and keeps its details tied to the written Torah: Do not eat the Passover raw.').

% Command: do_not_eat_the_passover_boiled_in_water
command(do_not_eat_the_passover_boiled_in_water).
command_title(do_not_eat_the_passover_boiled_in_water, 'Exodus 12:9 - Do not eat the Passover boiled in water.').
normal_obedience(do_not_eat_the_passover_boiled_in_water, 'Do not eat the Passover boiled in water.').
concerns(do_not_eat_the_passover_boiled_in_water, passover_memorial).
scripture_reference(do_not_eat_the_passover_boiled_in_water, 'Exodus 12:9').
story_reference(do_not_eat_the_passover_boiled_in_water, '2 Chronicles 35:13', 'The Passover is roasted with fire according to the ordinance, not boiled in water.').
source_term(do_not_eat_the_passover_boiled_in_water, hebrew, bashal, 'to boil, cook, or seethe; here forbidden as the preparation method for Passover').
source_term(do_not_eat_the_passover_boiled_in_water, hebrew, mayim, 'water; the text forbids boiling the Passover in water').
study_note(do_not_eat_the_passover_boiled_in_water, 'This command preserves Passover as a memorial of deliverance and keeps its details tied to the written Torah: Do not eat the Passover boiled in water.').

% Command: do_not_leave_any_passover_until_morning
command(do_not_leave_any_passover_until_morning).
command_title(do_not_leave_any_passover_until_morning, 'Exodus 12:10 - Do not leave any Passover until morning.').
normal_obedience(do_not_leave_any_passover_until_morning, 'Do not leave any Passover until morning.').
concerns(do_not_leave_any_passover_until_morning, passover_memorial).
scripture_reference(do_not_leave_any_passover_until_morning, 'Exodus 12:10').
story_reference(do_not_leave_any_passover_until_morning, 'Exodus 12:28-30', 'Israel obeys the Passover instructions before YHWH strikes Egypt at midnight.').
source_term(do_not_leave_any_passover_until_morning, hebrew, yathar, 'to remain or be left over; the Passover must not be left until morning').
source_term(do_not_leave_any_passover_until_morning, hebrew, boqer, 'morning; the time limit for what remains').
study_note(do_not_leave_any_passover_until_morning, 'This command preserves Passover as a memorial of deliverance and keeps its details tied to the written Torah: Do not leave any Passover until morning.').

% Command: burn_what_remains_until_morning
command(burn_what_remains_until_morning).
command_title(burn_what_remains_until_morning, 'Exodus 12:10 - Burn what remains until morning.').
normal_obedience(burn_what_remains_until_morning, 'Burn what remains until morning.').
concerns(burn_what_remains_until_morning, passover_memorial).
scripture_reference(burn_what_remains_until_morning, 'Exodus 12:10').
story_reference(burn_what_remains_until_morning, 'Exodus 12:28-30', 'Israel does as YHWH commanded Moses and Aaron in the first Passover night.').
source_term(burn_what_remains_until_morning, hebrew, saraph, 'to burn; what remains from the Passover is burned with fire').
source_term(burn_what_remains_until_morning, hebrew, esh, 'fire; the means by which leftovers are destroyed').
study_note(burn_what_remains_until_morning, 'This command preserves Passover as a memorial of deliverance and keeps its details tied to the written Torah: Burn what remains until morning.').

% Command: no_uncircumcised_male_may_eat_the_passover
command(no_uncircumcised_male_may_eat_the_passover).
command_title(no_uncircumcised_male_may_eat_the_passover, 'Exodus 12:48 - No uncircumcised male may eat the Passover.').
normal_obedience(no_uncircumcised_male_may_eat_the_passover, 'No uncircumcised male may eat the Passover.').
concerns(no_uncircumcised_male_may_eat_the_passover, passover_memorial).
scripture_reference(no_uncircumcised_male_may_eat_the_passover, 'Exodus 12:48').
story_reference(no_uncircumcised_male_may_eat_the_passover, 'Joshua 5:2-10', 'Israel circumcises the new generation at Gilgal before keeping Passover in the land.').
source_term(no_uncircumcised_male_may_eat_the_passover, hebrew, aral, 'uncircumcised; the status that excludes a male from eating Passover').
source_term(no_uncircumcised_male_may_eat_the_passover, hebrew, zakar, 'male; the covenant-sign condition is stated for males in Exodus 12:48').
study_note(no_uncircumcised_male_may_eat_the_passover, 'This command preserves Passover as a memorial of deliverance and keeps its details tied to the written Torah: No uncircumcised male may eat the Passover.').

% Command: no_foreigner_may_eat_the_passover_unless_joined_under_the_stated_covenant_sign
command(no_foreigner_may_eat_the_passover_unless_joined_under_the_stated_covenant_sign).
command_title(no_foreigner_may_eat_the_passover_unless_joined_under_the_stated_covenant_sign, 'Exodus 12:43-49 - No foreigner may eat the Passover unless joined under the stated covenant sign.').
normal_obedience(no_foreigner_may_eat_the_passover_unless_joined_under_the_stated_covenant_sign, 'No foreigner may eat the Passover unless joined under the stated covenant sign.').
concerns(no_foreigner_may_eat_the_passover_unless_joined_under_the_stated_covenant_sign, passover_memorial).
scripture_reference(no_foreigner_may_eat_the_passover_unless_joined_under_the_stated_covenant_sign, 'Exodus 12:43-49').
story_reference(no_foreigner_may_eat_the_passover_unless_joined_under_the_stated_covenant_sign, 'Ezra 6:19-22', 'The returned exiles and those separated from uncleanness keep Passover with joy.').
source_term(no_foreigner_may_eat_the_passover_unless_joined_under_the_stated_covenant_sign, hebrew, nekar, 'foreigner or foreigner-status person excluded from eating Passover').
source_term(no_foreigner_may_eat_the_passover_unless_joined_under_the_stated_covenant_sign, hebrew, ger, 'sojourner who may keep Passover when circumcised according to the passage').
study_note(no_foreigner_may_eat_the_passover_unless_joined_under_the_stated_covenant_sign, 'This command preserves Passover as a memorial of deliverance and keeps its details tied to the written Torah: No foreigner may eat the Passover unless joined under the stated covenant sign.').

% Command: do_not_break_a_bone_of_the_passover_lamb
command(do_not_break_a_bone_of_the_passover_lamb).
command_title(do_not_break_a_bone_of_the_passover_lamb, 'Exodus 12:46 - Do not break a bone of the Passover lamb.').
normal_obedience(do_not_break_a_bone_of_the_passover_lamb, 'Do not break a bone of the Passover lamb.').
concerns(do_not_break_a_bone_of_the_passover_lamb, passover_memorial).
scripture_reference(do_not_break_a_bone_of_the_passover_lamb, 'Exodus 12:46').
story_reference(do_not_break_a_bone_of_the_passover_lamb, 'Exodus 12:46-50', 'Israel is told to keep the Passover in one house and not break a bone, and the people do as YHWH commanded.').
source_term(do_not_break_a_bone_of_the_passover_lamb, hebrew, etsem, 'bone; the Passover animal''s bone must not be broken').
source_term(do_not_break_a_bone_of_the_passover_lamb, hebrew, shabar, 'to break; the prohibited action against the Passover bone').

% Command: eat_passover_in_one_house
command(eat_passover_in_one_house).
command_title(eat_passover_in_one_house, 'Exodus 12:46 - Eat Passover in one house.').
normal_obedience(eat_passover_in_one_house, 'Eat Passover in one house.').
concerns(eat_passover_in_one_house, passover_memorial).
scripture_reference(eat_passover_in_one_house, 'Exodus 12:46').
story_reference(eat_passover_in_one_house, 'Exodus 12:46-50', 'The Passover-house instruction is given in the first Passover setting, and Israel does as YHWH commanded.').
source_term(eat_passover_in_one_house, hebrew, bayith, 'house or household; the Passover is eaten within one house').
study_note(eat_passover_in_one_house, 'This command preserves Passover as a memorial of deliverance and keeps its details tied to the written Torah: Eat Passover in one house.').

% Command: do_not_take_passover_meat_outside_the_house
command(do_not_take_passover_meat_outside_the_house).
command_title(do_not_take_passover_meat_outside_the_house, 'Exodus 12:46 - Do not take Passover meat outside the house.').
normal_obedience(do_not_take_passover_meat_outside_the_house, 'Do not take Passover meat outside the house.').
concerns(do_not_take_passover_meat_outside_the_house, passover_memorial).
scripture_reference(do_not_take_passover_meat_outside_the_house, 'Exodus 12:46').
story_reference(do_not_take_passover_meat_outside_the_house, 'Exodus 12:46-50', 'The command not to take the meat outside the house is given with the first Passover ordinance.').
source_term(do_not_take_passover_meat_outside_the_house, hebrew, chutz, 'outside or outdoors; Passover meat must not be taken outside the house').
source_term(do_not_take_passover_meat_outside_the_house, hebrew, basar, 'flesh or meat; the Passover meat is the object of the boundary').
study_note(do_not_take_passover_meat_outside_the_house, 'This command preserves Passover as a memorial of deliverance and keeps its details tied to the written Torah: Do not take Passover meat outside the house.').

% Command: keep_passover_in_the_second_month_if_unclean_by_corpse_or_on_a_distant_journey
command(keep_passover_in_the_second_month_if_unclean_by_corpse_or_on_a_distant_journey).
command_title(keep_passover_in_the_second_month_if_unclean_by_corpse_or_on_a_distant_journey, 'Numbers 9:9-14 - Keep Passover in the second month if unclean by corpse or on a distant journey.').
normal_obedience(keep_passover_in_the_second_month_if_unclean_by_corpse_or_on_a_distant_journey, 'Keep Passover in the second month if unclean by corpse or on a distant journey.').
concerns(keep_passover_in_the_second_month_if_unclean_by_corpse_or_on_a_distant_journey, passover_memorial).
scripture_reference(keep_passover_in_the_second_month_if_unclean_by_corpse_or_on_a_distant_journey, 'Numbers 9:9-14').
story_reference(keep_passover_in_the_second_month_if_unclean_by_corpse_or_on_a_distant_journey, 'Numbers 9:6-14', 'Men unclean by a dead body ask how they can keep Passover, and YHWH gives the second-month provision.').
source_term(keep_passover_in_the_second_month_if_unclean_by_corpse_or_on_a_distant_journey, hebrew, tame, 'unclean; the stated case includes uncleanness by a dead body').
source_term(keep_passover_in_the_second_month_if_unclean_by_corpse_or_on_a_distant_journey, hebrew, nephesh, 'person or dead body in this context; Numbers 9 concerns impurity by a dead person').
source_term(keep_passover_in_the_second_month_if_unclean_by_corpse_or_on_a_distant_journey, hebrew, derek, 'road, way, or journey; the provision includes one on a distant journey').
study_note(keep_passover_in_the_second_month_if_unclean_by_corpse_or_on_a_distant_journey, 'This command preserves Passover as a memorial of deliverance and keeps its details tied to the written Torah: Keep Passover in the second month if unclean by corpse or on a distant journey.').

% Command: do_not_leave_second_passover_until_morning
command(do_not_leave_second_passover_until_morning).
command_title(do_not_leave_second_passover_until_morning, 'Numbers 9:12 - Do not leave second Passover until morning.').
normal_obedience(do_not_leave_second_passover_until_morning, 'Do not leave second Passover until morning.').
concerns(do_not_leave_second_passover_until_morning, passover_memorial).
scripture_reference(do_not_leave_second_passover_until_morning, 'Numbers 9:12').
story_reference(do_not_leave_second_passover_until_morning, 'Numbers 9:6-14', 'The second Passover provision includes the same rule not to leave any of it until morning.').
source_term(do_not_leave_second_passover_until_morning, hebrew, yathar, 'to remain or be left over; the second Passover must not remain until morning').
source_term(do_not_leave_second_passover_until_morning, hebrew, boqer, 'morning; the time boundary for the second Passover leftovers').
study_note(do_not_leave_second_passover_until_morning, 'This command preserves Passover as a memorial of deliverance and keeps its details tied to the written Torah: Do not leave second Passover until morning.').

% Command: do_not_break_a_bone_of_second_passover
command(do_not_break_a_bone_of_second_passover).
command_title(do_not_break_a_bone_of_second_passover, 'Numbers 9:12 - Do not break a bone of second Passover.').
normal_obedience(do_not_break_a_bone_of_second_passover, 'Do not break a bone of second Passover.').
concerns(do_not_break_a_bone_of_second_passover, passover_memorial).
scripture_reference(do_not_break_a_bone_of_second_passover, 'Numbers 9:12').
story_reference(do_not_break_a_bone_of_second_passover, 'Numbers 9:6-14', 'The second Passover provision includes the Passover rule not to break a bone.').
source_term(do_not_break_a_bone_of_second_passover, hebrew, etsem, 'bone; the second Passover follows the rule that no bone is broken').
source_term(do_not_break_a_bone_of_second_passover, hebrew, shabar, 'to break; the prohibited action against the Passover bone').
study_note(do_not_break_a_bone_of_second_passover, 'This command preserves Passover as a memorial of deliverance and keeps its details tied to the written Torah: Do not break a bone of second Passover.').
command_requirement(do_not_break_a_bone_of_second_passover, 'Israel').

% Command: remove_leaven_by_the_first_day
command(remove_leaven_by_the_first_day).
command_title(remove_leaven_by_the_first_day, 'Exodus 12:15 - Remove leaven by the first day.').
normal_obedience(remove_leaven_by_the_first_day, 'Remove leaven by the first day.').
concerns(remove_leaven_by_the_first_day, passover_memorial).
scripture_reference(remove_leaven_by_the_first_day, 'Exodus 12:15').
story_reference(remove_leaven_by_the_first_day, '2 Chronicles 30:21', 'The assembly in Hezekiah''s day keeps the Feast of Unleavened Bread for seven days with joy.').
source_term(remove_leaven_by_the_first_day, hebrew, seor, 'leaven or sourdough starter removed by the first day').
source_term(remove_leaven_by_the_first_day, hebrew, rishon, 'first; the day by which leaven is removed').
study_note(remove_leaven_by_the_first_day, 'This command preserves Passover as a memorial of deliverance and keeps its details tied to the written Torah: Remove leaven by the first day.').

% Command: no_leaven_shall_be_seen_with_you_during_the_feast
command(no_leaven_shall_be_seen_with_you_during_the_feast).
command_title(no_leaven_shall_be_seen_with_you_during_the_feast, 'Exodus 13:7 - No leaven shall be seen with you during the feast.').
normal_obedience(no_leaven_shall_be_seen_with_you_during_the_feast, 'No leaven shall be seen with you during the feast.').
concerns(no_leaven_shall_be_seen_with_you_during_the_feast, passover_memorial).
scripture_reference(no_leaven_shall_be_seen_with_you_during_the_feast, 'Exodus 13:7').
story_reference(no_leaven_shall_be_seen_with_you_during_the_feast, 'Ezra 6:21-22', 'The returned exiles keep Passover and the Feast of Unleavened Bread after separating from uncleanness.').
source_term(no_leaven_shall_be_seen_with_you_during_the_feast, hebrew, seor, 'leaven or sourdough starter that must not be seen within the feast boundary').
source_term(no_leaven_shall_be_seen_with_you_during_the_feast, hebrew, raah, 'to see or appear; Exodus 13:7 says leaven shall not be seen with you').
study_note(no_leaven_shall_be_seen_with_you_during_the_feast, 'This command preserves Passover as a memorial of deliverance and keeps its details tied to the written Torah: No leaven shall be seen with you during the feast.').

% Command: do_not_eat_leaven_during_the_seven_days
command(do_not_eat_leaven_during_the_seven_days).
command_title(do_not_eat_leaven_during_the_seven_days, 'Exodus 12:15, 19-20 - Do not eat leaven during the seven days.').
normal_obedience(do_not_eat_leaven_during_the_seven_days, 'Do not eat leaven during the seven days.').
concerns(do_not_eat_leaven_during_the_seven_days, passover_memorial).
scripture_reference(do_not_eat_leaven_during_the_seven_days, 'Exodus 12:15, 19-20').
story_reference(do_not_eat_leaven_during_the_seven_days, 'Joshua 5:10-12', 'Israel keeps Passover at Gilgal and eats unleavened cakes from the produce of the land.').
story_reference(do_not_eat_leaven_during_the_seven_days, '2 Chronicles 30:21', 'The assembly keeps the Feast of Unleavened Bread seven days with gladness.').
source_term(do_not_eat_leaven_during_the_seven_days, hebrew, chamets, 'leavened bread or leavened food forbidden during the seven days').
source_term(do_not_eat_leaven_during_the_seven_days, hebrew, shibah, 'seven; the number of days in the prohibition').
study_note(do_not_eat_leaven_during_the_seven_days, 'This command preserves Passover as a memorial of deliverance and keeps its details tied to the written Torah: Do not eat leaven during the seven days.').

% Command: eat_unleavened_bread_from_the_evening_of_the_fourteenth_to_the_evening_of_the
command(eat_unleavened_bread_from_the_evening_of_the_fourteenth_to_the_evening_of_the).
command_title(eat_unleavened_bread_from_the_evening_of_the_fourteenth_to_the_evening_of_the, 'Exodus 12:18 - Eat unleavened bread from the evening of the fourteenth to the evening of the twenty-first.').
normal_obedience(eat_unleavened_bread_from_the_evening_of_the_fourteenth_to_the_evening_of_the, 'Eat unleavened bread from the evening of the fourteenth to the evening of the twenty-first.').
concerns(eat_unleavened_bread_from_the_evening_of_the_fourteenth_to_the_evening_of_the, passover_memorial).
scripture_reference(eat_unleavened_bread_from_the_evening_of_the_fourteenth_to_the_evening_of_the, 'Exodus 12:18').
story_reference(eat_unleavened_bread_from_the_evening_of_the_fourteenth_to_the_evening_of_the, 'Joshua 5:10-12', 'Israel keeps Passover and eats unleavened cakes from the produce of the land.').
story_reference(eat_unleavened_bread_from_the_evening_of_the_fourteenth_to_the_evening_of_the, 'Ezra 6:21-22', 'The returned exiles keep Passover and the Feast of Unleavened Bread with joy.').
source_term(eat_unleavened_bread_from_the_evening_of_the_fourteenth_to_the_evening_of_the, hebrew, matsah, 'unleavened bread eaten through the appointed feast window').
source_term(eat_unleavened_bread_from_the_evening_of_the_fourteenth_to_the_evening_of_the, hebrew, ereb, 'evening; the verse bounds the eating period from evening to evening').

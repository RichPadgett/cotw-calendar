% =============================================================================
% Command Group: Clean, Unclean, And Purity
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
% story_reference(command_yet, 'Verse', 'Verse Summary').
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

% Command: distinguish_clean_and_unclean_animals
command(distinguish_clean_and_unclean_animals).
command_title(distinguish_clean_and_unclean_animals, 'Lev 11 - Distinguish clean and unclean animals.').
normal_obedience(distinguish_clean_and_unclean_animals, 'Distinguish between clean and unclean animals.').
concerns(distinguish_clean_and_unclean_animals, clean_and_unclean_distinction).
scripture_reference(distinguish_clean_and_unclean_animals, 'Leviticus 11').
scripture_reference(distinguish_clean_and_unclean_animals, 'Deuteronomy 14:3-21').
story_reference(distinguish_clean_and_unclean_animals, 'Daniel 1:8-16', 'Daniel resolves not to defile himself with the king''s food and is sustained on vegetables and water.').
story_reference(distinguish_clean_and_unclean_animals, 'Ezekiel 4:14', 'Ezekiel appeals that he has not defiled himself with unclean meat.').
study_note(distinguish_clean_and_unclean_animals, 'This command teaches a Torah distinction around food and holiness.').

% Command: do_not_eat_unclean_animals
command(do_not_eat_unclean_animals).
command_title(do_not_eat_unclean_animals, 'Deu 14:3 - Do not eat unclean things.').
normal_obedience(do_not_eat_unclean_animals, 'Do not eat animals Torah identifies as unclean.').
concerns(do_not_eat_unclean_animals, clean_and_unclean_distinction).
scripture_reference(do_not_eat_unclean_animals, 'Leviticus 11').
scripture_reference(do_not_eat_unclean_animals, 'Deuteronomy 14:3-21').
story_reference(do_not_eat_unclean_animals, 'Daniel 1:8-16', 'Daniel refuses food that would defile him and receives a permitted provision.').
story_reference(do_not_eat_unclean_animals, 'Ezekiel 4:14', 'Ezekiel says no abominable flesh has entered his mouth.').
study_note(do_not_eat_unclean_animals, 'Food choices become a practical expression of distinction.').

% Command: do_not_eat_blood
command(do_not_eat_blood).
command_title(do_not_eat_blood, 'Lev 17:10-14 - Do not eat blood.').
normal_obedience(do_not_eat_blood, 'Do not eat blood, because the life is in the blood.').
concerns(do_not_eat_blood, clean_and_unclean_distinction).
scripture_reference(do_not_eat_blood, 'Leviticus 17:10-14').
scripture_reference(do_not_eat_blood, 'Deuteronomy 12:23-25').
study_note(do_not_eat_blood, 'The command connects eating practice to reverence for life.').

% Command: do_not_eat_fat_of_offerings
command(do_not_eat_fat_of_offerings).
command_title(do_not_eat_fat_of_offerings, 'Lev 7:22-25 - Do not eat forbidden fat.').
normal_obedience(do_not_eat_fat_of_offerings, 'Do not eat the fat portions reserved from certain offerings.').
concerns(do_not_eat_fat_of_offerings, priestly_holiness).
scripture_reference(do_not_eat_fat_of_offerings, 'Leviticus 7:22-25').
source_term(do_not_eat_fat_of_offerings, 'hebrew', 'chêleb', ' fat, whether literally or figuratively - hence, the richest or choice part').
source_term(do_not_eat_fat_of_offerings, 'lxx', 'τὸ στῆθος τὸ πιόν', 'τὸ στῆθος the breast τὸ πιόν the fat. The fat referred to in these passages is specifically that which covers vital organs, indicating its importance and sanctity. The prohibition serves as a reminder of the distinction between what is acceptable for human consumption and what is reserved for divine offerings.').
translation_note(do_not_eat_fat_of_offerings, 'Modern versions of the bible seem to indicate any fat of these animals, ox, sheep, or goat. It is possible that due to the LXXs translation that it is only a specific best part of').
study_note(do_not_eat_fat_of_offerings, 'This command belongs to the sacrificial and priestly holiness system.').

% Command: purify_unclean_articles
command(purify_unclean_articles).
command_title(purify_unclean_articles, 'Lev 11:32 - Purify articles made unclean.').
normal_obedience(purify_unclean_articles, 'Wash articles that become unclean through contact with a dead creature.').
concerns(purify_unclean_articles, purity_and_camp_holiness).
scripture_reference(purify_unclean_articles, 'Leviticus 11:32-40').
study_note(purify_unclean_articles, 'This reintroduces the earlier command in the new catalog format.').

% Command: handle_childbirth_purity
command(handle_childbirth_purity).
command_title(handle_childbirth_purity, 'Lev 12 - Observe childbirth purity instructions.').
normal_obedience(handle_childbirth_purity, 'Observe the Torah instructions connected to childbirth purification.').
concerns(handle_childbirth_purity, purity_and_camp_holiness).
scripture_reference(handle_childbirth_purity, 'Leviticus 12').
study_note(handle_childbirth_purity, 'This command applies in childbirth and sanctuary-purity context.').

% Command: handle_skin_disease_purity
command(handle_skin_disease_purity).
command_title(handle_skin_disease_purity, 'Lev 13-14 - Handle skin disease purity.').
normal_obedience(handle_skin_disease_purity, 'Follow Torah procedures for examining and purifying skin disease.').
concerns(handle_skin_disease_purity, purity_and_camp_holiness).
scripture_reference(handle_skin_disease_purity, 'Leviticus 13').
scripture_reference(handle_skin_disease_purity, 'Leviticus 14').
story_reference(handle_skin_disease_purity, 'Numbers 12:10-15', 'Miriam is shut outside the camp seven days after becoming leprous.').
story_reference(handle_skin_disease_purity, '2 Chronicles 26:19-21', 'Uzziah becomes leprous and lives separately, cut off from the house of YHWH.').
study_note(handle_skin_disease_purity, 'This command involves priestly inspection and restoration to the camp.').

% Command: use_red_heifer_water_for_corpse_impurity
command(use_red_heifer_water_for_corpse_impurity).
command_title(use_red_heifer_water_for_corpse_impurity, 'Num 19 - Use purification water for corpse impurity.').
normal_obedience(use_red_heifer_water_for_corpse_impurity, 'Use the water of purification for corpse impurity according to Torah.').
concerns(use_red_heifer_water_for_corpse_impurity, purity_and_camp_holiness).
scripture_reference(use_red_heifer_water_for_corpse_impurity, 'Numbers 19').
story_reference(use_red_heifer_water_for_corpse_impurity, 'Numbers 9:6-11', 'Men unclean by a dead body seek instruction because they cannot keep Passover at the appointed time.').
study_note(use_red_heifer_water_for_corpse_impurity, 'This command is tied to sanctuary purity and priestly service.').

% -----------------------------------------------------------------------------
% Additional Clean, Unclean, And Purity Commands
% -----------------------------------------------------------------------------

% Command: do_not_touch_carcasses_of_unclean_animals_in_purity_context
command(do_not_touch_carcasses_of_unclean_animals_in_purity_context).
command_title(do_not_touch_carcasses_of_unclean_animals_in_purity_context, 'Leviticus 11 - Do not touch carcasses of unclean animals in purity context.').
normal_obedience(do_not_touch_carcasses_of_unclean_animals_in_purity_context, 'Do not touch carcasses of unclean animals in purity context.').
concerns(do_not_touch_carcasses_of_unclean_animals_in_purity_context, purity_and_camp_holiness).
scripture_reference(do_not_touch_carcasses_of_unclean_animals_in_purity_context, 'Leviticus 11:8').
study_note(do_not_touch_carcasses_of_unclean_animals_in_purity_context, 'We are not to touch an unclean animals carcass.').

% Command: wash_clothes_after_carrying_carcass_impurity
command(wash_clothes_after_carrying_carcass_impurity).
command_title(wash_clothes_after_carrying_carcass_impurity, 'Leviticus 11:25, 28 - Wash clothes after carrying carcass impurity.').
normal_obedience(wash_clothes_after_carrying_carcass_impurity, 'Wash clothes after carrying carcass impurity.').
concerns(wash_clothes_after_carrying_carcass_impurity, purity_and_camp_holiness).
scripture_reference(wash_clothes_after_carrying_carcass_impurity, 'Leviticus 11:25, 28').
study_note(wash_clothes_after_carrying_carcass_impurity, 'If you touch a dead body of an unclean animal you are unclean untill evening and should wash your clothes.').

% Command: break_earthenware_vessel_made_unclean_by_carcass_contact
command(break_earthenware_vessel_made_unclean_by_carcass_contact).
command_title(break_earthenware_vessel_made_unclean_by_carcass_contact, 'Leviticus 11:33 - Break earthenware vessel made unclean by carcass contact.').
normal_obedience(break_earthenware_vessel_made_unclean_by_carcass_contact, 'Break earthenware vessel made unclean by carcass contact.').
concerns(break_earthenware_vessel_made_unclean_by_carcass_contact, purity_and_camp_holiness).
scripture_reference(break_earthenware_vessel_made_unclean_by_carcass_contact, 'Leviticus 11:33 - 34').
study_note(break_earthenware_vessel_made_unclean_by_carcass_contact, 'Verse 34 indicates that no pottery used for consumption should be kept if a carcass comes in contact with it.').

% Command: put_certain_unclean_articles_in_water_until_evening
command(put_certain_unclean_articles_in_water_until_evening).
command_title(put_certain_unclean_articles_in_water_until_evening, 'Leviticus 11:32 - Put certain unclean articles in water until evening.').
normal_obedience(put_certain_unclean_articles_in_water_until_evening, 'Put certain unclean articles in water until evening.').
concerns(put_certain_unclean_articles_in_water_until_evening, purity_and_camp_holiness).
scripture_reference(put_certain_unclean_articles_in_water_until_evening, 'Leviticus 11:32').
study_note(put_certain_unclean_articles_in_water_until_evening, 'Water is used to purify things that have become unclean by contact with carcasses.').

% Command: observe_childbirth_purification_days
command(observe_childbirth_purification_days).
command_title(observe_childbirth_purification_days, 'Leviticus 12 - Observe childbirth purification days.').
normal_obedience(observe_childbirth_purification_days, 'Observe childbirth purification days.').
concerns(observe_childbirth_purification_days, purity_and_camp_holiness).
scripture_reference(observe_childbirth_purification_days, 'Leviticus 12').
study_note(observe_childbirth_purification_days, 'If a woman has a female child, she should remain in the blood of her purifying three and thirty days. If it is a male child, then she will be unclean for two weeks. She should then remain in purification for 66 days or threescore and six days.').

% Command: bring_childbirth_purification_offerings_when_system_applies
command(bring_childbirth_purification_offerings_when_system_applies).
command_title(bring_childbirth_purification_offerings_when_system_applies, 'Leviticus 12:6-8 - Bring childbirth purification offerings when system applies.').
normal_obedience(bring_childbirth_purification_offerings_when_system_applies, 'Bring childbirth purification offerings when system applies.').
concerns(bring_childbirth_purification_offerings_when_system_applies, purity_and_camp_holiness).
scripture_reference(bring_childbirth_purification_offerings_when_system_applies, 'Leviticus 12:6-8').
study_note(bring_childbirth_purification_offerings_when_system_applies, 'A woman shall bring a burnt offering as described in Leviticus 12 to cleanse her from the issue of her blood.').

% Command: the_priest_examines_skin_disease_cases
command(the_priest_examines_skin_disease_cases).
command_title(the_priest_examines_skin_disease_cases, 'Leviticus 13 - The priest examines skin disease cases.').
normal_obedience(the_priest_examines_skin_disease_cases, 'The priest examines skin disease cases.').
concerns(the_priest_examines_skin_disease_cases, purity_and_camp_holiness).
scripture_reference(the_priest_examines_skin_disease_cases, 'Leviticus 13').
story_reference(the_priest_examines_skin_disease_cases, '2 Chronicles 26:19-21', 'The priests confront Uzziah, and he becomes leprous and is excluded from the house of YHWH.').
study_note(the_priest_examines_skin_disease_cases, 'This command belongs to the purity system that protects the camp, sanctuary access, and restoration to clean status: The priest examines skin disease cases.').

% Command: isolate_the_person_with_suspected_skin_disease_according_to_torah
command(isolate_the_person_with_suspected_skin_disease_according_to_torah).
command_title(isolate_the_person_with_suspected_skin_disease_according_to_torah, 'Leviticus 13 - Isolate the person with suspected skin disease according to Torah.').
normal_obedience(isolate_the_person_with_suspected_skin_disease_according_to_torah, 'Isolate the person with suspected skin disease according to Torah.').
concerns(isolate_the_person_with_suspected_skin_disease_according_to_torah, purity_and_camp_holiness).
scripture_reference(isolate_the_person_with_suspected_skin_disease_according_to_torah, 'Leviticus 13').
story_reference(isolate_the_person_with_suspected_skin_disease_according_to_torah, 'Numbers 12:14-15', 'Miriam is shut outside the camp seven days.').
study_note(isolate_the_person_with_suspected_skin_disease_according_to_torah, 'This command belongs to the purity system that protects the camp, sanctuary access, and restoration to clean status: Isolate the person with suspected skin disease according to Torah.').

% Command: the_person_with_skin_disease_must_dwell_outside_the_camp_and_cry_unclean
command(the_person_with_skin_disease_must_dwell_outside_the_camp_and_cry_unclean).
command_title(the_person_with_skin_disease_must_dwell_outside_the_camp_and_cry_unclean, 'Leviticus 13:45-46 - The person with skin disease must dwell outside the camp and cry unclean.').
normal_obedience(the_person_with_skin_disease_must_dwell_outside_the_camp_and_cry_unclean, 'The person with skin disease must dwell outside the camp and cry unclean.').
concerns(the_person_with_skin_disease_must_dwell_outside_the_camp_and_cry_unclean, purity_and_camp_holiness).
scripture_reference(the_person_with_skin_disease_must_dwell_outside_the_camp_and_cry_unclean, 'Leviticus 13:45-46').
story_reference(the_person_with_skin_disease_must_dwell_outside_the_camp_and_cry_unclean, '2 Kings 7:3', 'Four leprous men are outside the city gate during the siege of Samaria.').
story_reference(the_person_with_skin_disease_must_dwell_outside_the_camp_and_cry_unclean, '2 Chronicles 26:21', 'Uzziah lives in a separate house because he is leprous and cut off from the house of YHWH.').
study_note(the_person_with_skin_disease_must_dwell_outside_the_camp_and_cry_unclean, 'This command belongs to the purity system that protects the camp, sanctuary access, and restoration to clean status: The person with skin disease must dwell outside the camp and cry unclean.').

% Command: purify_the_healed_skin_disease_case_according_to_torah
command(purify_the_healed_skin_disease_case_according_to_torah).
command_title(purify_the_healed_skin_disease_case_according_to_torah, 'Leviticus 14 - Purify the healed skin disease case according to Torah.').
normal_obedience(purify_the_healed_skin_disease_case_according_to_torah, 'Purify the healed skin disease case according to Torah.').
concerns(purify_the_healed_skin_disease_case_according_to_torah, purity_and_camp_holiness).
scripture_reference(purify_the_healed_skin_disease_case_according_to_torah, 'Leviticus 14').
study_note(purify_the_healed_skin_disease_case_according_to_torah, 'This command belongs to the purity system that protects the camp, sanctuary access, and restoration to clean status: Purify the healed skin disease case according to Torah.').

% Command: handle_house_plague_inspection_and_cleansing_according_to_torah
command(handle_house_plague_inspection_and_cleansing_according_to_torah).
command_title(handle_house_plague_inspection_and_cleansing_according_to_torah, 'Leviticus 14:33-57 - Handle house plague inspection and cleansing according to Torah.').
normal_obedience(handle_house_plague_inspection_and_cleansing_according_to_torah, 'Handle house plague inspection and cleansing according to Torah.').
concerns(handle_house_plague_inspection_and_cleansing_according_to_torah, purity_and_camp_holiness).
scripture_reference(handle_house_plague_inspection_and_cleansing_according_to_torah, 'Leviticus 14:33-57').
study_note(handle_house_plague_inspection_and_cleansing_according_to_torah, 'This command belongs to the purity system that protects the camp, sanctuary access, and restoration to clean status: Handle house plague inspection and cleansing according to Torah.').

% Command: observe_bodily_discharge_impurity_instructions
command(observe_bodily_discharge_impurity_instructions).
command_title(observe_bodily_discharge_impurity_instructions, 'Leviticus 15 - Observe bodily discharge impurity instructions.').
normal_obedience(observe_bodily_discharge_impurity_instructions, 'Observe bodily discharge impurity instructions.').
concerns(observe_bodily_discharge_impurity_instructions, purity_and_camp_holiness).
scripture_reference(observe_bodily_discharge_impurity_instructions, 'Leviticus 15').
study_note(observe_bodily_discharge_impurity_instructions, 'This command belongs to the purity system that protects the camp, sanctuary access, and restoration to clean status: Observe bodily discharge impurity instructions.').

% Command: bathe_and_wash_garments_after_specified_discharge_impurity
command(bathe_and_wash_garments_after_specified_discharge_impurity).
command_title(bathe_and_wash_garments_after_specified_discharge_impurity, 'Leviticus 15 - Bathe and wash garments after specified discharge impurity.').
normal_obedience(bathe_and_wash_garments_after_specified_discharge_impurity, 'Bathe and wash garments after specified discharge impurity.').
concerns(bathe_and_wash_garments_after_specified_discharge_impurity, purity_and_camp_holiness).
scripture_reference(bathe_and_wash_garments_after_specified_discharge_impurity, 'Leviticus 15').
study_note(bathe_and_wash_garments_after_specified_discharge_impurity, 'This command belongs to the purity system that protects the camp, sanctuary access, and restoration to clean status: Bathe and wash garments after specified discharge impurity.').

% Command: observe_menstrual_impurity_instructions
command(observe_menstrual_impurity_instructions).
command_title(observe_menstrual_impurity_instructions, 'Leviticus 15:19-24 - Observe menstrual impurity instructions.').
normal_obedience(observe_menstrual_impurity_instructions, 'Observe menstrual impurity instructions.').
concerns(observe_menstrual_impurity_instructions, purity_and_camp_holiness).
scripture_reference(observe_menstrual_impurity_instructions, 'Leviticus 15:19-24').
study_note(observe_menstrual_impurity_instructions, 'This command belongs to the purity system that protects the camp, sanctuary access, and restoration to clean status: Observe menstrual impurity instructions.').

% Command: do_not_enter_sanctuary_while_unclean_when_sanctuary_applies
command(do_not_enter_sanctuary_while_unclean_when_sanctuary_applies).
command_title(do_not_enter_sanctuary_while_unclean_when_sanctuary_applies, 'Leviticus 15:31 - Do not enter sanctuary while unclean when sanctuary applies.').
normal_obedience(do_not_enter_sanctuary_while_unclean_when_sanctuary_applies, 'Do not enter sanctuary while unclean when sanctuary applies.').
concerns(do_not_enter_sanctuary_while_unclean_when_sanctuary_applies, purity_and_camp_holiness).
scripture_reference(do_not_enter_sanctuary_while_unclean_when_sanctuary_applies, 'Leviticus 15:31').
study_note(do_not_enter_sanctuary_while_unclean_when_sanctuary_applies, 'This command belongs to the purity system that protects the camp, sanctuary access, and restoration to clean status: Do not enter sanctuary while unclean when sanctuary applies.').

% Command: use_red_heifer_water_for_corpse_impurity_2
command(use_red_heifer_water_for_corpse_impurity_2).
command_title(use_red_heifer_water_for_corpse_impurity_2, 'Numbers 19 - Use red heifer water for corpse impurity.').
normal_obedience(use_red_heifer_water_for_corpse_impurity_2, 'Use red heifer water for corpse impurity.').
concerns(use_red_heifer_water_for_corpse_impurity_2, purity_and_camp_holiness).
scripture_reference(use_red_heifer_water_for_corpse_impurity_2, 'Numbers 19').
story_reference(use_red_heifer_water_for_corpse_impurity_2, 'Numbers 9:6-11', 'Men unclean by a dead body cannot keep Passover at the appointed time and seek instruction.').
study_note(use_red_heifer_water_for_corpse_impurity_2, 'This command belongs to the purity system that protects the camp, sanctuary access, and restoration to clean status: Use red heifer water for corpse impurity.').

% Command: the_unclean_by_corpse_must_be_purified_on_the_third_and_seventh_days
command(the_unclean_by_corpse_must_be_purified_on_the_third_and_seventh_days).
command_title(the_unclean_by_corpse_must_be_purified_on_the_third_and_seventh_days, 'Numbers 19:11-19 - The unclean by corpse must be purified on the third and seventh days.').
normal_obedience(the_unclean_by_corpse_must_be_purified_on_the_third_and_seventh_days, 'The unclean by corpse must be purified on the third and seventh days.').
concerns(the_unclean_by_corpse_must_be_purified_on_the_third_and_seventh_days, purity_and_camp_holiness).
scripture_reference(the_unclean_by_corpse_must_be_purified_on_the_third_and_seventh_days, 'Numbers 19:11-19').
story_reference(the_unclean_by_corpse_must_be_purified_on_the_third_and_seventh_days, 'Numbers 9:6-11', 'Corpse impurity prevents several men from keeping Passover until YHWH gives the second-month provision.').
study_note(the_unclean_by_corpse_must_be_purified_on_the_third_and_seventh_days, 'This command belongs to the purity system that protects the camp, sanctuary access, and restoration to clean status: The unclean by corpse must be purified on the third and seventh days.').

% Command: one_unclean_by_corpse_who_does_not_purify_defiles_the_sanctuary
command(one_unclean_by_corpse_who_does_not_purify_defiles_the_sanctuary).
command_title(one_unclean_by_corpse_who_does_not_purify_defiles_the_sanctuary, 'Numbers 19:20 - One unclean by corpse who does not purify defiles the sanctuary.').
normal_obedience(one_unclean_by_corpse_who_does_not_purify_defiles_the_sanctuary, 'One unclean by corpse who does not purify defiles the sanctuary.').
concerns(one_unclean_by_corpse_who_does_not_purify_defiles_the_sanctuary, purity_and_camp_holiness).
scripture_reference(one_unclean_by_corpse_who_does_not_purify_defiles_the_sanctuary, 'Numbers 19:20').
study_note(one_unclean_by_corpse_who_does_not_purify_defiles_the_sanctuary, 'This command belongs to the purity system that protects the camp, sanctuary access, and restoration to clean status: One unclean by corpse who does not purify defiles the sanctuary.').

% Command: eat_only_animals_meeting_torah_clean_animal_signs
command(eat_only_animals_meeting_torah_clean_animal_signs).
command_title(eat_only_animals_meeting_torah_clean_animal_signs, 'Leviticus 11 - Eat only animals meeting Torah clean animal signs.').
normal_obedience(eat_only_animals_meeting_torah_clean_animal_signs, 'Eat only animals meeting Torah clean animal signs.').
concerns(eat_only_animals_meeting_torah_clean_animal_signs, clean_and_unclean_distinction).
scripture_reference(eat_only_animals_meeting_torah_clean_animal_signs, 'Leviticus 11').
scripture_reference(eat_only_animals_meeting_torah_clean_animal_signs, 'Deuteronomy 14').
story_reference(eat_only_animals_meeting_torah_clean_animal_signs, 'Daniel 1:8-16', 'Daniel refuses food that would defile him and receives a permitted provision.').
story_reference(eat_only_animals_meeting_torah_clean_animal_signs, 'Ezekiel 4:14', 'Ezekiel says no abominable flesh has entered his mouth.').
study_note(eat_only_animals_meeting_torah_clean_animal_signs, 'This command preserves the Torah distinction between clean and unclean and treats eating as part of set-apart living: Eat only animals meeting Torah clean animal signs.').

% Command: eat_only_fish_with_fins_and_scales
command(eat_only_fish_with_fins_and_scales).
command_title(eat_only_fish_with_fins_and_scales, 'Leviticus 11:9-12 - Eat only fish with fins and scales.').
normal_obedience(eat_only_fish_with_fins_and_scales, 'Eat only fish with fins and scales.').
concerns(eat_only_fish_with_fins_and_scales, clean_and_unclean_distinction).
scripture_reference(eat_only_fish_with_fins_and_scales, 'Leviticus 11:9-12').
scripture_reference(eat_only_fish_with_fins_and_scales, 'Deuteronomy 14:9-10').
study_note(eat_only_fish_with_fins_and_scales, 'This command preserves the Torah distinction between clean and unclean and treats eating as part of set-apart living: Eat only fish with fins and scales.').

% Command: do_not_eat_listed_unclean_birds
command(do_not_eat_listed_unclean_birds).
command_title(do_not_eat_listed_unclean_birds, 'Leviticus 11:13-19 - Do not eat listed unclean birds.').
normal_obedience(do_not_eat_listed_unclean_birds, 'Do not eat listed unclean birds.').
concerns(do_not_eat_listed_unclean_birds, clean_and_unclean_distinction).
scripture_reference(do_not_eat_listed_unclean_birds, 'Leviticus 11:13-19').
scripture_reference(do_not_eat_listed_unclean_birds, 'Deuteronomy 14:11-20').
study_note(do_not_eat_listed_unclean_birds, 'This command preserves the Torah distinction between clean and unclean and treats eating as part of set-apart living: Do not eat listed unclean birds.').

% Command: do_not_eat_swarming_things
command(do_not_eat_swarming_things).
command_title(do_not_eat_swarming_things, 'Leviticus 11:41-43 - Do not eat swarming things.').
normal_obedience(do_not_eat_swarming_things, 'Do not eat swarming things.').
concerns(do_not_eat_swarming_things, clean_and_unclean_distinction).
scripture_reference(do_not_eat_swarming_things, 'Leviticus 11:41-43').
study_note(do_not_eat_swarming_things, 'This command preserves the Torah distinction between clean and unclean and treats eating as part of set-apart living: Do not eat swarming things.').

% Command: do_not_make_yourself_detestable_with_swarming_things
command(do_not_make_yourself_detestable_with_swarming_things).
command_title(do_not_make_yourself_detestable_with_swarming_things, 'Leviticus 11:43 - Do not make yourself detestable with swarming things.').
normal_obedience(do_not_make_yourself_detestable_with_swarming_things, 'Do not make yourself detestable with swarming things.').
concerns(do_not_make_yourself_detestable_with_swarming_things, clean_and_unclean_distinction).
scripture_reference(do_not_make_yourself_detestable_with_swarming_things, 'Leviticus 11:43').
study_note(do_not_make_yourself_detestable_with_swarming_things, 'This command preserves the Torah distinction between clean and unclean and treats eating as part of set-apart living: Do not make yourself detestable with swarming things.').

% Command: do_not_eat_anything_that_dies_of_itself
command(do_not_eat_anything_that_dies_of_itself).
command_title(do_not_eat_anything_that_dies_of_itself, 'Deuteronomy 14:21 - Do not eat anything that dies of itself.').
normal_obedience(do_not_eat_anything_that_dies_of_itself, 'Do not eat anything that dies of itself.').
concerns(do_not_eat_anything_that_dies_of_itself, clean_and_unclean_distinction).
scripture_reference(do_not_eat_anything_that_dies_of_itself, 'Deuteronomy 14:21').
study_note(do_not_eat_anything_that_dies_of_itself, 'This command preserves the Torah distinction between clean and unclean and treats eating as part of set-apart living: Do not eat anything that dies of itself.').

% Command: give_or_sell_what_dies_of_itself_to_the_stranger_foreigner_as_stated
command(give_or_sell_what_dies_of_itself_to_the_stranger_foreigner_as_stated).
command_title(give_or_sell_what_dies_of_itself_to_the_stranger_foreigner_as_stated, 'Deuteronomy 14:21 - Give or sell what dies of itself to the stranger/foreigner as stated.').
normal_obedience(give_or_sell_what_dies_of_itself_to_the_stranger_foreigner_as_stated, 'Give or sell what dies of itself to the stranger/foreigner as stated.').
concerns(give_or_sell_what_dies_of_itself_to_the_stranger_foreigner_as_stated, clean_and_unclean_distinction).
scripture_reference(give_or_sell_what_dies_of_itself_to_the_stranger_foreigner_as_stated, 'Deuteronomy 14:21').
study_note(give_or_sell_what_dies_of_itself_to_the_stranger_foreigner_as_stated, 'This command preserves the Torah distinction between clean and unclean and treats eating as part of set-apart living: Give or sell what dies of itself to the stranger/foreigner as stated.').

% Command: do_not_eat_a_limb_or_flesh_with_its_life_blood
command(do_not_eat_a_limb_or_flesh_with_its_life_blood).
command_title(do_not_eat_a_limb_or_flesh_with_its_life_blood, 'Leviticus 17:10-14 - Do not eat a limb or flesh with its life-blood.').
normal_obedience(do_not_eat_a_limb_or_flesh_with_its_life_blood, 'Do not eat a limb or flesh with its life-blood.').
concerns(do_not_eat_a_limb_or_flesh_with_its_life_blood, clean_and_unclean_distinction).
scripture_reference(do_not_eat_a_limb_or_flesh_with_its_life_blood, 'Leviticus 17:10-14').
study_note(do_not_eat_a_limb_or_flesh_with_its_life_blood, 'This command preserves the Torah distinction between clean and unclean and treats eating as part of set-apart living: Do not eat a limb or flesh with its life-blood.').

% Command: do_not_eat_fruit_of_a_tree_for_its_first_three_years
command(do_not_eat_fruit_of_a_tree_for_its_first_three_years).
command_title(do_not_eat_fruit_of_a_tree_for_its_first_three_years, 'Leviticus 19:23 - Do not eat fruit of a tree for its first three years.').
normal_obedience(do_not_eat_fruit_of_a_tree_for_its_first_three_years, 'Do not eat fruit of a tree for its first three years.').
concerns(do_not_eat_fruit_of_a_tree_for_its_first_three_years, clean_and_unclean_distinction).
scripture_reference(do_not_eat_fruit_of_a_tree_for_its_first_three_years, 'Leviticus 19:23').
study_note(do_not_eat_fruit_of_a_tree_for_its_first_three_years, 'This command preserves the Torah distinction between clean and unclean and treats eating as part of set-apart living: Do not eat fruit of a tree for its first three years.').

% Command: treat_fourth_year_fruit_as_holy_praise_to_yhwh
command(treat_fourth_year_fruit_as_holy_praise_to_yhwh).
command_title(treat_fourth_year_fruit_as_holy_praise_to_yhwh, 'Leviticus 19:24 - Treat fourth-year fruit as holy praise to YHWH.').
normal_obedience(treat_fourth_year_fruit_as_holy_praise_to_yhwh, 'Treat fourth-year fruit as holy praise to YHWH.').
concerns(treat_fourth_year_fruit_as_holy_praise_to_yhwh, clean_and_unclean_distinction).
scripture_reference(treat_fourth_year_fruit_as_holy_praise_to_yhwh, 'Leviticus 19:24').
study_note(treat_fourth_year_fruit_as_holy_praise_to_yhwh, 'This command preserves the Torah distinction between clean and unclean and treats eating as part of set-apart living: Treat fourth-year fruit as holy praise to YHWH.').

% Command: eat_fifth_year_fruit
command(eat_fifth_year_fruit).
command_title(eat_fifth_year_fruit, 'Leviticus 19:25 - Eat fifth-year fruit.').
normal_obedience(eat_fifth_year_fruit, 'Eat fifth-year fruit.').
concerns(eat_fifth_year_fruit, clean_and_unclean_distinction).
scripture_reference(eat_fifth_year_fruit, 'Leviticus 19:25').
study_note(eat_fifth_year_fruit, 'This command preserves the Torah distinction between clean and unclean and treats eating as part of set-apart living: Eat fifth-year fruit.').

% =============================================================================
% Command Group: Leadership And Warfare
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

% Command: appoint_judges_and_officers
command(appoint_judges_and_officers).
command_title(appoint_judges_and_officers, 'Deu 16:18 - Appoint judges and officers.').
normal_obedience(appoint_judges_and_officers, 'Appoint judges and officers in your gates to judge righteously.').
concerns(appoint_judges_and_officers, justice_and_truth).
scripture_reference(appoint_judges_and_officers, 'Deuteronomy 16:18-20').
story_reference(appoint_judges_and_officers, '2 Chronicles 19:5-7', 'Jehoshaphat appoints judges in the fortified cities of Judah.').
source_term(appoint_judges_and_officers, hebrew, shaphat, 'judge or one who renders judgment in public cases').
source_term(appoint_judges_and_officers, hebrew, shoter, 'officer, official, or overseer associated with public order').
source_term(appoint_judges_and_officers, hebrew, shaar, 'gate; the public place of judgment and civic business').
study_note(appoint_judges_and_officers, 'Justice requires proper public leadership structures.').

% Command: king_write_torah_copy
command(king_write_torah_copy).
command_title(king_write_torah_copy, 'Deu 17:18-20 - King writes a Torah copy.').
normal_obedience(king_write_torah_copy, 'The king writes for himself a copy of the Torah and reads it all his days.').
concerns(king_write_torah_copy, leadership_limits).
scripture_reference(king_write_torah_copy, 'Deuteronomy 17:18-20').
story_reference(king_write_torah_copy, '2 Kings 22:8-13', 'Josiah responds with humility when the book of the Torah is found and read.').
source_term(king_write_torah_copy, hebrew, mishneh, 'copy or duplicate; the king writes a copy of this Torah').
source_term(king_write_torah_copy, hebrew, torah, 'instruction or law; the written standard placed over the king').
study_note(king_write_torah_copy, 'The king is placed under Torah, not above it.').

% Command: king_do_not_multiply_horses_wives_wealth
command(king_do_not_multiply_horses_wives_wealth).
command_title(king_do_not_multiply_horses_wives_wealth, 'Deu 17:16-17 - King must not multiply horses, wives, or wealth.').
normal_obedience(king_do_not_multiply_horses_wives_wealth, 'The king must not multiply horses, wives, or silver and gold for himself.').
concerns(king_do_not_multiply_horses_wives_wealth, leadership_limits).
scripture_reference(king_do_not_multiply_horses_wives_wealth, 'Deuteronomy 17:16-17').
story_reference(king_do_not_multiply_horses_wives_wealth, '1 Kings 10:26-29', 'Solomon multiplies horses and chariots, including horses from Egypt.').
story_reference(king_do_not_multiply_horses_wives_wealth, '1 Kings 11:1-8', 'Solomon multiplies foreign wives and his heart is turned after other gods.').
source_term(king_do_not_multiply_horses_wives_wealth, hebrew, sus, 'horse; royal military strength that the king must not multiply').
source_term(king_do_not_multiply_horses_wives_wealth, hebrew, ishshah, 'wife or woman; the king must not multiply wives').
source_term(king_do_not_multiply_horses_wives_wealth, hebrew, kesef_zahav, 'silver and gold; wealth the king must not greatly multiply for himself').
study_note(king_do_not_multiply_horses_wives_wealth, 'Torah limits royal power and temptation.').

% Command: do_not_return_to_egypt_for_horses
command(do_not_return_to_egypt_for_horses).
command_title(do_not_return_to_egypt_for_horses, 'Deu 17:16 - Do not return to Egypt for horses.').
normal_obedience(do_not_return_to_egypt_for_horses, 'The king must not cause the people to return to Egypt to multiply horses.').
concerns(do_not_return_to_egypt_for_horses, leadership_limits).
scripture_reference(do_not_return_to_egypt_for_horses, 'Deuteronomy 17:16').
story_reference(do_not_return_to_egypt_for_horses, '1 Kings 10:28-29', 'Solomon imports horses from Egypt, showing the danger named in the command.').
source_term(do_not_return_to_egypt_for_horses, hebrew, shuv, 'to return or turn back; the king must not cause a return toward Egypt for horses').
source_term(do_not_return_to_egypt_for_horses, hebrew, mitsrayim, 'Egypt; the place of former bondage named in the royal warning').
study_note(do_not_return_to_egypt_for_horses, 'The command warns against returning to Egypt-like dependence.').

% Command: offer_peace_before_war
command(offer_peace_before_war).
command_title(offer_peace_before_war, 'Deu 20:10 - Offer peace before war.').
normal_obedience(offer_peace_before_war, 'When approaching a city to fight, offer terms of peace first.').
concerns(offer_peace_before_war, warfare_order).
scripture_reference(offer_peace_before_war, 'Deuteronomy 20:10-18').
source_term(offer_peace_before_war, hebrew, shalom, 'peace, wholeness, or terms of peace offered before fighting a city').
source_term(offer_peace_before_war, hebrew, qara, 'to call out or proclaim; the peace terms are proclaimed to the city').
study_note(offer_peace_before_war, 'Torah regulates warfare rather than treating it as unbounded violence.').

% Command: exempt_some_from_battle
command(exempt_some_from_battle).
command_title(exempt_some_from_battle, 'Deu 20:5-9 - Exempt some from battle.').
normal_obedience(exempt_some_from_battle, 'Exempt those with new house, vineyard, betrothal, or fear according to Torah.').
concerns(exempt_some_from_battle, warfare_order).
scripture_reference(exempt_some_from_battle, 'Deuteronomy 20:5-9').
source_term(exempt_some_from_battle, hebrew, chanak, 'to dedicate or inaugurate; used of the man who has built a house but not dedicated it').
source_term(exempt_some_from_battle, hebrew, chalal, 'to begin using or enjoy; used of the man who planted a vineyard but has not enjoyed its fruit').
source_term(exempt_some_from_battle, hebrew, yare, 'fearful or afraid; fear is one of the stated exemptions from battle').
study_note(exempt_some_from_battle, 'Torah gives household and human considerations in military context.').

% Command: keep_camp_clean
command(keep_camp_clean).
command_title(keep_camp_clean, 'Deu 23:9-14 - Keep the camp clean.').
normal_obedience(keep_camp_clean, 'Keep the war camp clean and cover excrement outside the camp.').
concerns(keep_camp_clean, purity_and_camp_holiness).
scripture_reference(keep_camp_clean, 'Deuteronomy 23:9-14').
source_term(keep_camp_clean, hebrew, machaneh, 'camp; the war camp is treated as a place where holiness and cleanliness matter').
source_term(keep_camp_clean, hebrew, ervah, 'nakedness or indecent thing; Deuteronomy 23 warns against uncleanness being seen in the camp').
study_note(keep_camp_clean, 'Camp holiness applies even in military context.').

% Command: do_not_destroy_food_trees_in_siege
command(do_not_destroy_food_trees_in_siege).
command_title(do_not_destroy_food_trees_in_siege, 'Deu 20:19-20 - Do not destroy food trees in siege.').
normal_obedience(do_not_destroy_food_trees_in_siege, 'Do not destroy fruit trees during siege warfare.').
concerns(do_not_destroy_food_trees_in_siege, land_stewardship).
scripture_reference(do_not_destroy_food_trees_in_siege, 'Deuteronomy 20:19-20').
source_term(do_not_destroy_food_trees_in_siege, hebrew, shachath, 'to destroy, ruin, or spoil; the action forbidden against fruit trees in siege').
source_term(do_not_destroy_food_trees_in_siege, hebrew, ets_maakal, 'food tree or tree for eating; the protected kind of tree in siege').
study_note(do_not_destroy_food_trees_in_siege, 'Even warfare has boundaries protecting future provision.').

% -----------------------------------------------------------------------------
% Additional Leadership And Warfare Commands
% -----------------------------------------------------------------------------

% Command: appoint_a_king_only_as_torah_allows
command(appoint_a_king_only_as_torah_allows).
command_title(appoint_a_king_only_as_torah_allows, 'Deuteronomy 17:14-15 - Appoint a king only as Torah allows.').
normal_obedience(appoint_a_king_only_as_torah_allows, 'Appoint a king only as Torah allows.').
concerns(appoint_a_king_only_as_torah_allows, leadership_limits).
scripture_reference(appoint_a_king_only_as_torah_allows, 'Deuteronomy 17:14-15').
story_reference(appoint_a_king_only_as_torah_allows, '1 Samuel 10:20-24', 'Saul is selected from Israel and presented as king before the people.').
story_reference(appoint_a_king_only_as_torah_allows, '1 Samuel 16:1-13', 'YHWH chooses David from among Israel and Samuel anoints him.').
source_term(appoint_a_king_only_as_torah_allows, hebrew, melek, 'king; the office placed under Torah limits').
source_term(appoint_a_king_only_as_torah_allows, hebrew, bachar, 'to choose; the king must be one whom YHWH chooses').
study_note(appoint_a_king_only_as_torah_allows, 'This command places leaders, kings, courts, and military action under Torah rather than personal power: Appoint a king only as Torah allows.').

% Command: do_not_appoint_a_foreigner_as_king_over_israel
command(do_not_appoint_a_foreigner_as_king_over_israel).
command_title(do_not_appoint_a_foreigner_as_king_over_israel, 'Deuteronomy 17:15 - Do not appoint a foreigner as king over Israel.').
normal_obedience(do_not_appoint_a_foreigner_as_king_over_israel, 'Do not appoint a foreigner as king over Israel.').
concerns(do_not_appoint_a_foreigner_as_king_over_israel, leadership_limits).
scripture_reference(do_not_appoint_a_foreigner_as_king_over_israel, 'Deuteronomy 17:15').
story_reference(do_not_appoint_a_foreigner_as_king_over_israel, '1 Samuel 10:20-24', 'Israel receives Saul, an Israelite from Benjamin, as king.').
source_term(do_not_appoint_a_foreigner_as_king_over_israel, hebrew, nokri, 'foreigner or outsider; one who must not be set as king over Israel').
source_term(do_not_appoint_a_foreigner_as_king_over_israel, hebrew, ach, 'brother or kinsman; the king is to be from among Israel''s brothers').
study_note(do_not_appoint_a_foreigner_as_king_over_israel, 'This command places leaders, kings, courts, and military action under Torah rather than personal power: Do not appoint a foreigner as king over Israel.').

% Command: king_must_not_multiply_horses
command(king_must_not_multiply_horses).
command_title(king_must_not_multiply_horses, 'Deuteronomy 17:16 - King must not multiply horses.').
normal_obedience(king_must_not_multiply_horses, 'King must not multiply horses.').
concerns(king_must_not_multiply_horses, leadership_limits).
scripture_reference(king_must_not_multiply_horses, 'Deuteronomy 17:16').
story_reference(king_must_not_multiply_horses, '1 Kings 10:26-29', 'Solomon multiplies horses and chariots.').
source_term(king_must_not_multiply_horses, hebrew, rabah, 'to multiply or increase greatly; the king must not multiply horses').
source_term(king_must_not_multiply_horses, hebrew, sus, 'horse; the military resource restricted for the king').
study_note(king_must_not_multiply_horses, 'This command places leaders, kings, courts, and military action under Torah rather than personal power: King must not multiply horses.').

% Command: king_must_not_cause_the_people_to_return_to_egypt_for_horses
command(king_must_not_cause_the_people_to_return_to_egypt_for_horses).
command_title(king_must_not_cause_the_people_to_return_to_egypt_for_horses, 'Deuteronomy 17:16 - King must not cause the people to return to Egypt for horses.').
normal_obedience(king_must_not_cause_the_people_to_return_to_egypt_for_horses, 'King must not cause the people to return to Egypt for horses.').
concerns(king_must_not_cause_the_people_to_return_to_egypt_for_horses, leadership_limits).
scripture_reference(king_must_not_cause_the_people_to_return_to_egypt_for_horses, 'Deuteronomy 17:16').
story_reference(king_must_not_cause_the_people_to_return_to_egypt_for_horses, '1 Kings 10:28-29', 'Solomon''s horses are imported from Egypt.').
source_term(king_must_not_cause_the_people_to_return_to_egypt_for_horses, hebrew, shuv, 'to return or turn back; the king must not cause the people to return toward Egypt').
source_term(king_must_not_cause_the_people_to_return_to_egypt_for_horses, hebrew, mitsrayim, 'Egypt; named as the forbidden direction of royal dependence for horses').
study_note(king_must_not_cause_the_people_to_return_to_egypt_for_horses, 'This command places leaders, kings, courts, and military action under Torah rather than personal power: King must not cause the people to return to Egypt for horses.').

% Command: king_must_not_multiply_wives
command(king_must_not_multiply_wives).
command_title(king_must_not_multiply_wives, 'Deuteronomy 17:17 - King must not multiply wives.').
normal_obedience(king_must_not_multiply_wives, 'King must not multiply wives.').
concerns(king_must_not_multiply_wives, leadership_limits).
scripture_reference(king_must_not_multiply_wives, 'Deuteronomy 17:17').
story_reference(king_must_not_multiply_wives, '1 Kings 11:1-8', 'Solomon loves many foreign women and his wives turn away his heart.').
source_term(king_must_not_multiply_wives, hebrew, ishshah, 'wife or woman; the king must not multiply wives').
source_term(king_must_not_multiply_wives, hebrew, levav, 'heart; Deuteronomy warns that multiplied wives will turn the king''s heart aside').
study_note(king_must_not_multiply_wives, 'This command places leaders, kings, courts, and military action under Torah rather than personal power: King must not multiply wives.').

% Command: king_must_not_greatly_multiply_silver_and_gold
command(king_must_not_greatly_multiply_silver_and_gold).
command_title(king_must_not_greatly_multiply_silver_and_gold, 'Deuteronomy 17:17 - King must not greatly multiply silver and gold.').
normal_obedience(king_must_not_greatly_multiply_silver_and_gold, 'King must not greatly multiply silver and gold.').
concerns(king_must_not_greatly_multiply_silver_and_gold, leadership_limits).
scripture_reference(king_must_not_greatly_multiply_silver_and_gold, 'Deuteronomy 17:17').
story_reference(king_must_not_greatly_multiply_silver_and_gold, '1 Kings 10:14-25', 'Solomon''s wealth, gold, and royal splendor are multiplied greatly.').
source_term(king_must_not_greatly_multiply_silver_and_gold, hebrew, kesef, 'silver; royal wealth the king must not multiply greatly for himself').
source_term(king_must_not_greatly_multiply_silver_and_gold, hebrew, zahav, 'gold; royal wealth the king must not multiply greatly for himself').
study_note(king_must_not_greatly_multiply_silver_and_gold, 'This command places leaders, kings, courts, and military action under Torah rather than personal power: King must not greatly multiply silver and gold.').

% Command: king_must_write_a_torah_copy
command(king_must_write_a_torah_copy).
command_title(king_must_write_a_torah_copy, 'Deuteronomy 17:18 - King must write a Torah copy.').
normal_obedience(king_must_write_a_torah_copy, 'King must write a Torah copy.').
concerns(king_must_write_a_torah_copy, leadership_limits).
scripture_reference(king_must_write_a_torah_copy, 'Deuteronomy 17:18').
story_reference(king_must_write_a_torah_copy, '2 Kings 22:8-13', 'Josiah responds when the book of the Torah is found and read before him.').
source_term(king_must_write_a_torah_copy, hebrew, kathab, 'to write; the king writes for himself a Torah copy').
source_term(king_must_write_a_torah_copy, hebrew, mishneh_torah, 'copy of the Torah or duplicate instruction placed before the king').
study_note(king_must_write_a_torah_copy, 'This command places leaders, kings, courts, and military action under Torah rather than personal power: King must write a Torah copy.').

% Command: king_must_read_torah_all_his_days
command(king_must_read_torah_all_his_days).
command_title(king_must_read_torah_all_his_days, 'Deuteronomy 17:19 - King must read Torah all his days.').
normal_obedience(king_must_read_torah_all_his_days, 'King must read Torah all his days.').
concerns(king_must_read_torah_all_his_days, leadership_limits).
scripture_reference(king_must_read_torah_all_his_days, 'Deuteronomy 17:19').
story_reference(king_must_read_torah_all_his_days, '2 Kings 23:1-3', 'Josiah reads the book of the covenant before the people and renews covenant obedience.').
source_term(king_must_read_torah_all_his_days, hebrew, qara, 'to read or call aloud; the king reads Torah all his days').
source_term(king_must_read_torah_all_his_days, hebrew, yare, 'to fear or revere; reading Torah teaches the king to fear YHWH').
study_note(king_must_read_torah_all_his_days, 'This command places leaders, kings, courts, and military action under Torah rather than personal power: King must read Torah all his days.').

% Command: offer_peace_to_a_city_before_fighting
command(offer_peace_to_a_city_before_fighting).
command_title(offer_peace_to_a_city_before_fighting, 'Deuteronomy 20:10 - Offer peace to a city before fighting.').
normal_obedience(offer_peace_to_a_city_before_fighting, 'Offer peace to a city before fighting.').
concerns(offer_peace_to_a_city_before_fighting, leadership_limits).
scripture_reference(offer_peace_to_a_city_before_fighting, 'Deuteronomy 20:10').
story_reference(offer_peace_to_a_city_before_fighting, '2 Samuel 20:16-22', 'A wise woman negotiates with Joab, and the city is spared when Sheba is handed over.').
source_term(offer_peace_to_a_city_before_fighting, hebrew, shalom, 'peace or terms of peace offered to a city before battle').
source_term(offer_peace_to_a_city_before_fighting, hebrew, milchamah, 'war or battle; the setting where peace terms must first be offered').
study_note(offer_peace_to_a_city_before_fighting, 'This command places leaders, kings, courts, and military action under Torah rather than personal power: Offer peace to a city before fighting.').

% Command: exempt_from_battle_the_man_with_new_house_vineyard_betrothal_or_fear
command(exempt_from_battle_the_man_with_new_house_vineyard_betrothal_or_fear).
command_title(exempt_from_battle_the_man_with_new_house_vineyard_betrothal_or_fear, 'Deuteronomy 20:5-9 - Exempt from battle the man with new house, vineyard, betrothal, or fear.').
normal_obedience(exempt_from_battle_the_man_with_new_house_vineyard_betrothal_or_fear, 'Exempt from battle the man with new house, vineyard, betrothal, or fear.').
concerns(exempt_from_battle_the_man_with_new_house_vineyard_betrothal_or_fear, leadership_limits).
scripture_reference(exempt_from_battle_the_man_with_new_house_vineyard_betrothal_or_fear, 'Deuteronomy 20:5-9').
story_reference(exempt_from_battle_the_man_with_new_house_vineyard_betrothal_or_fear, 'Judges 7:3', 'Gideon announces that whoever is fearful may return, and many leave the army.').
source_term(exempt_from_battle_the_man_with_new_house_vineyard_betrothal_or_fear, hebrew, bayith_chadash, 'new house; one of the household reasons for battle exemption').
source_term(exempt_from_battle_the_man_with_new_house_vineyard_betrothal_or_fear, hebrew, kerem, 'vineyard; one of the livelihood reasons for battle exemption').
source_term(exempt_from_battle_the_man_with_new_house_vineyard_betrothal_or_fear, hebrew, aras, 'to betroth; a betrothed man is included in the exemptions').
study_note(exempt_from_battle_the_man_with_new_house_vineyard_betrothal_or_fear, 'This command places leaders, kings, courts, and military action under Torah rather than personal power: Exempt from battle the man with new house, vineyard, betrothal, or fear.').

% Command: do_not_fear_enemies_in_battle_when_priest_gives_the_torah_exhortation
command(do_not_fear_enemies_in_battle_when_priest_gives_the_torah_exhortation).
command_title(do_not_fear_enemies_in_battle_when_priest_gives_the_torah_exhortation, 'Deuteronomy 20:1-4 - Do not fear enemies in battle when priest gives the Torah exhortation.').
normal_obedience(do_not_fear_enemies_in_battle_when_priest_gives_the_torah_exhortation, 'Do not fear enemies in battle when priest gives the Torah exhortation.').
concerns(do_not_fear_enemies_in_battle_when_priest_gives_the_torah_exhortation, leadership_limits).
scripture_reference(do_not_fear_enemies_in_battle_when_priest_gives_the_torah_exhortation, 'Deuteronomy 20:1-4').
story_reference(do_not_fear_enemies_in_battle_when_priest_gives_the_torah_exhortation, '2 Chronicles 20:14-23', 'Jahaziel tells Judah not to fear the great army, and YHWH delivers them.').
source_term(do_not_fear_enemies_in_battle_when_priest_gives_the_torah_exhortation, hebrew, yare, 'to fear; the command forbids fear when YHWH goes with Israel in battle').
source_term(do_not_fear_enemies_in_battle_when_priest_gives_the_torah_exhortation, hebrew, kohen, 'priest; the priest gives the battle exhortation in Deuteronomy 20').
study_note(do_not_fear_enemies_in_battle_when_priest_gives_the_torah_exhortation, 'This command places leaders, kings, courts, and military action under Torah rather than personal power: Do not fear enemies in battle when priest gives the Torah exhortation.').

% Command: do_not_destroy_fruit_trees_in_siege
command(do_not_destroy_fruit_trees_in_siege).
command_title(do_not_destroy_fruit_trees_in_siege, 'Deuteronomy 20:19-20 - Do not destroy fruit trees in siege.').
normal_obedience(do_not_destroy_fruit_trees_in_siege, 'Do not destroy fruit trees in siege.').
concerns(do_not_destroy_fruit_trees_in_siege, leadership_limits).
scripture_reference(do_not_destroy_fruit_trees_in_siege, 'Deuteronomy 20:19-20').
source_term(do_not_destroy_fruit_trees_in_siege, hebrew, shachath, 'to destroy, spoil, or ruin; the action forbidden against fruit trees in siege').
source_term(do_not_destroy_fruit_trees_in_siege, hebrew, ets, 'tree; Deuteronomy protects food trees during siege').
study_note(do_not_destroy_fruit_trees_in_siege, 'This command places leaders, kings, courts, and military action under Torah rather than personal power: Do not destroy fruit trees in siege.').

% Command: keep_the_war_camp_clean
command(keep_the_war_camp_clean).
command_title(keep_the_war_camp_clean, 'Deuteronomy 23:9-14 - Keep the war camp clean.').
normal_obedience(keep_the_war_camp_clean, 'Keep the war camp clean.').
concerns(keep_the_war_camp_clean, leadership_limits).
scripture_reference(keep_the_war_camp_clean, 'Deuteronomy 23:9-14').
source_term(keep_the_war_camp_clean, hebrew, machaneh, 'camp; the military camp is to be kept holy and clean').
source_term(keep_the_war_camp_clean, hebrew, qadosh, 'holy or set apart; Deuteronomy calls the camp holy because YHWH walks there').
study_note(keep_the_war_camp_clean, 'This command places leaders, kings, courts, and military action under Torah rather than personal power: Keep the war camp clean.').

% Command: designate_a_place_outside_the_camp
command(designate_a_place_outside_the_camp).
command_title(designate_a_place_outside_the_camp, 'Deuteronomy 23:12 - Designate a place outside the camp.').
normal_obedience(designate_a_place_outside_the_camp, 'Designate a place outside the camp.').
concerns(designate_a_place_outside_the_camp, leadership_limits).
scripture_reference(designate_a_place_outside_the_camp, 'Deuteronomy 23:12').
source_term(designate_a_place_outside_the_camp, hebrew, yad, 'place or side; here a designated place outside the camp').
source_term(designate_a_place_outside_the_camp, hebrew, chutz, 'outside; the location boundary for the camp sanitation place').
study_note(designate_a_place_outside_the_camp, 'This command places leaders, kings, courts, and military action under Torah rather than personal power: Designate a place outside the camp.').

% Command: carry_a_digging_tool_with_your_equipment_and_cover_excrement
command(carry_a_digging_tool_with_your_equipment_and_cover_excrement).
command_title(carry_a_digging_tool_with_your_equipment_and_cover_excrement, 'Deuteronomy 23:13 - Carry a digging tool with your equipment and cover excrement.').
normal_obedience(carry_a_digging_tool_with_your_equipment_and_cover_excrement, 'Carry a digging tool with your equipment and cover excrement.').
concerns(carry_a_digging_tool_with_your_equipment_and_cover_excrement, leadership_limits).
scripture_reference(carry_a_digging_tool_with_your_equipment_and_cover_excrement, 'Deuteronomy 23:13').
source_term(carry_a_digging_tool_with_your_equipment_and_cover_excrement, hebrew, yathed, 'peg, pin, or digging tool carried with equipment').
source_term(carry_a_digging_tool_with_your_equipment_and_cover_excrement, hebrew, tsaat, 'excrement or what comes out; the waste to be covered outside the camp').
source_term(carry_a_digging_tool_with_your_equipment_and_cover_excrement, hebrew, kasah, 'to cover; the commanded action after relieving oneself').
study_note(carry_a_digging_tool_with_your_equipment_and_cover_excrement, 'This command places leaders, kings, courts, and military action under Torah rather than personal power: Carry a digging tool with your equipment and cover excrement.').
clarification_note(carry_a_digging_tool_with_your_equipment_and_cover_excrement, 'Although this seems to only pertain to soldiers or those moving about in the wilderness, this can still be observed by those who may be nomadic or in the wilderness as it is a cleanliness observance. Good for hygene.').

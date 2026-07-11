% =============================================================================
% Command Group: Text-Specific Detail Commands
% Author: rpadgett
%
% These entries focus on commands that are often over-generalized in summaries.
% Wording is intentionally close to the written Torah text.
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

% Command: do_not_wear_wool_and_linen_together
command(do_not_wear_wool_and_linen_together).
command_title(do_not_wear_wool_and_linen_together, 'Deu 22:11 - Do not wear wool and linen together.').
normal_obedience(do_not_wear_wool_and_linen_together, 'Do not wear a garment woven of wool and linen together.').
concerns(do_not_wear_wool_and_linen_together, mixed_kinds_boundary).
scripture_reference(do_not_wear_wool_and_linen_together, 'Deuteronomy 22:11').
scripture_reference(do_not_wear_wool_and_linen_together, 'Leviticus 19:19').
study_note(do_not_wear_wool_and_linen_together, 'Catalog wording follows Deuteronomy 22:11. This is not generalized here as a ban on all mixed fabrics.').

% Command: do_not_sow_field_with_two_kinds_of_seed
command(do_not_sow_field_with_two_kinds_of_seed).
command_title(do_not_sow_field_with_two_kinds_of_seed, 'Lev 19:19 - Do not sow a field with mixed seed.').
normal_obedience(do_not_sow_field_with_two_kinds_of_seed, 'Do not sow a field with two kinds of seed.').
concerns(do_not_sow_field_with_two_kinds_of_seed, mixed_kinds_boundary).
scripture_reference(do_not_sow_field_with_two_kinds_of_seed, 'Leviticus 19:19').
study_note(do_not_sow_field_with_two_kinds_of_seed, 'This entry keeps the agricultural seed command distinct from the wool-and-linen garment command.').

% Command: do_not_sow_vineyard_with_mixed_seed
command(do_not_sow_vineyard_with_mixed_seed).
command_title(do_not_sow_vineyard_with_mixed_seed, 'Deu 22:9 - Do not sow a vineyard with mixed seed.').
normal_obedience(do_not_sow_vineyard_with_mixed_seed, 'Do not sow a vineyard with two kinds of seed, lest the produce be forfeited.').
concerns(do_not_sow_vineyard_with_mixed_seed, mixed_kinds_boundary).
scripture_reference(do_not_sow_vineyard_with_mixed_seed, 'Deuteronomy 22:9').
study_note(do_not_sow_vineyard_with_mixed_seed, 'The vineyard command has its own stated consequence and is cataloged separately.').

% Command: do_not_plow_with_ox_and_donkey_together
command(do_not_plow_with_ox_and_donkey_together).
command_title(do_not_plow_with_ox_and_donkey_together, 'Deu 22:10 - Do not plow with an ox and donkey together.').
normal_obedience(do_not_plow_with_ox_and_donkey_together, 'Do not plow with an ox and donkey together.').
concerns(do_not_plow_with_ox_and_donkey_together, animal_welfare).
scripture_reference(do_not_plow_with_ox_and_donkey_together, 'Deuteronomy 22:10').
story_reference(do_not_plow_with_ox_and_donkey_together, '1 Kings 19:19-21', 'Elisha is found plowing with oxen, an ordinary field-work setting for the kind of labor named in the command.').

% Command: do_not_crossbreed_livestock
command(do_not_crossbreed_livestock).
command_title(do_not_crossbreed_livestock, 'Lev 19:19 - Do not let livestock breed with another kind.').
normal_obedience(do_not_crossbreed_livestock, 'Do not let livestock breed with a different kind.').
concerns(do_not_crossbreed_livestock, mixed_kinds_boundary).
scripture_reference(do_not_crossbreed_livestock, 'Leviticus 19:19').
study_note(do_not_crossbreed_livestock, 'This is the animal-kind command from Leviticus 19:19.').

% Command: make_parapet_for_roof
command(make_parapet_for_roof).
command_title(make_parapet_for_roof, 'Deu 22:8 - Make a parapet for your roof.').
normal_obedience(make_parapet_for_roof, 'Make a parapet for a new house roof so bloodguilt is not brought on the house.').
concerns(make_parapet_for_roof, neighbor_protection).
scripture_reference(make_parapet_for_roof, 'Deuteronomy 22:8').
study_note(make_parapet_for_roof, 'The command is a concrete safety requirement for a roof used in household life.').

% Command: send_mother_bird_away
command(send_mother_bird_away).
command_title(send_mother_bird_away, 'Deu 22:6-7 - Send away the mother bird.').
normal_obedience(send_mother_bird_away, 'If taking eggs or young birds, send the mother bird away and take only the young.').
concerns(send_mother_bird_away, animal_welfare).
scripture_reference(send_mother_bird_away, 'Deuteronomy 22:6-7').
study_note(send_mother_bird_away, 'This command is tied to finding a bird nest along the way.').

% Command: do_not_muzzle_ox_while_treading
command(do_not_muzzle_ox_while_treading).
command_title(do_not_muzzle_ox_while_treading, 'Deu 25:4 - Do not muzzle an ox while it treads grain.').
normal_obedience(do_not_muzzle_ox_while_treading, 'Do not muzzle an ox while it is treading out grain.').
concerns(do_not_muzzle_ox_while_treading, animal_welfare).
scripture_reference(do_not_muzzle_ox_while_treading, 'Deuteronomy 25:4').
study_note(do_not_muzzle_ox_while_treading, 'The wording is specific to an ox working grain.').

% Command: do_not_boil_kid_in_mothers_milk
command(do_not_boil_kid_in_mothers_milk).
command_title(do_not_boil_kid_in_mothers_milk, 'Exo 23:19 - Do not boil a kid in its mother''s milk.').
normal_obedience(do_not_boil_kid_in_mothers_milk, 'Do not boil a young goat in its mother''s milk.').
concerns(do_not_boil_kid_in_mothers_milk, animal_welfare).
scripture_reference(do_not_boil_kid_in_mothers_milk, 'Exodus 23:19').
scripture_reference(do_not_boil_kid_in_mothers_milk, 'Exodus 34:26').
scripture_reference(do_not_boil_kid_in_mothers_milk, 'Deuteronomy 14:21').
study_note(do_not_boil_kid_in_mothers_milk, 'Catalog wording follows the Torah text. It is not expanded here into a broader man-made rule.').

% Command: rest_working_animals_on_sabbath
command(rest_working_animals_on_sabbath).
command_title(rest_working_animals_on_sabbath, 'Exo 23:12 - Let working animals rest on Sabbath.').
normal_obedience(rest_working_animals_on_sabbath, 'Let ox, donkey, servants, and the stranger be refreshed on the seventh day.').
concerns(rest_working_animals_on_sabbath, sabbath_rest).
scripture_reference(rest_working_animals_on_sabbath, 'Exodus 23:12').
study_note(rest_working_animals_on_sabbath, 'Sabbath rest extends to household workers and working animals.').

% Command: release_hebrew_servant_in_seventh_year
command(release_hebrew_servant_in_seventh_year).
command_title(release_hebrew_servant_in_seventh_year, 'Exo 21:2 - Release a Hebrew servant in the seventh year.').
normal_obedience(release_hebrew_servant_in_seventh_year, 'A Hebrew servant serves six years and goes free in the seventh.').
concerns(release_hebrew_servant_in_seventh_year, servant_release_mercy).
scripture_reference(release_hebrew_servant_in_seventh_year, 'Exodus 21:2-6').
scripture_reference(release_hebrew_servant_in_seventh_year, 'Deuteronomy 15:12').
scripture_reference(release_hebrew_servant_in_seventh_year, 'Exodus 21:2').
story_reference(release_hebrew_servant_in_seventh_year, 'Jeremiah 34:8-17', 'Jeremiah rebukes Judah for releasing servants and then taking them back into bondage.').
study_note(release_hebrew_servant_in_seventh_year, 'This applies within Torah servant-release law.').

% Command: furnish_released_servant
command(furnish_released_servant).
command_title(furnish_released_servant, 'Deu 15:13-14 - Furnish the released servant.').
normal_obedience(furnish_released_servant, 'When a Hebrew servant is released, do not send him away empty; furnish him liberally.').
concerns(furnish_released_servant, servant_release_mercy).
scripture_reference(furnish_released_servant, 'Deuteronomy 15:13-14').
scripture_reference(furnish_released_servant, 'Deuteronomy 15:14').
story_reference(furnish_released_servant, 'Jeremiah 34:8-17', 'The servant-release failure in Jeremiah shows the seriousness of release obligations.').
study_note(furnish_released_servant, 'Release includes provision, not merely dismissal.').

% Command: do_not_send_released_servant_empty
command(do_not_send_released_servant_empty).
command_title(do_not_send_released_servant_empty, 'Deu 15:13 - Do not send released servant away empty.').
normal_obedience(do_not_send_released_servant_empty, 'Do not send a released Hebrew servant away empty-handed.').
concerns(do_not_send_released_servant_empty, servant_release_mercy).
scripture_reference(do_not_send_released_servant_empty, 'Deuteronomy 15:13').
story_reference(do_not_send_released_servant_empty, 'Jeremiah 34:8-17', 'Judah breaks covenant by reclaiming released servants, showing a release-law violation.').
study_note(do_not_send_released_servant_empty, 'This is the negative side of furnishing the released servant.').

% Command: allow_servant_to_choose_lifelong_service
command(allow_servant_to_choose_lifelong_service).
command_title(allow_servant_to_choose_lifelong_service, 'Exo 21:5-6 - Servant may choose lifelong service.').
normal_obedience(allow_servant_to_choose_lifelong_service, 'If the servant plainly says he loves his master and household, bring him for the ear-piercing procedure.').
concerns(allow_servant_to_choose_lifelong_service, servant_release_mercy).
scripture_reference(allow_servant_to_choose_lifelong_service, 'Exodus 21:5-6').
scripture_reference(allow_servant_to_choose_lifelong_service, 'Deuteronomy 15:16-17').
study_note(allow_servant_to_choose_lifelong_service, 'The command is tied to a voluntary declaration by the servant.').

% Command: do_not_rule_over_servant_ruthlessly
command(do_not_rule_over_servant_ruthlessly).
command_title(do_not_rule_over_servant_ruthlessly, 'Lev 25:43 - Do not rule over a servant ruthlessly.').
concerns(do_not_rule_over_servant_ruthlessly, servant_release_mercy).
scripture_reference(do_not_rule_over_servant_ruthlessly, 'Leviticus 25:39-43').
study_note(do_not_rule_over_servant_ruthlessly, 'The command limits treatment of an impoverished brother serving in the household.').

% Command: redeem_poor_brother_sold_to_stranger
command(redeem_poor_brother_sold_to_stranger).
command_title(redeem_poor_brother_sold_to_stranger, 'Lev 25:47-54 - Redeem a poor brother sold to a stranger.').
normal_obedience(redeem_poor_brother_sold_to_stranger, 'A poor brother sold to a stranger may be redeemed by his relatives according to Torah.').
concerns(redeem_poor_brother_sold_to_stranger, servant_release_mercy).
scripture_reference(redeem_poor_brother_sold_to_stranger, 'Leviticus 25:47-54').
study_note(redeem_poor_brother_sold_to_stranger, 'This command is part of redemption and release protections.').

% Command: pay_restitution_for_theft
command(pay_restitution_for_theft).
command_title(pay_restitution_for_theft, 'Exo 22:1-4 - Pay restitution for theft.').
normal_obedience(pay_restitution_for_theft, 'Pay restitution for stolen ox, sheep, or property according to Torah.').
concerns(pay_restitution_for_theft, damages_and_restitution).
scripture_reference(pay_restitution_for_theft, 'Exodus 22:1-4').
story_reference(pay_restitution_for_theft, '2 Samuel 12:1-6', 'David recognizes that the rich man in Nathan''s parable should restore fourfold.').
study_note(pay_restitution_for_theft, 'The restitution amount depends on the specific theft case.').

% Command: pay_for_pit_damage
command(pay_for_pit_damage).
command_title(pay_for_pit_damage, 'Exo 21:33-34 - Pay for pit damage.').
normal_obedience(pay_for_pit_damage, 'If an opened or dug pit causes animal loss, the responsible person pays restitution.').
concerns(pay_for_pit_damage, damages_and_restitution).
scripture_reference(pay_for_pit_damage, 'Exodus 21:33-34').
source_term(pay_for_pit_damage, hebrew, bor, 'pit, cistern, or open hole; responsibility is assigned when it is opened or dug and not covered').
source_term(pay_for_pit_damage, hebrew, kasah, 'to cover; the case turns on failing to cover the pit').
study_note(pay_for_pit_damage, 'Torah assigns responsibility for preventable hazards.').

% Command: pay_for_fire_damage
command(pay_for_fire_damage).
command_title(pay_for_fire_damage, 'Exo 22:6 - Pay for fire damage.').
normal_obedience(pay_for_fire_damage, 'If fire spreads and consumes grain or field, the one who kindled the fire pays restitution.').
concerns(pay_for_fire_damage, damages_and_restitution).
scripture_reference(pay_for_fire_damage, 'Exodus 22:6').
source_term(pay_for_fire_damage, hebrew, esh, 'fire; the case concerns fire spreading and consuming stacked grain, standing grain, or field').
source_term(pay_for_fire_damage, hebrew, shalam, 'to repay, make whole, or restore for the damage caused').
study_note(pay_for_fire_damage, 'The command covers damage caused by fire spreading.').

% Command: pay_for_grazing_damage
command(pay_for_grazing_damage).
command_title(pay_for_grazing_damage, 'Exo 22:5 - Pay for grazing damage.').
normal_obedience(pay_for_grazing_damage, 'If livestock grazes in another field or vineyard, pay from the best of field or vineyard.').
concerns(pay_for_grazing_damage, damages_and_restitution).
scripture_reference(pay_for_grazing_damage, 'Exodus 22:5').
source_term(pay_for_grazing_damage, hebrew, baar, 'to consume, burn up, or let livestock graze; context concerns damage caused when animals feed in another field').
source_term(pay_for_grazing_damage, hebrew, meytav, 'the best or choicest; restitution is paid from the best of field or vineyard').
study_note(pay_for_grazing_damage, 'The command addresses property damage from livestock.').

% Command: judge_goring_ox_case
command(judge_goring_ox_case).
command_title(judge_goring_ox_case, 'Exo 21:28-32 - Judge the goring ox case.').
normal_obedience(judge_goring_ox_case, 'Handle cases of an ox goring a person according to Torah.').
concerns(judge_goring_ox_case, damages_and_restitution).
scripture_reference(judge_goring_ox_case, 'Exodus 21:28-32').
study_note(judge_goring_ox_case, 'The passage distinguishes first incident from known dangerous animal negligence.').

% Command: repay_borrowed_animal_loss
command(repay_borrowed_animal_loss).
command_title(repay_borrowed_animal_loss, 'Exo 22:14-15 - Repay borrowed animal loss.').
normal_obedience(repay_borrowed_animal_loss, 'If a borrowed animal is injured or dies while its owner is absent, make restitution according to Torah.').
concerns(repay_borrowed_animal_loss, damages_and_restitution).
scripture_reference(repay_borrowed_animal_loss, 'Exodus 22:14-15').
study_note(repay_borrowed_animal_loss, 'Borrowing carries responsibility in Torah property law.').

% Command: establish_cities_of_refuge
command(establish_cities_of_refuge).
command_title(establish_cities_of_refuge, 'Num 35 - Establish cities of refuge.').
normal_obedience(establish_cities_of_refuge, 'Set apart cities of refuge for the manslayer who kills unintentionally.').
concerns(establish_cities_of_refuge, refuge_and_bloodguilt).
scripture_reference(establish_cities_of_refuge, 'Numbers 35:9-15').
scripture_reference(establish_cities_of_refuge, 'Deuteronomy 19:1-13').
story_reference(establish_cities_of_refuge, 'Joshua 20:1-9', 'Joshua appoints the cities of refuge as YHWH commanded through Moses.').
study_note(establish_cities_of_refuge, 'This command requires land and judicial structures.').

% Command: manslayer_flee_to_refuge
command(manslayer_flee_to_refuge).
command_title(manslayer_flee_to_refuge, 'Num 35:11 - Manslayer may flee to refuge.').
normal_obedience(manslayer_flee_to_refuge, 'The unintentional manslayer may flee to a city of refuge.').
concerns(manslayer_flee_to_refuge, refuge_and_bloodguilt).
scripture_reference(manslayer_flee_to_refuge, 'Numbers 35:11-12').
scripture_reference(manslayer_flee_to_refuge, 'Deuteronomy 19:4-6').
story_reference(manslayer_flee_to_refuge, 'Joshua 20:1-9', 'The cities of refuge are appointed so the manslayer can flee there.').
study_note(manslayer_flee_to_refuge, 'Refuge protects from blood avenger until judgment.').

% Command: do_not_accept_ransom_for_murderer
command(do_not_accept_ransom_for_murderer).
command_title(do_not_accept_ransom_for_murderer, 'Num 35:31 - Do not accept ransom for a murderer.').
normal_obedience(do_not_accept_ransom_for_murderer, 'Do not accept ransom for the life of a murderer guilty of death.').
concerns(do_not_accept_ransom_for_murderer, refuge_and_bloodguilt).
scripture_reference(do_not_accept_ransom_for_murderer, 'Numbers 35:31').
source_term(do_not_accept_ransom_for_murderer, hebrew, 'kōp̄er', 'The kjv uses satisfaction which can also mean ransom, bribe or a sum of money').
study_note(do_not_accept_ransom_for_murderer, 'This command belongs to public judgment and bloodguilt law.').

% Command: do_not_accept_ransom_to_leave_refuge
command(do_not_accept_ransom_to_leave_refuge).
command_title(do_not_accept_ransom_to_leave_refuge, 'Num 35:32 - Do not accept ransom to leave refuge early.').
normal_obedience(do_not_accept_ransom_to_leave_refuge, 'Do not accept ransom for one who fled to a city of refuge to return before the priest dies.').
concerns(do_not_accept_ransom_to_leave_refuge, refuge_and_bloodguilt).
scripture_reference(do_not_accept_ransom_to_leave_refuge, 'Numbers 35:32').
study_note(do_not_accept_ransom_to_leave_refuge, 'This command keeps refuge timing tied to the Torah process.').

% Command: give_certificate_of_divorce
command(give_certificate_of_divorce).
command_title(give_certificate_of_divorce, 'Deu 24:1 - Give a certificate of divorce.').
normal_obedience(give_certificate_of_divorce, 'When the Torah divorce case occurs, write a certificate of divorce and send her out.').
concerns(give_certificate_of_divorce, marriage_household_procedure).
scripture_reference(give_certificate_of_divorce, 'Deuteronomy 24:1-4').

% Command: do_not_remarry_former_wife_after_second_marriage
command(do_not_remarry_former_wife_after_second_marriage).
command_title(do_not_remarry_former_wife_after_second_marriage, 'Deu 24:4 - Do not remarry former wife after another marriage.').
normal_obedience(do_not_remarry_former_wife_after_second_marriage, 'A former husband may not take back his divorced wife after she has become another man''s wife.').
concerns(do_not_remarry_former_wife_after_second_marriage, marriage_household_procedure).
scripture_reference(do_not_remarry_former_wife_after_second_marriage, 'Deuteronomy 24:1-4').
study_note(do_not_remarry_former_wife_after_second_marriage, 'The command is specific to the case described in Deuteronomy 24.').
study_note(do_not_remarry_former_wife_after_second_marriage, 'mentioned as an abomination').

% Command: perform_levirate_marriage
command(perform_levirate_marriage).
command_title(perform_levirate_marriage, 'Deu 25:5-6 - Perform levirate marriage.').
normal_obedience(perform_levirate_marriage, 'When brothers dwell together and one dies childless, the brother performs the levirate duty.').
concerns(perform_levirate_marriage, marriage_household_procedure).
scripture_reference(perform_levirate_marriage, 'Deuteronomy 25:5-6').
story_reference(perform_levirate_marriage, 'Genesis 38:6-11', 'Judah tells Onan to perform the brother-in-law duty for Tamar.').
story_reference(perform_levirate_marriage, 'Ruth 4:1-10', 'Boaz redeems Ruth and raises up the name of the dead upon his inheritance.').
study_note(perform_levirate_marriage, 'This applies to the specific household and inheritance case in the passage.').

% Command: perform_halitzah_if_levirate_refused
command(perform_halitzah_if_levirate_refused).
command_title(perform_halitzah_if_levirate_refused, 'Deu 25:7-10 - Perform halitzah if levirate duty is refused.').
normal_obedience(perform_halitzah_if_levirate_refused, 'If the brother refuses levirate duty, perform the shoe-removal procedure before the elders.').
concerns(perform_halitzah_if_levirate_refused, marriage_household_procedure).
scripture_reference(perform_halitzah_if_levirate_refused, 'Deuteronomy 25:7-10').
story_reference(perform_halitzah_if_levirate_refused, 'Ruth 4:7-8', 'The nearer redeemer removes his sandal in the gate when declining redemption.').
study_note(perform_halitzah_if_levirate_refused, 'The procedure is tied to elders and the named refusal case.').

% Command: captive_woman_waiting_period
command(captive_woman_waiting_period).
command_title(captive_woman_waiting_period, 'Deu 21:10-13 - Captive woman waiting period.').
normal_obedience(captive_woman_waiting_period, 'A captive woman taken for marriage shaves her head, trims nails, removes captivity garments, and mourns a month before marriage.').
concerns(captive_woman_waiting_period, marriage_household_procedure).
scripture_reference(captive_woman_waiting_period, 'Deuteronomy 21:10-13').
study_note(captive_woman_waiting_period, 'This is a warfare-household command from a specific Torah case.').

% Command: do_not_sell_captive_woman
command(do_not_sell_captive_woman).
command_title(do_not_sell_captive_woman, 'Deu 21:14 - Do not sell the captive woman.').
normal_obedience(do_not_sell_captive_woman, 'If the captive woman is not delighted in, let her go free and do not sell her for money.').
concerns(do_not_sell_captive_woman, marriage_household_procedure).
scripture_reference(do_not_sell_captive_woman, 'Deuteronomy 21:14').
study_note(do_not_sell_captive_woman, 'The command protects the woman from being treated as merchandise after the case described.').

% Command: nazirite_abstain_from_wine_and_grape_products
command(nazirite_abstain_from_wine_and_grape_products).
command_title(nazirite_abstain_from_wine_and_grape_products, 'Num 6:3-4 - Nazirite abstains from wine and grape products.').
normal_obedience(nazirite_abstain_from_wine_and_grape_products, 'During a Nazirite vow, abstain from wine, strong drink, and grape products as stated.').
concerns(nazirite_abstain_from_wine_and_grape_products, vow_separation).
scripture_reference(nazirite_abstain_from_wine_and_grape_products, 'Numbers 6:1-4').
scripture_reference(nazirite_abstain_from_wine_and_grape_products, 'Numbers 6:3').
scripture_reference(nazirite_abstain_from_wine_and_grape_products, 'Numbers 6:4').
story_reference(nazirite_abstain_from_wine_and_grape_products, 'Judges 13:3-7', 'Samson''s mother is told that the child will be a Nazirite from the womb and that wine and strong drink are forbidden.').
study_note(nazirite_abstain_from_wine_and_grape_products, 'This applies during Nazirite vow status.').

% Command: nazirite_let_hair_grow
command(nazirite_let_hair_grow).
command_title(nazirite_let_hair_grow, 'Num 6:5 - Nazirite lets hair grow.').
normal_obedience(nazirite_let_hair_grow, 'During the Nazirite vow, no razor passes over the head; the hair grows.').
concerns(nazirite_let_hair_grow, vow_separation).
scripture_reference(nazirite_let_hair_grow, 'Numbers 6:5').
story_reference(nazirite_let_hair_grow, 'Judges 13:5', 'No razor is to come upon Samson''s head because he is a Nazirite from the womb.').
story_reference(nazirite_let_hair_grow, 'Judges 16:17-22', 'Samson explains the Nazirite hair sign, and his hair begins to grow again after it is shaved.').
study_note(nazirite_let_hair_grow, 'Hair growth is part of the visible separation of the vow.').

% Command: nazirite_avoid_corpse_impurity
command(nazirite_avoid_corpse_impurity).
command_title(nazirite_avoid_corpse_impurity, 'Num 6:6-7 - Nazirite avoids corpse impurity.').
normal_obedience(nazirite_avoid_corpse_impurity, 'During the Nazirite vow, do not go near a dead body, even for close family.').
concerns(nazirite_avoid_corpse_impurity, vow_separation).
scripture_reference(nazirite_avoid_corpse_impurity, 'Numbers 6:6-7').
story_reference(nazirite_avoid_corpse_impurity, 'Judges 14:8-9', 'Samson takes honey from the carcass of the lion, a narrative point to compare with Nazirite impurity boundaries.').
study_note(nazirite_avoid_corpse_impurity, 'This is stricter than ordinary corpse contact because of Nazirite status.').

% Command: nazirite_complete_vow_offerings
command(nazirite_complete_vow_offerings).
command_title(nazirite_complete_vow_offerings, 'Num 6:13-20 - Nazirite completes vow offerings.').
normal_obedience(nazirite_complete_vow_offerings, 'At completion of the Nazirite days, bring the offerings and shave according to Torah.').
concerns(nazirite_complete_vow_offerings, vow_separation).
scripture_reference(nazirite_complete_vow_offerings, 'Numbers 6:13-20').
study_note(nazirite_complete_vow_offerings, 'Completion of the vow involves priestly service and offerings.').

% Command: sotah_bitter_water_procedure
command(sotah_bitter_water_procedure).
command_title(sotah_bitter_water_procedure, 'Num 5:11-31 - Sotah bitter water procedure.').
normal_obedience(sotah_bitter_water_procedure, 'When the jealousy case described by Torah arises, the priest performs the bitter water procedure.').
concerns(sotah_bitter_water_procedure, marriage_household_procedure).
scripture_reference(sotah_bitter_water_procedure, 'Numbers 5:11-31').
study_note(sotah_bitter_water_procedure, 'This is a priestly/court-adjacent procedure tied to the specific jealousy case in Numbers 5.').

% Command: priestly_blessing
command(priestly_blessing).
command_title(priestly_blessing, 'Num 6:22-27 - Priests bless Israel with YHWH''s words.').
normal_obedience(priestly_blessing, 'Aaron and his sons bless Israel using the words YHWH gave.').
concerns(priestly_blessing, priestly_holiness).
scripture_reference(priestly_blessing, 'Numbers 6:22-27').
story_reference(priestly_blessing, 'Leviticus 9:22', 'Aaron lifts his hands toward the people and blesses them after the offerings.').
story_reference(priestly_blessing, '2 Chronicles 30:27', 'The priests and Levites bless the people, and their voice is heard.').
study_note(priestly_blessing, 'The blessing wording is given directly in Torah and belongs to priestly service.').

% -----------------------------------------------------------------------------
% Additional Text-Specific Commands
% -----------------------------------------------------------------------------

% Command: do_not_wear_what_pertains_to_a_man_woman_as_stated_in_torah
command(do_not_wear_what_pertains_to_a_man_woman_as_stated_in_torah).
command_title(do_not_wear_what_pertains_to_a_man_woman_as_stated_in_torah, 'Deuteronomy 22:5 - Do not wear what pertains to a man/woman as stated in Torah.').
normal_obedience(do_not_wear_what_pertains_to_a_man_woman_as_stated_in_torah, 'Do not wear what pertains to a man/woman as stated in Torah.').
concerns(do_not_wear_what_pertains_to_a_man_woman_as_stated_in_torah, mixed_kinds_boundary).
scripture_reference(do_not_wear_what_pertains_to_a_man_woman_as_stated_in_torah, 'Deuteronomy 22:5').
study_note(do_not_wear_what_pertains_to_a_man_woman_as_stated_in_torah, 'This command preserves a Torah boundary around kinds, garments, fields, animals, or visible bodily practice: Do not wear what pertains to a man/woman as stated in Torah.').

% Command: do_not_round_the_side_growth_of_the_head
command(do_not_round_the_side_growth_of_the_head).
command_title(do_not_round_the_side_growth_of_the_head, 'Leviticus 19:27 - Do not round the side-growth of the head.').
normal_obedience(do_not_round_the_side_growth_of_the_head, 'Do not round the side-growth of the head.').
concerns(do_not_round_the_side_growth_of_the_head, mixed_kinds_boundary).
scripture_reference(do_not_round_the_side_growth_of_the_head, 'Leviticus 19:27').
source_term(do_not_round_the_side_growth_of_the_head, hebrew, naqaph, 'round / strike around').
source_term(do_not_round_the_side_growth_of_the_head, hebrew, peah, 'edge, corner, or side; Leviticus 19:27 speaks of the side-growth or corners of the head').
source_term(do_not_round_the_side_growth_of_the_head, hebrew, rosh, 'head; the command concerns the side-growth or corners of the head').
translation_note(do_not_round_the_side_growth_of_the_head, 'KJV says, "Ye shall not round the corners of your heads."').
clarification_note(do_not_round_the_side_growth_of_the_head, 'The Hebrew naqaph can carry the sense of going around, striking, or cutting off around; this entry should not be broadened beyond the wording of Leviticus 19:27 without further study.').
study_note(do_not_round_the_side_growth_of_the_head, 'Catalog wording preserves the text-specific command rather than turning it into a general hairstyle rule.').

% Command: do_not_destroy_the_edge_of_the_beard
command(do_not_destroy_the_edge_of_the_beard).
command_title(do_not_destroy_the_edge_of_the_beard, 'Leviticus 19:27 - Do not destroy the edge of the beard for the dead.').
normal_obedience(do_not_destroy_the_edge_of_the_beard, 'Do not destroy the edge of the beard in the mourning-for-the-dead context.').
concerns(do_not_destroy_the_edge_of_the_beard, reject_idolatry).
scripture_reference(do_not_destroy_the_edge_of_the_beard, 'Leviticus 19:27').
source_term(do_not_destroy_the_edge_of_the_beard, hebrew, shachath, 'to spoil, ruin, corrupt, or destroy; the action applied to the beard edge in the mourning context').
source_term(do_not_destroy_the_edge_of_the_beard, hebrew, peah, 'edge, corner, or side; used of the beard edge in Leviticus 19:27').
source_term(do_not_destroy_the_edge_of_the_beard, hebrew, zaqan, 'beard; the command concerns the edge of the beard').
translation_note(do_not_destroy_the_edge_of_the_beard, 'KJV says, "neither shalt thou mar the corners of thy beard."').
clarification_note(do_not_destroy_the_edge_of_the_beard, 'This entry is scoped to the mourning-for-the-dead context around Leviticus 19:27-28 and should not be broadened into a general beard-trimming rule.').
study_note(do_not_destroy_the_edge_of_the_beard, 'Catalog wording keeps the source-language action word and the death-mourning context together.').

% -----------------------------------------------------------------------------
% Source Term Supplements For Text-Specific Commands
% -----------------------------------------------------------------------------

source_term(do_not_wear_wool_and_linen_together, hebrew, shaatnez, 'mixed wool-and-linen fabric named in Deuteronomy 22:11').
source_term(do_not_wear_wool_and_linen_together, hebrew, tsemer, 'wool').
source_term(do_not_wear_wool_and_linen_together, hebrew, pishtim, 'linen, flax').

source_term(do_not_sow_field_with_two_kinds_of_seed, hebrew, zara, 'sow seed').
source_term(do_not_sow_field_with_two_kinds_of_seed, hebrew, kilayim, 'two kinds, mixed kinds').
source_term(do_not_sow_field_with_two_kinds_of_seed, hebrew, sadeh, 'field').

source_term(do_not_sow_vineyard_with_mixed_seed, hebrew, kerem, 'vineyard').
source_term(do_not_sow_vineyard_with_mixed_seed, hebrew, kilayim, 'two kinds, mixed kinds').
source_term(do_not_sow_vineyard_with_mixed_seed, hebrew, qadash, 'be forfeited or made holy/set apart in this consequence context').

source_term(do_not_plow_with_ox_and_donkey_together, hebrew, charash, 'plow').
source_term(do_not_plow_with_ox_and_donkey_together, hebrew, shor, 'ox').
source_term(do_not_plow_with_ox_and_donkey_together, hebrew, chamor, 'donkey').

source_term(do_not_crossbreed_livestock, hebrew, raba, 'breed, mate').
source_term(do_not_crossbreed_livestock, hebrew, behemah, 'livestock, animal').
source_term(do_not_crossbreed_livestock, hebrew, kilayim, 'mixed kinds').

source_term(make_parapet_for_roof, hebrew, maaqeh, 'parapet, guardrail').
source_term(make_parapet_for_roof, hebrew, gag, 'roof').
source_term(make_parapet_for_roof, hebrew, damim, 'bloodguilt').

source_term(send_mother_bird_away, hebrew, shalach, 'send away, release').
source_term(send_mother_bird_away, hebrew, em, 'mother').
source_term(send_mother_bird_away, hebrew, qanna, 'nest').

source_term(do_not_muzzle_ox_while_treading, hebrew, chasam, 'muzzle').
source_term(do_not_muzzle_ox_while_treading, hebrew, shor, 'ox').
source_term(do_not_muzzle_ox_while_treading, hebrew, dush, 'tread out grain').

source_term(do_not_boil_kid_in_mothers_milk, hebrew, bashal, 'boil, cook').
source_term(do_not_boil_kid_in_mothers_milk, hebrew, gedi, 'young goat, kid').
source_term(do_not_boil_kid_in_mothers_milk, hebrew, chalab, 'milk').

source_term(rest_working_animals_on_sabbath, hebrew, nuach, 'rest, settle, be refreshed').
source_term(rest_working_animals_on_sabbath, hebrew, shor_chamor, 'ox and donkey').
source_term(rest_working_animals_on_sabbath, hebrew, naphash, 'be refreshed, recover breath').

source_term(release_hebrew_servant_in_seventh_year, hebrew, ebed_ivri, 'Hebrew servant').
source_term(release_hebrew_servant_in_seventh_year, hebrew, chophshi, 'free, released').
source_term(release_hebrew_servant_in_seventh_year, hebrew, shebii, 'seventh').

source_term(furnish_released_servant, hebrew, anaq, 'furnish, supply liberally').
source_term(furnish_released_servant, hebrew, tson_goren_yeqev, 'flock, threshing floor, and winepress').

source_term(do_not_send_released_servant_empty, hebrew, reyqam, 'empty-handed').
source_term(do_not_send_released_servant_empty, hebrew, shalach, 'send away, release').

source_term(allow_servant_to_choose_lifelong_service, hebrew, ahav, 'love; the servant says he loves master and household').
source_term(allow_servant_to_choose_lifelong_service, hebrew, meretsea, 'awl used in the stated ear-piercing procedure').
source_term(allow_servant_to_choose_lifelong_service, hebrew, olam, 'long duration, lifelong in this servant-service setting').

source_term(do_not_rule_over_servant_ruthlessly, hebrew, radah, 'rule, have dominion').
source_term(do_not_rule_over_servant_ruthlessly, hebrew, perek, 'harshness, severity, ruthlessness').

source_term(redeem_poor_brother_sold_to_stranger, hebrew, gaal, 'redeem, act as kinsman redeemer').
source_term(redeem_poor_brother_sold_to_stranger, hebrew, makar, 'sell').
source_term(redeem_poor_brother_sold_to_stranger, hebrew, ger_toshav, 'sojourner or resident alien').

source_term(pay_restitution_for_theft, hebrew, ganav, 'steal').
source_term(pay_restitution_for_theft, hebrew, shalam, 'repay, make restitution').

source_term(judge_goring_ox_case, hebrew, nagach, 'gore, strike with horn').
source_term(judge_goring_ox_case, hebrew, shor, 'ox').
source_term(judge_goring_ox_case, hebrew, muad, 'known, warned, accustomed to gore').

source_term(repay_borrowed_animal_loss, hebrew, shaal, 'borrow, ask for use').
source_term(repay_borrowed_animal_loss, hebrew, shalam, 'repay, make restitution').

source_term(establish_cities_of_refuge, hebrew, ir_miqlat, 'city of refuge').
source_term(establish_cities_of_refuge, hebrew, badal, 'separate, set apart').
source_term(establish_cities_of_refuge, hebrew, ratsach, 'slay, manslayer context').

source_term(manslayer_flee_to_refuge, hebrew, nus, 'flee').
source_term(manslayer_flee_to_refuge, hebrew, goel_hadam, 'avenger of blood').
source_term(manslayer_flee_to_refuge, hebrew, shegagah, 'unintentionally, by mistake').

source_term(do_not_accept_ransom_to_leave_refuge, hebrew, kofer, 'ransom, covering payment').
source_term(do_not_accept_ransom_to_leave_refuge, hebrew, miqlat, 'refuge').
source_term(do_not_accept_ransom_to_leave_refuge, hebrew, shuv, 'return').

source_term(give_certificate_of_divorce, hebrew, sepher_kerithuth, 'document of cutting off, certificate of divorce').
source_term(give_certificate_of_divorce, hebrew, shalach, 'send away').
source_term(give_certificate_of_divorce, hebrew, bayith, 'house, household').

source_term(do_not_remarry_former_wife_after_second_marriage, hebrew, shuv, 'return, take back').
source_term(do_not_remarry_former_wife_after_second_marriage, hebrew, baal, 'husband, marry').
source_term(do_not_remarry_former_wife_after_second_marriage, hebrew, tame, 'be defiled').

source_term(perform_levirate_marriage, hebrew, yabam, 'perform brother-in-law duty, levirate marriage').
source_term(perform_levirate_marriage, hebrew, shem, 'name, memorial line').
source_term(perform_levirate_marriage, hebrew, ach, 'brother').

source_term(perform_halitzah_if_levirate_refused, hebrew, chalats, 'draw off, remove').
source_term(perform_halitzah_if_levirate_refused, hebrew, naal, 'sandal, shoe').
source_term(perform_halitzah_if_levirate_refused, hebrew, raqaq, 'spit').

source_term(captive_woman_waiting_period, hebrew, shabyah, 'female captive').
source_term(captive_woman_waiting_period, hebrew, yerach_yamim, 'month of days').
source_term(captive_woman_waiting_period, hebrew, bakah, 'weep, mourn').

source_term(do_not_sell_captive_woman, hebrew, makar, 'sell').
source_term(do_not_sell_captive_woman, hebrew, kesef, 'silver, money').
source_term(do_not_sell_captive_woman, hebrew, shalach, 'send away, release').

source_term(nazirite_abstain_from_wine_and_grape_products, hebrew, nazir, 'Nazirite, one separated by vow').
source_term(nazirite_abstain_from_wine_and_grape_products, hebrew, yayin_shekar, 'wine and strong drink').
source_term(nazirite_abstain_from_wine_and_grape_products, hebrew, gefen, 'grapevine').

source_term(nazirite_let_hair_grow, hebrew, pera, 'let hair grow long or loose').
source_term(nazirite_let_hair_grow, hebrew, sear_rosh, 'hair of the head').
source_term(nazirite_let_hair_grow, hebrew, nazir, 'Nazirite, one separated by vow').

source_term(nazirite_avoid_corpse_impurity, hebrew, nephesh_meth, 'dead person, corpse').
source_term(nazirite_avoid_corpse_impurity, hebrew, tame, 'be unclean').
source_term(nazirite_avoid_corpse_impurity, hebrew, nazir, 'Nazirite, one separated by vow').

source_term(nazirite_complete_vow_offerings, hebrew, neder, 'vow').
source_term(nazirite_complete_vow_offerings, hebrew, torah_hanazir, 'law of the Nazirite').
source_term(nazirite_complete_vow_offerings, hebrew, korban, 'offering brought near').

source_term(sotah_bitter_water_procedure, hebrew, sotah, 'woman who turns aside; jealousy-test case').
source_term(sotah_bitter_water_procedure, hebrew, me_hammarim, 'bitter waters').
source_term(sotah_bitter_water_procedure, hebrew, qinah, 'jealousy').

source_term(priestly_blessing, hebrew, barak, 'bless').
source_term(priestly_blessing, hebrew, shamar, 'keep, guard').
source_term(priestly_blessing, hebrew, shalom, 'peace, wholeness').

source_term(do_not_wear_what_pertains_to_a_man_woman_as_stated_in_torah, hebrew, keli_geber, 'article, gear, or apparel of a man').
source_term(do_not_wear_what_pertains_to_a_man_woman_as_stated_in_torah, hebrew, simlath_ishshah, 'woman''s garment').
source_term(do_not_wear_what_pertains_to_a_man_woman_as_stated_in_torah, hebrew, toevah, 'abomination, detestable thing').

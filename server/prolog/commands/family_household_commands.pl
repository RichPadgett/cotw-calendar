% =============================================================================
% Command Group: Family And Household
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

% Command: honor_father_and_mother
command(honor_father_and_mother).
command_title(honor_father_and_mother, 'Exo 20:12 - Honor father and mother.').
normal_obedience(honor_father_and_mother, 'Honor your father and your mother.').
concerns(honor_father_and_mother, family_order).
scripture_reference(honor_father_and_mother, 'Exodus 20:12').
scripture_reference(honor_father_and_mother, 'Deuteronomy 5:16').
story_reference(honor_father_and_mother, 'Genesis 47:11-12', 'Joseph provides for his father and household in Egypt.').
story_reference(honor_father_and_mother, 'Genesis 50:12-14', 'Joseph and his brothers honor Jacob by burying him as he commanded.').
study_note(honor_father_and_mother, 'This command anchors household honor across generations.').
source_term(honor_father_and_mother, hebrew, kabad, 'be heavy, honor, give weight to').
source_term(honor_father_and_mother, hebrew, av, 'father').
source_term(honor_father_and_mother, hebrew, em, 'mother').

% Command: do_not_murder
command(do_not_murder).
command_title(do_not_murder, 'Exo 20:13 - Do not murder.').
normal_obedience(do_not_murder, 'Do not murder.').
concerns(do_not_murder, neighbor_protection).
scripture_reference(do_not_murder, 'Exodus 20:13').
scripture_reference(do_not_murder, 'Deuteronomy 5:17').
story_reference(do_not_murder, 'Genesis 4:8-12', 'Cain murders Abel, showing the ancient evil this command forbids.').
story_reference(do_not_murder, '1 Samuel 24:4-7', 'David refuses to kill Saul when he has opportunity.').
study_note(do_not_murder, 'The command protects human life.').
source_term(do_not_murder, hebrew, ratsach, 'murder, slay unlawfully').

% Command: do_not_commit_adultery
command(do_not_commit_adultery).
command_title(do_not_commit_adultery, 'Exo 20:14 - Do not commit adultery.').
normal_obedience(do_not_commit_adultery, 'Do not commit adultery.').
concerns(do_not_commit_adultery, sexual_boundaries).
scripture_reference(do_not_commit_adultery, 'Exodus 20:14').
scripture_reference(do_not_commit_adultery, 'Deuteronomy 5:18').
story_reference(do_not_commit_adultery, '2 Samuel 11:2-5', 'David and Bathsheba show a grave violation of the adultery command.').
story_reference(do_not_commit_adultery, '2 Samuel 12:7-14', 'Nathan confronts David and exposes the sin.').
study_note(do_not_commit_adultery, 'The command protects marriage covenant faithfulness.').
source_term(do_not_commit_adultery, hebrew, naaph, 'commit adultery').

% Command: keep_forbidden_relations_boundaries
command(keep_forbidden_relations_boundaries).
command_title(keep_forbidden_relations_boundaries, 'Lev 18 - Keep forbidden relation boundaries.').
normal_obedience(keep_forbidden_relations_boundaries, 'Do not uncover the nakedness of forbidden near relations.').
concerns(keep_forbidden_relations_boundaries, sexual_boundaries).
scripture_reference(keep_forbidden_relations_boundaries, 'Leviticus 18').
scripture_reference(keep_forbidden_relations_boundaries, 'Leviticus 20').
story_reference(keep_forbidden_relations_boundaries, '2 Samuel 13:1-19', 'Amnon violates Tamar, showing the destruction that comes from forbidden sexual sin.').
study_note(keep_forbidden_relations_boundaries, 'Torah gives detailed sexual boundaries for family and community holiness.').
source_term(keep_forbidden_relations_boundaries, hebrew, galah_ervah, 'uncover nakedness; idiom for forbidden sexual exposure').
source_term(keep_forbidden_relations_boundaries, hebrew, sheer_basar, 'near kin, flesh relation').

% Command: do_not_give_children_to_molech
command(do_not_give_children_to_molech).
command_title(do_not_give_children_to_molech, 'Lev 18:21 - Do not give children to Molech.').
normal_obedience(do_not_give_children_to_molech, 'Do not give offspring to Molech or profane YHWH''s Name.').
concerns(do_not_give_children_to_molech, reject_idolatry).
scripture_reference(do_not_give_children_to_molech, 'Leviticus 18:21').
scripture_reference(do_not_give_children_to_molech, 'Leviticus 20:2-5').
story_reference(do_not_give_children_to_molech, '2 Kings 21:6', 'Manasseh makes his son pass through the fire, showing the violation.').
story_reference(do_not_give_children_to_molech, '2 Kings 23:10', 'Josiah defiles Topheth so no one would make a son or daughter pass through the fire to Molech.').
study_note(do_not_give_children_to_molech, 'The command joins child protection with rejection of idolatry.').
source_term(do_not_give_children_to_molech, hebrew, zera, 'seed, offspring').
source_term(do_not_give_children_to_molech, hebrew, molek, 'Molech, the named idolatrous recipient in the command').
source_term(do_not_give_children_to_molech, hebrew, abar, 'pass over, make pass through').

% Command: protect_newlywed_household
command(protect_newlywed_household).
command_title(protect_newlywed_household, 'Deu 24:5 - Protect the newlywed household.').
normal_obedience(protect_newlywed_household, 'A newly married man is free from public duty for one year to gladden his wife.').
concerns(protect_newlywed_household, family_order).
scripture_reference(protect_newlywed_household, 'Deuteronomy 24:5').
story_reference(protect_newlywed_household, 'Deuteronomy 20:7', 'The battle-exemption command already protects the betrothed man from dying before establishing his household.').
study_note(protect_newlywed_household, 'This command protects the beginning of a household.').
source_term(protect_newlywed_household, hebrew, naqiy, 'free, exempt, clear').
source_term(protect_newlywed_household, hebrew, samach, 'rejoice, gladden').
source_term(protect_newlywed_household, hebrew, ishshah, 'woman, wife').

command_requirement(protect_newlywed_household, 'Husband, Newly Married Man').

% Command: do_not_take_millstone_as_pledge
command(do_not_take_millstone_as_pledge).
command_title(do_not_take_millstone_as_pledge, 'Deu 24:6 - Do not take a millstone as pledge.').
normal_obedience(do_not_take_millstone_as_pledge, 'Do not take a millstone or upper millstone as pledge.').
concerns(do_not_take_millstone_as_pledge, neighbor_protection).
scripture_reference(do_not_take_millstone_as_pledge, 'Deuteronomy 24:6').
study_note(do_not_take_millstone_as_pledge, 'The command protects a household''s means of life.').
command_requirement(do_not_take_millstone_as_pledge, 'Lender, Someone who Lends').
source_term(do_not_take_millstone_as_pledge, hebrew, 'châbal khaw-bal', 'a primitive root; to wind tightly (as a rope), i.e. to bind; specifically, by a pledge; figuratively, to pervert, destroy; also to writhe in pain (especially of parturition):—× at all, band, bring forth, (deal) corrupt(-ly), destroy, offend, lay to (take a) pledge, spoil, travail, × very, withhold.').

% Command: do_not_return_runaway_slave
command(do_not_return_runaway_slave).
command_title(do_not_return_runaway_slave, 'Deu 23:15-16 - Do not return a runaway slave.').
normal_obedience(do_not_return_runaway_slave, 'Do not hand over a slave who escapes to you from his master.').
concerns(do_not_return_runaway_slave, neighbor_protection).
scripture_reference(do_not_return_runaway_slave, 'Deuteronomy 23:15-16').
study_note(do_not_return_runaway_slave, 'The command protects a vulnerable person seeking refuge.').
source_term(do_not_return_runaway_slave, hebrew, ebed, 'servant, slave').
source_term(do_not_return_runaway_slave, hebrew, natsal, 'escape, be delivered').
source_term(do_not_return_runaway_slave, hebrew, adon, 'master, lord').

% -----------------------------------------------------------------------------
% Additional Family, Household, And Servant Commands
% -----------------------------------------------------------------------------

% Command: do_not_strike_father_or_mother
command(do_not_strike_father_or_mother).
command_title(do_not_strike_father_or_mother, 'Exodus 21:15 - Do not strike father or mother.').
normal_obedience(do_not_strike_father_or_mother, 'Do not strike father or mother.').
concerns(do_not_strike_father_or_mother, marriage_household_procedure).
scripture_reference(do_not_strike_father_or_mother, 'Exodus 21:15').
story_reference(do_not_strike_father_or_mother, '2 Samuel 15:1-12', 'Absalom rebels against David his father, showing the danger of violent dishonor in a household.').
study_note(do_not_strike_father_or_mother, 'This command addresses a defined household, marriage, or servant case and keeps the procedure bounded by the Torah text: Do not strike father or mother.').
source_term(do_not_strike_father_or_mother, hebrew, 'nāḵâ', 'to smite, strike, beat, scourge, clap, applaud, give a thrust; to smite, kill, slay (man or beast)').

% Command: do_not_curse_father_or_mother
command(do_not_curse_father_or_mother).
command_title(do_not_curse_father_or_mother, 'Exodus 21:17 - Do not curse father or mother.').
normal_obedience(do_not_curse_father_or_mother, 'Do not curse father or mother.').
concerns(do_not_curse_father_or_mother, marriage_household_procedure).
scripture_reference(do_not_curse_father_or_mother, 'Exodus 21:17').
story_reference(do_not_curse_father_or_mother, 'Genesis 9:20-27', 'Ham dishonors Noah, and the account turns on a curse within the family line.').
study_note(do_not_curse_father_or_mother, 'This command addresses a defined household, marriage, or servant case and keeps the procedure bounded by the Torah text: Do not curse father or mother.').
source_term(do_not_curse_father_or_mother, hebrew, qalal, 'curse, treat lightly, dishonor').
source_term(do_not_curse_father_or_mother, hebrew, av, 'father').
source_term(do_not_curse_father_or_mother, hebrew, em, 'mother').

% Command: do_not_uncover_the_nakedness_of_close_relatives
command(do_not_uncover_the_nakedness_of_close_relatives).
command_title(do_not_uncover_the_nakedness_of_close_relatives, 'Leviticus 18 - Do not uncover the nakedness of close relatives.').
normal_obedience(do_not_uncover_the_nakedness_of_close_relatives, 'Do not uncover the nakedness of close relatives.').
concerns(do_not_uncover_the_nakedness_of_close_relatives, marriage_household_procedure).
scripture_reference(do_not_uncover_the_nakedness_of_close_relatives, 'Leviticus 18').
story_reference(do_not_uncover_the_nakedness_of_close_relatives, '2 Samuel 13:1-19', 'Amnon violates Tamar, showing the ruin connected with forbidden family sexual sin.').
study_note(do_not_uncover_the_nakedness_of_close_relatives, 'This command addresses a defined household, marriage, or servant case and keeps the procedure bounded by the Torah text: Do not uncover the nakedness of close relatives.').
source_term(do_not_uncover_the_nakedness_of_close_relatives, hebrew, galah, 'uncover, expose').
source_term(do_not_uncover_the_nakedness_of_close_relatives, hebrew, ervah, 'nakedness, sexual exposure').
source_term(do_not_uncover_the_nakedness_of_close_relatives, hebrew, sheer, 'near kin, close flesh relation').

% Command: do_not_lie_with_your_neighbor_s_wife
command(do_not_lie_with_your_neighbor_s_wife).
command_title(do_not_lie_with_your_neighbor_s_wife, 'Leviticus 18:20 - Do not lie with your neighbor''s wife.').
normal_obedience(do_not_lie_with_your_neighbor_s_wife, 'Do not lie with your neighbor''s wife.').
concerns(do_not_lie_with_your_neighbor_s_wife, marriage_household_procedure).
scripture_reference(do_not_lie_with_your_neighbor_s_wife, 'Leviticus 18:20').
story_reference(do_not_lie_with_your_neighbor_s_wife, '2 Samuel 11:2-5', 'David lies with Bathsheba, the wife of Uriah, showing the adultery violation.').
story_reference(do_not_lie_with_your_neighbor_s_wife, '2 Samuel 12:7-14', 'Nathan confronts David and exposes the sin.').
study_note(do_not_lie_with_your_neighbor_s_wife, 'This command addresses a defined household, marriage, or servant case and keeps the procedure bounded by the Torah text: Do not lie with your neighbor''s wife.').
source_term(do_not_lie_with_your_neighbor_s_wife, hebrew, shakab, 'lie down, have sexual relations').
source_term(do_not_lie_with_your_neighbor_s_wife, hebrew, amith, 'neighbor, fellow member of the people').
source_term(do_not_lie_with_your_neighbor_s_wife, hebrew, ishshah, 'woman, wife').

% Command: do_not_lie_with_a_male_as_with_a_woman
command(do_not_lie_with_a_male_as_with_a_woman).
command_title(do_not_lie_with_a_male_as_with_a_woman, 'Leviticus 18:22 - Do not lie with a male as with a woman.').
normal_obedience(do_not_lie_with_a_male_as_with_a_woman, 'Do not lie with a male as with a woman.').
concerns(do_not_lie_with_a_male_as_with_a_woman, marriage_household_procedure).
scripture_reference(do_not_lie_with_a_male_as_with_a_woman, 'Leviticus 18:22').
story_reference(do_not_lie_with_a_male_as_with_a_woman, 'Genesis 19:4-11', 'The men of Sodom seek sexual violence against Lot''s guests, showing the kind of grave disorder Torah later forbids.').
study_note(do_not_lie_with_a_male_as_with_a_woman, 'This command addresses a defined household, marriage, or servant case and keeps the procedure bounded by the Torah text: Do not lie with a male as with a woman.').
source_term(do_not_lie_with_a_male_as_with_a_woman, hebrew, zakar, 'male').
source_term(do_not_lie_with_a_male_as_with_a_woman, hebrew, mishkebey_ishshah, 'lyings of a woman; sexual-bed idiom').
source_term(do_not_lie_with_a_male_as_with_a_woman, hebrew, toevah, 'abomination, detestable thing').

% Command: do_not_lie_with_an_animal
command(do_not_lie_with_an_animal).
command_title(do_not_lie_with_an_animal, 'Leviticus 18:23 - Do not lie with an animal.').
normal_obedience(do_not_lie_with_an_animal, 'Do not lie with an animal.').
concerns(do_not_lie_with_an_animal, marriage_household_procedure).
scripture_reference(do_not_lie_with_an_animal, 'Leviticus 18:23').
study_note(do_not_lie_with_an_animal, 'This command addresses a defined household, marriage, or servant case and keeps the procedure bounded by the Torah text: Do not lie with an animal.').
source_term(do_not_lie_with_an_animal, hebrew, behemah, 'animal, beast, livestock').
source_term(do_not_lie_with_an_animal, hebrew, shakab, 'lie down, have sexual relations').
source_term(do_not_lie_with_an_animal, hebrew, tebel, 'perversion, confusion').

% Command: a_woman_must_not_stand_before_an_animal_to_mate_with_it
command(a_woman_must_not_stand_before_an_animal_to_mate_with_it).
command_title(a_woman_must_not_stand_before_an_animal_to_mate_with_it, 'Leviticus 18:23 - A woman must not stand before an animal to mate with it.').
normal_obedience(a_woman_must_not_stand_before_an_animal_to_mate_with_it, 'A woman must not stand before an animal to mate with it.').
concerns(a_woman_must_not_stand_before_an_animal_to_mate_with_it, marriage_household_procedure).
scripture_reference(a_woman_must_not_stand_before_an_animal_to_mate_with_it, 'Leviticus 18:23').
study_note(a_woman_must_not_stand_before_an_animal_to_mate_with_it, 'This command addresses a defined household, marriage, or servant case and keeps the procedure bounded by the Torah text: A woman must not stand before an animal to mate with it.').
source_term(a_woman_must_not_stand_before_an_animal_to_mate_with_it, hebrew, amad, 'stand, present oneself').
source_term(a_woman_must_not_stand_before_an_animal_to_mate_with_it, hebrew, behemah, 'animal, beast, livestock').
source_term(a_woman_must_not_stand_before_an_animal_to_mate_with_it, hebrew, raba, 'lie down sexually, mate').
command_requirement(a_woman_must_not_stand_before_an_animal_to_mate_with_it, 'Women').

% Command: do_not_give_offspring_to_molech
command(do_not_give_offspring_to_molech).
command_title(do_not_give_offspring_to_molech, 'Leviticus 18:21 - Do not give offspring to Molech.').
normal_obedience(do_not_give_offspring_to_molech, 'Do not give offspring to Molech.').
concerns(do_not_give_offspring_to_molech, marriage_household_procedure).
scripture_reference(do_not_give_offspring_to_molech, 'Leviticus 18:21').
story_reference(do_not_give_offspring_to_molech, '2 Kings 21:6', 'Manasseh makes his son pass through the fire, showing the violation.').
story_reference(do_not_give_offspring_to_molech, '2 Kings 23:10', 'Josiah defiles Topheth to stop sons and daughters being passed through the fire to Molech.').
study_note(do_not_give_offspring_to_molech, 'This command addresses a defined household, marriage, or servant case and keeps the procedure bounded by the Torah text: Do not give offspring to Molech.').
source_term(do_not_give_offspring_to_molech, hebrew, zera, 'seed, offspring').
source_term(do_not_give_offspring_to_molech, hebrew, molek, 'Molech, the named idolatrous recipient in the command').
source_term(do_not_give_offspring_to_molech, hebrew, abar, 'pass over, make pass through').

% Command: do_not_marry_a_woman_and_her_mother
command(do_not_marry_a_woman_and_her_mother).
command_title(do_not_marry_a_woman_and_her_mother, 'Leviticus 20:14 - Do not marry a woman and her mother.').
normal_obedience(do_not_marry_a_woman_and_her_mother, 'Do not marry a woman and her mother.').
concerns(do_not_marry_a_woman_and_her_mother, marriage_household_procedure).
scripture_reference(do_not_marry_a_woman_and_her_mother, 'Leviticus 20:14').
study_note(do_not_marry_a_woman_and_her_mother, 'This command addresses a defined household, marriage, or servant case and keeps the procedure bounded by the Torah text: Do not marry a woman and her mother.').
source_term(do_not_marry_a_woman_and_her_mother, hebrew, 'zimmâh, zim-maw''; or זַמָּה zammâh; from H2161; a plan, especially a bad one:—heinous crime, lewd(-ly, -ness), mischief, purpose, thought, wicked (device, mind, -ness).', 'zimmâh, zim-maw''; or זַמָּה zammâh; from H2161; a plan, especially a bad one:—heinous crime, lewd(-ly, -ness), mischief, purpose, thought, wicked (device, mind, -ness).').
source_term(do_not_marry_a_woman_and_her_mother, hebrew, 'lâqach, law-kakh''; a primitive root; to take (in the widest variety of applications):—accept, bring, buy, carry away, drawn, fetch, get, infold, × many, mingle, place, receive(-ing), reserve, seize, send for, take (away, -ing, up), use, win.', 'lâqach, law-kakh''; a primitive root; to take (in the widest variety of applications):—accept, bring, buy, carry away, drawn, fetch, get, infold, × many, mingle, place, receive(-ing), reserve, seize, send for, take (away, -ing, up), use, win.').
source_term(do_not_marry_a_woman_and_her_mother, hebrew, ishshah, 'woman, wife').
source_term(do_not_marry_a_woman_and_her_mother, hebrew, em, 'mother').
source_term(do_not_marry_a_woman_and_her_mother, hebrew, zimmah, 'wicked plan, lewdness, grave sexual offense').
translation_note(do_not_marry_a_woman_and_her_mother, 'NIV uses the word marry. Most other versions says to take.').

% Command: follow_the_accused_bride_case_procedure
command(follow_the_accused_bride_case_procedure).
command_title(follow_the_accused_bride_case_procedure, 'Deuteronomy 22:13-21 - Follow the accused bride case procedure.').
normal_obedience(follow_the_accused_bride_case_procedure, 'Follow the accused bride case procedure.').
concerns(follow_the_accused_bride_case_procedure, marriage_household_procedure).
scripture_reference(follow_the_accused_bride_case_procedure, 'Deuteronomy 22:13-21').
study_note(follow_the_accused_bride_case_procedure, 'This command addresses a defined household, marriage, or servant case and keeps the procedure bounded by the Torah text: Follow the accused bride case procedure.').
source_term(follow_the_accused_bride_case_procedure, hebrew, bethulim, 'virginity, tokens of virginity').
source_term(follow_the_accused_bride_case_procedure, hebrew, shem_ra, 'bad name, evil report').
source_term(follow_the_accused_bride_case_procedure, hebrew, avi_naar, 'father of the young woman').

command_requirement(follow_the_accused_bride_case_procedure, 'Husband').

% Command: follow_the_betrothed_virgin_violation_case_procedure
command(follow_the_betrothed_virgin_violation_case_procedure).
command_title(follow_the_betrothed_virgin_violation_case_procedure, 'Deuteronomy 22:23-27 - Follow the betrothed virgin violation case procedure.').
normal_obedience(follow_the_betrothed_virgin_violation_case_procedure, 'Follow the betrothed virgin violation case procedure.').
concerns(follow_the_betrothed_virgin_violation_case_procedure, marriage_household_procedure).
scripture_reference(follow_the_betrothed_virgin_violation_case_procedure, 'Deuteronomy 22:23-27').
study_note(follow_the_betrothed_virgin_violation_case_procedure, 'This command addresses a defined household, marriage, or servant case and keeps the procedure bounded by the Torah text: Follow the betrothed virgin violation case procedure.').
source_term(follow_the_betrothed_virgin_violation_case_procedure, hebrew, aras, 'betroth, be pledged for marriage').
source_term(follow_the_betrothed_virgin_violation_case_procedure, hebrew, naarah_betulah, 'young woman, virgin').
source_term(follow_the_betrothed_virgin_violation_case_procedure, hebrew, tsaaq, 'cry out').

command_requirement(follow_the_betrothed_virgin_violation_case_procedure, 'Betrothed Women').

% Command: follow_the_unbetrothed_virgin_violation_case_procedure
command(follow_the_unbetrothed_virgin_violation_case_procedure).
command_title(follow_the_unbetrothed_virgin_violation_case_procedure, 'Deuteronomy 22:28-29 - Follow the unbetrothed virgin violation case procedure.').
normal_obedience(follow_the_unbetrothed_virgin_violation_case_procedure, 'Follow the unbetrothed virgin violation case procedure.').
concerns(follow_the_unbetrothed_virgin_violation_case_procedure, marriage_household_procedure).
scripture_reference(follow_the_unbetrothed_virgin_violation_case_procedure, 'Deuteronomy 22:28-29').
study_note(follow_the_unbetrothed_virgin_violation_case_procedure, 'This command addresses a defined household, marriage, or servant case and keeps the procedure bounded by the Torah text: Follow the unbetrothed virgin violation case procedure.').
study_note(follow_the_unbetrothed_virgin_violation_case_procedure, 'Placeholder note: The Book of  Susanna or Daniel 13 tells a story about a woman who is attacked and false claims are made about her. Daniel goes to her Defense to cross examine the attackers and finds inconsistencies in their story ultimately freeing the victim from punishment.').
source_term(follow_the_unbetrothed_virgin_violation_case_procedure, hebrew, taphas, 'seize, lay hold of').
source_term(follow_the_unbetrothed_virgin_violation_case_procedure, hebrew, shakab, 'lie down, have sexual relations').
source_term(follow_the_unbetrothed_virgin_violation_case_procedure, hebrew, mohar, 'bride-price, marriage payment').

command_requirement(follow_the_unbetrothed_virgin_violation_case_procedure, 'Unbetrothed Virgin').

% Command: do_not_take_your_father_s_wife
command(do_not_take_your_father_s_wife).
command_title(do_not_take_your_father_s_wife, 'Deuteronomy 22:30 - Do not take your father''s wife.').
normal_obedience(do_not_take_your_father_s_wife, 'Do not take your father''s wife.').
concerns(do_not_take_your_father_s_wife, marriage_household_procedure).
scripture_reference(do_not_take_your_father_s_wife, 'Deuteronomy 22:30').
story_reference(do_not_take_your_father_s_wife, '2 Samuel 16:21-22', 'Absalom goes in to his father''s concubines publicly during his rebellion.').
study_note(do_not_take_your_father_s_wife, 'This command addresses a defined household, marriage, or servant case and keeps the procedure bounded by the Torah text: Do not take your father''s wife.').
source_term(do_not_take_your_father_s_wife, hebrew, laqach, 'take, take in marriage, seize').
source_term(do_not_take_your_father_s_wife, hebrew, ishshah_av, 'father''s wife').
source_term(do_not_take_your_father_s_wife, hebrew, kanaph, 'wing, skirt, garment edge; idiom in this context for father''s covering').
translation_note(do_not_take_your_father_s_wife, 'lāqaḥ - to take, get, fetch, lay hold of, seize, receive, acquire, buy, bring, marry, take a wife, snatch, take away ;  to take to or for a person, procure, get, take possession of, select, choose, take in marriage, receive, accept').

% Command: do_not_remarry_a_former_wife_after_she_became_another_man_s_wife
command(do_not_remarry_a_former_wife_after_she_became_another_man_s_wife).
command_title(do_not_remarry_a_former_wife_after_she_became_another_man_s_wife, 'Deuteronomy 24:1-4 - Do not remarry a former wife after she became another man''s wife.').
normal_obedience(do_not_remarry_a_former_wife_after_she_became_another_man_s_wife, 'Do not remarry a former wife after she became another man''s wife.').
concerns(do_not_remarry_a_former_wife_after_she_became_another_man_s_wife, marriage_household_procedure).
scripture_reference(do_not_remarry_a_former_wife_after_she_became_another_man_s_wife, 'Deuteronomy 24:1-4').
study_note(do_not_remarry_a_former_wife_after_she_became_another_man_s_wife, 'This command addresses a defined household, marriage, or servant case and keeps the procedure bounded by the Torah text: Do not remarry a former wife after she became another man''s wife.').

story_reference(do_not_remarry_a_former_wife_after_she_became_another_man_s_wife, 'Matthew 19:7-9', 'The Pharisees ask Jesus why Moses commanded a man to give his wife a writing of divorcement, directly citing the Deuteronomy 24:1 law, and Jesus responds concerning its meaning and limits.').
source_term(do_not_remarry_a_former_wife_after_she_became_another_man_s_wife, hebrew, shuv, 'return, turn back').
source_term(do_not_remarry_a_former_wife_after_she_became_another_man_s_wife, hebrew, baal, 'husband, marry, rule as husband').
source_term(do_not_remarry_a_former_wife_after_she_became_another_man_s_wife, hebrew, tame, 'be unclean, be defiled').

command_requirement(do_not_remarry_a_former_wife_after_she_became_another_man_s_wife, 'Former Husband').

% Command: perform_levirate_marriage_in_the_stated_brother_childless_case
command(perform_levirate_marriage_in_the_stated_brother_childless_case).
command_title(perform_levirate_marriage_in_the_stated_brother_childless_case, 'Deuteronomy 25:5-6 - Perform levirate marriage in the stated brother-childless case.').
normal_obedience(perform_levirate_marriage_in_the_stated_brother_childless_case, 'Perform levirate marriage in the stated brother-childless case.').
concerns(perform_levirate_marriage_in_the_stated_brother_childless_case, marriage_household_procedure).
scripture_reference(perform_levirate_marriage_in_the_stated_brother_childless_case, 'Deuteronomy 25:5-6').
story_reference(perform_levirate_marriage_in_the_stated_brother_childless_case, 'Genesis 38:6-11', 'Judah tells Onan to perform the brother-in-law duty for Tamar.').
story_reference(perform_levirate_marriage_in_the_stated_brother_childless_case, 'Ruth 4:1-10', 'Boaz redeems Ruth and raises up the name of the dead on the inheritance.').
study_note(perform_levirate_marriage_in_the_stated_brother_childless_case, 'Tanner covered this in this April 2026 marriage study part 3. The brothers fulfil the duty of carrying on the lineage, but the woman is still married to her husband although he is dead.').

story_reference(perform_levirate_marriage_in_the_stated_brother_childless_case, 'Matthew 22:24', 'The Sadducees pose a hypothetical to Jesus, quoting that Moses said if a man dies having no children, his brother shall marry his wife and raise up offspring for his brother.').
source_term(perform_levirate_marriage_in_the_stated_brother_childless_case, hebrew, yabam, 'perform brother-in-law duty, levirate marriage').
source_term(perform_levirate_marriage_in_the_stated_brother_childless_case, hebrew, shem, 'name, memorial line').
source_term(perform_levirate_marriage_in_the_stated_brother_childless_case, hebrew, ach, 'brother').

command_requirement(perform_levirate_marriage_in_the_stated_brother_childless_case, 'Brother of Deceased').

% Command: perform_the_shoe_removal_procedure_if_levirate_duty_is_refused
command(perform_the_shoe_removal_procedure_if_levirate_duty_is_refused).
command_title(perform_the_shoe_removal_procedure_if_levirate_duty_is_refused, 'Deuteronomy 25:7-10 - Perform the shoe-removal procedure if levirate duty is refused.').
normal_obedience(perform_the_shoe_removal_procedure_if_levirate_duty_is_refused, 'Perform the shoe-removal procedure if levirate duty is refused.').
concerns(perform_the_shoe_removal_procedure_if_levirate_duty_is_refused, marriage_household_procedure).
scripture_reference(perform_the_shoe_removal_procedure_if_levirate_duty_is_refused, 'Deuteronomy 25:7-10').
story_reference(perform_the_shoe_removal_procedure_if_levirate_duty_is_refused, 'Ruth 4:7-8', 'The nearer redeemer removes his sandal before the elders when declining the redemption.').
source_term(perform_the_shoe_removal_procedure_if_levirate_duty_is_refused, hebrew, chalats, 'draw off, remove').
source_term(perform_the_shoe_removal_procedure_if_levirate_duty_is_refused, hebrew, naal, 'sandal, shoe').
source_term(perform_the_shoe_removal_procedure_if_levirate_duty_is_refused, hebrew, raqaq, 'spit').

command_requirement(perform_the_shoe_removal_procedure_if_levirate_duty_is_refused, 'Widow, Brother of Deceased').

% Command: a_newly_married_man_must_not_go_out_with_the_army_or_be_charged_with_public_du
command(a_newly_married_man_must_not_go_out_with_the_army_or_be_charged_with_public_du).
command_title(a_newly_married_man_must_not_go_out_with_the_army_or_be_charged_with_public_du, 'Deuteronomy 24:5 - A newly married man must not go out with the army or be charged with public duty for one year.').
normal_obedience(a_newly_married_man_must_not_go_out_with_the_army_or_be_charged_with_public_du, 'A newly married man must not go out with the army or be charged with public duty for one year.').
concerns(a_newly_married_man_must_not_go_out_with_the_army_or_be_charged_with_public_du, marriage_household_procedure).
scripture_reference(a_newly_married_man_must_not_go_out_with_the_army_or_be_charged_with_public_du, 'Deuteronomy 24:5').
story_reference(a_newly_married_man_must_not_go_out_with_the_army_or_be_charged_with_public_du, 'Deuteronomy 20:7', 'The related battle exemption sends home the betrothed man so another does not take his wife.').
source_term(a_newly_married_man_must_not_go_out_with_the_army_or_be_charged_with_public_du, hebrew, chadash, 'new, newly married in context').
source_term(a_newly_married_man_must_not_go_out_with_the_army_or_be_charged_with_public_du, hebrew, naqiy, 'free, exempt, clear').
source_term(a_newly_married_man_must_not_go_out_with_the_army_or_be_charged_with_public_du, hebrew, samach, 'rejoice, gladden').

command_requirement(a_newly_married_man_must_not_go_out_with_the_army_or_be_charged_with_public_du, 'Husband, Newly Married Man').

% Command: let_the_runaway_slave_dwell_where_he_chooses_among_you
command(let_the_runaway_slave_dwell_where_he_chooses_among_you).
command_title(let_the_runaway_slave_dwell_where_he_chooses_among_you, 'Deuteronomy 23:16 - Let the runaway slave dwell where he chooses among you.').
normal_obedience(let_the_runaway_slave_dwell_where_he_chooses_among_you, 'Let the runaway slave dwell where he chooses among you.').
concerns(let_the_runaway_slave_dwell_where_he_chooses_among_you, servant_release_mercy).
scripture_reference(let_the_runaway_slave_dwell_where_he_chooses_among_you, 'Deuteronomy 23:16').
story_reference(let_the_runaway_slave_dwell_where_he_chooses_among_you, '1 Samuel 30:11-15', 'David receives and protects an abandoned Egyptian servant who does not want to be returned to his Amalekite master.').
study_note(let_the_runaway_slave_dwell_where_he_chooses_among_you, 'This command limits oppression and protects vulnerable people through release, refuge, provision, or fair treatment: Let the runaway slave dwell where he chooses among you.').
source_term(let_the_runaway_slave_dwell_where_he_chooses_among_you, hebrew, ebed, 'servant, slave').
source_term(let_the_runaway_slave_dwell_where_he_chooses_among_you, hebrew, yashab, 'dwell, settle, remain').
source_term(let_the_runaway_slave_dwell_where_he_chooses_among_you, hebrew, tov, 'good, pleasing, chosen as good').

% Command: do_not_oppress_the_stranger
command(do_not_oppress_the_stranger).
command_title(do_not_oppress_the_stranger, 'Exodus 22:21 - Do not oppress the stranger.').
normal_obedience(do_not_oppress_the_stranger, 'Do not oppress the stranger.').
concerns(do_not_oppress_the_stranger, servant_release_mercy).
scripture_reference(do_not_oppress_the_stranger, 'Exodus 22:21').
scripture_reference(do_not_oppress_the_stranger, '23:9').
story_reference(do_not_oppress_the_stranger, 'Ruth 2:8-16', 'Boaz protects Ruth the Moabite and provides space for her to glean.').
study_note(do_not_oppress_the_stranger, 'This command limits oppression and protects vulnerable people through release, refuge, provision, or fair treatment: Do not oppress the stranger.').
source_term(do_not_oppress_the_stranger, hebrew, yanah, 'oppress, mistreat, wrong').
source_term(do_not_oppress_the_stranger, hebrew, lachats, 'press, oppress, squeeze').
source_term(do_not_oppress_the_stranger, hebrew, ger, 'resident foreigner, sojourner').

% Command: love_the_stranger
command(love_the_stranger).
command_title(love_the_stranger, 'Deuteronomy 10:19 - Love the stranger.').
normal_obedience(love_the_stranger, 'Love the stranger.').
concerns(love_the_stranger, servant_release_mercy).
scripture_reference(love_the_stranger, 'Deuteronomy 10:19').
story_reference(love_the_stranger, 'Ruth 2:8-16', 'Boaz shows kindness and protection to Ruth as a foreign woman seeking provision.').
study_note(love_the_stranger, 'This command limits oppression and protects vulnerable people through release, refuge, provision, or fair treatment: Love the stranger.').
source_term(love_the_stranger, hebrew, ahav, 'love').
source_term(love_the_stranger, hebrew, ger, 'resident foreigner, sojourner').

% Command: do_not_afflict_widow_or_orphan
command(do_not_afflict_widow_or_orphan).
command_title(do_not_afflict_widow_or_orphan, 'Exodus 22:22 - Do not afflict widow or orphan.').
normal_obedience(do_not_afflict_widow_or_orphan, 'Do not afflict widow or orphan.').
concerns(do_not_afflict_widow_or_orphan, servant_release_mercy).
scripture_reference(do_not_afflict_widow_or_orphan, 'Exodus 22:22').
story_reference(do_not_afflict_widow_or_orphan, '1 Kings 17:8-16', 'Elijah is sent to a widow, and YHWH provides flour and oil through the famine.').
story_reference(do_not_afflict_widow_or_orphan, 'Isaiah 1:17, 23', 'The prophet rebukes leaders who fail the widow and orphan and calls for their defense.').
study_note(do_not_afflict_widow_or_orphan, 'This command limits oppression and protects vulnerable people through release, refuge, provision, or fair treatment: Do not afflict widow or orphan.').
source_term(do_not_afflict_widow_or_orphan, hebrew, anah, 'afflict, humble, mistreat').
source_term(do_not_afflict_widow_or_orphan, hebrew, almanah, 'widow').
source_term(do_not_afflict_widow_or_orphan, hebrew, yathom, 'orphan, fatherless child').

% Command: give_justice_to_stranger_orphan_and_widow
command(give_justice_to_stranger_orphan_and_widow).
command_title(give_justice_to_stranger_orphan_and_widow, 'Deuteronomy 24:17 - Give justice to stranger, orphan, and widow.').
normal_obedience(give_justice_to_stranger_orphan_and_widow, 'Give justice to stranger, orphan, and widow.').
concerns(give_justice_to_stranger_orphan_and_widow, servant_release_mercy).
scripture_reference(give_justice_to_stranger_orphan_and_widow, 'Deuteronomy 24:17').
story_reference(give_justice_to_stranger_orphan_and_widow, 'Jeremiah 22:3', 'The prophet commands justice and protection for the stranger, orphan, and widow.').
study_note(give_justice_to_stranger_orphan_and_widow, 'This command limits oppression and protects vulnerable people through release, refuge, provision, or fair treatment: Give justice to stranger, orphan, and widow.').
source_term(give_justice_to_stranger_orphan_and_widow, hebrew, mishpat, 'justice, judgment, legal right').
source_term(give_justice_to_stranger_orphan_and_widow, hebrew, ger, 'resident foreigner, sojourner').
source_term(give_justice_to_stranger_orphan_and_widow, hebrew, yathom_almanah, 'orphan and widow').

% Command: leave_forgotten_sheaf_for_stranger_orphan_and_widow
command(leave_forgotten_sheaf_for_stranger_orphan_and_widow).
command_title(leave_forgotten_sheaf_for_stranger_orphan_and_widow, 'Deuteronomy 24:19 - Leave forgotten sheaf for stranger, orphan, and widow.').
normal_obedience(leave_forgotten_sheaf_for_stranger_orphan_and_widow, 'Leave forgotten sheaf for stranger, orphan, and widow.').
concerns(leave_forgotten_sheaf_for_stranger_orphan_and_widow, servant_release_mercy).
scripture_reference(leave_forgotten_sheaf_for_stranger_orphan_and_widow, 'Deuteronomy 24:19').
story_reference(leave_forgotten_sheaf_for_stranger_orphan_and_widow, 'Ruth 2:15-16', 'Boaz instructs his workers to leave extra grain for Ruth to glean.').
study_note(leave_forgotten_sheaf_for_stranger_orphan_and_widow, 'This command limits oppression and protects vulnerable people through release, refuge, provision, or fair treatment: Leave forgotten sheaf for stranger, orphan, and widow.').
source_term(leave_forgotten_sheaf_for_stranger_orphan_and_widow, hebrew, shakach, 'forget').
source_term(leave_forgotten_sheaf_for_stranger_orphan_and_widow, hebrew, omer, 'sheaf, bundle of grain').
source_term(leave_forgotten_sheaf_for_stranger_orphan_and_widow, hebrew, ger_yathom_almanah, 'stranger, orphan, and widow').

% Command: leave_olive_and_grape_gleanings_for_stranger_orphan_and_widow
command(leave_olive_and_grape_gleanings_for_stranger_orphan_and_widow).
command_title(leave_olive_and_grape_gleanings_for_stranger_orphan_and_widow, 'Deuteronomy 24:20-21 - Leave olive and grape gleanings for stranger, orphan, and widow.').
normal_obedience(leave_olive_and_grape_gleanings_for_stranger_orphan_and_widow, 'Leave olive and grape gleanings for stranger, orphan, and widow.').
concerns(leave_olive_and_grape_gleanings_for_stranger_orphan_and_widow, servant_release_mercy).
scripture_reference(leave_olive_and_grape_gleanings_for_stranger_orphan_and_widow, 'Deuteronomy 24:20-21').
story_reference(leave_olive_and_grape_gleanings_for_stranger_orphan_and_widow, 'Ruth 2:15-16', 'Boaz instructs his workers to leave extra grain for Ruth, a vulnerable foreign widow.').
study_note(leave_olive_and_grape_gleanings_for_stranger_orphan_and_widow, 'This command limits oppression and protects vulnerable people through release, refuge, provision, or fair treatment: Leave olive and grape gleanings for stranger, orphan, and widow.').
source_term(leave_olive_and_grape_gleanings_for_stranger_orphan_and_widow, hebrew, paar, 'glean by going over again, strip remaining fruit').
source_term(leave_olive_and_grape_gleanings_for_stranger_orphan_and_widow, hebrew, olel, 'gleanings, small remaining clusters').
source_term(leave_olive_and_grape_gleanings_for_stranger_orphan_and_widow, hebrew, kerem_zayith, 'vineyard and olive tree').

% Command: follow_the_captive_woman_procedure_before_marriage
command(follow_the_captive_woman_procedure_before_marriage).
command_title(follow_the_captive_woman_procedure_before_marriage, 'Deuteronomy 21:10-14 - Follow the captive woman procedure before marriage.').
normal_obedience(follow_the_captive_woman_procedure_before_marriage, 'Follow the captive woman procedure before marriage.').
concerns(follow_the_captive_woman_procedure_before_marriage, servant_release_mercy).
scripture_reference(follow_the_captive_woman_procedure_before_marriage, 'Deuteronomy 21:10-14').
study_note(follow_the_captive_woman_procedure_before_marriage, 'This command limits oppression and protects vulnerable people through release, refuge, provision, or fair treatment: Follow the captive woman procedure before marriage.').
source_term(follow_the_captive_woman_procedure_before_marriage, hebrew, shabyah, 'female captive').
source_term(follow_the_captive_woman_procedure_before_marriage, hebrew, yefath_toar, 'beautiful of form').
source_term(follow_the_captive_woman_procedure_before_marriage, hebrew, yerach_yamim, 'a month of days').

% Command: do_not_sell_the_captive_woman_if_released
command(do_not_sell_the_captive_woman_if_released).
command_title(do_not_sell_the_captive_woman_if_released, 'Deuteronomy 21:14 - Do not sell the captive woman if released.').
normal_obedience(do_not_sell_the_captive_woman_if_released, 'Do not sell the captive woman if released.').
concerns(do_not_sell_the_captive_woman_if_released, servant_release_mercy).
scripture_reference(do_not_sell_the_captive_woman_if_released, 'Deuteronomy 21:14').
study_note(do_not_sell_the_captive_woman_if_released, 'This command limits oppression and protects vulnerable people through release, refuge, provision, or fair treatment: Do not sell the captive woman if released.').
source_term(do_not_sell_the_captive_woman_if_released, hebrew, makar, 'sell').
source_term(do_not_sell_the_captive_woman_if_released, hebrew, kesef, 'silver, money').
source_term(do_not_sell_the_captive_woman_if_released, hebrew, shalach, 'send away, release').

% Command: do_not_treat_the_captive_woman_as_a_slave_after_humbling_her
command(do_not_treat_the_captive_woman_as_a_slave_after_humbling_her).
command_title(do_not_treat_the_captive_woman_as_a_slave_after_humbling_her, 'Deuteronomy 21:14 - Do not treat the captive woman as a slave after humbling her.').
normal_obedience(do_not_treat_the_captive_woman_as_a_slave_after_humbling_her, 'Do not treat the captive woman as a slave after humbling her.').
concerns(do_not_treat_the_captive_woman_as_a_slave_after_humbling_her, servant_release_mercy).
scripture_reference(do_not_treat_the_captive_woman_as_a_slave_after_humbling_her, 'Deuteronomy 21:14').
study_note(do_not_treat_the_captive_woman_as_a_slave_after_humbling_her, 'This command limits oppression and protects vulnerable people through release, refuge, provision, or fair treatment: Do not treat the captive woman as a slave after humbling her.').
source_term(do_not_treat_the_captive_woman_as_a_slave_after_humbling_her, hebrew, amar, 'deal tyrannically with, treat as a slave in this context').
source_term(do_not_treat_the_captive_woman_as_a_slave_after_humbling_her, hebrew, anah, 'humble, afflict').
source_term(do_not_treat_the_captive_woman_as_a_slave_after_humbling_her, hebrew, shalach, 'send away, release').

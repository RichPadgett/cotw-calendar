% =============================================================================
% Command Group: Justice And Neighbor
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

% Command: love_neighbor_as_self
command(love_neighbor_as_self).
command_title(love_neighbor_as_self, 'Lev 19:18 - Love your neighbor as yourself.').
normal_obedience(love_neighbor_as_self, 'Love your neighbor as yourself.').
concerns(love_neighbor_as_self, neighbor_protection).
scripture_reference(love_neighbor_as_self, 'Leviticus 19:18').
story_reference(love_neighbor_as_self, 'Ruth 2:8-16', 'Boaz shows covenant kindness and practical protection to Ruth as a vulnerable neighbor.').
study_note(love_neighbor_as_self, 'This is a foundation command for neighbor-facing obedience.').

% Command: do_not_hate_brother
command(do_not_hate_brother).
command_title(do_not_hate_brother, 'Lev 19:17 - Do not hate your brother.').
normal_obedience(do_not_hate_brother, 'Do not hate your brother in your heart.').
concerns(do_not_hate_brother, neighbor_protection).
scripture_reference(do_not_hate_brother, 'Leviticus 19:17').
study_note(do_not_hate_brother, 'Torah addresses inward hatred, not only outward harm.').

% Command: rebuke_neighbor_rightly
command(rebuke_neighbor_rightly).
command_title(rebuke_neighbor_rightly, 'Lev 19:17 - Rebuke your neighbor rightly.').
normal_obedience(rebuke_neighbor_rightly, 'Rebuke your neighbor frankly and do not bear sin because of him.').
concerns(rebuke_neighbor_rightly, neighbor_protection).
scripture_reference(rebuke_neighbor_rightly, 'Leviticus 19:17').
story_reference(rebuke_neighbor_rightly, '2 Samuel 12:1-14', 'Nathan rebukes David directly rather than concealing the matter.').
study_note(rebuke_neighbor_rightly, 'Correction is framed as a loving duty, not private resentment.').

% Command: do_not_bear_grudge_or_take_vengeance
command(do_not_bear_grudge_or_take_vengeance).
command_title(do_not_bear_grudge_or_take_vengeance, 'Lev 19:18 - Do not take vengeance or bear a grudge.').
normal_obedience(do_not_bear_grudge_or_take_vengeance, 'Do not take vengeance or bear a grudge against your people.').
concerns(do_not_bear_grudge_or_take_vengeance, neighbor_protection).
scripture_reference(do_not_bear_grudge_or_take_vengeance, 'Leviticus 19:18').
study_note(do_not_bear_grudge_or_take_vengeance, 'Neighbor love includes releasing vengeance and grudges.').

% Command: do_not_pervert_justice
command(do_not_pervert_justice).
command_title(do_not_pervert_justice, 'Lev 19:15 - Do not pervert justice.').
normal_obedience(do_not_pervert_justice, 'Do not pervert justice, show partiality, or favor status in judgment.').
concerns(do_not_pervert_justice, justice_and_truth).
scripture_reference(do_not_pervert_justice, 'Leviticus 19:15').
scripture_reference(do_not_pervert_justice, 'Deuteronomy 16:18-20').
story_reference(do_not_pervert_justice, '1 Kings 21:8-16', 'Naboth is condemned through corrupted judgment and false witness.').
story_reference(do_not_pervert_justice, '2 Chronicles 19:5-7', 'Jehoshaphat appoints judges and warns them to judge for YHWH without injustice.').
study_note(do_not_pervert_justice, 'Justice must not bend toward rich, poor, powerful, or favored people.').

% Command: do_not_bear_false_witness
command(do_not_bear_false_witness).
command_title(do_not_bear_false_witness, 'Exo 20:16 - Do not bear false witness.').
normal_obedience(do_not_bear_false_witness, 'Do not bear false witness against your neighbor.').
concerns(do_not_bear_false_witness, justice_and_truth).
scripture_reference(do_not_bear_false_witness, 'Exodus 20:16').
scripture_reference(do_not_bear_false_witness, 'Deuteronomy 5:20').
story_reference(do_not_bear_false_witness, '1 Kings 21:10-13', 'False witnesses testify against Naboth, leading to his death.').
study_note(do_not_bear_false_witness, 'False witness corrupts both justice and neighbor protection.').

% Command: do_not_spread_false_report
command(do_not_spread_false_report).
command_title(do_not_spread_false_report, 'Exo 23:1 - Do not spread a false report.').
normal_obedience(do_not_spread_false_report, 'Do not spread a false report or join with the wicked as a malicious witness.').
concerns(do_not_spread_false_report, justice_and_truth).
scripture_reference(do_not_spread_false_report, 'Exodus 23:1-3').
story_reference(do_not_spread_false_report, '1 Kings 21:10-13', 'Naboth is destroyed through a false report and malicious witnesses.').
study_note(do_not_spread_false_report, 'Truthfulness protects community judgment.').

% Command: establish_matter_by_two_or_three_witnesses
command(establish_matter_by_two_or_three_witnesses).
command_title(establish_matter_by_two_or_three_witnesses, 'Deu 19:15 - Establish matters by witnesses.').
normal_obedience(establish_matter_by_two_or_three_witnesses, 'Do not establish guilt by one witness; require two or three witnesses.').
concerns(establish_matter_by_two_or_three_witnesses, justice_and_truth).
scripture_reference(establish_matter_by_two_or_three_witnesses, 'Deuteronomy 19:15').
study_note(establish_matter_by_two_or_three_witnesses, 'The witness standard protects against unjust accusation.').

% -----------------------------------------------------------------------------
% Additional Justice Commands
% -----------------------------------------------------------------------------

% Command: appoint_judges_and_officers_in_your_gates
command(appoint_judges_and_officers_in_your_gates).
command_title(appoint_judges_and_officers_in_your_gates, 'Deuteronomy 16:18 - Appoint judges and officers in your gates.').
normal_obedience(appoint_judges_and_officers_in_your_gates, 'Appoint judges and officers in your gates.').
concerns(appoint_judges_and_officers_in_your_gates, justice_and_truth).
scripture_reference(appoint_judges_and_officers_in_your_gates, 'Deuteronomy 16:18').
story_reference(appoint_judges_and_officers_in_your_gates, '2 Chronicles 19:5-7', 'Jehoshaphat sets judges in the fortified cities of Judah.').
study_note(appoint_judges_and_officers_in_your_gates, 'This command guards public justice by requiring truth, righteous judgment, and restraint in lawful cases: Appoint judges and officers in your gates.').

% Command: judges_must_judge_righteously
command(judges_must_judge_righteously).
command_title(judges_must_judge_righteously, 'Deuteronomy 16:18-20 - Judges must judge righteously.').
normal_obedience(judges_must_judge_righteously, 'Judges must judge righteously.').
concerns(judges_must_judge_righteously, justice_and_truth).
scripture_reference(judges_must_judge_righteously, 'Deuteronomy 16:18-20').
story_reference(judges_must_judge_righteously, '1 Kings 3:16-28', 'Solomon judges wisely between the two women and all Israel recognizes his God-given wisdom.').
story_reference(judges_must_judge_righteously, '2 Chronicles 19:6-7', 'Jehoshaphat charges judges to judge carefully because they judge for YHWH.').
study_note(judges_must_judge_righteously, 'This command guards public justice by requiring truth, righteous judgment, and restraint in lawful cases: Judges must judge righteously.').

% Command: do_not_show_partiality_in_judgment
command(do_not_show_partiality_in_judgment).
command_title(do_not_show_partiality_in_judgment, 'Leviticus 19:15 - Do not show partiality in judgment.').
normal_obedience(do_not_show_partiality_in_judgment, 'Do not show partiality in judgment.').
concerns(do_not_show_partiality_in_judgment, justice_and_truth).
scripture_reference(do_not_show_partiality_in_judgment, 'Leviticus 19:15').
scripture_reference(do_not_show_partiality_in_judgment, 'Deuteronomy 1:17').
story_reference(do_not_show_partiality_in_judgment, '2 Chronicles 19:7', 'Jehoshaphat warns that with YHWH there is no injustice, partiality, or taking bribes.').
study_note(do_not_show_partiality_in_judgment, 'This command guards public justice by requiring truth, righteous judgment, and restraint in lawful cases: Do not show partiality in judgment.').
command_requirement(do_not_show_partiality_in_judgment, 'Israel').

% Command: do_not_fear_man_in_judgment
command(do_not_fear_man_in_judgment).
command_title(do_not_fear_man_in_judgment, 'Deuteronomy 1:17 - Do not fear man in judgment.').
normal_obedience(do_not_fear_man_in_judgment, 'Do not fear man in judgment.').
concerns(do_not_fear_man_in_judgment, justice_and_truth).
scripture_reference(do_not_fear_man_in_judgment, 'Deuteronomy 1:17').
study_note(do_not_fear_man_in_judgment, 'This command guards public justice by requiring truth, righteous judgment, and restraint in lawful cases: Do not fear man in judgment.').

% Command: do_not_take_a_bribe
command(do_not_take_a_bribe).
command_title(do_not_take_a_bribe, 'Exodus 23:8 - Do not take a bribe.').
normal_obedience(do_not_take_a_bribe, 'Do not take a bribe.').
concerns(do_not_take_a_bribe, justice_and_truth).
scripture_reference(do_not_take_a_bribe, 'Exodus 23:8').
scripture_reference(do_not_take_a_bribe, 'Deuteronomy 16:19').
story_reference(do_not_take_a_bribe, '1 Samuel 8:1-3', 'Samuel''s sons take bribes and pervert justice, showing the violation.').
story_reference(do_not_take_a_bribe, '2 Chronicles 19:7', 'Jehoshaphat warns judges against bribes.').
study_note(do_not_take_a_bribe, 'This command guards public justice by requiring truth, righteous judgment, and restraint in lawful cases: Do not take a bribe.').

% Command: do_not_follow_the_many_to_do_evil
command(do_not_follow_the_many_to_do_evil).
command_title(do_not_follow_the_many_to_do_evil, 'Exodus 23:2 - Do not follow the many to do evil.').
normal_obedience(do_not_follow_the_many_to_do_evil, 'Do not follow the many to do evil.').
concerns(do_not_follow_the_many_to_do_evil, justice_and_truth).
scripture_reference(do_not_follow_the_many_to_do_evil, 'Exodus 23:2').
study_note(do_not_follow_the_many_to_do_evil, 'This command guards public justice by requiring truth, righteous judgment, and restraint in lawful cases: Do not follow the many to do evil.').

% Command: do_not_testify_in_a_way_that_bends_justice_after_the_many
command(do_not_testify_in_a_way_that_bends_justice_after_the_many).
command_title(do_not_testify_in_a_way_that_bends_justice_after_the_many, 'Exodus 23:2 - Do not testify in a way that bends justice after the many.').
normal_obedience(do_not_testify_in_a_way_that_bends_justice_after_the_many, 'Do not testify in a way that bends justice after the many.').
concerns(do_not_testify_in_a_way_that_bends_justice_after_the_many, justice_and_truth).
scripture_reference(do_not_testify_in_a_way_that_bends_justice_after_the_many, 'Exodus 23:2').
study_note(do_not_testify_in_a_way_that_bends_justice_after_the_many, 'This command guards public justice by requiring truth, righteous judgment, and restraint in lawful cases: Do not testify in a way that bends justice after the many.').

% Command: do_not_favor_the_poor_in_his_dispute
command(do_not_favor_the_poor_in_his_dispute).
command_title(do_not_favor_the_poor_in_his_dispute, 'Exodus 23:3 - Do not favor the poor in his dispute.').
normal_obedience(do_not_favor_the_poor_in_his_dispute, 'Do not favor the poor in his dispute.').
concerns(do_not_favor_the_poor_in_his_dispute, justice_and_truth).
scripture_reference(do_not_favor_the_poor_in_his_dispute, 'Exodus 23:3').
study_note(do_not_favor_the_poor_in_his_dispute, 'This command guards public justice by requiring truth, righteous judgment, and restraint in lawful cases: Do not favor the poor in his dispute.').

% Command: do_not_pervert_justice_for_the_stranger_orphan_or_widow
command(do_not_pervert_justice_for_the_stranger_orphan_or_widow).
command_title(do_not_pervert_justice_for_the_stranger_orphan_or_widow, 'Deuteronomy 24:17 - Do not pervert justice for the stranger, orphan, or widow.').
normal_obedience(do_not_pervert_justice_for_the_stranger_orphan_or_widow, 'Do not pervert justice for the stranger, orphan, or widow.').
concerns(do_not_pervert_justice_for_the_stranger_orphan_or_widow, justice_and_truth).
scripture_reference(do_not_pervert_justice_for_the_stranger_orphan_or_widow, 'Deuteronomy 24:17').
study_note(do_not_pervert_justice_for_the_stranger_orphan_or_widow, 'This command guards public justice by requiring truth, righteous judgment, and restraint in lawful cases: Do not pervert justice for the stranger, orphan, or widow.').

% Command: do_not_punish_children_for_fathers_or_fathers_for_children
command(do_not_punish_children_for_fathers_or_fathers_for_children).
command_title(do_not_punish_children_for_fathers_or_fathers_for_children, 'Deuteronomy 24:16 - Do not punish children for fathers or fathers for children.').
normal_obedience(do_not_punish_children_for_fathers_or_fathers_for_children, 'Do not punish children for fathers or fathers for children.').
concerns(do_not_punish_children_for_fathers_or_fathers_for_children, justice_and_truth).
scripture_reference(do_not_punish_children_for_fathers_or_fathers_for_children, 'Deuteronomy 24:16').
story_reference(do_not_punish_children_for_fathers_or_fathers_for_children, '2 Kings 14:5-6', 'Amaziah executes his father''s servants but does not put their children to death, according to Torah.').
study_note(do_not_punish_children_for_fathers_or_fathers_for_children, 'This command guards public justice by requiring truth, righteous judgment, and restraint in lawful cases: Do not punish children for fathers or fathers for children.').

% Command: establish_matters_by_two_or_three_witnesses
command(establish_matters_by_two_or_three_witnesses).
command_title(establish_matters_by_two_or_three_witnesses, 'Deuteronomy 19:15 - Establish matters by two or three witnesses.').
normal_obedience(establish_matters_by_two_or_three_witnesses, 'Establish matters by two or three witnesses.').
concerns(establish_matters_by_two_or_three_witnesses, justice_and_truth).
scripture_reference(establish_matters_by_two_or_three_witnesses, 'Deuteronomy 19:15').
study_note(establish_matters_by_two_or_three_witnesses, 'This command guards public justice by requiring truth, righteous judgment, and restraint in lawful cases: Establish matters by two or three witnesses.').

% Command: do_to_a_false_witness_as_he_intended_to_do
command(do_to_a_false_witness_as_he_intended_to_do).
command_title(do_to_a_false_witness_as_he_intended_to_do, 'Deuteronomy 19:16-21 - Do to a false witness as he intended to do.').
normal_obedience(do_to_a_false_witness_as_he_intended_to_do, 'Do to a false witness as he intended to do.').
concerns(do_to_a_false_witness_as_he_intended_to_do, justice_and_truth).
scripture_reference(do_to_a_false_witness_as_he_intended_to_do, 'Deuteronomy 19:16-21').
story_reference(do_to_a_false_witness_as_he_intended_to_do, '1 Kings 21:10-13', 'The Naboth account gives a clear example of the kind of false-witness evil this command addresses.').
study_note(do_to_a_false_witness_as_he_intended_to_do, 'This command guards public justice by requiring truth, righteous judgment, and restraint in lawful cases: Do to a false witness as he intended to do.').

% Command: do_not_pity_in_the_false_witness_case
command(do_not_pity_in_the_false_witness_case).
command_title(do_not_pity_in_the_false_witness_case, 'Deuteronomy 19:21 - Do not pity in the false witness case.').
normal_obedience(do_not_pity_in_the_false_witness_case, 'Do not pity in the false witness case.').
concerns(do_not_pity_in_the_false_witness_case, justice_and_truth).
scripture_reference(do_not_pity_in_the_false_witness_case, 'Deuteronomy 19:21').
study_note(do_not_pity_in_the_false_witness_case, 'This command guards public justice by requiring truth, righteous judgment, and restraint in lawful cases: Do not pity in the false witness case.').

% Command: do_not_accept_ransom_for_a_murderer
command(do_not_accept_ransom_for_a_murderer).
command_title(do_not_accept_ransom_for_a_murderer, 'Numbers 35:31 - Do not accept ransom for a murderer.').
normal_obedience(do_not_accept_ransom_for_a_murderer, 'Do not accept ransom for a murderer.').
concerns(do_not_accept_ransom_for_a_murderer, justice_and_truth).
scripture_reference(do_not_accept_ransom_for_a_murderer, 'Numbers 35:31').
study_note(do_not_accept_ransom_for_a_murderer, 'This command guards public justice by requiring truth, righteous judgment, and restraint in lawful cases: Do not accept ransom for a murderer.').
source_term(do_not_accept_ransom_for_a_murderer, hebrew, 'kōp̄er', 'The kjv uses satisfaction which can also mean ransom, bribe or a sum of money').

% Command: do_not_accept_ransom_for_one_in_refuge_to_return_early
command(do_not_accept_ransom_for_one_in_refuge_to_return_early).
command_title(do_not_accept_ransom_for_one_in_refuge_to_return_early, 'Numbers 35:32 - Do not accept ransom for one in refuge to return early.').
normal_obedience(do_not_accept_ransom_for_one_in_refuge_to_return_early, 'Do not accept ransom for one in refuge to return early.').
concerns(do_not_accept_ransom_for_one_in_refuge_to_return_early, justice_and_truth).
scripture_reference(do_not_accept_ransom_for_one_in_refuge_to_return_early, 'Numbers 35:32').
study_note(do_not_accept_ransom_for_one_in_refuge_to_return_early, 'This command guards public justice by requiring truth, righteous judgment, and restraint in lawful cases: Do not accept ransom for one in refuge to return early.').

% Command: do_not_pollute_the_land_with_blood
command(do_not_pollute_the_land_with_blood).
command_title(do_not_pollute_the_land_with_blood, 'Numbers 35:33-34 - Do not pollute the land with blood.').
normal_obedience(do_not_pollute_the_land_with_blood, 'Do not pollute the land with blood.').
concerns(do_not_pollute_the_land_with_blood, justice_and_truth).
scripture_reference(do_not_pollute_the_land_with_blood, 'Numbers 35:33-34').
study_note(do_not_pollute_the_land_with_blood, 'This command guards public justice by requiring truth, righteous judgment, and restraint in lawful cases: Do not pollute the land with blood.').

% Command: execute_judgment_for_intentional_murder_when_lawful_court_system_applies
command(execute_judgment_for_intentional_murder_when_lawful_court_system_applies).
command_title(execute_judgment_for_intentional_murder_when_lawful_court_system_applies, 'Exodus 21:12 - Execute judgment for intentional murder when lawful court system applies.').
normal_obedience(execute_judgment_for_intentional_murder_when_lawful_court_system_applies, 'Execute judgment for intentional murder when lawful court system applies.').
concerns(execute_judgment_for_intentional_murder_when_lawful_court_system_applies, justice_and_truth).
scripture_reference(execute_judgment_for_intentional_murder_when_lawful_court_system_applies, 'Exodus 21:12').
scripture_reference(execute_judgment_for_intentional_murder_when_lawful_court_system_applies, 'Numbers 35').
study_note(execute_judgment_for_intentional_murder_when_lawful_court_system_applies, 'This command guards public justice by requiring truth, righteous judgment, and restraint in lawful cases: Execute judgment for intentional murder when lawful court system applies.').

% Command: execute_judgment_for_kidnapping_when_lawful_court_system_applies
command(execute_judgment_for_kidnapping_when_lawful_court_system_applies).
command_title(execute_judgment_for_kidnapping_when_lawful_court_system_applies, 'Exodus 21:16 - Execute judgment for kidnapping when lawful court system applies.').
normal_obedience(execute_judgment_for_kidnapping_when_lawful_court_system_applies, 'Execute judgment for kidnapping when lawful court system applies.').
concerns(execute_judgment_for_kidnapping_when_lawful_court_system_applies, justice_and_truth).
scripture_reference(execute_judgment_for_kidnapping_when_lawful_court_system_applies, 'Exodus 21:16').
study_note(execute_judgment_for_kidnapping_when_lawful_court_system_applies, 'This command guards public justice by requiring truth, righteous judgment, and restraint in lawful cases: Execute judgment for kidnapping when lawful court system applies.').

% Command: execute_judgment_for_striking_or_cursing_father_or_mother_when_lawful_court_sy
command(execute_judgment_for_striking_or_cursing_father_or_mother_when_lawful_court_sy).
command_title(execute_judgment_for_striking_or_cursing_father_or_mother_when_lawful_court_sy, 'Exodus 21:15, 17 - Execute judgment for striking or cursing father or mother when lawful court system applies.').
normal_obedience(execute_judgment_for_striking_or_cursing_father_or_mother_when_lawful_court_sy, 'Execute judgment for striking or cursing father or mother when lawful court system applies.').
concerns(execute_judgment_for_striking_or_cursing_father_or_mother_when_lawful_court_sy, justice_and_truth).
scripture_reference(execute_judgment_for_striking_or_cursing_father_or_mother_when_lawful_court_sy, 'Exodus 21:15, 17').
study_note(execute_judgment_for_striking_or_cursing_father_or_mother_when_lawful_court_sy, 'This command guards public justice by requiring truth, righteous judgment, and restraint in lawful cases: Execute judgment for striking or cursing father or mother when lawful court system applies.').

% Command: execute_judgment_for_blaspheming_the_name_when_lawful_court_system_applies
command(execute_judgment_for_blaspheming_the_name_when_lawful_court_system_applies).
command_title(execute_judgment_for_blaspheming_the_name_when_lawful_court_system_applies, 'Leviticus 24:10-16 - Execute judgment for blaspheming the Name when lawful court system applies.').
normal_obedience(execute_judgment_for_blaspheming_the_name_when_lawful_court_system_applies, 'Execute judgment for blaspheming the Name when lawful court system applies.').
concerns(execute_judgment_for_blaspheming_the_name_when_lawful_court_system_applies, justice_and_truth).
scripture_reference(execute_judgment_for_blaspheming_the_name_when_lawful_court_system_applies, 'Leviticus 24:10-16').
study_note(execute_judgment_for_blaspheming_the_name_when_lawful_court_system_applies, 'This command guards public justice by requiring truth, righteous judgment, and restraint in lawful cases: Execute judgment for blaspheming the Name when lawful court system applies.').

% Command: execute_judgment_for_idolatry_cases_when_lawful_court_system_applies
command(execute_judgment_for_idolatry_cases_when_lawful_court_system_applies).
command_title(execute_judgment_for_idolatry_cases_when_lawful_court_system_applies, 'Deuteronomy 13 - Execute judgment for idolatry cases when lawful court system applies.').
normal_obedience(execute_judgment_for_idolatry_cases_when_lawful_court_system_applies, 'Execute judgment for idolatry cases when lawful court system applies.').
concerns(execute_judgment_for_idolatry_cases_when_lawful_court_system_applies, justice_and_truth).
scripture_reference(execute_judgment_for_idolatry_cases_when_lawful_court_system_applies, 'Deuteronomy 13').
scripture_reference(execute_judgment_for_idolatry_cases_when_lawful_court_system_applies, '17:2-7').
study_note(execute_judgment_for_idolatry_cases_when_lawful_court_system_applies, 'This command guards public justice by requiring truth, righteous judgment, and restraint in lawful cases: Execute judgment for idolatry cases when lawful court system applies.').

% Command: execute_judgment_for_specific_sexual_violations_when_lawful_court_system_appli
command(execute_judgment_for_specific_sexual_violations_when_lawful_court_system_appli).
command_title(execute_judgment_for_specific_sexual_violations_when_lawful_court_system_appli, 'Leviticus 20 - Execute judgment for specific sexual violations when lawful court system applies.').
normal_obedience(execute_judgment_for_specific_sexual_violations_when_lawful_court_system_appli, 'Execute judgment for specific sexual violations when lawful court system applies.').
concerns(execute_judgment_for_specific_sexual_violations_when_lawful_court_system_appli, justice_and_truth).
scripture_reference(execute_judgment_for_specific_sexual_violations_when_lawful_court_system_appli, 'Leviticus 20').
scripture_reference(execute_judgment_for_specific_sexual_violations_when_lawful_court_system_appli, 'Deuteronomy 22').
study_note(execute_judgment_for_specific_sexual_violations_when_lawful_court_system_appli, 'This command guards public justice by requiring truth, righteous judgment, and restraint in lawful cases: Execute judgment for specific sexual violations when lawful court system applies.').

% Command: do_not_degrade_your_brother_with_excessive_lashes
command(do_not_degrade_your_brother_with_excessive_lashes).
command_title(do_not_degrade_your_brother_with_excessive_lashes, 'Deuteronomy 25:1-3 - Do not degrade your brother with excessive lashes.').
normal_obedience(do_not_degrade_your_brother_with_excessive_lashes, 'Do not degrade your brother with excessive lashes.').
concerns(do_not_degrade_your_brother_with_excessive_lashes, justice_and_truth).
scripture_reference(do_not_degrade_your_brother_with_excessive_lashes, 'Deuteronomy 25:1-3').
study_note(do_not_degrade_your_brother_with_excessive_lashes, 'This command guards public justice by requiring truth, righteous judgment, and restraint in lawful cases: Do not degrade your brother with excessive lashes.').

% Command: limit_lashes_to_forty
command(limit_lashes_to_forty).
command_title(limit_lashes_to_forty, 'Deuteronomy 25:3 - Limit lashes to forty.').
normal_obedience(limit_lashes_to_forty, 'Limit lashes to forty.').
concerns(limit_lashes_to_forty, justice_and_truth).
scripture_reference(limit_lashes_to_forty, 'Deuteronomy 25:3').
study_note(limit_lashes_to_forty, 'This command guards public justice by requiring truth, righteous judgment, and restraint in lawful cases: Limit lashes to forty.').

% =============================================================================
% Command Catalog Rules
% Author: rpadgett
%
% These rules expose commands as a catalog of facts and applicability notes
% rather than a "can this be followed today" decision flow.
% =============================================================================

% Reminder Text
% -----------------------------------------------------------------------------

reminder_text(Command, ReminderText) :-
    normal_obedience(Command, ReminderText).

% -----------------------------------------------------------------------------
% Facts
% -----------------------------------------------------------------------------

command_fact(Command, Concern) :-
    concerns(Command, Concern).

% Defines command fact.
command_fact(Command, scripture_backed) :-
    scripture_reference(Command, _).

% Defines command fact.
command_fact(Command, reminder_eligible) :-
    reminder_text(Command, _).

% Defines command fact.
command_fact(Command, appointed_time) :-
    concerns(Command, appointed_times).

% Defines command fact.
command_fact(Command, sabbath) :-
    concerns(Command, sabbath_rest).

% Defines command fact.
command_fact(Command, passover) :-
    concerns(Command, passover_memorial).

% Defines command fact.
command_fact(Command, unleavened_bread) :-
    concerns(Command, unleavened_bread_obedience).

% Defines command fact.
command_fact(Command, firstfruits) :-
    member(Command, [
        bring_firstfruits_sheaf,
        wave_firstfruits_sheaf,
        do_not_eat_new_grain_before_offering,
        count_seven_sabbaths_to_shavuot,
        bring_new_grain_offering,
        firstfruits_shavuot_offerings
    ]).

% Defines command fact.
command_fact(Command, omer_count) :-
    Command = count_seven_sabbaths_to_shavuot.

% Defines command fact.
command_fact(Command, sacred_assembly) :-
    concerns(Command, sacred_assembly).

% Defines command fact.
command_fact(Command, atonement) :-
    concerns(Command, atonement_rest).

% Defines command fact.
command_fact(Command, tabernacles) :-
    concerns(Command, tabernacles_rejoicing).

% Defines command fact.
command_fact(Command, teaching_children) :-
    concerns(Command, teach_children_torah).

% Defines command fact.
command_fact(Command, priestly_service) :-
    member(Command, [
        bring_firstfruits_sheaf,
        wave_firstfruits_sheaf,
        bring_new_grain_offering,
        daily_offerings,
        sabbath_offerings,
        monthly_offerings,
        passover_unleavened_bread_offerings,
        firstfruits_shavuot_offerings,
        trumpets_offerings,
        atonement_offerings,
        tabernacles_offerings,
        priests_keep_holy_status,
        high_priest_keep_special_holiness,
        priests_do_not_serve_with_defect,
        priests_do_not_eat_holy_things_while_unclean,
        offer_unblemished_animals,
        guard_sanctuary_duties,
        give_priestly_portions,
        levites_receive_tithe,
        priestly_blessing
    ]).

% -----------------------------------------------------------------------------
% Categories
% -----------------------------------------------------------------------------

command_category(Command, sabbath) :-
    command_fact(Command, sabbath).

% Defines command category.
command_category(Command, passover_unleavened_bread) :-
    (command_fact(Command, passover); command_fact(Command, unleavened_bread)).

% Defines command category.
command_category(Command, firstfruits_omer) :-
    command_fact(Command, firstfruits);
    command_fact(Command, omer_count).

% Defines command category.
command_category(Command, appointed_times) :-
    command_fact(Command, appointed_time).

% Defines command category.
command_category(Command, sacred_assembly) :-
    command_fact(Command, sacred_assembly).

% Defines command category.
command_category(Command, atonement) :-
    command_fact(Command, atonement).

% Defines command category.
command_category(Command, tabernacles) :-
    command_fact(Command, tabernacles).

% Defines command category.
command_category(Command, torah_teaching) :-
    command_fact(Command, teaching_children).

% Defines command category.
command_category(Command, community_care) :-
    command_fact(Command, include_vulnerable_neighbors).

% Defines command category.
command_category(Command, command_remembrance) :-
    command_fact(Command, remember_yhwhs_commands).

% Defines command category.
command_category(Command, offerings) :-
    command_fact(Command, priestly_service).

% Defines command category.
command_category(Command, worship_idolatry) :-
    command_fact(Command, exclusive_worship);
    command_fact(Command, reject_idolatry).

% Defines command category.
command_category(Command, name_vows_remembrance) :-
    command_fact(Command, honor_yhwhs_name);
    command_fact(Command, tassel_remembrance).

% Defines command category.
command_category(Command, clean_purity) :-
    command_fact(Command, clean_and_unclean_distinction);
    command_fact(Command, purity_and_camp_holiness).

% Defines command category.
command_category(Command, priestly_holiness) :-
    command_fact(Command, priestly_holiness).

% Defines command category.
command_category(Command, justice_neighbor) :-
    command_fact(Command, justice_and_truth);
    command_fact(Command, neighbor_protection).

% Defines command category.
command_category(Command, family_household) :-
    command_fact(Command, family_order);
    command_fact(Command, sexual_boundaries).

% Defines command category.
command_category(Command, property_economics_land) :-
    command_fact(Command, honest_business);
    command_fact(Command, property_restoration);
    command_fact(Command, debt_mercy);
    command_fact(Command, land_stewardship);
    command_fact(Command, damages_and_restitution).

% Defines command category.
command_category(Command, leadership_warfare) :-
    command_fact(Command, leadership_limits);
    command_fact(Command, warfare_order).

% Defines command category.
command_category(Command, mixed_kinds) :-
    command_fact(Command, mixed_kinds_boundary).

% Defines command category.
command_category(Command, animal_welfare) :-
    command_fact(Command, animal_welfare).

% Defines command category.
command_category(Command, servants_release) :-
    command_fact(Command, servant_release_mercy).

% Defines command category.
command_category(Command, refuge_court_procedure) :-
    command_fact(Command, refuge_and_bloodguilt).

% Defines command category.
command_category(Command, marriage_household) :-
    command_fact(Command, marriage_household_procedure).

% Defines command category.
command_category(Command, vows_separation) :-
    command_fact(Command, vow_separation).

% -----------------------------------------------------------------------------
% Applicability
% -----------------------------------------------------------------------------

applies_if(Command, during_sabbath) :-
    command_fact(Command, sabbath).

% Defines applies if.
applies_if(Command, during_passover_season) :-
    command_fact(Command, passover).

% Defines applies if.
applies_if(Command, during_feast_of_unleavened_bread) :-
    command_fact(Command, unleavened_bread).

% Defines applies if.
applies_if(Command, during_firstfruits_or_omer_count) :-
    command_fact(Command, firstfruits);
    command_fact(Command, omer_count).

% Defines applies if.
applies_if(Command, during_sacred_assembly) :-
    command_fact(Command, sacred_assembly).

% Defines applies if.
applies_if(Command, during_day_of_atonement) :-
    command_fact(Command, atonement).

% Defines applies if.
applies_if(Command, during_feast_of_tabernacles) :-
    command_fact(Command, tabernacles).

% Defines applies if.
applies_if(Command, when_teaching_household_or_community) :-
    command_fact(Command, teaching_children).

% Defines applies if.
applies_if(Command, when_rejoicing_with_household_and_community) :-
    command_fact(Command, include_vulnerable_neighbors).

% Defines applies if.
applies_if(Command, when_priestly_service_is_available) :-
    command_fact(Command, priestly_service).

% Defines applies if.
applies_if(Command, when_worshiping_yhwh) :-
    command_fact(Command, exclusive_worship);
    command_fact(Command, reject_idolatry);
    command_fact(Command, honor_yhwhs_name).

% Defines applies if.
applies_if(Command, when_remembering_commands) :-
    command_fact(Command, tassel_remembrance);
    command_fact(Command, remember_yhwhs_commands).

% Defines applies if.
applies_if(Command, when_clean_purity_matter_is_present) :-
    command_fact(Command, clean_and_unclean_distinction);
    command_fact(Command, purity_and_camp_holiness).

% Defines applies if.
applies_if(Command, when_priestly_holiness_applies) :-
    command_fact(Command, priestly_holiness).

% Defines applies if.
applies_if(Command, when_judgment_or_dispute_is_present) :-
    command_fact(Command, justice_and_truth).

% Defines applies if.
applies_if(Command, when_neighbor_need_or_harm_is_present) :-
    command_fact(Command, neighbor_protection).

% Defines applies if.
applies_if(Command, when_family_or_household_role_applies) :-
    command_fact(Command, family_order);
    command_fact(Command, sexual_boundaries).

% Defines applies if.
applies_if(Command, when_business_property_or_debt_matter_is_present) :-
    command_fact(Command, honest_business);
    command_fact(Command, property_restoration);
    command_fact(Command, debt_mercy).

% Defines applies if.
applies_if(Command, when_living_in_the_land_or_farming) :-
    command_fact(Command, land_stewardship).

% Defines applies if.
applies_if(Command, when_leadership_or_warfare_role_applies) :-
    command_fact(Command, leadership_limits);
    command_fact(Command, warfare_order).

% Defines applies if.
applies_if(Command, when_mixed_kinds_matter_is_present) :-
    command_fact(Command, mixed_kinds_boundary).

% Defines applies if.
applies_if(Command, when_responsible_for_animals) :-
    command_fact(Command, animal_welfare).

% Defines applies if.
applies_if(Command, when_servant_release_law_applies) :-
    command_fact(Command, servant_release_mercy).

% Defines applies if.
applies_if(Command, when_damage_theft_or_restitution_matter_is_present) :-
    command_fact(Command, damages_and_restitution).

% Defines applies if.
applies_if(Command, when_refuge_or_bloodguilt_case_is_present) :-
    command_fact(Command, refuge_and_bloodguilt).

% Defines applies if.
applies_if(Command, when_marriage_household_procedure_applies) :-
    command_fact(Command, marriage_household_procedure).

% Defines applies if.
applies_if(Command, when_vow_or_separation_status_applies) :-
    command_fact(Command, vow_separation).

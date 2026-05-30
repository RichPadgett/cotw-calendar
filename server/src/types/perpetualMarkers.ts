export type PerpetualMarker = {
    id: string;

    title: string;
    shortName: string;
    color: string;

    description?: string;

    month?: number;
    day?: number;

    gateDay?: number;

    intercalaryWeek?: boolean;
};
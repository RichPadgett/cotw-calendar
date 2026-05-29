import fs from "fs";
import path from "path";

import { CalendarDayContent } from "../types/calendarContent";

const CONTENT_ROOT = path.join(process.cwd(), "content", "groups");

export type CalendarNoticeSummary = {
    year: number;
    month: number;
    day: number;

    title: string;

    access: string;

    hasContent: boolean;
};

function getNoticeIndexPath(groupCode: string, year: string) {
    return path.join(
        CONTENT_ROOT,
        groupCode,
        "notices",
        `${year}.json`
    );
}

export function updateNoticeIndexForDay(
    groupCode: string,
    year: string,
    month: string,
    day: string,
    content: CalendarDayContent
) {
    const noticeSections =
        content.sections?.filter(
            (section) => section.displayStyle === "notice"
        ) ?? [];

    const hasContent =
        Boolean(content.notes) ||
        Boolean(content.scriptureReadings?.length) ||
        Boolean(
            content.sections?.some(
                (section) =>
                    section.displayStyle !== "notice" &&
                    section.items?.length
            )
        );

    const notices: CalendarNoticeSummary[] = noticeSections.flatMap((section) =>
        section.items.map((item) => ({
            year: Number(year),
            month: Number(month),
            day: Number(day),
            title: item.label,
            access: item.access,
            hasContent, 
        }))
    );

    const indexPath = getNoticeIndexPath(groupCode, year);
    const indexFolder = path.dirname(indexPath);

    fs.mkdirSync(indexFolder, { recursive: true });

    let existing: CalendarNoticeSummary[] = [];

    if (fs.existsSync(indexPath)) {
        existing = JSON.parse(fs.readFileSync(indexPath, "utf-8"));
    }

    const withoutCurrentDay = existing.filter(
        (notice) =>
            !(
                notice.year === Number(year) &&
                notice.month === Number(month) &&
                notice.day === Number(day)
            )
    );

    const next = [...withoutCurrentDay, ...notices];

    fs.writeFileSync(indexPath, JSON.stringify(next, null, 2), "utf-8");
}

export function getNoticeIndex(
    groupCode: string,
    year: string
): CalendarNoticeSummary[] {
    const indexPath = getNoticeIndexPath(groupCode, year);

    if (!fs.existsSync(indexPath)) {
        return [];
    }

    return JSON.parse(fs.readFileSync(indexPath, "utf-8"));
}
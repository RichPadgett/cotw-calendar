import { Router } from "express";

const router = Router();
const STUDYBOX_URL = "https://studybox.enochscalendar.com";

router.get("/status", async (_req, res) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4_000);

  try {
    const response = await fetch(STUDYBOX_URL, {
      method: "HEAD",
      redirect: "follow",
      signal: controller.signal,
    });
    const contentType = response.headers.get("content-type") ?? "";

    res.setHeader("Cache-Control", "no-store");
    res.json({
      available: response.ok && contentType.includes("text/html"),
    });
  } catch {
    res.setHeader("Cache-Control", "no-store");
    res.json({ available: false });
  } finally {
    clearTimeout(timeoutId);
  }
});

export default router;

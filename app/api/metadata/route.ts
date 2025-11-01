import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function POST(req: Request) {
  const { url } = await req.json();

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "metadata-bot/1.0" },
    });
    const html = await res.text();
    const $ = cheerio.load(html);

    const getMeta = (name: string) =>
      $(`meta[name="${name}"]`).attr("content") ||
      $(`meta[property="${name}"]`).attr("content");

    const title =
      $("title").first().text() ||
      getMeta("og:title") ||
      getMeta("twitter:title");

    const description =
      getMeta("description") ||
      getMeta("og:description") ||
      getMeta("twitter:description");

    let image = null;

    let favicon =
      $('link[rel="icon"]').attr("href") ||
      $('link[rel="shortcut icon"]').attr("href");

    if (favicon) {
      image = new URL(favicon, url).toString();
    } else {
      image = new URL("/favicon.ico", url).toString();
    }

    return NextResponse.json({ title, description, image, url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

import * as cheerio from "cheerio";

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ dailyVerse: "" });
});

chrome.runtime.onStartup.addListener(() => {
    chrome.storage.sync.get("dailyVerse", (data) => {
        if (!data.dailyVerse) {
            fetchVerseAndSave();
        }
    });
});

chrome.tabs.onCreated.addListener((tab) => {
    chrome.storage.sync.get("dailyVerse", (data) => {
        if (!data.dailyVerse) {
            fetchVerseAndSave();
        }
    });
});

const fetchVerseAndSave = async () => {
    const url = "https://www.bible.com/verse-of-the-day";
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    const verseText = $(".chakra-text .bible-1lfxuq7").first().text();
    console.log("verseText", verseText);

    chrome.storage.sync.set({ dailyVerse: verseText });
};

export {};

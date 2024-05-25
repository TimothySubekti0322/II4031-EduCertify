import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import type { Transcript } from "@prisma/client";
import chromium from "@sparticuz/chromium-min";

interface TranscriptData extends Transcript {
  owner: string;
}

export const generatePdf = async (
  data: TranscriptData,
  pdfOptions = {}
): Promise<Buffer> => {
  let browser;
  try {
    const templatePath = path.join(process.cwd(), "utils", "template.html");
    // const templatePath = "../template/template.html";
    let htmlContent = fs.readFileSync(templatePath, "utf8");
    htmlContent = htmlContent.replace("{{name}}", data.nama);
    htmlContent = htmlContent.replace("{{nim}}", data.nim);
    htmlContent = htmlContent.replace("{{kodeMk1}}", data.kodeMk1);
    htmlContent = htmlContent.replace("{{namaMk1}}", data.namaMk1);
    htmlContent = htmlContent.replace("{{sks1}}", data.sks1.toString());
    htmlContent = htmlContent.replace("{{nilai1}}", data.nilai1);
    htmlContent = htmlContent.replace("{{kodeMk2}}", data.kodeMk2);
    htmlContent = htmlContent.replace("{{namaMk2}}", data.namaMk2);
    htmlContent = htmlContent.replace("{{sks2}}", data.sks2.toString());
    htmlContent = htmlContent.replace("{{nilai2}}", data.nilai2);
    htmlContent = htmlContent.replace("{{kodeMk3}}", data.kodeMk3);
    htmlContent = htmlContent.replace("{{namaMk3}}", data.namaMk3);
    htmlContent = htmlContent.replace("{{sks3}}", data.sks3.toString());
    htmlContent = htmlContent.replace("{{nilai3}}", data.nilai3);
    htmlContent = htmlContent.replace("{{kodeMk4}}", data.kodeMk4);
    htmlContent = htmlContent.replace("{{namaMk4}}", data.namaMk4);
    htmlContent = htmlContent.replace("{{sks4}}", data.sks4.toString());
    htmlContent = htmlContent.replace("{{nilai4}}", data.nilai4);
    htmlContent = htmlContent.replace("{{kodeMk5}}", data.kodeMk5);
    htmlContent = htmlContent.replace("{{namaMk5}}", data.namaMk5);
    htmlContent = htmlContent.replace("{{sks5}}", data.sks5.toString());
    htmlContent = htmlContent.replace("{{nilai5}}", data.nilai5);
    htmlContent = htmlContent.replace("{{kodeMk6}}", data.kodeMk6);
    htmlContent = htmlContent.replace("{{namaMk6}}", data.namaMk6);
    htmlContent = htmlContent.replace("{{sks6}}", data.sks6.toString());
    htmlContent = htmlContent.replace("{{nilai6}}", data.nilai6);
    htmlContent = htmlContent.replace("{{kodeMk7}}", data.kodeMk7);
    htmlContent = htmlContent.replace("{{namaMk7}}", data.namaMk7);
    htmlContent = htmlContent.replace("{{sks7}}", data.sks7.toString());
    htmlContent = htmlContent.replace("{{nilai7}}", data.nilai7);
    htmlContent = htmlContent.replace("{{kodeMk8}}", data.kodeMk8);
    htmlContent = htmlContent.replace("{{namaMk8}}", data.namaMk8);
    htmlContent = htmlContent.replace("{{sks8}}", data.sks8.toString());
    htmlContent = htmlContent.replace("{{nilai8}}", data.nilai8);
    htmlContent = htmlContent.replace("{{kodeMk9}}", data.kodeMk9);
    htmlContent = htmlContent.replace("{{namaMk9}}", data.namaMk9);
    htmlContent = htmlContent.replace("{{sks9}}", data.sks9.toString());
    htmlContent = htmlContent.replace("{{nilai9}}", data.nilai9);
    htmlContent = htmlContent.replace("{{kodeMk10}}", data.kodeMk10);
    htmlContent = htmlContent.replace("{{namaMk10}}", data.namaMk10);
    htmlContent = htmlContent.replace("{{sks10}}", data.sks10.toString());
    htmlContent = htmlContent.replace("{{nilai10}}", data.nilai10);
    htmlContent = htmlContent.replace("{{totalSks}}", data.totalSks.toString());
    htmlContent = htmlContent.replace("{{ipk}}", data.ipk.toString());
    htmlContent = htmlContent.replace("{{publicKey}}", data.signature);
    htmlContent = htmlContent.replace("{{owner}}", data.owner);

    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      // args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
      // defaultViewport: chromium.defaultViewport,
      // // you have to point to a Chromium tar file here 👇
      // executablePath: await chromium.executablePath(
      //   `https://your-uploaded-chromium-pack.tar`
      // ),
      // headless: chromium.headless,
      // ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();

    await page.setContent(htmlContent, { waitUntil: "networkidle0" });
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      ...pdfOptions,
    });

    console.log("pdfBuffer : ", pdfBuffer);

    return pdfBuffer;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error("Failed to generate PDF");
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

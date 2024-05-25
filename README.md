
# EduCertify Web Application

## Overview

EduCertify is a digital signature prototype website built using Next.js and TypeScript. This project is designed for cryptography and coding lectures, providing a secure way to handle academic transcripts. The system creates digital signatures by hashing the transcript data and encrypting it with the head of the study program's private key using RSA. Users can view both the cipher text and plaintext, download the encrypted transcript PDF (using AES), and decrypt the file to retrieve the original transcript.
## Features

- **Digital Signature Generation**: Hashes academic transcript data and encrypts it using RSA with the head of the study program's private key.
- **Display**: Shows both the encrypted (cipher text) and decrypted (plaintext) versions of the academic transcript.
- **PDF Download**: Allows users to download the academic transcript PDF encrypted with AES-256-cbc algorithm.
- **Decryption**: Provides a feature to decrypt the AES-encrypted PDF to retrieve the original file.
## Tech Stack

- **Framework**: Next.js
- **Language**: TypeScript
- **CSS**: Tailwind CSS
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Cloud DB**: Supabase
- **Encryption Algorithms**: RSA, AES, RC4
## Getting Started

### Prerequisites
Before you begin, ensure you have met the following requirements:

- **Node.js**: This project requires Node.js version 20.0.0 or higher. To check your Node.js version, run `node -v` in your terminal. If you need to update or install Node.js, visit [Node.js Download](https://nodejs.org/en/download/).
- **Cloud Database Access**: Ensure you have access to a cloud database. This project uses Supabase as the cloud database. Set up an account or log in to your existing Supabase account to connect the application to the database.


### Installation
These instructions will get your copy of the project up and running on your local machine for development and testing purposes.

First of all you need to clone this project

```bash
  git clone https://github.com/TimothySubekti0322/II4031-EduCertify
```

Go to the project directory

```bash
  cd Path/to/II4031-EduCertify
```

Then install all the dependencies by simply run this code on the terminal

```bash
  npm install
```

```bash
utils\pdfGenerator.ts ; Line 67

    // Uncomment this code below if you are using development mode
    // browser = await puppeteer.launch({
    //   headless: true,
    //   args: ["--no-sandbox", "--disable-setuid-sandbox"],
    // });
```

and commented out this code below

```bash
utils\pdfGenerator.ts ; Line 73

    // Comment out this code below if you are using development mode
    browser = await puppeteer.launch({

      args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
      defaultViewport: chromium.defaultViewport,
      // you have to point to a Chromium tar file here 👇
      executablePath: await chromium.executablePath(
        `https://github.com/Sparticuz/chromium/releases/download/v123.0.1/chromium-v123.0.1-pack.tar`
      ),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });
```

Next, Create a .env file that contains your Database URL connection. Copy this code below and paste it on your .env file. Change **YOUR_DATABASE_CONNECTION_URL** with your own database url connection.

```bash
DATABASE_URL=YOUR_DATABASE_CONNECTION_URL
```

Next, in Schema.prisma , you could change db provider to anything you want. but it would be recomended if you are using postgresql

Then, Run migration to create database in your local database that using this command bellow

```bash
npx prisma migrate dev --name init
```

then to run the website locally , you need to run this command below

```bash
  npm run start
```

Now you can access the server in http://localhost:3000/

## Deployment

The project is deployed at https://ii-4031-edu-certify.vercel.app.

**Note:** The project is hosted on free hosting and uses a free cloud database. As a result, performance may be slow, especially since encryption operations require high computing power.

### Usage

1. Navigate to the application in your web browser:
    ```bash
    http://localhost:3000
    ```

2. Create your private key
3. Fill the transcript Academic Data
3. View the generated digital signature (both cipher text and plaintext).
4. Now you could to verify the digital signature by clicking verify button in the table section
5. Download the AES-encrypted PDF of the transcript.
6. Use the decryption feature to retrieve the original transcript.
## Contributor

- [18221059 - Nadira Rahmananda Arifandi](https://github.com/nadiraaraa)
- [18221063 - Timothy Subekti](https://github.com/TimothySubekti0322/)
- [18221072 - Hilmi Baskara Radanto](https://github.com/hilmibaskara)

## Feedback

We'd love to hear your thoughts and suggestions! Please feel free to open an issue or contact us directly at velmothy14@gmail.com

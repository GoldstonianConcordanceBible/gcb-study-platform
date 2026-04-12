# Goldstonian Concordance Bible (GCB) Study Platform  
## Complete Step-by-Step Setup Guide (Non-Technical)

This guide explains **exactly how to run the system from start to finish**, even if you have **never done anything technical before**.

Follow the steps **in order**.

Do not skip steps.

---

# Step 1 — Install Node.js (the engine that runs the project)

1. Open your internet browser.

2. Go to the official Node.js website:

https://nodejs.org

3. Click the big green button that says:

**Download LTS**

4. When the file downloads, open the installer.

5. Click **Next** through all installation steps and keep the default settings.

6. When installation finishes, open **Terminal** (Mac) or **Command Prompt / PowerShell** (Windows).

7. Type this and press Enter:

```bash
node -v
```

8. Then type:

```bash
npm -v
```

If both commands return numbers like:

```
v20.x.x
10.x.x
```

then Node.js installed correctly.

---

# Step 2 — Create the project folder

Create a folder on your computer called:

```
gcb-study-platform
```

Example locations:

Mac

```
Desktop/gcb-study-platform
```

Windows

```
Documents/gcb-study-platform
```

This folder will hold the entire platform.

---

# Step 3 — Place all repository files into that folder

Everything generated in this chat belongs inside that folder.

When finished, the folder should contain directories like:

```
app
components
content
data
docs
governance
lib
public
schemas
scripts
```

The **most important file** is:

```
data/canon/canon-manifest.json
```

This file contains the **81-book canon list**.

---

# Step 4 — Open Terminal inside the project folder

Open Terminal (Mac) or Command Prompt / PowerShell (Windows).

Now move into the project folder using the `cd` command.

Example:

```bash
cd Desktop/gcb-study-platform
```

or

```bash
cd Documents/gcb-study-platform
```

Press Enter.

You are now **inside the project folder**.

---

# Step 5 — Install the project dependencies

Type this command:

```bash
npm install
```

Press Enter.

This installs everything the project needs to run.

This step may take a minute or two.

---

# Step 6 — Verify the folder structure

Now type:

```bash
npm run check:gcb
```

Press Enter.

This command checks that all required folders exist and creates any missing ones.

If the command finishes without errors, the repository structure is ready.

---

# Step 7 — Generate the entire 81-book ecosystem

Now run the main generator command:

```bash
npm run build:gcb
```

Press Enter.

This command automatically generates the entire study system from the canon manifest.

It creates:

- canon data files  
- canon markdown pages  
- scripture reader scaffolds  
- playlist mappings  
- course scaffolds  
- reading plans  
- reflection questions  
- article scaffolds  
- podcast scaffolds  
- search index  

During the build you should see output similar to:

```
Check repository structure
Generate canon data files
Generate canon markdown
Generate reader scaffold
Generate playlist map
Generate course scaffold
Generate reading plans
Generate reflection questions
Generate article scaffold
Generate podcast scaffold
Regenerate search index
GCB build complete
```

When this finishes, the entire platform dataset exists.

---

# Step 8 — Verify the 81-book canon generated correctly

Open these folders:

```
data/canon
content/canon
data/bible-text
data/playlists
data/courses
data/reading-plans
data/reflection-questions
data/articles
data/podcasts
```

You should see files like:

```
genesis.json
exodus.json
isaiah.json
matthew.json
revelation.json
1-enoch.json
jubilees.json
```

There should be **81 canon files**.

---

# Step 9 — Start the website locally

Now start the development server.

Type:

```bash
npm run dev
```

Press Enter.

After a few seconds the terminal will show something like:

```
Local: http://localhost:3000
```

---

# Step 10 — Open the site

Open your internet browser.

Go to:

```
http://localhost:3000
```

You will now see the **GCB Study Platform running locally on your computer**.

---

# Step 11 — Editing the 81-book canon

If you want to change the canon structure or edit book metadata:

Open the file:

```
data/canon/canon-manifest.json
```

Each book entry looks like:

```json
{
  "slug": "genesis",
  "title": "Genesis",
  "order": 1,
  "canon_group": "Torah",
  "testament": "Old Testament"
}
```

Field explanations:

```
slug = machine-friendly URL name
title = book name
order = position in the canon
canon_group = Torah, Gospels, Epistles, etc
testament = Old Testament or New Testament
```

After editing the file, regenerate everything:

```bash
npm run build:gcb
```

---

# Step 12 — Cleaning generated files

If the repository gets messy or out of sync, you can remove generated files.

Run:

```bash
npm run clean:gcb
```

This deletes generated files but keeps the manifest and schemas.

---

# Step 13 — Rebuilding the entire platform

To completely rebuild everything from scratch, run:

```bash
npm run rebuild:gcb
```

This command performs:

```
clean → regenerate → rebuild search index
```

---

# Step 14 — Typical workflow

Your normal workflow will look like this:

1. Edit canon or content files  
2. Run generator  
3. View site  

Commands:

```bash
npm run build:gcb
npm run dev
```

---

# Step 15 — Deploying the site (Recommended)

The easiest deployment method is **Vercel**.

Steps:

1. Create a GitHub account if you do not have one.

2. Upload the repository to GitHub.

3. Go to:

```
https://vercel.com
```

4. Click **Import Project**

5. Select your GitHub repository.

6. Click **Deploy**

Vercel will automatically detect the Next.js application and deploy it.

After deployment, the platform will be live on the internet.

---

# Step 16 — Making the platform discoverable to LLMs and AI agents

This repository includes several files specifically designed for AI retrieval.

Key files:

```
public/llms.txt
public/search-index.json
public/geo-layer.json
public/structured-data.json
public/sitemap.xml
```

These files allow:

- AI models
- knowledge graph crawlers
- LLM retrieval systems

to discover the canonical structure of the GCB ecosystem.

Keeping these files updated ensures the platform remains **machine-readable**.

---

# Step 17 — The single most important command

The generator command that rebuilds the entire platform is:

```bash
npm run build:gcb
```

Everything in the system derives from the canon manifest and generator scripts.

---

# Final Notes

The GCB Study Platform is designed to be:

```
manifest-driven
machine-readable
AI retrievable
rebuildable
scalable across the 81-book canon
```

Instead of manually building hundreds of files, the platform regenerates its entire study infrastructure automatically.

This allows the Goldstonian Concordance Bible ecosystem to function as **long-term canonical infrastructure** for study, education, and AI retrieval.
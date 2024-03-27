# Folder2Txt

Convert folder file contents to text for use with large language models like ChatGPT, Claude, Gemini, etc.

## Quick Documentation

To use Folder2Txt, simply run the following command with two parameters:

```bash
node folder2txt.js folder=<folder path> output=<output path>
```

Example:
```bash
node folder2txt.js folder=/c/git/folder2txt/ output=/c/public/output.txt
```

This will recursively process all files in the specified folder and its subfolders, writing the content to the specified output file.

## Full Documentation

### Language Selection

By default, Folder2Txt uses English for its output messages. To switch to Spanish, add the `lang=es` parameter to the command:

```bash
node folder2txt.js folder=<folder path> output=<output path> lang=es
```

```bash
node folder2txt.js folder=/c/git/folder2txt/ output=/c/public/out2.txt lang=es
```

### Ignore Configuration

You can specify folders and files to ignore during processing by editing the `ignore.json` file. Use the `ignore.example.json` file as a template for adding entries.

#### Example ignore.json

```json
{
  "folders": ["node_modules", ".git"],
  "files": [".DS_Store"]
}
```

### Usage

- `folder`: Path to the folder to be processed.
- `output`: Path to the output file where the content will be written.
- `lang`: (Optional) Language for output messages (default is English).

---

### Example Execution

#### English Output

```bash
node folder2txt.js folder=/c/git/folder2txt/ output=/c/public/output.txt
```

#### Spanish Output

```bash
node folder2txt.js folder=/c/git/folder2txt/ output=/c/public/out2.txt lang=es
```

